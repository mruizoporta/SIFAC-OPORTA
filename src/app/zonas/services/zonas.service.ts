import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ZonasResponse } from '../interfaces/zona.interface';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private baseUrl: string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  getZonas(companyid:number):Observable<ZonasResponse[]>{   
    return this.http.get<ZonasResponse[]>(`${this.baseUrl}/zone/${companyid}`);
  }
  
  inactivarZone( id:number){
    return this.http.put<ZonasResponse[]>(`${this.baseUrl}/zone/inactivar/${id}`,[]);
  }
  agregarZone(zone: Zone):Observable<Zone[]>{
   
    return this.http.post<Zone[]>(`${this.baseUrl}/zone`,zone);
  }

  editarZone(zone: Zone, id:number){    
    return this.http.put<Zone[]>(`${this.baseUrl}/zone/${id}`,zone);
  }
}
