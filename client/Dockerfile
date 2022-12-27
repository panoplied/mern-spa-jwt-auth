# Stage 0, build frontend
FROM node:18-alpine AS builder
WORKDIR /ui
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_APP_API_HOST
ARG VITE_APP_API_PORT
ARG VITE_APP_API_PATH
RUN VITE_APP_API_HOST=${VITE_APP_API_HOST} VITE_APP_API_PORT=${VITE_APP_API_PORT} VITE_APP_API_PATH=${VITE_APP_API_PATH} && npm run build

# Stage 1, serve build with nginx
FROM nginx:1.23.3-alpine
COPY ./nginx.conf /etc/nginx/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ui/dist/ /usr/share/nginx/html
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
