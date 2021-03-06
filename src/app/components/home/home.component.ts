import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Currency } from '../../app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Rank', name: 'cmc_rank', filtering: { filterString: '', placeholder: 'Search by CmcRank'} },
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Search by Name' } },
    { title: 'Symbol', name: 'symbol', filtering: { filterString: '', placeholder: 'Search by Symbol' } },
    { title: 'Price ($)', name: 'price', filtering: { filterString: '', placeholder: 'Search by Price' } },
    { title: 'Circulating Supply', name: 'circulating_supply', filtering: { filterString: '', placeholder: 'Search by Circulating Supply' } },
  ];
  public page: number = 1;
  public itemsPerPage: number = 100;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };

  public data: Currency[];

  constructor(
    public dataService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    let data = this.dataService.getCachedList();
    if(data) {
      this.data = data;
      this.length = this.data.length;
      this.onChangeTable(this.config);
      return;
    }
    this.dataService.getCurrencyList().subscribe((res) => {
      const { data } = res;
      data.forEach((item) => {
        item.price = item.quote.USD.price;
      })
      this.data = data;
      this.dataService.setCurrencyList(data);
      console.log(data);
      this.length = this.data.length;
      this.onChangeTable(this.config);
    })
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return String(item[column.name]).toLowerCase().match(String(column.filtering.filterString).toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
    this.dataService.setSelectedData(data);
    this.router.navigate(['details']);
  }

}
