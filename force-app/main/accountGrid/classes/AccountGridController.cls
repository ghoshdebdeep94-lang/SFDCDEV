public with sharing class AccountGridController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return AccountGridService.getAccounts();
    }

    @AuraEnabled
    public static void deleteRecord(Id recordId) {
        if (recordId == null) {
            throw new IllegalArgumentException('Record ID cannot be null');
        }
        
        Account accountToDelete = new Account(Id = recordId);
        delete accountToDelete;
    }
}