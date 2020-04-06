import { PayService } from 'src/app/services/CRUD/FINANCIERO/pay.service';
import { Pay } from 'src/app/models/FINANCIERO/Pay';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pay-list-data',
  templateUrl: './pay-list-data.component.html',
  styleUrls: ['./pay-list-data.component.scss']
})
export class PayListDataComponent implements OnInit {
  @Input('ruc_number') ruc_number: String = '';
  
  pays: Pay[] = [];

  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  currentPagePays = 1;
  lastPagePays = 1;
  recordsByPagePays = 5;
  rowsPays = [];
  columnsPays = [];
  dataPays = [];
  
  constructor(private payDataService: PayService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.getPays();
  }

  getPays() {
    this.payDataService.get_by_ruc_number(this.ruc_number).then( r => {
       this.pays = r as Pay[];
       this.buildDataTablePays();
    }).catch( e => { console.log(e); } );
  }

  buildDataTablePays() {
    this.columnsPays = [
     {title: 'Código', name: 'code'},
     {title: 'Estado', name: 'state'},
     {title: 'Valor Pagado', name: 'amount_payed'},
     {title: 'Valor a Pagar - Impuesto 1X1000', name: 'amount_to_pay_base'},
     {title: 'Valor a Pagar - Multas', name: 'amount_to_pay_fines'},
     {title: 'Valor a Pagar - Intereses', name: 'amount_to_pay_taxes'},
     {title: 'Valor a Pagar - Total', name: 'amount_to_pay'},
     {title: 'Fecha de Pago', name: 'pay_date'}
    ];
    const data = [];
    this.pays.forEach(item => {
        let state = '';
        let amount_payed = '';
        let amount_to_pay = '';
        let amount_to_pay_base = '';
        let amount_to_pay_fines = '';
        let amount_to_pay_taxes = '';
        if (item.payed) {
           state = '<span class="badge badge-success">Pagado</span>';
        } else {
           state = '<span class="badge badge-danger">Pago Pendiente</span>';
        }
        if (item.amount_payed != -1) {
           amount_payed = item.amount_payed.toString() + ' USD';
        }
        amount_to_pay_base = item.amount_to_pay_base.toString() + ' USD';
        amount_to_pay_fines = item.amount_to_pay_fines.toString() + ' USD';
        amount_to_pay_taxes = item.amount_to_pay_taxes.toString() + ' USD';
        amount_to_pay = item.amount_to_pay.toString() + ' USD';
        let payDate = '';
        if (item.pay_date == null || typeof item.pay_date == 'undefined') {
           payDate = '';
        } else {
           payDate = item.pay_date.toString();
        }
        data.push({
           code: item.code,
           state: state,
           amount_payed: amount_payed,
           amount_to_pay_base: amount_to_pay_base,
           amount_to_pay_fines: amount_to_pay_fines,
           amount_to_pay_taxes: amount_to_pay_taxes,
           amount_to_pay: amount_to_pay,
           pay_date: payDate,
        });
    });
    this.dataPays = data;
    this.onChangeTablePays(this.config);
  }

  onChangeTablePays(config: any, event?): any {
    const page: any = {page: this.currentPagePays, itemsPerPage: this.recordsByPagePays};
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const filteredData = this.changeFilterPays(this.dataPays, this.config);
    const sortedData = this.changeSortPays(filteredData, this.config);
    this.rowsPays = page && config.paging ? this.changePagePays(page, sortedData) : sortedData;
  }

  changeFilterPays(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columnsPays.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }
    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }
    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columnsPays.forEach((column: any) => {
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

  changeSortPays(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }
    const columns = this.config.sorting.columns || [];
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
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }
 
  changePagePays(page: any, data: Array<any> = this.dataPays):Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  onCellClickPays(event) {
    // ignored
  }
}
