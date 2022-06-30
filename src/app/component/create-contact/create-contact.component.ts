import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.less']
})
export class CreateContactComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
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

}
