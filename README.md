
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
    yarn build
    yarn start


##### Run linter

    yarn lint

Auto-fix:

    yarn lint-fix

#### Build a Docker image

    podman build -t smart-express .

#### Run as Docker image

    podman run -p 3000:3000 smart-express

#### Deploy to Quay.io

    sudo podman login -u guildenstern70 -p qLKmatt07 quay.io
    skopeo copy containers-storage:localhost/smart-express:latest docker://quay.io/guildenstern70/smart-express:latest





