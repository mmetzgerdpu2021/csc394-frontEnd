import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../../../../shared/app.config';
import {Team} from '../../../../../shared/models/team.model';
import {User} from '../../../../../shared/models/user.model';
import {StdToTeam} from '../../../../../shared/models/std-to-team';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly PATH_TEAM_USER_FREE_API = '/api/user';
    private readonly PATH_TEAM_USER_BY_TEAM_ID = '/api/user/teams';
    private readonly BOUCHON_URL = 'assets/data-bouchon/user.json';
    private basePath: string;


    constructor(private config: AppConfig, private httpClient: HttpClient) {
      this.basePath = this.config.getConfig('apiUrl');
    }

    getAllFreeStudent(isBouchon?: boolean): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(isBouchon ? this.BOUCHON_URL : this.basePath + this.PATH_TEAM_USER_FREE_API + '/allStudentUsers');
    }

    getStudentByTeamId(teamId:number, isBouchon?: boolean): Observable<Array<User>> {
      return this.httpClient.get<Array<User>>(isBouchon ? this.BOUCHON_URL : this.basePath + this.PATH_TEAM_USER_BY_TEAM_ID + '/' + teamId);
    }

    addStudentToTeam(stdToTeam: StdToTeam): Observable<User> {
      return this.httpClient.post<User>(this.basePath + this.PATH_TEAM_USER_FREE_API + '/faculty/addUserToTeam', stdToTeam);
    }

  deleteStudentFrom(stdToTeam: StdToTeam): Observable<User> {
    return this.httpClient.post<User>(this.basePath + this.PATH_TEAM_USER_FREE_API + '/faculty/deleteUserTeam', stdToTeam);
  }
}
