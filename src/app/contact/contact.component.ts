import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  isNameInputFocused = false;
  isEmailInputFocused = false;
  isTextAreaFocused = false;
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('nameLabel') nameLabel!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('emailLabel') emailLabel!: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('textLabel') textLabel!: ElementRef;

  ngAfterViewInit() {
    // Set initial state of label
    this.onTextAreaInput();
    this.onEmailInput();
  }

  onEmailInput() {
    // check if the textarea is empty
    if (this.isEmailInputNotEmpty()) {
      // if it's not empty, add the 'focused' class to the label
      this.emailLabel.nativeElement.classList.add('email-focused');
    } else if (!this.isEmailInputFocused) {
      // if it's empty and not focused, remove the 'focused' class from the label
      this.emailLabel.nativeElement.classList.remove('email-focused');
    }
  }

  isEmailInputNotEmpty() {
    return this.emailInput.nativeElement.value !== '';
  }

  focusEmailInput(focused: boolean) {
    this.isEmailInputFocused = focused;
    this.onEmailInput();
  }

  onTextAreaInput() {
    // check if the textarea is empty
    if (this.isTextAreaNotEmpty()) {
      // if it's not empty, add the 'focused' class to the label
      this.textLabel.nativeElement.classList.add('focused');
    } else if (!this.isTextAreaFocused) {
      // if it's empty and not focused, remove the 'focused' class from the label
      this.textLabel.nativeElement.classList.remove('focused');
    }
  }

  isTextAreaNotEmpty() {
    return this.textarea.nativeElement.value !== '';
  }

  focusTextArea(focused: boolean) {
    this.isTextAreaFocused = focused;
    this.onTextAreaInput();
  }
}
