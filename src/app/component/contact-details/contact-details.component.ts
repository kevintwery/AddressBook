import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less']
})
export class ContactDetailsComponent implements OnInit {
  public openContact: any;
  public isEditMode: boolean = false;

  constructor() {
    this.changeToNonEditMode();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit():void {

  }
  changeToEditMode(){
    this.isEditMode = true;
    this.openContact.phoneNumbers.forEach((phoneNumber: { type: string; }, index: number) => {
      let phoneNumberOption = document.querySelectorAll<HTMLOptionElement>('.phone-number-type .' + phoneNumber.type.toLowerCase() + '-phone-number')
      phoneNumberOption[index].selected = true;
    });
  }
  changeToNonEditMode() {
    this.isEditMode = false;
    let openContact = localStorage.getItem('openContact');
    if (openContact) {
      this.openContact = JSON.parse(openContact);
    }
  }

  saveContactChanges() {

  }
}
