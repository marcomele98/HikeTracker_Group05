# HikeTracker_Group05


# API

## HIKE

### POST

#### **/api/hike**
- **Creates a new hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing title, length_kms, expected_mins, ascendent_meters, difficulty, province, 
                city, gpx,  end_point, start_point, and an array of reference points (empty if no reference points)

```
        {
            "title": "ROCCIAMELONE",
            "length_kms": 9,
            "expected_mins": 420,
            "ascendent_meters": 3538,
            "difficulty": "Professional Hiker",
            "province": "TO",
            "city": "Mompantero",
            "gpx": "gpx content",
            "end_point" : {
                            "latitude" : "",
                            "longitude" : "",
                            "altitude" : "",
                            "name" : "", (if present)
                            "address" : "" (if present)
                        },
            "start_point" : {
                            "latitude" : "",
                            "longitude" : "",
                            "altitude" : "",
                            "name" : "", (if present)
                            "address" : "" (if present)
                        },
            "reference_points" : [{
                            "latitude" : "",
                            "longitude" : "",
                            "altitude" : "",
                            "name" : "", (if present)
                            "address" : "" (if present)
                        }, 
                        {
                            "latitude" : "",
                            "longitude" : "",
                            "altitude" : "",
                            "name" : "", (if present)
                            "address" : "" (if present)
                        }, ... ] if no reference points the array will be empty []
        }       
```

- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Local Guide
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).



### PUT

#### **/api/hikeStart/hikeId**
- **Modify start point of an hike.**
- **Request header** has a line: `Content-Type: application/json` and req.params.hikeId to retrieve id.
- **Request body**: a JSON object containing start_point, type_start

```
        {
            "start_point": 15
            "type_start": 'Parking point'
        }       
```

- **Response header**:  `200 Ok` (success). 
- **Response body**: none.
- **Permissions allowed**:  Local Guide
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `404 Not found` (Hike not existing), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).


#### **/api/hikeEnd/hikeId**
- **Modify end point of an hike.**
- **Request header** has a line: `Content-Type: application/json` and req.params.hikeId to retrieve id.
- **Request body**: a JSON object containing end_point, type_end

```
        {
            "end_point": 15
            "type_end": 'Parking point'
        }       
```

- **Response header**:  `200 Ok` (success). 
- **Response body**: none.
- **Permissions allowed**:  Local Guide
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `404 Not found` (Hike not existing), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).




### GET

#### **/api/hikes**
- **Returns a list with all hikes.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: none.
- **Response**
- **Response header**:  `200 Ok` (success). 
- **Response body**: : a JSON object containing an array with all hikes generics details

```
        {
            [
              {
                "id": 1,
                "title": "ROCCIAMELONE",
                "length_kms": 9,
                "expected_mins": 420,
                "ascendent_meters": 3538,
                "difficulty": "Professional Hiker",
                "province": "TO",
                "city": "Mompantero",
                "gpx": "gpx content",
                "lg_id": 1,
                "end_point_type": "point",
                "end_point": 2,
                "start_point_type": "parking_lot",
                "start_point": 1
              },
              {
                "id": 2,
                "title": "Salita al Monte Antoroto",
                "length_kms": 17,
                "expected_mins": 444,
                "ascendent_meters": 31090,
                "difficulty": "Professional Hiker",
                "province": "CN",
                "city": "Garessio",
                "gpx": "gpx content",
                "lg_id": 1,
                "end_point_type": "parking_lot",
                "end_point": 3,
                "start_point_type": "hut",
                "start_point": 1
              }, 
              ...
            ]
        }       
```
- **Permissions allowed**:  All users and visitors.
- **Error responses**: `503 Service Unavailable` (generic error).


### GET

#### **/api/hike/:hikeId**
- **Returns a list with all hikes.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: none.
- **Response**
- **Response header**:  `200 Ok` (success). 
- **Response body**: : a JSON object containing all details for a specific hike, including start points details,end point details and three arrays with all huts, paking lots ang generic points details.

```
        {
              "id": 1,
              "title": "ROCCIAMELONE",
              "length_kms": 9,
              "expected_mins": 420,
              "ascendent_meters": 3538,
              "difficulty": "Professional Hiker",
              "province": "TO",
              "city": "Mompantero",
              "gpx": "gpx content",
              "lg_id": 1,
              "end_point_type": "point"
              "end_point":{
                             "id": 2,
                             "latitude" : "",
                             "longitude" : "",
                             "altitude" : "",
                             "name" : "", (if present)
                             "address" : "" (if present)
                          },
              "start_point_type": "parking_lot",
              "start_point" : {
                                  "id": 1,
                                  "latitude" : "",
                                  "longitude" : "",
                                  "altitude" : "",
                                  "name" : "", 
                               },
               "huts": [
                  {
                      "id": 4,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "", 
                   },
                   {
                      "id": 5,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "", 
                   },
                   ...
               ],
               "parking_lots": [
                  {
                      "id": 3,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "",
                   },
                   {
                      "id": 5,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "",
                   },
                   ...
               ],
               "points": [
                  {
                      "id": 1,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "", (if present)
                      "address" : "" (if present)
                   },
                   {
                      "id": 2,
                      "latitude" : "",
                      "longitude" : "",
                      "altitude" : "",
                      "name" : "", (if present)
                      "address" : "" (if present)
                   },
                   ...
               ],
        }    
```
- **Permissions allowed**:  All users and visitors.
- **Error responses**: `503 Service Unavailable` (generic error).


####  **POST /api/register**
- **Registers a new user**
- POST http://localhost:3001/api/register HTTP/1.1
- Request header has the line: Content-Type: application/json

- Request body is an object containing name, surname, role, password, email and phone number with the following structure
```
{
    "name": "Mattia",
    "surname": "Scamuzzi",
    "role": "local guide",
    "password": "delpiero10",
    "email": "mattiascamuzzi@gmail.com",
    "phone_number": "2456482685"
}
```
- **BEWARE: all field are mandatory!!**
- **Response status:**
    - 201 Created (Success)
    - 400 Bad Request (if a field is missing or a constraint is broken, e.g. user already registered, email format not correct, ...)
    - 500 Internal Server Error (if for some reason the database is unreachable)

    ####  **POST /api/hut**
- **Insert a new hut**
- POST http://localhost:3001/api/register HTTP/1.1
- Request header has the line: Content-Type: application/json

- Request body is an object containing name, latitude, longitude, altitude,type, region, province, city, number_of_beds, description with the following structure
```
{
    "name": "HutTest",
    "latitude": "45.08765",
    "longitude": "11.65422",
    "altitude": "120",
    "type": "Refugee",
    "region": "Piemonte",
    "province": "TO",
    "city": "Torino",
    "number_of_beds": "30",
    "description": "Huttest description"
}
```
- **BEWARE: all field are mandatory!!**
- **Permissions allowed**:  Only local guides.
- **Response status:**
    - 201 Created (Success)
    - `503 Service Unavailable` (generic error)

