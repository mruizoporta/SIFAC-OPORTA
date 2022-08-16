import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse,  CompanyAccountResponse, Usuario } from '../interface/auth.interface';
import {catchError, map} from 'rxjs/operators';
import { of, tap, Observable, ConnectableObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){    
    return {... this._usuario}
  }
  constructor( private http: HttpClient) { }

  login(email: string, password:string){
    const url= `${this.baseUrl}/auth/login`;   
    const body = { email, password} ;

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp=> {
        localStorage.setItem('token', resp.token!)        
        this._usuario={
                    email: resp.email!,
                    id: resp.accountid!
        }     
        console.log(this._usuario);
        
      }),
      map( resp => resp.ok),
      catchError(err => of(err.error.msg)
      ));
    
  }

  validarToken():Observable<boolean>{
    const url= `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token')|| '')

     return this.http.get<AuthResponse>(url,{headers:headers})
            .pipe(
              map(resp=> {
                localStorage.setItem('token', resp.token!)
                    this._usuario={
                    email:resp.email!,
                    id: resp.accountid!
                }  
                console.log('respuesta');
                console.log(this._usuario);
                return resp.ok;
              }),
              catchError(err=> of(false))
            )
  }

  getCompanyByAccount(id:string):Observable<CompanyAccountResponse[]>{     
    return this.http.get<CompanyAccountResponse[]>(`${this.baseUrl}/companyaccount/${id}`);
  }

  logout(){
    localStorage.clear();
  }
}
