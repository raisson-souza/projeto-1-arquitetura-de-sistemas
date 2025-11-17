FROM node:24-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 8003
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["npm", "start"]
