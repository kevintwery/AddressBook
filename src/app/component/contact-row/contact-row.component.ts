import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.less']
})
export class ContactRowComponent implements OnInit {
  @Input() contact: any;
  constructor() { }

  ngOnInit(): void {
  }

  openContactDetails(event: Event){
    let parsedContacts;
    let parsedContactIndex;
    let target = event.currentTarget as HTMLElement;
    target.classList.forEach(htmlElementClass => {
      if(htmlElementClass.includes('contact-number')){
        let contacts = localStorage.getItem('contacts');
        if(contacts){
          parsedContacts = JSON.parse(contacts);
          parsedContactIndex = htmlElementClass.substring('contact-number-'.length);
        }
      }
    });
    if(parsedContacts && parsedContactIndex) {
      localStorage.setItem('openContact', JSON.stringify(parsedContacts[parsedContactIndex]));
    }
  }
}
