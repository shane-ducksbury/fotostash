FROM node:18-alpine
WORKDIR /usr/src/app
ENV PORT=5050
ENV MINIO_ENDPOINT=localhost
ENV MINIO_PORT=9000
ENV MINIO_ACCESS_KEY=minioadmin
ENV MINIO_SECRET_KEY=minioadmin
ENV MINIO_BUCKET_NAME='fotostash-bucket'
ENV JWT_SECRET=random_password
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci npm cache clean --force
# USER node
CMD [ "node", "dist/src/main.js" ]
