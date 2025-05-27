import json

def build_projects():
    with open("data/projects.json", encoding='utf-8-sig') as f:
        projectData = json.load(f)

    with open("projects_base.html", encoding='utf-8-sig') as f:
        htmlTemplate = f.read()

    with open("project_element.html", encoding='utf-8-sig') as f:
        elementTemplate = f.read()

    htmlTemplate = htmlTemplate.replace("__PAGETITLE__", "Projects")

    projectlist = ""

    for project in projectData:
        if project['private'] == True:
            continue

        temp = elementTemplate.replace("__PROJECTNAME__", project['title'])
        temp = temp.replace("__DESCRIPTION__", project['description'])
        temp = temp.replace("__LANGUAGE__", project['language'])

        projectlist += temp + "\n"

    projectlist = projectlist.rstrip()
    htmlTemplate = htmlTemplate.replace("__PROJECTLIST__", projectlist)

    with open("../projects.html", 'w', encoding='utf-8') as result:
        result.write(htmlTemplate)
