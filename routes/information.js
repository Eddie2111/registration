const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router
    .route('/')
    .get((req,res)=>{
        if (req.session.loggedin && req.session.user){
        res.render('pages/personalDetails');
        }
        else{ res.render('pages/login');}
    })
    .post(
        check('email').isEmail().isLowercase().trim(),
        check('firstname').trim().isLength({max:10, min:1}),
        check('lastname').isLength({max:10, min:0}).trim(),
        check('service').isLength({min:9,max:35}).trim(),
        check('password').isLength({ min:5,max:15 }),
        (req,res)=>{
            if (req.session.loggedin && req.session.user){
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json(
                { errors: errors.array() }
                )};
        const postData = req.body;
        console.log(req.body);
        res.json({message:'successfully registered!'});
    }
});
module.exports = router;