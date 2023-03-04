
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=8769a95c20f3f62c023cf6bdd1b2f725';

    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {

            throw new Error(`Coold not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };
    
    // метод получения всех персонажей
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

// метод получения конкретного персонажа по id
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    
// метод получения данных, который будет возвращать уже трансформированный объект
    _transformCharacter = (character) => {
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
}

export default MarvelService;