import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { ProfileService } from './../../services/profile.service'



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  
  photo:any = {};

  @Input() dataPhoto:any;
  @Output() photoback = new EventEmitter();
  constructor(private route:Router, private profileService:ProfileService) { }
  
  ngOnInit() {
     this.showPhoto();
  }
  
  showPhoto(){
    let id = this.dataPhoto.id;
    this.profileService.getPhoto(id).subscribe(
      res => {
          this.photo = res;
          console.log(this.photo);
      },
      err => {
        console.log(err);
      }

    );
  }
  
  closeModal(){
    
    this.dataPhoto.status = false;
    this.photoback.emit(false)
    this.route.navigate(['/profile/'+this.dataPhoto.idUser]);
    
  }
  
  
}
