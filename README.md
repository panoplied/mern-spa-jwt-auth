# MERN demo of SPA with JWT auth

## Run fullstack build with Docker Compose:

```
cp .env.template .env
```
Edit copied `.env` file to fill in `ALCHEMY_API_KEY` for Ethereum Mainnet (get on [Alchemy](https://alchemy.com)) and `JWT_PRIVATE_KEY` (arbitrary value, can even leave as it is for testing, but **should be properly secured secret word/phrase for production use**).
```
docker-compose up
```

Will build and launch three Docker containers:

- MongoDB
- Express API
- React UI (Vite flavoured)

The UI is first built in intermediate node container and statically served afterwards by production Nginx container on port `80`, thus available at http://localhost if built locally.

## API Endpoints

For the ease of endpoint testing the API is exposed on `API_HOST_PORT` stated in `.env`, which is `8080` by default, meaning http://localhost:8080 is available for local builds.

### End-point: /api/user/signup

#### Method: POST

> http://localhost:8080/api/user/signup

#### Body (**raw**)

```json
{
  "email": "user@mail.test",
  "password": "qweQWE123!@#"
}
```

### End-point: /api/user/login

#### Method: POST

> http://localhost:8080/api/user/login

#### Body (**raw**)

```json
{
  "email": "user@mail.test",
  "password": "qweQWE123!@#"
}
```

### End-point: /api/nft/transfers

#### Method: GET

> http://localhost:8080/api/nft/transfers

## Run dev version of the API

After running `docker-compose up` the local version of the API will have access to the exposed MongoDB port from Docker and can be launched locally like this:

```
cd server
cp ./env.template ./env
```
Edit copied `.env` file to fill in `ALCHEMY_API_KEY` for Ethereum Mainnet (get on [Alchemy](https://alchemy.com)) and `JWT_PRIVATE_KEY` (arbitrary value, can even leave as it is for testing, but **should be properly secured secret word/phrase for production use**). Then install `nodemon` and launch it from the `server` directory:
```
npm install -g nodemon
nodemon
```

This will expose the API endpoints on `API_PORT` from `./server/.env`, which is `4000` by default: http://localhost:4000

**Source code changes are not synced with Docker volume, so not reflected inside the API container.**

## Run dev version of the Frontend

```
cd client
cp ./env.template ./env
npm run dev
```

This will launch Vite/React baked dev version of frontend on http://localhost:3000 by default.
