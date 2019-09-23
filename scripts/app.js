// all variables 
document.addEventListener('DOMContentLoaded', () => {
  const width = 10
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 99
  const alienIdx = [0]
  let laserIdx = null

  // let aliens [] array methodolgy
  // let gamePlaying = false
  // let playerScore = 0
  // let bulletInterval = null
  // const bulletSpeed = 20
  // let soundLazer = null
  // let soundBoom = null
  // let pilotName = 'Unknown'
  // let highscores = null


  //Functions
  // function checkHighscores()
  // function startGame ()
  // function pilotNameInput ()
  // function resetGame ()
  // function quitGame ()
  // function playGame()
  // function sounds()
  // function collision
  



  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }


  // laserbeam fire 

  // create function  for firing laser with identifier
  // use set interval and link identifier which fires from playerIdx
  // use remove and add to make laser move
  // use clear interval to stop laser when hits end of grid

  //every time the fire laser cell moves, 
  // update the laserIdx so that it's the number of the cell in which the laser is in currently 

  // 

  function fireLaser() {
    laserIdx = playerIdx
    const laserId = setInterval(() => {
      
      //make the check here whether the cells[laserIdx] contains the alien class
      cells[laserIdx].classList.remove('laser')
      laserIdx -= width
      if (laserIdx < 0) return clearInterval(laserId)
      cells[laserIdx].classList.add('laser')
      
      if (cells[laserIdx].classList.contains('laser','alien')) { 
        cells[laserIdx].classList.remove('alien') 
        return clearInterval()
      }      
    }, 100)
  }
  

  // // create alien
  // cells[alienIdx].classList.add('aliens')
  cells[alienIdx[0]].classList.add('alien')
  // // alien move 
  let alienId = null 
  console.log(laserIdx)

  function alienMove() {
    
    alienId = setInterval(() => {
      if (alienIdx[0] > 89 || cells[alienIdx[0]].classList.value !== 'alien') {
        console.log(alienIdx[0], laserIdx)
        cells[alienIdx[0]].classList.remove('alien')
        clearInterval(alienId)
      } else {
        cells[alienIdx[0]].classList.remove('alien')
        if (alienIdx[0] % width < width) {
          alienIdx[0]++
          cells[alienIdx[0]].classList.add('alien')
          console.log(laserIdx)

        }  
      }          
    }, 1000)
  }

  alienMove()


  cells[playerIdx].classList.add('player')

  document.addEventListener('keydown', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width

    switch (e.keyCode) {
      case 37: if (x > 0) playerIdx -= 1
        break
      // case 38: if (y > 0) playerIdx -= width
      //   break
      case 39: if (x < width - 1) playerIdx += 1
        break
      // case 40: if (y < width - 1) playerIdx += width
      //   break
      case 32: fireLaser(playerIdx)
    }

    cells[playerIdx].classList.add('player')
  })
})