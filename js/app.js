//JS for my maps project 

// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());




//js for the map
var map;

//Creates a new blank array for the markers
var markers = [];

function initMap() {
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.655651, lng: -70.620363},
	  zoom: 13
	});

//This array contains ice cream store info in rockport, ma. This info will be displayed to the user
var locations = [
	{title: 'The Ice Cream Store', location: {lat: 42.659296, lng: -70.616589}},
	{title: 'Mollys Sweet Tooth', location: {lat: 42.658429, lng: -70.616801}},
	{title: 'Robins Nest', location: {lat: 42.658651, lng: -70.617557 }},
	{title: 'Sundays Ice Cream', location: {lat: 42.658919, lng: -70.616599}},
	{title: 'Helmut’s Strudel Shop', location: {lat: 42.66045, lng: -70.614633}} 
	];

var largeInfoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

//The following group uses the location array to create an array of markers on intialize.
for(var i=0; i < locations.length; i++){
	//Get the position from the location array.
	var position = locations[i].location;
	var title = locations[i].title;
	//Create a marker per location, and put into markers array
	var marker = new google.maps.Marker({
		map: map,
		position: position,
		title: title,
		animation: google.maps.Animation.DROP,
		id: i
	});
	//Push the marker to our array of markers
	markers.push(marker);
	//extend the boundaries of the map for each marker
	bounds.extend(marker.position);
	//create an onClick event to open an infowindow at each marker
	marker.addListener('click', function() {
		populateInfoWindow(this, largeInfoWindow);
	});
}
map.fitBounds(bounds);
//This function populates the infowindow when the marker is clicked. We'll only allow
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
			infowindow.setMarker(null);
		});
	}
}

	// --- Creating a single point on the map
	// var bearskin = {lat: 42.661047, lng: -70.613833};
	// var marker = new google.maps.Marker({
	// 	position: bearskin,
	// 	map: map,
	// 	title: 'First Marker!'
	// });
	// var infowindow = new google.maps.InfoWindow({
	// 	content: 'This is Bearskin Neck'
	// });
	// marker.addListener('click', function(){
	// 	infowindow.open(map, marker);
	// });
}