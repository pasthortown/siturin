(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"2Tfx":function(t,n,e){"use strict";e.d(n,"a",function(){return a});var i=e("sE5F"),o=e("AytR"),r=e("CcnG"),l=e("ZYCi"),a=function(){function t(t,n){this.http=t,this.router=n,this.url=o.a.api_operacionintermediacion+"state/",this.options=new i.g,this.options.headers=new i.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return t.prototype.get=function(t){var n=this;return void 0===t?this.http.get(this.url,this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())}):this.http.get(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.get_paginate=function(t,n){var e=this;return this.http.get(this.url+"paginate?size="+t.toString()+"&page="+n.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){e.handledError(t.json())})},t.prototype.delete=function(t){var n=this;return this.http.delete(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.getBackUp=function(){var t=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(t){return t.json()}).catch(function(n){t.handledError(n.json())})},t.prototype.post=function(t){var n=this;return this.http.post(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.put=function(t){var n=this;return this.http.put(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.masiveLoad=function(t){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:t}),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.handledError=function(t){console.log(t),sessionStorage.clear(),this.router.navigate(["/login"])},t.ngInjectableDef=r.defineInjectable({factory:function(){return new t(r.inject(i.e),r.inject(l.l))},token:t,providedIn:"root"}),t}()},DaJy:function(t,n,e){"use strict";var i=e("CcnG"),o=e("tddJ"),r=e("YOWm"),l=e("FVSd"),a=e("A65b"),s=e("3EpR"),u=e("N6VH"),c=e("iYF/"),d=e("PGlD"),h=e("cg1/"),p=e("iNZF"),f=e("EiH4"),_=e("8Kln"),g=e("078p"),b=e("tCKL"),m=e("eiqJ"),v=e("1wkq"),I=e("LqiL"),y=e("m3oD"),j=e("Ifwe"),k=e("463z"),w=e("vUtf"),S=e("qjJ9"),P=e("VUAy"),E=e("ALPY"),T=e("rCiw"),C=e("rYF7"),R=e("7q7Q"),D=e("4GxJ"),N=e("vNRs"),q=e("3x0t"),x=e("ZYCi"),J=e("H9RC"),Y=e("wftt"),A=e("7WnB"),F=e("FExI"),G=e("FhSF"),O=e("+Uyi"),U=e("V63N"),V=e("vUqE"),Z=e("QkQD"),L=e("z89T"),X=e("eYel"),z=e("GSUL"),B=e("tZdX"),K=e("yipI"),H=e("KhKY"),Q=e("rPlE"),M=e("3Cp6"),W=e("3Nac"),$=e("9AJC"),tt=e("Ip0R"),nt=e("hikz"),et=e("kP4Z"),it=e("wG/G");e("Guh9"),e.d(n,"a",function(){return ot}),e.d(n,"b",function(){return _t});var ot=i["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function rt(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,1,"app-ruc-data",[],null,[[null,"ruc_validated"],[null,"next_page_button_click"]],function(t,n,e){var i=!0,o=t.component;return"ruc_validated"===n&&(i=!1!==o.ruc_validated(e)&&i),"next_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),i},o.b,o.a)),i["\u0275did"](1,638976,null,0,r.a,[l.a,a.a,s.a,u.a,c.a],{user:[0,"user"],editable:[1,"editable"]},{ruc_validated:"ruc_validated",next_page_button_click:"next_page_button_click"})],function(t,n){var e=n.component;t(n,1,0,e.user,e.isEditable)},null)}function lt(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,1,"app-establishment-data",[],null,[[null,"establishment_validated"],[null,"preview_page_button_click"],[null,"next_page_button_click"]],function(t,n,e){var i=!0,o=t.component;return"establishment_validated"===n&&(i=!1!==o.establishment_validated(e)&&i),"preview_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),"next_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),i},d.b,d.a)),i["\u0275did"](1,638976,null,0,h.a,[s.a,p.a,f.a,l.a,_.a,g.a,b.a,m.a,v.a,I.a,y.a],{establishment_incomming:[0,"establishment_incomming"],ruc:[1,"ruc"],editable:[2,"editable"],min_data:[3,"min_data"]},{establishment_validated:"establishment_validated",preview_page_button_click:"preview_page_button_click",next_page_button_click:"next_page_button_click"})],function(t,n){var e=n.component;t(n,1,0,e.data_selected_table.register.establishment,e.data_selected_table.register.ruc,e.isEditable,!1)},null)}function at(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,1,"app-pay-list-data",[],null,null,null,j.b,j.a)),i["\u0275did"](1,638976,null,0,k.a,[w.a],{ruc_number:[0,"ruc_number"]},null),(t()(),i["\u0275eld"](2,0,null,null,1,"app-declaration-data",[],null,[[null,"canContinue"],[null,"preview_page_button_click"],[null,"next_page_button_click"]],function(t,n,e){var i=!0,o=t.component;return"canContinue"===n&&(i=!1!==o.showTuristicInformation(e)&&i),"preview_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),"next_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),i},S.b,S.a)),i["\u0275did"](3,638976,null,0,P.a,[s.a,p.a,E.a,T.a,C.a,R.a],{ruc:[0,"ruc"],establishment:[1,"establishment"],is_new_register:[2,"is_new_register"],editable:[3,"editable"]},{preview_page_button_click:"preview_page_button_click",next_page_button_click:"next_page_button_click",canContinue:"canContinue"})],function(t,n){var e=n.component;t(n,1,0,e.user.ruc),t(n,3,0,e.data_selected_table.register.ruc,e.data_selected_table.register.establishment,!1,e.isEditable)},null)}function st(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,5,"ngb-tab",[["id","paso2"],["title","Paso 2.- Declaraci\xf3n de la Contribuci\xf3n Uno por Mil"]],null,null,null,null,null)),i["\u0275did"](1,2113536,[[8,4]],2,D.X,[],{id:[0,"id"],title:[1,"title"]},null),i["\u0275qud"](603979776,11,{titleTpls:1}),i["\u0275qud"](603979776,12,{contentTpls:1}),(t()(),i["\u0275and"](0,null,null,1,null,at)),i["\u0275did"](5,16384,[[12,4]],0,D.Y,[i.TemplateRef],null,null)],function(t,n){t(n,1,0,"paso2","Paso 2.- Declaraci\xf3n de la Contribuci\xf3n Uno por Mil")},null)}function ut(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,1,"app-turistic-data",[],null,[[null,"preview_page_button_click"],[null,"salir_forced"]],function(t,n,e){var i=!0,o=t.component;return"preview_page_button_click"===n&&(i=!1!==o.change_page_button_click(e)&&i),"salir_forced"===n&&(i=!1!==o.salir_turistic_information()&&i),i},N.b,N.a)),i["\u0275did"](1,638976,null,0,q.a,[s.a,x.l,v.a,p.a,J.a,Y.a,y.a,A.a,F.a,G.a,O.a,U.a,V.a,Z.a,L.a,X.a,z.a,B.a,K.a,H.a,Q.a,M.a,W.a],{user:[0,"user"],ruc:[1,"ruc"],establishment:[2,"establishment"],register:[3,"register"],editable:[4,"editable"],registers_by_ruc:[5,"registers_by_ruc"],is_new_register:[6,"is_new_register"],specific_register_type_id:[7,"specific_register_type_id"]},{salir_forced:"salir_forced",preview_page_button_click:"preview_page_button_click"})],function(t,n){var e=n.component;t(n,1,0,e.user,e.data_selected_table.register.ruc,e.data_selected_table.register.establishment,e.data_selected_table.register.register,e.isEditable,e.registers_by_ruc,!1,!0)},null)}function ct(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,5,"ngb-tab",[["id","paso3"],["title","Paso 3.- Informaci\xf3n Tur\xedstica del Establecimiento"]],null,null,null,null,null)),i["\u0275did"](1,2113536,[[8,4]],2,D.X,[],{id:[0,"id"],title:[1,"title"]},null),i["\u0275qud"](603979776,13,{titleTpls:1}),i["\u0275qud"](603979776,14,{contentTpls:1}),(t()(),i["\u0275and"](0,null,null,1,null,ut)),i["\u0275did"](5,16384,[[14,4]],0,D.Y,[i.TemplateRef],null,null)],function(t,n){t(n,1,0,"paso3","Paso 3.- Informaci\xf3n Tur\xedstica del Establecimiento")},null)}function dt(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,12,"ngb-tabset",[],null,[[null,"tabChange"]],function(t,n,e){var i=!0;return"tabChange"===n&&(i=!1!==t.component.changeTabActive(e)&&i),i},$.h,$.e)),i["\u0275did"](1,2146304,[[2,4],["pasos",4]],1,D.Z,[D.ab],null,{tabChange:"tabChange"}),i["\u0275qud"](603979776,8,{tabs:1}),(t()(),i["\u0275eld"](3,0,null,null,5,"ngb-tab",[["id","paso1"],["title","Paso 1.- Datos Generales del Establecimiento"]],null,null,null,null,null)),i["\u0275did"](4,2113536,[[8,4]],2,D.X,[],{id:[0,"id"],title:[1,"title"]},null),i["\u0275qud"](603979776,9,{titleTpls:1}),i["\u0275qud"](603979776,10,{contentTpls:1}),(t()(),i["\u0275and"](0,null,null,1,null,lt)),i["\u0275did"](8,16384,[[10,4]],0,D.Y,[i.TemplateRef],null,null),(t()(),i["\u0275and"](16777216,null,null,1,null,st)),i["\u0275did"](10,16384,null,0,tt.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),i["\u0275and"](16777216,null,null,1,null,ct)),i["\u0275did"](12,16384,null,0,tt.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,n){var e=n.component;t(n,4,0,"paso1","Paso 1.- Datos Generales del Establecimiento"),t(n,10,0,e.mostrarDeclarations),t(n,12,0,e.mostrarInformacionTuristica&&"tax_declaration"!=e.opcion_seleccionada)},null)}function ht(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,1,"app-establishment-list-data",[],null,[[null,"establishment_selected"]],function(t,n,e){var i=!0;return"establishment_selected"===n&&(i=!1!==t.component.establishmentSelected(e)&&i),i},nt.b,nt.a)),i["\u0275did"](1,638976,null,0,et.a,[v.a,l.a,it.a,s.a],{ruc_number:[0,"ruc_number"],ruc_code_id:[1,"ruc_code_id"]},{change:"establishment_selected"}),(t()(),i["\u0275and"](16777216,null,null,1,null,dt)),i["\u0275did"](3,16384,null,0,tt.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),i["\u0275and"](0,null,null,0))],function(t,n){var e=n.component;t(n,1,0,e.user.ruc,e.data_selected_table.register.establishment.ruc_code_id),t(n,3,0,e.mostrarPasosInferiores)},null)}function pt(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,5,"ngb-tab",[["id","pasoII"],["title","Paso II. Informaci\xf3n del Establecimiento"]],null,null,null,null,null)),i["\u0275did"](1,2113536,[[3,4]],2,D.X,[],{id:[0,"id"],title:[1,"title"]},null),i["\u0275qud"](603979776,6,{titleTpls:1}),i["\u0275qud"](603979776,7,{contentTpls:1}),(t()(),i["\u0275and"](0,null,null,1,null,ht)),i["\u0275did"](5,16384,[[7,4]],0,D.Y,[i.TemplateRef],null,null)],function(t,n){t(n,1,0,"pasoII","Paso II. Informaci\xf3n del Establecimiento")},null)}function ft(t){return i["\u0275vid"](0,[(t()(),i["\u0275eld"](0,0,null,null,15,"div",[["class","row"]],null,null,null,null,null)),(t()(),i["\u0275eld"](1,0,null,null,2,"div",[["class","col-12 text-left"]],null,null,null,null,null)),(t()(),i["\u0275eld"](2,0,null,null,1,"h3",[],null,null,null,null,null)),(t()(),i["\u0275ted"](-1,null,["Datos:"])),(t()(),i["\u0275eld"](4,0,null,null,11,"div",[["class","col-12"]],null,null,null,null,null)),(t()(),i["\u0275eld"](5,0,null,null,10,"ngb-tabset",[],null,[[null,"tabChange"]],function(t,n,e){var i=!0;return"tabChange"===n&&(i=!1!==t.component.changeTabActiveSuperior(e)&&i),i},$.h,$.e)),i["\u0275did"](6,2146304,[[1,4],["pasosSuperiores",4]],1,D.Z,[D.ab],null,{tabChange:"tabChange"}),i["\u0275qud"](603979776,3,{tabs:1}),(t()(),i["\u0275eld"](8,0,null,null,5,"ngb-tab",[["id","pasoI"],["title","Paso I. Informaci\xf3n de la Persona Natural / Jur\xeddica"]],null,null,null,null,null)),i["\u0275did"](9,2113536,[[3,4]],2,D.X,[],{id:[0,"id"],title:[1,"title"]},null),i["\u0275qud"](603979776,4,{titleTpls:1}),i["\u0275qud"](603979776,5,{contentTpls:1}),(t()(),i["\u0275and"](0,null,null,1,null,rt)),i["\u0275did"](13,16384,[[5,4]],0,D.Y,[i.TemplateRef],null,null),(t()(),i["\u0275and"](16777216,null,null,1,null,pt)),i["\u0275did"](15,16384,null,0,tt.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,n){var e=n.component;t(n,9,0,"pasoI","Paso I. Informaci\xf3n de la Persona Natural / Jur\xeddica"),t(n,15,0,e.mostrarEstablecimientos)},null)}function _t(t){return i["\u0275vid"](0,[i["\u0275qud"](671088640,1,{pasosSuperioresTabSet:0}),i["\u0275qud"](671088640,2,{pasosTabSet:0}),(t()(),i["\u0275and"](16777216,null,null,1,null,ft)),i["\u0275did"](3,16384,null,0,tt.NgIf,[i.ViewContainerRef,i.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,n){t(n,3,0,n.component.mostrarIngresoDatos)},null)}},Guh9:function(t,n,e){"use strict";e.d(n,"a",function(){return l}),e("iNZF");var i=e("XqKP"),o=e("qYr5"),r=e("c4FF"),l=function(){function t(t){this.consultorDataService=t,this.data_selected_table={row:null,register:{register:null,activity_id:0,activity:"",establishment:new i.a,ruc:new o.a,states:null,register_data_on_catastro:null}},this.registers_by_ruc=[],this.user=new r.a,this.mostrarEstablecimientos=!1,this.mostrarPasosInferiores=!1,this.mostrarDeclarations=!1,this.mostrarInformacionTuristica=!1,this.mostrarIngresoDatos=!1,this.tabActive="paso1",this.tabActiveSuperior="tab1",this.isEditable=!1}return t.prototype.ngOnInit=function(){this.refresh()},t.prototype.ngOnChanges=function(){this.refresh()},t.prototype.refresh=function(){null!=this.data_selected_table.register.register?(this.user.ruc=this.data_selected_table.register.ruc.number,this.data_selected_table.register.register.activity_id=this.data_selected_table.register.activity_id,this.mostrarIngresoDatos=!0,this.getRegistersByRuc()):(this.user.ruc="",this.mostrarIngresoDatos=!1)},t.prototype.getRegistersByRuc=function(){var t=this;this.consultorDataService.get_registers_by_ruc(this.user.ruc).then(function(n){t.registers_by_ruc=n}).catch(function(t){console.log(t)})},t.prototype.showTuristicInformation=function(t){this.mostrarInformacionTuristica=t},t.prototype.establishment_validated=function(t){this.data_selected_table.register.register.provincia_code=t.establishment.provincia_code,this.mostrarDeclarations=t.showNext},t.prototype.salir_turistic_information=function(){this.pasosTabSet.select("paso2")},t.prototype.establishmentSelected=function(t){this.mostrarPasosInferiores=t.showData,this.mostrarDeclarations=!1,this.mostrarInformacionTuristica=!1},t.prototype.change_page_button_click=function(t){"Paso I"==t&&this.pasosSuperioresTabSet.select("pasoI"),"Paso II"==t&&this.pasosSuperioresTabSet.select("pasoII"),"Paso 1"==t&&this.pasosTabSet.select("paso1"),"Paso 2"==t&&this.pasosTabSet.select("paso2"),"Paso 3"==t&&this.pasosTabSet.select("paso3")},t.prototype.ruc_validated=function(t){this.mostrarEstablecimientos=!0,this.mostrarPasosInferiores=!1},t.prototype.changeTabActive=function(t){this.tabActive=t.nextId},t.prototype.changeTabActiveSuperior=function(t){this.tabActiveSuperior=t.nextId},t}()},SwDF:function(t,n,e){"use strict";e.d(n,"a",function(){return a});var i=e("sE5F"),o=e("AytR"),r=e("CcnG"),l=e("ZYCi"),a=function(){function t(t,n){this.http=t,this.router=n,this.url=o.a.api_alojamiento+"state/",this.options=new i.g,this.options.headers=new i.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return t.prototype.get=function(t){var n=this;return void 0===t?this.http.get(this.url,this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())}):this.http.get(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.get_paginate=function(t,n){var e=this;return this.http.get(this.url+"paginate?size="+t.toString()+"&page="+n.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){e.handledError(t.json())})},t.prototype.delete=function(t){var n=this;return this.http.delete(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.getBackUp=function(){var t=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(t){return t.json()}).catch(function(n){t.handledError(n.json())})},t.prototype.post=function(t){var n=this;return this.http.post(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.put=function(t){var n=this;return this.http.put(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.masiveLoad=function(t){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:t}),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.handledError=function(t){console.log(t),sessionStorage.clear(),this.router.navigate(["/login"])},t.ngInjectableDef=r.defineInjectable({factory:function(){return new t(r.inject(i.e),r.inject(l.l))},token:t,providedIn:"root"}),t}()},Vw1a:function(t,n,e){"use strict";e.d(n,"a",function(){return i});var i=function(){return function(){}}()},jbLj:function(t,n,e){"use strict";e.d(n,"a",function(){return a});var i=e("sE5F"),o=e("AytR"),r=e("CcnG"),l=e("ZYCi"),a=function(){function t(t,n){this.http=t,this.router=n,this.url=o.a.api_alimentosbebidas+"state/",this.options=new i.g,this.options.headers=new i.d,this.options.headers.append("api_token",sessionStorage.getItem("api_token"))}return t.prototype.get=function(t){var n=this;return void 0===t?this.http.get(this.url,this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())}):this.http.get(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.get_paginate=function(t,n){var e=this;return this.http.get(this.url+"paginate?size="+t.toString()+"&page="+n.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){e.handledError(t.json())})},t.prototype.delete=function(t){var n=this;return this.http.delete(this.url+"?id="+t.toString(),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.getBackUp=function(){var t=this;return this.http.get(this.url+"backup",this.options).toPromise().then(function(t){return t.json()}).catch(function(n){t.handledError(n.json())})},t.prototype.post=function(t){var n=this;return this.http.post(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.put=function(t){var n=this;return this.http.put(this.url,JSON.stringify(t),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.masiveLoad=function(t){var n=this;return this.http.post(this.url+"masive_load",JSON.stringify({data:t}),this.options).toPromise().then(function(t){return t.json()}).catch(function(t){n.handledError(t.json())})},t.prototype.handledError=function(t){console.log(t),sessionStorage.clear(),this.router.navigate(["/login"])},t.ngInjectableDef=r.defineInjectable({factory:function(){return new t(r.inject(i.e),r.inject(l.l))},token:t,providedIn:"root"}),t}()}}]);