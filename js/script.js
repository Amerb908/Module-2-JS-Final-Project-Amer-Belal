

var board = Chessboard('chessboard', {
    position: 'start',
    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png', // Adjust the path if needed
    movePieces: true
});

// Initialize the chessboard
var board = Chessboard('chessboard', {
    position: 'start',
    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png', // Adjust the path if needed
    movePieces: true
  });
  
  // Initialize the chess engine
  var chess = new Chess();
  
  // Update the board position based on the chess engine's state
  board.position(chess.fen());
  
  // Make moves on the chessboard and update the chess engine's state
  board.on('move', function(move) {
    chess.move(move.from + move.to);
    board.position(chess.fen());
  });