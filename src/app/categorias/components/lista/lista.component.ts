import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
  import { categoryResponse } from '../../interfaces/category.interfaces';
import { CategoryService } from '../../services/category.service';
import { AgregarComponent } from '../agregar/agregar.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/dialogo-confirmacion/dialogo-confirmacion.component';

import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})

export class ListaComponent implements OnInit {

  constructor(
    private categoryService: CategoryService, 
    private notifyService : NotificationService, 
    public dialog: MatDialog ) { }

  dataSource!: MatTableDataSource<any>;  
  displayedColumns: string[] = ['categoryid', 'name', 'description','action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  company !: number;
  category : categoryResponse[]=[]; 

  ngOnInit(): void { 
    this.company= Number(this.getCompany());
    this.getcategory();
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }

  getcategory(){
    console.log(this.company); 

     this.categoryService.getCategories(this.company).subscribe(
     {
      next:(data)=>{
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort;
      },
      error:(err)=>{
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
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getcategory()
      }
    })   
  }

  editCategory(row:any){   
    this.dialog.open(AgregarComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getcategory();
      }
    })
  }

  eliminarCategoria(id:number)
  {
      this.categoryService.inactivarCategory(id)
      .subscribe( {
        next:(res)=>{
          this.getcategory();
          this.notifyService.showSuccess('La categoria se inactivo correctamente.','SIFAC');       
         
        },error:()=>{
          this.notifyService.showError('Error inactivando la categoria','SIFAC')          
        }
      })
  }

  mostrarConfirmacionEliminar(id:number): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: `¿Esta seguro de inactivar la categoria?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarCategoria(id);
        }
      });
  }


  name = 'Categorias.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('categoryTable');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  
}
