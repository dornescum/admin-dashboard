import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-navbar', templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showSidebar = false;
  private subscription!: Subscription;


  constructor(private sidebarStateService: SidebarService) {

  }

  ngOnInit() {

    this.sidebarStateService.showSidebar.subscribe((state: any) => {
      console.log('showSidebar subscribe : ', state)
      this.showSidebar = state;
    });
  }

  handleAction(event: MouseEvent) {
    event.stopPropagation();
    // this.showSidebar = !this.showSidebar;
    // console.log('showSidebar handle action: ', this.showSidebar)
    this.sidebarStateService.toggleSidebar();
    // console.log('showSidebar handle action service : ', this.showSidebar)

  }

  handleCloseSidebar() {
    // this.showSidebar = false;
    this.sidebarStateService.closeSidebar();

    console.log('showSidebar handle close sidebar: ', this.showSidebar)
  }


}
