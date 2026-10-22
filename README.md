# Banking Operations Analysis with Graph Analytics and an Intelligent Chat Assistant

## Project Overview

A browser-based service for analysing personal financial transactions imported from Kaspi, Halyk, and Freedom PDF statements or entered manually.
The service will combine transactions into a unified table and provide financial summaries, interactive graph analytics, and an intelligent chat assistant. Chat answers will use backend calculations and offer access to supporting transactions and relevant graph connections.

## Problem Statement

Individuals using several bank accounts may find it difficult to combine differently formatted statements and understand their overall financial activity. Manual records can also overlap with imported transactions, causing duplicate counting.

The project aims to simplify transaction consolidation, analysis, and verification. These user needs will be validated through discussions with potential users.

## Project Aim

To develop and evaluate a web service that combines transactions imported from supported Kaspi, Halyk, and Freedom PDF statements with manually entered income and expenses, helping individual users understand and verify their financial activity through a unified transaction table, financial summaries, graph analytics, and an intelligent chat assistant.

## Target Users

The primary target users are individuals who want to understand and manage their personal income and expenses, particularly those using accounts at Kaspi, Halyk, and Freedom.

The service is intended for:

- **Users with multiple bank accounts:** Individuals who want to combine transactions from different bank statements and review them in one place.
- **Users recording additional transactions:** Individuals who need to manually record cash payments or other income and expenses not included in their imported statements.
- **Users analysing their financial activity:** Individuals who want to compare incoming and outgoing amounts, review spending categories, identify frequent counterparties, and explore transaction relationships.
- **Users seeking understandable and verifiable answers:** Individuals who prefer to ask questions in natural language and inspect the transactions or graph connections supporting the assistant’s answers.
The initial version focuses on personal financial analysis. It is not intended for business accounting, professional banking investigations, or investment advice.

## Planned Features

- User registration, authentication, and access to personal datasets.
- PDF statement import and transaction normalisation.
- Manual income and expense entry, editing, and deletion.
- Duplicate detection with user confirmation.
- A unified transaction table with search, sorting, filters, and category management.
- Financial summaries and trends calculated separately for each currency.
- Interactive graph exploration of identifiable accounts and counterparties.
- A chat assistant with answers linked to supporting transactions and graph connections.

## Project Scope

The initial version will support one agreed text-based PDF layout from each selected bank, alongside manual transaction entry.

Confirmed duplicates will be counted once. Graph connections will require sufficient identifiers; identical names alone will not establish identity. The assistant will explain missing information and unsupported questions.

Live banking integration, payments, scanned-document recognition, automatic currency conversion, and professional accounting or investment advice are excluded.

## Expected Outcomes

- A working prototype combining PDF imports and manual entries.
- A unified transaction table, financial dashboard, and interactive graph.
- A chat assistant providing verifiable answers.
- Technical documentation and evaluation using synthetic or anonymised test data.

## Planned Technology Stack

| Component | Technology |
|---|---|
| Frontend | Angular, TypeScript, HTML5, SCSS |
| Financial charts | Apache ECharts |
| Graph visualisation | Cytoscape.js |
| Backend | Python, FastAPI |
| Database and access | PostgreSQL, SQLAlchemy |
| Validation and data processing | Pydantic, Pandas |
| Graph analysis | NetworkX |
| Chat assistant | External LLM API; provider to be selected |
| PDF extraction | Library to be selected after sample evaluation |
| Development tools | Git, GitHub, YouTrack, Docker |

## Repository Structure

The repository structure will evolve as the project develops.

```text
.
├── backend/
├── diagrams/
├── docs/
├── frontend/
├── tests/
└── README.md
```

## Project Documentation

Currently prepared:

- [Project Proposal and Scope](docs/proposal.md)

Other documents are still in preparation and will be added as they are completed.

## Project Management

**YouTrack Project:** https://banking-graph-analytics.youtrack.cloud/projects/BOA

Work will be tracked through assigned YouTrack tasks. Changes will reference task IDs and be reviewed by the other team member through pull requests before merging into `main`.

## Team Members

- Inabat Medetkyzy
- Gulzada Issa

**Project Supervisor:** Almas Myrzakhmetov

## Project Status

The project is in the planning and documentation stage. The shared repository and YouTrack project have been created, and the Project Proposal and Scope document is prepared. Other deliverables are in progress.

## Setup and Testing

Setup, execution, and testing instructions will be added when runnable code is available. Tests will use synthetic or anonymised data. Credentials and personal financial records must not be committed.

## Academic Purpose

This project is being developed as a diploma project at Astana IT University.
