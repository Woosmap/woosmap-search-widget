(function(){
   
    window.wgs = window.wgs || {};
    wgs.genericreco = {};
    
    /**
     * CONSTANTS
     */
    wgs.genericreco.CONSTANT = {
        debug: false
    }
    
    /**
     * default options
     */
    wgs.genericreco.options = {
        container: '',
        woosmapKey: '',
        google: {
            key: '',
            clientId: '',
            channel: ''
        },
        urls:{
            store: {
                target: '_self'
            },
            stores: {
                href: 'https://centres.norauto.fr/',
                target: '_self'
            }
        },
        usePlaces: true,
        autocompletePlaces: {
            minLength: 2,
            bounds: {
                west: -4.87293470,
                north: 51.089062,
                south: 42.19809198,
                east: 8.332631
            },
            types: ['geocode']
        },
        woosmap: {
            reco: {
                query : ''
            },
            limit: 10
        },
        lang: 'fr',
        translations: {
            fr: {
                searchAroundMeBtn: 'Autour de moi',
                searchAroundMeTitle: 'Rechercher le centre à proximité',
                selectAroundMeTitle: 'Choisissez le centre à proximité :',
                autocompletePlaceholder: 'Spécifiez une adresse',
                allStores: 'Tous nos centres',
                changeStore: 'Centre à proximité',
                findStore: 'Choisir mon centre',
                selectStore: 'Choisir',
                geolocationNotice: 'La géolocalisation n\'est pas activée sur votre navigateur. Veuillez changez vos préférences.',
                closeBtn: 'Fermer'
            }
        }
    };
    
    /**
     * Translations
     */
    wgs.genericreco.L10n = {};
    
    /**
     * RecommendationPlugin
     * @param container
     * @param options
     */
    wgs.genericreco.RecommendationPlugin = RecommendationPlugin;
    function RecommendationPlugin(container, options){
        
        this.manager;
        this.ui;
        
        /**
         * Merge defaults with user options
         * @private
         * @param {Object} defaults Default settings
         * @param {Object} options User options
         * @returns {Object} Merged values of defaults and options
         */
        var extend = function ( defaults, options ) {
            var extended = {};
            var prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        };
        
        /**
         * check mandatories options
         */
        var checkOptions = function(options){
            if(typeof options.container === 'undefined')
                throw new Error("the html container is undefined");
            else if(typeof options.container !== 'string')
                throw new Error("the html container must be a string");
            else if(options.container.replace(' ','') === '')
                throw new Error("the html container is empty");
            
            if(typeof options.woosmapKey === 'undefined')
                throw new Error("woosmapKey is undefined");
            else if(typeof options.woosmapKey !== 'string')
                throw new Error("woosmapKey must be a string");
            else if(options.woosmapKey.replace(' ','') === '')
                throw new Error("woosmapKey is empty");
            
            if(typeof options.google === 'undefined')
                throw new Error("google options is not defined");
            else if(typeof options.google !== 'object')
                throw new Error("google options must be an object");
            else {
                if(typeof options.google.clientId === 'undefined')
                    throw new Error("google clientId is undefined");
                else if(typeof options.google.clientId !== 'string')
                    throw new Error("google clientId must be a string");
                else if(options.google.clientId.replace(' ','') === '')
                    throw new Error("google clientId is empty");
                else if(typeof options.google.channel !== 'undefined') {
                    if(typeof options.google.channel !== 'string')
                        throw new Error("google client channel must be a string");
                }
            }
        };
        
        if(!options) options = {};
        
        var lang = (options.lang && typeof(options.lang) === 'string') ? options.lang : wgs.genericreco.options.lang;
        
        if(lang) {
            if(options.translations && options.translations.hasOwnProperty(lang)) {
                wgs.genericreco.L10n = extend(wgs.genericreco.options.translations[lang],options.translations[lang]);
            } else {
                wgs.genericreco.L10n = wgs.genericreco.options.translations[lang];
            }
        }
        
        wgs.genericreco.options = extend(wgs.genericreco.options,options);
        wgs.genericreco.options.container = container;
        
        var places = wgs.genericreco.options.usePlaces == undefined?true:wgs.genericreco.options.usePlaces;
        
        if(wgs.genericreco.CONSTANT.debug) {
            console.log(wgs.genericreco.options);
            console.log(wgs.genericreco.L10n);
            console.log(places);
        }
        
        checkOptions(wgs.genericreco.options);
        
        // load of the required scripts
        this.scriptsLoader = new wgs.genericreco.ScriptsLoader(wgs.genericreco.options.google.clientId, wgs.genericreco.options.google.channel, wgs.genericreco.options.google.key);        
        
        var self = this;
        if(!(window.jQuery)){
            this.scriptsLoader.loadJQuery(function(){
                self.scriptsLoader.loadGoogleMaps('googleMapsLoaded');
            });
        }
        else{
            window.jQuery(document).ready(function(){
                self.scriptsLoader.loadGoogleMaps('googleMapsLoaded');
             });
        }
        
        googleMapsLoaded = function(){
            initialize();
        };
        
        var initialize = function(){ 
            self.manager = new wgs.genericreco.Manager(self);
            self.ui = new wgs.genericreco.UI(container, places, self);            
        };
    };
    
    /**
     * Manager
     * @param plugin
     */
    wgs.genericreco.Manager = Manager;
    function Manager(plugin){
        
        this.reco;
        this.plugin = plugin;
        
        var self = this;
        
        
        
        var initialize = function(){
            
            self.reco = new wgs.genericreco.WoosmapReco({limit: wgs.genericreco.options.woosmap.limit});
            self.reco.setProjectKey(wgs.genericreco.options.woosmapKey);
            
            self.initialRecommendation();
        };
        initialize();
    };
    
    /**
     * initialRecommendation
     */
    wgs.genericreco.Manager.prototype.initialRecommendation = function(){
        var self = this;
        self.reco.getUserRecommendation(function(response){
            if(wgs.genericreco.CONSTANT.debug) {
                console.log(response);
            }
            if(response && response.features && response.features.length > 0){
                var stores = new wgs.genericreco.Stores(response.features);
                var drives = stores.getStores();
                drives.splice(1,drives.length);
                self.plugin.ui.buildHTMLInitialReco(drives[0]);
            }
            else{
                self.plugin.ui.buildHTMLFindMyDrive();
            }
        });
    };
    
    /**
     * HTML5Recommendation
     * @param lat
     * @param lng
     */
    wgs.genericreco.Manager.prototype.HTML5Recommendation = function(lat, lng){
        var self = this;
        
        self.plugin.ui.showLoader();
        
        self.reco.sendUserHtml5Position(lat, lng, function(){
            self.reco.getUserRecommendation(function(resp){
                  var stores = new wgs.genericreco.Stores(resp.features);
                  self.reco.getUserPosition(function(resp){
                      stores.updateStoresWithGoogle(resp, function(){
                          var drives = stores.sortWithGoogle();
                          drives.splice(wgs.genericreco.options.woosmap.limit,drives.length);
                          self.plugin.ui.hideLoader();
                          self.plugin.ui.buildHTMLRecommendationResults(drives);
                      }, function(){
                          self.plugin.ui.hideLoader();
                      });
                  });
            });
        }, function(){
            self.plugin.ui.hideLoader();
            console.log('Error recommendation');
        });
    };
    
    /**
     * SearchedRecommendation
     * @param lat
     * @param lng
     */
    wgs.genericreco.Manager.prototype.SearchedRecommendation = function(lat, lng){
        var self = this;
        
        self.plugin.ui.showLoader();
        
        self.reco.sendUserSearchedPosition(lat, lng, function(){
            self.reco.getUserRecommendation(function(resp){
                var stores = new wgs.genericreco.Stores(resp.features);
                self.reco.getUserPosition(function(resp){
                    stores.updateStoresWithGoogle(resp, function(){
                        var drives = stores.sortWithGoogle();
                        drives.splice(wgs.genericreco.options.woosmap.limit,drives.length);
                        self.plugin.ui.hideLoader();
                        self.plugin.ui.buildHTMLRecommendationResults(drives);
                    },function(){
                        self.plugin.ui.hideLoader();
                    });
                });
            });
        }, function(){
            self.plugin.ui.hideLoader();
            console.log('Error recommendation');
        });
    };
    
    /**
     * SearchedStores
     * @param lat
     * @param lng
     */
    wgs.genericreco.Manager.prototype.SearchedStores = function(lat, lng){
        var self = this;
        
        self.plugin.ui.showLoader();
        
        self.reco.sendUserSearchedPosition(lat, lng, function(){
            self.reco.searchStores(lat, lng, function(resp){
                var stores = new wgs.genericreco.Stores(resp.features);
                stores.updateStoresWithGoogle({latitude: lat, longitude: lng}, function(){
                    var drives = stores.sortWithGoogle();
                    drives.splice(wgs.genericreco.options.woosmap.limit,drives.length);
                    self.plugin.ui.hideLoader();
                    self.plugin.ui.buildHTMLRecommendationResults(drives);
                },function(){
                    self.plugin.ui.hideLoader();
                });
            },function(){
                self.plugin.ui.hideLoader();
            });
        }, function(){
            self.plugin.ui.hideLoader();
            console.log('Error recommendation');
        });
    };
    
    /**
     * ScriptsLoader
     * @param googleClientId
     * @param googleChannel
     */
    wgs.genericreco.ScriptsLoader = ScriptsLoader;
    function ScriptsLoader(googleClientId, googleChannel, googleKey){

        this.googleClientId = googleClientId;
        this.googleChannel = googleChannel;
        this.googleKey = googleKey;
    };
    
    /** 
     * Loads the Google Maps API
     * @param {String} callback name of the callback function to called at the end of the API load 
     **/    
    wgs.genericreco.ScriptsLoader.prototype.loadGoogleMaps = function(callback){
        
        var script = document.createElement('script');
        script.async = false;
        script.type = 'text/javascript';
        script.src = '//maps.googleapis.com/maps/api/js?' + 
            (this.googleClientId ? '&client=' + this.googleClientId : '') +
            (this.googleChannel ? '&channel=' + this.googleChannel : '') +
            (this.googleKey ? '&key=' + this.googleKey : '') +
            '&libraries=places' +
            '&callback=' + callback;        
        document.documentElement.firstChild.appendChild(script);    
    };
    
    /** 
     * Loads the jQuery library
     **/
    wgs.genericreco.ScriptsLoader.prototype.loadJQuery = function(callback){
        
        var script = document.createElement('script');
        script.async = true;
        script.src = '//code.jquery.com/jquery-2.x-git.min.js';
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
        document.documentElement.firstChild.appendChild(script);        
    };    
    

    /**
     * WoosmapReco
     * @param options
     */
    wgs.genericreco.WoosmapReco = WoosmapReco;
    function WoosmapReco(options){
    
        this.limit = options.limit;
        this.queue = rRequestQueue = [];
    };
    
    wgs.genericreco.WoosmapReco.prototype.setProjectKey = function(key){
        this.queue.push(['setProjectKey', [key]]);
    };    
    
    wgs.genericreco.WoosmapReco.prototype.searchStores = function(lat,lng,callback){
        this.queue.push(['searchStores', [{successCallback: callback, lat: lat, lng: lng, storesByPage: this.limit, query: wgs.genericreco.options.woosmap.reco.query}]]);
    };
    
    wgs.genericreco.WoosmapReco.prototype.getUserRecommendation = function(callback){
        this.queue.push(['getUserRecommendation', [{successCallback: callback, limit: this.limit, query: wgs.genericreco.options.woosmap.reco.query}]]);
    };
    wgs.genericreco.WoosmapReco.prototype.getUserPosition = function(callback){
        this.queue.push(['getUserPosition', [{successCallback: callback}]]);
    };    
    wgs.genericreco.WoosmapReco.prototype.sendUserHtml5Position = function(lat, lng, success, error){
        this.sendPosition('sendUserHtml5Position',lat, lng, success, error);
    };    

    wgs.genericreco.WoosmapReco.prototype.sendUserSearchedPosition = function(lat, lng, success, error){
        this.sendPosition('sendUserSearchedPosition',lat, lng, success, error);
    };
 
    wgs.genericreco.WoosmapReco.prototype.sendUserConsultedPOI = function(lat, lng, id, success, error){
        this.sendPosition('sendUserConsultedPOI',lat, lng, success, error, id);
    };
    
    wgs.genericreco.WoosmapReco.prototype.sendUserFavoritedPOI = function(lat, lng, id, success, error){
        this.sendPosition('sendUserFavoritedPOI',lat, lng, success, error, id);
    };
    
    wgs.genericreco.WoosmapReco.prototype.sendPosition = function(event, lat, lng, success, error, id){
        var params = {
            lat: lat, 
            lng: lng,
            successCallback: success,
            errorCallback: error
        };
        if(id){
            params.id = id;
        }
        
        this.queue.push([event, [params]]);        
    };
    /**
     * Stores
     * @param stores
     */
    wgs.genericreco.Stores = Stores;
    function Stores(stores){
        this.drives = [];
        this.stores = stores;
        
    };
    
    wgs.genericreco.Stores.prototype.getStores = function(){
        return this.stores;
    };
    
    /**
     * updateStoresWithGoogle
     * @param coords
     * @param callback
     */
    wgs.genericreco.Stores.prototype.updateStoresWithGoogle = function(coords, callback, errorCallback){
        
        var matrice = new google.maps.DistanceMatrixService();
        var origins = [new google.maps.LatLng(coords.latitude, coords.longitude)];
        var destinations = [];
        for(var i=0; i<this.stores.length;i++){
            var coordinates = this.stores[i].geometry.coordinates;
            destinations.push(new google.maps.LatLng(coordinates[1], coordinates[0]));
        }
        
        var request = {
            destinations: destinations,
            origins: origins,
            travelMode: google.maps.TravelMode.DRIVING
        };
        
        if(wgs.genericreco.CONSTANT.debug) {
            console.log('PLACES AUTOCOMPLETE REQUEST :');
            console.log(request);
        }
        
        var self = this;
        matrice.getDistanceMatrix(request, function(response, status){
            if(status == google.maps.DistanceMatrixStatus.OK){
                var results = response.rows[0].elements;
                for(var i=0; i<self.stores.length;i++){
                    self.stores[i].properties.distanceWithGoogle = results[i].distance.value;
                }
                callback();                
            }
            else if(status == google.maps.DistanceMatrixStatus.UNKNOWN_ERROR){
                window.setTimeout(function(){
                    self.updateStoresWithGoogle(coords, callback, errorCallback);
                }, 1500);  
            }
            else{
                errorCallback();
                console.log(status);
            }
        });    
    };
    /**
     * sortWithGoogle
     * @param coords
     * @returns
     */
    wgs.genericreco.Stores.prototype.sortWithGoogle = function(coords){
    
        this.stores.sort(function(a,b){
            if(a.properties.distanceWithGoogle < b.properties.distanceWithGoogle){
                return -1;
            }
            else{
                return 1;
            }
        });
        return this.stores;
    };
    
    
    /* 
     * 
     * 
     */    
    wgs.genericreco.HTML5Location = HTML5Location;
    function HTML5Location(container, plugin){
        
        this.container = container;
        this.plugin = plugin;
        
        var ERRORS = {
            HTTPS: 'Votre position géographique n’a pas été renvoyée par votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.',
            BLOCKED: 'La géolocalisation n\'est pas activée sur votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.' 
        };
        
        var self = this;
        var buildHTML = function(){
            var template = 
                '<div class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-aroundMe-btn">' + wgs.genericreco.L10n.searchAroundMeBtn + '</div>';
            self.container.append(template);
        };
        
        var successCallback = function(resp){
            lat = resp.coords.latitude;
            lng = resp.coords.longitude;
            self.plugin.manager.HTML5Recommendation(lat, lng);
        };
        
        var errorCallback = function(resp){ 
            if(resp && resp.message && resp.message.indexOf("Only secure origins are allowed") == 0){
                self.plugin.ui.slideDownWarningHTML5(ERRORS.HTTPS);
            }
            else{
                self.plugin.ui.slideDownWarningHTML5(ERRORS.BLOCKED);
            }
        };       
        var defineEvents = function(){ 
            self.container.find('.gr-wgs-homestore-panel-aroundMe-btn').click(function(){
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            });
        };
               
        var initialize = function(){
            buildHTML();
            defineEvents();            
        };

        initialize();
    };
    
    /* 
     * 
     * 
     */   
    wgs.genericreco.GeocodingLocation = GeocodingLocation;
    function GeocodingLocation(container, plugin){
        
        this.plugin = plugin;
        this.container = container;
        this.containerResultsList;
        
        this.buildHTML();   
    };    
    
    wgs.genericreco.GeocodingLocation.prototype.buildHTML = function(){
        var template = 
            '<div class="gr-wgs-homestore-panel-address-wrapper">' +
                '<label>' + wgs.genericreco.L10n.searchAroundMeTitle + '</label>' +
                '<form class="gr-wgs-homestore-panel-searchBlock-form">' +
                    '<input class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-address-btn" type="text" placeholder="' + wgs.genericreco.L10n.autocompletePlaceholder + '"/>' +
                '</form>' +
                '<div class="gr-wgs-homestore-panel-address-reset"></div>' +                
            '</div>' +
            '<div class= "gr-wgs-homestore-panel-address-results pac-container"></div>';
                
        this.container.append(template);
        this.containerResultsList = window.jQuery('.gr-wgs-homestore-panel-address-results');
        
        var self = this;
        
        // handle the key events on the input to trigger a search or navigate in the results list 
        self.container.find('input').bind('keyup',function(event){
            // key enter
            if (event.keyCode == 13){
                if(self.containerResultsList.find('.pac-item').length == 0){
                    self.geocode(window.jQuery(this).val());                   
                }
                else{
                    if(self.containerResultsList.find('.pac-item-selected').length > 0){
                        self.containerResultsList.find('.pac-item-selected').trigger('click');
                    }
                    else{
                        self.containerResultsList.find('.pac-item').first().trigger('click');
                    }
                }
            }
            // key up
            else if(event.keyCode == 38){
                if(self.containerResultsList.find('.pac-item-selected').length > 0){
                    self.containerResultsList.find('.pac-item-selected').prev().addClass('pac-item-selected');    
                    self.containerResultsList.find('.pac-item-selected:last').removeClass('pac-item-selected');                                                              
                }
                else{
                    self.containerResultsList.find('.pac-item:last').addClass('pac-item-selected');
                }
            }
            // key down
            else if(event.keyCode == 40){
                if(self.containerResultsList.find('.pac-item-selected').length > 0){                                                               
                    self.containerResultsList.find('.pac-item-selected').next().addClass('pac-item-selected');
                    self.containerResultsList.find('.pac-item-selected:first').removeClass('pac-item-selected');
                }
                else{
                    self.containerResultsList.find('.pac-item:first').addClass('pac-item-selected');
                }
            }           
        });
        
        // handle click event on a geocoding result in the list
        self.containerResultsList.delegate('.pac-item','click', function(event){
            var lat = window.jQuery(this).attr('data-lat');
            var lng = window.jQuery(this).attr('data-lng');
            var name = window.jQuery(this).find('.pac-item-query').text();
            self.container.find('input').val(name);
            
            self.askForStores(lat, lng);            
            self.containerResultsList.hide();
        });
        
        // handle the click on the reset search field button
        window.jQuery('.gr-wgs-homestore-panel-address-reset').click(function(){
            self.container.find('input').val('');
            self.containerResultsList
                .empty()
                .hide();            
            self.plugin.ui.hideResultsBlock();
        });
        
        // cancel the submit event in the form
        this.container.find('form.gr-wgs-homestore-panel-searchBlock-form').submit(function(){
            return false;
        });
    };
    
    wgs.genericreco.GeocodingLocation.prototype.buildHTMLResults = function(results){
        
        var self = this;
        var buildResult = function(result){

            var coor = result.geometry.location;
            var template =
                '<div class="pac-item" data-lat="' + coor.lat() +'" data-lng="' + coor.lng() + '">' +
                    '<span class="pac-icon pac-icon-marker"></span>' +
                    '<span class="pac-item-query">' + result.formatted_address + '</span>' + 
                '</div>';
            
            self.containerResultsList.append(template);
        };
        this.containerResultsList
            .empty()
            .show();
        for(var i=0;i<results.length;i++){
            buildResult(results[i]);
        }
    };    
    
    wgs.genericreco.GeocodingLocation.prototype.askForRecommendation = function(lat, lng){
        this.plugin.manager.SearchedRecommendation(lat, lng);
    };
    
    wgs.genericreco.GeocodingLocation.prototype.askForStores = function(lat, lng){
        this.plugin.manager.SearchedStores(lat, lng);
    };
    
    wgs.genericreco.GeocodingLocation.prototype.geocode = function(address){
        var request = {
            address: address,
            region: 'fr'
        };
        var geocoder = new google.maps.Geocoder();
        var self = this;
        geocoder.geocode(request, function(results, status){
            if(status == google.maps.GeocoderStatus.UNKNOWN_ERROR){
                self.geocode(address);
            }
            else if(status == google.maps.GeocoderStatus.OK){
                if(results.length == 1){
                    self.container.find('.gr-wgs-homestore-panel-searchBlock-btn').val(results[0].formatted_address);
                    var coor = results[0].geometry.location;
                    self.askForStores(coor.lat(), coor.lng());
                }
                else{
                    self.buildHTMLResults(results);
                }
            }
            else{
                console.log(status);
            }
        });
    };
        
    wgs.genericreco.PlacesLocation = PlacesLocation;
    function PlacesLocation(container, plugin){
        
        this.plugin = plugin; 
        this.container = container;              
        this.containerPredictionsList;
        
        this.buildHTML();        
    };
    /**
     * 
     */
    wgs.genericreco.PlacesLocation.prototype.buildHTML = function(){
        var template = 
            '<div class="gr-wgs-homestore-panel-address-wrapper">' +
                '<label>' + wgs.genericreco.L10n.searchAroundMeTitle + '</label>' +
                '<form class="gr-wgs-homestore-panel-searchBlock-form">' +
                    '<input class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-address-btn" type="text" placeholder="' + wgs.genericreco.L10n.autocompletePlaceholder + '"/>' +
                '</form>' +
                '<div class="gr-wgs-homestore-panel-address-reset"></div>' +                
            '</div>' +
            '<div class= "gr-wgs-homestore-panel-address-predictions pac-container"></div>';
        
        
        this.container.append(template);
        this.containerPredictionsList = window.jQuery('.gr-wgs-homestore-panel-address-predictions');
        
        var self = this;
        

        self.container.find('input').bind('keyup',function(event){
            // key enter
            if (event.keyCode == 13){
                if($('.pac-item-selected').length > 0){
                    $('.pac-item-selected').trigger('click');
                }
                else{
                    $('.pac-item').first().trigger('click');
                }
            }
            // key up
            else if(event.keyCode == 38){
                if($('.pac-item-selected').length > 0){
                    $('.pac-item-selected').prev().addClass('pac-item-selected');    
                    $('.pac-item-selected:last').removeClass('pac-item-selected');                                                              
                }
                else{
                    $('.pac-item:last').addClass('pac-item-selected');
                }
            }
            // key down
            else if(event.keyCode == 40){
                if($('.pac-item-selected').length > 0){                                                               
                    $('.pac-item-selected').next().addClass('pac-item-selected');
                    $('.pac-item-selected:first').removeClass('pac-item-selected');
                }
                else{
                    $('.pac-item:first').addClass('pac-item-selected');
                }
            }
            // other keys : undisplay the list
            else{
                if(event.currentTarget.value.length >= wgs.genericreco.options.autocompletePlaces.minLength ){
                    var request = {
                        input: self.container.find('input').val()
                    };
                    
                    if(wgs.genericreco.options.autocompletePlaces.bounds)
                        request.bounds = wgs.genericreco.options.autocompletePlaces.bounds;
                    if(wgs.genericreco.options.autocompletePlaces.types)
                        request.types = wgs.genericreco.options.autocompletePlaces.types;
                        
                    self.getPredictions(request, function(results){
                        self.buildHTMLPredictions(results);
                    }, function(error){
                        console.log(error);
                    });
                }                      
            }
        });
        
        self.container.delegate('.pac-item','click', function(event){
            var place_id = window.jQuery(this).attr('data-place-id');
            var place_name = window.jQuery(this).find('.pac-item-query').text();
            self.container.find('input').val(place_name);
            self.containerPredictionsList.hide();
            self.getDetails(place_id);
        });
        
        window.jQuery('.gr-wgs-homestore-panel-address-reset').click(function(){
            self.container.find('input').val('');
            self.containerPredictionsList
                .empty()
                .hide();           
            self.plugin.ui.hideResultsBlock();
        });            
        
        this.container.find('form.gr-wgs-homestore-panel-searchBlock-form').submit(function(){
            return false;
        });
        
    };
    
    /**
     * 
     */
    wgs.genericreco.PlacesLocation.prototype.buildHTMLPredictions = function(predictions){
        
        var self = this;
        var buildPrediction = function(prediction){

            var template =
                '<div class="pac-item" data-place-id="' + prediction.place_id +'">' +
                    '<span class="pac-icon pac-icon-marker"></span>' +
                    '<span class="pac-item-query">' + prediction.description + '</span>' + 
                '</div>';
            
            self.containerPredictionsList.append(template);
        };
        this.containerPredictionsList
            .empty()
            .show();
        for(var i=0;i<predictions.length;i++){
            buildPrediction(predictions[i]);
        }
    };
    
    /**
     * 
     */
    wgs.genericreco.PlacesLocation.prototype.getPredictions = function(request){
        var self = this;
        
        var autocomplete = new google.maps.places.AutocompleteService();
        autocomplete.getPlacePredictions(request, function(results, status){
            if(status == google.maps.places.PlacesServiceStatus.OK){
                self.buildHTMLPredictions(results);
            }                
            else if(status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR || status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT){
                window.setTimeout(function(){
                    self.getPredictions(request);
                }, 1000);
            }
            else{
                console.log(status);
            }                    
        });        
    };
    /**
     * 
     */
    wgs.genericreco.PlacesLocation.prototype.getDetails = function(place_id){
        
        var places = new google.maps.places.PlacesService(document.getElementsByClassName('gr-wgs-homestore-panel-address-btn')[0]);
        var self = this;
        var request = {
            placeId: place_id
        };
        places.getDetails(request, function(result, status){
            if(status == google.maps.places.PlacesServiceStatus.OK){
                var lat = result.geometry.location.lat();
                var lng = result.geometry.location.lng();
                self.plugin.manager.SearchedStores(lat, lng);
            }                
            else if(status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR || status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT){
                window.setTimeout(function(){
                   self.getDetails(place_id);
                }, 1000);
            }
            else{
                console.log(status);
            }                    
        });        
    };
    
    /**
     * 
     */   
    wgs.genericreco.UI = UI;
    function UI(container, usePlaces, plugin){
        
        this.plugin = plugin;
        this.container = window.jQuery(container);
        
        this.isSearchBuild = false;
        
        var template =
            '<div class="gr-wgs-homestore-container">' +
                '<div class="gr-wgs-homestore-mainBlock"></div>' +
                '<div id="gr-wgs-homestore-panel">' +
                    '<div class="gr-wgs-homestore-panel-searchBlock">'+
                        '<div class="gr-wgs-homestore-panel-searchBlock-warning">' + wgs.genericreco.L10n.geolocationNotice + '</div>'+
                    '</div>' +
                    '<div class="gr-wgs-homestore-panel-loaderBlock"></div>' +
                    '<div class="gr-wgs-homestore-panel-resultBlock">' +
                        '<div class="gr-wgs-homestore-panel-resultBlock-title">' + wgs.genericreco.L10n.selectAroundMeTitle + '</div>' +
                        '<ul class="gr-wgs-homestore-panel-resultBlock-listBlock"></ul>' +
                    '</div>' +
                    '<div class="gr-wgs-homestore-panel-footerBlock">' +
                        '<div class="gr-wgs-homestore-panel-footerBlock-allStores">' + wgs.genericreco.L10n.allStores + '</div>' +
                        '<div class="gr-wgs-homestore-panel-footerBlock-closePanel">' + wgs.genericreco.L10n.closeBtn + '</div>' +
                    '</div>';
                '</div>' +
            '</div>';        

        this.container
            .empty()
            .html(template);
        
        this.windowContainer = window.jQuery(window);
        this.mainContainer = window.jQuery('.gr-wgs-homestore-container');
        this.headerContainer = window.jQuery('.gr-wgs-homestore-mainBlock');
        this.panelContainer = window.jQuery('#gr-wgs-homestore-panel');
        this.panelContainerSearch = window.jQuery('.gr-wgs-homestore-panel-searchBlock');
        this.panelContainerSearchWarning = window.jQuery('.gr-wgs-homestore-panel-searchBlock-warning');
        this.panelContainerResultsBlock = window.jQuery('.gr-wgs-homestore-panel-resultBlock');
        this.panelContainerResultsList = window.jQuery('.gr-wgs-homestore-panel-resultBlock-listBlock');
        this.panelContainerFooter = window.jQuery('.gr-wgs-homestore-panel-footerBlock');       
        
        new wgs.genericreco.HTML5Location(this.panelContainerSearch, this.plugin);
        if(usePlaces){
            new wgs.genericreco.PlacesLocation(this.panelContainerSearch, this.plugin);
        }
        else{
            new wgs.genericreco.GeocodingLocation(this.panelContainerSearch, this.plugin);
        }
            
        this.hideResultsBlock();
        this.hideWarningHTML5();
        
        var self = this;
        this.panelContainer.find('.gr-wgs-homestore-panel-footerBlock-allStores').click(function(){
            self.openAllStores();
        });
        this.panelContainer.find('.gr-wgs-homestore-panel-footerBlock-closePanel').click(function(){
            self.hideSearchPanel();
        });
        
        this.onClickOutsideContainer();
    };
    
    /** 
     * Build the HTML of the drive recommendation in the header
     * @param {Store} max number of drives to retrieve
     **/
    wgs.genericreco.UI.prototype.buildHTMLInitialReco = function(store){
        
        var template =
            '<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-yourStore">' +
                '<span class="gr-wgs-homestore-mainBlock-yourStore-icon icon icon-garageN"></span>' + 
                '<span class="gr-wgs-homestore-mainBlock-yourStore-change">' + //onclick="document.getElementById('gr-wgs-homestore-panel').style.display='block'"
                    wgs.genericreco.L10n.changeStore +
                '</span>' +
                '<span class="gr-wgs-homestore-mainBlock-yourStore-name">' +
                    store.properties.name +  
                '</span>' +
            '</div>';
        
        this.headerContainer
            .empty()
            .html(template)
            .show();
        
        var self = this;
        this.headerContainer.find('.gr-wgs-homestore-mainBlock-yourStore-name').click(function(){
            var coord = store.geometry.coordinates;
            var lat = coord[1];
            var lng = coord[0];
            self.plugin.manager.reco.sendUserConsultedPOI(lat, lng, store.properties.store_id, function(){
                //self.openStore(store);
            }, function(){
                //self.openStore(store);
            });
            self.toggleSearchPanel();
        });
        
        this.headerContainer.find('.gr-wgs-homestore-mainBlock-yourStore-change, .gr-wgs-homestore-mainBlock-yourStore-icon').click(function(){
            self.toggleSearchPanel();
        });                   
    };
    /** 
     * Build the HTML of the "Trouver mon magasin" in the header
     **/     
    wgs.genericreco.UI.prototype.buildHTMLFindMyDrive = function(){
        
        var template =
            '<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-findStore">' +
                '<span class="gr-wgs-homestore-mainBlock-yourStore-icon icon icon-garageN"></span>' + 
                '<span class="gr-wgs-homestore-mainBlock-yourStore-change">' + //onclick="document.getElementById('gr-wgs-homestore-panel').style.display='block'"
                    wgs.genericreco.L10n.changeStore +
                '</span>' +
                '<span class="gr-wgs-homestore-mainBlock-yourStore-name">' +
                    wgs.genericreco.L10n.findStore + 
                '</span>' +
            '</div>';
        
        this.headerContainer
            .empty()
            .html(template)
            .show();
        
        var self = this;
        this.headerContainer.find('.gr-wgs-homestore-mainBlock-findStore').click(function(){          
            self.showSearchPanel();
        });          
    };
    
    wgs.genericreco.UI.prototype.buildWarningHTML5 = function(){
        
        var template =
            '<div class="gr-wgs-homestore-panel-searchBlock-warning"></div>';
        
        this.panelContainerSearch.prepend(template);
        
    };  
    
    /**
     * 
     */
    wgs.genericreco.UI.prototype.onClickOutsideContainer = function(){
        var self = this;
        self.windowContainer.click(function(event) {
            if(self.isVisibleSearchPanel() && window.jQuery(event.target).attr('id') !== wgs.genericreco.options.container.replace('#','')) {
                self.hideSearchPanel();
            }
        });
        self.mainContainer.click(function(event){
            event.stopPropagation();
        });  
    };
    /**
     * 
     */
    wgs.genericreco.UI.prototype.isVisibleSearchPanel = function(){
        return this.panelContainer.hasClass('gr-wgs-homestore-panel-open');
    };
    /** 
     * 
     **/     
    wgs.genericreco.UI.prototype.showSearchPanel = function(){
        this.panelContainer.addClass('gr-wgs-homestore-panel-open');
    };    
    /** 
     * 
     **/     
    wgs.genericreco.UI.prototype.hideSearchPanel = function(){
        this.panelContainer.removeClass('gr-wgs-homestore-panel-open');
    };
    /**
     * 
     */
    wgs.genericreco.UI.prototype.toggleSearchPanel = function(){
        if(this.isVisibleSearchPanel()) {
            this.hideSearchPanel();
        } else {
            this.showSearchPanel();
        }
    };
    /**
     * 
     */
    wgs.genericreco.UI.prototype.showResultsBlock = function(){
        this.panelContainerResultsBlock.show();
    };    
    wgs.genericreco.UI.prototype.hideResultsBlock = function(){
        this.panelContainerResultsBlock.hide();
    };
    
    wgs.genericreco.UI.prototype.slideDownWarningHTML5 = function(text){
        var self = this;
        this.panelContainerSearchWarning.text(text).slideDown(500,function(){
            window.setTimeout(function(){
                self.slideUpWarningHTML5();
            },5000);
        });
    };
  
    wgs.genericreco.UI.prototype.slideUpWarningHTML5 = function(){
        this.panelContainerSearchWarning.slideUp(500);
    };
    wgs.genericreco.UI.prototype.hideWarningHTML5 = function(){
        this.panelContainerSearchWarning.hide();
    };     
    /** 
     * Build the HTML of the results of a location search
     **/     
    wgs.genericreco.UI.prototype.buildHTMLRecommendationResults = function(stores){
        var self = this;
        
        var buildHTMLStore = function(store){
            var distance = store.properties.distanceWithGoogle / 1000;
            var temp = '<li class="gr-wgs-homestore-panel-resultBlock-listItem" data-id=' + store.properties.store_id + '>' +
                '<span class="gr-wgs-homestore-panel-resultBlock-listItem-icon icon-garagN"></span>' +
                '<span class="gr-wgs-homestore-panel-resultBlock-listItem-infos">' +
                    '<div>' +
                        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-title">' + store.properties.name +'</div>' +
                        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-choose" style="float:right">' + wgs.genericreco.L10n.selectStore + '</div>' +
                        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-distance">(' + distance.toFixed(1) +'km)</div>' +
                    '</div>' +
                '</span>' +
            '</li>';            
            self.panelContainerResultsList
                .append(temp);
            
            self.panelContainerResultsList.find('.gr-wgs-homestore-panel-resultBlock-listItem[data-id="' + store.properties.store_id + '"]').click(function(){
                var coord = store.geometry.coordinates;
                var lat = coord[1];
                var lng = coord[0];
                self.plugin.manager.reco.sendUserFavoritedPOI(lat, lng, store.properties.store_id, function(){
                    self.plugin.ui.resetStoreSearch();
                    self.hideSearchPanel();
                    //self.plugin.manager.initialRecommendation();
                    self.plugin.ui.buildHTMLInitialReco(store);
                }, function(){
                    self.plugin.ui.resetStoreSearch();
                    self.hideSearchPanel();
                    console.log('Error recommendation');
                });
            });
        };

        self.panelContainerResultsList.empty();
        for(var i=0; i<stores.length;i++){
            buildHTMLStore(stores[i]);
        }
        this.showResultsBlock();
    };
    
    wgs.genericreco.UI.prototype.resetStoreSearch = function() {
        var self = this;
        window.jQuery('.gr-wgs-homestore-panel-address-reset').trigger('click');
    };
    
    wgs.genericreco.UI.prototype.openStore = function(store){
        if(store.properties.contact && store.properties.contact.website) {
            window.open(store.properties.contact.website, store.properties.contact.website || '_self');
        }
    };
    
    wgs.genericreco.UI.prototype.openAllStores = function(){
        window.open(wgs.genericreco.options.urls.stores.href, wgs.genericreco.options.urls.stores.target || '_self');
    };
    
    wgs.genericreco.UI.prototype.showLoader = function(){
        this.panelContainer.find('.gr-wgs-homestore-panel-loaderBlock').show();
    };
    
    wgs.genericreco.UI.prototype.hideLoader = function(){
        this.panelContainer.find('.gr-wgs-homestore-panel-loaderBlock').hide();
    };
    
})();
