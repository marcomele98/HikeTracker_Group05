/**
 * All the API calls
 */


 const APIURL = new URL('http://localhost:3001/api/');  // Do not forget '/' at the end

 
 async function logIn(credentials) {
   let response = await fetch(new URL('sessions', APIURL), {
     method: 'POST',
     credentials: 'include',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(credentials),
   });
   if (response.ok) {
     const user = await response.json();
     return user;
   } else {
     const errDetail = await response.json();
     throw errDetail.message;
   }
 }
 
 async function logOut() {
   await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
 }
 
 async function getUserInfo() {
   const response = await fetch(new URL('sessions/current', APIURL), {credentials: 'include'});
   const userInfo = await response.json();
   if (response.ok) {
     return userInfo;
   } else {
     throw userInfo;  // an object with the error coming from the server
   }
 }


 async function getHikes() {
  const response = await fetch(new URL('hikes', APIURL));
  const hikes = await response.json();
  if (response) {
    return hikes;
  } else {
    throw hikes;  // an object with the error coming from the server
  }
}

async function getHikeById(id) {
  const response = await fetch(new URL('hike/' + id, APIURL));
  const hike = await response.json();
  if (response.ok) {
    return hike;
  } else {
    throw hike;  // an object with the error coming from the server
  }
}

async function newHikeDescription(hike) {
  let response = await fetch(new URL('hike', APIURL), {

    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hike),
  });
  if (response.ok) {
    return null;
  } else {
    const errDetail = await response.json();
    throw errDetail.error;
  }
}


async function addUser(newUser) {
  // call: POST /api/register
    let response = await fetch(new URL('register', APIURL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) 
    {
      return null;
    } 
    else 
    {
      const errDetail = await response.json();
      throw errDetail.error;
    }
}
 
 const API = { logIn, logOut, getUserInfo, getHikes, getHikeById, newHikeDescription , addUser  };

 export default API;