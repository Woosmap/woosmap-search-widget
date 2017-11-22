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
        limit: this.limit,
        query: this.query,
        maxDistance: this.maxDistance
    });
};


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
 * HTML5Recommendation
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromHTML5 = function (lat, lng) {
    this.searchStores(lat, lng);
    woosmapRecommendation.sendUserHtml5Position({lat: lat, lng: lng});
};

/**
 * recommendStores
 * @param lat
 * @param lng
 */
Manager.prototype.recommendStoresFromSearch = function (lat, lng) {
    this.searchStores(lat, lng);
    woosmapRecommendation.sendUserSearchedPosition({lat: lat, lng: lng});
};

module.exports = Manager;