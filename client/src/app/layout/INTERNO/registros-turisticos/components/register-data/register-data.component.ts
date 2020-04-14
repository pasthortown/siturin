import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Register as RegisterCatastro} from 'src/app/models/CATASTRO/Register';
import { User } from 'src/app/models/profile/User';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {
  @ViewChild('pasosSuperiores') pasosSuperioresTabSet;
  @ViewChild('pasos') pasosTabSet;
  
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
  
  registers_by_ruc = [];

  user = new User();
  mostrarEstablecimientos = false;
  mostrarPasosInferiores = false;
  mostrarDeclarations = false;
  mostrarInformacionTuristica = false;

  mostrarIngresoDatos = false;
  tabActive = 'paso1';
  tabActiveSuperior = 'tab1';
  isEditable = false;

  constructor(private consultorDataService: ConsultorService) {
    
  }

  ngOnInit() {
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }
  
  refresh() {
    if (this.data_selected_table.register.register != null) {
      this.user.ruc = this.data_selected_table.register.ruc.number;
      this.data_selected_table.register.register.activity_id = this.data_selected_table.register.activity_id;
      this.mostrarIngresoDatos = true;
      this.getRegistersByRuc();
    } else {
      this.user.ruc = '';
      this.mostrarIngresoDatos = false;
    }
  }

  getRegistersByRuc() {
    this.consultorDataService.get_registers_by_ruc(this.user.ruc).then( r => {
      this.registers_by_ruc = r as any[];
    }).catch( e => { console.log(e); });
  }

  showTuristicInformation(event) {
    this.mostrarInformacionTuristica = event;
  }

  establishment_validated(event) {
    this.data_selected_table.register.register.provincia_code = event.establishment.provincia_code;
    this.mostrarDeclarations = event.showNext;
  }

  salir_turistic_information() {
    this.pasosTabSet.select('paso2');
  }

  establishmentSelected(event) {
    this.mostrarPasosInferiores = event.showData;
    this.mostrarDeclarations = false;
    this.mostrarInformacionTuristica = false;
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

  ruc_validated(event) {
    this.mostrarEstablecimientos = true;
    this.mostrarPasosInferiores = false;
  }

  changeTabActive(event) {
    this.tabActive = event.nextId;
  }

  changeTabActiveSuperior(event) {
    this.tabActiveSuperior = event.nextId;
  }
}
