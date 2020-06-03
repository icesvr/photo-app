import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  
  /*@Input() data:boolean;
  @Output() salida = new EventEmitter;*/
  data:boolean = false;
  url:string = "";
  constructor(private route:Router) { }

  ngOnInit() {
    this.url = this.route.url;
    console.log("URL: ",);
    if(localStorage.getItem("token")){
      this.data = true;
    }else{
      this.data = false;
    }
   
  }

  logout(){
    this.data = false;
    localStorage.removeItem("token");
    let id = this.url.split("/")[2];
    this.route.navigate(['profile',id]).then(res => {console.log(res)}).catch(err => {console.log(err);})
    
  }

}
