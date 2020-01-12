import React from 'react';
import Text from '../Text/Text';
import '../GamePage/GamePage.css';

const ShowPage = (props) => {
     return (
       <div>
             <img src={props.bgSrc} className='smallBg' alt=' ' />
             <Text className='GameName' value={props.textGame.GameName[props.lang]} />
             <Text className='GameQuestion' value={props.textGame.GameQuestion[props.lang]} />

             <div className='Card1' > <img src={props.src} className='gameImg' alt=' ' /></div>
             <div className='Card4'  >   </div>

             <div className='AnswerPlace'>{props.gameWord}  </div>

             <div className='GamePrev' onClick={() => props.onClick('prev')} hidden={props.hiddenPrev} > </div>
             <div className='GameNext' onClick={() => props.onClick('next')}  > </div>
        </div>
    );
    };

export default ShowPage;