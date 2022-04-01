# Dockerfile
FROM node:11.13.0-alpine

# create destination directory
# RUN mkdir -p /app
WORKDIR /app

# update and install dependency
RUN apk update && apk upgrade
# RUN apk add git

# copy the app, note .dockerignore
COPY . /app
# RUN npm install --unsafe-perm -g node-sass
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
