!function(e){function o(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var t={};o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="/",o(o.s=1)}([function(e,o){e.exports={debug:!1,defaultLang:"fr",target:["_blank","_self","_parent","_top","framename"]}},function(e,o,t){t(2),wgs={searchwidget:{CONSTANT:t(0),RecommendationPlugin:t(3)}}},function(e,o){window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var o,t=(this.document||this.ownerDocument).querySelectorAll(e),s=this;do{for(o=t.length;--o>=0&&t.item(o)!==s;);}while(o<0&&(s=s.parentElement));return s}),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)})},function(e,o,t){function s(e,o){this.manager=null,this.ui=null,o.container=e,this.config=new n(o);var t=this.config.options.usePlaces;if(this.mapsLoader=new i({clientId:this.config.options.google.clientId,channelId:this.config.options.google.channel,key:this.config.options.google.key,librariesToLoad:["places"],region:this.config.options.google.region,language:this.config.options.google.language}),this.container=document.querySelector(e),null===this.container)throw new Error("querySelector for "+e+" returned null.");this.mapsLoader.load(function(){this.ui=new r(this.container,t,this,this.config),this.manager=new a(this,this.config)}.bind(this))}var n=t(4),i=t(5),r=t(6),a=t(10);e.exports=s},function(e,o,t){function s(e){return e&&"object"==typeof e&&!Array.isArray(e)}function n(e,o){if(s(e)&&s(o))for(var t in o)o.hasOwnProperty(t)&&(s(o[t])?(e[t]||(e[t]={}),n(e[t],o[t])):e[t]=o[t]);return e}function i(e){this.options={container:"",woosmapKey:"",google:{clientId:"",channel:""},urls:{store:{href:!1,target:"_self"},stores:{href:"https://developers.woosmap.com/",target:"_self"}},usePlaces:!0,autocompletePlaces:{minLength:1,types:["geocode"]},geocoder:{region:"fr"},woosmap:{query:"",limit:5,maxDistance:0},display:{recommendation:{address:!0,phone:!0,openingDay:!0,openingWeek:!0},search:{address:!0,openingDay:!0,openingWeek:!0}},lang:"fr",translations:{fr:{searchAroundMeBtn:"Autour de moi",searchAroundMeTitle:"Rechercher le centre à proximité",selectAroundMeTitle:"Choisissez le centre à proximité :",autocompletePlaceholder:"Spécifiez une adresse",allStores:"Tous nos centres",changeStore:"Centre à proximité",findStore:"Choisir mon centre",selectStore:"Choisir",openingHoursDay:"Ouvert aujourd'hui :",openingHoursWeek:"",geolocationNotice:"La géolocalisation n'est pas activée sur votre navigateur. Veuillez changez vos préférences.",geolocationErrHttps:"Votre position géographique n’a pas été renvoyée par votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.",geolocationErrBlocked:"La géolocalisation n'est pas activée sur votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.",telephone:"Tél :",closeBtn:"Fermer",open24:"24h/24",days:{1:{full:"Lundi",short:"Lun"},2:{full:"Mardi",short:"Mar"},3:{full:"Mercredi",short:"Mer"},4:{full:"Jeudi",short:"Jeu"},5:{full:"Vendredi",short:"Ven"},6:{full:"Samedi",short:"Sam"},7:{full:"Dimanche",short:"Dim"}}}}},this.L10n={},this.extend(e),this.initializeL10n()}var r=t(0);i.prototype.initializeL10n=function(){var e=(this.options.lang&&this.options.lang,this.options.lang);e&&(this.options.translations.hasOwnProperty(e)?this.L10n=this.options.translations[e]:(console.warn("translations lang '"+e+"' not found"),this.L10n=this.options.translations[r.defaultLang]))},i.prototype.extend=function(e){n(this.options,e),this.checkConfig(this.options)},i.prototype.checkConfig=function(e){if(void 0===e.container)throw new Error("the container (html locator) is undefined");if("string"!=typeof e.container)throw new Error("the container (html locator) must be a string");if(""===e.container.replace(" ",""))throw new Error("the container (html locator) is empty");if(void 0===e.woosmapKey)throw new Error("woosmapKey (public key) is undefined");if("string"!=typeof e.woosmapKey)throw new Error("woosmapKey (public key) must be a string");if(""===e.woosmapKey.replace(" ",""))throw new Error("woosmapKey (public key) is empty");if(void 0===e.google)throw new Error("google options is not defined");if("object"!=typeof e.google)throw new Error("google options must be an object");if(void 0===e.google.clientId&&void 0===e.google.key)throw new Error("google clientId or api key must be defined");if(void 0!==e.google.clientId){if("string"!=typeof e.google.clientId)throw new Error("google clientId must be a string");if(""===e.google.clientId.replace(" ",""))throw new Error("google clientId is empty");if(void 0!==e.google.channel&&"string"!=typeof e.google.channel)throw new Error("google client channel must be a string")}else if(void 0!==e.google.key){if("string"!=typeof e.google.key)throw new Error("google api key must be a string");if(""===e.google.key.replace(" ",""))throw new Error("google api key is empty")}if(void 0!==e.google.language){if("string"!=typeof e.google.language)throw new Error("google api language must be a string");if(2!==e.google.language.length)throw new Error("google api language format is not valid")}if(void 0!==e.google.region){if("string"!=typeof e.google.region)throw new Error("google api region must be a string");if(2!==e.google.language.length)throw new Error("google api region format is not valid")}if(void 0!==e.urls){if(void 0!==e.urls.stores){if("string"!=typeof e.urls.stores.href)throw new Error("urls.stores.href must be a string");if(void 0!==e.urls.stores.target){if("string"!=typeof e.urls.stores.target)throw new Error("urls.stores.target must be a string");if(-1===wgs.searchwidget.CONSTANT.target.indexOf(e.urls.stores.target))throw new Error("urls.stores.target must be : "+wgs.searchwidget.CONSTANT.target.join(", "))}}if(void 0!==e.urls.store){if(void 0!==e.urls.store.href&&"string"!=typeof e.urls.store.href&&"boolean"!=typeof e.urls.store.href)throw new Error("urls.stores.href must be a string or boolean");if(void 0!==e.urls.store.target){if("string"!=typeof e.urls.store.target)throw new Error("urls.store.target must be a string");if(-1===wgs.searchwidget.CONSTANT.target.indexOf(e.urls.store.target))throw new Error("urls.store.target must be : "+wgs.searchwidget.CONSTANT.target.join(", "))}}}if(void 0!==e.usePlaces&&"boolean"!=typeof e.usePlaces)throw new Error("usePlaces must be a boolean");if(void 0!==e.autocompletePlaces){if("number"!=typeof e.autocompletePlaces.minLength)throw new Error("autocompletePlaces.minLength must be a number");if(void 0!==e.autocompletePlaces.bounds){if("object"!=typeof e.autocompletePlaces.bounds)throw new Error("autocompletePlaces.bounds must be an object {west: <number>, north: <number>, south: <number>, east: <number>}");if(void 0===e.autocompletePlaces.bounds.west)throw new Error("autocompletePlaces.bounds.west is missing");if("number"!=typeof e.autocompletePlaces.bounds.west)throw new Error("autocompletePlaces.bounds.west must be a number");if(void 0===e.autocompletePlaces.bounds.north)throw new Error("autocompletePlaces.bounds.north is missing");if("number"!=typeof e.autocompletePlaces.bounds.north)throw new Error("autocompletePlaces.bounds.north must be a number");if(void 0===e.autocompletePlaces.bounds.south)throw new Error("autocompletePlaces.bounds.south is missing");if("number"!=typeof e.autocompletePlaces.bounds.south)throw new Error("autocompletePlaces.bounds.south must be a number");if(void 0===e.autocompletePlaces.bounds.east)throw new Error("autocompletePlaces.bounds.east is missing");if("number"!=typeof e.autocompletePlaces.bounds.east)throw new Error("autocompletePlaces.bounds.east must be a number")}if(void 0!==e.autocompletePlaces.types&&!Array.isArray(e.autocompletePlaces.types))throw new Error("autocompletePlaces.types must be an array of string, e.g: ['geocode']");if(void 0!==e.autocompletePlaces.componentRestrictions&&"object"!=typeof e.autocompletePlaces.componentRestrictions)throw new Error("autocompletePlaces.componentRestrictions must be a Google GeocoderComponentRestrictions object")}if(void 0!==e.display){if(void 0!==e.display.h12&&"boolean"!=typeof e.display.h12)throw new Error("display.h12 option (AM/PM) must be a boolean");if(void 0!==e.display.search){if("object"!=typeof e.display.search)throw new Error("display search option must be an object");if(void 0!==e.display.search.openingDay&&"boolean"!=typeof e.display.search.openingDay)throw new Error("display.search.openingDay option must be a boolean");if(void 0!==e.display.search.openingWeek&&"boolean"!=typeof e.display.search.openingWeek)throw new Error("display.search.openingWeek option must be a boolean");if(void 0!==e.display.search.address&&"boolean"!=typeof e.display.search.address)throw new Error("display.search.address option must be a boolean")}if(void 0!==e.display.recommendation){if("object"!=typeof e.display.recommendation)throw new Error("display.recommendation.option must be an object");if(void 0!==e.display.recommendation.openingDay&&"boolean"!=typeof e.display.recommendation.openingDay)throw new Error("display.recommendation.openingDay option must be a boolean");if(void 0!==e.display.recommendation.openingWeek&&"boolean"!=typeof e.display.recommendation.openingWeek)throw new Error("display.recommendation.openingWeek option must be a boolean");if(void 0!==e.display.recommendation.address&&"boolean"!=typeof e.display.recommendation.address)throw new Error("display.recommendation.address option must be a boolean");if(void 0!==e.display.recommendation.phone&&"boolean"!=typeof e.display.recommendation.phone)throw new Error("display.recommendation.phone option must be a boolean")}}if(void 0===e.lang)throw new Error("autocompletePlaces.lang is undefined, e.g: 'fr'");if("string"!=typeof e.lang)throw new Error("autocompletePlaces.lang must be a string");if(void 0===e.translations[e.lang])throw new Error("translations for the lang '"+e.lang+"' are not found");if("object"!=typeof e.translations[e.lang])throw new Error("translations must be an object");for(var o in e.translations[e.lang])if(e.translations[e.lang].hasOwnProperty(o))if("days"===o){if("object"!=typeof e.translations[e.lang][o])throw new Error("translations."+e.lang+"."+o+" must be an object (days list)")}else if("string"!=typeof e.translations[e.lang][o])throw new Error("translations."+e.lang+"."+o+" must be a string")},e.exports=i},function(e,o){function t(e,o){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=e;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s),t.readyState?t.onreadystatechange=function(){"complete"===this.readyState||"loaded"===this.readyState?o():console.error("Error when loading script "+e)}:(t.onload=function(){o()},t.onerror=function(){console.error("Error when loading script "+e)})}function s(e){this.clientId=e.clientId,this.apiKey=e.key,this.channel=e.channelId,this.librariesToLoad=e.librariesToLoad||[],this.language=e.language||"fr",this.region=e.region||void 0,this.version=e.version||"3"}s.prototype.load=function(e){var o="";this.librariesToLoad.length>0&&(o="&libraries="+this.librariesToLoad.join(",")),t("https://www.google.com/jsapi",function(){var t="language="+this.language;this.region&&(t+="&region="+this.region),this.clientId&&(t+="&client="+this.clientId),this.apiKey&&(t+="&key="+this.apiKey),this.channel&&(t+="&channel="+this.channel),google.load("maps",this.version,{other_params:t+o,callback:function(){e&&e()}})}.bind(this))},e.exports=s},function(e,o,t){function s(e,o,t,s){this.plugin=t,this.container=e,this.config=s;var a=this.config.L10n;this.container.innerHTML='<div class="gr-wgs-homestore-container"><div class="gr-wgs-homestore-mainBlock"></div><div id="gr-wgs-homestore-panel"><div class="gr-wgs-homestore-panel-searchBlock"><div class="gr-wgs-homestore-panel-searchBlock-warning">'+a.geolocationNotice+'</div></div><div class="gr-wgs-homestore-panel-loaderBlock"></div><div class="gr-wgs-homestore-panel-resultBlock"><div class="gr-wgs-homestore-panel-resultBlock-title">'+a.selectAroundMeTitle+'</div><ul class="gr-wgs-homestore-panel-resultBlock-listBlock"></ul></div><div class="gr-wgs-homestore-panel-footerBlock"><div class="gr-wgs-homestore-panel-footerBlock-allStores">'+(""!==this.config.options.urls.stores.href.replace(" ","")?a.allStores:"")+'</div><div class="gr-wgs-homestore-panel-footerBlock-closePanel">'+a.closeBtn+"</div></div></div></div>",this.mainContainer=this.container.querySelector(".gr-wgs-homestore-container"),this.headerContainer=this.container.querySelector(".gr-wgs-homestore-mainBlock"),this.panelContainer=this.container.querySelector("#gr-wgs-homestore-panel"),this.panelContainerSearch=this.container.querySelector(".gr-wgs-homestore-panel-searchBlock"),this.panelContainerSearchWarning=this.container.querySelector(".gr-wgs-homestore-panel-searchBlock-warning"),this.panelContainerResultsBlock=this.container.querySelector(".gr-wgs-homestore-panel-resultBlock"),this.panelContainerResultsList=this.container.querySelector(".gr-wgs-homestore-panel-resultBlock-listBlock"),this.panelContainerFooter=this.container.querySelector(".gr-wgs-homestore-panel-footerBlock"),new n(this.panelContainerSearch,this.plugin,this.config),this._searchManager=o?new i(this.panelContainerSearch,this.plugin,this.config):new r(this.panelContainerSearch,this.plugin,this.config),this.hideResultsBlock(),this.hideWarningHTML5();var l=this;this.panelContainer.querySelector(".gr-wgs-homestore-panel-footerBlock-allStores").addEventListener("click",function(){l.openAllStores()}),this.panelContainer.querySelector(".gr-wgs-homestore-panel-footerBlock-closePanel").addEventListener("click",function(){l.hideSearchPanel()}),this.onClickOutsideContainer()}var n=t(7),i=t(8),r=t(9);s.prototype.buildAddress=function(e){var o="",t="";if(e.properties.address.lines)for(var s=0;s<e.properties.address.lines.length;s++)""!==e.properties.address.lines[s]&&null!==e.properties.address.lines[s]&&(o+=" "+e.properties.address.lines[s]);return e.properties.address.zipcode&&""!==e.properties.address.zipcode&&(t+=e.properties.address.zipcode),e.properties.address.city&&""!==e.properties.address.city&&(t+=(""!==t?" ":"")+e.properties.address.city),o+=""!==o&&""!==t?'<span class="gr-wgs-homestore-mainBlock-yourStore-city">'+t:"</span>",e.properties.address.country_code&&""!==e.properties.address.country_code&&(o+='<span class="gr-wgs-homestore-mainBlock-yourStore-country"><span class="gr-wgs-homestore-mainBlock-yourStore-sep">, </span><span class="gr-wgs-homestore-mainBlock-yourStore-countrycode">'+e.properties.address.country_code+"</span></span>"),o},s.prototype.buildHTMLInitialReco=function(e){var o=this,t="",s="",n="",i="",r=e.properties.open,a=e.properties.opening_hours;void 0!==this.config.options.display.recommendation.address&&this.config.options.display.recommendation.address&&(t='<span class="gr-wgs-homestore-mainBlock-yourStore-address">'+this.buildAddress(e)+"</span>"),r&&void 0!==this.config.options.display.recommendation.openingDay&&this.config.options.display.recommendation.openingDay&&(n=this.buildHTMLOpeningHoursDay(e)),a&&void 0!==this.config.options.display.recommendation.openingWeek&&this.config.options.display.recommendation.openingWeek&&(i=this.buildHTMLOpeningHoursWeek(e)),void 0!==this.config.options.display.recommendation.phone&&this.config.options.display.recommendation.phone&&e.properties.contact&&""!==e.properties.contact.phone&&(s+='<span class="gr-wgs-homestore-mainBlock-yourStore-phone"><span class="gr-wgs-homestore-mainBlock-yourStore-phone-label">'+this.config.L10n.telephone+"</span> "+(e.properties.contact.phone?e.properties.contact.phone:"")+"</span>"),this.headerContainer.innerHTML='<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-yourStore"><span class="gr-wgs-homestore-mainBlock-yourStore-icon"></span><span class="gr-wgs-homestore-mainBlock-yourStore-change">'+this.config.L10n.changeStore+'</span><span class="gr-wgs-homestore-mainBlock-yourStore-name">'+e.properties.name+"</span>"+t+s+'<span class="gr-wgs-homestore-mainBlock-yourStore-openinghours">'+n+i+"</span></div>",this.headerContainer.querySelector(".gr-wgs-homestore-mainBlock-yourStore").addEventListener("click",function(){o.toggleSearchPanel()})},s.prototype.buildHTMLFindMyStore=function(){this.headerContainer.innerHTML='<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-findStore"><span class="gr-wgs-homestore-mainBlock-yourStore-icon"></span><span class="gr-wgs-homestore-mainBlock-yourStore-change">'+this.config.L10n.changeStore+'</span><span class="gr-wgs-homestore-mainBlock-yourStore-name">'+this.config.L10n.findStore+"</span></div>";var e=this;this.headerContainer.querySelector(".gr-wgs-homestore-mainBlock-findStore").addEventListener("click",function(){e.showSearchPanel()})},s.prototype.buildWarningHTML5=function(){this.container.insertAdjacentHTML("afterbegin",'<div class="gr-wgs-homestore-panel-searchBlock-warning"></div>')},s.prototype.onClickOutsideContainer=function(){window.addEventListener("click",function(e){this.isVisibleSearchPanel()&&e.target.getAttribute("id")!==this.config.options.container.replace("#","")&&this.hideSearchPanel()}.bind(this)),this.mainContainer.addEventListener("click",function(e){return e.stopPropagation(),!1})},s.prototype.isVisibleSearchPanel=function(){return this.panelContainer.classList.contains("gr-wgs-homestore-panel-open")},s.prototype.showSearchPanel=function(){this.panelContainer.classList.add("gr-wgs-homestore-panel-open")},s.prototype.hideSearchPanel=function(){this.panelContainer.classList.remove("gr-wgs-homestore-panel-open")},s.prototype.toggleSearchPanel=function(){this.isVisibleSearchPanel()?this.hideSearchPanel():this.showSearchPanel()},s.prototype.showResultsBlock=function(){this.panelContainerResultsBlock.style.display="block"},s.prototype.hideResultsBlock=function(){this.panelContainerResultsBlock.style.display="none"},s.prototype.slideDownWarningHTML5=function(e){this.panelContainerSearchWarning.innerText=e,this.panelContainerSearchWarning.style.display="block"},s.prototype.slideUpWarningHTML5=function(){this.panelContainerSearchWarning.style.display="none"},s.prototype.hideWarningHTML5=function(){this.panelContainerSearchWarning.style.display="none"},s.prototype.buildHTMLRecommendationResults=function(e){this.panelContainerResultsList.innerHTML="";for(var o=0;o<e.length;o++)this.buildHTMLStore(e[o]);this.showResultsBlock()},s.prototype.convertTo12Hrs=function(e,o){if(void 0===o&&(o=":"),void 0===e)return!1;if("string"!=typeof e)return!1;var t=e.split(o),s=parseInt(t[0]),n=s>12?"PM":"AM";return(s>12?s-12:s)+o+t[1]+" "+n},s.prototype.concatenateStoreHours=function(e){var o,t="";if(e){if(e["all-day"]||e.all_day)return this.config.L10n.open24?this.config.L10n.open24:"24h/24";for(var s in e)"object"==typeof e[s]&&(o=e[s].end,void 0!==this.config.options.display.h12&&this.config.options.display.h12?t+=this.convertTo12Hrs(e[s].start)+" - "+this.convertTo12Hrs(o):t+=e[s].start+" - "+o,s<e.length-1&&(t+=", "))}return t},s.prototype.generateHoursLiArray=function(e){for(var o=this,t=e.properties.opening_hours.usual,s=this.concatenateStoreHours(t.default),n=[],i=function(e,t,s){var i=o.config.L10n.days;""===s||(e===t?n.push("<li>"+i[e].full+": "+s+"</li>"):n.push("<li>"+i[e].short+"-"+i[t].short+": "+s+"</li>"))},r=0,a="",l="",c=1;c<8;c++)a="",(a=c in t?this.concatenateStoreHours(t[c]):s)!==l&&(i(r,c-1,l),r=c,l=a);return i(r,7,a),n},s.prototype.buildHTMLOpeningHoursDay=function(e){var o="",t=e.properties.open;if(t.open_hours.length>0){o+='<span class="gr-wgs-openinghours-day">'+this.config.L10n.openingHoursDay+"</span>",o+='<ul class="gr-wgs-openinghours-day-'+t.week_day+(t.opening_now?" gr-wgs-openinghours-opennow":"")+'">';for(var s=0;s<t.open_hours.length;s++)o+='<li class="gr-wgs-openinghours-day-slice">',void 0!==this.config.options.display.h12&&this.config.options.display.h12?o+=this.convertTo12Hrs(t.open_hours[s].start)+" - "+this.convertTo12Hrs(t.open_hours[s].end):o+=t.open_hours[s].start+" - "+t.open_hours[s].end,o+="</li>";o+="</ul>"}return o},s.prototype.buildHTMLOpeningHoursWeek=function(e){var o="",t=e.properties.opening_hours;return(t.usual.default&&t.usual.default.length>0||Object.keys(t.usual).length>1)&&(o+='<span class="gr-wgs-openinghours-week-btn">'+this.config.L10n.openingHoursWeek+"</span>",o+='<ul class="gr-wgs-openinghours-week">'+this.generateHoursLiArray(e).join("")+"</ul>"),o},s.prototype.buildHTMLStore=function(e){var o="",t="",s="",n=e.properties.open,i=e.properties.opening_hours,r=e.properties.distanceWithGoogle/1e3;void 0!==this.config.options.display.search.address&&this.config.options.display.search.address&&(o='<div class="gr-wgs-homestore-panel-resultBlock-listItem-address">'+this.buildAddress(e)+"</div>"),n&&void 0!==this.config.options.display.search.openingDay&&this.config.options.display.search.openingDay&&(t=this.buildHTMLOpeningHoursDay(e)),i&&void 0!==this.config.options.display.search.openingWeek&&this.config.options.display.search.openingWeek&&(s=this.buildHTMLOpeningHoursWeek(e));var a='<li class="gr-wgs-homestore-panel-resultBlock-listItem" data-id="'+e.properties.store_id+'"><span class="gr-wgs-homestore-panel-resultBlock-listItem-icon"></span><span class="gr-wgs-homestore-panel-resultBlock-listItem-infos"><div><div class="gr-wgs-homestore-panel-resultBlock-listItem-title">'+e.properties.name+'</div><div class="gr-wgs-homestore-panel-resultBlock-listItem-choose">'+this.config.L10n.selectStore+'</div><div class="gr-wgs-homestore-panel-resultBlock-listItem-distance">'+(isNaN(r)?"":"("+r.toFixed(1)+"km)")+"</div>"+o+'<div class="gr-wgs-homestore-panel-resultBlock-listItem-openinghours">'+t+s+"</div></div></span></li>";this.panelContainerResultsList.insertAdjacentHTML("beforeend",a),this.panelContainerResultsList.querySelector('.gr-wgs-homestore-panel-resultBlock-listItem[data-id="'+e.properties.store_id+'"]').addEventListener("click",function(){var o=e.geometry.coordinates,t=o[1],s=o[0];this.plugin.ui.resetStoreSearch(),this.hideSearchPanel(),this.plugin.ui.buildHTMLInitialReco(e),void 0!==window.localStorage&&window.localStorage.setItem(this.config.options.woosmapKey,JSON.stringify(e)),woosmapRecommendation.sendUserFavoritedPOI({lat:t,lng:s,id:e.properties.store_id,successCallback:function(){}.bind(this),errorCallback:function(){console.error("Error recommendation")}.bind(this)})}.bind(this))},s.prototype.resetStoreSearch=function(){this._searchManager.clearPanel()},s.prototype.openStore=function(e){var o;e.properties.contact&&e.properties.contact.website&&!1!==this.config.options.urls.store.target&&(!0===this.config.options.urls.store.href?o=e.properties.contact.website:"string"==typeof this.config.options.urls.store.href&&(o=this.config.options.urls.store.href),window.open(o,this.config.options.urls.store.target||"_self"))},s.prototype.openAllStores=function(){window.open(this.config.options.urls.stores.href,this.config.options.urls.stores.target||"_self")},s.prototype.showLoader=function(){this.panelContainer.querySelector(".gr-wgs-homestore-panel-loaderBlock").style.display="block;"},s.prototype.hideLoader=function(){this.panelContainer.querySelector(".gr-wgs-homestore-panel-loaderBlock").style.display="none;"},e.exports=s},function(e,o){function t(e,o,t){this.config=t,this.container=e,this.plugin=o,this.ERRORS={HTTPS:this.config.L10n.geolocationErrHttps,BLOCKED:this.config.L10n.geolocationErrBlocked},this.initialize()}t.prototype.initialize=function(){this.buildHTML(),this.defineEvents()},t.prototype.buildHTML=function(){var e='<div class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-aroundMe-btn">'+this.config.L10n.searchAroundMeBtn+"</div>";this.container.insertAdjacentHTML("afterbegin",e)},t.prototype.defineEvents=function(){var e=this,o=function(o){var t=o.coords.latitude,s=o.coords.longitude;e.plugin.manager.recommendStoresFromHTML5(t,s)},t=function(o){o&&o.message&&0===o.message.indexOf("Only secure origins are allowed")?e.plugin.ui.slideDownWarningHTML5(this.ERRORS.HTTPS):e.plugin.ui.slideDownWarningHTML5(this.ERRORS.BLOCKED)};this.container.querySelector(".gr-wgs-homestore-panel-aroundMe-btn").addEventListener("click",function(){navigator.geolocation.getCurrentPosition(o,t)})},e.exports=t},function(e,o){function t(e,o,t){this.config=t,this.plugin=o,this.container=e,this.containerPredictionsList=null,this.buildHTML()}t.prototype.buildHTML=function(){var e='<div class="gr-wgs-homestore-panel-address-wrapper"><label>'+this.config.L10n.searchAroundMeTitle+'</label><form class="gr-wgs-homestore-panel-searchBlock-form"><input class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-address-btn" type="text" placeholder="'+this.config.L10n.autocompletePlaceholder+'"/></form><div class="gr-wgs-homestore-panel-address-reset"></div></div><div class= "gr-wgs-homestore-panel-address-predictions gr-wgs-pac-container"></div>';this.container.insertAdjacentHTML("beforeend",e),this.containerPredictionsList=this.container.querySelector(".gr-wgs-homestore-panel-address-predictions");var o=this;this.container.querySelector("input").addEventListener("keyup",function(e){var t="gr-wgs-pac-item-selected",s=o.containerPredictionsList.querySelector(".gr-wgs-pac-item-selected"),n=o.containerPredictionsList.querySelector(".gr-wgs-pac-item"),i=o.containerPredictionsList.querySelector(".gr-wgs-pac-item:last-child");if(13===e.keyCode){var r=document.createEvent("MouseEvents");r.initEvent("click",!0,!0),null!==s?s.dispatchEvent(r):null!==n&&n.dispatchEvent(r)}else if(38===e.keyCode)if(s){var a=s.previousElementSibling;s.classList.remove(t),null===a?i.classList.add(t):a.classList.add(t)}else null!==i&&i.classList.add(t);else if(40===e.keyCode)if(s){var l=s.nextElementSibling;s.classList.remove(t),null===l?n.classList.add(t):l.classList.add(t)}else null!==n&&n.classList.add(t);else if(e.currentTarget.value.length>=this.config.options.autocompletePlaces.minLength){var c={input:o.container.querySelector("input").value};this.config.options.autocompletePlaces.bounds&&(c.bounds=this.config.options.autocompletePlaces.bounds),this.config.options.autocompletePlaces.types&&(c.types=this.config.options.autocompletePlaces.types),this.config.options.autocompletePlaces.componentRestrictions&&(c.componentRestrictions=this.config.options.autocompletePlaces.componentRestrictions),o.getPredictions(c,function(e){o.buildHTMLPredictions(e)},function(e){console.error(e)})}}.bind(this)),o.containerPredictionsList.addEventListener("click",function(e){var t=e.target.closest(".gr-wgs-pac-item"),s=t.getAttribute("data-place-id");o.container.querySelector("input").value=t.querySelector(".gr-wgs-pac-item-query").innerText,o.containerPredictionsList.style.display="none",o.getDetails(s)},!0),this.container.querySelector(".gr-wgs-homestore-panel-address-reset").addEventListener("click",function(){o.clearPanel()}),this.container.querySelector("form.gr-wgs-homestore-panel-searchBlock-form").addEventListener("submit",function(e){return e.preventDefault(),!1})},t.prototype.clearPanel=function(){this.container.querySelector("input").value="",this.containerPredictionsList.innerHTML="",this.containerPredictionsList.style.display="none",this.plugin.ui.hideResultsBlock()},t.prototype.buildHTMLPredictions=function(e){var o=this;this.containerPredictionsList.innerHTML="",this.containerPredictionsList.style.display=e.length>0?"block":"none";for(var t=0;t<e.length;t++)!function(e){var t='<div class="gr-wgs-pac-item" data-place-id="'+e.place_id+'"><span class="gr-wgs-pac-icon gr-wgs-pac-icon-marker"></span><span class="gr-wgs-pac-item-query">'+e.description+"</span></div>";o.containerPredictionsList.insertAdjacentHTML("beforeend",t)}(e[t])},t.prototype.getPredictions=function(e){var o=this;(new google.maps.places.AutocompleteService).getPlacePredictions(e,function(t,s){s===google.maps.places.PlacesServiceStatus.OK?o.buildHTMLPredictions(t):s===google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR||s===google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT?window.setTimeout(function(){o.getPredictions(e)},100):s===google.maps.places.PlacesServiceStatus.ZERO_RESULTS?o.buildHTMLPredictions([]):console.error(s)})},t.prototype.getDetails=function(e){var o=new google.maps.places.PlacesService(document.getElementsByClassName("gr-wgs-homestore-panel-address-btn")[0]),t=this,s={placeId:e};o.getDetails(s,function(o,s){if(s===google.maps.places.PlacesServiceStatus.OK){var n=o.geometry.location.lat(),i=o.geometry.location.lng();t.plugin.manager.recommendStoresFromSearch(n,i)}else s===google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR||s===google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT?window.setTimeout(function(){t.getDetails(e)},100):console.error(s)})},e.exports=t},function(e,o){function t(e,o,t){this.config=t,this.plugin=o,this.container=e,this.containerResultsList=null,this.buildHTML()}t.prototype.buildHTML=function(){var e='<div class="gr-wgs-homestore-panel-address-wrapper"><label>'+this.config.L10n.searchAroundMeTitle+'</label><form class="gr-wgs-homestore-panel-searchBlock-form"><input class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-address-btn" type="text" placeholder="'+this.config.L10n.autocompletePlaceholder+'"/></form><div class="gr-wgs-homestore-panel-address-reset"></div></div><div class= "gr-wgs-homestore-panel-address-results gr-wgs-pac-container"></div>';this.container.insertAdjacentHTML("beforeend",e),this.containerResultsList=this.container.querySelector(".gr-wgs-homestore-panel-address-results");var o=this;this.container.querySelector("input").addEventListener("keyup",function(e){var t="gr-wgs-pac-item-selected",s=o.containerResultsList.querySelector(".gr-wgs-pac-item-selected"),n=o.containerResultsList.querySelector(".gr-wgs-pac-item"),i=o.containerResultsList.querySelector(".gr-wgs-pac-item:last-child");if(13===e.keyCode){var r=document.createEvent("MouseEvents");if(r.initEvent("click",!0,!0),null!==s)s.dispatchEvent(r);else if(e.currentTarget.value.length>=1){var a=this.config.options.geocoder?this.config.options.geocoder:{};a.address=e.target.value,o.geocode(a)}}else if(38===e.keyCode)if(s){var l=s.previousElementSibling;s.classList.remove(t),null===l?i.classList.add(t):l.classList.add(t)}else null!==i&&i.classList.add(t);else if(40===e.keyCode)if(s){var c=s.nextElementSibling;s.classList.remove(t),null===c?n.classList.add(t):c.classList.add(t)}else null!==n&&n.classList.add(t)}.bind(this)),o.containerResultsList.addEventListener("click",function(e){var t=e.target,s=t.closest(".gr-wgs-pac-item"),n=s.getAttribute("data-lat"),i=s.getAttribute("data-lng");o.container.querySelector("input").value=s.querySelector(".gr-wgs-pac-item-query").innerText,o.askForStoresRecommendation(n,i),o.containerResultsList.style.display="none",o.containerResultsList.innerHTML=""},!0),o.container.querySelector(".gr-wgs-homestore-panel-address-reset").addEventListener("click",function(){o.clearPanel()}),this.container.querySelector("form.gr-wgs-homestore-panel-searchBlock-form").addEventListener("submit",function(e){return e.preventDefault(),!1})},t.prototype.clearPanel=function(){this.container.querySelector("input").value="",this.containerResultsList.style.display="none",this.containerResultsList.innerHTML="",this.plugin.ui.hideResultsBlock()},t.prototype.buildHTMLResults=function(e){var o=this;this.containerResultsList.innerHTML="",this.containerResultsList.style.display=e.length>0?"block":"none";for(var t=0;t<e.length;t++)!function(e){var t=e.geometry.location,s='<div class="gr-wgs-pac-item" data-lat="'+t.lat()+'" data-lng="'+t.lng()+'"><span class="gr-wgs-pac-icon gr-wgs-pac-icon-marker"></span><span class="gr-wgs-pac-item-query">'+e.formatted_address+"</span></div>";o.containerResultsList.insertAdjacentHTML("beforeend",s)}(e[t])},t.prototype.askForStoresRecommendation=function(e,o){this.plugin.manager.recommendStoresFromSearch(e,o)},t.prototype.geocode=function(e){var o=new google.maps.Geocoder,t=this;o.geocode(e,function(o,s){if(s===google.maps.GeocoderStatus.UNKNOWN_ERROR)t.geocode(e);else if(s===google.maps.GeocoderStatus.OK)if(1===o.length){t.container.querySelector(".gr-wgs-homestore-panel-searchBlock-btn").value=o[0].formatted_address;var n=o[0].geometry.location;t.askForStoresRecommendation(n.lat(),n.lng()),t.buildHTMLResults([])}else t.buildHTMLResults(o);else s===google.maps.GeocoderStatus.ZERO_RESULTS?t.buildHTMLResults([]):console.error(s)})},e.exports=t},function(e,o,t){function s(e,o){this.plugin=e,this.config=o,this.limit=this.config.options.woosmap.limit,this.query=this.config.options.woosmap.query,this.maxDistance=this.config.options.woosmap.maxDistance||0,woosmapRecommendation.setProjectKey(this.config.options.woosmapKey),this.initialRecommendation(o)}var n=t(11),i=t(0);s.prototype.initialRecommendation=function(){if(void 0!==window.localStorage){var e=JSON.parse(window.localStorage.getItem(this.config.options.woosmapKey));null!==e?this.plugin.ui.buildHTMLInitialReco(e):this.getUserRecommendation()}else this.getUserRecommendation()},s.prototype.getUserRecommendation=function(){var e=this;woosmapRecommendation.getUserRecommendation({successCallback:function(o){if(i.debug&&console.error(o),o&&o.features&&o.features.length>0){var t=o.features;e.plugin.ui.buildHTMLInitialReco(t[0]),void 0!==window.localStorage&&window.localStorage.setItem(this.config.options.woosmapKey,JSON.stringify(t[0]))}else e.plugin.ui.buildHTMLFindMyStore()},limit:this.limit,query:this.query,maxDistance:this.maxDistance})},s.prototype.searchStores=function(e,o){this.plugin.ui.showLoader();var t=this,s=function(){t.plugin.ui.hideLoader(),console.error("Error recommendation")};woosmapRecommendation.searchStores({lat:e,lng:o,successCallback:function(i){var r=i.features;n(r,e,o,function(e){t.plugin.ui.hideLoader(),t.plugin.ui.buildHTMLRecommendationResults(e)},s)},errorCallback:s,storesByPage:this.limit,query:this.query,maxDistance:this.maxDistance})},s.prototype.recommendStoresFromHTML5=function(e,o){this.searchStores(e,o),woosmapRecommendation.sendUserHtml5Position({lat:e,lng:o})},s.prototype.recommendStoresFromSearch=function(e,o){this.searchStores(e,o),woosmapRecommendation.sendUserSearchedPosition({lat:e,lng:o})},e.exports=s},function(e,o){function t(e,o){return void 0===e.properties.distanceWithGoogle||void 0===o.properties.distanceWithGoogle?null:e.properties.distanceWithGoogle-o.properties.distanceWithGoogle}function s(e,o,s,n,i){for(var r=new google.maps.DistanceMatrixService,a=[new google.maps.LatLng(o,s)],l=[],c=0;c<e.length;c++){var p=e[c].geometry.coordinates;l.push(new google.maps.LatLng(p[1],p[0]))}var g={destinations:l,origins:a,travelMode:google.maps.TravelMode.DRIVING},d=this;r.getDistanceMatrix(g,function(r,a){if(a===google.maps.DistanceMatrixStatus.OK){for(var l=r.rows[0].elements,c=0;c<e.length;c++)l[c].status!==google.maps.DistanceMatrixElementStatus.ZERO_RESULTS&&(e[c].properties.distanceWithGoogle=l[c].distance.value);e.sort(t),n(e)}else a===google.maps.DistanceMatrixStatus.UNKNOWN_ERROR?window.setTimeout(function(){d.updateStoresWithGoogle(e,o,s,n,i)},1500):(i(),console.error(a))})}e.exports=s}]);