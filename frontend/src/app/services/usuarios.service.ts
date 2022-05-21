import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responses } from "../interfaces/responses";
import { Usuario } from '../interfaces/usuarios';


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private appConfig: any;
  private http : HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   
  }

  getQuery(params:string, query:string){
    const url = `http://localhost:3000${query}/${params}`;
    return this.http.get(url);
  }

  postQuery(params:any, query: any): Observable<Responses>{
    const url = `http://localhost:3000${query}`;
    return this.http.post<Responses>(url, params);
  }

  putQuery(params:any, query: any): Observable<Responses>{
    const url = `http://localhost:3000${query}`;
    return this.http.put<Responses>(url, params);
  }

  deleteQuery(query:any): Observable<Responses>{
    const url = `http://localhost:3000${query}`;
    return this.http.delete<Responses>(url);
  }

  getUsers(): Observable<any>{
   return this.getQuery('','');    
  }

  getUser(id:string):Observable<any>{
    return this.getQuery(id, '/user')
  }

  deleteUser(id:string):Observable<any>{
    return this.deleteQuery(`/api/user/delete/${id}`);
  }

  addUser(params:Usuario){
      return this.postQuery(params, '/api/users/save');
  }

  updateUser(params:Usuario){
    return this.putQuery(params, '/api/user/update');
  }


}
