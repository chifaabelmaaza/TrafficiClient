import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  selectedProfile: 'client' | 'driver' = 'client';

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.selectedProfile);
  }

}
