FROM node:10.15.0
WORKDIR /usr/src/app

COPY package.json .
RUN npm install --loglevel=error
COPY . .

RUN npm run build

EXPOSE 3000
ENV NODE_ENV production
CMD [ "node", "dist/main.js"]
