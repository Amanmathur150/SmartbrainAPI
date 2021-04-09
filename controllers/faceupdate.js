const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b8012b657e094dc397a437ecb1d8ce7a'
  
   });

const handleClearifyApi = () =>(req, res)=>{
    console.log(req.body.ImageURL)
    app.models.predict(Clarifai.FACE_DETECT_MODEL ,req.body.ImageURL).then(respond=>{
        console.log(respond)
        res.json(respond);
    }).catch(err=>{
        res.json("Nahi chal raha tera ye ")
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
                      console.log(user[0])
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