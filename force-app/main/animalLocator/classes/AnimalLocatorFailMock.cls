@isTest
global class AnimalLocatorFailMock implements HttpCalloutMock {
    global HttpResponse respond(HttpRequest request){
        HttpResponse response = new HttpResponse();

        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(404);
        response.setBody('{"error":"not found"}');

        return response;
    }
}
