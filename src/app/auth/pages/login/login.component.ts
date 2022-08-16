import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        .resize {weight: 40px; height: 100px;display:block;margin-left: auto;margin-right: auto;}
  `
  ]
})
export class LoginComponent  {
  
  miFormulario: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
//12345678910
  constructor(private fb: UntypedFormBuilder, private router:Router, private authservice: AuthService) { }

    login(){  
    const {email, password} = this.miFormulario.value;
   this.authservice.login(email, password)
    .subscribe(ok=> {      
      if(ok===true){
        
        this.router.navigateByUrl('/auth/compania');
      }
      else{swal.fire('Error', ok, 'error');
      }     
    });   
  }
}
