import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../../../../shared/app.config';
import {Team} from '../../../../../shared/models/team.model';
import {User} from '../../../../../shared/models/user.model';
import {Goals} from '../../../../../shared/models/goals.model';


@Injectable({
    providedIn: 'root'
})
export class GoalService {


    private readonly PATH_TEAM_GOALS_API = '/api/goals';
    private readonly BOUCHON_URL = 'assets/data-bouchon/goals.json';
    private basePath: string;


    constructor(private config: AppConfig, private httpClient: HttpClient) {
      this.basePath = this.config.getConfig('apiUrl');
    }

    getGoalsByTeamId(teamId:number, isBouchon?: boolean): Observable<Array<Goals>> {
      return this.httpClient.get<Array<Goals>>(isBouchon ? this.BOUCHON_URL : this.basePath + this.PATH_TEAM_GOALS_API + '/teamGoal/' + teamId);
    }

    saveGoal(goal: Goals): Observable<Goals> {
      return this.httpClient.post<Goals>( this.basePath + this.PATH_TEAM_GOALS_API + '/faculty/addGoalsToTeam', goal);
    }

    deleteGoal(goal: Goals): Observable<Goals> {
      return this.httpClient.delete(this.basePath + this.PATH_TEAM_GOALS_API+ '/' + goal.id)
    }


}
