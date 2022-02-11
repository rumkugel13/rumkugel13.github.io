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
	var container = document.getElementById("projectgrid");
	
	// foreach project in json
	listData.forEach(function(v,i){
		createSingleProjectEntry(container, v);
	});
}

function createSingleProjectEntry(container, project) {
	// create main div first
	var main = document.createElement("div");
	main.classList.add("gridelements");
	main.classList.add("border");
		
	// create image div + a + img		
	var aImage = document.createElement("a");
	aImage.href="content/images/" + project.image;
	aImage.target = "_blank";
	aImage.classList.add("imgcontainer");

	// add img to a
	var image = document.createElement("img");
	image.src="content/images/" + project.preview;
	image.setAttribute("onerror", "this.style.display='none'");
	image.alt="Preview of project screenshot";
	// image.onerror="this.src='favicons/favicon_256.png'";
	aImage.appendChild(image);

	// add text to image
	var imageText = document.createElement("div");
	imageText.classList.add("centered");
	imageText.appendChild(document.createTextNode("Click to enlarge"));
	aImage.appendChild(imageText);

	main.appendChild(aImage);
		
	// create title
	var titleContent = document.createElement("h2");
	titleContent.classList.add("subheader");
	var titleText = document.createTextNode(project.name);
		
	if (project.hasOwnProperty("projectname"))
	{
		// if exists, add link to title
		var titleLink = document.createElement("a");
		titleLink.href="https://github.com/rumkugel13/" + project.projectname;
		titleLink.target="_blank";
			
		titleLink.appendChild(titleText);
		titleContent.appendChild(titleLink);
	}
	else
	{
		titleContent.appendChild(titleText);
	}
		
	main.appendChild(titleContent);

	// create description
	var descContent = document.createElement("p");
	descContent.classList.add("description");
	descContent.appendChild(document.createTextNode(project.description));

	main.appendChild(descContent);

	// create featurelist
	var ulContent = document.createElement("ul");
	ulContent.classList.add("zeromargin");
	project.features.forEach(function(u,j) {
		var liElement = document.createElement("li");
		var liText = document.createTextNode(u);
		liElement.appendChild(liText);
		ulContent.appendChild(liElement);
	});
		
	main.appendChild(ulContent);

	// create footer with year and status
	var divFooter = document.createElement("div");
	divFooter.classList.add("subfooter");

	var h4Year = document.createElement("h4");
	var h4Text = document.createTextNode(project.year);
	h4Year.appendChild(h4Text);
	divFooter.appendChild(h4Year);

	var h4Status = document.createElement("h4");
	var h4Text2 = document.createTextNode(project.status);
	h4Status.appendChild(h4Text2);
	divFooter.appendChild(h4Status);

	main.appendChild(divFooter);
		
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

