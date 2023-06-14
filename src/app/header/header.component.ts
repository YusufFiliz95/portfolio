import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header2.component.scss']
})
export class HeaderComponent {
  isActive = false;
  canClick = true;
  changeColor = false;
  isHovered = false;
  showPopup = false;
  isLegalNoticeVisible$ = this.scrollService.isLegalNoticeVisible$;

  constructor(private scrollService: ScrollService) {}

  navigateTo(url: string) {
    window.open(url, "_blank");
  }

  toggleActive() {
    if (this.canClick) {
      this.isActive = !this.isActive;

      if (this.isActive) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }

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

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
