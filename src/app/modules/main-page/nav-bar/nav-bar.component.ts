import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../../core/auth.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService) {}
  

  ngOnInit() {
  }
  onLogout() {
    this.auth.logout();
  }
}
