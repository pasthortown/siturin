import { Ruc } from './../../../../../../models/BASE/Ruc';
import { Establishment } from './../../../../../../models/BASE/Establishment';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';

@Component({
  selector: 'app-inspector-bandejas-data',
  templateUrl: './inspector-bandejas-data.component.html',
  styleUrls: ['./inspector-bandejas-data.component.scss']
})
export class InspectorBandejasDataComponent implements OnInit {
  @Input('user') user: User = new User();
  @Output('register_selected') change: EventEmitter<any> = new EventEmitter<any>();
  @Input('estados_tramites') estados_tramites: any[] = [];
  
  @Input('states') states = { alojamiento: [],
    alimentos_bebidas: [],
    operacion_intermediacion: [],
  };

  @Input('register_types_block') register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };
  
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
  ubications: Ubication[] = [];
  
  registers_mintur = [];

  idTramiteEstadoFilter= 0;

  constructor(private consultorDataService: ConsultorService,
    private ubicationDataService: UbicationService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }
  
  loadCatalogos() {
    this.getUbications();
  }

  refresh() {
    const toReturn = {row: null, 
      register: {register: null,
        activity_id: 0,
        activity: '',
        establishment: new Establishment(),
        ruc: new Ruc(),
        states: null,
        register_data_on_catastro: null
      }
    };
    this.change.emit(toReturn);
    this.getRegistersMintur();
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
    }).catch( e => { console.log(e); });
  }
  
  filterByTramiteState(tramite?: String) {
    let filtroTexto: String = '';
    this.estados_tramites.forEach(estado => {
       if (estado.id == this.idTramiteEstadoFilter) {
        filtroTexto = estado.name;
       }
    });
    if(typeof tramite !== 'undefined') {
       if (tramite == '-') {
        this.config.filtering = {filterString: filtroTexto};
       } else {
        this.config.filtering = {filterString: filtroTexto + ' - ' + tramite};
       }
    } else {
     this.config.filtering = {filterString: filtroTexto};
    }
    this.onChangeTable(this.config);
  }

  getRegistersMintur() {
    this.registers_mintur = [];
    this.consultorDataService.get_registers_assigned_inspector_id(this.user.id).then( r => {
       this.registers_mintur = r;
       this.buildDataTable();
    }).catch( e => console.log(e) );
  }

  buildDataTable() {
    this.columns = [
      {title: '', name: 'selected'},
      //{title: 'Tiempo de Atención', name: 'date_assigment_alert'},
      {title: 'Número de RUC', name: 'number'},
      {title: 'Número de Establecimiento', name: 'ruc_code_id'},
      {title: 'Nombre Comercial', name: 'establishment'},
      {title: 'Sistema de Origen', name: 'system_source'},
      {title: 'Bandeja', name: 'status'},
      {title: 'Actividad', name: 'actividad'},
      {title: 'Provincia', name: 'provincia'},
      {title: 'Cantón', name: 'canton'},
      {title: 'Parroquia', name: 'parroquia'},
      {title: 'Dirección', name: 'address'},
      {title: 'Clasificación - Categoría', name: 'category'},
      {title: 'Fecha de Solicitud', name: 'created_at'},
      {title: 'Número de Registro', name: 'code'},
      {title: 'Fecha de Asignación', name: 'date_assigment'},
    ];
    const data = [];
    this.registers_mintur.forEach(item => {
      let date_assigment_alert = '';
      let date1 = new Date();
      const registerState = this.getRegisterState(item.states.state_id, item.activity_id);
      if (registerState.search('Aprobado') == 0) {
        date1 = new Date(item.states.updated_at);
      }
      if (registerState.search('Negado') == 0) {
        date1 = new Date(item.states.updated_at);
      }
      const date2 = new Date(item.register.created_at);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 7) {
        date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-success">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
      }
      if (diffDays >= 7 && diffDays <= 10) {
        date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-warning">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
      }
      if (diffDays > 10) {
        date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-danger">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
      }
      const estado: String = item.states.state_id.toString();
      const digito = estado.substring(estado.length-1, estado.length);
      let provincia = new Ubication();
      let canton = new Ubication();
      let parroquia = new Ubication();
      let zonal = new Ubication();
      this.ubications.forEach(element => {
        if (element.id == item.establishment.ubication_id) {
          parroquia = element;
        }
      });
      this.ubications.forEach(element => {
        if (element.code == parroquia.father_code) {
          canton = element;
        }
      });
      this.ubications.forEach(element => {
        if (element.code == canton.father_code) {
          provincia = element;
        }
      });
      this.ubications.forEach(element => {
        if (element.code == provincia.father_code) {
          zonal = element;
        }
      });
      let thiscategory: String =  '';
      const PrimerDigito = item.states.state_id.toString().substring(0, 1);
      if (PrimerDigito == '5' || item.states.state_id.toString() == '60') {
        if (item.register_data_on_catastro.classification == '') {
          thiscategory = this.getRegisterCategory(item.register.register_type_id, item.activity_id).toString();
        } else {
          thiscategory = item.register_data_on_catastro.classification.toString() + ' - ' + item.register_data_on_catastro.category.toString();   
        }
      } else {
        thiscategory = this.getRegisterCategory(item.register.register_type_id, item.activity_id).toString();
      }
      if ( digito == '4' || digito == '5' || digito == '6' ) {
        const creacion = new Date(item.register.created_at.toString());
        data.push({
          selected: '',
          date_assigment_alert: date_assigment_alert,
          number: item.ruc.number,
          date_assigment: new Date(item.register.date_assigment.toString()).toLocaleDateString(),
          registerId: item.register.id,
          actividad: item.activity,
          provincia: provincia.name,
          canton: canton.name,
          parroquia: parroquia.name,
          ruc_code_id: item.establishment.ruc_code_id,
          establishment: item.establishment.commercially_known_name,
          address: item.establishment.address_main_street + ' ' + item.establishment.address_number + ' ' + item.establishment.address_secondary_street,
          created_at: creacion.toLocaleDateString(),
          code: item.register.code,
          category: thiscategory.toUpperCase(),
          catastro_category: item.register_data_on_catastro.category.toUpperCase(),
          catastro_classification: item.register_data_on_catastro.classification.toUpperCase(),
          system_source: item.register_data_on_catastro.system_source,
          status: registerState,
          status_id: item.states.state_id,
        });
      }
    });
    this.data = data;
    this.onChangeTable(this.config);
  }

  getRegisterCategory(id: number, activity_id: number): String {
    let toReturn: String = '';
    let fatherCode: String = '';
    if (activity_id == 1) {
      this.register_types_block.register_types_alojamiento.forEach(register_type => {
        if (register_type.id == id) {
          toReturn = register_type.name;
          fatherCode = register_type.father_code;
        }
      });
      this.register_types_block.register_types_alojamiento.forEach(register_type => {
        if (register_type.code == fatherCode) {
          toReturn = register_type.name + ' - ' + toReturn;
        }
      });
    }
    if (activity_id == 2) {
      this.register_types_block.register_types_alimentos_bebidas.forEach(register_type => {
        if (register_type.id == id) {
          toReturn = register_type.name;
        if (register_type.name == 'Pendiente') {
          toReturn = "No Cumple Inspección (No Turístico)";
        }
          fatherCode = register_type.father_code;
        }
      });
      this.register_types_block.register_types_alimentos_bebidas.forEach(register_type => {
        if (register_type.code == fatherCode) {
          toReturn = register_type.name + ' - ' + toReturn;
        }
      });
    }
    if (activity_id == 3) {
      this.register_types_block.register_types_operacion_intermediacion.forEach(register_type => {
        if (register_type.id == id) {
          toReturn = register_type.name;
          fatherCode = register_type.father_code;
        }
      });
      this.register_types_block.register_types_operacion_intermediacion.forEach(register_type => {
        if (register_type.code == fatherCode) {
          toReturn = register_type.name + ' - ' + toReturn;
        }
      });
    }
    return toReturn;
  }

  getRegisterState(id: number, activity_id: number): String {
    let toReturn: String = '';
    let fatherCode: String = '';
    if (activity_id == 1) {
      this.states.alojamiento.forEach(state => {
        if (state.id == id) {
          toReturn = state.name;
          fatherCode = state.father_code;
        }
      });
      this.states.alojamiento.forEach(state => {
        if (state.code == fatherCode) {
          toReturn = state.name + ' - ' + toReturn;
        }
      });
    }
    if (activity_id == 2) {
      this.states.alimentos_bebidas.forEach(state => {
        if (state.id == id) {
          toReturn = state.name;
          fatherCode = state.father_code;
        }
      });
      this.states.alimentos_bebidas.forEach(state => {
        if (state.code == fatherCode) {
          toReturn = state.name + ' - ' + toReturn;
        }
      });
    }
    if (activity_id == 3) {
      this.states.operacion_intermediacion.forEach(state => {
        if (state.id == id) {
          toReturn = state.name;
          fatherCode = state.father_code;
        }
      });
      this.states.operacion_intermediacion.forEach(state => {
        if (state.code == fatherCode) {
          toReturn = state.name + ' - ' + toReturn;
        }
      });
    }
    return toReturn;
  }

  onChangeTable(config: any, event?): any {
    const page: any = {page: this.currentPageMinturRegisters, itemsPerPage: this.recordsByPageRegisterMintur};
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
          return item[column.name].toUpperCase().match(column.filtering.filterString.toUpperCase());
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

  onCellClick(event) {
    let activity = event.row.actividad;
    let idRegister = event.row.registerId;
    const toReturn = {row: null, 
      register: {register: null,
        activity_id: 0,
        activity: '',
        establishment: new Establishment(),
        ruc: new Ruc(),
        states: null,
        register_data_on_catastro: null
      }
    };
    this.rows.forEach(row => {
      if (event.row == row) {
        row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
      } else {
        row.selected = '';
      }
    });
    this.registers_mintur.forEach(element => {
       if (element.register.id == idRegister && element.activity == activity) {
          toReturn.register = element;
       }
    });
    this.change.emit(toReturn);
  }
}
