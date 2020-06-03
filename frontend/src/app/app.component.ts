import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit  {

  data:boolean = false;

  title = 'frontend';

  ngOnInit(){
    this.salir();
  }

 salir(){
   if(localStorage.getItem("token")){
       this.data = true;
   }else{
     this.data = false;
     
   }
 }

 logout(){
   localStorage.removeItem("token");
 }


}
