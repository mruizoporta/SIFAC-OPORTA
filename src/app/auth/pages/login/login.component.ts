import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {
  
  miFormulario: FormGroup = this.fb.group({
    email: ['mruiz2@gmail.com', [Validators.required, Validators.email]],
    password: ['12345678910', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router:Router, private authservice: AuthService) { }

  
  login(){
  
    const {email, password} = this.miFormulario.value;
   this.authservice.login(email, password)
    .subscribe(ok=> {
      console.log(ok);
      if(ok===true){
        
        this.router.navigateByUrl('/compania');
      }
      else{swal.fire('Error', ok, 'error');

      }
     
    });
   // console.log(this.miFormulario.value);
   // this.router.navigateByUrl('/compania')
  }
}
