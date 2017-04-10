var gameState = {
  playerOneWins: 0,
  playerTwoWins: 0,
  gameOver: "",
  PLAYER_ONE: "X",
  PLAYER_TWO: "O",
  currentPlayer: "X",
  //state of the game can be "", "X" or "O"
  board: ["","","","","","","","",""],
  // Array of all win states. All we do is win
  resetBoard: function(){
    this.board = ["","","","","","","","",""]
    if (this.gameOver == ""){
      this.currentPlayer = this.PLAYER_ONE
    }
    this.gameOver = ""
    this.render()
  },
  winningStates: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  checkWin: function(player) {
    var foundWinner = false
    this.winningStates.forEach(function(winners, i) {
    //winners => [6, 7, 8]
    //i => 2
      if(gameState.board[winners[0]] == player && // winners[0] => 6
         gameState.board[winners[1]] == player && // winners[1] => 7
         gameState.board[winners[2]] == player    // winners[2] => 8
        ) { foundWinner = true }
    })
    return foundWinner
  },
  //makePlay alternates the player
  //updates the board state
  //renders the board
  makePlay: function(cellId) {
    if (this.board[cellId] != ""){
      alert("Nice try, pick an empty square!")
      return false
    }
    if (this.gameOver != "" ){
      alert("Too late, suckaaa! Click new game")
      return false
    }
    this.board[cellId] = this.currentPlayer
    if (this.currentPlayer == this.PLAYER_ONE) {
      this.currentPlayer = this.PLAYER_TWO
    }
    else {
      this.currentPlayer = this.PLAYER_ONE
    }
    this.render()
  },
  checkCatsGame: function(){
    if (!this.board.includes("") && this.gameOver == ""){
      return true
    }
    else {
      return false
    }
  },
  render: function() {
    this.board.forEach(function (element, i){
      document.getElementById("cell"+i).innerHTML = element
      }
    )
    // does X win?
    if(this.checkWin(this.PLAYER_ONE)){
      document.getElementById("winner").innerHTML = "Congratulations Player One"
      this.gameOver = this.PLAYER_ONE
      this.playerOneWins++
      document.getElementById("p1Score").innerHTML = "Player One score: " + this.playerOneWins
    }
    // does O win?
    if(this.checkWin(this.PLAYER_TWO)){
      document.getElementById("winner").innerHTML = "Congratulations Player Two"
      this.gameOver = this.PLAYER_TWO
      this.playerTwoWins++
      document.getElementById("p2Score").innerHTML = "Player Two score: " + this.playerTwoWins
    }
    if (this.checkCatsGame()){
      document.getElementById("winner").innerHTML = "Cats Game"
    }
  }
}
