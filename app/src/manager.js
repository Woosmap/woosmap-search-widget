var updateStoresWithGoogle = require('./stores.js');
var CONSTANT = require('./constants.js');

/**
 * Manager
 * @param plugin
 * @param config
 */
function Manager(plugin, config) {
    this.plugin = plugin;
    this.config = config;
    this.limit = this.config.options.woosmap.limit;
    this.query = this.config.options.woosmap.query;
    this.maxDistance = this.config.options.woosmap.maxDistance || 0;
    this.searchAPIUrl = this.config.options.woosmap.apiUrl + '?key=' + this.config.options.woosmapKey;
    if (this.config.options.userAllowedReco === false) {
        if (this.config.options.omitUIReco === true) {
            this.plugin.ui.showSearchPanel();
        }
        else {
            this.plugin.ui.buildHTMLFindMyStore();
        }
    }
}


/**
 * initialRecommendation
 */
Manager.prototype.initialRecommendation = function () {
    if (typeof window.localStorage !== 'undefined') {
        var savedFavoritedStore = JSON.parse(window.localStorage.getItem(this.config.options.woosmapKey));
        if (savedFavoritedStore !== null) {
            if (this.plugin.callbackInitialRecommendedStore instanceof Function) {
                this.plugin.callbackInitialRecommendedStore(savedFavoritedStore);
            }
            if (this.config.options.omitUIReco === true) {
                this.plugin.ui.showSearchPanel();
            }
            else {
                this.plugin.ui.buildHTMLInitialReco(savedFavoritedStore);
            }
        }
        else if (this.config.options.userAllowedReco === true) {
            this.getUserRecommendation();
        }
    }
    else if (this.config.options.userAllowedReco === true) {
        this.getUserRecommendation();
    }
};


/**
 * getUserRecommendation
 */
Manager.prototype.getUserRecommendation = function () {
    var self = this;
    woosmapRecommendation.getUserRecommendation({
        successCallback: function (response) {
            if (CONSTANT.debug) {
                console.error(response);
            }
            if (response && response.features && response.features.length > 0) {
                var stores = response.features;
                if (self.plugin.callbackInitialRecommendedStore instanceof Function) {
                    self.plugin.callbackInitialRecommendedStore(stores[0]);
                }
                if (self.config.options.omitUIReco === true) {
                    self.plugin.ui.showSearchPanel();
                }
                else {
                    self.plugin.ui.buildHTMLInitialReco(stores[0]);
                }
                if (typeof window.localStorage !== 'undefined') {
                    window.localStorage.setItem(self.config.options.woosmapKey, JSON.stringify(stores[0]));
                }
            }
            else {
                if (self.config.options.omitUIReco === true) {
                    self.plugin.ui.showSearchPanel();
                }
                else {
                    self.plugin.ui.buildHTMLFindMyStore();
                }
            }
        },
        errorCallback: function (response) {
            if (response.status === 401) {
                self.plugin.ui.buildHTMLFindMyStore("...error, wrong public key");
            }
            else if (response.status === 403) {
                self.plugin.ui.buildHTMLFindMyStore("...error, unauthorized domain");
            }
            else {
                self.plugin.ui.buildHTMLFindMyStore("...error retrieving data");
            }
        },
        limit: this.limit,
        query: this.query,
        maxDistance: this.maxDistance
    });
};

/**
 * searchStores
 * @param lat
 * @param lng
 */
Manager.prototype.searchStores = function (lat, lng) {
    this.plugin.ui.showLoader();
    var self = this;
    var errorCallback = function () {
        self.plugin.ui.hideLoader();
        console.warn('Error Searching for Stores nearby!', lat, lng);
        self.plugin.ui.buildHTMLNoResults();
    };
    woosmapRecommendation.searchStores({
        lat: lat,
        lng: lng,
        successCallback: function (resp) {
            var stores = resp.features;
            if (stores.length > 0) {
                updateStoresWithGoogle(stores, lat, lng,
                    function (sortedStores) {
                        self.plugin.ui.hideLoader();
                        self.plugin.ui.buildHTMLRecommendationResults(sortedStores);
                    },
                    errorCallback);
            }
            else {
                self.plugin.ui.hideLoader();
                self.plugin.ui.buildHTMLNoResults();
            }
        },
        errorCallback: errorCallback,
        storesByPage: this.limit,
        query: this.query,
        maxDistance: this.maxDistance
    });
};


Manager.prototype.searchStoresWithoutReco = function (lat, lng) {
    this.plugin.ui.showLoader();
    var self = this;
    var errorCallback = function () {
        self.plugin.ui.hideLoader();
        console.warn('Error Searching for Stores nearby!', lat, lng);
        self.plugin.ui.buildHTMLNoResults();
    };
    if (typeof this.request === 'undefined') {
        this.request = new window.XMLHttpRequest();
    }
    this.request.open('GET', this.searchAPIUrl
        + '&lat=' + lat
        + '&lng=' + lng
        + '&max_distance=' + this.config.options.woosmap.maxDistance
        + '&stores_by_page=' + this.limit
        + '&query=' + this.config.options.woosmap.query, true);
    this.request.onload = function () {
        if (self.request.status >= 200 && self.request.status < 400) {
            var stores = JSON.parse(self.request.responseText).features;
            if (stores.length > 0) {
                updateStoresWithGoogle(stores, lat, lng,
                    function (sortedStores) {
                        self.plugin.ui.hideLoader();
                        self.plugin.ui.buildHTMLRecommendationResults(sortedStores);
                    },
                    errorCallback);
            }
            else {
                self.plugin.ui.hideLoader();
                self.plugin.ui.buildHTMLNoResults();
            }
        } else {
            self.plugin.ui.hideLoader();
            self.plugin.ui.buildHTMLNoResults();
        }
    };
    this.request.onerror = function () {
        self.plugin.ui.buildHTMLNoResults();
        errorCallback();
    };
    this.request.send();
};


/**
 * recommendStoresFromHTML5
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromHTML5 = function (lat, lng) {
    if (this.config.options.userAllowedReco === true) {
        this.searchStores(lat, lng);
        woosmapRecommendation.sendUserHtml5Position({lat: lat, lng: lng});
    }
    else {
        this.searchStoresWithoutReco(lat, lng);
    }
};

/**
 * recommendStoresFromSearch
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromSearch = function (lat, lng) {
    if (this.config.options.userAllowedReco === true) {
        this.searchStores(lat, lng);
        woosmapRecommendation.sendUserSearchedPosition({lat: lat, lng: lng});
    }
    else {
        this.searchStoresWithoutReco(lat, lng);
    }
};

module.exports = Manager;