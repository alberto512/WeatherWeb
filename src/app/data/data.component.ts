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
