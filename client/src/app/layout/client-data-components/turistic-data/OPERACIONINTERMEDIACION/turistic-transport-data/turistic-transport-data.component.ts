import { SIITService } from './../../../../../services/negocio/siit.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TuristicTransport } from './../../../../../models/OPERACIONINTERMEDIACION/TuristicTransport';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turistic-transport-data',
  templateUrl: './turistic-transport-data.component.html',
  styleUrls: ['./turistic-transport-data.component.scss']
})
export class TuristicTransportDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('classification_selected_code') classification_selected_code: string = '';
  
  companiaTransporteSwitch = false;
  newTuristicTransport: TuristicTransport = new TuristicTransport();

  rucValidatedTuristicTransport = false;

  SRIOKTuristicTransport = false;
  consumoRucTuristicTransport = false;

  rucDataTuristicTransport = 'CONECTÁNDOSE AL SRI...';

  constructor(private toastr: ToastrManager, 
    private modalService: NgbModal,
    private dinardapDataService: DinardapService,
    private siitDataService: SIITService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    if (!this.editable) {
      this.validateCompaniasSIIT();
    }
  }
  
  validateCompaniasSIIT() {
    // aqui web service para validar todos las companias de transporte
    // DEL SIIT O SIETE O DONDE SEA TRAER NUMERO DE CREDENCIAL Y FECHA DE EMISION
  }

  addCompaniaTransporte(content) {
    this.SRIOKTuristicTransport = false;
    this.consumoRucTuristicTransport = false;
    this.newTuristicTransport = new TuristicTransport();
    this.rucValidatedTuristicTransport = false;
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
      if ( response === 'Guardar click' ) {
        this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Compañía de Transporte');
        this.register.transport_companies.push(this.newTuristicTransport);
      }
    }), ( r => {}));
  }
 
  editCompaniaTransporte(content, transport_company) {
    let initialData = transport_company;
    this.SRIOKTuristicTransport = false;
    this.consumoRucTuristicTransport = false;
    this.newTuristicTransport = transport_company;
    this.rucValidatedTuristicTransport = false;
    this.checkRucTuristicTransport();
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Compañía de Transporte');
          this.register.transport_companies.forEach(element => {
             if (element == initialData) {
                element = this.newTuristicTransport;
             }
          });
       }
    }), ( r => {}));
  }
 
  deleteCompaniaTransporte(transport_company) {
    const new_turistic_transports = [];
    this.SRIOKTuristicTransport = false;
    this.consumoRucTuristicTransport = false;
    this.register.transport_companies.forEach(element => {
       if (element != transport_company) {
          new_turistic_transports.push(element);
       }
    });
    this.register.transport_companies = new_turistic_transports;
    this.toastr.successToastr('Compañía de Transporte removida satisfactoriamente.', 'Compañía de Transporte');
  }
  
  checkRucTuristicTransport() {
    this.newTuristicTransport.ruc = this.newTuristicTransport.ruc.replace(/[^\d]/, '');
    if (this.newTuristicTransport.ruc.length !== 13) {
      this.rucValidatedTuristicTransport = false;
      this.consumoRucTuristicTransport = false;
      return;
    }
    if (this.consumoRucTuristicTransport && this.SRIOKTuristicTransport) {
      return;
    }
    this.rucDataTuristicTransport = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRucTuristicTransport) {
      this.consumoRucTuristicTransport = true;
      this.rucValidatedTuristicTransport = true;
      this.dinardapDataService.get_RUC(this.newTuristicTransport.ruc).then( r => {
        this.SRIOKTuristicTransport = true; 
        this.rucValidatedTuristicTransport = true;
        const itemsDetalles_SRI_RUC = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
        const itemsDetalles_SRI_RUC_COMPLETO = r.sri_ruc_completo.original.entidades.entidad;
        this.rucDataTuristicTransport = '';
        let datosGenerales = '';
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
                this.newTuristicTransport.social_name = element.valor;
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
        });
        itemsDetalles_SRI_RUC.forEach(element => {
          if (element.campo == 'estadoContribuyente') {
            datosGenerales += '<strong>Estado Contribuyente: </strong> ' + element.valor + '<br/>';
          }
          if (element.campo == 'personaSociedad') {
            
            if (element.valor == 'PNL') {
              this.newTuristicTransport.tax_payer_type_id = 1;
            } else {
              this.newTuristicTransport.tax_payer_type_id = 2;
            }
            datosGenerales += '<strong>Tipo de Contribuyente: </strong> ' + element.valor + '<br/>';
          }
          this.rucDataTuristicTransport = datosGenerales + datosAE + datosContactoSRI;
        });
      }).catch( e => {
        console.log(e);
        this.rucDataTuristicTransport = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
        this.consumoRucTuristicTransport = false;
        this.SRIOKTuristicTransport = false;
      });
    }
  }
}
