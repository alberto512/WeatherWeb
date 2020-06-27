import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FutureData } from '../data/data-structures';

@Component({
  selector: 'app-dialog-for-hours-today',
  templateUrl: './dialog-for-hours-today.html',
  styleUrls: ['./dialog-for-hours-today.css']
})

export class DialogForHoursToday {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FutureData) {  }

}