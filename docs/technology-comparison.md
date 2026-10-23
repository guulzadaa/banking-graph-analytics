# Compare Technology Alternatives

**Project:** Development of a Web Service for Analyzing Banking Operations with Graph Analytics and an Intelligent Chat Assistant
**Document status:** Proposed technology selection (before implementation and benchmarking)

## 1. Introduction

The proposed project is a **browser-based web service**, not a native mobile application. Its main features are uploading bank statements, displaying income and expense analytics, exploring relationships between accounts and transactions through interactive graphs, and asking questions about financial data through an intelligent chat assistant. The solution is planned as a client–server system with a REST API.

This document compares alternative technologies for six major architectural decisions. The objective is to select a practical stack that supports the planned features, enables integration between the frontend and backend, and can be implemented and tested within the diploma project. The preferred technologies follow the team's existing project justification documents; this comparison evaluates those preferences rather than claiming that implementation or performance testing has already been completed.

## 2. Evaluation Criteria and Method

The alternatives are evaluated using a consistent qualitative framework:

1. **Functional suitability:** support for the project's specific features.
2. **Integration:** compatibility with the planned frontend, backend, API, and data-processing components.
3. **Development effort:** implementation complexity, learning curve, and available project experience.
4. **Maintainability:** modularity, documentation, and ease of future changes.
5. **Performance and scalability:** relevant capabilities and possible limitations under increasing data volume.
6. **Ecosystem and tooling:** libraries, developer tools, and community documentation.

Assessments are qualitative, based on documented capabilities and project-specific requirements; they are **not measured benchmark results**. The recommended choices should be reviewed after prototyping and testing with representative, non-sensitive transaction datasets.

## 3. Technology Alternatives Comparison

### 3.1 Frontend Framework: Angular vs React vs Vue.js

The frontend must provide an interactive financial dashboard, statement-upload forms, transaction search and filters, graph exploration, and a chat interface.

| Criterion | Angular | React | Vue.js |
|---|---|---|---|
| Approach | Full-featured frontend framework | Component-based UI library | Progressive frontend framework |
| TypeScript | Strong built-in integration | Supported through TypeScript tooling | Supported through TypeScript tooling |
| Routing and forms | Integrated framework solutions | Usually requires selecting additional libraries | Official routing and ecosystem solutions |
| Complex dashboards | Suitable | Suitable | Suitable |
| Development effort | More conventions and initial structure | Flexible, but requires architectural choices | Relatively approachable for smaller interfaces |
| Project fit | **High:** team experience and consistent architecture | High, but would change the planned stack | High, but would change the planned stack |

**Selected: Angular with TypeScript.** Angular provides components, routing, forms and HTTP integration appropriate for a multi-page browser experience. More importantly, the frontend developer's stated project experience includes Angular, TypeScript and SCSS, reducing implementation risk. React and Vue.js could also meet the functional requirements, but they offer no established advantage for this particular team's schedule that justifies changing the planned stack. Angular Router, HttpClient, Reactive Forms and RxJS will support navigation, REST API communication, validated inputs and asynchronous state handling. [1–2]

### 3.2 Backend Framework: FastAPI vs Django vs Express.js

The backend must receive and validate uploaded data, manage accounts and transactions, serve analytics results, and connect graph algorithms and the LLM service to the frontend.

| Criterion | FastAPI | Django | Express.js |
|---|---|---|---|
| Main language | Python | Python | JavaScript / TypeScript |
| API development | API-oriented; OpenAPI documentation built in | Supported, often with Django REST Framework | Flexible REST API development |
| Input validation | Type-hint-based with Pydantic | Forms, serializers or other validation tools | Middleware and validation libraries |
| Pandas / NetworkX integration | Direct Python integration | Direct Python integration | Requires separate Python service or equivalent JS processing |
| Built-in administration / ORM | Integrate selected tools | Extensive built-in framework functionality | Add third-party packages |
| Project fit | **High:** lightweight API-first approach and planned Python stack | High, but includes broader framework functionality | Moderate, due to Python analytics interoperability |

**Selected: Python with FastAPI.** FastAPI aligns with a REST API serving a separate Angular frontend. It works directly with the planned Python analytics libraries (Pandas and NetworkX), supports request validation using Pydantic and generates API documentation. Django remains a viable option, especially where a built-in admin panel and integrated framework are important. Express.js is flexible but would introduce a language boundary for Python-based analysis. SQLAlchemy is planned for database access. [3–4]

### 3.3 Data Storage: PostgreSQL vs MySQL vs MongoDB

The system is expected to store users, bank accounts, imported statements, normalized transactions, and potentially analysis metadata. Financial records have structured relationships and require reliable integrity controls.

| Criterion | PostgreSQL | MySQL | MongoDB |
|---|---|---|---|
| Data model | Relational SQL | Relational SQL | Document-oriented |
| Transactions and integrity | ACID transactions; relational constraints | ACID transactions with suitable engine; relational constraints | Transactions supported; flexible document model |
| Accounts–transactions relationships | Natural fit through foreign keys and joins | Natural fit through foreign keys and joins | Often modeled using references or embedded documents |
| Changing statement formats | Structured tables plus JSON support | Structured tables plus JSON support | Flexible document schemas |
| SQLAlchemy integration | Supported | Supported | Not the same conventional relational ORM workflow |
| Project fit | **High:** relational integrity plus flexible fields | High for structured banking data | Useful for flexible documents, less direct for relational reporting |

**Selected: PostgreSQL.** Its relational model fits users, accounts, transaction records and categorization, while constraints and transactions help maintain consistency after statement imports. PostgreSQL can also store selected variable metadata in JSON/JSONB fields if required. MySQL could support the core workload, but PostgreSQL is the team's stated choice and integrates with the planned SQLAlchemy backend. MongoDB is attractive for highly variable document formats, but it does not offer a clear advantage for the main relational reporting tasks. Security still requires application-level authorization, encryption and careful handling of uploaded statements; database choice alone does not guarantee privacy. [5–6]

### 3.4 Interactive Graph Visualization: Cytoscape.js vs D3.js vs vis-network

The web interface must display relationships between accounts, recipients and transactions, allow users to select nodes and edges, and inspect their attributes.

| Criterion | Cytoscape.js | D3.js | vis-network |
|---|---|---|---|
| Main focus | Graph/network visualization and analysis | General-purpose data-driven visualization | Interactive network visualization |
| Graph layouts and interaction | Built-in graph-focused APIs and layouts | Highly customizable, more implementation work | Network layouts and interactions |
| Node / edge selection | Supported | Custom implementation possible | Supported |
| Custom visual design | Extensive graph styling | Very high flexibility | Network configuration and styling |
| Development effort | Graph-specific abstractions reduce boilerplate | Higher for custom network interfaces | Relatively straightforward for networks |
| Project fit | **High:** tailored to graph exploration | High, especially for bespoke graphics | High for basic interactive networks |

**Selected: Cytoscape.js.** It directly supports graph elements, layouts, selection, styling and event handling required by the transaction network explorer. D3.js provides broader low-level visual control but would increase effort for common network interactions. vis-network is a credible alternative, but Cytoscape.js aligns with the planned stack and provides graph-oriented functionality in one library. Graph calculations may be performed on the backend using NetworkX; Cytoscape.js is primarily responsible for browser visualization. [7–8]

### 3.5 Financial Dashboard Charts: Apache ECharts vs Chart.js vs Recharts

The dashboard will present income, expenses, category distributions and changes over time, with filtering and potentially interactive tooltips and zooming.

| Criterion | Apache ECharts | Chart.js | Recharts |
|---|---|---|---|
| Primary use | Rich interactive charts and dashboards | Common chart types with plugin ecosystem | Declarative React chart components |
| Charts needed by project | Line, bar, pie and other options | Line, bar, pie and other options | Line, bar, pie and other options |
| Interaction | Extensive interactive features | Interactive features and plugins | Interactions within React component model |
| Angular compatibility | Usable as a JavaScript charting library | Usable as a JavaScript charting library | React-focused; not a natural fit for Angular |
| Customization | Broad configuration options | Flexible with plugins | Component-based customization |
| Project fit | **High:** rich dashboards in Angular | High for standard financial charts | Low for the selected Angular framework |

**Selected: Apache ECharts.** It supports varied chart types and interactive analytical displays in the planned Angular interface. Chart.js would be a reasonable simpler alternative for standard graphs, whereas Recharts is designed for React and would be an awkward choice without changing the frontend framework. The actual chart set should be tested for readability, accessibility and performance on realistic datasets. [9–10]

### 3.6 Graph Analytics: NetworkX vs python-igraph vs Neo4j

The backend must construct graphs from transactions and identify relationships among entities. Potential operations include neighborhood exploration, connected components, centrality and other network measures, provided the dataset and business requirements justify them.

| Criterion | NetworkX | python-igraph | Neo4j |
|---|---|---|---|
| Technology type | Python graph-analysis library | Python interface to graph-analysis library | Graph database with query capabilities |
| Graph algorithms | Broad graph algorithm collection | Broad collection with efficient core implementation | Graph queries; algorithms through graph-data-science tooling |
| Python/Pandas workflow | Direct integration | Python integration | Requires database driver and graph data modeling |
| Persistent graph storage | Not a database; persistence must be handled separately | Not a database | Native graph persistence |
| Larger graphs | Pure-Python operations may become a constraint; backend acceleration is possible | Often more suitable for demanding computational workloads | Useful when persistent graph traversals and queries are central |
| Project fit | **High:** prototype-scale analysis over PostgreSQL records | High as a future performance alternative | Conditional; adds another data store and operational complexity |

**Selected: NetworkX.** It is appropriate for implementing and explaining graph algorithms directly in the Python backend. The team can keep authoritative transaction records in PostgreSQL, construct a graph for analysis, and return a JSON representation of selected nodes and edges to Cytoscape.js. This avoids operating a separate graph database at the prototype stage. python-igraph should be reconsidered if profiling shows unacceptable processing times; Neo4j would become more attractive if the system later needs persistent graph queries at scale. The three candidates are **not perfectly interchangeable**: NetworkX and igraph are algorithm libraries, while Neo4j is a database platform. They are compared here as alternative architectures for meeting the graph-analysis requirement. [11–12]

## 4. Consolidated Proposed Technology Stack

| Layer / function | Proposed technology | Reason |
|---|---|---|
| Browser frontend | Angular, TypeScript, HTML5, SCSS | Structured, responsive web interface and relevant team experience |
| Navigation, forms and API access | Angular Router, Reactive Forms, HttpClient, RxJS | Client-side routing, form handling and asynchronous REST communication |
| Financial data visualization | Apache ECharts | Interactive dashboard charts |
| Relationship graph visualization | Cytoscape.js | Interactive node–edge exploration |
| Backend REST API | Python, FastAPI, Pydantic | API endpoints, validation and integration with Python analytics |
| Database access | SQLAlchemy | Data access from the Python service |
| Data storage | PostgreSQL | Structured transaction records and relational integrity |
| Statement analysis | Pandas | Tabular preprocessing and analytical aggregations |
| Graph calculations | NetworkX | Graph construction and algorithms |
| Intelligent assistant | LLM API (provider not yet selected) | Natural-language questions over authorized financial analysis results |
| Development and delivery | Git, GitHub, YouTrack, Docker | Versioning, task tracking and reproducible environments |

The source justification documents specify an **LLM API** but do not identify its provider or model. Therefore, this document does not claim that an LLM vendor has been chosen. A later decision must compare model quality, cost, data protection, and whether sensitive banking records can be shared with a third-party service. The chat assistant should only retrieve data that the authenticated user is authorized to access, and generated answers should be checked against computed financial values.

## 5. Architectural Integration and Trade-offs

A typical workflow is:

1. A user uploads a supported bank statement in the Angular website.
2. The frontend sends the file through an authenticated HTTPS request to FastAPI.
3. The backend validates the file and uses Pandas to parse and normalize the transaction data.
4. PostgreSQL stores validated structured records through the backend data-access layer.
5. The backend calculates financial summaries and, when requested, builds a network representation using NetworkX.
6. The API returns structured JSON to Angular. ECharts displays summaries, and Cytoscape.js displays account–transaction relationships.
7. For natural-language questions, the backend selects authorized information and invokes the chosen LLM API, subject to privacy and security safeguards.

This separation has advantages: frontend and backend can be developed independently, and the Python backend supports both tabular and graph analytics. Key trade-offs are the need to maintain an API contract, the cost of converting database records into graph structures, potential performance issues with large datasets, and the privacy implications of using an external LLM service.

## 6. Validation Plan

The final suitability of this stack should be confirmed through measurable prototype checks:

| Area | Proposed validation |
|---|---|
| Frontend | Demonstrate responsive upload, dashboard, transaction filtering, graph selection and chat UI |
| API integration | Validate representative requests, error handling, schema consistency and authentication |
| Storage | Test imports, account–transaction references, duplicate handling and transactional consistency |
| Financial charts | Verify chart values against known reference calculations and test rendering for different dataset sizes |
| Graph analytics | Check graph nodes/edges against a controlled fixture; profile construction and algorithm execution time |
| LLM assistant | Check factual correctness against computed results, authorization boundaries and handling of ambiguous queries |
| Security | Use synthetic or anonymized test data; verify access control, file validation and safe secret handling |

The evaluation targets and datasets have not yet been finalized; numerical performance and accuracy claims should only be added after measurements.

## 7. Conclusion

For the planned browser-based financial analytics service, the recommended technology combination is **Angular + TypeScript** for the frontend, **FastAPI + Python** for the REST backend, **PostgreSQL** for structured data, **Pandas and NetworkX** for analytics, **Apache ECharts** for financial dashboards, and **Cytoscape.js** for network visualization. This combination is consistent with the team's project justification documents and fits the intended two-person frontend/backend division. Alternatives remain technically viable, but the selected technologies provide a practical balance of functionality, integration and implementation risk. Final selection should be confirmed through integration tests, security review and performance measurement rather than assumed benchmark superiority.

## 8. References

Official documentation is used for feature descriptions. Comparative suitability judgments in this document are the authors' project-specific assessments, not claims made by the documentation providers.

1. Angular. *Angular Documentation*. https://angular.dev/docs
2. React. *React Documentation*. https://react.dev/
3. FastAPI. *FastAPI Documentation*. https://fastapi.tiangolo.com/
4. Django Software Foundation. *Django Documentation*. https://docs.djangoproject.com/
5. PostgreSQL Global Development Group. *PostgreSQL Documentation*. https://www.postgresql.org/docs/
6. MongoDB. *MongoDB Documentation*. https://www.mongodb.com/docs/
7. Cytoscape.js. *Documentation*. https://js.cytoscape.org/
8. D3.js. *Documentation*. https://d3js.org/
9. Apache ECharts. *Documentation*. https://echarts.apache.org/en/index.html
10. Chart.js. *Documentation*. https://www.chartjs.org/docs/latest/
11. NetworkX. *Documentation*. https://networkx.org/documentation/stable/
12. Neo4j. *Documentation*. https://neo4j.com/docs/
