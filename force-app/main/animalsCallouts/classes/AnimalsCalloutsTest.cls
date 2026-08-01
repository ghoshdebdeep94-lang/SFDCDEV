@isTest
private class AnimalsCalloutsTest {

    @isTest
    static void testGetCallout() {
        // 1. Assign your mock class to the test context
        Test.setMock(HttpCalloutMock.class, new AnimalsHttpCalloutMock());

        // 2. Wrap callouts between Test.startTest() and Test.stopTest()
        Test.startTest();
        HttpResponse response = AnimalsCallouts.makeGetCallout();
        Test.stopTest();

        // 3. Verify assertions
        Assert.areEqual(200, response.getStatusCode(), 'Expected 200 status code');
        Assert.areEqual('application/json', response.getHeader('Content-Type'));
        Assert.areEqual('{"animals":["majestic badger","fluffy bunny","scary bear","chicken"]}', response.getBody());
    }

    @isTest
    static void testPostCallout() {
        // 1. Assign the SAME mock class
        Test.setMock(HttpCalloutMock.class, new AnimalsHttpCalloutMock());

        // 2. Execute callout
        Test.startTest();
        HttpResponse response = AnimalsCallouts.makePostCallout();
        Test.stopTest();

        // 3. Verify assertions
        Assert.areEqual(201, response.getStatusCode(), 'Expected 200 status code');
        Assert.areEqual('application/json', response.getHeader('Content-Type'));
        Assert.areEqual('{"animals": ["majestic badger", "fluffy bunny", "scary bear", "chicken", "mighty moose"]}', response.getBody());
    }
}