import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled: boolean = false;
  isUserConnected: boolean = false;

  selectedSignupType: 'client' | 'driver' = 'client';

  constructor(private router: Router) {}

  navigateToSignup(event: Event, type: 'client' | 'driver') {
    event.preventDefault();

    if (type === 'client') {
      this.router.navigate(['/signup']);
    } else if (type === 'driver') {
      this.router.navigate(['/driver-signup']);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
