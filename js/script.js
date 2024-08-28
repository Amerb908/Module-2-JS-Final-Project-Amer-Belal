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
        const bestMove = this.getBestMove(3); // Set depth to 3 for AI search
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

        // Material value
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                totalEvaluation += this.getPieceValue(board[row][col]);
            }
        }

        // Piece development
        totalEvaluation += this.getPieceDevelopmentValue(board);

        // Control of the center
        totalEvaluation += this.getCenterControlValue(board);

        // Pawn structure
        totalEvaluation += this.getPawnStructureValue(board);

        // King safety
        totalEvaluation += this.getKingSafetyValue(board);

        return totalEvaluation;
    }

    getPieceValue(piece) {
        if (piece === null) {
            return 0;
        }
        const pieceValues = {
            'p': 100, // Pawn
            'r': 500, // Rook
            'n': 320, // Knight
            'b': 330, // Bishop
            'q': 900, // Queen
            'k': 10000 // King
        };
        const value = pieceValues[piece.type];
        return piece.color === 'w' ? value : -value;
    }

    getPieceDevelopmentValue(board) {
        let developmentValue = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === 'w') {
                    developmentValue += this.getPieceDevelopmentScore(piece, row, col);
                } else if (piece && piece.color === 'b') {
                    developmentValue -= this.getPieceDevelopmentScore(piece, row, col);
                }
            }
        }
        return developmentValue;
    }

    getPieceDevelopmentScore(piece, row, col) {
        switch (piece.type) {
            case 'p':
                return 1 - Math.abs(row - 4);
            case 'r':
            case 'n':
            case 'b':
                return 1 - Math.abs(col - 4);
            case 'q':
                return 1;
            default:
                return 0;
        }
    }

    getCenterControlValue(board) {
        let centerControlValue = 0;
        for (let row = 3; row <= 4; row++) {
            for (let col = 3; col <= 4; col++) {
                if (board[row] && board[row][col]) {
                    const piece = board[row][col];
                    if (piece && piece.color === 'w') {
                        centerControlValue++;
                    } else if (piece && piece.color === 'b') {
                        centerControlValue--;
                    }
                }
            }
        }
        return centerControlValue * 10;
    }

    getPawnStructureValue(board) {
        let pawnStructureValue = 0;
        for (let row = 0; row < 8; row++) {
            let pawnChain = 0;
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'p') {
                    pawnChain++;
                } else {
                    pawnStructureValue += this.getPawnChainValue(pawnChain);
                    pawnChain = 0;
                }
            }
            pawnStructureValue += this.getPawnChainValue(pawnChain);
        }
        return pawnStructureValue;
    }

    getPawnChainValue(pawnChain) {
        return pawnChain > 1 ? pawnChain * 10 : 0;
    }

    getKingSafetyValue(board) {
        let kingSafetyValue = 0;
        const kingPosition = this.findKingPosition(board, 'w');
        if (kingPosition) {
            kingSafetyValue += this.getKingSafetyScore(kingPosition, board);
        }
        const blackKingPosition = this.findKingPosition(board, 'b');
        if (blackKingPosition) {
            kingSafetyValue -= this.getKingSafetyScore(blackKingPosition, board);
        }
        return kingSafetyValue;
    }

    findKingPosition(board, color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'k' && piece.color === color) {
                    return { row, col };
                }
            }
        }
        return null;
    }

    getKingSafetyScore(kingPosition, board) {
        let kingSafetyScore = 0;
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                const newRow = kingPosition.row + row;
                const newCol = kingPosition.col + col;
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const piece = board[newRow][newCol];
                    if (piece && piece.color !== this.chess.turn()) {
                        kingSafetyScore--;
                    }
                }
            }
        }
        return kingSafetyScore;
    }
}

// Create a new ChessGame instance and start the game
const game = new ChessGame('chessboard', 'img/chesspieces/wikipedia/{piece}.png');
game.updateBoard(); // Initial update to reflect the starting position
