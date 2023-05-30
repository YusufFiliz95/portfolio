import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isActive = false;
  canClick = true;

  toggleActive() {
    if(this.canClick) {
      this.isActive = !this.isActive;

      this.canClick = false;
      setTimeout(() => {
        this.canClick = true;
      }, 800);
    }
  }
}
