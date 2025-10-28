const OPENWEATHER_KEY = "6333481779b980e46c4c3909774aadc1";

const url = 'https://api.openweathermap.org/data/2.5/';
const searchBar = document.getElementById('searchBar');

const setQuery = (e) => {
    if (e.keyCode == 13) {
        const city = searchBar.value.trim();
        if (!city) {
            alert("Lütfen şehir adı girin.");
            return;
        }
        getResult(city);
    }
}

const getResult = (cityName) => {
    const query = `${url}weather?q=${encodeURIComponent(cityName)}&appid=${OPENWEATHER_KEY}&units=metric&lang=tr`;

    fetch(query)
    .then(response => response.json())
    .then(displayResult)
    .catch(err => {
        console.error("Fetch hatası:", err);
        alert("API çağrısında bir hata oluştu. Konsolu kontrol et.");
    });
}

const displayResult = (result) => {
    // API hatalarını düzgün yakala
    if (!result) {
        alert("Boş cevap alındı.");
        return;
    }
    if (result.cod && result.cod !== 200) {
        // OpenWeather genelde cod ve message döner (ör. 401, 404)
        alert(`Hata ${result.cod}: ${result.message || "Bilinmeyen hata"}`);
        return;
    }

    document.querySelector('.city').innerText = `${result.name}, ${result.sys.country}`;
    document.querySelector('.temp').innerText = `${Math.round(result.main.temp)}°C`;
    document.querySelector('.desc').innerText = result.weather[0].description;
    document.querySelector('.minmax').innerText = `${Math.round(result.main.temp_min)}°C/${Math.round(result.main.temp_max)}°C`;
}

searchBar.addEventListener('keypress', setQuery);
