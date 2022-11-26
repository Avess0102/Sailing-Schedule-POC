import { Component } from '@angular/core';
import { ApiserviceService } from './apiservice.service';
import *  as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})

export class SchedulesComponent {
  hero = 'Angular';
  fileName = 'Schedules.xlsx';
  countryData: any;
  country: any;
  country1: any;
  country2: any;
  countryGroup: any;
  schedulesData: any;
  firstName: any;
  constructor(private apiservice: ApiserviceService) {
    this.countryData = [];
    this.schedulesData = [];
    this.countryGroup = new FormGroup({});
  }

  /**
   * Function to Get the country data from codes
   */
  getCountry(data: string, data2: string) {
    this.country1 = data.split(" ");
    this.country2 = data2.split(" ");
    this.country = this.country1[1] + this.country2[1];
    // console.log(data);

    this.apiservice.getScheduleData(this.country1[1], this.country2[1]).subscribe((res => {
      this.schedulesData = res;
    }),
      error => {
        this.schedulesData = [];
        this.country = alert("No Sailing Schedules are there.")
      }
    )
  }


  /**
   * Function to export the data in excel format
   */
  exportexcel(): void {
    let e = document.getElementById('schedulesTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(e);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schedules');
    XLSX.writeFile(wb, this.fileName);
  }


  /**
   * To call API as soon as class is instantiated
   */
  ngOnInit(): void {
    this.apiservice.getCountryData().subscribe(res => {
      this.countryData = res;
      // console.log(res);      
    }),

      this.apiservice.getScheduleData(this.country1[1], this.country2[1]).subscribe(res => {
        this.schedulesData = res;
        // console.log(res);      
      })
  }


  /**
   * Function to filter the scheduled data using voyage number
   */
  search() {
    if (this.firstName == "") {
      this.ngOnInit();
    } else {
      this.schedulesData = this.schedulesData.filter((res: any) => {
        return res.voyageNumber.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })
    }
  }

  key = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
    console.log("click");

  }
}
