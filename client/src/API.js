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

 async function newHikeDescription(hike) {
  console.log(hike);
  let response = await fetch(new URL('hike', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({hike: hike}),
  });
  if (response.ok) {
    const hikeAdded = await response.json();
    return hikeAdded;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}
 
 const API = { logIn, logOut, getUserInfo, newHikeDescription };
 export default API;