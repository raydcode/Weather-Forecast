const api = {
  key: '08e4e841fe07905b4786fe395836f27a',
  url: 'https://api.openweathermap.org/data/2.5/',
};

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const mainContainer = document.querySelector('.main-container');

search.addEventListener('input', () => {
  if (search.value.length > 0) {
    const error = document.querySelector('.error');
    error.innerHTML = '';
  }
});


const displayWeather = (data) => {
    console.log(data);
    if(data.cod == 404){
        const error = document.querySelector('.error');
        error.innerHTML = data.message;
        search.value = ''
    }else{

        const city = document.querySelector('.city');
        city.innerHTML = `${data.name},${data.sys.country}`
        
        const today = new Date();
        const date = document.querySelector('.date');
        date.innerHTML = formatDate(today);

        const temp = document.querySelector('.temp');
        temp.innerHTML = `Temp: ${Math.round(data.main.temp)} °C`;

        const weather = document.querySelector('.weather');
        weather.innerHTML = `Weather ${data.weather[0].main}`;

        if (data.weather[0].main == 'Clouds'){
          const clouds = `url(./images/clouds.jpg) no-repeat center`;
          mainContainer.style.background = clouds;
          mainContainer.style.backgroundSize = 'cover';
        }

        if(data.weather[0].main == 'Clear'){
          const clear = `url(./images/other.jpg) no-repeat center`;
          mainContainer.style.background = clear;
          mainContainer.style.backgroundSize = 'cover';
        }

        if(data.weather[0].main == 'Mist'){
          const clear = `url(./images/mist.jpg) no-repeat center`;
          mainContainer.style.background = clear;
          mainContainer.style.backgroundSize = 'cover';
         
        }
        

        const tempRange = document.querySelector('.temp-range');
        tempRange.innerHTML = `Temp Range : ${Math.round(data.main.feels_like)}°C / ${Math.round(data.main.temp_max)}°C`
         
        search.value = ''
    }
}



const getWeatherData = () => {
  if (search.value.length == 0) {
    const error = document.querySelector('.error');
    error.innerHTML = 'Please enter a city name';
  } else {
    fetch(`${api.url}weather?q=${search.value}&units=metric&appid=${api.key}`).then(response => {
      return response.json()
    }).then(data => displayWeather(data))
  }
};

btn.addEventListener('click', getWeatherData);



const formatDate =(today)=>{
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June","July","Aug","Sept","Oct","Nov","Dec"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day}, ${date} ${month} ${year}`

}