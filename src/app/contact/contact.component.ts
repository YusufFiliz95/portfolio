import { Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {

  ngAfterViewInit() {
  }

  updateFormFilledStatus(event: any) {
    let inputElement = (<HTMLInputElement>event.target);

    if (inputElement.value) {
      inputElement.classList.add('form-filled');
    } else {
      inputElement.classList.remove('form-filled');
    }
  }

  nameLabelUp() {
    let nameInput = (<HTMLInputElement>document.getElementById('nameInput'));
    let nameLabel = document.getElementById('nameLabel');

    nameLabel?.classList.add('input-name-label-focused');

    if (nameInput.value) {
      nameInput.classList.add('form-filled');
    }
  }

  nameLabelDown() {
    let nameInput = (<HTMLInputElement>document.getElementById('nameInput'));
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
    let emailInput = (<HTMLInputElement>document.getElementById('emailInput'));
    let emailLabel = document.getElementById('emailLabel');

    emailLabel?.classList.add('input-email-label-focused');

    if (emailInput.value) {
      emailInput.classList.add('form-filled');
    }
  }

  emailLabelDown() {
    let emailInput = (<HTMLInputElement>document.getElementById('emailInput'));
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
    let textarea = (<HTMLTextAreaElement>document.getElementById('textArea'));
    let textLabel = document.getElementById('textLabel');

    textLabel?.classList.add('textarea-label-focused');

    if (textarea.value) {
      textarea.classList.add('form-filled');
    }
  }

  textLabelDown() {
    let textarea = (<HTMLTextAreaElement>document.getElementById('textArea'));
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
}
