export const b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

export const geocodeAddress = address => {
    const { Geocoder, GeocoderStatus } = window.google.maps || {};
    const geocoder = new Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
            if (status === GeocoderStatus.OK) {
                resolve({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
            }
            else {
                reject(status);
            }
        });
    });
};