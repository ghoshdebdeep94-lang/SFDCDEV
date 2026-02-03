public with sharing class ContactManager {
    // @AuraEnabled(cacheable=true)
    // public static List<Contact> getContacts(){
    //     return [SELECT Id, Name, LastName, Email, Phone, Title FROM Contact];
    // }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Integer records){
        return [SELECT Id, Name, LastName, Email, Phone, Title FROM Contact LIMIT :records];
    }
}