import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: '',
    acceptPolicy: false
  };
  showSuccessMessage: boolean = false;
  notacceptPolitique: boolean = false;
  showForm: boolean = false;
  showButton: boolean = true;

  toggleForm() {
    this.showForm = !this.showForm;
    this.showButton = !this.showButton;
    if (!this.showForm) {
      this.resetForm();
      this.showSuccessMessage = false;
      this.notacceptPolitique = false;
    }
  }

  submitForm(): void {
    if (this.formData.acceptPolicy) {
      console.log('Form submitted:', this.formData);
      this.showSuccessMessage = true;
      this.resetForm();
      setTimeout(() => {
        this.showButton = true; // Reveal the button after 2 seconds
        this.showForm = false; // Hide the form after submitting
      }, 2000);
    } else {
      this.notacceptPolitique = true;
      console.error('Please accept the policies before submitting the form.');
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: '',
      acceptPolicy: false
    };
  }
}
