import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrentData } from '../data/data-structures';

@Component({
  selector: 'app-dialog-more-info',
  templateUrl: './dialog-more-info-dialog.html',
  styleUrls: ['./dialog-more-info-dialog.css']
})
export class DialogMoreInfoDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CurrentData) {  }

}
