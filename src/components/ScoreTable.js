import React, {useEffect } from "react";
import RuleRow from "./RuleRow";
import "../style/ScoreTable.css";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
} from "../helper/helpers";

const ScoreTable = ({ scores, doScore }) => {
    
    // const test = {...scores}
    //  const areTrue = Object.values(test).every(
    //   value => value === !undefined);
    // console.log(areTrue);
  
  const scoreLocal = JSON.parse(localStorage.getItem('highGamesScore'));
  //const [highGamesScore, setHighsGamesScore] = useState(scoreLocal)
  // const [totalScoreofGame, setTotalScoreofGame] = useState(0)
    //console.log(hig);
    // const areTrue = Object.values(scores).every(
    //   value => value === true);
    // console.log(areTrue);
   
  const getTotalScore = () =>{
   
    let totalScore = 0;
    for (let key in scores) {
      if (scores[key]) {
        totalScore += scores[key]
      };
     
    }
    return totalScore
    // setTotalScoreofGame(totalScore)
  }

    const biggerNum = () =>{
      const bigger = Math.max(scoreLocal, getTotalScore())
      return bigger;
    }
 
    
  
  useEffect(() => {
  // storing data in localStorage
    localStorage.setItem("highGamesScore", JSON.stringify(biggerNum()));
  }, [biggerNum()
  ,]);

    return (
      <div className='ScoreTable'>
        <section className='ScoreTable-section'>
          <h2>Upper</h2>
          <table cellSpacing='0'>
            <tbody>
              <RuleRow
                name='Ones'
                score={scores.ones}
                description={"1 point per 1"}
                doScore={() => doScore("ones", ones)}
              />
              <RuleRow
                name='Twos'
                score={scores.twos}
                description={"2 point per 2"}
                doScore={() => doScore("twos", twos)}
              />
              <RuleRow
                name='Threes'
                score={scores.threes}
                description={"3 point per 3"}
                doScore={() => doScore("threes", threes)}
              />
              <RuleRow
                name='Fours'
                score={scores.fours}
                description={"4 point per 4"}
                doScore={() => doScore("fours", fours)}
              />
              <RuleRow
                name='Fives'
                score={scores.fives}
                description={"5 point per 5"}
                doScore={() => doScore("fives", fives)}
              />
              <RuleRow
                name='Sixes'
                score={scores.sixes}
                description={"6 point per 6"}
                doScore={() => doScore("sixes", sixes)}
              />
            </tbody>
          </table>
        </section>
        <section className='ScoreTable-section ScoreTable-section-lower'>
          <h2>Lower</h2>
          <table cellSpacing='0'>
            <tbody>
              <RuleRow
                name='Three of Kind'
                score={scores.threeOfKind}
                description={"Sum all dice if 3 are the same"}
                doScore={() => doScore("threeOfKind", threeOfKind)}
              />
              <RuleRow
                name='Four of Kind'
                score={scores.fourOfKind}
                description={"Sum all dice if 4 are the same"}
                doScore={() => doScore("fourOfKind", fourOfKind)}
              />
              <RuleRow
                name='Full House'
                score={scores.fullHouse}
                description={"25 points for a full house"}
                doScore={() => doScore("fullHouse", fullHouse)}
              />
              <RuleRow
                name='Small Straight'
                score={scores.smallStraight}
                description={"30 points for a small straight"}
                doScore={() =>
                  doScore("smallStraight", smallStraight)
                }
              />
              <RuleRow
                name='Large Straight'
                score={scores.largeStraight}
                description={"40 points for a large straight"}
                doScore={() =>
                  doScore("largeStraight", largeStraight)
                }
              />
              <RuleRow
                name='Yahtzee'
                score={scores.yahtzee}
                description={"50 points for yahtzee"}
                doScore={() => doScore("yahtzee", yahtzee)}
              />
              <RuleRow
                name='Chance'
                score={scores.chance}
                description={"Sum of all dice"}
                doScore={() => doScore("chance", chance)}
              />
            </tbody>
          </table>
        </section>
        <h2>TOTAL SCORE: {getTotalScore()}</h2>
        {scoreLocal ||  scoreLocal !==  0 && <h2>HIGHSCORE: {biggerNum()}</h2>}
      </div>
    );
  
}

export default ScoreTable;

//fullHouse
//3 of kind
// fpur of kind