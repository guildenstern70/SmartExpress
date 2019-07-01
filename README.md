
### Smart Express

Simple template Node.js Web App

##### Description

* HTTP Server: Express.js
* Template Engine: Nunjucks
* Style Engines: LESS
* Package Manager: yarn
* Linter: eslint

##### Setup Node.js

    nodenv local

##### Deploy on IBM Cloud

    cf api https://api.eu-de.bluemix.net
    cf login --sso
    cf push

##### Initialize & Run project

    yarn install
    yarn start 


##### Run linter

    yarn lint
    
Auto-fix:

    yarn lint-fix
    
    
    
   
    
