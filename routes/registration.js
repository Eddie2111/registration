const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {sessiongen} = require('../controller/sessiongen');
const {Tokengen} = require('../controller/tokengeneration');
const {temp_push} = require('../database/temp');
const {mailer} = require('../middleware/mailer');
var Mongo = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
const serviceArray = ['Decoration', 'Cinematography', 'Photography'];
router
    .route('/')
    .get((req,res)=>{
        if (!req.session.user){
        res.render('pages/service');
        }
        if (req.session.loggedin){
            res.redirect('/otp');
        }
    })
    .post(
        check('email').isEmail().isLowercase().trim(),
        check('firstname').trim().matches(/^[A-Za-z\s]+$/).isLength({max:10, min:1}),
        check('lastname').trim().matches(/^[A-Za-z\s]+$/).isLength({max:10, min:0}),
        check('service').isIn(serviceArray),
        check('password').isLength({ min:5,max:15 }),
        (req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400)
                        .json({ 
                            errors: errors.array() 
                        });
        }
        const postData = req.body;
        req.session.user = sessiongen();
        postData.password = bcrypt.hashSync(postData.password, bcrypt.genSaltSync(10));
        temp_push(postData);
        Mongo.connect(url, function (err, db) {
            if(err) throw err;
              var dbo = db.db("eventizer");
              var tokenset = Tokengen(req.session.user);
              mailer(tokenset.otp,postData.email);
        dbo.collection("event_vendor_tokens").insertOne(tokenset); 
        res.redirect('/otp');
        });
        // if data recieved is correct, 
        // then send it to the database
        
        //if data okay => res.render(otp)
        // if not okay => res.render(service)
        
    });
module.exports = router;