import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Brand, brandResponse } from '../interfaces/marcas.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getbrands(companyid:number):Observable<brandResponse[]>{ 
    return this.http.get<brandResponse[]>(`${this.baseUrl}/brand/${companyid}`);
  }

  agregarBrand(brand: Brand):Observable<Brand[]>{
    console.log(brand);
    return this.http.post<Brand[]>(`${this.baseUrl}/brand`,brand);
  }

  editarBrand(brand: Brand, id:number){
    console.log(brand);
    console.log(id);
    return this.http.put<Brand[]>(`${this.baseUrl}/brand/${id}`,brand);
  }

  inactivarBrand( id:number){
    return this.http.put<Brand[]>(`${this.baseUrl}/brand/inactivar/${id}`,[]);
  }

}
