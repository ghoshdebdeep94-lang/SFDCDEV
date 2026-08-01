import { LightningElement } from "lwc";
import getWeather from "@salesforce/apex/WeatherAPI.getWeather";

export default class WeatherAPI extends LightningElement {
  city;
  imageURL;
  condition;
  error;

  handleCityChange(event) {
    this.city = event.target.value;
  }

  getWeatherData() {
    getWeather({ city: this.city })
      .then((response) => {
        //console.log('###Response:'+response);

        this.error = null;
        let parsedData = JSON.parse(response);
        this.imageURL = parsedData.current.condition.icon;
        this.condition = parsedData.current.condition.text;
      })
      .catch((error) => {
        //console.log('###Error:'+JSON.stringify(error));

        this.imageURL = null;
        this.condition = null;
        this.error = "No matching condition found";
      });
  }
}
