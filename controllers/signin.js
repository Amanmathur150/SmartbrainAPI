const handlesignin = (db , bcrypt)=> (req , res)=>{
    
    const {email, password} = req.body

    db.select('*').from('login').where({email : email}).then(result0=>{
        bcrypt.compare(password, result0[0].password, function(err, result) {
            console.log(result)
            if (result){
                db('users').where({
                    email: result0[0].email
                }).select('*').then(user=>{
                    console.log(user[0])
                    res.json(user[0])
                })
                
            } else{
                res.status(404).json("Email and Password Is not valid ")
        
            }
        });
        
     
    }).catch(err=>{
        res.status(404).json("Email and Password Is not valid ")    
    })
    
       
   
}

module.exports={
    handlesignin
}