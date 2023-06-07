
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
      'assets/img/project1.png',
      'https://github.com',
      'https://github.com'
    ),
  ];

  navigateTo(url: string): void {
    window.open(url, "_blank");
  }
}
