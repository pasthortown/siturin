import { User } from 'src/app/models/profile/User';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DinardapService } from './../../../services/negocio/dinardap.service';
import { EstablishmentService } from './../../../services/CRUD/BASE/establishment.service';
import { Establishment } from './../../../models/BASE/Establishment';
import { RegisterService as CatastroRegisterService } from 'src/app/services/CRUD/CATASTRO/register.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-establishment-list-data',
  templateUrl: './establishment-list-data.component.html',
  styleUrls: ['./establishment-list-data.component.scss']
})
export class EstablishmentListDataComponent implements OnInit {
  @Input('ruc_number') ruc_number: String = '';
  @Input('ruc_code_id') ruc_code_id: String = '';
  
  @Output('establishment_selected') change: EventEmitter<any> = new EventEmitter<any>();
  
  establishment_selected: Establishment = new Establishment();
  establishments: Establishment[] = [];

  establecimientos_pendiente = false;
  mostrarMensajeNoNombreComercial = false;
  establishmentComercialNameValidated = false;

  config: any = {
    paging: true,
    filtering: {filterString: ''},
    className: ['table-striped', 'table-hover', 'table-bordered']
  };
  currentPageEstablishment = 1;
  lastPageEstablishment = 1;
  recordsByPageEstablishment = 5;
  rowsEstablishment = [];
  columnsEstablishment = [];
  dataEstablishment = [];

  registers_mintur = [];
  register_types = [];
  
  constructor(private establishmentDataService: EstablishmentService,
    private dinardapDataService: DinardapService,
    private catastroRegisterDataService: CatastroRegisterService,
    private toastr: ToastrManager) {
    
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.getRegistersMintur();
    this.change.emit({establishment: new Establishment(), showData: false});
  }

  getRegistersMintur() {
    this.registers_mintur = [];
    this.catastroRegisterDataService.searchByRuc(this.ruc_number.toString()).then( r => {
       this.registers_mintur = r;
       this.getEstablishmentsOnRuc();
    }).catch( e => console.log(e) );
  }

  getEstablishmentsOnRuc() {
    this.establishment_selected = new Establishment();
    this.establecimientos_pendiente = true;
    this.establishmentDataService.getByRuc(this.ruc_number, 5, 1).then( r => {
       const establecimientos = r.data as Establishment[];
       this.dinardapDataService.get_RUC(this.ruc_number).then( dinardap => {
         this.establecimientos_pendiente = false;
         let itemsDetalles = [];
         if (!Array.isArray(dinardap.sri_establecimientos.original.entidades.entidad.filas.fila)) {
            itemsDetalles = [dinardap.sri_establecimientos.original.entidades.entidad.filas.fila];
         } else {
            itemsDetalles = dinardap.sri_establecimientos.original.entidades.entidad.filas.fila;
         }
         itemsDetalles.forEach(sri_establecimiento => {
            let existe = false;
            const newEstablishment = new Establishment();
            sri_establecimiento.columnas.columna.forEach(sriData => {
               if (sriData.campo === 'estadoEstablecimiento') {
                  newEstablishment.sri_state = sriData.valor as string;
               }
               if (sriData.campo === 'calle') {
                  if (JSON.stringify(sriData.valor) !== '{}') {
                     newEstablishment.address_main_street = sriData.valor;   
                  } else {
                     newEstablishment.address_main_street = '';
                  }
               }
               if (sriData.campo === 'numero') {
                  if (JSON.stringify(sriData.valor) !== '{}') {
                     newEstablishment.address_number = sriData.valor;
                  } else {
                     newEstablishment.address_number = '';
                  }
               }
               if (sriData.campo === 'interseccion') {
                  if (JSON.stringify(sriData.valor) !== '{}') {
                     newEstablishment.address_secondary_street = sriData.valor;
                  } else {
                     newEstablishment.address_secondary_street = '';
                  }
               }
               if (sriData.campo === 'numeroEstablecimiento') {
                  newEstablishment.ruc_code_id = sriData.valor as string;
               }
               if (sriData.campo === 'nombreFantasiaComercial') {
                  if (JSON.stringify(sriData.valor) !== '{}') {
                     newEstablishment.commercially_known_name = sriData.valor as string;
                  } else {
                     newEstablishment.commercially_known_name = '';
                  }
               }
            });
            establecimientos.forEach(establecimiento => {
               if (establecimiento.ruc_code_id === newEstablishment.ruc_code_id.trim()) {
                  existe = true;
                  establecimiento.sri_state = newEstablishment.sri_state;
               }
            });
            if (!existe) {
               establecimientos.push(newEstablishment);
            }
            this.establishments = establecimientos;
         });
         if(establecimientos.length == 0){
            this.establishments = [];
         }
         this.buildDataTableEstablishment();
       }).catch( e => { console.log(e); });
    }).catch( e => { console.log(e); });
  }

  buildDataTableEstablishment() {
    this.columnsEstablishment = [
      {title: '', name: 'selected'},
      {title: 'Número de Establecimiento', name: 'code'},
      {title: 'Dirección', name: 'address'},
      {title: 'Nombre Comercial', name: 'name'},
      {title: 'Estado', name: 'sri_state'},
    ];
    const data = [];
    this.establishments.forEach(item => {
      let agregar = false;
      if (typeof this.ruc_code_id !== 'undefined') { 
        if (Number(item.ruc_code_id) == Number(this.ruc_code_id)) {
          agregar = true;
        }
      } else {
        let tieneRegistro = false;
        this.registers_mintur.forEach( elem => {
          if (elem.establishment_ruc_code == item.ruc_code_id) {
            tieneRegistro = true;
          }
        });
        if (!tieneRegistro) {
          agregar = true;
        }
      }
      if (agregar) {
        data.push({
          selected: '',
          code: item.ruc_code_id,
          address: item.address_main_street + ' ' + item.address_number + ' ' + item.address_secondary_street,
          name: item.commercially_known_name,
          sri_state: item.sri_state,
        });
      }
    });
    if (data.length == 0) {
       Swal.fire(
          'No dispone de establecimientos sin registro de turismo.',
          'El sistema ha validado que todos los establecimientos de su RUC cuentan con registro de turismo.',
          'error'
       );
    }
    data.sort((previous: any, current: any) => {
       if (Number(previous.code) > Number(current.code)) {
          return 1;
       } else if (Number(previous.code) < Number(current.code)) {
          return -1;
       }
       return 0;
    });
    this.dataEstablishment = data;
    this.onChangeTableEstablishment(this.config);
  }

  onChangeTableEstablishment(config: any, event?): any {
    const page: any = {page: this.currentPageEstablishment, itemsPerPage: this.recordsByPageEstablishment};
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    const filteredData = this.changeFilterEstablishment(this.dataEstablishment, this.config);
    const sortedData = this.changeSortEstablishment(filteredData, this.config);
    this.rowsEstablishment = page && config.paging ? this.changePageEstablishment(page, sortedData) : sortedData;
  }

  changeFilterEstablishment(data: any, config: any): any {
    this.rowsEstablishment.forEach(row => {
       row.selected = '';
    });
    let filteredData: Array<any> = data;
    this.columnsEstablishment.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });
    if (!config.filtering) {
      return filteredData;
    }
    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }
    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columnsEstablishment.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }
 
  changeSortEstablishment(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }
    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }
    if (!columnName) {
      return data;
    }
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changePageEstablishment(page: any, data: Array<any> = this.dataEstablishment):Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  onCellClickEstablishment(event) {
    if (event.row.name == ''){
      this.toastr.errorToastr('El establecimiento seleccionado, no tiene nombre comercial. Acérquese al SRI para registrar el nombre comercial del establecimiento.', 'Datos - SRI');
      this.mostrarMensajeNoNombreComercial = true;
      this.change.emit({establishment: new Establishment(), showData: false});
      return;
    } else {
      this.mostrarMensajeNoNombreComercial = false;
    }
    this.establishments.forEach(element => {
       if (element.ruc_code_id == event.row.code) {
          this.establishment_selected = element;
          if (element.sri_state == 'CERRADO') {
            this.toastr.errorToastr('El sistema ha detectado que el establecimiento seleccionado, en el SRI está en estado CERRADO.', 'Estado de Establecimiento');
            this.change.emit({establishment: new Establishment(), showData: false});
            return;
          }
          if (this.establishment_selected.id !== 0) {
            this.establishment_selected.contact_user = new User();
          }
          this.change.emit({establishment: this.establishment_selected, showData: true});
       }
    }); 
    this.rowsEstablishment.forEach(row => {
       if (row == event.row) {
          row.selected = '<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>';
       } else {
          row.selected = '';
       }
    });
  }
}
