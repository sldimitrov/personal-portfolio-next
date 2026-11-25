# User Data Isolation in Django: Protecting User Accounts and Transactions

When building an application that manages personal financial information, users should only have access to their own data.

This was one of the important requirements when developing FinSight.

The goal was straightforward: an authenticated user should only be able to view and modify their own accounts and transactions.

## Filtering data by user

Every relevant request takes the authenticated user into consideration.

When retrieving accounts or transactions, the application checks their ownership instead of simply looking up records by their ID.

This is important because knowing an account or transaction ID shouldn't be enough to access someone else's financial information.

## Handling unauthorized access

I also wanted to make sure that users couldn't interact with resources belonging to other users.

For example, the application should reject attempts to:

- View another user's account.
- Add a transaction to another user's account.
- Delete another user's transaction.

These scenarios are handled by returning a `404 Not Found` response.

The transaction list is also filtered so that users only see their own transactions.

## Testing data isolation

I included automated tests to verify that this behavior works as expected.

The tests cover:

- Viewing another user's account.
- Adding a transaction to another user's account.
- Deleting another user's transaction.
- Listing transactions and verifying that only the authenticated user's records are returned.

The expected result for unauthorized access is `404 Not Found`.

## Conclusion

Data isolation is an important part of building applications that handle personal information.

It's not enough to implement authentication and allow users to log in. The application must also ensure that every relevant operation respects data ownership.

For FinSight, I implemented user-based filtering and automated tests to verify that users can only access their own financial data.

**Source code:** [github.com/sldimitrov/finsight](https://github.com/sldimitrov/finsight)
