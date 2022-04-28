import React from "react";
import "../style/Die.css";

const Die = ({val=5, locked, rolling, disabled, index,handleClick}) => {

  
  let numberWords = ["one", "two", "three", "four", "five", "six"];
  //   val: props.val,
  // }
const onHandleClick = () => {
    return handleClick(index);
}
  
  let classes = `Die fas fa-dice-${numberWords[val-1]} fa-5x `;
  if (locked) classes += "Die-locked";
  if (rolling) classes += "Die-rolling";
  
  
 
  return (
      
    <i className={classes} onClick={onHandleClick} disabled={disabled} />
    );
}

export default Die;
// ${numberWords}${[val - 1 || props.val -1]}