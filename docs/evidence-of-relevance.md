# Evidence of the Relevance

**Project:** Development of a Web Service for Bank Transaction Analysis with Graph Analytics and an Intelligent Chat Assistant  
**Research period:** October 19-21, 2026  
**Research method:** Semi-structured individual interviews using eight questions 
**Participants:** Five potential users (four students and one employee)  
**Primary evidence:** Findings from interviews summarized in Section 3 (Interview Results). The interview questions are provided in Appendix A
**Document status:** Final synthesis of the five interviews reported by the project team

## 1. Introduction and Research Objective

The proposed diploma project aims to develop a web service that helps users analyze bank transactions through a consolidated financial dashboard, interactive graph analytics, and an intelligent chat assistant. The planned workflow includes uploading bank statements, viewing and filtering transactions, analyzing income and expenses, exploring relationships between accounts and counterparties, and asking questions about financial data in natural language.

The purpose of this research is to establish whether potential users experience problems that these capabilities could address. Rather than treating the proposed features as inherently useful, the team collected feedback about existing banking applications, multi-account analysis, expense tracking, visual exploration of transfers, and interest in conversational financial analysis.

The central research questions were:

1. What difficulties do potential users experience when reviewing and interpreting bank transactions?
2. Do users need to analyze transactions across multiple bank accounts?
3. What value, if any, do graph-based transaction visualization and an AI chat assistant provide?
4. Which user requests are relevant to the planned system, and which would require additional scope or research?

## 2. Research Methodology

### 2.1. Participants and interview dates

The project team reports conducting **five interviews with potential users** between October 19 and October 21, 2026. Four participants were students and one was an employee. Participant identifiers are used instead of names to present feedback without identifying the respondents.

| Participant | User profile | Interview date | Banking applications reported |
|---|---|---|---|
| P1 | Student | October 19, 2026 | Kaspi.kz, Halyk Bank |
| P2 | Student | October 19, 2026 | Kaspi.kz, Revolut |
| P3 | Student | October 20, 2026 | Halyk Bank |
| P4 | Student | October 20, 2026 | Kaspi.kz, Halyk Bank, Jusan Bank |
| P5 | Employee | October 21, 2026 | Halyk Bank, Kaspi.kz, Freedom Bank |

The group represents different patterns of financial activity: daily student spending, single-account banking, shared expenses, variable freelance income, and employee household and investment-related transactions. These are descriptions of participants' **reported circumstances**, not independently verified account information. Ages, interview duration, and interview channel were not provided and are therefore not stated.

### 2.2. Data collection and analysis

All five participants answered the same eight questions about transaction-review frequency, banking applications, adequacy of existing analytics, multi-account needs, tracking difficulties, graph visualization, an AI assistant, and their most valuable desired feature. The eight interview questions are listed in **Appendix A**. Individual participant responses are summarized in Section 3 (Interview Findings).

The answers were analyzed qualitatively by identifying recurring needs and contrasting views. Simple counts are used only to describe this five-person group; they are **not population statistics**. The analysis distinguishes three levels of statements:

- **Reported evidence:** what participants explicitly said in the interviews.
- **Project interpretation:** what the team infers from patterns in those statements.
- **Unverified assumptions or proposals:** potential capabilities and technical outcomes that the interviews alone cannot establish.

No independent usability testing, bank-application feature audit, or analysis of actual banking data was supplied as part of this evidence.

## 3. Interview Findings

### 3.1. Summary of recurring themes

| Theme | Evidence from participants | Count within these five interviews | Interpretation for the project |
|---|---|---|---|
| Existing analytics do not fully meet users' needs | All participants describe missing detail, limited actionable information, budgeting controls, or insufficient overview (P1–P5). | **5/5** identified limitations | More informative financial summaries and flexible transaction analysis are relevant needs. |
| Cross-account analysis is needed at least occasionally | P1, P2, P4, and P5 describe combining or comparing data across accounts; P3 intentionally uses one bank. | **4/5** report a need, including occasional use | Consolidating imported statements addresses a recurring problem, but a single-account workflow must also work well. |
| Transaction interpretation and categorization are difficult | P1 reports broad categories and self-transfers; P2 reports insufficient tagging; P4 reports mixing work and personal transactions; P5 reports difficulty distinguishing fixed and discretionary costs. | **4/5** directly raise classification or interpretation issues | Categories, filters, and clearly defined treatment of transfers merit attention. |
| Graph visualization appears useful to several users | P1 and P4 are strongly supportive; P2 supports it if readable; P5 sees value for financial flows. P3 regards it as potentially excessive for simple needs. | **4/5** favorable, with qualifications; **1/5** skeptical/conditional | Graph exploration should support specific tasks and remain optional alongside simpler charts. |
| Natural-language questions are attractive | P1, P2, and P4 express clear interest; P3 and P5 would use the assistant subject to privacy and security conditions. | **3/5** clearly positive; **2/5** conditional | An assistant grounded in transaction data is worth developing, with strong attention to trust and accuracy. |
| Privacy is explicitly important to some respondents | P3 requires strict privacy and security; P5 requests strong encryption and privacy guarantees. | **2/5** explicitly raise privacy in their answers | Data protection and transparent explanation of limitations are important design requirements. |

**How to read the counts:** Each row summarizes a different question or theme. The figures should not be treated as representative of all students, employees, or banking customers.

### 3.2. Key finding 1 — Fragmented financial information

P1, P2, P4, and P5 describe practical difficulties when bank activity is distributed across multiple institutions or accounts. P1 receives a stipend in Halyk Bank but uses Kaspi.kz for daily spending. P4 reports cross-referencing freelance and salary-related activity across three banks. P5 describes manually consolidating information for household spending, mortgage payments, and investments. P2 only encounters this issue occasionally, while P3 deliberately uses a single account.

**Implication:** The service should support importing statements from different supported sources into one consistent transaction view. The proposed diploma solution is based on **bank-statement uploads**; these interviews do not demonstrate that direct, automatic bank synchronization is available or technically feasible.

### 3.3. Key finding 2 — Basic totals are not enough for meaningful expense analysis

Participants describe several obstacles: categories that are too broad (P1), difficulty receiving actionable information from summary charts (P2), lack of budgeting thresholds (P3), mixing freelance and personal operations (P4), and an inability to distinguish recurring bills from discretionary spending (P5).

P1 also describes self-transfers being counted as expenses, while P4 reports that transfers and deposits can distort their interpretation of actual earnings and spending. P3 mentions cash transactions that may not appear in digital banking history.

**Implication:** The financial dashboard should present understandable period totals and category breakdowns, while transaction search and filtering should help users inspect the underlying records. The system should avoid double-counting identifiable transfers between the user's own accounts when calculating spending. Data not present in uploaded bank statements cannot be assumed to be available.

### 3.4. Key finding 3 — Graphs can add value, but complexity is a risk

P1 wants to examine frequent transfers and flows between personal accounts. P4 wants to map payments from clients to savings, tax reserves, and spending accounts. P5 values a broader view of transfers between salary accounts, service providers, and family members. P2 finds a graph appealing only if it is easy to read. P3 describes the feature as potentially excessive for simple banking needs.

**Implication:** Graph analytics should complement rather than replace conventional charts. Clear node labels, filtering, selection of accounts or counterparties, and related transaction details would make the visualization more useful. A transaction graph alone cannot establish who legally owes money to whom; debt tracking would require additional information and logic.

### 3.5. Key finding 4 — Users want quick answers, with safeguards

P1, P2, and P4 suggest practical questions about taxis, large purchases, category spending, income differences, or software expenses. P3 would use an assistant only if financial data remains private. P5 additionally emphasizes encryption and asks about year-over-year utility costs.

**Implication:** The chat assistant should answer questions **from available imported transaction records** and clearly disclose when data is missing or a requested calculation cannot be supported. Accuracy should be checked against known test data. Interest in an assistant does not, by itself, validate predictions, unrestricted financial advice, or any particular AI implementation.

## 4. Connection Between Evidence and Project Requirements

The following table translates interview findings into proposed requirements that align with the planned diploma project's core capabilities. Priorities are **the team's preliminary design decisions**, not priorities assigned by interviewees.

| ID | Interview evidence | Proposed requirement / design response | Preliminary priority | How the requirement can be checked |
|---|---|---|---|---|
| ER-01 | P1, P2, P4, P5 need cross-account analysis. | Allow users to upload bank statements from supported sources and view the resulting transactions together. | High | Import two supported example statements and verify both appear in a unified transaction list without losing source identification. |
| ER-02 | P1 and P4 describe misleading classification of transfers; P2 needs to understand net spending. | Define income, expense, and transfer treatment consistently, avoiding double-counted self-transfers when such transfers can be reliably identified. | High | Compare calculated totals with a manually verified sample that includes identifiable transfers between the user's own accounts. |
| ER-03 | P1, P2, P4, P5 describe category or interpretation limitations. | Provide category-level and period-based summaries, transaction filtering, and clear transaction details. | High | Verify dashboard totals against the imported test dataset and demonstrate search/filter operations. |
| ER-04 | P1, P2, P4, P5 express interest in seeing financial connections; P3 prefers simplicity. | Offer an optional interactive graph showing relationships among accounts, counterparties, and transactions. | Medium–High | Select a node and inspect its related transactions; verify the graph is consistent with the underlying test records. |
| ER-05 | P1, P2, P4 request quick answers; P3, P5 require privacy safeguards. | Provide a natural-language assistant for questions about imported transaction data, with clear limitations and access controls. | Medium–High | Ask predefined questions about sample transactions and compare answers with independently calculated expected results. |
| ER-06 | P3 and P5 explicitly raise data privacy; all participants discuss sensitive financial activity. | Protect uploaded financial data using authentication, authorization, and appropriate secure handling of stored and transmitted data. | High | Test that one user cannot retrieve another user's transaction information, including through assistant responses. |
| ER-07 | P2 and P3 suggest simple, low-effort interactions; P3 doubts the need for a complicated graph. | Keep core transaction summaries accessible without requiring users to interact with the graph or chat assistant. | High | Complete basic transaction-review tasks directly through the dashboard and list view. |

These are evidence-informed **candidate requirements**, to be refined in the separate Requirements Specification, prioritized with the team and supervisor, and verified through testing. They should not be interpreted as features that have already been implemented.

### 4.1. Requested features outside or beyond the current core scope

The interviews also generated proposals that are valuable but should **not silently become mandatory diploma-project deliverables**.

| Requested idea | Participant(s) | Decision at this stage |
|---|---|---|
| Daily “Safe-to-Spend” indicator and advanced budget forecasts | P1 | Record as a possible future enhancement; requires definitions of recurring costs, incomplete data handling, and forecast validation. |
| Automatic or intelligent transaction tagging | P2 | Consider progressively; basic classification and transparent corrections should be evaluated before assuming reliable automation. |
| Bill-splitting, debt records, and reminders | P3 | Future enhancement; bank transfers alone cannot verify outstanding personal debts. |
| Variable-income forecasting and automatic tax/savings allocation | P4 | Future enhancement; calculations may depend on information not found in bank statements. |
| Direct bank synchronization, net-worth tracking, and investment integration | P5 | Outside the currently established bank-statement-upload workflow; requires separate feasibility, integration, and security assessment. |

No participant-requested feature is rejected as unimportant. The distinction is between **evidence of user interest** and **a feasible, approved project commitment**.

## 5. Evidence, Interpretations, and Remaining Assumptions

One of the goals of this document is to make the basis of project decisions traceable.

| Statement | Evidence status | Basis or next verification step |
|---|---|---|
| Five potential users were interviewed on October 19–21, 2026. | **Reported interview activity** | Interview dates and responses were provided by the project team. The findings are summarized in Section 3, and the interview questions are listed in Appendix A. |
| Four of the five respondents have at least occasional multi-account analysis needs. | **Supported by interview responses** | P1, P2, P4, P5, Question 4. This describes only the five respondents. |
| Users encounter problems with the clarity or usefulness of existing banking-app analytics. | **Supported as user perceptions** | P1–P5, Question 3; this is not an independent comparison of the banks' actual features. |
| Four participants see potential value in graph-based visualization. | **Supported as expressed interest** | P1, P2, P4, P5, Question 6; P2 requires readability and P3 is cautious. Actual usability is untested. |
| All five participants express some interest in AI-based questions about transactions. | **Supported as expressed interest, with conditions** | P1–P5, Question 7; P3 and P5 specify privacy/security conditions. |
| Imported statements from different banks can be normalized accurately. | **Not yet verified** | Requires examination of supported formats, implementation, and correctness tests. |
| An AI assistant will always provide correct, secure answers. | **Not established** | Requires engineering safeguards and evaluation using known-answer tests. |
| Banks provide usable integration APIs for automatic account synchronization. | **Not established** | Requires separate provider-specific technical and legal assessment; not assumed in the current scope. |
| The findings apply to the general population of banking users. | **Not established** | Five participants form a small, non-representative group. |

## 6. Limitations and Ethical Considerations

- **Small sample:** Five participants provide useful early requirements evidence, but the findings are qualitative and are not statistically generalizable.
- **Profile balance:** Four participants are students and only one is an employee, so the findings emphasize student financial habits.
- **Self-reported experiences:** Statements about the banking applications reflect users' experiences and opinions, not independently tested application capabilities.
- **Scope of collected evidence:** Only the interview responses supplied for this report were analyzed; no live financial accounts, exported bank statements, usability observations, or system performance measurements were provided.
- **Data minimization:** The report uses participant codes and does not include names, account numbers, account balances, or identifiable transaction records. Future prototype testing should use synthetic or appropriately de-identified financial data and obtain relevant permissions if personal data is collected.
- **Unrecorded metadata:** Interview channel, duration, and consent-record details were not supplied. The team should keep any available interview documentation separately rather than inventing it here.

## 7. Conclusion

The five interviews provide direct user-reported evidence that analyzing bank transactions can involve **fragmented account information, insufficiently informative spending summaries, time-consuming transaction interpretation, and complex money flows**. Four participants report at least occasional cross-account needs. Several participants see value in graph exploration, and all express some degree of interest in natural-language financial queries, with privacy and simplicity emerging as important conditions.

These findings support the relevance of the planned web service's **bank-statement import, financial dashboard, transaction search and filtering, graph analytics, and intelligent chat assistant**. They also point to design priorities: transparent financial calculations, avoiding misleading transfer totals, usable visualizations, controlled access to sensitive data, and careful handling of incomplete information.

The interviews **do not prove** that any proposed design will work correctly, that every requested enhancement should be implemented, or that these preferences represent a wider population. Those questions should be addressed through the Requirements Specification, prototype feedback, and the project's Verification and Evaluation Plan.

**Overall conclusion:** The reported interviews satisfy the project requirement to engage **3–5 potential user representatives** and provide a traceable, evidence-informed basis for refining the diploma project's requirements, while keeping user observations separate from technical assumptions.

---

## Appendix A. Interview Questions

**1. How often do you check your transaction history and expenses?**

**2. Which banking applications do you currently use?**

**3. Do you find the financial analytics in your banking applications sufficient? Why or why not?**

**4. Have you ever needed to analyze transactions from multiple bank accounts?**

**5. What difficulties do you face when tracking your income and expenses?**

**6. Would an interactive graph showing connections between accounts, recipients, and transactions be useful to you? Why?**

**7. Would you use an AI chat assistant to ask questions about your financial transactions?**

**8. What feature would be most valuable to you in a financial analysis web service?**
