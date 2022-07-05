import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'contact-row',
  templateUrl: './contact-row.component.html',
  styleUrls: ['./contact-row.component.less']
})
export class ContactRowComponent implements OnInit {
  @Input() contact: any;
  @Output() contactClicked:EventEmitter<any> = new EventEmitter();
  public primaryPhoneNumber: {phoneNumber: string,type:string, isPrimary:boolean};

  constructor() {
  }

  ngOnInit(): void {
    this.contact.phoneNumbers.forEach((phoneNumber:{phoneNumber: string,type:string, isPrimary:boolean})=>{
      if(phoneNumber.isPrimary){
        this.primaryPhoneNumber = phoneNumber;
      }
    })
  }
}
