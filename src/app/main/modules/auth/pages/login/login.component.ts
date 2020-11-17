/*
 * File Created: Tuesday, 9th June 2020 6:29:03 pm
 * Author: El Messoudi Zakaria (you@you.you)
 * -----
 * Last Modified: Tuesday, 9th June 2020 6:29:03 pm
 * Modified By: El Messoudi Zakaria (you@you.you>)
 * -----
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../../../shared/models/user.model';
import {LoginService} from '../../../management/shared/services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup;
  showError = false;
  userLogged: User;

  constructor(private formBuilder: FormBuilder, private route: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: this.formBuilder.control(
        '',
        [Validators.required]
      )
    ,
      password: this.formBuilder.control(
      '',
      [Validators.required]
    )
  });
    this.formLogin.get('login').valueChanges.subscribe(value => {
      if (value) {
        this.showError = false;
      } else {
        this.showError = true;
      }
    });
  }

  login() {
    const user: User = {
      userName: this.formLogin.get('login').value,
      password: this.formLogin.get('password').value
    };
    console.log(user);
    this.loginService.login(user).subscribe(result => {
      let token: string = result['accessToken']
     const decodedJwtJsonData = window.atob(
       token.split('.')[1]
      );
     sessionStorage.setItem('userLoggedId', JSON.parse(decodedJwtJsonData)['id']);
     sessionStorage.setItem('accessToken', JSON.stringify(result));
      sessionStorage.setItem('isLogged', JSON.stringify(true));
     this.route.navigateByUrl('/management/teacher');
    });
  /*  this.userLogged = {
      userId:2,
      firstName:'zak',
      lastName: 'mo'
    };
    sessionStorage.setItem('userLogged', JSON.stringify(this.userLogged));
    sessionStorage.setItem('isLogged', JSON.stringify(true));
    this.route.navigateByUrl('/management/teacher')*/
  }
}

