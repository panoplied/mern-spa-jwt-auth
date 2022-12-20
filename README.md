# Auth SPA example

Dev run routine

## Run fullstack (UI, API and Mongo at once) in containers with Docker Compose:

```
docker-compose up
```

This will run the UI on `UI_HOST_PORT` accordint to `./env`, which is `80` by default. So to view app in the browser, just open http://localhost.

For testing endpoints the API will be exposed on `API_HOST_PORT`, which is `8080` for Docker build, http://localhost:8080

## Run local dev version of the API

After running docker-compose local dev version of the API can be launched like this:

```
cd server
nodemon
```

This will expose the API on `API_PORT` from `./server/.env`, which is `4000` by default: http://localhost:4000

Source code changes are not in Docker volume, so not reflected inside the API container.

## Run local dev version of the Frontend

```
cd client
npm run dev 
```

This will launch React baked frontend on http://localhost:3000 by default.
