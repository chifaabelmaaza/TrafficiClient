import { Component, Input,OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import 'leaflet-routing-machine';
import { RouteInfoService } from '../../services/route-info.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  @Input() userCoordinates: { latitude: number, longitude: number } | undefined;

  private map!: L.Map;
  private userMarker: L.Marker | undefined;
  private destinationMarker: L.Marker | undefined;
  private routingControl: any; // Using 'any' type for now, but you might want to replace it with a more specific type if possible
 

  destLat: number = 0;
  destLon: number = 0;

  constructor(private route: ActivatedRoute, private routeInfoService: RouteInfoService) { }   

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.destLat = +params['destLat'];
      this.destLon = +params['destLon'];
      console.log('Destination Latitude:', this.destLat);
      console.log('Destination Longitude:', this.destLon);
    });
    this.initializeMap();
    this.getUserLocation();
  }

  private initializeMap() {
    const baseMapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURL).addTo(this.map);
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.showUserPosition(latitude, longitude);
          console.log(position);
          if (this.destLat && this.destLon) {
            this.showDestinationMarker();
          }
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private showUserPosition(latitude: number, longitude: number) {
    this.userMarker = L.marker([latitude, longitude]).addTo(this.map);
  }

  private showDestinationMarker() {
    this.destinationMarker = L.marker([this.destLat, this.destLon]).addTo(this.map);
    this.adjustMapBounds();
    this.addRoutingControl();
  }

  private adjustMapBounds() {
    if (this.userMarker && this.destinationMarker) {
      const bounds = L.latLngBounds([this.userMarker.getLatLng(), this.destinationMarker.getLatLng()]);
      this.map.fitBounds(bounds);
    } else if (this.userMarker) {
      this.map.setView(this.userMarker.getLatLng(), 15);
    } else if (this.destinationMarker) {
      this.map.setView(this.destinationMarker.getLatLng(), 15);
    }
  }

  private addRoutingControl() {
    if (this.userMarker && this.destinationMarker) {
      this.routingControl = L.Routing.control({
        waypoints: [
          this.userMarker.getLatLng(),
          this.destinationMarker.getLatLng()
        ],
        routeWhileDragging: true
      }).addTo(this.map);
  
      // Get route details
      this.routingControl.on('routesfound', (e: any) => {
        const route = e.routes[0];
        const totalDistanceInMeters = route.summary.totalDistance;
        const totalDistanceInKilometers = parseFloat((totalDistanceInMeters / 1000).toFixed(2));
        const totalTravelTimeInSeconds = route.summary.totalTime;
        const totalTravelTimeInHours = (totalTravelTimeInSeconds / 3600).toFixed(2);
        const costPerKilometer = 8; // MAD
        const totalCost = (totalDistanceInKilometers * costPerKilometer).toFixed(2);
  
        const routeInfo = {
          distance: totalDistanceInKilometers.toString(),
          time: totalTravelTimeInHours,
          cost: totalCost
        };
  
        this.routeInfoService.setRouteInfo(routeInfo);
      });
    }
  }

}
/*export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([31.9539, 35.9106]), // Amman
    L.marker([32.5568, 35.8469]) // Irbid
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }
}*/