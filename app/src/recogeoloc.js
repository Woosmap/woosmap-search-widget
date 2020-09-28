var network = require('./network');

var Recommendation = function (conf) {
    this.geolocApiUrl = conf.geolocApiUrl;
    this.searchApiUrl = conf.apiUrl;
};

Recommendation.prototype.setProjectKey = function (projectKey) {
    this.projectKey = projectKey;
};

Recommendation.prototype.optIn = function () {
};

Recommendation.prototype.optOut = function () {
};

Recommendation.prototype.sendUserHtml5Position = function (postPositionOptions) {
    console.error(postPositionOptions);
};

Recommendation.prototype.sendUserBeaconPosition = function (postPositionOptions) {
    console.error(postPositionOptions);
};

Recommendation.prototype.sendUserSearchedPosition = function (postPositionOptions) {
    console.error(postPositionOptions);
};

Recommendation.prototype.sendUserConsultedPOI = function (postPositionOptions) {
    console.error(postPositionOptions);
};

Recommendation.prototype.sendUserFavoritedPOI = function (postPositionOptions) {
    console.error(postPositionOptions);
};

Recommendation.prototype.sendCtaEvent = function () {
};

Recommendation.prototype.getUserRecommendation = function (getRecommendationOptions) {
    network.get(
        this.geolocApiUrl
        + 'stores/'
        + '?key=' + this.projectKey
        + '?radius=' + getRecommendationOptions.maxDistance
        + '&query=' + getRecommendationOptions.query,
        function (response) {
            getRecommendationOptions.successCallback(JSON.parse(response));
        },
        function (statusText) {
            console.error('Error while getting user recommended stores (' + statusText + ')');
            getRecommendationOptions.errorCallback({});
        });
};


Recommendation.prototype.searchStores = function (getStoresOptions) {
    network.get(
        this.searchApiUrl
        + '&lat=' + getStoresOptions.lat
        + '&lng=' + getStoresOptions.lng
        + '&max_distance=' + getStoresOptions.maxDistance
        + '&stores_by_page=' + getStoresOptions.limit
        + '&query=' + getStoresOptions.query,
        function (response) {
            getStoresOptions.successCallback(response);
        },
        function (statusText) {
            console.error('Error while searching stores (' + statusText + ')');
            getStoresOptions.errorCallback();
        });
};


Recommendation.prototype.getUserPosition = function () {
};

Recommendation.prototype.getConsent = function (consentCallback) {
    consentCallback(true);
};

module.exports = Recommendation;