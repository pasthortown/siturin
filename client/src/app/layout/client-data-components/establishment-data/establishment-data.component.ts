import { Ubication } from 'src/app/models/BASE/Ubication';
import { EstablishmentPropertyTypeService } from 'src/app/services/CRUD/BASE/establishmentpropertytype.service';
import { RucNameTypeService } from 'src/app/services/CRUD/BASE/rucnametype.service';
import { RucNameType } from 'src/app/models/BASE/RucNameType';
import { RegisterTypeService as RegisterTypeAlojamientoService } from './../../../services/CRUD/ALOJAMIENTO/registertype.service';
import { RegisterTypeService as RegisterTypeAlimentosBebidas } from './../../../services/CRUD/ALIMENTOSBEBIDAS/registertype.service';
import { RegisterTypeService as RegisterTypeOperacionIntermedacion } from './../../../services/CRUD/OPERACIONINTERMEDIACION/registertype.service';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { EstablishmentPropertyType } from 'src/app/models/BASE/EstablishmentPropertyType';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EstablishmentPictureService } from 'src/app/services/CRUD/BASE/establishmentpicture.service';
import { EstablishmentPicture } from 'src/app/models/BASE/EstablishmentPicture';

@Component({
  selector: 'app-establishment-data',
  templateUrl: './establishment-data.component.html',
  styleUrls: ['./establishment-data.component.scss']
})
export class EstablishmentDataComponent implements OnInit {
  @ViewChild('fotoFachadaInput') fotoFachadaInput;

  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('editable') editable: boolean = true;

  register_types = [];

  establishmentComercialNameValidated = false;
  franchiseChainNameValidated = false;
  urlwebEstablishmentValidated = false;

  selectedNameType: RucNameType = new RucNameType();
  ruc_name_types: RucNameType[] = [];
  establishment_property_types:EstablishmentPropertyType[] = [];
  establishment_selected_picture: EstablishmentPicture = new EstablishmentPicture();
  total_workers = 0;
  
  zonalEstablishmentSelectedCode = '-';
  provinciaEstablishmentSelectedCode = '-';
  cantonEstablishmentSelectedCode = '-';

  zonalesEstablishment: Ubication[] = []; 
  provinciasEstablishment: Ubication[] = []; 
  cantonesEstablishment: Ubication[] = []; 
  parroquiasEstablishment: Ubication[] = []; 

  constructor(private register_type_alojamiento_DataService: RegisterTypeAlojamientoService,
    private register_type_alimentosBebidas_DataService: RegisterTypeAlimentosBebidas,
    private establishment_property_typeDataService: EstablishmentPropertyTypeService,
    private register_type_operacionIntermediacion_DataService: RegisterTypeOperacionIntermedacion,
    private establishmentPictureDataService: EstablishmentPictureService,
    private rucNameTypeDataService: RucNameTypeService) {
    
  }

  ngOnInit() {
    this.refreshTotalWorkers();
    this.getRegisterTypes();
    this.getEstablishmentPropertyType();
    this.getRucNameTypes();
    this.getEstablishmentPicture();
  }

  getEstablishmentPicture() {
    this.establishmentPictureDataService.get_by_establishment_id(this.establishment.id).then( r => {
      this.establishment_selected_picture = r as EstablishmentPicture;
    }).catch( e => { console.log(e); });
  }

  getEstablishmentPropertyType() {
    this.establishment_property_types = [];
    this.establishment_property_typeDataService.get().then( r => {
       this.establishment_property_types = r as EstablishmentPropertyType[];
    }).catch( e => console.log(e) );
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
    this.validateNombreFranquiciaCadena();
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

  checkURLWeb(): boolean {
    const isOk = /^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{2,}\.[a-z]{2}$/.test(this.establishment.url_web.toString());
    const isOk2 = /^(www\.)?[a-z0-9\-\.]{2,}\.[a-z]{2}$/.test(this.establishment.url_web.toString());
    const isOk3 = /^(ftp|https?):\/\/+(www\.)?[a-z0-9\-\.]{2,}\.[a-z]{3}$/.test(this.establishment.url_web.toString());
    const isOk4 = /^(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{2}$/.test(this.establishment.url_web.toString());
    const isOk5 = /^(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(this.establishment.url_web.toString());
    this.urlwebEstablishmentValidated = isOk || isOk2 || isOk3 || isOk4 || isOk5 || (this.establishment.url_web == '');
    return this.urlwebEstablishmentValidated;
  }

  subirFotoFachada() {
    this.fotoFachadaInput.nativeElement.click();
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
     const file = event.target.files[0];
     reader.readAsDataURL(file);
     reader.onload = () => {
       this.establishment_selected_picture.establishment_picture_file_name = file.name;
       this.establishment_selected_picture.establishment_picture_file_type = file.type;
       this.establishment_selected_picture.establishment_picture_file = reader.result.toString().split(',')[1];
     };
    }
  }

  refreshTotalWorkers() {
    this.total_workers = 0;
    this.establishment.workers_on_establishment.forEach(element => {
       if (element.is_max) {
          this.total_workers += element.count;
       }
    });
  }

  updateGmap() {
    
  }
}
