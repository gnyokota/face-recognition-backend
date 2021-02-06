const profileGet = (req,res)=>{
    const {id} = req.params; 
    db.select('*').from('users').where({
        id: id
    })
    .then(user=>{
        if(user.length){
            res.json(user[0]); 
        }else{
            res.status(400).json('user not found');
        }
       
    })
    .catch(err => res.status(400).json('error to get the user')); 
}; 

module.exports = profileGet; 