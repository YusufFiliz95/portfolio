import {
  HostListener,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
  Component,
} from '@angular/core';

import { Project } from './project.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  @ViewChildren('project', { read: ElementRef })
  projectContainers!: QueryList<ElementRef>;
  @ViewChild('arrowDown', { read: ElementRef }) arrowDown!: ElementRef;

  isSmallScreen = false;

  /**
   * The ngOnInit function calls the onResize function with the current window's inner width as a
   * parameter.
   */
  ngOnInit() {
    this.onResize(window.innerWidth);
  }

  /* This code is setting up a listener for the window resize event using the `@HostListener` decorator.
When the window is resized, the `onResize` function is called with the current window's inner width
as a parameter. The `onResize` function then sets the `isSmallScreen` property to `true` if the
window's inner width is less than or equal to 1315 pixels, indicating that the screen is small. This
property can be used in the template to conditionally display content based on screen size. */
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.isSmallScreen = width <= 1315;
  }

  projects: Project[] = [
    new Project(
      1,
      'Join',
      ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      'assets/img/Join.png',
      'https://github.com/YusufFiliz95/Gruppenprojekt-Join',
      'https://yusuf-filiz.developerakademie.net/Join/index.html'
    ),
    new Project(
      2,
      'El-Pollo-Loco',
      ['JavaScript', 'HTML', 'CSS'],
      'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight aginst El Pollo Loco',
      'assets/img/El-Pollo-Loco.png',
      'https://github.com/YusufFiliz95/Project-Game-El-Pollo-Loco',
      'https://yusuf-filiz.developerakademie.net/Projekt%20El%20Pollo%20Loco/index.html'
    ),
    new Project(
      3,
      'Ring Of Fire',
      ['Angular', 'HTML', 'SCSS', 'Firebase'],
      'A card-based party game involving drink-related rules for each card drawn.',
      'assets/img/Ring-Of-Fire.jpg',
      'https://github.com/YusufFiliz95/Game-ringgoffire',
      'https://yusuffiliz-ringoffire.com/'
    ),
    new Project(
      3,
      'Pokédex',
      ['JavaScript', 'HTML', 'CSS', 'API'],
      'a digital encyclopedia application developed with a REST API, providing detailed data on Pokémon characters.',
      'assets/img/Pokedex.png',
      'https://github.com/YusufFiliz95/Project-Pokedex',
      'https://yusuf-filiz.developerakademie.net/Pokedex/index.html'
    ),
  ];

  /**
   * The function opens a new browser window with the specified URL.
   * @param {string} url - A string representing the URL that the function will navigate to.
   */
  navigateTo(url: string): void {
    window.open(url, '_blank');
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
   * The function observes projects and arrow down on intersect after the view has been initialized in
   * TypeScript.
   */
  ngAfterViewInit(): void {
    this.observeProjectsOnIntersect();
    this.observeArrowDownOnIntersect();
  }

  /**
   * This function observes the intersection of project containers and applies animations to them when
   * they become visible.
   */
  observeProjectsOnIntersect(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(this.projectContainers.toArray()).findIndex(
            (projectContainer) =>
              projectContainer.nativeElement === entry.target
          );
          entry.target.classList.remove('no-click');
          entry.target.classList.remove('d-none');
          entry.target.classList.add(
            index % 2 === 0 ? 'animate-from-left' : 'animate-from-right'
          );
        }
      });
    }, options);

    this.projectContainers.forEach((projectContainer) => {
      observer.observe(projectContainer.nativeElement);
    });
  }

  /**
   * This function observes the intersection of an element with the viewport and adds a CSS class to it
   * if it is intersecting.
   */
  observeArrowDownOnIntersect(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-from-left');
        }
      });
    }, options);

    observer.observe(this.arrowDown.nativeElement);
  }
}
