import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less']
})
export class ContactDetailsComponent implements OnInit {
  public isEditMode: boolean = false;
  @Input() openContact: { id: number, profilePicturePath: string, img: string, firstName: string, lastName: string, companyName: string,
    phoneNumbers: [{ phoneNumber: string, type: string, isPrimary: boolean }] };
  private phoneNumberList: any = [];

  constructor() {
    this.changeToNonEditMode();
  }

  ngOnInit(): void {
    this.openContact = JSON.parse(localStorage.getItem('openContact'));
  }

  changeToEditMode() {
    this.isEditMode = true;
  }

  changeToNonEditMode() {
    this.isEditMode = false;
    let openContact = localStorage.getItem('openContact');
    if (openContact) {
      this.openContact = JSON.parse(openContact);
    }
  }

  addNewPhoneNumber(): void {
    this.openContact.phoneNumbers.push({ phoneNumber: "", type: "", isPrimary: false })
  }

  saveContactChanges() {
    let phoneNumberContainers = document.querySelectorAll<HTMLInputElement>('.phone-number-container');
    let primaryPhoneNumberSelected = false;
    phoneNumberContainers.forEach((phoneNumberContainer) => {
      if (phoneNumberContainer.classList.contains('primary')) {
        primaryPhoneNumberSelected = true;
      }
    });
    if (!primaryPhoneNumberSelected) {
      phoneNumberContainers[0].classList.add('primary')
    }
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    let firstName = document.querySelector<HTMLInputElement>('.create-contact-form #first-name');
    let lastName = document.querySelector<HTMLInputElement>('.create-contact-form #last-name');
    let companyName = document.querySelector<HTMLInputElement>('.create-contact-form #company-name');
    let phoneNumbers = document.querySelectorAll<HTMLInputElement>('.phone-number-container input');
    let phoneNumbersTypes = document.querySelectorAll<HTMLInputElement>('.phone-number-container select.phone-number-type');

    for (let i = 0; i < phoneNumbers.length; i++) {
      this.phoneNumberList.push(
        {
          phoneNumber: phoneNumbers[i].value,
          type: phoneNumbersTypes[i].value,
          isPrimary: phoneNumberContainers[i].classList.contains('primary'),
        }
      );
    }

    let newContact = {
      id: contacts.length,
      firstName: firstName?.value,
      lastName: lastName?.value,
      companyName: companyName?.value,
      phoneNumbers: this.phoneNumberList,
    }
    contacts[this.openContact.id] = newContact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorage.setItem('openContact', JSON.stringify(newContact));
  }

  deleteContact() {
    let contacts = localStorage.getItem('contacts');
    if (contacts) {
      let parsedContacts = JSON.parse(contacts);

      localStorage.setItem('contacts', JSON.stringify(parsedContacts.splice(this.openContact.id, 1)));
      localStorage.removeItem('openContact')

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
    parentOfClickElement.classList.add('primary')

  }

  removeNewPhoneNumber(indexToRemove: number): void {
    this.openContact.phoneNumbers.splice(indexToRemove, 1);
  }

  returnToContactList(): void{
    document.querySelector('contact-list').classList.remove('detailedWindowOpen')
  }
}
