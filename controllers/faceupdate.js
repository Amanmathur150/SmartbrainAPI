const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "Your API Key"
  
   });

const handleClearifyApi = () =>(req, res)=>{
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL ,req.body.ImageURL).then(respond=>{
        
        res.json(respond);
    }).catch(err=>{
        res.json("API IS Not Responding ")
    })
}



const handlefaceupdate = (db) =>(req,res)=>{
    const {face ,email} = req.body;
    
    db('users').where({
        email: email
      }).select('*').then(user=>{
          
        db('users')
        .where({email: email})
        .update({
          face: Number(face) + Number(user[0].face),
          entries: Number(user[0].entries) + 1
        }).then(userforranking =>{
            
            db('users').orderBy('face', 'desc').then(list=>{
                let rank = 0;
                for (let rankno of list){
                    rank = rank + 1;
                    
                    db('users')
                    .where({email: rankno.email})
                    .update({
                        rank:rank
                    }).then(res111=>{
                        return res111
                    })
                    
                }
               
                
                
            }).then(update=>{
                
                db('users').where({
                    email: email
                  }).select('*').then(user=>{
                      
                      res.json(user[0])
                  })
            })
          })
      })

    
    
}

module.exports={
    handlefaceupdate,
    handleClearifyApi
}
