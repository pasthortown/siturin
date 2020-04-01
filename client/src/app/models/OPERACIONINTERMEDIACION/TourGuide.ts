export class TourGuide {
   id: number;
   identification: String;
   fullname: String;
   credential_number: String;
   credential_date: Date;
   ubication_id: number;
   register_id: number;
   guide_type_id: number;
   ambitoAplicacion: String;
   provincia: String;
   canton: String;
   clasificacion: String;
   constructor() {
      this.id = 0;
      this.identification = '';
      this.fullname = '';
      this.credential_number = '';
      this.credential_date = new Date();
      this.ubication_id = 0;
      this.guide_type_id = 0;
      this.ambitoAplicacion = '-';
      this.provincia = '-';
      this.canton = '-';
      this.clasificacion = '';
   }
}