import { AuthLocationService } from './../../../../../../services/CRUD/AUTH/authlocation.service';
import { ConsultorService } from './../../../../../../services/negocio/consultor.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { UserService } from './../../../../../../services/profile/user.service';
import { AuthLocation } from './../../../../../../models/AUTH/AuthLocation';
import { Ubication } from './../../../../../../models/BASE/Ubication';
import { User } from './../../../../../../models/profile/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coordinador-bandejas-data',
  templateUrl: './coordinador-bandejas-data.component.html',
  styleUrls: ['./coordinador-bandejas-data.component.scss']
})
export class CoordinadorBandejasDataComponent implements OnInit {
  @Output('register_selected') change: EventEmitter<any> = new EventEmitter<any>();cccc
  @Output('inspectores_change') inspectores_change: EventEmitter<any> = new EventEmitter<any>();
  @Output('financieros_change') financieros_change: EventEmitter<any> = new EventEmitter<any>();
  @Input('user') user: User = new User();
  
  @Input('sates') states = { alojamiento: [],
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

  register_can_show = [];
  registers_mintur = [];
  ubications: Ubication[] = [];

  financieros = [];
  inspectores = [];
  myAbleUbications: Ubication[] = [];

  constructor(private consultorDataService: ConsultorService,
    private ubicationDataService: UbicationService,
    private authLocationDataService: AuthLocationService,
    private userDataService: UserService) {
    
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
    this.getRegistersMintur();
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
       this.getMyTeam();
    }).catch( e => { console.log(e); });
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

  getMyTeam() {
    this.authLocationDataService.get_by_user_id(this.user.id).then(r2 => {
       const myAuthLocations = r2 as AuthLocation[];
       this.myAbleUbications = [];
       const cz: Ubication[] = [];
       const provincias: Ubication[] = [];
       myAuthLocations.forEach(element => {
          this.ubications.forEach( u => {
             if (u.id == element.id_ubication) {
                cz.push(u);
             }
          });
       });
       cz.forEach(coordinacion_zonal => {
          this.ubications.forEach( u => {
             if (coordinacion_zonal.code == u.father_code) {
                provincias.push(u);
             }
          });
       });
       const cantones: Ubication[] = [];
       provincias.forEach( p => {
          this.ubications.forEach( u => {
             if (p.code == u.father_code) {
                cantones.push(u);
             }
          });
       });
       const parroquia: Ubication[] = [];
       cantones.forEach( cant => {
          this.ubications.forEach( u => {
             if (cant.code == u.father_code) {
                parroquia.push(u);
             }
          });
       });
       cz.forEach( u => {
          this.myAbleUbications.push(u);
       });
       provincias.forEach( u => {
          this.myAbleUbications.push(u);
       });
       cantones.forEach( u => {
          this.myAbleUbications.push(u);
       });
       parroquia.forEach( u => {
          this.myAbleUbications.push(u);
       });
       this.getInspectores();
       this.getFinancieros();
 
    }).catch( e => { console.log(e); });
   }
 
   getInspectores() {
    this.inspectores = [];
    this.userDataService.get_by_rol('5').then( r => {
       const allInspector = r as User[];
       const allInspectorData: User[] = [];
       allInspector.forEach( inspector => {
          this.myAbleUbications.forEach( u => {
             if (inspector.id_ubication == u.id) {
                const newUser = new User();
                newUser.id = inspector.id;
                newUser.name = inspector.name;
                newUser.email = inspector.email;
                newUser.id_ubication = inspector.id_ubication;
                newUser.address = inspector.address;
                newUser.address_map_latitude = inspector.address_map_latitude;
                newUser.address_map_longitude = inspector.address_map_longitude;
                newUser.main_phone_number = inspector.main_phone_number;
                newUser.secondary_phone_number = inspector.secondary_phone_number;
                newUser.identification = inspector.identification;
                newUser.ruc = inspector.ruc;
                newUser.province = u.name;
                allInspectorData.push(newUser);
             }
          });
       });
       const inspectoresDuplicados: User[] = [];
       allInspectorData.forEach(inspector => {
          let existe = false;
          this.inspectores.forEach(i => {
             if (i.id == inspector.id) {
                existe = true;
             }
          });
          if (!existe) {
             this.inspectores.push(inspector);
          } else {
             inspectoresDuplicados.push(inspector);
          }
       });
       inspectoresDuplicados.forEach(inspector => {
          this.inspectores.forEach(i => {
             if (i.id == inspector.id) {
                i.province = i.province + '/' + inspector.province;
             }
          });
       });
       this.inspectores_change.emit(this.inspectores);
    }).catch( e => {console.log(e); });
   }
    
   getFinancieros() {
    this.financieros = [];
    this.userDataService.get_by_rol('6').then( r => {
       const allFinancieros = r as User[];
       const allFinancieroData: User[] = [];
       allFinancieros.forEach( financiero => {
          this.myAbleUbications.forEach( u => {
             if (financiero.id_ubication == u.id) {
                const newUser = new User();
                newUser.id = financiero.id;
                newUser.name = financiero.name;
                newUser.email = financiero.email;
                newUser.id_ubication = financiero.id_ubication;
                newUser.address = financiero.address;
                newUser.address_map_latitude = financiero.address_map_latitude;
                newUser.address_map_longitude = financiero.address_map_longitude;
                newUser.main_phone_number = financiero.main_phone_number;
                newUser.secondary_phone_number = financiero.secondary_phone_number;
                newUser.identification = financiero.identification;
                newUser.ruc = financiero.ruc;
                newUser.province = u.name;
                allFinancieroData.push(newUser);
             }
          });
       });
       const financierosDuplicados: User[] = [];
       allFinancieroData.forEach(financiero => {
          let existe = false;
          this.financieros.forEach(f => {
             if (f.id == financiero.id) {
                existe = true;
             }
          });
          if (!existe) {
             this.financieros.push(financiero);
          } else {
             financierosDuplicados.push(financiero);
          }
       });
       financierosDuplicados.forEach(financiero => {
          this.financieros.forEach(f => {
             if (f.id == financiero.id) {
                f.province = f.province + '/' + financiero.province;
             }
          });
       });
       this.financieros_change.emit(this.financieros);
    }).catch( e => {console.log(e); });
  }

  getRegistersMintur() {
    this.registers_mintur = [];
    this.consultorDataService.get_registers(1).then( r => {
       this.registers_mintur = r;
       this.buildDataTable();
    }).catch( e => console.log(e) );
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
    ];
    const data = [];
    this.register_can_show = [];
    this.registers_mintur.forEach(item => {
      let addRegister = false;
      this.myAbleUbications.forEach( ub => {
        if (ub.id == item.establishment.ubication_id) {
          addRegister = true;
        }
      });
      if (addRegister) {
        this.register_can_show.push(item);
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
        const creacion = new Date(item.register.created_at.toString());
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
        data.push({
          selected: '',
          date_assigment_alert: date_assigment_alert,
          number: item.ruc.number,
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
          register_type_id: item.register.register_type_id,
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

  onCellClick(event) {
    let activity = event.row.actividad;
    let idRegister = event.row.registerId;
    const toReturn = {row: event.row,
      register: null,
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
