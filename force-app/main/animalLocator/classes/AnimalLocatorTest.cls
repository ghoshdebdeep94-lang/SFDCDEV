@isTest
private class AnimalLocatorTest {
    
    @isTest
    static void testGetCallout() {
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());

        Test.startTest();
        String name = AnimalLocator.getAnimalNameById(1);
        Test.stopTest();

        //Assert.areEqual(200, response.getStatusCode(), 'Expect 200 as status code');
        Assert.areEqual('chicken', name);
    }

    @isTest
    static void testGetCalloutNotFound() {
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorFailMock());

        Test.startTest();
        String name = AnimalLocator.getAnimalNameById(1);
        Test.stopTest();

        Assert.isNull(name, 'Expect null when status code is not 200');
    }
}