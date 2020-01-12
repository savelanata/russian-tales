import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';

const InfoPage = (props) => {

    return (
        <div>
            <img src={props.src} className='smallBg' alt=' ' />
            <Text className='HowToPlay' value={props.textGame.HowToPlay[props.lang]} />
            <Text className='HowToPlayText' value={props.textGame.HowToPlayText[props.lang]} />
            <Button className='Continue' onClick={() => props.onClick('continue')} value={props.textGame.Continue[props.lang]} />
                
        </div>
    );
    };

export default InfoPage;
