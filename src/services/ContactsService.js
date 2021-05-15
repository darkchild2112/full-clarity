import axios from 'axios';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbmFiYm90dEBiZW4tYWJib3R0LmNvLnVrIiwiZXhwIjoxNjIxMzI5MTE3LCJpYXQiOjE2MjA3MjQzMTd9.3_voEKK518x9v9VJfRtbZwjs_TbsCdlSY2SNK7IlVEc';

const baseUrl = 'https://europe-west2-coding-challenge-62755.cloudfunctions.net';

export async function getContacts() {
  
  const url = `${baseUrl}/getContacts`;

  const response = await axios(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Authorization': authToken,
      'Content-Type': 'application/json'
    }
  });
  
  const mappedContacts = response.data.contacts.map(c => ({
    id: c.id,
    firstName: upperCaseFirstLetter(c.first_name),
    lastName: upperCaseFirstLetter(c.last_name),
    searchableName: `${c.first_name.toLowerCase()} ${c.last_name.toLowerCase()}`,
    avatar: c.avatar,
    fullName: `${upperCaseFirstLetter(c.first_name)} ${upperCaseFirstLetter(c.last_name)}`,
  })); 

  return mappedContacts;
}

// TODO: extract to somewhere more reusuable
const upperCaseFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export async function createContactGroup(group) {
  
  const url = `${baseUrl}/createGroup`;

  await axios(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },
    data: group
  });
}

/*
{
  "contacts": [
    {
      "id": 1,
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    },
    {
      "id": 2,
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    {
      "id": 3,
      "first_name": "Emma",
      "last_name": "Wong",
      "avatar": "https://reqres.in/img/faces/3-image.jpg"
    },
    {
      "id": 4,
      "first_name": "Eve",
      "last_name": "Holt",
      "avatar": "https://reqres.in/img/faces/4-image.jpg"
    },
    {
      "id": 5,
      "first_name": "Charles",
      "last_name": "Morris",
      "avatar": "https://reqres.in/img/faces/5-image.jpg"
    },
    {
      "id": 6,
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": "https://reqres.in/img/faces/6-image.jpg"
    },
    {
      "id": 7,
      "first_name": "Michael",
      "last_name": "Lawson",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    },
    {
      "id": 8,
      "first_name": "Lindsay",
      "last_name": "Ferguson",
      "avatar": "https://reqres.in/img/faces/8-image.jpg"
    },
    {
      "id": 9,
      "first_name": "Tobias",
      "last_name": "Funke",
      "avatar": "https://reqres.in/img/faces/9-image.jpg"
    },
    {
      "id": 10,
      "first_name": "Byron",
      "last_name": "Fields",
      "avatar": "https://reqres.in/img/faces/10-image.jpg"
    },
    {
      "id": 11,
      "first_name": "George",
      "last_name": "Edwards",
      "avatar": "https://reqres.in/img/faces/11-image.jpg"
    },
    {
      "id": 12,
      "first_name": "Rachel",
      "last_name": "Howell",
      "avatar": "https://reqres.in/img/faces/12-image.jpg"
    }
  ]
}
*/