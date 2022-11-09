# HikeTracker_Group05

## HIKE

### POST


#### **/api/hike**
- **Creates a new hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing title, length_kms, expected_mins, ascendent_meters, difficulty, region, 
                city, gpx,  end_point, start_point, and an array of reference points (empty if no reference points)

```
        {
            "title": "ROCCIAMELONE",
            "length_kms": 9,
            "expected_mins": 420,
            "ascendent_meters": 3538,
            "difficulty": "Professional Hiker",
            "region": "TO",
            "city": "Mompantero",
            "gpx": "gpx content"
            "end_point" : {
                            "latitude" : ""
                            "longitude" : ""
                            "altitude" : ""
                            "name" : "" (if present)
                            "address" : "" (if present)
                        }
            "start_point" : {
                            "latitude" : ""
                            "longitude" : ""
                            "altitude" : ""
                            "name" : "" (if present)
                            "address" : "" (if present)
            }
            "reference_points" : [{
                            "latitude" : ""
                            "longitude" : ""
                            "altitude" : ""
                            "name" : "" (if present)
                            "address" : "" (if present)
                        }, 
                        {
                            "latitude" : ""
                            "longitude" : ""
                            "altitude" : ""
                            "name" : "" (if present)
                            "address" : "" (if present)
                        }, ... ] if no reference points the array will be empty []
        }       
```

- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Manager, Supplier
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).

