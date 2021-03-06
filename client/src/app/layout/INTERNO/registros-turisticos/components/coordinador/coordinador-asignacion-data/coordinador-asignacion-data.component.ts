import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { RegisterProcedureService as RegisterProcedureALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerprocedure.service';
import { RegisterProcedureService as RegisterProcedureOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerprocedure.service';
import { ApprovalStateService as ApprovalStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstate.service';
import { ApprovalStateService as ApprovalStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstate.service';
import { ApprovalStateService as ApprovalStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstate.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { RegisterStateService as RegisterStateALService } from 'src/app/services/CRUD/ALOJAMIENTO/registerstate.service';
import { RegisterStateService as RegisterStateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/registerstate.service';
import { RegisterStateService as RegisterStateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/registerstate.service';
import { ZoneService } from 'src/app/services/CRUD/BASE/zone.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';

import { Establishment } from 'src/app/models/BASE/Establishment';
import { RegisterState } from 'src/app/models/ALOJAMIENTO/RegisterState';
import { ApprovalStateAttachment } from 'src/app/models/ALOJAMIENTO/ApprovalStateAttachment';
import { ApprovalState } from 'src/app/models/ALOJAMIENTO/ApprovalState';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { User } from 'src/app/models/profile/User';
import { Zone } from 'src/app/models/BASE/Zone';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { ExporterService } from 'src/app/services/negocio/exporter.service';
import { MailerService } from 'src/app/services/negocio/mailer.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import Swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-coordinador-asignacion-data',
  templateUrl: './coordinador-asignacion-data.component.html',
  styleUrls: ['./coordinador-asignacion-data.component.scss']
})
export class CoordinadorAsignacionDataComponent implements OnInit {
  @Input('user') user: User = new User();
  @Input('register_types_block') register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

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

  @Input('tecnicos_financieros') tecnicosFinancieros = [];
  @Input('tecnicos_zonales') tecnicosZonales = [];

  @Output('attachments') attachments: EventEmitter<any> = new EventEmitter<any>();
  @Output('approval_states') approval_states: EventEmitter<any> = new EventEmitter<any>();

  approvalStateAttachmentsProcessed = {
    informeApprovalStateAttachment: new ApprovalStateAttachment(),
    requisitosApprovalStateAttachment: new ApprovalStateAttachment(),
    actaNotificacionApprovalStateAttachment: new ApprovalStateAttachment(),
    registroApprovalStateAttachment: new ApprovalStateAttachment(),
    tarifarioRackApprovalStateAttachment: new ApprovalStateAttachment(),
  };

  rechazarTramiteFinanciero = false;
  rechazarTramiteInspector = false;
  guardando_no_requiere_inspeccion = false;
  mostrarMotivoTramite = false;
  confirmandoAceptarTramiteInspector = false;
  confirmandoRechazoTramiteInspector = false;
  confirmandoRechazoTramiteFinanciero = false;
  tipo_tramite = 'pendiente';
  digito = '';
  stateTramiteId = 0;
  as_turistic_date = new Date();
  consumoRuc = false;
  SRIOK = false;
  rucData = 'CONECTÁNDOSE AL SRI...';
  superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
  rucValidated = false;
  razon_social = '';
  representante_legal = '';

  isAssignedInspector = false;
  isAssignedFinancial = false;
  hasIspectionDate  = false;
  hasInform  = false;
  hasRequisites = false;
  hasActaNotificacion = false;

  asignandoFinanciero = false;
  desasignandoFinanciero = false;

  asignandoInspector = false;
  desasignandoInspector = false;

  registerApprovalInspector: ApprovalState = new ApprovalState();
  registerApprovalFinanciero: ApprovalState = new ApprovalState();
  registerApprovalCoordinador: ApprovalState = new ApprovalState();

  inspectorSelectedId = 0;
  financialSelectedId = 0;
  ubications: Ubication[] = [];
  zonales = [];

  constructor(
    private toastr: ToastrManager,
    private dinardapDataService: DinardapService,
    private zoneDataService: ZoneService,
    private ubicationDataService: UbicationService,
    private exporterDataService: ExporterService,
    private mailerDataService: MailerService,
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
    private register_procedure_operacion_intermediacion_DataService: RegisterProcedureOPService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {
    this.getUbications();
    this.getZonales();
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
      this.ubications = r as Ubication[];
    }).catch( e => { console.log(e); });
  }

  getZonales() {
    this.zonales = [];
    this.zoneDataService.get().then( r => {
      this.zonales = r;
    }).catch( e => { console.log(e); });
  }

  refresh() {
    if (this.data_selected_table.register.states == null) {
      return;
    }
    this.mostrarMotivoTramite = false;
    this.tipo_tramite = 'pendiente';
    this.as_turistic_date = new Date();
    this.consumoRuc = false;
    this.SRIOK = false;
    this.rucData = 'CONECTÁNDOSE AL SRI...';
    this.superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
    this.rucValidated = false;
    this.razon_social = '';
    this.representante_legal = '';
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    const estado = this.stateTramiteId.toString();
    this.digito = estado.substring(estado.length-1, estado.length);
    this.isAssignedInspector = false;
    this.isAssignedFinancial = false;
    this.hasIspectionDate  = false;
    this.hasInform  = false;
    this.hasRequisites = false;
    this.hasActaNotificacion = false;
    this.inspectorSelectedId = 0;
    this.financialSelectedId = 0;
    this.registerApprovalInspector = new ApprovalState();
    this.registerApprovalFinanciero = new ApprovalState();
    this.registerApprovalCoordinador = new ApprovalState();
    this.checkMotivoTramite(estado);
    this.checkRuc();
    this.getApprovalStates();
  }

  getApprovalStates() {
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
      if(element.approval_id == 1){
        this.registerApprovalInspector = element;
        if (typeof this.registerApprovalInspector.notes == 'undefined' || this.registerApprovalInspector.notes == null) {
          this.registerApprovalInspector.notes = '';
        }
        this.inspectorSelectedId = this.registerApprovalInspector.id_user;
        this.checkIfIsAssignedInspector();
        this.checkAttachments(approvalStateAttachments);
      }
      if(element.approval_id == 2){
        this.registerApprovalFinanciero = element;
        if (typeof this.registerApprovalFinanciero.notes == 'undefined' || this.registerApprovalFinanciero.notes == null) {
          this.registerApprovalFinanciero.notes = '';
        }
        this.financialSelectedId = this.registerApprovalFinanciero.id_user;
        if (this.registerApprovalFinanciero.notes.search('Devuelto: ') == 0) {
          this.registerApprovalFinanciero.id_user = 0;
          this.financialSelectedId = 0;
        }
        this.checkIfIsAssignedFinanciero();
      }
      if(element.approval_id == 3){
        this.registerApprovalCoordinador = element;
        if (typeof this.registerApprovalCoordinador.notes == 'undefined' || this.registerApprovalFinanciero.notes == null) {
          this.registerApprovalCoordinador.notes = '';
        }
      }
    });
    const toEmitApprovals = {
      coordinador: this.registerApprovalCoordinador,
      inspector: this.registerApprovalInspector,
      financiero: this.registerApprovalFinanciero
    };
    this.approval_states.emit(toEmitApprovals);
    this.attachments.emit(this.approvalStateAttachmentsProcessed);
  }

  checkIfIsAssignedInspector() {
    if (this.inspectorSelectedId !== 0) {
      this.isAssignedInspector = true;
    } else {
      this.isAssignedInspector = false;
    }
  }

  checkAttachments(approvalStateAttachments: ApprovalStateAttachment[]) {
    if (this.data_selected_table.register.states.state_id == 11 ||
       this.data_selected_table.register.states.state_id == 21 ||
       this.data_selected_table.register.states.state_id == 31 ||
       this.data_selected_table.register.states.state_id == 41 ||
       this.data_selected_table.register.states.state_id == 51 ||
       this.data_selected_table.register.states.state_id == 61
       ) {
       this.hasRequisites = false;
       return;
    }
    approvalStateAttachments.forEach(approvalStateAttachment => {
        if (approvalStateAttachment.approval_state_attachment_file_name.search('Informe') == 0) {
          this.approvalStateAttachmentsProcessed.informeApprovalStateAttachment = approvalStateAttachment;
          this.hasInform = true;
        }
        if ((approvalStateAttachment.approval_state_attachment_file_name.search('Formulario') == 0) && (approvalStateAttachment.approval_state_attachment_file !== '')) {
          this.approvalStateAttachmentsProcessed.requisitosApprovalStateAttachment = approvalStateAttachment;
          this.hasRequisites = true;
        }
        if (approvalStateAttachment.approval_state_attachment_file_name.search('Acta') == 0) {
          this.approvalStateAttachmentsProcessed.actaNotificacionApprovalStateAttachment = approvalStateAttachment;
          this.hasActaNotificacion = true;
        }
        if (approvalStateAttachment.approval_state_attachment_file_name.search('Registro') == 0) {
          this.approvalStateAttachmentsProcessed.registroApprovalStateAttachment = approvalStateAttachment;
        }
        if (approvalStateAttachment.approval_state_attachment_file_name.search('Tarifario') == 0) {
          this.approvalStateAttachmentsProcessed.tarifarioRackApprovalStateAttachment = approvalStateAttachment;
        }
    });
  }

  checkIfIsAssignedFinanciero() {
    if (this.financialSelectedId !== 0) {
      this.isAssignedFinancial = true;
    } else {
      this.isAssignedFinancial = false;
    }
  }

  checkMotivoTramite(estado: String) {
    const PrimerDigito = estado.substring(0, 1);
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

  rechazarCheck() {
    this.registerApprovalInspector.notes = '';
  }

  noRequiereInspeccion() {
    this.guardando_no_requiere_inspeccion = true;
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que el trámite no requiere revisión por parte del Técnico Zonal?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Aprobado!',
          'El trámite se encuentra listo para ser asignado a un Técnico Financiero',
          'success'
        );
        const today = new Date();
        this.registerApprovalInspector.id_user = 9999999;
        this.registerApprovalInspector.date_assigment = today;
        this.registerApprovalInspector.notes = 'NO REQUIERE INSPECCIÓN';
        this.registerApprovalInspector.value = true;
        this.registerApprovalInspector.date_fullfill = today;
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'No se requiere inspección - fecha:' + this.registerApprovalInspector.date_assigment.toDateString();
        newRegisterState.register_id = this.data_selected_table.register.register.id;
        newRegisterState.state_id = this.stateTramiteId + 9;
        this.registerApprovalCoordinador.id_user = this.user.id;
        this.registerApprovalCoordinador.notes = 'NO REQUIERE INSPECCIÓN';
        this.registerApprovalCoordinador.date_assigment = today;
        this.registerApprovalCoordinador.date_fullfill = today;
        this.registerApprovalCoordinador.value = true;
        if (this.data_selected_table.register.activity_id == 1) {
          this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
            this.approval_state_alojamiento_DataService.put(this.registerApprovalCoordinador).then( r1 => {
              this.register_state_alojamiento_DataService.post(newRegisterState).then( r2 => {
                this.guardando_no_requiere_inspeccion = false;
                window.location.reload();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 2) {
          this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
            this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalCoordinador).then( r1 => {
              this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r2 => {
                this.guardando_no_requiere_inspeccion = false;
                window.location.reload();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 3) {
          this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
            this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalCoordinador).then( r1 => {
              this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r2 => {
                this.guardando_no_requiere_inspeccion = false;
                window.location.reload();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
        this.guardando_no_requiere_inspeccion = false;
      }
    });
  }

  asignarInspector() {
    this.asignandoInspector = true;
    this.isAssignedInspector = true;
    this.registerApprovalInspector.id_user = this.inspectorSelectedId;
    this.registerApprovalInspector.date_assigment = new Date();
    this.registerApprovalInspector.notes = '';
    const newRegisterState = new RegisterState();
    newRegisterState.justification = 'Técnico Zonal asignado en la fecha ' + this.registerApprovalInspector.date_assigment.toDateString();
    newRegisterState.register_id = this.data_selected_table.register.register.id;
    newRegisterState.state_id = this.stateTramiteId + 3;
    this.asignandoInspector = false;
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.assignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.assignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.assignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }

  assignInspector() {
    const documentData = this.buildDocumentData();
    let inspector = new User();
    this.tecnicosZonales.forEach(element => {
      if (element.id == this.inspectorSelectedId) {
        inspector = element;
      }
    });  
    const today = new Date();
    const actividad = this.data_selected_table.register.activity.toUpperCase();
    let qr_value = 'MT-CZ' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-SOLICITUD-' + actividad + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const params = [{tipo_tramite: this.tipo_tramite.toUpperCase()},
      {fecha: today.toLocaleDateString().toUpperCase()},
      {representante_legal: this.representante_legal.toUpperCase()},
      {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
      {ruc: this.data_selected_table.register.ruc.number},
      {razon_social: this.razon_social},
      {fecha_solicitud: today.toLocaleDateString().toUpperCase()},
      {actividad: actividad.toUpperCase()},
      {clasificacion: documentData.clasificacion.toUpperCase()},
      {categoria: documentData.categoria.toUpperCase()},
      {provincia: documentData.provincia.name.toUpperCase()},
      {canton: documentData.canton.name.toUpperCase()},
      {parroquia: documentData.parroquia.name.toUpperCase()},
      {calle_principal: this.data_selected_table.register.establishment.address_main_street.toUpperCase()},
      {numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase()},
      {calle_secundaria: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()}];
    this.exporterDataService.template(10, true, qr_value, params).then( r => {
      let pdfBase64 = r;
      const information = {
        para: inspector.name,
        tramite: this.tipo_tramite.toUpperCase(),
        ruc: this.data_selected_table.register.ruc.number,
        nombreComercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase(),
        fechaSolicitud: today.toLocaleString(),
        actividad: this.data_selected_table.register.activity.toUpperCase(),
        clasificacion: documentData.clasificacion.toUpperCase(),
        categoria: documentData.categoria.toUpperCase(),
        tipoSolicitud: this.tipo_tramite.toUpperCase(),
        provincia: documentData.provincia.name.toUpperCase(),
        canton: documentData.canton.name.toUpperCase(),
        parroquia: documentData.parroquia.name.toUpperCase(),
        callePrincipal: this.data_selected_table.register.establishment.address_main_street.toUpperCase(),
        calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase(),
        numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase(),
        thisYear:today.getFullYear(),
        pdfBase64: pdfBase64,
      };
      this.mailerDataService.sendMail('asignacion', inspector.email.toString(), 'Asignación de trámite para su revisión', information).then( r => {
        this.toastr.successToastr('Técnico Zonal Asignado Satisfactoriamente.', 'Asignación de Técnico Zonal');
        window.location.reload();
      }).catch( e => { console.log(e); });
    }).catch( e => { console.log(e); });
  }
  
  desasignarInspector() {
    this.desasignandoInspector = true;
    const today = new Date();
    this.registerApprovalInspector.id_user = 0;
    this.registerApprovalInspector.date_assigment = null;
    const newRegisterState = new RegisterState();
    newRegisterState.justification = 'Técnico Zonal removido en la fecha ' + today.toDateString();
    newRegisterState.register_id =  this.data_selected_table.register.register.id;
    newRegisterState.state_id = this.stateTramiteId - 3;
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.unassignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.unassignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.unassignInspector();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }

  unassignInspector() {
    const today = new Date();
    const documentData = this.buildDocumentData();
    let inspector = new User();
    this.tecnicosZonales.forEach(element => {
      if (element.id == this.inspectorSelectedId) {
        inspector = element;
      }
    });
    const information = {
      para: inspector.name.toUpperCase(),
      tramite: this.tipo_tramite.toUpperCase(),
      ruc: this.data_selected_table.register.ruc.number,
      nombreComercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase(),
      fechaSolicitud: today.toLocaleString(),
      actividad: this.data_selected_table.register.activity.toUpperCase(),
      clasificacion: documentData.clasificacion.toUpperCase(),
      categoria: documentData.categoria.toUpperCase(),
      tipoSolicitud: this.tipo_tramite.toUpperCase(),
      provincia: documentData.provincia.name.toUpperCase(),
      canton: documentData.canton.name.toUpperCase(),
      parroquia: documentData.parroquia.name.toUpperCase(),
      callePrincipal: this.data_selected_table.register.establishment.address_main_street,
      calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street,
      numeracion: this.data_selected_table.register.establishment.address_number,
      thisYear:today.getFullYear()
    };
    this.mailerDataService.sendMail('desasignacion', inspector.email.toString(), 'Desasignación de trámite', information).then( r => {
      this.toastr.warningToastr('Técnico Zonal Desasignado Satisfactoriamente.', 'Desasignación de Técnico Zonal');
      this.desasignandoInspector = false;
      this.isAssignedInspector = false;
      this.inspectorSelectedId = 0;
      window.location.reload();
    }).catch( e => { console.log(e); });
  }

  aceptarTramite() {
    this.confirmandoAceptarTramiteInspector = true;
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de Aprobar el resultado emitido por el Técnico Zonal?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Aprobado!',
          'El resultado emitido por el Técnico Zonal ha sido aprobado',
          'success'
        );
        this.registerApprovalCoordinador.id_user = this.user.id;
        this.registerApprovalCoordinador.notes = '';
        const today = new Date();
        this.registerApprovalCoordinador.date_assigment = today;
        this.registerApprovalCoordinador.date_fullfill = today;
        this.registerApprovalCoordinador.value = this.registerApprovalInspector.value;
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'Coordinador Zonal aprueba el estado de inspección en la fecha ' + this.registerApprovalCoordinador.date_assigment.toDateString();
        newRegisterState.register_id = this.data_selected_table.register.register.id;
        newRegisterState.state_id = this.stateTramiteId;
        if (this.data_selected_table.register.activity_id == 1) {
          this.approval_state_alojamiento_DataService.put(this.registerApprovalCoordinador).then( r => {
            this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
              this.toastr.successToastr('Aprobado el Estado de la Inspección Satisfactoriamente.', 'Aprobación de Coordinador Zonal');
              this.confirmandoAceptarTramiteInspector = false;
              window.location.reload();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 2) {
          this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalCoordinador).then( r => {
            this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
              this.toastr.successToastr('Aprobado el Estado de la Inspección Satisfactoriamente.', 'Aprobación de Coordinador Zonal');
              this.confirmandoAceptarTramiteInspector = false;
              window.location.reload();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 3) {
          this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalCoordinador).then( r => {
            this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
              this.toastr.successToastr('Aprobado el Estado de la Inspección Satisfactoriamente.', 'Aprobación de Coordinador Zonal');
              this.confirmandoAceptarTramiteInspector = false;
              window.location.reload();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
        this.confirmandoAceptarTramiteInspector = false;
      }
    });
  }

  confirmarRechazoTramite() {
    if(this.registerApprovalInspector.notes == '') {
      this.toastr.errorToastr('Debe indicar la justificación para la devolución del trámite.', 'Rechazo de Trámite');
      return;
    }
    this.confirmandoRechazoTramiteInspector = true;
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de Rechazar el resultado emitido por el Técnico Zonal?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Rechazado!',
          'El resultado emitido por el Técnico Zonal ha sido rechazado y devuelto al Técnico Zonal para su revisión',
          'success'
        );
        this.isAssignedInspector = true;
        this.registerApprovalInspector.id_user = this.inspectorSelectedId;
        this.registerApprovalInspector.date_assigment = new Date();
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'Técnico Zonal asignado en la fecha ' + this.registerApprovalInspector.date_assigment.toDateString();
        newRegisterState.register_id = this.data_selected_table.register.register.id;          
        newRegisterState.state_id = this.stateTramiteId - 6;            
        if (this.data_selected_table.register.activity_id == 1) {
          this.approval_state_alojamiento_DataService.put(this.registerApprovalInspector).then( r => {
            this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
              this.rejectInspection();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 2) {
          this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalInspector).then( r => {
            this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
              this.rejectInspection();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        } 
        if (this.data_selected_table.register.activity_id == 3) {
          this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalInspector).then( r => {
            this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
              this.rejectInspection();
            }).catch( e => { console.log(e); });
          }).catch( e => { console.log(e); });
        } 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
        this.confirmandoRechazoTramiteInspector = false;
      }
    });
  }

  rejectInspection() {
    const today = new Date();
    const documentData = this.buildDocumentData();
    let inspector = new User();
    this.tecnicosZonales.forEach(element => {
       if (element.id == this.inspectorSelectedId) {
          inspector = element;
       }
    });
    let motivoRechazo = this.registerApprovalInspector.notes;
    motivoRechazo = motivoRechazo.replace('<p>', '');
    motivoRechazo = motivoRechazo.replace('</p>', '');
    const information = {
       para: inspector.name,
       tramite: this.tipo_tramite.toUpperCase(),
       motivoRechazo: motivoRechazo,
       ruc: this.data_selected_table.register.ruc.number,
       nombreComercial: this.data_selected_table.register.establishment.commercially_known_name,
       fechaSolicitud: today.toLocaleString(),
       actividad: this.data_selected_table.register.activity.toUpperCase(),
       clasificacion: documentData.clasificacion,
       categoria: documentData.categoria,
       tipoSolicitud: this.tipo_tramite.toUpperCase(),
       provincia: documentData.provincia.name,
       canton: documentData.canton.name,
       parroquia: documentData.parroquia.name,
       callePrincipal: this.data_selected_table.register.establishment.address_main_street,
       calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street,
       numeracion: this.data_selected_table.register.establishment.address_number,
       thisYear:today.getFullYear()
    };
    this.mailerDataService.sendMail('rechazo_informe_tz', inspector.email.toString(), 'Rechazo y reasignación de trámite para su revisión', information).then( r => {
       this.toastr.successToastr('Técnico Zonal Asignado Satisfactoriamente.', 'Asignación de Técnico Zonal');
       window.location.reload();
    }).catch( e => { console.log(e); });
  }

  asignarFinanciero() {
    this.asignandoFinanciero = true;
    this.isAssignedFinancial = true;
    this.registerApprovalFinanciero.id_user = this.financialSelectedId;
    this.registerApprovalFinanciero.date_assigment = new Date();
    this.registerApprovalFinanciero.notes = '';
    const newRegisterState = new RegisterState();
    newRegisterState.justification = 'Técnico Financiero asignado en la fecha ' + this.registerApprovalFinanciero.date_assigment.toDateString();
    newRegisterState.register_id =  this.data_selected_table.register.register.id;
    newRegisterState.state_id = this.stateTramiteId - 3;
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.assignFinancial();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.assignFinancial();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.assignFinancial();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }

  assignFinancial() {
    const today = new Date();
    const documentData = this.buildDocumentData();
    const actividad = this.data_selected_table.register.activity.toUpperCase();
    let financiero = new User();
    this.tecnicosFinancieros.forEach(element => {
       if (element.id == this.financialSelectedId) {
          financiero = element;
       }
    });
    let qr_value = 'MT-CZ' + documentData.iniciales_cordinacion_zonal + '-' + this.data_selected_table.register.ruc.number + '-SOLICITUD-ALOJAMIENTO-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const params = [{tipo_tramite: this.tipo_tramite.toUpperCase()},
       {fecha: today.toLocaleDateString().toUpperCase()},
       {representante_legal: this.user.name.toUpperCase()},
       {nombre_comercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase()},
       {ruc: this.data_selected_table.register.ruc.number},
       {fecha_solicitud: today.toLocaleDateString().toUpperCase()},
       {actividad: actividad},
       {razon_social: this.razon_social},
       {clasificacion: documentData.clasificacion.toUpperCase()},
       {categoria: documentData.categoria.toUpperCase()},
       {provincia: documentData.provincia.name.toUpperCase()},
       {canton: documentData.canton.name.toUpperCase()},
       {parroquia: documentData.parroquia.name.toUpperCase()},
       {calle_principal: this.data_selected_table.register.establishment.address_main_street.toUpperCase()},
       {numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase()},
       {calle_secundaria: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase()}];
       this.exporterDataService.template(10, true, qr_value, params).then( r => {
          let pdfBase64 = r;
          const information = {
             para: financiero.name,
             tramite: this.tipo_tramite.toUpperCase(),
             ruc: this.data_selected_table.register.ruc.number,
             nombreComercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase(),
             fechaSolicitud: today.toLocaleString(),
             actividad: this.data_selected_table.register.activity.toUpperCase(),
             clasificacion: documentData.clasificacion.toUpperCase(),
             categoria: documentData.categoria.toUpperCase(),
             tipoSolicitud: this.tipo_tramite.toUpperCase(),
             provincia: documentData.provincia.name.toUpperCase(),
             canton: documentData.canton.name.toUpperCase(),
             parroquia: documentData.parroquia.name.toUpperCase(),
             callePrincipal: this.data_selected_table.register.establishment.address_main_street.toUpperCase(),
             calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase(),
             numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase(),
             thisYear:today.getFullYear(),
             pdfBase64: pdfBase64,
          };
          this.mailerDataService.sendMail('asignacion', financiero.email.toString(), 'Asignación de trámite para su revisión', information).then( r => {
            this.toastr.successToastr('Técnico Financiero Asignado Satisfactoriamente.', 'Asignación de Técnico Financiero');
            this.asignandoFinanciero = false;
            window.location.reload();
          }).catch( e => { console.log(e); });
     }).catch( e => { console.log(e); });
  }

  desasignarFinanciero() {
    this.desasignandoFinanciero = true;
    const today = new Date();
    this.registerApprovalFinanciero.id_user = 0;
    this.registerApprovalFinanciero.date_assigment = null;
    const newRegisterState = new RegisterState();
    newRegisterState.justification = 'Técnico Financiero removido en la fecha ' + today.toDateString();
    newRegisterState.register_id =  this.data_selected_table.register.register.id;
    newRegisterState.state_id = this.stateTramiteId + 3;
    if (this.data_selected_table.register.activity_id == 1) {
      this.approval_state_alojamiento_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
          this.unassignFinanciero();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }  
    if (this.data_selected_table.register.activity_id == 2) {
      this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
          this.unassignFinanciero();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
    if (this.data_selected_table.register.activity_id == 3) {
      this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalFinanciero).then( r => {
        this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
          this.unassignFinanciero();
        }).catch( e => { console.log(e); });
      }).catch( e => { console.log(e); });
    }
  }

  unassignFinanciero() {
    const today = new Date();
    let financiero = new User();
    this.tecnicosFinancieros.forEach(element => {
      if (element.id == this.financialSelectedId) {
        financiero = element;
      }
    });
    const documentData = this.buildDocumentData();
    const information = {
      para: financiero.name.toUpperCase(),
      tramite: this.tipo_tramite.toUpperCase(),
      ruc: this.data_selected_table.register.ruc.number,
      nombreComercial: this.data_selected_table.register.establishment.commercially_known_name.toUpperCase(),
      fechaSolicitud: today.toLocaleString(),
      actividad: this.data_selected_table.register.activity.toUpperCase(),
      clasificacion: documentData.clasificacion.toUpperCase(),
      categoria: documentData.categoria.toUpperCase(),
      tipoSolicitud: this.tipo_tramite.toUpperCase(),
      provincia: documentData.provincia.name.toUpperCase(),
      canton: documentData.canton.name.toUpperCase(),
      parroquia: documentData.parroquia.name.toUpperCase(),
      callePrincipal: this.data_selected_table.register.establishment.address_main_street.toUpperCase(),
      calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street.toUpperCase(),
      numeracion: this.data_selected_table.register.establishment.address_number.toUpperCase(),
      thisYear:today.getFullYear()
    };
    this.mailerDataService.sendMail('desasignacion', financiero.email.toString(), 'Desasignación de trámite', information).then( r => {
      this.toastr.warningToastr('Técnico Financiero Desasignado Satisfactoriamente.', 'Desasignación de Técnico Financiero');
      this.desasignandoFinanciero = false;
      this.isAssignedFinancial = false;
      this.financialSelectedId = 0;
      window.location.reload();
    }).catch( e => { console.log(e); });
  }

  confirmarRechazoTramiteFinanciero() {
    if (this.registerApprovalFinanciero.notes == '') {
      this.toastr.errorToastr('Debe indicar la justificación para la devolución del trámite.', 'Rechazo de Trámite');
      return;
    }
    this.confirmandoRechazoTramiteFinanciero = true;
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de Rechazar el resultado emitido por el Técnico Financiero?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Rechazado!',
          'El resultado emitido por el Técnico Financiero ha sido rechazado y devuelto al Técnico Financiero para su revisión',
          'success'
        );
        this.isAssignedFinancial = true;
        this.registerApprovalFinanciero.id_user = this.financialSelectedId;
        this.registerApprovalFinanciero.date_assigment = new Date();
        const newRegisterState = new RegisterState();
        newRegisterState.justification = 'Técnico Financiero asignado en la fecha ' + this.registerApprovalFinanciero.date_assigment.toDateString();
        newRegisterState.register_id = this.data_selected_table.register.register.id;
        newRegisterState.state_id = this.stateTramiteId - 3;
        if (this.data_selected_table.register.activity_id == 1) {
            this.approval_state_alojamiento_DataService.put(this.registerApprovalFinanciero).then( r => {
              this.register_state_alojamiento_DataService.post(newRegisterState).then( r1 => {
                this.rejectTramiteFinanciero();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 2) {
            this.approval_state_alimentos_bebidas_DataService.put(this.registerApprovalFinanciero).then( r => {
              this.register_state_alimentos_bebidas_DataService.post(newRegisterState).then( r1 => {
                this.rejectTramiteFinanciero();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
        }
        if (this.data_selected_table.register.activity_id == 3) {
            this.approval_state_operacion_intermediacion_DataService.put(this.registerApprovalFinanciero).then( r => {
              this.register_state_operacion_intermediacion_DataService.post(newRegisterState).then( r1 => {
                this.rejectTramiteFinanciero();
              }).catch( e => { console.log(e); });
            }).catch( e => { console.log(e); });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        ); 
        this.confirmandoRechazoTramiteFinanciero = false;
      }
    });
  }

  rejectTramiteFinanciero() {
    const today = new Date();
    const documentData = this.buildDocumentData();
    let financiero = new User();
    this.tecnicosFinancieros.forEach(element => {
      if (element.id == this.financialSelectedId) {
        financiero = element;
      }
    });
    let motivoRechazo = this.registerApprovalFinanciero.notes;
    motivoRechazo = motivoRechazo.replace('<p>', '');
    motivoRechazo = motivoRechazo.replace('</p>', '');
    const information = {
       para: financiero.name,
       tramite: this.tipo_tramite.toUpperCase(),
       motivoRechazo: motivoRechazo,
       ruc: this.data_selected_table.register.ruc.number,
       nombreComercial: this.data_selected_table.register.establishment.commercially_known_name,
       fechaSolicitud: today.toLocaleString(),
       actividad: this.data_selected_table.register.activity.toUpperCase(),
       clasificacion: documentData.clasificacion,
       categoria: documentData.categoria,
       tipoSolicitud: this.tipo_tramite.toUpperCase(),
       provincia: documentData.provincia.name,
       canton: documentData.canton.name,
       parroquia: documentData.parroquia.name,
       callePrincipal: this.data_selected_table.register.establishment.address_main_street,
       calleInterseccion: this.data_selected_table.register.establishment.address_secondary_street,
       numeracion: this.data_selected_table.register.establishment.address_number,
       thisYear:today.getFullYear()
    };
    this.mailerDataService.sendMail('rechazo_informe_tf', financiero.email.toString(), 'Rechazo y reasignación de trámite para su revisión', information).then( r => {
      this.toastr.successToastr('Técnico Financiero Asignado Satisfactoriamente.', 'Asignación de Técnico Financiero');
      this.confirmandoRechazoTramiteFinanciero = false;
      window.location.reload();
    }).catch( e => { console.log(e); });
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

  descargarRequisitos() {
    this.downloadFile(
      this.approvalStateAttachmentsProcessed.requisitosApprovalStateAttachment.approval_state_attachment_file,
      this.approvalStateAttachmentsProcessed.requisitosApprovalStateAttachment.approval_state_attachment_file_type,
      this.approvalStateAttachmentsProcessed.requisitosApprovalStateAttachment.approval_state_attachment_file_name);
  }

  descargarInforme() {
    this.downloadFile(
      this.approvalStateAttachmentsProcessed.informeApprovalStateAttachment.approval_state_attachment_file,
      this.approvalStateAttachmentsProcessed.informeApprovalStateAttachment.approval_state_attachment_file_type,
      this.approvalStateAttachmentsProcessed.informeApprovalStateAttachment.approval_state_attachment_file_name);
  }

  descargarActa() {
    this.downloadFile(
      this.approvalStateAttachmentsProcessed.actaNotificacionApprovalStateAttachment.approval_state_attachment_file,
      this.approvalStateAttachmentsProcessed.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_type,
      this.approvalStateAttachmentsProcessed.actaNotificacionApprovalStateAttachment.approval_state_attachment_file_name);
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
}
