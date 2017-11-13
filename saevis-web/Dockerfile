FROM node:8.9.1 as build-stage
WORKDIR /usr/src/app
RUN npm install -g  --unsafe-perm @angular/cli@1.5.0 --loglevel=warn

COPY package.json .
RUN npm install --loglevel=warn
COPY . .
RUN ng build --environment=prod

FROM nginx:1.13.6
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY set_ip.sh /set_ip.sh
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["bash", "-c", "/set_ip.sh && nginx -g 'daemon off;'"]
