'use strict';

const dbname = "HT.sqlite";

const sqlite = require("sqlite3");

const fs = require('fs');
var file1,file2,file3,file4,file5,file6;


 function readFile(filePath,content) {
        const data = fs.readFileSync(filePath);
        //console.log(data.toString());
        content = data.toString();
        return content;
}
 file1 = readFile('GPX_files/hike1.gpx',file1); //rocciamelone gpx
 file2 = readFile('GPX_files/hike2.gpx',file1); //Ascesa al Rifugio Savona
 file3 = readFile('GPX_files/hike3.gpx',file1); //Salita al Monte Antoroto
 file4 = readFile('GPX_files/hike4.gpx',file1); //Salita al Bric Mindino e al Colle di Prato Rotondo
 file5 = readFile('GPX_files/hike5.gpx',file1); //Salita al Bric Mindino e al Colle di Prato Rotondo
 file6 = readFile('GPX_files/hike6.gpx',file1); //Salita al Bric Mindino e al Colle di Prato Rotondo
 

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
     "city" TEXT NOT NULL,\
     "lg_id" INTEGER NOT NULL,\
     "gpx" TEXT,\
     "end_point" INTEGER,\
     "end_point_type" TEXT,\
     "start_point" INTEGER,\
     "start_point_type" TEXT,\
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
       "name" TEXT NOT NULL UNIQUE,\
       "latitude" TEXT NOT NULL,\
       "longitude" TEXT NOT NULL,\
       "altitude" TEXT NOT NULL,\
        PRIMARY KEY("id" AUTOINCREMENT)\
    );'
  );

  db.run(
    'CREATE TABLE IF NOT EXISTS "PARKING_LOT" (\
        "id"	INTEGER NOT NULL,\
        "name" TEXT NOT NULL UNIQUE,\
        "latitude" TEXT NOT NULL,\
        "longitude" TEXT NOT NULL,\
        "altitude" TEXT NOT NULL,\
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

var values =
[
  [1, 'Path to ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Mompantero', 1,
   file1, 1, 'general point', 1, 'Hut point'], //endpoint:1 pointtable,strtpoint:1 hut
  [2, 'Ascesa al Rifugio Savona', 10.3, 244, 610, 'Hiker', 'CN', 'Garessio', 1,
   file2, 1, 'Parking point', 1, 'Parking point'],//endpoint:1 parking,strtpoint:1 parking
  [3, 'Salita al Monte Antoroto', 17, 444, 1090, 'Professional Hiker', 'CN', 'Garessio', 1,
   file3, 1, 'Parking point', 1, 'Parking point'],//endpoint:1 parking,strtpoint:1 parking
  [4, 'Salita al Bric Mindino e al Colle di Prato Rotondo', 9.2, 218, 610, 'Hiker', 'CN', 'Garessio', 1,
   file4, 2, 'Parking point', 2, 'Parking point'],//endpoint:2 parking,strtpoint:2 parking
  [5, 'Colletta di Castelbianco Loop from Veravo', 5.7, 105, 206, 'Tourist', 'SV', 'Castelbianco', 1,
   file5, 3, 'Parking point', 3, 'Parking point'],//endpoint:3 parking,strtpoint:3 parking
  [6, 'Chiesa di Santa Libera Loop from Losano', 4.6, 80, 122, 'Tourist', 'TO', 'Frailino', 1,
   file6, 6, 'general point', 6, 'general point']//endpoint:2 pointtable,strtpoint:3 pointtable
];
  for (var i=0;i<6; i++){
   db.run(
     "INSERT OR IGNORE INTO HIKE(id,title,length_kms,expected_mins,ascendent_meters,difficulty,region, city, lg_id, gpx,\
       end_point, end_point_type, start_point, start_point_type)\
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", values[i][0],values[i][1],values[i][2],values[i][3],values[i][4],values[i][5],values[i][6],
        values[i][7],values[i][8],values[i][9],values[i][10],values[i][11],values[i][12],values[i][13],
           (err) => {
            if (err) {
              throw err;
            }
          }
   );
  };

   db.run(
     "INSERT INTO POINT(id, latitude, longitude, altitude, name, address, hike_id )\
        VALUES (1, '45.20353', '7.07734', '3538', 'Rocciamelone','Rocciamelone, Piedmont', 1),\
               (2, '44.20647', '7.92800', '5300', 'La pianura dalle Alpi Liguri','Garessio, Cuneo, Piedmont', 2 ),\
               (3, '44.23647', '7.95442', '3000', 'Bric Mindino','Garessio, Cuneo, Piedmont' , 4),\
               (4, '44.24354', '7.97038', '6900', 'Sentiero per il colle di prato rotondo', 'Garessio, Cuneo, Piedmont' ,4),\
               (5, '44.11270', '8.06636', '150',  'Colletta di Castelbianco','Castelbianco, Savona, Liguria' , 5),\
               (6, '44.14157', '8.23626', '122',  'Waypoint','via santa libera, Loano, Savona, Liguria', 6),\
               (7, '44.14762', '8.23185', '3800', 'Chiesa di Santa Libera','Loano, Savona, Liguria' , 6),\
               (8, '44.19202', '7.91444', '4400', 'Colla Bassa'  , 'Garessio, Cuneo, Piedmont', 3),\
               (9, '44.18839', '7.91141', '5500', 'Monte Antoroto', 'Garessio, Cuneo, Piedmont', 3)"
   );

   db.run(
     "INSERT INTO PARKING_LOT(id,name,latitude, longitude, altitude)\
      VALUES (1, 'Piazzale di Valdinferno','44.19296', '7.95501','1192'),\
             (2, 'Parking Garessio 200','44.21653', '7.94425','1392'),\
             (3, 'Parking Colletta di Castelbianco','44.11318', '8.06597','235')"

   );
  
   db.run(
     "INSERT INTO HUT(id,name,latitude, longitude, altitude)\
      VALUES (1, 'Refuge La Riposa','45.17778', '7.08337', '2185'),\
             (2, 'Refugio Asti','45.19177', '7.07427','2854' ),\
             (3, 'Rifugio Savona','44.19940', '7.93339','2600' ),\
             (4, 'Gallo di monte','44.21736', '7.94432','1392' )"
   );

   db.run(
    "INSERT INTO HIKE_PARKING(hike_id,parking_id)\
     VALUES (2, 1 ),\
            (3, 1),\
            (4, 2 ),\
            (5, 3 )"
  );

  db.run(
    "INSERT INTO HIKE_HUT(hike_id,hut_id)\
     VALUES (1, 1 ),\
            (1, 2),\
            (2, 3 ),\
            (4, 4 )"
  );

});
