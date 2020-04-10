import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOPService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { RegisterRequisite } from './../../../models/ALIMENTOSBEBIDAS/RegisterRequisite';
import { RequisiteService as RequisiteOPService } from './../../../services/CRUD/OPERACIONINTERMEDIACION/requisite.service';
import { RequisiteService as RequisiteALService } from './../../../services/CRUD/ALOJAMIENTO/requisite.service';
import { RequisiteService as RequisiteABService } from './../../../services/CRUD/ALIMENTOSBEBIDAS/requisite.service';
import { AuthorizationAttachment } from './../../../models/ALOJAMIENTO/AuthorizationAttachment';
import { PropertyTitleAttachment } from './../../../models/ALOJAMIENTO/PropertyTitleAttachment';
import { FloorAuthorizationCertificate } from './../../../models/BASE/FloorAuthorizationCertificate';
import { ConsultorService } from 'src/app/services/negocio/consultor.service';
import { RegisterType } from './../../../models/ALIMENTOSBEBIDAS/RegisterType';
import { Register } from './../../../models/ALOJAMIENTO/Register';
import { Establishment } from './../../../models/BASE/Establishment';
import { Ruc } from './../../../models/DINARDAP/Ruc';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turistic-data',
  templateUrl: './turistic-data.component.html',
  styleUrls: ['./turistic-data.component.scss']
})
export class TuristicDataComponent implements OnInit {
  @Input('ruc') ruc: Ruc = new Ruc();
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('register') register: Register = new Register();
  @Input('opcion_seleccionada') opcion_seleccionada: String = '';
  @Input('editable') editable: boolean = true;
  @Input('registers_by_ruc') registers_by_ruc: any[] = [];
  @Input('is_new_register') is_new_register: boolean = true;  

  @Output('salir_forced') salir_forced: EventEmitter<boolean> = new EventEmitter<boolean>();

  activity_id_from_registers_actives = 0;

  register_validated: Register = new Register();
  register_data_from_BDD: any = null;

  modules_activation: any = {
    activate_alojamiento: true,
    activate_alimentos_bebidas: true,
    activate_operacion_intermediacion: true
  };

  establishment_registers = [];
  requisites = [];

  register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  register_types: any[] = [];

  attachments = {
    authorization_condominos: new AuthorizationAttachment(),
    property_title: new PropertyTitleAttachment(),
    floor_authorization_certificate: new FloorAuthorizationCertificate()
  }

  showRequisites = false;
  classificationSelectedCode = '';;

  constructor(private consultorDataService: ConsultorService,
    private requisite_operacion_intermediacion_data_service: RequisiteOPService,
    private requisite_alimentos_bebidas_data_service: RequisiteABService,
    private requisite_alojamiento_data_service: RequisiteALService,
    private register_operacion_intermediacion_data_service: RegisterOPService,
    private register_alimentos_bebidas_data_service: RegisterABService,
    private register_alojamiento_data_service: RegisterALService) {
    
  }

  ngOnInit() {
    this.getRegisterTypes();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.get_registers_on_establishment(); // Obtiene los Registros asociados al establecimiento
    this.validateInitialData();
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
      this.refresh();
    }).catch( e => { console.log(e); });
  }

  get_registers_on_establishment() {
    const registros_establecimiento = [];
    const register_codes_aviable = [];
    this.establishment_registers = [];
    const solicitudes_pendientes = [];
    const id_register_pendientes = [];
    this.registers_by_ruc.forEach(element => {
      if (element.establishment.id == this.establishment.id) {
        if (element.register.code == 'PENDIENTE' || element.register.code == '') {
          solicitudes_pendientes.push(element);
          let existe = false;
          id_register_pendientes.forEach(reg_id => {
            if (reg_id == element.register.id) {
              existe = true;
            }
          });
          if (!existe) {
            id_register_pendientes.push(element.register.id);
          }
        } else {
          registros_establecimiento.push(element);
          let existe = false;
          register_codes_aviable.forEach(reg_code => {
            if (reg_code == element.register.code) {
              existe = true;
            }
          });
          if (!existe) {
            register_codes_aviable.push(element.register.code);
          }
        }
      }  
    });
    register_codes_aviable.forEach(reg_code => {
      let last_register_by_code = null;
      registros_establecimiento.forEach(element => {
        if (element.register.code == reg_code) {
          if (last_register_by_code == null) {
            last_register_by_code = element;
          } else {
            const fecha_e1 = new Date(last_register_by_code.register.created_at.toString());
            const fecha_e2 = new Date(element.register.created_at.toString());
            if (fecha_e2.getTime() > fecha_e1.getTime()) {
              last_register_by_code = element;
            }
          }
        }
      });
      let existe = false;
      this.establishment_registers.forEach(element => {
        if (element == last_register_by_code) {
          existe = true;
        }
      });
      if (!existe) {
        this.establishment_registers.push(last_register_by_code);
      }
    });
    id_register_pendientes.forEach(reg_id => {
      let last_register_by_id = null;
      solicitudes_pendientes.forEach(element => {
        if (element.register.id == reg_id) {
          if (last_register_by_id == null) {
            last_register_by_id = element;
          } else {
            const fecha_e1 = new Date(last_register_by_id.register.created_at.toString());
            const fecha_e2 = new Date(element.register.created_at.toString());
            if (fecha_e2.getTime() > fecha_e1.getTime()) {
              last_register_by_id = element;
            }
          }
        }
      });
      let existe = false;
      this.establishment_registers.forEach(element => {
        if (element == last_register_by_id) {
          existe = true;
        }
      });
      if (!existe) {
        this.establishment_registers.push(last_register_by_id);
      }
    });
  }

  hasActiveRegisters(): boolean {
    let toReturn = false;
    this.establishment_registers.forEach(element => {
      if (element.register.register_type_id < 1000) {
        toReturn = true;
        this.activity_id_from_registers_actives = element.activity_id;
      } else {
        const textoEstado = element.status_register.state_id.toString();
        const digitoEstado = textoEstado.substring(textoEstado.length-1, textoEstado.length);
        toReturn = true;
        if (digitoEstado == 3) {
          // INACTIVACION RECHAZADA
        } else {
          if (digitoEstado == 9) {
            // INACTIVACION APROBADA
          } else {
            Swal.fire({
              title: 'Solicitud de Inactivación en Curso',
              text: 'El sistema, ha detectado que usted tiene una solicitud de Inactivación en Proceso para éste establecimiento. Por favor espere que la solicitud sea atendia, para realizar nuevas solicitudes.',
              type: 'warning',
              showCancelButton: false,
              confirmButtonText: 'De acuerdo',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                this.salir_forced.emit(true);
              } else {
                this.salir_forced.emit(true);
              }
            });
          }
        }
      }
    });
    return toReturn;
  }

  validateInitialData() {
    const hasActives = this.hasActiveRegisters();
    if (!this.is_new_register) {
      if (this.register.state_on_catastro == 'CERRADO') {
          if (!hasActives) {
            this.register.activity_id = 0;
          } else {
            this.register.activity_id = this.activity_id_from_registers_actives;
          }
      } else {
        if (!(this.register.system_source == 'SIETE' || this.register.system_source == 'SITURIN')) {
          this.register.register_type_id = 0;
        }
      }
    } else {
      if (!hasActives) {
        this.register.activity_id = 0;
      } else {
        if (this.activity_id_from_registers_actives == 1 ||
          this.activity_id_from_registers_actives == 3) {
            let pendiente_encontrado = false;
            this.establishment_registers.forEach(element => {
              if (element.register.code == 'PENDIENTE' || element.register.code == '') {
                if (element.activity_id == this.activity_id_from_registers_actives) {
                  this.register = element.register;
                  this.register.activity_id = this.activity_id_from_registers_actives;
                  pendiente_encontrado = true;
                }
              }
            });
            if (!pendiente_encontrado) {
              this.establishment_registers.forEach(element => {
                if (element.register.code !== 'PENDIENTE' || element.register.code !== '') {
                  if (element.activity_id == this.activity_id_from_registers_actives) {
                    this.register = element.register;
                    this.register.activity_id = element.activity_id;
                  }
                }
              });
            }
        } else {
          this.register.activity_id = this.activity_id_from_registers_actives;
        }
      }
    }
  }
  
  classification_category_selected(event) {
    let sourceArray = [];
    if (event.activity_id == 1) {
      sourceArray = this.register_types_block.register_types_alojamiento;
    }
    if (event.activity_id == 2) {
      sourceArray = this.register_types_block.register_types_alimentos_bebidas;
    }
    if (event.activity_id == 3) {
      sourceArray = this.register_types_block.register_types_operacion_intermediacion;
    }
    this.classificationSelectedCode = event.register_classification;
    this.register_validated.register_type_id = event.register_type_id;
    this.searchForRegister(sourceArray, event.activity_id, event.register_classification, event.register_region_code);
  }

  searchForRegister(register_types_array: RegisterType[], activity_id: number, classificationSelectedCode: String, regionSelectedCode: String) {
    let register_found = null;
    this.establishment_registers.forEach(element => {
      if (element.activity_id == activity_id) {
        if (classificationSelectedCode == this.getClassificationFromRegisterType(register_types_array, element.register.register_type_id)) {
          register_found = element;
        }
      }
    });
    if (register_found != null) {
      this.register_validated = register_found.register;
      this.register_validated.complementary_service_types_on_register = []; 
      this.register_validated.service_types_on_register = [];
      this.register_validated.kitchen_types_on_register = [];
      this.register_validated.complementary_service_foods_on_register = [];
      this.register_validated.capacities_on_register = [];
      this.register.register_type_id = register_found.register.register_type_id;
    }
    this.register_validated.activity_id = activity_id;
    this.register_validated.classification_selected_code = classificationSelectedCode;
    this.register_validated.region_selected_code = regionSelectedCode;
    this.showRegisterData();
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

  authorization_condominos(event) {
    this.attachments.authorization_condominos = event;
  }

  property_title(event) {
    this.attachments.property_title = event;
  }

  floor_authorization_certificate(event) {
    this.attachments.floor_authorization_certificate = event;
  }

  showRegisterData() {
    if (this.register_validated.id == 0) {
      this.startRequisitesByRegisterType();  
    } else {
      if (this.register_validated.activity_id == 1) {
        this.register_alojamiento_data_service.get_register_data(this.register_validated.id).then( r => {
          this.register_data_from_BDD = r;
          this.dataRegisterRecived();
        }).catch( e => { console.log(e); });
      }
      if (this.register_validated.activity_id == 2) {
        this.register_alimentos_bebidas_data_service.get_register_data(this.register_validated.id).then( r => {
          this.register_data_from_BDD = r;
          this.dataRegisterRecived();
        }).catch( e => { console.log(e); });
      }
      if (this.register_validated.activity_id == 3) {
        this.register_operacion_intermediacion_data_service.get_register_data(this.register_validated.id).then( r => {
          this.register_data_from_BDD = r;
          this.dataRegisterRecived();
        }).catch( e => { console.log(e); });
      }
    }
  }

  dataRegisterRecived() {
    console.log(this.register_data_from_BDD);
    this.register_validated.complementary_service_types_on_register = this.register_data_from_BDD.complementary_service_types_on_register; 
    this.register_validated.service_types_on_register = this.register_data_from_BDD.service_types;
    this.register_validated.kitchen_types_on_register = this.register_data_from_BDD.kitchen_types;
    this.register_validated.complementary_service_foods_on_register = this.register_data_from_BDD.complementary_service_foods_on_register;
    this.register_validated.capacities_on_register = this.register_data_from_BDD.capacities_on_register;
    this.startRequisitesByRegisterType(this.register_data_from_BDD.requisites);
  }

  startRequisitesByRegisterType(requisites_incommming?: RegisterRequisite[]) {
    this.requisites = [];
    let filter = 0;
    this.showRequisites = false;
    if (this.register_validated.activity_id == 1) {
      this.requisite_alojamiento_data_service.get_filtered(this.register_validated.register_type_id).then( r => {
        const requisitesByRegisterType = r as any[];
        if (typeof requisites_incommming !== 'undefined') {
          this.organize_requisites(requisitesByRegisterType, requisites_incommming);
        } else {
          this.organize_requisites(requisitesByRegisterType);
        }
      }).catch( e => { console.log(e) });
    }
    if (this.register_validated.activity_id == 2) {
      this.register_types_block.register_types_alimentos_bebidas.forEach(element => {
        if (element.code == this.classificationSelectedCode) {
          filter = element.id
        }
      });
      this.requisite_alimentos_bebidas_data_service.get_filtered(filter).then( r => {
        const requisitesByRegisterType = r as any[];
        if (typeof requisites_incommming !== 'undefined') {
          this.organize_requisites(requisitesByRegisterType, requisites_incommming);
        } else {
          this.organize_requisites(requisitesByRegisterType);
        }
      }).catch( e => { console.log(e) }); 
    }
    if (this.register_validated.activity_id == 3) {
      this.register_types_block.register_types_operacion_intermediacion.forEach(element => {
        if (element.code == this.classificationSelectedCode) {
          filter = element.id
        }
      });
      this.requisite_operacion_intermediacion_data_service.get_filtered(filter).then( r => {
        const requisitesByRegisterType = r as any[];
        if (typeof requisites_incommming !== 'undefined') {
          this.organize_requisites(requisitesByRegisterType, requisites_incommming);
        } else {
          this.organize_requisites(requisitesByRegisterType);
        }
      }).catch( e => { console.log(e) });
    }
  }

  organize_requisites(requisitesByRegisterType: any[], requisites_incommming?: RegisterRequisite[]) {
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
      this.requisites.push(newRegisterRequisite);
    });
    this.showRequisites = true;
    if (typeof requisites_incommming !== 'undefined') {
      this.requisites.forEach(requisite => {
        requisites_incommming.forEach(requisite_incomming => {
          if (requisite.requisite_id == requisite_incomming.requisite_id) {
            requisite.value = requisite_incomming.value;
            requisite.fullfill = requisite_incomming.fullfill;
            requisite.id = requisite_incomming.id;
            requisite.register_id = requisite_incomming.register_id;
          }
        });
      });
    }  
    this.requisites.sort(function(a, b) {
      const a_id = a.requisite_id;
      const b_id = b.requisite_id;
      return a_id > b_id ? 1 : a_id < b_id ? -1 : 0;
    });
  }

  category_change_requisites(event) {
    this.register.register_type_id = event;
  }

  lista_precios_ab(event) {
    console.log(event);
  }
}
