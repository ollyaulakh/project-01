
document.addEventListener('DOMContentLoaded', () => {
  const width = 10 
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 90
  let alienIdx = 5

  function handleClick(e) {
    e.target.classList.add('player')
  }

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')

    cell.addEventListener('click', handleClick)

    grid.appendChild(cell)
    cells.push(cell)
  }


  // laserbeam fire 

  // create function  for firing laser with identifier
  // use set interval and link identifier which fires from playerIdx
  // use remove and add to make laser move
  // use clear interval to stop laser when hits end of grid
  function fireLaser(laserIdx) {
    const laserId = setInterval(() => {
      cells[laserIdx].classList.remove('laser')

      laserIdx -= width
      if (laserIdx < 0) return clearInterval(laserId)
      cells[laserIdx].classList.add('laser')
    }, 100)
  }




  // create alien
  cells[alienIdx].classList.add('alien')





  // alien move 

  function alienMove(alienIdx) {
    const alienId = setInterval(() => {
      cells[alienIdx].classList.remove('alien') 
      if (alienIdx % width < width) {
        alienIdx++
        cells[alienIdx].classList.add('alien')
      }
    }, 1000)
  }
  alienMove(alienIdx)


  cells[playerIdx].classList.add('player')

  document.addEventListener('keydown', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

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