import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  /**
   * This function scrolls smoothly to a specified element on the page.
   * @param {string} elementId - A string representing the ID of the HTML element that needs to be
   * scrolled into view.
   */
  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
