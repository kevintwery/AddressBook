import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'my-app';
  public openContact: any;

  constructor() {

  }

  updateContactDetails(){
    this.openContact = JSON.parse(localStorage.getItem('openContact'));
  }
}
