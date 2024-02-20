import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TRAFFICI';
  userCoordinates: { latitude: number, longitude: number } | undefined;
  hideNavbarFooter: boolean = false;

  constructor(private router: Router) {
    // Subscribe to router events to detect navigation end
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route and hide navbar and footer if necessary
        this.hideNavbarFooter = this.shouldHideNavbarFooter();
      }
    });
  }

  // Function to determine whether to hide navbar and footer based on current route
  shouldHideNavbarFooter(): boolean {
    // Get the current route URL
    const currentRoute = this.router.url;

    // Check if the current route matches the ones where navbar and footer should be hidden
    return currentRoute.includes('/login') || currentRoute.includes('/signup') || currentRoute.includes('/driver-signup');
  }
  // showScrollButton: boolean = false;

  // toggleScrollButton() {
  //   let contentContainer = document.getElementById('content-container');
  //   if (contentContainer) {
  //     if (contentContainer.scrollHeight > contentContainer.clientHeight && contentContainer.scrollHeight - contentContainer.scrollTop > contentContainer.clientHeight) {
  //       this.showScrollButton = true;
  //     } else {
  //       this.showScrollButton = false;
  //     }
  //   }
  // }

  // scrollToBottom() {
  //   let contentContainer = document.getElementById('content-container');
  //   if (contentContainer) {
  //     contentContainer.scrollTop = contentContainer.scrollHeight;
  //   }
  // }
}
