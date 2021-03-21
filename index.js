// for all routes refer routes
// for all controllers refer controllers

const express = require('express')
const db = require('./config/mongoose')
const app = express()

//for layout inheritance in other views files
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
// for express-layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// for static files
app.use(express.static('static'))


app.use(express.urlencoded())
app.use('/', require('./routes'))

// view engine for ejs
app.set('view engine', 'ejs')
app.set('views', './views')


app.listen(8000, (err) => {
    if(err){
        console.log('Error in listening to server 8000');
    }
    console.log('server running on port 8000');
})
