const path = require('path')
const hbs = require('hbs')
const express = require('express')
const { ESRCH } = require('constants')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')


//set up the view enginer and its location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up a static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render("index", {
        title: 'Weather',
        name: 'Ahmad Bader'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'About', 
        name: 'Ahmad Bader'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help", 
        message: 'This is a help message', 
        name: 'Ahmad Bader'
    })
})

app.get('/weather', ({query}, res) => {

    if(!query.address){
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(query.address, (error, {latitude, longitude,location} = {}) => {
        if(error){
             return res.send( { error } )
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send( { error} )
            }

            res.send({
                forecast: forecastData, 
                location,
                address: query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Must provide a serach term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        errorMessage: 'The artcles you are looking for.'
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        errorMessage: 'The page you are looking for was not found.'
    })
})


app.listen(port, () => {
    console.log("Server is runnig on port " + port)
})