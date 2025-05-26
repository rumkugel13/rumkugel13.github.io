import json
import copy
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

f = open("data/games.json", encoding='utf-8-sig')
projectData = json.load(f)
f.close()

f = open("games_base.html", encoding='utf-8-sig')
indexTemplate = f.read()
f.close()

f = open("template_popup.html", encoding='utf-8-sig')
projectTemplate = f.read()
f.close()

indexTemplate = indexTemplate.replace("__PAGETITLE__", "Games")

projectlist = ""

for project in projectData:
    temp = copy.deepcopy(projectTemplate)
    
    temp = temp.replace("_imagelink", "content/images/" + project['image'])
    temp = temp.replace("_imagepreview", "content/images/" + project['preview'])
    temp = temp.replace("_largeimage", project['name'].lower() + "_image")
    temp = temp.replace("_projecttag", project['name'])
    
    if 'projectname' in project:
        link = f'<a href={"https://github.com/rumkugel13/" + project["projectname"]} target="_blank">{project["name"]}</a>'
        temp = temp.replace("_projecttitle", link)
    else:
        temp = temp.replace("_projecttitle", project['name'])

    list = ""
    for feature in project['features']:
        list += f'\t\t\t\t<li>{feature}</li>\n'
    list = list.rstrip()
    
    temp = temp.replace("_featurelist", list)

    temp = temp.replace("_year", str(project['year']))
    temp = temp.replace("_status", project['status'])

    projectlist += temp + "\n"

projectlist = projectlist.rstrip()
indexTemplate = indexTemplate.replace("__GAMELIST__", projectlist)

result = open("../index.html", 'w', encoding='utf-8')
result.write(indexTemplate)
result.close()