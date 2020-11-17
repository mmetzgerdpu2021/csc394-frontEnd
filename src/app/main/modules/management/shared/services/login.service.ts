import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../../../../shared/app.config';
import {Team} from '../../../../../shared/models/team.model';
import {User} from '../../../../../shared/models/user.model';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private readonly PATH_TEAM_USER_FREE_API = '/login';
    private readonly BOUCHON_URL = 'assets/data-bouchon/user.json';
    private basePath: string;


    constructor(private config: AppConfig, private httpClient: HttpClient) {
      this.basePath = this.config.getConfig('apiUrl');
    }

    login(user: User): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
        return this.httpClient.post<string>(this.basePath + this.PATH_TEAM_USER_FREE_API, user, httpOptions);
    }
}
