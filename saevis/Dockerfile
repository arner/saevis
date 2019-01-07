FROM node:10.15.0
WORKDIR /usr/src/app

COPY package.json .
RUN npm install --loglevel=error
COPY . .

RUN npm run build

FROM nginx:1.15.8-alpine
COPY --from=0 /usr/src/app/dist/saevis /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
