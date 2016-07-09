frontend-nanodegree-maps project
===============================

Installation
------------

1.	Clone the repository onto your computer 
2.	Drag and Drop the index.html file into the Chrome browser. 

Usage
-----
1.	Type in the left searchbox to find ice cream stores in Rockport, MA (my hometown)
2.	Click on one of the items that appear in the list once the list has been updated, or click on the red marker
3.	Information will appear about the location, category, price and coordiantes of the ice cream store. This information comes from FourSquare

Implementation
--------------
1.	An MVVM pattern is being used in this application
	a.	index.html is the View
	b.	model.js has both the ViewModel and the Model (Data)
	c.	app.js has most of the app logic
2.	The Knockout package is being used to help create an observable relationship for the MVVM pattern. It is also being used to set up the SearchBox sorting functionality
3.	Jquery is being used to help make ajax calls and for error handling
4.	Google Maps apis are being used to display the map and markers
5.	Foursquare APIs are being used to display the info within the markers 


