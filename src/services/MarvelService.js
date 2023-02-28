
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
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    }
}

export default MarvelService;