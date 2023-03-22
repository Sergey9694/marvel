import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
        //Достаем данные из useHttp
        const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=8769a95c20f3f62c023cf6bdd1b2f725';
    const _baseOffsetCharacters = 210;
    
    // метод получения всех персонажей
    const getAllCharacters = async (offset = _baseOffsetCharacters) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

// метод получения конкретного персонажа по id
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

// метод получения конкретного комикса по id
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

// метод получения списка комиксов
    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
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
// метод получения данных для комиксов, который будет возвращать уже трансформированный объект
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount 
                        ? `${comics.pageCount} p.`
                        : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language,
            price: comics.prices[0].price 
                    ? `${comics.prices[0].price}$`
                    : 'not available'
        }
    }
    // Возвращаем нужные сущности из функции useMarvelService
    return {
        loading, 
        error,
        getAllCharacters, 
        getCharacter, 
        clearError,
        getAllComics, 
        getComic 
    }
}

export default useMarvelService;