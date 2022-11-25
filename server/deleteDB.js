'use strict';

const fs = require('fs');

const DBPath = "./HT.sqlite";

var admin = require("firebase-admin");
var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var getAuth = admin.auth();

const deleteAllUsers = (nextPageToken) => {
  getAuth.listUsers(1000, nextPageToken)
  .then((listUsersRes) => {
    listUsersRes.users.forEach((user) => {
      getAuth.deleteUser(user.toJSON().uid);
    });
    if (listUsersRes.pageToken) {
      deleteAllUsers(listUsersRes.pageToken);
    }
  })
  .catch((error) => {
    console.log(error);
  });
};

deleteAllUsers();

if(fs.existsSync(DBPath))
  fs.unlinkSync(DBPath)