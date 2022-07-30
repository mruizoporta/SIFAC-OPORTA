import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { BrandService } from '../../services/marcas.service';

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
  
  addbrandForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar marca';

  get usuario(){   
    return this.authService.usuario;
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }
  constructor( 
    private fb: FormBuilder,
    private brandServices: BrandService,
    private authService: AuthService,
    private notifyService : NotificationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata:any
    
    ) { }

  ngOnInit(): void {
    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));

    this.addbrandForm= this.fb.group({
      name:['', Validators.required],
      description:[],
      isactive: 1,
      createdon: this.dateTime,
      createdby: this.login,
      modifiedon:this.dateTime,
      modifiedby:'',
      bsc_company_companyid: this.getCompany(),
    });
   
    if (this.editdata){ 
      this.titulo='Editar marca';    
      this.addbrandForm.controls['name'].setValue(this.editdata.name);
      this.addbrandForm.controls['description'].setValue(this.editdata.description);
    }  
  }

  guardar() {
    if (!this.editdata)
    {      
      if (this.addbrandForm.valid)
      {   
        this.brandServices.agregarBrand( this.addbrandForm.value )
            .subscribe( {
              next:(res)=>{
                
                this.notifyService.showSuccess('Marca agregada satisfactoriamente','SIFAC')
                this.addbrandForm.reset();
                this.dialogRef.close('save');
              },error:()=>{                
                this.notifyService.showError('Error agregando la marca','SIFAC')
              }
            })
        }
    }else
    {     
        this.actualizarMarca();
    }
   
  }

  actualizarMarca()
  {
      this.brandServices.editarBrand(this.addbrandForm.value, this.editdata.brandid)
      .subscribe( {
        next:(res)=>{
          this.addbrandForm.reset();
          this.dialogRef.close('update');
          this.notifyService.showSuccess('Marca actualizada satisfactoriamente','SIFAC')
        },error:()=>{
          this.notifyService.showError('Error actualizando la marca','SIFAC')
        }
      })
  }
  
  campoEsValido(campo:string){
    return this.addbrandForm.controls[campo].errors && this.addbrandForm.controls[campo].touched
   }

}
