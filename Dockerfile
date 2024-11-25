FROM node:21 
WORKDIR /app
COPY package.json  /app/
RUN npm install
RUN npm i -g nodemon
COPY . . 
CMD ["node","app.js"];