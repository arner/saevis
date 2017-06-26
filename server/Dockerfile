FROM node:6

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# Cache node modules
COPY package.json /usr/src/app/
RUN npm install --loglevel error

COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]
