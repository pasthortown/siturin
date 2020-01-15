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
  
  constructor(private consultorDataService: ConsultorService,
    private router: Router, 
    private modalService: NgbModal,
    private toastr: ToastrManager,
    private dinardapDataService: DinardapService) {}
  
  ngOnInit() {
    this.user = new User();
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
        itemsDetalles_SRI_RUC_COMPLETO.forEach(entidad => {
           if (entidad.nombre == 'Actividad Economica') {
              const AE = entidad.filas.fila.columnas.columna;
              AE.forEach(element => {
                 if (element.campo == 'actividadGeneral') {
                  datosGenerales += '<strong>Actividad Económica: </strong> ' + element.valor + '<br/>';
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
                    datosGenerales += '<strong>Nombre Representante Legal: </strong> ' + element.valor + '<br/>';
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
        });
     }).catch( e => {
        console.log(e);
        this.rucData = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
        this.consumoRuc = false;
        this.SRIOK = false;
     });
   }
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
