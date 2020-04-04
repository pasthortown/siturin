import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ruc-data',
  templateUrl: './ruc-data.component.html',
  styleUrls: ['./ruc-data.component.scss']
})
export class RucDataComponent implements OnInit {  
  @Input('ruc_number') ruc_number: String = '';

  ruc: Ruc = new Ruc();

  rucValidated = false;
  consumoRuc = false;
  SRIOK = false;
  
  rucData = 'CONECTÁNDOSE AL SRI...';
  superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
  
  razon_social = '';

  constructor(private dinardapDataService: DinardapService) {
    
  }

  ngOnInit() {
    this.ruc = new Ruc();
    this.ruc.number = this.ruc_number;
  }

  checkRuc() {
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      this.ruc.baised_accounting = false;
      this.ruc.tax_payer_type_id = 1;
      return;
    }
    if (this.consumoRuc && this.SRIOK) {
      return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRuc) {
      this.consumoRuc = true;
      this.rucValidated = true;
      this.dinardapDataService.get_super_cias(this.ruc.number).then( r => {
         this.superciasData = '';
         if (r.companias !== 0) {
            const companias = r.companias.original.entidades.entidad;
            companias.forEach(entidad => {
               if (entidad.nombre == 'Superintendencia de Compañias Datos Companía') {
                  entidad.filas.fila.columnas.columna.forEach(element => {
                     if (element.campo == 'expediente') {
                        this.superciasData += '<strong>Número de Expediente: </strong> ' + element.valor + '<br/>';
                        if (JSON.stringify(element.valor) !== '{}') {
                           this.ruc.group_given.register_code = element.valor;
                         }
                     }
                     if (element.campo == 'objeto_social') {
                        this.superciasData += '<strong>Objeto Social: </strong> ' + element.valor + '<br/>';
                     }   
                  });
               }
            });  
         }
      }).catch( e => { console.log(e); });
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
                   this.razon_social = element.valor;
                     datosGenerales += '<strong>Razón Social: </strong> ' + element.valor + '<br/>';
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
                        // this.consumoCedulaRepresentanteLegal = false;
                        // this.REGCIVILREPRESENTANTELEGALOK = false;
                        // this.checkIdentificationRepresentant();
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
}
