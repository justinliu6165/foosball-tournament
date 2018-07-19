const express = require('express');
const app = express();
const teams = require('./backend-data.js')

app.get('/', (req,res)=>res.send('hello'));

app.get('/country/teams', (req,res)=>{
    res.send(teams);
})

const port = process.env.PORT || 3001;

app.listen(port, ()=> console.log('Server is listening'))