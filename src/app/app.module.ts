import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { WeatherDataService } from './services/weather-data.service';
import { DataComponent } from './data/data.component';
import { InfoComponent } from './info/info.component';
import { DialogMoreInfo } from './dialog-more-info/dialog-more-info';
import { DialogForHoursToday } from './dialog-for-hours/dialog-for-hours-today';
import { DialogForHoursTomorrow } from './dialog-for-hours/dialog-for-hours-tomorrow';
import { DialogMoreInfoFuture } from './dialog-more-info/dialog-more-info-future';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    CitySelectorComponent,
    DataComponent,
    InfoComponent,
    DialogMoreInfo,
    DialogForHoursToday,
    DialogForHoursTomorrow,
    DialogMoreInfoFuture
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
