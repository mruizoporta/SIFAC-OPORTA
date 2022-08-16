import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit  {
  
   menuActivo: string = 'Dashboard';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  getClaseCSS( menu: string ): string {
    return (menu === this.menuActivo) 
              ? 'nav-link active'
              : 'nav-link ';
  }

  activarMenu( menu: string ) {
    //this.router.navigateByUrl('/empleado/lista');
    //if ( menu === this.menuActivo ) { return; }
    this.menuActivo = menu;
  }


}

