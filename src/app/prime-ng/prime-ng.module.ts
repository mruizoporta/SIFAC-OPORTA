import { NgModule } from '@angular/core';

//PrimeNg

import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';

@NgModule({
  exports: [   
    TableModule,
    FileUploadModule,
    ToolbarModule,
    SplitButtonModule,
    ToastModule
  ]
})
export class PrimeNgModule { }