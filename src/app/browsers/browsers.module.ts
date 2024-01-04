import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowsersRoutingModule } from './browsers-routing.module';
import { BrowsersComponent } from './browsers.component';


@NgModule({
  declarations: [
    BrowsersComponent
  ],
  imports: [
    CommonModule,
    BrowsersRoutingModule
  ]
})
export class BrowsersModule { }
