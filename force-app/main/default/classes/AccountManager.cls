/*Use method via - /services/apexrest/Accounts/<pass record Id here>/contacts
 The method can be accessed via workbench*/

@RestResource(urlMapping='/Accounts/*/contacts')
global with sharing class AccountManager {
  @HttpGet
  global static Account getAccount() {
    RestRequest req = RestContext.request;
    String requestURI = req.requestURI;

    //Pattern: .../Accounts/<Account_ID>/contacts
    //Take the segment right before '/contacts', so any URI prefix works
    String accountId = requestURI.substringBeforeLast('/contacts')
      .substringAfterLast('/');

    Account acc = [
      SELECT Id, Name, (SELECT Id, Name FROM Contacts)
      FROM Account
      WHERE Id = :accountId
      LIMIT 1
    ];

    return acc;
  }
}
