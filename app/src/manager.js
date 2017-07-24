var updateStoresWithGoogle = require('./stores.js');
var CONSTANT = require('./constants.js');

function buildSearchStoresCallback(lat, lng, limit, callback, errorCallback) {
    return function () {
        woosmapRecommendation.searchStores({
            lat: lat,
            lng: lng,
            successCallback: function (resp) {
                var stores = resp.features;
                updateStoresWithGoogle(stores, lat, lng, callback);
            },
            errorCallback: errorCallback,
            storesByPage: limit
        });
    };
}

/**
 * Manager
 * @param plugin
 * @param config
 */
function Manager(plugin, config) {

    this.plugin = plugin;
    this.config = config;
    this.limit = this.config.options.woosmap.limit;
    woosmapRecommendation.setProjectKey(this.config.options.woosmapKey);

    this.initialRecommendation();
}

/**
 * initialRecommendation
 */
Manager.prototype.initialRecommendation = function () {
    var self = this;

    woosmapRecommendation.getUserRecommendation({
        successCallback: function (response) {
            if (CONSTANT.debug) {
                console.error(response);
            }
            if (response && response.features && response.features.length > 0) {
                var stores = response.features;
                self.plugin.ui.buildHTMLInitialReco(stores[0]);
            }
            else {
                self.plugin.ui.buildHTMLFindMyStore();
            }
        },
        limit: this.limit
    });
};

/**
 * HTML5Recommendation
 * @param lat
 * @param lng
 */
Manager.prototype.HTML5Recommendation = function (lat, lng) {
    this.plugin.ui.showLoader();
    var self = this;
    var errorCallback = function () {
        self.plugin.ui.hideLoader();
        console.error('Error recommendation');
    };

    woosmapRecommendation.sendUserHtml5Position({
        lat: lat,
        lng: lng,
        successCallback: buildSearchStoresCallback(
            lat,
            lng,
            self.limit,
            function (sortedStores) {
                self.plugin.ui.hideLoader();
                self.plugin.ui.buildHTMLRecommendationResults(sortedStores);
            },
            errorCallback),
        errorCallback: errorCallback
    });
};

/**
 * SearchedRecommendation
 * @param lat
 * @param lng
 */
Manager.prototype.SearchedRecommendation = function (lat, lng) {
    var errorCallback = function () {
        this.plugin.ui.hideLoader();
        console.error('Error recommendation');
    };

    this.plugin.ui.showLoader();

    woosmapRecommendation.sendUserSearchedPosition({
        lat: lat, lng: lng,
        successCallback: buildSearchStoresCallback(
            lat,
            lng,
            this.limit,
            function (sortedStores) {
                this.plugin.ui.hideLoader();
                this.plugin.ui.buildHTMLRecommendationResults(sortedStores);
            }.bind(this),
            errorCallback),
        errorCallback: errorCallback
    });
};

/**
 * SearchedStores
 * @param lat
 * @param lng
 */
Manager.prototype.SearchedStores = function (lat, lng) {
    this.plugin.ui.showLoader();

    var errorCallback = function () {
        this.plugin.ui.hideLoader();
        console.error('Error recommendation');
    }.bind(this);

    woosmapRecommendation.sendUserSearchedPosition({
        lat: lat, lng: lng,
        successCallback: buildSearchStoresCallback(
            lat,
            lng,
            this.limit,
            function (sortedStores) {
                this.plugin.ui.hideLoader();
                this.plugin.ui.buildHTMLRecommendationResults(sortedStores);
            }.bind(this),
            errorCallback),
        errorCallback: errorCallback
    });
};

module.exports = Manager;
