import React from 'react';
import Die from './Die';
import '../style/Dice.css';

const Dice = (props) => {

    return <div className="Dice">
      {props.dice.map((num, index) =>
        <Die
          handleClick={props.handleClick}
          val={num}
          locked={props.locked[index]}
          index={index}
          key={index}
          disabled={props.disabled}
          rolling={props.rolling && !props.locked[index]}
        />
      )}
    </div>
}

export default Dice;