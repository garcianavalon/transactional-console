FROM node:7.7.2

# TODO(garcianavalon) parametrize MAINTAINER in generator
# MAINTAINER Enrique Garcia Navalon <garcianavalon@gmail.com>

# Our app directory
WORKDIR /app

# nodemon for live reloading in development
RUN npm install -gq nodemon

EXPOSE 3000

CMD [ "npm", "start"]

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json ./
RUN npm install -q

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
COPY . /app
