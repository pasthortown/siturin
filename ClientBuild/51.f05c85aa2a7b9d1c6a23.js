(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"4NRs":function(l,n,e){"use strict";e.d(n,"a",function(){return t});var t=function(){return function(){this.identification=""}}()},B9Yq:function(l,n){l.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(l,n,e){var t,u=u||function(l){"use strict";if(!(void 0===l||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var n=function(){return l.URL||l.webkitURL||l},e=l.document.createElementNS("http://www.w3.org/1999/xhtml","a"),t="download"in e,u=/constructor/i.test(l.HTMLElement)||l.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),r=function(n){(l.setImmediate||l.setTimeout)(function(){throw n},0)},i=function(l){setTimeout(function(){"string"==typeof l?n().revokeObjectURL(l):l.remove()},4e4)},a=function(l){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob([String.fromCharCode(65279),l],{type:l.type}):l},c=function(c,s,d){d||(c=a(c));var p,f=this,g="application/octet-stream"===c.type,v=function(){!function(l,n,e){for(var t=(n=[].concat(n)).length;t--;){var u=l["on"+n[t]];if("function"==typeof u)try{u.call(l,l)}catch(o){r(o)}}}(f,"writestart progress write writeend".split(" "))};if(f.readyState=f.INIT,t)return p=n().createObjectURL(c),void setTimeout(function(){var l,n;e.href=p,e.download=s,l=e,n=new MouseEvent("click"),l.dispatchEvent(n),v(),i(p),f.readyState=f.DONE});!function(){if((o||g&&u)&&l.FileReader){var e=new FileReader;return e.onloadend=function(){var n=o?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");l.open(n,"_blank")||(l.location.href=n),n=void 0,f.readyState=f.DONE,v()},e.readAsDataURL(c),void(f.readyState=f.INIT)}p||(p=n().createObjectURL(c)),g?l.location.href=p:l.open(p,"_blank")||(l.location.href=p),f.readyState=f.DONE,v(),i(p)}()},s=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(l,n,e){return n=n||l.name||"download",e||(l=a(l)),navigator.msSaveOrOpenBlob(l,n)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(l,n,e){return new c(l,n||l.name||"download",e)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);l.exports?l.exports.saveAs=u:null!==e("B9Yq")&&null!==e("PDX0")&&(void 0===(t=(function(){return u}).call(n,e,n,l))||(l.exports=t))},PDX0:function(l,n){(function(n){l.exports=n}).call(this,{})},rIn0:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),o=e("pMnS"),r=e("Ip0R"),i=e("gIcY"),a=e("JEAp"),c=e("jsSy"),s=e("4NRs"),d=function(){function l(l,n,e){this.modalService=l,this.toastr=n,this.person_representativeDataService=e,this.person_representatives=[],this.person_representativeSelected=new s.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5}return l.prototype.ngOnInit=function(){this.goToPage(1)},l.prototype.selectPersonRepresentative=function(l){this.person_representativeSelected=l},l.prototype.goToPage=function(l){l<1||l>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=l,this.getPersonRepresentatives())},l.prototype.getPersonRepresentatives=function(){var l=this;this.person_representatives=[],this.person_representativeSelected=new s.a,this.person_representativeDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(n){l.person_representatives=n.data,l.lastPage=n.last_page}).catch(function(l){return console.log(l)})},l.prototype.newPersonRepresentative=function(l){this.person_representativeSelected=new s.a,this.openDialog(l)},l.prototype.editPersonRepresentative=function(l){void 0!==this.person_representativeSelected.id?this.openDialog(l):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.deletePersonRepresentative=function(){var l=this;void 0!==this.person_representativeSelected.id?this.person_representativeDataService.delete(this.person_representativeSelected.id).then(function(n){l.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),l.getPersonRepresentatives()}).catch(function(l){return console.log(l)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},l.prototype.backup=function(){this.person_representativeDataService.getBackUp().then(function(l){var n=new Blob([JSON.stringify(l)],{type:"text/plain"}),e=new Date;Object(a.saveAs)(n,e.toLocaleDateString()+"_PersonRepresentatives.json")}).catch(function(l){return console.log(l)})},l.prototype.toCSV=function(){this.person_representativeDataService.get().then(function(l){var n="id;identification\n";l.forEach(function(l){n+=l.id+";"+l.identification+"\n"});var e=new Blob(["\ufeff",n],{type:"text/plain"}),t=new Date;Object(a.saveAs)(e,t.toLocaleDateString()+"_PersonRepresentatives.csv")}).catch(function(l){return console.log(l)})},l.prototype.decodeUploadFile=function(l){var n=this,e=new FileReader;l.target.files&&l.target.files.length>0&&(e.readAsDataURL(l.target.files[0]),e.onload=function(){var l=e.result.toString().split(",")[1],t=JSON.parse(decodeURIComponent(escape(atob(l))));n.person_representativeDataService.masiveLoad(t).then(function(l){n.goToPage(n.currentPage)}).catch(function(l){return console.log(l)})})},l.prototype.openDialog=function(l){var n=this;this.modalService.open(l,{centered:!0}).result.then(function(l){"Guardar click"===l&&(void 0===n.person_representativeSelected.id?n.person_representativeDataService.post(n.person_representativeSelected).then(function(l){n.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),n.getPersonRepresentatives()}).catch(function(l){return console.log(l)}):n.person_representativeDataService.put(n.person_representativeSelected).then(function(l){n.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),n.getPersonRepresentatives()}).catch(function(l){return console.log(l)}))},function(l){})},l}(),p=e("4GxJ"),f=e("3EpR"),g=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function m(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"tr",[],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.selectPersonRepresentative(l.context.$implicit)&&t),t},null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](3,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["",""]))],function(l,n){l(n,3,0,n.component.person_representativeSelected===n.context.$implicit)},function(l,n){l(n,5,0,n.context.$implicit.identification)})}function b(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function h(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.goToPage(1)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage-1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage-1)})}function P(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(1*u.currentPage+1)&&t),t},null,null)),(l()(),t["\u0275ted"](1,null,["",""]))],null,function(l,n){l(n,1,0,1*n.component.currentPage+1)})}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.lastPage)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Datos:"])),(l()(),t["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.dismiss("Cross click")&&t),t},null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["\xd7"])),(l()(),t["\u0275eld"](6,0,null,null,12,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,10,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","identification"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["identification"])),(l()(),t["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","identification"],["name","identification"],["placeholder","identification"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,14)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,14).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,14)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,14)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.person_representativeSelected.identification=e)&&u),u},null,null)),t["\u0275did"](14,16384,null,0,i.d,[t.Renderer2,t.ElementRef,[2,i.a]],null,null),t["\u0275prd"](1024,null,i.h,function(l){return[l]},[i.d]),t["\u0275did"](16,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,i.i,null,[i.m]),t["\u0275did"](18,16384,null,0,i.j,[[4,i.i]],null,null),(l()(),t["\u0275eld"](19,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Guardar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Guardar"])),(l()(),t["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.$implicit.close("Cancelar click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancelar"]))],function(l,n){l(n,16,0,"identification",n.component.person_representativeSelected.identification)},function(l,n){l(n,13,0,t["\u0275nov"](n,18).ngClassUntouched,t["\u0275nov"](n,18).ngClassTouched,t["\u0275nov"](n,18).ngClassPristine,t["\u0275nov"](n,18).ngClassDirty,t["\u0275nov"](n,18).ngClassValid,t["\u0275nov"](n,18).ngClassInvalid,t["\u0275nov"](n,18).ngClassPending)})}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,[" PersonRepresentative "])),(l()(),t["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0,u=l.component;return"click"===n&&(t=!1!==u.goToPage(u.currentPage)&&t),t},null,null)),(l()(),t["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.newPersonRepresentative(t["\u0275nov"](l,60))&&u),u},null,null)),(l()(),t["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.editPersonRepresentative(t["\u0275nov"](l,60))&&u),u},null,null)),(l()(),t["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.deletePersonRepresentative()&&t),t},null,null)),(l()(),t["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.backup()&&t),t},null,null)),(l()(),t["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(l()(),t["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toCSV()&&t),t},null,null)),(l()(),t["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(l()(),t["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==t["\u0275nov"](l,24).click()&&u),u},null,null)),(l()(),t["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.decodeUploadFile(e)&&t),t},null,null)),(l()(),t["\u0275eld"](25,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,10,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](27,0,null,null,9,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](28,0,null,null,5,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](29,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Seleccionado"])),(l()(),t["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["identification"])),(l()(),t["\u0275eld"](34,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](36,278528,null,0,r.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](37,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](38,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](39,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](42,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,h)),t["\u0275did"](44,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](46,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](47,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(l()(),t["\u0275ted"](48,null,["",""])),(l()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](50,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](52,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,R)),t["\u0275did"](54,16384,null,0,r.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](55,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),t["\u0275eld"](56,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t["\u0275eld"](57,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.goToPage(t["\u0275nov"](l,59).value)&&u),u},null,null)),(l()(),t["\u0275ted"](-1,null,["Ir a"])),(l()(),t["\u0275eld"](59,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(l()(),t["\u0275and"](0,[["content",2]],null,0,null,k))],function(l,n){var e=n.component;l(n,36,0,e.person_representatives),l(n,42,0,1===e.currentPage),l(n,44,0,1!==e.currentPage),l(n,46,0,e.currentPage>1),l(n,50,0,e.currentPage<e.lastPage),l(n,52,0,e.currentPage!==e.lastPage),l(n,54,0,e.currentPage===e.lastPage)},function(l,n){var e=n.component;l(n,24,0,!0),l(n,48,0,e.currentPage),l(n,59,0,t["\u0275inlineInterpolate"](1,"",1,""),t["\u0275inlineInterpolate"](1,"",e.lastPage,""))})}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-personrepresentative",[],null,null,null,S,g)),t["\u0275did"](1,114688,null,0,d,[p.y,f.a,c.a],null,null)],function(l,n){l(n,1,0)},null)}var C=t["\u0275ccf"]("app-personrepresentative",d,I,{},{},[]),_=e("sE5F"),T=e("ZYCi"),D=function(){return function(){}}();e.d(n,"PersonRepresentativeModuleNgFactory",function(){return N});var N=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,C]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[t.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,i.s,i.s,[]),t["\u0275mpd"](4608,p.y,p.y,[t.ComponentFactoryResolver,t.Injector,p.tb,p.z]),t["\u0275mpd"](4608,c.a,c.a,[_.e,T.l]),t["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),t["\u0275mpd"](1073742336,T.o,T.o,[[2,T.u],[2,T.l]]),t["\u0275mpd"](1073742336,D,D,[]),t["\u0275mpd"](1073742336,i.p,i.p,[]),t["\u0275mpd"](1073742336,i.e,i.e,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,T.j,function(){return[[{path:"",component:d}]]},[])])})}}]);