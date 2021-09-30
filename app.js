const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/users.json'), (err, data)=>
    {
        const userData = JSON.parse(data.toString());
        if(err) throw err;
        res.render('./index', {userData});
    });
});

// ==================================== create =========================================
app.post('/add', (req, res) =>{
    fs.readFile(path.join(__dirname, 'data/users.json'), (err, data) =>{
        if (err) throw err;
        const userData = JSON.parse(data.toString());
        userData.push(req.body);
        fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(userData, null, 4), err =>
        {
            if(err) throw err;
        });
    });
    res.redirect('/');
});

// ==================================== delete ======================================
app.get('/delete/:userId', (req, res) =>{
    fs.readFile(path.join(__dirname, 'data/users.json'), (err, data) =>{
        if (err) throw err;
        console.log(req.params.userId);
        const userData = JSON.parse(data.toString());
        userData.splice(userData.findIndex(x => x.id == req.params.userId), 1);
        fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(userData, null, 4), err =>
        {
            if(err) throw err;
        });
    });
    res.redirect('/');
});

// ==================================== update ======================================
app.post('/edit', (req, res) =>{
    console.log(req.body);
    fs.readFile(path.join(__dirname, 'data/users.json'), (err, data) =>{
        if (err) throw err;
        const userData = JSON.parse(data.toString());
        userData.splice(userData.findIndex(x => x.id == req.body.id), 1, req.body);
        fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(userData, null, 4), err =>
        {
            if(err) throw err;
        });
    });
    res.redirect('/');
});

app.listen(port);