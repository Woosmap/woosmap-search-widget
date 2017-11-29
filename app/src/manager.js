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
    woosmapRecommendation.setProjectKey(this.config.options.woosmapKey);

    this.initialRecommendation();
}

/**
 * initialRecommendation
 */
Manager.prototype.initialRecommendation = function () {
    if (typeof window.localStorage !== 'undefined') {
        var savedFavoritedStore = JSON.parse(window.localStorage.getItem(this.config.options.woosmapKey));
        if (savedFavoritedStore !== null) {
            this.plugin.ui.buildHTMLInitialReco(savedFavoritedStore);
        }
        else {
            this.getUserRecommendation();
        }
    }
    else {
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
                self.plugin.ui.buildHTMLInitialReco(stores[0]);
                if (typeof window.localStorage !== 'undefined') {
                    window.localStorage.setItem(self.config.options.woosmapKey, JSON.stringify(stores[0]));
                }
            }
            else {
                self.plugin.ui.buildHTMLFindMyStore();
            }
        },
        errorCallback: function (response) {
            if(response.status === 401 ) {
                self.plugin.ui.buildHTMLFindMyStore("...error, wrong public key");
            }
            else if(response.status === 403 ) {
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
        console.error('Error recommendation');
    };
    woosmapRecommendation.searchStores({
        lat: lat,
        lng: lng,
        successCallback: function (resp) {
            var stores = resp.features;
            updateStoresWithGoogle(stores, lat, lng,
                function (sortedStores) {
                    self.plugin.ui.hideLoader();
                    self.plugin.ui.buildHTMLRecommendationResults(sortedStores);
                },
                errorCallback);
        },
        errorCallback: errorCallback,
        storesByPage: this.limit,
        query: this.query,
        maxDistance: this.maxDistance
    });
};

/**
 * recommendStoresFromHTML5
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromHTML5 = function (lat, lng) {
    this.searchStores(lat, lng);
    woosmapRecommendation.sendUserHtml5Position({lat: lat, lng: lng});
};

/**
 * recommendStoresFromSearch
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromSearch = function (lat, lng) {
    this.searchStores(lat, lng);
    woosmapRecommendation.sendUserSearchedPosition({lat: lat, lng: lng});
};

module.exports = Manager;