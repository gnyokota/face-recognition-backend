const express = require('express'); 
//to use req.body we need to call body-parser 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex =  require ('knex');
const registerPost = require('./controllers/resgister.js');
const signinPost = require('./controllers/signin.js');
const image = require('./controllers/image');
const profileGet = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express(); 
app.use(bodyParser.json()); 
app.use(cors());

//This will send us a response, it is working r not
app.get('/', (req,res)=>{
    res.send('sucess');
})

//sign in section will POST sucess or fail 
//we can right like a function that returns other function
app.post('/signin',signinPost(db,bcrypt));

//Register will post the user into the database
//inject dependencies (db,bcrypt) using parameters for the function
app.post('/register', (req,res)=> registerPost(req,res,db,bcrypt)); 

//will get the user with the input id 
app.get('/profile/:id', (req,res)=>profileGet(req,res,db));

//will change the rank according to the # of requests
app.put('/image', (req,res)=>image.imagePut(req,res,db)); 

app.post('/imageUrl', (req,res)=>image.handleApiCall(req,res)); 
 
app.listen(process.env.PORT || 3000); 
