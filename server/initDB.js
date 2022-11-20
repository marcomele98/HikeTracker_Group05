'use strict';

const dbname = "HT.sqlite";

const sqlite = require("sqlite3");

 const {hikevalues} = require('./hikesValues');
 const {pointsvalues} = require('./pointsValues');
 const {hutsvalues} = require('./hutsValues');
 const {parkingvalues} = require('./parkingsValues');

const db = new sqlite.Database(dbname, (err) => {
  if (err) throw err;
});


//OGNI VOLTA IN CUI VOGLIO RESTETTARE IL DB LO ELIMINO E LO SCRIPT QUA SOTTO LO RIPRISTINA COME DA CONSEGA APPENA RUNNO IL SERVER
db.serialize(function () {
  db.run("PRAGMA foreign_keys = ON");

  db.run(
    'CREATE TABLE IF NOT EXISTS "USER" (\
    "id"	INTEGER NOT NULL,\
    "name"	TEXT,\
    "surname" TEXT,\
    "role" TEXT NOT NULL,\
    "password" TEXT NOT NULL,\
    "email" TEXT NOT NULL UNIQUE,\
    "salt" TEXT NOT NULL,\
    "phone_number" TEXT,\
    PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "HIKE" (\
     "id"	INTEGER NOT NULL,\
     "title" TEXT NOT NULL,\
     "length_kms" NUMERIC NOT NULL,\
     "expected_mins" INTEGER NOT NULL,\
     "ascendent_meters" INTEGER NOT NULL,\
     "difficulty" TEXT NOT NULL,\
     "region" TEXT NOT NULL,\
     "province" TEXT NOT NULL,\
     "city" TEXT NOT NULL,\
     "lg_id" INTEGER NOT NULL,\
     "gpx" TEXT,\
     "end_point" INTEGER,\
     "end_point_type" TEXT,\
     "start_point" INTEGER,\
     "start_point_type" TEXT,\
     "description"TEXT,\
     PRIMARY KEY("id" AUTOINCREMENT),\
     FOREIGN KEY("lg_id") REFERENCES "USER"("id") on DELETE CASCADE\
    );'
  ); //Title è unique?

  db.run(
    'CREATE TABLE IF NOT EXISTS "POINT" (\
        "id"	INTEGER NOT NULL,\
        "latitude" TEXT NOT NULL,\
        "longitude" TEXT NOT NULL,\
        "altitude" TEXT NOT NULL,\
        "name" TEXT,\
        "address" TEXT,\
        "hike_id" INTEGER NOT NULL,\
        PRIMARY KEY("id" AUTOINCREMENT),\
        FOREIGN KEY("hike_id") REFERENCES "HIKE"("id") on DELETE CASCADE\
    );'
  );


  //extra info of the hut will be added here
  db.run(
    'CREATE TABLE IF NOT EXISTS "HUT" (\
       "id"	INTEGER NOT NULL,\
       "name" TEXT NOT NULL,\
       "latitude" TEXT NOT NULL,\
       "longitude" TEXT NOT NULL,\
       "altitude" TEXT NOT NULL,\
       "type" TEXT NOT NULL,\
       "region" TEXT NOT NULL,\
       "province" TEXT NOT NULL,\
       "city" TEXT NOT NULL,\
       "number_of_beds" INTEGER,\
       "description" TEXT,\
        PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "PARKING_LOT" (\
        "id"	INTEGER NOT NULL,\
        "name" TEXT NOT NULL,\
        "latitude" TEXT NOT NULL,\
        "longitude" TEXT NOT NULL,\
        "altitude" TEXT NOT NULL,\
        "region" TEXT NOT NULL,\
        "province" TEXT NOT NULL,\
        "city" TEXT NOT NULL,\
         PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  );

 
    db.run(
      'CREATE TABLE IF NOT EXISTS "HIKE_PARKING" (\
          "hike_id"	INTEGER NOT NULL,\
          "parking_id" INTEGER NOT NULL,\
           PRIMARY KEY("hike_id", "parking_id"),\
           FOREIGN KEY("hike_id") REFERENCES "HIKE"("id") on DELETE CASCADE,\
           FOREIGN KEY("parking_id") REFERENCES "PARKING_LOT"("id") on DELETE CASCADE\
      );'
    );
  

  db.run(
    'CREATE TABLE IF NOT EXISTS "HIKE_HUT" (\
        "hike_id"	INTEGER NOT NULL,\
        "hut_id" INTEGER NOT NULL UNIQUE,\
         PRIMARY KEY("hike_id", "hut_id"),\
         FOREIGN KEY("hike_id") REFERENCES "HIKE"("id") on DELETE CASCADE,\
         FOREIGN KEY("hut_id") REFERENCES "HUT"("id") on DELETE CASCADE\
    );'
  );


  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Mario', 'Rossi', 'local guide', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'lg1@p.it', '4783473632662333', '3334567980')"
  );
  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Giulio', 'Liso', 'hiker', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'h1@p.it', '4783473632662333', '3334567980')"
  );


  for (var i=0;i<hikevalues.length; i++){
   db.run(
     "INSERT OR IGNORE INTO HIKE(title,length_kms,expected_mins,ascendent_meters,difficulty,region,province, city, lg_id, gpx,\
       end_point, end_point_type, start_point, start_point_type, description)\
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", hikevalues[i][0],hikevalues[i][1],hikevalues[i][2],hikevalues[i][3],hikevalues[i][4],hikevalues[i][5],hikevalues[i][6],
        hikevalues[i][7],hikevalues[i][8],hikevalues[i][9],hikevalues[i][10],hikevalues[i][11],hikevalues[i][12],hikevalues[i][13],hikevalues[i][14],
           (err) => {
            if (err) {
              throw err;
            }
          }
   );
  };
  for (var i=0;i<pointsvalues.length; i++){
   db.run(
     "INSERT INTO POINT( latitude, longitude, altitude, name, address, hike_id )\
     VALUES (?,?,?,?,?,?) ", pointsvalues[i][0],pointsvalues[i][1],pointsvalues[i][2],pointsvalues[i][3],pointsvalues[i][4],pointsvalues[i][5],
        (err) => {
         if (err) {
           throw err;
         }
       }
);
   
   };
   for (var i=0;i<parkingvalues.length; i++){
   db.run(
     "INSERT INTO PARKING_LOT(name,latitude, longitude, altitude,region, province, city)\
      VALUES (?,?,?,?,?,?,?)", parkingvalues[i][0],parkingvalues[i][1],parkingvalues[i][2],parkingvalues[i][3],parkingvalues[i][4],
      parkingvalues[i][5],parkingvalues[i][6],
      (err) => {
       if (err) {
         throw err;
       }
     }
   );
    };
   
   for (var i=0;i<hutsvalues.length; i++){
   db.run(
     "INSERT INTO HUT(name,latitude, longitude, altitude,type, region, province, city, number_of_beds, description)\
      VALUES ( ?,?,?,?,?,?,?,?,?,?)", hutsvalues[i][0],hutsvalues[i][1],hutsvalues[i][2],hutsvalues[i][3],hutsvalues[i][4],
      hutsvalues[i][5],hutsvalues[i][6],hutsvalues[i][7],hutsvalues[i][8],hutsvalues[i][9],
      (err) => {
       if (err) {
         throw err;
       }
     }
   );
  };

   db.run(
    "INSERT INTO HIKE_PARKING(hike_id,parking_id)\
     VALUES (2, 1 ),\
            (3, 1),\
            (4, 2 ),\
            (5, 3 ),\
            (7, 4 ),\
            (13, 5 ),\
            (14, 6 ),\
            (15, 7),\
            (18, 8),\
            (19, 8),\
            (20, 8),\
            (24, 9),\
            (26, 10),\
            (27, 11),\
            (28, 12),\
            (29, 13),\
            (30, 14),\
            (31, 15),\
            (32, 16),\
            (37, 16)"
  );

  db.run(
    "INSERT INTO HIKE_HUT(hike_id,hut_id)\
     VALUES (1, 1 ),\
            (1, 2),\
            (2, 3 ),\
            (4, 4 ),\
            (7,  5),\
            (7, 6 ),\
            (8, 7 ),\
            (9, 8 ),\
            (10, 9 ),\
            (10, 10 ),\
            (11, 11 ),\
            (12, 12),\
            (15, 13),\
            (23, 14),\
            (24, 15),\
            (29, 16),\
            (35, 17),\
            (35, 18)"
  );

});
