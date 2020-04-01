export class TuristicTransport {
   id: number;
   ruc: String;
   tax_payer_type_id: number;
   register_code: String;
   register_date: Date;
   social_name: String; 
   register_id: number;
   activity_transport_type_id: number;
   transport_type_id: number;
   
   constructor() {
      this.id = 0;
      this.ruc = '';
      this.tax_payer_type_id = 0;
      this.register_code = '';
      this.register_date = new Date();
      this.social_name = ''; 
      this.activity_transport_type_id = 0;
      this.transport_type_id = 0; 
   }
}