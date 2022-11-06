'use strict';

const dbname = "HT.sqlite";

const sqlite = require("sqlite3");


const db = new sqlite.Database(dbname, (err) => {
  if (err) throw err;
});


//OGNI VOLTA IN CUI VOGLIO RESTETTARE IL DB LO ELIMINO E LO SCRIPT QUA SOTTO LO RIPRISTINA COME DA CONSEGA APPENA RUNNO IL SERVER
db.serialize(function () {
  db.run("PRAGMA foreign_keys = ON");
  db.run(
    'CREATE TABLE IF NOT EXISTS "HIKE" (\
     "id"	INTEGER NOT NULL,\
     "title" TEXT NOT NULL,\
     "length_kms" NUMERIC NOT NULL,\
     "expected_mins" INTEGER NOT NULL,\
     "ascendent_meters" INTEGER NOT NULL,\
     "difficulty" TEXT NOT NULL,\
     PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  ); //Title è unique?

  db.run(  
    'CREATE TABLE IF NOT EXISTS "POINT" (\
        "id"	INTEGER NOT NULL,\
        "latitude" TEXT NOT NULL,\
        "longitude" TEXT NOT NULL,\
        PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  );


  //extra info of the hut will be added here
  db.run(  
      'CREATE TABLE IF NOT EXISTS "HUT" (\
       "id"	INTEGER NOT NULL,\
       "name" TEXT NOT NULL UNIQUE,\
       "point_id" INTEGER NOT NULL,\
        PRIMARY KEY("id" AUTOINCREMENT),\
        FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE\
    );'
  );

  //extra info of the parking will be added here
  db.run(  
        'CREATE TABLE IF NOT EXISTS "PARKING_LOT" (\
        "id"	INTEGER NOT NULL,\
        "name" TEXT NOT NULL UNIQUE,\
        "point_id" INTEGER NOT NULL,\
         PRIMARY KEY("id" AUTOINCREMENT),\
         FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE\
    );'
  );

  //extra info of the named location will be added here
  db.run(  
        'CREATE TABLE IF NOT EXISTS "NAMED_LOCATION" (\
        "id"	INTEGER NOT NULL,\
        "name" TEXT NOT NULL UNIQUE,\
        "point_id" INTEGER NOT NULL,\
         PRIMARY KEY("id" AUTOINCREMENT),\
         FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE\
    );'
  );

  db.run(  
        'CREATE TABLE IF NOT EXISTS "ADDRES" (\
        "id"	INTEGER NOT NULL,\
        "address" TEXT NOT NULL UNIQUE,\
        "point_id" INTEGER NOT NULL,\
         PRIMARY KEY("id" AUTOINCREMENT),\
         FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE\
    );'
    );

    db.run( 
      'CREATE TABLE IF NOT EXISTS "HIKE_POINTS" (\
      "hike_id"	INTEGER NOT NULL,\
      "point_id" INTEGER NOT NULL,\
      "point_position_in_hike" INTEGER NOT NULL,\
      FOREIGN KEY("hike_id") REFERENCES "HIKE"("id") on DELETE CASCADE,\
      FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE,\
      PRIMARY KEY("hike_id","point_id")\
      );'
    );

    db.run( 
      'CREATE TABLE IF NOT EXISTS "USER" (\
      "id"	INTEGER NOT NULL,\
      "name"	TEXT,\
      "surname" TEXT,\
      "role" TEXT NOT NULL,\
      "password" TEXT NOT NULL,\
      "email" TEXT NOT NULL,\
      "salt" TEXT NOT NULL,\
      "phone_number" TEXT,\
      PRIMARY KEY("email","role")\
      );'
    );

    db.run(
      "INSERT OR IGNORE INTO USER(id, name, surname, role, password, email, salt, phone_number)\
       VALUES (1, 'Mario', 'Rossi', 'local guide', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'lg1@p.it', '4783473632662333', '3334567980')"
    );


});