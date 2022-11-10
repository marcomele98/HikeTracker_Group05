# HikeTracker_Group05

API backend story 3

- POST `/api/register`
- Registers a new user
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
- BEWARE: all field are mandatory!!
- Response status:
    - 201 Created (Success)
    - 400 Bad Request (if a field is missing or a constraint is broken, e.g. user already registered, email format not correct, ...)
    - 500 Internal Server Error (if for some reason the database is unreachable)