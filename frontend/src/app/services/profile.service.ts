import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url:string = 'http://localhost:3000/profile';

  constructor(private http:HttpClient) { }

  getUserByToken(token){
    let bearer = 'Bearer '+token;
    let newToken = {
      token
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': bearer });
    return this.http.post<any>(this.url+'/buscarperfil',newToken,{headers});
  }

  getUserById(id){
    console.log('ID', {id});
    return this.http.post<any>(this.url+'/findbyid',{id});
  }

  getPhotos(id){
    return this.http.post<any>(this.url+'/getphotos/'+id,null);
  }

  getPhoto(id){
    return this.http.post<any>(this.url+'/photo/'+id,null);
  }

  uploadPhoto(data:FormData, token:string){
    console.log('Upload Photo Service');
    let newToken = 'Bearer '+token;
    let headers = new HttpHeaders({
      
      'Authorization': newToken });
    return this.http.post<any>(this.url+'/subir', data,{headers});
  }

  updateProfile(data:FormData, token:string){
    console.log("TOKEN SERVICE: ",token);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+token });

    return this.http.post<any>(this.url+'/newuser',data,{headers})
  }

  private _listener = new Subject<any>();

  listen() : Observable<any>{
    return this._listener.asObservable()
  }
  filter(filter:string){
    this._listener.next(filter);
  }

}
