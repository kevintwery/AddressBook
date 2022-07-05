import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.less']
})
export class CreateContactComponent implements OnInit {
  public phoneNumberList: { phoneNumber: string; type: string; isPrimary: boolean; }[] = [];
  public phoneNumberRows = [0];

  constructor() {
  }

  ngOnInit(): void {
  }

  saveNewContact(): void {
    let phoneNumberContainers = document.querySelectorAll<HTMLInputElement>('.phone-number-container');
    let primaryPhoneNumberSelected = false;
    phoneNumberContainers.forEach((phoneNumberContainer)=>{
      if(phoneNumberContainer.classList.contains('primary')){
        primaryPhoneNumberSelected = true;
      }
    });
    if(!primaryPhoneNumberSelected) {
      phoneNumberContainers[0].classList.add('primary')
    }
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    let profilePicture = document.querySelector<HTMLInputElement>('.profile-picture-selector img.selected');
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
      profilePicturePath: profilePicture.src,
      firstName: firstName?.value,
      lastName: lastName?.value,
      companyName: companyName?.value,
      phoneNumbers: this.phoneNumberList,
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

  preventEventBubbling(event: Event): void {
    event.stopPropagation();
  }

  addNewPhoneNumber(): void {
    this.phoneNumberRows.push(this.phoneNumberRows.length)
  }

  removeNewPhoneNumber(indexToRemove: number): void {
    this.phoneNumberRows.splice(indexToRemove,1);
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
}
