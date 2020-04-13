import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {
  @Input('data_selected') data_selected = {row: null, register: null};
  
  constructor() {
    
  }

  ngOnInit() {
    this.refresh();
  }
  
  ngOnChanges() {
    this.refresh();
  }
  
  refresh() {
    console.log(this.data_selected);
  }
}
