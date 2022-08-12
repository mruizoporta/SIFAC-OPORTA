import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { cityResponse, empleadoResponse } from 'src/app/empleados/interfaces/empleados.interfaces';
import { EmpleadosService } from 'src/app/empleados/services/empleados.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { CatalogValueResponse } from 'src/app/services/interfaces.catalog';
import { NotificationService } from 'src/app/services/notification.service';
import { ZonasResponse } from '../../interfaces/ruta.interface';
import { RutasService } from '../../services/rutas.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  addRutasForm!:FormGroup;  
  dateTime = new Date() ;
  login!: string;
  titulo:string='Agregar ruta';

  supervisores : empleadoResponse[]=[];
  collectores : empleadoResponse[]=[];
  secretarias : empleadoResponse[]=[];
  ciudades: cityResponse[]=[];
  zonas: ZonasResponse[]=[];
  dias : CatalogValueResponse[]=[];
  id: number=0;

  textcolector: string="";
  textDia:string="";
  textCiudad: string="";
  textnombre: string="";
  textZona : string="";

  get usuario(){   
    return this.authService.usuario;
  }

  getCompany() {
    return sessionStorage.getItem('company');
  }
  constructor( private fb: FormBuilder,
    private rutasServices: RutasService,  
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private catalogServices: CatalogosService,
    private empleadoservices: EmpleadosService,  
    private authService: AuthService,
    private notifyService : NotificationService,
   // public dialog: MatDialog,
    private snackBar: MatSnackBar
    //private dialogRef: MatDialogRef<AgregarComponent>,
   // @Inject(MAT_DIALOG_DATA) public editdata:any
   ) { }

  ngOnInit(): void {

    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));
    this.getSupervisores();
    this.getCollectores();
    this.getSecreatarias();
    this.getZonas();
    this.getCiudades();
    this.getDias();
    this.login = this.authService.usuario.email.substring(0,this.authService.usuario.email.indexOf('@'));

    this.addRutasForm= this.fb.group({
      name:[''],
      code:[''],
      day:['',Validators.required],
      bsc_city_cityid:['',Validators.required],
      collectorid:['',Validators.required],
      supervisorid:['',],
      secretariaid:['',Validators.required],
      zoneid:['',],      
     
      isactive: true,
     
      createdon: this.dateTime,
      createdby: this.login,
      modifiedon: this.dateTime,
      modifiedby:this.login,
      bsc_company_companyid: this.getCompany(),
    });

    if (!this.router.url.includes('editar'))
    {  
      this.titulo='Agregar ruta';     
      return;
    }else this.titulo='Editar ruta';  
  
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));

     //Buscamos los datos de la ruta
   
     this.rutasServices.getOnerutas(this.id).subscribe(
      {
       next:(data)=>{ 
     
        this.addRutasForm.patchValue(data)  
       // this.textcolector = 
       },
       error:(err)=>{
         console.log(err);        
       }     
   })    


    // if (this.editdata){ 
      
    //   this.titulo='Editar ruta';    
    //   this.addRutasForm.controls['code'].setValue(this.editdata.code);
    //   this.addRutasForm.controls['name'].setValue(this.editdata.name);
    //   this.addRutasForm.controls['day'].setValue(this.editdata.day);
    //   this.addRutasForm.controls['bsc_city_cityid'].setValue(this.editdata.bsc_city_cityid);
    //   this.addRutasForm.controls['collectorid'].setValue(this.editdata.collectorid);
    //   this.addRutasForm.controls['supervisorid'].setValue(this.editdata.supervisorid);
    //   this.addRutasForm.controls['secretariaid'].setValue(this.editdata.secretariaid);
    //   this.addRutasForm.controls['zoneid'].setValue(this.editdata.zoneid);
      
    // }   
  }

  getSupervisores(){
    this.empleadoservices.getempleados(Number(this.getCompany())).subscribe(data => {        
      this.supervisores = data}
      );    
  }

  getCollectores(){
    this.empleadoservices.getempleados(Number(this.getCompany())).subscribe(data => {        
      this.collectores = data}
      );    
  }
  getSecreatarias(){
    this.empleadoservices.getempleados(Number(this.getCompany())).subscribe(data => {        
      this.secretarias = data}
      );    
  }

  getZonas(){
    this.rutasServices.getZonas(Number(this.getCompany())).subscribe(data => {        
      this.zonas = data}
      );    
  }

  
  getCiudades(){
    this.rutasServices.getCiudades().subscribe(data => {        
      this.ciudades = data}
      );    
  }

  getDias(){
    this.catalogServices.getDias().subscribe(data => {        
      this.dias = data}
      );    
  }

  guardar(){
    if (!this.router.url.includes('editar'))
    {      
      if (this.addRutasForm.valid)
      {          
        this.rutasServices.agregarRuta( this.addRutasForm.value )
            .subscribe( {
              next:(res)=>{
                
                this.notifyService.showSuccess('Ruta agregada satisfactoriamente','SIFAC')
                this.addRutasForm.reset();
                //this.dialogRef.close('save');
              },error:()=>{                
                this.notifyService.showError('Error agregando la ruta','SIFAC')
              }
            })
        }
    }else
    {     
        this.actualizarRuta();
    }
    this.router.navigate(['/ruta/lista']);
  }
  actualizarRuta(){
   
    this.rutasServices.editarRuta(this.addRutasForm.value, this.id)
    .subscribe( {
      next:(res)=>{
        this.addRutasForm.reset();      
        this.notifyService.showSuccess('Ruta actualizada satisfactoriamente','SIFAC')
      },error:()=>{
        this.notifyService.showError('Error actualizando la ruta','SIFAC')
      }
    })
  }

  selectedCiudad(event: MatSelectChange) {
    if (!this.router.url.includes('editar')){
    this.textCiudad=(event.source.selected as MatOption).viewValue;
    this.textnombre= this.textcolector + '-' + this.textDia+ '-' + this.textCiudad + '-' + this.textZona;
    this.addRutasForm.controls['name'].setValue(this.textnombre);
  }

  }

  selectedZona(event: MatSelectChange) {
    if (!this.router.url.includes('editar')){
    this.textZona=(event.source.selected as MatOption).viewValue;
    this.textnombre= this.textcolector + '-' + this.textDia+ '-' + this.textCiudad + '-' + this.textZona;
    this.addRutasForm.controls['name'].setValue(this.textnombre);
    }
  }

  selectedDia(event: MatSelectChange) {
    if (!this.router.url.includes('editar')){
    this.textDia=(event.source.selected as MatOption).viewValue;
    this.textnombre= this.textcolector + '-' + this.textDia+ '-' + this.textCiudad + '-' + this.textZona;
    this.addRutasForm.controls['name'].setValue(this.textnombre);
    }
  }

  selectedColector(event: MatSelectChange) {
    if (!this.router.url.includes('editar')){
    this.textcolector=(event.source.selected as MatOption).viewValue;
    this.textnombre= this.textcolector + '-' + this.textDia+ '-' + this.textCiudad + '-' + this.textZona;
    this.addRutasForm.controls['name'].setValue(this.textnombre);
    }
  }

  mostrarSnakbar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }

  campoEsValido(campo:string){
    return this.addRutasForm.controls[campo].errors && this.addRutasForm.controls[campo].touched
   }

   cancelar() {
    this.router.navigate(['/ruta/lista']);
  }

}


