import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service"
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private AdminService: AdminService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.AdminService.logout();
  }
}
