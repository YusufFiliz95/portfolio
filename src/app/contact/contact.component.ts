import { Component, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
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
  @ViewChildren('animatedElement', { read: ElementRef }) animatedElements!: QueryList<ElementRef>;

  constructor(private scrollService: ScrollService) {}

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
    text: new RegExp('^.{20,}$')
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
    let inputElement = <HTMLInputElement>document.getElementById(inputElementId);
    let labelElement = document.getElementById(labelElementId);
    let requiredTextElement = document.getElementById(requiredTextId);
    let imgElement = document.getElementById(inputElementId + 'Img');

    let elementToUpdate = isLabel ? labelElement : inputElement;

    // remove line breaks before validating
    let inputValueWithoutLineBreaks = inputElement.value.replace(/\n/g, '');

    if (inputElement.value === '') {
      elementToUpdate?.classList.remove(className);
      requiredTextElement?.classList.add('hide');
      imgElement?.classList.add('hide');
    } else if (this.validationRules[validationType as keyof typeof this.validationRules].test(inputValueWithoutLineBreaks)) {
      elementToUpdate?.classList.add(className);
      requiredTextElement?.classList.add('hide');
      imgElement?.classList.remove('hide');
    } else {
      elementToUpdate?.classList.remove(className);
      requiredTextElement?.classList.remove('hide');
      imgElement?.classList.add('hide');
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
      threshold: 0.1 // Beginnt die Animation, wenn 10% des Elements im Viewport sind
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Fügen Sie die Animationsklasse hinzu, wenn das Element im Viewport ist
          entry.target.classList.add('slideInDown');
          observer.unobserve(entry.target); // Sobald das Element sichtbar ist, beenden wir die Beobachtung
        }
      });
    }, options);

    // Beginnen Sie die Beobachtung für jedes Element
    this.animatedElements.forEach(element => {
      observer.observe(element.nativeElement);
    });
  }

}
