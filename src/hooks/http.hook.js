import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // функция запроса на сервер
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        //загрузка в true
        setLoading(true); 
        // fetch на сервер
        try {
            // отправили запрос -> ответ помещается в response. ответ - промис
            const response = await fetch(url, {method, body, headers}); 
            // проверяем ответ(response) на свойство ok
            if (!response.ok) {
                throw new Error(`Coold not fetch ${url}, status: ${response.status}`);
            }
            // получаем данные
            const data = await response.json();
            // если данные загрузились, ставим загрузку в false
            setLoading(false); 
            //Если все норм то вернутся данные от сервера (чистые данные без трансформации, те что в API)
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message); // в стейте error появится сообщение об ошибке
            throw e; // выкидываем ошибку из catch
        }
    }, [])

    // функция очистки ошибок
    const clearError = useCallback(() => setError(null), []);
    // возвращаем объект со стейтами
    return {loading, request, error, clearError}
}