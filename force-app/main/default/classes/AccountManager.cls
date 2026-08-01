/*Use method via - /services/apexrest/Account/<pass record Id here>
 The method can be accessed via workbench*/

@RestResource(urlMapping='/Account/*/contacts')
global with sharing class AccountManager {
  @HttpGet
  global static Account getAccount() {
    RestRequest req = RestContext.request;
    String requestURI = req.requestURI;

    //Pattern: .../Account/<Account_ID>/contacts
    String accountId = requestURI.substringBetween('/Account/', '/contacts');

    Account acc = [
      SELECT Id, Name, (SELECT Id, Name FROM Contacts)
      FROM Account
      WHERE Id = :accountId
      LIMIT 1
    ];

    return acc;
  }
}
