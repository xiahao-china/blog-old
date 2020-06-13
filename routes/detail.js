const express=require('express')
const bodyParser = require('body-parser');
const router=express.Router()
const multiparty=require('multiparty');
const config=require('../config/default');

var sd = require('silly-datetime');

const TipModels=require('../models/Tip')


let tojson=bodyParser.json()

router.post('/getNewTip',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {
        let page=1;
        fileds.page?page=parseInt(fileds.page[0]):void(0);

        try {
            if (fileds.page[0]<=0){
                throw '页数必须大于0'
            }
        }catch (e) {
            res.json({"status":'101',
                "msg":e});
            return res.send();
        }

        let promise=new Promise(function (resolve, reject) {
            let pageInf={};
            TipModels.getTipCount()
                .then(function (result) {
                    console.log(result);
                    result<=5?pageInf.maxPage=1:pageInf.maxPage=Math.ceil(result/config.pageSize);

                    if (page>pageInf.maxPage) {
                        pageInf.msg='超过最大页数'+pageInf.maxPage+'页，仅返回最大页';
                        page=pageInf.maxPage;
                    }else{
                        pageInf.msg='成功';
                    }
                    pageInf.nowPage=page;
                    resolve(pageInf);
                })
        }).then(function (pageInf) {
            TipModels.getNewTip(page-1)
                .then(function (tipInformation) {
                    // tipInformation.pageInf=pageInf;
                    res.json({"status":'200',
                            "msg":pageInf.msg,
                            "Tip":tipInformation,
                            "pageInf":pageInf
                    });
                    return res.send();
                })
                .catch(function (e) {
                    res.json({"status":'201',
                        "msg":e});
                    return res.send();
                })
        })


        // nowday=sd.format(new Date(),'DD');



    })
})

router.get('/getNewTip',function (req,res,next) {
    let form=new multiparty.Form({uploadDir:'../public/picture/'});
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