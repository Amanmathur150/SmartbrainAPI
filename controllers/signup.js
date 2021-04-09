const handlesignup = (db , bcrypt , saltRounds) => (req , res )=>{
    const {name, password , email} = req.body;
    
    
    if (!name || !password || !email){

        res.json(`Please Submit valid information`);
    }else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        res.json("Please Submit Valid Email")
    }
        
    else{
        const hash = bcrypt.hashSync(password, saltRounds);
    
        db('users').count('*').then(respond=>{
            var number = respond[0].count
    
        
            db.transaction(trx=> {
                trx.insert({id : Number(number)+1,
                    name: name,
                    password : hash ,
                email:email })
                .into('login')
                .returning('*')
                .then((loginemail ) =>{
                    
                    return trx("users").returning("*").insert({
                        email : loginemail[0].email,
                        id : Number(loginemail[0].id),  
                        joins : new Date(),
                        rank : Number(loginemail[0].id),
                        name : name,
                        entries: 0,
                        face : 0
                    })
                .then(user=>{
                        
                        res.json(user[0])
                    })
                }).then(trx.commit).catch(trx.rollback)
        }).catch(err=>res.status(404).json(err))}).catch(err=>{
            
        })



    }
    
    

        

    


    
    }

 
module.exports = {
    handlesignup
}