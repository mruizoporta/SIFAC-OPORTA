import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { categoryResponse, PeriodicElement } from '../../interfaces/category.interfaces';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [`
  table {
  width: 100%;
}`
  ]
})

export class ListaComponent implements OnInit {

 
  constructor(private categoryService: CategoryService) { }
  dataSource!: MatTableDataSource<any>;
  //displayedColumns: string[] = ['categoryid', 'name', 'description'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey: string='';
  category : categoryResponse[]=[]; 

  ngOnInit(): void {
   
  

    this.getcategory();
  }

  ELEMENT_DATA: categoryResponse[] = [
    {categoryid: 1, name: 'Hydrogen', description: 'Neon'},
    {categoryid: 2, name: 'Helium', description: 'Neon'},
    {categoryid: 3, name: 'Lithium', description: 'Neon'},
    {categoryid: 4, name: 'Beryllium', description: 'Neon'},
    {categoryid: 5, name: 'Boron', description: 'Neon'},
    {categoryid: 6, name: 'Carbon', description: 'Neon'},
    {categoryid: 7, name: 'Nitrogen', description: 'Neon'},
    {categoryid: 8, name: 'Oxygen', description: 'Neon'},
    {categoryid: 9, name: 'Fluorine', description: 'Neon'},
    {categoryid: 10, name: 'Neon', description: 'Neon'},
  ];

  displayedColumns: string[] = ['categoryid', 'name', 'description'];
  //dataSource = Array.of<categoryResponse>(this.category)

  getcategory(){
     this.categoryService.getCategories().subscribe(data =>
      {       
        this.category = data;   
  })   
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
