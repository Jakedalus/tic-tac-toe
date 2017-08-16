

var ticTacToe = function() {

    // Data
    var wins = ['012', '345', '678', '036', '147', '258', '048', '246'];
    var pX = '';
    var pO = '';
    
    var possibleWins = {
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
            spacesLeft:'012345678',
            computerPlayer: '',
            difficulty: '',
            XorO: ''
            
        },
        methods: {
            mark: function(e) {
    //            console.log(e.target.id);
                if(this.XorO === this.currentPlayer || this.computerPlayer === false) {
                    
                    var index = Number(e.target.id[1]);
                    console.log("Clicked: ", index);

                    if(this.gameboard[index] === ' ' && 
                      !this.someoneHasWon && 
                       this.spacesLeft !== '') {
                            markBoard(index);
                    }

                    if(this.computerPlayer && this.XorO !== this.currentPlayer && !this.someoneHasWon && 
                       this.spacesLeft !== '') {
                            makeComputerMove();
                    }
                
                }
                
                
                
    //            console.log(this.gameboard);
            },
            resetBoard: function() {
                pX = '';
                pO = '';
//                computerPlayer = false;

                this.currentPlayer = 'X';
                
                vm.gameboard = [' ', ' ', ' ', 
                                ' ', ' ', ' ', 
                                ' ', ' ', ' '];
                vm.someoneHasWon = false;
                vm.winner = '';
                
                possibleWins = {
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
                if(this.XorO == 'O') makeComputerMove()
            },
            chooseOneOrTwo: function(cp) {
                this.computerPlayer = cp; 
                if(this.computerPlayer === false) this.XorO = 'X';
//                console.log(this.computerPlayer);
            },
            chooseDifficulty: function(setting) {
                this.difficulty = setting;
//                console.log(this.difficulty);
            },
            chooseXorO: function(xo) {
                this.XorO = xo;
//                console.log(this.XorO);
                //IF PLAYER CHOOSES O, MAKE COMPUTER GO FIRST
                if(this.XorO === 'O') makeComputerMove();
                
            }
        }
    });
    
    function updatePossibleWins(index) {
        
        if(vm.currentPlayer === 'X') {
            for(win in possibleWins.pX) {
                if(win.indexOf(index) !== -1) {
                    possibleWins.pX[win]++;
                    if(possibleWins.pX[win] === 3) {
                        vm.winner = vm.currentPlayer;
                        return true;
                    }
                }
            }
        } else {
            for(win in possibleWins.pO) {
                if(win.indexOf(index) !== -1) {
                    possibleWins.pO[win]++;
                    if(possibleWins.pO[win] === 3) {
                        vm.winner = vm.currentPlayer;
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    function checkWin(player) {
        
        for(win of wins) {
//            console.log("Testing winning combo: ", win);
            var hasWon = true;
            for(num of win) {
//                console.log("Position: ", num);
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
    
    function makeComputerMove() {
        switch(vm.difficulty) {
            case 'easy':
                setTimeout(easyMove, 500);
                break;
            case 'medium':
                setTimeout(mediumMove, 500);
                break;
            case 'hard':
                setTimeout(hardMove, 500);
                break;
        }
    }
    
    function easyMove() {
        
        var spaces = vm.spacesLeft.split("").map(Number);
        var move = spaces[Math.round(Math.random() * (spaces.length - 1))];
//        console.log("Computer marks: ", move);
        markBoard(move);
        
    }
    
    function mediumMove() {
        
        var compWins = vm.XorO === 'X' ? possibleWins.pO : possibleWins.pX;
        var compMoves = vm.XorO === 'X' ? pO : pX;
        
        var humanWins = vm.XorO === 'X' ? possibleWins.pX : possibleWins.pO; 
        var humanMoves = vm.XorO === 'X' ? pX : pO;
        
//        console.log("Human Moves: ", humanMoves);
//        console.log("Computer Moves: ", compMoves);
//        console.log(compWins, humanWins);
        
        var spaces = vm.spacesLeft.split("").map(Number);
        var move = spaces[Math.round(Math.random() * (spaces.length - 1))];
        
        for(win in humanWins) {
//            console.log("Human has: ", win, ":", humanWins[win]);
            if(humanWins[win] == 2) {
//                console.log("HUMAN MIGHT WIN!!");
//                console.log(humanWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
//                        console.log("Move here!!! ", space);
                        move = space;
                    }
                }
            }
        }
        
        for(win in compWins) {
//            console.log("Computer has: ", win, ":", compWins[win]);
            if(compWins[win] === 2) {
//                console.log("COMPUTER COULD WIN!!");
//                console.log(compWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
//                        console.log("Move here!!! ", space);
                        move = space;
                    }
                }
            }
        }
        
        
        
//        console.log("Computer moves: ", move);
        
        
        
        markBoard(move);
        
    }
    
    function hardMove() {
        
        
        
    }
    
    function markBoard(index) {
        Vue.set(vm.gameboard, index, vm.currentPlayer);
        vm.spacesLeft = vm.spacesLeft.replace(index, '');
        console.log("//////////////");
        console.log("Spaces left: ", vm.spacesLeft);
        if(vm.currentPlayer === 'X') {
            pX += index;
            vm.someoneHasWon = updatePossibleWins(index);
        } else {
            pO += index;
            vm.someoneHasWon = updatePossibleWins(index);
        }
        console.log(vm.currentPlayer, " marks ", index);
//        console.log(pX, pO);
//        console.log("someoneHasWon: ", vm.someoneHasWon);
//        console.log("possibleWins: ", possibleWins);


        vm.currentPlayer = vm.currentPlayer === 'X' ? 'O' : 'X';
        
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






