import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {
  public contacts;
  constructor() {
    let contacts = localStorage.getItem('contacts');
    if(contacts){
      this.contacts = JSON.parse(contacts);
    }
  }

  ngOnInit(): void {
  }

  addNewContact(): void {
    // @ts-ignore
    let createContactFormElement = document.querySelector<HTMLElement>('.create-contact-back-drop');
    if(createContactFormElement) {
      createContactFormElement.style.display = 'flex';
    }
  }
  openContactDetails(): void {

  }
}
