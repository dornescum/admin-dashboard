import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarService} from "./services/sidebar.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-dashboard';

  constructor(private sidebarService: SidebarService ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // console.log('document clicked', event);
    this.sidebarService.closeSidebar();
  }
}
