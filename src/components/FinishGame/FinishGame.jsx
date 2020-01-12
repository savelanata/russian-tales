import React from 'react';
import Button from '../Button/Button';
import './FinishGame.css';

const FinishGame = (props) => {
        
     return (
         <div>
             <img src={props.src} className='smallBg' alt=' ' />
             <div className={(props.lang === 'fin') ? 'GameOverFin' : 'GameOverRus'} > </div>

             <Button className='UusiPeli' onClick={() => props.onClick('toStart')} value={props.textGame.PlayAgain[props.lang]} />
             <div className='PlayAgain'></div>
        </div>
    );
    };

export default FinishGame;