import { User } from 'src/app/models/profile/User';
import { UserService } from 'src/app/services/profile/user.service';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/models/ALOJAMIENTO/State';
import { StateService as StateALService} from 'src/app/services/CRUD/ALOJAMIENTO/state.service';
import { StateService as StateABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/state.service';
import { StateService as StateOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/state.service';

@Component({
  selector: 'app-cliente-interno-coordinador',
  templateUrl: './cliente-interno-coordinador.component.html',
  styleUrls: ['./cliente-interno-coordinador.component.scss']
})
export class ClienteInternoCoordinadorComponent implements OnInit {

  user = new User();

  data_selected = {row: null, register: null};

  states = { alojamiento: [],
    alimentos_bebidas: [],
    operacion_intermediacion: [],
  };

  register_types: any[] = [];
  register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  estados_tramites= [];

  tecnicosFinancieros = [];
  tecnicosZonales = [];
  
  constructor(
    private consultorDataService: ConsultorService,
    private state_alojamiento_DataService: StateALService,
    private state_alimentos_bebidas_DataService: StateABService,
    private state_operacion_intermediacion_DataService: StateOPService,
    private userDataService: UserService
    ) {}

  ngOnInit() {
    this.getStates();
    this.getRegisterTypes();
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
    }).catch( e => console.log(e));
  }

  getRegisterTypes() {
    this.register_types = [];
    const register_types_alojamiento = [];
    const register_types_alimentos_bebidas = [];
    const register_types_operacion_intermediacion = [];
    this.consultorDataService.get_all_register_types().then( r => {
      // Cada item en la respuesta tiene la forma {register_type: new RegisterType(), activity_id: 1 2 o 3} 
      this.register_types = r as any[];
      this.register_types.forEach(element => {
        if (element.activity_id == 1) {
          register_types_alojamiento.push(element.register_type);
        }
        if (element.activity_id == 2) {
          register_types_alimentos_bebidas.push(element.register_type);
        }
        if (element.activity_id == 3) {
          register_types_operacion_intermediacion.push(element.register_type);
        }
      });
      this.register_types_block.register_types_alojamiento = register_types_alojamiento;
      this.register_types_block.register_types_alimentos_bebidas = register_types_alimentos_bebidas;
      this.register_types_block.register_types_operacion_intermediacion = register_types_operacion_intermediacion;
    }).catch( e => { console.log(e); });
  }

  getStates() {
    this.estados_tramites = [];
    this.states = { alojamiento: [],
      alimentos_bebidas: [],
      operacion_intermediacion: [],
    };
    this.state_alojamiento_DataService.get().then( r => {
      this.states.alojamiento = r as State[];
      this.buildEstadostramite(this.states.alojamiento);
    }).catch( e => { console.log(e); });
    this.state_alimentos_bebidas_DataService.get().then( r => {
      this.states.alimentos_bebidas = r as State[];
      this.buildEstadostramite(this.states.alimentos_bebidas);
    }).catch( e => { console.log(e); });
    this.state_operacion_intermediacion_DataService.get().then( r => {
      this.states.operacion_intermediacion = r as State[];
      this.buildEstadostramite(this.states.operacion_intermediacion);
    }).catch( e => { console.log(e); });
  }
  
  buildEstadostramite(sourceArray: any[]) {
    sourceArray.forEach(element => {
      if ((element.father_code == '-') && (element.name != 'Documentación Entregada')) {
        let existe_a = false;
        this.estados_tramites.forEach(e1 => {
          if (e1.name == element.name) {
            existe_a = true;
          }
        });
        if (!existe_a) {
          this.estados_tramites.push(element);
        }
      } 
    });
    this.estados_tramites.sort( (s1, s2) => {
      if (s1.name > s2.name) {
        return 1;
      }
      if (s1.name < s2.name) {
        return -1;
      }
      return 0;
    });
  }

  register_selected(event) {
    this.data_selected = event;
  }

  financieros_change(event) {
    this.tecnicosFinancieros = event;
  }

  inspectores_change(event) {
    this.tecnicosZonales = event;
  }
}