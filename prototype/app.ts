export {};

type Direction = "income" | "expense";

interface Account {
  id: string;
  name: string;
  currency: string;
}

interface Transaction {
  id: string;
  date: string;
  name: string;
  amount: number;
  type: Direction;
  category: string;
  account: string;
  source: "PDF" | "Manual";
  transfer: boolean;
}

interface Answer {
  question: string;
  text: string;
  type: string;
  category: string;
  revision: number;
}

interface Filters {
  period: string;
  currency: string;
  account: string;
  type: string;
  category: string;
  search: string;
  sort: string;
}

interface AppState extends Filters {
  user: string;
  editId: string;
  file: string;
  duplicate: "merged" | "separate" | "pending";
  transferConfirmed: boolean;
  connection: string;
  revision: number;
  answer: Answer | null;
}

const app = document.getElementById("app") as HTMLDivElement;
const toast = document.getElementById("toast") as HTMLDivElement;

const titles = {
  welcome: "Prototype guide",
  login: "Log in",
  register: "Create account",
  dashboard: "Overview",
  accounts: "Accounts & wallets",
  "add-account": "Add account",
  imports: "Statement imports",
  results: "Import results",
  error: "Import error",
  duplicates: "Duplicate review",
  transactions: "Transactions",
  "add-transaction": "Add transaction",
  transfer: "Internal transfer review",
  graph: "Graph explorer",
  chat: "AI assistant"
};

type Page = keyof typeof titles;

const navItems: Page[] = [
  "dashboard", "transactions", "accounts", "imports", "graph", "chat"
];

const accounts: Account[] = [
  { id: "kaspi", name: "Kaspi Gold", currency: "KZT" },
  { id: "halyk", name: "Halyk Bank", currency: "KZT" },
  { id: "cash", name: "Cash wallet", currency: "KZT" }
];

type SampleRow = [
  string, string, string, number, Direction, string, string
];

const sample: SampleRow[] = [
  ["salary", "02", "Monthly salary", 400000, "income", "Income", "halyk"],
  ["freelance", "08", "Freelance project", 80000, "income", "Income", "kaspi"],
  ["market1", "10", "Fresh Market", 18000, "expense", "Groceries", "kaspi"],
  ["out", "12", "Transfer to Halyk", 50000, "expense", "Transfer", "kaspi"],
  ["in", "12", "Transfer from Kaspi", 50000, "income", "Transfer", "halyk"],
  ["rent", "15", "Monthly rent", 120000, "expense", "Housing", "kaspi"],
  ["bus", "16", "City Transport", 5000, "expense", "Transport", "kaspi"],
  ["market2", "18", "Fresh Market", 12000, "expense", "Groceries", "kaspi"]
];

const sampleTransactions: Transaction[] = sample.map(
  ([id, day, name, amount, type, category, account]) => ({
    id,
    date: `2026-10-${day}`,
    name,
    amount: amount * 100,
    type,
    category,
    account,
    source: id === "freelance" ? "Manual" : "PDF",
    transfer: category === "Transfer"
  })
);

let transactions = sampleTransactions.map(item => ({ ...item }));
let sequence = 0;
let toastTimer = 0;

const defaultFilters: Filters = {
  period: "month",
  currency: "KZT",
  account: "all",
  type: "all",
  category: "all",
  search: "",
  sort: "newest"
};

const state: AppState = {
  ...defaultFilters,
  user: "Demo User",
  editId: "",
  file: "",
  duplicate: "merged",
  transferConfirmed: true,
  connection: "market",
  revision: 0,
  answer: null
};

/* Helpers */

function escape(value: string | number): string {
  const symbols: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  };
  return String(value).replace(/[&<>"']/g, symbol => symbols[symbol]);
}

function money(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(amount / 100);
}

function newId(): string {
  return `manual-${Date.now()}-${++sequence}`;
}

function currentPage(): Page {
  const page = location.hash.slice(1);
  return Object.prototype.hasOwnProperty.call(titles, page)
    ? page as Page : "dashboard";
}

function go(page: Page): void {
  if (location.hash === `#${page}`) render();
  else location.hash = page;
}

function notify(message: string): void {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 3500);
}

function account(id: string): Account | undefined {
  return accounts.find(item => item.id === id);
}

function isTransfer(item: Transaction): boolean {
  return item.transfer && state.transferConfirmed;
}

function resetFilters(): void {
  Object.assign(state, defaultFilters);
}

function allRows(): Transaction[] {
  const rows = [...transactions];
  const original = rows.find(item => item.id === "market1");
  if (state.duplicate === "separate" && original) {
    rows.push({ ...original, id: "duplicate", source: "Manual" });
  }
  return rows;
}

function filteredRows(): Transaction[] {
  return allRows().filter(item =>
    account(item.account)?.currency === state.currency &&
    (state.account === "all" || item.account === state.account) &&
    (state.period === "month" || item.date <= "2026-10-15")
  );
}

function totals(rows: Transaction[]) {
  const sum = (type: Direction) => rows
    .filter(item => item.type === type && !isTransfer(item))
    .reduce((total, item) => total + item.amount, 0);
  const income = sum("income");
  const expenses = sum("expense");
  return { income, expenses, net: income - expenses };
}

/* Shared HTML */

const card = (content: string, extra = "") =>
  `<section class="card ${extra}">${content}</section>`;

const notice = (text: string) =>
  `<div class="notice">${text}</div>`;

const actions = (...items: string[]) =>
  `<div class="actions">${items.join("")}</div>`;

const field = (label: string, control: string) =>
  `<label>${label}${control}</label>`;

const input = (name: string, value = "", attributes = "") =>
  `<input name="${name}" value="${escape(value)}" ${attributes}>`;

const link = (label: string, page: Page, primary = false) =>
  `<a href="#${page}" class="button ${primary ? "primary" : ""}">${label}</a>`;

const button = (label: string, action: string, value = "", primary = false) =>
  `<button type="button" class="button ${primary ? "primary" : ""}"
    data-action="${action}" data-value="${escape(value)}">${label}</button>`;

const heading = (title: string, subtitle: string, action = "") =>
  `<header class="page-header">
    <div><h1>${title}</h1><p>${subtitle}</p></div>
    ${action || '<span class="badge">EN · Demo workspace</span>'}
  </header>`;

function select(
  name: string,
  options: string[][],
  selected: string,
  filter = false
): string {
  return `<select ${filter ? `data-filter="${name}"` : `name="${name}"`}>
    ${options.map(([value, label]) =>
      `<option value="${escape(value)}" ${value === selected ? "selected" : ""}>
        ${escape(label)}
      </option>`
    ).join("")}
  </select>`;
}

function accountOptions(): string[][] {
  return accounts.map(item => [item.id, `${item.name} · ${item.currency}`]);
}

function filters(): string {
  return `<div class="filters">
    ${field("Period", select("period", [
      ["month", "October 2026"], ["half", "1–15 October"]
    ], state.period, true))}
    ${field("Currency", select("currency", [
      ["KZT", "KZT"], ["USD", "USD"]
    ], state.currency, true))}
    ${field("Account", select("account", [
      ["all", "All accounts"], ...accountOptions()
    ], state.account, true))}
  </div>`;
}

function table(rows: Transaction[], editable = false): string {
  if (!rows.length) {
    return `<div class="empty"><h3>No transactions found</h3>
      <p>Try another filter or add a transaction.</p></div>`;
  }
  return `<div class="table-wrap"><table>
    <thead><tr>
      <th>Date</th><th>Description</th><th>Account</th>
      <th>Source</th><th class="amount">Amount</th>
      ${editable ? "<th>Action</th>" : ""}
    </tr></thead>
    <tbody>${rows.map(item => {
      const merged = item.id === "market1" && state.duplicate === "merged";
      const canEdit = item.source === "Manual" && item.id !== "duplicate";
      return `<tr>
        <td>${item.date}</td>
        <td><strong>${escape(item.name)}</strong>
          <small>${isTransfer(item) ? "Internal transfer" : escape(item.category)}</small>
        </td>
        <td>${escape(account(item.account)?.name || "")}</td>
        <td><span class="badge">${merged ? "PDF + Manual" : item.source}</span></td>
        <td class="amount">
          ${item.type === "income" ? "+" : "−"}${money(item.amount)}
          ${account(item.account)?.currency || ""}
        </td>
        ${editable ? `<td>${canEdit
          ? button("Edit", "edit", item.id)
          : button("Details", "details", item.id)}</td>` : ""}
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function sidebar(page: Page): string {
  const parents: Partial<Record<Page, Page>> = {
    "add-account": "accounts",
    "add-transaction": "transactions",
    results: "imports",
    error: "imports",
    duplicates: "imports",
    transfer: "dashboard"
  };
  const active = parents[page] || page;
  return `<aside class="sidebar">
    <a href="#dashboard" class="logo">Fin<span>IG</span></a>
    <p class="tagline">YOUR MONEY, CONNECTED</p>
    <nav aria-label="Main navigation">
      ${navItems.map(item => `<a href="#${item}"
        class="nav-link ${active === item ? "active" : ""}"
        ${active === item ? 'aria-current="page"' : ""}>
        ${titles[item]}</a>`).join("")}
    </nav>
    <div class="sidebar-footer">
      <a href="#welcome" class="nav-link">Prototype guide</a>
      <div class="profile">
        <span class="avatar">${escape(state.user.charAt(0))}</span>
        <div><strong>${escape(state.user)}</strong><p>Personal workspace</p></div>
      </div>
      <a href="#login" class="nav-link">Log out of demo</a>
    </div>
  </aside>`;
}

/* Screens */

function welcome(): string {
  return `${heading("Welcome to FinIG", "15 connected screens · Light version")}
    <section class="hero">
      <h2>Your money. Your bigger picture.</h2>
      <p>Manage transactions and explore your financial connections.</p>
      ${actions(
        link("Create demo profile", "register", true),
        link("Open dashboard", "dashboard")
      )}
    </section>
    ${notice("Frontend demo with sample data. Changes reset on refresh. Authentication, PDF extraction and AI are simulated.")}
    <div class="grid three">
      ${(Object.keys(titles) as Page[]).map((page, index) =>
        `<a href="#${page}" class="card guide-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${titles[page]}</h3>
        </a>`
      ).join("")}
    </div>`;
}

function auth(register: boolean): string {
  return `<main class="auth-layout">
    <section class="auth-brand">
      <a href="#welcome" class="logo">FinIG</a>
      <div><h1>Clarity for every transaction.</h1>
        <p>Understand your spending and see how your money connects.</p></div>
      <small>YOUR MONEY, CONNECTED</small>
    </section>
    <section class="auth-content">
      <form class="auth-form" data-form="${register ? "register" : "login"}">
        <span class="badge">FINIG DEMO</span>
        <h2>${register ? "Create account" : "Welcome back"}</h2>
        ${register ? field("Full name", input("name", "", 'required maxlength="60"')) : ""}
        ${field("Email", input("email", "", 'type="email" required'))}
        ${field("Password", input("password", "", 'type="password" minlength="8" required'))}
        ${notice("Use made-up credentials. This demo uses a shared sample workspace. Passwords are not saved.")}
        <button class="button primary">${register ? "Create demo profile" : "Log in to demo"}</button>
        <a class="text-link" href="#${register ? "login" : "register"}">
          ${register ? "Already registered? Log in" : "Create an account"}
        </a>
        <a class="text-link" href="#welcome">Back to guide</a>
      </form>
    </section>
  </main>`;
}

function dashboard(): string {
  const rows = filteredRows();
  const summary = totals(rows);
  const categories = new Map<string, number>();
  rows.filter(item => item.type === "expense" && !isTransfer(item))
    .forEach(item => categories.set(
      item.category, (categories.get(item.category) || 0) + item.amount
    ));
  const metrics = [
    ["Total income", money(summary.income), state.currency],
    ["Total expenses", money(summary.expenses), state.currency],
    ["Net cash flow", money(summary.net), state.currency],
    ["Transactions", String(rows.length), "Account movements"]
  ];
  const weeks = [0, 1, 2, 3].map(week => totals(rows.filter(item =>
    Math.min(3, Math.floor((Number(item.date.slice(8)) - 1) / 7)) === week
  )));
  const maximum = Math.max(1, ...weeks.flatMap(item => [item.income, item.expenses]));
  return `${heading("Your financial overview", "October 2026 · A clearer picture of your money.")}
    ${filters()}
    <div class="grid four">
      ${metrics.map(([label, value, caption]) =>
        card(`<p>${label}</p><h2>${value}</h2><small>${caption}</small>`, "metric")
      ).join("")}
    </div>
    <div class="grid two">
      ${card(`<h2>Cash flow · October</h2>
        <p class="legend">Yellow: income · Teal: expenses · ${state.currency}</p>
        <div class="chart">${weeks.map((item, index) =>
          `<div class="chart-group">
            <div class="bars">
              <span class="bar income" style="height:${item.income / maximum * 150}px"></span>
              <span class="bar expense" style="height:${item.expenses / maximum * 150}px"></span>
            </div>
            <small>${["1–7", "8–14", "15–21", "22–31"][index]} Oct</small>
            <small>${money(item.income)} / ${money(item.expenses)}</small>
          </div>`
        ).join("")}</div>`)}
      ${card(`<h2>Where your money goes</h2>
        ${categories.size ? [...categories].map(([category, amount]) =>
          `<button class="category-row" data-action="category" data-value="${escape(category)}">
            <span class="row"><strong>${escape(category)}</strong>
              <span>${money(amount)} ${state.currency}</span></span>
            <span class="progress"><span style="width:${amount / summary.expenses * 100}%"></span></span>
          </button>`
        ).join("") : '<p class="empty">No expenses in this selection.</p>'}`)}
    </div>
    ${actions(
      link("Review duplicates", "duplicates"),
      link("Review transfer", "transfer"),
      link("Ask assistant", "chat")
    )}
    ${card(`<div class="section-header"><h2>Recent transactions</h2>
      ${link("View all", "transactions")}</div>
      ${table(rows.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4))}`)}
    <p class="muted">Net cash flow is not an account balance.
      Confirmed internal transfers are excluded from income and expenses.</p>`;
}

function accountsPage(): string {
  return `${heading(titles.accounts, "Bank accounts and cash wallets.",
    link("Add account", "add-account", true))}
    ${notice("Demo account labels only. No live bank connection.")}
    <div class="grid three">
      ${accounts.map(item => card(`
        <span class="avatar">${escape(item.name.charAt(0))}</span>
        <h2>${escape(item.name)}</h2><p class="muted">${item.currency}</p>
        ${button("View transactions", "account", item.id)}
      `, "stack")).join("")}
    </div>`;
}

function accountForm(): string {
  return `${heading("Add an account", "Create a bank account or cash wallet label.")}
    <form class="card form stack" data-form="account">
      ${field("Account name", input("name", "", 'required maxlength="40" placeholder="e.g. Freedom Bank"'))}
      ${field("Currency", select("currency", [["KZT", "KZT"], ["USD", "USD"]], "KZT"))}
      ${actions('<button class="button primary">Save account</button>', link("Cancel", "accounts"))}
    </form>`;
}

function importsPage(): string {
  return `${heading(titles.imports, "Choose a statement and review its records.")}
    ${card(`<h2>Upload a PDF statement</h2>
      <p class="muted">Planned support: selected Kaspi, Halyk and Freedom layouts.</p>
      <label class="upload-area"><strong>Choose a PDF file</strong>
        <span>PDF · maximum 10 MB</span>
        <input id="pdf-file" type="file" accept=".pdf,application/pdf">
      </label>
      <p id="file-name" class="muted">${escape(state.file || "No file selected")}</p>
      ${notice("Files are not read or uploaded. The sample button demonstrates the workflow using fixed demo records.")}
      ${actions(button("Load sample import", "sample", "", true), link("Try error scenario", "error"))}
    `, "stack")}`;
}

function resultsPage(): string {
  return `${heading(titles.results, "Sample statement · October 2026 · KZT")}
    ${notice("Eight sample movements, one duplicate candidate and one transfer pair. Repeating the sample import does not create identical records again.")}
    <div class="grid two">
      ${card(`<span class="badge">DUPLICATE CANDIDATE</span>
        <h2>Fresh Market</h2><p>10 October · 18,000 KZT</p>
        ${link("Compare records", "duplicates", true)}`, "stack")}
      ${card(`<span class="badge">TRANSFER CANDIDATE</span>
        <h2>Kaspi → Halyk</h2><p>12 October · 50,000 KZT</p>
        ${link("Review transfer", "transfer", true)}`, "stack")}
    </div>
    ${actions(link("Transactions", "transactions"), link("Dashboard", "dashboard"))}`;
}

function errorPage(): string {
  return `${heading("We could not read this statement", "Existing transactions have not changed.")}
    ${card(`<span class="badge">DEMO ERROR STATE</span><h2>Try another statement</h2>
      <p>Choose a PDF under 10 MB. The planned service supports selected text-based
      layouts, not scanned or password-protected statements.</p>
      ${actions(link("Choose another file", "imports", true), button("Use sample import", "sample"))}
    `, "form stack")}`;
}

function duplicatesPage(): string {
  const messages = {
    merged: "Merged: counted once, with PDF and manual source references.",
    separate: "Kept separate: counted twice.",
    pending: "Pending review: counted once provisionally."
  };
  return `${heading(titles.duplicates, "Do these entries represent the same purchase?")}
    ${notice(messages[state.duplicate])}
    <div class="grid two">
      ${["PDF statement", "Manual entry"].map(source => card(`
        <span class="badge">${source}</span><h2>Fresh Market</h2>
        <h3>18,000 KZT</h3><p class="muted">10 October 2026 · Kaspi Gold</p>
      `, "stack")).join("")}
    </div>
    ${actions(
      button("Same transaction · merge", "merge", "", true),
      button("Different transactions · keep both", "separate"),
      link("View dashboard", "dashboard")
    )}`;
}

function transactionsPage(): string {
  const rows = filteredRows().filter(item => {
    const text = `${item.name} ${item.category}`.toLowerCase();
    const matchesType = state.type === "all" || (state.type === "transfer"
      ? isTransfer(item) : item.type === state.type && !isTransfer(item));
    return matchesType && text.includes(state.search.toLowerCase()) &&
      (state.category === "all" || item.category === state.category);
  });
  rows.sort((a, b) => state.sort === "amount"
    ? b.amount - a.amount : b.date.localeCompare(a.date));
  return `${heading(titles.transactions, "Search, review and manage your records.",
    button("Add transaction", "new", "", true))}
    ${filters()}
    ${card(`<form class="search-form" data-form="search">
        ${input("search", state.search, 'placeholder="Description or category" aria-label="Search"')}
        <button class="button">Search</button>
      </form>
      <div class="filters">
        ${field("Type", select("type", [
          ["all", "All types"], ["income", "Income"],
          ["expense", "Expense"], ["transfer", "Transfer"]
        ], state.type, true))}
        ${field("Sort", select("sort", [
          ["newest", "Newest first"], ["amount", "Largest amount"]
        ], state.sort, true))}
      </div>
      <div class="section-header">
        <p class="muted">${rows.length} transactions
          ${state.category !== "all" ? ` · ${escape(state.category)}` : ""}</p>
        ${button("Reset filters", "reset")}
      </div>
      ${table(rows, true)}
    `, "stack")}`;
}

function transactionForm(): string {
  const item = transactions.find(row => row.id === state.editId);
  const categories = [
    "Groceries", "Housing", "Transport", "Food & drinks", "Shopping", "Income", "Other"
  ];
  return `${heading(item ? "Edit transaction" : "Add transaction", "Record a manual income or expense.")}
    <form class="card form stack" data-form="transaction">
      <div class="grid two">
        ${field("Type", select("type", [
          ["expense", "Expense"], ["income", "Income"]
        ], item?.type || "expense"))}
        ${field("Amount", input("amount", item ? String(item.amount / 100) : "",
          'type="number" min="0.01" max="999999999" step="0.01" required'))}
      </div>
      ${field("Description", input("name", item?.name || "", 'required maxlength="80"'))}
      <div class="grid two">
        ${field("Account", select("account", accountOptions(), item?.account || "cash"))}
        ${field("Category", select("category",
          categories.map(value => [value, value]), item?.category || "Food & drinks"))}
      </div>
      ${field("Date", input("date", item?.date || "2026-10-19",
        'type="date" min="2026-10-01" max="2026-10-31" required'))}
      <small class="muted">This demo covers October 2026.</small>
      ${actions(
        '<button class="button primary">Save transaction</button>',
        link("Cancel", "transactions"),
        item ? button("Delete", "delete", item.id) : ""
      )}
    </form>`;
}

function transferPage(): string {
  return `${heading(titles.transfer, "Two account movements, one possible transfer.")}
    ${notice(state.transferConfirmed
      ? "Confirmed: excluded from income and expense totals."
      : "Unconfirmed: included in income and expense totals.")}
    <div class="grid two">
      ${[["MONEY OUT", "Kaspi Gold", "−50,000"], ["MONEY IN", "Halyk Bank", "+50,000"]]
        .map(([label, name, amount]) => card(`
          <span class="badge">${label}</span><h2>${name}</h2>
          <h3>${amount} KZT</h3><p>12 October 2026</p>
        `, "stack")).join("")}
    </div>
    <p class="muted">Both account movements remain in the table after confirmation.</p>
    ${actions(
      button("Confirm internal transfer", "confirm", "", true),
      button("Keep separate movements", "reject"),
      link("View dashboard", "dashboard")
    )}`;
}

const connections = [
  { id: "market", name: "Fresh Market", ids: ["market1", "market2", "duplicate"] },
  { id: "rent", name: "Monthly rent", ids: ["rent"] },
  { id: "bus", name: "City Transport", ids: ["bus"] },
  { id: "transfer", name: "Halyk Bank", ids: ["out", "in"] }
];

function graphPage(): string {
  const connection = connections.find(item => item.id === state.connection) || connections[0];
  const rows = allRows().filter(item => connection.ids.includes(item.id) &&
    (connection.id !== "transfer" || isTransfer(item)));
  const amount = rows.reduce((sum, item) => sum +
    (connection.id === "transfer" && item.type === "income" ? 0 : item.amount), 0);
  return `${heading(titles.graph, "Select a connection and inspect its evidence.")}
    ${notice("Fixed sample connections · October 2026 · KZT. New manual entries remain in Transactions. Connections use record IDs, not matching names.")}
    ${card(`
      ${field("Connection", select("connection",
        connections.map(item => [item.id, `Kaspi Gold → ${item.name}`]), state.connection, true))}
      ${rows.length ? `<div class="graph-connection">
        <div class="graph-node">Kaspi Gold</div>
        <div class="graph-arrow"><strong>${money(amount)} KZT</strong><span>⟶</span></div>
        <div class="graph-node">${connection.name}</div>
      </div>` : notice("No confirmed connection is available for this selection.")}
      <h3>Supporting transactions</h3>${table(rows)}
    `, "stack")}`;
}

function chatPage(): string {
  const answer = state.answer;
  const stale = answer && answer.revision !== state.revision;
  return `${heading(titles.chat, "Ask a question and check the supporting records.")}
    ${notice("Demo assistant · Local calculations · October 2026 · KZT · All accounts.")}
    ${card(`
      <div class="chat-message">Hello! Ask about expenses, groceries or internal transfers.</div>
      ${answer ? `
        <div class="chat-message user-message">${escape(answer.question)}</div>
        <div class="chat-message stack">
          <p>${escape(answer.text)}</p>
          ${stale ? `<p>Your data changed.</p>${button("Recalculate", "refresh")}`
            : answer.type ? button("Supporting transactions", "evidence") : ""}
          ${link("Explore graph", "graph")}
        </div>` : ""}
      ${actions(
        button("My expenses", "ask", "expenses"),
        button("Groceries", "ask", "groceries"),
        button("Internal transfers", "ask", "transfers")
      )}
      <form class="search-form" data-form="chat">
        ${input("question", "", 'placeholder="How much did I spend?" aria-label="Question" required maxlength="300"')}
        <button class="button primary">Send</button>
      </form>
    `, "stack")}`;
}

function ask(question: string): void {
  const rows = allRows().filter(item => account(item.account)?.currency === "KZT");
  const normalized = question.toLowerCase().replace(/[?!.]/g, "").trim();
  let type = "";
  let category = "all";
  let text = "This demo supports the suggested questions for October 2026 in KZT.";

  if (["groceries", "how much on groceries", "how much did i spend on groceries"].includes(normalized)) {
    type = "expense";
    category = "Groceries";
    const matching = rows.filter(item => item.category === category && item.type === type);
    const amount = matching.reduce((sum, item) => sum + item.amount, 0);
    text = `You spent ${money(amount)} KZT on groceries across ${matching.length} transactions.`;
  } else if (["transfers", "internal transfers", "show my internal transfers"].includes(normalized)) {
    type = "transfer";
    text = state.transferConfirmed
      ? "One internal transfer: 50,000 KZT from Kaspi to Halyk. Excluded from income and expenses."
      : "No internal transfers are currently confirmed.";
  } else if (["expenses", "my expenses", "how much did i spend"].includes(normalized)) {
    type = "expense";
    text = `Your expenses total ${money(totals(rows).expenses)} KZT. Confirmed transfers are excluded.`;
  }
  state.answer = { question, text, type, category, revision: state.revision };
  render();
}

/* Rendering */

const pages = {
  welcome,
  dashboard,
  accounts: accountsPage,
  "add-account": accountForm,
  imports: importsPage,
  results: resultsPage,
  error: errorPage,
  duplicates: duplicatesPage,
  transactions: transactionsPage,
  "add-transaction": transactionForm,
  transfer: transferPage,
  graph: graphPage,
  chat: chatPage
};

function render(): void {
  const page = currentPage();
  document.title = `FinIG — ${titles[page]}`;
  if (page === "login" || page === "register") {
    app.innerHTML = auth(page === "register");
    return;
  }
  app.innerHTML = `${sidebar(page)}<main class="main">${pages[page]()}</main>`;
}

/* Events */

app.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;
  const control = event.target.closest<HTMLElement>("[data-action]");
  if (!control) return;
  const action = control.dataset.action;
  const value = control.dataset.value || "";

  switch (action) {
    case "new":
    case "edit":
      state.editId = action === "edit" ? value : "";
      go("add-transaction");
      break;
    case "delete":
      if (!confirm("Delete this manual transaction?")) return;
      transactions = transactions.filter(item => item.id !== value || item.source !== "Manual");
      state.editId = "";
      state.revision++;
      go("transactions");
      notify("Transaction deleted");
      break;
    case "details": {
      const item = allRows().find(row => row.id === value);
      if (item) notify(`${item.name} · ${item.date} · ${item.source} · Record ID: ${item.id}`);
      break;
    }
    case "reset":
      resetFilters();
      render();
      break;
    case "category":
      state.category = value;
      state.type = "expense";
      state.search = "";
      go("transactions");
      break;
    case "account":
      resetFilters();
      state.account = value;
      state.currency = account(value)?.currency || "KZT";
      go("transactions");
      break;
    case "sample":
      for (const item of sampleTransactions) {
        if (!transactions.some(row => row.id === item.id)) transactions.push({ ...item });
      }
      state.duplicate = "pending";
      state.transferConfirmed = false;
      state.revision++;
      go("results");
      notify("Sample data ready for review");
      break;
    case "merge":
    case "separate":
      state.duplicate = action === "merge" ? "merged" : "separate";
      state.revision++;
      render();
      notify("Duplicate decision updated");
      break;
    case "confirm":
    case "reject":
      state.transferConfirmed = action === "confirm";
      state.revision++;
      render();
      notify("Transfer classification updated");
      break;
    case "ask":
      ask(value);
      break;
    case "refresh":
      if (state.answer) ask(state.answer.question);
      break;
    case "evidence":
      if (!state.answer || state.answer.revision !== state.revision) return;
      resetFilters();
      state.type = state.answer.type;
      state.category = state.answer.category;
      go("transactions");
      break;
  }
});

const filterKeys = [
  "period", "currency", "account", "type", "sort", "connection"
] as const;

app.addEventListener("change", event => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
  const key = filterKeys.find(item => item === target.dataset.filter);
  if (key) {
    state[key] = target.value;
    render();
    return;
  }
  if (!(target instanceof HTMLInputElement) || target.id !== "pdf-file") return;
  const file = target.files?.[0];
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".pdf") || file.size > 10 * 1024 * 1024) {
    state.file = "";
    go("error");
    return;
  }
  state.file = file.name;
  const label = document.getElementById("file-name");
  if (label) label.textContent = file.name;
});

app.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;
  const data = new FormData(form);
  const read = (name: string) => String(data.get(name) || "").trim();

  switch (form.dataset.form) {
    case "register":
      if (!read("name")) return notify("Enter your name");
      state.user = read("name");
      go("add-account");
      notify("Demo profile created");
      break;
    case "login":
      go("dashboard");
      notify("Demo login successful. Credentials were not stored.");
      break;
    case "account":
      if (!read("name")) return notify("Enter an account name");
      accounts.push({ id: newId(), name: read("name"), currency: read("currency") });
      go("imports");
      notify("Account added");
      break;
    case "search":
      state.search = read("search");
      render();
      break;
    case "chat":
      if (read("question")) ask(read("question"));
      break;
    case "transaction": {
      const raw = read("amount");
      if (!/^\d+(\.\d{1,2})?$/.test(raw)) return notify("Use up to two decimal places");
      const [whole, decimals = ""] = raw.split(".");
      const amount = Number(whole) * 100 + Number(decimals.padEnd(2, "0"));
      const selectedAccount = account(read("account"));
      const date = read("date");
      const type = read("type");
      if (!selectedAccount || !read("name") || amount <= 0 ||
          !Number.isSafeInteger(amount) || date < "2026-10-01" ||
          date > "2026-10-31" || !["income", "expense"].includes(type)) {
        return notify("Check the transaction details");
      }
      const item: Transaction = {
        id: state.editId || newId(), date, name: read("name"), amount,
        type: type as Direction, category: read("category"),
        account: selectedAccount.id, source: "Manual", transfer: false
      };
      const index = transactions.findIndex(row =>
        row.id === state.editId && row.source === "Manual"
      );
      if (index >= 0) transactions[index] = item;
      else transactions.push(item);
      state.editId = "";
      state.revision++;
      resetFilters();
      state.currency = selectedAccount.currency;
      go("transactions");
      notify("Transaction saved");
      break;
    }
  }
});

window.addEventListener("hashchange", () => {
  if (currentPage() !== "add-transaction") state.editId = "";
  render();
  window.scrollTo(0, 0);
});

render();