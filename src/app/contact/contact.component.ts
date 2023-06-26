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

  async sendMail() {
    if (!this.isFormValid) {
      console.log('Form is invalid. Not sending mail.');
      this.showValidationErrors();
      return;
    }

    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    // Deaktivieren Sie die Eingabefelder und den Button während des Sendens der E-Mail
    nameField.disabled = true;
    emailField.disabled = true;
    messageField.disabled = true;
    sendButton.disabled = true;
    this.sendButton.nativeElement.disabled = true;

    // Animation anzeigen (sofern vorhanden)

    // Formulardaten erstellen
    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    // E-Mail senden
    try {
      await fetch('https://yusuffiliz.com/send_mail/send_mail.php', {
          method: 'POST',
          body: fd,
      });

      this.isEmailSentPopupVisible = true;

      // Werte der Eingabefelder auf leere Zeichenfolgen setzen
      nameField.value = '';
      emailField.value = '';
      messageField.value = '';

      setTimeout(() => {
          this.isEmailSentPopupVisible = false;
      }, 3000);

    } catch (error) {
      console.error('Error sending mail', error);
    } finally {
      // Aktivieren Sie die Eingabefelder und den Button, nachdem die E-Mail gesendet wurde
      nameField.disabled = false;
      emailField.disabled = false;
      messageField.disabled = false;
      sendButton.disabled = false;
      this.sendButton.nativeElement.disabled = false;
    }
  }

  switchToGerman() {
    document.getElementById('pgerman')?.classList.add('chosen-language');
    document.getElementById('penglish')?.classList.remove('chosen-language');
    this.currentLanguage = 'de';
  }

  switchToEnglish() {
    document.getElementById('penglish')?.classList.add('chosen-language');
    document.getElementById('pgerman')?.classList.remove('chosen-language');
    this.currentLanguage = 'en';
  }

  hideLegalNotice() {
    this.scrollService.hideLegalNotice();
  }

  showLegalNotice() {
    this.scrollService.showLegalNotice();
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }

  validationRules = {
    name: new RegExp('^.{2,}$'),
    email: new RegExp('^\\S+@\\S+\\.\\S+$'),
    text: new RegExp('^.{20,}$'),
  };

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

    // remove line breaks before validating
    let inputValueWithoutLineBreaks = inputElement.value.replace(/\n/g, '');

    if (inputElement.value === '') {
      elementToUpdate?.classList.remove(className);
      requiredTextElement?.classList.add('hide');
      imgElement?.classList.add('hide');
    } else if (
      this.validationRules[
        validationType as keyof typeof this.validationRules
      ].test(inputValueWithoutLineBreaks)
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

  showValidationErrors() {
    // Liste der erforderlichen Textelemente
    const requiredTextIds = ['requiredNameText', 'requiredEmailText', 'requiredMessageText'];

    // Durchlaufe jeden ID und entferne die 'hide'-Klasse
    for (const id of requiredTextIds) {
      let requiredTextElement = document.getElementById(id);
      requiredTextElement?.classList.remove('hide');
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

  public sendEmail() {
    window.location.href = 'mailto:y.filiz.ch@gmail.com';
  }

  ngAfterViewInit() {
    // Wenn sich die Liste der Elemente ändert (z. B. durch dynamische Änderungen), starten Sie die Beobachtung erneut
    this.animatedElements.changes.subscribe(() => {
      this.observeElements();
    });

    this.observeElements();
  }

  observeElements() {
    const options = {
      root: null, // Bezieht sich auf den Viewport
      rootMargin: '0px',
      threshold: 0.1, // Beginnt die Animation, wenn 10% des Elements im Viewport sind
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Fügen Sie die Animationsklasse hinzu, wenn das Element im Viewport ist
          entry.target.classList.add('slideInDown');
          observer.unobserve(entry.target); // Sobald das Element sichtbar ist, beenden wir die Beobachtung
        }
      });
    }, options);

    // Beginnen Sie die Beobachtung für jedes Element
    this.animatedElements.forEach((element) => {
      observer.observe(element.nativeElement);
    });
  }
}
