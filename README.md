# Auth SPA example

Current dev run routine

## Run both Mongo and API in Docker containers:

```
docker-compose up
```

This will expose the API on `API_HOST_PORT` according to `./env`, which is `5000` by default: http://localhost:5000

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
npm run start
```

This will launch React baked frontend on http://localhost:3000 by default.