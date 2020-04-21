import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TourGuideService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/tourguide.service';
import { TourGuide } from './../../../../models/OPERACIONINTERMEDIACION/TourGuide';
import { RegisterService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/register.service';
import { Register } from './../../../../models/OPERACIONINTERMEDIACION/Register';


@Component({
   selector: 'app-tourguide',
   templateUrl: './tourguide.component.html',
   styleUrls: ['./tourguide.component.scss']
})
export class TourGuideComponent implements OnInit {
   tour_guides: TourGuide[] = [];
   tour_guideSelected: TourGuide = new TourGuide();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   registers: Register[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private registerDataService: RegisterService,
               private tour_guideDataService: TourGuideService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getRegister();
   }

   selectTourGuide(tour_guide: TourGuide) {
      this.tour_guideSelected = tour_guide;
   }

   getRegister() {
      this.registers = [];
      this.registerDataService.get().then( r => {
         this.registers = r as Register[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTourGuides();
   }

   getTourGuides() {
      this.tour_guides = [];
      this.tour_guideSelected = new TourGuide();
      this.tour_guideSelected.register_id = 0;
      this.tour_guideDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.tour_guides = r.data as TourGuide[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTourGuide(content) {
      this.tour_guideSelected = new TourGuide();
      this.tour_guideSelected.register_id = 0;
      this.openDialog(content);
   }

   editTourGuide(content) {
      if (typeof this.tour_guideSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTourGuide() {
      if (typeof this.tour_guideSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.tour_guideDataService.delete(this.tour_guideSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTourGuides();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.tour_guideDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TourGuides.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.tour_guideDataService.get().then( r => {
         const backupData = r as TourGuide[];
         let output = 'id;identification;fullname;credential_number;credential_date;register_id\n';
         backupData.forEach(element => {
            output += element.id; + element.identification + ';' + element.fullname + ';' + element.credential_number + ';' + element.credential_date + ';' + element.register_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TourGuides.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.tour_guideDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.tour_guideSelected.id === 'undefined') {
               this.tour_guideDataService.post(this.tour_guideSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTourGuides();
               }).catch( e => console.log(e) );
            } else {
               this.tour_guideDataService.put(this.tour_guideSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTourGuides();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}