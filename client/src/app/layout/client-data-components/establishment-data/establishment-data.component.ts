import { Language } from './../../../models/BASE/Language';
import { GenderService } from './../../../services/CRUD/BASE/gender.service';
import { WorkerGroupService } from './../../../services/CRUD/BASE/workergroup.service';
import { EstablishmentCertificationAttachmentService } from './../../../services/CRUD/BASE/establishmentcertificationattachment.service';
import { WorkerGroup } from './../../../models/BASE/WorkerGroup';
import { Gender } from './../../../models/BASE/Gender';
import { Worker } from './../../../models/BASE/Worker';
import { User } from './../../../models/profile/User';
import { EstablishmentService } from './../../../services/CRUD/BASE/establishment.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DinardapService } from './../../../services/negocio/dinardap.service';
import { EstablishmentCertificationTypeService } from './../../../services/CRUD/BASE/establishmentcertificationtype.service';
import { EstablishmentCertificationType } from './../../../models/BASE/EstablishmentCertificationType';
import { EstablishmentCertification } from './../../../models/BASE/EstablishmentCertification';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
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
import { EstablishmentCertificationAttachment } from 'src/app/models/BASE/EstablishmentCertificationAttachment';

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
  genders: Gender[] = [];
  worker_groups: WorkerGroup[] = [];
  ubications: Ubication[] = [];
  establishment_certification_types_categories: EstablishmentCertificationType[] = [];
  establishment_certification_types: EstablishmentCertificationType[] = [];

  establishmentComercialNameValidated = false;
  franchiseChainNameValidated = false;
  urlwebEstablishmentValidated = false;
  addressEstablishmentValidated = false;
  identificationContactEstablishmentValidated = false;
  mainPhoneContactEstablishmentValidated = false;
  secondaryPhoneContactEstablishmentValidated = false;
  emailContactEstablishmentValidated = false;
  consumoCedulaEstablishmentContact = false;
  REGCIVILOKEstablishment = false;

  selectedNameType: RucNameType = new RucNameType();
  ruc_name_types: RucNameType[] = [];
  establishment_property_types:EstablishmentPropertyType[] = [];
  establishment_selected_picture: EstablishmentPicture = new EstablishmentPicture();
  total_workers = 0;
  establishment_certifications_establishmentSelected: EstablishmentCertification = new EstablishmentCertification();

  zonalEstablishmentSelectedCode = '-';
  provinciaEstablishmentSelectedCode = '-';
  cantonEstablishmentSelectedCode = '-';
  cedulaEstablishmentContactData = 'CONECTÁNDOSE AL REGISTRO CIVIL...';

  zonalesEstablishment: Ubication[] = []; 
  provinciasEstablishment: Ubication[] = []; 
  cantonesEstablishment: Ubication[] = []; 
  parroquiasEstablishment: Ubication[] = []; 

  constructor(private toastr: ToastrManager,
    private register_type_alojamiento_DataService: RegisterTypeAlojamientoService,
    private register_type_alimentosBebidas_DataService: RegisterTypeAlimentosBebidas,
    private establishment_property_typeDataService: EstablishmentPropertyTypeService,
    private dinardapDataService: DinardapService,
    private register_type_operacionIntermediacion_DataService: RegisterTypeOperacionIntermedacion,
    private establishmentPictureDataService: EstablishmentPictureService,
    private rucNameTypeDataService: RucNameTypeService,
    private genderDataService: GenderService,
    private workerGroupDataService: WorkerGroupService,          
    private establishmentDataService: EstablishmentService,
    private establishmentCertificationAttachmentDataService: EstablishmentCertificationAttachmentService,
    private establishment_certification_typeDataService: EstablishmentCertificationTypeService,
    private ubicationDataService: UbicationService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  loadCatalogos() {
    this.getRegisterTypes();
    this.getEstablishmentPropertyType();
    this.getGenders();
    this.getWorkerGroups();
    this.getUbications();
    this.getCertificationTypes();
  }

  refresh() {
    this.initDataEstablishment(this.establishment);
  }

  initDataEstablishment(establishment: Establishment) {
    if(establishment.id == 0) {
      this.establishment = new Establishment();
      this.establishment_selected_picture = new EstablishmentPicture();
      this.buildWorkerGroups();
      this.cedulaEstablishmentContactData = 'CONECTÁNDOSE AL REGISTRO CIVIL...';
      this.provinciaEstablishmentSelectedCode = '-';
      this.provinciaEstablishmentSelectedCode = '-';
      this.cantonEstablishmentSelectedCode = '-';
      this.refreshTotalWorkers();
      this.getRucNameTypes();
      this.getEstablishmentPicture();
      this.checkEstablishmentAddress();
      return;
    }
    this.establishmentDataService.get_filtered(establishment.id).then( r => {
      this.establishment = r.establishment as Establishment;
      this.recoverUbication();
      this.checkEstablishmentAddress();
      this.checkURLWeb();
      this.getRucNameTypes();
      this.getEstablishmentPicture();
      this.establishment.contact_user = r.contact_user as User;
      this.checkCedulaEstablishment();
      this.checkTelefonoPrincipalContactoEstablecimiento();
      this.checkTelefonoSecundarioContactoEstablecimiento();
      this.validateNombreFranquiciaCadena();
      this.checkEmailContactEstablishment();
      this.buildWorkerGroups();
      this.establishment.workers_on_establishment = r.workers_on_establishment as Worker[];
      this.establishment.workers_on_establishment.forEach(worker => {
          this.genders.forEach(gender => {
            if(gender.id == worker.gender_id) {
                worker.gender_name = gender.name;
            }
          });
          this.worker_groups.forEach(worker_group => {
            if(worker_group.id == worker.worker_group_id) {
                worker.worker_group_name = worker_group.name;
                worker.is_max = worker_group.is_max;
            }
          });
      });
      this.refreshTotalWorkers();
      this.establishment.languages_on_establishment = r.languages_on_establishment as Language[];
      this.establishment.establishment_certifications_on_establishment = r.establishment_certifications_on_establishment as EstablishmentCertification[];
      this.establishment.establishment_certifications_on_establishment.forEach(establishment_certification_on_establishment => {
          establishment_certification_on_establishment.establishment_certification_attachment = new EstablishmentCertificationAttachment();
          this.establishment_certification_types.forEach(establishment_certification_type => {
            if (establishment_certification_on_establishment.establishment_certification_type_id == establishment_certification_type.id) {
                establishment_certification_on_establishment.establishment_certification_type_fatherCode = establishment_certification_type.father_code.toString();
                this.getEstablishmentCertificationTypesSpecific(establishment_certification_on_establishment);
            }
          });
          this.establishmentCertificationAttachmentDataService.get(establishment_certification_on_establishment.establishment_certification_attachment_id).then( r_attachment => {
            establishment_certification_on_establishment.establishment_certification_attachment = r_attachment.EstablishmentCertificationAttachment as EstablishmentCertificationAttachment;
          }).catch( e => { console.log(e); });
      });
    }).catch( e => { console.log(e); });
    this.establishmentPictureDataService.get_by_establishment_id(establishment.id).then( r => {
       this.establishment_selected_picture = r as EstablishmentPicture;
    }).catch( e => { console.log(e); });
  }

  getGenders() {
    this.genders = [];
    this.genderDataService.get().then( r => {
       this.genders = r as Gender[];
    }).catch( e => console.log(e) );
  }

  recoverUbication() {
    this.ubicationDataService.getByIdLower(this.establishment.ubication_id).then( r => {
      this.zonalEstablishmentSelectedCode = r.zonal.code;
      this.provinciaEstablishmentSelectedCode = r.provincia.code;
      this.cantonEstablishmentSelectedCode = r.canton.code;
      this.establishment.ubication_id = r.parroquia.id;
      this.getCantonesEstablishmentRecovery();
      this.getParroquiasEstablishmentRecovery();
    }).catch( e => { console.log(e); });
  }

  getCantonesEstablishmentRecovery() {
    this.ubicationDataService.get_filtered(this.provinciaEstablishmentSelectedCode).then( r => {
       this.cantonesEstablishment = r as Ubication[];
    }).catch( e => { console.log(e) });
  }

  getParroquiasEstablishmentRecovery() {
    this.ubicationDataService.get_filtered(this.cantonEstablishmentSelectedCode).then( r => {
       this.parroquiasEstablishment = r as Ubication[];
    }).catch( e => { console.log(e) });
  }

  getWorkerGroups() {
    this.worker_groups = [];
    this.workerGroupDataService.get().then( r => {
       this.worker_groups = r as WorkerGroup[];
    }).catch( e => console.log(e) ); 
  }

  buildWorkerGroups() {
    this.establishment.workers_on_establishment = [];
    this.genders.forEach(gender => {
       this.worker_groups.forEach(worker_group => {
          const newWorker = new Worker();
          newWorker.worker_group_id = worker_group.id;
          newWorker.worker_group_name = worker_group.name;
          newWorker.gender_id = gender.id;
          newWorker.gender_name = gender.name;
          newWorker.count = 0;
          newWorker.is_max = worker_group.is_max;
          this.establishment.workers_on_establishment.push(newWorker);
       });
    });
  }

  getCertificationTypes() {
    this.establishment_certification_types = [];
    this.establishment_certification_typeDataService.get().then( r => {
      this.establishment_certification_types = r as EstablishmentCertificationType[]; 
      this.getEstablishmentCertificationTypesCategories();
    }).catch( e => { console.log(e); });
  }

  getEstablishmentCertificationTypesSpecific(establishment_certification: EstablishmentCertification) {
    establishment_certification.establishment_certification_type_specifics = [];
    this.establishment_certification_types.forEach(element => {
      if (element.father_code == establishment_certification.establishment_certification_type_fatherCode) {
        establishment_certification.establishment_certification_type_specifics.push(element); 
      }
    });
  }

  getEstablishmentCertificationTypesCategories() {
    this.establishment_certification_types_categories = [];
    this.establishment_certification_types.forEach(element => {
      if (element.father_code == '-') {
        this.establishment_certification_types_categories.push(element);
      }
    });
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
       this.getZonalesEstablishment();
    }).catch( e => { console.log(e); });
  }

  getZonalesEstablishment() {
    this.zonalesEstablishment = [];
    this.provinciasEstablishment = [];
    this.zonalEstablishmentSelectedCode = '-';
    this.provinciaEstablishmentSelectedCode = '-';
    this.ubications.forEach( element => {
      if (element.father_code == '-') {
        this.zonalesEstablishment.push(element);
      }
    });
    this.zonalesEstablishment.forEach(zonal => {
      this.ubications.forEach(ubication => {
        if (ubication.father_code == zonal.code) {
          this.provinciasEstablishment.push(ubication);
       }
      });
    });
    this.provinciasEstablishment.sort(function(a, b) {
      const nameA = a.name.toLowerCase().trim();
      const nameB = b.name.toLowerCase().trim();
      if (nameA < nameB) {
         return -1;
      }
      if (nameA > nameB) {
         return 1;
      }
      return 0;
    });
  }

  getCantonesEstablishment() {
    this.cantonesEstablishment = [];
    this.cantonEstablishmentSelectedCode = '-';
    this.provinciasEstablishment.forEach(provincia => {
       if (provincia.code == this.provinciaEstablishmentSelectedCode){
          this.zonalEstablishmentSelectedCode = provincia.father_code.toString();
          this.establishment.address_map_latitude = provincia.gmap_reference_latitude;
          this.establishment.address_map_longitude = provincia.gmap_reference_longitude;
       }
    });
    this.ubications.forEach(ubication => {
       if (ubication.father_code == this.provinciaEstablishmentSelectedCode) {
          this.cantonesEstablishment.push(ubication);
       }
    });
  }

  getParroquiasEstablishment() {
    this.parroquiasEstablishment = [];
    this.establishment.ubication_id = 0;
    this.cantonesEstablishment.forEach(canton => {
       if(canton.code == this.cantonEstablishmentSelectedCode){
          this.establishment.address_map_latitude = canton.gmap_reference_latitude;
          this.establishment.address_map_longitude = canton.gmap_reference_longitude;
       }
    });
    this.ubications.forEach(ubication => {
       if (ubication.father_code == this.cantonEstablishmentSelectedCode) {
          this.parroquiasEstablishment.push(ubication);
       }
    });
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
    this.selectedNameType = new RucNameType();
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

  checkEstablishmentAddress(): Boolean {
    if(this.establishment.address_main_street === '' || this.establishment.address_number === '' || this.establishment.address_secondary_street === '') {
       this.addressEstablishmentValidated = false;
       return false;
    }
    this.addressEstablishmentValidated = true;
    return true;
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

  address_mapEventEstablishment(event) {
    this.establishment.address_map_latitude = event.coords.lat;
    this.establishment.address_map_longitude = event.coords.lng;
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
    this.parroquiasEstablishment.forEach(parroquia => {
       if (parroquia.id == this.establishment.ubication_id) {
          this.establishment.address_map_latitude = parroquia.gmap_reference_latitude;
          this.establishment.address_map_longitude = parroquia.gmap_reference_longitude;
       }
    });
  }

  addEstablishmentCertification() {
    const newEstablishmentCertification = new EstablishmentCertification();
    this.establishment.establishment_certifications_on_establishment.push(newEstablishmentCertification);
  }

  selectEstablishmentCertification(establishment_certification: EstablishmentCertification) {
    this.establishment_certifications_establishmentSelected = establishment_certification;
  }

  removeEstablishmentCertification(establishmentCertification: EstablishmentCertification) {
    const newEstablishmentCertifications: EstablishmentCertification[] = [];
    this.establishment.establishment_certifications_on_establishment.forEach(element => {
       if (element !== establishmentCertification) {
          newEstablishmentCertifications.push(element);
       }
    });
    this.establishment.establishment_certifications_on_establishment = newEstablishmentCertifications;
  }

  checkCedulaEstablishment() {
    this.establishment.contact_user.identification = this.establishment.contact_user.identification.replace(/[^\d]/, '');
    if (this.establishment.contact_user.identification.length !== 10) {
       this.identificationContactEstablishmentValidated = false;
       this.consumoCedulaEstablishmentContact = false;
       return;
    }
    if (this.consumoCedulaEstablishmentContact && this.REGCIVILOKEstablishment) {
       return;
    }
    this.cedulaEstablishmentContactData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al Registro Civil...</strong></div>';
    if (!this.consumoCedulaEstablishmentContact) {
       this.identificationContactEstablishmentValidated = true;
       this.consumoCedulaEstablishmentContact = true;
       this.dinardapDataService.get_cedula(this.establishment.contact_user.identification).then( r => {
          const registros = r.original.entidades.entidad.filas.fila.columnas.columna;
          this.cedulaEstablishmentContactData = '';
          this.REGCIVILOKEstablishment = true;
          registros.forEach(element => {
             if (element.campo === 'cedula') {
                if (element.valor === this.establishment.contact_user.identification) {
                   this.toastr.successToastr('La cédula ingresada es correcta.', 'Registro Civil');
                   this.identificationContactEstablishmentValidated = true;
                } else {
                   this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
                   this.identificationContactEstablishmentValidated = false;
                }
             }
             if (this.identificationContactEstablishmentValidated) {
                if (element.campo === 'nombre') {
                   this.cedulaEstablishmentContactData += '<strong>Nombre: </strong> ' + element.valor + '<br/>';
                   this.establishment.contact_user.name = element.valor;
                }
                if (element.campo === 'nacionalidad') {
                   this.cedulaEstablishmentContactData += '<strong>Nacionalidad: </strong> ' + element.valor + '<br/>';
                }
             }
          });
       }).catch( e => {
          this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
          this.cedulaEstablishmentContactData = '<div class="alert alert-danger" role="alert">El Registro Civil, no respondió. Vuelva a intentarlo.</div>';
          this.REGCIVILOKEstablishment = false;
          this.consumoCedulaEstablishmentContact = false;
       });
    }
  }

  checkTelefonoPrincipalContactoEstablecimiento(): Boolean {
    this.establishment.contact_user.main_phone_number = this.establishment.contact_user.main_phone_number.replace(/[^\d]/, '');
    if (this.establishment.contact_user.main_phone_number.length < 9) {
       this.mainPhoneContactEstablishmentValidated = false;
       return false;
    }
    this.mainPhoneContactEstablishmentValidated = true;
    return true;
  }

  checkTelefonoSecundarioContactoEstablecimiento(): Boolean {
    this.establishment.contact_user.secondary_phone_number = this.establishment.contact_user.secondary_phone_number.replace(/[^\d]/, '');
    if (this.establishment.contact_user.secondary_phone_number.length > 0 && this.establishment.contact_user.secondary_phone_number.length < 9) {
       this.secondaryPhoneContactEstablishmentValidated = false;
       return false;
    }
    this.secondaryPhoneContactEstablishmentValidated = true;
    return true;
  }

  checkEmailContactEstablishment(): Boolean {
    const isOk = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.establishment.contact_user.email.toString());
    this.emailContactEstablishmentValidated = isOk;
    return this.emailContactEstablishmentValidated;
  }

  validateEstablecimiento(): Boolean {
    if (!((this.establishment.ruc_code_id !== '-') &&
    (this.establishment.ruc_name_type_id !== 0) &&
    this.establishmentComercialNameValidated  &&
    (this.establishment.establishment_property_type_id !== 0) &&
    this.urlwebEstablishmentValidated &&
    (this.establishment.ubication_id !== 0) &&
    this.addressEstablishmentValidated &&
    (this.establishment.address_reference !== '') &&
    this.identificationContactEstablishmentValidated &&
    this.mainPhoneContactEstablishmentValidated &&
    this.secondaryPhoneContactEstablishmentValidated &&
    this.emailContactEstablishmentValidated &&
    this.REGCIVILOKEstablishment
    )) {
       return false;
    }
    return true;
  }
}
