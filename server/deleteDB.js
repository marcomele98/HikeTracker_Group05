'use strict';

const fs = require('fs');

const DBPath = "./HT.sqlite";

var admin = require("firebase-admin");

var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

try {
  admin.auth().getUserByEmail("lg1@p.it")
  .then(function (user) {
    if(user != undefined) {
      admin.auth().deleteUser(user.uid);
    }
  });
} catch {}

try {
  admin.auth().getUserByEmail("h1@p.it")
  .then(function (user) {
    if(user != undefined) {
      admin.auth().deleteUser(user.uid);
    }
  });
} catch {}

if(fs.existsSync(DBPath))
  fs.unlinkSync(DBPath)