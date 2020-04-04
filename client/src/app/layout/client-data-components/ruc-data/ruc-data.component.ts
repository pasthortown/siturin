import { PersonRepresentativeAttachmentService } from './../../../services/CRUD/BASE/personrepresentativeattachment.service';
import { RucService } from './../../../services/CRUD/BASE/ruc.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GroupTypeService } from 'src/app/services/CRUD/BASE/grouptype.service';
import { GroupType } from 'src/app/models/BASE/GroupType';
import { DinardapService } from 'src/app/services/negocio/dinardap.service';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { User } from 'src/app/models/profile/User';
import { GroupGiven } from 'src/app/models/BASE/GroupGiven';
import { PersonRepresentative } from 'src/app/models/BASE/PersonRepresentative';
import { PersonRepresentativeAttachment } from 'src/app/models/BASE/PersonRepresentativeAttachment';

@Component({
  selector: 'app-ruc-data',
  templateUrl: './ruc-data.component.html',
  styleUrls: ['./ruc-data.component.scss']
})
export class RucDataComponent implements OnInit {  
  @Input('user') user: User = new User();
  @Input('editable') editable: boolean = true;
  
  ruc: Ruc = new Ruc();

  rucValidated = false;
  consumoRuc = false;
  SRIOK = false;
  rucGuardadoBase = false;

  registrarlo = false;
  guardando = false;

  consumoCedulaRepresentanteLegal = false;
  REGCIVILREPRESENTANTELEGALOK = false;
  identificationRepresentativePersonValidated = false;

  representanteCedulaData = 'CONECTÁNDOSE AL REGISTRO CIVIL...';

  rucData = 'CONECTÁNDOSE AL SRI...';
  superciasData = 'CONECTÁNDOSE A LA SUPERINTENDENCIA DE COMPANÍAS...';
  
  razon_social = '';
  groupTypeSelected: GroupType = new GroupType();

  // CATALOGOS
  
  group_types: GroupType[] = [];

  constructor(private dinardapDataService: DinardapService,
              private group_typeDataService: GroupTypeService,
              private toastr: ToastrManager,
              private rucDataService: RucService,
              private personRepresentativeAttachmentDataService: PersonRepresentativeAttachmentService
              ) {
    
  }

  ngOnInit() {
    this.ruc = new Ruc();
    this.ruc.number = this.user.ruc;
    this.groupTypeSelected = new GroupType();
    this.getRuc(this.ruc.number);
    this.getGroupTypes();
  }

  getGroupTypes() {
    this.group_types = [];
    this.group_typeDataService.get().then( r => {
      this.group_types = r as GroupType[];
    }).catch( e => console.log(e) );
  }

  checkRuc() {
    this.ruc.number = this.ruc.number.replace(/[^\d]/, '');
    if (this.ruc.number.length !== 13) {
      this.rucValidated = false;
      this.consumoRuc = false;
      this.ruc.baised_accounting = false;
      this.ruc.tax_payer_type_id = 1;
      return;
    }
    if (this.consumoRuc && this.SRIOK) {
      return;
    }
    this.rucData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al SRI...</strong></div>';
    if (!this.consumoRuc) {
      this.consumoRuc = true;
      this.rucValidated = true;
      this.dinardapDataService.get_super_cias(this.ruc.number).then( r => {
         this.superciasData = '';
         if (r.companias !== 0) {
            const companias = r.companias.original.entidades.entidad;
            companias.forEach(entidad => {
               if (entidad.nombre == 'Superintendencia de Compañias Datos Companía') {
                  entidad.filas.fila.columnas.columna.forEach(element => {
                     if (element.campo == 'expediente') {
                        this.superciasData += '<strong>Número de Expediente: </strong> ' + element.valor + '<br/>';
                        if (JSON.stringify(element.valor) !== '{}') {
                           this.ruc.group_given.register_code = element.valor;
                         }
                     }
                     if (element.campo == 'objeto_social') {
                        this.superciasData += '<strong>Objeto Social: </strong> ' + element.valor + '<br/>';
                     }   
                  });
               }
            });  
         }
      }).catch( e => { console.log(e); });
      this.dinardapDataService.get_RUC(this.ruc.number).then( r => {
         this.SRIOK = true;
         const itemsDetalles_SRI_RUC = r.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna;
         const itemsDetalles_SRI_RUC_COMPLETO = r.sri_ruc_completo.original.entidades.entidad;
         this.rucData = '';
         let datosGenerales = '';
         let datosRL = '';
         let datosAE = '';
         let datosContactoSRI = '';
         itemsDetalles_SRI_RUC_COMPLETO.forEach(entidad => {
            if (entidad.nombre == 'Actividad Economica') {
               const AE = entidad.filas.fila.columnas.columna;
               AE.forEach(element => {
                  if (element.campo == 'actividadGeneral') {
                     datosAE += '<strong>Actividad Económica: </strong> ' + element.valor + '<br/>';
                  }
               });
            }
            if (entidad.nombre == 'Contribuyente Datos Completo') {
               const DC = entidad.filas.fila.columnas.columna;
               DC.forEach(element => {
                  if (element.campo == 'razonSocial') {
                   this.razon_social = element.valor;
                     datosGenerales += '<strong>Razón Social: </strong> ' + element.valor + '<br/>';
                  }
                  if (element.campo == 'email') {
                     if (JSON.stringify(element.valor) !== '{}') {
                        datosContactoSRI += '<strong>Correo Electrónico - Registrado en SRI: </strong> ' + element.valor + '<br/>';
                     }
                  }
                  if (element.campo == 'telefonoDomicilio') {
                     if (JSON.stringify(element.valor) !== '{}') {
                        datosContactoSRI += '<strong>Teléfono Domicilio - Registrado en SRI: </strong> ' + element.valor + '<br/>';
                     }
                  }
               });
            }
            if (entidad.nombre == 'Representante Legal') {
               const RL = entidad.filas.fila.columnas.columna;
               RL.forEach(element => {
                  if (element.campo == 'identificacion') {
                     datosRL += '<strong>Identificación Representante Legal: </strong> ' + element.valor + '<br/>';
                     if (JSON.stringify(element.valor) !== '{}') {
                        this.ruc.person_representative.identification = element.valor;
                        this.consumoCedulaRepresentanteLegal = false;
                        this.REGCIVILREPRESENTANTELEGALOK = false;
                        this.checkIdentificationRepresentant();
                     }
                  }
                  if (element.campo == 'nombre') {
                     datosRL += '<strong>Nombre Representante Legal: </strong> ' + element.valor + '<br/>';
                  }
               });
            }
         });
         itemsDetalles_SRI_RUC.forEach(element => {
            if (element.campo == 'estadoContribuyente') {
               datosGenerales += '<strong>Estado Contribuyente: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'fechaInscripcionRuc') {
               datosGenerales += '<strong>Fecha de Inscripción del RUC: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'fechaActualizacion') {
               datosGenerales += '<strong>Fecha de Actualización: </strong> ' + element.valor + '<br/>';
            }
            if (element.campo == 'obligado') {
               if (element.valor == 'N') {
                  this.ruc.baised_accounting = false;
                  datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> NO<br/>';
               } else {
                  this.ruc.baised_accounting = true;
                  datosGenerales += '<strong>Obligado a Llevar Contabilidad: </strong> SI<br/>';
               }
            }
            if (element.campo == 'personaSociedad') {
               if (element.valor == 'PNL') {
                  this.ruc.tax_payer_type_id = 1;
               } else {
                  this.ruc.tax_payer_type_id = 2;
               }
               datosGenerales += '<strong>Tipo de Contribuyente: </strong> ' + element.valor + '<br/>';
            }
            this.rucData = datosGenerales + datosAE + datosContactoSRI;
            if (this.ruc.tax_payer_type_id != 1) {
               this.rucData += datosRL;
            }
         });
      }).catch( e => {
         console.log(e);
         this.rucData = '<div class="alert alert-danger" role="alert">El SRI, no respondió. Vuelva a intentarlo.</div>';
         this.consumoRuc = false;
         this.SRIOK = false;
      });
    }
  }

  setGroupTypeSelected(id: number) {
    this.groupTypeSelected = new GroupType();
    this.group_types.forEach(element => {
      if(element.id == id) {
         this.groupTypeSelected = element;
      }
    });
  }

  validateGroupGivenType(): Boolean {
    if (this.ruc.tax_payer_type_id > 1) {
      return this.ruc.group_given.group_type_id !== 0;
    }
    return true;
  }

  checkRegistroSupercias() {
    this.ruc.group_given.register_code = this.ruc.group_given.register_code.replace(/[^\d]/, '');
  }

  checkIdentificationRepresentant() {
    this.ruc.person_representative.identification = this.ruc.person_representative.identification.replace(/[^\d]/, '');
    if (this.ruc.person_representative.identification.length !== 10) {
       this.identificationRepresentativePersonValidated = true;
       this.consumoCedulaRepresentanteLegal = true;
       this.REGCIVILREPRESENTANTELEGALOK = true;
    return;
    }
    if (this.consumoCedulaRepresentanteLegal && this.REGCIVILREPRESENTANTELEGALOK) {
       return;
    }
    this.representanteCedulaData = '<div class=\"progress mb-3\"><div class=\"progress-bar progress-bar-striped progress-bar-animated bg-warning col-12\">Espere...</div></div><div class="col-12 text-center"><strong>Conectándose al Registro Civil...</strong></div>';
    if (!this.consumoCedulaRepresentanteLegal) {
       this.identificationRepresentativePersonValidated = true;
       this.consumoCedulaRepresentanteLegal = true;
       this.dinardapDataService.get_cedula(this.ruc.person_representative.identification).then( r => {
          const registros = r.original.entidades.entidad.filas.fila.columnas.columna;
          this.representanteCedulaData = '';
          this.ruc.owner_name = '';
          this.REGCIVILREPRESENTANTELEGALOK = true;
          registros.forEach(element => {
             if (element.campo === 'cedula') {
                if (element.valor === this.ruc.person_representative.identification) {
                   this.toastr.successToastr('La cédula ingresada es correcta.', 'Registro Civil');
                   this.identificationRepresentativePersonValidated = true;
                } else {
                   this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
                   this.identificationRepresentativePersonValidated = false;
                }
             }
             if (this.identificationRepresentativePersonValidated) {
                if (element.campo === 'nombre') {
                   this.representanteCedulaData += '<strong>Nombre: </strong> ' + element.valor + '<br/>';
                   this.ruc.owner_name = element.valor;
                }
                if (element.campo === 'fechaNacimiento') {
                   this.representanteCedulaData += '<strong>Fecha de Nacimiento: </strong> ' + element.valor + '<br/>';
                }
                if (element.campo === 'nacionalidad') {
                   this.representanteCedulaData += '<strong>Nacionalidad: </strong> ' + element.valor + '<br/>';
                }
             }
          });
       }).catch( e => {
          this.toastr.errorToastr('La cédula ingresada no es correcta.', 'Registro Civil');
          this.representanteCedulaData = '<div class="alert alert-danger" role="alert">El Registro Civil, no respondió. Vuelva a intentarlo.</div>';
          this.REGCIVILREPRESENTANTELEGALOK = false;
          this.consumoCedulaRepresentanteLegal = false;
       });
    }
  }

  validateNombramiento(): Boolean {
    if(this.ruc.tax_payer_type_id <= 1) {
      return true;
    }
    return !(this.ruc.person_representative_attachment.person_representative_attachment_file_name == '');
  }

  CodeFilePersonRepresentativeAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.ruc.person_representative_attachment.person_representative_attachment_file_name = file.name;
          this.ruc.person_representative_attachment.person_representative_attachment_file_type = file.type;
          this.ruc.person_representative_attachment.person_representative_attachment_file = reader.result.toString().split(',')[1];
       };
    }
  }

  borrarNombramiento() {
    this.ruc.person_representative_attachment.person_representative_attachment_file = '';
    this.ruc.person_representative_attachment.person_representative_attachment_file_type = '';
    this.ruc.person_representative_attachment.person_representative_attachment_file_name = '';
  }

  descargarNombramiento() {
    this.downloadFile(
      this.ruc.person_representative_attachment.person_representative_attachment_file,
      this.ruc.person_representative_attachment.person_representative_attachment_file_type,
      this.ruc.person_representative_attachment.person_representative_attachment_file_name);
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

  validateFechaNombramiento(): boolean {
   if (this.ruc.tax_payer_type_id > 1) {
      const today = new Date();
      const min = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
      if (typeof this.ruc.person_representative_attachment.assignment_date === 'undefined') {
         return false;
      }
      if (new Date(this.ruc.person_representative_attachment.assignment_date.toString()) > today || new Date(this.ruc.person_representative_attachment.assignment_date.toString()) < min) {
         return false;
      } else {
         return true;
      }
   }
   return true;
  }

  validateRuc(): boolean {
    let toReturn = this.rucValidated && this.SRIOK;
    if(this.ruc.tax_payer_type_id > 1) {
      toReturn = this.rucValidated &&
        this.validateNombramiento() &&
        this.validateGroupGivenType() &&
        this.identificationRepresentativePersonValidated &&
        this.SRIOK &&
        this.REGCIVILREPRESENTANTELEGALOK &&
        (this.ruc.group_given.register_code !== '') &&
        this.validateFechaNombramiento();
    }
    console.log(toReturn);
    return toReturn;
  }

  getRuc(number: String) {
    this.rucDataService.get_filtered(number).then( r => {
      if ( typeof r.Ruc === 'undefined') {
         this.ruc = new Ruc();
         this.ruc.establishments = [];
         this.ruc.number = number;
         this.ruc.contact_user = new User();
         this.ruc.group_given = new GroupGiven();
         this.ruc.person_representative = new PersonRepresentative();
         this.ruc.tax_payer_type_id = 0;
         this.ruc.contact_user_id = 0;
         this.ruc.person_representative.identification = this.user.identification;
         this.checkIdentificationRepresentant();
         this.checkRuc();
      } else {
         this.ruc = r.Ruc as Ruc;
         this.ruc.establishments = [];
         this.ruc.contact_user = r.contact_user as User;
         if (r.group_given == '0') {
            this.ruc.group_given = new GroupGiven();
         } else {
            this.ruc.group_given = r.group_given as GroupGiven;
            this.group_types = [];
            this.group_typeDataService.get().then( r => {
               this.group_types = r as GroupType[];
               this.setGroupTypeSelected(this.ruc.group_given.group_type_id);
            }).catch( e => console.log(e) );
         }
         if (r.person_representative == '0') {
            this.ruc.person_representative = new PersonRepresentative();
         } else {
            this.ruc.person_representative = r.person_representative as PersonRepresentative;
         }
         this.ruc.person_representative_attachment = new PersonRepresentativeAttachment();
         if(this.ruc.tax_payer_type_id > 1) {
            this.getPersonRepresentativeAttachment(this.ruc.number);
         }
         this.rucGuardadoBase = true;
         this.checkRuc();
         this.checkIdentificationRepresentant();
      }
    }).catch( e => { console.log(e); });
  }

  getPersonRepresentativeAttachment(ruc_number: String) {
    if (this.ruc.tax_payer_type_id <= 1) {
      this.ruc.person_representative_attachment = new PersonRepresentativeAttachment();
      return;
    }
    this.personRepresentativeAttachmentDataService.get_filtered(ruc_number).then( r => {
      if(r == '0'){
         this.ruc.person_representative_attachment = new PersonRepresentativeAttachment();
      }else {
         this.ruc.person_representative_attachment = r as PersonRepresentativeAttachment;
      }
    }).catch( e => { console.log(e); });
  }

  guardarRUC() {
    this.rucGuardadoBase = false;
    if (!this.validateRuc()) {
      this.toastr.errorToastr('Existe conflicto con la información ingresada.', 'Nuevo');
      return;
    }
    if(!this.SRIOK) {
      this.toastr.errorToastr('Esperando confirmación del SRI', 'SRI');
      return;
    }
    this.guardando = true;
    this.ruc.person_representative_attachment.ruc = this.ruc.number;
    this.ruc.contact_user_id = this.user.id;
    if (typeof this.ruc.id === 'undefined') {
      this.rucDataService.register_ruc(this.ruc).then( r => {
         this.guardando = false;
         if ( r === '0' ) {
            this.toastr.errorToastr('Existe conflicto con el correo de la persona de contacto ingresada.', 'Nuevo');
            return;
         }
         this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
         this.rucGuardadoBase = true;
      }).catch( e => {
         this.guardando = false;
         this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Nuevo');
         return;
      });
    } else {
      this.rucDataService.update_ruc(this.ruc).then( r => {
         this.guardando = false;
         if ( r === '0' ) {
            this.toastr.errorToastr('Existe conflicto con el correo de la persona de contacto ingresada.', 'Actualizar');
            return;
         }
         this.toastr.successToastr('Datos actualizados satisfactoriamente.', 'Actualizar');
         this.rucGuardadoBase = true;
      }).catch( e => {
         this.guardando = false;
         this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Nuevo');
         return;
      });
    }
  }

  nextPage() {

  }
}
