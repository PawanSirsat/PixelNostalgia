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
let previousBackgroundX = 50 // Default position
let previousBackgroundY = 50 // Default position

// Constants for filtering and threshold
const alpha = 0.8 // Smoothing factor for low-pass filter
const threshold = 1.5 // Threshold for significant movement

// Function to handle device motion event
function handleMotionEvent(event) {
  const acceleration = event.acceleration

  displayAccelerationData(acceleration)
  const accelerationX = event.accelerationIncludingGravity.x
  const accelerationY = event.accelerationIncludingGravity.y
  const accelerationZ = event.accelerationIncludingGravity.z

  // Apply low-pass filtering to smooth the accelerometer data
  const filteredAccelerationX =
    alpha * previousAccelerationX + (1 - alpha) * accelerationX
  const filteredAccelerationY =
    alpha * previousAccelerationY + (1 - alpha) * accelerationY
  const filteredAccelerationZ =
    alpha * previousAccelerationZ + (1 - alpha) * accelerationZ

  // Update previous accelerometer data for the next iteration
  previousAccelerationX = filteredAccelerationX
  previousAccelerationY = filteredAccelerationY
  previousAccelerationZ = filteredAccelerationZ

  // Normalize and scale the filtered data to adjust sensitivity
  const scaledAccelerationX = normalize(filteredAccelerationX)
  const scaledAccelerationY = normalize(filteredAccelerationY)
  const scaledAccelerationZ = normalize(filteredAccelerationZ)

  // Apply threshold detection to filter out small movements
  if (
    Math.abs(scaledAccelerationX) > threshold ||
    Math.abs(scaledAccelerationY) > threshold
  ) {
    // Determine the device orientation angle (0, 90, -90, 180 degrees)
    const orientation = window.orientation || 0

    // Adjust background position based on orientation and accelerometer data
    let backgroundX, backgroundY
    if (orientation === 0) {
      // Portrait orientation
      backgroundX = previousBackgroundX - scaledAccelerationY
      backgroundY = previousBackgroundY + scaledAccelerationZ
    } else {
      // Landscape orientation (90 or -90 degrees)
      backgroundX = previousBackgroundX - scaledAccelerationX
      backgroundY = previousBackgroundY + scaledAccelerationZ
    }

    // Smoothly transition the background position (you can use CSS transitions or animations)
    // For example, you can set the background position using CSS:
    document.body.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`

    // Update previous background position with the new values
    previousBackgroundX = backgroundX
    previousBackgroundY = backgroundY
  }
}

// Function to normalize accelerometer data
function normalize(acceleration) {
  // Scale the acceleration to a range of -10 to 10
  return (acceleration * 10) / 9.8
}

// Add event listener for device motion
window.addEventListener('devicemotion', handleMotionEvent)

function displayAccelerationData(acceleration) {
  const accelerationDataElement = document.getElementById('accelerationData')
  accelerationDataElement.textContent = `Acceleration X: ${acceleration.x}, Y: ${acceleration.y}, Z: ${acceleration.z}`
}
