import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowsersComponent } from './browsers.component';

const routes: Routes = [{ path: '', component: BrowsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowsersRoutingModule { }
