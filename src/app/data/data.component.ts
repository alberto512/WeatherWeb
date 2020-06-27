import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../services/weather-data.service';
import { CurrentData } from './data-structures'
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {
  data: CurrentData
  previousData: any;
  futureData: any;

  constructor(private _WeatherDataService: WeatherDataService) { 
   }

  ngOnInit(): void {  }

  updateData(ciudad: string) {
    this._WeatherDataService.getData(ciudad)
    .subscribe(d => {
      /* Save weather data from server */
      this.data = d;

      /* Update parameters */
      this.data.dateSunrise = new Date(this.data.sys.sunrise * 1000)
      this.data.dateSunset = new Date(this.data.sys.sunset * 1000)
      this.data.main.feels_like = Math.round(this.data.main.feels_like);
      this.data.rain_bool_1h = false;
      this.data.rain_bool_3h = false;
      this.data.snow_bool_1h = false;
      this.data.snow_bool_3h = false;

      /* Check the rain */
      for (let value in d.rain) {
        if (value == "1h") {
          this.data.rain._1h = `${d.rain[value]}`;
          this.data.rain_bool_1h = true;
        } else if(value == "3h") {
          this.data.rain._3h = `${d.rain[value]}`;
          this.data.rain_bool_3h = true;
        }
      }

      /* Check the snow */
      for (let value in d.snow) {
        if (value == "1h") {
          this.data.snow._1h = `${d.snow[value]}`;
          this.data.snow_bool_1h = true;
        } else if(value == "3h") {
          this.data.snow._3h = `${d.snow[value]}`;
          this.data.snow_bool_3h = true;
        }
      }

      /* Future Weather */
      this._WeatherDataService.getFutureData(this.data.coord.lat, this.data.coord.lon)
      .subscribe((d: any)=>{
        /* Save future weather data from the server */
        this.futureData = d;

        let day: any;
        let day2: any;

        /* Update parameters of hourly */
        for (let hour in this.futureData.hourly) {
          this.futureData.hourly[hour].time = new Date(this.futureData.hourly[hour].dt * 1000);
          this.futureData.hourly[hour].temp = Math.round(this.futureData.hourly[hour].temp);

          if (parseInt(hour) == 0) {
            day = this.futureData.hourly[hour].time.getDate();
            day2 = new Date();
            day2.setDate(day2.getDate() + 1);
            this.futureData.hourly[hour].today = true;
            this.futureData.hourly[hour].tomorrow = false;
          } else {
            if (day == this.futureData.hourly[hour].time.getDate()) {
              this.futureData.hourly[hour].today = true;
              this.futureData.hourly[hour].tomorrow = false;
            } else if(day2.getDate() == this.futureData.hourly[hour].time.getDate()) {
              this.futureData.hourly[hour].today = false;
              this.futureData.hourly[hour].tomorrow = true;
            } else {
              this.futureData.hourly[hour].today = false;
              this.futureData.hourly[hour].tomorrow = false;
            }
          }
        }

        /* Update parameters of daily */
        for (let d in this.futureData.daily) {
          this.futureData.daily[d].time = new Date(this.futureData.daily[d].dt * 1000);
          this.futureData.daily[d].dateSunrise = new Date(this.futureData.daily[d].sunrise * 1000);
          this.futureData.daily[d].dateSunset = new Date(this.futureData.daily[d].sunset * 1000);
          this.futureData.daily[d].name = this.data.name;
          let morn = this.futureData.daily[d].feels_like.morn;
          let day = this.futureData.daily[d].feels_like.day;
          let eve = this.futureData.daily[d].feels_like.eve;
          let night = this.futureData.daily[d].feels_like.night;
          this.futureData.daily[d].feels_like_total = Math.round((morn+day+eve+night)/4);

          if(this.futureData.daily[d].rain) {
            this.futureData.daily[d].rain_bool = true;
          } else{
            this.futureData.daily[d].rain_bool = false;
          }
          
          if (this.futureData.daily[d].snow) {
            this.futureData.daily[d].snow_bool = true;
          } else {
            this.futureData.daily[d].snow_bool = false;
          }
        }

        InfoComponent.makeFuture(this.futureData);
        InfoComponent.makeVisible(this.data);
      });
    }, (error) =>{
      console.log("Error ocurred", error);
    });
  }
}
