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
  flips: boolean[] = new Array(this.skills.length).fill(false);  // Array to keep track of hover state for each skill

  isHovered: boolean[] = new Array(this.skills.length).fill(false);

  onMouseOver(index: number) {
    this.flips[index] = true;
    this.isHovered = this.isHovered.map((val, i) => i === index);
  }

  onMouseLeave(index: number) {
    this.flips[index] = false;
    this.isHovered = this.isHovered.map(val => false);
  }

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
