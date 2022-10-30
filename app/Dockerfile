FROM node:18-alpine
WORKDIR /usr/src/app
# Issue here is that CRA builds for static pages - meaning ENV's can't be accessed
# There is a fix here - but need to implement it.
# In the meantime, just going to build for prod always.
ARG REACT_APP_API_URL https://demo-api.fotostash.pics
ENV REACT_APP_API_URL ${REACT_APP_API_URL}
COPY package*.json ./
RUN npm ci
RUN npm install -g serve
COPY . .
RUN npm run build
RUN npm ci npm cache clean --force
EXPOSE 3000
CMD ["serve","-s","build"]
