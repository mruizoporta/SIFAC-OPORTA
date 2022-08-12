import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CatalogValueResponse } from './interfaces.catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getTipoIdentificacion():Observable<CatalogValueResponse[]>{   
    return this.http.get<CatalogValueResponse[]>(`${this.baseUrl}/catalogvalue/TIPOIDENTIFICACION`);
  }

  getGenero():Observable<CatalogValueResponse[]>{   
    return this.http.get<CatalogValueResponse[]>(`${this.baseUrl}/catalogvalue/GENERO`);
  }

  getEstadoCivil():Observable<CatalogValueResponse[]>{   
    return this.http.get<CatalogValueResponse[]>(`${this.baseUrl}/catalogvalue/ESTADOCIVIL`);
  }

  getDias():Observable<CatalogValueResponse[]>{   
    return this.http.get<CatalogValueResponse[]>(`${this.baseUrl}/catalogvalue/DIAS`);
  }

  getCargos():Observable<CatalogValueResponse[]>{   
    return this.http.get<CatalogValueResponse[]>(`${this.baseUrl}/catalogvalue/CARGOS`);
  }
 
}
