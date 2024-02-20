import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  whatWeDoText: string = "We provide a diverse range of services, catering to various transportation needs. From taxi rides to long-haul bus journeys, our offerings are designed to ensure convenience and reliability for every traveler. Whether you're commuting within the city or embarking on a cross-country adventure, we've got you covered with our comprehensive suite of transportation solutions.";

  whoWeAreText: string = "Our team comprises seasoned professionals with extensive experience in the transportation industry. Each member brings a unique skill set and a shared commitment to excellence, enabling us to deliver top-notch services to our clients. With a focus on innovation and customer satisfaction, we strive to exceed expectations and drive positive change in the transportation sector.";
  
  reviewsText: string = "Discover firsthand what our satisfied customers have to say about their experiences with us. From seamless booking processes to reliable transportation services, our clients consistently praise our dedication to quality and attention to detail. Their testimonials serve as a testament to our unwavering commitment to providing exceptional service and fostering lasting relationships with our valued customers.";
  



  mapLatitude: number = 123.456; // Remplacez par la latitude réelle de votre localisation
  mapLongitude: number = -789.012; // Remplacez par la longitude réelle de votre localisation

  constructor() { }

  ngOnInit(): void {
  }
  reviews = [
    { text: 'Avis 1', author: 'John Doe' },
    { text: 'Avis 2', author: 'Jane Smith' },
    // Ajoutez autant d'avis que nécessaire
  ];

  owlOptions = {
    items: 1,
    dots: true,
    nav: true
    // Ajoutez d'autres options selon vos préférences
  };
}