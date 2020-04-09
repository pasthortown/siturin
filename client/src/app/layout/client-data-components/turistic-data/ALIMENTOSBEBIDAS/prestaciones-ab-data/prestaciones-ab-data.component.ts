import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prestaciones-ab-data',
  templateUrl: './prestaciones-ab-data.component.html',
  styleUrls: ['./prestaciones-ab-data.component.scss']
})
export class PrestacionesABDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  constructor() {
    
  }

  ngOnInit() {
   
  }
}
