const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// to setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Ankit Mishra'
    })
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title:'About',
        name:'Ankit Mishra'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        name:'Ankit Mishra',
        msg:'Help Help Help ........'
    })
})



app.get('', (req, res) => {
    res.send('<h1> Express </h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address not given"
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
        if(error){
                res.send({
                    error
                })
        }

        res.send({
            location,
            forecast:forecastData,
            address:req.query.address
        })

        })
    })

    // res.send({
    //     address:req.query.address,
    //     location:"New Delhi",
    //     forecast:"Rainy"
    // })
})

app.get('/products', (req,res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title:"404",
        name:"Ankit",
        errorMsg: "Help Article Not Found"
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title:"404",
        name:"Ankit",
        errorMsg: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})
