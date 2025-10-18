import "./App.css"
import Die from "./components/Die.jsx"
import { useState } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"

export default function App() {
  const { width, height } = useWindowSize();
  
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value);

  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice;
  }
  
  function rollDice() {
    setDice(dice => dice.map((die) => 
      (die.isHeld && !gameWon) ? 
        {...die, isHeld: gameWon ? false : die.isHeld} : 
        {...die, value: Math.floor(Math.random() * 6) + 1, isHeld: gameWon ? false : die.isHeld}
    ));
  }

  function hold(id) {
    console.log(id);
    setDice(prevDice => prevDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : {...die};
    }))
    console.log(gameWon());
  }

  const diceElements = dice.map(dieObj => <Die 
    key={dieObj.id} 
    value={dieObj.value} 
    isHeld={dieObj.isHeld} 
    handleHold={() => hold(dieObj.id)}
    id={dieObj.id}
    />)

  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>

      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      
      <button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}