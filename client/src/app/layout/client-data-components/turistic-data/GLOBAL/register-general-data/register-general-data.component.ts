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

  @Input('modules_activation') modules_activation: any = {
    activate_alojamiento: false,
    activate_alimentos_bebidas: false,
    activate_operacion_intermediacion: false
  };

  @Input('register_types') register_types: any = null;

  @Output('finish_selected') finish_selected: EventEmitter<any> = new EventEmitter<any>();

  regionSelectedCode = '-';
  classificationSelectedCode: String = '-';
  activity_id_incomming = 0;

  register_types_alojamiento: RegisterType[] = [];
  register_types_alimentos_bebidas: RegisterType[] = [];
  register_types_operacion_intermediacion: RegisterType[] = [];
  
  activate_alojamiento = false;
  activate_alimentos_bebidas = false;
  activate_operacion_intermediacion = false;

  regiones: RegisterType[] = [];
  clasifications_registers: RegisterType[] = [];
  categories_registers: RegisterType[] = [];

  canAlojamiento = false;
  canAlimentosBebidas = false;
  canOperacionIntermediacion = false;

  mostrarNumeroRegistro = false;
  tiene_solicitud_enviada = false;

  constructor() {
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {
    this.register_types_alojamiento = this.register_types.register_types_alojamiento;
    this.register_types_alimentos_bebidas = this.register_types.register_types_alojamiento;
    this.register_types_operacion_intermediacion = this.register_types.register_types_alojamiento;
    this.activate_alojamiento = this.modules_activation.activate_alojamiento;
    this.activate_alimentos_bebidas = this.modules_activation.activate_alojamiento;
    this.activate_operacion_intermediacion = this.modules_activation.activate_alojamiento;
    this.getRegiones();
    this.refresh();
  }

  refresh() {
    this.loadCatalogos();
    this.activity_id_incomming = this.register.activity_id;
    this.mostrarNumeroRegistro = false;
    this.tiene_solicitud_enviada = false;
    this.classificationSelectedCode = '-';
    this.register.register_type_id = 0;
    this.hasActiveRegisters();
    if (this.register.system_source == 'SITURIN' && this.opcion_seleccionada != 'activation') {
      this.mostrarNumeroRegistro = true;
      this.getDataToShowFromIncommingInfo();
    }
    if (this.register.system_source == 'SIETE') {
      this.getDataToShowFromIncommingInfo();
    }
    if (this.activity_id_incomming != 0) {
      this.getClasifications();
    }
    if (this.register.register_type_id != 0) {
      this.getDataToShowFromRegisterType();
    }
  }

  hasActiveRegisters() {
    this.registers_on_establishment.forEach(element => {
      if (element.register.register_type_id < 1000) {
        this.tiene_solicitud_enviada = true;
        this.activity_id_incomming = element.activity_id;
      }
    });
  }

  getDataToShowFromRegisterType() {
    if (this.activity_id_incomming == 1) {
      this.searchDataInRegisterTypeArray(this.register_types_alojamiento, this.register.register_type_id);
    }
    if (this.activity_id_incomming == 2) {
      this.searchDataInRegisterTypeArray(this.register_types_alimentos_bebidas, this.register.register_type_id);
    }
    if (this.activity_id_incomming == 3) {
      this.searchDataInRegisterTypeArray(this.register_types_operacion_intermediacion, this.register.register_type_id);
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
          if (this.register.activity_id == 1) {
            if (element.id !== 46 && element.id !== 47) {
              destinyArray.push(element);
            }
          } else {
            destinyArray.push(element);
          }
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
      this.notificar();
    }
    if (this.register.activity_id == 3) {
      sourceArray = this.register_types_operacion_intermediacion;
      this.notificar();
    }
    this.buildCatalogFromArray(sourceArray, this.categories_registers, this.classificationSelectedCode);
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
    if (this.opcion_seleccionada == 'reclassification' || 
        this.opcion_seleccionada == 'activation' || 
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
    this.notificar();
  }

  notificar() {
    let data_output = { 
      register_type_id: this.register.register_type_id,
      register_classification: this.classificationSelectedCode,
      register_region_code: this.regionSelectedCode
    };
    this.finish_selected.emit(data_output);
  }
}
