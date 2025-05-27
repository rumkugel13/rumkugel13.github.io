import os
import build_games
import build_projects

os.chdir(os.path.dirname(os.path.abspath(__file__)))
build_games.build_games()
build_projects.build_projects()