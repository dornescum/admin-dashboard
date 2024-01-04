import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _showSidebar = new BehaviorSubject<boolean>(false);
  constructor() { }

  get showSidebar() {
    return this._showSidebar.asObservable();
  }

  toggleSidebar() {
    this._showSidebar.next(!this._showSidebar.value);
    // console.log('showSidebar toggle service  : ', this._showSidebar.value)
  }

  closeSidebar() {
    this._showSidebar.next(false);
  }
}
