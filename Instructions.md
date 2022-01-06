# XSS Detector
## Brief:
This is an application to check if any site a user visits has been compromised by XSS attacks. Below is a guide to install and run it on a localhost server for testing.

## Installation:
### 1. Instaling Dependencies:
#### 1. Python & Pip
Firstly, ensure that your system has the latest version of python installed. Use:
`python --version ` 
to check if python has been installed (required python version > 3.7).
Else, follow steps in the given link: https://python.org/downloads/ to install the latest version.

Install a package manager, pip for installing all dependencies. Follow the guide at https://pip.pypa.io/en/stable/installing/

Next, create a virtual environment to store all dependencies. Use:
    `python3 -m venv /path/to/new/virtual/environment`
Start the virtual environment by typing:
    `venv/Scripts/activate`
in the command prompt.

#### 2. Project Dependencies: 
Make sure the virtual environment has been activated before installing begins.

There are two options to install these. The shortest one would be to run the command:
`pip install -r requirements.txt` 
"requirements.txt" file has been provided inside the code files, which contains all requirements to run the project.

Another option is to separately install all packages required (some of these might already be on the system):
- `pip install django` (https://docs.djangoproject.com/en/3.1/howto/windows/)
- `pip install keras` 
- `pip install pandas` (https://pandas.pydata.org/docs/getting_started/install.html)
- `pip install numpy` 
- `pip install opencv-python`
- `pip install tensorflow` (https://www.tensorflow.org/install/pip#virtual-environment-install)
- `pip install re` 
- `pip install requests` 
- `pip install BeautifulSoup4`

The above is an exhaustive list, but installations might change from system to system and you might encounter errors like 'Some package not found' with the name of the package. Just use pip install 'package-name' command to install them.

#### 3. Installing the project:
Unpack the code from the zip file if you haven't already. Make sure it has the folder 'dsci_cnn_trained' inside the folder 'xssdetector'. It is preferable to keep this unpacked code in the same folder as the virtual environment.

#### 4. Installing the Extension:
1. After the zip is unpacked, there will be a folder 'extension' inside it. Make note of it's location.
2. Open Google Chrome and go to extensions window. 
3. Activate Developer's Mode.
4. Click the option to "Load Unpacked", and select the 'extension' folder from the project code in the dialogue box that will appear.
5. Activate the extension and pin to task bar.

### 2. Running the project:
#### 1. Starting the host server:
1. Open terminal and enter virtual environment if created. 
2. Navigate to the 'xssdetector' directory which contains the file manage.py
3. Type into the terminal: `python manage.py runserver`
4. Wait for some time as the DL modules require time to load. Also ignore some warnings raised by tensorflow.
5. Upon successful run by server, the terminal will read like:
      ```
      System check identified no issues (0 silenced).
      March 16, 2021 - 14:49:32
      Django version 3.0.3, using settings 'mysite.settings'
      Starting development server at http://127.0.0.1:8000/ 
      Quit the server with CTRL-BREAK.
      ```
6. Test by going searching from browser, `http://127.0.0.1:8000/detect/`. A "Hello World" message means successful running of server.

#### 2. Running the extension:
1. Make sure the host server is up and running.
2. Open Chrome.
3. Click on the extension from taskbar.
4. Enter any valid URL.
5. Wait and see the result if it is malicious or not. Result will pop up in a notification.
6. Open a new tab and go to any URL. Surf any URL, and the extension will detect URL changes and give results.