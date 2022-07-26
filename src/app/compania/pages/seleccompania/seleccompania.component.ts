import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyAccountResponse } from '../../interfaces/company.interface';
import { CompanyService } from '../../services/company.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seleccompania',
  templateUrl: './seleccompania.component.html',
  styles: [`
        .resize {weight: 90px; height: 150px;display:block;margin-left: auto;margin-right: auto;}
  `
  ]
})
export class SeleccompaniaComponent   implements OnInit {

  Formcompania: FormGroup=this.fb.group({
    compania: ['',Validators.required]
  });
  
  companyaccount : CompanyAccountResponse[]=[];

  get usuario(){
    return this.authService.usuario;
  }

getcompanyaccount(){
  this.companyService.getCompanyByAccount(this.usuario.id).subscribe(data => {
    //console.log('Dentro del metodo' + companias)
    this.companyaccount = data}
    );    
}
  constructor(
    private fb:FormBuilder,
    private router:Router, 
    private authService: AuthService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getcompanyaccount();
  }

  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
  
  entrar(){
    console.log('entrar');
  }

}
