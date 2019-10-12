const express=require('express')
const bodyParser = require('body-parser');
const router=express.Router()
const multiparty=require('multiparty');
var sd = require('silly-datetime');

const TipModels=require('../models/Tip')


let tojson=bodyParser.json()

router.post('/getNewTip',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {

        nowday=sd.format(new Date(),'DD');

        TipModels.findTip(nowday)
            .then(function (tipInformation) {
                res.json({"status":'200',
                    "msg":'成功',
                    "Tip":tipInformation});
                return res.send();
            })
            .catch(function (e) {
            res.json({"status":'201',
                "msg":e});
            return res.send();
        })

    })
})

router.get('/getNewTip',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {

        TipModels.getNewTip()
            .then(function (tipInformation) {
                res.json({"status":'200',
                    "msg":'成功',
                    "Tip":tipInformation});
                return res.send();
            })
            .catch(function (e) {
                res.json({"status":'201',
                    "msg":e});
                return res.send();
            })

    })
})


module.exports = router