import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ruc-data',
  templateUrl: './ruc-data.component.html',
  styleUrls: ['./ruc-data.component.scss']
})
export class RucDataComponent implements OnInit {
  
  @Input('ruc_number') ruc_number: String = '';

  constructor() {
    
  }

  ngOnInit() {
   
  }
}
