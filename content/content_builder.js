var projectsFile = "content/projects.json";

function loadContent() {	
	loadJSON(function(response) {
		var projects = JSON.parse(response);
		//console.log(projects);
		createProjectList(projects);
		var selfelement = document.getElementById("loadcontent");
		if (selfelement.parentNode) {
			selfelement.parentNode.removeChild(selfelement);
		}
	}, projectsFile);
}

function createProjectList(listData) {
	var container = document.getElementById("container");
	
	// foreach project in json
	listData.forEach(function(v,i){
		createSingleProjectEntry(container, v);
	});
}

function createSingleProjectEntry(container, project) {
	// create main div first
		var main = document.createElement("div");
		main.classList.add("content");
		main.classList.add("wrapper");
		
		// create image div + a + img
		var divImage = document.createElement("div");
		divImage.classList.add("element");
		
		var aImage = document.createElement("a");
		aImage.href="content/images/" + project.image;
		aImage.target="_blank";
		
		var image = document.createElement("img");
		image.src="content/images/" + project.preview;
		image.setAttribute("onerror", "this.style.display='none'");
		image.alt="Preview of project screenshot";
		// image.onerror="this.src='favicons/favicon_256.png'";
		
		aImage.appendChild(image);
		divImage.appendChild(aImage);
		main.appendChild(divImage);
		
		// create div + h1 + featurelist
		var divContent = document.createElement("div");
		divContent.classList.add("element");
		
		var h3Content = document.createElement("h2");
		h3Content.classList.add("top");
		var h3Text = document.createTextNode(project.name);
		h3Content.appendChild(h3Text);
		
		divContent.appendChild(h3Content);
		
		var ulContent = document.createElement("ul");
		project.features.forEach(function(u,j) {
			var liElement = document.createElement("li");
			var liText = document.createTextNode(u);
			liElement.appendChild(liText);
			ulContent.appendChild(liElement);
		});
		
		divContent.appendChild(ulContent);
		main.appendChild(divContent);
		
		// create div + year + status
		var divExtra = document.createElement("div");
		divExtra.classList.add("extra");
		
		var h4Year = document.createElement("h3");
		h4Year.classList.add("top");
		var h4Text = document.createTextNode(project.year);
		h4Year.appendChild(h4Text);
		divExtra.appendChild(h4Year);
		
		var h5Status = document.createElement("h4");
		h5Status.classList.add("bot");
		var h5Text = document.createTextNode(project.status);
		h5Status.appendChild(h5Text);
		divExtra.appendChild(h5Status);
		
		main.appendChild(divExtra);
		
		container.appendChild(main);
}

function loadJSON(callback, filename) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

