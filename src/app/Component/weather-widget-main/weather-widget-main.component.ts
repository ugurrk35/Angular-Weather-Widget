import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData:any;
  constructor() { }

  ngOnInit(): void {
    this.WeatherData={
      main:{},
      isDay:true
    }
    this.getWeatherData();
    console.log(this.WeatherData);
  }
  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=e84e4b6f06df7080bd376ac8bbbb6f42')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
    // let data = JSON.parse('{ "coord": { "lon": 28.9833, "lat": 41.0351 }, "weather": [ { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" } ], "base": "stations", "main": { "temp": 277.68, "feels_like": 272.99, "temp_min": 277.24, "temp_max": 278.74, "pressure": 1022, "humidity": 65 }, "visibility": 10000, "wind": { "speed": 7.2, "deg": 210 }, "clouds": { "all": 0 }, "dt": 1643359506, "sys": { "type": 1, "id": 6970, "country": "TR", "sunrise": 1643347120, "sunset": 1643382903 }, "timezone": 10800, "id": 745042, "name": "Istanbul", "cod": 200 }');
    // this.setWeatherData(data);
  }

  setWeatherData(data:any){

    this.WeatherData=data;
    let sunsetTime=new Date(this.WeatherData.sys.sunset*1000);
    this.WeatherData.sunset_time=sunsetTime.toLocaleTimeString();
    let currentDate=new Date();
    this.WeatherData.isDay=(currentDate.getTime()<sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);


  }
}
