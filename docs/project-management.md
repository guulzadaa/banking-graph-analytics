# Project Management and Risk Management

## Project Information

| Item | Details |
| --- | --- |
| Project title | Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant |
| Short project name | Banking Operations Analytics (FinIG) |
| Institution | Astana IT University — School of Software Engineering |
| GitHub repository | https://github.com/guulzadaa/banking-graph-analytics |
| Project management tool | [YouTrack — BOA](https://banking-graph-analytics.youtrack.cloud/projects/BOA/issues) |
| Development approach | Iterative development with academic milestone-based planning (proposed working approach) |
| Team | Gulzada Issa, Inabat Medetkyzy |
| Supervisor | Almas Myrzakhmetov |
| Current academic milestone | Pre-defense 1 — October 24, 2026 |
| Last updated | October 24, 2026 |
| Document status | Planning document; working practices, risk ratings, and later milestone dates are subject to team/supervisor confirmation |

**Source and status note.** The task snapshot in Section 3 is based on the team's YouTrack screenshot dated October 24, 2026. Project scope and acceptance expectations follow the supplied project proposal, requirements specification, and README. Items described as *planned* or *proposed* are not presented as completed or formally approved. A YouTrack issue marked **Done** records its visible workflow status; it does not independently verify that the corresponding GitHub deliverable or acceptance evidence was reviewed.

## 1. Project Management Methodology

The team proposes **iterative development with milestone-based planning**. Small, reviewable work increments will help two developers integrate a PDF-processing backend with an Angular interface, financial analytics, graph exploration, and a verifiable chat assistant. Academic milestone dates will be used to prioritize deliverables and review their completeness.

The approach follows several Scrum-inspired practices, but the provided evidence does **not** establish that formal Scrum roles, fixed sprint lengths, or recurring ceremonies have already been adopted. These details will be confirmed by the team.

The proposed principles are:

- **Incremental delivery:** First establish reliable data import and transaction handling, then build analytics, graph exploration, and chat on the same verified data foundation.
- **Prioritized backlog:** Give priority to mandatory (`M`) requirements, dependencies, risks, and academic deliverables.
- **Clear task ownership:** Keep one accountable assignee per YouTrack task and document shared work.
- **Early integration:** Agree on backend API request/response contracts before relying on them in frontend workflows.
- **Continuous verification:** Test parsing, calculation rules, permissions, and interfaces as they are implemented.
- **Reviewable changes:** Use identifiable Git branches, commits, and pull requests linked to YouTrack.
- **Milestone-based reviews:** Compare the actual repository evidence and test results with milestone acceptance conditions.

A **two-week iteration** and **weekly progress check-in** are suggested starting points, not confirmed existing team commitments. Their duration and cadence may be adjusted when academic dates and available capacity are agreed.

### 1.1 Team Roles and Responsibilities

| Role or area | Team member | Responsibilities |
| --- | --- | --- |
| Frontend, UX/UI, data visualization | Gulzada Issa | Angular and TypeScript application, page navigation, statement-upload and transaction interfaces, Apache ECharts dashboard, Cytoscape.js graph visualization, chat interface, REST API integration, frontend testing. |
| Backend, database, data processing, AI integration | Inabat Medetkyzy | FastAPI services, PostgreSQL/SQLAlchemy persistence, statement extraction and normalization, duplicate and internal-transfer handling, financial calculations, NetworkX graph data, controlled LLM API integration, data security, backend testing. |
| Scope, integration, quality and documentation | Both team members | Requirements clarification, API contract review, integration tests, technical decisions, version-controlled documentation, task planning, risk review, peer review and pre-defense preparation. |
| Academic supervision | Almas Myrzakhmetov | Review project work, provide feedback, and agree on significant revisions and academic checkpoints. Feedback is not assumed received until recorded. |

The division above describes **technical responsibility**, not a rule that every related documentation task must be assigned to the developer in that area. Actual task assignees are recorded separately in Section 3.

### 1.2 Planned Management Activities

| Activity | Proposed frequency | Purpose |
| --- | --- | --- |
| Iteration planning | At the start of each agreed iteration | Define a realistic goal, choose work items, and confirm expected outcomes. |
| Progress check-in | Weekly | Discuss completed work, blockers, pending reviews, and near-term deadlines. |
| Deliverable review | At the end of each iteration or before an academic checkpoint | Demonstrate working features or inspect documentation and evidence. |
| Process review | At the end of each iteration | Identify improvements to collaboration and estimation. |
| Backlog refinement | When requirements or dependencies change | Update priority, scope, assignee, acceptance criteria, and due dates. |
| Risk review | At least once per iteration; additionally after major changes | Reassess high-impact risks and check mitigation actions. |
| Supervisor consultation | At agreed academic checkpoints | Collect substantive feedback and record the resulting decisions. |

These are intended working practices. Completed meetings, decisions, and supervisor comments should be documented rather than inferred from the plan.

## 2. Project Management Tools

| Tool | Purpose |
| --- | --- |
| GitHub | Version control for source code, documentation, diagrams, tests, configuration examples, and reviews. |
| YouTrack (BOA) | Tracking of tasks, assignees, priorities, statuses, deadlines, dependencies, and blockers. |
| Markdown | Reviewable project documentation alongside implementation changes. |
| Git branches and commits | Trace individual contributions and connect a change to its corresponding `BOA-*` issue. |
| Pull requests | Allow a teammate to review a coherent deliverable before merging into `main`. |
| Docker (planned) | Support reproducible local services and integration testing once configured. |

### 2.1 YouTrack Task Management

The team will manage the academic and development backlog in the **BOA** project. Each meaningful task should record:

- An issue ID and unambiguous description of the expected result.
- One primary assignee, priority, and deadline.
- Verifiable acceptance criteria and links to relevant requirements, when applicable.
- Dependencies, blockers, and evidence of completion.
- A link to the relevant GitHub branch, commit, pull request, documentation, or test result.

The October 24 screenshot confirms visible statuses, assignees, and priorities but **does not show task descriptions, acceptance criteria, due dates, or dependency links**. Their configuration must be checked in the individual issues; missing fields should not be assumed solely from the screenshot.

### 2.2 GitHub Workflow and Traceability

The intended workflow follows the Git repository requirements for the diploma project:

1. Select or create a YouTrack issue for a specific, reviewable deliverable.
2. Create a branch whose name includes the issue ID; for this document, an example is `BOA-15-project-management-risks`.
3. Make coherent commits with the issue ID, for example `BOA-15: Document project management, risks and dependencies`.
4. Open a pull request that describes the changes, verification performed, and linked issue.
5. Obtain review from the other team member before merging into `main`.
6. Update the issue with the pull-request or commit link and record any required corrections.
7. Mark the task as complete only after the acceptance criteria are met.

Documentation and diagrams count as project work and should have a traceable history. Each member must use their own GitHub account. Do not commit credentials, API keys, raw personal bank statements, or identifiable financial records. Required academic submission tags are `pre-defense-1`, `pre-defense-2`, and `final-pre-defense`; create them only when the corresponding snapshot is actually submitted.

## 3. Team Responsibilities and Current Tasks

As shown in the **October 24, 2026** screenshot, YouTrack contains **17 issues: 14 Done, 1 In Progress, and 2 Open**. This includes the two parent-level planning/research items, `BOA-1` and `BOA-17`. The screenshot's Russian status labels are rendered as **Готово = Done**, **В обработке = In Progress**, and **Открыта = Open**. **Серьезная = Major** and **Обычная = Normal** denote the visible priority labels.

| Issue | Current task | Assignee | Priority | Status |
| --- | --- | --- | --- | --- |
| BOA-1 | Requirements Analysis and System Design | Gulzada Issa | Major | Done |
| BOA-3 | Prepare Project Proposal and Scope | Inabat Medetkyzy | Normal | Done |
| BOA-4 | Collect Evidence of Project Relevance | Gulzada Issa | Normal | Done |
| BOA-8 | Define Functional and Non-Functional Requirements | Inabat Medetkyzy | Normal | Done |
| BOA-9 | Create System Context Diagram | Gulzada Issa | Normal | Done |
| BOA-10 | Create Use Case Diagram | Inabat Medetkyzy | Normal | Done |
| BOA-11 | Create Draft Component Diagram | Gulzada Issa | Normal | Done |
| BOA-17 | Research and Comparative Analysis | Inabat Medetkyzy | Major | Done |
| BOA-5 | Conduct Literature Review | Gulzada Issa | Normal | Done |
| BOA-6 | Compare Existing Systems | Inabat Medetkyzy | Normal | Done |
| BOA-7 | Compare Technology Alternatives | Gulzada Issa | Normal | Done |
| BOA-12 | Design UX Prototype | Inabat Medetkyzy | Normal | Done |
| BOA-13 | Prepare Verification and Evaluation Plan | Gulzada Issa | Normal | Done |
| BOA-14 | Set Up Git Repository and Project README | Gulzada Issa | Normal | Done |
| **BOA-15** | **Document Project Risks and Dependencies** | **Inabat Medetkyzy** | **Normal** | **In Progress** |
| BOA-16 | Collect Supervisor Feedback | Inabat Medetkyzy | Normal | Open |
| BOA-2 | Bank Statement Parsing and Data Normalization | **Unassigned** | Normal | Open |

**Interpretation and follow-up.** Most visible planning tasks are marked Done in YouTrack, while the project-management document is still being worked on. Supervisor feedback remains Open, and the bank-statement parsing task has no assigned owner. The UX prototype (`BOA-12`) is assigned to Inabat although Gulzada has the primary frontend role; this is a recorded task allocation, not an error to change without discussion. The repository contents, reviews, and tests should be checked separately before claiming the deliverables meet their acceptance criteria.

### 3.1 Individual Responsibilities

**Gulzada Issa — Frontend Developer**

- Design the user interface and main workflows for statement upload, transaction review, manual entries, and navigation.
- Build the Angular frontend, responsive components, and integration with approved backend APIs.
- Present income, expenses, trends, and category breakdowns using Apache ECharts.
- Support account/counterparty graph exploration using Cytoscape.js, with source-record navigation.
- Implement the chat interface, loading/error states, and references to supporting data.
- Contribute to documentation, planning, and frontend usability/performance checks.

**Inabat Medetkyzy — Backend Developer**

- Define backend modules, data models, authentication/authorization boundaries, and API contracts.
- Extract and normalize transactions from the agreed Kaspi, Halyk, and Freedom text-based PDF layouts.
- Manage import validation, manual records, duplicate decisions, and internal-transfer classification.
- Calculate currency-separated summaries using precise decimal arithmetic.
- Produce graph nodes/edges only from sufficiently identified entities and provide supporting transactions.
- Integrate a restricted, read-only, calculation-backed chat assistant and apply AI-data minimization.
- Contribute to backend security, data integrity, integration, and verification tests.

**Shared responsibilities** include keeping the backlog aligned with scope, identifying incomplete work, agreeing on implementation decisions, reviewing each other's changes, documenting risks, and preparing academic submissions. Issue ownership may be adjusted by team agreement, but changes must be reflected in YouTrack.

## 4. Project Repository Structure

The following is the **structure described in the supplied README**. It represents the planned organization; the README alone does not prove every directory already exists in GitHub.

```text
banking-graph-analytics/
├── backend/               # FastAPI services, persistence, analytics, and LLM integration
├── frontend/              # Angular application and visualizations
├── tests/                 # Cross-component fixtures, integration and end-to-end tests
├── docs/                  # Proposal, requirements, comparisons, and project management
├── diagrams/              # Editable architectural diagrams and readable exports
└── README.md              # Project overview and repository navigation
```

The project also needs suitable `.gitignore` rules and safe configuration examples. Directory contents should be organized as the implementation grows; no folder should be described as populated unless it exists. The project-management document is **intended** for `docs/project-management.md`. Keeping it in the repository is a manual team action, not an action performed by preparing this file.

Relevant documentation includes the project proposal, literature review, system and technology comparisons, requirements specification, design diagrams, UX prototype materials, and verification plan. The README should link to the YouTrack project and these deliverables as they become available.

## 5. Project Milestones and Timeline

The project will follow academic checkpoints and technical dependencies. **Only the first pre-defense date is established in the supplied requirements; later dates and phase durations are not confirmed.** Accordingly, the phases below show order and expected results, not an approved university calendar.

| Milestone | Target | Main deliverables and review conditions | Status |
| --- | --- | --- | --- |
| **M1 — Pre-defense 1: Planning and Design Baseline** | **October 24, 2026** | README, project proposal, relevance evidence, critical literature review, system and technology comparisons, requirements with acceptance criteria, system-context/use-case/draft-component diagrams, UX prototype, evaluation plan, project management and risks, assigned tasks, version-controlled contributions. | Planning tasks mostly marked Done in YouTrack; BOA-15 In Progress, BOA-16 Open; repository evidence and supervisor feedback not independently verified. |
| **M2 — Architecture and Data Foundation** | After Pre-defense 1; date TBD | Confirm data model, supported PDF samples, FastAPI contracts, authentication boundaries, parser approach, fixture data, and development setup. | Planned |
| **M3 — Core Transactions and Financial Dashboard** | Date TBD | PDF import and validation, manual entry, duplicate review, internal transfers, searchable transaction table, per-currency summaries, and frontend/backend integration. | Planned |
| **M4 — Graph Analytics and Intelligent Chat** | Date TBD | Directed graph of identifiable entities, interactive exploration, traceable transactions, read-only calculation-backed chat, and supported three-language scenarios. | Planned |
| **M5 — Integration, Security, and Evaluation** | Date TBD | Functional and non-functional tests, security/privacy checks, verified calculations and graph results, representative bank-layout tests, performance, usability, and regression evidence. | Planned |
| **M6 — Final Documentation and Defense** | According to official academic schedule; TBD | Reproducible run/test instructions, final results and limitations, supervisor-feedback resolutions, presentation, demo, and required submission tag. | Planned |

An academic milestone is not considered fully accepted merely because its associated YouTrack issues are marked Done. Deliverables must be accessible, traceable, and reviewed against the relevant criteria.

### 5.1 Immediate Priorities for Pre-defense 1

As of the provided snapshot, the next actions are to:

1. Complete and review **BOA-15** project management, risks, and dependencies documentation.
2. Record feedback and revision decisions under **BOA-16** when supervisor feedback is actually received.
3. Check that the items marked Done (`BOA-3` through `BOA-14`, where applicable) have corresponding repository files, links, and acceptance evidence.
4. Confirm that required diagram sources, exported diagrams, prototype material, and the verification plan are accessible from GitHub.
5. Confirm owner, next deliverable, and scope for **BOA-2** before implementation planning.
6. Review due dates and acceptance criteria in YouTrack; the overview screenshot does not establish their values.
7. Preserve reviewed changes in the repository and create the `pre-defense-1` Git tag only for the version actually submitted.

## 6. Product Backlog and Iteration Planning

The initial YouTrack list emphasizes pre-defense planning and research. More detailed development tasks should be added when the technical design and the next academic schedule are agreed.

| Backlog area | Planned work | Related requirements / issues |
| --- | --- | --- |
| Research and planning | Proposal, user relevance, literature review, existing-system and technology comparisons, project risks. | BOA-3–BOA-7, BOA-15, BOA-17 |
| Requirements and architecture | Functional/non-functional requirements, system context, use cases, component design, UX prototype. | BOA-1, BOA-8–BOA-12 |
| Statement import and data model | Account/wallet records, supported text-based PDF parsing, validation, normalization, source tracking, safe failure behavior. | BOA-2; FR-02, FR-05–FR-07, NFR-03, NFR-09 |
| Transactions and reconciliation | Manual CRUD, categories, duplicate review, classification, internal-transfer pairing. | FR-03, FR-04, FR-09, FR-12 |
| Financial dashboard | Unified filtering/search and exact currency-separated summaries with trends and breakdowns. | FR-10, FR-11, NFR-05, NFR-07 |
| Graph analytics | Entity-identification rules, NetworkX graph data, Cytoscape.js visualization and supporting-record links. | FR-13, FR-14 |
| Intelligent chat | Restricted LLM interface, approved backend functions, source references, limitations, multilingual questions. | FR-15–FR-18, NFR-04, NFR-08 |
| Integration and evaluation | Security, parser correctness, numeric consistency, browser usability, performance, and documented acceptance results. | BOA-13; NFR-01–NFR-13 |
| Academic delivery | README/documentation updates, supervisor feedback, releases, submission and defense. | BOA-14, BOA-16 |

### 6.1 Iteration Planning Procedure

At each planning checkpoint, the team intends to:

1. Review outstanding YouTrack issues and the next academic deadline.
2. Check prerequisites and unfinished integration work.
3. Select a manageable amount of work for the two-person team.
4. Specify one demonstrable goal for the iteration.
5. Confirm an owner, acceptance criteria, and due date for each selected item.
6. Agree on frontend/backend interface changes and test data needs.
7. Update risk actions and document newly discovered blockers.

Changes to the scope or timeline should be discussed by the team and, when significant, with the supervisor. Incomplete work remains visible rather than being silently marked Done.

### 6.2 Definition of Done

An issue is ready for completion when:

- Its stated result exists and meets its acceptance criteria.
- Relevant code, documentation, and diagrams are accessible and version-controlled.
- Applicable tests or document checks have passed and evidence is recorded.
- A task-related branch/commit/pull request links back to the `BOA-*` issue.
- The other team member has reviewed changes before merge, where required.
- Required documentation and YouTrack status/links have been updated.
- Open limitations or follow-up tasks are documented rather than hidden.

For academic research/documentation tasks, checks include the relevance of sources, traceability of claims, internal consistency, and alignment with the project's defined scope. A planning document does not demonstrate that the software itself has been implemented.

## 7. Risk Management

Risks will be recorded, prioritized, assigned to a proposed monitoring owner, and revisited at planned checkpoints. The values below are **initial qualitative planning estimates**, not historical measurements or formal ratings approved by the team.

### 7.1 Risk Assessment Method

Rate **likelihood (L)** and **impact (I)** from 1 (very low) to 5 (very high). Use **Risk score = L × I**.

| Score | Level | Planned response |
| --- | --- | --- |
| 1–4 | Low | Monitor during regular reviews. |
| 5–9 | Moderate | Assign preventative measures and revisit periodically. |
| 10–16 | High | Prioritize mitigation and monitor closely. |
| 17–25 | Critical | Act promptly; escalate major scope, quality, privacy, or deadline issues. |

### 7.2 Risk Register

All ratings and owners below are **proposed for team confirmation**.

| ID | Risk | L | I | Score / level | Mitigation / response | Proposed owner |
| --- | --- | ---: | ---: | --- | --- | --- |
| R1 | Kaspi, Halyk, or Freedom PDF formats differ from selected layouts or contain ambiguous values. | 4 | 5 | 20 / Critical | Limit initial support to one agreed text-based layout per bank; build manually verified reference fixtures; reject unsupported layouts and report uncertainty rather than guessing. | Inabat |
| R2 | Overlapping imports and manual records cause duplicate counting or mistaken merges. | 4 | 5 | 20 / Critical | Require explicit user confirmation of duplicates; support reversal; test repeated imports and manual/PDF overlaps; distinguish duplicates from internal transfers. | Inabat |
| R3 | Incorrect calculations or mixing currencies distort financial summaries and chat results. | 3 | 5 | 15 / High | Use exact decimal calculations; never automatically combine different currencies; apply consistent duplicate/transfer rules and reference calculations. | Inabat |
| R4 | Incomplete identifiers or similar names create false graph relationships. | 4 | 4 | 16 / High | Document identity rules; do not merge counterparties by name alone; exclude unsupported links, show excluded counts, and retain supporting records. | Inabat; Gulzada for UI |
| R5 | The LLM invents values, claims unverified patterns, or fails to cite underlying records. | 3 | 5 | 15 / High | Restrict to predefined read-only analytical functions; derive numbers in the backend; attach transaction/graph evidence; test limitations and clarification behavior. | Inabat |
| R6 | Sensitive financial data, account identifiers, uploaded PDFs, or credentials are disclosed. | 3 | 5 | 15 / High | Enforce per-user authorization, safe upload handling, private storage, permitted-data allowlists for the external LLM, and synthetic/anonymized tests; do not commit secrets. | Both |
| R7 | Frontend and backend API contracts diverge and delay integration. | 4 | 4 | 16 / High | Agree on endpoints, response schemas and error states early; use documented examples/mock data; integrate by workflow and test continuously. | Both |
| R8 | Required features exceed the capacity of a two-person team or the academic timeline. | 4 | 4 | 16 / High | Prioritize Must requirements and selected PDF layouts; time-box uncertain work; document deferral of Should features; re-plan at milestones. | Both |
| R9 | Suitable privacy-safe bank statement samples are unavailable for meaningful validation. | 4 | 4 | 16 / High | Seek permitted redacted examples; build documented synthetic fixtures; report any parser layout that lacks adequate validation evidence. | Inabat |
| R10 | LLM API costs, limits, downtime, or latency reduce availability of chat. | 3 | 3 | 9 / Moderate | Select a provider after evaluating constraints, protect credentials, use bounded requests, show retryable errors, and keep ordinary analytics available. | Inabat |
| R11 | Large or complicated graphs are slow or hard to navigate in supported browsers. | 3 | 3 | 9 / Moderate | Filter or limit graph views; test responsiveness and browser behavior with documented reference data; show when records or edges are omitted. | Gulzada |
| R12 | User requirements remain weakly validated with target users. | 4 | 3 | 12 / High | Conduct and record user discussions; distinguish confirmed needs from assumptions; revise requirements when evidence warrants. | Both |
| R13 | Project artifacts, issue links, or reviewer feedback are insufficiently traceable for assessment. | 3 | 4 | 12 / High | Keep repository documents and task references current; link PRs to issues; preserve individual contributions; log review outcomes and outstanding revisions. | Both |
| R14 | Supervisor feedback leads to late changes in scope or previously accepted artifacts. | 3 | 4 | 12 / High | Request review at checkpoints; document feedback under BOA-16 and create prioritized revision tasks with responsible owners. | Both |

### 7.3 Risk Monitoring

At each review, update the likelihood, impact, monitoring owner, mitigation progress, and response decision for high or critical risks. If a risk materializes, record the actual issue/blocker in YouTrack and link it to the impacted feature or academic milestone. Escalate unresolved risks involving financial correctness, sensitive data, required bank-layout support, or deadlines to the supervisor. A mitigation should be considered effective only after there is evidence (such as validated fixtures, security tests, or a reviewed API contract).

## 8. Task Dependencies

The following are **logical dependencies proposed for planning**, not a claim that corresponding YouTrack dependency links are already configured. Add `depends on` links for genuine blockers; use descriptions or related-issue links for non-blocking relationships. Some activities may proceed in parallel once their assumptions are defined.

### 8.1 Planning and Design Dependencies

| Dependent task | Depends on / input from | Reason |
| --- | --- | --- |
| BOA-8 — Functional and Non-Functional Requirements | BOA-3 proposal/scope and BOA-4 relevance findings | Requirements should reflect agreed scope and validated or explicitly provisional user needs. |
| BOA-9 — System Context Diagram | BOA-3 and BOA-8 | Actors, external systems, and system boundaries depend on the proposed scope and requirements. |
| BOA-10 — Use Case Diagram | BOA-8 | User scenarios should represent the agreed functional requirements. |
| BOA-11 — Draft Component Diagram | BOA-7 technology comparison and BOA-8 requirements | Components should match functional boundaries and selected technology decisions. |
| BOA-12 — UX Prototype | BOA-8 and BOA-10 | Screens and flows should support required tasks and documented user scenarios. |
| BOA-13 — Verification and Evaluation Plan | BOA-8 and BOA-3 | Evaluation measures and acceptance checks should follow requirements and project objectives. |
| BOA-15 — Risks and Dependencies | BOA-3, BOA-8, current BOA backlog and milestones | The management plan must reflect the actual project's tasks, scope, and constraints. |
| BOA-16 — Supervisor Feedback | Available documentation and meaningful supervisor review | Revisions cannot be considered addressed without recorded comments and decisions. |
| BOA-2 — Bank Statement Parsing and Data Normalization | Selected bank statement samples, data-model decisions, acceptance fixtures (work not yet individually assigned) | Parser behavior cannot be reliably implemented or verified without defined layouts and expected output. |

The first eight entries relate to tasks already marked Done or In Progress, but this table **does not imply** that dependency links were created before the work. It documents the relationships to verify and maintain as changes occur.

### 8.2 Implementation Dependencies

1. **Authentication and access rules → protected datasets and operations.** Users must be restricted to their own accounts, imports, transactions, graphs, and chat queries (FR-01, NFR-01).
2. **Agreed PDF layouts and data model → import and normalization.** Reference examples are needed to verify dates, amounts, currency, direction, and provenance (FR-05–FR-07).
3. **Consistent transaction model → manual entry and combined table.** Imported and manual records must support unified search, filters, and source labels (FR-03, FR-07, FR-10).
4. **Duplicate review and transfer classification → trustworthy summaries.** Confirmed duplicates count once; separately confirmed own-account transfers are excluded from income/expenses but remain visible as movements (FR-09, FR-11, FR-12).
5. **Reliable financial calculations → dashboard and chat answers.** Both interfaces should use the same backend rules and preserve currency separation (FR-11, FR-15, NFR-05).
6. **Counterparty identity rules and validated records → graph construction.** Only supported links become graph edges; the interface must show supporting records and omissions (FR-13, FR-14).
7. **Graph endpoints and frontend visualization → chat graph references.** Chat evidence can highlight only actual, supported graph connections (FR-14, FR-16).
8. **Defined backend analytical functions and privacy boundaries → LLM integration.** The assistant must remain read-only, avoid leaking private data, and handle unsupported requests (FR-15–FR-18, NFR-04).
9. **Integrated workflows → end-to-end evaluation.** Validation requires representative sample data, browser-based workflows, security checks, and measured performance (Section 4 of the requirements specification).

Future implementation tasks will be added to YouTrack and connected to these dependencies as they are defined. The high-level relationships are not substitutes for task-specific acceptance criteria.

## 9. Quality Assurance and Evaluation

Quality assurance is part of development, not only a final milestone. The existing **BOA-13** verification/evaluation-plan task is marked Done in YouTrack, while execution evidence for the future implementation is not established by the task screenshot.

### 9.1 Software Quality

Planned checks include:

- **Import correctness:** Compare extracted rows, dates, amounts, directions, currencies, and descriptions with manually verified fixtures for each supported PDF layout; test unsupported/image-only/encrypted PDFs and safe failure.
- **Transactions and calculations:** Test manual entries, categories, duplicate reversals, internal-transfer pairing, exact arithmetic, and separated currency totals.
- **API, authentication, and security:** Test unauthenticated access, cross-user record access, file handling, protected secrets, and read-only chat operations.
- **UI and integration:** Test transaction search and filters, dashboard trends, graph exploration, supporting-record navigation, and clear loading/error states.
- **Regression and reliability:** Retest calculated results after editing records or reversing duplicate/transfer decisions; verify retry behavior after import failures.
- **Performance and usability:** Assess the thresholds documented in `requirements.md` under the specified reference conditions, not by unsupported estimates.

Evidence should record requirement ID, fixture or test input, expected result, actual result, pass/fail status, environment, and tested commit. No unperformed tests should be represented as passed.

### 9.2 Banking Analytics, Graph, and Chat Evaluation

The evaluation will emphasize correctness and traceability rather than only the appearance of the interface:

- Use reference transaction datasets to compare financial summary totals and category breakdowns.
- Confirm that currency totals are separate and that only confirmed duplicates are de-duplicated.
- Verify graph node/edge identity, direction, counts, transferred amounts, exclusions, and links to source transactions.
- Test the **seven specified chat scenarios** in **Kazakh, Russian, and English** (at least **21 supported test questions**) against known backend-calculated answers and supporting records.
- Test missing/ambiguous data, unsupported questions, outdated answers, external provider failure, and attempts to manipulate the assistant through transaction descriptions.
- Distinguish verified prototype behavior from any broader claims about automatic financial interpretation or real-world deployment.

### 9.3 Privacy and Data Protection

Financial statements and transaction histories are sensitive. Testing will use **synthetic or anonymized data** where possible. The planned safeguards include per-user access checks, secure credentials, protected temporary PDF storage, the proposed 24-hour temporary-file removal rule, data minimization for external LLM requests, and a clear notice about external processing. These requirements must be tested before claiming the safeguards are implemented.

## 10. Communication and Collaboration

The two-person team will use YouTrack for visible task progress and GitHub for versioned code and reviewable documentation.

The team intends to:

- Update issues when an assignee, status, deadline, priority, or blocker changes.
- Communicate frontend/backend interface changes before dependent work proceeds.
- Record decisions on supported bank layouts, entity identification, duplicate behavior, and chat privacy.
- Keep supervisor feedback and resulting revisions linked to **BOA-16** or related follow-up tasks.
- Review each other's pull requests and document changes requested during review.
- Surface high-impact risks and scope concerns at the next planning or supervision checkpoint.

A blocked task should state the blocker, the affected dependency, the person responsible for the next action, and any effect on the milestone. The plan does not claim specific meetings or messages have already occurred.

## 11. Traceability and Progress Reporting

The project will trace work through the following sequence:

**Requirement → YouTrack issue → GitHub change/document → Review or verification evidence → Academic milestone.**

Two examples of the *intended* traceability model:

- **Documentation:** `BOA-15` → `docs/project-management.md` → branch/PR with `BOA-15` → teammate's review → pre-defense planning deliverable.
- **Implementation:** `FR-05` (statement import) → `BOA-2` or a refined implementation task → parser module and reference tests → results for each supported bank layout → data-foundation milestone.

The examples specify a workflow; they do not assert that branches, PRs, or test runs already exist. Progress reporting should cover both **work-item status** and **evidence of meeting the requirement**.

The visible issue baseline on October 24, 2026 is:

| Metric | Current screenshot value | Interpretation |
| --- | ---: | --- |
| Total issues | 17 | Includes BOA-1 and BOA-17 parent-level items. |
| Done | 14 | Workflow status only; linked deliverables must be checked. |
| In Progress | 1 | BOA-15 — risk and dependency documentation. |
| Open | 2 | BOA-16 — supervisor feedback; BOA-2 — statement parsing. |
| Unassigned | 1 | BOA-2, as shown in the overview. |

At each checkpoint, compare the planned milestone with submitted documents, tests, reviews, and unresolved limitations. Avoid using the raw issue-completion count alone as a measure of system readiness.

## 12. Next Steps

### 12.1 For Pre-defense 1 — October 24, 2026

1. Review and complete this project-management/risk document as the deliverable for **BOA-15**.
2. Add the reviewed document to the agreed documentation location in GitHub, using the appropriate `BOA-15` task branch and pull request.
3. Link the resulting PR/commit to BOA-15 and update the issue only after its acceptance criteria are satisfied.
4. Verify that the proposal, literature review, evidence of relevance, comparisons, requirements, diagrams, prototype materials, evaluation plan, and README are actually available for inspection.
5. Confirm that diagram source files are editable and that exports are readable.
6. Record the current state of supervisor feedback under **BOA-16** without claiming that feedback has been received if it has not.
7. Agree on an accountable owner for **BOA-2**, which currently appears unassigned.
8. Verify task due dates, review evidence, and GitHub-to-YouTrack traceability; correct only confirmed gaps.
9. Preserve the exact submitted version with the required Git tag when the milestone submission occurs.

### 12.2 After Pre-defense 1

1. Record committee/supervisor comments and turn required corrections into assigned YouTrack tasks.
2. Confirm the dates and acceptance gates for the remaining academic milestones.
3. Agree on iteration/check-in cadence and refine the development backlog for the two-person team.
4. Confirm bank statement sample layouts, permissible test fixtures, data model, and API contracts.
5. Begin and verify the import/normalization foundation before depending on its results for charts, graph analytics, or chat.
6. Implement transaction management, duplicate review, transfer rules, and financial calculations incrementally.
7. Integrate graph exploration and supported evidence-backed chat questions with the same trusted data model.
8. Continue security, performance, regression, and acceptance testing as development progresses.
9. Update this document if decisions, risk scores, deadlines, or the actual YouTrack state change.

## 13. Project Management Success Criteria

The project-management approach will be considered effective if:

- The team has a traceable, version-controlled repository and a maintained YouTrack backlog.
- Academic deliverables have clear milestones, owners, and acceptance conditions.
- All meaningful tasks have an assignee, priority, deadline, and expected outcome.
- Important task dependencies and blockers are visible and acted on.
- Every submitted code/documentation change can be traced to a `BOA-*` task and an appropriate review.
- Mandatory requirements can be traced to verification evidence, not just feature descriptions.
- Critical and high risks have agreed owners, mitigations, and review decisions.
- Supervisor comments and team responses are documented when received.
- The team can demonstrate individual contributions, current limitations, and the next concrete steps.
- Final quality claims are supported by recorded tests and evaluation results.

## Conclusion

An iterative, milestone-based management approach gives the FinIG team a practical way to coordinate research, design, engineering, and academic deliverables. The **October 24, 2026** YouTrack snapshot records substantial progress in planning: **14 of 17 issues are marked Done**, while **BOA-15** is In Progress and **BOA-16** and **BOA-2** remain Open. This is a tracking baseline, not proof that the intended system has been built or evaluated.

YouTrack will make priorities, responsibilities, dependencies, and next steps visible. GitHub will preserve individual contributions, reviews, and documentation changes. Risk reviews and requirement-based verification will support reliable PDF ingestion, accurate transaction calculations, defensible graph connections, protected financial data, and an intelligent assistant whose answers users can inspect. The team will revise this plan when milestone dates, technical decisions, supervisor feedback, and verified project evidence become available.
