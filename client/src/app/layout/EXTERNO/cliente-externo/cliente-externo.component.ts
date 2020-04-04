import { Register } from './../../../models/ALOJAMIENTO/Register';
import { User } from './../../../models/profile/User';
import { UserService } from './../../../services/profile/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cliente-externo',
  templateUrl: './cliente-externo.component.html',
  styleUrls: ['./cliente-externo.component.scss']
})

export class ClienteExternoComponent implements OnInit {
  @ViewChild('pasos') pasosTabSet;
  @ViewChild('pasosSuperiores') pasosSuperioresTabSet;
  
  // DATOS DEL USUARIO
  
  user: User = new User();

  // DATOS DEL REGISTRO SELECCIONADO

  registerMinturSelected: Register = new Register(); // Portador de la información total del registro
  selectedRegister = null; // Va a contener el register mintur seleccionado a partir de los datos de la tabla.
  
  register_code = '';
  establishment_selected_ruc_code_id = 'NULL';
  my_category_current = '';
  my_classification_current = '';
  selected_category_catastro = '';
  selected_classification_catastro = '';
  idCatasterID = 0;
  selected_system_source = '';
  hasRucCode = false;
  register_as_turistic_Date = new Date();
  esRegistro = false;
  
  // VARIABLES PARA EL CONTROL DE LA INTERFAZ DE USUARIO
  
  actividadSelected = '-';
  estado_registro = '';
  mostrarOpciones = false;
  opcion_seleccionada = '';
  mostrarTerminosCondiciones = false;
  terminosCondiciones = false;
  mostrarIngresoDatos = false;

  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  mostrarDataRegisterMintur = false;
  estaEnTabla = false;
  registroNuevoEstablecimiento = false;
  idCausal = 0;

  constructor( private userDataService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      this.mostrarTerminosCondiciones = true;
    }).catch( e => console.log(e));
  }

  checkTerminosCondiciones(event) {
    this.terminosCondiciones = event;
  }

  changeSelectedOption(event) {
    this.mostrarIngresoDatos = true;
    if (event == 'ab_new_classification') {
      this.idCausal = 0;
      this.estaEnTabla = false;
      this.selected_system_source = '';
      this.selected_category_catastro = '';
      this.selected_classification_catastro = '';
      this.esRegistro = true;
      this.hasRucCode = true;
      this.selectedRegister = null;
    }
    if (event == 'actualization') {
      this.idCausal = 6;
    }
    if (event == 'actualization_costs') {
      this.idCausal = 6;
    }
    if (event == 'tax_declaration') {
      this.idCausal = 6;
    }
    if (event == 'reclassification') {
      this.idCausal = 4;
    }
    if (event == 'recategorization') {
      this.idCausal = 5;
    }
    if (event == 'activation') {
      this.idCausal = 7;
    }
    this.opcion_seleccionada = event;
  }

  validateRegisterSelectedData(event) {
    console.log(event);
  }

  // onCellClick(event) {
    
  //   if (event.row.activity == 'ALOJAMIENTO') {
  //      this.actividadSelected = '1';
  //   }
  //   if (event.row.activity == 'ALIMENTOS Y BEBIDAS') {
  //      this.actividadSelected = '2';
  //   }
  //   this.register_code = event.row.register_code;
  //   this.establishment_selected_ruc_code_id = event.row.establishment_ruc_code;
  //   this.my_category_current = event.row.category;
  //   this.my_classification_current = event.row.classification;
  //   this.idCatasterID = event.row.id;
  //   this.selected_system_source = event.row.system_source;
  //   this.selected_category_catastro = event.row.category;
  //   this.selected_classification_catastro = event.row.classification;
  //   this.hasRucCode = false;
  //   if (event.row.establishment_ruc_code !== 'NULL') {
  //      this.hasRucCode = true;
  //   }
  //   this.register_as_turistic_Date = new Date(event.row.as_turistic_date.toString());
  //   this.mostrarOpciones = false;
  //   this.registroNuevoEstablecimiento = false;
  //   this.mostrarIngresoDatos = false;
  //   this.registers_mintur.forEach(element => {
  //     if (element.id == event.row.id) {
  //        this.selectedRegister = element;
  //     }
  //   });
  //   this.rows.forEach(row => {
  //      if (event.row == row) {
  //         row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
  //         if ((row.system_source == 'SIETE') || (row.system_source == 'SITURIN')) {
  //            this.buildOpciones(row);
  //         } else {
  //            this.registrarEstablecimientoNuevo(true, this.hasRucCode);
  //         }
  //      } else {
  //         row.selected = '';
  //      }
  //   });
  // }

  // buildOpciones(row) {
  //   this.estaEnTabla = true;
  //   this.mostrarOpciones = true;
  //   this.seleccionarRegistro(row);
  // }

  // registrarEstablecimientoNuevo(estaEnTabla, hasRucCode) { 
  //   // CONTROL DE INTERFAZ
  //   this.estaEnTabla = estaEnTabla;
  //   if (!this.estaEnTabla) {
  //     this.rows.forEach(row => {
  //        row.selected = '';
  //     });
  //   }
  //   this.mostrarDataRegisterMintur = true;
  //   this.mostrarIngresoDatos = true;
  //   this.mostrarOpciones = false;
  //   // ENCERAMOS REGISTRO NUEVO
  //   this.actividadSelected = '-';
  //   this.establishment_selected_ruc_code_id = 'NULL';
  //   this.my_category_current = '';
  //   this.my_classification_current = '';
  //   this.selected_category_catastro = '';
  //   this.selected_classification_catastro = '';
  //   this.register_as_turistic_Date = new Date();
  //   this.idCatasterID = 0;
  //   this.register_code = '';
  //   this.selected_system_source = '';
  //   this.esRegistro = true;
  //   this.hasRucCode = hasRucCode;
  //   this.selectedRegister = null;
  //   this.seleccionarRegistro();
  // }

  // seleccionarRegistro(row?) {
  //   this.mostrarIngresoDatos = false;
  //   if (typeof row != 'undefined') {
  //     if(this.selectedRegister.establishment_state.toUpperCase().trim() == "ACTIVO" || 
  //       this.selectedRegister.establishment_state.toUpperCase().trim() == "ABIERTO" || 
  //       this.selectedRegister.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS ACIVOS") {
  //        this.estado_registro = 'ACTIVO';
  //     }
  //     if(this.selectedRegister.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS NO ACTIVOS" || 
  //        this.selectedRegister.establishment_state.toUpperCase().trim() == "CERRADO") {
  //         this.estado_registro = 'CERRADO';
  //     }
  //     this.mostrarDataRegisterMintur = true;
  //     //this.checkTramitEmitted(this.register_code);
  //     if (this.selectedRegister.system_source == 'SITURIN') {
  //       this.getRegisterSiturinData();
  //     } else {
  //        this.startInitialDataRegisterNew();
  //     }
  //   } else {
  //      this.startInitialDataRegisterNew();
  //   }
  // }

  // getRegisterSiturinData() {
  //   // cambioEstado = true;
  //   // this.consultorDataService.get_register_by_code(this.register_code).then( r => {
  //   //     const registerMintur = r[0];
  //   //     this.selectRegisterMintur(registerMintur);
  //   //     const registerState = this.getRegisterState(registerMintur.states.state_id);
  //   //     this.stateTramiteId = registerMintur.states.state_id;
  //   //     const estado: String = this.stateTramiteId.toString();
  //   //     this.digito = estado.substring(estado.length-1, estado.length);
  //   //     this.stateTramite = 0;
  //   //     this.canSave = true;
  //   //     if (registerState.search('Solicitud Aprobada') == 0) {
  //   //        this.stateTramite = 1;
  //   //        this.hasRegisterReady = true;
  //   //        this.canSave = false;
  //   //     }
  //   //     if (registerState.search('Solicitud Rechazada') == 0) {
  //   //        this.stateTramite = 2;
  //   //        this.hasRegisterReady = false;
  //   //        this.canSave = false;
  //   //     }
  //   //     if (registerState.search('Documentación Entregada') == 0) {
  //   //        this.stateTramite = 3;
  //   //        this.hasRegisterReady = false;
  //   //        this.canSave = false;
  //   //     }
  //   //     this.idRegister = registerMintur.register.id;
  //   //     this.getApprovalStates();
  //   //  }).catch( e => { console.log(e); });
  // }

  // startInitialDataRegisterNew() {

  // }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}