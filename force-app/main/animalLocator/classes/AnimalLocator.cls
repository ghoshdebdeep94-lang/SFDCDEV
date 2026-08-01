public with sharing class AnimalLocator {
    public static String getAnimalNameById(Integer id) {
        String endpointUrl = 'https://th-apex-http-callout.herokuapp.com/animals/';
        String getURL = endpointUrl + id;

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(getURL);
        req.setMethod('GET');
        HttpResponse response = http.send(req);

        if (response.getStatusCode() == 200) {
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> animal = (Map<String, Object>) result.get('animal');
            return (String) animal.get('name');
        }
        return null;
    }
}