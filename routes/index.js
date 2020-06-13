const express=require('express')
const bodyParser = require('body-parser');
const router=express.Router()
const multiparty=require('multiparty');
const TipModels=require('../models/Tip')

let tojson=bodyParser.json()

router.get('/index.html',function (req,res,next) {
    let deviceAgent = req.headers["user-agent"].toLowerCase();
    let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        res.render('indexMobile', {title: 'HTML'});
    }else{
        res.render('index', {title: 'HTML'});
    }

})
router.get('/detail.html',function (req,res,next) {
    res.render('detail', {title: 'HTML'});
})
router.get('/manage.html',function (req,res,next) {
    res.render('manage', {title: 'HTML'});
})
router.get('/writeBlog.html',function (req,res,next) {
    res.render('writeBlog',{title: 'HTML'});
})
router.get('/browseBlog.html',function (req,res,next) {

    let deviceAgent = req.headers["user-agent"].toLowerCase();
    let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        res.render('browseBlogMobile', {title: 'HTML'});
    }else{
        res.render('browseBlog',{title:'HTML'});
    }
})
router.get('/blogDetail.html',function (req,res,next) {
    let deviceAgent = req.headers["user-agent"].toLowerCase();
    let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        res.render('blogDetailMobile', {title: 'HTML'});
    }else{
        res.render('blogDetail',{title:'HTML'});
    }
})
router.get('/myself.html',function (req,res,next) {
    res.render('myself',{title:'HTML'});
})


router.get('/getHotTip',function (req,res,next) {
    TipModels.getHotTip()
        .then(function (Tip) {
            res.json({Tip:Tip,code:200,msg:'成功'});
            res.end();
        });

})



module.exports = router