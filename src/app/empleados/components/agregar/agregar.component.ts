import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CatalogValueResponse } from 'src/app/services/interfaces.catalog';
import { NotificationService } from 'src/app/services/notification.service';
import { cityResponse } from '../../interfaces/empleados.interfaces';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  addempleadoForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar empleado';

  TipoIdentificacion : CatalogValueResponse[]=[];
  Genero : CatalogValueResponse[]=[];
  EstadoCivil : CatalogValueResponse[]=[];
  Cargo : CatalogValueResponse[]=[];
  Ciudades: cityResponse[]=[];
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
    private empleadoServices: EmpleadosService,
    private activatedRoute: ActivatedRoute, 
    private catalogServices: CatalogosService,
    private authService: AuthService,
    private notifyService : NotificationService,
    //public dialog: MatDialog,
    private snackBar: MatSnackBar
    //private dialogRef: MatDialogRef<AgregarComponent>,
   // @Inject(MAT_DIALOG_DATA) public editdata:any

  ) { }

  ngOnInit(): void {
    this.gettipoidentificacion();
    this.getCargos();
    this.getestadocivil();
    this.getgenero();
    this.getcity();

    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));

    this.addempleadoForm= this.fb.group({
      firstname:['', Validators.required],
      last_name:[],
      identification:[],
      tipoidentificacion:[],
      birthdate:[],
      islegal:['0',],
      businessname:['',],
      companyacronym:['',],
      gender_i_d:[],
      address:[],
      bsc_city_cityid:['38'],
      maritalstatusid:[],
      identification_type:[],
      telefono:[],
      email:['', [ Validators.email]],
      isactive: true,
      positionid:[],
      datestarted:[],
      dateended:[],
      createdon: this.dateTime,
      createdby: this.login,
      modifiedon: this.dateTime,
      modifiedby:this.login,
      bsc_company_companyid: this.getCompany(),
    });

    if (!this.router.url.includes('editar'))
    {  
      this.titulo='Agregar empleado';     
      return;
    }else {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      
      this.titulo='Editar empleado';  

     //Buscamos los datos del empleado
     this.empleadoServices.getEmpleadoOne(this.id).subscribe(
      {
       next:(data)=>{ 
        this.addempleadoForm.patchValue(data)  
       },
       error:(err)=>{
         console.log(err);        
       }     
   })   } 

  }

  gettipoidentificacion(){
    this.catalogServices.getTipoIdentificacion().subscribe(data => {        
      this.TipoIdentificacion = data}
      );    
  }

  getgenero(){
    this.catalogServices.getGenero().subscribe(data => {        
      this.Genero = data}
      );    
  }
  getcity(){
    this.empleadoServices.getCiudades().subscribe(data => {        
      this.Ciudades = data}
      );    
  }
  
  getestadocivil(){
    this.catalogServices.getEstadoCivil().subscribe(data => {        
      this.EstadoCivil = data}
      );    
  }

  getCargos(){
    this.catalogServices.getCargos().subscribe(data => {        
      this.Cargo = data}
      );    
  }

  guardar(){
    if (!this.router.url.includes('editar'))
    {      
      if (this.addempleadoForm.valid)
      {   
        this.empleadoServices.agregarEmpleado( this.addempleadoForm.value )
            .subscribe( {
              next:(res)=>{
                
                this.notifyService.showSuccess('Empleado agregada satisfactoriamente','SIFAC')
                this.addempleadoForm.reset();
                this.router.navigate(['/empleado/lista']);
              },error:()=>{                
                this.notifyService.showError('Error agregando al empleado','SIFAC')
              }
            })
        }
    }else
    {  if (this.addempleadoForm.valid)
      {  
       
        this.actualizarEmpleado();
        this.router.navigate(['/empleado/lista']);
      }
    }
    
  }
  actualizarEmpleado(){
    
    this.empleadoServices.editarEmpleado(this.addempleadoForm.value, this.id)
    .subscribe( {
      next:(res)=>{
        this.addempleadoForm.reset();
       // this.dialogRef.close('update');
        this.notifyService.showSuccess('Empleado actualizada satisfactoriamente','SIFAC')
      },error:()=>{
        this.notifyService.showError('Error actualizando el empleado','SIFAC')
      }
    })
  }
  mostrarSnakbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

  campoEsValido(campo:string){
    return this.addempleadoForm.controls[campo].errors && this.addempleadoForm.controls[campo].touched
   }

   cancelar() {
    this.router.navigate(['/empleado/lista']);
  }

}
