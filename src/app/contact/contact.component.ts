import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {
  isLegalNoticeVisible = false;
  isLegalNoticeVisible$ = this.scrollService.isLegalNoticeVisible$;
  currentLanguage = 'de';
  @ViewChildren('animatedElement', { read: ElementRef })
  animatedElements!: QueryList<ElementRef>;
  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  isFormValid = false;
  isEmailSentPopupVisible = false;

  constructor(private scrollService: ScrollService) {}

  /**
   * The function resets a form by clearing input fields, hiding images, and removing labels.
   */
  resetForm() {
    this.nameField.nativeElement.value = '';
    this.emailField.nativeElement.value = '';
    this.messageField.nativeElement.value = '';

    let nameImg = document.getElementById('nameInputImg');
    let emailImg = document.getElementById('emailInputImg');
    let messageImg = document.getElementById('textAreaImg');

    nameImg?.classList.add('hide');
    emailImg?.classList.add('hide');
    messageImg?.classList.add('hide');

    let nameLabel = document.getElementById('nameLabel');
    let emailLabel = document.getElementById('emailLabel');
    let textLabel = document.getElementById('textLabel');

    nameLabel?.classList.remove('form-filled-label');
    emailLabel?.classList.remove('form-filled-label');
    textLabel?.classList.remove('form-filled-label');

    this.nameLabelDown();
    this.emailLabelDown();
    this.textLabelDown();
  }

  /**
   * This function sends an email using form data and disables form fields and the send button while
   * the email is being sent.
   * @returns The function does not explicitly return anything, but it may return control flow to the
   * calling function if the form is not valid and the validation errors are shown.
   */
  async sendMail() {
    if (!this.isFormValid) {
      this.showValidationErrors();
      return;
    }

    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    nameField.disabled = true;
    emailField.disabled = true;
    messageField.disabled = true;
    sendButton.disabled = true;
    this.sendButton.nativeElement.disabled = true;

    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    try {
      await fetch('https://yusuffiliz.com/send_mail/send_mail.php', {
        method: 'POST',
        body: fd,
      });

      this.isEmailSentPopupVisible = true;

      setTimeout(() => {
        this.isEmailSentPopupVisible = false;
      }, 3000);

      this.isFormValid = false;

      this.resetForm();
    } catch (error) {
      console.error('Error sending mail', error);
    } finally {
      nameField.disabled = false;
      emailField.disabled = false;
      messageField.disabled = false;
      sendButton.disabled = false;
      this.sendButton.nativeElement.disabled = false;
    }
  }

  /**
   * This function shows validation errors for name, email, and text inputs in a form.
   */
  showValidationErrors() {
    type InputKeys = 'name' | 'email' | 'text';
    const formInputs: Record<
      InputKeys,
      { inputId: string; requiredTextId: string }
    > = {
      name: {
        inputId: 'nameInput',
        requiredTextId: 'requiredNameText',
      },
      email: {
        inputId: 'emailInput',
        requiredTextId: 'requiredEmailText',
      },
      text: {
        inputId: 'textArea',
        requiredTextId: 'requiredMessageText',
      },
    };

    for (const key in formInputs) {
      if (Object.prototype.hasOwnProperty.call(formInputs, key)) {
        const inputId = formInputs[key as InputKeys].inputId;
        const requiredTextId = formInputs[key as InputKeys].requiredTextId;

        let inputElement =
          <HTMLInputElement>document.getElementById(inputId) ||
          <HTMLTextAreaElement>document.getElementById(inputId);
        let requiredTextElement = document.getElementById(requiredTextId);

        if (!this.validationRules[key as InputKeys]?.test(inputElement.value)) {
          requiredTextElement?.classList.remove('hide');
        } else {
          requiredTextElement?.classList.add('hide');
        }
      }
    }
  }

/**
 * The function `switchToGerman` changes the language on a webpage to German and updates the relevant
 * elements.
 */  switchToGerman() {
    document.getElementById('pgerman')?.classList.add('chosen-language');
    document.getElementById('penglish')?.classList.remove('chosen-language');
    document.getElementById('legalNoticeTitle')!.innerText = 'Rechtlicher Hinweis';
    this.currentLanguage = 'de';
  }


/**
 * The function `switchToEnglish` changes the language to English and updates the UI accordingly.
 */
  switchToEnglish() {
    document.getElementById('penglish')?.classList.add('chosen-language');
    document.getElementById('pgerman')?.classList.remove('chosen-language');
    document.getElementById('legalNoticeTitle')!.innerText = 'Legal Notice';
    this.currentLanguage = 'en';
  }

  /**
   * This function calls the `hideLegalNotice()` method of the `scrollService` object.
   */
  hideLegalNotice() {
    this.scrollService.hideLegalNotice();
  }

  /**
   * The function calls the `showLegalNotice()` method of the `scrollService` object.
   */
  showLegalNotice() {
    this.scrollService.showLegalNotice();
  }

  /**
   * The function opens a new browser window with the specified URL.
   * @param {string} url - The `url` parameter is a string that represents the URL (Uniform Resource
   * Locator) of the webpage that needs to be opened in a new browser window/tab.
   */
  navigateTo(url: string) {
    window.open(url, '_blank');
  }

  /* The `validationRules` object is defining regular expressions that are used to validate the input
fields in the contact form. The `name` regular expression requires at least 2 characters, the
`email` regular expression requires a valid email format, and the `text` regular expression requires
at least 20 characters. These regular expressions are used in the `updateFormFilledStatus()`
function to determine if the input fields are valid or not. */
  validationRules = {
    name: new RegExp('^.{2,}$', 's'),
    email: new RegExp('^\\S+@\\S+\\.\\S+$'),
    text: new RegExp('^.{20,}$', 's'),
  };

  /**
   * This function updates the status of a form element based on whether it is filled and whether it
   * passes a validation rule.
   * @param {any} event - An event object that triggered the function (e.g. a keypress or a click
   * event).
   * @param {string} inputElementId - The ID of the HTML input element that triggered the event.
   * @param {string} labelElementId - The ID of the HTML label element associated with the input
   * element.
   * @param {string} className - A string representing the CSS class name to be added or removed from
   * the input or label element based on its filled status.
   * @param {boolean} [isLabel=false] - A boolean flag indicating whether the element to update is a
   * label element or an input element. If true, the label element will be updated, otherwise the input
   * element will be updated.
   * @param {string} requiredTextId - The ID of the HTML element that displays the required text
   * message for the input field.
   * @param {string} validationType - The type of validation rule to apply to the input element, which
   * is a string value that corresponds to a key in the `validationRules` object.
   */
  updateFormFilledStatus(
    event: any,
    inputElementId: string,
    labelElementId: string,
    className: string,
    isLabel: boolean = false,
    requiredTextId: string,
    validationType: string
  ) {
    let inputElement = <HTMLInputElement>(
      document.getElementById(inputElementId)
    );
    let labelElement = document.getElementById(labelElementId);
    let requiredTextElement = document.getElementById(requiredTextId);
    let imgElement = document.getElementById(inputElementId + 'Img');

    this.isFormValid =
      this.validationRules['name'].test(this.nameField.nativeElement.value) &&
      this.validationRules['email'].test(this.emailField.nativeElement.value) &&
      this.validationRules['text'].test(this.messageField.nativeElement.value);

    let elementToUpdate = isLabel ? labelElement : inputElement;

    let inputValue = inputElement.value;

    if (inputElement.value === '') {
      elementToUpdate?.classList.remove(className);
      requiredTextElement?.classList.add('hide');
      imgElement?.classList.add('hide');
    } else if (
      this.validationRules[
        validationType as keyof typeof this.validationRules
      ].test(inputValue)
    ) {
      elementToUpdate?.classList.add(className);
      requiredTextElement?.classList.add('hide');
      imgElement?.classList.remove('hide');
    } else {
      elementToUpdate?.classList.remove(className);
      requiredTextElement?.classList.remove('hide');
      imgElement?.classList.add('hide');
    }
  }

  /**
   * This function removes leading whitespace from the input value if it starts with a tab or space
   * character.
   * @param {any} event - The `event` parameter is an object that represents the event that triggered the
   * `onFocus` function. It contains information about the event, such as the target element and any data
   * associated with the event.
   */
  onFocus(event: any) {
    let value = event.target.value;
    if (value.startsWith('\t') || value.startsWith(' ')) {
      event.target.value = value.trimStart();
    }
  }

  /**
   * The function adds classes to the name label and input elements to indicate focus and filled status.
   */
  nameLabelUp() {
    let nameInput = <HTMLInputElement>document.getElementById('nameInput');
    let nameLabel = document.getElementById('nameLabel');

    nameLabel?.classList.add('input-name-label-focused');

    if (nameInput.value) {
      nameInput.classList.add('form-filled');
      nameLabel?.classList.add('form-filled-label');
    }
  }

  /**
   * The function removes the focus from the name input field and removes the "form-filled" class if the
   * input is empty, otherwise it adds the "form-filled" class.
   */
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

  /**
   * This function adds a CSS class to the email label and input field if the email input field is
   * focused or filled.
   */
  emailLabelUp() {
    let emailInput = <HTMLInputElement>document.getElementById('emailInput');
    let emailLabel = document.getElementById('emailLabel');

    emailLabel?.classList.add('input-email-label-focused');

    if (emailInput.value) {
      emailInput.classList.add('form-filled');
    }
  }

  /**
   * This function removes the focus class from an email label and removes the form-filled class from an
   * email input if the input value is empty.
   */
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

  /**
   * This function adds a class to a text label and a textarea element if the textarea has a value.
   */
  textLabelUp() {
    let textarea = <HTMLTextAreaElement>document.getElementById('textArea');
    let textLabel = document.getElementById('textLabel');

    textLabel?.classList.add('textarea-label-focused');

    if (textarea.value) {
      textarea.classList.add('form-filled');
    }
  }

  /**
   * This function removes the focus from a text label and removes a class from a textarea if the
   * textarea is empty, otherwise it adds a class to the textarea.
   */
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

  /**
   * This function scrolls smoothly to a specified element on the page.
   * @param {string} elementId - A string representing the ID of the HTML element that needs to be
   * scrolled into view.
   */
  scrollToElement(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * This function scrolls the page smoothly to a specified target element when triggered by a mouse
   * click event.
   * @param {MouseEvent} event - A MouseEvent object that represents an event triggered by a mouse
   * action, such as a click or hover.
   * @param {string} targetId - The targetId parameter is a string that represents the ID of the HTML
   * element that we want to scroll to.
   */
  scrollTo(event: MouseEvent, targetId: string): void {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * This function opens the default email client with the recipient email address pre-filled.
   */
  public sendEmail() {
    window.location.href = 'mailto:contact.yusuffiliz@gmail.com';
  }

  /**
   * The function sets up a subscription to changes in animated elements and observes those elements.
   */
  ngAfterViewInit() {
    this.animatedElements.changes.subscribe(() => {
      this.observeElements();
    });

    this.observeElements();
  }

  /**
   * This function observes elements and adds a CSS class to them when they intersect with the
   * viewport.
   */
  observeElements() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slideInDown');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.animatedElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }
}
