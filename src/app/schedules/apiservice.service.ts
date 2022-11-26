import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private countryURL = 'https://apitest.ecuworldwide.com/codes/countries';
  private scheduleURL = 'https://apitest.ecuworldwide.com/schedules?from=AU&to=AT'
  constructor(private http: HttpClient) { }

  getCountryData() {
    return this.http.get(this.countryURL);
  };

  // getScheduleData() {
  //   return this.http.get(this.scheduleURL);
  // }

  getScheduleData(data1: string, data2:string) {
    return this.http.get(`https://apitest.ecuworldwide.com/schedules?from=${data1}&to=${data2}`);
  }
}
