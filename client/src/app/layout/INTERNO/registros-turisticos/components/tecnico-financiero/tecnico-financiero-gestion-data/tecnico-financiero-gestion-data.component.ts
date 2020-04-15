import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { DeclarationItem } from 'src/app/models/FINANCIERO/DeclarationItem';
import { DeclarationItemCategory } from './../../../../../../models/FINANCIERO/DeclarationItemCategory';
import { PayService } from 'src/app/services/CRUD/FINANCIERO/pay.service';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Pay } from 'src/app/models/FINANCIERO/Pay';
import { PayTaxService } from 'src/app/services/CRUD/FINANCIERO/paytax.service';
import { Declaration } from 'src/app/models/FINANCIERO/Declaration';
import { PayTax } from 'src/app/models/FINANCIERO/PayTax';
import { ApprovalState } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalState';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit } from '@angular/core';
import { PayAttachment } from 'src/app/models/FINANCIERO/PayAttachment';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-tecnico-financiero-gestion-data',
  templateUrl: './tecnico-financiero-gestion-data.component.html',
  styleUrls: ['./tecnico-financiero-gestion-data.component.scss']
})
export class TecnicoFinancieroGestionDataComponent implements OnInit {
  user: User = new User();
  registerMinturSelected = null;

  mostrarMotivoTramite = false;
  estoyVacaciones = false;
  payManualAgreement = false;
  imprimiendoDeclaracion = false;

  motivoTramite = '';
  digito = '';

  paytaxes: PayTax[] = [];
  pays: Pay[] = [];
  pays_calc = [];
  paySelectedOrders: Pay = new Pay();
  pay: Pay = new Pay();

  registerApprovalFinanciero: ApprovalState = new ApprovalState();
  contactUser: User = new User();
  
  declarations: Declaration[] = [];
  declarationItemsCategories: DeclarationItemCategory[] = [];
  declarationItems: DeclarationItem[] = [];

  ruc: Ruc = new Ruc();
  
  constructor(private payTaxDataService: PayTaxService,
   private payDataService: PayService,
   private exporterDataService: ExporterService) {
    
  }

  ngOnInit() {
    this.contactUser.id = 0;
  }

  rechazarCheck() {
    this.registerApprovalFinanciero.notes = '';
  }

  devolverVacaciones() {
    // if(this.registerApprovalFinanciero.notes == '') {
    //   this.toastr.errorToastr('Debe indicar la justificación para la devolución del trámite.', 'Devolución por Vacaciones / Fuera de Oficina');
    //   return;
    // }
    // Swal.fire({
    //   title: 'Confirmación',
    //   text: '¿Está seguro de devolver el trámite al Coordinador Zonal?, Recuerde que al hacerlo, la solicitud volverá a la Bandeja del Coordinador Zonal para una nueva asignación.',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si, continuar',
    //   cancelButtonText: 'No, cancelar',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire(
    //       'Trámite Devuelto!',
    //       'La solicitud ha sido devuelta al Coordinador Zonal',
    //       'success'
    //     );
    //     this.registerApprovalFinanciero.date_assigment = null;
    //     this.registerApprovalFinanciero.notes = 'Devuelto: <strong>' + this.user.name + ':</strong> ' + this.registerApprovalFinanciero.notes;
    //     if (this.activity == 'ALOJAMIENTO') {
    //       this.approvalStateDataService.put(this.registerApprovalFinanciero).then( r => {
    //         const newRegisterState = new RegisterState();
    //         newRegisterState.justification = 'El Técnico Financiero no se encuentra disponible por Vacaciones / Fuera de Oficina';
    //         newRegisterState.register_id =  this.idRegister;
    //         const estado: String = this.stateTramiteId.toString();
    //         const digito = estado.substring(estado.length-1, estado.length);
    //         if (digito == '7') {
    //           newRegisterState.state_id = this.stateTramiteId + 3;
    //         }
    //         this.registerStateDataService.post(newRegisterState).then( r1 => {
    //           this.toastr.warningToastr('Trámite devuelto al Coordinador Zonal, Satisfactoriamente.', 'Devolución por Vacaciones / Fuera de Oficina');
    //           this.refresh();
    //         }).catch( e => { console.log(e); });
    //       }).catch( e => { console.log(e); });
    //     }
    //     if (this.activity == 'ALIMENTOS Y BEBIDAS') {
    //       this.approvalStateABDataService.put(this.registerApprovalFinanciero).then( r => {
    //         const newRegisterState = new RegisterState();
    //         newRegisterState.justification = 'El Técnico Financiero no se encuentra disponible por Vacaciones / Fuera de Oficina';
    //         newRegisterState.register_id =  this.idRegister;
    //         const estado: String = this.stateTramiteId.toString();
    //         const digito = estado.substring(estado.length-1, estado.length);
    //         if (digito == '7') {
    //           newRegisterState.state_id = this.stateTramiteId + 3;
    //         }
    //         this.registerStateABDataService.post(newRegisterState).then( r1 => {
    //           this.toastr.warningToastr('Trámite devuelto al Coordinador Zonal, Satisfactoriamente.', 'Devolución por Vacaciones / Fuera de Oficina');
    //           this.refresh();
    //         }).catch( e => { console.log(e); });
    //       }).catch( e => { console.log(e); });
    //     }
    //   } else if (
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     Swal.fire(
    //       'Cancelado',
    //       '',
    //       'error'
    //     );
    //   }
    // });
  }

  buildPays() {
    this.payTaxDataService.get().then( r => {
      this.paytaxes = r as PayTax[];
      this.pays_calc = [];
      this.declarations.forEach(declaration => {
        this.calcTaxes(declaration);
      });
    }).catch( e => { console.log(e); });
  }

  calcTaxes(declaration: Declaration) {
    const toCalc = [];
    this.declarationItemsCategories.forEach(category => {
      if (category.tax_payer_type_id == this.ruc.tax_payer_type_id) {
        const items = [];
        declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
          this.declarationItems.forEach(item => {
            if (item.tax_payer_type_id == this.ruc.tax_payer_type_id) {
                   if ((item.id == newValueItem.declaration_item_id) && (item.declaration_item_category_id == category.id)) {
                      items.push({declarationItem: item, valueItem: newValueItem});
                   }
                }
             });
          });
          toCalc.push({Category: category, items: items});
       }
    });
    let totaltoPayBase = 0;
    toCalc.forEach(itemToShow => {
       itemToShow.items.forEach(item => {
          totaltoPayBase += item.valueItem.value * (item.declarationItem.factor);
       });
    });
    const mora = [0.03, 0.011, 0.011, 0.011, 0.011, 0.011, 0.011];
    let intereses = 0;
    const meses = [
                {month: 0, trimester: 1},
                {month: 1, trimester: 1},
                {month: 2, trimester: 1},
                {month: 3, trimester: 2},
                {month: 4, trimester: 2},
                {month: 5, trimester: 2},
                {month: 6, trimester: 3},
                {month: 7, trimester: 3},
                {month: 8, trimester: 3},
                {month: 9, trimester: 4},
                {month: 10, trimester: 4},
                {month: 11, trimester: 4}
             ];
    let cuenta = 0;
    this.paytaxes.forEach(paytax => {
       if (paytax.year >= declaration.year) {
          meses.forEach(mes => {
             if (mes.trimester == paytax.trimester) {
                intereses = intereses + (paytax.value*1);
                cuenta = cuenta + 1;
             }
          });
       }
    });
    const today = new Date();
    this.paytaxes.forEach(paytax => {
       if (paytax.year == declaration.year) {
          meses.forEach(mes => {
             if(mes.month < 7) {
                if (mes.trimester == paytax.trimester) {
                   intereses = intereses - (paytax.value*1);
                   cuenta = cuenta - 1;
                }
             }
          });
       }
       if (paytax.year == today.getFullYear()) {
          meses.forEach(mes => {
             if(mes.month > today.getMonth() ) {
                if (mes.trimester == paytax.trimester) {
                   intereses = intereses - (paytax.value*1);
                   cuenta = cuenta - 1;
                }
             }
          });
       }
    });
    let moraCalculado = 0;
    if (cuenta > 0) {
       for(let i = 1; i<=cuenta; i++){
          if (i <= mora.length) {
             moraCalculado += mora[i - 1]*1;
          }
       }
    }
    const impuestoCausado = totaltoPayBase/1000;
    const interesNominal = intereses/100;
    const newPayCalc = new Pay();
    newPayCalc.amount_to_pay_base = this.rounded(impuestoCausado);
    newPayCalc.amount_to_pay_fines = this.rounded(impuestoCausado * moraCalculado);
    newPayCalc.amount_to_pay_taxes = this.rounded(impuestoCausado * interesNominal);
    newPayCalc.amount_to_pay = this.rounded(newPayCalc.amount_to_pay_base + newPayCalc.amount_to_pay_fines + newPayCalc.amount_to_pay_taxes);
    newPayCalc.code = declaration.year.toString();
    this.pays_calc.push(newPayCalc);
  }
  
  rounded(numero: number): number {
   const toround = numero*100;
   return Math.round(toround)/100;
  }

  saveToPayValueCalc(paySelected: Pay) {
    paySelected.ruc_id = this.ruc.id;
    paySelected.amount_payed = -1;
    paySelected.pay_date = null;
    paySelected.code = this.ruc.number.substring(0, 10) + this.pays.length.toString();
    paySelected.payed = false;
    this.payDataService.post(paySelected).then( r => {
      this.getPays();
    }).catch( e => { console.log(e); });
  }

  encerarDeclaracion(paySelected: Pay) {
    paySelected.amount_to_pay_fines = 0;
    paySelected.amount_to_pay_taxes = 0;
    paySelected.amount_to_pay = paySelected.amount_to_pay_base + paySelected.amount_to_pay_fines + paySelected.amount_to_pay_taxes;
  }

  getPays() {
    this.payManualAgreement = false;
    this.paySelectedOrders = new Pay();
    this.payDataService.get_by_ruc_id(this.ruc.id).then( r => {
      this.pays = r as Pay[];
      this.pays.forEach(pay => {
         if( pay.pay_attachment == null || typeof(pay.pay_attachment) == 'undefined') {
            pay.pay_attachment = new PayAttachment();
         }
      });
      if (this.pays.length == 0) {
         this.pay = new Pay();
      }
      this.buildPays();
    }).catch( e => { console.log(e); } ); 
  }

  encerarAllDeclaracion(paySelected: Pay) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea encerar la declaración?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Confirmado!',
          'Los valores de la declaración han sido encerados',
          'success'
        );
        paySelected.amount_to_pay_base = 0;
        paySelected.amount_to_pay_fines = 0;
        paySelected.amount_to_pay_taxes = 0;
        paySelected.amount_to_pay = paySelected.amount_to_pay_base + paySelected.amount_to_pay_fines + paySelected.amount_to_pay_taxes;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

  descargarDeclaracionPDF(pay: Pay) {
    this.imprimiendoDeclaracion = true;
    this.declarations.forEach(declaration => {
      if (declaration.year.toString() == pay.code) {
        const today = new Date();
        let year_fiscal = declaration.year;
        let tipo_persona = 'PERSONA NATURAL';
        if (this.ruc.tax_payer_type_id == 1) {
          year_fiscal = declaration.year;
          tipo_persona = 'PERSONA NATURAL';
        } else {
          year_fiscal = declaration.year - 1;
          tipo_persona = 'PERSONA JURÍDICA';
        }
        if (pay.nuevo) {
          year_fiscal = declaration.year;
        }
        const params = [{year_declaration: declaration.year},
          {year_fiscal: year_fiscal},
          {tipo_persona: tipo_persona},
          {razon_social: this.registerMinturSelected.establishment.commercially_known_name.toUpperCase()},
          {ruc: this.ruc.number},
          {nombre_responsable: this.user.name.toUpperCase()},
          {identificacion_responsable: this.user.identification},
          {direccion: (this.registerMinturSelected.establishment.address_main_street + ' ' + this.registerMinturSelected.establishment.address_number + ' ' + this.registerMinturSelected.establishment.address_secondary_street).toUpperCase()},
          {registro: this.registerMinturSelected.register.code},
          {nombre_declarante: this.ruc.contact_user.name.toUpperCase()},
          {identificacion_declarante: this.ruc.contact_user.identification}];
        const parametrosQR = [{Año_Declaración: declaration.year},
          {Año_Fiscal: today.getFullYear()},
          {Razón_Social: this.registerMinturSelected.establishment.commercially_known_name.toUpperCase()},
          {RUC: this.ruc.number},
          {Dirección: (this.registerMinturSelected.establishment.address_main_street + ' ' + this.registerMinturSelected.establishment.address_number + ' ' + this.registerMinturSelected.establishment.address_secondary_street).toUpperCase()},
          {Registro: this.registerMinturSelected.register.code},
          {Nombre_Declarante: this.ruc.contact_user.name.toUpperCase()},
          {Identificación_Declarante: this.ruc.contact_user.identification},
          {Valor_Pagar_Base: pay.amount_to_pay_base},
          {Valor_Pagar_Multas: pay.amount_to_pay_fines},
          {Valor_Pagar_Intereses: pay.amount_to_pay_taxes},
          {Valor_Pagar_Total: pay.amount_to_pay}];
        const qr_value = JSON.stringify(parametrosQR);
        const declarationItemsToSend = [];
        this.declarationItemsCategories.forEach(category => {
          if (category.tax_payer_type_id == this.ruc.tax_payer_type_id) {
            const items = [];
            declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
              this.declarationItems.forEach(item => {
                if (item.tax_payer_type_id == this.ruc.tax_payer_type_id) {
                  if ((item.id == newValueItem.declaration_item_id) && (item.declaration_item_category_id == category.id)) {
                    items.push({declarationItem: item, valueItem: newValueItem});
                  }
                }
              });
            });
            declarationItemsToSend.push({Category: category, items: items});
          }
        });
        this.exporterDataService.getPDFDeclaration(declarationItemsToSend, pay, true, qr_value, params).then( r => {
          const byteCharacters = atob(r);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf'});
          saveAs(blob, 'declaración_' + this.ruc.number + '_' + declaration.year + '.pdf');
          this.imprimiendoDeclaracion = false;
        }).catch( e => { console.log(e); });
      }
    });
  }

  actualizarValorPagar(pay: Pay) {
    pay.amount_to_pay = (pay.amount_to_pay_base*1) + (pay.amount_to_pay_fines*1) + (pay.amount_to_pay_taxes*1);
  }
}
