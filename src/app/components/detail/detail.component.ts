import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public currencyData = {};



  constructor(public router: Router, public dataService: DataService) { }

  ngOnInit() {
    this.currencyData = this.dataService.getSelectedData().row;
    console.log(this.currencyData);
  }

  goBack() {
    this.router.navigate(['']);
  }

}
