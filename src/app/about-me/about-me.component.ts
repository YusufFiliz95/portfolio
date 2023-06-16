import { Component, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements AfterViewInit {
  @ViewChildren('animatedElement') animatedElements: ElementRef[] = [];

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('animate');
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
