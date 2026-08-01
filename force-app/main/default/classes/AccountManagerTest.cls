@isTest
private class AccountManagerTest {
    @isTest static void testGetAccountBtId(){
        Id accountId = createTestRecord();
        RestRequest request = new RestRequest();
        request.requestURI =
            'https://MyDomain.my.salesforce.com/services/apexrest/Account/'
            + accountId + '/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        
        Account acc = AccountManager.getAccount();
        
        Assert.isTrue(acc != null);
        Assert.areEqual('Jamingo', acc.Name);
    }
    
    static Id createTestRecord() {
        // Create test record
        Account accTest = new Account(
            Name ='Jamingo'
            );
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