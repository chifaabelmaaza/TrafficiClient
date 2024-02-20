import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusLinesService  {

  constructor() { }

  getBusLines(): Observable<any[]> {
    // Hardcoded list of bus lines and their stations
    const busLines = [
      {
        name: 'Line 1',
        stations: ['Station A', 'Station B', 'Station C']
      },
      {
        name: 'Line 2',
        stations: ['Station A', 'Station D', 'Station B']
      },
      {
        name: 'Line 3',
        stations: ['Station D', 'Station B', 'Station R']
      },
      {
        name: 'Line 4',
        stations: ['Station D', 'Station B', 'Station Y']
      },
    ];

    return of(busLines);
  }
}
