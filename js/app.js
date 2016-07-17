// JS for my maps project. Main app logic

// Foursquare stuff
//Special codes to identify that this is me
var foursquare_api_endpoint = 'https://api.foursquare.com/v2/venues/';
var client_id = 'O32K1FZZ3SOXYJLQ1QFCJJTITDJDGBDS5CYASY3N5GWEEMBY';
var client_secret = 'BHSQA10YVVPFR3SDT5CVEX24KBR5URUHNH2NCZKMH43UHGQZ';

// JS for the map
var map;
var largeInfoWindow;

// Creates a new blank array for the markers
var locations;
var markers = [];
//Hash map between the locations and the markers 
var locationToMarkerIDs = {}

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.655651, lng: -70.620363},
	  zoom: 13,
	  mapTypeControl:false
	});

	largeInfoWindow = new google.maps.InfoWindow();

	// Then create markers based on the filtered list
	makeMarkers();	

	$('#filter_keyword').keyup( updateListings );
}


// This function populates the infowindow when the marker or item in the list is clicked. I only allow
// one infoWindow which will open at the marker that is clicked, and populate based
// on that markers position and the foursquare id
function populateInfoWindow(marker, infowindow) {
	//check to make sure the infowindow is not already opened on this marker
	if (infowindow.marker != marker) {
		infowindow.marker = marker;

		var foursquare_id = marker.foursquare_id;

		//Creates the URL that I will use to call into Foursquare to get the JSON objects about my locations
		var foursquare_url = foursquare_api_endpoint + foursquare_id +
			'?client_id=' + client_id +
			'&client_secret=' + client_secret +
			'&v=' + '20160709';

		$.getJSON(foursquare_url, function(data) {
			// If the ajax call to foursquare_url is successful,
			// display the venue data

			// (1) Retreive the venue data from FourSquare and put it in venue_data
			var venue_data = data.response.venue;

			// (2) Display the marker with all the desired info from the JSON object 
			var content = '<div>' +
			'Title: ' + venue_data.name + '<br/>' +
			'Address: ' + venue_data.location.formattedAddress + '<br/>' +
			'Category: ' + venue_data.categories[0].name + '<br/>' + 
			'Price: ' + venue_data.attributes.groups[0].summary + '<br/>' + 
			'Location: ' + venue_data.location.lat + ', ' + venue_data.location.lng + '<br/>' +
			'Info From FourSquare' +
			'</div>'
			infowindow.setContent( content );
			infowindow.open(map, marker);

		//Error Handling if the content from Foursquare is unavailable show an alert with the error message. Tested by turning off the internet.
		}).error(function(e){
			alert('This content is unavailable. Please try again later');
		});

		//Make sure the marker property is cleared if the infoWindow is closed
		infowindow.addListener('closeclick', function(){
			infowindow.marker = null;
		});

		marker.setAnimation(google.maps.Animation.BOUNCE);
	    setTimeout( function() { marker.setAnimation(null); }, 800);
	}
}


function makeMarkers() {
	// The following group uses the location array to create an array of markers
	locations = viewModel.filteredLocations();


	// Extend the boundaries of the map for each marker and display the marker
	var bounds = new google.maps.LatLngBounds();

	for(var i=0; i < locations.length; i++){
		//Get the position from the location array.
		var position = locations[i].position();
		var title = locations[i].title();
		var foursquare_id = locations[i].foursquare_id();
		
		//Create a marker per location, and put into markers array
		var marker = new google.maps.Marker({
			//map: map,
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i,
			foursquare_id: foursquare_id
		});

		//Push the marker to our array of markers
		markers.push(marker);

		// Link the location name to the marker so we can refer to it later
		locationToMarkerIDs[title] = marker.id;


		//extend the boundaries of the map for each marker
		//bounds.extend(marker.position);

		//create an onClick event to open an infowindow at each marker
		marker.addListener('click', function() {
			//marker.animation = google.maps.Animation.DROP;
			populateInfoWindow(this, largeInfoWindow);
			//When the markers get clicked they need to bounce too

		});

		marker.setMap(map);
		bounds.extend(marker.position);	
	}
	map.fitBounds(bounds);
}


// This function will loop through the markers array and display them all.
function showListings() {
	locations = viewModel.filteredLocations();
	
	for (var i = 0; i < locations.length; i++) {
		title = locations[i].title();	
		marker = markers[ locationToMarkerIDs[title] ];
		marker.setVisible(true);
	}
}


// This function will loop through the listings and hide them all.
function hideListings() {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setVisible(false);
	}
}


// Update marker listings
function updateListings() {
	// First clear the markers if there were any
	hideListings();

	// Display them
	showListings();
}

// A helper function to retrieve a corresponding marker
// from a filtered list index
function get_marker_from_filtered_list_index (filtered_list_index) {
	locations = viewModel.filteredLocations();
	return markers[ locationToMarkerIDs[ locations[filtered_list_index].title() ] ]
}

