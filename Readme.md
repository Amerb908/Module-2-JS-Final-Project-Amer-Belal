# Chess Game with AI

## Project Overview

This project is a JavaScript-based chess game featuring an interactive chessboard and a basic AI opponent. The game is designed to allow players to move pieces by dragging them on the board, with automatic promotion of pawns to queens. After the player makes a move, the AI opponent responds with its move. The AI uses a combination of the Minimax algorithm and Alpha-Beta pruning to evaluate and make decisions.

This project is still under development, and further AI enhancements and improvements will be implemented in the future.

## Features

- **Interactive Chessboard**: Players can move pieces by dragging them on the board, with the position automatically updated.
- **Move Validation**: Illegal moves are handled, with pieces snapping back to their original positions if the move is invalid.
- **Undo Functionality**: The last move can be undone using a dedicated button.
- **Basic AI Opponent**: The AI makes moves based on the Minimax algorithm with Alpha-Beta pruning.
  
## Algorithms and Techniques

- **Minimax Algorithm**: A decision-making algorithm used to minimize the possible loss for a worst-case scenario. In this chess game, it's used to evaluate possible moves and determine the best one for the AI.
  
- **Alpha-Beta Pruning**: An optimization technique for the Minimax algorithm. It reduces the number of nodes evaluated in the search tree by pruning branches that cannot possibly influence the final decision.
  
- **Board Evaluation**: The AI evaluates the board state by considering factors such as material value, piece development, control of the center, pawn structure, and king safety.

## Tools and Libraries

- **JavaScript**: The primary language used to develop the chess game logic and AI.
- **Chess.js**: A JavaScript library used to handle chess game rules and move validation.
- **Chessboard.js**: A JavaScript library for rendering the chessboard and handling user interaction.
- **HTML/CSS**: Used to structure and style the game interface.

## Future Enhancements

This project will continue to receive improvements, especially in the AI component. The AI will be enhanced with more sophisticated techniques and strategies, making it a more challenging opponent. The evaluation function will also be fine-tuned for better decision-making.

## How to Run the Project

- Click on the link [here](https://amerb908.github.io/Module-2-JS-Final-Project-Amer-Belal/) to start playing the game in your browser.


