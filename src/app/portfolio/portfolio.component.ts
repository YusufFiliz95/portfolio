import { HostListener, ViewChildren, ElementRef, QueryList, ViewChild, Component } from '@angular/core';

import { Project } from './project.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent {
  @ViewChildren('project', { read: ElementRef }) projectContainers!: QueryList<ElementRef>;
  @ViewChild('arrowDown', { read: ElementRef }) arrowDown!: ElementRef;

  isSmallScreen = false;

  ngOnInit() {
    this.onResize(window.innerWidth);
  }

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
      'https://y-f-ringoffire.web.app/'
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

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    this.observeProjectsOnIntersect();
    this.observeArrowDownOnIntersect();
  }

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
            (projectContainer) => projectContainer.nativeElement === entry.target
          );
          entry.target.classList.remove('no-click');
          entry.target.classList.remove('d-none');
          entry.target.classList.add(index % 2 === 0 ? 'animate-from-left' : 'animate-from-right');
        }
      });
    }, options);

    this.projectContainers.forEach((projectContainer) => {
      observer.observe(projectContainer.nativeElement);
    });
  }

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
