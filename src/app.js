const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Klajdi Oshafi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Klajdi Oshafi'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I am here to help you.',
        title: 'Help',
        name: 'Klajdi Oshafi'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'You must provide an address!'
        });
    }else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if(error){
                return res.send({
                    error: error
                });
            }
            forecast(latitude, longitude, (error, { message } = {}) => {
                if(error){
                    return res.send({
                        error: error
                    });
                }
                
                res.send({
                    location: location,
                    address: address,
                    message: message
                });
            });
        });
    }
}); 

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found!',
        title: '404 Page',
        name: 'Klajdi Oshafi' 
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found!',
        title: '404 Page',
        name: 'Klajdi Oshafi'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});