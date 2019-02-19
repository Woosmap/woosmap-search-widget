var updateStoresWithGoogle = require('./stores.js');
var CONSTANT = require('./constants.js');
var network = require('./network');

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
        } else {
            this.plugin.ui.buildHTMLFindMyStore();
        }
    }
}


/**
 * Reads the store from the localStorage.
 */
Manager.prototype.getStoreFromLocalStorage = function () {
    return JSON.parse(window.localStorage.getItem(this.config.options.woosmapKey));
};

/**
 * Writes the store to the localStorage.
 * @param {*} store
 */
Manager.prototype.saveStoreToLocalStorage = function (store) {
    window.localStorage.setItem(this.config.options.woosmapKey, JSON.stringify(store));
};

/**
 * initialRecommendation
 */
Manager.prototype.initialRecommendation = function () {
    if (typeof window.localStorage !== 'undefined') {
        var savedFavoritedStore = this.getStoreFromLocalStorage();
        if (savedFavoritedStore !== null) {
            if (this.config.options.omitUIReco === true) {
                this.plugin.ui.showSearchPanel();
            } else {
                this.plugin.ui.buildHTMLInitialReco(savedFavoritedStore);
            }
            if (this.plugin.callbackInitialRecommendedStore instanceof Function) {
                this.plugin.callbackInitialRecommendedStore(savedFavoritedStore);
            }
        } else if (this.config.options.userAllowedReco === true) {
            this.getUserRecommendation();
        }
    } else if (this.config.options.userAllowedReco === true) {
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
                if (self.config.options.omitUIReco === true) {
                    self.plugin.ui.showSearchPanel();
                } else {
                    self.plugin.ui.buildHTMLInitialReco(stores[0]);
                }
                if (typeof window.localStorage !== 'undefined') {
                    self.saveStoreToLocalStorage(stores[0]);
                }
                if (self.plugin.callbackInitialRecommendedStore instanceof Function) {
                    self.plugin.callbackInitialRecommendedStore(stores[0]);
                }
            } else {
                if (self.config.options.omitUIReco === true) {
                    self.plugin.ui.showSearchPanel();
                } else {
                    self.plugin.ui.buildHTMLFindMyStore();
                }
            }
        },
        errorCallback: function (response) {
            if (response.status === 401) {
                self.plugin.ui.buildHTMLFindMyStore("...error, wrong public key");
            } else if (response.status === 403) {
                self.plugin.ui.buildHTMLFindMyStore("...error, unauthorized domain");
            } else {
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
                    errorCallback, this.config.options.withDistanceMatrix);
            } else {
                self.plugin.ui.hideLoader();
                self.plugin.ui.buildHTMLNoResults();
            }
        }.bind(this),
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
        console.warn('Can\'t find Stores nearby:', lat, lng);
        self.plugin.ui.buildHTMLNoResults();
    };
    network.get(
        this.searchAPIUrl
        + '&lat=' + lat
        + '&lng=' + lng
        + '&max_distance=' + this.config.options.woosmap.maxDistance
        + '&stores_by_page=' + this.limit
        + '&query=' + this.config.options.woosmap.query,
        function (response) {
            var jsonData = JSON.parse(response);
            var stores = jsonData.features;
            if (stores.length > 0) {
                updateStoresWithGoogle(stores, lat, lng,
                    function (sortedStores) {
                        self.plugin.ui.hideLoader();
                        self.plugin.ui.buildHTMLRecommendationResults(sortedStores);
                    },
                    errorCallback, this.config.options.withDistanceMatrix);
            } else {
                self.plugin.ui.hideLoader();
                self.plugin.ui.buildHTMLNoResults();
            }
        }.bind(this),
        function (statusText) {
            console.error('Error while searching stores (' + statusText + ')');
            errorCallback();
        });
};

/**
 * selectStoreFromStoreId
 * @param store_id
 * @param successCallback(store)
 * @param errorCallback(status)
 */
Manager.prototype.selectStoreFromStoreId = function (store_id, successCallback, errorCallback) {
    network.get(
        this.searchAPIUrl + '&query=idstore:="' + store_id + '"',
        function (response) {
            var jsonData = JSON.parse(response);
            var stores = jsonData.features;
            if (stores.length > 0) {
                this.saveStoreToLocalStorage(stores[0]);
                this.plugin.ui.buildHTMLInitialReco(stores[0]);
                if (successCallback !== undefined) {
                    successCallback(stores[0]);
                }
            } else {
                if (errorCallback !== undefined) {
                    errorCallback('No Store with ID: ' + store_id);
                }
                console.warn('No Store with ID:', store_id);
            }
        }.bind(this),
        function (statusText) {
            if (errorCallback !== undefined) {
                errorCallback(statusText);
            } else {
                console.error('Error while setting Selected store by Id (' + statusText + ')');
            }
        });
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
    } else {
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
    } else {
        this.searchStoresWithoutReco(lat, lng);
    }
};


module.exports = Manager;