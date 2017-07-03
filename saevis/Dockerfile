FROM nginx
COPY dist /usr/share/nginx/html
COPY set_ip.sh /set_ip.sh
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["bash", "-c", "/set_ip.sh && nginx -g 'daemon off;'"]
