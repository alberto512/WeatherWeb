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
      this.data = d;
      this.data.dateSunrise = new Date(this.data.sys.sunrise * 1000)
      this.data.dateSunset = new Date(this.data.sys.sunset * 1000)
      this.data.rain_bool_1h = false;
      this.data.rain_bool_3h = false;
      this.data.snow_bool_1h = false;
      this.data.snow_bool_3h = false;
      for (let value in d.rain) {
        if (value == "1h") {
          this.data.rain._1h = `${d.rain[value]}`;
          this.data.rain_bool_1h = true;
        } else if(value == "3h") {
          this.data.rain._3h = `${d.rain[value]}`;
          this.data.rain_bool_3h = true;
        }
      }

      for (let value in d.snow) {
        if (value == "1h") {
          this.data.snow._1h = `${d.snow[value]}`;
          this.data.snow_bool_1h = true;
        } else if(value == "3h") {
          this.data.snow._3h = `${d.snow[value]}`;
          this.data.snow_bool_3h = true;
        }
      }
      InfoComponent.makeVisible(this.data);

      //Weather past and future
      let fecha = new Date();
      fecha.setDate(fecha.getDate() - 1);
      this._WeatherDataService.getPreviusData(this.data.coord.lat, this.data.coord.lon, parseInt((fecha.getTime() / 1000).toFixed(0)))
      .subscribe((d: any)=>{
        this.previousData = d; 
      });
      
      this._WeatherDataService.getFutureData(this.data.coord.lat, this.data.coord.lon)
      .subscribe((d: any)=>{
        this.futureData = d;
      });
    }, (error) =>{
      console.log("Error ocurred: ", error);
    });
  }
}
