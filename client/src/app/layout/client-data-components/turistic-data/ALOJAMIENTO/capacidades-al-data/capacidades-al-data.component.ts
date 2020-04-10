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

  currentYear = 0;
  selected_year = 2019;
  years = [];

  capacitiesToShow = [];
  canEditCapacity = false;
  modificadoCapacidades = false;

  capacitySelected: Capacity = new Capacity();

  allowed_capacity_types: CapacityType[] = []; 

  constructor(private capacityTypeDataService: CapacityTypeService) {
    
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
    this.calcSpaces();
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

  calcSpaces(c) {

  }
}
