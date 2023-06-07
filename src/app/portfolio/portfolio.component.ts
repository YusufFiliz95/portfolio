
import { Project } from './project.model';
import { Component } from '@angular/core';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent {
  projects: Project[] = [
    new Project(1, 'Join', ['Angular', 'Typescript', 'HTML', 'CSS', 'Firebase'], 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.', 'assets/img/project1.png', 'https://github.com/project1', 'https://livesite.com/project1'),
    new Project(2, 'Project 2', ['Tech', 'Stack'], 'Description 2', 'assets/img/project2.png', 'https://github.com/project2', 'https://livesite.com/project2'),
    // Weitere Projekte hier hinzufügen
  ];
}
