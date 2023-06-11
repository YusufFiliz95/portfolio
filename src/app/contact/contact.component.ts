import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  isFocused = false;
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('label') label!: ElementRef;

  ngAfterViewInit() {
    // Set initial state of label
    this.onInput();
  }

  onInput() {
    // check if the textarea is empty
    if (this.isNotEmpty()) {
      // if it's not empty, add the 'focused' class to the label
      this.label.nativeElement.classList.add('focused');
    } else if (!this.isFocused) {
      // if it's empty and not focused, remove the 'focused' class from the label
      this.label.nativeElement.classList.remove('focused');
    }
  }

  isNotEmpty() {
    return this.textarea.nativeElement.value !== '';
  }

  focus(focused: boolean) {
    this.isFocused = focused;
    this.onInput();
  }
}
