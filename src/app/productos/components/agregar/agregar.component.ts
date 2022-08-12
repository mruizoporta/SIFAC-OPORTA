import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { categoryResponse } from 'src/app/categorias/interfaces/category.interfaces';
import { brandResponse } from 'src/app/marcas/interfaces/marcas.interfaces';
import { NotificationService } from 'src/app/services/notification.service';
import { Existencia, Productos } from '../../interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';
import {switchMap} from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  currencypipe!:CurrencyPipe;
  addProductoForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar producto';
  producto: Productos[]=[];
  marcas : brandResponse[]=[];
  categorias : categoryResponse[]=[];
  existencia: Existencia[]=[];
  id: number=0;

  get usuario(){   
    return this.authService.usuario;
  }
  getCompany() {
    return sessionStorage.getItem('company');
  }

  constructor(
    private fb: FormBuilder,
     private router: Router,
     private activatedRoute: ActivatedRoute, 
     private productServices: ProductosService,  
     private authService: AuthService,
     private notifyService : NotificationService,
    // public dialog: MatDialog,
     private snackBar: MatSnackBar,
    // private dialogRef: MatDialogRef<AgregarComponent>,
    // @Inject(MAT_DIALOG_DATA) public editdata:any
    
    ) { }

  ngOnInit(): void {
    const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';

    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));
    this.getMarcas();
    this.getCategorias();

    this.addProductoForm= this.fb.group({
      name:['', Validators.required],
      model:['', Validators.required],
      code:[''],
      categoryid:[],
      brandid:[],
      minimumquantity:['0', Validators.pattern(numericNumberReg)],
      utilitymargin_credit:['250',Validators.pattern(numericNumberReg)],
      utilitymargin_cash:['200',Validators.pattern(numericNumberReg)],
      averagecost:['0',Validators.pattern(numericNumberReg)],
      creditprice:['0', Validators.pattern(numericNumberReg)],
      cashprice:['0', Validators.pattern(numericNumberReg)],
      quantity:['0', Validators.pattern(numericNumberReg)],
      isactive: true,
      psr: false,
      createdon: this.dateTime,
      createdby: this.login,
      modifiedon: this.dateTime,
      modifiedby:this.login,
      bsc_company_companyid: this.getCompany(),
    });

    if (!this.router.url.includes('editar'))
    {  
      this.titulo='Agregar producto';     
      return;
    }else this.titulo='Editar producto';  

    this.titulo='Editar producto';
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    //Buscamos los datos del producto
      this.productServices.getProductoOne(this.id).subscribe(
      {
       next:(data)=>{ 
        this.addProductoForm.patchValue(data)  
       },
       error:(err)=>{
         console.log(err);        
       }     
   })    

    
    if (this.router.url.includes('editar')){       
      this.titulo='Editar producto'; 
    }  
  }

 getMarcas(){
    this.productServices.getMarcas(this.getCompany()).subscribe(data => {        
      this.marcas = data}
      );    
  }

  getCategorias(){
    this.productServices.getCategorias(this.getCompany()).subscribe(data => {        
      this.categorias = data}
      );    
  }
  
  guardar(){
    if (!this.router.url.includes('editar'))
    {      
      if (this.addProductoForm.valid)
      {   
        this.productServices.agregarProducto( this.addProductoForm.value )
            .subscribe( {
              next:(res)=>{
                
                this.notifyService.showSuccess('Producto agregada satisfactoriamente','SIFAC')
                this.addProductoForm.reset();               
              },error:()=>{                
                this.notifyService.showError('Error agregando el producto','SIFAC')
              }
            })
        }
    }else
    {     
        this.actualizarProducto();
    }



    this.router.navigate(['/producto/lista']);
  }

 
  actualizarProducto(){
    this.productServices.editarProducto(this.addProductoForm.value, this.id)
    .subscribe( {
      next:(res)=>{    
        this.addProductoForm.reset();       
        this.notifyService.showSuccess('Producto actualizada satisfactoriamente','SIFAC')
      },error:()=>{
        this.notifyService.showError('Error actualizando el producto','SIFAC')
      }
    })
  }

  mostrarSnakbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

  calcularprecios(){
    this.calcularpreciocredito();
    this.calcularpreciocontado();
  }

  desabilitar(ob: MatCheckboxChange){   
    if (ob.checked)
    {
    this.addProductoForm.controls['code'].setValue("PSR");
    }else  this.addProductoForm.controls['code'].setValue("");
  }

  calcularpreciocredito(){   
    const costo :number = Number(this.addProductoForm.get('averagecost')?.value);    
    const margen:number = Number(this.addProductoForm.get('utilitymargin_credit')?.value);   
    const preciocredito :number =  costo * (margen/100);  
    this.addProductoForm.patchValue({creditprice: preciocredito});  
  }

  calcularpreciocontado(){    
    const costo :number = Number(this.addProductoForm.get('averagecost')?.value);    
    const margen:number = Number(this.addProductoForm.get('utilitymargin_cash')?.value);   
    const preciocontado :number =  costo * (margen/100);  
    this.addProductoForm.patchValue({cashprice: preciocontado});  
  }

  campoEsValido(campo:string){
    return this.addProductoForm.controls[campo].errors && this.addProductoForm.controls[campo].touched
   }

   cancelar() {
    this.router.navigate(['/producto/lista']);
  }

}

