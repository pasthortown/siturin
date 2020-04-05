import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-list-data',
  templateUrl: './establishment-list-data.component.html',
  styleUrls: ['./establishment-list-data.component.scss']
})
export class EstablishmentListDataComponent implements OnInit {
  @Input('ruc_number') ruc_number: String = '';
  @Input('ruc_code_id') ruc_code_id: String = '';
  
  constructor() {
    
  }

  ngOnInit() {
   
  }
}
