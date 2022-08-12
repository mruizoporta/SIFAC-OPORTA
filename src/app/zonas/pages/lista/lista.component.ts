import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { ZonasResponse } from '../../interfaces/zona.interface';
import { ZonasService } from '../../services/zonas.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarComponent } from '../../components/agregar/agregar.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor( private zoneService: ZonasService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog ) { }

    dataSource!: MatTableDataSource<any>;  
    displayedColumns: string[] = ['zoneid', 'name','action'];
   
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    company !: number;
    zona : ZonasResponse[]=[]; 
    
  ngOnInit(): void {
    this.company= Number(this.getCompany());
    this.getZona();
  }
  
  getCompany() {
    return sessionStorage.getItem('company');
  }

  getZona(){

     this.zoneService.getZonas(this.company).subscribe(
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

openDialog() {
  this.dialog.open(AgregarComponent,{
     width:'30%'
   })
   
   .afterClosed().subscribe(val=>{
     if(val==='save'){
       this.getZona()
     }
   })   
 }

 editZone(row:any){   
  this.dialog.open(AgregarComponent,{
    width:'30%',
    data:row
  })
  
  .afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getZona()
    }
  })
}

eliminarBrand(id:number)
{
    this.zoneService.inactivarZone(id)
    .subscribe( {
      next:(res)=>{
        this.getZona();
        this.notifyService.showSuccess('La zona se inactivo correctamente.','SIFAC');       
       
      },error:()=>{
        this.notifyService.showError('Error inactivando la zona','SIFAC')          
      }
    })
}

mostrarConfirmacionEliminar(id:number): void {
  this.dialog
    .open(DialogoConfirmacionComponent, {
      data: `¿Esta seguro de inactivar la zona?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.eliminarBrand(id);
      }
    });
}


}
