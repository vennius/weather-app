const url = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=681f35b64d6e9f95a76677364a4f78b0`;
//const translate = (word) => `https://scxonez-api.herokuapp.com/api/other/translate?kata=${word}&apikey=Alphabot`;

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
let currentDeg = 0;

//Default
def();

input.addEventListener('change', async () => {
  const data = await getData(url(input.value));
  //const translated = await getData(translate(data.weather[0].description));
  currentDeg = parseInt(data.main.temp);
  img.forEach((img) => {
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  });
  deg.textContent = data.main.temp + '°C';
  status.innerHTML = data.weather[0].description.toUpperCase();
  systemColor();
});

async function def(){
  const data = await getData(url('Medan'));
  const translated = await getData(translate(data.weather[0].description));
  currentDeg = parseInt(data.main.temp);
  img.forEach((img) => {
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  });
  deg.textContent = data.main.temp + '°C';
  status.innerHTML = translated.result.text.toUpperCase();
  systemColor();
  input.value = 'Medan';
}

function systemColor(){
  if(currentDeg > 30){
     body.style.backgroundColor = 'salmon';
   }else if(currentDeg > 25){
     document.body.style.backgroundColor = '#72faa6';
   }else if(currentDeg > 20){
     document.body.style.backgroundColor = '#89effc';
   }else if(currentDeg > 10){
     document.body.style.backgroundColor = '#ebe19c';
   }else if(currentDeg > 0){
     document.body.style.backgroundColor = '#cef4ff';
   }else if(currentDeg < 0){
     document.body.style.backgroundColor = '#7d7d7d';
}
}