import {
  Component,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChildren('animatedElement', { read: ElementRef })
  animatedElements!: QueryList<ElementRef>;

  /**
   * The function initializes the component by subscribing to changes in animated elements and observing
   * those elements.
   */
  ngAfterViewInit() {
    this.animatedElements.changes.subscribe(() => {});

    this.observeElements();
  }

  /**
   * This function observes elements and adds a CSS class to them when they intersect with the viewport.
   */
  observeElements() {
    const options = {
      root: null,
      rootMargin: '300px',
      threshold: 0.1,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, options);

    this.animatedElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }

  /**
   * This function scrolls smoothly to a specified element on the page.
   * @param {string} elementId - A string representing the ID of the HTML element that needs to be
   * scrolled into view.
   */
  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
