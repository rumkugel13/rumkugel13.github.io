function loadContent() {	
	fetch("content/projects.json")
		.then(projects => projects.json())
		.then(projects => {
			createProjectList(projects);
		});

	var selfelement = document.getElementById("loadcontent");
	if (selfelement.parentNode) {
		selfelement.parentNode.removeChild(selfelement);
	}
}

function createProjectList(listData) {
	var container = document.getElementById("projectgrid");

	fetch("content/template2.html")
		.then(template => template.text())
		.then(template => {
			// foreach project in json
			listData.forEach(function (project, i) {
				container.insertAdjacentHTML('beforeend', createEntry(project, template));
			});
		});
}

function createEntry(project, template) {
	template = template.replace("_imagelink", "content/images/" + project.image);
	template = template.replace("_imagepreview", "content/images/" + project.preview);
	template = template.replaceAll("_largeimage", project.name.toLowerCase() + "_image");
	template = template.replaceAll("_projecttag", project.name);

	if (project.hasOwnProperty("projectname")) {
		var link = `<a href=${"https://github.com/rumkugel13/" + project.projectname} target="_blank">${project.name}</a>`;
		template = template.replace("_projecttitle", link);
	}
	else {
		template = template.replace("_projecttitle", project.name)
	}

	var list = "";
	project.features.forEach(function (feature, j) {
		list += `<li>${feature}</li>`;
	});

	template = template.replace("_featurelist", list);

	template = template.replace("_year", project.year);
	template = template.replace("_status", project.status);

	return template;
}