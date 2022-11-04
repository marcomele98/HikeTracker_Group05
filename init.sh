#!/usr/bin/env node

cd client
npm install
cd ../server
npm install
node deleteDB.js
node initDB.js