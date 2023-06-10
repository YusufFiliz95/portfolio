
import { Project } from './project.model';
import { Component } from '@angular/core';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent {
  projects: Project[] = [
    new Project(
      1,
      'Join',
      ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      'assets/img/Join.png',
      'https://github.com',
      'https://github.com'
    ),
    new Project(
      2,
      'El-Pollo-Loco',
      ['JavaScript', 'HTML', 'CSS'],
      'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight aginst El Pollo Loco',
      'assets/img/El-Pollo-Loco.png',
      'https://github.com',
      'https://github.com'
    ),
    new Project(
      3,
      'Ring Of Fire',
      ['Angular', 'HTML', 'SCSS', 'Firebase'],
      'A card-based party game involving drink-related rules for each card drawn.',
      'assets/img/Ring-Of-Fire.jpg',
      'https://github.com',
      'https://github.com'
    ),
    new Project(
      3,
      'Pokédex',
      ['JavaScript', 'HTML', 'CSS', 'API'],
      'a digital encyclopedia application developed with a REST API, providing detailed data on Pokémon characters.',
      'assets/img/Pokedex.png',
      'https://github.com',
      'https://github.com'
    ),
  ];

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
