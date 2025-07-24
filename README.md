# Tic-Tac-Toe

A modern, interactive web-based Tic-Tac-Toe game with single-player (AI) and two-player modes, sound effects, score tracking, and difficulty levels.

## Features
- **Single Player Mode:** Play against an AI with three difficulty levels: Easy, Medium, and Hard (Minimax algorithm).
- **Two Player Mode:** Play locally with a friend on the same device.
- **Player Name Input:** Enter your name for a personalized experience.
- **Score Tracking:** Persistent scores for X and O across games (stored in browser localStorage).
- **Sound Effects:** Background music, move sounds, and game over effects (with mute/unmute option).
- **Celebration Animation:** Fun GIF and popups for wins and draws.
- **Responsive Design:** Works on desktop and mobile browsers.

## How to Play
1. **Open `index.html` in your browser.**
2. **Enter your name.**
3. **Select a game mode:**
   - *Single Player:* Choose difficulty (Easy, Medium, Hard) and play against the computer.
   - *Two Player:* Play with a friend, taking turns as X and O.
4. **Gameplay:**
   - Click on a square to make your move.
   - The game announces whose turn it is.
   - Win by getting three in a row (horizontally, vertically, or diagonally).
   - The game ends with a popup for a win or a draw.
   - Use the **Reset** button to start a new round, or **Exit** to return to the main menu.
   - Mute or unmute music with the button at the top.

## Files
- `index.html` – Login and mode selection screen.
- `game.html` – Main game interface.
- `script.js` – Game logic, UI handling, and sound.
- `ai.js` – AI logic for single-player mode (Easy: random, Medium: block/win, Hard: Minimax).
- `style.css` – Styling for all screens.
- `excited.gif` – Celebration animation.
- `music.mp3`, `ting.mp3`, `gameover.mp3` – Sound effects.