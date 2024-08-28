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

        // Trigger AI move after player's move
        setTimeout(() => this.makeAIMove(), 250);
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

    // AI logic: Get the best move using Minimax algorithm with Alpha-Beta pruning
    makeAIMove() {
        const bestMove = this.getBestMove(2); // Set depth to 3 for AI search
        if (bestMove) {
            this.chess.move(bestMove);
            this.updateBoard();
        } else {
            console.error('Best move is null');
        }
    }

    getBestMove(depth) {
        let bestMove = null;
        let bestValue = -Infinity;
        const possibleMoves = this.chess.moves();

        for (const move of possibleMoves) {
            this.chess.move(move);
            const boardValue = this.minimax(depth - 1, -Infinity, Infinity, false);
            this.chess.undo();

            if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMove = move;
            }
        }
        return bestMove;
    }

    // Minimax with Alpha-Beta pruning
    minimax(depth, alpha, beta, isMaximizingPlayer) {
        if (depth === 0) {
            return this.evaluateBoard();
        }

        const possibleMoves = this.chess.moves();

        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            for (const move of possibleMoves) {
                this.chess.move(move);
                const evaluation = this.minimax(depth - 1, alpha, beta, false);
                this.chess.undo();
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of possibleMoves) {
                this.chess.move(move);
                const evaluation = this.minimax(depth - 1, alpha, beta, true);
                this.chess.undo();
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    }

    // Evaluation function for board state
    evaluateBoard() {
        const board = this.chess.board();
        let totalEvaluation = 0;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                totalEvaluation += this.getPieceValue(board[row][col]);
            }
        }
        return totalEvaluation;
    }

    getPieceValue(piece) {
        if (piece === null) {
            return 0;
        }
        const pieceValues = {
            'p': 100, // Pawn
            'r': 280, // Rook
            'n': 320, // Knight
            'b': 479, // Bishop
            'q': 929, // Queen
            'k': 600000 // King
        };
        const value = pieceValues[piece.type];
        return piece.color === 'w' ? value : -value;
    }
}

// Create a new ChessGame instance and start the game
const game = new ChessGame('chessboard', 'img/chesspieces/wikipedia/{piece}.png');
game.updateBoard(); // Initial update to reflect the starting position
