import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { categoryResponse } from 'src/app/categorias/interfaces/category.interfaces';
import { brandResponse } from 'src/app/marcas/interfaces/marcas.interfaces';
import { environment } from 'src/environments/environment';
import { Existencia, ProductoEdit, Productos, ProductosResponse } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getproductos(companyid:number):Observable<ProductosResponse[]>{   
    return this.http.get<ProductosResponse[]>(`${this.baseUrl}/product/${companyid}`);
  }

  agregarProducto(empleado: Productos):Observable<Productos[]>{  
    return this.http.post<Productos[]>(`${this.baseUrl}/product`,empleado);
  }  

  editarProducto(producto: Productos, id:number){      
    return this.http.put<Productos[]>(`${this.baseUrl}/product/${id}`,producto);
  }

  editarExistencia(existencia: Existencia, id:number){     
    return this.http.put<Existencia[]>(`${this.baseUrl}/productstore/${id}`,existencia);
  }
  inactivarProducto( id:number){
    return this.http.put<Productos[]>(`${this.baseUrl}/product/inactivar/${id}`,[]);
  }

  getCategorias(companyid:string| null)
  {
    return this.http.get<categoryResponse[]>(`${this.baseUrl}/category/${companyid}`);
  }

  getMarcas(companyid:string| null)
  {
    return this.http.get<brandResponse[]>(`${this.baseUrl}/brand/${companyid}`);
  }

  getProductoOne(id: number){   
    return this.http.get<ProductoEdit[]>(`${this.baseUrl}/product/oneproduct/${id}`);
  }

  getExistenciaBodega(id: number){
    return this.http.get<Existencia[]>(`${this.baseUrl}/productstore/one/${id}`);
  }
}
