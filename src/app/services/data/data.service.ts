import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_KEY } from '../../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'https://pro-api.coinmarketcap.com/v1/';

  static selectedData = {};

  constructor(private http: HttpClient) { }

  setSelectedData(data): any {
    DataService.selectedData = data;
  }

  getSelectedData(): any {
    return DataService.selectedData;
  }

  public getCurrencyList(): Observable<any> {
    return this.http.get(
      this.BASE_URL + 'cryptocurrency/listings/latest',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CMC_PRO_API_KEY': API_KEY
        })
      })
  }

}
