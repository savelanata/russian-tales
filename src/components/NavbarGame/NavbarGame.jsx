import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';

const NavbarGame = (props) => {
        const cont = (
            <div>

                <Text className='GameTitle' value={props.topMenu.GameTitle[props.lang]} /> 
                <Button className={(props.lang === 'rus') ? 'NavbarFi' : 'NavbarFi ActiveFi'} onClick={() => props.onClick('fin')} value={props.topMenu.NavbarFi[props.lang]} />
                <Button className={(props.lang === 'rus') ? 'NavbarRu ActiveRu' : 'NavbarRu'} onClick={() => props.onClick('rus')} value={props.topMenu.NavbarRu[props.lang]} /> 
                <Button className = 'NavbarClose' onClick = {() => props.onClick('toStart')} value = {props.topMenu.NavbarClose.fin} /> 
                <Button className = 'NavbarInfo' onClick = {() => props.onClick('info')} value = {props.topMenu.NavbarInfo.fin} /> 
            </div>
        );
    return (
        <div>
           {cont}
        </div>
    );
    };

export default NavbarGame;