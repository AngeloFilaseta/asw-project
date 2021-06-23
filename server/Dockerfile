FROM node:alpine

WORKDIR /app

COPY 	package.json /app

RUN	npm install

COPY . /app

RUN mkdir -p resources/pdf
	
#VOLUME /resources/pdf/ 

CMD node app.js

