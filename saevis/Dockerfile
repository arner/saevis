FROM nginx
COPY dist /usr/share/nginx/html
COPY set_ip.sh /set_ip.sh
CMD ["bash", "-c", "/set_ip.sh && nginx -g 'daemon off;'"]
