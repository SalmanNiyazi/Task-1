const express = require('express')
const app = express()
const http = require('http');
const { send } = require('process');

//app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })


//get a single object as a response
app.get('/user',(req,res) => {
    console.log('starting api..')
    console.log(req.body);
    res.json({
        Name: 'ABCD',
        Gender: 'Male',
        Number: 2
    })
})

app.get('/user/:uid',authenticator,(req,res) => {
    console.log(req.params.uid)
    res.json({
        Name: 'ABCD',
        Gender: 'Male',
        Number: 2,
        uid: req.params.uid
    })
})
//get an array of objects as response
app.get('/info/array',(req,res) => {
    res.json([{
       Name: 'John',
        Gender: 'Male',
        Number: 3
    },
    {
        Name: 'Anne',
        Gender: 'Female',
        Number: 4
    }])
})

function sum(num1,num2){
    return Number(num1)+Number(num2);
}
//Post api to get a sum of two numbers
app.post('/sum',logger,(req,res) => {
    let add = sum(req.body.num1, req.body.num3);    
    res.send({
        result: add
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`This app is running on port ${port}`)
})

function logger(req,res,next){
    req.body.num3 = 0
    console.log(req.body);
    next();
}

function authenticator(req,res,next){
    if(req.params.uid != 1){
        res.sendStatus(401);
    }
    else{
    next();
    }
}