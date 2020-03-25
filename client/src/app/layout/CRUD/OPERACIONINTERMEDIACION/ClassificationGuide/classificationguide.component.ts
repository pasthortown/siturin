import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ClassificationGuideService } from './../../../../services/CRUD/OPERACIONINTERMEDIACION/classificationguide.service';
import { ClassificationGuide } from './../../../../models/OPERACIONINTERMEDIACION/ClassificationGuide';

@Component({
   selector: 'app-classificationguide',
   templateUrl: './classificationguide.component.html',
   styleUrls: ['./classificationguide.component.scss']
})
export class ClassificationGuideComponent implements OnInit {
   classifications_guide: ClassificationGuide[] = [];
   classification_guideSelected: ClassificationGuide = new ClassificationGuide();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private classification_guideDataService: ClassificationGuideService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectClassificationGuide(classification_guide: ClassificationGuide) {
      this.classification_guideSelected = classification_guide;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getClassificationsGuide();
   }

   getClassificationsGuide() {
      this.classifications_guide = [];
      this.classification_guideSelected = new ClassificationGuide();
      this.classification_guideDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.classifications_guide = r.data as ClassificationGuide[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newClassificationGuide(content) {
      this.classification_guideSelected = new ClassificationGuide();
      this.openDialog(content);
   }

   editClassificationGuide(content) {
      if (typeof this.classification_guideSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteClassificationGuide() {
      if (typeof this.classification_guideSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.classification_guideDataService.delete(this.classification_guideSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getClassificationsGuide();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.classification_guideDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ClassificationsGuide.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.classification_guideDataService.get().then( r => {
         const backupData = r as ClassificationGuide[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ClassificationsGuide.csv');
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
            this.classification_guideDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.classification_guideSelected.id === 'undefined') {
               this.classification_guideDataService.post(this.classification_guideSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getClassificationsGuide();
               }).catch( e => console.log(e) );
            } else {
               this.classification_guideDataService.put(this.classification_guideSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getClassificationsGuide();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}