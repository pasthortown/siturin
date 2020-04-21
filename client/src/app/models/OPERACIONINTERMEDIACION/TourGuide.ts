export class TourGuide {
   id: number;
   identification: String;
   fullname: String;
   credential_number: String;
   credential_date: Date;
   register_id: number;
   constructor() {
      this.id = 0;
      this.identification = '';
      this.fullname = '';
      this.credential_number = '';
      this.credential_date = new Date();
   }
}