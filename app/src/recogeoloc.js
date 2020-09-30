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

Recommendation.prototype.sendUserHtml5Position = function () {
};

Recommendation.prototype.sendUserSearchedPosition = function () {
};

Recommendation.prototype.sendUserConsultedPOI = function () {
};

Recommendation.prototype.sendUserFavoritedPOI = function () {
};

Recommendation.prototype.getUserRecommendation = function (getRecommendationOptions) {
    network.get(
        this.geolocApiUrl
        + 'stores/'
        + '?key=' + this.projectKey
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
        this.searchApiUrl + '?key=' + this.projectKey
        + '&lat=' + getStoresOptions.lat
        + '&lng=' + getStoresOptions.lng
        + '&max_distance=' + getStoresOptions.maxDistance
        + '&stores_by_page=' + getStoresOptions.storesByPage
        + '&query=' + getStoresOptions.query,
        function (response) {
            getStoresOptions.successCallback(JSON.parse(response));
        },
        function (statusText) {
            console.error('Error while searching stores (' + statusText + ')');
            getStoresOptions.errorCallback();
        });
};


Recommendation.prototype.getConsent = function (consentCallback) {
    consentCallback(true);
};

module.exports = Recommendation;