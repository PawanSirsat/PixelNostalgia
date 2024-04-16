const games = [
  {
    href: 'https://www.google.com',
    name: 'Contra',
    image: './img/game/contra.png',
  },
  {
    href: 'https://www.google.com',
    name: 'Mario',
    image: './img/game/mario.png',
  },
  {
    href: 'https://www.google.com',
    name: 'Duck Hunt',
    image: './img/game/duck.png',
  },
  {
    href: 'https://www.google.com',
    name: 'Packman',
    image: './img/game/packman.png',
  },

  // Add more games as needed
]

// Function to generate game list dynamically
// Function to generate game list dynamically
function generateGameList() {
  const gameList = document.getElementById('gameList')
  games.forEach((game, index) => {
    const listItem = document.createElement('li')
    listItem.className = 'game-item'
    if (index === 0) {
      listItem.classList.add('selected')
    }
    listItem.onclick = function () {
      toggleSelection(this)
    }

    // Create the div for overlapping with the arrow
    const overlapDiv = document.createElement('div')
    overlapDiv.className = 'overlap'

    const arrowImg = document.createElement('img')
    arrowImg.src = 'arrow.png'
    arrowImg.alt = 'Down'
    arrowImg.className = 'arrow'

    const gameImage = document.createElement('img')
    gameImage.src = game.image
    gameImage.alt = game.name
    gameImage.classList.add('game-image')

    const gameDetails = document.createElement('div') // Container div for game image and name
    gameDetails.className = 'game-details'
    gameDetails.appendChild(gameImage)

    const gameLink = document.createElement('a')
    gameLink.href = game.href
    gameLink.textContent = game.name
    gameDetails.appendChild(gameLink)

    listItem.appendChild(overlapDiv)
    listItem.appendChild(arrowImg)
    listItem.appendChild(gameDetails) // Append container div
    gameList.appendChild(listItem)
  })
}

// Call the function to generate the game list
generateGameList()

// Function to toggle selection
function toggleSelection(item) {
  const selected = document.querySelector('.selected')
  if (selected !== item) {
    selected.classList.remove('selected')
    selected.querySelector('.arrow').style.display = 'none'
    item.classList.add('selected')
    item.querySelector('.arrow').style.display = 'inline'

    const selectSound = document.getElementById('selectSound')
    selectSound.play()
  }
}

// Add event listener for keyboard navigation
document.addEventListener('keydown', function (event) {
  const selected = document.querySelector('.selected')
  if (event.key === 'Enter') {
    const selectedGame = selected.querySelector('a')
    if (selectedGame) {
      const startSound = document.getElementById('startSound')
      startSound.play()
      window.location.href = selectedGame.href
      // Play the start sound
    }
  } else if (event.key === 'ArrowUp') {
    const prev = selected.previousElementSibling
    if (prev) {
      toggleSelection(prev)
    }
  } else if (event.key === 'ArrowDown') {
    const next = selected.nextElementSibling
    if (next) {
      toggleSelection(next)
    }
  }
})

// Add event listener to detect device motion
window.addEventListener('devicemotion', handleMotionEvent)

// Function to handle device motion event
function handleMotionEvent(event) {
  // Access acceleration data
  const acceleration = event.acceleration

  // Check if acceleration exceeds threshold for shake gesture
  if (isShake(acceleration)) {
    // Trigger background shake animation
    shakeBackground()
  }
}

// Function to check if acceleration indicates a shake gesture
function isShake(acceleration) {
  // Define threshold values for acceleration changes
  const threshold = 15 // Adjust as needed

  // Calculate total acceleration magnitude
  const totalAcceleration = Math.sqrt(
    acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
  )

  // Check if total acceleration exceeds threshold
  return totalAcceleration > threshold
}

// Function to shake the background image
function shakeBackground() {
  // Add CSS class or trigger JavaScript animation to shake background image
  // Example:
  document.body.classList.add('shake-animation')
}
