function copyBoard(board) {
  let newBoard = []
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i].slice())
  }
  return newBoard 
}

// 0 means non-occupied, non-empty
// 9 means a queen is on it 
// 1 means attacked by a queen 
function createNxNBoard(N) {
  const board = new Array(N).fill(0).map(() => {
    return new Array(N).fill(0)
  })

  return board 
}

function queensAndAttacked(board) {
  // if there are zeros left it is not fully attacked 
  let attacked = true 
  let qCount = 0

  board.forEach(row => {
    row.forEach(space => {
      if (space === 0) attacked = false 
      if (space === 9) qCount += 1 
    })
  })
  return [attacked, qCount]
}

function executeAttacks(board) {
  // iterate through the board 
  // for each queen found, change all the diagonal and straight 
  // aligned tiles to 1 if they were 0 
  // requires 2 for loops of length N 
  const N = board.length 

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 9) {
        // if we found a queen, get its row and col 
        const qrow = i 
        const qcol = j 

        // horizontal and vertical always have N 
        for (let h = 0; h < N; h++) {
          if (board[qrow][h] === 0) board[qrow][h] = 1 
          if (board[h][qcol] === 0) board[h][qcol] = 1 
        }
        
        // diagonal doesn't always have N but always less or equal N

        let d1row, d1col 
        if (qrow > qcol) { 
          d1row = qrow - qcol 
          d1col = 0 
        } else {
          d1col = qcol - qrow 
          d1row = 0  
        }

        while (d1row < N && d1col < N) {
          if (board[d1row][d1col] === 0) board[d1row][d1col] = 1
          d1row++ 
          d1col++
        }

        // have to do diagonal the other direction 

        if (N - 1 - qrow >= qcol) { 
          // console.log('row >= col')
          d1row = qrow + qcol 
          d1col = 0
        } else {
          // console.log('row < col')
          d1col = qcol - (N - 1 - qrow) 
          d1row = N - 1
        }

        while (d1row >= 0 && d1col >= 0) {
          // console.log('diag on: ', d1row, d1col)
          if (board[d1row][d1col] === 0) board[d1row][d1col] = 1
          d1row -- 
          d1col ++
        }

      }
    }
  }
}


// row is from the top, col is from the left 
function placeQueen(board, row, col) {
  board[row][col] = 9
}

// test the functionality of helper functions
function testFunctions(N) {
  
  const newBoard = createNxNBoard(N)
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const currBoard = copyBoard(newBoard)
      placeQueen(currBoard, i, j)
      executeAttacks(currBoard)
      console.log(currBoard)
      console.log(queensAndAttacked(currBoard))
    }
  }
}

function queensAES(N) {
  const board = createNxNBoard(N) 

  // dfs over every square 
  // but we know we don't need more than N  
  // dfs uses a stack 
  let stack = [board]
  let minSol = null 
  let counter = 0
  let power = 1 
  let maxNum = N
  
  while (stack.length > 0) {
    // all squares that are 0 or 1 are candidates for new queens 
    
    const currBoard = stack.pop()

    counter++
    if (counter === power) {
      console.log('stack: ', power)
      power *= 10 
    }
    
    // console.log('===== Current Board =====')
    // console.log(currBoard)
    executeAttacks(currBoard) 
    // console.log(currBoard)
    const [allAttacked, numQueens] = queensAndAttacked(currBoard)
    
    if (allAttacked === true) {
      if (numQueens < maxNum) maxNum = numQueens
      // if all attacked, check against optimal solution 
      if (minSol === null) {
        minSol = currBoard 
        console.log('===== Min Board =====')
        console.log(currBoard)
      } else {
        const [minAtk, minQns] = queensAndAttacked(minSol) 
        if (minQns > numQueens) {
          minSol = currBoard 
          console.log('===== Min Board =====')
          console.log(currBoard)
        }
      }

    } else if (numQueens < maxNum) {
      // find empty spaces to use if:
      // allAttacked is false and 
      // numQueens is less than N 
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          // for each space, if 0 or 1 then its a candidate spot 
          if (currBoard[i][j] === 0 || currBoard[i][j] === 1) {
            // make a new board then push it 
            const newBoard = copyBoard(currBoard)
            newBoard[i][j] = 9 
            stack.push(newBoard)
          }
        }
      }
    } // end of else ifs for attacks and num of queens 
  } // end of while loop 

  console.log('===== Min Board Final =====')
  return minSol 
}

// ============ run area ================ 
// console.log(queensAES(7)) 
// testFunctions(5)

// ============ test area ================
// const newBoard = createNxNBoard(5) 
// console.log(newBoard)

// console.log('Board is fully attacked? ', queensAndAttacked(newBoard))

// console.log('Placing piece on 2, 2')

// placeQueen(newBoard, 2, 2)

// console.log(newBoard)

// const copiedBoard = copyBoard(newBoard)

// // placeQueen(newBoard, 1, 2)

// // console.log(newBoard)

// executeAttacks(newBoard)
// console.log(newBoard)

// placeQueen(newBoard, 1, 2)
// executeAttacks(newBoard)
// console.log(newBoard)

// console.log('Board is fully attacked? ', queensAndAttacked(newBoard))

