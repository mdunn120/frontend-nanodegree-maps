
// Model for Location using Knockport and foursquare 
function Location(title, position, foursquare_id) {
    this.title = ko.observable(title);
    this.position = ko.observable(position);
    this.foursquare_id = ko.observable(foursquare_id);
}


// View Model class
var ViewModel = function( locations ) {
    this.locations = ko.observableArray( locations );
    this.filter =  ko.observable("");
    
    this.filterLocations = function() {
    	// A function that returns an array of
    	// (1) Full locations, if filter string is empty, or
    	// (2) Filtered locations, if filter string is provided.

	    var filter = this.filter().toLowerCase();
	    if (!filter) {
	    	// If filter is empty (haven't typed anything)
	        return this.locations();
	    } else {
	    	// Otherwise, filter out the locations that do not start with the filter string
	        return ko.utils.arrayFilter( this.locations(), function(location) {
	            return stringStartsWith( location.title().toLowerCase(), filter );
	        });
	    }

	//I need to add this line to this function
	//marker.setVisible(true); // or false
	}.bind(this);

	// Dependent Observable variable for filtered locations
	this.filteredLocations = ko.dependentObservable( this.filterLocations );


};


// This array contains ice cream store info in rockport, ma. This info will be displayed to the user
// Title, latitude, longitude (used by google maps), FoursquareID used to get the JSON object from the FourSquare APIs)
var locations = [
		new Location('The Ice Cream Store', {lat: 42.659296, lng: -70.616589}, '4c13f94e7f7f2d7f041ae068'),
		new Location('Mollys Sweet Tooth', {lat: 42.658429, lng: -70.616801}, '51c89698498edaa23650d5bc'),
		new Location('Robins Nest', {lat: 42.658651, lng: -70.617557 }, '501f1be2e4b0b1c50a9f9269'),
		new Location('Sundays Ice Cream', {lat: 42.658919, lng: -70.616599}, '4c49d4be9f2ad13a666ad553'),
		new Location('Helmut’s Strudel Shop', {lat: 42.66045, lng: -70.614633}, '4bddb3ffffdec928ca11e6a1') 
	];

var viewModel = new ViewModel( locations )
ko.applyBindings( viewModel );

