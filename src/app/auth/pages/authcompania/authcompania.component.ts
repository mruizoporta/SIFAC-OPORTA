import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyAccountResponse } from '../../interface/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './authcompania.component.html',
  styles:  [`
  .resize {weight: 60px; height: 120px;display:block;margin-left: auto;margin-right: auto;}
`
]
})
export class AuthCompaniaComponent implements OnInit {

  companyaccount : CompanyAccountResponse[]=[];

  miFormulario: UntypedFormGroup = this.fb.group({
    compania: ['',Validators.required]
  })
  
  get usuario(){    
    return this.authService.usuario;
  }

  saveCompany() {
    sessionStorage.setItem('company', this.miFormulario.value.compania);   
  }
  getCompany() {
    return sessionStorage.getItem('company');
  }

  constructor(private fb:UntypedFormBuilder,
    private router:Router, 
    private authService: AuthService   ) { }

    getcompanyaccount(){
      this.authService.getCompanyByAccount(this.usuario.id).subscribe(data => {  
        console.log(data);     
        this.companyaccount = data}
        );    
    }

    ngOnInit(): void 
    {     
      this.getcompanyaccount();
    }

    logout(){
      this.router.navigateByUrl('/auth');
      this.authService.logout();
    }
    entrar(){
     // console.log(this.miFormulario.value);
      this.saveCompany();      
      this.router.navigateByUrl('/dashboard');
      //console.log('entrar');
    }

}
