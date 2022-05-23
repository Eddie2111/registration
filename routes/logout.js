const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req,res)=>{
        req.session.destroy();
        res.render('pages/index');
    })
module.exports = router;