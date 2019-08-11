const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getGeoLocation = require('./utils/geoLocation');
const getForcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3009;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bhagyashri'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Bhagyashri'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'In case of issue please contact kulkarnibj@gmail.com',
    name: 'Bhagyashri'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if(!address) {
    return res.send({
      error: 'You must provide address'
    });
  }
  getGeoLocation(address, (error, geoCode) => {
    if(error) {
      return res.send({error});
    }
    if(geoCode) {
      getForcast(geoCode, (error, forcast) => {
        if (error) {
          return res.send({error});
        }
        return res.send({
          location: geoCode.location,
          forcast,
          address
        })
      });
    }
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }
  return res.send({"products": []})
})

app.get('/help/*', (req, res) => {
  res.render('error', {error: 'Help article not found', name: 'Bhagyashri'})
});

app.get('*', (req, res) => {
  res.render('error', {error: 'Page not found', name: 'Bhagyashri'})
});

app.listen(port, () => {
  console.log('Server is up on port', port);
});