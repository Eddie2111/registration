const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
router
    .route('/')
    .get((req, res)=> {
        res.render('pages/experiment',{data:''});
        })
    .post((req, res)=> {
        var postData = req.body;
        const accessToken = jwt.sign(postData, 'dasdsadsadsad3r983');
        console.log(accessToken);
        res.json({token:accessToken});
        });
module.exports = router;