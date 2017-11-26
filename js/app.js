
//In case the map doesn't load.
var mapNotLoad = function() {
    alert("Error while loading your Map"); //I found an alert more appealing for the situation
};
//Declare global variales and set up our viewmodel
var myLatLng = {
    lat: 48.209665,
    lng: 16.3673238
};
var bounds, i, marker, map, largeInfowindow, loadData;
var markers = [];

//(1)We initialize our Map, we set our amazing style thanks to this website
//https://mapstyle.withgoogle.com/
//we apply the bindings we set with knockout
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16,
        styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#aaaaaa"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fe0e14"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dadada"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#920104"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffb7b9"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c9c9c9"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }],
    });
    window.onresize = function() {
        map.fitBounds(bounds);
    };
    ko.applyBindings(new viewModel.displayMarkers());
}

//bring the observables and methods!
//http://knockoutjs.com/documentation/observables.html

//inspiration came from this https://stackoverflow.com/questions/36845481/how-to-convert-object-to-json-format-using-knockoutjs
//and this https://stackoverflow.com/questions/10378341/functions-inside-objects
var viewModel = {
    places: ko.observableArray([]),
    search: ko.observable(""),



    displayMarkers: function() {
        //(2)this function's code was obtained from the Udacity's Google API course.
        //all credits go to this awesome course and repository https://github.com/udacity/ud864
        largeInfowindow = new google.maps.InfoWindow();
        bounds = new google.maps.LatLngBounds();
        //we create an array of markers
        for (var i = 0; i < locations.length; i++) {
            var position = locations[i].location;
            var title = locations[i].title;
            var id = locations[i].id;
            var info = locations[i].info;
            //we create a marker per location, we gave it our own icon and hardcoded info.
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: title,
                info: info,
                icon: 'images/top.png',
                animation: google.maps.Animation.DROP,
                id: i
            });
            //we push our markers into the array of markers
            markers.push(marker);
            //stay in bounds! 
            bounds.extend(marker.position);
            //now we are going to add an event when we click a marker.
            //Here happens two things: we populate our infowindow with the information
            //in our Model, and we also load our data from the Wiki
            marker.addListener('click', function() {
                viewModel.populateInfoWindow(this, largeInfowindow);
                loadData(this);
            });
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
        //stay in bounds! we are always going to be able to see the marker and the infowindow in our map
    },
    //(3)when the user clicks on a location in our left menu, we make make sure which
    //marker it is, and we (1)populate our window, (2) load our wiki API
    clickMarker: function(location) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].id == location.id) {
                viewModel.populateInfoWindow(markers[i], largeInfowindow);
                loadData();
            }
        }
    },
    //(4) This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    //credits for this code go to the Google maps API course in Udacity!
    populateInfoWindow: function(marker, infowindow) {

        //to get this information, we depend entirely on our marker.title
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div><br>' + '<div>' + marker.info + '</div>');
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
            });

            /*We get an article from Wikipedia so the User can learn more from this place.
            This piece of code was taken from the Udacity NanoDegree class: Building the move Planner App*/
            loadData = function() {
                viewModel.wikiResponse([]);
                var finalResult = marker.title; //marker.title
                var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + finalResult + '&format=json&callback=wikiCallback';
                $.ajax({
                    url: wikiUrl,
                    dataType: "jsonp",
                    jsonp: "callback",
                }).done(function(data) {
                    var article = {};
                    var articleList = data[1];
                    for (var i = 0; i < 1; i++) {
                        var articleStr = articleList[i];
                        article.title = articleStr;
                        article.link = 'http://en.wikipedia.org/wiki/' + articleStr;
                        viewModel.wikiResponse.push(article);
                    }
                    //http://api.jquery.com/jquery.getjson/ code and understanding thanks to this documentation!
                    //What I found here was interesting: https://stackoverflow.com/questions/9847244/what-are-the-parameters-sent-to-fail-in-jquery
                }).fail(function(jqXHR, textStatus) {
                    var err = textStatus;
                    console.log("Request Failed: " + err);
                    alert("No Wiki resources available");
                });
            };
        }
        /*(5)what happens here (1) we fit the view so we can read it in our maps limits
        //(2), we make the marker jump (3) but it will jump for a second, (3), we retrieve
        //information from Wikipedia (4), we open our infowindow with the hardcorded info*/
        map.fitBounds(bounds);

        (function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        })();
        setTimeout(function() {
            marker.setAnimation(null);
        }, 700); //changed from 1000 to 700
        infowindow.open(map, marker);

        //close the infowindow when clicked somewhere else
        map.addListener("click", function() {
            infowindow.close(infowindow);
        });

    },
    /*(6)this function let us see the marker when the list is being filtered.
    //credits for this go to this amazing website http://embed.plnkr.co/ZmUclh/ "Knockout.js Task List with Search and Filter, Random Tasks, In-place Editing, Sorting" and also to this website http://googlemapapitutorial.com/hidemarker.jsp
    */
    filterMarkers: function() {
        for (i = 0; i < markers.length; i++) {
            markers[i].setVisible(false); //hide them all
            for (var j = 0; j < viewModel.filteredItems().length; j++) {
                if (markers[i].id == viewModel.filteredItems()[j].id) {
                    markers[i].setVisible(true);
                }
            }
        }
    }
};
//(7)we are going to filter what the user types in our form. Credits for this code: https://stackoverflow.com/questions/19942641/knockout-js-array-filter-syntax and this  website http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
viewModel.places = ko.observableArray(locations);
viewModel.wikiResponse = ko.observableArray([]); //added!
viewModel.filteredItems = ko.computed(function() {
    var search = this.search().toLowerCase();
    if (!search) {
        return this.places();
    } else {
        return ko.utils.arrayFilter(this.places(), function(location) {
            return location.title.toLowerCase().indexOf(search) >= 0;
        });
    }
}, viewModel);


//more credits
/*https://www.w3schools.com/howto/howto_js_filter_lists.asp //How to filter lists
https://developers.google.com/maps/documentation/javascript/markers // How to add a marker

Filtering arrays: readings
Filtering arrays with Knockout:

http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
https://stackoverflow.com/questions/22984637/filter-observablearray-by-condition
https://stackoverflow.com/questions/19942641/knockout-js-array-filter-syntax/25241564#25241564
https://stackoverflow.com/questions/22418400/filtering-an-observablearray-in-knockout
https://www.strathweb.com/2012/07/knockout-js-pro-tips-working-with-observable-arrays/

*/
