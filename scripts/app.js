// all variables 
document.addEventListener('DOMContentLoaded', () => {
  const width = 10
  const grid = document.querySelector('.grid')
  const score = document.querySelector('div.Score2')
  const score1 = document.querySelector('div.Score1')


  const cells = []
  let playerIdx = 94
  const alienIdx = [ 0, 2 ,4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, 28]
  let laserIdx = null 
  let laserFired = false 
  let scoreNumber = 0
  

  const soundLaser = document.querySelector('.laser')
  const soundKill = document.querySelector('.kill')
  const soundAlien = document.querySelector('.alienmove')
  // const soundSong = document.querySelector('.song')

 

  // grid

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')
    grid.appendChild(cell)
    cells.push(cell)
  }


  // Laserbeam fire function invoked by Spacebar

  function fireLaser() {
    if (laserFired) return
    laserFired = true
    soundLaser.play()
    laserIdx = playerIdx
    const laserId = setInterval(() => {
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
        soundKill.play()
        
        // SCORE
        score.textContent = scoreNumber
        scoreNumber = scoreNumber + 50
        
        score.textContent = scoreNumber
        laserFired = false
        checkForWin()
        return clearInterval(laserId) 
      }   

    }, 90) 
  }


  // // create alien

  function createAliens() {
    for (var i = 0; i  < alienIdx.length ; i++) {
      cells[alienIdx[i]].classList.add('alien')
    }
  }


  // // alien move 
  let alienId = null 
  // console.log(laserIdx)

  function alienMove() {
    
    alienId = setInterval(() => {
      for (var i = 0; i < alienIdx.length; i++) {
      
        if (alienIdx[i] > 89 || cells[alienIdx[i]].classList.value !== 'alien') {
          cells[alienIdx[i]].classList.remove('alien')
          soundAlien.play()
          // loseGame()
          if (alienIdx[i] > 89) {
            loseGame() 
            clearInterval(alienId) 
          }
        } else {
          cells[alienIdx[i]].classList.remove('alien')
          if (alienIdx[i] % width < width) {
            alienIdx[i]++
            cells[alienIdx[i]].classList.add('alien')
          }  
        } 
       
      }         
    }, 1000)
    
  }
 
  // KEY EVENTS

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
      // case 27: createAliens()
      //   break
      case 32: fireLaser(playerIdx)
        
        break
    }

    cells[playerIdx].classList.add('player')
  })

  // START GAME

  const start = document.querySelector('.START button')
  start.addEventListener('click', () => {
    createAliens()
    alienMove()
    start.disabled = true
  })


  // RESET GAME

  const reset = document.querySelector('.RESET')
  reset.addEventListener('click', () => {
    location.reload()
  })

  // WIN CONDITIONS

  function checkForWin() {
    console.log(!cells.every(cell => !cell.classList.contains('alien')))
    console.log(scoreNumber < 700)
    if (!cells.every(cell => !cell.classList.contains('alien')) && scoreNumber < 700) return 
    grid.style.display = 'none'
    score.style.display = 'none'
    score1.style.display = 'none'
    document.querySelector('.message').style.display = 'block'
    // clearInterval(alienId)
  }
  // checkForWin()
  

  function loseGame() {
    grid.style.display = 'none'
    score.style.display = 'none'
    score1.style.display = 'none'
    document.querySelector('.message2').style.display = 'block'
  }
})