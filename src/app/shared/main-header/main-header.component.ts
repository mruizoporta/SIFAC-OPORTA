import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styles: [
  ]
})
export class MainHeaderComponent implements OnInit {

  constructor( private router:Router, 
    private authService: AuthService ) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
