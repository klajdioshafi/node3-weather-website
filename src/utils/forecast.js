const request = require('request');
// lat : 41.3287
// lon : 19.4494
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=000467fba198d1f19e53cefb312ba767`;

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(body.cod){
            callback(body.message, undefined);
        }else {
            const date = new Date();
            const forecast = {
                rainPercentage: (body.daily[date.getDay()].rain) * 100,
                summary: body.current.weather[0].main,
                feelsLike: parseInt(body.current.feels_like) - 273,
                temperature: parseInt(body.current.temp) - 273
            }
            callback(undefined, {
                temperature: parseInt(body.current.temp) - 273,
                message: `${forecast.summary}. It is currently ${forecast.temperature} celcius degrees out, but feels like ${forecast.feelsLike}. There is a ${forecast.rainPercentage ? forecast.rainPercentage : '0'}% chance of rain.`
            });
        }
    });
};

module.exports = forecast; 