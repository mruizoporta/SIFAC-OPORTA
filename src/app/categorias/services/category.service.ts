import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category, categoryResponse } from '../interfaces/category.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getCategories(companyid:number):Observable<categoryResponse[]>{       
    return this.http.get<categoryResponse[]>(`${this.baseUrl}/category/${companyid}`);
  }

  agregarCategory(category: Category):Observable<Category[]>{
    return this.http.post<Category[]>(`${this.baseUrl}/category`,category);
  }

  editarCategory(category: Category, id:number){
    return this.http.put<Category[]>(`${this.baseUrl}/category/${id}`,category);
  }

  inactivarCategory( id:number){
    return this.http.put<Category[]>(`${this.baseUrl}/category/inactivar/${id}`,[]);
  }

}
