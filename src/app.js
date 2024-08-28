const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // setup hbs as the view engine
app.set('views', viewsDirectoryPath); // setup views directory path
hbs.registerPartials(partialsDirectoryPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => res.render('index', {
    title: 'Weather App | HomePage',
    name: 'Amit Kumar',
    footerTitle: 'Footer Title'
}));

app.get('/about', (req, res) => res.render('about', {
    title: 'About Me',
    name: 'Amit Kumar',
    footerTitle: 'Footer Title'
}));

app.get('/help', (req, res) => res.render('help', {
    title: 'Help Page',
    message: 'This is a message on the message page',
    name: 'Amit Kumar',
    footerTitle: 'Footer Title'
}));

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({
        error: 'You must provide the address'
    });

    res.send({
        forecast: 'Dummy Forecast',
        location: 'Dummy Location',
        address: req.query.address
    });

    // geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return res.send({ error });
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send({ error });
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         });
    //     });
    // });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => res.render('404', {
    title: 'help 404 Page',
    errorMessage: 'Requested help article not found',
    footerTitle: 'Footer Title'
}));

app.get('*', (req, res) => res.render('404', {
    title: '404 Page',
    errorMessage: 'Generic 404 page',
    footerTitle: 'Footer Title'
}));


// app.get('', (req, res) => {
//     res.send('Hello Express');
// });


app.listen(10000, () => {
    console.log('The server is running on port 10000');
});