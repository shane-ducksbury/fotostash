# fotostash
fotostash is a minimal, self-hostable photo album.

![screenshot of fotostash](https://github.com/shane-ducksbury/fotostash/blob/main/fotostash-screenshot.png?raw=true "A screenshot of fotostash")

### Features
- Individual User Accounts
- Clean interface
- Upload Photos
- View Photos
- Create Albums of your favourite photos

### Stack
fotostash is built with a React TypeScript frontend, using MUI (sparingly). The backend is built using NestJS, integrating with TypeORM and MySQL Lite. In future I will update to PostgreSQL. Images are stored using MinIO, which is self-hosted block storage.

### Directories
app - React App Frontend
api - NestJS API backend
datastore - Local minio docker container
docker - The docker compose file to run locally.

### Setup
To install on Docker, use the docker-compose file from the docker container. N.B this is currently slightly broken until an override is worked out for the API url.

### Running for local development
API
1. Change to the api directory
2. Run `npm install`
3. Run `npm run start:dev`

App
1. Change to the app directory
2. Run `npm install`
3. Run `npm run start`

Datastore/Minio
1. Change to the datastore directory
2. Run `docker compose up -d`

### Environment Variables
A number of environment variables are required for the API and App to run.

For the API:
```
MINIO_ENDPOINT=
MINIO_PORT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_BUCKET_NAME=
JWT_SECRET=
PORT=5050
```

For the App:
```
REACT_APP_API_URL=
```