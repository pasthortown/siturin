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
   provincia_code: String;
   category_incomming: String;
   classification_incomming: String;
   system_source: String;
   state_on_catastro: String;
   classification_selected_code: String;
   region_selected_code: String;
   constructor() {
      this.id = 0;
      this.activity_id = 0;
      this.editable = true;
      this.tarifario_rack = [];
      this.complementary_service_types_on_register = [];
      this.complementary_service_foods_on_register = [];
      this.capacities_on_register = [];
      this.requisites = [];
      //ALIMENTOS BEBIDAS
      this.kitchen_types_on_register = [];
      this.service_types_on_register = [];
      //OPERACION INTERMEDIACION
      this.turistic_guides = [];
      this.transport_companies = [];
      this.sales_representatives = [];
      this.establishment_id = 0;
      this.autorized_complementary_capacities = false;
      this.autorized_complementary_food_capacities = false;
      this.register_type_id = 0;
      this.total_spaces = 0;
      this.total_habitations = 0;
      this.total_beds = 0;
      this.status = 4;
      this.code = 'PENDIENTE';
      this.provincia_code = '';
      this.category_incomming = '';
      this.classification_incomming = '';
      this.system_source = '';
      this.state_on_catastro = '';
   }
}