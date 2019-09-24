// all variables 
document.addEventListener('DOMContentLoaded', () => {
  const width = 10
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 99
  const alienIdx = [ 0, 2 ,4, 6, 8, 11, 13, 15, 17, 19 ]
  let laserIdx = null 
  let laserFired = false


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
  

  // grid

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
    if (laserFired) return
    laserFired = true
    laserIdx = playerIdx
    const laserId = setInterval(() => {
      //make the check here whether the cells[laserIdx] contains the alien class
      cells[laserIdx].classList.remove('laser')
      laserIdx -= width
      if (laserIdx < 0) {
        laserFired = false
        return clearInterval(laserId)
      } else {
        cells[laserIdx].classList.add('laser')
      }
      
      if (cells[laserIdx].classList.contains('alien')) { 
        cells[laserIdx].classList.remove('alien', 'laser')
        laserFired = false
        return clearInterval(laserId) 
      }      
    }, 70)
    
  }

  // function collisionCheck() {
  //   if (cells[laserIdx].classList.contains('laser', 'alien')) {
  //     console.log(`Hit On ${alienIdx}`)
  //     cells[laserIdx].classList.remove('alien')
  //     return clearInterval()
  //   }
  // }

  // // create alien

  function createAliens() {
    for (var i = 0; i  < alienIdx.length ; i++) {
      cells[alienIdx[i]].classList.add('alien')
    }
  }
  createAliens() 
  

  // // alien move 
  let alienId = null 
  console.log(laserIdx)

  function alienMove() {
    
    alienId = setInterval(() => {
      for (var i = 0; i < alienIdx.length; i++) {
      
        if (alienIdx[i] > 89 || cells[alienIdx[i]].classList.value !== 'alien') {
          console.log(alienIdx[i], laserIdx)
          cells[alienIdx[i]].classList.remove('alien')
          if (alienIdx[i] > 89) clearInterval(alienId)
        } else {
          cells[alienIdx[i]].classList.remove('alien')
          if (alienIdx[i] % width < width) {
            alienIdx[i]++
            cells[alienIdx[i]].classList.add('alien')
            console.log(laserIdx)
          }  
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