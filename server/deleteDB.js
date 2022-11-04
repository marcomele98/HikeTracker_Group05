'use strict';

const fs = require('fs');

const DBPath = "./HT.sqlite";

if(fs.existsSync(DBPath))
  fs.unlinkSync(DBPath)