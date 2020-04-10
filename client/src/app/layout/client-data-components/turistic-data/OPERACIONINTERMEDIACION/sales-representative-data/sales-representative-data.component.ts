import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesRepresentative } from './../../../../../models/OPERACIONINTERMEDIACION/SalesRepresentative';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-representative-data',
  templateUrl: './sales-representative-data.component.html',
  styleUrls: ['./sales-representative-data.component.scss']
})
export class SalesRepresentativeDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('classification_selected_code') classification_selected_code: string = '';
  
  representanteVentasSwitch = false;
  newRepresentanteVentas: SalesRepresentative = new SalesRepresentative();

  SRIOKSalesRepresentative = false;
  consumoRucSalesRepresentative = false;
  
  rucValidatedSalesRepresentative = false;
  
  rucDataSalesRepresentative = 'CONECTÁNDOSE AL SRI...';
  
  constructor(private toastr: ToastrManager,
    private dinardapDataService: DinardapService,
    private modalService: NgbModal) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.loadCatalogos();
  }

  loadCatalogos() {
    
  }

  addRepresentanteVentas(content) {
    this.SRIOKSalesRepresentative = false;
    this.consumoRucSalesRepresentative = false;
    this.newRepresentanteVentas = new SalesRepresentative();
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Representante de Ventas');
          this.register.sales_representatives.push(this.newRepresentanteVentas);
       }
    }), ( r => {}));
  }
 
  editRepresentanteVentas(content, sales_representant) {
    this.SRIOKSalesRepresentative = false;
    this.consumoRucSalesRepresentative = false;
    let initialData = sales_representant;
    this.newRepresentanteVentas = sales_representant;
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Representante de Ventas');
          this.register.sales_representatives.forEach(element => {
             if (element == initialData) {
                element = this.newRepresentanteVentas;
             }
          });
       }
    }), ( r => {}));
  }
 
  deleteRepresentanteVentas(sales_representant) {
    this.SRIOKSalesRepresentative = false;
    this.consumoRucSalesRepresentative = false;
    const new_sales_representatives = [];
    this.register.sales_representatives.forEach(element => {
       if (element != sales_representant) {
          new_sales_representatives.push(element);
       }
    });
    this.register.sales_representatives = new_sales_representatives;
    this.toastr.successToastr('Representante de Ventas removido satisfactoriamente.', 'Representante de Ventas');
  }

  checkRucSalesRepresentative() {
    this.newRepresentanteVentas.ruc = this.newRepresentanteVentas.ruc.replace(/[^\d]/, '');
    if (this.newRepresentanteVentas.ruc.length !== 13) {
      this.rucValidatedSalesRepresentative = false;
      this.consumoRucSalesRepresentative = false;
      return;
    }
    if (this.consumoRucSalesRepresentative && this.SRIOKSalesRepresentative) {
      return;
    }
    this.rucDataSalesRepresentative = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRucSalesRepresentative) {
      this.consumoRucSalesRepresentative = true;
      this.rucValidatedSalesRepresentative = true;
      this.dinardapDataService.get_RUC(this.newRepresentanteVentas.ruc).then( r => {
        this.SRIOKSalesRepresentative = true; 
        this.rucValidatedSalesRepresentative = true;
        const itemsDetalles_SRI_RUC = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
        const itemsDetalles_SRI_RUC_COMPLETO = r.sri_ruc_completo.original.entidades.entidad;
        this.rucDataSalesRepresentative = '';
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
                this.newRepresentanteVentas.social_name = element.valor;
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
            datosGenerales += '<strong>Tipo de Contribuyente: </strong> ' + element.valor + '<br/>';
          }
          this.rucDataSalesRepresentative = datosGenerales + datosAE + datosContactoSRI;
        });
      }).catch( e => {
        console.log(e);
        this.rucDataSalesRepresentative = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
        this.consumoRucSalesRepresentative = false;
        this.SRIOKSalesRepresentative = false;
      });
    }
  }
}
