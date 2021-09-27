# LinkedDIT
An online application of professional networking.

The aim of this work is to develop a professional networking application. The users
will have access to the application via a modern web browser
browser. The application was created using the Vue.js and Django frameworks for the front and back respectively. 

# Installation
## Back end
The following commands must be executed to install the back end. The prerequisites are that the python 3.6 is installed.

`sudo apt update`

`sudo apt install python3-pip`

`pip install Django==3.2.6`

`pip install django-rest-framework`

`pip install django-cors-headers`

`pip install PyJWT`

`pip install numpy, sklearn, matplotlib`

CP to back end directory and exexute these commands.

`python3 manage.py makekigrations`

`python3 manage.py migrate`

`python3 manage.py runserver`



## Front end
The following commands must be executed to install the front end. The prerequisites are that the Node.js and the latest  version of Npm.js are installed.

`curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

`sudo apt install nodejs`

`sudo npm install vue`

`sudo npm install -g @quasar/cli`

CP to back end directory and exexute these commands.

`sudo npm install`

`quasar dev`
