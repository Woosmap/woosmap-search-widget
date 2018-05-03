function HTML5Location(container, plugin, config) {
    this.config = config;
    this.container = container;
    this.plugin = plugin;

    this.ERRORS = {
        HTTPS: typeof this.config.L10n.geolocationErrHttps !== "undefined" ? this.config.L10n.geolocationErrHttps : "...Geolocation works only through HTTPS",
        BLOCKED: typeof this.config.L10n.geolocationErrBlocked !== "undefined" ? this.config.L10n.geolocationErrBlocked : "...Geolocation Blocked By User"
    };
    this.initialize();
}

HTML5Location.prototype.initialize = function () {
    this.buildHTML();
    this.defineEvents();
};

HTML5Location.prototype.buildHTML = function () {
    var template =
        '<div class="gr-wgs-homestore-panel-searchBlock-btn gr-wgs-homestore-panel-aroundMe-btn">' + this.config.L10n.searchAroundMeBtn + '</div>';
    this.container.insertAdjacentHTML('afterbegin', template);
};

HTML5Location.prototype.defineEvents = function () {
    var self = this;
    var successCallback = function (resp) {
        var lat = resp.coords.latitude;
        var lng = resp.coords.longitude;
        self.plugin.manager.recommendStoresFromHTML5(lat, lng);
        if (self.plugin.callbackOnSuccessHTML5Location instanceof Function) {
            self.plugin.callbackOnSuccessHTML5Location(resp);
        }
    };

    var errorCallback = function (resp) {
        if (resp && resp.message && resp.message.indexOf("Only secure origins are allowed") === 0) {
            self.plugin.ui.slideDownWarningHTML5(self.ERRORS.HTTPS);
        }
        else {
            self.plugin.ui.slideDownWarningHTML5(self.ERRORS.BLOCKED);
        }
        if (self.plugin.callbackOnErrorHTML5Location instanceof Function) {
            self.plugin.callbackOnErrorHTML5Location(resp);
        }
    };

    this.container.querySelector('.gr-wgs-homestore-panel-aroundMe-btn').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });
};

module.exports = HTML5Location;
