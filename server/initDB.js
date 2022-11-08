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
    'CREATE TABLE IF NOT EXISTS "USER" (\
    "name"	TEXT,\
    "surname" TEXT,\
    "role" TEXT NOT NULL,\
    "password" TEXT NOT NULL,\
    "email" TEXT NOT NULL,\
    "salt" TEXT NOT NULL,\
    "phone_number" TEXT,\
    PRIMARY KEY("email")\
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
     "city" TEXT NOT NULL,\
     "email" TEXT NOT NULL,\
     "gpx_path" TEXT,\
     PRIMARY KEY("id" AUTOINCREMENT),\
     FOREIGN KEY("email") REFERENCES "USER"("email") on DELETE CASCADE\
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
      PRIMARY KEY("hike_id","point_id", "point_position_in_hike")\
      );'
  );



  db.run(
    "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
       VALUES ('Mario', 'Rossi', 'local guide', \
              'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
              'lg1@p.it', '4783473632662333', '3334567980')"
  );

  db.run(
    "INSERT OR IGNORE INTO HIKE(id,title,length_kms,expected_mins,ascendent_meters,difficulty,region, city, email)\
       VALUES (1, 'Path to ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Mompantero', 'lg1@p.it'),\
              (2, 'Ascesa al Rifugio Savona', 10.3, 244, 610, 'Hiker', 'CN', 'Garessio', 'lg1@p.it'),\
              (3, 'Salita al Monte Antoroto', 17, 444, 1090, 'Professional Hiker', 'CN', 'Garessio', 'lg1@p.it'),\
              (4, 'Salita al Bric Mindino e al Colle di Prato Rotondo', 9.2, 218, 610, 'Hiker', 'CN', 'Garessio', 'lg1@p.it'),\
              (5, 'Colletta di Castelbianco Loop from Veravo', 5.7, 105, 206, 'Tourist', 'SV', 'Castelbianco', 'lg1@p.it'),\
              (6, 'Chiesa di Santa Libera Loop from Losano', 4.6, 80, 122, 'Tourist', 'TO', 'Frailino', 'lg1@p.it')"
  );

  db.run(
    "INSERT INTO POINT(id, latitude, longitude )\
       VALUES (1, '45.17778', '7.08337'),\
              (2, '45.20353', '7.07734'),\
              (3, '44.19202', '7.91444'),\
              (4, '44.18839', '7.91141'),\
              (5, '44.19296', '7.95501'),\
              (6, '44.19940', '7.93339'),\
              (7, '44.20647', '7.92800'),\
              (8, '44.21653', '7.94425'),\
              (9, '44.23647', '7.95442'),\
              (10, '44.24354', '7.97038'),\
              (11, '44.11318', '8.06597'),\
              (12, '44.11270', '8.06636'),\
              (13, '44.14157', '8.23626'),\
              (14, '44.14762', '8.23185'),\
              (15, '45.19177', '7.07427'),\
              (16, '44.21736', '7.94432')"
  );

  db.run(
    "INSERT INTO PARKING_LOT(id,name,point_id)\
     VALUES (1, 'Piazzale di Valdinferno', 5),\
            (2, 'Parking Garessio 200', 8),\
            (3, 'Parking Colletta di Castelbianco', 11)"

  );

  db.run(
    "INSERT INTO HUT(id,name,point_id)\
     VALUES (1, 'Refugio Asti', 15),\
            (2, 'Rifugio Savona', 6),\
            (3, 'Gallo di monte', 16)"
  );

  db.run(
    "INSERT INTO HIKE_POINTS(hike_id,point_id,point_position_in_hike)\
     VALUES (1, 1, 1),\
            (1, 2, 3),\
            (1, 15, 2),\
            (2, 5, 1),\
            (2, 6, 2),\
            (2, 7, 3),\
            (2, 5, 4),\
            (3, 5, 1 ),\
            (3, 5, 4),\
            (3, 3, 2),\
            (3, 4, 3),\
            (4, 16, 1),\
            (4, 8, 4),\
            (4, 9, 2),\
            (4, 10, 3),\
            (5, 11, 1),\
            (5, 11, 3),\
            (5, 12, 2),\
            (6, 13, 1),\
            (6, 14, 2),\
            (6, 13, 3)"
  );



});