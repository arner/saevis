FROM node:8.9.1
WORKDIR /usr/src/app
RUN npm install -g nodemon@1.12.1

COPY package.json .
RUN npm install --loglevel=error
COPY . .

EXPOSE 3000
CMD [ "nodemon" ]
