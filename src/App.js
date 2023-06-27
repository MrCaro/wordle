import { useEffect, useState } from 'react';
import './App.css';

const wordles = ['hello', 'charm', 'fires', 'storm', 'dream', 'apple']
const WORD_GUESS_LENGTH = 5

function App() {
  const [guessInput, setGuessInput] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState(0)
  const [randomWord, setRandomWord] = useState(wordles[Math.floor(Math.random() * wordles.length)])
  const [gameOver, setGameOver] = useState(false)
  const [winnerMessage, setWinnerMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    guesses[currentGuess] = guessInput

    if(guessInput.length !== 5) {
      alert('not enough letters')
      return
    }



    //winner
    if(guesses[currentGuess].toLowerCase() === randomWord) {
      setWinnerMessage('Congratulations 🎉')
      setGameOver(true)
      return
    }

    //loser
    if(currentGuess + 1 === 6) {
      setWinnerMessage(`Oopps! Sorry, the word you were looking for was ${randomWord.toUpperCase()}`)
      setGameOver(true)
      return
    }

    setCurrentGuess(currentGuess + 1)
    setGuessInput('')
  }

  return (
    <div className='wordle'>
      {gameOver && <p>{winnerMessage}</p>}
      <div className="wordle-table">
        {guesses.map((guess, i) => {
          const isCurrent = i === guesses.findIndex(val => val == null)
          return <Row key={i} guess={isCurrent && !gameOver ? guessInput : guess ?? ''} checkAnswer={!isCurrent && guess != null} solution={randomWord} />
        })}
      </div>
      {!gameOver 
      ?
        <form onSubmit={handleSubmit}>
          <label htmlFor="guessing">
            Guess
          </label>
          <input 
            id='guessing'
            name='guessing'
            type="text" 
            placeholder='Type your guess here' 
            value={guessInput} 
            onChange={(e) => setGuessInput(e.target.value.toUpperCase())} maxLength={5} 
            pattern="[A-Za-z]{5}"
          />
        </form>
      :
        <button onClick={() => window.location.reload(false)}>
          Play again
        </button>
      }
      {}
    </div>
  );
}

function Row({ guess, checkAnswer, solution }) {
  const cells = []

  for(let i = 0; i < WORD_GUESS_LENGTH; i++) {
    let className = 'wordle-cell'
    let style = ''
    let char = guess[i]

    if(checkAnswer) {
      style = 'rotateCell 1s linear 0.5s'
      if(char === solution[i].toUpperCase()) {
        className += ' wordle-cell--correct'
      } else if(solution.toUpperCase().includes(char)) {
        className += ' wordle-cell--partial'
      } else {
        className += ' wordle-cell--incorrect'
      }
    }

    cells.push(
      <div key={i} className={className} style={{animation: style}}>
        {char}
      </div>
    )
  }

  return (
    <div className="wordle-row">{cells}</div>
  )
}

export default App;
