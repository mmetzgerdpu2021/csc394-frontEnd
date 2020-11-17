import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AppConfig} from '../../../../../shared/app.config';
import {Team} from '../../../../../shared/models/team.model';
import {User} from '../../../../../shared/models/user.model';
import {Goals} from '../../../../../shared/models/goals.model';
import {Rate} from '../../../../../shared/models/rate.model';


@Injectable({
    providedIn: 'root'
})
export class RatingService {


  private readonly PATH_RATE_BY_TEAM_SERVICE = '/api/reviews';
  private readonly BOUCHON_RATE_BY_TEAM_ID = 'assets/data-bouchon/ratesByTeamId.json';
    private basePath: string;


    constructor(private config: AppConfig, private httpClient: HttpClient) {
      this.basePath = this.config.getConfig('apiUrl');
    }


    getRatesByTeamId(teamId:number, isBouchon?: boolean): Observable<Array<Rate>> {
      return this.httpClient.get<Array<Rate>>(isBouchon ? this.BOUCHON_RATE_BY_TEAM_ID : this.basePath + this.PATH_RATE_BY_TEAM_SERVICE + '/reviewsByTeamId/' + teamId);
    }

  saveRate(rate:Rate, isBouchon?: boolean): Observable<Rate> {
    return this.httpClient.post<Rate>(isBouchon ? this.BOUCHON_RATE_BY_TEAM_ID : this.basePath + this.PATH_RATE_BY_TEAM_SERVICE, rate);
  }
}
