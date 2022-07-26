import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  miFormulario: FormGroup = this.fb.group({
    compania: ['',Validators.required]
  })
  
  get usuario(){
    console.log('entro al usuario');
    return this.authService.usuario;
  }

  constructor(private fb:FormBuilder,
    private router:Router, 
    private authService: AuthService   ) { }

    getcompanyaccount(){
      this.authService.getCompanyByAccount(this.usuario.id).subscribe(data => {        
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
      this.router.navigateByUrl('/dashboard');
      console.log('entrar');
    }

}
