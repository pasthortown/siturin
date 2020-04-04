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
  rucEstablishmentRegisterSelected = {editable: true}; // OJO

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

  ruc_validated(event) {
    console.log(event);
  }

  next_page_button_click(event) {
    console.log(event);
  }

  validateRegisterSelectedData(event) {
    this.mostrarIngresoDatos = false;
    this.mostrarOpciones = false;
    if (!event.isNew) {
      if (event.register == null) {
        return;
      }
      if (event.register.activity == 'ALOJAMIENTO') {
        this.actividadSelected = '1';
      }
      if (event.register.activity == 'ALIMENTOS Y BEBIDAS') {
        this.actividadSelected = '2';
      }
      this.register_code = event.register.register_code;
      this.establishment_selected_ruc_code_id = event.register.establishment_ruc_code;
      this.my_category_current = event.register.category;
      this.my_classification_current = event.register.classification;
      this.idCatasterID = event.register.id;
      this.selected_system_source = event.register.system_source;
      this.selected_category_catastro = event.register.category;
      this.selected_classification_catastro = event.register.classification;
      this.hasRucCode = false; 
      this.register_as_turistic_Date = new Date(event.register.as_turistic_date.toString());
      if (event.register.establishment_ruc_code !== 'NULL') {
        this.hasRucCode = true;
      }
      this.estaEnTabla = true;
      if ((this.selected_system_source == 'SIETE') || (this.selected_system_source == 'SITURIN')) {
        this.mostrarOpciones = true;
        this.mostrarIngresoDatos = false;
        this.seleccionarRegistro(event.register);
      } else {
        this.registrarEstablecimientoNuevo(true, this.hasRucCode);
      }
    } else {
      this.estaEnTabla = false;
      this.registrarEstablecimientoNuevo(false, false);
    }
  }

  registrarEstablecimientoNuevo(estaEnTabla, hasRucCode) {
    this.estaEnTabla = estaEnTabla;
    this.mostrarIngresoDatos = true;
    // ENCERAMOS REGISTRO NUEVO
    this.actividadSelected = '-';
    this.establishment_selected_ruc_code_id = 'NULL';
    this.my_category_current = '';
    this.my_classification_current = '';
    this.selected_category_catastro = '';
    this.selected_classification_catastro = '';
    this.register_as_turistic_Date = new Date();
    this.idCatasterID = 0;
    this.register_code = '';
    this.selected_system_source = '';
    this.esRegistro = true;
    this.hasRucCode = hasRucCode;
    this.selectedRegister = null;
    this.seleccionarRegistro();
  }
  
  seleccionarRegistro(register?) {
    if (typeof register != 'undefined') {
      if(register.establishment_state.toUpperCase().trim() == "ACTIVO" || 
         register.establishment_state.toUpperCase().trim() == "ABIERTO" || 
         register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS ACIVOS") {
         this.estado_registro = 'ACTIVO';
      }
      if(register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS NO ACTIVOS" || 
         register.establishment_state.toUpperCase().trim() == "CERRADO") {
          this.estado_registro = 'CERRADO';
      }
      //this.checkTramitEmitted(this.register_code);
      if (register.system_source == 'SITURIN') {
        this.getRegisterSiturinData();
      } else {
         this.startInitialDataRegisterNew();
      }
    } else {
       this.startInitialDataRegisterNew();
    }
  }

  getRegisterSiturinData() {
    // cambioEstado = true;
    // this.consultorDataService.get_register_by_code(this.register_code).then( r => {
    //     const registerMintur = r[0];
    //     this.selectRegisterMintur(registerMintur);
    //     const registerState = this.getRegisterState(registerMintur.states.state_id);
    //     this.stateTramiteId = registerMintur.states.state_id;
    //     const estado: String = this.stateTramiteId.toString();
    //     this.digito = estado.substring(estado.length-1, estado.length);
    //     this.stateTramite = 0;
    //     this.canSave = true;
    //     if (registerState.search('Solicitud Aprobada') == 0) {
    //        this.stateTramite = 1;
    //        this.hasRegisterReady = true;
    //        this.canSave = false;
    //     }
    //     if (registerState.search('Solicitud Rechazada') == 0) {
    //        this.stateTramite = 2;
    //        this.hasRegisterReady = false;
    //        this.canSave = false;
    //     }
    //     if (registerState.search('Documentación Entregada') == 0) {
    //        this.stateTramite = 3;
    //        this.hasRegisterReady = false;
    //        this.canSave = false;
    //     }
    //     this.idRegister = registerMintur.register.id;
    //     this.getApprovalStates();
    //  }).catch( e => { console.log(e); });
  }

  startInitialDataRegisterNew() {

  }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}