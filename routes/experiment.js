const express = require('express');
const router = express.Router();
const data = '';
router
    .route('/')
    .get((req,res)=>{
        res.render('pages/experiment',{data:data});
    })
    .post((req,res)=>{
        const postData = req.body;
        console.log(req.body);
        res.render('pages/experiment',{data:postData.data});
    });
module.exports = router;