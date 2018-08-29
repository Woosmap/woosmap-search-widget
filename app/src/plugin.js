var Config = require('./config');
var MapsLoader = require('./mapsloader');
var UI = require('./ui.js');
var Manager = require('./manager');
var network = require('./network');

/**
 * Construct a new Recommendation Widget instance
 *
 * @param {String} [containerId] parameters to load Google Maps API or clientId as string
 * @param {RecommendationPluginConf} [configObject] RecommendationPluginConf Object
 * additional google libraries to load.
 * @constructor
 * @memberOf wgs.searchwidget
 * @example Instantiation Example
 *
 *```js
 *document.addEventListener('DOMContentLoaded', function () {
 *  new wgs.searchwidget.RecommendationPlugin('containerId', {"woosmapKey":"xxxx"});
 *})
 *```
 */
function RecommendationPlugin(selector, options) {
    this.manager = null;
    this.ui = null;
    options.container = selector;
    this.config = new Config(options);

    var usePlaces = this.config.options.usePlaces;

    this.mapsLoader = new MapsLoader({
        clientId: this.config.options.google.clientId,
        channelId: this.config.options.google.channel,
        key: this.config.options.google.key,
        librariesToLoad: ['places'],
        region: this.config.options.google.region,
        language: this.config.options.google.language
    });
    this.container = document.querySelector(selector);

    this.callbackInitialRecommendedStore = this.config.options.callbackInitialRecommendedStore instanceof Function ? this.config.options.callbackInitialRecommendedStore : null;
    this.callbackUserSelectedStore = this.config.options.callbackUserSelectedStore instanceof Function ? this.config.options.callbackUserSelectedStore : null;
    this.callbackOnSuccessHTML5Location = this.config.options.callbackOnSuccessHTML5Location instanceof Function ? this.config.options.callbackOnSuccessHTML5Location : null;
    this.callbackOnErrorHTML5Location = this.config.options.callbackOnErrorHTML5Location instanceof Function ? this.config.options.callbackOnErrorHTML5Location : null;
    this.callbackDOMWidgetReady = this.config.options.callbackDOMWidgetReady instanceof Function ? this.config.options.callbackDOMWidgetReady : null;

    if (this.container === null) {
        throw new Error('querySelector for ' + selector + ' returned null.');
    }

    this.mapsLoader.load(function () {
        this.ui = new UI(this.container, usePlaces, this, this.config);
        this.manager = new Manager(this, this.config);
        if (this.config.options.userAllowedReco === true) {
            this.allowUserReco();
        }
        else {
            this.manager.initialRecommendation();
        }
        if (this.callbackDOMWidgetReady instanceof Function) {
            this.callbackDOMWidgetReady();
        }
    }.bind(this));

}


RecommendationPlugin.prototype._getRecommendationScript = function (callback) {
    if (typeof woosmapRecommendation === "object") {
        callback();
    }
    else {
        var scriptUrl = this.config.options.woosmap.recoScriptUrl;
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;

        scriptElement.src = scriptUrl;

        var firstScript = document.getElementsByTagName('head')[0];
        firstScript.appendChild(scriptElement, firstScript);

        if (scriptElement.readyState) {
            scriptElement.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    callback();
                }
                else {
                    console.error('Error when loading script ' + scriptUrl);
                }
            };
        } else {
            scriptElement.onload = function () {
                callback();
            };
            scriptElement.onerror = function () {
                console.error('Error when loading script ' + scriptUrl);
            };
        }
    }
};

/**
 * To enable the Woosmap Automatic Recommendation.
 * If called, a cookie of Woosmap userId will be set on the user device and recommended store will be store in LocalStorage.
 * It loads `recommendation.js` file (or not if already loaded). No need to call it if `userAllowedReco : true` is already defined in the RecommendationPluginConf
 */
RecommendationPlugin.prototype.allowUserReco = function () {
    this.config.options.userAllowedReco = true;
    this._getRecommendationScript(function () {
        woosmapRecommendation.setProjectKey(this.config.options.woosmapKey);
        this.manager.initialRecommendation();
    }.bind(this));
};

/**
 * Sets the selected store using its storeId, and refresh interface.
 * @param {String} storeId 
 * @param {Function} success 
 * @param {Function} error 
 */
RecommendationPlugin.prototype.setSelectedStoreId = function (storeId, success, error) {
    network.get(
        'https://api.woosmap.com/stores/search?key=' + this.config.options.woosmapKey + '&query=idstore:="' + storeId + '"',
        function (response) {
            var jsonData = JSON.parse(response);
            var stores = jsonData.features;
            if (store.length > 0) {
                this.manager.saveStoreToLocalStorage(stores[0]);
                this.ui.buildHTMLInitialReco(stores[0])

                if (success !== undefined) {
                    success();
                }
            }
        }.bind(this),
        function (statusText) {
            if (error !== undefined) {
                error(statusText);
            }
            else {
                console.error('Error while setting Selected store Id (' + statusText + ')');
            }
        });
};

module.exports = RecommendationPlugin;
