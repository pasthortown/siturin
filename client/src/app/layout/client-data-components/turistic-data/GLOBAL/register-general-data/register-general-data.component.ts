import { ConsultorService } from './../../../../../services/negocio/consultor.service';
import { RegisterType } from './../../../../../models/ALOJAMIENTO/RegisterType';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Establishment } from './../../../../../models/BASE/Establishment';
import { Ruc } from './../../../../../models/DINARDAP/Ruc';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-general-data',
  templateUrl: './register-general-data.component.html',
  styleUrls: ['./register-general-data.component.scss']
})
export class RegisterGeneralDataComponent implements OnInit {
  @Input('ruc') ruc: Ruc = new Ruc();
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('register') register: Register = new Register();
  @Input('opcion_seleccionada') opcion_seleccionada: String = '';
  @Input('editable') editable: boolean = true;
  @Input('is_new_register') is_new_register: boolean = true;

  @Input('registers_on_establishment') registers_on_establishment: any[] = [];

  @Input('activate_alojamiento') activate_alojamiento: boolean = true;
  @Input('activate_alimentos_bebidas') activate_alimentos_bebidas: boolean = true;
  @Input('activate_operacion_intermediacion') activate_operacion_intermediacion: boolean = true;

  @Output('register_selected') register_selected: EventEmitter<Register> = new EventEmitter<Register>();

  regionSelectedCode = '-';
  classificationSelectedCode: String = '-';
  activity_id_incomming = 0;

  ultimo_registro = null;
  textoEstadoUltimaSolicitud = '';
  digitoEstadoUltimaSolicitud = '';
  
  register_types: any[] = [];

  register_types_alojamiento: RegisterType[] = [];
  register_types_alimentos_bebidas: RegisterType[] = [];
  register_types_operacion_intermediacion: RegisterType[] = [];
  
  regiones: RegisterType[] = [];
  clasifications_registers: RegisterType[] = [];
  categories_registers: RegisterType[] = [];

  canAlojamiento = false;
  canAlimentosBebidas = false;
  canOperacionIntermediacion = false;

  mostrarNumeroRegistro = false;
  tiene_solicitud_enviada = false;

  activity_id_from_registers_actives = 0;

  constructor(private consultorDataService: ConsultorService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
  }

  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {
    this.getRegisterTypes();
  }

  refresh() {
    this.mostrarNumeroRegistro = false;
    this.tiene_solicitud_enviada = false;
    const hasActives = this.hasActiveRegisters();
    if (!this.is_new_register) {
      if (this.register.state_on_catastro == 'CERRADO') {
          if (!hasActives) {
            this.activity_id_incomming = 0;
            this.register.activity_id = 0;
          } else {
            this.tiene_solicitud_enviada = true;
            this.activity_id_incomming = this.activity_id_from_registers_actives;
            this.getClasifications();
          }
      } else {
        if (this.register.system_source == 'SIETE' || this.register.system_source == 'SITURIN') {
          this.getDataToShowFromIncommingInfo();
          this.mostrarNumeroRegistro = true;
          this.registers_on_establishment.forEach(element => {
            if (element.register.register_type_id == this.register.register_type_id) {
              this.register = element.register;
              this.register.activity_id = element.activity_id;
            }
          });
          this.changeCategory();
        } else {
          this.register.activity_id = this.activity_id_incomming;
          this.getClasifications();
        }
      }
    } else {
      if (!hasActives) {
        this.activity_id_incomming = 0;
      } else {
        this.activity_id_incomming = this.activity_id_from_registers_actives;
        this.tiene_solicitud_enviada = true;
        this.getClasifications();
      }
    }
  }

  hasActiveRegisters(): boolean {
    let toReturn = false;
    this.registers_on_establishment.forEach(element => {
      if (element.register.register_type_id < 1000) {
        toReturn = true;
        this.activity_id_from_registers_actives = element.activity_id;
      }
    });
    return toReturn;
  }

  getDataToShowFromRegister(register_to_show) {
    this.register = register_to_show;
    this.register.activity_id = this.ultimo_registro.activity_id;
    this.register_selected.emit(this.register);
    this.getClasifications();
    if (this.ultimo_registro.activity_id == 1) {
      this.searchDataInRegisterTypeArray(this.register_types_alojamiento, this.ultimo_registro.register.register_type_id);
    }
    if (this.ultimo_registro.activity_id == 2) {
      this.searchDataInRegisterTypeArray(this.register_types_alimentos_bebidas, this.ultimo_registro.register.register_type_id);
    }
    if (this.ultimo_registro.activity_id == 3) {
      this.searchDataInRegisterTypeArray(this.register_types_operacion_intermediacion, this.ultimo_registro.register.register_type_id);
    }
  }

  getDataToShowFromIncommingInfo() {
    if (this.activity_id_incomming == 1) {
      this.searchDataInRegisterTypeArray(this.register_types_alojamiento);
    }
    if (this.activity_id_incomming == 2) {
      this.searchDataInRegisterTypeArray(this.register_types_alimentos_bebidas);
    }
    if (this.activity_id_incomming == 3) {
      this.searchDataInRegisterTypeArray(this.register_types_operacion_intermediacion);
    }
  }

  searchDataInRegisterTypeArray(register_types_array: RegisterType[], register_type_id?: number) {
    if (typeof register_type_id == 'undefined') {
      this.getClasifications();
      register_types_array.forEach(element => {
        if ((element.name == this.register.classification_incomming) && element.father_code == this.regionSelectedCode) {
          this.classificationSelectedCode = element.code;
          this.getCategories();
          this.categories_registers.forEach(category => {
            if (category.name == this.register.category_incomming) {
              this.register.register_type_id = category.id;
            }
          });
        }
      });
    } else {
      register_types_array.forEach(element => {
        if (element.id == register_type_id) {
          this.classificationSelectedCode = element.father_code;
          this.getCategories();
        }
      });
    }
  }

  getRegisterTypes() {
    this.register_types = [];
    this.register_types_alojamiento = [];
    this.register_types_alimentos_bebidas = [];
    this.register_types_operacion_intermediacion = [];
    this.consultorDataService.get_all_register_types().then( r => {
      // Cada item en la respuesta tiene la forma {register_type: new RegisterType(), activity_id: 1 2 o 3} 
      this.register_types = r as any[];
      this.register_types.forEach(element => {
        if (element.activity_id == 1) {
          this.register_types_alojamiento.push(element.register_type);
        }
        if (element.activity_id == 2) {
          this.register_types_alimentos_bebidas.push(element.register_type);
        }
        if (element.activity_id == 3) {
          this.register_types_operacion_intermediacion.push(element.register_type);
        }
      });
      this.getRegiones();
      this.refresh();
    }).catch( e => { console.log(e); });
  }

  getRegiones() {
    this.regiones = [];
    this.register_types_alojamiento.forEach(element => {
      if (element.father_code == '-') {
        this.regiones.push(element);
      }
      if (this.register.provincia_code == '0820') {
        this.regionSelectedCode = '2';
      } else {
        this.regionSelectedCode = '1';
      }
    });
  }

  buildCatalogFromArray(sourceArray: RegisterType[], destinyArray: RegisterType[], father_code: String) {
    sourceArray.forEach(element => {
      if (element.father_code == father_code) {
        if (element.id < 1000) {
          destinyArray.push(element);
        }
      }
    });
  }

  getClasifications() {
    this.clasifications_registers = [];
    let sourceArray = [];
    if (this.register.activity_id == 0) {
      return;
    }
    if (this.register.activity_id == 1) {
      sourceArray = this.register_types_alojamiento;
    }
    if (this.register.activity_id == 2) {
      sourceArray = this.register_types_alimentos_bebidas;
    }
    if (this.register.activity_id == 3) {
      sourceArray = this.register_types_operacion_intermediacion;
    }
    this.buildCatalogFromArray(sourceArray, this.clasifications_registers, this.regionSelectedCode);
  }

  getCategories() {
    this.categories_registers = [];
    let sourceArray = [];
    if (this.register.activity_id == 0) {
      return;
    }
    if (this.register.activity_id == 0) {
      return;
    }
    if (this.register.activity_id == 1) {
      sourceArray = this.register_types_alojamiento;
    }
    if (this.register.activity_id == 2) {
      sourceArray = this.register_types_alimentos_bebidas;
      this.searchForRegister(this.register_types_operacion_intermediacion, this.register.activity_id);
    }
    if (this.register.activity_id == 3) {
      sourceArray = this.register_types_operacion_intermediacion;
      this.searchForRegister(this.register_types_operacion_intermediacion, this.register.activity_id);
    }
    this.buildCatalogFromArray(sourceArray, this.categories_registers, this.classificationSelectedCode);
  }

  searchForRegister(register_types_array: RegisterType[], activity_id: number) {
    let register_found = null;
    this.registers_on_establishment.forEach(element => {
      if (element.activity_id == activity_id) {
        if (this.classificationSelectedCode == this.getClassificationFromRegisterType(register_types_array, element.register.register_type_id)) {
          register_found = element;
        }
      }
    });
    if (register_found != null) {
      this.register = register_found.register;
      this.register.activity_id = activity_id;
    }
    this.register_selected.emit(this.register);
  }

  getClassificationFromRegisterType(register_types_array: RegisterType[] , register_type_id: number): String {
    let classification_code: String = '';
    register_types_array.forEach(element => {
      if (element.id == register_type_id) {
        classification_code = element.father_code;
      }
    });
    return classification_code;
  }

  classificationsEnable(): boolean {
    if (this.opcion_seleccionada == 'activation' || 
        this.opcion_seleccionada == 'reclassification' || 
        this.opcion_seleccionada == 'ab_new_classification' ||
        this.opcion_seleccionada == 'registro') {
        return  true;
    }
    return false;
  }

  categoryEnable(): boolean {
    if (this.register.activity_id == 2 ||
        this.register.activity_id == 3
      ) {
        return false;
    }
    if (this.opcion_seleccionada == 'activation' || 
        this.opcion_seleccionada == 'recategorization' || 
        this.opcion_seleccionada == 'registro') {
        return  true;
    }
    return false;
  }

  actividadTuristicaEnable(): boolean {
    if (this.activity_id_incomming == 0 && !this.tiene_solicitud_enviada) {
      this.canAlojamiento = true;
      this.canAlimentosBebidas = true;
      this.canOperacionIntermediacion = true;
    }
    if (this.activity_id_incomming == 1) {
      this.canAlojamiento = true;
      this.canAlimentosBebidas = false;
      this.canOperacionIntermediacion = false;
    }
    if (this.activity_id_incomming == 2) {
      this.canAlojamiento = false;
      this.canAlimentosBebidas = true;
      this.canOperacionIntermediacion = false;
    }
    if (this.activity_id_incomming == 3) {
      this.canAlojamiento = false;
      this.canAlimentosBebidas = false;
      this.canOperacionIntermediacion = true;
    }
    if (this.opcion_seleccionada == 'activation'  && !this.tiene_solicitud_enviada) {
      this.canAlojamiento = true;
      this.canAlimentosBebidas = true;
      this.canOperacionIntermediacion = true;
    }
    if ((this.opcion_seleccionada == 'activation' || 
        this.opcion_seleccionada == 'registro') &&
        !this.tiene_solicitud_enviada) {
        return  true;
    }
    return false;
  }

  changeCategory() {
    this.register_selected.emit(this.register);
  }
}
