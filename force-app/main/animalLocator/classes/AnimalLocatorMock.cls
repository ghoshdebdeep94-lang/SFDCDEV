@isTest
global class AnimalLocatorMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest request){
        HttpResponse response = new HttpResponse();
        
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(200);
        response.setBody('{"animal":{"id":1,"name":"chicken"}}');

        return response;
    }
}