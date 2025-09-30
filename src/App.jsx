import React from 'react';
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  let [dice , setDice] = React.useState(()=>generateAllNewDice())
  let gameWon = false;
  let buttonRef = React.useRef(null)

  React.useEffect(()=>{
    if(gameWon)
      buttonRef.current.focus();
  },[gameWon])

  if(dice.filter(d=>d.isHeld==false).length==0)
  {
      let value = dice[0].value
      if(dice.filter(d=>d.value!=value).length==0)
      {
          console.log("game won!")
          gameWon = true;
      }
  }


  function generateAllNewDice(){
    let arr = []
    for(let i = 0 ; i<10 ; i++)
    {
      if(arr[i]!==undefined && arr[i].isHeld) continue;
      arr.push({
        value: Math.floor(Math.random()*6)+1,
        isHeld: false
        ,id: nanoid()
      })
    }
    return arr
  }
  function roll(){
    if(gameWon)
    {
        setDice(()=>generateAllNewDice())
    }  
    else
    {
      setDice((dice)=>{
        return dice.map((die)=>{
          return die.isHeld ? die : 
          {
            ...die,
            value: Math.floor(Math.random()*6)+1,
          }
        })
      })
    }
  }
  function hold(id){
    // console.log(id)
    setDice((dice)=>{
        return dice.map((d)=>{
          return d.id===id ? {...d , isHeld: !d.isHeld} : d
        })
    })
  }

    let diceElements = dice.map((num)=>(
    <Die 
      key={num.id} 
      value={num.value} 
      isHeld={num.isHeld}
      hold={()=>hold(num.id)}
      id={num.id}
    />))

    return (
        <main>
          {gameWon && <Confetti />}
          <div aria-live="polite">
              {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          <div id="container">
              {diceElements}
          </div>
          <button id="roll-dice" ref={buttonRef} onClick={roll}>{gameWon? "New Game" : "Roll"}</button>
        </main>
        )
}