import json
import copy

f = open("projects.json", encoding='utf-8-sig')
projectData = json.load(f)
f.close()

f = open("index_template.html", encoding='utf-8-sig')
indexTemplate = f.read()
f.close()

f = open("template2.html", encoding='utf-8-sig')
projectTemplate = f.read()
f.close()

projectlist = ""

for project in projectData:
    temp = copy.deepcopy(projectTemplate)
    
    temp = temp.replace("_imagelink", "content/images/" + project['image'])
    temp = temp.replace("_imagepreview", "content/images/" + project['preview'])
    temp = temp.replace("_largeimage", project['name'].lower() + "_image")
    temp = temp.replace("_projecttag", project['name'])
    
    if 'projectname' in project:
        link = f'\t\t\t\t\t<a href={"https://github.com/rumkugel13/" + project["projectname"]} target="_blank">{project["name"]}</a>'
        temp = temp.replace("_projecttitle", link)
    else:
        temp = temp.replace("_projecttitle", '\t\t\t\t\t' + project['name'])

    list = ""
    for feature in project['features']:
        list += f'\t\t\t\t\t<li>{feature}</li>\n'
    list = list.rstrip()
    
    temp = temp.replace("_featurelist", list);

    temp = temp.replace("_year", str(project['year']))
    temp = temp.replace("_status", project['status'])

    projectlist += temp

indexTemplate = indexTemplate.replace("_projectlist", projectlist)

result = open("../index.html", 'w', encoding='utf-8')
result.write(indexTemplate)
result.close()