(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{B9Yq:function(n,l){n.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(n,l,t){var e,u=u||function(n){"use strict";if(!(void 0===n||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var l=function(){return n.URL||n.webkitURL||n},t=n.document.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in t,u=/constructor/i.test(n.HTMLElement)||n.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),r=function(l){(n.setImmediate||n.setTimeout)(function(){throw l},0)},i=function(n){setTimeout(function(){"string"==typeof n?l().revokeObjectURL(n):n.remove()},4e4)},a=function(n){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob([String.fromCharCode(65279),n],{type:n.type}):n},c=function(c,s,d){d||(c=a(c));var p,h=this,g="application/octet-stream"===c.type,f=function(){!function(n,l,t){for(var e=(l=[].concat(l)).length;e--;){var u=n["on"+l[e]];if("function"==typeof u)try{u.call(n,n)}catch(o){r(o)}}}(h,"writestart progress write writeend".split(" "))};if(h.readyState=h.INIT,e)return p=l().createObjectURL(c),void setTimeout(function(){var n,l;t.href=p,t.download=s,n=t,l=new MouseEvent("click"),n.dispatchEvent(l),f(),i(p),h.readyState=h.DONE});!function(){if((o||g&&u)&&n.FileReader){var t=new FileReader;return t.onloadend=function(){var l=o?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");n.open(l,"_blank")||(n.location.href=l),l=void 0,h.readyState=h.DONE,f()},t.readAsDataURL(c),void(h.readyState=h.INIT)}p||(p=l().createObjectURL(c)),g?n.location.href=p:n.open(p,"_blank")||(n.location.href=p),h.readyState=h.DONE,f(),i(p)}()},s=c.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(n,l,t){return l=l||n.name||"download",t||(n=a(n)),navigator.msSaveOrOpenBlob(n,l)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(n,l,t){return new c(n,l||n.name||"download",t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);n.exports?n.exports.saveAs=u:null!==t("B9Yq")&&null!==t("PDX0")&&(void 0===(e=(function(){return u}).call(l,t,l,n))||(n.exports=e))},PDX0:function(n,l){(function(l){n.exports=l}).call(this,{})},TFBR:function(n,l,t){"use strict";t.d(l,"a",function(){return e});var e=function(){return function(){this.count=0,this.gender_id=0,this.worker_group_id=0,this.gender_name="",this.worker_group_name="",this.is_max=!1}}()},eiqJ:function(n,l,t){"use strict";t.d(l,"a",function(){return i});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),r=t("ZYCi"),i=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_base+"workergroup/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(r.l))},token:n,providedIn:"root"}),n}()},"rGC/":function(n,l,t){"use strict";t.d(l,"a",function(){return i});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),r=t("ZYCi"),i=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_base+"worker/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(r.l))},token:n,providedIn:"root"}),n}()},tCKL:function(n,l,t){"use strict";t.d(l,"a",function(){return i});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),r=t("ZYCi"),i=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_base+"gender/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(r.l))},token:n,providedIn:"root"}),n}()},wzCi:function(n,l,t){"use strict";t.r(l);var e=t("CcnG"),u=function(){return function(){}}(),o=t("pMnS"),r=t("Ip0R"),i=t("gIcY"),a=t("JEAp"),c=t("rGC/"),s=t("TFBR"),d=t("tCKL"),p=t("eiqJ"),h=function(){function n(n,l,t,e,u){this.modalService=n,this.toastr=l,this.genderDataService=t,this.worker_groupDataService=e,this.workerDataService=u,this.workers=[],this.workerSelected=new s.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.genders=[],this.worker_groups=[]}return n.prototype.ngOnInit=function(){this.goToPage(1),this.getGender(),this.getWorkerGroup()},n.prototype.selectWorker=function(n){this.workerSelected=n},n.prototype.getGender=function(){var n=this;this.genders=[],this.genderDataService.get().then(function(l){n.genders=l}).catch(function(n){return console.log(n)})},n.prototype.getWorkerGroup=function(){var n=this;this.worker_groups=[],this.worker_groupDataService.get().then(function(l){n.worker_groups=l}).catch(function(n){return console.log(n)})},n.prototype.goToPage=function(n){n<1||n>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=n,this.getWorkers())},n.prototype.getWorkers=function(){var n=this;this.workers=[],this.workerSelected=new s.a,this.workerSelected.gender_id=0,this.workerSelected.worker_group_id=0,this.workerDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(l){n.workers=l.data,n.lastPage=l.last_page}).catch(function(n){return console.log(n)})},n.prototype.newWorker=function(n){this.workerSelected=new s.a,this.workerSelected.gender_id=0,this.workerSelected.worker_group_id=0,this.openDialog(n)},n.prototype.editWorker=function(n){void 0!==this.workerSelected.id?this.openDialog(n):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.deleteWorker=function(){var n=this;void 0!==this.workerSelected.id?this.workerDataService.delete(this.workerSelected.id).then(function(l){n.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),n.getWorkers()}).catch(function(n){return console.log(n)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.backup=function(){this.workerDataService.getBackUp().then(function(n){var l=new Blob([JSON.stringify(n)],{type:"text/plain"}),t=new Date;Object(a.saveAs)(l,t.toLocaleDateString()+"_Workers.json")}).catch(function(n){return console.log(n)})},n.prototype.toCSV=function(){this.workerDataService.get().then(function(n){var l="id;count;gender_id;worker_group_id\n";n.forEach(function(n){l+=n.id+";"+n.count+";"+n.gender_id+";"+n.worker_group_id+"\n"});var t=new Blob(["\ufeff",l],{type:"text/plain"}),e=new Date;Object(a.saveAs)(t,e.toLocaleDateString()+"_Workers.csv")}).catch(function(n){return console.log(n)})},n.prototype.decodeUploadFile=function(n){var l=this,t=new FileReader;n.target.files&&n.target.files.length>0&&(t.readAsDataURL(n.target.files[0]),t.onload=function(){var n=t.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(n))));l.workerDataService.masiveLoad(e).then(function(n){l.goToPage(l.currentPage)}).catch(function(n){return console.log(n)})})},n.prototype.openDialog=function(n){var l=this;this.modalService.open(n,{centered:!0}).result.then(function(n){"Guardar click"===n&&(void 0===l.workerSelected.id?l.workerDataService.post(l.workerSelected).then(function(n){l.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),l.getWorkers()}).catch(function(n){return console.log(n)}):l.workerDataService.put(l.workerSelected).then(function(n){l.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),l.getWorkers()}).catch(function(n){return console.log(n)}))},function(n){})},n}(),g=t("4GxJ"),f=t("3EpR"),v=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function m(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function b(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"tr",[],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.selectWorker(n.context.$implicit)&&e),e},null,null)),(n()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,m)),e["\u0275did"](3,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),e["\u0275ted"](5,null,["",""]))],function(n,l){n(l,3,0,l.component.workerSelected===l.context.$implicit)},function(n,l){n(l,5,0,l.context.$implicit.count)})}function k(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function w(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.goToPage(1)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function y(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage-1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage-1)})}function S(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage+1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage+1)})}function P(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.lastPage)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function C(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function j(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function _(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Datos:"])),(n()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(n()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xd7"])),(n()(),e["\u0275eld"](6,0,null,null,45,"div",[["class","modal-body"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,44,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](8,0,null,null,43,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,10,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","count"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["count"])),(n()(),e["\u0275eld"](12,0,null,null,7,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](13,0,null,null,6,"input",[["class","form-control"],["id","count"],["name","count"],["placeholder","count"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"change"]],function(n,l,t){var u=!0,o=n.component;return"input"===l&&(u=!1!==e["\u0275nov"](n,14)._handleInput(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,14).onTouched()&&u),"compositionstart"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionStart()&&u),"compositionend"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionEnd(t.target.value)&&u),"change"===l&&(u=!1!==e["\u0275nov"](n,15).onChange(t.target.value)&&u),"input"===l&&(u=!1!==e["\u0275nov"](n,15).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,15).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.workerSelected.count=t)&&u),u},null,null)),e["\u0275did"](14,16384,null,0,i.d,[e.Renderer2,e.ElementRef,[2,i.a]],null,null),e["\u0275did"](15,16384,null,0,i.q,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.h,function(n,l){return[n,l]},[i.d,i.q]),e["\u0275did"](17,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.i,null,[i.m]),e["\u0275did"](19,16384,null,0,i.j,[[4,i.i]],null,null),(n()(),e["\u0275eld"](20,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](21,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","gender_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Gender"])),(n()(),e["\u0275eld"](23,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](24,0,null,null,11,"select",[["class","form-control"],["id","gender_id"],["name","gender_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,25).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,25).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.workerSelected.gender_id=t)&&u),u},null,null)),e["\u0275did"](25,16384,null,0,i.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.h,function(n){return[n]},[i.o]),e["\u0275did"](27,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.i,null,[i.m]),e["\u0275did"](29,16384,null,0,i.j,[[4,i.i]],null,null),(n()(),e["\u0275eld"](30,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](31,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](32,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,j)),e["\u0275did"](35,278528,null,0,r.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](36,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](37,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","worker_group_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["WorkerGroup"])),(n()(),e["\u0275eld"](39,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](40,0,null,null,11,"select",[["class","form-control"],["id","worker_group_id"],["name","worker_group_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,41).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,41).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.workerSelected.worker_group_id=t)&&u),u},null,null)),e["\u0275did"](41,16384,null,0,i.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,i.h,function(n){return[n]},[i.o]),e["\u0275did"](43,671744,null,0,i.m,[[8,null],[8,null],[8,null],[6,i.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.i,null,[i.m]),e["\u0275did"](45,16384,null,0,i.j,[[4,i.i]],null,null),(n()(),e["\u0275eld"](46,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](47,147456,null,0,i.n,[e.ElementRef,e.Renderer2,[2,i.o]],{value:[0,"value"]},null),e["\u0275did"](48,147456,null,0,i.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,_)),e["\u0275did"](51,278528,null,0,r.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](52,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(n()(),e["\u0275eld"](53,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Guardar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Guardar"])),(n()(),e["\u0275eld"](55,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Cancelar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(n,l){var t=l.component;n(l,17,0,"count",t.workerSelected.count),n(l,27,0,"gender_id",t.workerSelected.gender_id),n(l,31,0,"0"),n(l,32,0,"0"),n(l,35,0,t.genders),n(l,43,0,"worker_group_id",t.workerSelected.worker_group_id),n(l,47,0,"0"),n(l,48,0,"0"),n(l,51,0,t.worker_groups)},function(n,l){n(l,13,0,e["\u0275nov"](l,19).ngClassUntouched,e["\u0275nov"](l,19).ngClassTouched,e["\u0275nov"](l,19).ngClassPristine,e["\u0275nov"](l,19).ngClassDirty,e["\u0275nov"](l,19).ngClassValid,e["\u0275nov"](l,19).ngClassInvalid,e["\u0275nov"](l,19).ngClassPending),n(l,24,0,e["\u0275nov"](l,29).ngClassUntouched,e["\u0275nov"](l,29).ngClassTouched,e["\u0275nov"](l,29).ngClassPristine,e["\u0275nov"](l,29).ngClassDirty,e["\u0275nov"](l,29).ngClassValid,e["\u0275nov"](l,29).ngClassInvalid,e["\u0275nov"](l,29).ngClassPending),n(l,40,0,e["\u0275nov"](l,45).ngClassUntouched,e["\u0275nov"](l,45).ngClassTouched,e["\u0275nov"](l,45).ngClassPristine,e["\u0275nov"](l,45).ngClassDirty,e["\u0275nov"](l,45).ngClassValid,e["\u0275nov"](l,45).ngClassInvalid,e["\u0275nov"](l,45).ngClassPending)})}function I(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,[" Worker "])),(n()(),e["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.currentPage)&&e),e},null,null)),(n()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.newWorker(e["\u0275nov"](n,60))&&u),u},null,null)),(n()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(n()(),e["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.editWorker(e["\u0275nov"](n,60))&&u),u},null,null)),(n()(),e["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(n()(),e["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.deleteWorker()&&e),e},null,null)),(n()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(n()(),e["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.backup()&&e),e},null,null)),(n()(),e["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(n()(),e["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.toCSV()&&e),e},null,null)),(n()(),e["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(n()(),e["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==e["\u0275nov"](n,24).click()&&u),u},null,null)),(n()(),e["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(n()(),e["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(n,l,t){var e=!0;return"change"===l&&(e=!1!==n.component.decodeUploadFile(t)&&e),e},null,null)),(n()(),e["\u0275eld"](25,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](26,0,null,null,10,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](27,0,null,null,9,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(n()(),e["\u0275eld"](28,0,null,null,5,"thead",[],null,null,null,null,null)),(n()(),e["\u0275eld"](29,0,null,null,4,"tr",[],null,null,null,null,null)),(n()(),e["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Seleccionado"])),(n()(),e["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["count"])),(n()(),e["\u0275eld"](34,0,null,null,2,"tbody",[],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,b)),e["\u0275did"](36,278528,null,0,r.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](37,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](38,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](39,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](40,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,k)),e["\u0275did"](42,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](44,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,y)),e["\u0275did"](46,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](47,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](48,null,["",""])),(n()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](50,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](52,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](54,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](55,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](56,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(n()(),e["\u0275eld"](57,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.goToPage(e["\u0275nov"](n,59).value)&&u),u},null,null)),(n()(),e["\u0275ted"](-1,null,["Ir a"])),(n()(),e["\u0275eld"](59,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(n()(),e["\u0275and"](0,[["content",2]],null,0,null,R))],function(n,l){var t=l.component;n(l,36,0,t.workers),n(l,42,0,1===t.currentPage),n(l,44,0,1!==t.currentPage),n(l,46,0,t.currentPage>1),n(l,50,0,t.currentPage<t.lastPage),n(l,52,0,t.currentPage!==t.lastPage),n(l,54,0,t.currentPage===t.lastPage)},function(n,l){var t=l.component;n(l,24,0,!0),n(l,48,0,t.currentPage),n(l,59,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function E(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-worker",[],null,null,null,I,v)),e["\u0275did"](1,114688,null,0,h,[g.y,f.a,d.a,p.a,c.a],null,null)],function(n,l){n(l,1,0)},null)}var T=e["\u0275ccf"]("app-worker",h,E,{},{},[]),D=t("sE5F"),N=t("ZYCi"),O=function(){return function(){}}();t.d(l,"WorkerModuleNgFactory",function(){return x});var x=e["\u0275cmf"](u,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,T]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[e.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,i.s,i.s,[]),e["\u0275mpd"](4608,g.y,g.y,[e.ComponentFactoryResolver,e.Injector,g.tb,g.z]),e["\u0275mpd"](4608,d.a,d.a,[D.e,N.l]),e["\u0275mpd"](4608,p.a,p.a,[D.e,N.l]),e["\u0275mpd"](4608,c.a,c.a,[D.e,N.l]),e["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),e["\u0275mpd"](1073742336,N.o,N.o,[[2,N.u],[2,N.l]]),e["\u0275mpd"](1073742336,O,O,[]),e["\u0275mpd"](1073742336,i.p,i.p,[]),e["\u0275mpd"](1073742336,i.e,i.e,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,N.j,function(){return[[{path:"",component:h}]]},[])])})}}]);