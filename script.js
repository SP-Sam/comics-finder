const PUBLIC_KEY = 'bf62a4b5f9a73e73bfb14891e713d3ae';
const TIMESTEMP = '1632848705';
const HASH = 'acc1ca9a70877f0ce460ad250e0849fd';

const API_URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TIMESTEMP}&apikey=${PUBLIC_KEY}&hash=${HASH}`;

async function apiResults() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

// Função retirada do código da aula do Spotitrybe
// https://github.com/tryber/sd-015-b-live-lectures/blob/lecture/spotitrybe/script.js
function getElementOrClosest(target, className){
  if(target.classList.contains(className)){
    return target;
  }
  return target.closest(`.${className}`)
}

async function search() {
  const input = document.querySelector('input').value;
  const characterRequest = `${API_URL}&nameStartsWith=${input}`;
  
  const response = await fetch(characterRequest);
  const data = await response.json();
  
  const teste = data.data.results
  
  createCardsForReal(teste);
}

async function getDetails(name) {
  const characterRequest = `${API_URL}&name=${name}`;
  const response = await fetch(characterRequest);
  const data = await response.json();

  return data;
}

async function showDetails(event) {
  const target = getElementOrClosest(event.target, 'card');
  const old = document.querySelector('.selected');
  const p = target.lastElementChild;

  if (old) {
    old.classList.remove('selected');
    old.lastElementChild.innerHTML = '';
  }

  target.classList.add('selected');
  const details = await getDetails(target.firstElementChild.nextElementSibling.innerText);
  const results = details.data.results[0];

  p.innerHTML = `<p><em>${results.name}</em> - Aparece em ${results.comics.available} Quadrinhos:</p>
    <p><a href="${results.urls[results.urls.length - 1].url}" target="_blank">Link para os quadrinhos</a></p>
    <br>
    <a href="${results.urls[0].url}" target="_blank">Mais detalhes do personagem</a>`
}

function deleteCardsForReal() {
  const main = document.querySelector('main');
  const mainChildren = main.children;

  for (let i = mainChildren.length - 1; i >= 0; i -= 1) {
    mainChildren[i].remove();
  }
}

function createCardsForReal(characters) {
  const main = document.querySelector('main');
  
  characters.forEach(character => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
  
    h3.innerHTML = character.name;
    img.src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    div.className = 'card';
  
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.addEventListener('click', showDetails)
    main.appendChild(div);
  });
}

async function createCards() {
  const data = await apiResults();
  const characters = data.data.results;
  
  createCardsForReal(characters);
}


window.onload = () => {
  createCards();

  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    deleteCardsForReal();
    search();
  });

}
