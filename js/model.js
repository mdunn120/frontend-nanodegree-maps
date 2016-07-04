
// Model for Location
function Location(title, position) {
    this.title = ko.observable(title);
    this.position = ko.observable(position);
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
	}.bind(this);

	// Dependent Observable variable for filtered locations
	this.filteredLocations = ko.dependentObservable( this.filterLocations );
};


// This array contains ice cream store info in rockport, ma. This info will be displayed to the user
var locations = [
		new Location('The Ice Cream Store', {lat: 42.659296, lng: -70.616589}),
		new Location('Mollys Sweet Tooth', {lat: 42.658429, lng: -70.616801}),
		new Location('Robins Nest', {lat: 42.658651, lng: -70.617557 }),
		new Location('Sundays Ice Cream', {lat: 42.658919, lng: -70.616599}),
		new Location('Helmut’s Strudel Shop', {lat: 42.66045, lng: -70.614633}) 
	];

var viewModel = new ViewModel( locations )
ko.applyBindings( viewModel );

