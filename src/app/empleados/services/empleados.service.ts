import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cityResponse, Empleado, empleadoResponse } from '../interfaces/empleados.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getempleados(companyid:number):Observable<empleadoResponse[]>{   
    return this.http.get<empleadoResponse[]>(`${this.baseUrl}/empleado/${companyid}`);
  }

  agregarEmpleado(empleado: Empleado):Observable<Empleado[]>{  
    console.log(empleado)
    return this.http.post<Empleado[]>(`${this.baseUrl}/empleado/persona`,empleado);
  }

  editarEmpleado(empleado: Empleado, id:number){    
    return this.http.put<Empleado[]>(`${this.baseUrl}/empleado/${id}`,empleado);
  }

  inactivarEmpleado( id:number){
    return this.http.put<Empleado[]>(`${this.baseUrl}/empleado/inactivar/${id}`,[]);
  }

  getEmpleadoOne(id: number){   
  
    return this.http.get<Empleado[]>(`${this.baseUrl}/empleado/one/${id}`);
  }

  getCiudades()
  {
    return this.http.get<cityResponse[]>(`${this.baseUrl}/city/getCitybyCountry/1`);
  }

}
