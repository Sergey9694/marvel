import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService(); //  создаем новое свойство внутри RandomChar

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    //  Метод обновляет state персонажа
    const onCharLoaded = (character) => {
        setLoading(false);
        setCharacter(character);
    }
    // Метод запускает спиннер при обновлении персонажа по нажатию кнопки
    const onCharLoading = () => {
        setLoading(true);
    }

    // Метод обработки ошибок
    const onError = () => {
        setError(true);
        setLoading(false);
    }

    //  Метод обращается к серверу, получает данные и записывает в state
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading(); // запускает спинер перед запросом к базе данных
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }
 
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View character={character}/> : null;

// Часть компонента, отвечающая за логику в компоненте
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}


// Часть компонента, отвечающая за отображение в интерфейсе
const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = {'objectFit' : 'contain'}
    } 

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{description}</p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
