// JS for my maps project 

// JS for the map
var map;
var largeInfoWindow;

// Creates a new blank array for the markers
var markers = [];


function initMap() {
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.655651, lng: -70.620363},
	  zoom: 13,
	  mapTypeControl:false
	});

	largeInfoWindow = new google.maps.InfoWindow();

	// On initialization, show the listings and refresh listings 
	updateListings();

	//Update listings on keyup - event listener 
	//??
	document.getElementById('filter_keyword').addEventListener('keyup', updateListings);
}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infoWindow which will open at the marker that is clicked, and populate based
// on that markers position
function populateInfoWindow(marker, infowindow) {
	//check to make sure the infowindow is not already opened on this marker
	if (infowindow.marker != marker) {
		infowindow.marker = marker;
		infowindow.setContent('<div>' + marker.title + '</div');
		infowindow.open(map, marker);
		//Make sure the marker property is cleared if the infoWindow is closed
		infowindow.addListener('closeclick', function(){
			infowindow.marker = null;
		});
	}
}

//make Markers for the map 
function makeMarkers() {
	// The following group uses the location array to create an array of markers
	locations = viewModel.filteredLocations();

	for(var i=0; i < locations.length; i++){
		//Get the position from the location array.
		var position = locations[i].position();
		var title = locations[i].title();
		
		//Create a marker per location, and put into markers array
		var marker = new google.maps.Marker({
			//map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
		});

		//Push the marker to our array of markers
		markers.push(marker);

		//extend the boundaries of the map for each marker
		//bounds.extend(marker.position);

		//create an onClick event to open an infowindow at each marker
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfoWindow);
		});
	}
}


// This function will loop through the markers array and display them all.
function showListings() {
	var bounds = new google.maps.LatLngBounds();
	// Extend the boundaries of the map for each marker and display the marker
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	  bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}


// This function will loop through the listings and hide them all.
function hideListings() {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(null);
	}
	markers = [];
}


// Update marker listings
function updateListings() {
	// First clear the markers if there were any
	hideListings();

	// Then create markers based on the filtered list
	makeMarkers();

	// Display them
	showListings();
}
