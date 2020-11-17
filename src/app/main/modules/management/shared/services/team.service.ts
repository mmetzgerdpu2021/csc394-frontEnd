import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../../../../shared/app.config';
import {Team} from '../../../../../shared/models/team.model';
import {User} from '../../../../../shared/models/user.model';


@Injectable({
    providedIn: 'root'
})
export class TeamService {

    private readonly PATH_TEAM_BY_TEACHER_API = '/professors';
    private readonly PATH_TEAM_API = '/api/teams';
    private readonly BOUCHON_URL = 'assets/data-bouchon/team.json';
    private readonly BOUCHON_URL_TEAM_BY_ID = 'assets/data-bouchon/teamById.json';
    private basePath: string;


    constructor(private config: AppConfig, private httpClient: HttpClient) {
      this.basePath = this.config.getConfig('apiUrl');
    }

    getAllTeamByTeacher(teacherId: number, isBouchon?: boolean): Observable<Array<Team>> {
        return this.httpClient.get<Array<Team>>(isBouchon ? this.BOUCHON_URL : this.basePath + this.PATH_TEAM_API + this.PATH_TEAM_BY_TEACHER_API + '/' + teacherId);
    }

  getTeamById(teamId: number, isBouchon?: boolean): Observable<Team> {
    return this.httpClient.get<Team>(isBouchon ? this.BOUCHON_URL_TEAM_BY_ID : this.basePath + this.PATH_TEAM_API + '/' + teamId);
  }

  deleteTeamById(teamId: number, isBouchon?: boolean): Observable<any> {
    return this.httpClient.delete<string>(this.basePath + this.PATH_TEAM_API + '/' + teamId);
  }

  saveTeam(team: Team): Observable<Team> {
      return this.httpClient.post<Team>(this.basePath + this.PATH_TEAM_API, team);
  }

  /*addUserToTeam(): Observable<User> {
    return this.httpClient.post<Team>(this.basePath + this.PATH_TEAM_API + '/allStudentUsers', team);
  }*/


}
