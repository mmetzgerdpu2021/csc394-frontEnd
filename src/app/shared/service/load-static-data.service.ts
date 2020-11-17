import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {PageStaticDataModel} from '../models/page-static-data.model';



@Injectable()
export class LoadStaticDataService {

    public pageStaticDataObservable: BehaviorSubject<PageStaticDataModel> = new BehaviorSubject(null);

    constructor(private httpClient: HttpClient) { }

    initStaticData(pathStaticData: string): Observable<PageStaticDataModel> {
        return this.httpClient.get<PageStaticDataModel>(pathStaticData);
    }

  setValueProperties(data: PageStaticDataModel) {
    this.pageStaticDataObservable.next(data);
  }

  getValueProperties(): PageStaticDataModel {
    return this.pageStaticDataObservable.getValue();
  }

  reinitStaticDataObservable() {
    this.pageStaticDataObservable = new BehaviorSubject(null);
  }
}
