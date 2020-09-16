FROM registry.access.redhat.com/ubi8/nodejs-12

MAINTAINER Alessio Saltarin <alessiosaltarin@gmail.com>

WORKDIR /usr/src/app

# Add application sources
ADD . .

# Install the dependencies
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
