import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InfoUsiario } from 'src/app/services/interfaces.catalog';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styles: [
  ]
})
export class MainHeaderComponent implements OnInit {

  miFormulario!:FormGroup;
  infoaccount : InfoUsiario[]=[];

  get usuario(){
    return this.authService.usuario;
  }

   
  constructor( 
    private fb:FormBuilder,
    private router:Router, 
    private authService: AuthService,
    private sharedService: SharedService ) { }

  ngOnInit(): void {
   this.miFormulario=this.fb.group({
      nameemployee: [''],
      rol:['']
    });

    //Buscamos el nombre del usuario
   this.sharedService.getInfoUsuario(this.usuario.id).subscribe(
    {
     next:(data)=>{      
      this.miFormulario.patchValue(data)  
      this.saveRol()
     },
     error:(err)=>{
       console.log(err);        
     }     
 })   } 
  
  
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  saveRol() {
    sessionStorage.setItem('rol', this.miFormulario.value.rol);   
  }

}
