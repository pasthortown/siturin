import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/profile/User';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Ruc } from 'src/app/models/BASE/Ruc';
import Swal from 'sweetalert2';
import { RegisterTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/registertype.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { UserService } from 'src/app/services/profile/user.service';
import { RegisterStateService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { RegisterType as RegisterTypeAB} from 'src/app/models/ALIMENTOSBEBIDAS/RegisterType';
import { RegisterTypeService as RegisterTypeABService} from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registertype.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {
  rucValidated = false;
  rucData = '';
  ruc: Ruc = new Ruc();
  consumoRuc = false;
  SRIOK = false;
  razon_social = '';
  bitacoraAlojamiento: any[] = [];
  bitacoraAlimentosBebidas: any[] = [];
  mostrarEstablecimientos = false;
  registersAlojamiento: any[] = [];
  registersAlimentosBebidas: any[] = [];
  currentPageRegisters = 1;
  recordsByPageRegisters = 5;
  establishments: any[] = [];
  register_types: RegisterType[] = [];
  register_types_AB: RegisterTypeAB[] = [];
  currentPageEstablishments = 1;
  recordsByPageEstablishments = 5;
  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  rows = [];
  columns = [];
  rowsRegisters = [];
  columnsRegisters = [];
  data = [];
  dataRegisters = [];
  ubications: Ubication[] = [];
  mostrarRegistros = false;
  establishment_id_selected = 0;

  constructor(private dinardapDataService: DinardapService,
    private registerABDataService: RegisterABService,
    private ubicationDataService: UbicationService,
    private registerDataService: RegisterService,
    private register_typeDataService: RegisterTypeService,
    private register_typeABDataService: RegisterTypeABService
    ) {}

  ngOnInit() {
    this.getUbications();
    this.getRegisterTypes();
  }

  getRegisterTypes() {
    this.register_typeDataService.get().then( r => {
       this.register_types = r as RegisterType[];
       this.getRegisterTypesAB();
    }).catch( e => { console.log(e); });
  }
 
  getRegisterTypesAB() {
    this.register_typeABDataService.get().then( r => {
       this.register_types_AB = r as RegisterTypeAB[];
    }).catch( e => { console.log(e); });
  }
   
  checkRuc() {
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      this.SRIOK = false;
      this.mostrarRegistros = false;
      this.mostrarEstablecimientos = false;
      this.ruc.baised_accounting = false;
      this.ruc.tax_payer_type_id = 1;
      return;
    }
    if (!this.consumoRuc) {
      this.consumoRuc = true;
      this.rucValidated = true;
      this.dinardapDataService.get_RUC(this.ruc.number).then( r => {
         this.SRIOK = true; 
         this.rucValidated = true;
         const itemsDetalles_SRI_RUC = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
         const itemsDetalles_SRI_RUC_COMPLETO = r.sri_ruc_completo.original.entidades.entidad;
         this.rucData = '';
         let datosGenerales = '';
         let datosRL = '';
         let datosAE = '';
         let datosContactoSRI = '';
         let RL_name = '';
         let RZ_name = '';
         itemsDetalles_SRI_RUC_COMPLETO.forEach(entidad => {
            if (entidad.nombre == 'Actividad Economica') {
               const AE = entidad.filas.fila.columnas.columna;
               AE.forEach(element => {
                  if (element.campo == 'actividadGeneral') {
                     datosAE += '<strong>Actividad Económica: </strong> ' + element.valor + '<br/>';
                  }
               });
            }
            if (entidad.nombre == 'Contribuyente Datos Completo') {
               const DC = entidad.filas.fila.columnas.columna;
               DC.forEach(element => {
                  if (element.campo == 'razonSocial') {
                     datosGenerales += '<strong>Razón Social: </strong> ' + element.valor + '<br/>';
                     RZ_name = element.valor;
                     this.razon_social = element.valor;
                  }
                  if (element.campo == 'email') {
                     if (JSON.stringify(element.valor) !== '{}') {
                        datosContactoSRI += '<strong>Correo Electrónico - Registrado en SRI: </strong> ' + element.valor + '<br/>';
                     }
                  }
                  if (element.campo == 'telefonoDomicilio') {
                     if (JSON.stringify(element.valor) !== '{}') {
                        datosContactoSRI += '<strong>Teléfono Domicilio - Registrado en SRI: </strong> ' + element.valor + '<br/>';
                     }
                  }
               });
            }
            if (entidad.nombre == 'Representante Legal') {
               const RL = entidad.filas.fila.columnas.columna;
               RL.forEach(element => {
                  if (element.campo == 'identificacion') {
                     datosRL += '<strong>Identificación Representante Legal: </strong> ' + element.valor + '<br/>';
                     if (JSON.stringify(element.valor) !== '{}') {
                        this.ruc.person_representative.identification = element.valor;
                     }
                  }
                  if (element.campo == 'nombre') {
                     RL_name = element.valor;
                     datosRL += '<strong>Nombre Representante Legal: </strong> ' + element.valor + '<br/>';
                  }
               });
            }
         });
         itemsDetalles_SRI_RUC.forEach(element => {
            if (element.campo == 'estadoContribuyente') {
               datosGenerales += '<strong>Estado Contribuyente: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'fechaInscripcionRuc') {
               datosGenerales += '<strong>Fecha de Inscripción del RUC: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'fechaActualizacion') {
               datosGenerales += '<strong>Fecha de Actualización: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'obligado') {
               if (element.valor == 'N') {
                  this.ruc.baised_accounting = false;
                  datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> NO<br/>';
               } else {
                  this.ruc.baised_accounting = true;
                  datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> SI<br/>';
               }
            }
            if (element.campo == 'personaSociedad') {
               if (element.valor == 'PNL') {
                  this.ruc.tax_payer_type_id = 1;
               } else {
                  this.ruc.tax_payer_type_id = 2;
               }
               datosGenerales += '<strong>Tipo de Contribuyente: </strong> ' + element.valor + '<br/>';
            }
            this.rucData = datosGenerales + datosAE + datosContactoSRI;
            if (this.ruc.tax_payer_type_id != 1) {
               this.rucData += datosRL;
            } else {
            }
         });
      }).catch( e => {
         console.log(e);
         this.rucData = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
         this.consumoRuc = false;
         this.SRIOK = false;
      });
   }
  }

  getRegisterCategory(id: number, activity: string): String {
    let toReturn: String = '';
    let fatherCode: String = '';
    if (activity == 'ALOJAMIENTO') {
       this.register_types.forEach(register_type => {
          if (register_type.id == id) {
           toReturn = register_type.name;
           fatherCode = register_type.father_code;
          }
       });
       this.register_types.forEach(register_type => {
          if (register_type.code == fatherCode) {
             toReturn = register_type.name + ' - ' + toReturn;
          }
       });
    }
    if (activity == 'ALIMENTOS Y BEBIDAS') {
       this.register_types_AB.forEach(register_type => {
          if (register_type.id == id) {
           toReturn = register_type.name;
           if (register_type.name == 'Pendiente') {
              toReturn = "No Cumple Inspección (No Turístico)";
           }
           fatherCode = register_type.father_code;
          }
       });
       this.register_types_AB.forEach(register_type => {
          if (register_type.code == fatherCode) {
             toReturn = register_type.name + ' - ' + toReturn;
          }
       });
    }
    return toReturn;
  }

  onCellClick(event) {
    this.rows.forEach(row => {
      if (row == event.row) {
         row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
         this.establishment_id_selected = row.id;
         this.registersAlojamiento = [];
         this.registersAlimentosBebidas = [];
         this.bitacoraAlimentosBebidas.forEach(bitElement => {
           if ((bitElement.register_data.length > 0) && (bitElement.establishment.id == this.establishment_id_selected)) {
             bitElement.register_data.forEach(element => {
              let existe = false;
              this.registersAlimentosBebidas.forEach(e1 => {
                if (e1.id == element.id) {
                  existe = true;
                }
              }); 
              if (!existe) {
                this.registersAlimentosBebidas.push(element);
              }
             });
           }
         });
         this.bitacoraAlojamiento.forEach(bitElement => {
           if ((bitElement.register_data.length > 0) && (bitElement.establishment.id == this.establishment_id_selected)) {
           bitElement.register_data.forEach(element => {
              let existe = false;
              this.registersAlojamiento.forEach(e1 => {
                if (e1.id == element.id) {
                  existe = true;
                }
              }); 
              if (!existe) {
                this.registersAlojamiento.push(element);
              }
           });
           }
         });
         this.buildDataTableRegisters();
      } else {
        row.selected = '';
      }
   });
  }

  buildDataTableRegisters() {
    this.mostrarRegistros = true;
    this.columnsRegisters = [
      {title: '', name: 'selected'},
      {title: 'Actividad', name: 'actividad'},
      {title: 'Clasificación - Categoría', name: 'category'},
      {title: 'Número de Registro', name: 'code'},
      {title: 'Trámite', name: 'tramit'},
   ];
   const data = [];
   this.registersAlojamiento.forEach(item => {
      data.push({
        selected: '',
        id: item.id,
        actividad: 'ALOJAMIENTO',
        code: item.code,
        category: this.getRegisterCategory(item.register_type_id, 'ALOJAMIENTO').toString().toUpperCase(),
        tramit: 'PRUEBA',
      });
   });
   this.registersAlimentosBebidas.forEach(item => {
    data.push({
      selected: '',
      id: item.id,
      actividad: 'ALIMENTOS Y BEBIDAS',
      code: item.code,
      category: this.getRegisterCategory(item.register_type_id, 'ALIMENTOS Y BEBIDAS').toString().toUpperCase(),
      tramit: 'PRUEBA',
    });
   });
   this.dataRegisters = data;
   this.onChangeTableRegisters(this.config);
  }

  buscarBitacora() {
    this.bitacoraAlojamiento = [];
    this.bitacoraAlimentosBebidas = [];
    this.registerDataService.bitacora_states(this.ruc.number).then( r => {
      const resp = r as any[];
      resp.forEach(element => {
        this.bitacoraAlojamiento.push(element);
      });
      this.registerABDataService.bitacora_states(this.ruc.number).then( r => {
        const resp = r as any[];
        resp.forEach(element => {
          this.bitacoraAlimentosBebidas.push(element);
        });
        this.mostrarEstablecimientos = true;
        this.buildDataTable();
      }).catch( e => { console.log(e);});
    }).catch( e => { console.log(e);});
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
    }).catch( e => { console.log(e); });
  }

  buildDataTable() {
    this.columns = [
       {title: '', name: 'selected'},
       {title: 'Número de Establecimiento', name: 'ruc_code_id'},
       {title: 'Nombre Comercial', name: 'establishment'},
       {title: 'Provincia', name: 'provincia'},
       {title: 'Cantón', name: 'canton'},
       {title: 'Parroquia', name: 'parroquia'},
       {title: 'Dirección', name: 'address'},
    ];
    const data = [];
    this.bitacoraAlojamiento.forEach(bitElement => {
      let existe = false;
      this.establishments.forEach(establishment => {
        if (establishment.id == bitElement.establishment.id) {
          existe = true;
        }
      });
      if (!existe) {
        if (bitElement.register_data.length > 0) {
          this.establishments.push(bitElement.establishment);
        }
      }
    });
    this.bitacoraAlimentosBebidas.forEach(bitElement => {
      let existe = false;
      this.establishments.forEach(establishment => {
        if (establishment.id == bitElement.establishment.id) {
          existe = true;
        }
      });
      if (!existe) {
        if (bitElement.register_data.length > 0) {
          this.establishments.push(bitElement.establishment);
        }
      }
    });
    this.establishments.forEach(item => {
        let provincia = new Ubication();
        let canton = new Ubication();
        let parroquia = new Ubication();
        let zonal = new Ubication();
        this.ubications.forEach(element => {
          if (element.id == item.ubication_id) {
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
        data.push({
          selected: '',
          id: item.id,
          provincia: provincia.name,
          canton: canton.name,
          parroquia: parroquia.name,
          ruc_code_id: item.ruc_code_id,
          establishment: item.commercially_known_name,
          address: item.address_main_street + ' ' + item.address_number + ' ' + item.address_secondary_street,
        });
    });
    this.data = data;
    this.onChangeTable(this.config);
  }

  onChangeTable(config: any, event?): any {
    const page: any = {page: this.currentPageEstablishments, itemsPerPage: this.recordsByPageEstablishments};
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

   onChangeTableRegisters(config: any, event?): any {
    const page: any = {page: this.currentPageRegisters, itemsPerPage: this.recordsByPageRegisters};
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const filteredData = this.changeFilterRegisters(this.dataRegisters, this.config);
    const sortedData = this.changeSortRegisters(filteredData, this.config);
    this.rowsRegisters = page && config.paging ? this.changePageRegisters(page, sortedData) : sortedData;
   }
 
   changeFilterRegisters(data: any, config: any): any {
    this.rowsRegisters.forEach(row => {
       row.selected = '';
    });
    let filteredData: Array<any> = data;
    this.columnsRegisters.forEach((column: any) => {
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
      this.columnsRegisters.forEach((column: any) => {
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
 
   changeSortRegisters(data: any, config: any): any {
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
 
   changePageRegisters(page: any, data: Array<any> = this.dataRegisters):Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
   }

   onCellClickRegisters(event) {
    console.log(event);
    console.log(this.registersAlojamiento);
   }
}

