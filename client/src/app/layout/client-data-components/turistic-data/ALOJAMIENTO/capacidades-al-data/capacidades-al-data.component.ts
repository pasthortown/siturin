import { RegisterService as RegisterALService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { Tariff } from './../../../../../models/ALOJAMIENTO/Tariff';
import { CapacityTypeService } from 'src/app/services/CRUD/ALOJAMIENTO/capacitytype.service';
import { CapacityType } from './../../../../../models/ALOJAMIENTO/CapacityType';
import { Capacity } from './../../../../../models/ALOJAMIENTO/Capacity';
import { RegisterType } from './../../../../../models/ALOJAMIENTO/RegisterType';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-capacidades-al-data',
  templateUrl: './capacidades-al-data.component.html',
  styleUrls: ['./capacidades-al-data.component.scss']
})
export class CapacidadesALDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('classification_selected_code') classification_selected_code: string = '';
  @Input('register_types') register_types: RegisterType[] = [];
  @Input('is_new_register') is_new_register: boolean = true;
  @Input('can_declare_next_year_capacities') can_declare_next_year_capacities: boolean = true;
  @Input('tarifario_rack') tarifarioRack: any = {cabecera: [], valores: []};
  @Input('tarifas') tarifas: any[] = [];
  
  currentYear = 0;
  selected_year = 2019;
  years = [];

  capacitiesToShow = [];
  canEditCapacity = false;
  modificadoCapacidades = false;

  capacitySelected: Capacity = new Capacity();

  allowed_capacity_types: CapacityType[] = []; 
  
  continuarTarifarioRack = false;
  tariffsToShow = {cabecera: [], valores: []};

  constructor(private register_alojamiento_data_service: RegisterALService, private capacityTypeDataService: CapacityTypeService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.getYears();
    if (this.register.id != 0) {
      this.getTarifarioRack(this.register.id);
    }
  }

  getTarifarioRack(register_id: number) {
    this.register_alojamiento_data_service.get_tarifario(register_id).then( r => {
      let tarifarioResponse = r as Tariff[];
      let max_year = 0;
      tarifarioResponse.forEach(element => {
        if(element.year > max_year){
           max_year = element.year;
        }
      });
      this.tarifarioRack.valores.forEach(element => {
        element.tariffs.forEach(tariffRack => {
          const tariff = tariffRack.tariff;
          tarifarioResponse.forEach(tariffResponse => {
            if(tariffResponse.tariff_type_id == tariff.tariff_type_id && tariffResponse.year == max_year && tariffResponse.capacity_type_id == tariff.capacity_type_id) {
              tariffRack.tariff.price = tariffResponse.price;
              tariffRack.tariff.year = tariffResponse.year;
            }
          });
        });
      });
      this.calcSpaces();
    }).catch( e => { console.log(e); });
  }
 
  loadCatalogos() {
   this.getCapacityTypes();
  }

  getCapacityTypes() {
    this.allowed_capacity_types = [];
    this.capacityTypeDataService.get_filtered_by_register_type(this.register.register_type_id).then( r => {
      this.allowed_capacity_types = r as CapacityType[];
    }).catch( e => { console.log(e); });
  }

  getYears() {
    const nextYear = this.currentYear + 1;
    this.years = [{value: this.currentYear}];
    if (this.can_declare_next_year_capacities) {
      this.years.push({value: nextYear});
    }
    this.register.capacities_on_register.forEach( capacity => {
      let existe = false;
      this.years.forEach(year => {
        if (year.value == capacity.year) {
          existe = true;
        }
      });
      if (!existe) {
        this.years.push({value: capacity.year});
      }
    });
    this.years.sort(function(a, b) {
      const a_value = a.value;
      const b_value = b.value;
      return a_value > b_value ? 1 : a_value < b_value ? -1 : 0;
    });
    if (this.is_new_register) {
      this.selected_year = this.currentYear;
    } else {
      this.selected_year = this.getLastYearDeclared();
    }
    this.yearCapacity();
  }

  yearCapacity() {
    if (this.capacitiesToShow.length > 0) {
       this.capacitiesToShow.forEach(new_cap => {
          let existe = false;
          this.register.capacities_on_register.forEach(cap_preview => {
             if (new_cap == cap_preview) {
                existe = true;
             }
          });
          if (!existe) {
             this.register.capacities_on_register.push(new_cap);  
          }
       });
    }
    if (this.selected_year > this.currentYear) {
       this.canEditCapacity = true;
    } else {
       this.canEditCapacity = false;
    }
    this.capacitiesToShow = [];
    this.register.capacities_on_register.forEach(c1 => {
       if (c1.year == this.selected_year) {
          this.capacitiesToShow.push(c1);
       }
    });
    console.log(this.register);
    console.log(this.register.capacities_on_register);
    this.calcSpaces();
  }

  getLastYearDeclared(): number {
    let lastYearDeclared = 2019;
    this.register.capacities_on_register.forEach( capacity => {
      if (capacity.year > lastYearDeclared){
        lastYearDeclared = capacity.year;
      }
    });
    return lastYearDeclared;
  }

  validateHabitaciones(): Boolean {
    const capacidadesRevisadas = [];
    let continueChecking = true;
    this.capacitiesToShow.forEach(capacityShown => {
       if (continueChecking) {
          let existe = false;
          capacidadesRevisadas.forEach(element => {
             if (element == capacityShown.capacity_type_id) {
                continueChecking = false;
                existe = true;
             }
          });
          if (!existe) {
             capacidadesRevisadas.push(capacityShown.capacity_type_id);
          }
       }
    });
    if (!continueChecking) {
       return false;
    }
    if (this.register.total_spaces == 0){
       return false;
    }
    if (this.register.total_beds == 0){
    return false;
    }
    if (this.register.total_habitations == 0){
       return false;
    }
    if (this.register.total_spaces == 0){
       return false;
    }
    if (this.register.register_type_id == 31 || this.register.register_type_id == 45) {
       if (this.register.total_spaces > 6) {
          return false;
       }
       if (this.register.total_habitations < 2 || this.register.total_habitations > 4) {
          return false;
       }
    }
    return true;
  }

  validateTarifarioRackIngresado(): Boolean {
    let aprueba = true;
    this.tariffsToShow.valores.forEach( tariffRack => {
      tariffRack.tariffs.forEach( tariff => {
         if (tariff.tariff.price == 0) {
            aprueba = false;
         }
      });
    });
    return aprueba;
  }

  addCapacity() {
    const newCapacity = new Capacity();
    newCapacity.editable = true;
    this.modificadoCapacidades = true;
    this.register.total_spaces = 0;
    newCapacity.isNewCapacity = true;
    newCapacity.year = this.selected_year;
    this.register.capacities_on_register.push(newCapacity);
    this.capacitiesToShow = this.register.capacities_on_register;
    this.yearCapacity();
  }

  selectCapacity(capacity: Capacity) {
    this.capacitySelected = capacity;
  }

  removeCapacity(capacity: Capacity) {
    const newCapacities: Capacity[] = [];
    this.modificadoCapacidades = true;
    this.register.total_spaces = 0;
    this.register.capacities_on_register.forEach(element => {
      if (capacity.year == this.selected_year) {
         if (capacity.capacity_type_id != element.capacity_type_id) {
            newCapacities.push(element);
         }
      }
    });
    this.register.capacities_on_register = newCapacities;
    this.capacitiesToShow = [];
    this.register.capacities_on_register.forEach(c1 => {
      if (c1.year == this.selected_year) {
         this.capacitiesToShow.push(c1);
      }
    });
    this.calcSpaces();
  }

  refreshMaxBed(capacity: Capacity) {
    this.allowed_capacity_types.forEach(capacityType => {
      if(capacityType.id == capacity.capacity_type_id) {
         capacity.editable_beds = capacityType.editable_beds;
         capacity.editable_spaces = capacityType.editable_spaces;
         if (capacity.editable_beds) {
            capacity.max_beds = 0;
         }
         if (capacity.editable_spaces) {
            capacity.max_spaces = 0;
         }
      }
    });
    this.capacitiesToShow.forEach(capacityShow => {
      this.allowed_capacity_types.forEach(capacityType => {
         if(capacityType.id == capacityShow.capacity_type_id) {
            capacityShow.editable_beds = capacityType.editable_beds;
            capacityShow.editable_spaces = capacityType.editable_spaces;
            if (capacityShow.editable_beds) {
               capacity.max_beds = 0;
            }
            if (capacityShow.editable_spaces) {
               capacity.max_spaces = 0;
            }
         }
      });
    });
  }

  continuarIngresoTarifarioRack() {
    this.register.capacities_on_register.forEach(c => {
      this.calcSpaces(c);
    });
  }

  checkValuesTariffs() {
    this.tarifarioRack.valores.forEach(valor => {
      valor.tariffs.forEach(tariff => {
         if (!tariff.isReference) {
          valor.tariffs.forEach(tariff2 => {
             if( tariff !== tariff2) {
                if (tariff.nombreDivision == tariff2.nombreDivision && tariff.plazasHabitacion !== 999) {
                   tariff.tariff.price = this.rounded(tariff2.tariff.price / tariff2.plazasHabitacion);
                }
             }
          });
         }
      });
    });
  }

  rounded(numero: number): number {
    const toround = numero * 100;
    return Math.round(toround)/100;
  }

  calcSpaces(capacity?) {
    if(typeof capacity !== 'undefined') {
      this.allowed_capacity_types.forEach(capacityType => {
         if (capacityType.id == capacity.capacity_type_id) {
            if (!capacityType.editable_spaces) {
               capacity.max_spaces = capacityType.spaces * capacity.quantity;
            }
            if (capacity.max_beds > capacityType.bed_quantity){
               capacity.max_beds = capacityType.bed_quantity;
            }
            if (capacity.max_beds == 0) {
               capacity.max_beds = 1;
            }
         }
      });
    }
    const lastValuesTariffs = {cabecera: [], valores: []};
    this.tarifarioRack.cabecera.forEach(c=> {
      lastValuesTariffs.cabecera.push(c);
    });
    this.tarifarioRack.valores.forEach(v=> {
      lastValuesTariffs.valores.push(v);
    });
    this.register.total_spaces = 0;
    this.register.total_habitations = 0;
    this.register.total_beds = 0;
    if (this.tarifarioRack.valores.length == this.register.capacities_on_register.length) {
      for (let i = 0; i<this.register.capacities_on_register.length ; i++) {
         this.tarifarioRack.valores[i].idTipoCapacidad = this.register.capacities_on_register[i].capacity_type_id;
      }
    } else {
      this.tarifarioRack.valores = [];
      this.register.capacities_on_register.forEach(c1 => {
         const childs = [];
         let idTipoCapacidad = c1.capacity_type_id;
         let editable = false;
         if (this.modificadoCapacidades) {
            editable = true;
         }
         this.tarifas.forEach(tariffType => {
            tariffType.childs.forEach(tariffTypeChild => {
               const es_referencia = tariffType.father.is_reference;
               let plazasHabitacion = 0;
               this.allowed_capacity_types.forEach(capacityType => {
                  if (capacityType.id == idTipoCapacidad) {
                     plazasHabitacion = capacityType.spaces;
                  }
               });
               let nombreDivision = '';
               nombreDivision = tariffTypeChild.name;
               const tariff = new Tariff();
               tariff.tariff_type_id = tariffTypeChild.id;
               tariff.price = 0;
               tariff.year = this.selected_year;
               lastValuesTariffs.valores.forEach(tariffValue => {
                  if (tariffValue.idTipoCapacidad == idTipoCapacidad) {
                     tariffValue.tariffs.forEach(t1 => {
                        if (t1.tariff.tariff_type_id == tariff.tariff_type_id) {
                           tariff.price = t1.tariff.price;
                           tariff.year = t1.tariff.year;
                        }
                     });
                  }
               });
               tariff.capacity_type_id = c1.capacity_type_id;
               tariff.isNewTariff = c1.isNewCapacity;
               let newChild = {nombreDivision: nombreDivision, tariff: tariff, isReference: es_referencia, plazasHabitacion: plazasHabitacion};
               childs.push(newChild);
            });
         });
         const topush = {idTipoCapacidad: idTipoCapacidad, tariffs: childs, editable: editable};
         let ya_existe_capacidad = false;
         this.tarifarioRack.valores.forEach(el_t_r => {
            if (el_t_r.idTipoCapacidad == idTipoCapacidad) {
               ya_existe_capacidad = true;
            }
         });
         if (!ya_existe_capacidad) {
            this.tarifarioRack.valores.push(topush);
         }
      });
    }
    this.register.capacities_on_register.forEach(c2 => {
      this.allowed_capacity_types.forEach(capacityType => {
         if (capacityType.id == c2.capacity_type_id) {
            c2.editable_beds = capacityType.editable_beds;
            c2.editable_spaces = capacityType.editable_spaces;
         }
      });
      this.register.total_spaces += c2.max_spaces;
      this.register.total_habitations += c2.quantity;
      this.register.total_beds += (c2.max_beds * c2.quantity);
    });
    this.updateTariffToShow();
  }

  updateTariffToShow() {
    this.tariffsToShow.cabecera = [];
    this.tariffsToShow.valores = [];
    this.tarifarioRack.cabecera.forEach(c=> {
      this.tariffsToShow.cabecera.push(c);
    });
    this.tarifarioRack.valores.forEach(v=> {
      let insertar = false;
      v.tariffs.forEach(v1 => {
         if (v1.tariff.year == this.selected_year) {
            insertar = true;
         }
      });
      if (insertar) {
         this.tariffsToShow.valores.push(v);
      }
    });   
    this.tariffsToShow.valores.forEach(tariffRack => {
      this.allowed_capacity_types.forEach(cap => {
         if (cap.id == tariffRack.idTipoCapacidad) {
            tariffRack.tariffs.forEach(tariff => {
               tariff.plazasHabitacion = cap.spaces;
            });
         }
      });
    });
  }
}
