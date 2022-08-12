import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarComponent } from '../../components/agregar/agregar.component';
import { RutasResponse } from '../../interfaces/ruta.interface';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor( private rutasServices: RutasService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog) { }

    dataSource!: MatTableDataSource<any>;  
    displayedColumns: string[] = [ 'code', 'name','collector','supervisor','secretaria','action'];
  
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    company !: number;
    productos : RutasResponse[]=[]; 
  
    getCompany() {
      return sessionStorage.getItem('company');
    }
  
    ngOnInit(): void {
      this.company= Number(this.getCompany());   
      this.getRutas();
    }
  
    getRutas(){
       this.rutasServices.getrutas(this.company).subscribe(
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
        data: `¿Esta seguro de inactivar la ruta?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarRuta(id);
        }
      });
      
  }
  
  eliminarRuta(id:number)
  {
   
      this.rutasServices.inactivarRuta(id)
      .subscribe( {
        next:(res)=>{
          this.getRutas();
          this.notifyService.showSuccess('La ruta se inactivo correctamente.','SIFAC');       
         
        },error:()=>{
          this.notifyService.showError('Error inactivando la ruta','SIFAC')          
        }
      })
  }
  
  openDialog() {
    this.dialog.open(AgregarComponent,{
       width:'60%'
     })
     
     .afterClosed().subscribe(val=>{
       if(val==='save'){
         this.getRutas()
       }
     })   
   }
  
   
   editRuta(row:any){   
    this.dialog.open(AgregarComponent,{
      width:'40%',
      data:row
    })
    
    .afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getRutas()
      }
    })
  }
  
  
  }
  
