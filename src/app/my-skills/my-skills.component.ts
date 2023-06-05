import { Component } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})

export class MySkillsComponent {
  icons = ['assets/img/icons/Angular.svg', 'assets/img/icons/Typescript.svg', 'assets/img/icons/Javascript.svg', 'assets/img/icons/html.svg', 'assets/img/icons/Css.svg', 'assets/img/icons/Firebase.svg', 'assets/img/icons/git.svg', 'assets/img/icons/scrum.svg', 'assets/img/icons/API.svg', 'assets/img/icons/Material-Design.svg'];
  iconshover = ['assets/img/icons/Angular-hover.svg', 'assets/img/icons/Typescript-hover.svg', 'assets/img/icons/Javascript-hover.svg', 'assets/img/icons/html-hover.svg', 'assets/img/icons/Css-hover.svg', 'assets/img/icons/Firebase-hover.svg', 'assets/img/icons/git-hover.svg', 'assets/img/icons/scrum-hover.svg', 'assets/img/icons/API-hover.svg', 'assets/img/icons/Material-Design-hover.svg'];
  skills = ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Firebase", "Git", "Scrum", "Rest-API", "Material Design"];
}
