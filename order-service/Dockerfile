FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
EXPOSE 8001
RUN apk --update add curl
RUN npm i
RUN npx prisma generate
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["npm", "start"]
