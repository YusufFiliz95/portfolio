import { Component, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  /**
   * Accesses the list of animatedIcon elements from the DOM.
   */
  @ViewChildren('animatedIcon', { read: ElementRef }) animatedIcons!: QueryList<ElementRef>;

  @ViewChild('arrowDown', { read: ElementRef }) arrowDown!: ElementRef;


  /**
   * Array that stores paths to icons.
   */
  icons = ['assets/img/icons/Angular.svg', 'assets/img/icons/Typescript.svg', 'assets/img/icons/Javascript.svg', 'assets/img/icons/html.svg', 'assets/img/icons/Css.svg', 'assets/img/icons/Firebase.svg', 'assets/img/icons/git.svg', 'assets/img/icons/scrum.svg', 'assets/img/icons/API.svg', 'assets/img/icons/Material-Design.svg'];

  /**
   * Array that stores paths to hover icons.
   */
  iconshover = ['assets/img/icons/Angular-hover.svg', 'assets/img/icons/Typescript-hover.svg', 'assets/img/icons/Javascript-hover.svg', 'assets/img/icons/html-hover.svg', 'assets/img/icons/Css-hover.svg', 'assets/img/icons/Firebase-hover.svg', 'assets/img/icons/git-hover.svg', 'assets/img/icons/scrum-hover.svg', 'assets/img/icons/API-hover.svg', 'assets/img/icons/Material-Design-hover.svg'];

  /**
   * Array that stores the names of skills.
   */
  skills = ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Firebase", "Git", "Scrum", "Rest-API", "Material Design"];

  /**
   * Array that manages the flip state for each skill.
   */
  flips: boolean[] = new Array(this.skills.length).fill(false);

  /**
   * Array that manages the hover state for each skill.
   */
  isHovered: boolean[] = new Array(this.skills.length).fill(false);

  /**
   * Handles the mouseover event and updates the hover state of a skill.
   * @param index - Index of the skill being hovered.
   */
  onMouseOver(index: number): void {
    this.flips[index] = true;
    this.isHovered = this.isHovered.map((val, i) => i === index);
  }

  /**
   * Handles the mouseleave event and resets the hover state of a skill.
   * @param index - Index of the skill being left.
   */
  onMouseLeave(index: number): void {
    this.flips[index] = false;
    this.isHovered = this.isHovered.map(val => false);
  }

  /**
   * Scrolls to a specified element in the DOM.
   * @param elementId - ID of the element to scroll to.
   */
  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * Adds transition delay to each icon and observes elements on intersect.
   */
  ngAfterViewInit(): void {
    this.addTransitionDelayToIcons();
    this.observeElementsOnIntersect();
    this.observeArrowDownOnIntersect();
  }

  /**
   * Adds transition delay to each icon.
   */
  addTransitionDelayToIcons(): void {
    this.animatedIcons.forEach((icon: ElementRef, index: number) => {
      icon.nativeElement.style.transitionDelay = `${index * 0.1}s`;
    });
  }


/**
 * This function observes elements on intersection and adds or removes a CSS class to animate them
 * based on their transition delay.
 */
  observeElementsOnIntersect(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const htmlElement = entry.target as HTMLElement;
        const delay = parseFloat(htmlElement.style.transitionDelay) * 350;

        if (entry.isIntersecting) {
          setTimeout(() => {
            htmlElement.classList.add('animate');
          }, delay);
        } else {
          setTimeout(() => {
            htmlElement.classList.remove('animate');
          }, delay);
        }
      });
    }, options);

    this.animatedIcons.forEach((icon) => {
      observer.observe(icon.nativeElement);
    });
  }

  observeArrowDownOnIntersect() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const delay = parseFloat((entry.target as HTMLElement).style.transitionDelay) * 1000;

        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, delay);
        } else {
          setTimeout(() => {
            entry.target.classList.remove('animate');
          }, delay);
        }
      });
    }, options);

    observer.observe(this.arrowDown.nativeElement); // Observe the arrow down element
  }
}
