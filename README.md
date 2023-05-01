# Pepero Image Classification Web Application

Installation & Run Guide:

For ReactJS,
1. Open a terminal and cd into the "web" folder, then run "npm i" to install all the necessary dependencies.
2. After installing, run "npm start" in the terminal.

For Flask,
1. Open up another terminal, cd into the "flask" folder. 
2. Run "pip install flask pip install flask_cors pip install tensorflow pip install Pillow" in the terminal.
3. After that, just run "python/python3 app.py" in the terminal.

Note: 
1. Keep both the reactjs and flask terminals running at the same time in order for the app to work.
2. Change to your ipv4 address for the predict function under "/web/src/App.js" line 55 for it to work locally on your network.
3. The model file is under "/flask/model/model.h5" directory.
