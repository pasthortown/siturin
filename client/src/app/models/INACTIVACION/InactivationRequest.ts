export class InactivationRequest {
   id: number;
   ruc: String;
   ubication_id: number;
   contact_phone_main_number: String;
   contact_phone_seconday_number: String;
   email: String;
   identification: String;
   address: String;
   comments: String;
   address_reference: String;
   address_map_latitude: number;
   address_map_longitude: number;
   constructor() {
      this.address_map_latitude = 0;
      this.address_map_longitude = 0;
   }
}