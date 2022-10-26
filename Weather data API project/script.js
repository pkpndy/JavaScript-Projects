
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};



let getWeatherData =(city) => {
  const URL = "https://open-weather13.p.rapidapi.com/city/";

  const finalURL = `${URL}${city}`;
  

  const weatherPromise=fetch(`${finalURL}`, options);
  return weatherPromise.then((response) => {
    return response.json();
  })
}

const showWeatherData = (weatherData) => {

  document.getElementById('city-name').innerText=weatherData.name;
  document.getElementById('weather-type').innerText=weatherData.weather[0].main;
  document.getElementById('temp').innerText=weatherData.main.temp;
  document.getElementById('min-temp').innerText=weatherData.main.temp_min;
  document.getElementById('max-temp').innerText= weatherData.main.temp_max;
  
}


const searchCity =() => {
  const city = document.getElementById('city-input').value;
  getWeatherData(city).then((res)=>{
    showWeatherData(res);
  }).catch((err) => {
    console.log(err);
    console.log("problem occured");
  })
  
}


