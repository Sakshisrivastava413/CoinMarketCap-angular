import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Currency } from '../../app.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data : Currency[];

  constructor(public dataService: DataService) { }

  ngOnInit() {

    this.dataService.getCurrencyList().subscribe((res) => {
      this.data = res.data;
      console.log(this.data);
    })
  }

}
