import React, { useState } from 'react';
import './App.css';
import textContents from './data/dataInterface';
import Loader from './components/Loader/Loader';
import StartPage from './components/StartPage/StartPage';
import NavbarGame from './components/NavbarGame/NavbarGame';
import InfoPage from './components/InfoPage/InfoPage';
import FinishGame from './components/FinishGame/FinishGame';
import GamePage from './components/GamePage/GamePage';
import ShowPage from './components/ShowPage/ShowPage';
import { setTimeout } from 'timers';

let imagesName = []; 	//массив названий картинок порядок игры
let imagesArr = {}; 	//массив с картинками, ключ - название картинки
let suffleName = []; 	//массив названий картинок для перемешивания
let langv = 'rus';		//установка языка игры по умолчанию
let isLoad = false;		//признак загрузки контента
let num = 0;
let gameWords = []; //слова, которые будут расположены на текущем экране
let selectedWord = '';


//создание массива всех слов игры без текущего слова
function allWords(content, id, callback) {
    shuffle(suffleName);  //перемешиваем массив  слов
    selectedWord = content[id];
    gameWords = [];
    let rightPlace = Math.floor(Math.random() * 4);
    let j = 0;
    for (let i = 0; i < 4; i++) {
        if (i === rightPlace) {
            gameWords.push({
                id: i,
                words: selectedWord,
                fake: false
            });
        }
        else {
            if (id === suffleName[j]) j++;
            gameWords.push({
                id: i,
                words: content[suffleName[j]],
                fake: true
            });
            j++;
        };
    }
    callback();
   };


function GameContent(content, callback) {	 	//загрузка контента
    imagesName = Object.keys(content);
    suffleName = Object.keys(content);
    for (let id of imagesName) {                 //чтение в кэш картинок контента, ключ - название картинки

        let urlFile = process.env.PUBLIC_URL + '/content/' + id + '.png';
        imagesArr[id] = new Image(550, 315);
        imagesArr[id].src = urlFile;
    };
    imagesArr['bgStart'] = new Image(695, 594);
    imagesArr['bgStart'].src = process.env.PUBLIC_URL + '/interface/backgroundStart.png';
    imagesArr['bgInfo'] = new Image(695, 594);
    imagesArr['bgInfo'].src = process.env.PUBLIC_URL + '/interface/backgroundInfo.png';
    imagesArr['bgFinish'] = new Image(695, 594);
    imagesArr['bgFinish'].src = process.env.PUBLIC_URL + '/interface/backgroundFinish.png';
    imagesArr['bgGame'] = new Image(695, 594);
    imagesArr['bgGame'].src = process.env.PUBLIC_URL + '/interface/backgroundGame.png';

    shuffle(imagesName);  //перемешиваем массив слов-картинок, в этом порядке будет идти текущая игра


    callback();
};

function readData() { //чтение данных 
    let address = window.top.document.location.href; //определение языка на котором находится игра
    if (address.indexOf('/fi/') > 0) langv = 'fin';

    GameContent(textContents.content, function () { isLoad = true; });

};

readData();

//Функции перемешивания масива

//вспомогательная функция
function putToCache(elem, cache) {
    if (cache.indexOf(elem) !== -1) {
        return;
    }
    var i = Math.floor(Math.random() * (cache.length + 1));
    cache.splice(i, 0, elem);
}
//функция, возвращающая свеженький, девственный компаратор
function madness() {
    var cache = [];
    return function (a, b) {
        putToCache(a, cache);
        putToCache(b, cache);
        return cache.indexOf(b) - cache.indexOf(a);
    };
}
//собственно функция перемешивания
function shuffle(arr) {
    var compare = madness();
    return arr.sort(compare);
};


function App() {
    const [isLoading, setIsLoading] = useState(false);  //окно1, признак загрузки контента
    const [isStart, setIsStart] = useState(false);      //окно2, начало игры с нуля, выбор языка
    const [isInfo, setIsInfo] = useState(false);        //окно3, инструкция к игре
    const [isNavbar, setIsNavbar] = useState(false);	//окно4, верхнее меню
    const [isGame, setIsGame] = useState(false);		//окно5, игра 
    const [isShow, setIsShow] = useState(false);		//окно6, просмотр сделанного 
    const [isFinish, setIsFinish] = useState(false);	//окно7, конец игры

    const [lang, setLang] = useState(langv);			//текщий язык
    const [step, setStep] = useState(0);				//текущий шаг
    const [okStep, setOkStep] = useState(-1);            //номер последнего сделанного задания
    const [imgId, setImgId] = useState(1);
    const [curWords, setCurWords] = useState('');			//текущее слово

    const [disabledPrev, setDisabledPrev] = useState(true);  // стрелка назад отключена

    const preloadTime = (() => {
 
        for (let i = 0; i < 4; i++) {
            if (num > 0) break;
            if (isLoad && num === 0) {
                setIsLoading(isLoad);
                setImgId(imagesName[0]);
                setIsStart(true);
                setStep(0);
                allWords(textContents.content, imagesName[0], function () { setCurWords(gameWords); });
                num++;
                break;
            }
            setTimeout(setIsLoading, 2000, isLoad);
        }
    });

        setTimeout(preloadTime, 3000);
 

    const handleComponent = ((pri) => {
        if (pri === 'rus' && lang === 'fin') { 		//смена языка на русский
            setLang('rus');
            langv = lang;
        };
        if (pri === 'fin' && lang === 'rus') {		//смена языка на финский
            setLang('fin');
            langv = lang;
        };
        if (pri === 'start') {	//уход со стартовой страницы
            setIsStart(false);
            setIsInfo(true);
            setIsNavbar(true);
            setStep(0);
            setOkStep(-1);
            setDisabledPrev(true);
        };
        
         if (pri === 'continue') {	//уход со страницы Инфо
             setIsInfo(false);
             if (okStep >= step) setIsShow(true);
                else setIsGame(true);
        };
        if (pri === 'info') {		//нажатие кнопки ?
            setIsInfo(true);
            setIsGame(false);
            setIsShow(false);

        }; 
        if (pri === 'toStart') {	//нажатие кнопки Х - идет на стартовую стр
            shuffle(imagesName);
            allWords(textContents.content, imagesName[0], function () { setCurWords(gameWords); });
            setIsStart(true);
            setIsGame(false);
            setIsShow(false);
            setIsInfo(false);
            setIsNavbar(false);
            setIsFinish(false);
            setDisabledPrev(true);
            setImgId(imagesName[0]);
            setStep(0);
        }
       
        if (pri === 'prev') {		//нажата кнопка prev
            if (okStep < 0) {
                setDisabledPrev(true);
            }
            else {
                setStep(step - 1);
                setImgId(imagesName[step - 1]);
                if (step === 1) setDisabledPrev(true);
                setIsShow(true);
                setIsGame(false);
             }; 
        }; 
        if (pri === 'answer') {		//проверка ответа
            setOkStep(step);
            if (step === (imagesName.length - 1)) {
                setIsFinish(true);
                setIsGame(false);
            }
            else {
                setStep(step + 1);
                setImgId(imagesName[step + 1]);
                allWords(textContents.content, imagesName[step + 1], function () { setCurWords(gameWords); });
                setDisabledPrev(false);
            }

        }
        if (pri === 'next') {		//переход к следующему слову
            if (step === (imagesName.length - 1)) {
                setIsFinish(true);
                setIsGame(false);
            }
            else {
                setStep(step + 1);
                setImgId(imagesName[step + 1]);
                setDisabledPrev(false);
                if (isShow && (okStep === step)) {
                        setIsShow(false);
                        setIsGame(true);
                    allWords(textContents.content, imagesName[step + 1], function () { setCurWords(gameWords); });
                }
               
            }
        }
    });


  return (
      <div className='App'>
          {!isLoading ? <Loader /> : null}
          {isStart ? (<StartPage lang={lang} onClick={(pri) => handleComponent(pri)} startPage={textContents.startPage} src={imagesArr['bgStart'].src} />) : null}
          {isNavbar ? <NavbarGame lang={lang} onClick={(pri) => handleComponent(pri)} topMenu={textContents.topMenu}  /> : null}
          {isInfo ? <InfoPage lang={lang} onClick={(pri) => handleComponent(pri)} textGame={textContents.textGame} src={imagesArr['bgInfo'].src} /> : null}
          {isFinish ? <FinishGame lang={lang} onClick={(pri) => handleComponent(pri)} textGame={textContents.textGame} src={imagesArr['bgFinish'].src} /> : null}
          {isGame ? <GamePage step={step} onClick={(pri) => handleComponent(pri)} gameWords={curWords} lang={lang} src={imagesArr[imgId].src} bgSrc={imagesArr['bgGame'].src} textGame={textContents.textGame} hiddenPrev={disabledPrev} /> : null}
          {isShow ? <ShowPage step={step} onClick={(pri) => handleComponent(pri)} gameWord={textContents.content[imgId][lang]} lang={lang} src={imagesArr[imgId].src} bgSrc={imagesArr['bgGame'].src} textGame={textContents.textGame} hiddenPrev={disabledPrev} /> : null}

       </div>

  );
}

export default App;