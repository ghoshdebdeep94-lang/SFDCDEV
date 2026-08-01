@isTest
global class AnimalsHttpCalloutMock implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');

        switch on request.getMethod() {
            when 'GET' {
                response.setStatusCode(200);
                response.setBody('{"animals":["majestic badger","fluffy bunny","scary bear","chicken"]}');
            }

            when 'POST' {
                response.setStatusCode(201);
                response.setBody('{"animals": ["majestic badger", "fluffy bunny", "scary bear", "chicken", "mighty moose"]}');
            }
        }
        return response;
    }
}