const { json } = require('body-parser');
const Clarifai = require('clarifai'); 
const password = require('.././password');

const app = new Clarifai.App({
    apiKey: password.passApi
});

const handleApiCall = (req,res)=>{
    const {input} = req.body;
    app.models.predict('d02b4508df58432fbb84e800597b8959',input)
    .then(data => {
        res.json(data); 
    })
    .catch(err=> res.status(400).json('unable to do the call'));
}


const imagePut = (req,res,db)=>{
    const {id} = req.body; 
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(response=>{
        res.json(response[0]);
    })
    .catch(err=> res.status(400).json('unable to get entries'));
}; 

module.exports = {
    imagePut: imagePut, 
    handleApiCall: handleApiCall
};