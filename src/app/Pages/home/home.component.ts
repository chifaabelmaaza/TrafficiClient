import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { SuggestionService } from '../../services/suggestion.service';
import { Router } from '@angular/router';
import { BusLinesService } from '../../services/bus-lines.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  busStations: string[] = [];
  departStation: string = '';
  arrivalStation: string = '';

  busDestinations: string[] = ['Bus Stop 1', 'Bus Stop 2', 'Bus Stop 3'];
  selectedBusStop: string = this.busDestinations[0];
  locationName: string = '';
  inputControl = new FormControl();
  isMenuOpen = false;
  selectedOption: any | null = null;
  suggestionsEnabled = true; // Automatically enable suggestions when the input value changes
  filteredOptions: Observable<any[]> = new Observable<any[]>();

  constructor(private suggestionService: SuggestionService, private router: Router, private busLinesService: BusLinesService) {
    // Subscribe to changes in the input value to automatically enable suggestions
    this.inputControl.valueChanges.subscribe(() => {
      this.suggestionsEnabled = true;
      this.fetchSuggestions(this.inputControl.value);
    });
  }
  ngOnInit(): void {
    this.fetchBusStations();
  }
  fetchBusStations() {
    this.busLinesService.getBusLines().subscribe(data => {
      // Extract stations from each bus line and add them to busStations array
      data.forEach(line => {
        line.stations.forEach((station: string) => { // Explicitly specify type as string
          if (!this.busStations.includes(station)) {
            this.busStations.push(station);
          }
        });
      });
    });
  }

  fetchSuggestions(value: string): void {
    if (this.suggestionsEnabled) {
      this.filteredOptions = this.inputControl.valueChanges.pipe(
        startWith(value),
        switchMap((val: string) => this.suggestionService.getSuggestions(val))
      );
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSuggestions(): void {
    this.suggestionsEnabled = !this.suggestionsEnabled;
    if (this.suggestionsEnabled) {
      this.fetchSuggestions(this.inputControl.value);
    } else {
      this.filteredOptions = new Observable<any[]>(); // Clear suggestions when disabled
    }
  }

  selectOption(option: any): void {
    this.inputControl.setValue(option.display_name);
    this.selectedOption = option;
    this.isMenuOpen = false;
    
    // Check if the input value is not empty before disabling suggestions
    if (this.inputControl.value.trim() !== '') {
      this.toggleSuggestions(); // Disable suggestions when an option is selected and input is not empty
    }
  }

  Submit(): void {
    if (this.selectedOption && this.selectedOption.lat && this.selectedOption.lon) {
      const latitude = this.selectedOption.lat;
      const longitude = this.selectedOption.lon;
      this.router.navigate(['/map'], {
        queryParams: { destLat: latitude, destLon: longitude }
      });
    } else {
      console.warn('No location selected. Cannot navigate to map component.');
    }
  }

  bookBus() {
    // Navigate to BookBusComponent and pass departStation and arrivalStation as parameters
    this.router.navigate(['/book-bus'], { queryParams: { departStation: this.departStation, arrivalStation: this.arrivalStation } });
  }
  /*bookBus(): void {
    console.log(`Booking bus to ${this.selectedBusStop}`);
  }*/
}
