export class Register {
   id: number;
   activity_id: number;
   code: String;
   autorized_complementary_capacities: Boolean;
   autorized_complementary_food_capacities: Boolean;
   establishment_id: number;
   complementary_service_types_on_register: any[];
   complementary_service_foods_on_register: any[];
   register_type_id: number;
   capacities_on_register: any[];
   requisites: any[];
   editable: Boolean;
   total_spaces: number;
   total_habitations: number;
   total_beds: number;
   status: number;
   tarifario_rack: any[];
   kitchen_types_on_register: any[];
   service_types_on_register: any[];
   turistic_guides: any[];
   transport_companies: any[];
   sales_representatives: any[];
   constructor() {
      this.id = 0;
      this.activity_id = 0;
      this.editable = true;
      this.tarifario_rack = [];
      this.complementary_service_types_on_register = [];
      this.complementary_service_foods_on_register = [];
      this.kitchen_types_on_register = [];
      this.service_types_on_register = [];
      this.capacities_on_register = [];
      this.turistic_guides = [];
      this.transport_companies = [];
      this.sales_representatives = [];
      this.establishment_id = 0;
      this.autorized_complementary_capacities = false;
      this.autorized_complementary_food_capacities = false;
      this.requisites = [];
      this.register_type_id = 0;
      this.total_spaces = 0;
      this.total_habitations = 0;
      this.total_beds = 0;
      this.status = 4;
      if (this.code == null || this.code == '' || typeof this.code == 'undefined') {
         this.code = 'PENDIENTE';
      }
   }
}