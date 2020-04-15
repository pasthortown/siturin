import { Pay } from 'src/app/models/FINANCIERO/Pay';
import { PayTaxService } from 'src/app/services/CRUD/FINANCIERO/paytax.service';
import { Declaration } from 'src/app/models/FINANCIERO/Declaration';
import { PayTax } from 'src/app/models/FINANCIERO/PayTax';
import { ApprovalState } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalState';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-financiero-gestion-data',
  templateUrl: './tecnico-financiero-gestion-data.component.html',
  styleUrls: ['./tecnico-financiero-gestion-data.component.scss']
})
export class TecnicoFinancieroGestionDataComponent implements OnInit {
  mostrarMotivoTramite = false;
  estoyVacaciones = false;
  motivoTramite = '';
  digito = '';

  paytaxes: PayTax[] = [];
  registerApprovalFinanciero: ApprovalState = new ApprovalState();
  contactUser: User = new User();
  pays_calc = [];
  declarations: Declaration[] = [];

  constructor(private payTaxDataService: PayTaxService) {
    
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
   //  this.declarationItemsCategories.forEach(category => {
   //    if (category.tax_payer_type_id == this.ruc_registro_selected.ruc.tax_payer_type_id) {
   //      const items = [];
   //      declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
   //        this.declarationItems.forEach(item => {
   //          if (item.tax_payer_type_id == this.ruc_registro_selected.ruc.tax_payer_type_id) {
   //                 if ((item.id == newValueItem.declaration_item_id) && (item.declaration_item_category_id == category.id)) {
   //                    items.push({declarationItem: item, valueItem: newValueItem});
   //                 }
   //              }
   //           });
   //        });
   //        toCalc.push({Category: category, items: items});
   //     }
   //  });
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
   //  paySelected.ruc_id = this.ruc_registro_selected.ruc.id;
   //  paySelected.amount_payed = -1;
   //  paySelected.pay_date = null;
   //  paySelected.code = this.ruc_registro_selected.ruc.number.substring(0, 10) + this.pays.length.toString();
   //  paySelected.payed = false;
   //  this.payDataService.post(paySelected).then( r => {
   //    this.getPays();
   //  }).catch( e => { console.log(e); });
  }
}
