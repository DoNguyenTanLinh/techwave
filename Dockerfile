FROM node:18-alpine
WORKDIR /techwave/backend
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm install --production
CMD ["node", "src/server.js"]
EXPOSE 3000