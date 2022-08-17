import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUsiario } from './interfaces.catalog';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getInfoUsuario(id:string):Observable<InfoUsiario[]>{   
    return this.http.get<InfoUsiario[]>(`${this.baseUrl}/usuarios/info/${id}`);
  }

  

}
