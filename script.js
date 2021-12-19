//http://api.openweathermap.org/data/2.5/weather?q=medan&units=metric&appid=681f35b64d6e9f95a76677364a4f78b0

const url = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=681f35b64d6e9f95a76677364a4f78b0`;

const translate = (word) => `https://scxonez-api.herokuapp.com/api/other/translate?kata=${word}&apikey=Alphabot`;

const getData = (url) => {
  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);
};

const body = document.querySelector('body');
const input = document.querySelector('.input input');
const img = document.querySelectorAll('.deg img');
const deg = document.querySelector('.deg-value');
const status = document.querySelector('.status p');

input.addEventListener('change', async () => {
  const data = await getData(url(input.value));
  const translated = await getData(translate(data.weather[0].description));
  const currentDeg = data.main.temp;
  console.log(data);
  console.log(currentDeg);
  console.log(translated);
  img.forEach((img) => {
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  });
  deg.textContent = data.main.temp + '°C';
  status.innerHTML = translated.result.text.toUpperCase();
  
  if(currentDeg >= 30){
    body.backgroundColor = 'red';
  }else if(currentDeg < 30){
    body.backgroundColor = 'green';
  }else if(currentDeg < 25 && currentDeg >= 20){
    body.backgroundColor = 'salmon';
  }else if(currentDeg < 20 && currentDeg <= 10){
    body.backgroundColor = 'magenta';
  }else if(currentDeg < 10){
    body.backgroundColor = 'orange';
  }
  
});