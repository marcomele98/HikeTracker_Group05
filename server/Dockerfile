FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run resetDB

EXPOSE 3001

CMD ["npm", "start"]