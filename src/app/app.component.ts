import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeamService} from './main/modules/management/shared/services/team.service';
import {Team} from './shared/models/team.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass','./app.component.css']
})
export class AppComponent implements OnInit{

  isLogged: boolean = false;
  constructor(private route: Router) {

  }

  ngOnInit(): void {
    this.route.events.subscribe(event => {
      this.isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
    });
    this.isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
     if (JSON.parse(sessionStorage.getItem('isLogged'))) {

       this.route.navigateByUrl('/management/teacher')
     } else {
       this.route.navigateByUrl('auth/login');
     }
  }

  logOutRedirection(){
    this.route.navigateByUrl('/auth/logout');
    sessionStorage.clear()
  // sessionStorage.setItem('isLogged', JSON.stringify(false));
  }


}
