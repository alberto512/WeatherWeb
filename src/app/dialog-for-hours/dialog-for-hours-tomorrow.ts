import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FutureData } from '../data/data-structures';

@Component({
  selector: 'app-dialog-for-hours-tomorrow',
  templateUrl: './dialog-for-hours-tomorrow.html',
  styleUrls: ['./dialog-for-hours-tomorrow.css']
})

export class DialogForHoursTomorrow {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FutureData) {  }

}