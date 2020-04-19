import { ComplementaryServiceFoodTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/complementaryservicefoodtype.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { RequisiteService as RequisiteOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/requisite.service';
import { RequisiteService as RequisiteALService } from 'src/app/services/CRUD/ALOJAMIENTO/requisite.service';
import { RequisiteService as RequisiteABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { WorkerGroupService } from 'src/app/services/CRUD/BASE/workergroup.service';
import { GenderService } from 'src/app/services/CRUD/BASE/gender.service';
import { CapacityTypeService as CapacityTypeALService } from 'src/app/services/CRUD/ALOJAMIENTO/capacitytype.service';
import { EstablishmentService } from 'src/app/services/CRUD/BASE/establishment.service';
import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { DocumentService } from 'src/app/services/CRUD/EXPORTER/document.service';
import { UserService } from 'src/app/services/profile/user.service';
import { ApprovalStateReportService as ApprovalStateReportALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstatereport.service';
import { ApprovalStateReportService as ApprovalStateReportABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstatereport.service';
import { ApprovalStateReportService as ApprovalStateReportOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstatereport.service';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';
import { ZoneService } from 'src/app/services/CRUD/BASE/zone.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { RegisterStateService as RegisterStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { RegisterStateService as RegisterStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterStateService as RegisterStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerstate.service';
import { ApprovalStateService as ApprovalStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstate.service';
import { ApprovalStateService as ApprovalStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateService as ApprovalStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';

import { RegisterRequisite } from 'src/app/models/ALIMENTOSBEBIDAS/RegisterRequisite';
import { ApprovalStateReport } from 'src/app/models/ALOJAMIENTO/ApprovalStateReport';
import { ApprovalStateAttachment } from 'src/app/models/ALOJAMIENTO/ApprovalStateAttachment';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { Zone } from 'src/app/models/BASE/Zone';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { RegisterState } from 'src/app/models/ALOJAMIENTO/RegisterState';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { ApprovalState } from 'src/app/models/ALOJAMIENTO/ApprovalState';
import { User } from 'src/app/models/profile/User';
import { Document as Documento } from 'src/app/models/EXPORTER/Document';
import { Worker } from 'src/app/models/BASE/Worker';
import { Tariff } from 'src/app/models/ALOJAMIENTO/Tariff';

import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-inspector-gestion-data',
  templateUrl: './inspector-gestion-data.component.html',
  styleUrls: ['./inspector-gestion-data.component.scss']
})
export class InspectorGestionDataComponent implements OnInit {
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

  mostrarMotivoTramite = false;
  estoyVacaciones = false;
  guardandoInspector = false;
  please_wait_requisites = false;
  
  consumoRuc = false;
  SRIOK = false;
  rucData = 'CONECTÁNDOSE AL SRI...';
  superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
  rucValidated = false;

  razon_social = '';
  representante_legal = '';

  imprimiendo_informe = false;
  imprimiendo_acta = false;

  hasdateByUserRequisites = false;
  dateByUserRequisites = new Date();

  tipo_tramite = 'pendiente';
  motivoTramite = '';
  digito = '';
  stateTramiteId = 0;
  inspectionState = 0;

  as_turistic_date = new Date();

  ubications: Ubication[] = [];
  zonales: Zone[] = [];

  contactUser = new User();
  capacity_types_alojamiento = [];
  worker_groups = [];
  genders = [];
  ruc_name_types = [];
  complementaryServiceFoodTypes = [];

  registerApprovalInspector: ApprovalState = new ApprovalState();

  requisitosApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();
  informeApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();
  actaNotificacionApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();

  report: ApprovalStateReport = new ApprovalStateReport();

  constructor(private toastr: ToastrManager,
    private userDataService: UserService,
    private dinardapDataService: DinardapService,
    private zoneDataService: ZoneService,
    private ubicationDataService: UbicationService,
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
    private register_procedure_operacion_intermediacion_DataService: RegisterProcedureOPService,
    private approval_state_report_alojamiento_DataService: ApprovalStateReportALService,
    private approval_state_report_alimentos_bebidas_DataService: ApprovalStateReportABService,
    private approval_state_report_operacion_intermediacion_DataService: ApprovalStateReportOPService,
    private documentDataService: DocumentService,
    private exporterDataService: ExporterService,
    private register_alojamiento_DataService: RegisterALService,
    private register_alimentos_bebidas_DataService: RegisterABService,
    private register_operacion_intermediacion_DataService: RegisterOPService,
    private establishmentDataService: EstablishmentService,
    private capacity_type_alojamiento_DataService: CapacityTypeALService,
    private genderDataService: GenderService,
    private workerGroupDataService: WorkerGroupService,
    private requisite_operacion_intermediacion_data_service: RequisiteOPService,
    private requisite_alimentos_bebidas_data_service: RequisiteABService,
    private requisite_alojamiento_data_service: RequisiteALService,
    private rucNameTypeDataService: RucNameTypeService,
    private complementaryServiceFoodTypeDataService: ComplementaryServiceFoodTypeService,
    private mailerDataService: MailerService
   ) {
    
  }

  ngOnInit() {
    this.loadCatalogs();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  loadCatalogs() {
    this.getUbications();
    this.getZonales();
    this.getCapacityTypes();
    this.getGenders();
    this.getWorkerGroups();
    this.getRucNameTypes();
    this.getComplementaryFoodServiceType();
  }

  getComplementaryFoodServiceType() {
    this.complementaryServiceFoodTypes = [];
    this.complementaryServiceFoodTypeDataService.get().then( r => {
       this.complementaryServiceFoodTypes = r as any[];
    }).catch( e => { console.log(e); });
  }

  getGenders() {
    this.genders = [];
    this.genderDataService.get().then( r => {
       this.genders = r as any[];
    }).catch( e => console.log(e) );
  }

  getWorkerGroups() {
    this.worker_groups = [];
    this.workerGroupDataService.get().then( r => {
       this.worker_groups = r as any[];
    }).catch( e => console.log(e) ); 
  }

  getRucNameTypes() {
    this.ruc_name_types = [];
    this.rucNameTypeDataService.get().then( r => {
       this.ruc_name_types = r as any[];
    }).catch( e => { console.log(e); });
  }

  getCapacityTypes() {
    this.capacity_types_alojamiento = [];
    this.capacity_type_alojamiento_DataService.get().then( r => {
       this.capacity_types_alojamiento = r;
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

  getContactUser() {
    this.userDataService.get(this.data_selected_table.register.establishment.contact_user_id).then( r => {
      this.contactUser = r as User;
    }).catch( e => { console.log(e); });
  }

  refresh() {
    if (this.data_selected_table.register.states == null) {
      return;
    }
    this.mostrarMotivoTramite = false;
    this.estoyVacaciones = false;
    this.guardandoInspector = false;
    this.please_wait_requisites = false;
    this.consumoRuc = false;
    this.SRIOK = false;
    this.rucData = 'CONECTÁNDOSE AL SRI...';
    this.superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
    this.rucValidated = false;
    this.razon_social = '';
    this.representante_legal = '';
    this.imprimiendo_informe = false;
    this.imprimiendo_acta = false;
    this.hasdateByUserRequisites = false;
    this.tipo_tramite = 'pendiente';
    this.motivoTramite = '';
    this.digito = '';
    this.stateTramiteId = 0;
    this.inspectionState = 0;
    this.as_turistic_date = new Date();
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    const estado = this.stateTramiteId.toString();
    this.digito = estado.substring(estado.length-1, estado.length);
    this.checkMotivoTramite(estado);
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    this.getApprovalStates();
    this.getContactUser();
    this.checkRuc();
  }

  rechazarCheck() {
    this.registerApprovalInspector.notes = '';
  }

  getApprovalStates() {
    this.registerApprovalInspector = new ApprovalState();
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
      if (element.approval_id == 1){
        if (element.value) {
          this.inspectionState = 1;
        } else {
          this.inspectionState = 2;
          const estado: String = this.stateTramiteId.toString();
          const digito = estado.substring(estado.length-1, estado.length);
          if (digito == '5'){
            this.inspectionState = 3;
          }
          if (digito == '6'){
            this.inspectionState = 4;
          }
        }
        if (approvalStateAttachments.length == 0) {
          this.inspectionState = 0;
          this.requisitosApprovalStateAttachment = new ApprovalStateAttachment();
          this.requisitosApprovalStateAttachment.approval_state_id = element.id;
          this.informeApprovalStateAttachment = new ApprovalStateAttachment();
          this.informeApprovalStateAttachment.approval_state_id = element.id;
          this.actaNotificacionApprovalStateAttachment = new ApprovalStateAttachment();
          this.actaNotificacionApprovalStateAttachment.approval_state_id = element.id;
        }
        approvalStateAttachments.forEach(approvalStateAttachment => {
          if (approvalStateAttachment.approval_state_id == element.id) {
            if (approvalStateAttachment.approval_state_attachment_file_name.search('Informe') == 0) {
              this.informeApprovalStateAttachment = approvalStateAttachment;
            }
            if (approvalStateAttachment.approval_state_attachment_file_name.search('Formulario') == 0) {
              this.requisitosApprovalStateAttachment = approvalStateAttachment;
            }
            if (approvalStateAttachment.approval_state_attachment_file_name.search('Acta') == 0) {
              this.actaNotificacionApprovalStateAttachment = approvalStateAttachment;
            }
          }
        });
        this.registerApprovalInspector = element;
        this.registerApprovalInspector.date_fullfill = new Date();
        if (typeof this.registerApprovalInspector.notes == 'undefined' || this.registerApprovalInspector.notes == null) {
          this.registerApprovalInspector.notes = '';
        }
        if (this.data_selected_table.register.activity_id == 1) {
          this.approval_state_report_alojamiento_DataService.get_by_approval_state_id(element.id).then( r => {
            const reporte = r as ApprovalStateReport;
            if (typeof reporte.id != 'undefined' || reporte.id != null) {
              this.report = reporte;
            }
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 2) {
          this.approval_state_report_alimentos_bebidas_DataService.get_by_approval_state_id(element.id).then( r => {
            const reporte = r as ApprovalStateReport;
            if (typeof reporte.id != 'undefined' || reporte.id != null) {
              this.report = reporte;
            }
          }).catch( e => { console.log(e); });
          
        }
        if (this.data_selected_table.register.activity_id == 3) {
          this.approval_state_report_operacion_intermediacion_DataService.get_by_approval_state_id(element.id).then( r => {
            const reporte = r as ApprovalStateReport;
            if (typeof reporte.id != 'undefined' || reporte.id != null) {
              this.report = reporte;
            }
          }).catch( e => { console.log(e); });

        }
      }
    });
  }

  devolverVacaciones() {
    if(this.registerApprovalInspector.notes == '') {
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
        this.registerApprovalInspector.id_user = 0;
        this.registerApprovalInspector.date_assigment = null;
        this.registerApprovalInspector.notes = 'Devuelto: <strong>' + this.user.name + ':</strong> ' + this.registerApprovalInspector.notes;
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'El Técnico Zonal no se encuentra disponible por Vacaciones / Fuera de Oficina';
        newRegisterState.register_id =  this.data_selected_table.register.register.id;
        newRegisterState.state_id = this.stateTramiteId - 3;
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

  stringHasLetter(stringToCheck: String) {
    let toReturn = false;
    for (let i = 0; i<stringToCheck.length; i++) {
      if (stringToCheck[i].match(/[a-z]/i)) {
        toReturn = true;
      }
    }
    return toReturn;
  }

  imprimirInforme() {
    const today = new Date();
    Swal.fire({
      title: 'Ingreso de Información',
      text: '¿En que fecha usted ejecutará la inspección? (ejemplo: 15/09/2020)',
      type: 'warning',
      inputValue: today.toLocaleDateString(),
      input: 'text',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingrese la fecha.'
        } else {
          const dateParts = value.split('/'); 
          if (dateParts.length != 3) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          let noAdmitido = false;
          dateParts.forEach(element => {
            if (this.stringHasLetter(element)){
              noAdmitido = true;
            }
          });
          if (parseInt(dateParts[0])>31) {
            noAdmitido = true;
          }
          if (parseInt(dateParts[1])>12) {
            noAdmitido = true;
          }
          if (dateParts[2].length > 4){
            noAdmitido = true;
          }
          if (parseInt(dateParts[2])>9999) {
            noAdmitido = true;
          }
          if (noAdmitido) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          this.hasdateByUserRequisites = true;
          this.dateByUserRequisites = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
          this.please_wait_requisites = true;
       }
    },
    showCancelButton: true,
    confirmButtonText: 'Si, continuar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      const dateParts = result.value.split('/'); 
      const dateByUser = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
      this.imprimiendo_informe = true;
      const documentData = this.buildDocumentData();
      const actividad = this.data_selected_table.register.activity.toString().toUpperCase();
      let qr_value = 'MT-IN-' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-' + this.data_selected_table.register.establishment.ruc_code_id + '-INFORME-' + actividad + '-' + documentData.iniciales_tecnico_zonal + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      let resultado_aprobacion = '';
      if (this.inspectionState == 1) {
          resultado_aprobacion = 'APROBADA';
      }
      if (this.inspectionState == 2) {
          resultado_aprobacion = 'NEGADA';
      }
      if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 1) {
        resultado_aprobacion = 'APLAZADA PARA INSPECCIÓN (15 DÍAS)';
      }
      if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 2) {
        resultado_aprobacion = 'APLAZADA PARA INSPECCIÓN (30 DÍAS)';
      }
      if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 3) {
        resultado_aprobacion = 'APLAZADA PARA INSPECCIÓN (5 DÍAS)';
      }
      if (this.inspectionState == 4 && this.data_selected_table.register.activity_id == 1) {
        resultado_aprobacion = 'APLAZADA PARA INSPECCIÓN (6 MESES)';
      }
      if (this.inspectionState == 4 && this.data_selected_table.register.activity_id == 2) {
        resultado_aprobacion = 'APLAZADA PARA INSPECCIÓN (60 DÍAS)';
      }
      if (this.registerApprovalInspector.date_fullfill == null || typeof(this.registerApprovalInspector.date_fullfill.toString()) == 'undefined') {
        this.registerApprovalInspector.date_fullfill = new Date();
      }
      this.userDataService.get(documentData.zone.id_coordinator).then( resp => {
        let coordinator = resp as User;
        this.printInforme(coordinator, documentData, actividad, qr_value, resultado_aprobacion, today, dateByUser);
      }).catch( e=> { console.log(e); });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        '',
        'error'
      );
    }
    });
  }

  buildDocumentData(): any {
    const toReturn = {
      clasificacion: '',
      categoria: '',
      provincia: new Ubication(),
      canton: new Ubication(),
      parroquia: new Ubication(),
      zonal: new Ubication(),
      iniciales_tecnico_zonal: '',
      zone: new Zone(),
      iniciales_cordinacion_zonal: ''
    };
    const classificationData = this.getClassificationCategoryFromCategoryID(this.data_selected_table.register.register.register_type_id);
    toReturn.clasificacion = classificationData.classification.name;
    if (this.inspectionState == 5 && this.data_selected_table.register.activity_id == 2) {
      toReturn.clasificacion = 'No Cumple Inspección (No Turístico)';
    }
    toReturn.categoria =  classificationData.category.name;
    this.ubications.forEach(element => {
      if (element.id == this.data_selected_table.register.establishment.ubication_id) {
        toReturn.parroquia = element;
      }
    });
    this.ubications.forEach(element => {
      if (element.code == toReturn.parroquia.father_code) {
        toReturn.canton = element;
      }
    });
    this.ubications.forEach(element => {
      if (element.code == toReturn.canton.father_code) {
        toReturn.provincia = element;
      }
    });
    this.ubications.forEach(element => {
      if (element.code == toReturn.provincia.father_code) {
        toReturn.zonal = element;
      }
    });
    this.user.name.split(' ').forEach(element => {
      toReturn.iniciales_tecnico_zonal += element.substring(0, 1).toUpperCase();
    });
    
    toReturn.zone = new Zone();
    this.zonales.forEach(element => {
       if (element.ubication_id == toReturn.provincia.id) {
        toReturn.zone = element;
       }
    });
    toReturn.iniciales_cordinacion_zonal = toReturn.zone.acronym.toString();
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

  printInforme(coordinator, documentData, actividad, qr_value, resultado_aprobacion, today, dateByUser) {
    const fecha_solicitud = new Date(this.data_selected_table.register.register.updated_at.toString());
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    this.documentDataService.get_doc_id(qr_value).then( respuesta => {
      const codigo_informe = 'MT-' + documentData.iniciales_cordinacion_zonal + '-' + documentData.iniciales_tecnico_zonal + '-' + today.getFullYear() + '-' + respuesta.toString();
      const params = [{codigo_informe: codigo_informe},
        {canton: documentData.canton.name.toUpperCase()},
        {fecha: today.toLocaleDateString().toUpperCase()},
        {nombre_coordinador_zonal: coordinator.name.toUpperCase()},
        {actividad: actividad},
        {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
        {dia: fecha_solicitud.getDate()},
        {mes: meses[fecha_solicitud.getMonth()].toUpperCase()},
        {year: fecha_solicitud.getFullYear()},
        {ruc: this.data_selected_table.register.ruc.number.toUpperCase()},
        {provincia: documentData.provincia.name.toUpperCase()},
        {fecha_solicitud: fecha_solicitud.toLocaleDateString().toUpperCase()},
        {parroquia: documentData.parroquia.name.toUpperCase()},
        {actividad: actividad},
        {clasificacion: documentData.clasificacion},
        {tipo_tramite: this.tipo_tramite},
        {fecha_inspeccion: dateByUser.toLocaleDateString()},
        {categoria: documentData.categoria},
        {calle_principal: this.data_selected_table.register.establishment.address_main_street.toUpperCase()},            
        {numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase()},
        {calle_secundaria: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()},
        {resultado_aprobacion: resultado_aprobacion},
        {identificacion: this.user.identification.toUpperCase()},
        {conclusiones: this.report.conclution},
        {recomendaciones: this.report.recomendation},
        {nombre_tecnico_Zonal: this.user.name.toUpperCase()},
        {zonal: documentData.iniciales_cordinacion_zonal.toUpperCase()}];
      let document = new Documento();
      document.activity = actividad;
      document.code = qr_value;
      document.document_type = 'INFORME';
      let paramsToBuild = {
          template: 11, qr: true, qr_value: qr_value, params: params
      }
      document.procedure_id = this.tipo_tramite.toUpperCase();
      document.zonal = documentData.zonal.name;
      document.user = documentData.iniciales_tecnico_zonal;
      document.params = JSON.stringify(paramsToBuild);
      this.documentDataService.post(document).then().catch( e => { console.log(e); });
      this.exporterDataService.template(11, true, qr_value, params).then( r => {
        const byteCharacters = atob(r);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf'});
        saveAs(blob, qr_value + '.pdf');
        this.please_wait_requisites = false;
        this.imprimiendo_informe = false;
      }).catch( e => { console.log(e); });
    }).catch( e => { console.log(e); });
  }

  imprimirRequisitos() {
    const today = new Date();
    Swal.fire({
      title: 'Ingreso de Información',
      text: '¿En que fecha usted ejecutará la inspección? (ejemplo: 15/09/2020)',
      type: 'warning',
      inputValue: today.toLocaleDateString(),
      input: 'text',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingrese la fecha.'
        } else {
          const dateParts = value.split('/'); 
          if (dateParts.length != 3) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          let noAdmitido = false;
          dateParts.forEach(element => {
            if (this.stringHasLetter(element)){
              noAdmitido = true;
            }
          });
          if (parseInt(dateParts[0])>31) {
            noAdmitido = true;
          }
          if (parseInt(dateParts[1])>12) {
            noAdmitido = true;
          }
          if (dateParts[2].length > 4){
            noAdmitido = true;
          }
          if (parseInt(dateParts[2])>9999) {
            noAdmitido = true;
          }
          if (noAdmitido) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          const dateByUser = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
          this.hasdateByUserRequisites = true;
          this.dateByUserRequisites = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
          if (dateByUser < today) {
            this.hasdateByUserRequisites = false;
            this.dateByUserRequisites = new Date();
            return 'No se admiten fechas pasadas.';
          }
          this.please_wait_requisites = true;
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const dateParts = result.value.split('/'); 
        const dateByUser = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
        this.establishmentDataService.get_filtered(this.data_selected_table.register.establishment.id).then( r2 => {
          const workers_on_establishment: Worker[] = [];
          this.genders.forEach(gender => {
             this.worker_groups.forEach(worker_group => {
                const newEstablishmentWorker = new Worker();
                newEstablishmentWorker.gender_id = gender.id;
                newEstablishmentWorker.gender_name = gender.name;
                newEstablishmentWorker.worker_group_id = worker_group.id;
                newEstablishmentWorker.worker_group_name = worker_group.name;
                newEstablishmentWorker.is_max = worker_group.is_max;
                workers_on_establishment.push(newEstablishmentWorker);
             });
          });
          const personal = [];
          workers_on_establishment.forEach(worker_group_template => {
             let newworkergroup = {worker_group_name: '', gender_name: '', count: ''};
             r2.workers_on_establishment.forEach(worker_group_in => {
                if (worker_group_in.worker_group_id == worker_group_template.worker_group_id && worker_group_in.gender_id == worker_group_template.gender_id) {
                   newworkergroup.worker_group_name = worker_group_template.worker_group_name.toString();
                   newworkergroup.gender_name = worker_group_template.gender_name.toString();
                   newworkergroup.count = worker_group_in.count;
                }
             });
             personal.push(newworkergroup);
          });
          if (this.data_selected_table.register.activity_id == 1) {
            this.register_alojamiento_DataService.get_register_data(this.data_selected_table.register.register.id).then( r0 => {
              this.register_alojamiento_DataService.get_tarifario(this.data_selected_table.register.register.id).then( r3 => {
                const tarifarioResponse = r3 as Tariff[];
                const capacities = [];
                const capacities_on_register = r0.capacities_on_register;
                const years = [];
                let last_year = 0;
                capacities_on_register.forEach(capacity => {
                  let existe = false;
                  years.forEach(year => {
                    if (capacity.year == year) {
                      existe = true;
                      if (year > last_year) {
                        last_year = year;
                      }
                    }
                  });
                  if (!existe) {
                    years.push(capacity.year);
                  }
                });   
                capacities_on_register.forEach(capacity => {
                  if (capacity.year == last_year) {
                    const newCapacity = {type: '', spaces: 0, habitaciones: 0, beds: 0, year: 0};
                    newCapacity.habitaciones = capacity.quantity;
                    newCapacity.spaces = capacity.max_spaces;
                    newCapacity.beds = capacity.max_beds;
                    newCapacity.year = capacity.year;
                    this.capacity_types_alojamiento.forEach(element => {
                      if (element.id == capacity.capacity_type_id) {
                        newCapacity.type = element.name.toString();
                      }
                    });
                    capacities.push(newCapacity);
                  }
                });
                const tariffs = [];
                tarifarioResponse.forEach(tariff => {
                  if (tariff.year == last_year) {
                    const newTariff = {capacity_type_id: 0, type: '', habitacion_alta: 0, habitacion_baja: 0, persona_alta: 0, persona_baja: 0, year: 0};
                    let existe = false;
                    tariffs.forEach(element => {
                      if (element.capacity_type_id == tariff.capacity_type_id) {
                        existe = true;
                      }
                    });
                    if (!existe) {
                      this.capacity_types_alojamiento.forEach(element => {
                        if (element.id == tariff.capacity_type_id) {
                          newTariff.type = element.name.toString();
                          newTariff.capacity_type_id = tariff.capacity_type_id;
                          newTariff.year = tariff.year;
                        }
                      });
                      tariffs.push(newTariff);
                    }
                  }
                });
                tariffs.forEach(element => {
                  tarifarioResponse.forEach(tariff => {
                    if (tariff.year == last_year) {
                      if (tariff.capacity_type_id == element.capacity_type_id) {
                        element.year = tariff.year;
                        if (tariff.tariff_type_id == 3) {
                          element.habitacion_baja = tariff.price;
                        }
                        if (tariff.tariff_type_id == 5) {
                          element.habitacion_alta = tariff.price;
                        }
                        if (tariff.tariff_type_id == 4) {
                          element.persona_baja = tariff.price;
                        }
                        if (tariff.tariff_type_id == 6) {
                          element.persona_alta = tariff.price;
                        }
                      }
                    }
                  });
                });
                const requisites = [];
                this.requisite_alojamiento_data_service.get_filtered(this.data_selected_table.register.register.register_type_id).then( r => {
                  const requisitesByRegisterType = r as any[];
                  requisitesByRegisterType.forEach(element => {
                    const newRegisterRequisite = new RegisterRequisite();
                    newRegisterRequisite.requisite_name = element.name;
                    newRegisterRequisite.requisite_id = element.id;
                    newRegisterRequisite.fullfill = true;
                    newRegisterRequisite.requisite_code = element.code;
                    newRegisterRequisite.mandatory = element.mandatory;
                    newRegisterRequisite.requisite_father_code = element.father_code;
                    newRegisterRequisite.level = element.code.split('.').length;
                    newRegisterRequisite.HTMLtype = element.type;
                    newRegisterRequisite.fullfill = false;
                    if (newRegisterRequisite.HTMLtype == 'YES / NO') {
                      newRegisterRequisite.value = '0';
                    }
                    if (newRegisterRequisite.HTMLtype == 'NUMBER') {
                      newRegisterRequisite.value = '0';
                    }
                    if (newRegisterRequisite.HTMLtype == 'TRUE / FALSE') {
                      newRegisterRequisite.value = 'false';
                    }
                    requisites.push(newRegisterRequisite);
                  });
                  requisites.sort(function(a, b) {
                    const a_id = a.requisite_id;
                    const b_id = b.requisite_id;
                    return a_id > b_id ? 1 : a_id < b_id ? -1 : 0;
                  });
                  requisites.forEach(requisite_template => {
                    r0.requisites.forEach(requisite_in => {
                      if (requisite_template.requisite_id == requisite_in.requisite_id) {
                        requisite_template.fullfill = requisite_in.fullfill;
                        requisite_template.value = requisite_in.value;
                      }
                    });
                  });
                  const complementary_services = [];
                  r0.complementary_service_foods_on_register.forEach(element => {
                    let complementary_service_food_type = '';
                    this.complementaryServiceFoodTypes.forEach(ct => {
                        if (ct.id == element.complementary_service_food_type_id) {
                          complementary_service_food_type = ct.name.toString();
                        }
                    });
                    const newComplementaryService = {type: complementary_service_food_type, tables: element.quantity_tables, spaces: element.quantity_chairs};
                    complementary_services.push(newComplementaryService);
                  });
                  this.printRequisites(dateByUser, requisites, capacities, tariffs, personal, complementary_services);
                }).catch( e => { console.log(e); });
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }
          if (this.data_selected_table.register.activity_id == 2) {
            this.register_alimentos_bebidas_DataService.get_register_data(this.data_selected_table.register.register.id).then( r0 => {
              const capacities = r0.capacities_on_register;
              const requisites = [];
              let register_type_father_code = '';
              this.register_types_block.register_types_alimentos_bebidas.forEach(element => {
                if (element.id == this.data_selected_table.register.register.register_type_id) {
                    register_type_father_code = element.father_code.toString();
                }
              });
              let register_type_father_id = 0;
              this.register_types_block.register_types_alimentos_bebidas.forEach(element => {
                if (element.code == register_type_father_code) {
                    register_type_father_id = element.id;
                }
              });
              this.requisite_alimentos_bebidas_data_service.get_filtered(register_type_father_id).then( r => {
                const requisitesByRegisterType = r as any[];
                requisitesByRegisterType.forEach(element => {
                  const newRegisterRequisite = new RegisterRequisite();
                  newRegisterRequisite.to_approve = element.to_approve;
                  newRegisterRequisite.score = element.score;
                  newRegisterRequisite.requisite_name = element.name;
                  newRegisterRequisite.requisite_id = element.id;
                  newRegisterRequisite.fullfill = true;
                  newRegisterRequisite.requisite_code = element.code;
                  newRegisterRequisite.mandatory = element.mandatory;
                  newRegisterRequisite.id = element.id;
                  newRegisterRequisite.requisite_father_code = element.father_code;
                  newRegisterRequisite.level = element.code.split('.').length;
                  newRegisterRequisite.HTMLtype = element.type;
                  newRegisterRequisite.fullfill = false;
                  if (newRegisterRequisite.HTMLtype == 'YES / NO') {
                    newRegisterRequisite.value = '0';
                  }
                  if (newRegisterRequisite.HTMLtype == 'NUMBER') {
                    newRegisterRequisite.value = '0';
                  }
                  if (newRegisterRequisite.HTMLtype == 'TRUE / FALSE') {
                    newRegisterRequisite.value = 'false';
                  }
                  requisites.push(newRegisterRequisite);
                });
                requisites.sort(function(a, b) {
                    const a_id = a.requisite_id;
                    const b_id = b.requisite_id;
                    return a_id > b_id ? 1 : a_id < b_id ? -1 : 0;
                });
                requisites.forEach(requisite_template => {
                  r0.requisites.forEach(requisite_in => {
                    if (requisite_template.requisite_id == requisite_in.requisite_id) {
                      requisite_template.fullfill = requisite_in.fullfill;
                      requisite_template.value = requisite_in.value;
                    }
                  });
                });
                this.printRequisites(dateByUser, requisites, capacities, [], personal, []);
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }
          if (this.data_selected_table.register.activity_id == 3) {
            this.register_operacion_intermediacion_DataService.get_register_data(this.data_selected_table.register.register.id).then( r0 => {
              const requisites = [];
              this.requisite_operacion_intermediacion_data_service.get_filtered(this.data_selected_table.register.register.register_type_id).then( r => {
                const requisitesByRegisterType = r as any[];
                requisitesByRegisterType.forEach(element => {
                  const newRegisterRequisite = new RegisterRequisite();
                  newRegisterRequisite.to_approve = element.to_approve;
                  newRegisterRequisite.score = element.score;
                  newRegisterRequisite.requisite_name = element.name;
                  newRegisterRequisite.requisite_id = element.id;
                  newRegisterRequisite.fullfill = true;
                  newRegisterRequisite.requisite_code = element.code;
                  newRegisterRequisite.mandatory = element.mandatory;
                  newRegisterRequisite.id = element.id;
                  newRegisterRequisite.requisite_father_code = element.father_code;
                  newRegisterRequisite.level = element.code.split('.').length;
                  newRegisterRequisite.HTMLtype = element.type;
                  newRegisterRequisite.fullfill = false;
                  if (newRegisterRequisite.HTMLtype == 'YES / NO') {
                    newRegisterRequisite.value = '0';
                  }
                  if (newRegisterRequisite.HTMLtype == 'NUMBER') {
                    newRegisterRequisite.value = '0';
                  }
                  if (newRegisterRequisite.HTMLtype == 'TRUE / FALSE') {
                    newRegisterRequisite.value = 'false';
                  }
                  requisites.push(newRegisterRequisite);
                });
                requisites.sort(function(a, b) {
                    const a_id = a.requisite_id;
                    const b_id = b.requisite_id;
                    return a_id > b_id ? 1 : a_id < b_id ? -1 : 0;
                });
                requisites.forEach(requisite_template => {
                  r0.requisites.forEach(requisite_in => {
                    if (requisite_template.requisite_id == requisite_in.requisite_id) {
                      requisite_template.fullfill = requisite_in.fullfill;
                      requisite_template.value = requisite_in.value;
                    }
                  });
                });
                this.printRequisites(dateByUser, requisites, [], [], personal, []);
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }
        }).catch( e => { console.log(e); });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

  printRequisites(dateByUser, requisites, capacities, tariffs, personal, complementary_services) {
    let fecha_registro = '';
    if (this.data_selected_table.register.establishment.as_turistic_register_date == null || typeof this.data_selected_table.register.establishment.as_turistic_register_date == 'undefined') {
       fecha_registro = 'PENDIENTE';
    } else {
       fecha_registro = (new Date(this.data_selected_table.register.establishment.as_turistic_register_date)).toLocaleDateString();
    }
    if (this.as_turistic_date !== null) {
       fecha_registro = this.as_turistic_date.toLocaleDateString();
    }
    let local = '';
    if (this.data_selected_table.register.establishment.establishment_property_type_id == 1) {
       local = 'PROPIO';
    } else {
       local = 'ARRENDADO';
    }
    let tipo_establecimiento = '';
    this.ruc_name_types.forEach(element => {
       if (element.id == this.data_selected_table.register.establishment.ruc_name_type_id) {
          tipo_establecimiento = element.name.toString();
       }
    });
    const today = new Date();
    const actividad = this.data_selected_table.register.activity.toString().toUpperCase();
    const documentData = this.buildDocumentData();
    const params = [{nombre_tecnico_zonal: this.user.name},
       {dia: dateByUser.getDate()},
       {mes: dateByUser.getMonth() + 1},
       {year: dateByUser.getFullYear()},
       {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
       {razon_social: this.razon_social.toUpperCase()},
       {ruc: this.data_selected_table.register.ruc.number.toUpperCase()},
       {actividad: actividad.toUpperCase()},
       {categoria: documentData.categoria.toUpperCase()},
       {tipo_establecimiento:tipo_establecimiento.toUpperCase()},
       {representante_legal: this.representante_legal.toUpperCase()},
       {telefono_principal: this.contactUser.main_phone_number.toUpperCase()},
       {local: local.toUpperCase()},
       {pagina_web: this.data_selected_table.register.establishment.url_web.toUpperCase()},
       {numero_registro: this.data_selected_table.register.register.code.toUpperCase()},
       {fecha_registro: fecha_registro.toUpperCase()},
       {tipo_tramite: this.tipo_tramite.toUpperCase()},
       {clasificacion: documentData.clasificacion.toUpperCase()},
       {franquicia_cadena: this.data_selected_table.register.establishment.franchise_chain_name.toUpperCase()},
       {contacto_establecimiento: this.contactUser.name.toUpperCase()},
       {telefono_secundario: this.contactUser.secondary_phone_number.toUpperCase()},
       {correo_electronico: this.contactUser.email.toUpperCase()},
       {provincia: documentData.provincia.name.toUpperCase()},
       {canton: documentData.canton.name.toUpperCase()},
       {parroquia: documentData.parroquia.name.toUpperCase()},
       {referencia_ubicacion: this.data_selected_table.register.establishment.address_reference},
       {calle_principal: this.data_selected_table.register.establishment.address_main_street.toUpperCase()},
       {numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase()},
       {calle_secundaria: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()}];
    let qr_value = 'MT-CHL-' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-' + this.data_selected_table.register.establishment.ruc_code_id + '-CHECKLIST-' + actividad + '-' + documentData.iniciales_tecnico_zonal + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let document = new Documento();
    document.activity = actividad;
    document.code = qr_value;
    document.document_type = 'CHECKLIST';
    document.procedure_id = this.tipo_tramite.toUpperCase();
    document.zonal = documentData.zonal.name;
    document.user = documentData.iniciales_tecnico_zonal;
    let paramsToBuild = {
       requisites: requisites, 
       capacities: capacities, 
       tariffs: tariffs, 
       personal: personal, 
       complementary_services: complementary_services,
       latitud: this.data_selected_table.register.establishment.address_map_latitude, 
       longitud: this.data_selected_table.register.establishment.address_map_longitude, 
       qr: true, 
       qr_value: qr_value, 
       params: params
    }
    document.params = JSON.stringify(paramsToBuild);
    this.documentDataService.post(document).then().catch( e => { console.log(e); });
    this.exporterDataService.getPDFNormativa(actividad, requisites, capacities, tariffs, complementary_services, personal, this.data_selected_table.register.establishment.address_map_latitude, this.data_selected_table.register.establishment.address_map_longitude, true, qr_value, params).then( r => {
       const byteCharacters = atob(r);
       const byteNumbers = new Array(byteCharacters.length);
       for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
       }
       const byteArray = new Uint8Array(byteNumbers);
       const blob = new Blob([byteArray], { type: 'application/pdf'});
       saveAs(blob, qr_value + '.pdf');
       this.please_wait_requisites = false;
    }).catch( e => { console.log(e); });
  }

  imprimirActaNotificacion() {
    const today = new Date();
    this.imprimiendo_acta = true;
    const documentData = this.buildDocumentData();
    const actividad = this.data_selected_table.register.activity.toString().toUpperCase();
    let qr_value = 'MT-' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-' + this.data_selected_table.register.establishment.ruc_code_id + '-ACTA-NOTIFICACION- ' + actividad + ' -' + documentData.iniciales_tecnico_zonal + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let aclaracion_registro = '';
    if (this.tipo_tramite == 'REGISTRO') {
      aclaracion_registro = 'Es importante destacar que de no cumplir con lo indicado, lamentaremos tener que ejecutar las acciones determinadas en el Art. 52 de la Ley de Turismo en concordancia con el Art. 91 y 87 del Reglamento General a la Ley de Turismo a los establecimientos que incumplan con el marco legal vigente.';
    }
    this.printActaNotificacion(documentData, actividad, qr_value, today, aclaracion_registro);
  }

  printActaNotificacion(documentData, actividad, qr_value, today, aclaracion_registro) {
    this.documentDataService.get_doc_id(qr_value).then( respuesta => {
      const codigo = 'MT-AN-' + documentData.iniciales_cordinacion_zonal + '-' + documentData.iniciales_tecnico_zonal + '-' + today.getFullYear() + '-' + respuesta.toString();
      const params = [{canton: documentData.canton.name.toUpperCase()},
        {fecha: this.dateByUserRequisites.toLocaleDateString()},
        {codigo: codigo},
        {numero_coordinacion_zonal: documentData.iniciales_cordinacion_zonal},
        {aclaracion_registro: aclaracion_registro},
        {razon_social: this.razon_social.toUpperCase()},
        {tramite: this.tipo_tramite.toUpperCase()},
        {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
        {representante_legal: this.representante_legal.toUpperCase()},
        {direccion_establecimiento: this.data_selected_table.register.establishment.address_main_street.toUpperCase() + ' ' + this.data_selected_table.register.establishment.address_number.toUpperCase() + ' ' + this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()},
        {tipo_tramite: this.tipo_tramite.toUpperCase()}];
      let document = new Documento();
      document.activity = actividad;
      document.code = qr_value;
      document.document_type = 'ACTA NOTIFICACION';
      let paramsToBuild = {
         template: 1, qr: true, qr_value: qr_value, params: params
      }
      document.procedure_id = this.tipo_tramite.toUpperCase();
      document.zonal = documentData.zonal.name;
      document.user = documentData.iniciales_tecnico_zonal;
      document.params = JSON.stringify(paramsToBuild);
      this.documentDataService.post(document).then().catch( e => { console.log(e); });
      this.exporterDataService.template(1, true, qr_value, params).then( r => {
        const byteCharacters = atob(r);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf'});
        saveAs(blob, qr_value + '.pdf');
        this.imprimiendo_acta = false;
      }).catch( e => { console.log(e); });
    }).catch( e => { console.log(e); });
  }

  imprimirActaNotificacionInactivacion() {
    const today = new Date();
    this.tipo_tramite = 'INACTIVACIÓN';
    Swal.fire({
      title: 'Ingreso de Información',
      text: '¿En que fecha usted ejecutará la inspección? (ejemplo: 15/09/2020)',
      type: 'warning',
      inputValue: today.toLocaleDateString(),
      input: 'text',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingrese la fecha.'
        } else {
          const dateParts = value.split('/'); 
          if (dateParts.length != 3) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          let noAdmitido = false;
          dateParts.forEach(element => {
            if (this.stringHasLetter(element)){
              noAdmitido = true;
            }
          });
          if (parseInt(dateParts[0])>31) {
            noAdmitido = true;
          }
          if (parseInt(dateParts[1])>12) {
            noAdmitido = true;
          }
          if (dateParts[2].length > 4){
            noAdmitido = true;
          }
          if (parseInt(dateParts[2])>9999) {
            noAdmitido = true;
          }
          if (noAdmitido) {
            return 'Ingrese la fecha en el formato correcto. Ejemplo (15/09/2020)';
          }
          const dateByUser = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
          this.hasdateByUserRequisites = true;
          this.dateByUserRequisites = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
          if (dateByUser < today) {
            this.hasdateByUserRequisites = false;
            this.dateByUserRequisites = new Date();
            return 'No se admiten fechas pasadas.';
          }
          this.please_wait_requisites = true;
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const dateParts = result.value.split('/'); 
        const dateByUser = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + ' 23:59:59');
        this.imprimiendo_acta = true;
        const documentData = this.buildDocumentData();
        const actividad = this.data_selected_table.register.activity.toString().toUpperCase();
        let qr_value = 'MT-' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-' + this.data_selected_table.register.establishment.ruc_code_id + '-ACTA-NOTIFICACION- ' + actividad + ' -' + documentData.iniciales_tecnico_zonal + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let aclaracion_registro = '';
        if (this.tipo_tramite == 'REGISTRO') {
          aclaracion_registro = 'Es importante destacar que de no cumplir con lo indicado, lamentaremos tener que ejecutar las acciones determinadas en el Art. 52 de la Ley de Turismo en concordancia con el Art. 91 y 87 del Reglamento General a la Ley de Turismo a los establecimientos que incumplan con el marco legal vigente.';
        }
        this.printActaNotificacionInactivacion(documentData, actividad, qr_value, today, dateByUser, aclaracion_registro);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelado',
           '',
           'error'
         );
      }
    });
  }

  printActaNotificacionInactivacion(documentData, actividad, qr_value, today, dateByUser, aclaracion_registro) {
    this.documentDataService.get_doc_id(qr_value).then( respuesta => {
      const codigo = 'MT-AN-' + documentData.iniciales_cordinacion_zonal + '-' + documentData.iniciales_tecnico_zonal + '-' + today.getFullYear() + '-' + respuesta.toString();
      const params = [{canton: documentData.canton.name.toUpperCase()},
        {fecha: dateByUser.toLocaleDateString()},
        {codigo: codigo},
        {numero_coordinacion_zonal: documentData.iniciales_cordinacion_zonal},
        {aclaracion_registro: aclaracion_registro},
        {razon_social: this.razon_social.toUpperCase()},
        {tramite: this.tipo_tramite.toUpperCase()},
        {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
        {representante_legal: this.representante_legal.toUpperCase()},
        {direccion_establecimiento: this.data_selected_table.register.establishment.address_main_street.toUpperCase() + ' ' + this.data_selected_table.register.establishment.address_number.toUpperCase() + ' ' + this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()},
        {tipo_tramite: this.tipo_tramite.toUpperCase()}];
      let document = new Documento();
      document.activity = actividad;
      document.code = qr_value;
      document.document_type = 'ACTA NOTIFICACION';
      let paramsToBuild = {
         template: 1, qr: true, qr_value: qr_value, params: params
      }               
      document.procedure_id = this.tipo_tramite.toUpperCase();
      document.zonal = documentData.zonal.name;
      document.user = documentData.iniciales_tecnico_zonal;
      document.params = JSON.stringify(paramsToBuild);
      this.documentDataService.post(document).then().catch( e => { console.log(e); });
      this.exporterDataService.template(1, true, qr_value, params).then( r => {
        const byteCharacters = atob(r);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf'});
        saveAs(blob, qr_value + '.pdf');
        this.imprimiendo_acta = false;
      }).catch( e => { console.log(e); });
    }).catch( e => { console.log(e); });
  }

  validateRequisitesFile(): Boolean {
    return !(this.requisitosApprovalStateAttachment.approval_state_attachment_file_name == '');
  }
  
  validateActaNotificacionFile(): Boolean {
    return !(this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_name == '');
  }

  validateInformeFile(): Boolean {
    return !(this.informeApprovalStateAttachment.approval_state_attachment_file_name == '');
  }

  descargarRequisitos() {
    this.downloadFile(
      this.requisitosApprovalStateAttachment.approval_state_attachment_file,
      this.requisitosApprovalStateAttachment.approval_state_attachment_file_type,
      this.requisitosApprovalStateAttachment.approval_state_attachment_file_name);
  }
 
  descargarInforme() {
    this.downloadFile(
      this.informeApprovalStateAttachment.approval_state_attachment_file,
      this.informeApprovalStateAttachment.approval_state_attachment_file_type,
      this.informeApprovalStateAttachment.approval_state_attachment_file_name);
  }
 
  descargarActaNotificacion() {
    this.downloadFile(
      this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file,
      this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_type,
      this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_name);
  }

  borrarRequisitos() {
    this.requisitosApprovalStateAttachment = new ApprovalStateAttachment();
  }

  borrarInforme() {
    this.informeApprovalStateAttachment = new ApprovalStateAttachment();
  }
 
  borrarActaNotificacion() {
    this.actaNotificacionApprovalStateAttachment = new ApprovalStateAttachment();
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

  CodeFileRequisitesAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.requisitosApprovalStateAttachment.approval_state_attachment_file_name = file.name;
        this.requisitosApprovalStateAttachment.approval_state_attachment_file_type = file.type;
        this.requisitosApprovalStateAttachment.approval_state_attachment_file = reader.result.toString().split(',')[1];
      };
    }
  }
 
  checkMotivoTramite(estado: String) {
    this.motivoTramite = '';
    const PrimerDigito = estado.substring(0, 1);
    console.log(estado);
    if (PrimerDigito == '1') {
      this.mostrarMotivoTramite = false;
    } else {
      this.mostrarMotivoTramite = true;
    }
    this.tipo_tramite = 'REGISTRO';
    if (PrimerDigito == '1') {
      this.tipo_tramite = 'REGISTRO';
    }
    if (PrimerDigito == '2') {
      this.tipo_tramite = 'RECLASIFICACIÓN';
    }
    if (PrimerDigito == '3') {
      this.tipo_tramite = 'RECATEGORIZACIÓN';
    }
    if (PrimerDigito == '4') {
      this.tipo_tramite = 'ACTUALIZACIÓN';
    }
    if (PrimerDigito == '5') {
      this.tipo_tramite = 'INACTIVACIÓN';
    }
    if (PrimerDigito == '6') {
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

  checkRuc() {
    if (this.consumoRuc && this.SRIOK) {
      return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (this.data_selected_table.register.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      this.rucData = '';
      return;
    }
    if (!this.consumoRuc) {
      this.consumoRuc = true;
      this.rucValidated = true;
      this.dinardapDataService.get_super_cias(this.data_selected_table.register.ruc.number).then( r => {
        this.superciasData = '';
        if (r.companias !== 0) {
          const companias = r.companias.original.entidades.entidad;
          companias.forEach(entidad => {
            if (entidad.nombre == 'Superintendencia de Compañias Datos Companía') {
              entidad.filas.fila.columnas.columna.forEach(element => {
                if (element.campo == 'expediente') {
                  this.superciasData += '<strong>Número de Expediente: </strong> ' + element.valor + '<br/>';
                  if (JSON.stringify(element.valor) !== '{}') {
                    this.data_selected_table.register.ruc.group_given.register_code = element.valor;
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
      this.dinardapDataService.get_RUC(this.data_selected_table.register.ruc.number).then( r => {
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
              datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> NO<br/>';
            } else {
              datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> SI<br/>';
            }
          }
          if (element.campo == 'personaSociedad') {
            datosGenerales += '<strong>Tipo de Contribuyente: </strong> ' + element.valor + '<br/>';
          }
          this.rucData = datosGenerales + datosAE + datosContactoSRI;
          if (this.data_selected_table.register.ruc.tax_payer_type_id != 1) {
            this.rucData += datosRL;
            this.representante_legal = RL_name;
          } else {
            this.representante_legal = RZ_name;
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

  CodeFileInformeAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.informeApprovalStateAttachment.approval_state_attachment_file_name = file.name;
        this.informeApprovalStateAttachment.approval_state_attachment_file_type = file.type;
        this.informeApprovalStateAttachment.approval_state_attachment_file = reader.result.toString().split(',')[1];
      };
    }
  }
 
  CodeFileActaNotificacionAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_name = file.name;
        this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_type = file.type;
        this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file = reader.result.toString().split(',')[1];
      };
    }
  }

  validateNotesInspection(): Boolean {
    this.report.background = "                ";
    return this.report.background.length > 4 && this.report.conclution.length > 4 && this.report.recomendation.length > 4;
  }

  validateInspectionInfo(): Boolean {
    if (this.tipo_tramite !== 'INACTIVACIÓN') {
      return this.validateNotesInspection() && this.validateInformeFile() && this.validateRequisitesFile();
    } else {
      return this.validateNotesInspection() && this.validateInformeFile();   
    }
  }

  guardarInspeccion() {
    if ( this.inspectionState == 0) {
      this.toastr.errorToastr('Debe seleccionar un estado de la inspección', 'Inspección');
      return;
    }
    this.motivoTramite = '';
    this.mostrarMotivoTramite = false;
    const today = new Date();
    const registerStateData = this.buildNewRegisterState();
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de confirmar el resultado del trámite a su cargo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.requisitosApprovalStateAttachment.approval_state_attachment_file_name = 'Formulario_Requisitos_' + this.user.identification + '_' + today.getFullYear().toString() + '_' + (today.getMonth() + 1).toString() + '_' + today.getDate().toString()+'.pdf';
        this.requisitosApprovalStateAttachment.approval_state_id = this.registerApprovalInspector.id;
        this.informeApprovalStateAttachment.approval_state_attachment_file_name = 'Informe_Requisitos_' + this.user.identification + '_' + today.getFullYear().toString() + '_' + (today.getMonth() + 1).toString() + '_' + today.getDate().toString()+'.pdf';
        this.informeApprovalStateAttachment.approval_state_id = this.registerApprovalInspector.id;
        if ( this.validateActaNotificacionFile() ) {
          this.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_name = 'Acta_Notificacion_' + this.user.identification + '_' + today.getFullYear().toString() + '_' + (today.getMonth() + 1).toString() + '_' + today.getDate().toString()+'.pdf';
        }
        if (this.data_selected_table.register.activity_id == 1) {
          if (this.report.id == 0) {
            this.approval_state_report_alojamiento_DataService.post(this.report).then().catch( e => { console.log(e); });
          } else {
            this.approval_state_report_alojamiento_DataService.put(this.report).then().catch( e => { console.log(e); });
          }
          this.saveInspeccionAlojamiento(registerStateData);
        }
        if (this.data_selected_table.register.activity_id == 2) {
          if (this.report.id == 0) {
            this.approval_state_report_alimentos_bebidas_DataService.post(this.report).then().catch( e => { console.log(e); });
          } else {
            this.approval_state_report_alimentos_bebidas_DataService.put(this.report).then().catch( e => { console.log(e); });
          }
          this.saveInspeccionAlimentosBebidas(registerStateData);
        }
        if (this.data_selected_table.register.activity_id == 3) {
          if (this.report.id == 0) {
            this.approval_state_report_operacion_intermediacion_DataService.post(this.report).then().catch( e => { console.log(e); });
          } else {
            this.approval_state_report_operacion_intermediacion_DataService.put(this.report).then().catch( e => { console.log(e); });
          }
          this.saveInspeccionOperacionIntermediacion(registerStateData);
        }
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
    if (!registerStateData.enviarEmailUsuario) {
      return;
    }
    const documentData = this.buildDocumentData();
    let prorroga = '';
    if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 1) {
      prorroga = 'APLAZADA PARA INSPECCIÓN (15 DÍAS)';
    }
    if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 2) {
      prorroga = 'APLAZADA PARA INSPECCIÓN (30 DÍAS)';
    }
    if (this.inspectionState == 3 && this.data_selected_table.register.activity_id == 3) {
      prorroga = 'APLAZADA PARA INSPECCIÓN (5 DÍAS)';
    }
    if (this.inspectionState == 4 && this.data_selected_table.register.activity_id == 1) {
      prorroga = 'APLAZADA PARA INSPECCIÓN (6 MESES)';
    }
    if (this.inspectionState == 4 && this.data_selected_table.register.activity_id == 2) {
      prorroga = 'APLAZADA PARA INSPECCIÓN (60 DÍAS)';
    }
    let observaciones = this.registerApprovalInspector.notes;
    this.userDataService.get(this.data_selected_table.register.establishment.contact_user_id).then( r => {
      const information = {
        para: r.name,
        tramite: this.tipo_tramite,
        ruc: this.data_selected_table.register.ruc.number,
        nombreComercial: this.data_selected_table.register.establishment.commercially_known_name,
        fechaSolicitud: today.toLocaleString(),
        actividad: this.data_selected_table.register.activity,
        clasificacion: documentData.clasificacion,
        categoria: documentData.categoria,
        tipoSolicitud: this.tipo_tramite,
        provincia: documentData.provincia.name,
        canton: documentData.canton.name,
        prorroga: prorroga,
        parroquia: documentData.parroquia.name,
        observaciones: observaciones,
        callePrincipal: this.data_selected_table.register.establishment.address_main_street,
        calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street,
        numeracion: this.data_selected_table.register.establishment.address_number,
        thisYear: today.getFullYear()
      };
      this.mailerDataService.sendMail('prorroga', r.email.toString(), 'Prórroga en su Trámite', information).then( r => {
        this.toastr.successToastr('Usuario Notificado Satisfactoriamente.', 'Notificación al Usuario');
        this.refresh();
      }).catch( e => { console.log(e); });
    }).catch( e => {console.log(e); });
  }

  saveInspeccionOperacionIntermediacion(registerStateData) {
    this.register_state_operacion_intermediacion_DataService.post(registerStateData.newRegisterState).then().catch( e => { console.log(e); });
    this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
      if (this.requisitosApprovalStateAttachment.id == 0) {
        this.approval_state_attachment_operacion_intermediacion_DataService.post(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_operacion_intermediacion_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_operacion_intermediacion_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_operacion_intermediacion_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_operacion_intermediacion_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_operacion_intermediacion_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_operacion_intermediacion_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      } else {
        this.approval_state_attachment_operacion_intermediacion_DataService.put(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_operacion_intermediacion_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_operacion_intermediacion_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_operacion_intermediacion_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_operacion_intermediacion_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_operacion_intermediacion_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_operacion_intermediacion_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      }
    }).catch( e => { console.log(e); });
  }

  saveInspeccionAlimentosBebidas(registerStateData) {
    this.register_state_alimentos_bebidas_DataService.post(registerStateData.newRegisterState).then().catch( e => { console.log(e); });
    this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
      if (this.requisitosApprovalStateAttachment.id == 0) {
        this.approval_state_attachment_alimentos_bebidas_DataService.post(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_alimentos_bebidas_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alimentos_bebidas_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alimentos_bebidas_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_alimentos_bebidas_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alimentos_bebidas_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alimentos_bebidas_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      } else {
        this.approval_state_attachment_alimentos_bebidas_DataService.put(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_alimentos_bebidas_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alimentos_bebidas_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alimentos_bebidas_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_alimentos_bebidas_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alimentos_bebidas_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alimentos_bebidas_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      }
    }).catch( e => { console.log(e); });
  }

  saveInspeccionAlojamiento(registerStateData) {
    this.register_state_alojamiento_DataService.post(registerStateData.newRegisterState).then().catch( e => { console.log(e); });
    this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
      if (this.requisitosApprovalStateAttachment.id == 0) {
        this.approval_state_attachment_alojamiento_DataService.post(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_alojamiento_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alojamiento_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alojamiento_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_alojamiento_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alojamiento_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alojamiento_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      } else {
        this.approval_state_attachment_alojamiento_DataService.put(this.requisitosApprovalStateAttachment).then( r_attach_1 => {
          this.toastr.successToastr('Inspección Guardada Satisfactoriamente', 'Inspección');
          if (this.informeApprovalStateAttachment.id == 0) {
            this.approval_state_attachment_alojamiento_DataService.post(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alojamiento_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alojamiento_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          } else {
            this.approval_state_attachment_alojamiento_DataService.put(this.informeApprovalStateAttachment).then( r_attach_2 => {
              if ( this.validateActaNotificacionFile() ) { 
                this.actaNotificacionApprovalStateAttachment.approval_state_id = this.informeApprovalStateAttachment.approval_state_id;
                if (this.actaNotificacionApprovalStateAttachment.id == 0) {
                  this.approval_state_attachment_alojamiento_DataService.post(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                } else {
                  this.approval_state_attachment_alojamiento_DataService.put(this.actaNotificacionApprovalStateAttachment).then().catch( e => { console.log(e); });
                }
              }
            }).catch( e => { console.log(e); });
          }
          Swal.fire(
            'Confirmado!',
            'El resultado del trámite ha sido almacenado',
            'success'
          );
          window.location.reload();
        }).catch( e => { console.log(e); });
      }
    }).catch( e => { console.log(e); });
  }

  buildNewRegisterState(): any {
    const toReturn = {
      enviarEmailUsuario: false,
      newRegisterState: new RegisterState()
    };
    const estado: String = this.stateTramiteId.toString();
    const digito = estado.substring(estado.length-1, estado.length);
    if ( this.inspectionState == 1) {
      this.registerApprovalInspector.value = true;
      if (digito == '4') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 6;
      }
      if (digito == '5') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 5;
      }
      if (digito == '6') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 4;
      }
      if (digito == '0') {
        toReturn.newRegisterState.state_id = this.stateTramiteId;
      }
    }
    if ( this.inspectionState == 2) {
      this.registerApprovalInspector.value = false;
      if (digito == '4') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 6;
      }
      if (digito == '5') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 5;
      }
      if (digito == '6') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 4;
      }
      if (digito == '0') {
        toReturn.newRegisterState.state_id = this.stateTramiteId;
      }
    }
    if ( this.inspectionState == 3) {
      this.registerApprovalInspector.value = false;
      toReturn.enviarEmailUsuario = true;
      if (digito == '4') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 1;
      }
      if (digito == '5') {
        toReturn.newRegisterState.state_id = this.stateTramiteId;
      }
      if (digito == '6') {
        toReturn.newRegisterState.state_id = this.stateTramiteId - 1;
      }
      if (digito == '0') {
        toReturn.newRegisterState.state_id = this.stateTramiteId - 5;
      }
    }
    if ( this.inspectionState == 4) {
      this.registerApprovalInspector.value = false;
      toReturn.enviarEmailUsuario = true;
      if (digito == '4') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 2;
      }
      if (digito == '5') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 1;
      }
      if (digito == '6') {
        toReturn.newRegisterState.state_id = this.stateTramiteId;
      }
      if (digito == '0') {
        toReturn.newRegisterState.state_id = this.stateTramiteId - 4;
      }
    }
    if (this.inspectionState == 5) {
      this.registerApprovalInspector.value = true;
      toReturn.enviarEmailUsuario = false;
      this.register_alimentos_bebidas_DataService.isNotTuristic(this.data_selected_table.register.register.id).then().catch( e => { console.log(e); });
      if (digito == '4') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 6;
      }
      if (digito == '5') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 5;
      }
      if (digito == '6') {
        toReturn.newRegisterState.state_id = this.stateTramiteId + 4;
      }
      if (digito == '0') {
        toReturn.newRegisterState.state_id = this.stateTramiteId;
      }
    }
    toReturn.newRegisterState.justification = 'Resultados de la Inspección cargados en la fecha ' + new Date(this.registerApprovalInspector.date_fullfill).toDateString();
    toReturn.newRegisterState.register_id = this.registerApprovalInspector.register_id;
    this.registerApprovalInspector.notes = '';
    this.report.approval_state_id = this.registerApprovalInspector.id;
    return toReturn;
  }

  saveRegisterState(newRegisterState: RegisterState, messageToastr: string) {
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoInspector = false;
          window.location.reload();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoInspector = false;
          window.location.reload();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.toastr.successToastr(messageToastr);
          this.guardandoInspector = false;
          window.location.reload();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }
}
