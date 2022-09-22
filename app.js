function getApi() {
  const url = "https://valorant-api.com/v1/agents";
  fetch(url)
    .then((response) => response.json())
    .then(async (element) => {
      await character(element);
    });
}

function character(element) {
  const characterArray = element.data;
  characterArray.forEach(async (characterObject) => {
    await getCharacterData(characterObject);
  });
}

function getCharacterData(characterObject) {
  const {
    displayName: characterName,
    description: characterDesc,
    fullPortrait: characterImg,
    abilities: abilitiesArray,
  } = characterObject;

  let abilityArray = [];

  abilitiesArray.forEach((element) => {
    abilityArray.push(element.displayIcon);
  });
  createCharacter(characterName, characterDesc, characterImg, abilityArray);
};

function createCharacter(name, desc, img, abilityArray) {
  let hero = img ?  `<img class="card-image" src="${img}"  alt="">
  <h4 class="hero-name">${name}</h4>
  <p class="card-desc">${desc}</p>
  <div class="ability">
   <img class="ability-images" src="${abilityArray[0]}" alt="">
   <img class="ability-images" src="${abilityArray[1]}" alt="">
   <img class="ability-images" src="${abilityArray[2]}" alt="">
   <img class="ability-images" src="${abilityArray[3]}" alt="">
  </div>` : element.parentElement.style.display = 'none';;

  const generalCard = document.querySelector(".general-card");
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = hero;

  generalCard.appendChild(card);
}

getApi();

const searching = document.querySelector('.search-input');

searching.addEventListener('input' , _=> {
    const value = searching.value.toUpperCase();
    const characterName = document.querySelectorAll('.hero-name');
    characterName.forEach( element => {
      element.parentElement.style.display = 'block';
      if( !element.innerText.includes(value) ){
        element.parentElement.style.display = 'none';
      }
    } );
} );