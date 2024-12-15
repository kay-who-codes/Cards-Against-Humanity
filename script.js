<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⬛ Cards Against Humanity ⬜</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Main Menu -->
  <div class="main-menu" id="main-menu">
    <h1>Cards Against Humanity</h1>

    <!-- Draw Buttons -->
    <button class="draw-black-card" id="draw-black-card" onclick="drawBlackCard()">Draw Black Card</button>
    <button class="draw-white-cards" id="draw-white-cards" onclick="drawWhiteCards()">Draw White Cards</button>

    <!-- Deck Selection Dropdown -->
    <br>
    <label class="select-decks-text"for="pack-selection">Select Decks:</label>
    <br>
    <select class="pack-selection" id="pack-selection" multiple>
    </select>
  </div>

  <!-- Card Display -->
  <div id="card-display" style="display: none;">
    <h2>Drawn Cards</h2>
    <div id="cards-container"></div>
    <button onclick="returnToMenu()">Back to Menu</button>
  </div>



<footer class="credit-message">
  <!-- Light Mode / Dark Mode Toggle -->
<div id="mode-toggle">
  <button class="mode-toggle" id="toggle-button" onclick="toggleMode()">☀️/🌙</button>
</div>
  Inspired by <a href="https://www.cardsagainsthumanity.com/" target="_blank">Cards Against Humanity</a>,
  Created by <a href="https://linktr.ee/kaywhocreates" target="_blank">Kay 🧡</a>
</footer>

  <script src="script.js"></script>
</body>
</html>
