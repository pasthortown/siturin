import { ToastrManager } from 'ng6-toastr-notifications';
import { DeclarationItemService } from 'src/app/services/CRUD/FINANCIERO/declarationitem.service';
import { DeclarationItemCategoryService } from 'src/app/services/CRUD/FINANCIERO/declarationitemcategory.service';
import { DeclarationAttachmentService } from 'src/app/services/CRUD/FINANCIERO/declarationattachment.service';
import { DeclarationItem } from './../../../models/FINANCIERO/DeclarationItem';
import { DeclarationItemCategory } from 'src/app/models/FINANCIERO/DeclarationItemCategory';
import { DeclarationItemValue } from 'src/app/models/FINANCIERO/DeclarationItemValue';
import { RegisterService as RegisterAlojamientoService } from 'src/app/services/CRUD/ALOJAMIENTO/register.service';
import { RegisterService as RegisterAlimentosBebidasService } from 'src/app/services/CRUD/ALIMENTOSBEBIDAS/register.service';
import { RegisterService as RegisterOperacionIntermediacionService } from 'src/app/services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { DeclarationService } from 'src/app/services/CRUD/FINANCIERO/declaration.service';
import { DeclarationAttachment } from 'src/app/models/FINANCIERO/DeclarationAttachment';
import { Establishment } from 'src/app/models/BASE/Establishment';
import { Declaration } from 'src/app/models/FINANCIERO/Declaration';
import { Ruc } from 'src/app/models/BASE/Ruc';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-declaration-data',
  templateUrl: './declaration-data.component.html',
  styleUrls: ['./declaration-data.component.scss']
})
export class DeclarationDataComponent implements OnInit {
  @Input('ruc') ruc: Ruc = new Ruc();
  @Input('establishment') establishment: Establishment = new Establishment();
  @Input('is_new_register') is_new_register: boolean = false;
  
  @Output('preview_page_button_click') preview_page_button_click: EventEmitter<string> = new EventEmitter<string>();
  @Output('next_page_button_click') next_page_button_click: EventEmitter<string> = new EventEmitter<string>();
  @Output('canContinue') canContinue: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  canAddNewDeclaration = true;
  mostrarDataDeclaration = false;
  guardando = false;
  canSiguiente = false;

  balance: DeclarationAttachment = new DeclarationAttachment();

  declaration_selected: Declaration = new Declaration();

  declarations: Declaration[] = [];

  declarationItemsCategories: DeclarationItemCategory[] = [];
  declarationItems: DeclarationItem[] = [];

  declarationItemsToShow = [];
  my_tramits = [];

  totalunoxmil = 0;

  constructor(private toastr: ToastrManager,
    private declarationDataService: DeclarationService,
    private registerAlimentosBebidasDataService: RegisterAlimentosBebidasService,
    private registerAlojamientoDataService: RegisterAlojamientoService,
    private registerOperacionIntermediacionDataService: RegisterOperacionIntermediacionService,
    private declarationAttachmentDataService: DeclarationAttachmentService,
    private declarationItemDataService: DeclarationItemService,
    private declarationItemCategoryDataService: DeclarationItemCategoryService,
    ) {
    
  }

  ngOnInit() {
    this.loadCatalogos();
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  loadCatalogos() {
    this.getDeclarationCategories();
    this.getDeclarationItems();
  }

  refresh() {
    this.declaration_selected = new Declaration();
    this.mostrarDataDeclaration = false;
    this.getDeclarationsByEstablishment();
  }

  getDeclarationCategories() {
    this.declarationItemCategoryDataService.get().then( r => {
      this.declarationItemsCategories = r as DeclarationItemCategory[];
    }).catch( e => { console.log(e); });
  }

  getDeclarationItems() {
    this.declarationItemDataService.get().then( r => {
      this.declarationItems = r as DeclarationItem[];
    }).catch( e => { console.log(e); });
  }

  newDeclaration() {
    this.declaration_selected = new Declaration();
    this.mostrarDataDeclaration = true;
    this.guardando = false;
    this.balance = new DeclarationAttachment();
    this.buildDeclarationItemsToShow();
  }

  getDeclarationsByEstablishment() {
    this.declarations = [];
    this.declarationDataService.get_by_establishment(this.establishment.id).then( r => {
      const my_declaration_response = r as Declaration[];
      my_declaration_response.forEach(element => {
          element.bloqued = false;
      });
      this.declarations = my_declaration_response;
      this.my_tramits = [];
      // INFLUYE ACTIVIDADES
      this.registerAlimentosBebidasDataService.last_tramit_state(this.ruc.number).then(response_last_tramit_state => {
        const myTramits = response_last_tramit_state as any[];
        this.blockByTramit(myTramits);
        
      }).catch( e => { console.log(e); });
      this.registerAlojamientoDataService.last_tramit_state(this.ruc.number).then(response_last_tramit_state => {
        const myTramits = response_last_tramit_state as any[];
        this.blockByTramit(myTramits);
      }).catch( e => { console.log(e); });
      // this.registerOperacionIntermediacionDataService.last_tramit_state(this.ruc.number).then(response_last_tramit_state => {
      //   const myTramits = response_last_tramit_state as any[];
      //   this.blockByTramit(myTramits);
      // }).catch( e => { console.log(e); });
      if (this.declarations.length > 0) {
        this.canSiguiente = true;
        this.canContinue.emit(this.canSiguiente);
      }
    }).catch( e => { console.log(e); });
  }

  blockByTramit(myTramits: any[]) {
    myTramits.forEach(element => {
      element.forEach(e1 => {
        this.my_tramits.push(e1);
      });
    });
    const today = new Date();
    this.my_tramits.forEach(tramit => {
      const tramit_date = new Date(tramit.created_at.toString());
      const tramit_year = tramit_date.getFullYear();
      if ((tramit_year == today.getFullYear()) && (tramit.establishment_id == this.establishment.id)) {
        this.canAddNewDeclaration = false;
      }   
    });
    this.declarations.forEach(declaration => {
      this.my_tramits.forEach(tramit => {
        const tramit_date = new Date(tramit.created_at.toString());
        const tramit_year = tramit_date.getFullYear();
        if (declaration.year == tramit_year) {
            declaration.bloqued = true;
            declaration.editable = false;
        }
      });
    });
  }

  buildDeclarationItemsToShow() {
    this.declarationItemsToShow = [];
    this.declarationItemsCategories.forEach(category => {
       category.total = 0;
       if (category.tax_payer_type_id == this.ruc.tax_payer_type_id) {
          const items = [];
          this.declarationItems.forEach(item => {
            if(item.declaration_item_category_id == category.id) {
               const newValueItem = new DeclarationItemValue();
               newValueItem.declaration_item_id = item.id;
               if (item.tax_payer_type_id == this.ruc.tax_payer_type_id) {
                 items.push({declarationItem: item, valueItem: newValueItem});
               }
               category.total += newValueItem.value * item.factor;
            }
          });
          this.declarationItemsToShow.push({Category: category, items: items});  
       }
    });
    this.calcularUnoxMil();
  }

  calcularUnoxMil() {
    this.totalunoxmil = 0;
    this.declarationItemsToShow.forEach(itemToShow => {
       itemToShow.items.forEach(item => {
          this.totalunoxmil += item.valueItem.value * (item.declarationItem.factor);
       });
    });
  }

  selectDeclaration(declaration: Declaration) {
    this.declaration_selected = declaration;
    this.getDeclarationAttachment(declaration.id);
    this.mostrarDataDeclaration = true;
    this.declarationItemsToShow = [];
    this.guardando = false;
    this.declarationItemsCategories.forEach(category => {
       if (category.tax_payer_type_id == this.ruc.tax_payer_type_id) {
          const items = [];
          declaration.declaration_item_values_on_declaration.forEach(newValueItem => {
             this.declarationItems.forEach(item => {
                if (item.tax_payer_type_id == this.ruc.tax_payer_type_id) {
                   if ((item.id == newValueItem.declaration_item_id) && (item.declaration_item_category_id == category.id)) {
                      items.push({declarationItem: item, valueItem: newValueItem});
                   }
                }
             });
          });
          this.declarationItemsToShow.push({Category: category, items: items});
       }
    });
    this.calcularUnoxMil();
    this.calcTotalPartials();
  }

  getDeclarationAttachment(declaration_id: number) {
    this.declarationAttachmentDataService.get_by_declaration_id(declaration_id).then( r => {
       this.balance = r as DeclarationAttachment;
    }).catch( e => { console.log(e); });
  }

  calcTotalPartials() {
    this.declarationItemsToShow.forEach(group => {
       group.Category.total = 0;
       group.items.forEach(item => {
          group.Category.total += item.valueItem.value * item.declarationItem.factor;
       });
    });
  }

  downloadBalance() {
    this.downloadFile(
       this.balance.declaration_attachment_file,
       this.balance.declaration_attachment_file_type,
       this.balance.declaration_attachment_file_name);
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

  borrarBalance() {
    this.balance = new DeclarationAttachment();
  }

  CodificarArchivoBalance(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
     const file = event.target.files[0];
     reader.readAsDataURL(file);
     reader.onload = () => {
       this.balance.declaration_attachment_file = reader.result.toString().split(',')[1];
       this.balance.declaration_attachment_file_type = file.type;
       this.balance.declaration_attachment_file_name = file.name;
     };
    }
  }

  previewPage() {
    this.preview_page_button_click.emit('Paso 1');
  }

  nextPage() {
    this.next_page_button_click.emit('Paso 3');
  }

  validateDeclaration(): boolean {
    if (this.totalunoxmil <= 0) {
      return false;
    }
    return true;
  }

  saveDeclaration() {
    let minim_year_declaration = 0;
    if (this.establishment.as_turistic_register_date !== null && typeof this.establishment.as_turistic_register_date != 'undefined') {
       const as_turistic_register_date = new Date(this.establishment.as_turistic_register_date.toString());
       minim_year_declaration = as_turistic_register_date.getFullYear();   
    }
    if (this.declaration_selected.year < minim_year_declaration) {
       this.toastr.errorToastr('Existe inconsistencia con el año de la declaración.', 'Declaración');
       return;
    }
    if (this.balance.declaration_attachment_file_name.length > 40) {
       this.toastr.errorToastr('El nombre del archivo adjunto es demasiado largo.', 'Declaración');
       return;
    }
    if (!this.validateDeclaration()) {
       this.toastr.errorToastr('La información ingresada es incorrecta.', 'Declaración');
       return;
    }
    if (this.balance.declaration_attachment_file == ''){
       if (this.ruc.tax_payer_type_id == 2) {
          this.toastr.errorToastr('Adjunte el balance individual del establecimiento, suscrito por el representante legal.', 'Declaración');
       } else {
          this.toastr.errorToastr('Adjunte el inventario valorado del establecimiento, suscrito por el propietario.', 'Declaración');
       }
       return;
    }
    let previamente_declarado = false;
    this.declarations.forEach(declaration => {
       if (declaration.year == this.declaration_selected.year) {
          previamente_declarado = true;
       }
    });
    if (previamente_declarado) {
       this.toastr.errorToastr('Usted ya ha declarado previamente el año seleccionado.', 'Declaración');
       return;
    }
    this.guardando = true;
    this.declaration_selected.declaration_item_values_on_declaration = [];
    this.declarationItemsToShow.forEach(element => {
       element.items.forEach(item => {
          this.declaration_selected.declaration_item_values_on_declaration.push(item.valueItem);
       });
    });
    this.declaration_selected.establishment_id = this.establishment.id;
    this.declarationDataService.register_data(this.declaration_selected).then( r => {
       if ( r === '0' ) {
          this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Declaración');
          return;
       }
       const declarationSaved = r as Declaration;
      //  let my_register_state = new RegisterState();
      //  this.my_registers.forEach(my_register => {
      //     if (my_register.establishment.ruc_code_id == this.establishment_selected.ruc_code_id) {
      //       my_register_state = my_register.status_register as RegisterState;
      //     }
      //  });
      //  if (my_register_state.id !== 0) {
      //     const textoEstado = my_register_state.state_id.toString();
      //     const digitoEstado = textoEstado.substring(textoEstado.length-1, textoEstado.length);
      //     if (digitoEstado == '8') {
      //        my_register_state.justification = 'Declaración ' + declarationSaved.year.toString() + 'Emitida';
      //        my_register_state.state_id = my_register_state.state_id - 1;
      //        this.registerStateDataService.post(my_register_state).then( resp => {
      //        }).catch( e => { console.log(e); });
      //     }
      //  }
       this.balance.declaration_id = declarationSaved.id;
       if (this.balance.id == 0) {
          this.declarationAttachmentDataService.post(this.balance).then( r1 => {
             this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Declaración');
             this.mostrarDataDeclaration = false;
             this.guardando = false;
             this.refresh();
          }).catch( e => {
             console.log(e);
             this.guardando = false;
          });
       } else {
          this.declarationAttachmentDataService.put(this.balance).then( r1 => {
             this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Declaración');
             this.mostrarDataDeclaration = false;
             this.guardando = false;
             this.refresh();
          }).catch( e => { 
             console.log(e);
             this.guardando = false;
          });
       }
    }).catch( e => {
       this.guardando = false;
       this.toastr.errorToastr('Existe conflicto la información proporcionada.', 'Declaración');
       return;
    });
  }
}
