# Building FinSight: A Personal Finance Tracker with Django

Managing personal finances can become surprisingly complicated.

Money comes from different sources, expenses are spread across multiple accounts, and keeping track of everything manually can quickly become frustrating. I wanted to explore how software could help solve this problem, so I decided to build **FinSight**, a personal finance management application using Python and Django.

This project started as part of my university coursework, but it also gave me an opportunity to explore practical software engineering concepts, work with relational databases, and solve problems that go beyond simply building CRUD functionality.

In this article, I'll walk through the idea behind FinSight, its architecture, the technologies I chose, and some of the engineering challenges I encountered during development.

## The idea behind FinSight

The main idea was simple: create a centralized place where users can manage their financial accounts and track their income and expenses.

Instead of having financial information scattered across different banking applications, spreadsheets, or notes, users should be able to organize everything in one place.

The initial version focuses on three main concepts:

- **Users** – Each user has access to their own financial information.
- **Accounts** – Users can create and manage different types of financial accounts.
- **Transactions** – Income and expenses are recorded against individual accounts.

For example, a user might have a checking account, a savings account, and an investment account. Each account maintains its own balance and transaction history.

The goal was to build a solid foundation that could later support more advanced features such as budgeting, financial reports, and transaction categorization.

## Technology stack

I chose technologies that would allow me to focus on application logic, data consistency, and maintainability without introducing unnecessary complexity.

The main technologies are:

- **Python** – The primary programming language.
- **Django** – The web framework used to build the application.
- **PostgreSQL** – The relational database used to store financial data.
- **Django Templates** – Used to render the server-side user interface.
- **django-environ** – Used to manage environment-based configuration.

Django was a natural choice for this project. Its built-in authentication system, ORM, form handling, and application structure provide a strong foundation for developing data-driven web applications.

PostgreSQL was selected because the application relies on structured relationships between users, accounts, and transactions. Data integrity is particularly important when dealing with financial information.

## Application architecture

I decided to start with a monolithic architecture.

The application is divided into several Django apps, each responsible for a specific part of the system:

- `users` – User-related functionality.
- `accounts` – Financial account management.
- `transactions` – Income and expense management.
- `core` – Project configuration and shared functionality.

The application follows Django's Model-Template-View (MTV) architecture.

Models define the data structure, views handle requests and application logic, and templates are responsible for rendering the user interface.

I deliberately avoided introducing a separate frontend application or microservices. At this stage, a straightforward monolithic architecture was sufficient for the project's scope.

## Managing accounts and transactions

The two most important domain concepts in FinSight are accounts and transactions.

An account belongs to a single user and contains information such as its name, type, currency, and current balance.

A transaction belongs to an account and represents either an income or an expense.

When a user creates an income transaction, the corresponding amount is added to the account balance. When an expense is recorded, the amount is subtracted.

This sounds straightforward, but it introduces an important engineering challenge: keeping the account balance consistent with its transactions.

## Keeping financial data consistent

One of the most important implementation decisions was how to handle balance updates.

Imagine an account with a balance of 1,000 EUR. A user records an expense of 100 EUR, bringing the balance down to 900 EUR.

What happens if an error occurs while saving the transaction or updating the account?

I didn't want a situation where the transaction was saved but the balance wasn't updated, or vice versa.

To address this, I used Django's `transaction.atomic()` when creating and deleting transactions.

This ensures that the related database operations are treated as a single transaction. If an operation fails, the changes are rolled back instead of leaving the database in an inconsistent state.

I also chose Django's `DecimalField` for monetary values rather than using floating-point numbers.

Financial calculations require predictable decimal precision, so using decimal-based values is a much better fit.

## Protecting user data

Another important requirement was ensuring that users could only access their own accounts and transactions.

Every relevant query takes the authenticated user into consideration. This prevents users from accessing or modifying financial information belonging to someone else.

I also added automated tests to verify this behavior.

For example, attempting to view another user's account or create a transaction against someone else's account should result in a `404 Not Found` response.

I made another deliberate design decision regarding data integrity: accounts cannot be permanently deleted when they have associated transactions. Instead, they can be deactivated.

This is enforced using Django's `on_delete=PROTECT` behavior.

Transactions themselves cannot be edited after creation. They can be deleted, with the corresponding balance adjustment applied.

These decisions simplify the initial implementation while helping preserve the integrity of financial records.

## Testing and performance

I implemented automated tests covering forms, models, views, balance calculations, and user data isolation.

The project currently includes 16 automated tests, all passing at the time of the coursework evaluation.

I also investigated database query performance using Django Debug Toolbar.

One interesting issue I encountered was the N+1 query problem when listing transactions.

In my experiment with 1,000 transactions, the initial implementation generated 1,003 database queries. After optimizing the queryset using Django ORM relationship-loading techniques, the number dropped to just 4.

The measured execution time went from 389.17 ms to 18.15 ms.

This was a particularly useful exercise because it demonstrated how seemingly small ORM implementation decisions can have a significant impact on application performance.

## What's next?

The current version provides the foundation for managing users, accounts, and transactions, but there is plenty of room for improvement.

Some of the features I would like to explore in future iterations include:

- Transaction categories and automatic categorization.
- Budget management and spending limits.
- Transfers between financial accounts.
- Financial dashboards and visual reports.
- Monthly income and expense comparisons.
- Bank API integrations for importing transactions automatically.

These features would make FinSight considerably more useful as a personal finance management platform.

## Final thoughts

Building FinSight was a valuable opportunity to apply programming concepts to a practical problem.

More importantly, it helped me understand that building software isn't just about making features work. It also involves thinking about data integrity, security, performance, architecture, and maintainability.

The project is still evolving, but it provides a solid foundation for exploring these topics further.

I'll be sharing more technical articles about individual parts of the implementation, including Django database transactions, ORM optimization, database design, and application security.

**Source code:** [github.com/sldimitrov/finsight](https://github.com/sldimitrov/finsight)
