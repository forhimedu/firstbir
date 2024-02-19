const picturesContainer = document.querySelector(".pictures");
const wordsContainer = document.querySelector(".words");
const messageElement = document.getElementById("message");

// Define your image and word pairs here
const pairs = 
   [ ["data/Cu.jpg","Мыс" ],
    ["data/S.jpg", "Күкірт" ], 
    ["data/AgBr.jpg", "Күміс бромиді" ],
    ["data/AgCl.jpg", "Күміс хлориді" ],
    ["data/AgI.jpg", "Күміс йодиді" ],
    ["data/Br2.jpg", "Бром" ] ,
    ["data/Cr2O3.jpg", "Хром(III) оксиді" ],
    [ "data/CrO3.jpg", "Хром(VI) оксиді"],
    [ "data/CuOH2.jpg", "Мыс(II) гидроксиді"],
    [ "data/CuO.jpg", "Мыс(II) оксиді"],
    ["data/CuSO45H2O.jpg", "Мыс купоросы" ],
    [ "data/I2.jpg", "Йод"],
    [ "data/KmNO4.jpg", "Калий перманганаты"],
    [ "data/MnO2.jpg", "Марганец(IV) оксиді"],
    [ "data/NO2.jpg", "Азот диоксиді"],
    [ "data/Pred.jpg", "Қызыл фосфор"],
    ["data/Pwhite.jpg", "Ақ фосфор"],
    ["data/Ag3PO4.jpg", "Күміс фосфаты"],


    // ... more pairs
];

// Shuffle the pairs
pairs.sort(() => Math.random() - 0.5);

// Create image cards
pairs.forEach((pair) => {
  const card = document.createElement("div");
  card.classList.add("card", "picture-card");
  card.style.backgroundImage = `url(${pair[0]})`;
  picturesContainer.appendChild(card);
});
pairs.sort(() => Math.random() - 0.5);
// Create word cards
pairs.forEach((pair) => {
  const card = document.createElement("div");
  card.classList.add("card", "word-card");
  card.textContent = pair[1];
  wordsContainer.appendChild(card);
});

let selectedCard = null;
let score = 0;
let selected = 0;

function handleClick(event) {
  const card = event.target;
  if (selectedCard === null && card.classList.contains('picture-card'))  {
    selectedCard = card;
    return;
  } else if (selectedCard === null && card.classList.contains('word-card')) {
    return;
  }
  else if (card.classList.contains("word-card") && selectedCard) {
    const backgroundUrl = getBackgroundImageUrl(selectedCard);
    if (ifMatch(backgroundUrl, card.textContent, pairs)) {
      selectedCard.classList.add("matched");
      card.classList.add("matched");
      selectedCard = null;
      score++;
      messageElement.textContent = `Ұпай: ${score}`;
    } else {
      score--;
      selectedCard = null;
      messageElement.textContent = `Ұпай: ${score}`;
    }
    return;
  } else if (card.classList.contains("picture-card") && selectedCard) {
    selectedCard = card;
    return;
  }


}

function handleSelect(event) {
    const card = event.target;
    card.classList.add("selected_card");
    setTimeout(() => {
      card.classList.remove("selected_card");
    }, 1000); // 3000 milliseconds = 3 seconds
  }


function ifMatch(location, name, data) {
  // Find the entry matching the location and name
  return data.find(entry => entry[0] === location && entry[1] === name) !== undefined;
}


function getBackgroundImageUrl(element) {
  // Get the computed style of the element
  const computedStyle = window.getComputedStyle(element);
  
  // Extract the background image URL from the computed style
  const backgroundImage = computedStyle.backgroundImage;

  // Extract the URL from the background image string
  const imageUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');

  // Extract the substring from the second last backslash to the end
  const startIndex = imageUrl.lastIndexOf('/', imageUrl.lastIndexOf('/') - 1) + 1;
  const trimmedUrl = imageUrl.substring(startIndex);

  return trimmedUrl;
}


const pictureCards = document.querySelectorAll(".picture-card");
const wordCards = document.querySelectorAll(".word-card");

pictureCards.forEach((card) => card.addEventListener("click", handleClick));
pictureCards.forEach((card) => card.addEventListener("click", handleSelect));

wordCards.forEach((card) => card.addEventListener("click", handleClick));