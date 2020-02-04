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
  bitacora: any[] = [];
  mostrarEstablecimientos = false;
  establishments: any[] = [];
  currentPageEstablishments = 0;
  recordsByPageEstablishments = 0;
  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  rows = [];
  columns = [];
  data = [];
  
  constructor(private dinardapDataService: DinardapService,
    private registerABDataService: RegisterABService,
    private registerDataService: RegisterService
    ) {}

  ngOnInit() {}

  checkRuc() {
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
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

  buscarBitacora() {
    this.bitacora = [];
    this.registerDataService.bitacora_states(this.ruc.number).then( r => {
      const resp = r as any[];
      resp.forEach(element => {
        this.bitacora.push(element);
      });
      this.registerABDataService.bitacora_states(this.ruc.number).then( r => {
        const resp = r as any[];
        resp.forEach(element => {
          this.bitacora.push(element);
        });
        this.mostrarEstablecimientos = true;
        this.buildDataTable();
      }).catch( e => { console.log(e);});
    }).catch( e => { console.log(e);});
  }

  
  mostrarBitacora() {
    console.log(this.bitacora);
  }

  // buildDataTable() {
  //   this.columns = [
  //      {title: '', name: 'selected'},
  //      {title: 'Número de RUC', name: 'number'},
  //      {title: 'Número de Establecimiento', name: 'ruc_code_id'},
  //      {title: 'Nombre Comercial', name: 'establishment'},
  //      {title: 'Sistema de Origen', name: 'system_source'},
  //      {title: 'Bandeja', name: 'status'},
  //      {title: 'Actividad', name: 'actividad'},
  //      {title: 'Provincia', name: 'provincia'},
  //      {title: 'Cantón', name: 'canton'},
  //      {title: 'Parroquia', name: 'parroquia'},
  //      {title: 'Dirección', name: 'address'},
  //      {title: 'Clasificación - Categoría', name: 'category'},
  //      {title: 'Fecha de Solicitud', name: 'created_at'},
  //      {title: 'Número de Registro', name: 'code'},
  //   ];
  //   const data = [];
  //   this.registers_mintur.forEach(item => {
  //      let addRegister = false;
  //       this.myAbleUbications.forEach( ub => {
  //          if (ub.id == item.establishment.ubication_id) {
  //             addRegister = true;
  //          }
  //       });
  //       if (addRegister) {
  //          let date_assigment_alert = '';
  //          let date1 = new Date();
  //          const registerState = this.getRegisterState(item.states.state_id);
  //          if (registerState.search('Aprobado') == 0) {
  //             date1 = new Date(item.states.updated_at);
  //          }
  //          if (registerState.search('Negado') == 0) {
  //             date1 = new Date(item.states.updated_at);
  //          }
  //          const date2 = new Date(item.register.created_at);
  //          const diffTime = Math.abs(date2.getTime() - date1.getTime());
  //          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //          if (diffDays < 7) {
  //             date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-success">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
  //          }
  //          if (diffDays >= 7 && diffDays <= 10) {
  //             date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-warning">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
  //          }
  //          if (diffDays > 10) {
  //             date_assigment_alert = '<div class="col-12 text-center"><span class="badge badge-danger">&nbsp;' + diffDays.toString() + '&nbsp;</span></div>';
  //          }
  //          let provincia = new Ubication();
  //          let canton = new Ubication();
  //          let parroquia = new Ubication();
  //          let zonal = new Ubication();
  //          this.ubications.forEach(element => {
  //             if (element.id == item.establishment.ubication_id) {
  //             parroquia = element;
  //             }
  //          });
  //          this.ubications.forEach(element => {
  //             if (element.code == parroquia.father_code) {
  //             canton = element;
  //             }
  //          });
  //          this.ubications.forEach(element => {
  //             if (element.code == canton.father_code) {
  //             provincia = element;
  //             }
  //          });
  //          this.ubications.forEach(element => {
  //             if (element.code == provincia.father_code) {
  //             zonal = element;
  //             }
  //          });
  //          const creacion = new Date(item.register.created_at.toString());
  //          let thiscategory: String =  '';
  //          if (item.register_data_on_catastro.classification == '') {
  //             thiscategory = this.getRegisterCategory(item.register.register_type_id, item.activity).toString();
  //          } else {
  //             thiscategory = item.register_data_on_catastro.classification.toString() + ' - ' + item.register_data_on_catastro.category.toString();
  //          }
  //          data.push({
  //             selected: '',
  //             date_assigment_alert: date_assigment_alert,
  //             number: item.ruc.number,
  //             registerId: item.register.id,
  //             actividad: item.activity,
  //             provincia: provincia.name,
  //             canton: canton.name,
  //             parroquia: parroquia.name,
  //             ruc_code_id: item.establishment.ruc_code_id,
  //             establishment: item.establishment.commercially_known_name,
  //             address: item.establishment.address_main_street + ' ' + item.establishment.address_number + ' ' + item.establishment.address_secondary_street,
  //             created_at: creacion.toLocaleDateString(),
  //             code: item.register.code,
  //             category: thiscategory.toUpperCase(),
  //             catastro_category: item.register_data_on_catastro.category.toUpperCase(),
  //             catastro_classification: item.register_data_on_catastro.classification.toUpperCase(),
  //             system_source: item.register_data_on_catastro.system_source,
  //             status: registerState,
  //             status_id: item.states.state_id,
  //          });
  //       }
  //   });
  //   this.data = data;
  //   this.onChangeTable(this.config);
  // }
}

