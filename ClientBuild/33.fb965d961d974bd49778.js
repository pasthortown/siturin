(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"4NRs":function(n,l,e){"use strict";e.d(l,"a",function(){return t});var t=function(){return function(){this.identification=""}}()},FVSd:function(n,l,e){"use strict";e.d(l,"a",function(){return o});var t=e("sE5F"),u=e("AytR"),i=e("CcnG"),a=e("ZYCi"),o=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_dinardap,this.options=new t.g,this.options.headers=new t.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get_cedula=function(n){var l=this;return this.http.post(this.url+"cedula",JSON.stringify({identificacion:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_RUC=function(n){var l=this;return this.http.post(this.url+"ruc",JSON.stringify({RUC:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_super_cias=function(n){var l=this;return this.http.post(this.url+"supercias",JSON.stringify({identificacion:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n)},n.ngInjectableDef=i.defineInjectable({factory:function(){return new n(i.inject(t.e),i.inject(a.l))},token:n,providedIn:"root"}),n}()},c4FF:function(n,l,e){"use strict";e.d(l,"a",function(){return t});var t=function(){return function(){this.id=0,this.id_ubication=0,this.email="",this.name="",this.ruc="",this.province="",this.identification="",this.main_phone_number="",this.secondary_phone_number="0000000000",this.address="",this.address_map_latitude=-.2153676,this.address_map_longitude=-78.5036064}}()},jXnw:function(n,l,e){"use strict";e.d(l,"a",function(){return t});var t=function(){return function(){this.group_type_id=0,this.register_code=""}}()},mhEj:function(n,l,e){"use strict";e.d(l,"a",function(){return t});var t=function(){return function(){this.person_representative_attachment_file_type="",this.person_representative_attachment_file_name="",this.person_representative_attachment_file="",this.assignment_date=new Date,this.ruc="",this.person_representative_id=0}}()},qYr5:function(n,l,e){"use strict";e.d(l,"a",function(){return o});var t=e("jXnw"),u=e("4NRs"),i=e("c4FF"),a=e("mhEj"),o=function(){return function(){this.establishmentsSRI=[],this.establishments=[],this.group_given=new t.a,this.person_representative=new u.a,this.person_representative_attachment=new a.a,this.tax_payer_type_id=0,this.contact_user_id=0,this.contact_user=new i.a,this.number="",this.owner_name="",this.baised_accounting=!1}}()},qq66:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),u=function(){return function(){}}(),i=e("pMnS"),a=e("Ip0R"),o=e("gIcY"),r=e("ZYCi"),d=e("c4FF"),s=e("lGQG"),c=e("PSD3"),f=e.n(c),p=e("FVSd"),g=e("qYr5"),m=function(){function n(n,l,e,t){this.router=n,this.authDataServise=l,this.toastr=e,this.dinardapDataService=t,this.user=new d.a,this.ruc=new g.a,this.isRepresentantLegal=!0,this.isRucOwner=!0,this.rucInactive=!0,this.identificationValidated=!1,this.consumoCedula=!1,this.cedulaNombre="",this.cuentaInterno=!1,this.identidadConfirmada=!1,this.rucValidated=!1,this.consumoRuc=!1,this.rucData="",this.emailContactValidated=!1,this.CedulaData="",this.REGCIVILOK=!1,this.SRIOK=!1,this.fechaExpedicion="porValidar",this.fechaExpiracion="porValidar",this.fechaNacimiento="porValidar",this.fechaIngresada="",this.razon_social="",this.aleatorio=0}return n.prototype.ngOnInit=function(){this.user=new d.a,this.ruc=new g.a,this.esperando=!1},n.prototype.registrar=function(){var n=this;"turismo.gob.ec"==this.user.email.split("@")[1]?this.emailContactValidated&&this.identidadConfirmada&&!this.esperando?(this.esperando=!0,this.user.ruc=this.user.identification+"001",this.ruc.number=this.user.identification+"001",this.ruc.contact_user=this.user,this.busy=this.authDataServise.register(this.user).then(function(l){n.esperando=!1,0!=l&&void 0!==l?f.a.fire({title:"Te damos la bienvenida",text:"Tu contrase\xf1a, es la misma que utilizas para acceder a tu correo institucional.",type:"success"}).then(function(l){n.user=new d.a,n.ruc=new g.a,n.router.navigate(["/login"])}):f.a.fire({title:"La informaci\xf3n proporcionada no es correcta.",text:"No es posible crear una nueva cuenta, con la informaci\xf3n proporcionada.",type:"error"}).then(function(l){n.router.navigate(["/login"])})}).catch(function(l){n.esperando=!1,console.log(l)})):f.a.fire({title:"Datos no confirmados",text:"El registro no se pudo completar, los datos ingresados no se pudieron confirmar.",type:"error"}):this.emailContactValidated&&this.rucValidated&&this.identidadConfirmada&&!this.esperando?(this.esperando=!0,this.user.ruc=this.ruc.number,this.ruc.contact_user=this.user,this.busy=this.authDataServise.register(this.user).then(function(l){n.esperando=!1,0!=l&&void 0!==l?f.a.fire({title:"Te damos la bienvenida",text:"Enviamos tu contrase\xf1a a tu correo",type:"success"}).then(function(l){n.user=new d.a,n.ruc=new g.a,n.router.navigate(["/login"])}):f.a.fire({title:"La informaci\xf3n proporcionada no es correcta.",text:"No es posible crear una nueva cuenta, con la informaci\xf3n proporcionada.",type:"error"}).then(function(l){n.router.navigate(["/login"])})}).catch(function(l){n.esperando=!1,console.log(l)})):f.a.fire({title:"Datos no confirmados",text:"El registro no se pudo completar, los datos ingresados no se pudieron confirmar.",type:"error"})},n.prototype.checkCedula=function(){var n=this;if(this.user.identification=this.user.identification.replace(/[^\d]/,""),10!==this.user.identification.length)return this.identificationValidated=!1,this.consumoCedula=!1,this.fechaIngresada="",void(this.identidadConfirmada=!1);this.consumoCedula&&this.REGCIVILOK||(this.CedulaData='<div class="progress mb-3"><div class="progress-bar progress-bar-striped progress-bar-animated bg-warning col-12">Espere...</div></div><div class="col-12 text-center"><strong>Conect\xe1ndose al Registro Civil...</strong></div>',this.consumoCedula||(this.identificationValidated=!0,this.consumoCedula=!0,this.dinardapDataService.get_cedula(this.user.identification).then(function(l){var e=l.original.entidades.entidad.filas.fila.columnas.columna;n.CedulaData="",n.REGCIVILOK=!0;var t=[];e.forEach(function(l){"cedula"===l.campo&&(l.valor===n.user.identification?(n.toastr.successToastr("La c\xe9dula ingresada es correcta.","Registro Civil"),n.identificationValidated=!0):(n.toastr.errorToastr("La c\xe9dula ingresada no es correcta.","Registro Civil"),n.identificationValidated=!1)),n.identificationValidated&&("nombre"===l.campo&&(n.user.name=l.valor),"fechaNacimiento"===l.campo&&("{}"!==JSON.stringify(l.valor)&&t.push(0),n.fechaNacimiento=l.valor),"fechaExpiracion"===l.campo&&("{}"!==JSON.stringify(l.valor)&&t.push(1),n.fechaExpiracion=l.valor),"fechaExpedicion"===l.campo&&("{}"!==JSON.stringify(l.valor)&&t.push(2),n.fechaExpedicion=l.valor))});var u=Math.floor(Math.random()*t.length);n.aleatorio=t[u]}).catch(function(l){n.toastr.errorToastr("La c\xe9dula ingresada no es correcta.","Registro Civil"),n.CedulaData='<div class="alert alert-danger" role="alert">El Registro Civil, no respondi\xf3. Vuelva a intentarlo.</div>',n.REGCIVILOK=!1,n.consumoCedula=!1})))},n.prototype.checkRuc=function(){var n=this;if(this.ruc.number=this.ruc.number.replace(/[^\d]/,""),13!==this.ruc.number.length)return this.rucValidated=!1,void(this.consumoRuc=!1);this.consumoRuc&&this.SRIOK||(this.rucData='<div class="progress mb-3"><div class="progress-bar progress-bar-striped progress-bar-animated bg-warning col-12">Espere...</div></div><div class="col-12 text-center"><strong>Conect\xe1ndose al SRI...</strong></div>',!this.consumoRuc&&this.identificationValidated&&(this.rucValidated=!0,this.consumoRuc=!0,this.rucInactive=!0,this.dinardapDataService.get_RUC(this.ruc.number).then(function(l){n.SRIOK=!0,n.rucValidated=!0;var e=l.sri_ruc.original.entidades.entidad.filas.fila.columnas.columna,t=l.sri_ruc_completo.original.entidades.entidad;n.rucData="";var u="",i="";t.forEach(function(l){"Actividad Economica"==l.nombre&&l.filas.fila.columnas.columna.forEach(function(n){}),"Contribuyente Datos Completo"==l.nombre&&l.filas.fila.columnas.columna.forEach(function(l){"razonSocial"==l.campo&&(n.razon_social=l.valor,u+="<strong>Raz\xf3n Social: </strong> "+l.valor+"<br/>"),"email"==l.campo&&JSON.stringify(l.valor),"telefonoDomicilio"==l.campo&&JSON.stringify(l.valor)}),"Representante Legal"==l.nombre&&l.filas.fila.columnas.columna.forEach(function(l){"identificacion"==l.campo&&"{}"!==JSON.stringify(l.valor)&&(n.ruc.person_representative.identification=l.valor,n.checkIdentificationRepresentant()),"nombre"==l.campo&&(i+="<strong>Nombre Representante Legal: </strong> "+l.valor+"<br/>")})}),e.forEach(function(l){"estadoContribuyente"==l.campo&&(n.rucInactive="ACTIVO"!==l.valor),"obligado"==l.campo&&(n.ruc.baised_accounting="N"!=l.valor),"personaSociedad"==l.campo&&("PNL"==l.valor?(n.ruc.tax_payer_type_id=1,n.checkRazonSocial()):n.ruc.tax_payer_type_id=2),n.rucData=u,1!=n.ruc.tax_payer_type_id&&(n.rucData+=i)})}).catch(function(l){console.log(l),n.rucData='<div class="alert alert-danger" role="alert">El SRI, no respondi\xf3. Vuelva a intentarlo.</div>',n.consumoRuc=!1,n.SRIOK=!1})))},n.prototype.checkRazonSocial=function(){},n.prototype.checkIdentificationRepresentant=function(){},n.prototype.checkEmail=function(){var n=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email.toString());return this.emailContactValidated=n,n||(this.user.identification="",this.fechaIngresada="",this.user.name=""),this.cuentaInterno="turismo.gob.ec"==this.user.email.split("@")[1],this.emailContactValidated},n.prototype.confirmarIdentidad=function(){return!(""==this.fechaIngresada||(0==this.aleatorio&&this.fechaIngresada==this.fechaNacimiento?(this.identidadConfirmada=!0,0):1==this.aleatorio&&this.fechaIngresada==this.fechaExpiracion?(this.identidadConfirmada=!0,0):2==this.aleatorio&&this.fechaIngresada==this.fechaExpedicion?(this.identidadConfirmada=!0,0):(this.identidadConfirmada=!1,this.cedulaNombre="",1)))},n}(),h=e("3EpR"),v=t["\u0275crt"]({encapsulation:0,styles:[[".register-page[_ngcontent-%COMP%]{position:absolute;top:0;left:0;right:0;bottom:0;overflow:auto;padding:3em;background-image:url(background_login.a3cf77bdce2464c08660.jpg);background-size:cover}.pretty-form[_ngcontent-%COMP%]{background-color:rgba(255,255,255,.9);border-radius:25px}"]],data:{}});function C(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","ml-2 badge badge-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Incorrecto"]))],null,null)}function I(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"label",[["for","identification"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["N\xfamero de C\xe9dula del Propietario/Representante Legal"]))],null,null)}function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"label",[["for","identification"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["N\xfamero de C\xe9dula del Usuario Interno"]))],null,null)}function R(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","ml-2 badge badge-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Incorrecto"]))],null,null)}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,14,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](2,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](6,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](7,0,null,null,7,"input",[["class","form-control"],["id","identification"],["maxlength","10"],["placeholder","N\xfamero de C\xe9dula"],["type","text"]],[[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,8)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,8).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,8)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,8)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(i.user.identification=e)&&u),"keyup"===l&&(u=!1!==i.checkCedula()&&u),u},null,null)),t["\u0275did"](8,16384,null,0,o.d,[t.Renderer2,t.ElementRef,[2,o.a]],null,null),t["\u0275did"](9,540672,null,0,o.f,[],{maxlength:[0,"maxlength"]},null),t["\u0275prd"](1024,null,o.g,function(n){return[n]},[o.f]),t["\u0275prd"](1024,null,o.h,function(n){return[n]},[o.d]),t["\u0275did"](12,671744,null,0,o.m,[[8,null],[6,o.g],[8,null],[6,o.h]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.i,null,[o.m]),t["\u0275did"](14,16384,null,0,o.j,[[4,o.i]],null,null)],function(n,l){var e=l.component;n(l,2,0,!e.cuentaInterno),n(l,4,0,e.cuentaInterno),n(l,6,0,!e.identificationValidated),n(l,9,0,"10"),n(l,12,0,e.user.identification)},function(n,l){n(l,7,0,t["\u0275nov"](l,9).maxlength?t["\u0275nov"](l,9).maxlength:null,t["\u0275nov"](l,14).ngClassUntouched,t["\u0275nov"](l,14).ngClassTouched,t["\u0275nov"](l,14).ngClassPristine,t["\u0275nov"](l,14).ngClassDirty,t["\u0275nov"](l,14).ngClassValid,t["\u0275nov"](l,14).ngClassInvalid,t["\u0275nov"](l,14).ngClassPending)})}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","col-12 mb-3"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"small",[["class","form-text text-muted"],["id","cedulaRepresentanteHelp"]],[[8,"innerHTML",1]],null,null,null,null))],null,function(n,l){n(l,1,0,l.component.CedulaData)})}function V(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"label",[["for","identification"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Fecha de Nacimiento"]))],null,null)}function w(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"label",[["for","identification"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Fecha de Expiraci\xf3n de Documento de Identidad"]))],null,null)}function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"label",[["for","identification"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Fecha de Expedici\xf3n de Documento de Identidad"]))],null,null)}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","ml-2 badge badge-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Identidad No Confirmada"]))],null,null)}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,14,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,V)),t["\u0275did"](2,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](6,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](8,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](9,0,null,null,5,"input",[["class","form-control"],["id","fechaIngresada"],["placeholder","Fecha: DIA/MES/A\xd1O   -  Ejemplo: 15/09/1986"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,10)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,10).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(i.fechaIngresada=e)&&u),"input"===l&&(u=!1!==i.confirmarIdentidad()&&u),u},null,null)),t["\u0275did"](10,16384,null,0,o.d,[t.Renderer2,t.ElementRef,[2,o.a]],null,null),t["\u0275prd"](1024,null,o.h,function(n){return[n]},[o.d]),t["\u0275did"](12,671744,null,0,o.m,[[8,null],[8,null],[8,null],[6,o.h]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.i,null,[o.m]),t["\u0275did"](14,16384,null,0,o.j,[[4,o.i]],null,null)],function(n,l){var e=l.component;n(l,2,0,0==e.aleatorio),n(l,4,0,1==e.aleatorio),n(l,6,0,2==e.aleatorio),n(l,8,0,!e.identidadConfirmada),n(l,12,0,e.fechaIngresada)},function(n,l){n(l,9,0,t["\u0275nov"](l,14).ngClassUntouched,t["\u0275nov"](l,14).ngClassTouched,t["\u0275nov"](l,14).ngClassPristine,t["\u0275nov"](l,14).ngClassDirty,t["\u0275nov"](l,14).ngClassValid,t["\u0275nov"](l,14).ngClassInvalid,t["\u0275nov"](l,14).ngClassPending)})}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"label",[["for","name"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Nombre Completo"])),(n()(),t["\u0275eld"](3,0,null,null,5,"input",[["class","form-control"],["disabled",""],["id","name"],["placeholder","Nombre Completo"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,4)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,4).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,4)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,4)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(i.user.name=e)&&u),u},null,null)),t["\u0275did"](4,16384,null,0,o.d,[t.Renderer2,t.ElementRef,[2,o.a]],null,null),t["\u0275prd"](1024,null,o.h,function(n){return[n]},[o.d]),t["\u0275did"](6,671744,null,0,o.m,[[8,null],[8,null],[8,null],[6,o.h]],{isDisabled:[0,"isDisabled"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.i,null,[o.m]),t["\u0275did"](8,16384,null,0,o.j,[[4,o.i]],null,null)],function(n,l){n(l,6,0,"",l.component.user.name)},function(n,l){n(l,3,0,t["\u0275nov"](l,8).ngClassUntouched,t["\u0275nov"](l,8).ngClassTouched,t["\u0275nov"](l,8).ngClassPristine,t["\u0275nov"](l,8).ngClassDirty,t["\u0275nov"](l,8).ngClassValid,t["\u0275nov"](l,8).ngClassInvalid,t["\u0275nov"](l,8).ngClassPending)})}function T(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[["class","ml-2 badge badge-danger"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Incorrecto"]))],null,null)}function k(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,16,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"label",[["for","ruc"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["N\xfamero de RUC al que pertenece el Establecimiento"])),(n()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](5,0,null,null,11,"div",[["class","input-group"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.checkRuc()&&t),t},null,null)),(n()(),t["\u0275eld"](8,0,null,null,0,"span",[["class","fas fa-sync"]],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,7,"input",[["class","form-control"],["id","ruc"],["maxlength","13"],["placeholder","N\xfamero de RUC"],["type","text"]],[[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keyup"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,10)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,10).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,10)._compositionEnd(e.target.value)&&u),"ngModelChange"===l&&(u=!1!==(i.ruc.number=e)&&u),"keyup"===l&&(u=!1!==i.checkRuc()&&u),u},null,null)),t["\u0275did"](10,16384,null,0,o.d,[t.Renderer2,t.ElementRef,[2,o.a]],null,null),t["\u0275did"](11,540672,null,0,o.f,[],{maxlength:[0,"maxlength"]},null),t["\u0275prd"](1024,null,o.g,function(n){return[n]},[o.f]),t["\u0275prd"](1024,null,o.h,function(n){return[n]},[o.d]),t["\u0275did"](14,671744,null,0,o.m,[[8,null],[6,o.g],[8,null],[6,o.h]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.i,null,[o.m]),t["\u0275did"](16,16384,null,0,o.j,[[4,o.i]],null,null)],function(n,l){var e=l.component;n(l,4,0,!e.rucValidated),n(l,11,0,"13"),n(l,14,0,e.ruc.number)},function(n,l){n(l,9,0,t["\u0275nov"](l,11).maxlength?t["\u0275nov"](l,11).maxlength:null,t["\u0275nov"](l,16).ngClassUntouched,t["\u0275nov"](l,16).ngClassTouched,t["\u0275nov"](l,16).ngClassPristine,t["\u0275nov"](l,16).ngClassDirty,t["\u0275nov"](l,16).ngClassValid,t["\u0275nov"](l,16).ngClassInvalid,t["\u0275nov"](l,16).ngClassPending)})}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[["class","col-12 mb-3"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,0,"small",[["class","form-text text-muted"],["id","rucDataIncomming"]],[[8,"innerHTML",1]],null,null,null,null))],null,function(n,l){n(l,1,0,l.component.rucData)})}function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"div",[["class","progress mb-3"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,1,"div",[["class","progress-bar progress-bar-striped progress-bar-animated"],["style","width: 100%"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Espere..."]))],null,null)}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","alert alert-danger mt-3"],["role","alert"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"label",[["class","col-12 text-justify"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Atenci\xf3n"])),(n()(),t["\u0275eld"](4,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](5,null,[" El representante legal del RUC "," es el \xfanico que puede iniciar el tr\xe1mite de inactivaci\xf3n. "]))],null,function(n,l){n(l,5,0,l.component.ruc.number)})}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","alert alert-danger mt-3"],["role","alert"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"label",[["class","col-12 text-justify"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,1,"strong",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Atenci\xf3n"])),(n()(),t["\u0275eld"](4,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](5,null,[" El due\xf1o del RUC "," es el \xfanico que puede iniciar el tr\xe1mite de inactivaci\xf3n. "]))],null,function(n,l){n(l,5,0,l.component.ruc.number)})}function j(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](2,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,2,0,!e.isRepresentantLegal&&2==e.ruc.tax_payer_type_id),n(l,4,0,!e.isRucOwner&&1==e.ruc.tax_payer_type_id)},null)}function F(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-primary mr-2"],["type","submit"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.registrar()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,[" Crear Cuenta "]))],null,function(n,l){var e=l.component;n(l,0,0,!(e.identificationValidated&&e.consumoCedula&&e.REGCIVILOK&&e.rucValidated&&e.consumoRuc&&e.SRIOK))})}function K(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-primary mr-2"],["type","submit"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.registrar()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,[" Crear Cuenta "]))],null,function(n,l){var e=l.component;n(l,0,0,!(e.identificationValidated&&e.consumoCedula&&e.REGCIVILOK))})}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,8,"div",[["class","col-12 text-center"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](3,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,K)),t["\u0275did"](5,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](6,0,null,null,3,"a",[["class","btn btn-danger"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,e){var u=!0;return"click"===l&&(u=!1!==t["\u0275nov"](n,7).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&u),u},null,null)),t["\u0275did"](7,671744,null,0,r.n,[r.l,r.a,a.LocationStrategy],{routerLink:[0,"routerLink"]},null),t["\u0275pad"](8,1),(n()(),t["\u0275ted"](-1,null,[" Regresar "]))],function(n,l){var e=l.component;n(l,3,0,!e.cuentaInterno),n(l,5,0,e.cuentaInterno);var t=n(l,8,0,"/login");n(l,7,0,t)},function(n,l){n(l,6,0,t["\u0275nov"](l,7).target,t["\u0275nov"](l,7).href)})}function U(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,40,"div",[["class","register-page"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,0,"div",[["class","col-12"],["style","height: 20px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,37,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,"div",[["class","col-md-3 col-lg-3 col-sm-1"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,35,"div",[["class","col-md-6 col-lg-6 col-sm-10 pretty-form p-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,1,"div",[["class","col-12 text-center"]],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,0,"img",[["class","col-sm-12 col-md-10 col-lg-7"],["src","assets/images/logo-sistema.png"]],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,1,"h2",[["class","col-12 text-center mt-3"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" Crear una Cuenta Nueva "])),(n()(),t["\u0275eld"](12,0,null,null,10,"div",[["class","form-group"]],null,null,null,null,null)),(n()(),t["\u0275eld"](13,0,null,null,1,"label",[["for","email"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Correo Electr\xf3nico"])),(n()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](16,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](17,0,null,null,5,"input",[["class","form-control"],["id","email"],["placeholder","Correo Electr\xf3nico"],["type","email"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"ngModelChange"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,e){var u=!0,i=n.component;return"input"===l&&(u=!1!==t["\u0275nov"](n,18)._handleInput(e.target.value)&&u),"blur"===l&&(u=!1!==t["\u0275nov"](n,18).onTouched()&&u),"compositionstart"===l&&(u=!1!==t["\u0275nov"](n,18)._compositionStart()&&u),"compositionend"===l&&(u=!1!==t["\u0275nov"](n,18)._compositionEnd(e.target.value)&&u),"input"===l&&(u=!1!==i.checkEmail()&&u),"ngModelChange"===l&&(u=!1!==(i.user.email=e)&&u),u},null,null)),t["\u0275did"](18,16384,null,0,o.d,[t.Renderer2,t.ElementRef,[2,o.a]],null,null),t["\u0275prd"](1024,null,o.h,function(n){return[n]},[o.d]),t["\u0275did"](20,671744,null,0,o.m,[[8,null],[8,null],[8,null],[6,o.h]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,o.i,null,[o.m]),t["\u0275did"](22,16384,null,0,o.j,[[4,o.i]],null,null),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](24,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](26,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](28,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](30,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](32,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](34,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](36,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,j)),t["\u0275did"](38,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](40,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,16,0,!e.emailContactValidated),n(l,20,0,e.user.email),n(l,24,0,e.emailContactValidated),n(l,26,0,e.emailContactValidated&&e.identificationValidated),n(l,28,0,e.emailContactValidated&&e.identificationValidated&&e.REGCIVILOK&&e.consumoCedula),n(l,30,0,e.emailContactValidated&&e.identidadConfirmada),n(l,32,0,e.emailContactValidated&&e.identidadConfirmada&&0==e.cuentaInterno),n(l,34,0,e.emailContactValidated&&e.rucValidated),n(l,36,0,e.esperando),n(l,38,0,e.emailContactValidated&&e.rucValidated&&e.SRIOK),n(l,40,0,e.emailContactValidated&&e.cuentaInterno&&e.REGCIVILOK||e.emailContactValidated&&e.rucValidated&&e.SRIOK&&!(!e.isRepresentantLegal&&2==e.ruc.tax_payer_type_id||!e.isRucOwner&&1==e.ruc.tax_payer_type_id))},function(n,l){n(l,17,0,t["\u0275nov"](l,22).ngClassUntouched,t["\u0275nov"](l,22).ngClassTouched,t["\u0275nov"](l,22).ngClassPristine,t["\u0275nov"](l,22).ngClassDirty,t["\u0275nov"](l,22).ngClassValid,t["\u0275nov"](l,22).ngClassInvalid,t["\u0275nov"](l,22).ngClassPending)})}function G(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-register",[],null,null,null,U,v)),t["\u0275did"](1,114688,null,0,m,[r.l,s.a,h.a,p.a],null,null)],function(n,l){n(l,1,0)},null)}var J=t["\u0275ccf"]("app-register",m,G,{},{},[]),z=e("sE5F"),q=function(){return function(){}}();e.d(l,"RegisterModuleNgFactory",function(){return A});var A=t["\u0275cmf"](u,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,J]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,o.s,o.s,[]),t["\u0275mpd"](4608,z.c,z.c,[]),t["\u0275mpd"](4608,z.h,z.b,[]),t["\u0275mpd"](5120,z.j,z.k,[]),t["\u0275mpd"](4608,z.i,z.i,[z.c,z.h,z.j]),t["\u0275mpd"](4608,z.g,z.a,[]),t["\u0275mpd"](5120,z.e,z.l,[z.i,z.g]),t["\u0275mpd"](4608,s.a,s.a,[z.e]),t["\u0275mpd"](4608,p.a,p.a,[z.e,r.l]),t["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["\u0275mpd"](1073742336,r.o,r.o,[[2,r.u],[2,r.l]]),t["\u0275mpd"](1073742336,q,q,[]),t["\u0275mpd"](1073742336,o.p,o.p,[]),t["\u0275mpd"](1073742336,o.e,o.e,[]),t["\u0275mpd"](1073742336,z.f,z.f,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,r.j,function(){return[[{path:"",component:m}]]},[])])})}}]);