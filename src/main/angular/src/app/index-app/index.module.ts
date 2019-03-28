import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IndexComponent } from './index.component';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [IndexComponent]
})
export class IndexModule { }
