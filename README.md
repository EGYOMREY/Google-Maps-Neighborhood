# Udacity Neighborhood Project (5)

Project Details

- Review the [JavaScript Design Patterns course](https://www.udacity.com/course/javascript-design-patterns--ud989)
- Use the Knockout framework; Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map.
- Asynchrony and Error Handling; all data APIs used in the project should load asynchronously and errors should be handled gracefully
- Write code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.
- You may want to get a Google Maps API key, and include it as the value of the key parameter when loading the Google Maps API in index.html: <script src="http://maps.googleapis.com/maps/api/js?libraries=places&key=[YOUR_API_KEY]"></script>
- Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood. Your app should display those locations by default when the page is loaded.
- Implement a list view of the set of locations defined in step 5.
- Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time. Providing a search function through a third-party API is not enough to meet specifications. This filter can be a text input or a dropdown menu.
- Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex: Yelp reviews, Wikipedia, Flickr images, etc).
- Add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected.
- Add functionality to open an infoWindow
- Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above the map marker with additional information.

## How to use this App?
- Download or Clone this repository
- Open index.html
- Click on the flags to see info about places in Wien, Austria
- Filter or click on the left menu so you can see more information about the selected place
- Whenever you click a marker or an option in the left menu there will be some information displayed about that place, plus a Wikipedia article so you can learn more about it.

## Research and sources used

* Styles were fun to build with the [Styling Wizard](https://mapstyle.withgoogle.com).
* Great [JS Compresor](https://jscompress.com/).
* Thanks to [Google's documentation](https://developers.google.com/maps/documentation/javascript/markers) for all the help.
* Thanks to Udacity's course, I took the Google API's course and used code from its [repository](https://github.com/udacity/ud864).
* Wikipedia API code: Udacity NanoDegree class: Building the move Planner App (So, thank you [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page) for this too.
* Other sources I need to thank, plus the ones inside the code:
    * http://www.w3ii.com/knockoutjs/knockoutjs_declarative_bindings.html
    * http://axelhzf.com/play-curso/knockout.html
    * http://jsfiddle.net/kohenkatz/RT7J4/
    * https://forums.asp.net/t/2028168.aspx?How+To+Filter+KnockoutJS+Data+By+two+Fields+or+more+
    * http://knockoutjs.com/documentation/foreach-binding.html
    * https://www.w3schools.com/howto/howto_js_filter_lists.asp //How to filter lists
    * https://developers.google.com/maps/documentation/javascript/markers // How to add a marker
* Filtering arrays with Knockout:
    * http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    * https://stackoverflow.com/questions/22984637/filter-observablearray-by-condition
    * https://stackoverflow.com/questions/19942641/knockout-js-array-filter-syntax/25241564#25241564
    * https://stackoverflow.com/questions/22418400/filtering-an-observablearray-in-knockout
    * https://www.strathweb.com/2012/07/knockout-js-pro-tips-working-with-observable-arrays/
    * http://embed.plnkr.co/ZmUclh/
* Used [Compressor.io](compressor.io) for compressing my two png.
* Used [Bootstrap](https://getbootstrap.com/) version 4 beta.

