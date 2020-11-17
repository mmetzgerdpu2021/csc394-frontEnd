/**
 * Created by zmorhir on 18/03/2020.
 */
import {
  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {LoadStaticDataService} from '../service/load-static-data.service';
import {NevadaConstants} from '../utils/nevada-constants';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class LoadStaticDataGuards implements CanActivate {


  constructor(private loadStaticData: LoadStaticDataService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.loadStaticData.initStaticData(route.data[NevadaConstants.PATH_STATIC_DATA_VARIABLE_NAME]).pipe(map(response => {
      this.loadStaticData.setValueProperties(response);
      return true;
    }));


  }



}
