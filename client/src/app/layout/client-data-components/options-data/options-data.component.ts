import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-data',
  templateUrl: './options-data.component.html',
  styleUrls: ['./options-data.component.scss']
})
export class OptionsDataComponent implements OnInit {

  @Input('register_activity') register_activity = '';
  @Input('register_state') register_state = '';

  @Output('select_option') change: EventEmitter<String> = new EventEmitter<String>();

  select_option = '';
  mensajePorTipoTramite = '';

  constructor() {
    
  }

  ngOnInit() {
    this.select_option = '';
    this.mensajePorTipoTramite = '';
    console.log('entre');
  }
  
  solicitandoNuevaActualizacion() {
    this.select_option = 'ab_new_classification';
    this.mensajePorTipoTramite = 'En esta sección, usted va a proceder a solicitar una clasificación adicional para su establecimiento, tiene la opción de guardar la información en cualquier momento.';
    this.change.emit(this.select_option);
  }

  actualizar() {
    this.select_option = 'actualization';
    this.mensajePorTipoTramite = 'En esta sección, usted va a proceder a actualizar la información de su Registro de Turismo, tiene la opción de guardar la información en cualquier momento.';
    this.change.emit(this.select_option);
  }

  actualizarCapacidadesPrecios() {
    this.select_option = 'actualization_costs';
    if (this.register_activity == '1') {
       this.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar y actualizar la información de sus capacidades y tatifario rack, tiene la opción de guardar la información en cualquier momento.';
    } 
    if (this.register_activity == '2') {
       this.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar y actualizar la información de sus capacidades y lista de precios, tiene la opción de guardar la información en cualquier momento.';
    }
    this.change.emit(this.select_option);
  }

  declararUnoMil() {
    this.select_option = 'tax_declaration';
    this.mensajePorTipoTramite = 'En esta sección, usted va a proceder a declarar su contribución Uno por Mil, tiene la opción de guardar la información en cualquier momento.';
    this.change.emit(this.select_option);
  }

  reclasificacion() {
    this.select_option = 'reclassification';
    this.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.change.emit(this.select_option);
  }

  recategorizacion() {
    this.select_option = 'recategorization';
    this.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.change.emit(this.select_option);
  }

  reactivar() {
    this.select_option = 'activation';
    this.mensajePorTipoTramite = 'Usted va a proceder a regularizar su establecimiento turístico, para lo cual deberá complementar la información que esta sección presenta, tiene la opción de guardarla en cualquier momento.';
    this.change.emit(this.select_option);
  }
}
