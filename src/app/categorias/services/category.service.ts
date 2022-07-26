import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { categoryResponse } from '../interfaces/category.interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getCategories():Observable<categoryResponse[]>{   
    
    return this.http.get<categoryResponse[]>(`${this.baseUrl}/category`);
  }
}
