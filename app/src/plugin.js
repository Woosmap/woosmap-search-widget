var Config = require('./config.js');
var MapsLoader = require('./mapsloader.js');
var UI = require('./ui.js');
var Manager = require('./manager.js');

/**
 * Construct a new Recommendation Widget instance
 *
 * @param {String} [containerId] parameters to load Google Maps API or clientId as string
 * @param {RecommendationPluginConf} [configObject] YTotozgiorn loirzfgnoprzg
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

    if (this.container === null) {
        throw new Error('querySelector for ' + selector + ' returned null.');
    }

    this.mapsLoader.load(function () {
        this.ui = new UI(this.container, usePlaces, this, this.config);
        this.manager = new Manager(this, this.config);
    }.bind(this));

}

module.exports = RecommendationPlugin;
