import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataComponent } from '../data/data.component';
import { WeatherDataService } from '../services/weather-data.service';

export interface PlacesGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css']
})

export class CitySelectorComponent implements OnInit {
  placeForm: FormGroup = this._formBuilder.group({
    placeGroup: '',
  });

  placesGroups: PlacesGroup[] = [{
    letter: 'A',
    names: ['Albacete', 'Alicante', 'Almeria', 'Avila']
  }, {
    letter: 'B',
    names: ['Badajoz', 'Barcelona', 'Bilbao', 'Burgos']
  }, {
    letter: 'C',
    names: ['Castellon', 'Ciudad Real', 'Cuenca', 'Caceres', 'Cadiz', 'Cordoba']
  }, {
    letter: 'H',
    names: ['Huelva', 'Huesca']
  }, {
    letter: 'J',
    names: ['Jaen']
  }, {
    letter: 'L',
    names: ['La Coruña', 'Las Palmas', 'Leon', 'Logroño', 'Lugo', 'Lerida']
  }, {
    letter: 'M',
    names: ['Madrid', 'Murcia', 'Malaga']
  }, {
    letter: 'O',
    names: ['Orense', 'Oviedo']
  }, {
    letter: 'P',
    names: ['Palencia', 'Palma', 'Pamplona', 'Pontevedra']
  }, {
    letter: 'S',
    names: ['Salamanca', 'San Sebastian', 'Santa Cruz de Tenerife', 'Santander', 'Segovia', 'Sevilla', 'Soria']
  }, {
    letter: 'T',
    names: ['Tarragona', 'Teruel', 'Toledo']
  }, {
    letter: 'V',
    names: ['Valencia', 'Valladolid', 'Vitoria']
  }, {
    letter: 'Z',
    names: ['Zamora', 'Zaragoza']
  }];

  placesGroupOptions: Observable<PlacesGroup[]>;

  constructor(private _formBuilder: FormBuilder, private _WeatherDataService: WeatherDataService) { }

  ngOnInit(): void {
    this.placesGroupOptions = this.placeForm.get('placeGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): PlacesGroup[] {
    if (value) {
      return this.placesGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.placesGroups;
  }

  updateData(value: string) {
    const dataComponent = new DataComponent(this._WeatherDataService);
    dataComponent.updateData(value);
  }
}