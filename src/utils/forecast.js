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
            const rainPercentage = (body.daily[date.getDay()].rain) * 100;
            callback(undefined, {
                temperature: parseInt(body.current.temp) - 273,
                message: `It is currently ${parseInt(body.current.temp) - 273} celcius degrees out. There is a ${rainPercentage ? rainPercentage : '0'}% chance of rain.`
            });
        }
    });
};

module.exports = forecast; 