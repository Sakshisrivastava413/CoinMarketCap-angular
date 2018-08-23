import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_KEY } from '../../app.constants';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/app.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'https://pro-api.coinmarketcap.com/v1/';

  static selectedData = {};

  static currencyList: Currency[] = null;

  constructor(private http: HttpClient) { }

  setSelectedData(data): any {
    DataService.selectedData = data;
  }

  getSelectedData(): any {
    return DataService.selectedData;
  }

  setCurrencyList(list) {
    DataService.currencyList = list;
  }

  getCachedList() {
    return DataService.currencyList;
  }

  public getCurrencyList(): Observable<any> {
    return this.http.get(
      this.BASE_URL + 'cryptocurrency/listings/latest', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CMC_PRO_API_KEY': API_KEY
        })
      }
    );
  }

}
