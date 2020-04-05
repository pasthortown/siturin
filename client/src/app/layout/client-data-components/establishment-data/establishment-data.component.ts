import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { RucNameType } from 'src/app/models/BASE/RucNameType';
import { RegisterTypeService as RegisterTypeAlojamientoService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { RegisterTypeService as RegisterTypeAlimentosBebidas } from './../../../services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { RegisterTypeService as RegisterTypeOperacionIntermedacion } from './../../../services/CRUD/OPERACIONINTERMEDIACION/registertype.service';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-data',
  templateUrl: './establishment-data.component.html',
  styleUrls: ['./establishment-data.component.scss']
})
export class EstablishmentDataComponent implements OnInit {
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('editable') editable: boolean = true;

  register_types = [];

  establishmentComercialNameValidated = false;
  franchiseChainNameValidated = false;

  selectedNameType: RucNameType = new RucNameType();
  ruc_name_types: RucNameType[] = [];

  constructor(private register_type_alojamiento_DataService: RegisterTypeAlojamientoService,
    private register_type_alimentosBebidas_DataService: RegisterTypeAlimentosBebidas,
    private register_type_operacionIntermediacion_DataService: RegisterTypeOperacionIntermedacion,
    private rucNameTypeDataService: RucNameTypeService) {
    
  }

  ngOnInit() {
    this.getRegisterTypes();
    this.getRucNameTypes();
  }

  getRucNameTypes() {
    this.ruc_name_types = [];
    this.rucNameTypeDataService.get().then( r => {
       this.ruc_name_types = r as RucNameType[];
       this.getNameTypeInfo();
    }).catch( e => { console.log(e); });
  }

  getRegisterTypes() {
    this.register_types = [];
    this.register_type_alojamiento_DataService.get().then( r => {
      const response = r as any[];
      response.forEach(element => {
        this.register_types.push(element);
      });
    }).catch( e => { console.log(e); });
    this.register_type_alimentosBebidas_DataService.get().then( r => {
      const response = r as any[];
      response.forEach(element => {
        this.register_types.push(element);
      });
    }).catch( e => { console.log(e); });
    this.register_type_operacionIntermediacion_DataService.get().then( r => {
      const response = r as any[];
      response.forEach(element => {
        this.register_types.push(element);
      });
    }).catch( e => { console.log(e); });
  }

  validateNombreComercial(): boolean {
    let toReturn = true;
    const textoAValidar = this.establishment.commercially_known_name.toUpperCase();
    if(this.establishment.commercially_known_name.length < 1) {
        toReturn = false;
        this.establishmentComercialNameValidated = toReturn;
        return toReturn;
    }
    let errorEnNombreDetectado = false;
    this.register_types.forEach(register_type => {
        const nombre = register_type.name.toUpperCase();
        if ((textoAValidar.search(nombre + ' ') !== -1) && !errorEnNombreDetectado) {
          errorEnNombreDetectado = true;
          toReturn = false;
        }
    });
    const palabrasNoPermitidas = ['hotel',
      'hostal',
      'residencia',
      'residencial',
      'hacienda turÃ­stica',
      'hacienda turistica',
      'hosterÃ­a',
      'hosteria',
      'pensiÃ³n',
      'pension',
      'albergue',
      'lodge',
      'motel',
      'campamento',
      'refugio',
      'resort '];
    let errorEnNombreDetectadoListaPalabras = false;
    palabrasNoPermitidas.forEach(palabraNoPermitida => {
        const nombre = palabraNoPermitida.toUpperCase();
        if (textoAValidar.search(nombre) !== -1 && !errorEnNombreDetectadoListaPalabras) {
        errorEnNombreDetectadoListaPalabras = true;
        toReturn = false;
        }
    });
    this.establishmentComercialNameValidated = toReturn;
    return toReturn;
  }

  getNameTypeInfo() {
    this.ruc_name_types.forEach(element => {
       if (element.id == this.establishment.ruc_name_type_id) {
          this.selectedNameType = element;
       }
    });
  }

  validateNombreFranquiciaCadena() {
    let toReturn = true;
    const textoAValidar = this.establishment.franchise_chain_name.toUpperCase();
    if(this.establishment.franchise_chain_name.length < 1) {
        toReturn = false;
        this.franchiseChainNameValidated = toReturn;
        return;
    } 
    let errorEnNombreDetectado = false;
    this.register_types.forEach(register_type => {
       const nombre = register_type.name.toUpperCase();
       if (textoAValidar.search(nombre + ' ') !== -1 && !errorEnNombreDetectado) {
        errorEnNombreDetectado = true;
        toReturn = false;
       }
    });
    this.franchiseChainNameValidated = toReturn;
  }
}
