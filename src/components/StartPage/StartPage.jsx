import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import './StartPage.css';

const StartPage = (props) => {
        const cont = (
            <div>
                <img src={props.src} className='bigBg' alt=' ' />
                <div className={(props.lang === 'fin') ? 'NameStartFin' : 'NameStartRus'} > </div>
                <Text className='Welcome' value={props.startPage.Welcome[props.lang]} />
                <Button className={props.lang === 'rus' ? 'Finland' : 'Finland ActiveLang'} onClick={() => props.onClick('fin')} value={props.startPage.Finland[props.lang]} />
                <Button className={props.lang === 'rus' ? 'Russia ActiveLang' : 'Russia'} onClick={() => props.onClick('rus')} value={props.startPage.Russia[props.lang]} />
                <Button className='Start' onClick={() => props.onClick('start')} value={props.startPage.Start[props.lang]} /> 
            </div>
        );
    return (
        <div>
           {cont}
        </div>
    );
    };

export default StartPage;