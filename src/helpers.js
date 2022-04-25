// Rule for Yahtzee scoring.
 



 const sum = (dice) =>  dice.reduce((prev, curr) => prev + curr);


const freq = (dice) => {
    // frequencies of dice values
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
    return Array.from(freqs.values());
  }

const count = (dice, val) => dice.filter(d => d === val).length;
  


/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

const TotalOneNumber = (props) => dice =>  props.val * count(dice, props.val);
  


/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

const SumDistro = (props) => dice =>
{ return freq(dice).some(c => c >= props.count) ? sum(dice) : 0; }
  

/** Check if full house (3-of-kind and 2-of-kind) */

const FullHouse = (props) =>(dice) => {
    const freqy= freq(dice);
    return (freqy.includes(2) && freqy.includes(3)) ? props.score : 0;
  } 


/** Check for small straights. */

const SmallStraight = (props) =>(dice) => {
    const d = new Set(dice);

    if (d.has(2) && d.has(3) && d.has(4) && (d.has(1) || d.has(5)))
      return props.score;
      
    if (d.has() && d.has(4) && d.has(5) && (d.has(2) || d.has(6)))
      return props.score;
    
    return 0;
  };


/** Check for large straights. */

const LargeStraight = (props) => dice => {
    const d = new Set(dice);

    // large straight must be 5 different dice & only one can be a 1 or a 6
    return d.size === 5 && (!d.has(1) || !d.has(6)) ? props.score : 0;
  };

/** Check if all dice are same. */
const Yahtzee = (props) => dice => freq(dice)[0] === 5 ? props.score : 0;


// ones, twos, etc score as sum of that value
const twos =  TotalOneNumber({ val: 2 });

const ones =  TotalOneNumber({ val: 1 });



const threes = TotalOneNumber({ val: 3 });
const fours =  TotalOneNumber({ val: 4  });
const fives =  TotalOneNumber({ val: 5  });
const sixes =  TotalOneNumber({ val: 6  });

// three/four of kind score as sum of all dice
const threeOfKind =  SumDistro({ count: 3 });
const fourOfKind =  SumDistro({ count: 4 });

// full house scores as flat 25
const fullHouse =  FullHouse({score: 25});

// small/large straights score as 30/40
const smallStraight =  SmallStraight({score: 30});
const largeStraight =  LargeStraight({ score: 40 });

// yahtzee scores as 50
const yahtzee =  Yahtzee({ score: 50 });

// for chance, can view as some of all dice, requiring at least 0 of a kind
const chance =  SumDistro({ count: 0});

export {
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
};