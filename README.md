
### Smart Express

Simple template Node.js Web App

##### Description

* HTTP Server: Express.js
* Template Engine: Nunjucks
* Style Engines: SASS & LESS
* Package Managers: NPM & Bower
* Task automation tool: Gulp

##### Prerequisites

    npm install -g node-sass less
    npm install -g gulp

##### URL

    http://a2ademo.eu-de.mybluemix.net

##### Deploy

    cf api https://api.eu-de.bluemix.net
    cf login --sso
    cf push

##### Initialize project

    npm install
    bower install
    gulp sass
    npm run browse 

On Mac use

    npm run browse-mac    
    
#### Style customization

Use styles in SASS in directory

    scss/
    
Compile Foundation CSS with

    gulp sass    
    
Compiled SASS styles go into

    public/css         
    
##### Bower

Add package:

    bower install PACKAGE --save    

##### NPM

    package-lock.json
    
is a file generated or updated by

    npm install
    
which assures coherence of JS libraries across all environments.