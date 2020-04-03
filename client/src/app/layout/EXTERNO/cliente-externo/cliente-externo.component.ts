import { StateService } from './../../../services/CRUD/ALOJAMIENTO/state.service';
import { AgreementService } from './../../../services/CRUD/BASE/agreement.service';
import { AccountRol } from './../../../models/AUTH/AccountRol';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Agreement } from './../../../models/BASE/Agreement';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/models/ALOJAMIENTO/State';

@Component({
  selector: 'app-cliente-externo',
  templateUrl: './cliente-externo.component.html',
  styleUrls: ['./cliente-externo.component.scss']
})

export class ClienteExternoComponent implements OnInit {

  // DATOS DEL USUARIO
  
  roles: AccountRol[] = [];
  user: User = new User();

  // DATOS DEL REGISTRO SELECCIONADO

  actividadSelected = '-';
  cannuevaClasificacionAB = false;
  register_code = '';
  establishment_selected_ruc_code_id = 'NULL';
  my_category_current = '';
  my_classification_current = '';
  selected_category_catastro = '';
  selected_classification_catastro = '';
  idCatasterID = 0;
  selected_system_source = '';
  hasRucCode = false;
  register_as_turistic_Date = new Date();
  
  // VARIABLES PARA EL CONTROL DE LAS ACCIONES QUE ESTÁ HACIENDO EL USUARIO

  mostrarOpciones = false;
  registroNuevoEstablecimiento = false;
  actualizandoCapacidadesPrecios = false;
  declarandoUnoMil = false;
  mostrarIngresoDatos = false;
  
  // VARIABLES TERMINOS Y CONDICIONES

  terminosCondicionesAgreement: Agreement = new Agreement();
  terminosCondiciones = false;
  
  // VARIABLES TABLA DE REGISTROS DEL USUARIO

  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  rows = [];
  columns = [];
  data = [];
  idTramiteEstadoFilter = 0;
  currentPageMinturRegisters = 1;
  lastPageMinturRegisters = 1;
  recordsByPageRegisterMintur = 5;

  estados_tramites: State[];
  

  constructor( private userDataService: UserService,
               private agreementDataService: AgreementService,  
               private stateDataService: StateService          
  ) {}

  ngOnInit() {
    this.refresh();
    this.getUser();
    this.getTramiteStates();
  }

  refresh() {

  }

  // FUNCIONES PARA TERMINOS Y CONDICIONES

  getUser() {
    this.roles = JSON.parse(sessionStorage.getItem('roles')) as AccountRol[];
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      // Es importante tener el usuario para llenar los datos del usuario en el acuerdod e términos y condiciones.
      // Por eso, después de tener el usuario, se carga los términos y condiciones.
      this.getTerminosCondicionesAgreement();
    }).catch( e => console.log(e));
  }

  getTerminosCondicionesAgreement() {
    this.agreementDataService.get(1).then( r => {
       this.terminosCondicionesAgreement = r.Agreement as Agreement;
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##USER##', '<strong>' + this.user.name.toUpperCase() + '</strong>');
       this.terminosCondicionesAgreement.content = this.terminosCondicionesAgreement.content.replace('##RUC##', '<strong>' + this.user.ruc + '</strong>');
    }).catch( e => { console.log(e); });
  }

  checkAgreement() {
    if (this.terminosCondiciones) {
       //this.getCategories();
    }
  }

  // FUNCIONES DE LA TABLA DE REGISTROS

  getTramiteStates() {
    this.estados_tramites = [];
    this.stateDataService.get().then( r => {
       r.forEach(element => {
          if (element.father_code == '-') {
             this.estados_tramites.push(element);
          }
       });
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
  
  onCellClick(event) {
    if (event.row.activity == 'ALIMENTOS Y BEBIDAS') {
       this.actividadSelected = '2';
       this.cannuevaClasificacionAB = true;
    }
    if (event.row.activity == 'ALOJAMIENTO') {
       this.actividadSelected = '1';
       this.cannuevaClasificacionAB = false;
    }
    this.register_code = event.row.register_code;
    this.establishment_selected_ruc_code_id = event.row.establishment_ruc_code;
    this.my_category_current = event.row.category;
    this.my_classification_current = event.row.classification;
    this.idCatasterID = event.row.id;
    this.selected_system_source = event.row.system_source;
    this.selected_category_catastro = event.row.category;
    this.selected_classification_catastro = event.row.classification;
    this.hasRucCode = false;
    if (event.row.establishment_ruc_code !== 'NULL') {
       this.hasRucCode = true;
    }
    this.register_as_turistic_Date = new Date(event.row.as_turistic_date.toString());
    this.mostrarOpciones = false;
    this.registroNuevoEstablecimiento = false;
    this.actualizandoCapacidadesPrecios = false;
    this.declarandoUnoMil = false;
    this.mostrarIngresoDatos = false;
    this.rows.forEach(row => {
       if (event.row == row) {
          row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
          if ((row.system_source == 'SIETE') || (row.system_source == 'SITURIN')) {
             this.buildOpciones(row);
          } else {
             this.registrarEstablecimientoNuevo(true, this.hasRucCode);
          }
       } else {
          row.selected = '';
       }
    });
  }

  buildOpciones(row) {
    // this.estaEnTabla = true;
    // this.mostrarOpciones = true;
    // this.seleccionarRegistro(row);
  }

  registrarEstablecimientoNuevo(estaEnTabla, hasRucCode) {
    // this.actividadSelected = '-';
    // this.cannuevaClasificacionAB = false;
    // this.establishment_selected_ruc_code_id = 'NULL';
    // this.my_category_current = '';
    // this.my_classification_current = '';
    // this.idCatasterID = 0;
    // this.register_code = '';
    // this.estaEnTabla = estaEnTabla;
    // this.mostrarDataRegisterMintur = true;
    // this.selected_system_source = '';
    // this.selected_category_catastro = '';
    // this.selected_classification_catastro = '';
    // this.esRegistro = true;
    // this.mostrarIngresoDatos = true;
    // this.mostrarOpciones = false;
    // if (!this.estaEnTabla) {
    //    this.rows.forEach(row => {
    //       row.selected = '';
    //    });
    // }
    // this.hasRucCode = hasRucCode;
    // this.selectedRegister = null;
    // this.register_as_turistic_Date = new Date();
    // this.registroNuevoEstablecimiento = false;
    // this.declarandoUnoMil = false;
    // this.actualizandoCapacidadesPrecios = false;
    // this.seleccionarRegistro();
  }
}
