# Verification and Evaluation Plan

**Project:** Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant  
**Institution:** Astana IT University — School of Software Engineering  
**Team:** Gulzada Issa, Inabat Medetkyzy  
**Status:** Planned verification and evaluation; implementation results have not yet been collected  
**Basis:** `proposal.md`, `requirements.md`, `existing-system-comparison.md`, `technology-comparison.md`, `literature-review.md`, and the System Context, Use Case, and Component Diagram (draft)

## 1. Purpose and Evaluation Objectives

The project aims to develop and evaluate a browser-based service that combines transactions imported from one agreed text-based PDF statement layout each from Kaspi, Halyk, and Freedom with manually entered income and expenses. The service is intended to help individual users understand and verify their financial activity using a unified transaction table, financial summaries, directed transaction graphs, and a chat assistant with inspectable supporting records.

This plan describes **how the project will be verified**, **how its outcomes will be measured**, **under what conditions the measurements will be made**, and **what baseline will be used for comparison**. It does not report completed testing or imply that the prototype already satisfies its requirements.

Verification will establish whether the implementation meets the acceptance criteria of `requirements.md` (FR-01–FR-18 and NFR-01–NFR-13). Evaluation will establish whether the complete workflow produces accurate, traceable results and helps users analyse financial activity relative to a reproducible baseline.

The evaluation addresses five questions:

1. **Data correctness:** Can the service reliably import the three agreed PDF layouts, accept manual records, and maintain correct transaction data after duplicate and internal-transfer review?
2. **Analytical correctness:** Do table results, monetary summaries, and directed graph connections agree with independently verified reference data?
3. **Answer reliability and traceability:** Does the chat assistant answer the supported questions accurately, use only authorised backend calculations, and link to the correct supporting records or graph connections?
4. **Security and robustness:** Does the service preserve ownership boundaries, minimise information sent to the external LLM, reject invalid uploads, and recover from failures without corrupting data?
5. **Practical value:** Can target users complete representative analysis tasks accurately and efficiently compared with a manual spreadsheet workflow?

## 2. Verification Strategy

Testing will be performed progressively and repeated after relevant changes. All test inputs involving financial transactions will be synthetic or appropriately anonymised. The external LLM provider, PDF extraction library, exact supported bank layouts, and certain proposed implementation decisions are not yet finalised.

| Test level | Scope | Method and expected evidence |
| --- | --- | --- |
| Unit | PDF normalisation, input validation, exact-decimal calculations, duplicate candidate rules, transfer pairing, aggregation, graph construction, and response formatting | Automated tests with fixed inputs and expected outputs; pass/fail reports |
| Integration | Angular ↔ FastAPI REST requests, API ↔ PostgreSQL persistence, import transactions, analytics ↔ graphs, and controlled chat functions ↔ LLM adapter | Automated API/integration tests and database-state checks; mock the external provider for deterministic failure tests |
| System / end-to-end | Register or log in, import statements, add records, review duplicates and transfers, filter records, view charts/graphs, ask questions and inspect supporting evidence | Browser-based scenario tests and screenshots or recorded outcomes |
| Security and privacy | Authentication, record ownership, file handling, secret protection, LLM data minimisation, and prompt injection | Negative tests for unauthorised access; inspection of captured, sanitised requests and server configuration |
| Performance and reliability | Import duration, table/dashboard/graph display times, malformed files, repeated imports, and provider timeouts | Repeatable measurements in the reference environment; logs and timing results |
| User evaluation | Task completion, errors, elapsed time, perceived clarity and evidence inspection | Moderated tasks using synthetic scenarios; compare with a manual spreadsheet baseline |

The initial prototype uses Angular/TypeScript with Apache ECharts and Cytoscape.js, a FastAPI/Python backend with Pandas and NetworkX, and PostgreSQL via SQLAlchemy, as proposed in the technology comparison. Testing focuses on behaviours and interfaces rather than assuming that the chosen technologies guarantee performance.

## 3. Test Data and Reference Results

A versioned **gold-standard dataset** will be prepared independently of the application output. Expected results will be manually checked using a separate spreadsheet or calculation script with exact decimal arithmetic, including explicit review of transaction classifications and graph identities.

| Fixture | Contents | Purpose |
| --- | --- | --- |
| PDF-K, PDF-H, PDF-F | **At least two manually verified text-based PDF statements per agreed layout** from Kaspi, Halyk, and Freedom, with expected rows and field values | Validate record extraction, dates, descriptions, amounts, directions, currencies, and source references (FR-05) |
| INVALID-PDF | Non-PDF, image-only, password-protected, malformed, unsupported-layout, oversized and extraction-failure samples | Validate rejection messages and absence of partial imports (FR-06, NFR-09) |
| TRANSACTION-SET | Manual income/expenses, different currencies, categories, empty periods, account/wallet movements, fees and unclassified records | Validate CRUD, filters, exact summaries and currency separation (FR-02–FR-04, FR-10–FR-12) |
| DUPLICATE-SET | Repeated requests, intentional repeated uploads, overlapping statements, manual/PDF matches, similar-but-distinct items, and reversed decisions | Verify candidate review, counted-once behaviour and idempotent retry (FR-09, NFR-09) |
| TRANSFER-SET | Two sides of a valid internal transfer, unpaired movements, incorrect-currency/amount/direction pairs, separate fees and reversed pairing | Verify transfer rules and account-movement versus transfer counts (FR-12) |
| GRAPH-SET | Identifiable accounts/counterparties, directed payments, ambiguous names or masked identifiers, user-provided relationships and records with missing identifiers | Verify node/edge identity, direction, weights, filters and excluded-record counts (FR-13–FR-14) |
| CHAT-SET | **At least 21 supported questions:** all seven defined scenarios in Kazakh, Russian and English, with independently calculated numbers and expected supporting record IDs | Verify numerical answers, reference sets and language consistency (FR-15–FR-18) |
| SECURITY-SET | Two independent user accounts, foreign record IDs, invalid/expired sessions and malicious text embedded in descriptions | Verify ownership, isolation, sanitisation and prompt-injection resistance (NFR-01–NFR-04) |
| LOAD-SET | Up to **10,000 transactions** for one user; files up to **10 MB / 20 pages / 1,000 transactions**; a displayed graph up to **200 nodes / 500 edges** | Exercise the stated non-functional workload limits (NFR-06–NFR-07) |

For PDF extraction, an item is correct only if its required fields match the manually verified reference after **documented** normalisation. Statement headers, balances and statement totals must not become transactions. Ambiguous required fields must be flagged, not guessed. Before acceptance tests, the team will document supported currencies, their decimal precision, exact PDF layout versions, and source-reference conventions.

The reference dataset will include expected answers **after** explicit duplicate decisions and confirmed internal-transfer pairings. Unreviewed duplicate candidates remain separate and must produce a warning in affected analytical and chat views. Confirmed internal-transfer pairs remain account movements but are excluded from income and expense totals; a pair represents one transfer in graph transfer counts. Different currencies are never added or automatically converted.

## 4. Functional Test Plan and Traceability

The following tests translate the existing functional requirements into reproducible checks. A test passes only if **all** clauses of its linked acceptance criterion pass; the table below is a summary, not a replacement for `requirements.md`.

| Test ID | Requirements | Planned test and observable pass condition |
| --- | --- | --- |
| VT-01 | FR-01 | Register, sign in with email/password and Google, log out, attempt invalid credentials and cancelled Google login; verify no unauthorised session or automatic email-based account linking |
| VT-02 | FR-02–FR-04 | Create owned accounts/wallets and categories; validate manual entry, editing and deletion; reject invalid values and cross-user account assignments; update displayed category totals; protect currency changes on populated accounts |
| VT-03 | FR-05, FR-07 | Import two reference PDFs per bank layout; compare counts and required fields to gold-standard rows; verify source labels, import IDs and page/row references; preserve original imported financial fields while allowing permitted changes |
| VT-04 | FR-06 | Try rejected and faulty file types, boundary sizes, extraction errors and failed processing; verify clear explanations and zero partially saved batches |
| VT-05 | FR-09 | Test repeated statements and manual/PDF overlaps; verify candidate warnings, user confirmation and reversal; do not merge solely because date and amount match; confirmed duplicates count once throughout the application |
| VT-06 | FR-10 | Compare simple and combined filters, searches and date/amount sorting against expected record IDs across source, period, bank, account, category, currency, direction and known counterparty |
| VT-07 | FR-11–FR-12 | Compare incoming/outgoing movement totals, income/expense totals, counts, monthly/category/counterparty summaries, empty periods and multiple currencies; test confirmed/unpaired transfers and separate fees; verify recalculation after edits |
| VT-08 | FR-13–FR-14 | Compare graph nodes, directed edges, amounts, counts and supporting transaction IDs with GRAPH-SET; ensure no unjustified merges; test filters, exclusions, user-provided labels, and paired-transfer accounting |
| VT-09 | FR-15, FR-18 | Run all **seven chat scenarios in each of three languages** and compare calculated amounts, periods, currencies and result sets with CHAT-SET; confirm the assistant only uses predefined read-only backend functions |
| VT-10 | FR-16 | Follow an answer’s references to the exact transactions or graph connections; verify no automatic navigation and that answers based on modified data are marked outdated until recalculated |
| VT-11 | FR-17 | Test ambiguous questions, absent information, unsupported requests, empty results and provider errors; require clarification or limitations rather than invented answers |
| VT-12 | FR-08 (Should) | If implemented, delete a complete import after confirmation, verify recomputation and preservation of unrelated records; cancellation must do nothing. Otherwise document deferral |

For the seven supported chat scenarios, the test corpus will cover expense and income summaries, largest expense category, filtered transaction searches, transfer totals to a counterparty, frequent counterparties and an account's direct graph connections. Expected answers include ties, missing identifiers and supporting records where relevant. Additional negative cases will check that instructions contained in transaction descriptions cannot change the assistant's access rights or tools.

## 5. Non-Functional Test Plan

The numeric thresholds in this table are **proposed acceptance targets carried over from `requirements.md`**, not observed values. The team's outstanding implementation decisions must be confirmed before formal acceptance testing.

| Test ID | Requirements | Measurement / pass condition |
| --- | --- | --- |
| NT-01 | NFR-01 | An unauthenticated user or User A requesting User B's records, modifications, summaries, graph or chat data is denied; **zero foreign records disclosed** |
| NT-02 | NFR-02 | Invalid/expired sessions are rejected; passwords use maintained hashing; no keys/passwords in client, repository or logs; deployment uses HTTPS |
| NT-03 | NFR-03 | Uploaded files use server-generated names outside public access; traversal is rejected; temporary PDFs are removed **within 24 hours** of success/failure under the proposed retention rule |
| NT-04 | NFR-04 | Document per-function LLM field allowlists; inspect captured test requests for **zero** raw PDFs, credentials and full account identifiers; show user notice before first external processing |
| NT-05 | NFR-05 | Exact-decimal results equal the gold standard at specified currency precision; edits, duplicate resolutions and transfer decisions yield consistent table, dashboard, graph and chat results |
| NT-06 | NFR-06 | **Five runs per supported PDF layout**; every eligible import finishes in **≤30 seconds**, from upload completion to visible result |
| NT-07 | NFR-07 | **20 actions per view** with the reference workload; **at least 19/20** table actions and **19/20** dashboard actions render within **2 seconds** each, and **19/20** graph actions within **5 seconds**; larger graphs filter or visibly disclose omitted data |
| NT-08 | NFR-08 | Progress feedback during chat processing; simulated LLM timeout produces error and retry within **30 seconds** while tables and summaries remain usable |
| NT-09 | NFR-09 | Simulated import failure saves no partial batch; a retried identical request creates no second batch; a distinct new upload follows duplicate-review rules |
| NT-10 | NFR-10 | Required flows work in documented Chrome and Firefox versions at **1366 × 768**; forms use labels, keyboard access, specific validation errors and non-colour-only error cues |
| NT-11 | NFR-11 (Should) | At **390 × 844**, check login, manual entry, summaries and chat for accessible controls; horizontal transaction-table scrolling is permitted. Document deferral if not implemented |
| NT-12 | NFR-12 (Should) | If implemented, navigation, forms and errors work in Kazakh, Russian and English; language switches preserve form input and filters. This is separate from mandatory trilingual **chat** support |
| NT-13 | NFR-13 | The other team member can follow README setup instructions, use placeholder configuration, run with synthetic/anonymised fixtures and reproduce tests |

## 6. Metrics and Measurement Methods

| Outcome metric | How it will be measured | Success interpretation |
| --- | --- | --- |
| PDF field correctness | `correct required field values / expected required field values × 100%`, after documented normalisation; also record missing/spurious rows per layout | **All required fields and transaction rows must match** each gold-standard acceptance case; report results separately for Kaspi, Halyk and Freedom |
| Duplicate and transfer handling | Compare confirmed counted-once results, warnings and reversals to manually labelled cases; report wrong merges, missed candidates and incorrect transfer pairings | **No incorrect accounting outcome** in mandatory reference scenarios; candidate-detection precision/recall can be reported as diagnostics, not substituted for the required review workflow |
| Financial calculation accuracy | Compare exact-decimal monetary totals and breakdowns per currency with the independent reference | **100% agreement** in mandatory reference cases at documented precision; never sum currencies together |
| Graph consistency | Compare expected and actual node/edge identities, directions, amounts, counts, exclusion counts and supporting transaction ID sets | **100% agreement** in mandatory graph reference cases; no unsupported identity links |
| Supported chat answer correctness | `fully correct supported responses / supported responses tested × 100%`; numerical value, period/currency and relevant supporting IDs must all be right | **21/21 minimum supported language–scenario checks pass**; separately document clarification, missing-data, security and provider-failure tests |
| Evidence traceability | Compare reference links opened from each answer and graph edge with expected transaction IDs | **All required reference links resolve to the exact authorised supporting set** in the mandatory cases |
| Import and interaction latency | Record per-run elapsed seconds using the start/end events in NT-06 and NT-07 | Meet **≤30 s per import**, **≥19/20 within 2 s** for each of table and dashboard, and **≥19/20 within 5 s** for graph |
| User task completion and accuracy | For each standard task, record success without assistance, outcome accuracy, errors and elapsed time | Compare descriptive results against the baseline; any additional usability thresholds are **to be agreed**, not existing mandatory requirements |
| Privacy and access safety | Count unauthorised records exposed, prohibited LLM fields sent, and unrecovered partial imports in negative tests | **Zero** prohibited disclosures or corrupting partial imports in acceptance tests |

**Calculation conventions:** An extracted row must be evaluated as a record, not counted several times because its individual fields match. Missing or extra rows are reported separately from field accuracy. For the chat assistant, a plausible explanation with a wrong number or wrong supporting records is a **failure**. Results from real test executions will be tabulated per fixture, not replaced with illustrative or estimated figures.

## 7. Measurement Conditions and Reproducibility

Performance and correctness results will use a documented reference setup consistent with the requirements:

- **Environment:** one application instance, one PostgreSQL database, at least **4 logical CPU cores and 8 GB RAM**, and **one active user**. Record the exact CPU, memory, operating system, browser, Python/Angular versions, database version and network configuration.
- **Dataset:** up to **10,000 transactions**; eligible PDF files no more than **10 MB, 20 pages and 1,000 transactions each**; visible graphs up to **200 nodes and 500 edges**. Use deterministic fixture versions and record the actual size of each case.
- **Import timing:** start after the PDF upload is complete; stop when the user sees the processing result. Run the same representative file **five times per bank layout** under reset, comparable dataset conditions. Record all five times, including failures.
- **Interaction timing:** start at the user action and stop when the corresponding table, chart or graph is displayed. Collect **20 observations for each view** (table, dashboard and graph) using a predefined action sequence; report raw observations, pass count and median. The pass decision follows the **19-of-20** rule, not median alone.
- **Chat testing:** freeze the dataset, test the seven predefined scenarios in each of the three languages and record model/provider version, prompt/tool version, result, supporting IDs and any retry. Use a mock provider for controlled outages and deterministic access-control tests; separately test the real selected provider once chosen.
- **Isolation and repeatability:** reset the database to a known state before independent tests, retain fixture identifiers and record Git commit, test version and configuration. Do not store unredacted bank details, authentication secrets, or provider request payloads containing personal information in the repository.

No live bank integration, scanned-PDF OCR, payment execution, automatic currency conversion or speculative multi-hop tracing is required by this evaluation because these functions are outside the initial project scope.

## 8. Baseline Solution and Comparison

### 8.1 Reproducible baseline: manual spreadsheet analysis

The **primary baseline** will be a manual spreadsheet workflow, representing the situation described in the project proposal: a user collects statements from different banks and consolidates financial records without the proposed integrated service.

The baseline participant receives the **same synthetic statements, manual-record scenario and questions** as in the service trial. Using a spreadsheet, the participant will transcribe or manually copy the relevant transaction details from the provided PDFs, add cash entries, review suspected duplicates, classify internal transfers, filter records and calculate summaries using ordinary spreadsheet functions. For graph-oriented and chat-style questions, the participant may inspect the consolidated rows and describe relationships or supporting evidence manually; the spreadsheet is not assumed to have a directed graph or a conversational assistant.

This approach is a **repeatable task baseline**, not a claim that every existing bank or finance app lacks these features. To control differences, compare the same questions, source data, reference answers and task order, with clear start/stop events. Record steps and any pre-prepared spreadsheet structure used. Separate the one-time setup cost from repeated analytical questions where practical.

| Comparison task | Manual spreadsheet baseline | Proposed service | Measures |
| --- | --- | --- | --- |
| Consolidate records | Transcribe/copy selected PDF rows and enter cash transactions | Import supported PDFs and enter cash transactions | Completion time, number of correct records, manual corrections |
| Resolve repeated records | Inspect similar spreadsheet rows and decide which entries are the same | Review flagged candidate duplicates and confirm/reverse decisions | Correct counted-once totals, missed/incorrect decisions, time |
| Calculate monthly expenses | Filter by period/currency, classify transfers and sum eligible entries | Select filters and inspect dashboard | Correct total, currency separation, elapsed time |
| Inspect a counterparty | Filter and inspect matching rows and manually identify relationships | Explore directed graph and supporting transactions | Correct connections, unsupported identity assertions, time |
| Answer a financial question with evidence | Find records and calculate/describe the answer from the spreadsheet | Ask the assistant, then open supporting records | Correct answer, supporting-record correctness, time |

### 8.2 Existing products as contextual comparators

The `existing-system-comparison.md` document reviews **Wallet by BudgetBakers, Spendee, Kaspi.kz and Halyk** against nine documented feature criteria. These systems provide a **qualitative baseline for feature coverage**, not a measured speed or accuracy baseline. That comparison relies on published materials, not hands-on trials; therefore it cannot justify numerical claims that the prototype outperforms these products.

The project will demonstrate its **planned combination** of selected Kazakhstan PDF layouts, manual records, duplicate review, directed graph exploration and evidence-linked chat. Each implemented feature will be demonstrated and tested rather than assumed unique or superior.

### 8.3 Optional usability study

A small, feasible moderated pilot with approximately **five representative potential users** is proposed, subject to recruitment. Participants will perform the same predefined tasks using the baseline and prototype. To reduce ordering effects, alternate which workflow is tested first; use equivalent synthetic datasets when repeating tasks. Record task completion, incorrect answers, assistance requested, elapsed time and short user feedback about clarity of totals, graphs and supporting references.

Report results per task and as paired descriptive comparisons (for example, median time and proportion of correct completions). A decrease in time or errors is an **outcome to evaluate**, not a guaranteed result. No fixed improvement percentage or satisfaction cut-off is asserted in the current requirements; any extra usability success threshold must be agreed with the team/supervisor before the study.

## 9. Evidence Collection and Reporting

Every executed test will have a record containing **requirement ID, test ID, fixture/input, expected result, actual result, pass/fail status, evidence link, code commit, fixture version and test environment**. Failures will be linked to YouTrack issues, retested after correction, and identified in the final report. The GitHub repository will retain test scripts, **non-sensitive** sample data, expected-results documentation and a versioned results summary.

A compact results table can be filled in after execution:

| Area | Planned evidence | Actual result | Status |
| --- | --- | --- | --- |
| PDF import (three layouts) | At least 2 reference PDFs/layout, field and row comparisons | Not tested yet | Planned |
| Duplicate/transfer accounting | Labelled edge cases, before/after totals and reversal tests | Not tested yet | Planned |
| Financial and graph analytics | Exact-decimal reference summaries and expected graph sets | Not tested yet | Planned |
| Chat and evidence | At least 21 supported questions, their values and supporting records | Not tested yet | Planned |
| Security, reliability and performance | NT-01–NT-13 test reports and run timings | Not tested yet | Planned |
| Baseline and usability | Task-level time, correctness and supporting evidence comparisons | Not tested yet | Planned |

## 10. Demonstration of Project Aim and Acceptance Decision

Achievement of the project aim will be demonstrated in an end-to-end scenario using independently verified, synthetic or anonymised records:

1. Authenticate and import an agreed text-based PDF layout from **each** of Kaspi, Halyk and Freedom, then add a manual cash record.
2. Show the unified table, including the source of each record and filters by account, time and currency.
3. Review a potential manual/PDF duplicate, confirm it, and show that the record is counted **once**; identify a confirmed internal transfer and show that it is **not income or expense**.
4. Open the dashboard and match per-currency income, expenses, trends and category figures to the reference calculations.
5. Open the directed graph, select a supported relationship and inspect exactly the transactions behind its counts and amounts; show how ambiguous identifiers are excluded from graph linkage rather than silently merged.
6. Ask a supported analytical question in Kazakh, Russian and English; compare the answer with the gold standard, open its supporting transactions, and demonstrate clarification or limitation messages for an ambiguous query.
7. Show security tests, performance observations, and baseline comparison results alongside unresolved limitations.

The prototype meets the **formal acceptance rules from `requirements.md`** only when:

- **Every Must (M) requirement** passes **all** parts of its acceptance criterion. A requirement without an executed passing check is **unverified**, not passed.
- Each of the three **agreed** bank layouts passes its representative, manually verified extraction tests.
- Every deferred **Should (S)** requirement is identified with a reason.
- The team confirms the proposed accounting, editing, retention and performance decisions before final acceptance.

Evaluation findings on user effort and the spreadsheet baseline will be reported **in addition to** formal requirement compliance. A favourable baseline result cannot compensate for incorrect financial calculations, unauthorised data access or missing Must requirements. Conversely, the team will avoid claiming improved efficiency or usability if the collected data do not support that conclusion.

## 11. Pending Decisions and Dependencies

The following items need to be finalised before the corresponding tests can be completed:

- Select and document **one specific text-based PDF layout per bank**, along with representative, manually verified samples and an extraction library.
- Confirm supported currencies, their decimal precision, and the proposed rules for internal transfers, imported-field editing and PDF retention.
- Choose an external LLM provider/model and document its data handling and allowable request fields.
- Approve the reference test environment and performance targets already proposed in `requirements.md`.
- Prepare the gold-standard fixture set, confirm expected transaction and graph identities, and agree on the optional user-study procedure.

These are implementation and measurement dependencies, **not evidence that testing has already taken place**.

## 12. Project Document Alignment

- **Project proposal:** The aim, target users, three bank layouts, manual transactions, reviewable duplicates, currency-separated summaries, directed graph and evidence-linked chat define the evaluation objectives and demonstration.
- **Requirements specification:** FR-01–FR-18 and NFR-01–NFR-13 define the authoritative test acceptance criteria, priorities and workload boundaries. This plan does not override them.
- **Existing-system comparison:** Wallet, Spendee, Kaspi.kz and Halyk are contextual feature comparators; they are not independently benchmarked baselines.
- **Technology comparison:** The proposed Angular/FastAPI/PostgreSQL, Pandas/NetworkX, ECharts/Cytoscape.js architecture informs the unit, integration and system tests. The LLM provider and extraction library remain undecided.
- **Literature review:** Research on PDF extraction, graph modelling, financial QA, natural-language database queries and prompt-injection/privacy risks motivates correctness, reference-based answer checking and security tests.
- **Diagrams:** The supplied System Context, Use Case and draft Component Diagram identify the individual user, the external LLM boundary and the frontend, API, transaction management, analytics, graph, chat and database components to be tested. A more detailed final architectural description is not required to define this initial plan.
