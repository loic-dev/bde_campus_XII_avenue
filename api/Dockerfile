FROM node:16-alpine
RUN npm config set unsafe-perm true
RUN mkdir /app 
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY ./ ./
EXPOSE 5000
CMD ["npm","start"]