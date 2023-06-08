
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
      ['Angular', 'Typescript', 'HTML', 'CSS', 'Firebase'],
      'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      'assets/img/Join.png',
      'https://github.com',
      'https://github.com'
    ),
    new Project(
      2,
      'El-Pollo-Loco',
      ['Javascript', 'HTML', 'CSS'],
      'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight aginst the chicken',
      'assets/img/El-Pollo-Loco.png',
      'https://github.com',
      'https://github.com'
    ),
  ];

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }
}
