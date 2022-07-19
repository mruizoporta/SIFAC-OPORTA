import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  
  constructor(private fb: FormBuilder, 
    private router:Router) { }

  guardar(){
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);
    this.router.navigateByUrl('/compania')
  }
 

}
