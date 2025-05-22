import json
import copy
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

f = open("projects.json", encoding='utf-8-sig')
projectData = json.load(f)
f.close()

f = open("projects.html", encoding='utf-8-sig')
indexTemplate = f.read()
f.close()

f = open("element.html", encoding='utf-8-sig')
elementTemplate = f.read()
f.close()

projectlist = ""

for project in projectData:
    if project['private'] == True:
        continue

    temp = copy.deepcopy(elementTemplate)
    
    temp = temp.replace("__PROJECTNAME__", project['title'])
    temp = temp.replace("__DESCRIPTION__", project['description'])
    temp = temp.replace("__LANGUAGE__", project['language'])

    projectlist += temp + "\n"

projectlist = projectlist.rstrip()
indexTemplate = indexTemplate.replace("__PROJECTLIST__", projectlist)

result = open("../projects.html", 'w', encoding='utf-8')
result.write(indexTemplate)
result.close()