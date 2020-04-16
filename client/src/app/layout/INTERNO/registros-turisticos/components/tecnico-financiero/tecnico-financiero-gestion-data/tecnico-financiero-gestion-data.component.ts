import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { DeclarationService } from 'src/app/services/CRUD/FINANCIERO/declaration.service';
import { DeclarationItemService } from 'src/app/services/CRUD/FINANCIERO/declarationitem.service';
import { DeclarationItemCategoryService } from 'src/app/services/CRUD/FINANCIERO/declarationitemcategory.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';
import { ZoneService } from 'src/app/services/CRUD/BASE/zone.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';
import { UserService } from 'src/app/services/profile/user.service';
import { RegisterStateService as RegisterStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { RegisterStateService as RegisterStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterStateService as RegisterStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerstate.service';
import { ApprovalStateService as ApprovalStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstate.service';
import { ApprovalStateService as ApprovalStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateService as ApprovalStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { PayAttachmentService } from 'src/app/services/CRUD/FINANCIERO/payattachment.service';
import { PayService } from 'src/app/services/CRUD/FINANCIERO/pay.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { PayTaxService } from 'src/app/services/CRUD/FINANCIERO/paytax.service';

import { ApprovalStateAttachment } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalStateAttachment';
import { RegisterType } from 'src/app/models/ALIMENTOSBEBIDAS/RegisterType';
import { Zone } from 'src/app/models/BASE/Zone';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { RegisterState } from 'src/app/models/ALOJAMIENTO/RegisterState';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { DeclarationItem } from 'src/app/models/FINANCIERO/DeclarationItem';
import { DeclarationItemCategory } from 'src/app/models/FINANCIERO/DeclarationItemCategory';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Pay } from 'src/app/models/FINANCIERO/Pay';
import { Declaration } from 'src/app/models/FINANCIERO/Declaration';
import { PayTax } from 'src/app/models/FINANCIERO/PayTax';
import { ApprovalState } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalState';
import { PayAttachment } from 'src/app/models/FINANCIERO/PayAttachment';
import { User } from 'src/app/models/profile/User';

import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-tecnico-financiero-gestion-data',
  templateUrl: './tecnico-financiero-gestion-data.component.html',
  styleUrls: ['./tecnico-financiero-gestion-data.component.scss']
})
export class TecnicoFinancieroGestionDataComponent implements OnInit {
  @Input('user') user = new User(); 
  @Input('data_selected') data_selected_table = {row: null, 
     register: {register: null,
       activity_id: 0,
       activity: '',
       establishment: new Establishment(),
       ruc: new Ruc(),
       states: null,
       register_data_on_catastro: null
     }
  };
  
  @Input('register_types_block') register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  guardandoFinanciero = false;
  mostrarMotivoTramite = false;
  estoyVacaciones = false;
  payManualAgreement = false;
  imprimiendoDeclaracion = false;

  motivoTramite = '';
  digito = '';
  stateTramiteId = 0;

  paytaxes: PayTax[] = [];
  pays: Pay[] = [];
  pays_calc = [];
  paySelectedOrders: Pay = new Pay();
  pay: Pay = new Pay();

  ubications: Ubication[] = [];
  zonales: Zone[] = [];
  
  declarationApprovalStateAttachment = new ApprovalStateAttachment();
  payApprovalStateAttachment = new ApprovalStateAttachment();

  registerApprovalFinanciero: ApprovalState = new ApprovalState();
  contactUser: User = new User();
  fechaSolicitud = new Date();
  as_turistic_date = new Date();
  tipo_tramite = '';

  declarations: Declaration[] = [];
  declarationItemsCategories: DeclarationItemCategory[] = [];
  declarationItems: DeclarationItem[] = [];

  totalPayBase = 0;
  totalPayFines = 0;
  totalPayTaxes = 0;
  totalPayToPay = 0;

  inspectionState = 0;
  
  constructor(private toastr: ToastrManager,
   private ubicationDataService: UbicationService,
   private zoneDataService: ZoneService,
   private userDataService: UserService,
   private mailerDataService: MailerService,
   private payTaxDataService: PayTaxService,
   private payDataService: PayService,
   private payAttachmentDataService: PayAttachmentService,
   private exporterDataService: ExporterService,
   private declarationDataService: DeclarationService,
   private declarationItemCategoryDataService: DeclarationItemCategoryService,
   private declarationItemDataService: DeclarationItemService,
   private approval_state_alojamiento_DataService: ApprovalStateALService,
   private approval_state_alimentos_bebidas_DataService: ApprovalStateABService,
   private approval_state_operacion_intermediacion_DataService: ApprovalStateOPService,
   private approval_state_attachment_alojamiento_DataService: ApprovalStateAttachmentALService,
   private approval_state_attachment_alimentos_bebidas_DataService: ApprovalStateAttachmentABService,
   private approval_state_attachment_operacion_intermediacion_DataService: ApprovalStateAttachmentOPService,
   private register_state_alojamiento_DataService: RegisterStateALService,
   private register_state_alimentos_bebidas_DataService: RegisterStateABService,
   private register_state_operacion_intermediacion_DataService: RegisterStateOPService,
   private register_procedure_alojamiento_DataService: RegisterProcedureALService,
   private register_procedure_alimentos_bebidas_DataService: RegisterProcedureABService,
   private register_procedure_operacion_intermediacion_DataService: RegisterProcedureOPService
   ) {
      
  }

  ngOnInit() {
    this.loadCatalogs();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    if (this.data_selected_table.register.states == null) {
      return;
    }
    this.contactUser = new User();
    this.contactUser.id = 0;
    this.mostrarMotivoTramite = false;
    this.estoyVacaciones = false;
    this.payManualAgreement = false;
    this.imprimiendoDeclaracion = false;
    this.motivoTramite = '';
    this.digito = '';
    this.stateTramiteId = 0;
    this.paytaxes = [];
    this.pays = [];
    this.pays_calc = [];
    this.paySelectedOrders = new Pay();
    this.pay = new Pay();
    this.registerApprovalFinanciero = new ApprovalState();
    this.fechaSolicitud = new Date();
    this.as_turistic_date = new Date();
    this.tipo_tramite = '';
    this.declarations = [];
    this.totalPayBase = 0;
    this.totalPayFines = 0;
    this.totalPayTaxes = 0;
    this.totalPayToPay = 0;
    this.inspectionState = 0;
    this.getContactUser();
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    const estado = this.stateTramiteId.toString();
    this.digito = estado.substring(estado.length-1, estado.length);
    this.checkMotivoTramite(estado);
    this.fechaSolicitud = new Date(this.data_selected_table.register.register.created_at.toString());
    this.getDeclarationsByEstablishment(this.data_selected_table.register.establishment.id);
    this.getApprovalStates();
    this.getPays();
  }

  loadCatalogs() {
    this.getUbications();
    this.getDeclarationCategories();
    this.getDeclarationItems();
  }
  
  getApprovalStates() {
    this.registerApprovalFinanciero = new ApprovalState();
    const idRegister = this.data_selected_table.register.register.id;
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.get_by_register_id(idRegister).then( r => {
         const registerApprovals = r;
         this.approval_state_attachment_alojamiento_DataService.get_by_register_id(idRegister).then( r => {
           const approvalStateAttachments = r as ApprovalStateAttachment[];
           this.processApprovalData(registerApprovals, approvalStateAttachments);
         }).catch( e => { console.log(e); });
       }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.get_by_register_id(idRegister).then( r => {
        const registerApprovals = r;
        this.approval_state_attachment_alimentos_bebidas_DataService.get_by_register_id(idRegister).then( r => {
          const approvalStateAttachments = r as ApprovalStateAttachment[];
          this.processApprovalData(registerApprovals, approvalStateAttachments);
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.get_by_register_id(idRegister).then( r => {
        const registerApprovals = r;
        this.approval_state_attachment_operacion_intermediacion_DataService.get_by_register_id(idRegister).then( r => {
          const approvalStateAttachments = r as ApprovalStateAttachment[];
          this.processApprovalData(registerApprovals, approvalStateAttachments);
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }

  processApprovalData(registerApprovals: any[], approvalStateAttachments: ApprovalStateAttachment[]) {
    registerApprovals.forEach(element => {
      if (element.approval_id == 2){
        if (element.value) {
          this.inspectionState = 1;
        } else {
          if (this.pays.length > 0) {
            this.inspectionState = 2;
          } else {
            this.inspectionState = 0;
          }
          const estado: String = this.stateTramiteId.toString();
          const digito = estado.substring(estado.length-1, estado.length);
          if (digito == '8'){
             this.inspectionState = 3;
          }
        }
        if (approvalStateAttachments.length == 0) {
          this.inspectionState = 0;
          this.declarationApprovalStateAttachment = new ApprovalStateAttachment();
          this.declarationApprovalStateAttachment.approval_state_id = element.id;
          this.payApprovalStateAttachment = new ApprovalStateAttachment();
          this.payApprovalStateAttachment.approval_state_id = element.id;
        }
        approvalStateAttachments.forEach(approvalStateAttachment => {
          if (approvalStateAttachment.approval_state_id == element.id) {
            if (approvalStateAttachment.approval_state_attachment_file_name.search('Informe') == 0) {
              this.payApprovalStateAttachment = approvalStateAttachment;
            }
            if (approvalStateAttachment.approval_state_attachment_file_name.search('Formulario') == 0) {
              this.declarationApprovalStateAttachment = approvalStateAttachment;
            }
          }
        });
        this.registerApprovalFinanciero = element;
        this.registerApprovalFinanciero.date_fullfill = new Date();
        if (typeof this.registerApprovalFinanciero.notes == 'undefined' || this.registerApprovalFinanciero.notes == null) {
          this.registerApprovalFinanciero.notes = '';
        }
      }
    });
  }

  getDeclarationsByEstablishment(id: number) {
    this.declarations = [];
    this.declarationDataService.get_by_establishment(id).then( r => {
      this.declarations = r as Declaration[];
    }).catch( e => { console.log(e); });
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
      this.ubications = r as Ubication[];
    }).catch( e => { console.log(e); });
  }

  getZonales() {
    this.zoneDataService.get().then( r => {
      this.zonales = r;
    }).catch( e => { console.log(e); });
  }

  getDeclarationCategories() {
    this.declarationItemCategoryDataService.get().then( r => {
      this.declarationItemsCategories = r as DeclarationItemCategory[];
    }).catch( e => { console.log(e); });
  }
 
  getDeclarationItems() {
    this.declarationItemDataService.get().then( r => {
      this.declarationItems = r as DeclarationItem[];
    }).catch( e => { console.log(e); });
  }

  getContactUser() {
   this.userDataService.get(this.data_selected_table.register.establishment.contact_user_id).then( r => {
      this.contactUser = r as User;
   }).catch( e => { console.log(e); });
  }

  rechazarCheck() {
    this.registerApprovalFinanciero.notes = '';
  }

  devolverVacaciones() {
    if(this.registerApprovalFinanciero.notes == '') {
      this.toastr.errorToastr('Debe indicar la justificación para la devolución del trámite.', 'Devolución por Vacaciones / Fuera de Oficina');
      return;
    }
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de devolver el trámite al Coordinador Zonal?, Recuerde que al hacerlo, la solicitud volverá a la Bandeja del Coordinador Zonal para una nueva asignación.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Trámite Devuelto!',
          'La solicitud ha sido devuelta al Coordinador Zonal',
          'success'
        );
        this.registerApprovalFinanciero.date_assigment = null;
        this.registerApprovalFinanciero.notes = 'Devuelto: <strong>' + this.user.name + ':</strong> ' + this.registerApprovalFinanciero.notes;
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'El Técnico Financiero no se encuentra disponible por Vacaciones / Fuera de Oficina';
        newRegisterState.register_id =  this.data_selected_table.register.register.id;
        const estado: String = this.stateTramiteId.toString();
        const digito = estado.substring(estado.length-1, estado.length);
        if (digito == '7') {
          newRegisterState.state_id = this.stateTramiteId + 3;
        }     
        this.saveRegisterState(newRegisterState, 'Devolución por Vacaciones / Fuera de Oficina');
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
      if (category.tax_payer_type_id == this.data_selected_table.register.ruc.tax_payer_type_id) {
        const items = [];
        declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
          this.declarationItems.forEach(item => {
            if (item.tax_payer_type_id == this.data_selected_table.register.ruc.tax_payer_type_id) {
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
    paySelected.ruc_id = this.data_selected_table.register.ruc.id;
    paySelected.amount_payed = -1;
    paySelected.pay_date = null;
    paySelected.code = this.data_selected_table.register.ruc.number.substring(0, 10) + this.pays.length.toString();
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
    this.payDataService.get_by_ruc_id(this.data_selected_table.register.ruc.id).then( r => {
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
        if (this.data_selected_table.register.ruc.tax_payer_type_id == 1) {
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
          {razon_social: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
          {ruc: this.data_selected_table.register.ruc.number},
          {nombre_responsable: this.user.name.toUpperCase()},
          {identificacion_responsable: this.user.identification},
          {direccion: (this.data_selected_table.register.establishment.address_main_street + ' ' + this.data_selected_table.register.establishment.address_number + ' ' + this.data_selected_table.register.establishment.address_secondary_street).toUpperCase()},
          {registro: this.data_selected_table.register.register.code},
          {nombre_declarante: this.contactUser.name.toUpperCase()},
          {identificacion_declarante: this.contactUser.identification}];
        const parametrosQR = [{Año_Declaración: declaration.year},
          {Año_Fiscal: today.getFullYear()},
          {Razón_Social: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
          {RUC: this.data_selected_table.register.ruc.number},
          {Dirección: (this.data_selected_table.register.establishment.address_main_street + ' ' + this.data_selected_table.register.establishment.address_number + ' ' + this.data_selected_table.register.establishment.address_secondary_street).toUpperCase()},
          {Registro: this.data_selected_table.register.register.code},
          {Nombre_Declarante: this.contactUser.name.toUpperCase()},
          {Identificación_Declarante: this.contactUser.identification},
          {Valor_Pagar_Base: pay.amount_to_pay_base},
          {Valor_Pagar_Multas: pay.amount_to_pay_fines},
          {Valor_Pagar_Intereses: pay.amount_to_pay_taxes},
          {Valor_Pagar_Total: pay.amount_to_pay}];
        const qr_value = JSON.stringify(parametrosQR);
        const declarationItemsToSend = [];
        this.declarationItemsCategories.forEach(category => {
          if (category.tax_payer_type_id == this.data_selected_table.register.ruc.tax_payer_type_id) {
            const items = [];
            declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
              this.declarationItems.forEach(item => {
                if (item.tax_payer_type_id == this.data_selected_table.register.ruc.tax_payer_type_id) {
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
          saveAs(blob, 'declaración_' + this.data_selected_table.register.ruc.number + '_' + declaration.year + '.pdf');
          this.imprimiendoDeclaracion = false;
        }).catch( e => { console.log(e); });
      }
    });
  }

  actualizarValorPagar(pay: Pay) {
    pay.amount_to_pay = (pay.amount_to_pay_base*1) + (pay.amount_to_pay_fines*1) + (pay.amount_to_pay_taxes*1);
  }

  saveToPayValue() {
    this.pay.ruc_id = this.data_selected_table.register.ruc.id;
    this.pay.amount_payed = -1;
    this.pay.pay_date = null;
    this.pay.code = this.data_selected_table.register.ruc.number.substring(0, 10) + this.pays.length.toString() + 'CP';
    this.pay.payed = false;
    this.payDataService.post(this.pay).then( r => {
      this.getPays();
    }).catch( e => { console.log(e); });
  }

  CodeFileDocumentoPago(event, payselected: Pay) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        payselected.pay_attachment.pay_attachment_file_name = file.name;
        payselected.pay_attachment.pay_attachment_file_type = file.type;
        payselected.pay_attachment.pay_attachment_file = reader.result.toString().split(',')[1];
        payselected.pay_attachment.pay_id = payselected.id;
        this.payAttachmentDataService.post(payselected.pay_attachment).then( r=> {
          this.toastr.successToastr('Documento de Pago Guardado Satisfactoriamente', 'Documento de Pago');
        }).catch( e => { console.log(e); })
      };
    }
  }

  borrarOrdenDePago(paySelected: Pay) {
    this.payDataService.delete(paySelected.id).then( r => {
      this.toastr.errorToastr('Órden de Pago Eliminada Satisfactoriamente', 'Revisión, Técnico Financiero');
      this.getPays();
    }).catch( e => { console.log(e); });
  }

  calcTotales(): boolean {
    this.totalPayBase = 0;
    this.totalPayFines = 0;
    this.totalPayTaxes = 0;
    this.totalPayToPay = 0;
    this.pays.forEach(pay => {
      if (!pay.payed) {
        this.totalPayToPay += pay.amount_to_pay*1;
        this.totalPayBase += pay.amount_to_pay_base*1;
        this.totalPayFines += pay.amount_to_pay_fines*1;
        this.totalPayTaxes += pay.amount_to_pay_taxes*1;
      }
    });
    return true;
  }

  cancelPayManual() {
    this.pay = new Pay();
    this.payManualAgreement = false;
  }

  pagado(): boolean {
    let toReturn = true;
    this.pays.forEach(pay => {
      if (!pay.payed) {
         toReturn = false;
      }
    });
    return toReturn;
  }

  getClassificationCategoryFromCategoryID(register_type_id: number): any {
    const toReturn = {category: new RegisterType(), classification: new RegisterType()};
    let sourceArray = [];
    if (this.data_selected_table.register.activity_id == 1) {
      sourceArray = this.register_types_block.register_types_alojamiento;
    }
    if (this.data_selected_table.register.activity_id == 2) {
      sourceArray = this.register_types_block.register_types_alimentos_bebidas;
    }
    if (this.data_selected_table.register.activity_id == 3) {
      sourceArray = this.register_types_block.register_types_operacion_intermediacion;
    }
    sourceArray.forEach(element => {
      if (register_type_id == element.id) {
        toReturn.category = element;
      }
    });
    sourceArray.forEach(element => {
      if (toReturn.category.father_code == element.code) {
        toReturn.classification = element;
      }
    });
    return toReturn;
  }

  enviarEmailPago() {
    let payCodes = '';
    this.totalPayBase = 0;
    this.totalPayFines = 0;
    this.totalPayTaxes = 0;
    this.totalPayToPay = 0;
    this.pays.forEach(pay => {
      if (!pay.payed) {
        this.totalPayToPay += pay.amount_to_pay*1;
        this.totalPayBase += pay.amount_to_pay_base*1;
        this.totalPayFines += pay.amount_to_pay_fines*1;
        this.totalPayTaxes += pay.amount_to_pay_taxes*1;
        payCodes += pay.code + ', ';
      }
    });
    payCodes = payCodes.trim().substr(0,payCodes.length - 1);
    const today = new Date();
    const classificationData = this.getClassificationCategoryFromCategoryID(this.data_selected_table.register.register.register_type_id);
    const clasificacion = classificationData.classification.name;
    const categoria =  classificationData.category.name;
    let parroquiaName: String = '';
    let parroquia: Ubication = new Ubication();
    this.ubications.forEach(element => {
      if (element.id == this.data_selected_table.register.establishment.ubication_id) {
        parroquiaName = element.name;
        parroquia = element;
      }
    });
    let cantonName: String = '';
    let canton: Ubication = new Ubication();
    this.ubications.forEach(element => {
      if (element.code == parroquia.father_code) {
        cantonName = element.name;
        canton = element;
      }
    });
    let provinciaName: String = '';
    let provincia: Ubication = new Ubication();
    this.ubications.forEach(element => {
      if (element.code == canton.father_code) {
        provinciaName = element.name;
        provincia = element;
      }
    });
    let zonal: Ubication = new Ubication();
    this.ubications.forEach(element => {
      if (element.code == provincia.father_code){
        zonal = element;
      }
    });
    let datosZonal: Zone;
    this.zonales.forEach(element => {
      if (element.name == zonal.name) {
        datosZonal = element;
      }
    });
    console.log(this.zonales);
    const czDireccion = datosZonal.address;
    const czTelefono = datosZonal.phone_number;
    const information = {
      para: this.contactUser.name.toUpperCase(),
      amount_to_pay_base: this.totalPayBase,
      amount_to_pay_fines: this.totalPayFines,
      amount_to_pay_taxes: this.totalPayTaxes,
      amount_to_pay: this.totalPayToPay,
      ruc: this.data_selected_table.register.ruc.number,
      nombreComercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase(),
      fechaSolicitud: this.fechaSolicitud.toLocaleDateString(),
      actividad: this.data_selected_table.register.activity.toUpperCase(),
      clasificacion: clasificacion.toUpperCase(),
      categoria: categoria.toUpperCase(),
      tipoSolicitud: this.tipo_tramite.toUpperCase(),
      provincia: provinciaName.toUpperCase(),
      canton: cantonName.toUpperCase(),
      parroquia: parroquiaName.toUpperCase(),
      payCodes: payCodes,
      callePrincipal: this.data_selected_table.register.establishment.address_main_street.toUpperCase(),
      calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase(),
      numeracion: this.data_selected_table.register.establishment.address_number,
      czDireccion: czDireccion.toUpperCase(),
      czTelefono: czTelefono,
      thisYear: today.getFullYear()
    };
    this.mailerDataService.sendMail('pago', this.contactUser.email.toString(), 'Órden de Pago Registrada', information).then( r => {
      this.toastr.successToastr('Información Guardada Satisfactoriamente', 'Revisión, Técnico Financiero');
    }).catch( e => { console.log(e); });
  }

  checkMotivoTramite(estado: String) {
    this.motivoTramite = '';
    const PrimerDigito = estado.substring(0, 1);
    if (PrimerDigito == '1') {
      this.mostrarMotivoTramite = false;
    } else {
      this.mostrarMotivoTramite = true;
    }
    this.tipo_tramite = 'REGISTRO';
    const primerdigito = estado.substring(0, 1);
    if (primerdigito == '1') {
      this.tipo_tramite = 'REGISTRO';
    }
    if (primerdigito == '2') {
      this.tipo_tramite = 'RECLASIFICACIÓN';
    }
    if (primerdigito == '3') {
      this.tipo_tramite = 'RECATEGORIZACIÓN';
    }
    if (primerdigito == '4') {
      this.tipo_tramite = 'ACTUALIZACIÓN';
    }
    if (primerdigito == '5') {
      this.tipo_tramite = 'INACTIVACIÓN';
    }
    if (primerdigito == '6') {
      this.tipo_tramite = 'REINGRESO';
    }
    if (estado == '20') {
      this.tipo_tramite = 'REGISTRO';
    }
    if (estado == '30') {
      this.tipo_tramite = 'RECLASIFICACIÓN';
    }
    if (estado == '40') {
      this.tipo_tramite = 'RECATEGORIZACIÓN';
    }
    if (estado == '50') {
      this.tipo_tramite = 'ACTUALIZACIÓN';
    }
    if (estado == '60') {
      this.tipo_tramite = 'INACTIVACIÓN';
    }
    if (estado == '70') {
      this.tipo_tramite = 'REINGRESO';
    }
    this.data_selected_table.register.register_data_on_catastro;
    this.as_turistic_date = new Date();
    if (this.data_selected_table.register.establishment.as_turistic_register_date != null && typeof this.data_selected_table.register.establishment.as_turistic_register_date != 'undefined') {
      this.as_turistic_date = new Date(this.data_selected_table.register.establishment.as_turistic_register_date.toString());
    }
    if (this.data_selected_table.register.activity_id == 1) {
      this.register_procedure_alojamiento_DataService.get_by_register_id(this.data_selected_table.register.register.id.toString()).then( r => {
        if (typeof r.id != 'undefined') {
          this.motivoTramite = r.justification;
        }
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.register_procedure_alimentos_bebidas_DataService.get_by_register_id(this.data_selected_table.register.register.id.toString()).then( r => {
        if (typeof r.id != 'undefined') {
          this.motivoTramite = r.justification;
        }
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.register_procedure_operacion_intermediacion_DataService.get_by_register_id(this.data_selected_table.register.register.id.toString()).then( r => {
        if (typeof r.id != 'undefined') {
          this.motivoTramite = r.justification;
        }
      }).catch( e => { console.log(e); });
    }
  }
  
  descargarDocumentoDePago(paySelected: Pay) {
    this.downloadFile(
      paySelected.pay_attachment.pay_attachment_file,
      paySelected.pay_attachment.pay_attachment_file_type,
      paySelected.pay_attachment.pay_attachment_file_name);   
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

  borrarDocumentoDePago(paySelected: Pay) {
    this.payAttachmentDataService.delete(paySelected.pay_attachment.id).then( r => {
      paySelected.pay_attachment = new PayAttachment();
      this.toastr.warningToastr('Documento de Pago Borrado Satisfactoriamente', 'Documento de Pago');
    }).catch( e => { console.log(e); });
  }

  validateInspectionInfo(): boolean {
    return this.registerApprovalFinanciero.notes.length > 4;
  }

  guardarInspeccion() {
    this.guardandoFinanciero = true;
    const estado: String = this.stateTramiteId.toString();
    const digito = estado.substring(estado.length-1, estado.length);
    if ( this.inspectionState == 0) {
      this.toastr.errorToastr('Debe seleccionar un estado de la revisión', 'Revisión, Técnico Financiero');
      return;
    }
    const today = new Date();
    this.registerApprovalFinanciero.date_fullfill = today;
    let newRegisterState = new RegisterState();
    if ( this.inspectionState == 1) {
      this.registerApprovalFinanciero.value = true;
      if (digito == '0') {
       newRegisterState.state_id = this.stateTramiteId;
      }
      if (digito == '7') {
       newRegisterState.state_id = this.stateTramiteId + 3;
      }
      if (digito == '8') {
       newRegisterState.state_id = this.stateTramiteId + 2;
      }
    }
    if ( this.inspectionState == 2) {
      this.registerApprovalFinanciero.value = false;
      if (digito == '0') {
       newRegisterState.state_id = this.stateTramiteId;
      }
      if (digito == '7') {
       newRegisterState.state_id = this.stateTramiteId + 3;
      }
      if (digito == '8') {
       newRegisterState.state_id = this.stateTramiteId + 2;
      }
    }
    if ( this.inspectionState == 3) {
      this.registerApprovalFinanciero.value = false;
      if (digito == '0') {
       newRegisterState.state_id = this.stateTramiteId - 2;
      }
      if (digito == '7') {
       newRegisterState.state_id = this.stateTramiteId + 1;
      }
      if (digito == '8') {
       newRegisterState.state_id = this.stateTramiteId;
      }
    }
    newRegisterState.justification = 'Resultados de la Revisión de Técnico Financiero cargados en la fecha ' + today.toDateString();
    newRegisterState.register_id = this.registerApprovalFinanciero.register_id;
    this.saveRegisterState(newRegisterState, 'Datos guardados satisfactoriamente.');
  }

  saveRegisterState(newRegisterState: RegisterState, messageToastr: string) {
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoFinanciero = false;
          this.refresh();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoFinanciero = false;
          this.refresh();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoFinanciero = false;
          this.refresh();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }
}
