import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InfoUsiario } from 'src/app/services/interfaces.catalog';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedService } from 'src/app/services/shared.service';
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

  constructor(  
    private fb: FormBuilder,
    private authService: AuthService,
    private rutasServices: RutasService, 
    private sharedService: SharedService,
    private notifyService : NotificationService, 
    public dialog: MatDialog) { }

    dataSource!: MatTableDataSource<any>;  
    displayedColumns: string[] = [ 'code', 'name','collector','supervisor','secretaria','action'];
   
   // infoaccount : InfoUsiario[] =[];   

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    company !: number;
    rol: string|null="";
    productos : RutasResponse[]=[]; 
  
    get usuario(){
      return this.authService.usuario;
    }

    getCompany() {
      return sessionStorage.getItem('company');
    }
  
    getRol() {
      return sessionStorage.getItem('rol');
    }

      ngOnInit(): void {
      
        this.company= Number(this.getCompany());       
        this.rol = this.getRol();
        
      if (this.rol?.trim()=="Secretario")
      {
        //this.getRutas();
        this.getRutasPropias(this.usuario.id);
      }else{
        this.getRutas();
      }
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

  getRutasPropias(id: string){
    this.rutasServices.getrutasPropias(this.company, id ).subscribe(
    {
     next:(data)=>{   
     
      if(data !==null){   
       
       this.dataSource= new MatTableDataSource(data);
       this.dataSource.paginator= this.paginator;
       this.dataSource.sort= this.sort;
      }
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
  
