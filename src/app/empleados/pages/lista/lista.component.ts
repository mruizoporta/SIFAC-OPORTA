import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from 'src/app/marcas/services/marcas.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarComponent } from '../../components/agregar/agregar.component';
import { empleadoResponse } from '../../interfaces/empleados.interfaces';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private empleadoService: EmpleadosService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog ) { }
    
  dataSource!: MatTableDataSource<any>;  
  displayedColumns: string[] = ['nameemployee', 'identification','Posicion','action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  company !: number;
  employee : empleadoResponse[]=[]; 
  

  ngOnInit(): void {
    this.company= Number(this.getCompany());
   
    this.getemployee();
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }
  getemployee(){
    console.log('entro a actualizar'); 

     this.empleadoService.getempleados(this.company).subscribe(
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
      data: `¿Esta seguro de inactivar el empleado?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.eliminarEmpleado(id);
      }
    });
    
}

eliminarEmpleado(id:number)
{
    this.empleadoService.inactivarEmpleado(id)
    .subscribe( {
      next:(res)=>{
        this.getemployee();
        this.notifyService.showSuccess('El empleado se inactivo correctamente.','SIFAC');       
       
      },error:()=>{
        this.notifyService.showError('Error inactivando al empleado','SIFAC')          
      }
    })
}

openDialog() {
  this.dialog.open(AgregarComponent,{
     width:'60%'
   })
   
   .afterClosed().subscribe(val=>{
     if(val==='save'){
       this.getemployee()
     }
   })   
 }

 
 editEmpleado(row:any){   
  this.dialog.open(AgregarComponent,{
    width:'60%',
    data:row
  })
  
  .afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getemployee()
    }
  })
}


}
