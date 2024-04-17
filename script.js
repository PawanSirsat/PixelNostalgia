const games = [
  {
    href: 'https://www.working.com/',
    name: 'Contra',
    image: './img/game/contra.png',
  },
  {
    href: 'https://www.working.com/',
    name: 'Mario',
    image: './img/game/mario.png',
  },
  {
    href: 'https://www.working.com/',
    name: 'Duck Hunt',
    image: './img/game/duck.png',
  },
  {
    href: 'https://www.working.com/',
    name: 'Packman',
    image: './img/game/packman.png',
  },
  {
    href: 'https://www.working.com/',
    name: 'Invader',
    image: './img/game/invader.png',
  },

  // Add more games as needed
]

function showPopup() {
  document.getElementById('popupContainer').style.display = 'block'
}

// Function to close the popup
function closePopup() {
  document.getElementById('popupContainer').style.display = 'none'
}
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

    const selectedGameLink = selected.querySelector('a')
    if (selectedGameLink) {
      const href = selectedGameLink.getAttribute('href')
      if (href === '' || href === 'https://www.working.com/') {
        showPopup()
      } else {
        window.location.href = href
      }
    }
  }
}

// Add event listener for clicks on game items
// Add event listener for clicks on game items
document.querySelectorAll('.game-item').forEach((item) => {
  item.addEventListener('click', function (event) {
    event.preventDefault() // Prevent default behavior of anchor tag
    toggleSelection(this)
  })
})

// Add event listener for keyboard navigation
document.addEventListener('keydown', function (event) {
  const selected = document.querySelector('.selected')
  console.log(selected)

  if (event.key === 'Enter') {
    const selectedGame = selected.querySelector('a')
    console.log(selected.href)

    if (selectedGame) {
      const startSound = document.getElementById('startSound')
      startSound.play()

      if (String(selectedGame.href) == 'https://www.working.com/') {
        showPopup()
      } else {
        window.location.href = selectedGame.href
      }
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

window.addEventListener('devicemotion', handleMotionEvent)

function handleMotionEvent(event) {
  const acceleration = event.accelerationIncludingGravity
  const x = acceleration.x
  const y = acceleration.y

  const maxX = 10 // Maximum allowable movement in X direction
  const maxY = 10 // Maximum allowable movement in Y direction

  // Calculate background position based on device motion
  const offsetX = (x / maxX) * 2 // Convert X-axis acceleration to percentage
  const offsetY = (y / maxY) * 2 // Convert Y-axis acceleration to percentage

  // Update background position
  document.body.style.backgroundPosition = `${offsetX}% ${offsetY}%`
}
