
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RouteInfo {
  distance: string;
  time: string;
  cost: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {
  private routeInfoSubject: BehaviorSubject<RouteInfo> = new BehaviorSubject<RouteInfo>({ distance: '', time: '', cost: '' });
  routeInfo$: Observable<RouteInfo> = this.routeInfoSubject.asObservable();

  setRouteInfo(routeInfo: RouteInfo): void {
    this.routeInfoSubject.next(routeInfo);
  }
}