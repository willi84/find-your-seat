// add all Styles here to appear in stylechanger
var styles = [sncf,indoorStyle3D,indoorStyle2D];





map.on('load', function () {

    stylechanger.create(styles);
    levelbar.create(urlInformation);

    // add searchbox attached to map
    geocoder.create();
    console.log("Map fertig geladen.Zeige nun Searchbar an! ");

    /*
    console.log(htmlInfo);
    console.log(levelInfo);
    console.log(styleName);
    */
});

map.on('click', function (e) {

    showWhatsAppMessage(e);
 //    alert("Station clicked!");
    console.log("station clicked!");

// Hier die notigen Routinen einsetzen:

    // add popup with details of the map
    //    popupDetails(e);
});

function showWhatsAppMessage(e) {

    var currentLocation = window.location;
    var levelNumber = document.getElementsByClassName('levelbuttonsselected')[0].innerHTML;
    var styleActive = document.getElementsByClassName('active')[0].innerHTML;
    var text = currentLocation + "/" + levelNumber + "/" + styleActive;
    var width = document.getElementById("map").offsetWidth-100;
    var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<div style='font-size:12pt; max-width: "+ width +"px; overflow: scroll;'>" + text + "</div>")
        .addTo(map);


}






function popupDetails(e){
    // add popup with map details on click
    var featuresRendered = map.queryRenderedFeatures(e.point);
    var properties = [];
    var nummer = 1;
    for(var i = 0 ; i < featuresRendered.length; i++){
        if(featuresRendered[i].properties.hasOwnProperty("level")){

            properties.push("Object " + nummer + ": " + JSON.stringify(featuresRendered[i].properties) + "<br>");
        }
        nummer++;
    }
    if (!properties.length) {
        return;
    }
    var width = document.getElementById("map").offsetWidth-100;
    var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<div style='font-size:12pt; max-width: "+ width +"px; overflow: scroll;'>" + properties + "</div>")
        .addTo(map);
}

/*
map.on('zoomend', function () {
    console.log(map.getZoom());
});
*/

//setTimeout(function(){                      }) }, 3000)
