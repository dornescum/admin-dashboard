import {Component, HostListener} from '@angular/core';
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
  onDocumentClick(): void {
    this.sidebarService.closeSidebar();
  }
}
