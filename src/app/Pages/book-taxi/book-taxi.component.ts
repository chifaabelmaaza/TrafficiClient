import { Component,OnInit,OnDestroy } from '@angular/core';
import { RouteInfoService,RouteInfo  } from '../../services/route-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-taxi',
  templateUrl: './book-taxi.component.html',
  styleUrl: './book-taxi.component.scss'
})
export class BookTaxiComponent implements OnInit, OnDestroy {
  routeInfo: RouteInfo = { distance: '', time: '', cost: '' };
  private routeInfoSubscription: Subscription = new Subscription();
  isConfirmed: boolean = false;
  buttonClicked: boolean = false; // Add this variable

  constructor(private routeInfoService: RouteInfoService) { }

  ngOnInit(): void {
    this.routeInfoSubscription = this.routeInfoService.routeInfo$.subscribe(routeInfo => {
      this.routeInfo = routeInfo;
    });

    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.routeInfoSubscription.unsubscribe();
  }

  confirmRequest(): void {
    this.isConfirmed = true;
    this.buttonClicked = true;
}

}