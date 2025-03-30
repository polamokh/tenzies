import Dice from "./components/Dice";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  let [allDice, setAllDice] = useState(() => generateAllNewDice());

  const gameWon = allDice.every((die) => {
    return die.isHeld && die.value === allDice[0].value;
  });

  const rollButton = useRef(null);

  useEffect(() => {
    gameWon && rollButton.current.focus();
  }, [gameWon]);

  let diceElements = allDice.map((dieObj) => (
    <Dice
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  function generateAllNewDice() {
    const diceLength = 10;
    const allNewDice = [];
    for (let i = 0; i < diceLength; i++) {
      const dieObj = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      };
      allNewDice.push(dieObj);
    }
    return allNewDice;
  }

  function rollDice() {
    gameWon
      ? setAllDice(() => generateAllNewDice())
      : setAllDice((prev) =>
          prev.map((die) => {
            return die.isHeld
              ? die
              : {
                  ...die,
                  value: Math.floor(Math.random() * 6) + 1,
                };
          })
        );
  }

  function hold(id) {
    setAllDice((prev) =>
      prev.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  return (
    <main className="active">
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={rollButton} className="roll" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
