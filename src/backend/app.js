const express = require('express');
const app = express();
const Teams = require('./backend-data.js');


app.get('/rest/country/teams', (req,res)=>{
    res.send(Teams);
})

const port = process.env.PORT || 3001;

app.listen(port, ()=> console.log('Server is listening'))