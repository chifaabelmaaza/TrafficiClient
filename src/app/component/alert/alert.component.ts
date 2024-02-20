import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() type: string = 'success'; // Par défaut, le type est 'success'
  @Input() message: string = '';

  // Définir les classes de style en fonction du type d'alerte
  get alertClasses(): string {
    return `alert alert-${this.type}`;
  }

}
