
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
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }
// метод получения конкретного персонажа по id
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res);
    }
// метод получения данных, который будет возвращать уже трансформированный объект
    _transformCharacter = (res) => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url
        }
    }
}

export default MarvelService;