import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-capcidades-ab-data',
  templateUrl: './capcidades-ab-data.component.html',
  styleUrls: ['./capcidades-ab-data.component.scss']
})
export class CapcidadesABDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  constructor() {
    
  }

  ngOnInit() {
   
  }
}
