import { Component, AfterViewInit } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  isLegalNoticeVisible = false;
  isLegalNoticeVisible$ = this.scrollService.isLegalNoticeVisible$;

  constructor(private scrollService: ScrollService) {}

  hideLegalNotice() {
    this.scrollService.hideLegalNotice();
  }

  showLegalNotice() {
    this.scrollService.showLegalNotice();
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }

  ngAfterViewInit() {}

  updateFormFilledStatus(
    event: any,
    inputElementId: string,
    labelElementId: string,
    className: string,
    isLabel: boolean = false

  ) {
    let inputElement = <HTMLInputElement>(
      document.getElementById(inputElementId)
    );
    let labelElement = document.getElementById(labelElementId);

    let elementToUpdate = isLabel ? labelElement : inputElement;

    if (inputElement.value.trim().length >= 1) {
      elementToUpdate?.classList.add(className);
    } else {
      elementToUpdate?.classList.remove(className);
    }
  }

  onFocus(event: any) {
    let value = event.target.value;
    if (value.startsWith('\t') || value.startsWith(' ')) {
      event.target.value = value.trimStart();
    }
  }

  nameLabelUp() {
    let nameInput = <HTMLInputElement>document.getElementById('nameInput');
    let nameLabel = document.getElementById('nameLabel');

    nameLabel?.classList.add('input-name-label-focused');

    if (nameInput.value) {
      nameInput.classList.add('form-filled');
      nameLabel?.classList.add('form-filled-label');
    }
  }

  nameLabelDown() {
    let nameInput = <HTMLInputElement>document.getElementById('nameInput');
    let nameLabel = document.getElementById('nameLabel');

    if (!nameInput.value) {
      setTimeout(() => {
        nameLabel?.classList.remove('input-name-label-focused');
        nameInput.classList.remove('form-filled');
      }, 40);
    } else {
      nameInput.classList.add('form-filled');
    }
  }

  emailLabelUp() {
    let emailInput = <HTMLInputElement>document.getElementById('emailInput');
    let emailLabel = document.getElementById('emailLabel');

    emailLabel?.classList.add('input-email-label-focused');

    if (emailInput.value) {
      emailInput.classList.add('form-filled');
    }
  }

  emailLabelDown() {
    let emailInput = <HTMLInputElement>document.getElementById('emailInput');
    let emailLabel = document.getElementById('emailLabel');

    if (!emailInput.value) {
      setTimeout(() => {
        emailLabel?.classList.remove('input-email-label-focused');
        emailInput.classList.remove('form-filled');
      }, 40);
    } else {
      emailInput.classList.add('form-filled');
    }
  }

  textLabelUp() {
    let textarea = <HTMLTextAreaElement>document.getElementById('textArea');
    let textLabel = document.getElementById('textLabel');

    textLabel?.classList.add('textarea-label-focused');

    if (textarea.value) {
      textarea.classList.add('form-filled');
    }
  }

  textLabelDown() {
    let textarea = <HTMLTextAreaElement>document.getElementById('textArea');
    let textLabel = document.getElementById('textLabel');

    if (!textarea.value) {
      setTimeout(() => {
        textLabel?.classList.remove('textarea-label-focused');
        textarea.classList.remove('form-filled');
      }, 40);
    } else {
      textarea.classList.add('form-filled');
    }
  }

  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollTo(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
