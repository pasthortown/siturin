import { ComplementaryServiceType } from './ComplementaryServiceType';

import { Capacity } from './Capacity';

export class Register {
   id: number;
   code: String;
   autorized_complementary_capacities: Boolean;
   establishment_id: number;
   autorized_complementary_food_capacities: Boolean;
   complementary_service_types_on_register: ComplementaryServiceType[];
   register_type_id: number;
   capacities_on_register: Capacity[];
   constructor() {
      this.complementary_service_types_on_register = [];
      this.capacities_on_register = [];
   }
}