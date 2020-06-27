import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentData, FutureData } from '../data/data-structures';
import { MatDialog } from '@angular/material/dialog';
import { DialogMoreInfo } from '../dialog-more-info/dialog-more-info';
import { DialogForHoursToday } from '../dialog-for-hours/dialog-for-hours-today';
import { DialogForHoursTomorrow } from '../dialog-for-hours/dialog-for-hours-tomorrow';
import { DialogMoreInfoFuture } from '../dialog-more-info/dialog-more-info-future';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  static currentData: CurrentData
  static futureData: FutureData
  static children: any
  public classReference = InfoComponent

  @ViewChild('Children', {static: false}) child: any;
  @ViewChild('Image', {static: false}) divImg: any;

  constructor(public dialogForHours: MatDialog, public dialogMoreInfo: MatDialog) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    InfoComponent.children = this.child;
  }

  static makeVisible(data: CurrentData): void {
    this.children.selectedIndex = 0;
    setTimeout(() => this.makeVisible2(data), 1);
  }

  static makeVisible2(data: CurrentData): void {
    this.children.selectedIndex = 0;
    setTimeout(() => {
      /* Clean */
      document.getElementById("Title").innerText='';
      document.getElementById("Subtitle").innerText='';
      document.getElementById("Img").innerHTML="";
      document.getElementById("Temp").innerText='';
      document.getElementById("TempMax").innerText='';
      document.getElementById("TempMin").innerText='';

      /* Round */
      let temp = Math.round(data.main.temp);
      let temp_max = Math.round(InfoComponent.futureData.daily[0].temp.max);
      let temp_min = Math.round(InfoComponent.futureData.daily[0].temp.min);

      /* Show in screen */
      document.getElementById("Title").append(data.name);
      document.getElementById("Subtitle").append(data.weather[0].description);
      let image = document.createElement("img");
      image.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      document.getElementById("Img").appendChild(image);
      document.getElementById("Temp").append(temp.toString() + "º");
      document.getElementById("TempMax").append("Max: " + temp_max.toString() + "º");
      document.getElementById("TempMin").append("Min: " + temp_min.toString() + "º");

      /* Update tab group */
      let aux = <HTMLElement>document.getElementById("Wrapper");
      aux.removeAttribute("hidden");
      this.children.realignInkBar();

      /* Save currentData structure */
      this.currentData = data;
    }, 1);
  }

  getDay(num: number) {
    let date = new Date();
    date.setDate(date.getDate() + num);
    return date.getDate();
  }

  static makeFuture(data: FutureData): void {
    this.futureData = data;
  }

  getTitle() {
    return InfoComponent.currentData.name;
  }

  getSubtitle(num: number) {
    return InfoComponent.futureData.daily[num].weather[0].description;
  }

  getImage(num: number) {
    return "https://openweathermap.org/img/w/" + InfoComponent.futureData.daily[num].weather[0].icon + ".png";
  }

  getTemp(num: number) {
    let morn = InfoComponent.futureData.daily[num].temp.morn;
    let day = InfoComponent.futureData.daily[num].temp.day;
    let eve = InfoComponent.futureData.daily[num].temp.eve;
    let night = InfoComponent.futureData.daily[num].temp.night;
    return Math.round((morn+day+eve+night)/4);
  }

  getTempMax(num: number) {
    return Math.round(InfoComponent.futureData.daily[num].temp.max);
  }

  getTempMin(num: number) {
    return Math.round(InfoComponent.futureData.daily[num].temp.min);
  }

  showForHoursToday(): void {
    this.dialogForHours.open(DialogForHoursToday, {
      data: InfoComponent.futureData
    })
  }

  showMoreInfo(): void {
    this.dialogMoreInfo.open(DialogMoreInfo, {
      data: InfoComponent.currentData
    })
  }

  showForHoursTomorrow(): void {
    this.dialogForHours.open(DialogForHoursTomorrow, {
      data: InfoComponent.futureData
    })
  }

  showMoreInfoFuture(num: number): void {
    this.dialogMoreInfo.open(DialogMoreInfoFuture, {
      data: InfoComponent.futureData.daily[num]
    })
  }
}
