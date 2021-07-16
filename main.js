'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


//This function is console logging the stacks
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


const movePiece = (startStack, endStack) => {
  //This grabs the last number in the starting stack array
  let start = stacks[startStack].pop()
  let end = stacks[endStack]
  //This pushes it to the end of the ending stack array
  return end.push(start)
}


const isLegal = (s,e) => {
let start = stacks[s]
let end = stacks[e]
//This says that you can't move from an empty stack
if (start.length == 0){
  return false
  }
//This says that if the value of startstack is less than the endstack, it can move
if((start[start.length-1] < end[end.length-1]) || (end.length === 0)) {
  return true
  }
//This will catch any other illegal moves
else{
  return false
  }
}




const checkForWin = () => {
  //beginStack is how the stack should look, in either spot b or c if there is a win.
  let beginStack = [4,3,2,1]
  //I used .every() because it loops over the array and returns a boolean value based on the logic, so checkB and checkC will return true if it matches beginStack
  let checkB = beginStack.length == stacks.b.length && beginStack.every(function(element, index) {
    return element === stacks.b[index]; 
    });
  let checkC = beginStack.length == stacks.c.length && beginStack.every(function(element, index) {
    return element === stacks.c[index]; 
    });

  //This says if either checkB or checkC is true, then return true
  if( checkB || checkC ) {
     console.log('You Win!')
    return true
  } else {
    return false
  }
}

// When is this function called? What should it do with its argument?
//This function is called in the getPrompt function, after the user inputs their starting and ending stacks
//It uses the arguments as the users input for starting stack and ending stack
const towersOfHanoi = (startStack, endStack) => {
//The function checks if the move was legal, moves the piece if so, and then checks if there was a win.
  if(isLegal(startStack, endStack) ){
    movePiece(startStack, endStack);
  }
   checkForWin();
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
