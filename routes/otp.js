const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {drop,temp_remove} = require('../database/temp');
var Mongo = require('mongodb').MongoClient;
const {sessiongen} = require('../controller/sessionGen');
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
router
    .route('/')
    .get((req,res)=>{
        if (req.session.user){
        res.render('pages/otp');
        }
        if (req.session.user && req.session.loggedin){
            res.redirect('/information');
        }
        if (!req.session.user){
            res.redirect('/registration');
        }
    })
    .post(
        check('otp').trim().isLength({max:4,min:4}),
        (req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json(
                { errors: errors.array() }
                );
            }
            const otp = parseInt(req.body.otp);
            const session = req.session.user;
            //console.log(otp,session); // works
            if(otp && session ){
            Mongo.connect(url, function (err, db) {
            if(err) throw err;
            var dbo = db.db("eventizer");
            dbo.collection("event_vendors").insertOne(drop()[0]);
            dbo.collection("event_vendor_tokens").findOne({otp:otp,session:session},
                function(err,result){        
              if (err) throw err;
              if (result.otp === otp){
              const expiry  = result.expiry;
              const current = parseInt(Math.floor(Date.now() / 1000));
              temp_remove(0);
              if (expiry<current){
                  console.log('token timeout, fix timeout');
                res.redirect('/registration');
              }
              
              else {
                req.session.loggedin = true;
                res.render('pages/profile');
            }
            }
            else{

                res.redirect('/registration');
                console.log('token error, didnot match');
                }
          });
        });
            }
            else res.redirect('/registration');
        });

module.exports = router;

