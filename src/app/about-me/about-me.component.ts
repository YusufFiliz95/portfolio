import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChildren('animatedElement', { read: ElementRef }) animatedElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.animatedElements.changes.subscribe(() => {
      this.observeElements();
    });

    this.observeElements();
  }

  observeElements() {
    const options = {
      root: null, // relative to document viewport
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.1 // visible amount of item shown in relation to root
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, options);

    this.animatedElements.forEach(element => {
      observer.observe(element.nativeElement);
    });
  }

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
