// set the value of N using form
const chessboard = document.querySelector('#chessboard')
const setN = document.querySelector('#setN')
const setNinput = document.querySelector('#setNinput')


// set some variables 
setNinput.value = 1 
let board = null 
const maxNum = 9


setNinput.addEventListener('change', (e) => {
  let newNum = e.target.value 
  console.log(newNum)

  if (isNaN(newNum)) {
    newNum = 1
  } else if (newNum < 1) {
    newNum = 1
  } else if (newNum > maxNum) {
    newNum = maxNum
  } else if (newNum % 1 !== 0) {
    newNum = Math.floor(newNum)
  }

  setNinput.value = newNum
})

setN.addEventListener('submit', (e) => {
  e.preventDefault()

  chessboard.innerHTML = 'Loading...'

  setTimeout(() => {
    finalBoard = queensAES(parseInt(setNinput.value)) 

    chessboard.innerHTML = ''
    populateChessboard(finalBoard)
  }, 100)

})

function populateChessboard(board) {
  // assumes board is 2d array 
  let counter = 0
  for (let i = 0; i < board.length; i++) {
    const chessboardRow = document.createElement('div')
    chessboardRow.className = 'chessboardRow'
    chessboard.append(chessboardRow)
    if (board.length % 2 === 0) counter++
    for (let j = 0; j < board.length; j++) {
      counter++ 
      
      const chessboardBox = document.createElement('div')
      chessboardBox.className = 'chessboardBox'
      chessboardBox.style.backgroundColor = counter % 2 == 0 ? 'black' : 'white'
      chessboardRow.append(chessboardBox)

      if (board[i][j] !== 0) {
        const piece = document.createElement('h1')
        if (board[i][j] === 9) {
          piece.innerText = 'Q'
          piece.style.color = "yellowgreen"
        } else if (board[i][j] === 1) {
          piece.innerText = 'X'
          piece.style.color = "red"
          piece.style.fontSize = "15px"
        }
        chessboardBox.append(piece)
      }
    }
  }

}