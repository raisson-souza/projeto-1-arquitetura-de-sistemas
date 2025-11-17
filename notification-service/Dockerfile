FROM node:24-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
