import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import {ProfileService } from './../../services/profile.service'

@Component({
  selector: 'app-modalsubir',
  templateUrl: './modalsubir.component.html',
  styleUrls: ['./modalsubir.component.css']
})
export class ModalsubirComponent implements OnInit {



  form:FormGroup;
  @Input() data:any;
  @Output() dataBack = new EventEmitter();

  constructor(private profileService:ProfileService, private formBuilder:FormBuilder, private route:Router) { 
    
  }

  ngOnInit() {
    console.log(this.data);
      this.form = this.formBuilder.group({
        image: [''],
        description: ['']
      })
  }
    
  onFileSelected(event){
    const file = event.target.files[0];
    this.form.get("image").setValue(file);
  }
  
  closeModal(value){
    
    
    this.route.navigate(['profile',this.data.id]).then(res => {
      console.log(res);
      
    }).catch(err=> {
      console.log(err);
    });
    this.dataBack.emit(value);
      
  }

  onSaveForm(){

    const token = localStorage.getItem('token');
    const formData = new FormData;
    formData.append('image',this.form.get("image").value);
    formData.append('description', this.form.get('description').value )
    this.profileService.uploadPhoto(formData,token).subscribe(
      res => {
        this.closeModal(false);    
        console.log(this.data.id);        
      },
      err =>{
        console.log(err);
      }
    )
  }
}
