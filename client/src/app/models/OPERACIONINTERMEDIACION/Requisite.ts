export class Requisite {
   id: number;
   name: String;
   description: String;
   father_code: String;
   code: String;
   to_approve: number;
   register_type_id: number;
   type_full_name: String;
   mandatory: Boolean;
   type: String;
   params: String;
   score: number;
   is_adventure_requisite: Boolean;
   
   constructor() {
      this.register_type_id = 0;
      this.father_code = '-';
      this.code = '-';
      this.to_approve = 1;
      this.type_full_name = '';
      this.mandatory = false;
      this.type = '';
      this.params = '';
      this.score = 0;
      this.is_adventure_requisite = false;
   }
}