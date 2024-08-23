class ChessGame {
  constructor(boardElementId, pieceTheme) {
      this.boardElementId = boardElementId;
      this.pieceTheme = pieceTheme;
      this.chess = new Chess();
      this.board = this.initBoard();
      this.initUndoButton();
  }

  // Initialize the chessboard
  initBoard() {
      return Chessboard(this.boardElementId, {
          position: 'start',
          pieceTheme: this.pieceTheme,
          draggable: true,
          onDrop: this.onDrop.bind(this) // Bind the method to maintain the correct context
      });
  }

  // Handle piece drop event
  onDrop(source, target) {
      const move = this.chess.move({
          from: source,
          to: target,
          promotion: 'q' // Automatically promote pawns to queens
      });

      // If the move is illegal, snap the piece back to its original position
      if (move === null) return 'snapback';

      // Update the board to match the engine's state
      this.updateBoard();
  }

  // Update the board position to reflect the current game state
  updateBoard() {
      this.board.position(this.chess.fen());
  }

  // Undo the last move
  undoMove() {
      this.chess.undo(); // Undo the last move in the chess engine
      this.updateBoard(); // Update the board to reflect the undone move
  }

  // Initialize the Undo button event listener
  initUndoButton() {
      const button = document.getElementById('undoButton');
      if (button) {
          button.onclick = () => this.undoMove();
      }
  }
}

// Create a new ChessGame instance and start the game
const game = new ChessGame('chessboard', 'img/chesspieces/wikipedia/{piece}.png');
game.updateBoard(); // Initial update to reflect the starting position
