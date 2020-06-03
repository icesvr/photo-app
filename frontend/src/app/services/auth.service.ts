import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/login/login'

  constructor(private http:HttpClient) {


   }

   signUp(user){
     console.log('Auth service');
    return this.http.post<any>(this.url, user);
   }

   loggedIn(){
     return !!localStorage.getItem('token');
   }

  
}
