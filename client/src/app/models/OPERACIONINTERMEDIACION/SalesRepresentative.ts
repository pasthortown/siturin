export class SalesRepresentative {
   id: number;
   ruc: String;
   has_professional_degree: Boolean;
   has_contract: Boolean;
   has_experience: Boolean;
   social_name: String;
   register_id: number;
   
   constructor() {
      this.id = 0;
      this.ruc = '';
      this.has_professional_degree = false;
      this.has_contract = false;
      this.has_experience = false;
      this.social_name = '';
   }
}