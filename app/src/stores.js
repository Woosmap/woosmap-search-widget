/**
 * updateStoresWithGoogle
 * @param stores
 * @param latitude
 * @param longitude
 * @param callback
 * @param errorCallback
 * @param withDistanceMatrix
 */
function updateStoresWithGoogle(stores, latitude, longitude, callback, errorCallback, withDistanceMatrix) {
    if (typeof withDistanceMatrix === 'undefined' || withDistanceMatrix === null) {
        withDistanceMatrix = false;
    }

    var destinations = [];
    for (var i = 0, ln = stores.length; i < ln; i++) {
        var coordinates = stores[i].geometry.coordinates;
        destinations.push(new google.maps.LatLng(coordinates[1], coordinates[0]));
    }

    var request = {
        destinations: destinations,
        origins: [new google.maps.LatLng(latitude, longitude)],
        travelMode: google.maps.TravelMode.DRIVING
    };

    if (withDistanceMatrix) {
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
                this.updateStoresWithGoogle(request, stores, latitude, longitude, callback, errorCallback);
            }.bind(this), 1500);
        } else {
            errorCallback();
            console.error(status);
        }
    });
}

module.exports = updateStoresWithGoogle;
