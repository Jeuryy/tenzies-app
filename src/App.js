import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Stopwatch from './components/Stopwatch';

function App() {

const [dice, setDice] = useState(allNewDice());
const [tenzies, setTenzies] = useState(false); 
const [rolls, setRolls] = useState(0);
const [time, setTime] = useState(0);
const [score, setScore] = useState(``);

useEffect(() => {
  const allHeld = dice.every(die => die.isHeld);
  const firstDie = dice[0].value;
  const allSameValue = dice.every(die => die.value === firstDie);

  if (allHeld && allSameValue) {
    setTenzies(true);
  }
},[dice]);

function generateNewDie(){
  return {
    id:nanoid(), 
    value: Math.ceil((Math.random() * 6)), 
    isHeld: false
  }
}

  function allNewDice(){
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie());
    }
    return array;
  }    

  const diceElements = dice.map(die => <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}
    />)

  function rollDice(){
    if (tenzies) {
      setTenzies(false)
      setRolls(0)
      setTime(0)
      setDice(allNewDice());
    } else{
        setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
          die : 
          generateNewDie()
        }))
      setRolls(rolls+1)
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld}:
      die
    }))
  }


  return (
      <main className="App">
        {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className={tenzies ? "winner" : "instructions"}>{tenzies ? "You won! :D": "Roll until all dice are the same!"}</p>
        {tenzies && <p className='score'>T I M E : {score}</p>}
        {tenzies && <p className='score'>R O L L S : {rolls}</p>}
        <div className='dice'>
          {diceElements}
        </div>
        <div className='roll'>
          <button className={tenzies ? "won" : "button"} onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
        <div className='rolls-time-container'>
          {!tenzies && <p className='rolls'>Rolls: {rolls}</p>}
          {!tenzies && <Stopwatch time={time} tenzies={tenzies} 
          setTime={setTime} score={score} setScore={setScore}/>}
        </div>
        <a href='https://github.com/Jeuryy' target='_blank' className='github' rel='noreferrer'>Github</a>
      </main>
  );
}

export default App;
