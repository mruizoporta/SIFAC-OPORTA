import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/category.service';
import {MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `mat-form-field {
      width:100%
    }`
  ]
})

export class AgregarComponent implements OnInit {

  addcategoryForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar categoria';

  get usuario(){   
    return this.authService.usuario;
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }

  constructor(
    private fb: FormBuilder,
    private categoryServices: CategoryService,
    private authService: AuthService,
    private notifyService : NotificationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata:any) { }

  ngOnInit(): void {
    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));

    this.addcategoryForm= this.fb.group({
      name:['', Validators.required],
      description:[],
      isactive: 1,
      createdon: this.dateTime,
      createdby: this.login,
      modifiedon: this.dateTime,
      modifiedby:this.login,
      bsc_company_companyid: this.getCompany(),
    });
   
    if (this.editdata){ 
      this.titulo='Editar categoria';    
      this.addcategoryForm.controls['name'].setValue(this.editdata.name);
      this.addcategoryForm.controls['description'].setValue(this.editdata.description);
    }
  }

  guardar() {
    if (!this.editdata)
    {      
      if (this.addcategoryForm.valid)
      {   
        console.log(this.usuario );
        this.categoryServices.agregarCategory( this.addcategoryForm.value )
            .subscribe( {
              next:(res)=>{
                
                this.notifyService.showSuccess('Categoria agregada satisfactoriamente','SIFAC')
                this.addcategoryForm.reset();
                this.dialogRef.close('save');
              },error:()=>{                
                this.notifyService.showError('Error agregando la categoria','SIFAC')
              }
            })
        }
    }else
    {     
        this.actualizarCategoria();
    }
   
  }

  actualizarCategoria()
  {
      this.categoryServices.editarCategory(this.addcategoryForm.value, this.editdata.categoryid)
      .subscribe( {
        next:(res)=>{
          this.addcategoryForm.reset();
          this.dialogRef.close('update');
          this.notifyService.showSuccess('Categoria actualizada satisfactoriamente','SIFAC')
        },error:()=>{
          this.notifyService.showError('Error actualizando la categoria','SIFAC')
        }
      })
  }
  

  mostrarSnakbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

  campoEsValido(campo:string){
    return this.addcategoryForm.controls[campo].errors && this.addcategoryForm.controls[campo].touched
   }

}
