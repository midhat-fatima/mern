const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.render('index');
});

app.post('/', function(req, res){
    let errorMsg = '';
    const user = 'abc@abc.abc';
    const password = '123'
    if(req.body.user!=user || req.body.password!=password) {
        errorMsg = 'Invalid username or password. Pehlay account to bana lo.'
        res.render('index',{error:errorMsg});
    } else{
        res.redirect('./dashboard');
    }
});

app.get('/dashboard',function(req,res){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
    res.render('dashboard',{users});
});

// app.get('/api/:id(\\d+)',function(req,res){
//     res.send('number aaya hay')
// });

app.get('/api/:email?',function(req,res){
    if(req.params.email){
        res.send('Email aaiy hay');
    }else{
        res.send('Email nai aa rahi hay')
    }
});

app.get('/:id',function(req,res){
    
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));

    let id = req.params.id;
    delete users[id];
    res.status(200).redirect('./dashboard');
});

app.listen(3000);