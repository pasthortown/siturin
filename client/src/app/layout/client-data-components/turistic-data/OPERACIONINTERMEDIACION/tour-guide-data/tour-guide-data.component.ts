import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { SIITService } from 'src/app/services/negocio/siit.service';
import { RegisterType } from 'src/app/models/ALOJAMIENTO/RegisterType';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TourGuide } from 'src/app/models/OPERACIONINTERMEDIACION/TourGuide';
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
  REGCIVILOK = false;
  consumoIdentificationGuide = false;

  CedulaData = '';
  
  constructor(private toastr: ToastrManager,
    private modalService: NgbModal,
    private siitDataService: SIITService,
    private dinardapDataService: DinardapService) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    if (!this.editable) {
      this.validateGuiasSIIT();
    }
  }

  validateGuiasSIIT() {
    // aqui web service para validar todos los guias
    // DEL SIIT O SIETE O DONDE SEA TRAER NUMERO DE CREDENCIAL Y FECHA DE EMISION
  }

  addGuiaTurismo(content) {
    this.REGCIVILOK = false;
    this.consumoIdentificationGuide = false;
    this.identificationGuideValidated = false;
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
    this.REGCIVILOK = false;
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
    this.REGCIVILOK = false;
    this.consumoIdentificationGuide = false;
    this.identificationGuideValidated = false;
    this.register.turistic_guides.forEach(element => {
       if (element != turistic_guide) {
          new_turistic_guides.push(element);
       }
    });
    this.register.turistic_guides = new_turistic_guides;
    this.toastr.successToastr('Guía de Turismo removido satisfactoriamente.', 'Guía de Turismo');
  }

  checkIdentificacionGuia() {
    this.newTuristicGuide.identification = this.newTuristicGuide.identification.replace(/[^\d]/, '');
    if (this.newTuristicGuide.identification.length !== 10) {
       this.identificationGuideValidated = false;
       this.consumoIdentificationGuide = false;
       return;
    }
    if (this.consumoIdentificationGuide && this.REGCIVILOK) {
       return;
    }
    this.CedulaData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al Registro Civil...</strong></div>';
    if (!this.consumoIdentificationGuide) {
      this.identificationGuideValidated = true;
      this.consumoIdentificationGuide = true;
      this.dinardapDataService.get_cedula(this.newTuristicGuide.identification).then( guiaResponse => {
         const registros = guiaResponse.original.entidades.entidad.filas.fila.columnas.columna;
         this.CedulaData = '';
         this.REGCIVILOK = true;
         registros.forEach(element => {
            if (element.campo === 'cedula') {
               if (element.valor === this.newTuristicGuide.identification) {
                 this.toastr.successToastr('La cédula ingresada es correcta.', 'Registro Civil');
                 this.identificationGuideValidated = true;
               } else {
                 this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
                 this.identificationGuideValidated = false;
               }
            }
            if (this.identificationGuideValidated) {
               if (element.campo === 'nombre') {
                  this.newTuristicGuide.fullname = element.valor;
               }
            }
         });
      }).catch( e => {
         this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
         this.CedulaData = '<div class="alert alert-danger" role="alert">El Registro Civil, no respondió. Vuelva a intentarlo.</div>';
         this.REGCIVILOK = false;
         this.consumoIdentificationGuide = false;
         this.identificationGuideValidated = false;
         console.log(e);
      });
    }
  }
}
