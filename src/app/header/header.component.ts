import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isActive = false;
  canClick = true;
  changeColor = false;
  isHovered = false;
  showPopup = false;


  toggleActive() {
    if(this.canClick) {
      this.isActive = !this.isActive;

      this.canClick = false;
      setTimeout(() => {
        this.canClick = true;
      }, 800);
    }
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  copyEmail() {
    if (this.canClick) {
      navigator.clipboard.writeText('y.filiz.ch@gmail.com');
      this.showPopup = true;
      this.canClick = false;

      setTimeout(() => {
        this.showPopup = false;
      }, 2000);

      setTimeout(() => {
        this.canClick = true;
      }, 2400);
    }
  }
}
