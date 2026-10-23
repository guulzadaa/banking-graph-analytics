# Requirements Specification

**Project:** Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant

## 1. Purpose and Scope

This document defines the service's functional and non-functional requirements, priorities, and acceptance criteria.

The service will combine transactions imported from supported Kaspi, Halyk, and Freedom PDF statements with manually entered transactions. It will provide a transaction table, financial summaries, graph analytics, and an intelligent chat assistant.

The initial version will support one agreed text-based PDF layout per bank. Requirements are based on the project proposal and team discussions. Validation with potential users is pending.

### 1.1. Requirement Format

| Field | Meaning |
| --- | --- |
| ID | Unique identifier: FR for functional requirements and NFR for non-functional requirements. |
| Priority | M — Must: required for the initial prototype. S — Should: desirable but may be deferred with a documented reason. |
| Acceptance Criterion | An observable condition used to determine whether the requirement is fulfilled. |
| Verify | T — functional test; P — performance test; S — security test; I — inspection of the interface, code, configuration, or logs. |

A mandatory requirement is fulfilled only when all parts of its acceptance criterion pass. The checks described here are planned verification activities, not completed results.

### 1.2. Users and Access

Visitors can register or sign in. Authenticated users can manage and analyse only their own accounts, wallets, transactions, categories, and imported statements.

### 1.3. Decisions to Confirm

The following implementation rules are proposed for team agreement:

- Confirmed transfers between the user's own accounts or wallets are excluded from income and expenses.
- Original imported financial values remain unchanged; categories, transaction classification, and separate notes can be edited.
- Complete import deletion is an optional feature.
- Temporary PDFs are deleted within 24 hours after successful or failed processing.
- Performance targets and optional interface localisation follow Section 3.

## 2. Functional Requirements

### 2.1. Authentication and Manual Transactions

| ID | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- |
| FR-01 | Users can register, sign in, and sign out using email/password or Google. | M | Valid authentication opens the user's workspace. Invalid credentials or cancelled Google authentication do not grant access. Logout invalidates the session. Accounts are not automatically linked solely because their email addresses match. | T |
| FR-02 | Users can create bank accounts and cash wallets. | M | Users can save an account or wallet with a name, type, and supported currency. Transactions can be assigned only to their own accounts or wallets. Currency cannot be changed after transactions have been added. | T |
| FR-03 | Users can add, edit, and delete manual transactions. | M | Valid records contain a date, direction, positive amount, currency, and account or wallet. Missing required fields, unsupported currencies, and invalid amounts are rejected. Confirmed edits and deletions update subsequent analytical results. | T |
| FR-04 | Users can assign categories and create personal categories. | M | Users can create and assign categories to their own manual and imported transactions. Unassigned records display "Uncategorised". Category changes update category summaries. | T |

### 2.2. PDF Import and Duplicate Review

| ID | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- |
| FR-05 | Users can import the agreed PDF layouts from Kaspi, Halyk, and Freedom. | M | For each layout, extracted transaction counts, dates, amounts, currencies, directions, and descriptions match manually verified reference data after documented normalisation. Headers, balances, and statement totals are excluded. Currency and direction may be derived from explicit statement information; ambiguous required values are reported rather than guessed. | T |
| FR-06 | The system validates uploads and explains import failures. | M | Non-PDF files, image-only PDFs, password-protected files, unsupported layouts, and files exceeding documented limits are rejected with a clear reason. Detected extraction errors prevent import completion. Failed imports leave no partially saved batch. | T |
| FR-07 | The system identifies record sources and preserves imported financial values. | M | Each record displays "PDF import" or "Manual entry". Imported records retain an import ID and page or row reference. Under the proposed editing rule, original dates, amounts, currencies, and directions remain unchanged; categories, classification, and separate notes can be edited. | T, I |
| FR-08 | Users can delete a complete import. | S | Confirmation removes the selected import's records and recalculates affected results and duplicate or transfer relationships. Unrelated imports and manual records remain. Cancellation changes nothing. | T |
| FR-09 | Users can review potential duplicate transactions. | M | Reference tests cover repeated imports, overlapping statements, and matching manual/PDF records. Matching dates and amounts alone never causes automatic merging. Users can confirm "same transaction" or "separate transactions" and reverse the decision. Confirmed duplicates count once across calculations. Unreviewed candidates remain separate, with a warning in affected analytical views and chat answers. | T |

### 2.3. Transaction Table and Financial Summaries

| ID | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- |
| FR-10 | Users can search, sort, and filter transactions. | M | Filters by date, bank, account or wallet, direction, category, currency, source, and available counterparty return the expected reference records. Description and counterparty searches, combined filters, and sorting by date or amount work correctly. | T |
| FR-11 | Users can view financial summaries and trends. | M | Incoming/outgoing totals, income/expense totals, transaction counts, monthly trends, and category and identifiable-counterparty breakdowns match reference calculations for the selected period and accounts. Results are separated by currency. Empty results and unclassified movements are clearly identified. | T |
| FR-12 | Users can classify transactions and identify internal transfers. | M | Users can assign and correct income, expense, or internal-transfer classification. Under the proposed rule, confirmed internal transfers remain visible as account movements but are excluded from income and expenses. Pairing requires user confirmation, equal amounts in the same currency, opposite directions, and different user-owned accounts or wallets. Each entry can belong to only one active pair. Users can undo pairing. Missing counterpart entries remain labelled as unpaired; no record is fabricated. Fees remain separate expenses. | T |

**Calculation rules:**

- Incoming and outgoing totals describe recorded account movements.
- Income and expense totals exclude confirmed internal transfers. Unclassified movements are shown separately.
- Transaction classification is separate from spending categories such as food or transport.
- Manual income and expense entries receive their classification from the entry form.
- Monetary calculations use exact decimal arithmetic. Supported currencies and their decimal precision are documented before acceptance testing.
- Different currencies are never added together or automatically converted.
- Automatic pairing of transfers in different currencies is not required.
- Confirmed duplicates count once. The two sides of an internal transfer are linked account movements, not duplicate records.
- Transaction-table counts refer to account movements after duplicate resolution. Graph transfer counts treat a confirmed pair as one transfer. The interface labels these counts accordingly.
- Changes to transactions or review decisions affect subsequent calculations across all interfaces.

### 2.4. Graph Analytics

| ID | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- |
| FR-13 | The system builds a directed graph of identifiable accounts and counterparties. | M | Documented identity rules produce the expected nodes and edges in reference tests. Edge direction follows the recorded transfer. Names or masked identifiers alone do not merge entities. Ambiguous records remain in the table and financial summaries without unsupported connections. User-provided relationships are labelled. | T, I |
| FR-14 | Users can explore graph connections and supporting transactions. | M | Users can filter by period, account, and currency and select nodes or edges. Displayed amounts, counts, and supporting records match reference results. Confirmed duplicates count once, and paired internal-transfer entries represent one transfer. The interface reports how many records were excluded because identifiers were insufficient. | T |

The initial graph supports direct recorded connections. It does not infer missing transactions or prove that the same funds moved through several accounts.

### 2.5. Intelligent Chat Assistant

| ID | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- |
| FR-15 | The assistant answers supported questions using backend calculations. | M | Answers to the scenarios in Section 2.6 use only the authenticated user's data. Numerical results match reference calculations and state the applied period and currency where applicable. The assistant uses predefined read-only functions and cannot execute arbitrary database commands or modify transactions. | T, I |
| FR-16 | Users can inspect the records and graph connections supporting an answer. | M | Selecting a reference opens the exact supporting transaction set or highlights supported graph connections. Navigation happens only at the user's request. If the dataset changes, earlier answers are marked as outdated and recalculation is offered before presenting current supporting evidence. | T |
| FR-17 | The assistant explains missing information, ambiguity, and unsupported requests. | M | Ambiguous questions receive clarification requests. Missing data, unsupported questions, and provider failures receive limitation messages without invented results. An empty query result is distinguished from unavailable data, and answers refer to the recorded dataset rather than claiming a complete financial history. | T |
| FR-18 | The assistant supports Kazakh, Russian, and English. | M | Equivalent test questions in all three languages return the same calculated values and supporting records. Explanations use the requested language. | T |

### 2.6. Supported Chat Scenarios

| Scenario | Example Question | Expected Result |
| --- | --- | --- |
| Expense summary | "How much did I spend in September 2026 in KZT?" | Expense total and supporting records, excluding confirmed internal transfers. |
| Income summary | "What was my income in September 2026 in KZT?" | Income total and supporting records. |
| Category analysis | "Which category had the highest expenses in September 2026 in KZT?" | Category and amount, including ties. |
| Transaction search | "Show outgoing transactions above 20,000 KZT in September 2026." | Records matching all specified conditions. |
| Counterparty analysis | "How much did I transfer to this counterparty in September 2026 in KZT?" | Amount, count, and supporting records for the identified counterparty. |
| Frequent counterparties | "Who received the most transfers from me in September 2026?" | Identifiable counterparties ranked by transfer count, including ties and a note about excluded unidentified records. |
| Graph exploration | "Show this account's direct connections in September 2026 in KZT." | Relevant connections and supporting transactions. |

The assistant asks for clarification when a required account, counterparty, period, or currency cannot be determined.

## 3. Non-Functional Requirements

The numerical limits below are proposed acceptance targets, not measured results.

**Reference test environment:** one application instance and database, at least 4 logical CPU cores and 8 GB RAM, one active user, and up to 10,000 transactions. Exact hardware, software versions, and network conditions will be recorded.

**Proposed workload limits:** up to 10 MB, 20 pages, and 1,000 transactions per PDF; up to 200 nodes and 500 edges in a displayed graph.

| ID | Category | Requirement | Priority | Acceptance Criterion | Verify |
| --- | --- | --- | --- | --- | --- |
| NFR-01 | Access control | Users can access only their own data. | M | Requests using another user's record IDs are denied for reading, editing, deletion, financial analysis, graph queries, and chat. Unauthenticated requests are denied. No foreign data is returned. | T, S |
| NFR-02 | Security | Authentication and application secrets are protected. | M | Passwords are stored using a maintained password-hashing mechanism. Invalid or expired sessions are rejected. Passwords and API keys are absent from repository files, client code, and logs. Hosted deployments use HTTPS. | T, S, I |
| NFR-03 | File protection | Uploaded PDFs remain private and are removed after processing. | M | Files use server-generated storage names outside public access. Filename traversal attempts fail. Under the proposed retention rule, temporary PDFs are deleted within 24 hours after successful or failed processing. | T, S, I |
| NFR-04 | AI privacy | Only necessary information is sent to the external AI provider. | M | A documented field allowlist exists for each analytical function. Captured test requests contain only allowed fields and exclude raw PDFs, credentials, and full bank account identifiers. Users see an external-processing notice before first use. | T, I |
| NFR-05 | Accuracy | Financial results remain correct and consistent. | M | Exact decimal calculations match manually verified results at the documented currency precision. Edits, duplicate decisions, and transfer classification produce consistent subsequent table, dashboard, graph, and chat results under their stated counting rules. | T |
| NFR-06 | Import performance | Supported PDFs are processed within the agreed time. | M | In five runs per layout, each PDF within the stated workload finishes within 30 seconds, measured from upload completion until the import result is displayed. | P |
| NFR-07 | Interface performance | Tables, summaries, and graphs respond within the agreed time. | M | At least 19 of 20 actions per view display results within 2 seconds for the table/dashboard and 5 seconds for the graph under the reference workload. Time runs from user action until display. Larger graphs require filtering or explicitly report omitted results. | P |
| NFR-08 | Chat reliability | Provider failures do not block the rest of the service. | M | A progress indicator appears during processing. A simulated provider timeout shows an error and retry option within 30 seconds. Tables and summaries remain usable. | T |
| NFR-09 | Import reliability | Failed or retried imports do not corrupt the dataset. | M | A simulated processing failure leaves no partial batch. Retrying the same request does not create another batch. A deliberate new upload invokes duplicate review. | T |
| NFR-10 | Desktop usability | Main workflows work in supported desktop browsers. | M | Login, import, manual entry, filtering, dashboard, graph, and chat pass tests in documented Chrome and Firefox versions at 1366 × 768. Forms have labels, keyboard access, and field-specific errors. Errors are not conveyed through colour alone. | T, I |
| NFR-11 | Mobile support | Basic workflows work in a phone browser. | S | At 390 × 844, users can log in, add manual records, view summaries, and use chat without inaccessible controls. Tables may scroll horizontally. Full mobile graph interaction is optional. | T |
| NFR-12 | Localisation | The interface supports three languages. | S | Main navigation, forms, and validation messages are available in Kazakh, Russian, and English. Switching language preserves entered form data and selected filters. | T, I |
| NFR-13 | Reproducibility | Another team member can run and test the application. | M | Repository instructions allow the other student to install dependencies, configure placeholders, start the application, and run tests using synthetic or anonymised data. | T, I |

## 4. Verification and Acceptance

Each requirement will be linked to a test record containing:

- Requirement ID and test input.
- Expected and actual results.
- Pass/fail status and supporting evidence.
- Tested commit, fixture version, and relevant environment details.

| Test Area | Required Coverage |
| --- | --- |
| Authentication and access | Both login methods, logout, invalid sessions, unauthenticated requests, and attempts to access another user's data. |
| PDF import | At least two manually verified PDFs per supported layout, plus unsupported, image-only, malformed, password-protected, and oversized files. |
| Transaction management | Manual entry, validation, editing, deletion, accounts, categories, classification, and source identification. |
| Duplicate handling | Repeated imports, manual/PDF overlaps, similar but distinct transactions, unresolved candidates, and reversed decisions. |
| Financial summaries | Multiple currencies, empty periods, category totals, internal transfers, unpaired movements, unclassified records, and fees. |
| Graph analytics | Expected nodes and edges, ambiguous names, masked identifiers, user-provided relationships, filters, amounts, and counts. |
| Chat assistant | Seven scenarios in three languages, correct supporting records, graph references, outdated answers, and failure handling. |
| Non-functional requirements | Security, file cleanup, response times, import failures, browser compatibility, and reproducible setup. |

The chat test set will contain at least 21 supported questions: seven scenarios in each of the three languages. Every calculated value and supporting record set must match its reference result; wording may vary.

Additional tests will cover missing data, ambiguous questions, unauthorised access, provider failures, and instructions inside transaction descriptions that attempt to override the assistant's behaviour.

The prototype is accepted when:

1. All M requirements pass their acceptance criteria.
2. Each supported bank layout passes extraction tests using representative text-based PDFs.
3. Deferred S requirements are documented with reasons.
4. The team has agreed on the proposed decisions and performance targets.

Requirements without completed checks remain unverified. A bank layout is not considered supported merely because its parser has been implemented.
