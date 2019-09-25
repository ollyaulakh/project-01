// all variables 
document.addEventListener('DOMContentLoaded', () => {
  const width = 10
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 99
  const alienIdx = [ 0, 2 ,4, 6, 8,11, 13, 15, 17, 19]
  let laserIdx = null 
  let laserFired = false 

  // let soundLazer = null
  // let soundKill = null
  

  // function sounds()
 
  

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
        const score = document.querySelector('div.Score2')
        score.textContent = 0
        const newScore = parseInt(score.textContent)
        score.textContent = ((newScore + laserIdx ) + laserIdx)
        laserFired = false
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

  // createAliens() 


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
  // alienMove()

  

 
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
})