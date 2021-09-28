const PUBLIC_KEY = 'bf62a4b5f9a73e73bfb14891e713d3ae';
const TIMESTEMP = '1632848705';
const HASH = 'acc1ca9a70877f0ce460ad250e0849fd';

const API_URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TIMESTEMP}&apikey=${PUBLIC_KEY}&hash=${HASH}`;

async function apiResults() {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
}

window.onload = () => {
  apiResults();
}
