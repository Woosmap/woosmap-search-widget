/**
 * @typedef {Object} RecommendationPluginConf
 * @example RecommendationPluginConf Example
 *
 *```js
 * var functionCallbackInitRecoStore = function(store){console.log(store)}
 * var functionCallbackSelectRecoStore = function(store){console.log(store)}
 * var functionCallbackSuccessHTML5Loc = function(position){console.log(position)}
 * var functionCallbackErrorHTML5Loc = function(error){console.log(error)}
 * var functionCallbackDOMWidgetReady = function(){console.log(document.querySelector('.gr-wgs-homestore-panel-aroundMe-btn'))}
 * var myConfig = {
 *    container: "myHTMLContainerId",
 *    woosmapKey: "woos-27e715eb-6454-3019-95c1-e90a418939a1",
 *    callbackInitialRecommendedStore: functionCallbackInitRecoStore,
 *    callbackUserSelectedStore: functionCallbackSelectRecoStore,
 *    callbackOnSuccessHTML5Location: functionCallbackSuccessHTML5Loc,
 *    callbackOnErrorHTML5Location: functionCallbackErrorHTML5Loc,
 *    callbackDOMWidgetReady: functionCallbackDOMWidgetReady,
 *    omitUIReco: true,
 *    withDistanceMatrix: false,
 *    userAllowedReco: true,
 *    google: {
 *        clientId: "customer-clientId",
 *        key: "AIzaSyAgaUwsVVXJ6KMxlxI-1234556789"
 *    },
 *    usePlaces: true,
 *    useLocalities: false,
 *    autocompleteLocalities: {
 *        types: "locality",
 *        componentRestricitions: {
 *            country: "fr"
 *        },
 *        language: "fr",
 *
 *    }
 *    lang: "en",
 *    translations: {
 *        en: {
 *            "searchAroundMeBtn": "Around Me",
 *            "searchAroundMeTitle": "Find Nearby Store",
 *            "selectAroundMeTitle": "Choose Nearby Store:",
 *            "noResultsWarning": "Can't find nearby stores",
 *            "autocompletePlaceholder": "Address..."
 *        }
 *    }
 *}
 *```
 * @property {String}container the `id` of the HTML container where the widget will display
 * @property {String}woosmapKey the Woosmap Public key used to connect to your datasource
 * @property {Function}callbackInitialRecommendedStore Callback Function called with [`store`](/products/data-api/samples/api-response/) parameter when an Initial Recommended Store is Found.
 * @property {Function}callbackUserSelectedStore Callback Function called with [`store`](/products/data-api/samples/api-response/) parameter When a User Select a Store after a Geocoding Search.
 * @property {Function}callbackOnSuccessHTML5Location Callback Function called with a [`Position`](https://www.w3.org/TR/geolocation-API/#position_interface) parameter when a Navigator.geolocation has succeeded (triggered on Search Around Me Button).
 * @property {Function}callbackOnErrorHTML5Location Callback Function called with an [`PositionError`](https://www.w3.org/TR/geolocation-API/#position_error_interface) parameter when a Navigator.geolocation has failed (triggered on Search Around Me Button).
 * @property {Function}callbackDOMWidgetReady Callback Function called when the Initial Widget innerHTML is fully rendered and thus accessible from the DOM.
 * @property {Boolean}omitUIReco to disable the display of Store in recommendation block. if set to true, use the callbacks above to manage the reco in your website
 * @property {Boolean}withDistanceMatrix to enable sorting stores using DistanceMatrixService. Default is true. If set to false, stores are sorted using distances as the crow flies.
 * @property {Boolean}userAllowedReco to enable the Woosmap Recommendation. Default/unset equal to false (GDPR compliant). if set to true, a cookie of Woosmap userId will be set on the user device and recommended store will be store in LocalStorage
 * @property {GoogleConf}google Google ids parameters
 * @property {UrlsConf}urls To open store(s) website(s)
 * @property {Boolean}usePlaces To enable places autocomplete search
 * @property {Boolean}useLocalities To enable autocompleteLocalities autocomplete search
 * @property {autocompleteLocalitiesConf}autocompleteLocalities Localities Specifications
 * @property {AutocompletePlacesConf}autocompletePlaces Autocomplete Places Specification.
 * @property {GeocoderConf}geocoder Geocoder Specification
 * @property {WoosmapConf}woosmap Woosmap search specification.
 * @property {DisplayConf}display UI search / results specification.
 * @property {String}lang Language of the widget.
 * @property {TranslationsConf}translations Translations list
 */


/**
 * @typedef {Object} GoogleConf
 * @example GoogleConf Example
 *
 *```json
 *{
 *   "google": {
 *       "clientId": "customer-clientId",
 *       "key": "AIzaSyAgaUwsVVXJ6KMxlxI-1234556789",
 *       "channel": "prod-integration",
 *       "language": "fr",
 *       "region": "FR"
 *   }
 *}
 *```
 * @property {String}clientId the Google Client ID to authenticate your application
 * @property {String}key the Google API Key (for Premium Plan License users, only use your clientID)
 * @property {String}channel used for Google API Usage reports
 * @property {String}language Google Language Parameter (used for Google Places geocoder).
 * See: [language support](https://developers.google.com/maps/faq#languagesupport)
 * @property {String}region Google region Parameter (used for Google Places geocoder). This parameter will only influence, not fully restrict, results from the geocoder.
 */


/**
 * @typedef {Object} UrlsConf
 * @example UrlsConf Example
 *
 *```json
 *{
 *   "urls": {
 *       "store": {
 *           "href": false,
 *           "target": "_self"
 *       },
 *       "stores": {
 *           "href": "https://developers.woosmap.com/",
 *           "target": "_self"
 *       }
 *   }
 *}
 *```
 * @property {StoreLinkConf}store To open website recommended store when it’s clicked
 * @property {StoreLinkConf}stores Global link displayed on the bottom of the widget
 */

/**
 * @typedef {Object} StoreLinkConf
 * @example StoreLinkConf Example
 *
 *```json
 *{
 *    "store": {
 *        "href": "https://www.mycompany.com/stores/city/",
 *        "target": "_blank"
 *    }
 *}
 *```
 * @property {String}href website Root URL for user interaction with store
 * @property {String}target to specifies where to open the linked document. Choose from [`'_blank'`, `'_self'`, `'_parent'`, `'_top'`, `'framename'`]
 */


/**
 * @typedef {Object} AutocompletePlacesConf
 * @example AutocompletePlacesConf Example
 *
 *```json
 *{
 *   "autocompletePlaces": {
 *       "minLength": 3,
 *       "types": ["geocode"],
 *       "bounds": {
 *           "west": -4.87293470,
 *           "north": 51.089062,
 *           "south": 42.19809198,
 *           "east": 8.332631
 *       },
 *       "componentRestrictions": {"country": "gb"}
 *   }
 *}
 *```
 * @property {int} minLength The minimum number of characters a user must type before the search is performed (default is 1).
 * @property {Array<String>} types types of predictions to be returned. For a list of supported types.
 * See: [supported types](https://developers.google.com/places/supported_types#table3)
 * @property {String} channel used for Google API Usage reports
 * @property {String} componentRestrictions Geocoding Component Restriction to restrict the autocomplete search to a particular country.
 * See: [Autocomplete for Addresses and Search support](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
 */


/**
 * @typedef {Object} autocompleteLocalitiesConf
 * @example autocompleteLocalitiesConf Example
 * @property {int}minLength The minimum number of characters a user must type before the search is performed (default is 3).
 * @property {Array<LocalitiesTypes>|LocalitiesTypes} [types] The types of predictions to be returned
 * @property {LocalitiesComponentRestrictions} [componentRestrictions] The component restrictions. Component restrictions are used to restrict predictions to only those within the parent component. For example, the country.
 * @property {String} language The language code, indicating in which language the results should be returned, if possible. Searches are also biased to the selected language; results in the selected language may be given a higher ranking. If language is not supplied, the Localities service will use the default language of each country. No language necessary for postal_code request.
 * @example LocalitiesConf Example
 *
 * ```js
 * {
 *     minLength: 3,
 *     language: "fr",
 *     componentRestrictions: {
 *         country: ["be", "fr"]
 *     },
 *     types: ["locality"]
 * }
 * ```
 */


/**
 * @typedef {Object} LocalitiesComponentRestrictions
 * @property {string|Array<string>} [country] Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive). For example, 'us', 'br', or 'au'. You can provide a single one, or an array of up to five country code strings.
 * @example LocalitiesComponentRestrictions Example
 *
 * ```js
 * {
 *    country: ["be", "fr"]
 * }
 * ```
 */


/**
 * @enum {String}
 * @name LocalitiesTypes
 * @description LocalitiesTypes
 * @property {String} postal_code
 * @property {String} locality
 */


/**
 * @typedef {Object} GeocoderConf
 * @example GeocoderConf Example
 *
 *```json
 *{
 *    "geocoder": {
 *        "region": "FR"
 *    }
 *}
 *```
 * @property {String}region country code used to bias the search, specified as a Unicode region subtag / CLDR identifier.
 */


/**
 * @typedef {Object} WoosmapConf
 * @example WoosmapConf Example
 *
 *```json
 *{
 *   "woosmap": {
 *       "query": "Type:'Drive'",
 *       "limit": 5,
 *       "maxDistance": 25000
 *   }
 *}
 *```
 * @property {string}query Woosmap search query.
 * @property {int}limit Maximum stores to return. Max : 3.
 * @property {int}maxDistance represent a radius in meters to search within
 */


/**
 * @typedef {Object} DisplayConf
 * @example DisplayConf Example
 *
 *```json
 *{
 *   "display": {
 *       "h12": true,
 *       "recommendation": {},
 *       "search": {}
 *   }
 *}
 *```
 * @property {Boolean}h12 Display AM/PM hours.
 * @property {RecommendationConf}recommendation To set the displaying of the recommended store
 * @property {SearchConf}search To set the results displaying
 */


/**
 * @typedef {Object} RecommendationConf
 * @example RecommendationConf Example
 *
 *```json
 *{
 *   "recommendation": {
 *       "address": true,
 *       "phone": true,
 *       "openingDay": true,
 *       "openingWeek": true
 *   }
 *}
 *```
 * @property {Boolean}address Display the address of the recommended store
 * @property {Boolean}phone Display the contact telephone of the recommended store
 * @property {Boolean}openingDay Display the daily opening hours of the recommended store
 * @property {Boolean}openingWeek Display the weekly opening hours of the recommended store
 */


/**
 * @typedef {Object} SearchConf
 * @example SearchConf Example
 *
 *```json
 *{
 *   "search": {
 *       "address": true,
 *       "openingDay": true,
 *       "openingWeek": true
 *   }
 *}
 *```
 * @property {Boolean}address Display the address of the recommended store
 * @property {Boolean}openingDay Display the daily opening hours of the recommended store
 * @property {Boolean}openingWeek Display the weekly opening hours of the recommended store
 */


/**
 * @typedef {Object} TranslationsConf
 * @example TranslationsConf Example
 *
 *```json
 *{
 *   "fr": {
 *     "searchAroundMeBtn": "Autour de moi",
 *     "searchAroundMeTitle": "Rechercher le centre à proximité",
 *     "selectAroundMeTitle": "Choisissez le centre à proximité :",
 *     "noResultsWarning": "Aucun magasin trouvé à proximité",
 *     "autocompletePlaceholder": "Spécifiez une adresse",
 *     "allStores": "Tous nos centres",
 *     "changeStore": "Centre à proximité",
 *     "findStore": "Choisir mon centre",
 *     "selectStore": "Choisir",
 *     "openingHoursDay": "Ouvert aujourd'hui :",
 *     "openingHoursWeek": "",
 *     "geolocationNotice": "La géolocalisation n'est pas activée sur votre navigateur. Veuillez changez vos préférences.",
 *     "geolocationErrHttps": "Votre position géographique n’a pas été renvoyée par votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.",
 *     "geolocationErrBlocked": "La géolocalisation n'est pas activée sur votre navigateur. Veuillez saisir une adresse pour rechercher les magasins à proximité.",
 *     "telephone": "Tél :",
 *     "closeBtn": "Fermer",
 *     "open24": "24h/24",
 *     "days": {
 *          "1": {
 *                  "full": "Lundi",
 *                  "short": "Lun"
 *               },
 *          "2": {
 *                  "full": "Mardi",
 *                  "short": "Mar"
 *                }
 *           }
 *}
 *```
 * @property {string}language_code to customize each label for the desired language (see Widget Use and below Sample)
 */
