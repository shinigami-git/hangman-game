import React, {useEffect} from 'react'
import { checkWin } from "../helpers/helpers";

const Popup = ({correctLetters, incorrectLetters, selectedWord, setisGameActive,playAgain}) => {
    let finalMessage="";
    let finalMessageRevealWord="";
    let isGameActive=true;
    if( checkWin(correctLetters, incorrectLetters, selectedWord) == 'win'){
        finalMessage="Congratuations! You won! :)";
        isGameActive=false;
    }else if(checkWin(correctLetters, incorrectLetters, selectedWord) == 'lose'){
        finalMessage="Sorry!The man is hanged!";
        finalMessageRevealWord=`... the word was: ${selectedWord}`;
        isGameActive=false;
    }
    useEffect(()=>setisGameActive(isGameActive));
    return (
        <div className="popup-container" style={finalMessage !=='' ? {display:'flex'} : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain} >Play Again</button>
            </div>
        </div>
    )
}

export default Popup
