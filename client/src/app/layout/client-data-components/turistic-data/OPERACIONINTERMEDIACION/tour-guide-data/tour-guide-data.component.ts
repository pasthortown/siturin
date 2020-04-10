import { SIITService } from './../../../../../services/negocio/siit.service';
import { UbicationService } from 'src/app/services/CRUD/BASE/ubication.service';
import { Ubication } from 'src/app/models/BASE/Ubication';
import { GuideTypeService } from './../../../../../services/CRUD/OPERACIONINTERMEDIACION/guidetype.service';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { GuideType } from './../../../../../models/OPERACIONINTERMEDIACION/GuideType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TourGuide } from './../../../../../models/OPERACIONINTERMEDIACION/TourGuide';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Register } from 'src/app/models/ALOJAMIENTO/Register';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour-guide-data',
  templateUrl: './tour-guide-data.component.html',
  styleUrls: ['./tour-guide-data.component.scss']
})
export class TourGuideDataComponent implements OnInit {
  @Input('register') register: Register = new Register();
  @Input('editable') editable: boolean = true;
  
  @Input('register_types_block') register_types_block = {
    register_types_alojamiento: [],
    register_types_alimentos_bebidas: [],
    register_types_operacion_intermediacion: []
  };

  guiaTurismoSwitch = false;
  newTuristicGuide: TourGuide = new TourGuide();

  identificationGuideValidated = false;
  SIITOKIdentificationGuide = false;
  consumoIdentificationGuide = false;

  turistic_classifications: GuideType[] = [];

  regiones: RegisterType[] = [];

  ubications: Ubication[] = [];
  zonales: Ubication[] = [];
  provincias: Ubication[] = [];
  provinciasGuide: Ubication[] = [];
  cantonesGuide: Ubication[] = [];
  parroquiasGuide: Ubication[] = [];

  constructor(private toastr: ToastrManager,
    private modalService: NgbModal,
    private guideTypeDataService: GuideTypeService,
    private siitDataService: SIITService,
    private ubicationDataService: UbicationService) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
  }

  loadCatalogos() {
    this.getGuideTypes();
    this.getRegiones();
    this.getUbications();
  }

  getUbications() {
    this.ubications = [];
    this.ubicationDataService.get().then( r => {
       this.ubications = r as Ubication[];
       this.getZonales();
    }).catch( e => { console.log(e); });
  }

  getZonales() {
    // UBICACION: Zonal->Provincia->Canton->Parroquia
    this.zonales = [];
    this.provincias = [];
    this.ubications.forEach( element => {
      if (element.father_code == '-') {
        this.zonales.push(element);
      }
    });
    this.zonales.forEach(zonal => {
      this.ubications.forEach(ubication => {
        if (ubication.father_code == zonal.code) {
          this.provincias.push(ubication);
       }
      });
    });
    this.provincias.sort(function(a, b) {
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

  getRegiones() {
    this.regiones = [];
    this.register_types_block.register_types_alojamiento.forEach(element => {
      if (element.father_code == '-') {
        this.regiones.push(element);
      }
    });
  }

  getGuideTypes() {
    this.guideTypeDataService.get().then( r => {
       this.turistic_classifications = r as GuideType[];
       
    }).catch( e => { console.log(e); });
  }

  addGuiaTurismo(content) {
    this.SIITOKIdentificationGuide = false;
    this.consumoIdentificationGuide = false;
    this.newTuristicGuide = new TourGuide();
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Guía de Turismo');
          this.register.turistic_guides.push(this.newTuristicGuide);
       }
    }), ( r => {}));
  }
   
  editGuiaTurismo(content, turistic_guide) {
    let initialData = turistic_guide;
    this.newTuristicGuide = turistic_guide;
    this.SIITOKIdentificationGuide = false;
    this.consumoIdentificationGuide = false;
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Guía de Turismo');
          this.register.turistic_guides.forEach(element => {
             if (element == initialData) {
                element = this.newTuristicGuide;
             }
          });
       }
    }), ( r => {}));
  }
 
  deleteGuiaTurismo(turistic_guide) {
    const new_turistic_guides = [];
    this.SIITOKIdentificationGuide = false;
    this.consumoIdentificationGuide = false;
    this.register.turistic_guides.forEach(element => {
       if (element != turistic_guide) {
          new_turistic_guides.push(element);
       }
    });
    this.register.turistic_guides = new_turistic_guides;
    this.toastr.successToastr('Guía de Turismo removido satisfactoriamente.', 'Guía de Turismo');
  }

  getProvinciasGuide(code) {
    this.provinciasGuide = [];
    this.provincias.forEach(ubication => {
       if (code == '1') {
          if (ubication.code !== '0820') {
             this.provinciasGuide.push(ubication);
          }
       } else {
          if (ubication.code == '0820') {
             this.provinciasGuide.push(ubication);
          }
       }
    });
  }

  getCantonesGuide(code) {
    this.cantonesGuide = [];
    this.ubications.forEach(ubication => {
       if (ubication.father_code == code) {
          this.cantonesGuide.push(ubication);
       }
    });
  }

  getParroquiasGuide(code) {
    this.parroquiasGuide = [];
    this.ubications.forEach(ubication => {
       if (ubication.father_code == code) {
          this.parroquiasGuide.push(ubication);
       }
    });
  }

  checkIdentificacionGuia() {
    this.newTuristicGuide.identification = this.newTuristicGuide.identification.replace(/[^\d]/, '');
    if (this.newTuristicGuide.identification.length !== 10) {
       this.identificationGuideValidated = false;
       this.consumoIdentificationGuide = false;
       return;
    }
    if (this.consumoIdentificationGuide && this.SIITOKIdentificationGuide) {
       return;
    }
    this.siitDataService.guiaTurismo(this.newTuristicGuide.identification).then( guiaResponse => {
       this.SIITOKIdentificationGuide = true;
       this.consumoIdentificationGuide = true;
       this.identificationGuideValidated = true;
       Swal.fire(
          'Guía de Turísmo no encontrado!',
          'La identificación ingresada, no corresponde a un Guía de Turísmo registrado por el Ministerio de Turismo.',
          'error'
       );
       console.log('Traer a partir de la identificación del web service la información de SIIT sino mostrar mensaje de registrarlo en siit');
    }).catch( e => {
       this.SIITOKIdentificationGuide = false;
       this.consumoIdentificationGuide = false;
       console.log(e);
    });
  }
}
