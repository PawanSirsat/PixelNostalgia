const games = [
  { href: 'https://www.google.com', name: 'Game Title 1' },
  { href: 'https://www.google.com', name: 'Game Title 2' },
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

    const gameLink = document.createElement('a')
    gameLink.href = game.href
    gameLink.textContent = game.name

    listItem.appendChild(overlapDiv) // Append the overlap div
    listItem.appendChild(arrowImg)
    listItem.appendChild(gameLink)
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
