import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CiudadesResponse, Rutas, RutasResponse, ZonasResponse } from '../interfaces/ruta.interface';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getrutas(companyid:number):Observable<RutasResponse[]>{   
    return this.http.get<RutasResponse[]>(`${this.baseUrl}/route/${companyid}`);
  }
    
  getOnerutas(id: number){   
    return this.http.get<Rutas[]>(`${this.baseUrl}/route/oneroutes/${id}`);
  }

  getZonas(companyid:number):Observable<ZonasResponse[]>{   
    return this.http.get<ZonasResponse[]>(`${this.baseUrl}/zone/${companyid}`);
  }

  getCiudades()
  {
    return this.http.get<CiudadesResponse[]>(`${this.baseUrl}/city/getCitybyCountry/1`);
  }


  agregarRuta(ruta: Rutas):Observable<Rutas[]>{  
    console.log(ruta);
    return this.http.post<Rutas[]>(`${this.baseUrl}/route`,ruta);
  }

  editarRuta(ruta: Rutas, id:number){  
    console.log(ruta); 
    console.log(id);
    return this.http.put<Rutas[]>(`${this.baseUrl}/route/${id}`,ruta);
  }

  inactivarRuta( id:number){
    return this.http.put<Rutas[]>(`${this.baseUrl}/route/inactivar/${id}`,[]);
  }
}
