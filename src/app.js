const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000 // 3000 is for localhost

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(path.join(__dirname, '../public/help.html'))


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static(path.join(__dirname, '../public/about.html'))) /*
app.use(express.static(path.join(__dirname, '../public/help.html')) */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gearoid O Ceallachain'
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address',
        
        })    
    }
            geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
                if (error) {
                    return res.send({ error }) // just got rid of the '' and text
                }
            forecast(latitude, longitude, (error, forecastData) => { //error had req.query infront of lat and long
                    if (error) {
                        return res.send({  error  })
                    } 
            
     
    console.log(req.query.address)
    res.send({
            location, //error here. was Location: req.query.longitude, 
            forecast: forecastData, // Error had req.query.forcastData
            address: req.query.address
            })
        })
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gearoid O Ceallachain yeah'
    })
})

app.get('/help', (req,res ) => {
    res.render('help', {
        title: 'HELP',
        helpText: 'Gearoid Im here to help',
        name: 'Gearoid O Ceallachain'

    }  )
})

app.get('/products',(req,res) => {
   // console.log(req.query.search) to see it work
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gearoid MK OCeallachain',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gearoid MK OCeallachain',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port) // see line 12 for heroku and localhost
})