(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{A65b:function(n,l,t){"use strict";t.d(l,"a",function(){return r});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),i=t("ZYCi"),r=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_base+"grouptype/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(i.l))},token:n,providedIn:"root"}),n}()},B9Yq:function(n,l){n.exports=function(){throw new Error("define cannot be used indirect")}},JEAp:function(n,l,t){var e,u=u||function(n){"use strict";if(!(void 0===n||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var l=function(){return n.URL||n.webkitURL||n},t=n.document.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in t,u=/constructor/i.test(n.HTMLElement)||n.safari,o=/CriOS\/[\d]+/.test(navigator.userAgent),i=function(l){(n.setImmediate||n.setTimeout)(function(){throw l},0)},r=function(n){setTimeout(function(){"string"==typeof n?l().revokeObjectURL(n):n.remove()},4e4)},a=function(n){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob([String.fromCharCode(65279),n],{type:n.type}):n},s=function(s,c,d){d||(s=a(s));var p,g=this,h="application/octet-stream"===s.type,f=function(){!function(n,l,t){for(var e=(l=[].concat(l)).length;e--;){var u=n["on"+l[e]];if("function"==typeof u)try{u.call(n,n)}catch(o){i(o)}}}(g,"writestart progress write writeend".split(" "))};if(g.readyState=g.INIT,e)return p=l().createObjectURL(s),void setTimeout(function(){var n,l;t.href=p,t.download=c,n=t,l=new MouseEvent("click"),n.dispatchEvent(l),f(),r(p),g.readyState=g.DONE});!function(){if((o||h&&u)&&n.FileReader){var t=new FileReader;return t.onloadend=function(){var l=o?t.result:t.result.replace(/^data:[^;]*;/,"data:attachment/file;");n.open(l,"_blank")||(n.location.href=l),l=void 0,g.readyState=g.DONE,f()},t.readAsDataURL(s),void(g.readyState=g.INIT)}p||(p=l().createObjectURL(s)),h?n.location.href=p:n.open(p,"_blank")||(n.location.href=p),g.readyState=g.DONE,f(),r(p)}()},c=s.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(n,l,t){return l=l||n.name||"download",t||(n=a(n)),navigator.msSaveOrOpenBlob(n,l)}:(c.abort=function(){},c.readyState=c.INIT=0,c.WRITING=1,c.DONE=2,c.error=c.onwritestart=c.onprogress=c.onwrite=c.onabort=c.onerror=c.onwriteend=null,function(n,l,t){return new s(n,l||n.name||"download",t)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);n.exports?n.exports.saveAs=u:null!==t("B9Yq")&&null!==t("PDX0")&&(void 0===(e=(function(){return u}).call(l,t,l,n))||(n.exports=e))},N6VH:function(n,l,t){"use strict";t.d(l,"a",function(){return r});var e=t("sE5F"),u=t("AytR"),o=t("CcnG"),i=t("ZYCi"),r=function(){function n(n,l){this.http=n,this.router=l,this.url=u.a.api_base+"ruc/",this.options=new e.g,this.options.headers=new e.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.get_filtered=function(n){var l=this;return this.http.get(this.url+"filtered?number="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.register_ruc=function(n){var l=this;return this.http.post(this.url+"register_ruc",JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.update_ruc=function(n){var l=this;return this.http.put(this.url+"update_ruc",JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=o.defineInjectable({factory:function(){return new n(o.inject(e.e),o.inject(i.l))},token:n,providedIn:"root"}),n}()},PDX0:function(n,l){(function(l){n.exports=l}).call(this,{})},jXnw:function(n,l,t){"use strict";t.d(l,"a",function(){return e});var e=function(){return function(){this.group_type_id=0,this.register_code=""}}()},"q0G/":function(n,l,t){"use strict";t.r(l);var e=t("CcnG"),u=function(){return function(){}}(),o=t("pMnS"),i=t("Ip0R"),r=t("gIcY"),a=t("JEAp"),s=t("sE5F"),c=t("AytR"),d=t("ZYCi"),p=function(){function n(n,l){this.http=n,this.router=l,this.url=c.a.api_base+"groupgiven/",this.options=new s.g,this.options.headers=new s.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return n.prototype.get=function(n){var l=this;return void 0===n?this.http.get(this.url,this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())}):this.http.get(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.get_paginate=function(n,l){var t=this;return this.http.get(this.url+"paginate?size="+n.toString()+"&page="+l.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){t.handledError(n.json())})},n.prototype.delete=function(n){var l=this;return this.http.delete(this.url+"?id="+n.toString(),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.getBackUp=function(){var n=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(n){return n.json()}).catch(function(l){n.handledError(l.json())})},n.prototype.post=function(n){var l=this;return this.http.post(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.put=function(n){var l=this;return this.http.put(this.url,JSON.stringify(n),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.masiveLoad=function(n){var l=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:n}),this.options).toPromise().then(function(n){return n.json()}).catch(function(n){l.handledError(n.json())})},n.prototype.handledError=function(n){console.log(n),sessionStorage.clear(),this.router.navigate(["/login"])},n.ngInjectableDef=e.defineInjectable({factory:function(){return new n(e.inject(s.e),e.inject(d.l))},token:n,providedIn:"root"}),n}(),g=t("jXnw"),h=t("N6VH"),f=t("jsSy"),v=t("A65b"),m=function(){function n(n,l,t,e,u,o){this.modalService=n,this.toastr=l,this.rucDataService=t,this.person_representativeDataService=e,this.group_typeDataService=u,this.group_givenDataService=o,this.group_givens=[],this.group_givenSelected=new g.a,this.currentPage=1,this.lastPage=1,this.showDialog=!1,this.recordsByPage=5,this.rucs=[],this.person_representatives=[],this.group_types=[]}return n.prototype.ngOnInit=function(){this.goToPage(1),this.getRuc(),this.getPersonRepresentative(),this.getGroupType()},n.prototype.selectGroupGiven=function(n){this.group_givenSelected=n},n.prototype.getRuc=function(){var n=this;this.rucs=[],this.rucDataService.get().then(function(l){n.rucs=l}).catch(function(n){return console.log(n)})},n.prototype.getPersonRepresentative=function(){var n=this;this.person_representatives=[],this.person_representativeDataService.get().then(function(l){n.person_representatives=l}).catch(function(n){return console.log(n)})},n.prototype.getGroupType=function(){var n=this;this.group_types=[],this.group_typeDataService.get().then(function(l){n.group_types=l}).catch(function(n){return console.log(n)})},n.prototype.goToPage=function(n){n<1||n>this.lastPage?this.toastr.errorToastr("La p\xe1gina solicitada no existe.","Error"):(this.currentPage=n,this.getGroupGivens())},n.prototype.getGroupGivens=function(){var n=this;this.group_givens=[],this.group_givenSelected=new g.a,this.group_givenSelected.ruc_id=0,this.group_givenSelected.person_representative_id=0,this.group_givenSelected.group_type_id=0,this.group_givenDataService.get_paginate(this.recordsByPage,this.currentPage).then(function(l){n.group_givens=l.data,n.lastPage=l.last_page}).catch(function(n){return console.log(n)})},n.prototype.newGroupGiven=function(n){this.group_givenSelected=new g.a,this.group_givenSelected.ruc_id=0,this.group_givenSelected.person_representative_id=0,this.group_givenSelected.group_type_id=0,this.openDialog(n)},n.prototype.editGroupGiven=function(n){void 0!==this.group_givenSelected.id?this.openDialog(n):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.deleteGroupGiven=function(){var n=this;void 0!==this.group_givenSelected.id?this.group_givenDataService.delete(this.group_givenSelected.id).then(function(l){n.toastr.successToastr("Registro Borrado satisfactoriamente.","Borrar"),n.getGroupGivens()}).catch(function(n){return console.log(n)}):this.toastr.errorToastr("Debe seleccionar un registro.","Error")},n.prototype.backup=function(){this.group_givenDataService.getBackUp().then(function(n){var l=new Blob([JSON.stringify(n)],{type:"text/plain"}),t=new Date;Object(a.saveAs)(l,t.toLocaleDateString()+"_GroupGivens.json")}).catch(function(n){return console.log(n)})},n.prototype.toCSV=function(){this.group_givenDataService.get().then(function(n){var l="id;register_code;ruc_id;person_representative_id;group_type_id\n";n.forEach(function(n){l+=n.id+";"+n.register_code+";"+n.ruc_id+";"+n.person_representative_id+";"+n.group_type_id+"\n"});var t=new Blob(["\ufeff",l],{type:"text/plain"}),e=new Date;Object(a.saveAs)(t,e.toLocaleDateString()+"_GroupGivens.csv")}).catch(function(n){return console.log(n)})},n.prototype.decodeUploadFile=function(n){var l=this,t=new FileReader;n.target.files&&n.target.files.length>0&&(t.readAsDataURL(n.target.files[0]),t.onload=function(){var n=t.result.toString().split(",")[1],e=JSON.parse(decodeURIComponent(escape(atob(n))));l.group_givenDataService.masiveLoad(e).then(function(n){l.goToPage(l.currentPage)}).catch(function(n){return console.log(n)})})},n.prototype.openDialog=function(n){var l=this;this.modalService.open(n,{centered:!0}).result.then(function(n){"Guardar click"===n&&(void 0===l.group_givenSelected.id?l.group_givenDataService.post(l.group_givenSelected).then(function(n){l.toastr.successToastr("Datos guardados satisfactoriamente.","Nuevo"),l.getGroupGivens()}).catch(function(n){return console.log(n)}):l.group_givenDataService.put(l.group_givenSelected).then(function(n){l.toastr.successToastr("Registro actualizado satisfactoriamente.","Actualizar"),l.getGroupGivens()}).catch(function(n){return console.log(n)}))},function(n){})},n}(),b=t("4GxJ"),_=t("3EpR"),y=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function S(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,0,"span",[["class","far fa-hand-point-right"]],null,null,null,null,null))],null,null)}function P(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"tr",[],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.selectGroupGiven(n.context.$implicit)&&e),e},null,null)),(n()(),e["\u0275eld"](1,0,null,null,2,"td",[["class","text-right"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](3,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(n()(),e["\u0275ted"](5,null,["",""]))],function(n,l){n(l,3,0,l.component.group_givenSelected===l.context.$implicit)},function(n,l){n(l,5,0,l.context.$implicit.register_code)})}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","Primera P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function j(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","Primera P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.goToPage(1)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Primera"]))],null,null)}function C(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Anterior"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage-1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage-1)})}function w(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","P\xe1gina Siguiente"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(1*u.currentPage+1)&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,1*l.component.currentPage+1)})}function E(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["title","\xdaltima P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.lastPage)&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function I(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-light"],["disabled",""],["title","\xdaltima P\xe1gina"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function k(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function D(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function G(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](1,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](2,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](3,null,[" "," "]))],function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"",l.context.$implicit.id,""))},function(n,l){n(l,3,0,l.context.$implicit.id)})}function T(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Datos:"])),(n()(),e["\u0275eld"](3,0,null,null,2,"button",[["class","close"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.dismiss("Cross click")&&e),e},null,null)),(n()(),e["\u0275eld"](4,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["\xd7"])),(n()(),e["\u0275eld"](6,0,null,null,60,"div",[["class","modal-body"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,59,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](8,0,null,null,58,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,9,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","register_code"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["register_code"])),(n()(),e["\u0275eld"](12,0,null,null,6,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](13,0,null,null,5,"input",[["class","form-control"],["id","register_code"],["name","register_code"],["placeholder","registerCode"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,t){var u=!0,o=n.component;return"input"===l&&(u=!1!==e["\u0275nov"](n,14)._handleInput(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,14).onTouched()&&u),"compositionstart"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionStart()&&u),"compositionend"===l&&(u=!1!==e["\u0275nov"](n,14)._compositionEnd(t.target.value)&&u),"ngModelChange"===l&&(u=!1!==(o.group_givenSelected.register_code=t)&&u),u},null,null)),e["\u0275did"](14,16384,null,0,r.d,[e.Renderer2,e.ElementRef,[2,r.a]],null,null),e["\u0275prd"](1024,null,r.h,function(n){return[n]},[r.d]),e["\u0275did"](16,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](18,16384,null,0,r.j,[[4,r.i]],null,null),(n()(),e["\u0275eld"](19,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](20,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","ruc_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Ruc"])),(n()(),e["\u0275eld"](22,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](23,0,null,null,11,"select",[["class","form-control"],["id","ruc_id"],["name","ruc_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,24).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,24).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.group_givenSelected.ruc_id=t)&&u),u},null,null)),e["\u0275did"](24,16384,null,0,r.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(n){return[n]},[r.o]),e["\u0275did"](26,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](28,16384,null,0,r.j,[[4,r.i]],null,null),(n()(),e["\u0275eld"](29,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](30,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](31,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,k)),e["\u0275did"](34,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](35,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](36,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","person_representative_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["PersonRepresentative"])),(n()(),e["\u0275eld"](38,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](39,0,null,null,11,"select",[["class","form-control"],["id","person_representative_id"],["name","person_representative_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,40).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,40).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.group_givenSelected.person_representative_id=t)&&u),u},null,null)),e["\u0275did"](40,16384,null,0,r.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(n){return[n]},[r.o]),e["\u0275did"](42,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](44,16384,null,0,r.j,[[4,r.i]],null,null),(n()(),e["\u0275eld"](45,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](46,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](47,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,D)),e["\u0275did"](50,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](51,0,null,null,15,"div",[["class","form-group row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](52,0,null,null,1,"label",[["class","col-4 col-form-label"],["for","group_type_id"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["GroupType"])),(n()(),e["\u0275eld"](54,0,null,null,12,"div",[["class","col-8"]],null,null,null,null,null)),(n()(),e["\u0275eld"](55,0,null,null,11,"select",[["class","form-control"],["id","group_type_id"],["name","group_type_id"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(n,l,t){var u=!0,o=n.component;return"change"===l&&(u=!1!==e["\u0275nov"](n,56).onChange(t.target.value)&&u),"blur"===l&&(u=!1!==e["\u0275nov"](n,56).onTouched()&&u),"ngModelChange"===l&&(u=!1!==(o.group_givenSelected.group_type_id=t)&&u),u},null,null)),e["\u0275did"](56,16384,null,0,r.o,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,r.h,function(n){return[n]},[r.o]),e["\u0275did"](58,671744,null,0,r.m,[[8,null],[8,null],[8,null],[6,r.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,r.i,null,[r.m]),e["\u0275did"](60,16384,null,0,r.j,[[4,r.i]],null,null),(n()(),e["\u0275eld"](61,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),e["\u0275did"](62,147456,null,0,r.n,[e.ElementRef,e.Renderer2,[2,r.o]],{value:[0,"value"]},null),e["\u0275did"](63,147456,null,0,r.t,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(n()(),e["\u0275ted"](-1,null,["Seleccione..."])),(n()(),e["\u0275and"](16777216,null,null,1,null,G)),e["\u0275did"](66,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](67,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(n()(),e["\u0275eld"](68,0,null,null,1,"button",[["class","btn btn-outline-success"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Guardar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Guardar"])),(n()(),e["\u0275eld"](70,0,null,null,1,"button",[["class","btn btn-outline-danger"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.context.$implicit.close("Cancelar click")&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Cancelar"]))],function(n,l){var t=l.component;n(l,16,0,"register_code",t.group_givenSelected.register_code),n(l,26,0,"ruc_id",t.group_givenSelected.ruc_id),n(l,30,0,"0"),n(l,31,0,"0"),n(l,34,0,t.rucs),n(l,42,0,"person_representative_id",t.group_givenSelected.person_representative_id),n(l,46,0,"0"),n(l,47,0,"0"),n(l,50,0,t.person_representatives),n(l,58,0,"group_type_id",t.group_givenSelected.group_type_id),n(l,62,0,"0"),n(l,63,0,"0"),n(l,66,0,t.group_types)},function(n,l){n(l,13,0,e["\u0275nov"](l,18).ngClassUntouched,e["\u0275nov"](l,18).ngClassTouched,e["\u0275nov"](l,18).ngClassPristine,e["\u0275nov"](l,18).ngClassDirty,e["\u0275nov"](l,18).ngClassValid,e["\u0275nov"](l,18).ngClassInvalid,e["\u0275nov"](l,18).ngClassPending),n(l,23,0,e["\u0275nov"](l,28).ngClassUntouched,e["\u0275nov"](l,28).ngClassTouched,e["\u0275nov"](l,28).ngClassPristine,e["\u0275nov"](l,28).ngClassDirty,e["\u0275nov"](l,28).ngClassValid,e["\u0275nov"](l,28).ngClassInvalid,e["\u0275nov"](l,28).ngClassPending),n(l,39,0,e["\u0275nov"](l,44).ngClassUntouched,e["\u0275nov"](l,44).ngClassTouched,e["\u0275nov"](l,44).ngClassPristine,e["\u0275nov"](l,44).ngClassDirty,e["\u0275nov"](l,44).ngClassValid,e["\u0275nov"](l,44).ngClassInvalid,e["\u0275nov"](l,44).ngClassPending),n(l,55,0,e["\u0275nov"](l,60).ngClassUntouched,e["\u0275nov"](l,60).ngClassTouched,e["\u0275nov"](l,60).ngClassPristine,e["\u0275nov"](l,60).ngClassDirty,e["\u0275nov"](l,60).ngClassValid,e["\u0275nov"](l,60).ngClassInvalid,e["\u0275nov"](l,60).ngClassPending)})}function N(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,[" GroupGiven "])),(n()(),e["\u0275eld"](3,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,20,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](5,0,null,null,19,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0,u=n.component;return"click"===l&&(e=!1!==u.goToPage(u.currentPage)&&e),e},null,null)),(n()(),e["\u0275eld"](8,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(n()(),e["\u0275eld"](9,0,null,null,4,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](10,0,null,null,1,"button",[["class","btn btn-success"],["title","Nuevo"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.newGroupGiven(e["\u0275nov"](n,60))&&u),u},null,null)),(n()(),e["\u0275eld"](11,0,null,null,0,"i",[["class","fas fa-file"]],null,null,null,null,null)),(n()(),e["\u0275eld"](12,0,null,null,1,"button",[["class","btn btn-warning"],["title","Editar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.editGroupGiven(e["\u0275nov"](n,60))&&u),u},null,null)),(n()(),e["\u0275eld"](13,0,null,null,0,"i",[["class","fas fa-edit"]],null,null,null,null,null)),(n()(),e["\u0275eld"](14,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](15,0,null,null,1,"button",[["class","btn btn-danger"],["title","Eliminar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.deleteGroupGiven()&&e),e},null,null)),(n()(),e["\u0275eld"](16,0,null,null,0,"i",[["class","fas fa-trash"]],null,null,null,null,null)),(n()(),e["\u0275eld"](17,0,null,null,7,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](18,0,null,null,1,"button",[["class","btn btn-dark"],["title","BackUp"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.backup()&&e),e},null,null)),(n()(),e["\u0275eld"](19,0,null,null,0,"i",[["class","fas fa-download"]],null,null,null,null,null)),(n()(),e["\u0275eld"](20,0,null,null,1,"button",[["class","btn btn-dark"],["title","Exportar CSV"],["type","button"]],null,[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.toCSV()&&e),e},null,null)),(n()(),e["\u0275eld"](21,0,null,null,0,"i",[["class","fas fa-file-csv"]],null,null,null,null,null)),(n()(),e["\u0275eld"](22,0,null,null,1,"button",[["class","btn btn-dark"],["title","Cargar"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==e["\u0275nov"](n,24).click()&&u),u},null,null)),(n()(),e["\u0275eld"](23,0,null,null,0,"i",[["class","fas fa-upload"]],null,null,null,null,null)),(n()(),e["\u0275eld"](24,0,[["uploadInput",1]],null,0,"input",[["accept",".json"],["class","form-control"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],function(n,l,t){var e=!0;return"change"===l&&(e=!1!==n.component.decodeUploadFile(t)&&e),e},null,null)),(n()(),e["\u0275eld"](25,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](26,0,null,null,10,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](27,0,null,null,9,"table",[["class","table table-hover mt-2"]],null,null,null,null,null)),(n()(),e["\u0275eld"](28,0,null,null,5,"thead",[],null,null,null,null,null)),(n()(),e["\u0275eld"](29,0,null,null,4,"tr",[],null,null,null,null,null)),(n()(),e["\u0275eld"](30,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Seleccionado"])),(n()(),e["\u0275eld"](32,0,null,null,1,"th",[],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["register_code"])),(n()(),e["\u0275eld"](34,0,null,null,2,"tbody",[],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,P)),e["\u0275did"](36,278528,null,0,i.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](37,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](38,0,null,null,21,"div",[["class","col-12"]],null,null,null,null,null)),(n()(),e["\u0275eld"](39,0,null,null,20,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(n()(),e["\u0275eld"](40,0,null,null,14,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](42,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,j)),e["\u0275did"](44,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,C)),e["\u0275did"](46,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](47,0,null,null,1,"button",[["class","btn btn-primary"],["title","P\xe1gina Actual"],["type","button"]],null,null,null,null,null)),(n()(),e["\u0275ted"](48,null,["",""])),(n()(),e["\u0275and"](16777216,null,null,1,null,w)),e["\u0275did"](50,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,E)),e["\u0275did"](52,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,I)),e["\u0275did"](54,16384,null,0,i.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](55,0,null,null,4,"div",[["class","input-group"]],null,null,null,null,null)),(n()(),e["\u0275eld"](56,0,null,null,2,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(n()(),e["\u0275eld"](57,0,null,null,1,"button",[["class","input-group-text btn btn-success"],["title","Ir a la P\xe1gina"],["type","button"]],null,[[null,"click"]],function(n,l,t){var u=!0;return"click"===l&&(u=!1!==n.component.goToPage(e["\u0275nov"](n,59).value)&&u),u},null,null)),(n()(),e["\u0275ted"](-1,null,["Ir a"])),(n()(),e["\u0275eld"](59,0,[["goToPageNumber",1]],null,0,"input",[["class","form-control"],["placeholder","Ir a la P\xe1gina"],["type","number"]],[[8,"min",0],[8,"max",0]],null,null,null,null)),(n()(),e["\u0275and"](0,[["content",2]],null,0,null,T))],function(n,l){var t=l.component;n(l,36,0,t.group_givens),n(l,42,0,1===t.currentPage),n(l,44,0,1!==t.currentPage),n(l,46,0,t.currentPage>1),n(l,50,0,t.currentPage<t.lastPage),n(l,52,0,t.currentPage!==t.lastPage),n(l,54,0,t.currentPage===t.lastPage)},function(n,l){var t=l.component;n(l,24,0,!0),n(l,48,0,t.currentPage),n(l,59,0,e["\u0275inlineInterpolate"](1,"",1,""),e["\u0275inlineInterpolate"](1,"",t.lastPage,""))})}function O(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-groupgiven",[],null,null,null,N,y)),e["\u0275did"](1,114688,null,0,m,[b.y,_.a,h.a,f.a,v.a,p],null,null)],function(n,l){n(l,1,0)},null)}var x=e["\u0275ccf"]("app-groupgiven",m,O,{},{},[]),F=function(){return function(){}}();t.d(l,"GroupGivenModuleNgFactory",function(){return L});var L=e["\u0275cmf"](u,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,x]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[e.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,r.s,r.s,[]),e["\u0275mpd"](4608,b.y,b.y,[e.ComponentFactoryResolver,e.Injector,b.tb,b.z]),e["\u0275mpd"](4608,h.a,h.a,[s.e,d.l]),e["\u0275mpd"](4608,f.a,f.a,[s.e,d.l]),e["\u0275mpd"](4608,v.a,v.a,[s.e,d.l]),e["\u0275mpd"](4608,p,p,[s.e,d.l]),e["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),e["\u0275mpd"](1073742336,d.o,d.o,[[2,d.u],[2,d.l]]),e["\u0275mpd"](1073742336,F,F,[]),e["\u0275mpd"](1073742336,r.p,r.p,[]),e["\u0275mpd"](1073742336,r.e,r.e,[]),e["\u0275mpd"](1073742336,u,u,[]),e["\u0275mpd"](1024,d.j,function(){return[[{path:"",component:m}]]},[])])})}}]);