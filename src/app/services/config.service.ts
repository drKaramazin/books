import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  private config: Object;

  constructor(
    private http: HttpClient,
  ) {}

  public load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('/configs/config.json').subscribe(
        resp => {
          this.config = resp;
          resolve();
        },
        error => reject(error)
      );
    });
  }

  public get(fieldName: string) {
    return this.config[fieldName];
  }

}
