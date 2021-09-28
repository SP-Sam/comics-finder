const PUBLIC_KEY = 'bf62a4b5f9a73e73bfb14891e713d3ae';
const TIMESTEMP = '1632848705';
const HASH = 'acc1ca9a70877f0ce460ad250e0849fd';

const API_URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TIMESTEMP}&apikey=${PUBLIC_KEY}&hash=${HASH}`;

async function apiResults() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function getElementOrClosest(target, className){
  if(target.classList.contains(className)){
    return target;
  }
  return target.closest(`.${className}`)
}

function showDetails(event) {
  const target = getElementOrClosest(event.target, 'card');
  const old = document.querySelector('.selected');

  if (old) {
    old.classList.remove('selected');
  }

  target.classList.add('selected');
}

async function createCards() {
  const data = await apiResults();
  const characters = data.data.results;

  const main = document.querySelector('main');
  
  characters.forEach(character => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');

    h3.innerHTML = character.name;
    img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    div.className = 'card';

    div.appendChild(img);
    div.appendChild(h3);
    div.addEventListener('click', showDetails)
    main.appendChild(div);
  });
  console.log(characters);
}

window.onload = () => {
  createCards();
}
