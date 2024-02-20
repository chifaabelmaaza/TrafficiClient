import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {

  // Sample data for demonstration
  private schedules = [
    { id_service: 1, id_bus: 12, id_Line: 'Line 1', H_d: '00:00', H_f: '05:00' },
    { id_service: 2, id_bus: 13, id_Line: 'Line 2', H_d: '00:00', H_f: '05:00' },
    { id_service: 3, id_bus: 14, id_Line: 'Line 1', H_d: '06:00', H_f: '09:00' },
    { id_service: 4, id_bus: 14, id_Line: 'Line 1', H_d: '09:00', H_f: '13:00' },
    { id_service: 5, id_bus: 14, id_Line: 'Line 1', H_d: '14:00', H_f: '21:00' },
    { id_service: 6, id_bus: 17, id_Line: 'Line 3', H_d: '00:00', H_f: '03:30' },
    { id_service: 7, id_bus: 16, id_Line: 'Line 3', H_d: '00:00', H_f: '04:00' },
    { id_service: 8, id_bus: 18, id_Line: 'Line 2', H_d: '06:00', H_f: '09:00' },
    { id_service: 9, id_bus: 19, id_Line: 'Line 2', H_d: '09:00', H_f: '12:00' },
    { id_service: 10, id_bus: 20, id_Line: 'Line 3', H_d: '04:00', H_f: '08:00' },
    { id_service: 11, id_bus: 21, id_Line: 'Line 3', H_d: '08:00', H_f: '12:00' },
    { id_service: 12, id_bus: 22, id_Line: 'Line 1', H_d: '12:00', H_f: '15:00' },
    { id_service: 13, id_bus: 23, id_Line: 'Line 1', H_d: '13:00', H_f: '16:00' },
    { id_service: 14, id_bus: 24, id_Line: 'Line 2', H_d: '12:00', H_f: '15:00' },
    { id_service: 15, id_bus: 25, id_Line: 'Line 2', H_d: '13:00', H_f: '16:00' },
    { id_service: 16, id_bus: 26, id_Line: 'Line 3', H_d: '12:00', H_f: '15:00' },
    { id_service: 17, id_bus: 27, id_Line: 'Line 3', H_d: '13:00', H_f: '16:00' }
];

  constructor() { }

  getSchedulesByLine(line: string): Observable<any[]> {
    const currentDateTime = new Date();
    const matchingSchedules = this.schedules.filter(schedule =>
      schedule.id_Line === line &&
      this.isBetweenTime(currentDateTime, schedule.H_d, schedule.H_f)
    );
    return of(matchingSchedules);
  }

  getSchedulesByIndirectLines(line1: string, line2: string): Observable<any[]> {
    const schedulesLine1 = this.getSchedulesByLine(line1);
    const schedulesLine2 = this.getSchedulesByLine(line2);

    return forkJoin([schedulesLine1, schedulesLine2]).pipe(
      map(([schedules1, schedules2]) => {
        if (schedules1.length > 0 && schedules2.length > 0) {
          return [...schedules1, ...schedules2];
        } else {
          return [];
        }
      })
    );
  }




  private isBetweenTime(currentDateTime: Date, startTimeStr: string, endTimeStr: string): boolean {
    const startTime = new Date();
    const endTime = new Date();
    startTime.setHours(Number(startTimeStr.split(':')[0]), Number(startTimeStr.split(':')[1]), 0);
    endTime.setHours(Number(endTimeStr.split(':')[0]), Number(endTimeStr.split(':')[1]), 0);
    return currentDateTime >= startTime && currentDateTime <= endTime;
  }
}
