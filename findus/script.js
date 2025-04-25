let destinationCoordinates = {};
const addresses = {
    A: { 
        lat: 1.31492, 
        lng: 103.88492, 
        title: "Emmanuel House, Geylang",
        icon: {
            url: "Emmanuvel House.jpg", // Corrected file path
            scaledSize: new google.maps.Size(100, 100) // Resizes the icon
        }
    },
    B: { 
        lat: 1.29382, 
        lng: 103.84876, 
        title: "Bible House, Armenian Street",
        icon: {
            url: "bible house.jpg", // Corrected file path
            scaledSize: new google.maps.Size(100, 100) // Resizes the icon
        }
    }
};

function initMap() {
    const singapore = { lat: 1.3521, lng: 103.8198 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: singapore,
        zoom: 14,
        mapTypeId: "roadmap"
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    setDestination('A', directionsService, directionsRenderer, map);
}

function setDestination(option, directionsService, directionsRenderer, map) {
    destinationCoordinates = addresses[option];

    // Place a marker at the selected destination with a custom image
    new google.maps.Marker({
        position: destinationCoordinates,
        map: map,
        title: destinationCoordinates.title, // Title of the destination for the marker
        icon: destinationCoordinates.icon // Custom icon (image) for the marker
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                calculateRoute(userLocation, destinationCoordinates, directionsService, directionsRenderer);
                generateNavigationLink(userLocation, destinationCoordinates);
            },
            function() {
                alert("Geolocation failed. Unable to get current location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function calculateRoute(start, destination, directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: start,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        function(response, status) {
            if (status === "OK") {
                directionsRenderer.setOptions({
                    polylineOptions: {
                        strokeColor: "#FF0000", // Red color
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        // Dashed line settings
                        icons: [{
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE, // Use small circles for dashes
                                scale: 3, // Size of the dots
                                strokeOpacity: 1,
                                fillOpacity: 1
                            },
                            offset: "0",
                            repeat: "10px" // Distance between dots
                        }]
                    }
                });
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}


function generateNavigationLink(start, destination) {
    const navigationLink = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`;

    const navButton = document.getElementById('navButton');
    navButton.href = navigationLink;
    navButton.style.display = 'inline-block';
    navButton.textContent = 'Get Directions';
}

window.onload = initMap;

document.getElementById('destinationSelect').addEventListener('change', function() {
    const selectedOption = this.value;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 14,
        mapTypeId: "roadmap"
    });

    directionsRenderer.setMap(map);

    // Set destination and add marker based on selection
    setDestination(selectedOption, directionsService, directionsRenderer, map);
});
