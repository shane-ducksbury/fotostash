# fotostash
fotostash is a minimal, self-hostable photo album.

![screenshot of fotostash](https://github.com/shane-ducksbury/fotostash/blob/main/fotostash-screenshot.png?raw=true "A screenshot of fotostash")

### Features
- Individual User Accounts
- Clean interface
- Upload Photos
- View Photos
- Create Albums of your favourite photos

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
