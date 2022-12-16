/**
 * All the API calls
 */

import { signInWithEmailAndPassword } from '@firebase/auth';
import { toast } from 'react-toastify';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from './firebase';

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
    const userCredentials = await signInWithEmailAndPassword(auth, credentials.username, credentials.password);
    const verified = userCredentials.user.emailVerified;
    if (verified) {
      return user;
    } else {
      await this.logOut()
      const errDetail = await sendEmailVerification(auth.currentUser);
      throw errDetail.message;
    }
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
}

async function getUserInfo() {
  const response = await fetch(new URL('sessions/current', APIURL), { credentials: 'include' });
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
  const response = await fetch(new URL('hike/' + id, APIURL), {
    credentials: 'include',
  });
  const hike = await response.json();
  if (response.ok) {
    return hike;
  } else {
    throw response.status;  // an object with the error coming from the server
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
    throw errDetail
  }
}

async function newPark(park) {
  let response = await fetch(new URL('parkingLot', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(park),
  });
  if (response.ok) {
    return null;
  } else {
    const errDetail = await response.json();
    throw errDetail
  }
}

async function newHut(hut) {
  let response = await fetch(new URL('hut', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hut),
  });
  if (response.ok) {
    return null;
  } else {
    const errDetail = await response.json();
    throw errDetail
  }
}

async function getParks() {
  const response = await fetch(new URL('parkingLots', APIURL));
  const parks = await response.json();
  if (response) {
    return parks;
  } else {
    throw parks;  // an object with the error coming from the server
  }
}

async function getParkById(id) {
  const response = await fetch(new URL('parkingLot/' + id, APIURL));
  const park = await response.json();
  if (response.ok) {
    return park;
  } else {
    throw response.status;  // an object with the error coming from the server
  }
}


async function getHuts() {
  const response = await fetch(new URL('huts', APIURL));
  const parks = await response.json();
  if (response) {
    return parks;
  } else {
    throw parks;  // an object with the error coming from the server
  }
}

async function getHutById(id) {
  const response = await fetch(new URL('hut/' + id, APIURL));
  const park = await response.json();
  if (response.ok) {
    return park;
  } else {
    throw response.status;  // an object with the error coming from the server
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
  if (response.ok) {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(() => {
        sendEmailVerification(auth.currentUser);
        toast.warning("We sent you an email to verify your address. Please verify your email", { position: "top-center" }, { toastId: 2 });
      })
    return null;
  }
  else {
    const errDetail = await response.json();
    throw errDetail.error;
  }
}

async function updateHikeEndPoint(editHike, id) {
  // call: PUT /api/hikeEnd/:hikeId
  let response = await fetch(new URL('hikeEnd/' + id, APIURL), {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editHike),
  });
  if (response.ok) {
    return null;
  }
  else {
    throw response.status;
  }
}

async function updateHikeStartPoint(editHike, id) {
  // call: PUT /api/hikeStart/:hikeId

  let response = await fetch(new URL('hikeStart/' + id, APIURL), {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editHike),
  });
  if (response.ok) {
    return null;
  }
  else {
    throw response.status;
  }
}


async function resetHikeEndPoint(editHike, id) {
  // call: PUT /api/hikeEndReset/:hikeId
  let response = await fetch(new URL('hikeEndReset/' + id, APIURL), {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editHike),
  });
  if (response.ok) {
    return null;
  }
  else {
    throw response.status;
  }
}

async function resetHikeStartPoint(editHike, id) {
  // call: PUT /api/hikeStartReset/:hikeId
  let response = await fetch(new URL('hikeStartReset/' + id, APIURL), {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editHike),
  });
  if (response.ok) {
    return null;
  }
  else {
    throw response.status;
  }
}

async function addNewReferencePoint(point, id) {
  let response = await fetch(new URL('newRefPoint/' + id, APIURL), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(point),
  });
  if(response.ok) {
    return null;
  } else {
    throw response.status;
  }
}



async function hutHikeLink(hut, id) {
  let response = await fetch(new URL('hikeHutLink/' + id, APIURL), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hut),
  });
  if(response.ok) {
    return null;
  } else {
    throw response.status;
  }
}


async function getPreferencesByUserId(id) {
  const response = await fetch(new URL('preferences/' + id, APIURL));
  const preferences = await response.json();
  if (response.ok) {
    return preferences;
  } else {
    throw response.status;  // an object with the error coming from the server
  }
}

async function setPreferences(preferences) {
  let response = await fetch(new URL('preferences/', APIURL), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferences),
  });
  if(response.ok) {
    return null;
  } else {
    console.log(response)
    throw response.status;
  }
}

const API = {
  logIn, logOut, getUserInfo, getHikes, getHikeById, newHikeDescription, addUser, getParks,
  getParkById, newPark, getHuts, getHutById, newHut, updateHikeEndPoint, updateHikeStartPoint,
  resetHikeEndPoint, resetHikeStartPoint, addNewReferencePoint, getPreferencesByUserId, hutHikeLink,
  setPreferences
};



export default API;