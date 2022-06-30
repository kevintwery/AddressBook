import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PageHeaderComponent} from "./component/page-header/page-header.component";
import { ContactRowComponent } from './component/contact-row//contact-row.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { CreateContactComponent } from './component/create-contact/create-contact.component';
import { ContactDetailsComponent } from './component/contact-details/contact-details.component';
import { ProfilePictureComponent } from './component/elements/profile-picture/profile-picture.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    ContactRowComponent,
    ContactListComponent,
    CreateContactComponent,
    ContactDetailsComponent,
    ProfilePictureComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
