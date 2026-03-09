/**
 * @description Unit tests for ContactManager Apex class.
 * Verifies query limits, filtering by Account and IsActive__c, and edge cases.
 * Ensures no SeeAllData usage and proper test isolation.
 */
@IsTest
private class ContactManagerTest {
    /**
     * @description Creates test Accounts and Contacts.
     * Data shape:
     * - 1 Account with 5 Contacts (3 active, 2 inactive)
     * - 1 Account with 2 Contacts (both active)
     * - 3 standalone Contacts (no Account)
     */
    @TestSetup
    static void setupData() {
        List<Account> accts = new List<Account>{
            new Account(Name = 'Acme A'),
            new Account(Name = 'Beta B')
        };
        insert accts;

        // Contacts under Acme A
        List<Contact> acmeContacts = new List<Contact>{
            new Contact(LastName = 'A-One', Email='a1@example.com', AccountId = accts[0].Id, IsActive__c = true),
            new Contact(LastName = 'A-Two', Email='a2@example.com', AccountId = accts[0].Id, IsActive__c = true),
            new Contact(LastName = 'A-Three', Email='a3@example.com', AccountId = accts[0].Id, IsActive__c = true),
            new Contact(LastName = 'A-Four', Email='a4@example.com', AccountId = accts[0].Id, IsActive__c = false),
            new Contact(LastName = 'A-Five', Email='a5@example.com', AccountId = accts[0].Id, IsActive__c = false)
        };

        // Contacts under Beta B
        List<Contact> betaContacts = new List<Contact>{
            new Contact(LastName = 'B-One', Email='b1@example.com', AccountId = accts[1].Id, IsActive__c = true),
            new Contact(LastName = 'B-Two', Email='b2@example.com', AccountId = accts[1].Id, IsActive__c = true)
        };

        // Orphan contacts (no Account)
        List<Contact> orphanContacts = new List<Contact>{
            new Contact(LastName = 'O-One', Email='o1@example.com', IsActive__c = true),
            new Contact(LastName = 'O-Two', Email='o2@example.com', IsActive__c = false),
            new Contact(LastName = 'O-Three', Email='o3@example.com', IsActive__c = true)
        };

        insert acmeContacts;
        insert betaContacts;
        insert orphanContacts;
    }

    /**
     * @description Validates that getContacts honors the LIMIT parameter.
     */
    @IsTest
    static void testGetContactsHonorsLimit() {
        Test.startTest();
        List<Contact> top3 = ContactManager.getContacts(3);
        Test.stopTest();

        System.assertEquals(3, top3.size(), 'Expected exactly 3 contacts due to LIMIT');
        // Validate projected fields are accessible (non-FLS aware in tests; verifying shape)
        Contact c = top3[0];
        // Access fields included in the SELECT to ensure no QueryException on missing fields
        String concatenated = String.valueOf(c.Id) + '' + c.LastName + '' + c.Email + '' + c.Phone + '' + c.Title + '' + c.Name;
    }

    /**
     * @description Edge case: zero limit should return zero rows.
     */
    @IsTest
    static void testGetContactsZeroLimit() {
        Test.startTest();
        List<Contact> none = ContactManager.getContacts(0);
        Test.stopTest();

        System.assertEquals(0, none.size(), 'Limit 0 should return empty list');
    }

    /**
     * @description Validates activeContacts filters by AccountId and IsActive__c = true.
     */
    @IsTest
    static void testActiveContactsTrueFilter() {
        Account acme = [SELECT Id FROM Account WHERE Name = 'Acme A' LIMIT 1];

        Test.startTest();
        List<Contact> active = ContactManager.activeContacts(acme.Id, true);
        Test.stopTest();

        System.assertEquals(3, active.size(), 'Acme A should have 3 active contacts');
        // Ensure all returned contacts belong to the requested account and are active
        for (Contact c : active) {
            System.assertEquals(acme.Id, c.AccountId, 'Contact must belong to Acme A');
            System.assertEquals(true, (Boolean)c.get('IsActive__c'), 'Contact must be active');
        }
    }

    /**
     * @description Validates activeContacts filters by AccountId and IsActive__c = false.
     */
    @IsTest
    static void testActiveContactsFalseFilter() {
        Account acme = [SELECT Id FROM Account WHERE Name = 'Acme A' LIMIT 1];

        Test.startTest();
        List<Contact> inactive = ContactManager.activeContacts(acme.Id, false);
        Test.stopTest();

        System.assertEquals(2, inactive.size(), 'Acme A should have 2 inactive contacts');
        for (Contact c : inactive) {
            System.assertEquals(acme.Id, c.AccountId, 'Contact must belong to Acme A');
            System.assertEquals(false, (Boolean)c.get('IsActive__c'), 'Contact must be inactive');
        }
    }

    /**
     * @description Validates that passing an Account with no matching records returns empty list.
     */
    @IsTest
    static void testActiveContactsNoMatches() {
        // Create an account with no contacts
        Account emptyAcct = new Account(Name = 'No Contacts Inc');
        insert emptyAcct;

        Test.startTest();
        List<Contact> noneActive = ContactManager.activeContacts(emptyAcct.Id, true);
        List<Contact> noneInactive = ContactManager.activeContacts(emptyAcct.Id, false);
        Test.stopTest();

        System.assertEquals(0, noneActive.size(), 'No active contacts should be returned');
        System.assertEquals(0, noneInactive.size(), 'No inactive contacts should be returned');
    }

    /**
     * @description Negative/edge: null AccountId should return empty list (SOQL WHERE AccountId = null evaluates false).
     */
    @IsTest
    static void testActiveContactsNullAccountId() {
        Test.startTest();
        List<Contact> result = ContactManager.activeContacts(null, true);
        Test.stopTest();

        System.assertEquals(0, result.size(), 'Null AccountId should not match any contacts');
    }

    /**
     * @description Bulk-safety: multiple consecutive calls within a single transaction.
     */
    @IsTest
    static void testBulkSafetyMultipleCalls() {
        Account acme = [SELECT Id FROM Account WHERE Name = 'Acme A' LIMIT 1];
        Account beta = [SELECT Id FROM Account WHERE Name = 'Beta B' LIMIT 1];

        Test.startTest();
        List<Contact> acmeActive = ContactManager.activeContacts(acme.Id, true);   // expect 3
        List<Contact> acmeInactive = ContactManager.activeContacts(acme.Id, false); // expect 2
        List<Contact> betaActive = ContactManager.activeContacts(beta.Id, true);   // expect 2
        List<Contact> top5 = ContactManager.getContacts(5); // ensure LIMIT works under load
        Test.stopTest();

        System.assertEquals(3, acmeActive.size(), 'Acme A active count mismatch');
        System.assertEquals(2, acmeInactive.size(), 'Acme A inactive count mismatch');
        System.assertEquals(2, betaActive.size(), 'Beta B active count mismatch');
        System.assertEquals(5, top5.size(), 'Top 5 contacts expected');
    }
}
