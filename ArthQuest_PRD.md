# **ArthQuest — Product Requirements Document (PRD)**

|**Field**|**Value**|
| :- | :- |
|**Version**|PRD v1.0|
|**Status**|Draft — March 2026|
|**Audience**|Product, Design, Engineering|
|**Purpose**|Define requirements, bugs, and roadmap for ArthQuest|

## **1. Executive Summary**
ArthQuest is a gamified personal finance tracker built for the Indian market. It transforms financial tracking into an RPG adventure: earn XP, battle debt bosses, grow a savings garden, and complete quests. The core hypothesis is that clinical finance apps fail because they are boring and shame-inducing; ArthQuest makes financial discipline fun and rewarding.

## **2. Problem Statement**
- Over 80% of urban Indians have no structured personal finance tracking
- Existing apps (Walnut, Money Manager) feel clinical and judgmental
- Debt repayment feels like a chore — no ongoing motivation
- Abstract savings numbers fail to inspire consistent contributions
- Users forget to log daily, breaking the habit loop

## **3. Target Users**
### **Primary: Working Professionals, Age 22-35**
- Salaried employees with salary accounts, credit cards, UPI usage
- 1-3 active EMIs (car loan, home loan, personal loan)
- Basic savings goals (travel, gadgets, emergency fund)
### **Secondary: Students and Freelancers**
- Irregular income, multiple cash flows
- Wants to track savings without complex spreadsheets

## **4. Feature Inventory**

|**Feature**|**Description**|
| :- | :- |
|**Dashboard**|Net worth, income, expenses, savings rate, streak, team snapshot, category breakdown, recent transactions|
|**Transactions**|Add/edit/delete income, expense, transfer. Tap-to-edit. Teammate assignment.|
|**Teammates**|Multiple bank/cash/UPI accounts with computed balance tracking|
|**Boss Battles**|Debts as HP bosses. Attack with payments. Mark EMI paid monthly.|
|**Savings Garden**|Visual plant garden for savings goals. Plants wilt if not watered (no contributions).|
|**Invoice Scan**|Claude AI reads bill images/PDFs and auto-fills transaction form.|
|**XP and Levels**|6 levels from Shishya to Kuber. XP earned on all key actions.|
|**Quests**|7 predefined quests with XP rewards.|
|**Badges**|16 achievement badges unlocked by milestones.|
|**Streak**|Daily login/log streak with weekly calendar view.|
|**Reports**|Expense pie chart, income vs expense line chart, spending alerts.|

## **5. Identified Bugs**
### **Critical Bugs**
1. Duplicate DOM IDs: scan-result, scan-loading, scan-error, upload-zone, file-input, s-title, s-amount, s-cat, s-type, s-teammate all exist twice in the DOM. getElementById returns only the first match — the scan modal is completely broken.
1. Chart.js Memory Leak: renderReports() creates new Chart instances on every page visit without destroying previous instances. Throws 'Canvas already in use' error and leaks memory on each navigation.
1. Duplicate Quest and Badge IDs: quests-active, quests-done, badge-grid appear in both page-quests and page-achievements. Only the first instance ever receives updates — achievements page always shows stale data.
1. Boss Payment Account Hardcoded: confirmBossAttack() always assigns S.teammates[0] as the payment source, ignoring the user's actual paying account.
1. EMI Page Missing: Bottom nav links to showPage('emi') but no div with id='page-emi' exists. Navigating to EMI shows a blank page.
### **Major Bugs**
1. Type Toggle Visual State: setTxType() adds the active class but does not remove it from previously selected buttons correctly — multiple buttons can appear selected simultaneously.
1. Streak Date Comparison: todayStr() uses toDateString() which is locale-dependent and can produce inconsistent results across timezones or locale changes.
1. Seed Data Overrides Fresh Starts: seedDemoData() fires whenever all three arrays are empty, making it impossible for a new user to start with a genuinely clean slate.
1. Scan Save Reads Wrong DOM: saveScan() always targets the first matching DOM IDs, so scan triggered from the modal saves wrong data when the page-scan elements are first in DOM order.
1. simOffset Persisted Globally: simOffset is stored in S and affects daysSince() for ALL plants globally — resetting one demo state affects all.
### **Minor Bugs**
1. Header time element is assigned before DOM is fully ready — initial render shows empty.
1. nav-emi ID is never set on the dynamically appended EMI nav button, so active state never applies.
1. Transfer tx color is always blue regardless of debit/credit direction.
1. renderPage() calls renderBadges() on boot plus renderDashboard() renders redundantly.

## **6. New Feature Proposals**
### **P0 — Fix Before Ship**
- Deduplicate all DOM IDs — refactor scan UI into a context-aware renderer
- Fix Chart.js destroy-before-create pattern
- Create standalone page-emi div
- Add onboarding screen with 'Demo data' vs 'Start fresh' choice
### **P1 — High Value Additions**
- Budget Limits per category — set monthly cap per category with visual overspend warning
- Recurring Transactions — mark transactions as monthly recurring; auto-suggest on next cycle
- Search and Filter — search bar and type filter chips on transactions page
- CSV Export — download monthly statement as CSV
- Boss Payment Account Selector — choose which account to pay boss from
### **P2 — Nice to Have**
- Dark/Light mode manual toggle
- Split bill feature across teammates
- Net worth over time chart
- Transaction notes/memo field

## **7. Success Metrics**
- D7 retention > 40%
- Average transactions logged per user per week > 5
- Boss defeat rate (users who add and pay off a boss) > 20%
- Garden goal completion rate > 15%
- Streak 7-day badge earned by > 25% of active users
