import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Daily } from '../data/data-structures';

@Component({
  selector: 'app-dialog-more-info-future',
  templateUrl: './dialog-more-info-future.html',
  styleUrls: ['./dialog-more-info-future.css']
})
export class DialogMoreInfoFuture {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Daily) {  }

}