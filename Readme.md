# DrfReact

A small site through which I am learning about both the Django Rest
Framework and React.js

### Setting up to run locally

##### Assumptions
* previously installed dependencies
  * python 3.6 or greater already installed
    * sqllite3 included
    * suggest you have/use a virtual environment as well
  * npm for javascript
  * git
  * You have a Giphy API key. Need one? [Register here.](https://developers.giphy.com/)

##### Setup

Open a command prompt in the directory where you desire the code to
live.

1. Get the code
```bash
git clone https://github.com/DaOneTwo/DrfReact.git
```

1. Move into the directory
```bash
cd DrfReact
```

3. Install the python dependencies. If you desire to use a python
   virtual environment make sure it is activated before this step.
```bash
pip install -r requirements.txt
```

4. Setup the Python application. The settings.py file is setup to use
   SQLlite3 as the database backend. If you desire to use another
   database you will need to make the required changes to the
   settings.py file. **Note:** You may need to change python to python3
   in any terminal commands you run.
```bash
python manage.py makemigrations

python manage.py migrate
```

5. Install the Javascript dependencies
```bash
npm install
```

6. Compile/Build the React Javascript. This puts things together into a
   main.js file where our HTML calls for it to be.
```bash
npm run dev
```

7. Set your environment variables. These commands will set it for your
   current terminal/ command line session. There are many other ways
   they could be set. DO those as you desire
   1. GIPHY_API_KEY - _*required_
      [Get one here.](https://developers.giphy.com/)
   2. DJANGO_SECRET_KEY - _*optional, required in environments where
      more than one server is running (for parity across servers)_.
```bash
# Mac/Linux

export GIPHY_API_KEY="your key here"

export DJANGO_SECRET_KEY="your secret key here"  # Optional

# Windows

set GIPHY_API_KEY="your key here"

set DJANGO_SECRET_KEY="your secret key here"  # Optional
```

8. Run the django server
```bash
python manage.py runserver
```

9. Open your preferred web browser and access the Application
   [via localhost `http://127.0.0.1:8000/`](http://127.0.0.1:8000/)


### Development Notes

1. Javascript files for the project are located in `./frontend/src` &
   `./frontend/src/components`. Any changes to these files will require
   the command `npm run dev` be run from the top level directory where
   the `webpack.config.js` is located.

2. For python API changes follow the Django/DRF development processes
   which are well documented online. Commands needed could include all
   the `python xxx` commands given above and then some.


