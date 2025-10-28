const url = 'https://api.openweathermap.org/data/2.5/';
const searchBar = document.getElementById('searchBar');

const setQuery = (e) => {
    if(e.keyCode == 13){
        getResult(searchBar.value)
    }
}

const getResult = (cityName) => {
    // OPENWEATHER_KEY artık global değişken olarak var
    let query = `${url}weather?q=${cityName}&appid=${OPENWEATHER_KEY}&units=metric&lang=tr`;

    fetch(query)
    .then(weather => weather.json())
    .then(displayResult)
    .catch(err => {
        console.log(err);
        alert("API çağrısında hata oluştu!");
    });
}

const displayResult = (result) => {
    if (!result || result.cod !== 200) {
        alert(`Hata: ${result.message || "Şehir bulunamadı"}`);
        return;
    }

    document.querySelector('.city').innerText = `${result.name}, ${result.sys.country}`;
    document.querySelector('.temp').innerText = `${Math.round(result.main.temp)}°C`;
    document.querySelector('.desc').innerText = result.weather[0].description;
    document.querySelector('.minmax').innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;
}

searchBar.addEventListener('keypress', setQuery);
