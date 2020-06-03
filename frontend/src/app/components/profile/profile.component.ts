import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserInterface } from './../../models/User';
import { ThrowStmt } from '@angular/compiler';
import { ModalsubirComponent } from './../modalsubir/modalsubir.component';
import { EditprofileComponent } from './../editprofile/editprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private url;string = "http://localhost:3000/";
  idParam:string;
  token:string;
  user:UserInterface;
  newUser:UserInterface;
  photos:any[];
  estado:boolean;
  retorno:boolean;
  linkimg:String;
  showEditModal = {
    id: '',
    status:false
  }
  showModal = {
    id: '',
    status: false
  }
  showPhoto = {
    id: '',
    idUser:'',
    status: false
  }
  nPhotos:Number;

  constructor(private profileService:ProfileService, private routeActivate: ActivatedRoute, public matDialog: MatDialog, private router:Router) {
    this.profileService.listen().subscribe((m:any)=>{
      this.refreshData();
        
    })
   }

  ngOnInit() {
    this.routeActivate.paramMap.subscribe(res => {this.idParam = res.get("id")});
    this.getUserById(this.idParam);
    this.refreshData();
    console.log(this.showModal);
    //this.getPhotos(this.idParam);
    
    
  }
  getUserById(id){
    this.profileService.getUserById(id).subscribe(res => {
      let url = res.profile.imgpath
      this.user = res;
      console.log(res);
      this.user.profile.cantFotos = res.profile.photos.length;
      this.user.profile.nickname = res.profile.nickname;
      this.linkimg = "http://localhost:3000/"+this.user.profile.imgpath;
      
      this.getPhotos(id)
      this.getUser();
  
  
    },
    err => {
      console.log(err);
    })
  }

  getUser(){
    console.log("GET USER");
    this.token = localStorage.getItem('token');
    console.log('Obtiene token     ',this.token);
    
    this.profileService.getUserByToken(this.token).subscribe( res => {
      console.log("Service get User");
      this.newUser = res;
      if(this.user.email === this.newUser.email){
        this.estado = true;
      }else{
        this.estado = false;
      }  
    },
    err => {
      this.estado=false;
    }
    );
  
  }

  



  getPhotos(id){
  
    this.profileService.getPhotos(id).subscribe(
      res => {
        
        this.photos = res;
      },
      err => {'err: '+console.log(err);}
    );
    
  }

  showAdminTab(value){
    console.log("Show admin");
      this.showEditModal.status = value;
      this.showEditModal.id = this.idParam;
  }

  showModalUploadPhoto(value){
    
    this.showModal.status = value;
    
  }
  
 

  showModalUpload(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.matDialog.open(ModalsubirComponent, dialogConfig);
    
    
  }

  showModalPhoto(id){
    console.log("idd: ",id);
    this.showPhoto.id = id;
    this.showPhoto.idUser = this.idParam;
    let status = (this.showPhoto.status === undefined) ? false : true;
    this.showPhoto.status = true;
    console.log("PhotoStatus: "+this.showPhoto.status);
    //this.router.navigate(['/profile', this.idParam,id]).then(res=> console.log(res)).catch(err=>console.log(err));
    
  }
  muestra(event){
    console.log("evento: "+event);
  }
  
  openPhoto(id){
    
    console.log(id);
    
    this.showPhoto.status = true;
    console.log("status: ",this.showPhoto.status);
    
    //this.showPhoto.status = true
  }

  refreshData(){
    console.log("refresh data");
    let token = localStorage.getItem("token");
    this.profileService.getUserByToken(token).subscribe(res=>{console.log(res)}, err=>{console.log(err);})
  }

  editarPerfil(){
      let dialogRef = this.matDialog.open(EditprofileComponent);
      dialogRef.afterClosed().subscribe(result=>{
         
          if(result = true){
            console.log("rsult:",result);
            this.router.navigate(["profile",this.idParam])
          }else{
            console.log("Nose");
          }
      })
  }
  
  subirFoto(){
    this.matDialog.open(ModalsubirComponent).afterClosed().subscribe(result => {
      console.log("RESULT SUBIR FOTO: ",result);
    })

  }

}

  

