const elements = {
    searchForm: document.querySelector('.js-search-form'),
    list: document.querySelector('.js-list')
}

elements.searchForm.addEventListener('submit', handlerSearch);
function handlerSearch(evt) {
    evt.preventDefault();
    const {city, days} = evt.currentTarget.elements;

    serviceWeather(city.value, days.value)
    .then(data =>   elements.list.innerHTML = createMarkup(data.forecast.forecastday))
    .catch(error => console.log(error))
}

function serviceWeather(city,days) {

        BASE_URL = 'http://api.weatherapi.com/v1';
        END_POINT = '/forecast.json';
        API_KEY =  'da878f99bf3c4ab7b9e94719230409';

        const params = new URLSearchParams ({

             key: API_KEY,
             q: city,
             days: days,
             lang: 'uk'
        });

        return fetch(`${BASE_URL}${END_POINT}?${params}`)
        .then((resp) => {

            if (!resp.ok) {
                throw new Error(resp.statusText); 
            }
            return resp.json();
        })
    }

function createMarkup(arr) {
    return arr.map(({ date, day: {avgtemp_c, condition: {icon, text}}}) =>`<li class='weather-card'>
    <img  src="${icon}" alt="${text}" class='weather-icon'>
    <h2 class='text'>${date}</h2>
    <h3 class='weather-text'>${text}</h3>
    <h3 class='text-temp'>${avgtemp_c}°C</h3>
</li>`).join('')
}

