public with sharing class AccountGridService {
    public static List<Account> getAccounts() {
        return AccountSelector.selectForGrid();
    }
}