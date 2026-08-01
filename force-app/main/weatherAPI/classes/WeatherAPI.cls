public with sharing class WeatherAPI {
  @AuraEnabled
  public static string getWeather(String city) {
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('callout:WeatherAPI/current.json?q=' + city);
    request.setMethod('GET');
    HttpResponse response = http.send(request);
    return response.getBody();
  }
}
