import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import {  Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  
  @Input() infoUser;
  @Output() edit = new EventEmitter;
    
  form:FormGroup;


  constructor(private profileService:ProfileService,private formBuilder:FormBuilder, private route:Router, private location:Location) { 


  }

  ngOnInit() {
    this.refreshData();
    this.form = this.formBuilder.group({
      image: [''],
      nickname: [''],
      description:['']
    })
  }
  
  onFileSelected(event){
    const file = event.target.files[0];
    this.form.get("image").setValue(file);
  }

  updateUser(){
    let token = localStorage.getItem('token');
    const formData = new FormData;
    //console.log(this.form);
    formData.append('image',this.form.get('image').value);
    formData.append('nickname',this.form.get('nickname').value);
    formData.append('description', this.form.get('description').value);
    
      this.profileService.updateProfile(formData,token).subscribe(
        res => {
         this.refreshData();
          
        },
        err => {console.log(err)}
      )
  }

  refreshData(){
    console.log("refresh data");
    let token = localStorage.getItem("token");
    this.profileService.getUserByToken(token).subscribe(res=>{console.log(res)}, err=>{console.log(err);})
  }

  closeModal(){
    this.infoUser.status = false;
    this.edit.emit(false);
    this.profileService.filter("Edit user");
  }

}
