const express = require('express');
const http = require('http');
const cors = require('cors');
const prompt = require('prompt-sync')();
const { parse } = require('path');
const { SlowBuffer } = require('buffer');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.all('/test', (req, res) => {
  res.status(200).json({ message: 'OK'});
});

//sum

app.post('/sum', (req, res, next) => {
  let body = req.body;
  let sum = parseInt(body['firstNumber']) + parseInt(body['secondNumber']); // преобразовываем числа в целочисленный тип и складываем

  res.status(200).json({ sum });

  console.log(sum);

  next();

});

//reverseCase

app.post('/reverseCase', (req, res, next) => {
  let body = req.body;
  let line = body['string'];

  function reverseCase(){

    let string = "";

    for (let i = 0; i < line.length; i++) {
        symbol = line[i].toLowerCase()

        if(line[i] === symbol){
          string += line[i].toUpperCase();
        }
        else {
          string += line[i].toLowerCase();
        }
    }

    return string

  }

  result = reverseCase();

  res.status(200).json({ result });

  console.log(result);

  next();

});

//reverseArray

app.post('/reverseArray', (req, res, next) => {
  let body = req.body;
  let arr = body['array'];

  function reverseArray(){
    let x;

    for (let i = 0; i <= arr.length / 2; i++){
      x = arr[i];
      arr[i] = arr[arr.length - i - 1];
      arr[arr.length - i - 1] = x;
    }

    return arr

  }

  result = reverseArray();

  res.status(200).json({ result });

  console.log(result);

  next();

});

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
});

