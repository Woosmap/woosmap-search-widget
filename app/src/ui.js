var HTML5Location = require('./html5location.js');
var PlacesLocation = require('./places.js');
var GeocodingLocation = require('./geocoder.js');

function UI(container, usePlaces, plugin, config) {
    this.plugin = plugin;
    this.container = container;
    this.config = config;
    var L10n = this.config.L10n;

    var template = '<div class="gr-wgs-homestore-container">' +
        '<div class="gr-wgs-homestore-mainBlock"></div>' +
        '<div id="gr-wgs-homestore-panel">' +
        '<div class="gr-wgs-homestore-panel-searchBlock">' +
        '<div class="gr-wgs-homestore-panel-searchBlock-warning">' + L10n.geolocationNotice + '</div>' +
        '</div>' +
        '<div class="gr-wgs-homestore-panel-loaderBlock"></div>' +
        '<div class="gr-wgs-homestore-panel-resultBlock">' +
        '<div class="gr-wgs-homestore-panel-resultBlock-title">' + L10n.selectAroundMeTitle + '</div>' +
        '<ul class="gr-wgs-homestore-panel-resultBlock-listBlock"></ul>' +
        '</div>' +
        '<div class="gr-wgs-homestore-panel-footerBlock">' +
        '<div class="gr-wgs-homestore-panel-footerBlock-allStores">' + (this.config.options.urls.stores.href.replace(' ', '') !== '' ? L10n.allStores : '' ) + '</div>' +
        '<div class="gr-wgs-homestore-panel-footerBlock-closePanel">' + L10n.closeBtn + '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    this.container.innerHTML = template;

    this.mainContainer = this.container.querySelector('.gr-wgs-homestore-container');
    this.headerContainer = this.container.querySelector('.gr-wgs-homestore-mainBlock');
    this.panelContainer = this.container.querySelector('#gr-wgs-homestore-panel');
    this.panelContainerSearch = this.container.querySelector('.gr-wgs-homestore-panel-searchBlock');
    this.panelContainerSearchWarning = this.container.querySelector('.gr-wgs-homestore-panel-searchBlock-warning');
    this.panelContainerResultsBlock = this.container.querySelector('.gr-wgs-homestore-panel-resultBlock');
    this.panelContainerResultsList = this.container.querySelector('.gr-wgs-homestore-panel-resultBlock-listBlock');
    this.panelContainerFooter = this.container.querySelector('.gr-wgs-homestore-panel-footerBlock');

    new HTML5Location(this.panelContainerSearch, this.plugin, this.config);

    if (usePlaces) {
        this._searchManager = new PlacesLocation(this.panelContainerSearch, this.plugin, this.config);
    }
    else {
        this._searchManager = new GeocodingLocation(this.panelContainerSearch, this.plugin, this.config);
    }

    this.hideResultsBlock();
    this.hideWarningHTML5();

    var self = this;
    this.panelContainer.querySelector('.gr-wgs-homestore-panel-footerBlock-allStores').addEventListener('click', function () {
        self.openAllStores();
    });
    this.panelContainer.querySelector('.gr-wgs-homestore-panel-footerBlock-closePanel').addEventListener('click', function () {
        self.hideSearchPanel();
    });
    this.onClickOutsideContainer();
}

/**
 * buildHTMLInitialReco
 * Build the HTML of the store recommendation in the header
 * @param {Store} store max number of stores to retrieve
 **/
UI.prototype.buildHTMLInitialReco = function (store) {
    var self = this;
    var address = '', city = '', phone = '';
    
    if(typeof this.config.options.display.recommendation.address !== 'undefined' && this.config.options.display.recommendation.address) {
        if(store.properties.address.lines) {
           for(var a=0; a < store.properties.address.lines.length; a++){
               if(store.properties.address.lines[a] !== '')
                   address += store.properties.address.lines[a];
           }
        }
        
        if(store.properties.address.zipcode && store.properties.address.zipcode !== '')
            city += store.properties.address.zipcode;
        if(store.properties.address.city && store.properties.address.city !== '')
            city += (city !== '' ? ' ': '') + store.properties.address.city;
    
        address += (address !== '' && city !== '' ? ', ' + city : '');
    
        if(store.properties.address.country_code && store.properties.address.country_code !== '')
            address += ', ' + store.properties.address.country_code;
    
        address = '<span class="gr-wgs-homestore-mainBlock-yourStore-address">' + address + '</span>';
    }
    
    if(typeof this.config.options.display.recommendation.phone !== 'undefined' && this.config.options.display.recommendation.phone && store.properties.contact && store.properties.contact.phone !== '')
        phone += '<span class="gr-wgs-homestore-mainBlock-yourStore-phone"><span class="gr-wgs-homestore-mainBlock-yourStore-phone-label">' + this.config.L10n.telephone + '</span> ' + (store.properties.contact.phone ? store.properties.contact.phone : '') + '</span>';
    
    var template =
        '<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-yourStore">' +
        '<span class="gr-wgs-homestore-mainBlock-yourStore-icon"></span>' +
        '<span class="gr-wgs-homestore-mainBlock-yourStore-change">' +
        this.config.L10n.changeStore +
        '</span>' + 
        '<span class="gr-wgs-homestore-mainBlock-yourStore-name">' +
        store.properties.name + 
        '</span>' + 
        address + 
        phone + 
        '</div>';

    this.headerContainer.innerHTML = template;

    this.headerContainer.querySelector('.gr-wgs-homestore-mainBlock-yourStore-name').addEventListener('click', function () {
        /*
        var coord = store.geometry.coordinates;
        
        var lat = coord[1];
        var lng = coord[0];
        var callback = function (store) {
            self.openStore(store);
        };
        
        self.plugin.manager.reco.sendUserConsultedPOI(lat, lng, store.properties.store_id, function () {
            callback(store);
        }, function () {
            callback(store);
        });
        */
        self.toggleSearchPanel();
    });

    this.headerContainer.querySelector('.gr-wgs-homestore-mainBlock-yourStore-icon').addEventListener('click', function () {
        self.toggleSearchPanel();
    });

    this.headerContainer.querySelector('.gr-wgs-homestore-mainBlock-yourStore-change').addEventListener('click', function () {
        self.toggleSearchPanel();
    });

};
/**
 * buildHTMLFindMyStore
 * Build the HTML of the "Trouver mon magasin" in the header
 **/
UI.prototype.buildHTMLFindMyStore = function () {

    var template =
        '<div class="gr-wgs-homestore-mainBlockTitle gr-wgs-homestore-mainBlock-findStore">' +
        '<span class="gr-wgs-homestore-mainBlock-yourStore-icon"></span>' +
        '<span class="gr-wgs-homestore-mainBlock-yourStore-change">' + //onclick="document.getElementById('gr-wgs-homestore-panel').style.display='block'"
        this.config.L10n.changeStore +
        '</span>' +
        '<span class="gr-wgs-homestore-mainBlock-yourStore-name">' +
        this.config.L10n.findStore +
        '</span>' +
        '</div>';

    this.headerContainer.innerHTML = template;
    // .show();

    var self = this;
    this.headerContainer.querySelector('.gr-wgs-homestore-mainBlock-findStore').addEventListener('click', function () {
        self.showSearchPanel();
    });
};

UI.prototype.buildWarningHTML5 = function () {
    var template =
        '<div class="gr-wgs-homestore-panel-searchBlock-warning"></div>';
    this.container.insertAdjacentHTML('afterbegin', template);
};

/**
 * onClickOutsideContainer
 */
UI.prototype.onClickOutsideContainer = function () {
    window.addEventListener('click', function (event) {
        if (this.isVisibleSearchPanel() && event.target.getAttribute('id') !== this.config.options.container.replace('#', '')) {
            this.hideSearchPanel();
        }
    }.bind(this));

    this.mainContainer.addEventListener('click', function (event) {
        event.stopPropagation();
        return false;
    });
};
/**
 * isVisibleSearchPanel
 * @return boolean
 */
UI.prototype.isVisibleSearchPanel = function () {
    return this.panelContainer.classList.contains('gr-wgs-homestore-panel-open');
};
/**
 * showSearchPanel
 **/
UI.prototype.showSearchPanel = function () {
    this.panelContainer.classList.add('gr-wgs-homestore-panel-open');
};
/**
 * hideSearchPanel
 **/
UI.prototype.hideSearchPanel = function () {
    this.panelContainer.classList.remove('gr-wgs-homestore-panel-open');
};
/**
 * toggleSearchPanel
 */
UI.prototype.toggleSearchPanel = function () {
    if (this.isVisibleSearchPanel()) {
        this.hideSearchPanel();
    } else {
        this.showSearchPanel();
    }
};
/**
 * showResultsBlock
 */
UI.prototype.showResultsBlock = function () {
    this.panelContainerResultsBlock.style.display = 'block';
};
/**
 * hideResultsBlock
 */
UI.prototype.hideResultsBlock = function () {
    this.panelContainerResultsBlock.style.display = 'none';
};
/**
 * slideDownWarningHTML5
 * @param text
 */
UI.prototype.slideDownWarningHTML5 = function (text) {
    this.panelContainerSearchWarning.innerText = text;
    this.panelContainerSearchWarning.style.display = 'block';

};
/**
 * slideUpWarningHTML5
 */
UI.prototype.slideUpWarningHTML5 = function () {
    this.panelContainerSearchWarning.style.display = 'none';
};
/**
 * hideWarningHTML5
 */
UI.prototype.hideWarningHTML5 = function () {
    this.panelContainerSearchWarning.style.display = 'none';
};
/**
 * buildHTMLRecommendationResults
 * Build the HTML of the results of a location search
 * @param stores
 **/
UI.prototype.buildHTMLRecommendationResults = function (stores) {
    this.panelContainerResultsList.innerHTML = '';
    for (var i = 0; i < stores.length; i++) {
        this.buildHTMLStore(stores[i]);
    }
    this.showResultsBlock();
};

UI.prototype.convertTo12Hrs = function (hour,sep) {
    if(typeof sep === 'undefined') sep = ':';
    if(typeof hour === 'undefined') return false;
    if(typeof hour !== 'string') return false;
    var hours = hour.split(sep);
    var hr = parseInt(hours[0]); 
    var ampmSwitch = (hr > 12)? "PM":"AM";
    var convHrs = (hr >12)? hr-12:hr;
    return convHrs + sep + hours[1] + ' ' + ampmSwitch; 
};

UI.prototype.concatenateStoreHours = function (openHours) {
    var hoursText = "";
    var end;
    
    if(openHours) {
        if (openHours['all-day'] || openHours['all_day']) {
            if (this.config.L10n.open24)
                return this.config.L10n.open24;
            return "24h/24";
        }

        for (var idx in openHours) {
            if(typeof openHours[idx] === 'object') {
                end = openHours[idx].end;
                
                if(typeof this.config.options.display.recommendation.h12 !== 'undefined' && this.config.options.display.recommendation.h12) {
                    hoursText += this.convertTo12Hrs(openHours[idx].start) + " - " + this.convertTo12Hrs(end);
                } else {
                    hoursText += openHours[idx].start + " - " + end;
                }
                
                if (idx < openHours.length - 1) {
                    hoursText += ", ";
                }
            }
        }
      
    }
    
    return hoursText;  
};

UI.prototype.generateHoursLiArray = function(store) {
    var self = this;
    var usualHours = store.properties.opening_hours.usual;
    var defaultHourText = this.concatenateStoreHours(usualHours["default"]);
    
    var openingHoursArray = [];

    var createLiHour = function(firstDay, lastDay, hourText) {
        var daysText = self.config.L10n.days;

        if (hourText === "") {
            // nothing
        } else if (firstDay === lastDay) {
            openingHoursArray.push("<li>" + daysText[firstDay].full + ": " + hourText + "</li>");
        } else {
            openingHoursArray.push("<li>" + daysText[firstDay].short + "-" + daysText[lastDay].short + ": " + hourText + "</li>");
        }
    };

    var firstDaySerie = 0;
    var currentHoursText = "";
    var previousHoursText = "";

    for (var dayIndex = 1; dayIndex < 8; dayIndex++) {
        currentHoursText = "";
        if (dayIndex in usualHours) {
            currentHoursText = this.concatenateStoreHours(usualHours[dayIndex]);
        } else {
            currentHoursText = defaultHourText;
        }

        if (currentHoursText != previousHoursText) {
            createLiHour(firstDaySerie, dayIndex - 1, previousHoursText);
            firstDaySerie = dayIndex;
            previousHoursText = currentHoursText;
        }
    }

    createLiHour(firstDaySerie, 7, currentHoursText);

    return openingHoursArray;
};

UI.prototype.buildHTMLOpeningHours = function (store) {
    var str = '';
    
    var op = store.properties.open;
    if(op && typeof this.config.options.display.search.openingDay !== 'undefined' && this.config.options.display.search.openingDay) {
        if(op.open_hours.length>0) {
            str += '<div class="gr-wgs-openinghours-day">' + this.config.L10n.openingHoursDay + '</div>';
            str += '<ul class="gr-wgs-openinghours-day-' + op.week_day + ( op.opening_now ? ' gr-wgs-openinghours-opennow' : '' ) + '">';
            for(var j=0; j<op.open_hours.length; j++) {
                str += '<li class="gr-wgs-openinghours-day-slice">';
                if(typeof this.config.options.display.recommendation.h12 !== 'undefined' && this.config.options.display.recommendation.h12) {
                    str += this.convertTo12Hrs(op.open_hours[j].start) + ' - ' +this.convertTo12Hrs(op.open_hours[j].end);
                } else {
                    str += op.open_hours[j].start + ' - ' + op.open_hours[j].end;
                }
                str += '</li>';
            }
            str += '</ul>';
        }
    }
    
    var oph = store.properties.opening_hours;
    if(oph && typeof this.config.options.display.search.openingWeek !== 'undefined' && this.config.options.display.search.openingWeek) {
        if(oph.usual['default'] && oph.usual['default'].length > 0 || Object.keys(oph.usual).length > 1) {
            str += '<div class="gr-wgs-openinghours-week-btn">' + this.config.L10n.openingHoursWeek + '</div>';
            str += '<ul class="gr-wgs-openinghours-week">' + this.generateHoursLiArray(store).join('') + '</ul>';
        }
    }
    
    return str;
};

UI.prototype.buildHTMLStore = function (store) {
    var distance = store.properties.distanceWithGoogle / 1000;
    var temp = '<li class="gr-wgs-homestore-panel-resultBlock-listItem" data-id="' + store.properties.store_id + '">' +
        '<span class="gr-wgs-homestore-panel-resultBlock-listItem-icon"></span>' +
        '<span class="gr-wgs-homestore-panel-resultBlock-listItem-infos">' +
        '<div>' +
        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-title">' + store.properties.name + '</div>' +
        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-choose">' + this.config.L10n.selectStore + '</div>' +
        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-distance">' + (!isNaN(distance) ? '(' + distance.toFixed(1) + 'km)' : '') + '</div>' +
        '<div class="gr-wgs-homestore-panel-resultBlock-listItem-openinghours">' + this.buildHTMLOpeningHours(store) + '</div>' +
        '</div>' +
        '</span>' +
        '</li>';
    this.panelContainerResultsList.insertAdjacentHTML('beforeend', temp);

    this.panelContainerResultsList.querySelector('.gr-wgs-homestore-panel-resultBlock-listItem[data-id="' + store.properties.store_id + '"]').addEventListener('click', function () {
        var coord = store.geometry.coordinates;
        var lat = coord[1];
        var lng = coord[0];
        woosmapRecommendation.sendUserFavoritedPOI({
            lat: lat, lng: lng, id: store.properties.store_id,
            successCallback: function () {
                this.plugin.ui.resetStoreSearch();
                this.hideSearchPanel();
                //self.plugin.manager.initialRecommendation();
                this.plugin.ui.buildHTMLInitialReco(store);
            }.bind(this),
            errorCallback: function () {
                this.plugin.ui.resetStoreSearch();
                this.hideSearchPanel();
                console.error('Error recommendation');
            }.bind(this)
        });
    }.bind(this));
};

/**
 * resetStoreSearch
 */
UI.prototype.resetStoreSearch = function () {
    this._searchManager.clearPanel();
};
/**
 * openStore
 * @param store
 */
UI.prototype.openStore = function (store) {
    var url;
    if (store.properties.contact && store.properties.contact.website && this.config.options.urls.store.target !== false) {
        if (this.config.options.urls.store.href === true) {
            url = store.properties.contact.website;
        } else if (typeof this.config.options.urls.store.href === 'string') {
            url = this.config.options.urls.store.href;
        }
        window.open(url, this.config.options.urls.store.target || '_self');
    }
};
/**
 * openAllStores
 */
UI.prototype.openAllStores = function () {
    window.open(this.config.options.urls.stores.href, this.config.options.urls.stores.target || '_self');
};
/**
 * showLoader
 */
UI.prototype.showLoader = function () {
    this.panelContainer.querySelector('.gr-wgs-homestore-panel-loaderBlock').style.display = 'block;';
};
/**
 * hideLoader
 */
UI.prototype.hideLoader = function () {
    this.panelContainer.querySelector('.gr-wgs-homestore-panel-loaderBlock').style.display = 'none;';
};

module.exports = UI;
