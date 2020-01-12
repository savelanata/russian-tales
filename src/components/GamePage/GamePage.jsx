import React, { useState,} from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import './GamePage.css';
import { setTimeout } from 'timers';

const GamePage = (props) => {
    const [isButtonHidden, setIsButtonHidden] = useState(false);
    const [numWord, setNumWord] = useState(0);
    const [hiddenAnswer, setHiddenAnswer] = useState(true);
    const [hiddenYesNo, setHiddenYesNo] = useState(true);
    const [isWellDone, setIsWellDone] = useState(false);
    const [isWellNo, setIsWellNo] = useState(false);
    const [isBadAnswer, setIsBadAnswer] = useState(false);
   
    function handleAnswer(pri)  {
        if ((pri === 'yes') && (!props.gameWords[numWord].fake)) {
            setHiddenAnswer(false);
            setHiddenYesNo(true);
            setIsWellDone(true);
            setTimeout(() => {
                setIsWellDone(false);
                setIsButtonHidden(false);
                setNumWord(0);
                setHiddenAnswer(true);
                props.onClick('answer');
             }, 3000);
            
        };
        if (((pri === 'yes') && (props.gameWords[numWord].fake)) || ((pri === 'no') && (!props.gameWords[numWord].fake))) {
            setIsBadAnswer(true);
            setHiddenYesNo(true);
            setTimeout(() => {
                if (numWord === 3) setNumWord(0);
                else setNumWord(numWord + 1);
                setIsBadAnswer(false);
                setHiddenYesNo(false);
            }, 2000);
    
        };
        if ((pri === 'no') && (props.gameWords[numWord].fake)) {
            setIsWellNo(true);
            setHiddenYesNo(true);
            setTimeout(() => {
                if (numWord === 3) setNumWord(0);
                else setNumWord(numWord + 1);
                setIsWellNo(false);
                setHiddenYesNo(false);
            }, 2000);
        };

    };

    function rotate() {
        setIsButtonHidden(true);
        setHiddenYesNo(false);
    };

     return (
       <div>
             <img src={props.bgSrc} className='smallBg' alt=' ' />
             <Text className='GameName' value={props.textGame.GameName[props.lang]} />
             <Text className='GameQuestion' value={props.textGame.GameQuestion[props.lang]} />

             <div className='Card1' > <img src={props.src} className='gameImg' alt=' ' /></div>
             <div className='Card2' hidden={true} > </div>

             <div className='Card3' hidden={!isButtonHidden}> <Text className='wordPlace' value={props.gameWords[numWord].words[props.lang]} /> </div>
             <div className='Card4' hidden={isButtonHidden} >   </div>

             <div className='wellDone' hidden={!isWellDone} >{props.textGame.WellDone[props.lang]} <div className='imgWellDone'></div></div>
             <div className='wellDone' hidden={!isWellNo} >
                 {props.textGame.WellDone[props.lang]}
                 <div className='redText' >{props.lang === 'rus' ? 'HE ' : 'EI ' } <span className= 'colorText'>{props.lang === 'rus' ? props.gameWords[numWord].words.rusWrong : props.gameWords[numWord].words.finWrong }</span></div>
             </div>

             <div className='bad' hidden={!isBadAnswer} >{props.textGame.BadAnswer[props.lang]}<div className='imgWrong'></div></div>

             <Button className='Question' hidden={isButtonHidden} onClick={rotate} /> 
             <Button className='btYes' onClick={() => handleAnswer('yes')} value={props.textGame.Yes[props.lang]} hidden={hiddenYesNo} /> 
             <Button className='btNo' onClick={() => handleAnswer('no')} value={props.textGame.No[props.lang]} hidden={hiddenYesNo} />

             <div className='AnswerPlace' hidden={hiddenAnswer}>{props.gameWords[numWord].words[props.lang]}  </div>
             <div className='AnswerHidden' hidden={!hiddenAnswer} ></div>

             <div className='GamePrev' onClick={() => props.onClick('prev')} hidden={props.hiddenPrev} > </div>

        </div>
    );
    };

export default GamePage;