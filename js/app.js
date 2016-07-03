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
function initMap(){
	//Constrcutor creates a new map -only center and zoom are requried
	map =  new google.maps.Map(document.getElementByID('map'), {
		center: {lat: 40.7413549, lng: -73.9980244},
		zoom: 13
	});

}
initMap();
