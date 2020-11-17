import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.css'],
})
export class LogoutPageComponent implements OnInit {
  navigateToLogin = false;
  constructor(private router: Router) {}

  ngOnInit() {

  }

  goLogin(){
    this.router.navigateByUrl('/auth/login')
  }
}
