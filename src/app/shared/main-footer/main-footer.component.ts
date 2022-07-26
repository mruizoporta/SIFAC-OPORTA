import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styles: [
    `
    .main-footer {
    background-color:  #fff;
    border-top: 1px solid #dee2e6;
    color: #869099;
    padding: 1rem;
    bottom: 0;
}
    `
  ]
})
export class MainFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
