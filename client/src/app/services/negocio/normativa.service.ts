import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class NormativaService {

   actividades_URL = 'http://normativa.turismo.gob.ec/index.php/welcome/actividades';
   clasificaciones_URL = 'http://normativa.turismo.gob.ec/index.php/welcome/clasificaciones?actividad=';
   categoria_URL = 'http://normativa.turismo.gob.ec/index.php/welcome/categorias?clasificacion=';
   requisites_URL = 'http://normativa.turismo.gob.ec/index.php/welcome/requisitos?id_categoria_clasificacion=';

   constructor(private http: Http, private router: Router) {
   }

   get_actvidades(): Promise<any> {
      return this.http.get(this.actividades_URL).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   get_clasificaciones(actividad_id: number): Promise<any> {
      return this.http.get(this.clasificaciones_URL + actividad_id.toString()).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   get_categorias(clasificacion_id: number, division_id: number): Promise<any> {
      return this.http.get(this.categoria_URL + clasificacion_id.toString() + '&division_zonal=' + division_id.toString()).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   get_requisites(categoria_clasificacion_id: number): Promise<any> {
      return this.http.get(this.requisites_URL + categoria_clasificacion_id.toString()).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   handledError(error: any) {
      console.log(error);
   }
}