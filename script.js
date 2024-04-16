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

// Initialize variables
let lastShakeTime = 0
let shakeThreshold = 15 // Adjust as needed
let shakeInterval = 1000 // Adjust as needed

// Function to handle device motion event
function handleMotionEvent(event) {
  // Get accelerometer data
  let acceleration = event.accelerationIncludingGravity

  // Calculate total acceleration
  let totalAcceleration = Math.sqrt(
    acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
  )

  // Check if acceleration exceeds threshold and enough time has passed since the last shake
  let currentTime = Date.now()
  if (
    totalAcceleration > shakeThreshold &&
    currentTime - lastShakeTime > shakeInterval
  ) {
    // Trigger background shake animation
    shakeBackground()
    // Update last shake time
    lastShakeTime = currentTime
  }
}

// Function to simulate background shake animation
function shakeBackground() {
  // Apply your background shake animation logic here
  // For example, you can add a CSS class to the body element to trigger a CSS animation
  document.body.classList.add('shake')
  // Remove the shake class after a delay to stop the animation
  setTimeout(() => {
    document.body.classList.remove('shake')
  }, 1000) // Adjust the duration of the shake animation
}

// Add event listener for device motion
window.addEventListener('devicemotion', handleMotionEvent)
