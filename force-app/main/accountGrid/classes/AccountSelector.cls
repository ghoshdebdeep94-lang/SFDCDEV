public inherited sharing class AccountSelector {
  public static List<Account> selectForGrid() {
    return [
      SELECT Id, Name, Phone, Type
      FROM Account
      ORDER BY Name
      LIMIT 200
    ];
  }
}
