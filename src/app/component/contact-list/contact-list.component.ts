import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {
  public contacts;
  @Output() contactClicked:EventEmitter<any> = new EventEmitter();

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
  openContactDetails(event: Event) {
    let parsedContacts;
    let parsedContactIndex;
    let target = event.currentTarget as HTMLElement;
    target.classList.forEach(htmlElementClass => {
      if (htmlElementClass.includes('contact-id-')) {
        let contacts = localStorage.getItem('contacts');
        if (contacts) {
          parsedContacts = JSON.parse(contacts);
          parsedContactIndex = htmlElementClass.substring('contact-id-'.length);
        }
      }
    });
    if (parsedContacts && parsedContactIndex) {
      localStorage.setItem('openContact', JSON.stringify(parsedContacts[parsedContactIndex]));
    }
    document.querySelector('contact-list').classList.add('detailedWindowOpen')
    this.contactClicked.emit();
  }
}
