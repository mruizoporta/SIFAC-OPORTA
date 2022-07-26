import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { CompanyAccountResponse } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCompanyByAccount(id:string):Observable<CompanyAccountResponse[]>{   
    
    return this.http.get<CompanyAccountResponse[]>(`${this.baseUrl}/companyaccount/${id}`);
  }


}
