'use strict';

const dbname = "HT.sqlite";

const sqlite = require("sqlite3");

const { hikevalues } = require('./dbPopulationFiles/hikesValues');
const { pointsvalues } = require('./dbPopulationFiles/pointsValues');
const { hutsvalues } = require('./dbPopulationFiles/hutsValues');
const { parkingvalues } = require('./dbPopulationFiles/parkingsValues');

const db = new sqlite.Database(dbname, (err) => {
  if (err) throw err;
});

let admin = require("firebase-admin");

let serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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
    'CREATE TABLE IF NOT EXISTS "HIKER_PREFERENCES" (\
    "user_id" INTEGER NOT NULL,\
    "max_length_kms" NUMERIC,\
    "min_length_kms" NUMERIC,\
    "max_expected_mins" INTEGER,\
    "min_expected_mins" INTEGER,\
    "max_ascendent_meters" INTEGER,\
    "min_ascendent_meters" INTEGER,\
    "max_difficulty" TEXT,\
    "min_difficulty" TEXT,\
    "point_latitude" TEXT,\
    "point_longitude" TEXT,\
    "radius" INTEGER,\
    "region" TEXT,\
    "province" TEXT,\
    "city" TEXT,\
    PRIMARY KEY ("user_id")\
    FOREIGN KEY ("user_id") REFERENCES "USER"("id") on DELETE CASCADE\
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
     "image" TEXT,\
     PRIMARY KEY("id" AUTOINCREMENT),\
     FOREIGN KEY("lg_id") REFERENCES "USER"("id") on DELETE CASCADE\
    );'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "HIKE_HIKER" (\
        "hike_id" INTEGER NOT NULL,\
        "hiker_id" INTEGER NOT NULL,\
        "start_time" DATETIME NOT NULL,\
        "end_time" DATETIME,\
        PRIMARY KEY("hike_id", "hiker_id", "start_time")\
        FOREIGN KEY("hike_id") REFERENCES "HIKE"("id") on DELETE CASCADE,\
        FOREIGN KEY("hiker_id") REFERENCES "USER"("id") on DELETE CASCADE\
    );'
  )

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

  db.run(
    'CREATE TABLE IF NOT EXISTS "HIKER_POINT" (\
        "point_id" INTEGER NOT NULL,\
        "hiker_id" INTEGER NOT NULL,\
        "time" DATETIME,\
        PRIMARY KEY("point_id", "hiker_id")\
        FOREIGN KEY("hiker_id") REFERENCES "USER"("id") on DELETE CASCADE,\
        FOREIGN KEY("point_id") REFERENCES "POINT"("id") on DELETE CASCADE\
    );'
  )


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
       "phone" TEXT,\
       "email" TEXT,\
       "description" TEXT,\
       "image" TEXT,\
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
        "capacity" INTEGER,\
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
        "hut_id" INTEGER NOT NULL,\
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


  try {
    admin.auth().createUser({
      email: "lg1@p.it",
      emailVerified: true,
      password: "password",
      displayName: "Mario Rossi",
      disabled: false
    });
  } catch { }

  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Pippo', 'Baudo', 'local guide', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'lg2@p.it', '4783473632662333', '3334567980')"
  );

  try {
    admin.auth().createUser({
      email: "lg2@p.it",
      emailVerified: true,
      password: "password",
      displayName: "Pippo Baudo",
      disabled: false
    });
  } catch { }


  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Giulio', 'Liso', 'hiker', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'h1@p.it', '4783473632662333', '3334567980')"
  );

  try {
    admin.auth().createUser({
      email: "h1@p.it",
      emailVerified: true,
      password: "password",
      displayName: "Giulio Liso",
      disabled: false
    });
  } catch { }

  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Chiara', 'Ferragni', 'hiker', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'h2@p.it', '4783473632662333', '3334567980')"
  );

  try {
    admin.auth().createUser({
      email: "h2@p.it",
      emailVerified: true,
      password: "password",
      displayName: "Chiara Ferragni",
      disabled: false
    });
  } catch { }

  db.run(
    "INSERT OR IGNORE INTO HIKER_PREFERENCES(user_id, max_length_kms, min_length_kms, max_expected_mins, min_expected_mins,\
     max_ascendent_meters, min_ascendent_meters, max_difficulty, min_difficulty, point_latitude, point_longitude, radius,\
      region, province, city)\
       VALUES (4, 20, 5, 400, 70, 800, 100, 'Hiker','Hiker',  '44.217360', '7.944320', 10, 'Piemonte', 'CN', 'Garessio')"
  );

  for (let i = 0; i < hikevalues.length; i++) {
    db.run(
      "INSERT OR IGNORE INTO HIKE(title,length_kms,expected_mins,ascendent_meters,difficulty,region,province, city, lg_id, gpx,\
       end_point, end_point_type, start_point, start_point_type, description, image)\
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?) ", hikevalues[i][0], hikevalues[i][1], hikevalues[i][2], hikevalues[i][3], hikevalues[i][4], hikevalues[i][5], hikevalues[i][6],
      hikevalues[i][7], hikevalues[i][8], hikevalues[i][9], hikevalues[i][10], hikevalues[i][11], hikevalues[i][12], hikevalues[i][13], hikevalues[i][14], hikevalues[i][15],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  };

  db.run(
    "INSERT OR IGNORE INTO HIKE_HIKER(hike_id, hiker_id, start_time, end_time)\
    VALUES(1, 3, '2022-11-16 12:00:00', '2022-11-16 18:00:00'),\
          (2, 3, '2022-11-09 12:00:00', '2022-11-09 18:00:00'),\
          (2, 3, '2022-11-10 12:00:00', '2022-11-10 18:00:00'),\
          (2, 3, '2022-11-08 12:00:00', '2022-11-08 18:00:00'),\
          (14, 4, '2022-11-09 12:00:00', NULL),\
          (12, 4, '2022-11-07 12:00:00', '2022-11-07 18:00:00'),\
          (18, 3, '2022-12-13 12:00:00', NULL),\
          (26, 3, '2022-12-09 12:00:00', '2022-12-09 18:00:00'),\
          (38, 4, '2022-12-14 16:00:00', '2022-12-14 18:00:00'),\
          (45, 4, '2022-12-23 14:00:00', '2022-12-23 17:00:00')"
  );



  for (let i = 0; i < pointsvalues.length; i++) {
    db.run(
      "INSERT INTO POINT( latitude, longitude, altitude, name, address, hike_id )\
     VALUES (?,?,?,?,?,?) ", pointsvalues[i][0], pointsvalues[i][1], pointsvalues[i][2], pointsvalues[i][3], pointsvalues[i][4], pointsvalues[i][5],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

  };


  for (let i = 0; i < parkingvalues.length; i++) {
    db.run(
      "INSERT INTO PARKING_LOT(name,latitude, longitude, altitude, capacity, region, province, city)\
      VALUES (?,?,?,?,?,?,?,?)", parkingvalues[i][0], parkingvalues[i][1], parkingvalues[i][2], parkingvalues[i][3], parkingvalues[i][4],
      parkingvalues[i][5], parkingvalues[i][6], parkingvalues[i][7],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  };


  for (let i = 0; i < hutsvalues.length; i++) {
    db.run(
      "INSERT INTO HUT(name,latitude, longitude, altitude,type, region, province, city, number_of_beds,phone, email, description, image)\
      VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?, ?)", hutsvalues[i][0], hutsvalues[i][1], hutsvalues[i][2], hutsvalues[i][3], hutsvalues[i][4],
      hutsvalues[i][5], hutsvalues[i][6], hutsvalues[i][7], hutsvalues[i][8], hutsvalues[i][9], hutsvalues[i][10], hutsvalues[i][11], hutsvalues[i][12],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  };

  db.run(
    "INSERT OR IGNORE INTO HIKER_POINT(point_id, hiker_id, time)\
     VALUES(2, 3, '2022-11-09 14:30:00'),\
          (52, 3, '2022-12-13 12:40:00'),\
          (51, 3, '2022-12-13 13:10:00'),\
          (78, 3, '2022-12-09 16:30:00'),\
          (79, 3, '2022-12-09 15:00:00'),\
          (77, 3, '2022-12-09 14:00:00'),\
          (110, 4, '2022-12-14 16:20:00'),\
          (125, 4, '2022-12-23 15:15:00')"
  );


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
            (37, 16),\
            (39, 17),\
            (40, 18),\
            (42, 17),\
            (45, 18),\
            (46, 19),\
            (51,20)"
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
            (35, 18),\
            (39, 19),\
            (42, 19),\
            (43, 20),\
            (43, 21),\
            (43, 22),\
            (44, 23),\
            (44, 24),\
            (46, 25),\
            (48, 26),\
            (52, 29),\
            (54, 30),\
            (54, 27),\
            (54, 28)"

  );

});
