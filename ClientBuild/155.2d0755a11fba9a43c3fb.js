(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{iZSA:function(e,n,t){"use strict";t.r(n);var l=t("CcnG"),i=function(){return function(){}}(),a=t("9AJC"),o=t("pMnS"),r=t("Vnl2"),s=t("gIcY"),u=t("4GxJ"),c=t("Ip0R"),d=t("cfkQ"),g=t("z8lh"),p=t("ZYjt"),f=t("qYr5"),m=t("XqKP"),h=t("7QCc"),_=t("iNZF"),b=t("c4FF"),v=t("m3oD"),C=function(){function e(e,n){this.consultorDataService=e,this.ubicationDataService=n,this.user=new b.a,this.change=new l.EventEmitter,this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]},this.config={paging:!0,filtering:{filterString:""},className:["table-striped","table-hover","table-bordered"]},this.rows=[],this.columns=[],this.data=[],this.currentPageMinturRegisters=1,this.lastPageMinturRegisters=1,this.recordsByPageRegisterMintur=5,this.ubications=[],this.registers_mintur=[],this.idTramiteEstadoFilter=0}return e.prototype.ngOnInit=function(){this.loadCatalogos(),this.refresh()},e.prototype.ngOnChanges=function(){this.refresh()},e.prototype.loadCatalogos=function(){this.getUbications()},e.prototype.refresh=function(){var e={row:null,register:{register:null,activity_id:0,activity:"",establishment:new m.a,ruc:new f.a,states:null,register_data_on_catastro:null}};this.change.emit(e),this.getRegistersMintur()},e.prototype.getUbications=function(){var e=this;this.ubications=[],this.ubicationDataService.get().then(function(n){e.ubications=n}).catch(function(e){console.log(e)})},e.prototype.filterByTramiteState=function(e){var n=this,t="";this.estados_tramites.forEach(function(e){e.id==n.idTramiteEstadoFilter&&(t=e.name)}),this.config.filtering=void 0!==e?"-"==e?{filterString:t}:{filterString:t+" - "+e}:{filterString:t},this.onChangeTable(this.config)},e.prototype.getRegistersMintur=function(){var e=this;this.registers_mintur=[],this.consultorDataService.get_registers_assigned_inspector_id(this.user.id).then(function(n){e.registers_mintur=n,e.buildDataTable()}).catch(function(e){return console.log(e)})},e.prototype.buildDataTable=function(){var e=this;this.columns=[{title:"",name:"selected"},{title:"N\xfamero de RUC",name:"number"},{title:"N\xfamero de Establecimiento",name:"ruc_code_id"},{title:"Nombre Comercial",name:"establishment"},{title:"Sistema de Origen",name:"system_source"},{title:"Bandeja",name:"status"},{title:"Actividad",name:"actividad"},{title:"Provincia",name:"provincia"},{title:"Cant\xf3n",name:"canton"},{title:"Parroquia",name:"parroquia"},{title:"Direcci\xf3n",name:"address"},{title:"Clasificaci\xf3n - Categor\xeda",name:"category"},{title:"Fecha de Solicitud",name:"created_at"},{title:"N\xfamero de Registro",name:"code"},{title:"Fecha de Asignaci\xf3n",name:"date_assigment"}];var n=[];this.registers_mintur.forEach(function(t){var l="",i=new Date,a=e.getRegisterState(t.states.state_id,t.activity_id);0==a.search("Aprobado")&&(i=new Date(t.states.updated_at)),0==a.search("Negado")&&(i=new Date(t.states.updated_at));var o=new Date(t.register.created_at),r=Math.abs(o.getTime()-i.getTime()),s=Math.ceil(r/864e5);s<7&&(l='<div class="col-12 text-center"><span class="badge badge-success">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>=7&&s<=10&&(l='<div class="col-12 text-center"><span class="badge badge-warning">&nbsp;'+s.toString()+"&nbsp;</span></div>"),s>10&&(l='<div class="col-12 text-center"><span class="badge badge-danger">&nbsp;'+s.toString()+"&nbsp;</span></div>");var u=t.states.state_id.toString(),c=u.substring(u.length-1,u.length),d=new h.a,g=new h.a,p=new h.a;new h.a,e.ubications.forEach(function(e){e.id==t.establishment.ubication_id&&(p=e)}),e.ubications.forEach(function(e){e.code==p.father_code&&(g=e)}),e.ubications.forEach(function(e){e.code==g.father_code&&(d=e)}),e.ubications.forEach(function(e){});var f="";if(f="5"==t.states.state_id.toString().substring(0,1)||"60"==t.states.state_id.toString()?""==t.register_data_on_catastro.classification?e.getRegisterCategory(t.register.register_type_id,t.activity_id).toString():t.register_data_on_catastro.classification.toString()+" - "+t.register_data_on_catastro.category.toString():e.getRegisterCategory(t.register.register_type_id,t.activity_id).toString(),"4"==c||"5"==c||"6"==c){var m=new Date(t.register.created_at.toString());n.push({selected:"",date_assigment_alert:l,number:t.ruc.number,date_assigment:new Date(t.register.date_assigment.toString()).toLocaleDateString(),registerId:t.register.id,actividad:t.activity,provincia:d.name,canton:g.name,parroquia:p.name,ruc_code_id:t.establishment.ruc_code_id,establishment:t.establishment.commercially_known_name,address:t.establishment.address_main_street+" "+t.establishment.address_number+" "+t.establishment.address_secondary_street,created_at:m.toLocaleDateString(),code:t.register.code,category:f.toUpperCase(),catastro_category:t.register_data_on_catastro.category.toUpperCase(),catastro_classification:t.register_data_on_catastro.classification.toUpperCase(),system_source:t.register_data_on_catastro.system_source,status:a,status_id:t.states.state_id})}}),this.data=n,this.onChangeTable(this.config)},e.prototype.getRegisterCategory=function(e,n){var t="",l="";return 1==n&&(this.register_types_block.register_types_alojamiento.forEach(function(n){n.id==e&&(t=n.name,l=n.father_code)}),this.register_types_block.register_types_alojamiento.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),2==n&&(this.register_types_block.register_types_alimentos_bebidas.forEach(function(n){n.id==e&&(t=n.name,"Pendiente"==n.name&&(t="No Cumple Inspecci\xf3n (No Tur\xedstico)"),l=n.father_code)}),this.register_types_block.register_types_alimentos_bebidas.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),3==n&&(this.register_types_block.register_types_operacion_intermediacion.forEach(function(n){n.id==e&&(t=n.name,l=n.father_code)}),this.register_types_block.register_types_operacion_intermediacion.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),t},e.prototype.getRegisterState=function(e,n){var t="",l="";return 1==n&&(this.states.alojamiento.forEach(function(n){n.id==e&&(t=n.name,l=n.father_code)}),this.states.alojamiento.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),2==n&&(this.states.alimentos_bebidas.forEach(function(n){n.id==e&&(t=n.name,l=n.father_code)}),this.states.alimentos_bebidas.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),3==n&&(this.states.operacion_intermediacion.forEach(function(n){n.id==e&&(t=n.name,l=n.father_code)}),this.states.operacion_intermediacion.forEach(function(e){e.code==l&&(t=e.name+" - "+t)})),t},e.prototype.onChangeTable=function(e,n){var t={page:this.currentPageMinturRegisters,itemsPerPage:this.recordsByPageRegisterMintur};e.filtering&&Object.assign(this.config.filtering,e.filtering),e.sorting&&Object.assign(this.config.sorting,e.sorting);var l=this.changeFilter(this.data,this.config),i=this.changeSort(l,this.config);this.rows=t&&e.paging?this.changePage(t,i):i},e.prototype.changeFilter=function(e,n){var t=this;this.rows.forEach(function(e){e.selected=""});var l=e;if(this.columns.forEach(function(e){e.filtering&&(l=l.filter(function(n){return n[e.name].toUpperCase().match(e.filtering.filterString.toUpperCase())}))}),!n.filtering)return l;if(n.filtering.columnName)return l.filter(function(e){return e[n.filtering.columnName].match(t.config.filtering.filterString)});var i=[];return l.forEach(function(e){var n=!1;t.columns.forEach(function(l){e[l.name].toString().match(t.config.filtering.filterString)&&(n=!0)}),n&&i.push(e)}),l=i},e.prototype.changeSort=function(e,n){if(!n.sorting)return e;for(var t=this.config.sorting.columns||[],l=void 0,i=void 0,a=0;a<t.length;a++)""!==t[a].sort&&!1!==t[a].sort&&(l=t[a].name,i=t[a].sort);return l?e.sort(function(e,n){return e[l]>n[l]?"desc"===i?-1:1:e[l]<n[l]?"asc"===i?-1:1:0}):e},e.prototype.changePage=function(e,n){void 0===n&&(n=this.data);var t=(e.page-1)*e.itemsPerPage;return n.slice(t,e.itemsPerPage>-1?t+e.itemsPerPage:n.length)},e.prototype.onCellClick=function(e){var n=e.row.actividad,t=e.row.registerId,l={row:e.row,register:{register:null,activity_id:0,activity:"",establishment:new m.a,ruc:new f.a,states:null,register_data_on_catastro:null}};this.rows.forEach(function(n){n.selected=e.row==n?'<div class="col-12 text-right"><span class="far fa-hand-point-right"></span></div>':""}),this.registers_mintur.forEach(function(e){e.register.id==t&&e.activity==n&&(l.register=e)}),this.change.emit(l)},e}(),y=l["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function w(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,1,"input",[["class","form-control"],["placeholder","Buscar..."]],null,[[null,"input"]],function(e,n,t){var i=!0,a=e.component;return"input"===n&&(i=!1!==l["\u0275nov"](e,1).onChangeFilter(t.target.value)&&i),"input"===n&&(i=!1!==a.onChangeTable(a.config)&&i),i},null,null)),l["\u0275did"](1,16384,null,0,r.NgTableFilteringDirective,[l.ElementRef,l.Renderer],{ngTableFiltering:[0,"ngTableFiltering"]},null)],function(e,n){e(n,1,0,n.component.config.filtering)},null)}function R(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),l["\u0275did"](1,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](2,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](3,null,["",""]))],function(e,n){e(n,1,0,l["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,"")),e(n,2,0,l["\u0275inlineInterpolate"](1,"",n.context.$implicit.id,""))},function(e,n){e(n,3,0,n.context.$implicit.name)})}function P(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,34,"div",[["class","input-group-append"]],null,null,null,null,null)),(e()(),l["\u0275eld"](1,0,null,null,33,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,n,t){var i=!0,a=e.component;return"change"===n&&(i=!1!==l["\u0275nov"](e,2).onChange(t.target.value)&&i),"blur"===n&&(i=!1!==l["\u0275nov"](e,2).onTouched()&&i),"ngModelChange"===n&&(i=!1!==(a.tramite=t)&&i),"change"===n&&(i=!1!==a.filterByTramiteState(a.tramite)&&i),i},null,null)),l["\u0275did"](2,16384,null,0,s.o,[l.Renderer2,l.ElementRef],null,null),l["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),l["\u0275did"](4,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),l["\u0275prd"](2048,null,s.i,null,[s.m]),l["\u0275did"](6,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),l["\u0275eld"](7,0,null,null,3,"option",[["selected",""],["value","-"]],null,null,null,null,null)),l["\u0275did"](8,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](9,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Todas"])),(e()(),l["\u0275eld"](11,0,null,null,3,"option",[["selected",""],["value","Registro"]],null,null,null,null,null)),l["\u0275did"](12,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](13,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Registro"])),(e()(),l["\u0275eld"](15,0,null,null,3,"option",[["selected",""],["value","Reclasificaci\xf3n"]],null,null,null,null,null)),l["\u0275did"](16,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](17,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Reclasificaci\xf3n"])),(e()(),l["\u0275eld"](19,0,null,null,3,"option",[["selected",""],["value","Recategorizaci\xf3n"]],null,null,null,null,null)),l["\u0275did"](20,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](21,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Recategorizaci\xf3n"])),(e()(),l["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","Actualizaci\xf3n"]],null,null,null,null,null)),l["\u0275did"](24,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](25,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Actualizaci\xf3n"])),(e()(),l["\u0275eld"](27,0,null,null,3,"option",[["selected",""],["value","Inactivaci\xf3n"]],null,null,null,null,null)),l["\u0275did"](28,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](29,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Inactivaci\xf3n"])),(e()(),l["\u0275eld"](31,0,null,null,3,"option",[["selected",""],["value","Reingreso"]],null,null,null,null,null)),l["\u0275did"](32,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](33,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Reingreso"]))],function(e,n){e(n,4,0,"filter-tramite-estado",n.component.tramite),e(n,8,0,"-"),e(n,9,0,"-"),e(n,12,0,"Registro"),e(n,13,0,"Registro"),e(n,16,0,"Reclasificaci\xf3n"),e(n,17,0,"Reclasificaci\xf3n"),e(n,20,0,"Recategorizaci\xf3n"),e(n,21,0,"Recategorizaci\xf3n"),e(n,24,0,"Actualizaci\xf3n"),e(n,25,0,"Actualizaci\xf3n"),e(n,28,0,"Inactivaci\xf3n"),e(n,29,0,"Inactivaci\xf3n"),e(n,32,0,"Reingreso"),e(n,33,0,"Reingreso")},function(e,n){e(n,1,0,l["\u0275nov"](n,6).ngClassUntouched,l["\u0275nov"](n,6).ngClassTouched,l["\u0275nov"](n,6).ngClassPristine,l["\u0275nov"](n,6).ngClassDirty,l["\u0275nov"](n,6).ngClassValid,l["\u0275nov"](n,6).ngClassInvalid,l["\u0275nov"](n,6).ngClassPending)})}function M(e){return l["\u0275vid"](0,[(e()(),l["\u0275ted"](-1,null,["Primera"]))],null,null)}function S(e){return l["\u0275vid"](0,[(e()(),l["\u0275ted"](-1,null,["Anterior"]))],null,null)}function k(e){return l["\u0275vid"](0,[(e()(),l["\u0275ted"](-1,null,["Siguiente"]))],null,null)}function E(e){return l["\u0275vid"](0,[(e()(),l["\u0275ted"](-1,null,["\xdaltima"]))],null,null)}function x(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,15,"ngb-pagination",[["role","navigation"]],null,[[null,"pageChange"]],function(e,n,t){var l=!0,i=e.component;return"pageChange"===n&&(l=!1!==(i.currentPageMinturRegisters=t)&&l),"pageChange"===n&&(l=!1!==i.onChangeTable(i.config,t)&&l),l},a.g,a.d)),l["\u0275did"](1,573440,null,6,u.C,[u.D],{boundaryLinks:[0,"boundaryLinks"],collectionSize:[1,"collectionSize"],maxSize:[2,"maxSize"],page:[3,"page"],pageSize:[4,"pageSize"]},{pageChange:"pageChange"}),l["\u0275qud"](335544320,1,{tplEllipsis:0}),l["\u0275qud"](335544320,2,{tplFirst:0}),l["\u0275qud"](335544320,3,{tplLast:0}),l["\u0275qud"](335544320,4,{tplNext:0}),l["\u0275qud"](335544320,5,{tplNumber:0}),l["\u0275qud"](335544320,6,{tplPrevious:0}),(e()(),l["\u0275and"](0,null,null,1,null,M)),l["\u0275did"](9,16384,[[2,4]],0,u.E,[l.TemplateRef],null,null),(e()(),l["\u0275and"](0,null,null,1,null,S)),l["\u0275did"](11,16384,[[6,4]],0,u.I,[l.TemplateRef],null,null),(e()(),l["\u0275and"](0,null,null,1,null,k)),l["\u0275did"](13,16384,[[4,4]],0,u.H,[l.TemplateRef],null,null),(e()(),l["\u0275and"](0,null,null,1,null,E)),l["\u0275did"](15,16384,[[3,4]],0,u.F,[l.TemplateRef],null,null)],function(e,n){var t=n.component;e(n,1,0,!0,t.data.length,10,t.currentPageMinturRegisters,t.recordsByPageRegisterMintur)},null)}function O(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,36,"div",[["class","row"]],null,null,null,null,null)),(e()(),l["\u0275eld"](1,0,null,null,1,"h1",[["class","col-12 text-right"]],null,null,null,null,null)),(e()(),l["\u0275ted"](-1,null,[" Registros - MINTUR "])),(e()(),l["\u0275eld"](3,0,null,null,27,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),l["\u0275eld"](4,0,null,null,26,"div",[["class","btn-toolbar"],["role","toolbar"]],null,null,null,null,null)),(e()(),l["\u0275eld"](5,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),l["\u0275eld"](6,0,null,null,1,"button",[["class","btn btn-primary"],["title","Actualizar"],["type","button"]],null,[[null,"click"]],function(e,n,t){var l=!0;return"click"===n&&(l=!1!==e.component.refresh()&&l),l},null,null)),(e()(),l["\u0275eld"](7,0,null,null,0,"i",[["class","fas fa-sync"]],null,null,null,null,null)),(e()(),l["\u0275eld"](8,0,null,null,2,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),l["\u0275and"](16777216,null,null,1,null,w)),l["\u0275did"](10,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),l["\u0275eld"](11,0,null,null,19,"div",[["class","btn-group mr-2"],["role","group"]],null,null,null,null,null)),(e()(),l["\u0275eld"](12,0,null,null,18,"div",[["class","input-group"]],null,null,null,null,null)),(e()(),l["\u0275eld"](13,0,null,null,3,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(e()(),l["\u0275eld"](14,0,null,null,2,"span",[["class","input-group-text"]],null,null,null,null,null)),(e()(),l["\u0275eld"](15,0,null,null,0,"i",[["class","fas fa-search"]],null,null,null,null,null)),(e()(),l["\u0275ted"](-1,null,["\xa0Bandejas"])),(e()(),l["\u0275eld"](17,0,null,null,11,"select",[["class","form-control"],["id","filter-tramite-estado"],["name","filter-tramite-estado"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,n,t){var i=!0,a=e.component;return"change"===n&&(i=!1!==l["\u0275nov"](e,18).onChange(t.target.value)&&i),"blur"===n&&(i=!1!==l["\u0275nov"](e,18).onTouched()&&i),"ngModelChange"===n&&(i=!1!==(a.idTramiteEstadoFilter=t)&&i),"change"===n&&(i=!1!==a.filterByTramiteState()&&i),i},null,null)),l["\u0275did"](18,16384,null,0,s.o,[l.Renderer2,l.ElementRef],null,null),l["\u0275prd"](1024,null,s.h,function(e){return[e]},[s.o]),l["\u0275did"](20,671744,null,0,s.m,[[8,null],[8,null],[8,null],[6,s.h]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),l["\u0275prd"](2048,null,s.i,null,[s.m]),l["\u0275did"](22,16384,null,0,s.j,[[4,s.i]],null,null),(e()(),l["\u0275eld"](23,0,null,null,3,"option",[["selected",""],["value","0"]],null,null,null,null,null)),l["\u0275did"](24,147456,null,0,s.n,[l.ElementRef,l.Renderer2,[2,s.o]],{value:[0,"value"]},null),l["\u0275did"](25,147456,null,0,s.t,[l.ElementRef,l.Renderer2,[8,null]],{value:[0,"value"]},null),(e()(),l["\u0275ted"](-1,null,["Todas"])),(e()(),l["\u0275and"](16777216,null,null,1,null,R)),l["\u0275did"](28,278528,null,0,c.NgForOf,[l.ViewContainerRef,l.TemplateRef,l.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),l["\u0275and"](16777216,null,null,1,null,P)),l["\u0275did"](30,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),l["\u0275eld"](31,0,null,null,2,"div",[["class","col-12 mt-2"],["style","width: 100%; overflow-x: auto;"]],null,null,null,null,null)),(e()(),l["\u0275eld"](32,0,null,null,1,"ng-table",[],null,[[null,"cellClicked"],[null,"tableChanged"]],function(e,n,t){var l=!0,i=e.component;return"cellClicked"===n&&(l=!1!==i.onCellClick(t)&&l),"tableChanged"===n&&(l=!1!==i.onChangeTable(i.config)&&l),l},d.b,d.a)),l["\u0275did"](33,49152,null,0,g.NgTableComponent,[p.DomSanitizer],{rows:[0,"rows"],config:[1,"config"],columns:[2,"columns"]},{tableChanged:"tableChanged",cellClicked:"cellClicked"}),(e()(),l["\u0275eld"](34,0,null,null,2,"div",[["class","col-12"]],null,null,null,null,null)),(e()(),l["\u0275and"](16777216,null,null,1,null,x)),l["\u0275did"](36,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(e,n){var t=n.component;e(n,10,0,t.config.filtering),e(n,20,0,"filter-tramite-estado",t.idTramiteEstadoFilter),e(n,24,0,"0"),e(n,25,0,"0"),e(n,28,0,t.estados_tramites),e(n,30,0,t.idTramiteEstadoFilter>0),e(n,33,0,t.rows,t.config,t.columns),e(n,36,0,t.config.paging)},function(e,n){e(n,17,0,l["\u0275nov"](n,22).ngClassUntouched,l["\u0275nov"](n,22).ngClassTouched,l["\u0275nov"](n,22).ngClassPristine,l["\u0275nov"](n,22).ngClassDirty,l["\u0275nov"](n,22).ngClassValid,l["\u0275nov"](n,22).ngClassInvalid,l["\u0275nov"](n,22).ngClassPending)})}var T=function(){function e(){}return e.prototype.ngOnInit=function(){},e}(),I=l["\u0275crt"]({encapsulation:0,styles:[['.onoffswitch[_ngcontent-%COMP%]{position:relative;width:90px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.onoffswitch-checkbox[_ngcontent-%COMP%]{display:none}.onoffswitch-label[_ngcontent-%COMP%]{display:block;overflow:hidden;cursor:pointer;border:2px solid #999;border-radius:20px}.onoffswitch-inner[_ngcontent-%COMP%]{display:block;width:200%;margin-left:-100%;transition:margin .3s ease-in 0s}.onoffswitch-inner[_ngcontent-%COMP%]:after, .onoffswitch-inner[_ngcontent-%COMP%]:before{display:block;float:left;width:50%;height:30px;padding:0;line-height:30px;font-size:14px;font-family:Trebuchet,Arial,sans-serif;font-weight:700;box-sizing:border-box}.onoffswitch-inner[_ngcontent-%COMP%]:before{content:"SI";padding-left:21px;background-color:#5ebd79;color:#fff}.onoffswitch-inner[_ngcontent-%COMP%]:after{content:"NO";padding-right:21px;background-color:#eee;color:#999;text-align:right}.onoffswitch-switch[_ngcontent-%COMP%]{display:block;width:30px;margin:0;background:#fff;position:absolute;top:0;bottom:0;right:56px;border:2px solid #999;border-radius:20px;transition:all .3s ease-in 0s}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-inner[_ngcontent-%COMP%]{margin-left:0}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-switch[_ngcontent-%COMP%]{right:0}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]{background-color:#218838}input[_ngcontent-%COMP%]:focus + .slider[_ngcontent-%COMP%]{box-shadow:0 0 1px #218838}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]:before{-webkit-transform:translateX(26px);transform:translateX(26px)}.slider.round[_ngcontent-%COMP%]{border-radius:34px}.slider.round[_ngcontent-%COMP%]:before{border-radius:50%}']],data:{}});function D(e){return l["\u0275vid"](0,[],null,null)}var j=t("DaJy"),F=t("Guh9"),N=t("teKj"),z=t("SwDF"),A=t("jbLj"),U=t("2Tfx"),B=function(){function e(e,n,t,l,i){this.consultorDataService=e,this.state_alojamiento_DataService=n,this.state_alimentos_bebidas_DataService=t,this.userDataService=l,this.state_operacion_intermediacion_DataService=i,this.showBandejas=!1,this.showDataRegisterSelected=!1,this.user=new b.a,this.data_selected={row:null,register:{register:null,activity_id:0,activity:"",establishment:new m.a,ruc:new f.a,states:null,register_data_on_catastro:null}},this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.register_types=[],this.register_types_block={register_types_alojamiento:[],register_types_alimentos_bebidas:[],register_types_operacion_intermediacion:[]}}return e.prototype.ngOnInit=function(){this.showBandejas=!1,this.getStates()},e.prototype.getStates=function(){var e=this;this.estados_tramites=[],this.states={alojamiento:[],alimentos_bebidas:[],operacion_intermediacion:[]},this.state_alojamiento_DataService.get().then(function(n){e.states.alojamiento=n,e.buildEstadostramite(e.states.alojamiento),e.state_alimentos_bebidas_DataService.get().then(function(n){e.states.alimentos_bebidas=n,e.buildEstadostramite(e.states.alimentos_bebidas),e.state_operacion_intermediacion_DataService.get().then(function(n){e.states.operacion_intermediacion=n,e.buildEstadostramite(e.states.operacion_intermediacion),e.getRegisterTypes()}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})},e.prototype.buildEstadostramite=function(e){var n=this;e.forEach(function(e){if("-"==e.father_code&&"Documentaci\xf3n Entregada"!=e.name){var t=!1;n.estados_tramites.forEach(function(n){n.name==e.name&&(t=!0)}),t||n.estados_tramites.push(e)}}),this.estados_tramites.sort(function(e,n){return e.name>n.name?1:e.name<n.name?-1:0})},e.prototype.getRegisterTypes=function(){var e=this;this.register_types=[];var n=[],t=[],l=[];this.consultorDataService.get_all_register_types().then(function(i){e.register_types=i,e.register_types.forEach(function(e){1==e.activity_id&&n.push(e.register_type),2==e.activity_id&&t.push(e.register_type),3==e.activity_id&&l.push(e.register_type)}),e.register_types_block.register_types_alojamiento=n,e.register_types_block.register_types_alimentos_bebidas=t,e.register_types_block.register_types_operacion_intermediacion=l,e.getUser()}).catch(function(e){console.log(e)})},e.prototype.getUser=function(){var e=this;this.userDataService.get(JSON.parse(sessionStorage.getItem("user")).id).then(function(n){e.user=n,e.showBandejas=!0}).catch(function(e){return console.log(e)})},e.prototype.register_selected=function(e){this.data_selected=e,this.showDataRegisterSelected=null!=e.row},e}(),L=l["\u0275crt"]({encapsulation:0,styles:[['.onoffswitch[_ngcontent-%COMP%]{position:relative;width:90px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.onoffswitch-checkbox[_ngcontent-%COMP%]{display:none}.onoffswitch-label[_ngcontent-%COMP%]{display:block;overflow:hidden;cursor:pointer;border:2px solid #999;border-radius:20px}.onoffswitch-inner[_ngcontent-%COMP%]{display:block;width:200%;margin-left:-100%;transition:margin .3s ease-in 0s}.onoffswitch-inner[_ngcontent-%COMP%]:after, .onoffswitch-inner[_ngcontent-%COMP%]:before{display:block;float:left;width:50%;height:30px;padding:0;line-height:30px;font-size:14px;font-family:Trebuchet,Arial,sans-serif;font-weight:700;box-sizing:border-box}.onoffswitch-inner[_ngcontent-%COMP%]:before{content:"SI";padding-left:21px;background-color:#5ebd79;color:#fff}.onoffswitch-inner[_ngcontent-%COMP%]:after{content:"NO";padding-right:21px;background-color:#eee;color:#999;text-align:right}.onoffswitch-switch[_ngcontent-%COMP%]{display:block;width:30px;margin:0;background:#fff;position:absolute;top:0;bottom:0;right:56px;border:2px solid #999;border-radius:20px;transition:all .3s ease-in 0s}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-inner[_ngcontent-%COMP%]{margin-left:0}.onoffswitch-checkbox[_ngcontent-%COMP%]:checked + .onoffswitch-label[_ngcontent-%COMP%]   .onoffswitch-switch[_ngcontent-%COMP%]{right:0}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]{background-color:#218838}input[_ngcontent-%COMP%]:focus + .slider[_ngcontent-%COMP%]{box-shadow:0 0 1px #218838}input[_ngcontent-%COMP%]:checked + .slider[_ngcontent-%COMP%]:before{-webkit-transform:translateX(26px);transform:translateX(26px)}.slider.round[_ngcontent-%COMP%]{border-radius:34px}.slider.round[_ngcontent-%COMP%]:before{border-radius:50%}']],data:{}});function q(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,1,"app-inspector-bandejas-data",[],null,[[null,"register_selected"]],function(e,n,t){var l=!0;return"register_selected"===n&&(l=!1!==e.component.register_selected(t)&&l),l},O,y)),l["\u0275did"](1,638976,null,0,C,[_.a,v.a],{user:[0,"user"],estados_tramites:[1,"estados_tramites"],states:[2,"states"],register_types_block:[3,"register_types_block"]},{change:"register_selected"})],function(e,n){var t=n.component;e(n,1,0,t.user,t.estados_tramites,t.states,t.register_types_block)},null)}function V(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,1,"app-inspector-gestion-data",[],null,null,null,D,I)),l["\u0275did"](1,114688,null,0,T,[],null,null)],function(e,n){e(n,1,0)},null)}function Y(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,1,"app-register-data",[],null,null,null,j.b,j.a)),l["\u0275did"](1,638976,null,0,F.a,[_.a],{data_selected_table:[0,"data_selected_table"]},null)],function(e,n){e(n,1,0,n.component.data_selected)},null)}function G(e){return l["\u0275vid"](0,[(e()(),l["\u0275and"](16777216,null,null,1,null,q)),l["\u0275did"](1,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),l["\u0275and"](16777216,null,null,1,null,V)),l["\u0275did"](3,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(e()(),l["\u0275and"](16777216,null,null,1,null,Y)),l["\u0275did"](5,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(e,n){var t=n.component;e(n,1,0,t.showBandejas),e(n,3,0,t.showDataRegisterSelected),e(n,5,0,t.showDataRegisterSelected)},null)}function K(e){return l["\u0275vid"](0,[(e()(),l["\u0275eld"](0,0,null,null,1,"app-cliente-interno-inspector",[],null,null,null,G,L)),l["\u0275did"](1,114688,null,0,B,[_.a,z.a,A.a,N.a,U.a],null,null)],function(e,n){e(n,1,0)},null)}var Q=l["\u0275ccf"]("app-cliente-interno-inspector",B,K,{},{},[]),X=t("BBZF"),J=t("Izlp"),Z=t("Ry/H"),H=t("rhjU"),W=t("sE5F"),$=t("dV+S"),ee=t("ZYCi"),ne=t("3Cp6"),te=t("rPlE"),le=t("H9RC"),ie=t("yipI"),ae=t("+Uyi"),oe=t("KhKY"),re=t("SSr2"),se=t("0Zic"),ue=t("FVSd"),ce=t("wG/G"),de=t("A65b"),ge=t("z89T"),pe=t("hx3Q"),fe=t("wftt"),me=t("BRoz"),he=t("b1Qd"),_e=t("iYF/"),be=t("N6VH"),ve=t("ALPY"),Ce=t("rCiw"),ye=t("7q7Q"),we=t("rYF7"),Re=t("vUtf"),Pe=t("1wkq"),Me=t("tCKL"),Se=t("tZdX"),ke=t("eiqJ"),Ee=t("7WnB"),xe=t("FExI"),Oe=t("FhSF"),Te=t("078p"),Ie=t("8Kln"),De=t("LqiL"),je=t("EiH4"),Fe=t("V63N"),Ne=t("vUqE"),ze=t("QkQD"),Ae=t("3Nac"),Ue=t("GSUL"),Be=t("eYel"),Le=t("mjTs"),qe=t("Xzm7"),Ve=t("UGkY"),Ye=t("XEkc"),Ge=t("7ePi"),Ke=t("+o/m"),Qe=t("/fSM"),Xe=t("jVYb"),Je=t("kY/A"),Ze=function(){return function(){}}(),He=t("524+"),We=t("Vw1a");t.d(n,"ClienteInternoInspectorModuleNgFactory",function(){return $e});var $e=l["\u0275cmf"](i,[],function(e){return l["\u0275mod"]([l["\u0275mpd"](512,l.ComponentFactoryResolver,l["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,a.b,a.l,a.m,a.i,a.j,a.k,o.a,Q]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[l.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),l["\u0275mpd"](4608,s.s,s.s,[]),l["\u0275mpd"](4608,u.y,u.y,[l.ComponentFactoryResolver,l.Injector,u.tb,u.z]),l["\u0275mpd"](4608,X.c,X.c,[]),l["\u0275mpd"](4608,X.b,X.b,[]),l["\u0275mpd"](4608,J.a,Z.b,[[2,Z.a],X.c,X.b]),l["\u0275mpd"](4608,H.b,H.b,[c.DOCUMENT,l.PLATFORM_ID]),l["\u0275mpd"](4608,N.a,N.a,[W.e]),l["\u0275mpd"](4608,$.a,$.a,[W.e,ee.l]),l["\u0275mpd"](4608,ne.a,ne.a,[W.e,ee.l]),l["\u0275mpd"](4608,te.a,te.a,[W.e,ee.l]),l["\u0275mpd"](4608,le.a,le.a,[W.e,ee.l]),l["\u0275mpd"](4608,ie.a,ie.a,[W.e,ee.l]),l["\u0275mpd"](4608,ae.a,ae.a,[W.e,ee.l]),l["\u0275mpd"](4608,oe.a,oe.a,[W.e,ee.l]),l["\u0275mpd"](4608,_.a,_.a,[W.e,ee.l]),l["\u0275mpd"](4608,re.a,re.a,[W.e,ee.l]),l["\u0275mpd"](4608,se.a,se.a,[W.e,ee.l]),l["\u0275mpd"](4608,ue.a,ue.a,[W.e,ee.l]),l["\u0275mpd"](4608,ce.a,ce.a,[W.e,ee.l]),l["\u0275mpd"](4608,de.a,de.a,[W.e,ee.l]),l["\u0275mpd"](4608,ge.a,ge.a,[W.e,ee.l]),l["\u0275mpd"](4608,pe.a,pe.a,[W.e,ee.l]),l["\u0275mpd"](4608,fe.a,fe.a,[W.e,ee.l]),l["\u0275mpd"](4608,me.a,me.a,[W.e,ee.l]),l["\u0275mpd"](4608,he.a,he.a,[W.e,ee.l]),l["\u0275mpd"](4608,_e.a,_e.a,[W.e,ee.l]),l["\u0275mpd"](4608,be.a,be.a,[W.e,ee.l]),l["\u0275mpd"](4608,ve.a,ve.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ce.a,Ce.a,[W.e,ee.l]),l["\u0275mpd"](4608,ye.a,ye.a,[W.e,ee.l]),l["\u0275mpd"](4608,we.a,we.a,[W.e,ee.l]),l["\u0275mpd"](4608,Re.a,Re.a,[W.e,ee.l]),l["\u0275mpd"](4608,Pe.a,Pe.a,[W.e,ee.l]),l["\u0275mpd"](4608,Me.a,Me.a,[W.e,ee.l]),l["\u0275mpd"](4608,Se.a,Se.a,[W.e,ee.l]),l["\u0275mpd"](4608,ke.a,ke.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ee.a,Ee.a,[W.e,ee.l]),l["\u0275mpd"](4608,xe.a,xe.a,[W.e,ee.l]),l["\u0275mpd"](4608,Oe.a,Oe.a,[W.e,ee.l]),l["\u0275mpd"](4608,Te.a,Te.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ie.a,Ie.a,[W.e,ee.l]),l["\u0275mpd"](4608,De.a,De.a,[W.e,ee.l]),l["\u0275mpd"](4608,je.a,je.a,[W.e,ee.l]),l["\u0275mpd"](4608,Fe.a,Fe.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ne.a,Ne.a,[W.e,ee.l]),l["\u0275mpd"](4608,ze.a,ze.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ae.a,Ae.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ue.a,Ue.a,[W.e,ee.l]),l["\u0275mpd"](4608,Be.a,Be.a,[W.e,ee.l]),l["\u0275mpd"](4608,v.a,v.a,[W.e,ee.l]),l["\u0275mpd"](4608,Le.a,Le.a,[W.e,ee.l]),l["\u0275mpd"](4608,qe.a,qe.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ve.a,Ve.a,[W.e,ee.l]),l["\u0275mpd"](4608,Ye.a,Ye.a,[W.e,ee.l]),l["\u0275mpd"](4608,z.a,z.a,[W.e,ee.l]),l["\u0275mpd"](4608,A.a,A.a,[W.e,ee.l]),l["\u0275mpd"](4608,U.a,U.a,[W.e,ee.l]),l["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),l["\u0275mpd"](1073742336,s.p,s.p,[]),l["\u0275mpd"](1073742336,s.e,s.e,[]),l["\u0275mpd"](1073742336,u.c,u.c,[]),l["\u0275mpd"](1073742336,u.f,u.f,[]),l["\u0275mpd"](1073742336,u.g,u.g,[]),l["\u0275mpd"](1073742336,u.k,u.k,[]),l["\u0275mpd"](1073742336,u.l,u.l,[]),l["\u0275mpd"](1073742336,u.q,u.q,[]),l["\u0275mpd"](1073742336,u.v,u.v,[]),l["\u0275mpd"](1073742336,u.A,u.A,[]),l["\u0275mpd"](1073742336,u.G,u.G,[]),l["\u0275mpd"](1073742336,u.Q,u.Q,[]),l["\u0275mpd"](1073742336,u.T,u.T,[]),l["\u0275mpd"](1073742336,u.W,u.W,[]),l["\u0275mpd"](1073742336,u.bb,u.bb,[]),l["\u0275mpd"](1073742336,u.fb,u.fb,[]),l["\u0275mpd"](1073742336,u.gb,u.gb,[]),l["\u0275mpd"](1073742336,u.hb,u.hb,[]),l["\u0275mpd"](1073742336,u.B,u.B,[]),l["\u0275mpd"](1073742336,Ge.b,Ge.b,[]),l["\u0275mpd"](1073742336,Ke.b,Ke.b,[]),l["\u0275mpd"](1073742336,Qe.a,Qe.a,[]),l["\u0275mpd"](1073742336,Xe.b,Xe.b,[]),l["\u0275mpd"](1073742336,Je.Ng2TableModule,Je.Ng2TableModule,[]),l["\u0275mpd"](1073742336,H.a,H.a,[]),l["\u0275mpd"](1073742336,ee.o,ee.o,[[2,ee.u],[2,ee.l]]),l["\u0275mpd"](1073742336,Ze,Ze,[]),l["\u0275mpd"](1073742336,He.a,He.a,[]),l["\u0275mpd"](1073742336,We.a,We.a,[]),l["\u0275mpd"](1073742336,i,i,[]),l["\u0275mpd"](1024,ee.j,function(){return[[{path:"",component:B}]]},[]),l["\u0275mpd"](256,Z.a,{apiKey:"AIzaSyCGUwCcM-LKjRK4rjbBJ06_GLmX2LaYzfg"},[])])})}}]);