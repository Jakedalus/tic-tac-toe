

var ticTacToe = function() {

    // Data
    var wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
    var pX = '';
    var pO = '';
    
    var players = {
        pX: {
            '012': 0, 
            '345': 0, 
            '678': 0, 
            '036': 0, 
            '147': 0, 
            '258': 0, 
            '048': 0, 
            '246': 0
        },
        pO: {
            '012': 0, 
            '345': 0, 
            '678': 0, 
            '036': 0, 
            '147': 0, 
            '258': 0, 
            '048': 0, 
            '246': 0
        }
    }
    
    var computerPlayer = false;
    var endgame = false;

    
    // 
    
    // Vue
    var vm = new Vue({
        el: '#app',
        data: {
            gameboard: [' ', ' ', ' ', 
                        ' ', ' ', ' ', 
                        ' ', ' ', ' '],
            currentPlayer: 'X',
            someoneHasWon: false,
            winner: '',
            goodbye: false,
            spacesLeft:'012345678'
            
        },
        methods: {
            mark: function(e) {
    //            console.log(e.target.id);
                var index = Number(e.target.id[1]);
    //            console.log(index);
                if(this.gameboard[index] === ' ' && !this.someoneHasWon && this.spacesLeft !== '') {
                    Vue.set(this.gameboard, index, this.currentPlayer);
                    this.spacesLeft = this.spacesLeft.replace(index, '');
                    console.log(this.spacesLeft);
                    if(this.currentPlayer === 'X') {
                        pX += index;
                        this.someoneHasWon = checkWin(pX);
                    } else {
                        pO += index;
                        this.someoneHasWon = checkWin(pO);
                    }
                    console.log(pX, pO);
                    console.log("someoneHasWon: ", this.someoneHasWon);
                    
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
                
    //            console.log(this.gameboard);
            },
            resetBoard() {
                pX = '';
                pO = '';
                computerPlayer = false;
                endgame = false;

                this.currentPlayer = 'X';
                
                vm.gameboard = [' ', ' ', ' ', 
                                ' ', ' ', ' ', 
                                ' ', ' ', ' '];
                vm.someoneHasWon = false;
                vm.winner = '';
                
                players = {
                    pX: {
                        '012': 0, 
                        '345': 0, 
                        '678': 0, 
                        '036': 0, 
                        '147': 0, 
                        '258': 0, 
                        '048': 0, 
                        '246': 0
                    },
                    pO: {
                        '012': 0, 
                        '345': 0, 
                        '678': 0, 
                        '036': 0, 
                        '147': 0, 
                        '258': 0, 
                        '048': 0, 
                        '246': 0
                    }
                }
                this.spacesLeft = '012345678';
            }
        }
    });
    
    function checkWin(player) {
        
        for(win of wins) {
            console.log("Testing winning combo: ", win);
            var hasWon = true;
            for(num of win) {
                console.log("Position: ", num);
                if(player.indexOf(num) === -1) {
                    hasWon = false;
                }
            }
            if(hasWon) {
                vm.winner = vm.currentPlayer;
                return true;
            }
        }
        
        return false;
    }
    
    function easyComp() {
        
        
        
    }
    
    ////**OUTER LOOP**////
//    while(!endgame) {
        // One Player or Two Player
        
        // If One Player:
            // Easy (random)
                // CP randomly picks unmarked square
            // Medium (knows winning configs)
                // CP tries to mark winning combo or block P1 if has 2 in a row
            // Hard (impossible to beat, knows strategy)
                // Go for corners
                // Block P1 if going to win

        // If Two Player:
            // Pick X or O
            
            // X goes first

        // Gameplay:
            ////**INNER LOOP**////
//            while(!vm.someoneHasWon) {
                
                // Switch players every turn
                // Check if player has a winning combo after move
                
//            }
            
            
            
//    }
    
}

ticTacToe();






