document.addEventListener('DOMContentLoaded', function () {
  const gameList = document.getElementById('gameList')
  const games = gameList.querySelectorAll('li')
  let selectedGameIndex = 0

  function selectGame(index) {
    console.log('index', index)

    // Remove the selected class from all games
    games.forEach((game) => game.classList.remove('selected'))

    // Add the selected class to the specified game
    games[index].classList.add('selected')

    // Focus on the selected game link for keyboard accessibility
    games[index].querySelector('a').focus()

    // Update the selected game index
    selectedGameIndex = index
  }

  // Select the first game by default
  selectGame(selectedGameIndex)

  // Function to handle navigation to the selected game link
  function navigateToSelectedGame() {
    const selectedGameLink = games[selectedGameIndex].querySelector('a')
    if (selectedGameLink) {
      window.location.href = selectedGameLink.href
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
      if (selectedGameIndex > 0) {
        console.log('-')
        selectGame(selectedGameIndex - 1)
      }
    } else if (event.key === 'ArrowDown') {
      if (selectedGameIndex < games.length - 1) {
        console.log('+')
        selectGame(selectedGameIndex + 1)
      }
    } else if (event.key === 'Enter') {
      navigateToSelectedGame()
    }
  })

  // Add click event listeners to the game list items
  games.forEach((game, index) => {
    game.addEventListener('click', function () {
      selectGame(index)
      navigateToSelectedGame()
    })
  })
})
