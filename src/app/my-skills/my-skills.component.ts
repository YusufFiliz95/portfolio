import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss'],
  animations: [
    trigger('flip', [
      state('normal', style({
        transform: 'rotateX(0)'
      })),
      state('hover', style({
        transform: 'rotateX(-180deg)'
      })),
      transition('normal <=> hover', animate('0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955)')),
    ]),
  ]
})

export class MySkillsComponent {
  hoveredIndex: number | null = null;
  lastHoveredIndex: number | null = null;
  flipState: { [index: number]: 'normal' | 'hover' } = {};
  icons = ['assets/img/icons/Angular.svg', 'assets/img/icons/Typescript.svg', 'assets/img/icons/Javascript.svg', 'assets/img/icons/html.svg', 'assets/img/icons/Css.svg', 'assets/img/icons/Firebase.svg', 'assets/img/icons/git.svg', 'assets/img/icons/scrum.svg', 'assets/img/icons/API.svg', 'assets/img/icons/Material-Design.svg'];
  iconshover = ['assets/img/icons/Angular-hover.svg', 'assets/img/icons/Typescript-hover.svg', 'assets/img/icons/Javascript-hover.svg', 'assets/img/icons/html-hover.svg', 'assets/img/icons/Css-hover.svg', 'assets/img/icons/Firebase-hover.svg', 'assets/img/icons/git-hover.svg', 'assets/img/icons/scrum-hover.svg', 'assets/img/icons/API-hover.svg', 'assets/img/icons/Material-Design-hover.svg'];
  skills = ["Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Firebase", "Git", "Scrum", "Rest-API", "Material Design"];
}
