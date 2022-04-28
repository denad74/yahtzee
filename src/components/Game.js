import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "../style/Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

const Game = () => {

  const [dice, setDice] = useState(Array.from({ length: NUM_DICE })); //Pravi niz 5 undifined

  const [locked, setLocked] = useState(Array(NUM_DICE).fill(false)); //Ne dozvoljava selektovanje
  const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS); // Broj Pokusaja

  const [rolling, setRolling] = useState(false)

  const [show, setShow] = useState(false)
  const [scores, setScores] = useState(
    {
      ones: undefined,
      twos: undefined,
      threes: undefined,
      fours: undefined,
      fives: undefined,
      sixes: undefined,
      threeOfKind: undefined,
      fourOfKind: undefined,
      fullHouse: undefined,
      smallStraight: undefined,
      largeStraight: undefined,
      yahtzee: undefined,
      chance: undefined
    }); // Objekat rezultata
  
  
  
  
  const rollDiceHandler = () => {
    // roll dice whose indexes are in reroll
    setDice( dice.map((el,i)=> locked[i] ? el : Math.ceil(Math.random() * 6)));
    
    setLocked(rollsLeft > 1 ? locked : Array(NUM_DICE).fill(true));
   
   
    setRollsLeft(rollsLeft - 1);
    setRolling(false);
  }

  const animateRoll = () => {
    // console.log(locked);
    
    setRolling(true);
    setTimeout(rollDiceHandler, 500
    );
  }

  const toggleLocked = (index) => {
    if (rollsLeft > 0 && !rolling) {
      setLocked(
        [...locked.slice(0, index), !locked[index], ...locked.slice(index + 1)]
      );
    }
    
  }

  const doScore = (ruleName, ruleFn) => {

    
    setLocked(locked.map(el => el === true ? false : true))

    setScores({ ...scores, [ruleName]: ruleFn(dice) });
    setRollsLeft(NUM_ROLLS);
    
    animateRoll()
    
  }

 const displayRollInfo = () => {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ];
    return messages[rollsLeft];
 }
  
 useEffect(() => {
    animateRoll()
    setScores(scores)
     let araTrue = Object.values(scores).every(
      value => value !== undefined || 0);
   if (araTrue) {
     setShow(true)
     setTimeout(
       
       () => {
       setShow(false);
       restargtGameHandler()
     }, 5000);
   }
  }, [scores]);
 
  const restargtGameHandler = () => {
    setDice(Array.from({ length: NUM_DICE }));//Pravi niz 5 undifined
        setLocked(Array(NUM_DICE).fill(false)); //Ne dozvoljava selektovanje
        setRollsLeft(NUM_ROLLS); // Broj Pokusaja
        setRolling(false)
        setScores({
          ones: undefined,
          twos: undefined,
          threes: undefined,
          fours: undefined,
          fives: undefined,
          sixes: undefined,
          threeOfKind: undefined,
          fourOfKind: undefined,
          fullHouse: undefined,
          smallStraight: undefined,
          largeStraight: undefined,
          yahtzee: undefined,
          chance: undefined
        })
  }


  
  // function restartGame() {
    
  //   for (const key in scores) {
  //     if (scores[key] !== undefined) {
  //       console.log('to je to');
  //     }
      // setDice(Array.from({ length: NUM_DICE }));//Pravi niz 5 undifined
      // setLocked(Array(NUM_DICE).fill(false)); //Ne dozvoljava selektovanje
      // setRollsLeft(NUM_ROLLS); // Broj Pokusaja
      // setRolling(false)
      // setScores({
      //   ones: undefined,
      //   twos: undefined,
      //   threes: undefined,
      //   fours: undefined,
      //   fives: undefined,
      //   sixes: undefined,
      //   threeOfKind: undefined,
      //   fourOfKind: undefined,
      //   fullHouse: undefined,
      //   smallStraight: undefined,
      //   largeStraight: undefined,
      //   yahtzee: undefined,
      //   chance: undefined
      // })
    
      
  //     else {
  //       console.log('yupiiii');
  //     }
    
  //   }
  // }

  
  window.addEventListener("beforeunload", function (e) {
   localStorage.removeItem('highGamesScore');
  
}, false);
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>
          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rolling}
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={locked.every(x => x) || rollsLeft === 0 || rolling}
                onClick={animateRoll}
              >
                {displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={doScore} scores={scores} />
        {show && <button onClick={restargtGameHandler}>Restart Game</button>}
      </div>
    );
  }


export default Game;
