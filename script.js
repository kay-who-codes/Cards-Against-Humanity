let cardsData = [];

// Load cards
async function loadCards() {
  try {
    const response = await fetch("cards.json");
    cardsData = await response.json();
    populatePackSelection(); // Populate dropdown with packs after loading cards
  } catch (error) {
    console.error("Error loading cards:", error);
  }
}

// Populate the deck selection dropdown with unique packs
function populatePackSelection() {
  const packSelect = document.getElementById("pack-selection");
  const uniquePacks = [...new Set(cardsData.map(card => card.Pack))];
  
  uniquePacks.forEach(pack => {
    const option = document.createElement("option");
    option.value = pack;
    option.textContent = pack;
    packSelect.appendChild(option);
  });

  // Select the Base Game by default
  const baseGameOption = Array.from(packSelect.options).find(option => option.value === "Base Game");
  if (baseGameOption) baseGameOption.selected = true;
}

// Get selected packs from the dropdown menu
function getSelectedPacks() {
  const packSelect = document.getElementById("pack-selection");
  return Array.from(packSelect.selectedOptions).map(option => option.value);
}

// Function to play flip sound
const flipSound = new Audio('flip.mp3');
function playFlipSound() {
  flipSound.play();
}

// Add event listeners to buttons
document.getElementById('draw-black-card').addEventListener('click', playFlipSound);
document.getElementById('draw-white-cards').addEventListener('click', playFlipSound);

// Draw a black card based on selected packs
function drawBlackCard() {
  const selectedPacks = getSelectedPacks();
  const promptCards = cardsData.filter(card => card.Type === "Prompt" && selectedPacks.includes(card.Pack));
  if (promptCards.length === 0) return;

  const randomPrompt = promptCards[Math.floor(Math.random() * promptCards.length)];
  displayCards([randomPrompt]);
}

// Draw seven white cards based on selected packs
function drawWhiteCards() {
  const selectedPacks = getSelectedPacks();
  const responseCards = cardsData.filter(card => card.Type === "Response" && selectedPacks.includes(card.Pack));
  if (responseCards.length < 7) return;

  const selectedResponses = [];
  for (let i = 0; i < 7; i++) {
    const randomResponse = responseCards[Math.floor(Math.random() * responseCards.length)];
    selectedResponses.push(randomResponse);
  }

  displayCards(selectedResponses);
}

// Function to change the length of "_____" lines
function reduceUnderscores(text) {
  // Reduce the length of underscores by 0% without any span replacements
  return text.replace(/_+/g, match => {
    const reducedLength = Math.floor(match.length * 1);
    return "_".repeat(reducedLength); // Keep the underscores intact
  });
}

// Display the selected cards
function displayCards(cards) {
  document.getElementById("main-menu").style.display = "none"; // Hide main menu
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    if (card.Type === "Prompt") {
      cardElement.classList.add("black-card");
      // Reduce underscores before rendering the card text (without replacing them with spans)
      cardElement.textContent = reduceUnderscores(card.Text); // Display text as is
    } else {
      cardElement.textContent = card.Text;
    }

    cardsContainer.appendChild(cardElement);
  });

  document.getElementById("card-display").style.display = "block";
}

// Return to the main menu
function returnToMenu() {
  document.getElementById("card-display").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
}

// Load cards and populate pack selection on page load
loadCards();

// Check if the user has a saved mode preference
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode');
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Toggle between Light Mode and Dark Mode
function toggleMode() {
  document.body.classList.toggle('dark-mode');
  
  // Save the mode preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
}
