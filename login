// user.json

[
	{
		"username": "admin1",
		"password": "123"
	},
	{
		"username": "admin2",
		"password": "123"
	},
	{
		"username": "admin3",
		"password": "123"
	},
	{
		"username": "admin4",
		"password": "123"
	},
	{
		"username": "admin5",
		"password": "123"
	}
]

// login.html page

<h1>LOGIN</h1>

<form method="POST" action="/login">
    <input type="text" name="user" placeholder="username">
    <input type="password" name="pass" placeholder="passwaord">
    <input type="submit" name="submit" value="search">
</form>

// index.js page

const fs = require("fs");
const path = require("path");
const express = require('express');
const app = express();
const port = 3000;
let counter = 0;

app.use(express.urlencoded());

app.get('/', (req, res) => {
  console.log(`aaya hay ${++counter}`);
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/login', (req, res) => {
  const dataFile = path.join(__dirname, 'data/users.json');
  if (fs.existsSync(dataFile)) {
    let user = req.body.user;
    let pass = req.body.pass;
    let data = JSON.parse(fs.readFileSync(dataFile));
    const validate = data.filter(function (item) { 
      if (item.username === user && item.password === pass) {
        return true;
      } else {
        return false; 
      }
    });
      if(validate.length > 0){
        res.send(`WELCOME! ${user}`);
      } else {
        res.send("ERROR : INVALID INPUT");
      }
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(port, () => {
  console.log(`I'm listening at http://localhost:${port}`)
})
