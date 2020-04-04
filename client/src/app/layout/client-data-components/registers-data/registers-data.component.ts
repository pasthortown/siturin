import { Register } from './../../../models/ALOJAMIENTO/Register';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registers-data',
  templateUrl: './registers-data.component.html',
  styleUrls: ['./registers-data.component.scss']
})
export class RegistersDataComponent implements OnInit {
  
  @Input('user') user: User = new User();
  @Output('register_selected') change: EventEmitter<any> = new EventEmitter<any>();
  register_selected: any = {register: null, isNew: true};
  
  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  rows = [];
  columns = [];
  data = [];
  currentPageMinturRegisters = 1;
  lastPageMinturRegisters = 1;
  recordsByPageRegisterMintur = 5;
  estados = [];
  registers_mintur = [];
  registroNuevoEstablecimiento = false;

  constructor(private catastroRegisterDataService: CatastroRegisterService) {
    
  }

  ngOnInit() {
   this.refresh();
  }

  refresh() {
    this.getRegistersMintur();
  }

  getRegistersMintur() {
    this.registers_mintur = [];
    this.register_selected.register = new Register();
    this.catastroRegisterDataService.searchByRuc(this.user.ruc.toString()).then( r => {
       this.registers_mintur = r;
       this.buildDataTable();
    }).catch( e => console.log(e) );
  }

  onChangeTable(config: any, page: any = {page: this.currentPageMinturRegisters, itemsPerPage: this.recordsByPageRegisterMintur}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const filteredData = this.changeFilter(this.data, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  }

  changeFilter(data: any, config: any): any {
    this.rows.forEach(row => {
       row.selected = '';
    });
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
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
 
  changeSort(data: any, config: any): any {
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
 
  changePage(page: any, data: Array<any> = this.data):Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  buildDataTable() {
    this.columns = [
       {title: '', name: 'selected'},
       {title: 'Establecimiento', name: 'comercial_name'},
       {title: 'Fecha de Registro', name: 'as_turistic_date'},
       {title: 'Número de Registro', name: 'register_code'},
       {title: 'Provincia', name: 'ubication_main'},
       {title: 'Cantón', name: 'ubication_sencond'},
       {title: 'Parroquia', name: 'ubication_third'},
       {title: 'Dirección', name: 'address'},
       {title: 'Actividad', name: 'activity'},
       {title: 'Categoría', name: 'category'},
       {title: 'Clasificación', name: 'classification'},
       {title: 'Estado', name: 'establishment_state'},
    ];
    let data = [];
    const dataSITURIN = [];
    const dataSIETE = [];
    const dataOTHERS = [];
    this.registers_mintur.forEach(item => {
        let existe = false;
        this.estados.forEach(element => {
           if (element == item.establishment_state) {
              existe = true;
           }
        });
        if (!existe) {
           this.estados.push(item.establishment_state);
        }
        if (item.establishment_state == '') {
           item.establishment_state = 'ACTIVO';
        }
        const newItem = {
           selected: '',
           activity: item.activity,
           address: item.address,
           as_turistic_date: item.as_turistic_date,
           category: item.category,
           classification: item.classification,
           comercial_name: item.comercial_name,
           created_at: item.created_at,
           email: item.email,
           establishment_property_type: item.establishment_property_type,
           establishment_ruc_code: item.establishment_ruc_code,
           establishment_state: item.establishment_state,
           georeference_latitude: item.georeference_latitude,
           georeference_longitude: item.georeference_longitude,
           id: item.id,
           legal_representant_identification: item.legal_representant_identification,
           legal_representant_name: item.legal_representant_name,
           main_phone_number: item.main_phone_number,
           max_areas: item.max_areas,
           max_beds: item.max_beds,
           max_capacity: item.max_capacity,
           organization_type: item.organization_type,
           register_code: item.register_code,
           ruc: item.ruc,
           ruc_state: item.ruc_state,
           secondary_phone_number: item.secondary_phone_number,
           system_source: item.system_source,
           total_female: item.total_female,
           total_male: item.total_male,
           ubication_main: item.ubication_main,
           ubication_sencond: item.ubication_sencond,
           ubication_third: item.ubication_third,
           updated_at: item.updated_at,
           web: item.web,
        };
        if (newItem.system_source == 'SIETE') {
           dataSIETE.push(newItem);
        }
        if (newItem.system_source == 'SITURIN') {
           dataSITURIN.push(newItem);
        }
        if (newItem.system_source !== 'SITURIN' || newItem.system_source !== 'SIETE') {
           dataOTHERS.push(newItem);
        }
    });
    dataSITURIN.forEach(element => {
      data = this.storeInData(data,element); 
    });
    dataSIETE.forEach(itemSIETE => {
       let existeSITURIN = false;
       dataSITURIN.forEach(itemSITURIN => {
          if (itemSITURIN.establishment_ruc_code == itemSIETE.establishment_ruc_code) {
           existeSITURIN = true;
          }
       });
       if (!existeSITURIN) {
        data = this.storeInData(data,itemSIETE);
       }
    });
    dataOTHERS.forEach(itemOTHER => {
      data = this.storeInData(data,itemOTHER);
    });
    this.data = data;
    this.onChangeTable(this.config);
  }
  
  storeInData(data, element) {
    let existe = false;
    data.forEach(e1 => {
       if (e1 == element) {
          existe = true;
       }
    });
    if (!existe) {
       data.push(element);
    }
    return data;
  }

  onCellClick(event) {
    this.registroNuevoEstablecimiento = false;
    this.register_selected.isNew = true;
    this.registers_mintur.forEach(element => {
      if (element.id == event.row.id) {
         this.register_selected.register = element;
      }
    });
    this.rows.forEach(row => {
       if (event.row == row) {
          row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
          this.register_selected.isNew = false;
       } else {
        row.selected = '';
       }
    });
    this.change.emit(this.register_selected);
  }

  registrarEstablecimientoNuevo() {
    this.register_selected = {register: null, isNew: this.registroNuevoEstablecimiento};
    this.rows.forEach(row => {
        row.selected = '';
    });
    this.change.emit(this.register_selected);
  }
}
