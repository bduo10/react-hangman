import { useState, useEffect } from 'react'
import './App.css'

import DisplayPuzzle from './components/DisplayPuzzle'
import UserGuess from './components/UserGuess/'
import DisplayGuesses from './components/DisplayGuesses'

import axios from 'axios'

function App() {
  
  const [puzzle, setPuzzle] = useState('')
  const [lettersGuessed, setLettersGuessed] = useState([])

  const getPuzzle = async () => {
    try {
      const response = await axios.get("https://random-word-api.herokuapp.com/word")
      setPuzzle(response.data[0])
      setLettersGuessed([])
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {
    console.log('Starting the game!')
    getPuzzle()
  }, [])

  const wrongGuesses = lettersGuessed.filter((guess) => {
    return !puzzle.includes(guess) 
  })

  const submitGuess = (event) => {
    event.preventDefault() 

    if (wrongGuesses.length >= 6) {
      alert(`YOu have lost the game! The word was ${puzzle}.`)
      return 
    }
    
    const userGuess = document.getElementById('user-guess').value.toLowerCase()
  
    if (userGuess === '') {
      alert('Please input a guess!')
      return 
    } else if (lettersGuessed.includes(userGuess)) {
      alert('You have already guessed this letter!')
      return 
    }
    const letters = [...lettersGuessed, userGuess]
    setLettersGuessed(letters)
    document.getElementById('user-guess').value = ''
  }

const checkVictory = () => {
  for (let letter of puzzle) {
    if (!lettersGuessed.includes(letter)) {
      return false
    }
  }
  return true
}

  return (
    <div class="App">
      {
        (checkVictory() && puzzle != '') ? 
        <div>
          <h1>Congratulations! You won! The puzzle was {puzzle}.</h1>
          <button onClick={() => window.location.reload()}> Click to restart the game!</button>
        </div>
        :
        <div>
          {puzzle}
          <h1>Hangman App</h1>
          <hr></hr>
          <DisplayPuzzle puzzle={puzzle} lettersGuessed={lettersGuessed}/>
          <UserGuess submitGuess={submitGuess}/>
          <DisplayGuesses wrongGuesses={wrongGuesses}/>
        
        </div>
      }
    </div>
  )
}

export default App
