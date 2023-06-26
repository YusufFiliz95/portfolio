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

/**
 * The function opens a new browser window with the specified URL.
 * @param {string} url - A string representing the URL that the function will navigate to.
 */
  navigateTo(url: string) {
    window.open(url, "_blank");
  }

/**
 * The function toggles the active state of an element and adds/removes a class to the body element to
 * prevent scrolling.
 */
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

/**
 * The onMouseEnter function sets the isHovered property to true when the mouse enters an element.
 */
  onMouseEnter() {
    this.isHovered = true;
  }

/**
 * The function sets the value of the "isHovered" variable to false when the mouse leaves an element.
 */
  onMouseLeave() {
    this.isHovered = false;
  }

/**
 * This function copies an email address to the clipboard and displays a popup message for a limited
 * time.
 */
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

/**
 * This function scrolls smoothly to a specified element on the page.
 * @param {string} elementId - A string representing the ID of the HTML element that needs to be
 * scrolled into view.
 */
  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

/**
 * This function opens the default email client with the recipient email address pre-filled.
 */
  public sendEmail() {
    window.location.href = 'mailto:y.filiz.ch@gmail.com';
  }
}
