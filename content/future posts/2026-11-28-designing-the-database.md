# Designing the Database Behind a Personal Finance Application

When building an application that handles financial information, database design is one of the most important decisions.

For FinSight, I wanted a structure that was simple to understand, easy to extend, and capable of maintaining data consistency.

In this article, I'll explain how I approached the database design using Django and PostgreSQL.

## Core entities

The initial database design revolves around three main entities:

- **User** – Represents an application user.
- **Account** – Represents a financial account belonging to a user.
- **Transaction** – Represents an income or expense associated with an account.

The relationships are straightforward:

- One user can have multiple accounts.
- Each account belongs to exactly one user.
- One account can have multiple transactions.
- Each transaction belongs to exactly one account.

This creates a simple hierarchy:

`User → Account → Transaction`

## Designing the Account model

An account stores information such as its name, type, balance, and currency.

I included several account types to support different financial needs:

- Checking
- Savings
- Investment
- Credit

Each account also has an `is_active` field, allowing users to deactivate accounts without permanently deleting them.

This is important because accounts may have associated transaction history that should remain preserved.

## Designing the Transaction model

Transactions represent changes to an account's balance.

Each transaction contains:

- Account reference
- Date
- Type (income or expense)
- Amount
- Description

When an income transaction is created, its amount is added to the account balance. Expenses subtract from it.

For monetary values, I chose Django's `DecimalField` instead of floating-point numbers to avoid precision issues in financial calculations.

Another design decision was to make transactions immutable after creation. They can be deleted, but not edited. This keeps the initial implementation simpler and avoids having to handle multiple balance adjustments when transaction details change.

## Protecting relationships and historical data

One important detail in the database design is the use of `on_delete=models.PROTECT` on the relationship between transactions and accounts.

This prevents an account from being deleted while transactions still reference it.

Instead of permanently deleting accounts, the application supports deactivation.

I wanted to avoid accidentally losing historical financial information through a simple delete operation.

## Keeping the design extensible

Although the initial implementation focuses on users, accounts, and transactions, I designed the system with future functionality in mind.

Some planned additions include:

- Categories for organizing transactions.
- Budgets associated with spending categories.
- Transfers between accounts.
- Financial reports and dashboards.

These additions will introduce new relationships without requiring a complete redesign of the existing database.

## Final thoughts

Database design is about more than deciding which tables to create. It's about understanding how information relates to each other and protecting the integrity of that information.

For FinSight, keeping the initial data model relatively simple allowed me to focus on the core functionality while leaving room for future improvements.

The database structure became the foundation for the rest of the application.

**Source code:** [github.com/sldimitrov/finsight](https://github.com/sldimitrov/finsight)
