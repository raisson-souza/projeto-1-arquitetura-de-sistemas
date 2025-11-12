FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8000
RUN apk --update add curl
RUN npm i
CMD ["npm", "start"]
