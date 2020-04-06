import { Establishment } from './../../../models/BASE/Establishment';
import { Ruc } from './../../../models/BASE/Ruc';
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
  @ViewChild('pasosSuperiores') pasosSuperioresTabSet;
  @ViewChild('pasos') pasosTabSet;
  
  // DATOS DEL USUARIO
  
  isEditable = true;

  user: User = new User();

  data_selected = {
    register: new Register(),
    is_new_register: true,
    ruc: new Ruc(),
    establishment: new Establishment(),
    establishment_validated: new Establishment(),
  }

  // VARIABLES PARA EL CONTROL DE LA INTERFAZ DE USUARIO
  
  actividadSelected = '-';
  estado_registro = '';
  mostrarOpciones = false;
  opcion_seleccionada = '';
  mostrarTerminosCondiciones = false;
  terminosCondiciones = false;
  mostrarIngresoDatos = false;
  mostrarPasosInferiores = false;
  mostrarDeclarations = false;
  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  
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
    this.opcion_seleccionada = event;
  }

  ruc_validated(event) {
    this.data_selected.ruc = event;
    this.mostrarPasosInferiores = false;
  }

  establishmentSelected(event) {
    const establishment_selected = event.establishment;
    if (this.data_selected.is_new_register) {
      establishment_selected.as_turistic_register_date = null;
    } else {
      establishment_selected.as_turistic_register_date = new Date(this.data_selectedregister.as_turistic_date);
    }
    this.data_selected.establishment = establishment_selected;
    this.data_selected.is_new_register
    this.mostrarPasosInferiores = event.showData;
    console.log(this.data_selected);
  }

  establishment_validated(event) {
    this.mostrarDeclarations = event.showNext;
    if (event.showNext) {
      this.data_selected.establishment_validated = event.establishment;
      
    // if (this.estaEnTabla) {
    //    if (this.selected_establishment_state == '') {
    //       this.selected_establishment_state = 'ACTIVO';
    //    }
    //    this.catastroRegisterDataService.update_ruc_code_id(this.idCatasterID, this.establishment.ruc_code_id, this.selected_establishment_state).then( resp_cat => {
    //    }).catch(e => { console.log(e); });
    // }
    
    }
  }

  change_page_button_click(event) {
    if (event == 'Paso I') {
      this.pasosSuperioresTabSet.select('pasoI');
    }
    if (event == 'Paso II') {
      this.pasosSuperioresTabSet.select('pasoII');
    }
    if (event == 'Paso 1') {
      this.pasosTabSet.select('paso1');
    }
    if (event == 'Paso 2') {
      this.pasosTabSet.select('paso2');
    }
    if (event == 'Paso 3') {
      this.pasosTabSet.select('paso3');
    }
  }

  validateRegisterSelectedData(event) {
    this.data_selected = {
      register: new Register(),
      is_new_register: true,
      ruc: new Ruc(),
      establishment: new Establishment(),
      establishment_validated: new Establishment(),
    }
    this.mostrarIngresoDatos = false;
    this.mostrarOpciones = false;
    this.mostrarPasosInferiores = false;
    if (!event.isNew) {
      if (event.register == null) {
        return;
      }
      this.data_selected.is_new_register = false;
      if (event.register.activity == 'ALOJAMIENTO') {
        this.actividadSelected = '1';
      }
      if (event.register.activity == 'ALIMENTOS Y BEBIDAS') {
        this.actividadSelected = '2';
      }
      if (event.register.activity == 'OPERACIÓN E INTERMEDIACIÓN') {
        this.actividadSelected = '3';
      }
      if(event.register.establishment_state.toUpperCase().trim() == "ACTIVO" || 
        event.register.establishment_state.toUpperCase().trim() == "ABIERTO" || 
        event.register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS ACIVOS") {
         this.estado_registro = 'ACTIVO';
      }
      if(event.register.establishment_state.toUpperCase().trim() == "ESTABLECIMIENTOS NO ACTIVOS" || 
        event.register.establishment_state.toUpperCase().trim() == "CERRADO") {
          this.estado_registro = 'CERRADO';
      }
      this.data_selected.register = event.register;
      this.mostrarOpciones = true;
    } else {
      this.mostrarIngresoDatos = true;
    }
  }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}