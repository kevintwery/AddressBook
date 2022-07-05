import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.less']
})
export class ProfilePictureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectProfilePicture(event: Event){
    let profilePictures = document.querySelectorAll<HTMLElement>('.profile-picture-selector img');
    profilePictures.forEach((profileImage)=>{
      profileImage.classList.remove('selected')
    })
    let clickedPicture = event.target as HTMLElement;
    clickedPicture.classList.add('selected');
  }
}
