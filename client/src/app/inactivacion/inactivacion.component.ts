import { ConsultorService } from './../services/negocio/consultor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../models/profile/User';
import { DinardapService } from '../services/negocio/dinardap.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Ruc } from '../models/BASE/Ruc';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { saveAs } from 'file-saver/FileSaver';
import { StateService } from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { State } from 'src/app/models/ALOJAMIENTO/State';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { RegisterTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/registertype.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { Ubication } from 'src/app/models/BASE/Ubication';

@Component({
    selector: 'inactivacion-login',
    templateUrl: './inactivacion.component.html',
    styleUrls: ['./inactivacion.component.scss']
})
export class InactivacionComponent implements OnInit {

  busy: Promise<any>;
  user: User;
  ruc: Ruc = new Ruc();
  isRepresentantLegal = false;
  isRucOwner = false;
  identificationValidated = false;
  estados_tramites: State[];
  consumoCedula = false;
  fechaExpedicion = 'porValidar';
  fechaExpiracion = 'porValidar';
  fechaNacimiento = 'porValidar';
  fechaIngresada = '';
  razon_social = '';
  REGCIVILOK = false;
  fechaNombramientoOK = false;
  representanteCedulaData = 'CONECTÁNDOSE AL REGISTRO CIVIL...';
  identidadConfirmada = false;
  establishment_selected: Establishment = new Establishment();
  CedulaData = '';
  aleatorio = 0;
  cedulaNombre = '';
  rucValidated = false;
  consumoRuc = false;
  identificationRepresentativePersonValidated = false;
  rucData = '';
  rucInactive = true;
  SRIOK = false;
  esperando = false;
  emailContactValidated = false;
  cuentaInterno = false;
  mainPhoneValidated: Boolean = false;
  secondaryPhoneValidated: Boolean = false;
  idTramiteEstadoFilter = 0;
  tramite = '-'; 
  estados = [];
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
  registers_mintur = [];
  registerMinturSelected: any = null;
  register_types: any[] = [];
  states: State[] = [];
  specific_states: State[];
  estado_tramite_selected_code: String = '1';
  zonalEstablishmentSelectedCode = '-';
  provinciaEstablishmentSelectedCode = '-';
  cantonEstablishmentSelectedCode = '-';
  zonalesEstablishment: Ubication[] = []; 
  provinciasEstablishment: Ubication[] = [];
  cantonesEstablishment: Ubication[];
  parroquiasEstablishment: Ubication[];
  addressEstablishmentValidated = false;
  
  constructor(private consultorDataService: ConsultorService,
    private router: Router, 
    private modalService: NgbModal,
    private toastr: ToastrManager,
    private stateDataService: StateService,
    private catastroRegisterDataService: CatastroRegisterService,
    private register_typeDataService: RegisterTypeService,
    private ubicationDataService: UbicationService,
    private dinardapDataService: DinardapService) {}
  
  ngOnInit() {
    this.user = new User();
    this.getTramiteStates();
  }

  getStates() {
   this.states = [];
   this.stateDataService.get().then( r => {
      this.states = r as State[];
      this.getRegisterTypes();
      this.getSpecificStates();
   }).catch( e => { console.log(e); });
  }

  getSpecificStates() {
   this.specific_states = [];
   this.states.forEach(element => {
      if (element.father_code == this.estado_tramite_selected_code) {
         this.specific_states.push(element);
      }
   });
  }

  getZonalesEstablishment() {
   this.zonalesEstablishment = [];
   this.provinciasEstablishment = [];
   this.cantonesEstablishment = [];
   this.parroquiasEstablishment = [];
   this.zonalEstablishmentSelectedCode = '-';
   this.provinciaEstablishmentSelectedCode = '-';
   this.cantonEstablishmentSelectedCode = '-';
   this.establishment_selected.ubication_id = 0;
   this.ubicationDataService.get_filtered('-').then( zonales => {
      this.zonalesEstablishment = zonales as Ubication[];
      zonales.forEach(zonal => {
         this.ubicationDataService.get_filtered(zonal.code).then( r => {
            const provincias = r as Ubication[];
            provincias.forEach(provincia => {
               this.provinciasEstablishment.push(provincia);
            });
            this.provinciasEstablishment.sort(function(a, b) {
               const nameA = a.name.toLowerCase().trim();
               const nameB = b.name.toLowerCase().trim();
               if (nameA < nameB) {
                  return -1;
               }
               if (nameA > nameB) {
                  return 1;
               }
               return 0;
            });
         }).catch( e => { console.log(e) });
      });
   }).catch( e => { console.log(e) });
  }

  getCantonesEstablishment() {
   if (this.provinciaEstablishmentSelectedCode == '-') {
      return;
   }
   this.provinciasEstablishment.forEach(provincia => {
      if(provincia.code == this.provinciaEstablishmentSelectedCode){
         this.zonalEstablishmentSelectedCode = provincia.father_code.toString();
         this.establishment_selected.address_map_latitude = provincia.gmap_reference_latitude;
         this.establishment_selected.address_map_longitude = provincia.gmap_reference_longitude;
      }
   });
   this.cantonesEstablishment = [];
   this.parroquiasEstablishment = [];
   this.cantonEstablishmentSelectedCode = '-';
   this.establishment_selected.ubication_id = 0;
   this.ubicationDataService.get_filtered(this.provinciaEstablishmentSelectedCode).then( r => {
      this.cantonesEstablishment = r as Ubication[];
   }).catch( e => { console.log(e) });
  }

  getRegisterTypes() {
   this.register_typeDataService.get().then( r => {
      this.register_types = r as RegisterType[];
      this.getRegistersMintur();
   }).catch( e => { console.log(e); });
  }

  getRegistersMintur() {
   this.registers_mintur = [];
   this.registerMinturSelected = new Register();
   this.catastroRegisterDataService.searchByRuc(this.ruc.number.toString()).then( r => {
      this.registers_mintur = r;
      this.buildDataTable();
   }).catch( e => console.log(e) );
  }

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

  openDialog(content) {
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       
    }), ( r => {}));
  }

  checkEmail(): Boolean {
    const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email.toString());
    this.emailContactValidated = isOk;
    if (!isOk) {
       this.user.identification = '';
       this.fechaIngresada = '';
       this.user.name = '';
    }
    if (this.user.email.split('@')[1] == 'turismo.gob.ec') {
       this.cuentaInterno = true;
       this.emailContactValidated = false;
    } else {
      this.cuentaInterno = false;
    }
    return this.emailContactValidated;
  }

  fechasNombramiento() {
    const today = new Date();
    const min = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    if(typeof this.ruc.person_representative_attachment.assignment_date === 'undefined') {
       return;
    }
    if (new Date(this.ruc.person_representative_attachment.assignment_date.toString()) > today || new Date(this.ruc.person_representative_attachment.assignment_date.toString()) < min) {
       this.fechaNombramientoOK = false;
    }else {
       this.fechaNombramientoOK = true;
    }
    return {max: today, min: min};
   }
  
  checkCedula() {
    this.user.identification = this.user.identification.replace(/[^\d]/, '');
    if (this.user.identification.length !== 10) {
       this.identificationValidated = false;
       this.consumoCedula = false;
       this.fechaIngresada = '';
       this.identidadConfirmada = false;
       return;
    }
    if (this.consumoCedula && this.REGCIVILOK) {
       return;
    }
    this.CedulaData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al Registro Civil...</strong></div>';
    if (!this.consumoCedula) {
       this.identificationValidated = true;
       this.consumoCedula = true;
       this.dinardapDataService.get_cedula(this.user.identification).then( r => {
          const registros = r.original.entidades.entidad.filas.fila.columnas.columna;
          this.CedulaData = '';
          this.REGCIVILOK = true;
          let sorteo = [];
          registros.forEach(element => {
             if (element.campo === 'cedula') {
                if (element.valor === this.user.identification) {
                  this.toastr.successToastr('La cédula ingresada es correcta.', 'Registro Civil');
                  this.identificationValidated = true;
                } else {
                  this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
                  this.identificationValidated = false;
                }
             }
             if (this.identificationValidated) {
                if (element.campo === 'nombre') {
                   this.user.name= element.valor;
                }
                if (element.campo === 'fechaNacimiento') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(0);
                   }
                   this.fechaNacimiento = element.valor;
                }
                if (element.campo === 'fechaExpiracion') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(1);
                   } 
                  this.fechaExpiracion = element.valor;
                }
                if (element.campo === 'fechaExpedicion') {
                  if (JSON.stringify(element.valor) !== '{}') {
                     sorteo.push(2);
                   }
                   this.fechaExpedicion = element.valor;
                }
             }
          });
          const indice = Math.floor(Math.random() * sorteo.length);
          this.aleatorio = sorteo[indice];
       }).catch( e => {
         this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
         this.CedulaData = '<div class="alert alert-danger" role="alert">El Registro Civil, no respondió. Vuelva a intentarlo.</div>';
         this.REGCIVILOK = false;
         this.SRIOK = false;
         this.consumoCedula = false;
         this.identificationValidated = false;
       });
    }
   }

   checkTelefonoPrincipal(): Boolean {
    if (this.user.main_phone_number == null) {
      this.user.main_phone_number = '';
    }
     this.user.main_phone_number = this.user.main_phone_number.replace(/[^\d]/, '');
    if (this.user.main_phone_number.length < 9) {
       this.mainPhoneValidated = false;
       return false;
    }
    this.mainPhoneValidated = true;
    return true;
   }
 
   checkTelefonoSecundario(): Boolean {
     if (this.user.secondary_phone_number == null) {
       this.user.secondary_phone_number = '';
     }
    this.user.secondary_phone_number = this.user.secondary_phone_number.replace(/[^\d]/, '');
    if (this.user.secondary_phone_number.length > 0 && this.user.secondary_phone_number.length < 9) {
       this.secondaryPhoneValidated = false;
       return false;
    }
    this.secondaryPhoneValidated = true;
    return true;
   }

   confirmarIdentidad() {
    if (this.fechaIngresada == '') {
      return false;
    }
    if (this.aleatorio == 0) {
       if( this.fechaIngresada == this.fechaNacimiento) {
          this.identidadConfirmada = true;
          return true;
       }
    }
    if (this.aleatorio == 1) {
       if( this.fechaIngresada == this.fechaExpiracion) {
          this.identidadConfirmada = true;
          return true;
       }
    }
    if (this.aleatorio == 2) {
       if( this.fechaIngresada == this.fechaExpedicion) {
          this.identidadConfirmada = true;
          return true;
       }
    }
    this.identidadConfirmada = false;
    this.cedulaNombre = '';
    return false;
  }

  checkRuc() {
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      return;
    }
    if (this.consumoRuc && this.SRIOK) {
       return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRuc && this.identificationValidated) {
      this.rucValidated = true;
      this.consumoRuc = true;
      this.rucInactive = true;
      this.dinardapDataService.get_RUC(this.ruc.number).then( r => {
        this.SRIOK = true; 
        this.rucValidated = true;
        const itemsDetalles_SRI_RUC = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
        const itemsDetalles_SRI_RUC_COMPLETO = r.sri_ruc_completo.original.entidades.entidad;
        this.establishment_selected.ruc_code_id = '-';
        this.rucData = '';
        let datosGenerales = '';
        let datosRL = '';
        itemsDetalles_SRI_RUC_COMPLETO.forEach(entidad => {
           if (entidad.nombre == 'Actividad Economica') {
              const AE = entidad.filas.fila.columnas.columna;
              AE.forEach(element => {
                 if (element.campo == 'actividadGeneral') {
                 }
              });
           }
           if (entidad.nombre == 'Contribuyente Datos Completo') {
              const DC = entidad.filas.fila.columnas.columna;
              DC.forEach(element => {
                 if (element.campo == 'razonSocial') {
                    this.razon_social = element.valor;
                    datosGenerales += '<strong>Razón Social: </strong> ' + element.valor + '<br/>';
                 }
                 if (element.campo == 'email') {
                    if (JSON.stringify(element.valor) !== '{}') {
                    }
                 }
                 if (element.campo == 'telefonoDomicilio') {
                    if (JSON.stringify(element.valor) !== '{}') {
                    }
                 }
              });
           }
           if (entidad.nombre == 'Representante Legal') {
              const RL = entidad.filas.fila.columnas.columna;
              RL.forEach(element => {
                 if (element.campo == 'identificacion') {
                    if (JSON.stringify(element.valor) !== '{}') {
                       this.ruc.person_representative.identification = element.valor;
                       this.checkIdentificationRepresentant();
                    }
                 }
                 if (element.campo == 'nombre') {
                   datosRL += '<strong>Nombre Representante Legal: </strong> ' + element.valor + '<br/>';
                 }
              });
           }
        });
        itemsDetalles_SRI_RUC.forEach(element => {
           if (element.campo == 'estadoContribuyente') {
              if (element.valor === 'ACTIVO') {
                 this.rucInactive = false;
              } else {
                 this.rucInactive = true;
              }
           }
           if (element.campo == 'fechaInscripcionRuc') {
           }
           if (element.campo == 'fechaActualizacion') {
           }
           if (element.campo == 'obligado') {
              if (element.valor == 'N') {
                 this.ruc.baised_accounting = false;
              } else {
                 this.ruc.baised_accounting = true;
              }
           }
           if (element.campo == 'personaSociedad') {
              if (element.valor == 'PNL') {
                 this.ruc.tax_payer_type_id = 1;
                 this.checkRazonSocial();
              } else {
                 this.ruc.tax_payer_type_id = 2;
              }
           }
           this.rucData = datosGenerales;
           if (this.ruc.tax_payer_type_id != 1) {
            this.rucData += datosRL;
           }
           if (this.SRIOK) {
            this.startToGetInformationRegisters();
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
   const data = [];
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
      data.push(element);
   });
   dataSIETE.forEach(itemSIETE => {
      let existeSITURIN = false;
      dataSITURIN.forEach(itemSITURIN => {
         if (itemSITURIN.establishment_ruc_code == itemSIETE.establishment_ruc_code) {
          existeSITURIN = true;
         }
      });
      if (!existeSITURIN) {
         data.push(itemSIETE);
      }
   });
   this.data = data;
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
     //AQUI
  }

  startToGetInformationRegisters() {
   this.getStates();
  }
   
  validateNombramiento(): Boolean {
    if(this.ruc.tax_payer_type_id <= 1) {
       return true;
    }
    return !(this.ruc.person_representative_attachment.person_representative_attachment_file_name == '');
  }
  
  downloadFile(file: any, type: any, name: any) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type });
    saveAs(blob, name);
  }

  descargarNombramiento() {
    this.downloadFile(
       this.ruc.person_representative_attachment.person_representative_attachment_file,
       this.ruc.person_representative_attachment.person_representative_attachment_file_type,
       this.ruc.person_representative_attachment.person_representative_attachment_file_name);
  }

  borrarNombramiento() {
    this.ruc.person_representative_attachment.person_representative_attachment_file = '';
    this.ruc.person_representative_attachment.person_representative_attachment_file_type = '';
    this.ruc.person_representative_attachment.person_representative_attachment_file_name = '';
   }

   CodeFilePersonRepresentativeAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.ruc.person_representative_attachment.person_representative_attachment_file_name = file.name;
          this.ruc.person_representative_attachment.person_representative_attachment_file_type = file.type;
          this.ruc.person_representative_attachment.person_representative_attachment_file = reader.result.toString().split(',')[1];
       };
    }
   }

   checkRazonSocial() {
    this.isRucOwner = false;
    if (this.razon_social == this.user.name) {
      this.isRucOwner = true;
    }
   }

  checkIdentificationRepresentant() { 
    this.isRepresentantLegal = false; 
    if (this.ruc.person_representative.identification == this.user.identification) {
      this.isRepresentantLegal = true;
    }
   }
 
}
