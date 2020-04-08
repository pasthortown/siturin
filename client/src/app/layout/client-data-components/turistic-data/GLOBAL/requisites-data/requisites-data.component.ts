import { AuthorizationAttachmentService } from './../../../../../services/CRUD/ALOJAMIENTO/authorizationattachment.service';
import { PropertyTitleAttachmentService } from './../../../../../services/CRUD/ALOJAMIENTO/propertytitleattachment.service';
import { FloorAuthorizationCertificateService } from './../../../../../services/CRUD/BASE/floorauthorizationcertificate.service';
import { RegisterRequisite } from './../../../../../models/ALOJAMIENTO/RegisterRequisite';
import { LanguageService } from './../../../../../services/CRUD/BASE/language.service';
import { AuthorizationAttachment } from './../../../../../models/ALOJAMIENTO/AuthorizationAttachment';
import { PropertyTitleAttachment } from './../../../../../models/ALOJAMIENTO/PropertyTitleAttachment';
import { FloorAuthorizationCertificate } from './../../../../../models/BASE/FloorAuthorizationCertificate';
import { Establishment } from './../../../../../models/BASE/Establishment';
import { Register } from './../../../../../models/ALOJAMIENTO/Register';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'src/app/models/BASE/Language';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-requisites-data',
  templateUrl: './requisites-data.component.html',
  styleUrls: ['./requisites-data.component.scss']
})
export class RequisitesDataComponent implements OnInit {
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  @Input('is_new_register') is_new_register: boolean = true;
  @Input('requisites') requisites: any[] = [];

  @Output('finish_selected') finish_selected: EventEmitter<any> = new EventEmitter<any>();
  
  @Input('register_types_block') register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  actividadSelected = 0;
  categoryAB = 'Pendiente';
  categories_registers_AB = [];

  totalABPuntos = 0;
  totalAbPointsSelected = 0;
  totalAviable = 0;
  totalABPuntosShown = 0;

  languages_establishmentSelectedId = 0;
  languages: Language[] = [];

  certificadoUsoSuelo: FloorAuthorizationCertificate = new FloorAuthorizationCertificate();
  tituloPropiedad: PropertyTitleAttachment = new PropertyTitleAttachment();
  autorizacionCondomino: AuthorizationAttachment = new AuthorizationAttachment();
   

  constructor(private toastr: ToastrManager,
    private languageDataService: LanguageService,
    private floorAuthorizationCertificateDataService: FloorAuthorizationCertificateService,
    private propertyTitleAttachmentDataService: PropertyTitleAttachmentService,
    private authorizationAttachmentDataService: AuthorizationAttachmentService) {
    
  }

  ngOnInit() {
    this.loadCategoriesAB();
    this.getLanguages();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.actividadSelected = this.register.activity_id;
  }

  loadCategoriesAB() {
    this.categories_registers_AB = [];
    let classification_code = this.register.classification_selected_code;
    this.register_types_block.register_types_alimentos_bebidas.forEach(element => {
      if (element.father_code == classification_code) {
        this.categories_registers_AB.push(element);
      }
    });
    this.refresh();
  }

  getCertificadoUsoSuelo() {
    if (this.register.id == 0) {
      return;
    }
    this.floorAuthorizationCertificateDataService.get_by_register_id(this.register.id).then( r => {
       this.certificadoUsoSuelo = r as FloorAuthorizationCertificate;
    }).catch( e => { console.log(e); });
  }

  getTituloPropiedad() {
    if (this.register.id == 0) {
      return;
    }
    this.propertyTitleAttachmentDataService.get_by_register_id(this.register.id).then( r => {
      this.tituloPropiedad = r as PropertyTitleAttachment;
    }).catch( e => { console.log(e); });
  }

  getAutorizacionCondominos() {
    if (this.register.id == 0) {
      return;
    }
    this.authorizationAttachmentDataService.get_by_register_id(v).then( r => {
      this.autorizacionCondomino = r as AuthorizationAttachment;
    }).catch( e => { console.log(e); });
  }
 
  getLanguages() {
    this.languages = [];
    this.languageDataService.get().then( r => {
       this.languages = r as Language[];
    }).catch( e => console.log(e) );
  }

  changeFullfill(register_requisite: RegisterRequisite) {
    if (register_requisite.fullfill) {
      register_requisite.value = 'true';
    } else {
      register_requisite.value = 'false';
    }
    if (this.actividadSelected == 2) {
      this.calcTotalPoints();
    }
  }

  calcTotalPoints() {
    let totalScore = 0;
    let totalScoreShown = 0;
    let totalAviable = 0;
    let totalAviableExtra = 0;
    this.requisites.forEach(element => {
       totalAviable += element.score * 1;
       if (element.fullfill) {
          if (!element.mandatory) {
             totalScore += element.score * 1;
             totalScoreShown += element.score * 1;
          } else {
             totalAviableExtra += element.score * 1;
          }
       }
    });
    if (totalAviable !== 0) {
       this.totalABPuntos = totalScore * 100 / totalAviable;
       this.totalABPuntosShown = totalScoreShown * 100 / (totalAviable - totalAviableExtra);   
    } else {
       this.totalABPuntos = totalScore;
       this.totalABPuntosShown = totalScoreShown;
    }
    this.totalAbPointsSelected = totalScoreShown;
    this.totalAviable = totalAviable;
    this.categoryAB = 'Pendiente';
    this.categories_registers_AB.forEach(category => {
       if (category.min_points*1 <= this.totalABPuntosShown*1) {
          this.categoryAB = category.name;
          this.register.register_type_id = category.id;
       }
    });
  }

  removeLanguage() {
    if (this.languages_establishmentSelectedId === 0) {
       this.toastr.errorToastr('Seleccione un Lenguaje.', 'Error');
       return;
    }
    const newLanguages: Language[] = [];
    let eliminado = false;
    this.establishment.languages_on_establishment.forEach(language => {
       if (language.id !== this.languages_establishmentSelectedId) {
          newLanguages.push(language);
       } else {
          eliminado = true;
       }
    });
    if (!eliminado) {
       this.toastr.errorToastr('Lenguaje no encontrado.', 'Error');
       return;
    }
    this.establishment.languages_on_establishment = newLanguages;
    this.languages_establishmentSelectedId = 0;
  }

  addLanguage() {
    if (this.languages_establishmentSelectedId === 0) {
       this.toastr.errorToastr('Seleccione un Lenguaje.', 'Error');
       return;
    }
    this.languages.forEach(language => {
       if (language.id == this.languages_establishmentSelectedId) {
          let existe = false;
          this.establishment.languages_on_establishment.forEach(element => {
             if (element.id == language.id) {
                existe = true;
             }
          });
          if (!existe) {
             this.establishment.languages_on_establishment.push(language);
             this.languages_establishmentSelectedId = 0;
          } else {
             this.toastr.errorToastr('El lenguaje ya se encuentra agregado.', 'Error');
          }
       }
    });
  }

  selectLanguage(language: Language) {
    this.languages_establishmentSelectedId = language.id;
  }

  downloadFloorCertification() {
    this.downloadFile(
      this.certificadoUsoSuelo.floor_authorization_certificate_file,
      this.certificadoUsoSuelo.floor_authorization_certificate_file_type,
      this.certificadoUsoSuelo.floor_authorization_certificate_file_name);
  }

  downloadPropertyTitle() {
    this.downloadFile(
      this.tituloPropiedad.property_title_attachment_file,
      this.tituloPropiedad.property_title_attachment_file_type,
      this.tituloPropiedad.property_title_attachment_file_name);
  }

  downloadAutorizacionCondominio() {
    this.downloadFile(
      this.autorizacionCondomino.authorization_attachment_file,
      this.autorizacionCondomino.authorization_attachment_file_type,
      this.autorizacionCondomino.authorization_attachment_file_name);
  }

  borrarFloorCertificado() {
    this.certificadoUsoSuelo = new FloorAuthorizationCertificate();
  }
 
  borrarPropertyTitle() {
    this.tituloPropiedad = new PropertyTitleAttachment();
  }

  borrarAutorizacionCondominio() {
    this.autorizacionCondomino = new AuthorizationAttachment();
  }

  CodificarArchivoFloorCertification(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
     const file = event.target.files[0];
     reader.readAsDataURL(file);
     reader.onload = () => {
      this.certificadoUsoSuelo.floor_authorization_certificate_file = reader.result.toString().split(',')[1];
      this.certificadoUsoSuelo.floor_authorization_certificate_file_type = file.type;
      this.certificadoUsoSuelo.floor_authorization_certificate_file_name = file.name;
     };
    }
  }
 
  CodificarArchivoPropertyTitle(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
     const file = event.target.files[0];
     reader.readAsDataURL(file);
     reader.onload = () => {
       this.tituloPropiedad.property_title_attachment_file = reader.result.toString().split(',')[1];
       this.tituloPropiedad.property_title_attachment_file_type = file.type;
       this.tituloPropiedad.property_title_attachment_file_name = file.name;
     };
    }
  }
 
  CodificarArchivoAutorizacionCondominio(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
     const file = event.target.files[0];
     reader.readAsDataURL(file);
     reader.onload = () => {
       this.autorizacionCondomino.authorization_attachment_file = reader.result.toString().split(',')[1];
       this.autorizacionCondomino.authorization_attachment_file_type = file.type;
       this.autorizacionCondomino.authorization_attachment_file_name = file.name;
     };
    }
  }

  downloadFile(file: any, type: any, name: any) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type });
    saveAs(blob, name);
  }
}
