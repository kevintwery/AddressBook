import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.less']
})
export class ContactFormComponent implements OnInit {
  public phoneNumberRows = [1];
  constructor() { }

  ngOnInit(): void {
  }

  preventEventBubbling(event: Event): void {
    event.stopPropagation();
  }

  saveNewContact(): void {
    let contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
    let firstName = document.querySelector<HTMLInputElement>('.create-contact-form #first-name');
    let lastName = document.querySelector<HTMLInputElement>('.create-contact-form #last-name');
    let companyName = document.querySelector<HTMLInputElement>('.create-contact-form #company-name');
    let phoneNumbers = document.querySelectorAll<HTMLInputElement>('.phone-number-container input');
    let phoneNumbersTypes = document.querySelectorAll<HTMLInputElement>('.phone-number-container select.phone-number-type');
    let phoneNumberList = [];
    for (let i = 0; i < phoneNumbers.length; i++) {
      phoneNumberList.push(
        {
          phoneNumber: phoneNumbers[i].value,
          type: phoneNumbersTypes[i].value
        }
      );
    }

    let newContact = {
      id: contacts.length,
      firstName: firstName?.value,
      lastName: lastName?.value,
      companyName: companyName?.value,
      phoneNumbers: phoneNumberList,
    }
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  public hideCreateContactModal(): void {
    let createContactFormElement = document.querySelector<HTMLElement>('.create-contact-back-drop');
    if (createContactFormElement) {
      createContactFormElement.style.display = 'none';
    }
  }
  markPhoneNumberAsPrimary(event: Event): void {
    let phoneNumberContainers = document.querySelectorAll<HTMLInputElement>('.phone-number-container');
    phoneNumberContainers.forEach((phoneNumber) => {
      if (phoneNumber.classList.contains('primary')) {
        phoneNumber.classList.remove('primary')
      }
    })

    let clickedElement = event.target as HTMLElement;
    let parentOfClickElement = clickedElement.parentNode as HTMLElement;
    parentOfClickElement.classList.add('primary');
    event.stopPropagation();
  }

  addNewPhoneNumber(): void {
    this.phoneNumberRows.push(this.phoneNumberRows.length)
  }

  removeNewPhoneNumber(indexToRemove: number): void {
    this.phoneNumberRows.splice(indexToRemove,1);
  }

}
