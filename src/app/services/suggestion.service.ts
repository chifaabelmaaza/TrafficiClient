import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestions(value: string): Observable<any[]> {
    // If the input is empty, return an empty array
    if (!value.trim()) {
      return new Observable<any[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    const params = new HttpParams().set('format', 'json').set('q', value);
    const url = 'https://nominatim.openstreetmap.org/search';

    return this.http.get<any[]>(url, { params }).pipe(
      map((data: any[]) => {
        console.log('Data from service:', data); // Log the data received from the service
        return data;
      })
    );
  }
}
