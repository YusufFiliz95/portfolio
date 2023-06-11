import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isFocused = false;

  focus(focused: boolean) {
    this.isFocused = focused;
  }
}
