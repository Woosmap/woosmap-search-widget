function _getScript(scriptUrl, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;

    scriptElement.src = scriptUrl;

    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptElement, firstScript);

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

/**
 * @typedef {Object} MapsLoaderOptions
 * @property {string} [clientId] the google client id.
 * @property {Array} [librariesToLoad] a list of String containing
 * additional google libraries to load.
 * @property {String} [channelId] is a string to track usage across
 * different applications using the same client ID
 * @property {String} [key] a google maps api key.
 * @property {String} [language] desired for google maps api
 * @property {String} [region] desired for google maps api
 * @property {String} [version] desired for google maps api
 * @example MapsLoaderOptions example
 *
 * ```javascript
 * var mapsOptions = {
 *    clientId: "a_client_id",
 *    librariesToLoad: ["places"],
 *    channelId: "a_channel_id",
 *    language: "fr",
 *    region: "FR"
 *    version: "3.26"
 * }
 * ```
 */

/**
 * Constructs a MapsLoader instance.
 * @param {MapsLoaderOptions} options parameters to load Google Maps API
 * @constructor
 */
function MapsLoader(options) {
    this.clientId = options.clientId;
    this.apiKey = options.key;
    this.channel = options.channelId;
    this.librariesToLoad = options.librariesToLoad || [];
    this.language = options.language || 'fr';
    this.region = options.region || undefined;
    this.version = options.version || '3';
}

/**
 * Loads the google maps api and calls the callback when done.
 * @param {function}callback the function to be called when done.
 */
MapsLoader.prototype.load = function (callback) {
    var librariesParams = '';
    if (this.librariesToLoad.length > 0) {
        librariesParams = '&libraries=' + this.librariesToLoad.join(',');
    }

    _getScript('https://www.google.com/jsapi', function () {
        var params = 'language=' + this.language;
        if (this.region) {
            params += '&region=' + this.region;
        }
        if (this.clientId) {
            params += '&client=' + this.clientId;
        }
        if (this.apiKey) {
            params += '&key=' + this.apiKey;
        }
        if (this.channel) {
            params += '&channel=' + this.channel;
        }

        google.load('maps', this.version, {
            other_params: params + librariesParams,
            callback: function () {
                if (callback) {
                    callback();
                }
            }
        });
    }.bind(this));

};

module.exports = MapsLoader;
