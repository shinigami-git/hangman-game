import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import Figure from "./components/Figure";
import IncorrectLetters from "./components/IncorrectLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import {showNotification as show} from "./helpers/helpers";



const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];



function App() {
  const [isGameActive, setisGameActive]= useState(true);
  const [correctLetters, setcorrectLetters] = useState([]);
  const [incorrectLetters, setincorrectLetters] = useState([]);
  const [showNotification, setshowNotification]= useState(false);

  useEffect(() => {
    const handleKeydown = event =>{
      const {key, keyCode} = event;
      
        if (isGameActive && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setcorrectLetters(currentLetters => [...currentLetters,letter]);
    
            } else {
              show(setshowNotification);
            }
          } else {
            if (!incorrectLetters.includes(letter)) {
              setincorrectLetters(incorrectLetters => [...incorrectLetters,letter]);
    
            } else {
              show(setshowNotification);
            }
          }
        }
      
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown',handleKeydown);
    }
  },[correctLetters,incorrectLetters,isGameActive]);

  function playAgain(){
    setisGameActive(true);
    setcorrectLetters([]);
    setincorrectLetters([]);
    selectedWord = words[Math.floor(Math.random() * words.length)];
  }

  return (
    <>
      <Header/>
      <div className="game-container">
        <Figure incorrectLetters={incorrectLetters} />
        <IncorrectLetters incorrectLetters={incorrectLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        
      </div>
      <Popup correctLetters={correctLetters} incorrectLetters={incorrectLetters} 
      selectedWord={selectedWord} setisGameActive={setisGameActive} playAgain={playAgain} />
        <Notification showNotification={showNotification} />
      
    </>
  );
}

export default App;
