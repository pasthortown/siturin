export class FoodDrinkAttachment {
   id: number;
   type: String;
   food_drink_attachment_file_type: String;
   food_drink_attachment_file_name: String;
   food_drink_attachment_file: String;
   date: Date;
   register_id: number;
   constructor() {
      this.food_drink_attachment_file = '';
      this.food_drink_attachment_file_name = '';
      this.food_drink_attachment_file_type  = '';
      this.date = new Date();
      this.type = '';
   }
}