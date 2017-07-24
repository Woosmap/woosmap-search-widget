function distanceWithGoogleSortFunction(a, b) {
    return a.properties.distanceWithGoogle - b.properties.distanceWithGoogle;
}

/**
 * updateStoresWithGoogle
 * @param stores
 * @param latitude
 * @param longitude
 * @param callback
 * @param errorCallback
 */
function updateStoresWithGoogle(stores, latitude, longitude, callback, errorCallback) {
    var distanceMatrixService = new google.maps.DistanceMatrixService();
    var origins = [new google.maps.LatLng(latitude, longitude)];
    var destinations = [];
    for (var i = 0; i < stores.length; i++) {
        var coordinates = stores[i].geometry.coordinates;
        destinations.push(new google.maps.LatLng(coordinates[1], coordinates[0]));
    }

    var request = {
        destinations: destinations,
        origins: origins,
        travelMode: google.maps.TravelMode.DRIVING
    };

    var self = this;
    distanceMatrixService.getDistanceMatrix(request, function (response, status) {
        if (status === google.maps.DistanceMatrixStatus.OK) {
            var results = response.rows[0].elements;
            for (var i = 0; i < stores.length; i++) {
                stores[i].properties.distanceWithGoogle = results[i].distance.value;
            }
            stores.sort(distanceWithGoogleSortFunction);
            callback(stores);
        }
        else if (status === google.maps.DistanceMatrixStatus.UNKNOWN_ERROR) {
            window.setTimeout(function () {
                self.updateStoresWithGoogle(stores, latitude, longitude, callback, errorCallback);
            }, 1500);
        }
        else {
            errorCallback();
            console.error(status);
        }
    });
}

module.exports = updateStoresWithGoogle;
