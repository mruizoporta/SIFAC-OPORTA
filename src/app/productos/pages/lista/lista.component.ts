import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarComponent } from '../../components/agregar/agregar.component';
import { ProductosResponse } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(
    private productosServices: ProductosService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog

  ) { }

  dataSource!: MatTableDataSource<any>;  
  displayedColumns: string[] = ['code', 'name','model','category','brand','action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  company !: number;
  productos : ProductosResponse[]=[]; 

  getCompany() {
    return sessionStorage.getItem('company');
  }

  ngOnInit(): void {
    this.company= Number(this.getCompany());   
    this.getproductos();
  }

  getproductos(){
     this.productosServices.getproductos(this.company).subscribe(
     {
      next:(data)=>{       
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort;
      },
      error:(err)=>{
        console.log(err);
        this.notifyService.showError('Error obteniendo la lista','SIFAC') 
      }     
  }) 
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

mostrarConfirmacionEliminar(id:number): void {
  this.dialog
    .open(DialogoConfirmacionComponent, {
      data: `¿Esta seguro de inactivar el producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.eliminarProducto(id);
      }
    });
    
}

eliminarProducto(id:number)
{
    this.productosServices.inactivarProducto(id)
    .subscribe( {
      next:(res)=>{
        this.getproductos();
        this.notifyService.showSuccess('El producto se inactivo correctamente.','SIFAC');       
       
      },error:()=>{
        this.notifyService.showError('Error inactivando el producto','SIFAC')          
      }
    })
}

openDialog() {
  this.dialog.open(AgregarComponent,{
     width:'60%'
   })
   
   .afterClosed().subscribe(val=>{
     if(val==='save'){
       this.getproductos()
     }
   })   
 }

 
 editProducto(row:any){   

  console.log(row);
  // this.dialog.open(AgregarComponent,{
  //   width:'50%',
  //   data:row
  // })
  
  // .afterClosed().subscribe(val=>{
  //   if(val==='update'){
  //     this.getproductos()
  //   }
  // })
}


}
