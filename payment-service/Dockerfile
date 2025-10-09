FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
EXPOSE 8002
RUN npm i
RUN npx prisma generate
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["npm", "start"]
