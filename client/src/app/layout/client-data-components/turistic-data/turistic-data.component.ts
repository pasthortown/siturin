import { Ubication } from './../../../models/BASE/Ubication';
import { ProcedureJustification } from './../../../models/ALIMENTOSBEBIDAS/ProcedureJustification';
import { Tariff } from 'src/app/models/ALOJAMIENTO/Tariff';
import { LanguageService } from './../../../services/CRUD/BASE/language.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TariffType } from './../../../models/ALOJAMIENTO/TariffType';
import { TariffTypeService } from './../../../services/CRUD/ALOJAMIENTO/tarifftype.service';
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
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { CapacityTypeService as CapacityTypeABService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/capacitytype.service';

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
  @Output('preview_page_button_click') preview_page_button_click: EventEmitter<string> = new EventEmitter<string>();
  
  activity_id_from_registers_actives = 0;

  register_validated: Register = new Register();
  register_data_from_BDD: any = null;
  tarifarioRack = {cabecera: [], valores: []};
  tarifas: any[] = [];

  capacity_types_alimentos_bebidas = [];

  procedureJustification = new ProcedureJustification();

  register_type_data_selected  = { 
    register_type_id: 0,
    register_classification: '',
    register_region_code: '',
    activity_id: 0
  };

  listasPrecios: any[] = [];

  modules_activation: any = {
    activate_alojamiento: true,
    activate_alimentos_bebidas: true,
    activate_operacion_intermediacion: true
  };

  establishment_registers: any[] = [];
  requisites: any[] = [];

  register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  register_types: any[] = [];
  ubications: Ubication[] = [];

  attachments = {
    authorization_condominos: new AuthorizationAttachment(),
    property_title: new PropertyTitleAttachment(),
    floor_authorization_certificate: new FloorAuthorizationCertificate()
  }

  showRequisites = false;
  display_register_data = false;
  classificationSelectedCode = '';;

  guardando = false;

  constructor(private toastr: ToastrManager,
    private consultorDataService: ConsultorService,
    private tariffTypeDataService: TariffTypeService,
    private capacityTypeABDataService: CapacityTypeABService,
    private ubicationDataService: UbicationService,
    private requisite_operacion_intermediacion_data_service: RequisiteOPService,
    private requisite_alimentos_bebidas_data_service: RequisiteABService,
    private requisite_alojamiento_data_service: RequisiteALService,
    private languageDataService: LanguageService,
    private register_operacion_intermediacion_data_service: RegisterOPService,
    private register_alimentos_bebidas_data_service: RegisterABService,
    private register_alojamiento_data_service: RegisterALService) {
  }

  ngOnInit() {
    this.loadCatalogos();
    this.getRegisterTypes();
  }

  loadCatalogos() {
    this.getUbications();
    this.getCapacityTypes();
  }
  
  getCapacityTypes() {
    this.capacity_types_alimentos_bebidas = [];
    this.capacityTypeABDataService.get().then( r => {
       this.capacity_types_alimentos_bebidas = r as any[];
    }).catch( e => { console.log(e); });
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.get_registers_on_establishment(); // Obtiene los Registros asociados al establecimiento
    this.validateInitialData();
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
    }).catch( e => { console.log(e); });
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
    console.log(this.establishment_registers);
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
    this.display_register_data = false;
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
    this.register_type_data_selected  = { 
      register_type_id: event.register_type_id,
      register_classification: event.register_classification,
      register_region_code: event.register_region_code,
      activity_id: event.activity_id
    };
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
      this.register.register_type_id = register_found.register.register_type_id;
      this.register_validated.register_type_id = register_found.register.register_type_id;
      this.register_validated.complementary_service_types_on_register = []; 
      this.register_validated.service_types_on_register = [];
      this.register_validated.kitchen_types_on_register = [];
      this.register_validated.complementary_service_foods_on_register = [];
      this.register_validated.capacities_on_register = [];
      this.register_validated.sales_representatives = [];
      this.register_validated.turistic_guides = [];
      this.register_validated.transport_companies = [];
    } else {
      this.register_validated = new Register();
      this.register_validated.register_type_id = this.register_type_data_selected.register_type_id;
    }
    if (activity_id == 1) {
      this.initTarifarioRack();
    }
    this.register_validated.activity_id = activity_id;
    this.register_validated.classification_selected_code = classificationSelectedCode;
    this.register_validated.region_selected_code = regionSelectedCode;
    this.register_validated.establishment_id = this.establishment.id;
    if (register_found == null) {
      this.display_register_data = true;
    }
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
    this.register_validated.complementary_service_types_on_register = this.register_data_from_BDD.complementary_service_types_on_register; 
    this.register_validated.service_types_on_register = this.register_data_from_BDD.service_types;
    this.register_validated.kitchen_types_on_register = this.register_data_from_BDD.kitchen_types;
    this.register_validated.complementary_service_foods_on_register = this.register_data_from_BDD.complementary_service_foods_on_register;
    this.register_validated.capacities_on_register = this.register_data_from_BDD.capacities_on_register;
    this.register_validated.sales_representatives = this.register_data_from_BDD.sales_representatives;
    this.register_validated.turistic_guides = this.register_data_from_BDD.turistic_guides;
    this.register_validated.transport_companies = this.register_data_from_BDD.transport_companies;
    this.startRequisitesByRegisterType(this.register_data_from_BDD.requisites);
  }

  initTarifarioRack() {
    this.tarifas = [];
    this.tarifarioRack = {cabecera: [{valor:'Tipo de Habitación', padre: '', hijo: ''}], valores: []};
    this.tariffTypeDataService.get().then( r => {
      const result = r as TariffType[];
      result.forEach(father => {
        if(father.father_code == '-'){
          const tariff_father: TariffType = father;
          const tariff_child: TariffType[] = [];
          result.forEach(child => {
            if(child.father_code == father.code) {
              child.is_reference = father.is_reference;
              tariff_child.push(child);
              this.tarifarioRack.cabecera.push({valor:'Tarifa por ' + tariff_father.name + ' en ' + child.name, padre:tariff_father.name, hijo: child.name});
            }
          });
          this.tarifas.push({father: tariff_father, childs: tariff_child});
        }
      });
    }).catch( e => { console.log(e); });
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
    this.display_register_data = true;
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

  previewPage() {
    this.preview_page_button_click.emit('Paso 2');
  }

  lista_precios_ab(event) {
    this.listasPrecios = event;
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

  guardarRegistro() {
    this.register_validated.requisites = this.requisites;
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de enviar la solicitud al Ministerio de Turismo? Tome en cuenta que una vez enviada la solicitud, la información no podrá ser modificada; y ésta, será verificada mediante inspección.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (this.register_validated.activity_id == 1) {
          this.saveAlojamiento();
        }  
        if (this.register_validated.activity_id == 2) {
          this.saveAlimentosBebidas();
        }
        if (this.register_validated.activity_id == 3) {
          this.saveOperacionIntermediacion();
        }
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

  validateTarifarioRackIngresado(): boolean {
    let aprueba = true;
    this.tarifarioRack.valores.forEach( tariffRack => {
       tariffRack.tariffs.forEach( tariff => {
          if (tariff.tariff.price == 0) {
             aprueba = false;
          }
       });
    });
    return aprueba;
  }

  validateHabitaciones(): boolean {
    const capacidadesRevisadas = [];
    let continueChecking = true;
    this.register_validated.capacities_on_register.forEach(capacity => {
       if (continueChecking) {
          let existe = false;
          capacidadesRevisadas.forEach(element => {
             if (element == capacity.capacity_type_id) {
                continueChecking = false;
                existe = true;
             }
          });
          if (!existe) {
             capacidadesRevisadas.push(capacity.capacity_type_id);
          }
       }
    });
    if (!continueChecking) {
       return false;
    }
    if (this.register_validated.total_spaces == 0){
       return false;
    }
    if (this.register_validated.total_beds == 0){
    return false;
    }
    if (this.register_validated.total_habitations == 0){
       return false;
    }
    if (this.register_validated.total_spaces == 0){
       return false;
    }
    if (this.register_validated.register_type_id == 31 || this.register_validated.register_type_id == 45) {
       if (this.register_validated.total_spaces > 6) {
          return false;
       }
       if (this.register_validated.total_habitations < 2 || this.register_validated.total_habitations > 4) {
          return false;
       }
    }
    return true;
  }

  validateReclassificationRecategorization(): boolean {
    let sourceArray = [];
    if (this.register_validated.activity_id == 1) {
      sourceArray = this.register_types_block.register_types_alojamiento;
    }
    if (this.register_validated.activity_id == 2) {
      sourceArray = this.register_types_block.register_types_alimentos_bebidas;
    }
    if (this.register_validated.activity_id == 3) {
      sourceArray = this.register_types_block.register_types_operacion_intermediacion;
    }
    if (this.opcion_seleccionada == 'reclassification') {
      let newClassification = '';
      sourceArray.forEach(element => {
        if (element.code == this.classificationSelectedCode) {
          newClassification = element.name;
        }
      });
      if (this.register.classification_incomming.toUpperCase() == newClassification.toUpperCase()) {
        this.toastr.errorToastr('Debe seleccionar una Clasificación diferente a la que ya posee.', 'RECLASIFICACIÓN');
        return false;
      }
    }
    if (this.opcion_seleccionada == 'recategorization') {
      let newCategory = '';
      sourceArray.forEach(element => {
         if (element.id == this.register_validated.register_type_id) {
            newCategory = element.name.toString();
         }
      });
      if (this.register.category_incomming.toUpperCase() == newCategory.toUpperCase()) {
         this.toastr.errorToastr('Debe seleccionar una Categoría diferente a la que ya posee.', 'RECATEGORIZACIÓN');
         return false;
      }
    }
    return true;
  }

  validateRequisites(): boolean {
    if (!(this.opcion_seleccionada == 'actualization' || this.opcion_seleccionada == 'actualization_costs')) {
      let mostradoError = false;
      this.register_validated.requisites.forEach(element => {
        if (element.HTMLtype == 'TRUE / FALSE' && element.fullfill) {
          element.value = 'true';
        }
        let esgrupo = false;
        if (element.HTMLtype == "GRUPO 0" || element.HTMLtype == "GRUPO 1" || element.HTMLtype == "GRUPO 2" || element.HTMLtype == "GRUPO 3" || element.HTMLtype == "GRUPO 4" || element.HTMLtype == "GRUPO 5" || element.HTMLtype == "GRUPO 6") {
          esgrupo = true;
        }
        if (!mostradoError && !esgrupo && element.mandatory && (element.value == 'false' || element.value == '0')) {
          this.toastr.errorToastr('La repuesta seleccionada en los requisitos obligatorios no corresponde a la admitida para la categoría seleccionada.', 'Normativa');
          mostradoError = true;
        }
      });
      if (mostradoError) {
        return false;
      } 
    }
    return true;
  }
  
  validateAlojamientoData(): boolean {
    let toReturn = true;
    if (!this.validateTarifarioRackIngresado()){
      this.toastr.errorToastr('Existe inconsistencia en los valores de las tarifas ingresadas.', 'Nuevo');
      toReturn = false;
    }
    if (!this.validateHabitaciones()) {
      this.toastr.errorToastr('Existe inconsistencia en los valores de las capacidades.', 'Nuevo');
      toReturn = false;
    }
    if (this.attachments.property_title.property_title_attachment_file === '' && (this.register_validated.register_type_id == 47 || this.register_validated.register_type_id == 46)){
      this.toastr.errorToastr('Debe cargar el título de propiedad de su establecimiento.', 'Nuevo');
      toReturn = false;
    }
    if (!this.validateReclassificationRecategorization()) {
      toReturn = false;
    }
    if (this.attachments.floor_authorization_certificate.floor_authorization_certificate_file === ''){
      this.toastr.errorToastr('Debe cargar el certificado de uso de suelo.', 'Nuevo');
      toReturn = false;
    }
    if (!this.validateRequisites()) {
      toReturn = false;
    }
    return toReturn;
  }

  getTipoTramite(): string {
    let tipo_tramite = 'Registro';
    this.procedureJustification.justification = "Registro";
    this.register_validated.status = 11;
    this.procedureJustification.procedure_id = 6;
    if (this.opcion_seleccionada == 'actualization'){
      tipo_tramite = 'Actualización';
      this.procedureJustification.justification = "Actualización";
      this.register_validated.status = 41;
      this.procedureJustification.procedure_id = 4;
    }
    if (this.opcion_seleccionada == 'activation'){
      tipo_tramite = 'Reingreso';
      this.procedureJustification.justification = "Reingreso";
      this.procedureJustification.procedure_id = 1;
      this.register_validated.status = 61;
    }
    if (this.opcion_seleccionada == 'reclassification'){
      tipo_tramite = 'Reclasificación';
      this.register_validated.status = 21;
      this.procedureJustification.procedure_id = 2;
      this.procedureJustification.justification = "Reclasificación";
    }
    if (this.opcion_seleccionada == 'recategorization'){
      tipo_tramite = 'Recategorización';
      this.register_validated.status = 31;
      this.procedureJustification.procedure_id = 3;
      this.procedureJustification.justification = "Recategorización";
    }
    tipo_tramite = tipo_tramite.toUpperCase();
    return tipo_tramite;
  }

  getUbicationData(): any {
    const toReturn = {
      provincia: new Ubication(),
      canton: new Ubication(),
      parroquia: new Ubication(),
      zonal: new Ubication(),
      iniciales_cordinacion_zonal: ''
    };
    this.ubications.forEach(element => {
      if (element.id == this.establishment.ubication_id) {
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
    const zonalName = toReturn.zonal.name.split(' ');
    toReturn.iniciales_cordinacion_zonal = zonalName[zonalName.length - 1].toUpperCase();
    return toReturn;
  }

  saveAlojamiento() {
    console.log(this.register_validated);
    console.log(this.tarifarioRack);
    console.log(this.attachments);
    console.log(this.establishment);
    console.log('alojamiento');
    if (!this.validateAlojamientoData()) {
      return;
    }
    this.guardando = true;
    let tipo_tramite = this.getTipoTramite();
    const today = new Date();
    const actividad = 'ALOJAMIENTO';
    const ubicationData = this.getUbicationData();
    return;
    this.languageDataService.save_languajes(this.establishment.id, this.establishment.languages_on_establishment).then( r => {
    }).catch( e => { console.log(e); });
    const tariffs: Tariff[] = [];
    this.tarifarioRack.valores.forEach(tarifRackValor => {
      const idTipoCapacidad = tarifRackValor.idTipoCapacidad;
      tarifRackValor.tariffs.forEach(tariff => {
         tariff.tariff.capacity_type_id = idTipoCapacidad;
         tariffs.push(tariff.tariff);
      });
    });  
    this.register_validated.tarifario_rack = tariffs;
    
  //  this.registerDataService.register_register_data(this.rucEstablishmentRegisterSelected).then( r => {
  //     this.certificadoUsoSuelo.register_id = r.id;
  //     if (this.rucEstablishmentRegisterSelected.register_type_id == 47 || this.rucEstablishmentRegisterSelected.register_type_id == 46) {
  //        this.tituloPropiedad.register_id = r.id;
  //        this.autorizacionCondomino.register_id = r.id;
  //        this.guardarTituloPropiedad();
  //        this.guardarAutorizacionCondominos();      
  //     }
  //     this.guardarRecepcionRoom(r.id);
  //     this.guardarCertificadoUsoSuelos();
  //     let clasificacion = '';
  //     this.clasifications_registers.forEach(element => {
  //        if (element.code == this.categorySelectedCode) {
  //           clasificacion = element.name.toString();
  //        }
  //     });
  //     let categoria = '';
  //     this.categories_registers.forEach(element => {
  //        if (element.id == this.rucEstablishmentRegisterSelected.register_type_id) {
  //           categoria = element.name.toString();
  //        }
  //     });
  //     let qr_value = 'MT-' + iniciales_cordinacion_zonal + '-' + this.ruc_registro_selected.ruc.number + '-SOLICITUD-' + actividad + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //     const params = [{tipo_tramite: tipo_tramite},
  //        {fecha: today.toLocaleDateString().toUpperCase()},
  //        {representante_legal: this.user.name.toUpperCase()},
  //        {nombre_comercial: this.establishment_selected.commercially_known_name.toUpperCase()},
  //        {ruc: this.ruc_registro_selected.ruc.number},
  //        {razon_social: this.razon_social},
  //        {fecha_solicitud: today.toLocaleDateString().toUpperCase()},
  //        {actividad: actividad},
  //        {clasificacion: clasificacion.toUpperCase()},
  //        {categoria: categoria.toUpperCase()},
  //        {provincia: provincia.name.toUpperCase()},
  //        {canton: canton.name.toUpperCase()},
  //        {parroquia: parroquia.name.toUpperCase()},
  //        {calle_principal: this.establishment_selected.address_main_street.toUpperCase()},
  //        {numeracion: this.establishment_selected.address_number.toUpperCase()},
  //        {calle_secundaria: this.establishment_selected.address_secondary_street.toUpperCase()}];
  //     this.exporterDataService.template(10, true, qr_value, params).then( r_exporter => {
  //        let pdfBase64 = r_exporter;
  //        const byteCharacters = atob(r_exporter);
  //        const byteNumbers = new Array(byteCharacters.length);
  //        for (let i = 0; i < byteCharacters.length; i++) {
  //           byteNumbers[i] = byteCharacters.charCodeAt(i);
  //        }
  //        const byteArray = new Uint8Array(byteNumbers);
  //        const blob = new Blob([byteArray], { type: 'application/pdf'});
  //        if (this.idCausal !== 0) {
  //           let newRegisterProcedure = new RegisterProcedure();
  //           newRegisterProcedure.procedure_justification_id = this.idCausal;
  //           newRegisterProcedure.register_id = this.certificadoUsoSuelo.register_id;
  //           newRegisterProcedure.date = new Date();
  //           this.registerProcedureDataService.post(newRegisterProcedure).then( regProc => { 
  //           }).catch( e => { console.log(e); });   
  //        }
  //        saveAs(blob, qr_value + '.pdf');
  //        const information = {
  //           para: this.user.name,
  //           tramite: tipo_tramite,
  //           ruc: this.user.ruc,
  //           nombreComercial: this.establishment_selected.commercially_known_name,
  //           fechaSolicitud: today.toLocaleString(),
  //           actividad: 'Alojamiento Turístico',
  //           clasificacion: clasificacion,
  //           categoria: categoria,
  //           razon_social: this.razon_social,
  //           tipoSolicitud: tipo_tramite,
  //           provincia: provincia.name.toUpperCase(),
  //           canton: canton.name.toUpperCase(),
  //           parroquia: parroquia.name.toUpperCase(),
  //           callePrincipal: this.establishment_selected.address_main_street,
  //           calleInterseccion: this.establishment_selected.address_secondary_street,
  //           numeracion: this.establishment_selected.address_number,
  //           thisYear: today.getFullYear(),
  //           pdfBase64: pdfBase64,
  //        };
  //        this.mailerDataService.sendMail('mail', this.user.email.toString(), 'Información de Detalle de Solicitud', information).then( r_mailer => {
  //           this.guardando = false;
  //           this.refresh();
  //           this.toastr.successToastr('Solicitud Enviada, Satisfactoriamente.', 'Nuevo');
  //           this.router.navigate(['/main']);
  //        }).catch( e => { console.log(e); });
  //     }).catch( e => { console.log(e); });
  //  }).catch( e => {
  //     this.guardando = false;
  //     this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Nuevo');
  //     return;
  //  });
  }

  validateAlimentosBebidasData(): boolean {
    let toReturn = true;
    if ((this.register_validated.kitchen_types_on_register === [] || 
      this.register_validated.kitchen_types_on_register.length == 0)) {
      if (this.classificationSelectedCode == '1.1' || 
        this.classificationSelectedCode == '1.2' || 
        this.classificationSelectedCode == '1.3' || 
        this.classificationSelectedCode == '1.5' || 
        this.classificationSelectedCode == '1.7' || 
        this.classificationSelectedCode == '2.1' || 
        this.classificationSelectedCode == '2.2' || 
        this.classificationSelectedCode == '2.3' || 
        this.classificationSelectedCode == '2.5' || 
        this.classificationSelectedCode == '2.7')
      {
        this.toastr.errorToastr('Existe inconsistencia en el tipo de cocina, seleccionado.', 'Nuevo');
        toReturn = false;  
      }
    }
    if ((this.register_validated.service_types_on_register === [] ||
      this.register_validated.service_types_on_register.length == 0)) {
      if (
        this.classificationSelectedCode == '1.1' || 
        this.classificationSelectedCode == '1.2' || 
        this.classificationSelectedCode == '1.3' || 
        this.classificationSelectedCode == '2.1' || 
        this.classificationSelectedCode == '2.2' || 
        this.classificationSelectedCode == '2.3')
      {
        this.toastr.errorToastr('Existe inconsistencia en el tipo de servicio, seleccionado.', 'Nuevo');
        toReturn = false;
      }
    }
    if (this.classificationSelectedCode !== '1.7') {
      if (!this.validateCapacidades()) {
         this.toastr.errorToastr('Existe inconsistencia en los valores de las capacidades.', 'Nuevo');
         toReturn = false;
      }   
    }
    let mostrarMensajeListaPrecios = false;
    this.listasPrecios.forEach(element => {
      if (element.food_drink_attachment_file === ''){
        mostrarMensajeListaPrecios = true;
      }
    });
    if (mostrarMensajeListaPrecios) {
      this.toastr.errorToastr('Debe cargar la lista de precios.', 'Nuevo');
      toReturn = false;
    }
    if (this.attachments.floor_authorization_certificate.floor_authorization_certificate_file === ''){
      this.toastr.errorToastr('Debe cargar el certificado de uso de suelo.', 'Nuevo');
      toReturn = false;
    }
    if (!this.validateReclassificationRecategorization()) {
      toReturn = false;
    }
    if (!this.validateRequisites()) {
      toReturn = false;
    }
    return toReturn;
  }

  validateCapacidades(): boolean {
    let toReturn = true;
    this.register_validated.capacities_on_register.forEach(element => {
      if (element.quantity_tables == 0 || element.quantity_spaces == 0) {
        toReturn = false;
      }
    });
    return toReturn;
   }

  saveAlimentosBebidas() {
    console.log(this.register_validated);
    console.log(this.attachments);
    console.log(this.establishment);
    console.log('alimentos');
    if (!this.validateAlimentosBebidasData()) {
      return;
    }
    this.guardando = true;
    let tipo_tramite = this.getTipoTramite();
    const today = new Date();
    const actividad = 'ALIMENTOS Y BEBIDAS';
    const ubicationData = this.getUbicationData();
    this.capacity_types_alimentos_bebidas.forEach(element => {
      if (element.register_type_id == this.register_validated.register_type_id) {
        this.register_validated.capacities_on_register.forEach(capacidad => {
          capacidad.capacity_type_id = element.id; 
        });
      }
    });
    return;
   

  
  //  this.registerABDataService.register_register_data(this.rucEstablishmentRegisterSelected).then( r => {
  //     this.certificadoUsoSuelo.register_id = r.id;
  //     this.guardarCertificadoUsoSuelos();
  //     this.guardarListaPrecios(r.id);
  //     let clasificacion = '';
  //     this.clasifications_registers.forEach(element => {
  //        if (element.code == this.categorySelectedCode) {
  //           clasificacion = element.name.toString();
  //        }
  //     });
  //     let categoria = '';
  //     this.categories_registers.forEach(element => {
  //        if (element.id == this.rucEstablishmentRegisterSelected.register_type_id) {
  //           categoria = element.name.toString();
  //        }
  //     });
  //     const zonalName = zonal.name.split(' ');
  //     iniciales_cordinacion_zonal = zonalName[zonalName.length - 1].toUpperCase();
  //     let qr_value = 'MT-' + iniciales_cordinacion_zonal + '-' + this.ruc_registro_selected.ruc.number + '-SOLICITUD-' + actividad + '-' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //     const params = [{tipo_tramite: tipo_tramite},
  //        {fecha: today.toLocaleDateString().toUpperCase()},
  //        {representante_legal: this.user.name.toUpperCase()},
  //        {nombre_comercial: this.establishment_selected.commercially_known_name.toUpperCase()},
  //        {ruc: this.ruc_registro_selected.ruc.number},
  //        {razon_social: this.razon_social},
  //        {fecha_solicitud: today.toLocaleDateString().toUpperCase()},
  //        {actividad: actividad},
  //        {clasificacion: clasificacion.toUpperCase()},
  //        {categoria: categoria.toUpperCase()},
  //        {provincia: provincia.name.toUpperCase()},
  //        {canton: canton.name.toUpperCase()},
  //        {parroquia: parroquia.name.toUpperCase()},
  //        {calle_principal: this.establishment_selected.address_main_street.toUpperCase()},
  //        {numeracion: this.establishment_selected.address_number.toUpperCase()},
  //        {calle_secundaria: this.establishment_selected.address_secondary_street.toUpperCase()}];
  //     this.exporterDataService.template(10, true, qr_value, params).then( r_exporter => {
  //        let pdfBase64 = r_exporter;
  //        const byteCharacters = atob(r_exporter);
  //        const byteNumbers = new Array(byteCharacters.length);
  //        for (let i = 0; i < byteCharacters.length; i++) {
  //           byteNumbers[i] = byteCharacters.charCodeAt(i);
  //        }
  //        const byteArray = new Uint8Array(byteNumbers);
  //        const blob = new Blob([byteArray], { type: 'application/pdf'});
  //        if (this.idCausal !== 0) {
  //           let newRegisterProcedure = new RegisterProcedure();
  //           newRegisterProcedure.procedure_justification_id = this.idCausal;
  //           newRegisterProcedure.register_id = this.certificadoUsoSuelo.register_id;
  //           newRegisterProcedure.date = new Date();
  //           this.registerProcedureABDataService.post(newRegisterProcedure).then( regProc => { 
  //           }).catch( e => { console.log(e); });   
  //        }
  //        saveAs(blob, qr_value + '.pdf');
  //        const information = {
  //           para: this.user.name,
  //           tramite: tipo_tramite,
  //           ruc: this.user.ruc,
  //           nombreComercial: this.establishment_selected.commercially_known_name,
  //           fechaSolicitud: today.toLocaleString(),
  //           actividad: 'Alimentos y Bebidas',
  //           clasificacion: clasificacion,
  //           categoria: categoria,
  //           razon_social: this.razon_social,
  //           tipoSolicitud: tipo_tramite,
  //           provincia: provincia.name.toUpperCase(),
  //           canton: canton.name.toUpperCase(),
  //           parroquia: parroquia.name.toUpperCase(),
  //           callePrincipal: this.establishment_selected.address_main_street,
  //           calleInterseccion: this.establishment_selected.address_secondary_street,
  //           numeracion: this.establishment_selected.address_number,
  //           thisYear: today.getFullYear(),
  //           pdfBase64: pdfBase64,
  //        };
  //        this.mailerDataService.sendMail('mail', this.user.email.toString(), 'Información de Detalle de Solicitud', information).then( r_mailer => {
  //           this.guardando = false;
  //           this.refresh();
  //           this.toastr.successToastr('Solicitud Enviada, Satisfactoriamente.', 'Nuevo');
  //           this.router.navigate(['/main']);
  //        }).catch( e => { console.log(e); });
  //     }).catch( e => { console.log(e); });
  //  }).catch( e => {
  //     this.guardando = false;
  //     this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Nuevo');
  //     return;
  //  });
  }

  saveOperacionIntermediacion() {
    console.log(this.register_validated);
    console.log(this.attachments);
    console.log(this.establishment);
    console.log('operacion');
  }
}
