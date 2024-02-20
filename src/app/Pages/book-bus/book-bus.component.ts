import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusScheduleService } from '../../services/bus-schedule.service';
import { BusLinesService } from '../../services/bus-lines.service';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

@Component({
  selector: 'app-book-bus',
  templateUrl: './book-bus.component.html',
  styleUrls: ['./book-bus.component.scss']
})
export class BookBusComponent implements OnInit {
  departStation: string = '';
  arrivalStation: string = '';
  relevantBusLines: any[] = [];
  matchingSchedules: any[] = [];
  showNoScheduleMessage: boolean = false;
  showReservationMessage: boolean = false;
  reservedSchedule: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private busLinesService: BusLinesService,
    private busScheduleService: BusScheduleService 
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.departStation = params['departStation'];
      this.arrivalStation = params['arrivalStation'];
      console.log('Departure Station:', this.departStation);
      console.log('Arrival Station:', this.arrivalStation);

      this.searchBusLines();
    });
  }

  searchBusLines(): void {
    this.busLinesService.getBusLines().subscribe(busLines => {
      this.relevantBusLines = [];
  
      const directLines = busLines.filter(busLine =>
        busLine.stations.includes(this.departStation) && busLine.stations.includes(this.arrivalStation)
      );
  
      if (directLines.length > 0) {
        this.relevantBusLines.push({ type: 'Direct', lines: directLines });
      }
  
      const groupedIndirectLines: { [key: string]: any[] } = {};
      for (const busLine1 of busLines) {
        if (!directLines.includes(busLine1) && busLine1.stations.includes(this.departStation)) {
          for (const busLine2 of busLines) {
            if (!directLines.includes(busLine2)) {
              const commonStation = busLine1.stations.find((station: string) => {
                return station !== this.departStation && 
                       station !== this.arrivalStation &&
                       busLine2.stations.includes(station);
              });
  
              if (commonStation && busLine2.stations.includes(this.arrivalStation)) {
                const key = commonStation.toString();
                if (!groupedIndirectLines[key]) {
                  groupedIndirectLines[key] = [];
                }
                groupedIndirectLines[key].push({ 
                  type: 'Indirect', 
                  lines: [busLine1, busLine2], 
                  commonStation: commonStation
                });
              }
            }
          }
        }
      }
  
      this.relevantBusLines.push(...Object.values(groupedIndirectLines).flat());
  
      if (this.relevantBusLines.length === 0) {
        console.log('No match');
      }
    });
  }
  
  onBusLineClick(line: string): void {
    this.busScheduleService.getSchedulesByLine(line).subscribe(schedules => {
      this.matchingSchedules = schedules;
      console.log('Matching Schedules for direct lines:', this.matchingSchedules);
      this.showNoScheduleMessage = this.matchingSchedules.length === 0;
      this.showReservationMessage = false; 
    });
    
  }
  
  onIndirectLineClick(line1: string, line2: string): void {
    this.busScheduleService.getSchedulesByIndirectLines(line1, line2).subscribe(schedules => {
      this.matchingSchedules = schedules;
      console.log('Matching Schedules for indirect lines:', this.matchingSchedules);
      this.showNoScheduleMessage = this.matchingSchedules.length === 0;
      this.showReservationMessage = false; 
      // Call groupSchedules function after fetching matching schedules
     
    });
  }

  
  makeReservation(schedule: any): void {
    this.reservedSchedule = schedule;
    this.showReservationMessage = true;
  }
}
