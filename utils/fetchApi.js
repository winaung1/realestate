// import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'


import axios from 'axios';
export const fetchApi = async (url) => {

const options = {
  method: 'GET',
  url: url,
  params: {
    locationExternalIDs: '5002,6020',
    purpose: 'for-rent',
    hitsPerPage: '25',
  },
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_MY_API,
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
  }
};

try {
	const {data} = await axios.request(options);
    return data;
} catch (error) {
    console.error(error);
}
}