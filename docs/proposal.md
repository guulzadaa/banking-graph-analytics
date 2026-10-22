# Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant

**Institution:** Astana IT University  
**School:** School of Software Engineering  
**Team Members:** Gulzada Issa, Inabat Medetkyzy  
**Supervisor:** Almas Myrzakhmetov

## 1. Project Proposal

### 1.1. Problem Statement

Individuals who use several bank accounts may need to combine their transaction histories to understand their overall financial activity. PDF statements from different banks can vary in structure, date formats, and transaction descriptions. As a result, manually combining and analysing these records can be time-consuming and potentially error-prone.

Some income and expenses, such as cash transactions, may not appear in bank statements and need to be recorded manually. A bank transaction entered manually may later appear in an imported statement, creating a risk of counting the same transaction twice.

Reviewing separate records can also make it difficult to compare incoming and outgoing payments, identify frequent counterparties, and explore relationships between accounts. Users may need to perform calculations manually and inspect individual transactions to verify the results.

The proposed service will combine PDF imports and manually entered transactions into a unified dataset. It will provide financial summaries, interactive graph exploration, and an intelligent chat assistant. Users will be able to inspect the transactions supporting a chat answer and view relevant connections in the graph. The identified user needs will be validated through discussions with potential users.

### 1.2. ## Target Users

The primary target users are individuals who want to understand and manage their personal income and expenses, particularly those using accounts at Kaspi, Halyk, and Freedom.

The service is intended for:

- **Users with multiple bank accounts:** Individuals who want to combine transactions from different bank statements and review them in one place.
- **Users recording additional transactions:** Individuals who need to manually record cash payments or other income and expenses not included in their imported statements.
- **Users analysing their financial activity:** Individuals who want to compare incoming and outgoing amounts, review spending categories, identify frequent counterparties, and explore transaction relationships.
- **Users seeking understandable and verifiable answers:** Individuals who prefer to ask questions in natural language and inspect the transactions or graph connections supporting the assistant’s answers.

The initial version focuses on personal financial analysis. It is not intended for business accounting, professional banking investigations, or investment advice.

### 1.3. Project Aim

To develop and evaluate a web service that combines transactions imported from supported Kaspi, Halyk, and Freedom PDF statements with manually entered income and expenses, helping individual users understand and verify their financial activity through a unified transaction table, financial summaries, graph analytics, and an intelligent chat assistant.

### 1.4. Project Objectives

1. Identify the needs of individual users and examine representative PDF statements from Kaspi, Halyk, and Freedom.
2. Define system requirements and a unified transaction data model that distinguishes imported records from manually entered records.
3. Develop PDF parsing modules that extract, validate, and normalise transaction data from the selected statement layouts.
4. Implement a manual entry form that allows users to add, edit, and delete their own income and expense records.
5. Detect potential duplicates across PDF imports and manual entries, allowing users to confirm whether matching records represent one transaction or separate transactions.
6. Create a unified transaction table with search, sorting, and filtering by date, bank, account or cash wallet, direction, category, currency, and available counterparty information, together with manual category assignment and correction.
7. Develop financial summaries showing incoming and outgoing amounts, transaction counts, trends, category breakdowns, and frequent counterparties, calculated separately for each currency.
8. Implement an interactive directed graph for exploring identifiable account and counterparty connections, transaction counts, and transferred amounts.
9. Integrate an intelligent chat assistant that answers supported analytical questions using backend calculations on the authenticated user’s transaction and graph data.
10. Allow users to open the transactions supporting a chat answer and highlight relevant graph connections when sufficient identifying information is available.
11. Evaluate data extraction, duplicate handling, financial calculations, graph consistency, chatbot answers and their supporting records, usability, and processing time.

### 1.5. Expected Outcomes

The project is expected to deliver:

- A working browser-based prototype for personal financial transaction analysis.
- PDF parsing modules for the selected Kaspi, Halyk, and Freedom statement layouts.
- A manual entry interface for adding, editing, and deleting income and expenses.
- A unified transaction table with source identification, searching, sorting, filtering, and category management.
- A duplicate-review mechanism that prevents confirmed duplicate transactions from being counted more than once.
- An analytical dashboard displaying financial summaries, category breakdowns, and transaction trends.
- An interactive graph showing identifiable accounts, counterparties, and their recorded transaction relationships.
- An intelligent chat assistant providing answers linked to supporting transactions and relevant graph connections.
- Technical documentation and evaluation results based on manually verified synthetic or anonymised test data.

The intended benefit is to reduce the effort required to consolidate and analyse personal transactions while making the results easier to understand and verify. These benefits will be assessed during evaluation.

### 1.6. Project Scope

The project covers a browser-based service for individual users to import bank statements, manually record income and expenses, and analyse the resulting dataset.

The initial version will support one selected text-based PDF statement layout from each of three banks: Kaspi, Halyk, and Freedom. The supported layouts will be finalised after examining representative samples.

The service will include:

- User authentication and access restricted to each user’s own datasets.
- Uploading supported PDF statements, extracting transaction records, and reporting import issues.
- Manually adding, editing, and deleting income and expense records.
- Recording transaction type, date, amount, currency, account or cash wallet, and category, with optional descriptions and counterparty details.
- Assigning and correcting transaction categories manually, with an “Uncategorised” label for records whose category has not been determined.
- Identifying whether each record originated from a PDF import or manual entry.
- Reviewing potential duplicates across imported and manually entered records.
- Searching, sorting, and filtering transactions in a unified table.
- Calculating financial summaries, trends, and category and counterparty breakdowns separately for each currency.
- Exploring transaction relationships through an interactive directed graph.
- Asking analytical questions through the chat assistant and opening supporting transactions or relevant graph connections.

Potential duplicates will be reviewed using available transaction details and user confirmation, rather than matching dates and amounts alone. Confirmed duplicates will be counted once across financial summaries, graph aggregates, and chat calculations.

The directed graph will show accounts, counterparties, and recorded transfers supported by sufficient identifying information. Identical names alone will not establish identity. Records with unclear identifiers will remain in tables and financial summaries without creating unsupported connections. Manually entered relationships will be labelled as user-provided information.

The chat assistant will use controlled backend functions to retrieve records and calculate results from the authenticated user’s transaction and graph data. Answers will state the relevant period and currency where applicable. Users can choose to view supporting transactions or graph connections without being automatically redirected. Missing information and unsupported questions will receive a clear limitation message.

The system will protect financial data through access control and secure file handling. Testing will primarily use synthetic or anonymised datasets. Live banking integration, payment execution, scanned-document recognition, automatic currency conversion, and professional accounting or investment advice are outside the initial scope.

Support for three agreed PDF layouts and a defined set of graph and chat functions is intended to keep the scope manageable for two students. Engineering complexity includes extracting and validating differently structured data, handling duplicates and incomplete identifiers, and integrating reliable analytics with transaction, graph, and chat interfaces.
