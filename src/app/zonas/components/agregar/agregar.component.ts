import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ZonasService } from '../../services/zonas.service';

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

  addzoneForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar zona';

  get usuario(){   
    return this.authService.usuario;
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }

  constructor(
    private fb: FormBuilder,
    private zoneServices: ZonasService,
    private authService: AuthService,
    private notifyService : NotificationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata:any
  ) { }

  ngOnInit(): void {
    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));

  this.addzoneForm= this.fb.group({
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
    this.titulo='Editar zona';    
    this.addzoneForm.controls['name'].setValue(this.editdata.name);
    this.addzoneForm.controls['description'].setValue(this.editdata.description);
  }  
}


guardar() {
  if (!this.editdata)
  {      
    if (this.addzoneForm.valid)
    {   
      console.log(this.addzoneForm.value);
      this.zoneServices.agregarZone( this.addzoneForm.value )
          .subscribe( {
            next:(res)=>{
              
              this.notifyService.showSuccess('Zona agregada satisfactoriamente','SIFAC')
              this.addzoneForm.reset();
              this.dialogRef.close('save');
            },error:()=>{                
              this.notifyService.showError('Error agregando la zona','SIFAC')
            }
          })
      }
  }else
  {     
      this.actualizarZona();
  }
 
}

actualizarZona()
{
    this.zoneServices.editarZone(this.addzoneForm.value, this.editdata.zoneid)
    .subscribe( {
      next:(res)=>{
        this.addzoneForm.reset();
        this.dialogRef.close('update');
        this.notifyService.showSuccess('Marca actualizada satisfactoriamente','SIFAC')
      },error:()=>{
        this.notifyService.showError('Error actualizando la marca','SIFAC')
      }
    })
}

campoEsValido(campo:string){
  return this.addzoneForm.controls[campo].errors && this.addzoneForm.controls[campo].touched
 }

}
