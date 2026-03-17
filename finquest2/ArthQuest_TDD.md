# **ArthQuest — Technical Design Document (TDD)**

|**Field**|**Value**|
| :- | :- |
|**Version**|TDD v1.0|
|**Stack**|Vanilla HTML/CSS/JS, Chart.js, Claude API|
|**Storage**|localStorage (JSON serialised state object)|
|**Date**|March 2026|

## **1. Architecture Overview**
ArthQuest is a single-file, client-side SPA with no build system or framework. State lives in a single JS object (S) and is persisted to localStorage via JSON. All rendering is imperative innerHTML replacement. The Claude API is called directly from the browser for invoice scanning.

Key invariant: every render function is idempotent and replaces container innerHTML entirely. No incremental DOM patches.

## **2. State Schema**

|**Field**|**Type**|**Notes**|
| :- | :- | :- |
|**xp**|number|Total experience points accumulated|
|**transactions[]**|array|Each: {id,title,amount,type,cat,date,teammateId,teammateToId,fromScan,recurring}|
|**teammates[]**|array|Each: {id,name,type,balance,initialBalance,color,icon}|
|**bosses[]**|array|Each: {id,name,type,total,paid,emi,defeated,emiPaidMonths[]}|
|**plants[]**|array|Each: {id,name,target,icon,monthly,saved,lastWatered}|
|**earnedBadges[]**|array|String IDs of earned badges|
|**completedQuests[]**|array|String IDs of completed quests|
|**streak**|number|Current consecutive day count|
|**streakDays[]**|array|ISO date strings (YYYY-MM-DD) of logged days|
|**scanCount**|number|Total invoices scanned|
|**budgets**|object|NEW: {cat: monthlyLimit} map|
|**recurringTx[]**|array|NEW: recurring transaction templates|
|**hasOnboarded**|boolean|NEW: whether onboarding was shown|

## **3. Bug Fixes — Technical Approach**
### **BUG-01: Duplicate DOM IDs (Critical)**
Root cause: Invoice scan UI copy-pasted into both page-scan and tx-overlay modal's scan-form, creating identical IDs.

Fix: Introduce a module-level variable let scanCtx = 'page'. Helper function scanEl(id) returns document.getElementById(scanCtx === 'modal' ? 'modal-'+id : 'page-'+id). Rename all scan elements with page- and modal- prefixes. Update all scan handlers to use scanEl().
### **BUG-02: Chart.js Memory Leak (Critical)**
Fix: let \_charts = {}. Replace new Chart(ctx, cfg) with: \_charts[key]?.destroy(); \_charts[key] = new Chart(ctx, cfg). Call in renderReports() before creating new charts.
### **BUG-03: Duplicate Quest/Badge IDs (Critical)**
Fix: Rename elements in page-achievements to ach-quests-active, ach-quests-done, ach-badge-grid. renderAchievements() targets these prefixed IDs independently from renderQuests() and renderBadges().
### **BUG-04: EMI Page Missing (Major)**
Fix: Add <div class='page' id='page-emi'> containing the EMI schedule and pay-list cards. Move EMI content from page-bosses into this new page. Keep a compact EMI summary widget in page-bosses.
### **BUG-05: Streak Date Locale (Major)**
Fix: Replace todayStr() return value: from new Date().toDateString() to new Date().toISOString().split('T')[0]. Update all comparisons accordingly.
### **BUG-06: Type Toggle Visual State (Major)**
Fix: At the start of setTxType(), explicitly reset all three buttons: document.getElementById('m-exp').className = 'type-btn'; (same for m-inc, m-tr). Then apply the new active class to the selected button only.
### **BUG-07: Seed Data on Fresh Start (Major)**
Fix: Add S.hasOnboarded boolean. On boot, if !S.hasOnboarded, show an onboarding overlay with two buttons: 'Load demo data' (calls seedDemoData() then sets flag) and 'Start fresh' (just sets flag). This prevents accidental seeding.
### **BUG-08: Boss Payment Hardcoded (Major)**
Fix: Add a teammate dropdown to the boss attack modal HTML. In confirmBossAttack(), read the selected teammate from this dropdown instead of defaulting to S.teammates[0].

## **4. New Feature Design**
### **4.1 Budget Limits per Category**
Data: S.budgets = { food: 5000, transport: 2000 }. UI: Settings card in Reports page — one input per category. Logic: checkBudgets() runs after every saveTx(). If category spend crosses 80% of budget, toast warning. If 100%, add badge to category in dashboard breakdown.
### **4.2 Recurring Transactions**
Data: Add recurring: true, recurrenceDay: 1 fields to transactions. S.recurringTx[] stores templates. On boot, checkRecurring() scans templates — if today >= recurrenceDay and template not yet logged this month (compare month/year), show a dismissible banner listing pending recurrings.
### **4.3 Search and Filter Transactions**
UI: Search bar at top of page-transactions plus filter chips (All, Income, Expense, Transfer). Logic: filterTx(query, typeFilter) filters S.transactions by title match and type. Debounce search input 300ms. Re-render on every filter change.
### **4.4 CSV Export**
Function exportCSV(): maps S.transactions to CSV rows. Headers: Date, Title, Type, Category, Amount, Account. Uses Blob + URL.createObjectURL + auto-click anchor to trigger browser download. No external dependency needed.
### **4.5 Boss Payment Account Selector**
Add a teammate select dropdown to the boss attack sheet modal. Populate with S.teammates. Use selected value as teammateId when creating the expense transaction for the payment.

## **5. Rendering Architecture**
showPage(name) -> sets CSS active class -> calls renderPage(name) -> routes to specific render function.

Each render function: (1) guards against missing container element, (2) computes derived data, (3) replaces innerHTML with new HTML string, (4) may attach event listeners via onclick attributes in the HTML string.

Modal pattern: overlay div with class 'open' for visibility. Module-level state variables (editingTxId, attackingBossId, etc.) carry context into the modal. Close functions clear these variables.

## **6. Security Notes**
- No API key is embedded in the HTML — Claude API auth is handled by the claude.ai proxy in artifact context
- Add file size validation in handleScan(): if file.size > 5\*1024\*1024, show error and abort
- localStorage is plaintext — do not store credentials, tokens, or sensitive PII beyond what the finance tracker requires
- CSV export contains only user-entered financial data — safe to download

## **7. Performance Optimisations**
- Debounce persist() calls with 500ms delay — currently fires synchronously after every state mutation
- Debounce transaction search input with 300ms
- Cache drawPlant() SVG output keyed by plantId+status+pct to avoid redundant string generation
- If S.transactions.length > 300, render transactions page with pagination (50 per page)
- Guard renderReports() with active-page check to avoid invisible canvas chart creation
