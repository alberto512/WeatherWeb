import { Component, OnInit } from '@angular/core';
import { CurrentData } from '../data/data-structures';
import { MatDialog } from '@angular/material/dialog';
import { DialogMoreInfoDialog } from '../dialog-more-info/dialog-more-info-dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  static currentData: CurrentData

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    document.getElementById("Info").style.visibility="hidden";
  }

  static makeVisible(data: CurrentData): void {
    /* Clean */
    document.getElementById("Title").innerText='';
    document.getElementById("Subtitle").innerText='';
    document.getElementById("Image").innerHTML="";
    document.getElementById("Temp").innerText='';
    document.getElementById("TempMax").innerText='';
    document.getElementById("TempMin").innerText='';

    /* Round */
    let temp = Math.round(data.main.temp);
    let temp_max = Math.round(data.main.temp_max);
    let temp_min = Math.round(data.main.temp_min);

    /* Show in screen */
    document.getElementById("Title").append(data.name);
    document.getElementById("Subtitle").append(data.weather[0].description);
    var image = document.createElement("img");
    image.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    document.getElementById("Image").appendChild(image);
    document.getElementById("Temp").append(temp.toString() + "º");
    document.getElementById("TempMax").append("Max: " + temp_max.toString() + "º");
    document.getElementById("TempMin").append("Min: " + temp_min.toString() + "º");
    document.getElementById("Info").style.visibility="visible";

    this.currentData = data;
  }
  
  showMoreInfo(): void {
    this.dialog.open(DialogMoreInfoDialog, {
      data: InfoComponent.currentData
    })
  }

}
