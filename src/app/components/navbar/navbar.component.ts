import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSidebar = false;


  constructor(private sidebarStateService: SidebarService) {}

  ngOnInit() {
    this.sidebarStateService.showSidebar.subscribe((state: boolean) => {
      this.showSidebar = state;
    });
  }

  handleAction(event: MouseEvent) {
    event.stopPropagation();
    this.sidebarStateService.toggleSidebar();
  }

}
