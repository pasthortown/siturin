import { Register } from './../../../models/ALOJAMIENTO/Register';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { AgreementService } from './../../../services/CRUD/BASE/agreement.service';
import { AccountRol } from './../../../models/AUTH/AccountRol';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Agreement } from './../../../models/BASE/Agreement';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cliente-externo',
  templateUrl: './cliente-externo.component.html',
  styleUrls: ['./cliente-externo.component.scss']
})

export class ClienteExternoComponent implements OnInit {
  @ViewChild('pasos') pasosTabSet;
  @ViewChild('pasosSuperiores') pasosSuperioresTabSet;
  
  // DATOS DEL USUARIO
  
  roles: AccountRol[] = [];
  user: User = new User();

  // DATOS DEL REGISTRO SELECCIONADO

  registerMinturSelected: any = null; // Portador de la información total del registro

  actividadSelected = '-';
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
  esRegistro = false;
  
  // VARIABLES PARA EL CONTROL DE LAS ACCIONES QUE ESTÁ HACIENDO EL USUARIO
  
  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  mostrarTerminosCondiciones = false;
  mostrarDataRegisterMintur = false;
  estaEnTabla = false;
  mostrarOpciones = false;
  registroNuevoEstablecimiento = false;
  mostrarIngresoDatos = false;
  idCausal = 0;
  config_opciones = {
    actualizando: false,
    mostrarActualizar: true,
    declarandoUnoMil: false,
    mostrarDeclarandoUnoMil: true,
    activando: false,
    mostrarActivar: true,
    reclasificando: false,
    mostrarReclasificar: true,
    recategorizando: false,
    mostrarRecategorizar: true,
    actualizandoCapacidadesPrecios: false,
    mostrarActualizarCapacidadesPrecios: true,
    cannuevaClasificacionAB: false,
    nuevaClasificacionAB: false,
    mensajePorTipoTramite: ''
  }

  // VARIABLES TABLA DE REGISTROS DEL USUARIO

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
  selectedRegister = null; // Va a contener el register mintur seleccionado a partir de los datos de la tabla.
   

  constructor( private userDataService: UserService,
               private catastroRegisterDataService: CatastroRegisterService     
  ) {}

  ngOnInit() {
    this.refresh();
    this.getUser();
  }

  refresh() {
    
  }

  getUser() {
    this.roles = JSON.parse(sessionStorage.getItem('roles')) as AccountRol[];
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      this.mostrarTerminosCondiciones = true;;
      this.getRegistersMintur();
    }).catch( e => console.log(e));
  }

  // FUNCIONES DE LA TABLA DE REGISTROS

  getRegistersMintur() {
    this.registers_mintur = [];
    this.registerMinturSelected = new Register();
    this.catastroRegisterDataService.searchByRuc(this.user.ruc.toString()).then( r => {
       this.registers_mintur = r;
       this.buildDataTable();
    }).catch( e => console.log(e) );
  }

  checkTerminosCondiciones(event) {
    console.log(event);
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
    if (event.row.activity == 'ALIMENTOS Y BEBIDAS') {
       this.actividadSelected = '2';
        this.config_opciones.cannuevaClasificacionAB = true;
    }
    if (event.row.activity == 'ALOJAMIENTO') {
       this.actividadSelected = '1';
        this.config_opciones.cannuevaClasificacionAB = false;
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
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.declarandoUnoMil = false;
    this.mostrarIngresoDatos = false;
    this.registers_mintur.forEach(element => {
      if (element.id == event.row.id) {
         this.selectedRegister = element;
      }
    });
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
    this.estaEnTabla = true;
    this.mostrarOpciones = true;
    this.seleccionarRegistro(row);
  }

  registrarEstablecimientoNuevo(estaEnTabla, hasRucCode) { 
    // CONTROL DE INTERFAZ
    this.estaEnTabla = estaEnTabla;
    if (!this.estaEnTabla) {
      this.rows.forEach(row => {
         row.selected = '';
      });
    }
    this.mostrarDataRegisterMintur = true;
    this.mostrarIngresoDatos = true;
    this.mostrarOpciones = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    // ENCERAMOS REGISTRO NUEVO
    this.actividadSelected = '-';
    this.config_opciones.cannuevaClasificacionAB = false;
    this.establishment_selected_ruc_code_id = 'NULL';
    this.my_category_current = '';
    this.my_classification_current = '';
    this.selected_category_catastro = '';
    this.selected_classification_catastro = '';
    this.register_as_turistic_Date = new Date();
    this.idCatasterID = 0;
    this.register_code = '';
    this.selected_system_source = '';
    this.esRegistro = true;
    this.hasRucCode = hasRucCode;
    this.selectedRegister = null;
    this.seleccionarRegistro();
  }

  seleccionarRegistro(row?) {
    this.mostrarIngresoDatos = false;
    this.config_opciones = {
      actualizando: false,
      mostrarActualizar: true,
      declarandoUnoMil: false,
      mostrarDeclarandoUnoMil: true,
      activando: false,
      mostrarActivar: true,
      reclasificando: false,
      mostrarReclasificar: true,
      recategorizando: false,
      mostrarRecategorizar: true,
      actualizandoCapacidadesPrecios: false,
      mostrarActualizarCapacidadesPrecios: true,
      cannuevaClasificacionAB: false,
      nuevaClasificacionAB: false,
      mensajePorTipoTramite: ''
    }
    if (typeof row != 'undefined') {
      let cambioEstado = false;
      if(this.selectedRegister.establishment_state.toUpperCase().trim() == "ACTIVO" || 
        this.selectedRegister.establishment_state.toUpperCase().trim() == "ABIERTO" || 
        this.selectedRegister.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS ACIVOS") {
         this.config_opciones.mostrarActualizar = true;
         this.config_opciones.mostrarActivar = false;
         this.config_opciones.mostrarReclasificar = true;
         this.config_opciones.mostrarRecategorizar = true; 
         this.config_opciones.mostrarDeclarandoUnoMil = true;
         this.config_opciones.mostrarActualizarCapacidadesPrecios = true;
         cambioEstado = true;
      }
      if(this.selectedRegister.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS NO ACTIVOS" || 
         this.selectedRegister.establishment_state.toUpperCase().trim() == "CERRADO") {
         this.config_opciones.mostrarActualizar = false;
         this.config_opciones.mostrarActivar = true;
         this.config_opciones.mostrarReclasificar = false;
         this.config_opciones.mostrarRecategorizar = false; 
         this.config_opciones.mostrarDeclarandoUnoMil = false;
         this.config_opciones.mostrarActualizarCapacidadesPrecios = false;
          this.config_opciones.cannuevaClasificacionAB = false;
         cambioEstado = true;
      }
      if (!cambioEstado) {
         this.config_opciones.mostrarActualizar = false;
         this.config_opciones.mostrarActivar = false;
         this.config_opciones.mostrarReclasificar = false;
         this.config_opciones.mostrarRecategorizar = false;
         this.config_opciones.mostrarDeclarandoUnoMil = false;
         this.config_opciones.mostrarActualizarCapacidadesPrecios = false;
         return;
      }
      this.mostrarDataRegisterMintur = true;
      //this.checkTramitEmitted(this.register_code);
      if (this.selectedRegister.system_source == 'SITURIN') {
        this.getRegisterSiturinData();
      } else {
         this.startInitialDataRegisterNew();
      }
    } else {
       this.startInitialDataRegisterNew();
    }
  }

  getRegisterSiturinData() {
    // cambioEstado = true;
    // this.consultorDataService.get_register_by_code(this.register_code).then( r => {
    //     const registerMintur = r[0];
    //     this.selectRegisterMintur(registerMintur);
    //     const registerState = this.getRegisterState(registerMintur.states.state_id);
    //     this.stateTramiteId = registerMintur.states.state_id;
    //     const estado: String = this.stateTramiteId.toString();
    //     this.digito = estado.substring(estado.length-1, estado.length);
    //     this.stateTramite = 0;
    //     this.canSave = true;
    //     if (registerState.search('Solicitud Aprobada') == 0) {
    //        this.stateTramite = 1;
    //        this.hasRegisterReady = true;
    //        this.canSave = false;
    //     }
    //     if (registerState.search('Solicitud Rechazada') == 0) {
    //        this.stateTramite = 2;
    //        this.hasRegisterReady = false;
    //        this.canSave = false;
    //     }
    //     if (registerState.search('Documentación Entregada') == 0) {
    //        this.stateTramite = 3;
    //        this.hasRegisterReady = false;
    //        this.canSave = false;
    //     }
    //     this.idRegister = registerMintur.register.id;
    //     this.getApprovalStates();
    //  }).catch( e => { console.log(e); });
  }

  startInitialDataRegisterNew() {

  }

  // FUNCIONES QUE CONTROLAN LA INTERFAZ

  solicitandoNuevaActualizacion() {
    this.config_opciones.actualizando = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.activando = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.recategorizando = false;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.nuevaClasificacionAB = true;
    this.config_opciones.mensajePorTipoTramite = 'En esta sección, usted va a proceder a solicitar una clasificación adicional para su establecimiento, tiene la opción de guardar la información en cualquier momento.';
    this.mostrarIngresoDatos = true;
    this.idCausal = 0;
    this.estaEnTabla = false;
    this.selected_system_source = '';
    this.selected_category_catastro = '';
    this.selected_classification_catastro = '';
    this.esRegistro = true;
    this.hasRucCode = true;
    this.selectedRegister = null;
  }

  actualizarCapacidadesPrecios() {
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.actualizando = false;
    this.config_opciones.activando = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.actualizandoCapacidadesPrecios = true;
    this.config_opciones.recategorizando = false;
    this.mostrarIngresoDatos = false;
    this.idCausal = 6;
    if (this.actividadSelected == '2') {
       this.config_opciones.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar y actualizar la información de sus capacidades y lista de precios, tiene la opción de guardar la información en cualquier momento.';
    }
    if (this.actividadSelected == '1') {
       this.config_opciones.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar y actualizar la información de sus capacidades y tatifario rack, tiene la opción de guardar la información en cualquier momento.';
    } 
  }

  reactivar() {
    this.config_opciones.actualizando = false;
    this.config_opciones.activando = true;
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.recategorizando = false;
    this.config_opciones.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.mostrarIngresoDatos = true;
    this.idCausal = 7;
  }
 
  reclasificacion() {
    this.config_opciones.actualizando = false;
    this.config_opciones.activando = false; 
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.reclasificando = true;
    this.config_opciones.recategorizando = false;
    this.config_opciones.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.mostrarIngresoDatos = true;
    this.idCausal = 4;
  }
 
  recategorizacion() {
    this.config_opciones.actualizando = false;
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.activando = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.recategorizando = true;
    this.config_opciones.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.idCausal = 5;
    this.mostrarIngresoDatos = true;
  }
 
  declararUnoMil() {
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.actualizando = false;
    this.config_opciones.activando = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.declarandoUnoMil = true;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.recategorizando = false;
    this.config_opciones.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar su contribución Uno por Mil, tiene la opción de guardar la información en cualquier momento.';
    this.mostrarIngresoDatos = false;
    this.idCausal = 6;
  }

  actualizar() {
    this.config_opciones.actualizando = true;
    this.config_opciones.nuevaClasificacionAB = false;
    this.config_opciones.activando = false;
    this.config_opciones.reclasificando = false;
    this.config_opciones.recategorizando = false;
    this.config_opciones.actualizandoCapacidadesPrecios = false;
    this.config_opciones.declarandoUnoMil = false;
    this.config_opciones.mensajePorTipoTramite = 'En esta sección, usted va a proceder a actualizar la información de su Registro de Turismo, tiene la opción de guardar la información en cualquier momento.';
    this.mostrarIngresoDatos = true;
    this.idCausal = 6;
  }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}