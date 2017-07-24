var Config = require('./config.js');
var MapsLoader = require('./mapsloader.js');
var UI = require('./ui.js');
var Manager = require('./manager.js');

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
        librariesToLoad: ['places']
    });
    this.container = document.querySelector(selector);

    if (this.container === null) {
        throw new Error('querySelector for ' + selector + ' returned null.');
    }

    this.mapsLoader.load(function () {
        this.manager = new Manager(this, this.config);
        this.ui = new UI(this.container, usePlaces, this, this.config);
    }.bind(this));

}

module.exports = RecommendationPlugin;
