/*
<link href="./gecoder/gecoder.css" rel="stylesheet">
<script src='./gecoder/gecoder.js'></script>

<script>
Starte Script mit: geocoder.create();
</script>
*/
var geocoder = (function () {

    var create = function () {

    	var searchbox = document.createElement("form");		
		searchbox.setAttribute("id", "searcher");		
		searchbox.classList.add("panel");
		document.getElementById("map").appendChild(searchbox);

		var searchsymbol = document.createElement("div");
		searchsymbol.setAttribute("id", "searchsymbol");
		document.getElementById("searcher").appendChild(searchsymbol);

		var searchsymbolpic = document.createElement("img");
		searchsymbolpic.setAttribute("id", "searchpic");
		searchsymbolpic.src = "https://openstationmap.org/0.5.0/geocoder/lupe.svg";
		document.getElementById("searchsymbol").appendChild(searchsymbolpic);



		var searchfield = document.createElement("input");		
		searchfield.type = 'text';
		searchfield.placeholder = "Eine Station suchen...";
		searchfield.setAttribute("id", "searchfield");	
		document.getElementById("searcher").appendChild(searchfield);


		var resultlist = document.createElement("ul");
		resultlist.setAttribute("id", "resultlist");	
		document.getElementById("searcher").appendChild(resultlist);

		// event listener
		//+++++++++++++++
		// send query to nominatim if press enter
		searchbox.addEventListener("submit", request);
		// send query to nominatim if click on symbol
		searchsymbol.addEventListener("click", request);
		// deletes list if clicking in map	
		document.getElementById("map").addEventListener("click", function(){ clearResults(); });	
		
		
		
    };

	var request = function (event) {

		event.preventDefault();
		var answer;		
		var querystring = document.getElementById("searchfield").value.trim();		
		// only use strings with at least 3 character
		if(querystring.length < 3){			
			console.log("keine suche");			
			return;
		}
		if(querystring.indexOf(" ") != -1){
			// replace whitespaces with "+" , necessary for nominatim query
			var temporal = querystring.replace(/ /g, "+");
			querystring = temporal;
		}	
		sendRequest(querystring);
    };

  	var sendRequest = function (querystring) {
		
  		var url = "https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=" 
			+ querystring 
			+ "+[station]&format=json&limit=5"
    	var xhttp = new XMLHttpRequest();
  		xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
    			var answer;
    			try {  
  					answer = JSON.parse(this.responseText);  					
  					showResult(answer);
				}
				catch(e) {
  					console.log("could not parse geocoder answer: " + this.responseText);
				}				
      			//return this.responseText;  
    		}
  		};
  		xhttp.open("GET", url, true);
  		xhttp.send();
  	};  	

  	var showResult = function (answer) {
  		
  		var response = answer;			
		//remove old results
		removeallchildren("resultlist");						
		//activate list to see the results in browser			
		document.getElementById("resultlist").style.display = "block";
        
		if(response.length > 0){				
				
			var singleResponse;
			var sug;
			//add each element from response to list
			for(var i = 0 ; i < response.length ; i++){ // response.length

				singleResponse = response[i];										
				// add content to list and click listener	

				sug = document.createElement("li");
				sug.classList.add("suggestions");
				sug.setAttribute("id", "suggestionNumber"+ i);	
				sug.innerHTML = "<strong>" + singleResponse.address.station + "</strong>"
					+ "<br>"
					+ singleResponse.address.state
					+ ", " 
					+ singleResponse.address.country;

				bindmapevent(sug, singleResponse);	
				document.getElementById("resultlist").appendChild(sug);
				
			}
		}
		else{
			//no result came back from Nominatim, shows just a nothing found message
			var sug = document.createElement("li");
			sug.style.paddingLeft = "10px";
			sug.setAttribute("id", "suggestionNumber0");	
			sug.innerHTML = "<strong> Keine Ergebnisse </strong>";
			document.getElementById("resultlist").appendChild(sug);
		}
  	};

  	var removeallchildren = function (parentcont){  		
  		var conti = document.getElementById(parentcont);
		while (conti.firstChild) {
    		conti.removeChild(conti.firstChild);
		}
  	};

  	var clearResults = function (sug, singleResponse){
		// hide list after click on one element
		document.getElementById("resultlist").style.display = "none";		

		// get rid of all event listener on the search results
		// TODO
		//document.getElementById("resultlist").removeEventListener("click" , mapevent(sug, singleResponse))
		
		// remove the search results from the list
		removeallchildren("resultlist");		
	};

	var bindmapevent = function(sug, singleResponse){

		sug.addEventListener("click", function(){
			map.setCenter([singleResponse.lon , singleResponse.lat]);
			map.setZoom(17);
			clearResults();
			levelbar.update();
			
		});			
	};

  return {
    create: create
  }; 

}());
