const registerPost = (req,res, db, bcrypt)=>{
    const {email,password,name} = req.body;
    
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }
    //to receive an async hash
    bcrypt.hash(password, 10, function(err, hash) {
        //I use transaction when a need to do more then one action
        //in the database
            db.transaction(trx =>{
                trx.insert({
                    hash:hash,
                    email:email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                    .returning('*')
                    .insert({
                    email:loginEmail[0], 
                    name:name, 
                    joined: new Date()
                    }).then(user=> res.json(user[0]))
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => res.status(400).json('unable to register'));
        })
     //the error can give information to the user, so instead of returning the error it is 
     //better to return just a message
    //  
}

module.exports = registerPost;