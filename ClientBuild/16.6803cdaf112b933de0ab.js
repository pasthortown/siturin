(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"4NRs":function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){return function(){this.identification=""}}()},"6lKK":function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){return function(){}}(),o=t("pMnS"),i=t("Ip0R"),r=t("gIcY"),a=t("JEAp"),c=t("N6VH"),s=t("qYr5"),d=t("3V+q"),p=function(){function l(l,n,t,e){this.modalService=l,this.toastr=n,this.tax_payer_typeDataService=t,this.rucDataService=e,this.rucs=[],this.rucSelected=new s.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.tax_payer_types=[]}return l.prototype.ngOnInit=function(){this.goToPage(1),this.getTaxPayerType()},l.prototype.selectRuc=function(l){this.rucSelected=l},l.prototype.getTaxPayerType=function(){var l=this;this.tax_payer_types=[],this.tax_payer_typeDataService.get().then(function(n){l.tax_payer_types=n}).catch(function(l){return console.log(l)})},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getRucs())},l.prototype.getRucs=function(){var l=this;this.rucs=[],this.rucSelected=new s.a,this.rucSelected.tax_payer_type_id=0,this.rucDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.rucs=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newRuc=function(l){this.rucSelected=new s.a,this.rucSelected.tax_payer_type_id=0,this.openDialog(l)},l.prototype.editRuc=function(l){void 0!==this.rucSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deleteRuc=function(){var l=this;void 0!==this.rucSelected.id?this.rucDataService.delete(this.rucSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getRucs()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.rucDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),t=new Date;Object(a.saveAs)(n,t.toLocaleDateString()+"_Rucs.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.rucDataService.get().then(function(l){var n="id;number;baised_accounting;contact_user_id;owner_name;tax_payer_type_id\n";l.forEach(function(l){n+=l.id+";"+l.number+";"+l.baised_accounting+";"+l.contact_user_id+";"+l.owner_name+";"+l.tax_payer_type_id+"\n"});var t=new Blob(["\ufeff",n],{type:"text/plain"}),e=new Date;Object(a.saveAs)(t,e.toLocaleDateString()+"_Rucs.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,t=new FileReader;l.target.files&&l.target.files.length>0&&(t.readAsDataURL(l.target.files[0]),t.onload=function(){var l=t.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(l))));n.rucDataService.masiveLoad(e).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0}).result.then(function(l){"Guardar click"===l&&(void 0===n.rucSelected.id?n.rucDataService.post(n.rucSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getRucs()}).catch(function(l){return console.log(l)}):n.rucDataService.put(n.rucSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getRucs()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),g=t("4GxJ"),f=t("3EpR"),h=e["\u0275crt"]({encapsulation:0,styles:[['.onoffswitch[_ngcontent-%COMP%]{position:relative;width:90px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.onoffswitch-checkbox[_ngcontent-%COMP%]{display:none}.onoffswitch-label[_ngcontent-%COMP%]{display:block;overflow:hidden;cursor:pointer;border:2px solid #999;border-radius:20px}.onoffswitch-inner[_ngcontent-%COMP%]{display:block;width:200%;margin-left:-100%;transition:margin .3s ease-in 0s}.onoffswitch-inner[_ngcontent-%COMP%]:after, .onoffswitch-inner[_ngcontent-%COMP%]:before{display:block;float:left;width:50%;height:30px;padding:0;line-height:30px;font-size:14px;font-family:Trebuchet,Arial,sans-serif;font-weight:700;box-sizing:border-box}.onoffswitch-inner[_ngcontent-%COMP%]:before{content:"SI";padding-left:21px;background-color:#5ebd79;color:#fff}.onoffswitch-inner[_ngcontent-%COMP%]:after{content:"NO";padding-right:21px;background-color:#eee;color:#999;text-align:right}.onoffswitch-switch[_ngcontent-%COMP%]{display:block;width:30px;margin:0;background:#fff;position:absolute;top:0;bottom:0;right:56px;border:2px solid #999;border-radius:20px;transition:all .3s ease-in 0s}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-inner[_ngcontent-%COMP%]{margin-left:0}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-switch[_ngcontent-%COMP%]{right:0}']],data:{}});function m(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,11,"tr",[],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.selectRuc(l.context.$implicit)&&e),e},null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,m)),e["\u0275did"](3,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""])),(l()(),e["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](7,null,["",""])),(l()(),e["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](11,null,["",""]))],function(l,n){l(n,3,0,n.component.rucSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.number),l(n,7,0,n.context.$implicit.baised_accounting),l(n,9,0,n.context.$implicit.contact_user_id),l(n,11,0,n.context.$implicit.owner_name)})}function b(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function _(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.goToPage(1)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(1*u.currentPage-1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(1*u.currentPage+1)&&e),e},null,null)),(l()(),e["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function C(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(u.lastPage)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function P(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](3,null,[" "," "]))],function(l,n){l(n,1,0,e["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,2,0,e["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(l,n){l(n,3,0,n.context.$implicit.id)})}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Datos:"])),(l()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(l()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xd7"])),(l()(),e["\u0275eld"](6,0,null,null,63,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,62,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,61,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","number"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["number"])),(l()(),e["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","number"],["name","number"],["placeholder","number"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0,o=l.component;return"input"===n&&(u=!1!==e["\u0275nov"](l,14)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,14).onTouched()&&u),"compositionstart"===n&&(u=!1!==e["\u0275nov"](l,14)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e["\u0275nov"](l,14)._compositionEnd(t.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.rucSelected.number=t)&&u),u},null,null)),e["\u0275did"](14,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.d]),e["\u0275did"](16,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](18,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](19,0,null,null,13,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","baised_accounting"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["baised_accounting"])),(l()(),e["\u0275eld"](22,0,null,null,10,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,9,"div",[["class","onoffswitch"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,5,"input",[["class","onoffswitch-checkbox"],["id","baised_accounting"],["name","baised_accounting"],["type","checkbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,t){var u=!0,o=l.component;return"change"===n&&(u=!1!==e["\u0275nov"](l,25).onChange(t.target.checked)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,25).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.rucSelected.baised_accounting=t)&&u),u},null,null)),e["\u0275did"](25,16384,null,0,r.b,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.b]),e["\u0275did"](27,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](29,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](30,0,null,null,2,"label",[["class","onoffswitch-label"],["for","baised_accounting"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,0,"span",[["class","onoffswitch-inner"]],null,null,null,null,null)),(l()(),e["\u0275eld"](32,0,null,null,0,"span",[["class","onoffswitch-switch"]],null,null,null,null,null)),(l()(),e["\u0275eld"](33,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](34,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","contact_user_id"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["contact_user_id"])),(l()(),e["\u0275eld"](36,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,6,"input",[["class","form-control"],["id","contact_user_id"],["name","contact_user_id"],["placeholder","contactUserId"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(l,n,t){var u=!0,o=l.component;return"input"===n&&(u=!1!==e["\u0275nov"](l,38)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,38).onTouched()&&u),"compositionstart"===n&&(u=!1!==e["\u0275nov"](l,38)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e["\u0275nov"](l,38)._compositionEnd(t.target.value)&&u),"change"===n&&(u=!1!==e["\u0275nov"](l,39).onChange(t.target.value)&&u),"input"===n&&(u=!1!==e["\u0275nov"](l,39).onChange(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,39).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.rucSelected.contact_user_id=t)&&u),u},null,null)),e["\u0275did"](38,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275did"](39,16384,null,0,r.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l,n){return[l,n]},[r.d,r.q]),e["\u0275did"](41,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](43,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](44,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","owner_name"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["owner_name"])),(l()(),e["\u0275eld"](47,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](48,0,null,null,5,"input",[["class","form-control"],["id","owner_name"],["name","owner_name"],["placeholder","ownerName"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0,o=l.component;return"input"===n&&(u=!1!==e["\u0275nov"](l,49)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,49).onTouched()&&u),"compositionstart"===n&&(u=!1!==e["\u0275nov"](l,49)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e["\u0275nov"](l,49)._compositionEnd(t.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.rucSelected.owner_name=t)&&u),u},null,null)),e["\u0275did"](49,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.d]),e["\u0275did"](51,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](53,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](54,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](55,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","tax_payer_type_id"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["TaxPayerType"])),(l()(),e["\u0275eld"](57,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](58,0,null,null,11,"select",[["class","form-control"],["id","tax_payer_type_id"],["name","tax_payer_type_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(l,n,t){var u=!0,o=l.component;return"change"===n&&(u=!1!==e["\u0275nov"](l,59).onChange(t.target.value)&&u),"blur"===n&&(u=!1!==e["\u0275nov"](l,59).onTouched()&&u),"ngModelChange"===n&&(u=!1!==(o.rucSelected.tax_payer_type_id=t)&&u),u},null,null)),e["\u0275did"](59,16384,null,0,r.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(l){return[l]},[r.o]),e["\u0275did"](61,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](63,16384,null,0,r.j,[[4,r.i]],null,null),(l()(),e["\u0275eld"](64,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](65,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](66,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Seleccione..."])),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](69,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](70,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),e["\u0275eld"](71,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Guardar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Guardar"])),(l()(),e["\u0275eld"](73,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.context.$implicit.close("Cancelar click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){var t=n.component;l(n,16,0,"number",t.rucSelected.number),l(n,27,0,"baised_accounting",t.rucSelected.baised_accounting),l(n,41,0,"contact_user_id",t.rucSelected.contact_user_id),l(n,51,0,"owner_name",t.rucSelected.owner_name),l(n,61,0,"tax_payer_type_id",t.rucSelected.tax_payer_type_id),l(n,65,0,"0"),l(n,66,0,"0"),l(n,69,0,t.tax_payer_types)},function(l,n){l(n,13,0,e["\u0275nov"](n,18).ngClassUntouched,e["\u0275nov"](n,18).ngClassTouched,e["\u0275nov"](n,18).ngClassPristine,e["\u0275nov"](n,18).ngClassDirty,e["\u0275nov"](n,18).ngClassValid,e["\u0275nov"](n,18).ngClassInvalid,e["\u0275nov"](n,18).ngClassPending),l(n,24,0,e["\u0275nov"](n,29).ngClassUntouched,e["\u0275nov"](n,29).ngClassTouched,e["\u0275nov"](n,29).ngClassPristine,e["\u0275nov"](n,29).ngClassDirty,e["\u0275nov"](n,29).ngClassValid,e["\u0275nov"](n,29).ngClassInvalid,e["\u0275nov"](n,29).ngClassPending),l(n,37,0,e["\u0275nov"](n,43).ngClassUntouched,e["\u0275nov"](n,43).ngClassTouched,e["\u0275nov"](n,43).ngClassPristine,e["\u0275nov"](n,43).ngClassDirty,e["\u0275nov"](n,43).ngClassValid,e["\u0275nov"](n,43).ngClassInvalid,e["\u0275nov"](n,43).ngClassPending),l(n,48,0,e["\u0275nov"](n,53).ngClassUntouched,e["\u0275nov"](n,53).ngClassTouched,e["\u0275nov"](n,53).ngClassPristine,e["\u0275nov"](n,53).ngClassDirty,e["\u0275nov"](n,53).ngClassValid,e["\u0275nov"](n,53).ngClassInvalid,e["\u0275nov"](n,53).ngClassPending),l(n,58,0,e["\u0275nov"](n,63).ngClassUntouched,e["\u0275nov"](n,63).ngClassTouched,e["\u0275nov"](n,63).ngClassPristine,e["\u0275nov"](n,63).ngClassDirty,e["\u0275nov"](n,63).ngClassValid,e["\u0275nov"](n,63).ngClassInvalid,e["\u0275nov"](n,63).ngClassPending)})}function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Ruc "])),(l()(),e["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0,u=l.component;return"click"===n&&(e=!1!==u.goToPage(u.currentPage)&&e),e},null,null)),(l()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.newRuc(e["\u0275nov"](l,66))&&u),u},null,null)),(l()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.editRuc(e["\u0275nov"](l,66))&&u),u},null,null)),(l()(),e["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.deleteRuc()&&e),e},null,null)),(l()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.backup()&&e),e},null,null)),(l()(),e["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.toCSV()&&e),e},null,null)),(l()(),e["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==e["\u0275nov"](l,24).click()&&u),u},null,null)),(l()(),e["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,t){var e=!0;return"change"===n&&(e=!1!==l.component.decodeUploadFile(t)&&e),e},null,null)),(l()(),e["\u0275eld"](25,0,null,null,17,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](26,0,null,null,16,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,15,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),e["\u0275eld"](28,0,null,null,11,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](29,0,null,null,10,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Seleccionado"])),(l()(),e["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["number"])),(l()(),e["\u0275eld"](34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["baised_accounting"])),(l()(),e["\u0275eld"](36,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["contact_user_id"])),(l()(),e["\u0275eld"](38,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["owner_name"])),(l()(),e["\u0275eld"](40,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,v)),e["\u0275did"](42,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](43,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](44,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](46,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](48,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](50,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](52,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](53,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](54,null,["",""])),(l()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](56,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](58,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](60,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](61,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](62,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),e["\u0275eld"](63,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(e["\u0275nov"](l,65).value)&&u),u},null,null)),(l()(),e["\u0275ted"](-1,null,["Ir a"])),(l()(),e["\u0275eld"](65,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),e["\u0275and"](0,[["content",2]],null,0,null,S))],function(l,n){var t=n.component;l(n,42,0,t.rucs),l(n,48,0,1===t.currentPage),l(n,50,0,1!==t.currentPage),l(n,52,0,t.currentPage>1),l(n,56,0,t.currentPage<t.lastPage),l(n,58,0,t.currentPage!==t.lastPage),l(n,60,0,t.currentPage===t.lastPage)},function(l,n){var t=n.component;l(n,24,0,!0),l(n,54,0,t.currentPage),l(n,65,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function x(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-ruc",[],null,null,null,k,h)),e["\u0275did"](1,114688,null,0,p,[g.y,f.a,d.a,c.a],null,null)],function(l,n){l(n,1,0)},null)}var I=e["\u0275ccf"]("app-ruc",p,x,{},{},[]),T=t("sE5F"),E=t("ZYCi"),O=function(){return function(){}}();t.d(n,"RucModuleNgFactory",function(){return j});var j=e["\u0275cmf"](u,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,I]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[e.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,r.s,r.s,[]),e["\u0275mpd"](4608,g.y,g.y,[e.ComponentFactoryResolver,e.Injector,g.tb,g.z]),e["\u0275mpd"](4608,d.a,d.a,[T.e,E.l]),e["\u0275mpd"](4608,c.a,c.a,[T.e,E.l]),e["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),e["\u0275mpd"](1073742336,E.o,E.o,[[2,E.u],[2,E.l]]),e["\u0275mpd"](1073742336,O,O,[]),e["\u0275mpd"](1073742336,r.p,r.p,[]),e["\u0275mpd"](1073742336,r.e,r.e,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,E.j,function(){return[[{path:"",component:p}]]},[])])})},B9Yq:function(l,n){l.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(l,n,t){var e,u=u||function(l){"use strict";if(!(void 0===l||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var n=function(){return l.URL||l.webkitURL||l},t=l.document.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in t,u=/constructor/i.test(l.HTMLElement)||l.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),i=function(n){(l.setImmediate||l.setTimeout)(function(){throw n},0)},r=function(l){setTimeout(function(){"string"==typeof l?n().revokeObjectURL(l):l.remove()},4e4)},a=function(l){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob([String.fromCharCode(65279),l],{type:l.type}):l},c=function(c,s,d){d||(c=a(c));var p,g=this,f="application/octet-stream"===c.type,h=function(){!function(l,n,t){for(var e=(n=[].concat(n)).length;e--;){var u=l["on"+n[e]];if("function"==typeof u)try{u.call(l,l)}catch(o){i(o)}}}(g,"writestart progress write writeend".split(" "))};if(g.readyState=g.INIT,e)return p=n().createObjectURL(c),void setTimeout(function(){var l,n;t.href=p,t.download=s,l=t,n=new MouseEvent("click"),l.dispatchEvent(n),h(),r(p),g.readyState=g.DONE});!function(){if((o||f&&u)&&l.FileReader){var t=new FileReader;return t.onloadend=function(){var n=o?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");l.open(n,"_blank")||(l.location.href=n),n=void 0,g.readyState=g.DONE,h()},t.readAsDataURL(c),void(g.readyState=g.INIT)}p||(p=n().createObjectURL(c)),f?l.location.href=p:l.open(p,"_blank")||(l.location.href=p),g.readyState=g.DONE,h(),r(p)}()},s=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(l,n,t){return n=n||l.name||"download",t||(l=a(l)),navigator.msSaveOrOpenBlob(l,n)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(l,n,t){return new c(l,n||l.name||"download",t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);l.exports?l.exports.saveAs=u:null!==t("B9Yq")&&null!==t("PDX0")&&(void 0===(e=(function(){return u}).call(n,t,n,l))||(l.exports=e))},N6VH:function(l,n,t){"use strict";t.d(n,"a",function(){return r});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),i=t("ZYCi"),r=function(){function l(l,n){this.http=l,this.router=n,this.url=u.a.api_base+"ruc/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return l.prototype.get=function(l){var n=this;return void 0===l?this.http.get(this.url,this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())}):this.http.get(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.get_paginate=function(l,n){var t=this;return this.http.get(this.url+"paginate?size="+l.toString()+"&page="+n.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){t.handledError(l.json())})},l.prototype.get_filtered=function(l){var n=this;return this.http.get(this.url+"filtered?number="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.delete=function(l){var n=this;return this.http.delete(this.url+"?id="+l.toString(),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.getBackUp=function(){var l=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(l){return l.json()}).catch(function(n){l.handledError(n.json())})},l.prototype.post=function(l){var n=this;return this.http.post(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.register_ruc=function(l){var n=this;return this.http.post(this.url+"register_ruc",JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.update_ruc=function(l){var n=this;return this.http.put(this.url+"update_ruc",JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.put=function(l){var n=this;return this.http.put(this.url,JSON.stringify(l),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.masiveLoad=function(l){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:l}),this.options).toPromise().then(function(l){return l.json()}).catch(function(l){n.handledError(l.json())})},l.prototype.handledError=function(l){console.log(l),sessionStorage.clear(),this.router.navigate(["/login"])},l.ngInjectableDef=o.defineInjectable({factory:function(){return new l(o.inject(e.e),o.inject(i.l))},token:l,providedIn:"root"}),l}()},PDX0:function(l,n){(function(n){l.exports=n}).call(this,{})},c4FF:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){return function(){this.id=0,this.id_ubication=0,this.email="",this.name="",this.ruc="",this.province="",this.identification="",this.main_phone_number="",this.secondary_phone_number="0000000000",this.address="",this.address_map_latitude=-.2153676,this.address_map_longitude=-78.5036064}}()},jXnw:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){return function(){this.group_type_id=0,this.register_code=""}}()},mhEj:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){return function(){this.person_representative_attachment_file_type="",this.person_representative_attachment_file_name="",this.person_representative_attachment_file="",this.assignment_date=new Date,this.ruc="",this.person_representative_id=0}}()},qYr5:function(l,n,t){"use strict";t.d(n,"a",function(){return r});var e=t("jXnw"),u=t("4NRs"),o=t("c4FF"),i=t("mhEj"),r=function(){return function(){this.establishmentsSRI=[],this.establishments=[],this.group_given=new e.a,this.person_representative=new u.a,this.person_representative_attachment=new i.a,this.tax_payer_type_id=0,this.contact_user_id=0,this.contact_user=new o.a,this.number="",this.owner_name="",this.razon_social="",this.baised_accounting=!1}}()}}]);