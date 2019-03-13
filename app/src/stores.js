/**
 * updateStores
 * @param stores
 * @param latitude
 * @param longitude
 * @param callback
 * @param errorCallback
 * @param withDistanceMatrix
 */
function updateStores(stores, latitude, longitude, callback, errorCallback, withDistanceMatrix) {
    if (typeof withDistanceMatrix !== 'undefined' && withDistanceMatrix !== null && withDistanceMatrix) {
        var request = {
            destinations: stores.map(function (store) {
                return new google.maps.LatLng(store.geometry.coordinates[1], store.geometry.coordinates[0]);
            }),
            origins: [new google.maps.LatLng(latitude, longitude)],
            travelMode: google.maps.TravelMode.DRIVING
        };

        updateStoresWithDistanceMatrix(request, stores, latitude, longitude, callback, errorCallback);
    } else {
        updateStoresAsTheCrowFlies(stores, callback);
    }
}

/**
 * updateStoresAsTheCrowFlies
 * @param stores
 * @param callback
 */
function updateStoresAsTheCrowFlies(stores, callback) {
    stores.sort(function (a, b) {
        return a.properties.distance > b.properties.distance;
    });

    callback(stores);
}


/**
 * Sorts results from DistanceMatrixService
 * @param a
 * @param b
 * @returns {*}
 */
function distanceWithGoogleSortFunction(a, b) {
    return ((typeof a.properties.distanceWithGoogle === 'undefined' || typeof b.properties.distanceWithGoogle === 'undefined') ? null : a.properties.distanceWithGoogle - b.properties.distanceWithGoogle);
}


/**
 * updateStoresWithDistanceMatrix
 * @param stores
 * @param latitude
 * @param longitude
 * @param callback
 * @param errorCallback
 */
function updateStoresWithDistanceMatrix(request, stores, latitude, longitude, callback, errorCallback) {
    var distanceMatrixService = new google.maps.DistanceMatrixService();

    distanceMatrixService.getDistanceMatrix(request, function (response, status) {
        if (status === google.maps.DistanceMatrixStatus.OK) {
            var results = response.rows[0].elements;

            for (var i = 0, ln = stores.length; i < ln; i++) {
                if (results[i].status !== google.maps.DistanceMatrixElementStatus.ZERO_RESULTS)
                    stores[i].properties.distanceWithGoogle = results[i].distance.value;
            }

            stores.sort(distanceWithGoogleSortFunction);
            callback(stores);
        } else if (status === google.maps.DistanceMatrixStatus.UNKNOWN_ERROR) {
            window.setTimeout(function () {
                this.updateStores(request, stores, latitude, longitude, callback, errorCallback);
            }.bind(this), 1500);
        } else {
            errorCallback();
            console.error(status);
        }
    });
}

module.exports = updateStores;
