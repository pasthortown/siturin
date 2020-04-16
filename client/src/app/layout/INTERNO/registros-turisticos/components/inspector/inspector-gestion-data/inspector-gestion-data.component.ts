import { DinardapService } from 'src/app/services/negocio/dinardap.service';
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
import { ApprovalStateAttachmentService as ApprovalStateAttachmentALService } from 'src/app/services/CRUD/ALOJAMIENTO/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/approvalstateattachment.service';
import { ApprovalStateAttachmentService as ApprovalStateAttachmentOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/approvalstateattachment.service';
import { ExporterService } from 'src/app/services/negocio/exporter.service';

import { ApprovalStateReport } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalStateReport';
import { ApprovalStateAttachment } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalStateAttachment';
import { RegisterType } from 'src/app/models/ALIMENTOSBEBIDAS/RegisterType';
import { Zone } from 'src/app/models/BASE/Zone';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { RegisterState } from 'src/app/models/ALOJAMIENTO/RegisterState';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { ApprovalState } from 'src/app/models/ALIMENTOSBEBIDAS/ApprovalState';
import { User } from 'src/app/models/profile/User';

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

  tipo_tramite_seleccionado = 'pendiente';
  motivoTramite = '';
  digito = '';
  stateTramiteId = 0;
  inspectionState = 0;

  as_turistic_date = new Date();

  ubications: Ubication[] = [];
  zonales: Zone[] = [];

  registerApprovalInspector: ApprovalState = new ApprovalState();

  requisitosApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();
  informeApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();
  actaNotificacionApprovalStateAttachment: ApprovalStateAttachment = new ApprovalStateAttachment();

  report: ApprovalStateReport = new ApprovalStateReport();

  constructor(private toastr: ToastrManager,
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

  loadCatalogs() {
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
    this.zoneDataService.get().then( r => {
      this.zonales = r;
    }).catch( e => { console.log(e); });
  }

  refresh() {
    this.as_turistic_date = new Date();
    if (this.data_selected_table.register.establishment.as_turistic_register_date != null && typeof this.data_selected_table.register.establishment.as_turistic_register_date != 'undefined') {
      this.as_turistic_date = new Date(this.data_selected_table.register.establishment.as_turistic_register_date.toString());
    }
    this.stateTramiteId = this.data_selected_table.register.states.state_id;
    const estado = this.stateTramiteId.toString();
    this.digito = estado.substring(estado.length-1, estado.length);
    const primerDigito = estado.substring(0, estado.length-1);
    if ((primerDigito == '5' || estado == '60') && (estado !== '50')) {
      this.tipo_tramite_seleccionado = 'inactivation';
    }
  }

  rechazarCheck() {
    this.registerApprovalInspector.notes = '';
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

  imprimirInforme() {
    //aqui
  }

  imprimirRequisitos() {
    //aqui
  }

  imprimirActaNotificacion() {
    //aqui
  }

  imprimirActaNotificacionInactivacion() {
    //aqui
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
 
  checkRuc() {
    if (this.consumoRuc && this.SRIOK) {
      return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (this.data_selected_table.register.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
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
    if (this.tipo_tramite_seleccionado !== 'inactivation') {
      return this.validateNotesInspection() && this.validateInformeFile() && this.validateRequisitesFile();
    } else {
      return this.validateNotesInspection() && this.validateInformeFile();   
    }
  }

  guardarInspeccion() {
    //aqui
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
