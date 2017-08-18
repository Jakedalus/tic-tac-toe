

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
            markColor: function(id) {
                return {
                    'x-mark': this.gameboard[id] === 'X',
                    'o-mark': this.gameboard[id] === 'O',
                }
            },
            resetBoard: function() {
                softReset();
                if(this.XorO == 'O') makeComputerMove()
            },
            hardReset: function() {
                softReset();
                this.computerPlayer = '';
                this.difficulty = '';
                this.XorO = '';
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
    
    function softReset() {
        vm.currentPlayer = 'X';

        vm.gameboard = [' ', ' ', ' ', 
                        ' ', ' ', ' ', 
                        ' ', ' ', ' '];
        vm.someoneHasWon = false;
        vm.winner = '';
        vm.spacesLeft = '012345678';

        pX = '';
        pO = '';
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
    }
    
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
        
        // Computer tries to get two-in-a-row
        for(win in compWins) {
//            console.log("Computer has: ", win, ":", compWins[win]);
            if(compWins[win] === 1 && humanWins[win] === 0) {
//                console.log("COMPUTER COULD WIN!!");
//                console.log(compWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
                        console.log("***TWO-IN-A-ROW***");
                        move = space;
                    }
                }
            }
        }
        
        // Computer blocks human if human is about to win
        for(win in humanWins) {
//            console.log("Human has: ", win, ":", humanWins[win]);
            if(humanWins[win] == 2) {
//                console.log("HUMAN MIGHT WIN!!");
//                console.log(humanWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
                        console.log("***BLOCK HUMAN***");
                        move = space;
                    }
                }
            }
        }
        
        // Computer wins if it can
        for(win in compWins) {
//            console.log("Computer has: ", win, ":", compWins[win]);
            if(compWins[win] === 2) {
//                console.log("COMPUTER COULD WIN!!");
//                console.log(compWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
                        console.log("***COMPUTER WINS***");
                        move = space;
                    }
                }
            }
        }
        
        
        
//        console.log("Computer moves: ", move);
        
        
        
        markBoard(move);
        
    }
    
    function hardMove() {
        
        var compWins = vm.XorO === 'X' ? possibleWins.pO : possibleWins.pX;
        var compMoves = vm.XorO === 'X' ? pO : pX;
        
        var humanWins = vm.XorO === 'X' ? possibleWins.pX : possibleWins.pO; 
        var humanMoves = vm.XorO === 'X' ? pX : pO;
        
        var spaces = vm.spacesLeft.split("").map(Number);
        
        // Random space if no better move
        var move = spaces[Math.round(Math.random() * (spaces.length - 1))];
        
        // Side
        if(vm.spacesLeft.indexOf(1) !== -1) {
            console.log("***SIDE!***");
            move = 1;
        } else if(vm.spacesLeft.indexOf(3) !== -1) {
            console.log("***SIDE!***");
            move = 3;
        } 
         else if(vm.spacesLeft.indexOf(5) !== -1) {
            console.log("***SIDE!***");
            move = 5;
        } 
         else if(vm.spacesLeft.indexOf(7) !== -1) {
            console.log("***SIDE!***");
            move = 7;
        } 
        
        // Corner
        if(vm.spacesLeft.indexOf(0) !== -1) {
            console.log("***CORNER!***");
            move = 0;
        } else if(vm.spacesLeft.indexOf(2) !== -1) {
            console.log("***CORNER!***");
            move = 2;
        } 
         else if(vm.spacesLeft.indexOf(6) !== -1) {
            console.log("***CORNER!***");
            move = 6;
        } 
         else if(vm.spacesLeft.indexOf(8) !== -1) {
            console.log("***CORNER!***");
            move = 8;
        } 
        
        // Opposite Corner
        if(humanMoves.indexOf(0) !== -1 && vm.spacesLeft.indexOf(8) !== -1) {
            console.log("***OPPOSITE CORNER!***");
            move = 8;
        } else if(humanMoves.indexOf(2) !== -1 && vm.spacesLeft.indexOf(6) !== -1) {
            console.log("***OPPOSITE CORNER!***");
            move = 6;
        } else if(humanMoves.indexOf(6) !== -1 && vm.spacesLeft.indexOf(2) !== -1) {
            console.log("***OPPOSITE CORNER!***");
            move = 2;
        } else if(humanMoves.indexOf(8) !== -1 && vm.spacesLeft.indexOf(0) !== -1) {
            console.log("***OPPOSITE CORNER!***");
            move = 0;
        }
        
        // Center
        if(vm.spacesLeft.indexOf(4) !== -1) {
            console.log("***CENTER!***");
            move = 4;
        }
        
        
        // Block human fork
        for(win in humanWins) {
            if(humanWins[win] === 1 && vm.spacesLeft.length < 7) {
                for(space of win) {
                    for(win2 in humanWins) {
                        if(win2.indexOf(space) !== -1 
                           && humanWins[win2] === 1 
                           && win !== win2 
                           && compWins[win2] === 0
                           && compWins[win] === 0) {
                            
                            
                            // Block fork by 2-in-a-row
                            for(c_win in compWins) {
                                if(compWins[c_win] === 1 && humanWins[c_win] === 0) {
                                    for(space of c_win) {
                    //                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                                        if(vm.spacesLeft.indexOf(space) !== -1) {
                    //                        console.log("Move here!!! ", space);
                                            console.log("***BLOCK FORK BY TWO-IN-A-ROW!***");
                                            move = space;
                                        }
                                    }
                                }
                            }
                            
                            // Block fork directly
                            if(vm.spacesLeft.indexOf(space) !== -1) {
                                console.log("***BLOCK FORK!***");
//                                console.log(compWins[win2], humanWins[win2]);
//                                console.log(win, win2);
                                move = space;
                            }
                        }
                    }
                }
            }   
        }
        
        // Fork
        for(win in compWins) {
            if(compWins[win] === 1) {
                for(space of win) {
                    for(win2 in compWins) {
                        if(win2.indexOf(space) !== -1 
                           && compWins[win2] === 1 
                           && win !== win2 
                           && humanWins[win2] === 0
                           && humanWins[win] === 0) {
                            if(vm.spacesLeft.indexOf(space) !== -1) {
                                console.log("***FORK!***");
//                                console.log(compWins[win2], humanWins[win2]);
//                                console.log(win, win2);
                                move = space;
                            }
                        }
                    }
                }
            }   
        }
        
        // If human can win, block
        for(win in humanWins) {
//            console.log("Human has: ", win, ":", humanWins[win]);
            if(humanWins[win] == 2) {
//                console.log("HUMAN MIGHT WIN!!");
//                console.log(humanWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
//                        console.log("Move here!!! ", space);
                        console.log("***BLOCK!***");
                        move = space;
                    }
                }
            }
        }
        
        
        // If computer can win, win
        for(win in compWins) {
//            console.log("Computer has: ", win, ":", compWins[win]);
            if(compWins[win] === 2) {
//                console.log("COMPUTER COULD WIN!!");
//                console.log(compWins[win], win);
                for(space of win) {
//                    console.log("can I move here...", space, vm.spacesLeft.indexOf(space));
                    if(vm.spacesLeft.indexOf(space) !== -1) {
//                        console.log("Move here!!! ", space);
                        console.log("***WIN!***");
                        move = space;
                    }
                }
            }
        }
        
        // If human responds to Computer opening Corner with a Corner (i.e., is Imperfect)
        var cornersUsed = '0268';
        for(space of vm.spacesLeft) {
            if(cornersUsed.indexOf(space) !== -1) {
                cornersUsed = cornersUsed.replace(space, '');
//                console.log("Corners used: ", cornersUsed);
            }
        }
        if(vm.XorO === 'O' && vm.spacesLeft.length === 7 && cornersUsed.length == 2) {
            console.log("***HUMAN ERROR COMPUTER PLAYS CORNER!***");
            if(vm.spacesLeft.indexOf(0) !== -1) {
                move = 0;
            } else if(vm.spacesLeft.indexOf(2) !== -1) {
                move = 2;
            } 
             else if(vm.spacesLeft.indexOf(6) !== -1) {
                move = 6;
            } 
             else if(vm.spacesLeft.indexOf(8) !== -1) {
                move = 8;
            } 
        }
        
        // If human responds to Computer opening Edge with opposite Corner (i.e., is Imperfect)
        if(vm.XorO === 'O' && vm.spacesLeft.length === 7) {
            if(pX.indexOf('1') !== -1) {
                if(pO.indexOf('6') !== -1 || pO.indexOf('8') !== -1) {
                    console.log("***HUMAN PLAYS WRONG CORNER!***");
                    move = pO.indexOf('6') !== -1  ? 0 : 2;
                }
            } else if(pX.indexOf('3') !== -1) {
                if(pO.indexOf('2') !== -1 || pO.indexOf('8') !== -1) {
                    console.log("***HUMAN PLAYS WRONG CORNER!***");
                    move = pO.indexOf('2') !== -1  ? 0 : 6;
                }
            } else if(pX.indexOf('5') !== -1) {
                if(pO.indexOf('0') !== -1 || pO.indexOf('6') !== -1) {
                    console.log("***HUMAN PLAYS WRONG CORNER!***");
                    move = pO.indexOf('0') !== -1  ? 2 : 8;
                }
            } else if(pX.indexOf('7') !== -1) {
                if(pO.indexOf('0') !== -1 || pO.indexOf('2') !== -1) {
                    console.log("***HUMAN PLAYS WRONG CORNER!***");
                    move = pO.indexOf('0') !== -1  ? 6 : 8;
                }
            }
        }
        
        
            
            
        
        // If computer is an X opening the game
        if(vm.XorO === 'O' && vm.spacesLeft.length === 9) {
            console.log("***COMPUTER OPENS!***");
            var move = spaces[Math.round(Math.random() * (spaces.length - 1))];
            
            ////////////
            //DEBUG: Computer draws with edge opening, even though it shouldn't. 
//            var edges = [1,3,5,7];
//            move = edges[Math.floor(Math.random()*edges.length)];
            ////////////
            
            ////////////
            //DEBUG: Computer should win with corner opening and imperfect human
//            var corners = [0,2,6,8];
//            move = corners[Math.floor(Math.random()*corners.length)];
            ////////////
        }
        
        
        // If computer is an O responding to the opening move
        if(vm.XorO === 'X' && vm.spacesLeft.length === 8) {
            console.log("***HUMAN OPENS!***");
            // If opening move is the Center, move to a Corner
            if(vm.spacesLeft.indexOf(4) === -1) {
                var corners = [0,2,6,8];
                move = corners[Math.floor(Math.random()*corners.length)];
            
            // If opening move is a Corner, move to Center
            } else if(vm.spacesLeft.indexOf(0) === -1 ||
                      vm.spacesLeft.indexOf(2) === -1 ||
                      vm.spacesLeft.indexOf(6) === -1 ||
                      vm.spacesLeft.indexOf(8) === -1) {
                move = 4;
                
            // If opening move is an Edge, move to Center, a Corner next to the X, or an Edge opposite the X
            } else {
                var choices = ['center', 'corner', 'edge'];
                var choice = choices[Math.floor(Math.random()*choices.length)];
                switch(choice) {
                    case 'center':
                        move = 4;
                        break;
                    case 'corner':
                        if(vm.spacesLeft.indexOf(1) === -1) {
                            var arr = [0,2]
                            move = arr[Math.floor(Math.random()*arr.length)];
                        } else if(vm.spacesLeft.indexOf(3) === -1) {
                            var arr = [0,6]
                            move = arr[Math.floor(Math.random()*arr.length)];
                        } else if(vm.spacesLeft.indexOf(5) === -1) {
                            var arr = [2,8]
                            move = arr[Math.floor(Math.random()*arr.length)];
                        } else if(vm.spacesLeft.indexOf(7) === -1) {
                            var arr = [6,8]
                            move = arr[Math.floor(Math.random()*arr.length)];
                        } 
                        break;
                    case 'edge':
                        if(vm.spacesLeft.indexOf(1) === -1) {
                            move = 7;
                        } else if(vm.spacesLeft.indexOf(3) === -1) {
                            move = 5;
                        } else if(vm.spacesLeft.indexOf(5) === -1) {
                            move = 3;
                        } else if(vm.spacesLeft.indexOf(7) === -1) {
                            move = 1;
                        } 
                        break;
                }
            }
        }
        
        markBoard(move);
        
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
    
}

ticTacToe();






