import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';
import { ConditionsService } from './conditions.service';

@Injectable()
export class BackendService {

  private url: string;
  private apiPath: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private conditions: ConditionsService,
  ) {}

  init() {
    this.url = this.config.get('api-endpoint');
    this.apiPath = this.config.get('api-path');
  }

  getMethodUrl(method: string): string {
    return `${this.url}/${this.apiPath}/${method}`;
  }

  get(method: string): Promise<any> {
    this.conditions.defaultStartLoadingBehavior();

    return this.http.get(this.getMethodUrl(method)).toPromise()
    .then((resp) => {
      this.conditions.defaultEndLoadingBahavior();
      return resp;
    }).catch((err) => {
      this.conditions.defaultEndLoadingBahavior();
      this.conditions.error.next(err.statusText);
      return Promise.reject(err.statusText);
    });
  }

}
