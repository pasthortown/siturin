import { NormativaService } from './../../../services/negocio/normativa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normativa',
  templateUrl: './normativa.component.html',
  styleUrls: ['./normativa.component.scss']
})
export class NormativaComponent implements OnInit {
  divition_id: number;
  

  actividades = [];

  constructor( private normativaDataService: NormativaService) {}

  ngOnInit() {}
}
