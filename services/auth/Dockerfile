FROM node:18
WORKDIR /app
COPY . .
RUN npm rebuild bcrypt --build-from-source
EXPOSE 5000
CMD ["node", "index.js"]
