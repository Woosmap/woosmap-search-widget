var Config = require('./config.js');
var MapsLoader = require('./mapsloader.js');
var UI = require('./ui.js');
var Manager = require('./manager.js');

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
        if (this.callbackDOMWidgetReady instanceof Function) {
            this.callbackDOMWidgetReady();
        }
    }.bind(this));

}

/**
 * _getRecommendationScript
 * load scriptUrl and callback() once fully loaded
 */
RecommendationPlugin.prototype._getRecommendationScript = function (scriptUrl, callback) {
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
};

/**
 * allowUserReco
 */
RecommendationPlugin.prototype.allowUserReco = function () {
    this._getRecommendationScript(this.config.options.woosmap.recoScriptUrl, function () {
        this.config.options.userAllowedReco = true;
        this.manager.initialRecommendation();
    }.bind(this));
};

module.exports = RecommendationPlugin;
