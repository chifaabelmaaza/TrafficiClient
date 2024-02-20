import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  selectedUserType: 'client' | 'taxi' | 'bus' = 'client';
  username: string = '';
  password: string = '';
  

  onSubmit() {
    // Handle login logic based on the selected user type, username, and password
    console.log('User Type:', this.selectedUserType);
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

}
