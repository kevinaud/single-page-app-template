// Wraps everything in function so that 'partialsCache' is not
// introduced as a global variable

(function(){

	var partialsCache = {};

	function fetchFile(path, callback){

		var request = new XMLHttpRequest();

		request.onload = function(){
			callback(request.responseText);
		}

		request.open("GET", path);
		request.send(null);
	}

	function getContent(fragmentId, callback){

		if(partialsCache[fragmentId]){
			callback(partialsCache[fragmentId]);	
		} else {
			fetchFile(fragmentId + ".html", function(content){
				partialsCache[fragmentId] = content;

				callback(content);	
			});
		}
	}

	function setActiveLink(fragmentId){

		var navbarDiv = document.getElementById("navbar");
		var links = navbarDiv.children;

		var link;
		var pagename;
		var i;
		
		for(i = 0; i < links.length; i++){

			link = links[i];
			pageName = link.getAttribute("href").substr(1);

			if(pageName === fragmentId){
				link.setAttribute("class", "active");	
			} else {
				link.removeAttribute("class");	
			}

		}

	}

	function navigate(){
		
		// Stores a reference to "content" div
		var contentDiv = document.getElementById("content");

		// Gets the value of the hash, without including the hash itself
		fragmentId = location.hash.substr(1)

		getContent(fragmentId, function(content){
			contentDiv.innerHTML = content;	
		});

		setActiveLink(fragmentId);

	}

	if(!location.hash){

		// If there is no has value, then set it to the default, which is "#home"
		location.hash="#home";

	}

	// Call navigate once to make sure content is initialized when a page
	// is directly accessed via a link
	navigate();

	window.addEventListener("hashchange", navigate);

 }());

