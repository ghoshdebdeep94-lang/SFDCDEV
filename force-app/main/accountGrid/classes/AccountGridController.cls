public with sharing class AccountGridController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return AccountGridService.getAccounts();
  }

  @AuraEnabled
  public static void deleteRecord(Id recordId) {
    if (recordId == null) {
      throw buildException('Record ID cannot be null');
    }

    try {
      delete new Account(Id = recordId);
    } catch (DmlException e) {
      // Raw exceptions reach the client scrubbed, so restate the reason
      throw buildException(e.getDmlMessage(0));
    } catch (Exception e) {
      throw buildException(e.getMessage());
    }
  }

  // AuraHandledException drops its message unless setMessage is also called
  private static AuraHandledException buildException(String message) {
    AuraHandledException e = new AuraHandledException(message);
    e.setMessage(message);
    return e;
  }
}
