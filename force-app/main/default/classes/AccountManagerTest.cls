@isTest
private class AccountManagerTest {
  @isTest
  static void testGetAccountById() {
    Id accountId = createTestRecord();
    RestRequest request = new RestRequest();
    request.requestURI =
      '/services/apexrest/Accounts/' +
      accountId +
      '/contacts';
    request.httpMethod = 'GET';
    RestContext.request = request;

    Account acc = AccountManager.getAccount();

    Assert.isNotNull(acc);
    Assert.areEqual('Jamingo', acc.Name);
    Assert.areEqual(1, acc.Contacts.size());
    Assert.areEqual('John Doe', acc.Contacts[0].Name);
  }

  static Id createTestRecord() {
    // Create test record
    Account accTest = new Account(Name = 'Jamingo');
    insert accTest;

    Contact conTest = new Contact(
      FirstName = 'John',
      LastName = 'Doe',
      AccountId = accTest.Id
    );

    insert conTest;

    return accTest.Id;
  }
}
