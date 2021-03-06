import { ChatService } from './../services/negocio/chat.service';
import { Router } from '@angular/router';
import { UserService } from './../services/profile/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilePictureService } from '../services/profile/profilepicture.service';
import { ProfilePicture } from '../models/profile/ProfilePicture';
import { User } from '../models/profile/User';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RegisterService } from '../services/CRUD/CATASTRO/register.service';
import { Register } from '../models/CATASTRO/Register';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    @ViewChild('lastLine') lastLine;
    collapedSideBar: boolean;
    half = false;
    two = false;
    three = false;
    chat_minimized = true;
    conversacion = [];
    textoEnviarIA = '';
    enviandoTexto = false;
    today = new Date();

    user: User = new User();
    profile_picture = new ProfilePicture();

    constructor(private toastr: ToastrManager, private chatDataService: ChatService, private catastroDataService: RegisterService, private profilePictureDataService: ProfilePictureService, private userDataService: UserService, private router: Router) {}

    ngOnInit() {
        this.conversacion.push(
            {from: 'SITURIN', message: 'Saludos, Hay algo en lo que te pueda servir?', time: new Date()}
        );
        this.half = false;
        this.two = false;
        this.three = false;
        this.getUserInfo();
        this.checkSessionTime();
    }

    scroll() {
        this.lastLine.nativeElement.scrollIntoView({behavior: 'smooth'});
    }

    getProfilePicture() {
        this.profilePictureDataService.get(this.user.id).then( r2 => {
            this.profile_picture = r2 as ProfilePicture;
        }).catch( e => { console.log(e); });
    }

    checkSessionTime() {
        const session_time = JSON.parse(sessionStorage.getItem('session_time'));
        if (typeof session_time == 'undefined' || session_time == null){
            return;
        }
        const endTime = new Date(session_time.endTime);
        const now = new Date();
        const oneHalf = new Date(session_time.startTime);
        const twoHalf = new Date(session_time.startTime);
        const threeHalf = new Date(session_time.startTime);
        oneHalf.setMinutes(oneHalf.getMinutes() + 30);
        twoHalf.setHours(twoHalf.getHours() + 1);
        threeHalf.setMinutes(threeHalf.getMinutes() + 30);
        threeHalf.setHours(threeHalf.getHours() + 1);
        const diffDates = endTime.getTime() - now.getTime();
        const minutosRestantes = Math.round(((diffDates % 86400000) % 3600000) / 60000);
        const horasRestantes = Math.floor((diffDates % 86400000) / 3600000);
        if (horasRestantes == 1) {
            if (minutosRestantes > 20 && minutosRestantes < 30 && !this.three) {
                this.toastr.infoToastr('Tiempo restante: ' + horasRestantes + ' hora ' + minutosRestantes + ' minutos', 'Sesión');
                this.three = true;
            }
            if (minutosRestantes > 1 && minutosRestantes < 10 && !this.two) {
                this.toastr.infoToastr('Tiempo restante: ' + horasRestantes + ' hora ' + minutosRestantes + ' minutos', 'Sesión');
                this.two = true;
                this.three = true;
            }
        }
        if (horasRestantes == 0) {
            if (minutosRestantes < 30 && !this.half) {
                this.toastr.warningToastr('Su sesión está próxima a caducar. Tiempo restante: ' + minutosRestantes + ' minutos', 'Sesión');
                this.half = true;
                this.two = true;
                this.three = true;
            }
        }
        if (now >= endTime) {
            this.toastr.errorToastr('Su sesión ha caducado', 'Sesión');
            sessionStorage.clear();
            this.router.navigate(['/login']);
        }
        setTimeout(() => {
            this.checkSessionTime();
        }, 5000);
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    getUserInfo() {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        this.userDataService.get(userData.id).then( r => {
          this.user = r as User;
          this.getProfilePicture();
          const cuentaInterna = r.email.split('@')[1] == 'turismo.gob.ec';
          this.catastroDataService.searchByRuc(this.user.ruc.toString()).then( r => {
              const registros = r as Register[];
              let toReturn = false;
              if (registros.length == 0 || r == 0) {
                  toReturn = false;
              } else {
                toReturn = true;
              }
              const establecimientos_id = [];
              registros.forEach(registro => {
                  establecimientos_id.push({ruc_code_id: registro.establishment_ruc_code, activity: registro.activity});
              });
              sessionStorage.setItem('canMoreThanRegister',JSON.stringify(toReturn));
              sessionStorage.setItem('cuentaInterna',JSON.stringify(cuentaInterna));
              sessionStorage.setItem('establecimientos',JSON.stringify(establecimientos_id));
              this.check_pendientes();
          }).catch( e => { console.log(e); });
          let redirigirProfile = false;
          if(this.user.main_phone_number == '' || typeof this.user.main_phone_number == 'undefined' || this.user.main_phone_number == null) {
            redirigirProfile = true;
          }
          if (redirigirProfile) {
            this.router.navigate(['/profile']);
          }
        }).catch( e => { console.log(e); });
    }

    check_pendientes() {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        this.catastroDataService.check_pendientes(userData.id).then( r => {
            if (typeof r.title !== 'undefined' && r.title !== null && r.message !== '') {
                Swal.fire(r.title, r.message, r.type);
            }
        }).catch( e => { console.log(e); });
    }

    change_chat_state() {
        this.chat_minimized = !this.chat_minimized;
    }

    enviar(event) {
        const newMessage = {from: this.user.name, message: this.textoEnviarIA, time: new Date()};
        this.conversacion.push(newMessage);
        this.enviarTextoChat();
    }

    tratarenviar(event) {
        if (event.key == 'Enter') {
            const newMessage = {from: this.user.name, message: this.textoEnviarIA, time: new Date()};
            this.conversacion.push(newMessage);
            this.enviarTextoChat();
        }
    }

    enviarTextoChat() {
        this.enviandoTexto = true;
        this.chatDataService.enviar(this.textoEnviarIA).then( r => {
            const newMessage = {from: 'SITURIN', message: r.data, time: new Date()};
            this.conversacion.push(newMessage);
            this.textoEnviarIA = '';
            this.enviandoTexto = false;
            this.scroll();
        }).catch( e => { console.log(e); });
    }
}
