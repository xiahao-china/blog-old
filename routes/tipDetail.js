const express=require('express');
const path=require('path')
const multiparty=require('multiparty');
const router=express.Router();
var sd = require('silly-datetime');


const TipModels=require('../models/Tip')

router.post('/findTip',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {
        try {
            if (!fileds.key){
                throw  '键值缺失，查找失败'
            }
        } catch (e) {
            res.json({"status":'100',
                "msg":e});
            return res.send();
        }
        let key=fileds.key[0];

        TipModels.findTip(key)
            .then(function (tipInformation) {
                res.json({"status":'200',
                    "msg":tipInformation});
                return res.send();
            }).catch(function (e) {
            res.json({"status":'201',
                "msg":e});
            return res.send();
        })

    })
})

router.post('/findOneTip',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {
        console.log(fileds);
        try {
            if (!fileds.id[0]){
                throw  '帖子id缺失，查找失败'
            }
        } catch (e) {
            res.json({"status":'100',
                "msg":e});
            return res.send();
        }
        let id=fileds.id[0];

        TipModels.findOneTip(id)
            .then(function (oneTipInformation) {
                TipModels.incSaw();
                res.json({"status":'200',
                    "msg":'成功',
                    "Tip":oneTipInformation});
                return res.send();
            }).catch(function (e) {
            res.json({"status":'201',
                "msg":e});
            return res.send();
        })

    })
})

router.post('/incSaw',function (req,res,next){
    let form=new multiparty.Form();
    form.parse(req,function (err,fields,file) {
        TipModels.incSaw(fields.id[0]);
        res.status(200);
        res.json({"status":"200","msg":"OK"});
        res.end();
    })

})

module.exports=router;