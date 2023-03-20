import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
        //Достаем данные из useHttp
        const {loading, request, error} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=8769a95c20f3f62c023cf6bdd1b2f725';
    const _baseOffsetCharacters = 210;
    
    // метод получения всех персонажей
    const getAllCharacters = async (offset = _baseOffsetCharacters) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

// метод получения конкретного персонажа по id
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    
// метод получения данных, который будет возвращать уже трансформированный объект
    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 130)}...` : 'There is currently no character description.',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
    // Возвращаем нужные сущности из функции useMarvelService
    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;