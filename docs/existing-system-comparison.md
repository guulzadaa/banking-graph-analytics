# Existing System Comparison

**Project:** Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant  
**Task:** BOA-6 — Compare Existing Systems  
**Accessed:** October 23, 2026

## I. Purpose and Method

This comparison examines existing applications relevant to personal transaction management and identifies the requirements addressed by the proposed service.

Four systems were selected:

1. **Wallet by BudgetBakers** — an international personal finance application.
2. **Spendee** — an international expense tracking and budgeting application.
3. **Kaspi.kz** — a Kazakhstan banking application, examined through its Kaspi Gold transaction features.
4. **Halyk** — a Kazakhstan banking application, examined through its personal banking and statement features.

Wallet and Spendee provide functional comparisons for personal financial management. Kaspi.kz and Halyk provide local comparisons because the proposed service targets users of Kazakhstan banks and their statements. The banking applications are partial comparators: their purposes include banking services, while the proposed project focuses on analysing user-provided records.

Evidence was collected from official product websites, help centres, and integration documentation. No authenticated accounts or paid features were tested. The comparison therefore establishes documented capabilities rather than independently measured performance.

All four systems are assessed against the same nine criteria. PDF export, PDF submission for credit assessment, and PDF import into a personal transaction dataset are treated as different capabilities.

## II. System Descriptions

### A. Wallet by BudgetBakers

Wallet supports personal financial management through manual accounts, bank synchronisation, expense categorisation, and financial reports. Users can maintain multiple accounts and record transactions manually [1], [2].

Wallet also documents an MCP integration that connects financial data to compatible AI assistants. Its tools support transaction retrieval, filtering, and aggregation. The vendor describes a workflow in which an external AI assistant reads an attached PDF or another document and creates Wallet records [3], [4].

Wallet is therefore relevant to both transaction management and conversational analysis. However, the reviewed documentation does not establish validated parsing of the selected Kaspi, Halyk, and Freedom PDF layouts or an interactive directed graph of accounts and counterparties.

### B. Spendee

Spendee combines manual cash expenses, connected bank accounts, financial overviews, and category-based budgeting. Its All Wallets Overview allows users to examine income and expenses across selected wallets and periods [5], [6].

Its documented file import accepts CSV, XLS, and XLSX files into cash wallets. The import documentation explicitly states that previously entered transactions are not recognised during import. Users are advised to import only new or missing records to avoid duplicates [7].

Spendee is relevant to the proposed combination of imported and manually entered records. Its documented import limitations are particularly relevant to the project's duplicate-review requirement.

### C. Kaspi.kz

The Kaspi Gold statement section provides access to top-ups, withdrawals, transfers, purchases, and payments. Users can search transactions, select a period, and inspect operations grouped by category. Statements can be downloaded as PDF files [8].

These features provide a local baseline for transaction review. However, downloading a Kaspi statement does not demonstrate the ability to import statements from other banks into a unified analytical dataset.

The reviewed source does not establish manual cash bookkeeping, account–counterparty graph exploration, or conversational analysis of a combined dataset.

### D. Halyk

Halyk documents access to account, card, and deposit statements, including period selection and PDF downloads [9].

Halyk also allows users to submit another bank's PDF statement when applying for an instalment product [10]. This is relevant to document handling, but the documented purpose is credit assessment. It does not establish that users can import those transactions into an editable personal finance dataset.

Halyk is therefore a local comparison for statement access and banking workflows. Support for the project's specific analytical functions remains unverified.

## III. Comparison Matrix

### Status Definitions

- **Yes:** The capability is explicitly documented. Relevant conditions are stated.
- **No:** The documented workflow explicitly excludes the capability or specifies supported options that do not include it.
- **Not verified:** The reviewed sources do not provide sufficient evidence. This does not mean that the capability is absent.
- **Planned:** A proposed project requirement, not an implemented or evaluated feature.

In this comparison, a **graph** means a directed network of accounts, counterparties, and recorded transfers. Ordinary financial charts do not satisfy this criterion.

| ID | Criterion | Wallet | Spendee | Kaspi.kz | Halyk | Proposed Service |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Combine records from different banks or financial accounts for personal analysis | **Yes** — multiple accounts and bank connections [1], [2] | **Yes** — connected accounts and All Wallets Overview [5], [6] | **Not verified** — reviewed documentation covers Kaspi Gold records [8] | **Not verified** — external statement submission does not establish analytical consolidation [9], [10] | **Planned** — supported statements and manual records in one dataset |
| C2 | Import PDF statement transactions into a personal finance dataset | **Yes, via external AI/MCP** — selected Kazakhstan layouts are not verified [3] | **No in the documented importer** — CSV, XLS, and XLSX are specified [7] | **Not verified** — PDF export is documented [8] | **Not verified** — PDF submission for instalment assessment is documented [10] | **Planned** — one agreed text-based PDF layout per target bank |
| C3 | Manually record personal income or expenses, including cash transactions | **Yes** — manual accounts and entry [1] | **Yes** — manual cash records [5] | **Not verified** [8] | **Not verified** [9], [10] | **Planned** — add, edit, and delete manual records |
| C4 | Review transaction records for a selected period | **Yes** — date-filtered record retrieval [4] | **Yes** — period selection [6] | **Yes** — statement period selection [8] | **Yes** — statement period selection [9] | **Planned** — searchable and filterable transaction table |
| C5 | Provide category-based financial summaries or spending analysis | **Yes** — category-based spending analysis [2] | **Yes** — financial graphics and category-based analysis [5] | **Not verified for summaries** — category-based transaction review is documented [8] | **Not verified** [9] | **Planned** — category summaries and trends, separately by currency |
| C6 | Detect potential duplicates between imported and existing manual records and request confirmation | **Not verified** — duplicate removal is mentioned, but this specific review workflow is not established [3] | **No in the documented importer** — existing transactions are not recognised [7] | **Not verified** [8] | **Not verified** [9], [10] | **Planned** — user confirmation; confirmed duplicates counted once |
| C7 | Explore accounts and counterparties through an interactive directed transaction graph | **Not verified** [2]–[4] | **Not verified** [5]–[7] | **Not verified** [8] | **Not verified** [9], [10] | **Planned** — connections supported by sufficient identifiers |
| C8 | Ask natural-language analytical questions about the user's transaction data | **Yes, via MCP-connected AI assistants** [3], [4] | **Not verified** [5]–[7] | **Not verified** [8] | **Not verified** [9], [10] | **Planned** — integrated assistant using controlled backend functions |
| C9 | Navigate from a chat answer to supporting transactions and relevant graph connections | **Not verified** — record retrieval does not establish this combined navigation workflow [4] | **Not verified** [5]–[7] | **Not verified** [8] | **Not verified** [9], [10] | **Planned** — optional filtered transaction view and graph highlighting |

References in **Not verified** cells identify the documentation reviewed, rather than evidence that a capability is absent.

Wallet's AI-assisted PDF processing and financial questions are vendor-documented integration capabilities. Spendee's negative import findings apply specifically to its published importer documentation.

## IV. Gap Analysis and Implications for the Project

### 1. Selected Kazakhstan PDF Layouts

The project will focus on one agreed text-based PDF layout from each of Kaspi, Halyk, and Freedom.

Wallet documents AI-assisted statement processing, so PDF-based ingestion cannot be claimed as unique. However, the reviewed material does not establish its extraction accuracy for the three selected layouts. Spendee's documented importer requires spreadsheet or CSV input [3], [7].

The project's contribution will be a clearly specified import pipeline whose results can be checked against manually verified reference data.

### 2. Combining Imports and Manual Entries Reliably

Manual entry and multi-account management already exist in Wallet and Spendee [1], [5], [6]. These features should therefore be justified through user needs rather than presented as innovations.

A specific project requirement is reviewing potential duplicates when a manually entered transaction later appears in a PDF statement. Spendee explicitly documents that its importer does not recognise existing transactions [7].

The proposed service will flag potential duplicates using available transaction details and request user confirmation. Confirmed duplicates will be counted once across financial summaries, graph aggregates, and chat calculations.

### 3. Graph Exploration of Recorded Relationships

The reviewed sources do not establish an interactive account–counterparty graph in the four applications.

The proposed service will provide this view alongside the transaction table. Graph connections will require sufficient identifying information. Identical names alone will not establish identity, and manually entered relationships will remain identifiable as user-provided information.

Transactions with ambiguous identifiers will remain available in tables and summaries without creating unsupported graph connections.

This is a proposed distinction within the reviewed sample, not proof that no other product offers graph analytics.

### 4. Verifiable Conversational Analysis

Wallet demonstrates that natural-language access to personal financial data already exists [3], [4]. An AI assistant alone is therefore insufficient to justify the project's distinctiveness.

The project will focus on combining controlled backend calculations with optional navigation to the supporting transactions and relevant graph connections.

Answers will identify the period and currency where applicable. Missing information and unsupported questions will receive a clear explanation. Users will choose whether to open supporting records or graph connections.

### 5. Complementing Existing Banking Applications

Kaspi.kz and Halyk provide access to their customers' statements [8], [9].

The proposed service will use supported exported documents as inputs and combine them with manual records. It will complement these banking workflows without providing payment execution or direct bank integration.

### Conclusion

The proposed service is justified as a focused personal-analysis tool combining selected Kazakhstan PDF layouts, manual transaction entry, duplicate review, directed graph exploration, and verifiable chat answers.

Several individual features already exist in other products. The reviewed documentation does not establish the complete proposed workflow in any of the four systems.

The project's usefulness and correctness must still be validated through user discussions and prototype evaluation.

## V. Limitations of This Comparison

- The comparison is based on public official documentation; no hands-on application testing was performed.
- **Yes** indicates documented support, not independently verified accuracy or usability.
- **Not verified** entries must not be interpreted as confirmed missing features.
- Spendee's detailed import article was last updated in 2021. Its documented restrictions should be checked against the current application before implementation decisions depend on them.
- Wallet's AI integration depends on an external compatible assistant. Support for the selected Kazakhstan PDF layouts was not tested.
- Kaspi.kz and Halyk are partial comparators with broader banking purposes. Their inclusion does not imply that their full functionality was evaluated.
- The comparison does not establish market-wide uniqueness or prove user demand. Evidence of relevance will be collected separately.
- All proposed-service capabilities remain planned until implemented and evaluated.

## References

All sources accessed on October 23, 2026.

[1] BudgetBakers. “Adding an Account.” *Wallet Help Center*.  
https://support.budgetbakers.com/hc/en-us/articles/34453128217618-Adding-an-Account

[2] BudgetBakers. “Wallet Features.”  
https://budgetbakers.com/en/products/wallet/features/

[3] BudgetBakers. “MCP Integration.”  
https://budgetbakers.com/en/products/wallet/integrations/mcp/

[4] BudgetBakers. “Wallet MCP Documentation.”  
https://mcp.wallet.budgetbakers.com/docs

[5] Spendee. “Money Manager & Budget Planner.”  
https://www.spendee.com/

[6] Spendee. “All Wallets Overview.” *Spendee Help Center*.  
https://help.spendee.com/article/169-all-wallets-overview

[7] Spendee. “Data Import.” *Spendee Help Center*.  
https://help.spendee.com/article/209-data-import

[8] Kaspi.kz. “Как посмотреть выписку по Kaspi Gold в приложении Kaspi.kz?” *Kaspi Гид*.  
https://guide.kaspi.kz/client/ru/bank/information_statement/gold/q976

[9] Halyk Bank. “Halyk. Онлайн сервисы банка.” *Вопросы и ответы*.  
https://halykbank.kz/knowledge_base/1483

[10] Halyk Bank. “Как вложить выписку по банковскому счету из другого банка в приложение Halyk?”  
https://halykbank.kz/other/vypiska
