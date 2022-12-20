# Stage 0, build frontend
FROM node:18-alpine as build
WORKDIR /ui
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run build

# Stage 1, serve build with nginx
FROM nginx:1.23.3-alpine
COPY ./nginx.conf /etc/nginx/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /ui/dist/ /usr/share/nginx/html
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
