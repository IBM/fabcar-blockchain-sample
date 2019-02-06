const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.get('/enrollAdmin', (req, res) => {
  network.enrollAdmin()
    .then((response) => {
        //return error if error in response          
        res.send(response)
      });
})

app.get('/registerUser', (req, res) => {
  network.registerUser()
    .then((response) => {
        //return error if error in response          
        res.send(response)
      });
})

app.get('/queryAllCars', (req, res) => {
  network.queryAllCars()
    .then((response) => {      
        //console.log('response');
        //console.log(response);
        var carsRecord = JSON.parse(response);
        //console.log('jsonRespone');
        //console.log(jsonRespone);
      
        //return error if error in response          
        res.send(carsRecord)
      });
})

app.post('/createCar', (req, res) => {

  console.log('Create Car');
  console.log('req.body');
  console.log(req.body);
  
  network.queryAllCars()
    .then((response) => {
      var carsRecord = JSON.parse(JSON.parse(response));
      
      var numCars = carsRecord.length;
      var newKey = 'CAR' + numCars;
      console.log('newKey')
      console.log(newKey);        
      
      network.createCar(newKey, req.body.make, req.body.model, req.body.color, req.body.owner)
      .then((response) => {
        res.send(response)
      })
    })
    
})


app.post('/changeCarOwner', (req, res) => {

  console.log('Change Car Owner');
  console.log('req.body');
  console.log(req.body);

  network.changeCarOwner(req.body.key, req.body.newOwner)
      .then((response) => {
        res.send(response)
      })

  
})

app.listen(process.env.PORT || 8081)