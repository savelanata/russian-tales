import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import '../GamePage/GamePage.css';

const SentencePage = (props) => {
 
    return(
        <div>
            <img src={props.bgSrc} className='bgGame' alt=' ' />
            <img src={props.src} className='gameImg' alt=' ' />

            <Text className='GameQuestion' value={props.textGame.GameQuestion[props.lang]} />
            <Text className='GameInfo' value={props.textGame.GameInfo[props.lang]} />
            <div className='Answer'>{props.curWord}</div>

            <Button className='GameNext' onClick={() => props.onClick('next')} />
            <Button className='GamePrev' onClick={() => props.onClick('prev')} hidden={(props.step === 0) ? true : false} /> 
		</div>  
    );
};
export default SentencePage;