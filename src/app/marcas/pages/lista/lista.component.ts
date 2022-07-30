import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';
import { AgregarComponent } from '../../components/agregar/agregar.component';
import { brandResponse } from '../../interfaces/marcas.interfaces';
import { BrandService } from '../../services/marcas.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(
    private brandService: BrandService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog 
  ) { }

  dataSource!: MatTableDataSource<any>;  
  displayedColumns: string[] = ['brandid', 'name', 'description','action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  company !: number;
  brand : brandResponse[]=[]; 
  
  ngOnInit(): void {
    this.company= Number(this.getCompany());
    this.getbrand();
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }

  getbrand(){
    console.log(this.company); 

     this.brandService.getbrands(this.company).subscribe(
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
       this.getbrand()
     }
   })   
 }

 editBrand(row:any){   
  this.dialog.open(AgregarComponent,{
    width:'30%',
    data:row
  })
  
  .afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getbrand()
    }
  })
}

eliminarBrand(id:number)
{
    this.brandService.inactivarBrand(id)
    .subscribe( {
      next:(res)=>{
        this.getbrand();
        this.notifyService.showSuccess('La marca se inactivo correctamente.','SIFAC');       
       
      },error:()=>{
        this.notifyService.showError('Error inactivando la marca','SIFAC')          
      }
    })
}

mostrarConfirmacionEliminar(id:number): void {
  this.dialog
    .open(DialogoConfirmacionComponent, {
      data: `¿Esta seguro de inactivar la marca?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.eliminarBrand(id);
      }
    });
}

name = 'Marcas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('BrandTable');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }


}
