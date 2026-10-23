# FinIG Architecture Description

**Project:** Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant  
**Status:** Architecture baseline; implementation and verification pending.  
**Related tasks:** BOA-9 — System Context; BOA-10 — Use Case; BOA-11 — Component Diagram Draft.

## I. Overview

FinIG is a browser-based client–server application for analysing personal finances. Users import supported PDF statements from Kaspi, Halyk and Freedom, add manual transactions, review duplicates and internal transfers, and explore a unified table, dashboard, graph and intelligent chat.

The planned system uses Angular, one modular FastAPI backend and PostgreSQL. Backend services calculate financial results and construct graphs. An external LLM interprets questions and explains validated results without direct database access or write permissions.

The architecture prioritises user-owned data, exact calculations per currency, reversible review decisions and answers linked to supporting records. Initial deployment is local through Docker Compose. The existing three-file UX prototype demonstrates interactions; it is separate from the planned full implementation.

Scope excludes live bank integration, payments, scanned-statement OCR, universal PDF layouts, automatic currency conversion, native mobile apps and professional accounting or investment advice.

## II. Diagrams and Conventions

| Diagram | Notation and scope | Source |
| --- | --- | --- |
| System context | C4-style overview of people and external systems | [system-context.puml](../../diagrams/system-context.puml) |
| Use case | UML goals of visitors and authenticated users | [use-case.puml](../../diagrams/use-case.puml) |
| Component draft | UML-style application overview and backend dependencies | [component-diagram-draft.puml](../../diagrams/component-diagram-draft.puml) |

The component view includes frontend, backend modules and external dependencies; it is not a strict single-container C4 level-3 diagram. Backend components belong to one application, not separate microservices. Dashed arrows show dependencies; results return to callers. Runtime boundaries are described in Section V; no additional container diagram is assumed.

Image paths follow the supplied repository screenshots: files are directly in `diagrams/`, while this document belongs in `docs/architecture/overview.md`. Merge the diagram branches into the document's branch so the images and source links resolve.

## III. System Context

![FinIG System Context Diagram](../../diagrams/system-context.svg)

*Figure 1. FinIG users, system boundary and external LLM dependency.*

**Users.** Visitors register or sign in. Authenticated users manage and analyse only their own accounts, wallets, transactions and imports.

**Statement sources.** Users provide PDFs from Kaspi, Halyk and Freedom. The initial scope is one agreed text-based layout per bank; there are no live bank API connections.

**External LLM.** FinIG sends minimal sanitised context and backend-calculated results over HTTPS. Raw PDFs, credentials and full account identifiers are excluded. Provider failure does not block tables or summaries.

**Google authentication.** FR-01 and its acceptance tests require email/password and Google sign-in. Google receives authentication traffic, not financial records. Identities are validated using provider identifiers; matching email addresses alone do not link accounts. Google is missing from the current context and component drawings and must be added in their next revision.

## IV. Use Cases and Requirements

![FinIG Use Case Diagram](../../diagrams/use-case.svg)

*Figure 2. Main user goals for visitors and authenticated users.*

UC identifiers below are document-local traceability labels; the diagram itself uses names.

| ID | Use case | Requirements |
| --- | --- | --- |
| UC-01 | Register / Log In | FR-01 |
| UC-02 | Log Out | FR-01 |
| UC-03 | Manage Accounts and Cash Wallets | FR-02 |
| UC-04 | Manage Transactions | FR-03, FR-04, FR-07, FR-10, FR-12 |
| UC-05 | Import PDF Statements | FR-05, FR-06, FR-07; optional FR-08 |
| UC-06 | Review Duplicates | FR-09 |
| UC-07 | Review Internal Transfers | FR-12 |
| UC-08 | View Financial Dashboard | FR-11 |
| UC-09 | Explore Transaction Graph | FR-13, FR-14 |
| UC-10 | Ask Analytical Questions and Read Answers | FR-15, FR-17, FR-18 |
| UC-11 | Inspect Supporting Records and Graph Connections | FR-16; FR-14 for graph selection |

UC-01 is available to visitors; all remaining use cases require authentication and resource-ownership checks. Complete import deletion (FR-08) is optional and belongs to import management. Three-language chat is mandatory under FR-18; full interface localisation is optional under NFR-12. The current English UX prototype does not change these priorities.

## V. Runtime Containers and Technologies

| Element | Technology | Responsibility |
| --- | --- | --- |
| Browser application | Angular, TypeScript, HTML5, SCSS; Router, Reactive Forms, HttpClient, RxJS | Navigation, forms, uploads, tables, reviews and chat |
| Visualisation | Apache ECharts; Cytoscape.js | Display financial series and interactive graph connections |
| Web service | Nginx; proposed deployment choice | Serve the Angular build and proxy `/api` requests |
| Backend | Python, FastAPI, Pydantic, SQLAlchemy | Authentication, validation, business rules and database access |
| Data processing | PDF extraction library TBD; Pandas; NetworkX | Extract PDF content, normalise records and build graphs |
| Database | PostgreSQL | Authoritative application records and decisions |
| Temporary storage | Private backend-mounted volume | Hold PDFs during processing and remove them afterwards |
| External services | Google identity provider; LLM API TBD | Authentication and controlled language assistance |

The browser uses REST/JSON and multipart PDF uploads; it never accesses the database directly. A dedicated library extracts PDF content before Pandas normalisation. NetworkX constructs graphs from PostgreSQL records, so a separate graph database is unnecessary for the initial design.

## VI. Backend Components

![FinIG Component Diagram Draft](../../diagrams/component-diagram-draft.svg)

*Figure 3. Application components and their main dependencies.*

| Component | Responsibility | Use cases |
| --- | --- | --- |
| REST API and Access Control | Sessions, request validation and ownership enforcement | UC-01–UC-02; protects all others |
| Transaction Management | Accounts, wallets, manual CRUD, categories, imports, duplicate and transfer decisions | UC-03–UC-07 |
| Financial Analytics | Filtered records, exact totals, trends and breakdowns | UC-04, UC-08; supports UC-10–UC-11 |
| Graph Analytics | Identifier-based directed connections, amounts/counts and evidence | UC-09; supports UC-10–UC-11 |
| Chat Assistant | Intent handling, clarification, controlled read-only functions and validated answers | UC-10–UC-11 |
| Data Access | User-scoped queries, atomic writes, constraints and shared calculation inputs | Supports all domain modules |

Import processing is grouped under Transaction Management and can be separated into internal parser modules. Session and evidence persistence also use Data Access, although these secondary dependencies are omitted from the compact drawing.

Analytics share one duplicate-resolution and classification policy. Mutations and dataset-revision updates commit together. PDF extraction uses bounded processing with a timeout; an import completes only when its entire validated transaction batch commits. No separate queue service is required initially.

## VII. Data and Consistency Rules

The proposed logical model contains the following entities; the physical database schema remains to be implemented.

| Entity | Main information |
| --- | --- |
| User, AuthIdentity and Session | Owner identity, password hash or provider subject, session expiry and revocation |
| Account or Wallet | Owner, name, bank/type, currency and available identifiers |
| Category | Owner and label; missing assignment displays Uncategorised |
| Import | Owner/account, layout, status, idempotency key, parser version and errors |
| Transaction | Owner/account, date, decimal amount, currency, direction, classification, category, counterparty and source/page/row references |
| Counterparty Identity | Identifiers, label and identity provenance |
| Duplicate Decision | Member records, same/separate decision, canonical record and reversal history |
| Internal Transfer Pair | Two records, confirmation state and reversal history |
| Dataset Revision and Answer Evidence | Dataset version, query/filters, calculated values, supporting record IDs and graph references |

The baseline adopts the proposed transfer, editing and retention rules from requirements Section 1.3 as design assumptions to record before acceptance:

- **Ownership and money:** related records belong to the same user. Amounts use exact decimal storage/arithmetic and decimal-string API values. Currencies are calculated separately. Account currency cannot change after transactions exist.
- **Sources:** imported dates, amounts, currencies and directions remain unchanged; categories, classification and separate notes are editable. Manual records support validated editing and deletion.
- **Duplicates:** users confirm or reverse decisions; date/amount matches never trigger automatic merging. Confirmed duplicates count once and retain provenance. Unreviewed candidates remain separate with warnings in affected analytics and chat.
- **Internal transfers:** pairs require equal amounts, the same currency, opposite directions and different user-owned accounts/wallets. Each effective movement belongs to at most one active pair. Pairing is reversible; fees remain expenses and missing counterparts are not fabricated.
- **Counting:** confirmed transfers are excluded from income/expenses but remain in movement totals. A pair is two table movements and one graph transfer. Unclassified and unpaired movements are identified separately.
- **Graph identity:** names or masked identifiers alone do not merge entities. Ambiguous records remain in tables/summaries; graph exclusions are counted and user-provided relationships labelled. Connections do not prove that the same funds travelled along a path.
- **Evidence freshness:** relevant changes increment the dataset revision. Earlier chat answers become outdated and offer recalculation. Edits or deletions revalidate dependent duplicate and transfer relationships.
- **PDF retention:** files use server-generated names in private storage and are removed after processing, within the proposed 24-hour maximum. Startup/periodic cleanup handles abandoned files. Source references remain, but original PDFs are not retained in the database or logs.

## VIII. Key Scenarios

**A. First use and import.** Register/sign in → create an account → upload a PDF → validate size, pages, encryption, text and layout → extract and normalise records → commit the complete batch → show results and review candidates. Headers and balances are excluded; ambiguous required values cause an error. Retrying the same request key does not duplicate the batch; a deliberate new upload undergoes duplicate review.

**B. Manual entry and duplicate review.** Enter income/expense → validate required fields and ownership → save with Manual source → compare potential overlaps → confirm same or separate transactions. Decisions can be reversed and update all subsequent calculations.

**C. Internal-transfer review.** Select candidate movements → validate pairing conditions → confirm the pair → update income/expense summaries and graph counts while preserving both account movements. Undo returns the records for explicit classification review.

**D. Dashboard and graph.** Select period, currency and accounts → calculate results over the resolved dataset → display charts/connections → select a segment or edge to inspect its supporting transactions.

**E. Chat and evidence.** Display the external-processing notice → accept a question in Kazakh, Russian or English → clarify missing parameters → validate an allowlisted read-only function and inject user scope → calculate results → validate the explanation and attach evidence. The model cannot execute arbitrary SQL or write data; transaction descriptions are treated as data, not instructions. Evidence opens only on request and is checked against the dataset revision.

Supported questions cover income, expenses, highest-expense categories, transaction search, counterparty totals, frequent recipients and direct graph connections, including ties where applicable. Empty results, unavailable data, unsupported requests and provider failures receive distinct explanations without invented results.

**F. Recovery.** Invalid or unsupported PDFs produce a clear reason and another-upload option; failed imports leave no partial batch. LLM failure offers retry while tables and summaries remain usable.

## IX. Deployment

**Decision:** run the initial application locally with Docker Compose for reproducible development, testing and demonstration. Hosting and a public server are deferred.

| Service/storage | Purpose |
| --- | --- |
| `web` | Nginx serves Angular and proxies the API; host port binds to `127.0.0.1` |
| `api` | FastAPI, PDF processing and cleanup on the internal network |
| `db` | PostgreSQL on the internal network without a public database port |
| Persistent database volume | Retain application records across ordinary restarts |
| Private temporary volume | Store uploads subject to the cleanup policy |

Local loopback development may use HTTP with separate development settings; shared/public deployments require HTTPS. Google and LLM connections always use HTTPS and require Internet access and configured credentials.

Authentication uses maintained password hashing and revocable sessions. Proposed session cookies are HttpOnly, use an appropriate SameSite policy and CSRF protection, and enable Secure for HTTPS. Secrets remain outside Git and frontend bundles.

Implementation must provide Compose/Docker definitions, pinned dependencies, migrations, placeholder configuration, synthetic/anonymised fixtures and startup/test instructions. Reference testing uses at least 4 logical CPU cores, 8 GB RAM, one active user and up to 10,000 transactions. Proposed limits are 10 MB, 20 pages and 1,000 transactions per PDF; displayed graphs are limited to 200 nodes and 500 edges, with filtering or explicit omission notices.

## X. Consistency and Verification

| Check | Finding or follow-up |
| --- | --- |
| Scope, users and stack | Aligned across the supplied requirements and diagrams; planned functionality is not yet verified implementation. |
| Functional coverage | FR-01–FR-18 mapped in Section IV; FR-08 remains optional. |
| Google sign-in | Required by FR-01; add the dependency to context and component diagrams. |
| PDF processing | Correct technology-comparison Section 5 step 3: extraction library first, Pandas normalisation afterwards. |
| Diagram structure | Component drawing is a whole-application overview; runtime boundaries are explained in Section V. |
| Deployment | Local Compose and Nginx are design decisions, not claims of existing configuration. |
| Prototype and languages | English UX demonstration is separate from the planned three-language assistant. |

Verification follows `requirements.md`: ownership/authentication tests; at least two verified PDFs per bank layout; atomic-import/retry checks; duplicate and transfer reversals; exact financial and graph results; file cleanup; browser usability; and reproducible setup. Chat testing includes at least 21 supported questions—seven scenarios in three languages—plus ambiguity, provider failures, stale evidence and malicious instructions in descriptions.

Performance targets remain unmeasured: imports within 30 seconds in five runs per layout; table/dashboard within 2 seconds and graph within 5 seconds for at least 19 of 20 actions per view; chat timeout feedback within 30 seconds. Record fixtures, commit, environment, expected/actual output and pass/fail evidence. All Must criteria must pass; deferred Should items need documented reasons.

## XI. Open Points

- Confirm the three PDF layouts and select an extraction library using anonymised samples.
- Select the LLM provider/model and document allowed fields for each analytical function.
- Choose the Google authentication integration and update the diagrams.
- Document supported currencies, decimal precision and answer-history retention.
- Record agreement on proposed business rules, workload limits and performance targets before acceptance.
- Implement or explicitly defer optional import deletion, mobile support and full interface localisation.
- Consider hosting only if remote access becomes necessary.

## References

1. [Requirements Specification](../requirements.md).
2. [Technology Comparison](../technology-comparison.md).
3. [System Context source](../../diagrams/system-context.puml), BOA-9.
4. [Use Case source](../../diagrams/use-case.puml), BOA-10.
5. [Component Diagram draft source](../../diagrams/component-diagram-draft.puml), BOA-11.
6. [Project README](../../README.md).
