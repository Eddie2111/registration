const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var Mongo = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
const {check, validationResult} = require('express-validator');
const {sessiongen} = require('../controller/sessionGen');
router
    .route('/')
    .get((req,res)=>{
        res.render('pages/login');
    })
    .post(
        check('email').trim().isEmail().isLength({max:35,min:11}),
        check('password').isLength({max:15,min:5}),
        (req,res)=>{        
            const postData = req.body;
           // const password -> database password
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
           return res.status(400).json(
               { errors: errors.array() }
               );
           }
           const email = postData.email;
           const password = postData.password;
           console.log(email,password);
           var MongoClient = Mongo.connect(url, function (err, db) {
            if(err) throw err;
            var dbo = db.db("eventizer");
            dbo.collection("event_vendors").findOne({email:email},function(err,result){
              if (err) throw err;
              if (result){ //on success -> email
                console.log(result);
                const syst = bcrypt.compare(password,result.password,(err,data)=>{
                    if (data === true){
                        // in here
                        const sessions = [sessiongen(),sessiongen()];
                        req.session.loggedin = sessions[0]
                        req.session.user = sessions[1]
                        res.redirect('/information');
                        //res.json({message:'succesio!',redirect:'/information',session:[{loggedin:req.session.loggedin,user:req.session.user}]});
                        
                    }
                    else{
                        res.json({message:'failio',redirect:'/login',session:[{loggedin:req.session.loggedin,user:req.session.user}]});
                    }
                });
              }
              if (!result){
                const result = {};
                console.log("No data found");   
              }
    
            });
          });

    });
module.exports = router;