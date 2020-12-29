
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





