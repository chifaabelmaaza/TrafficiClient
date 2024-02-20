// banner.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  currentIndex: number = 0;
  bannerItems: any[] = [
    {
      image: '../../../assets/images/background_bus_taxi.png',
      title: 'Book City Transport',
      description: 'Explore our services for convenient and efficient booking of public transport within the city.',
      buttonText: 'Learn More',
      link: '/services'
    },
    {
      image: '../../../assets/images/bus_back.png',
      title: 'Enjoy Bus Journeys',
      description: 'Embark on a scenic journey through the city aboard our comfortable buses. Discover the joy of traveling.',
      buttonText: 'Book Now',
      link: '/bus-travel'
    },
    {
      image: '../../../assets/images/taxi_back.png',
      title: 'Start Your Taxi Adventure',
      description: 'Experience the freedom of travel with our taxi services. Quick, reliable, and ready to take you anywhere.',
      buttonText: 'Book Now',
      link: '/taxi-services'
    }
  ];

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.bannerItems.length) % this.bannerItems.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.bannerItems.length;
  }
}
