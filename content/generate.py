import json
import copy
from bs4 import BeautifulSoup
from html5print import HTMLBeautifier

f = open("content/projects.json", encoding='utf-8-sig')
projectData = json.load(f)
f.close()

f = open("content/index_template.html", encoding='utf-8-sig')
indexTemplate = f.read()
f.close()

f = open("content/template2.html", encoding='utf-8-sig')
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
        link = f'<a href={"https://github.com/rumkugel13/" + project["projectname"]} target="_blank">{project["name"]}</a>'
        temp = temp.replace("_projecttitle", link)
    else:
        temp = temp.replace("_projecttitle", project['name'])

    list = ""
    for feature in project['features']:
        list += f'<li>{feature}</li>'
    
    temp = temp.replace("_featurelist", list);

    temp = temp.replace("_year", str(project['year']))
    temp = temp.replace("_status", project['status'])

    projectlist += temp

#print(projectlist)

indexTemplate = indexTemplate.replace("_projectlist", projectlist)
#print(indexTemplate)

soup = BeautifulSoup(indexTemplate, 'html5lib')                #make BeautifulSoup
prettyHTML = soup.prettify()
#print(prettyHTML)

#print(HTMLBeautifier.beautify(indexTemplate, 4))
h5p = HTMLBeautifier.beautify(indexTemplate, 4)

result = open("index0.html", 'w', encoding='utf-8')
result.write(indexTemplate)
result.close()