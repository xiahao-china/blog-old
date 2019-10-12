const express=require('express');
const path=require('path')
const multiparty=require('multiparty');
const router=express.Router();

const TipModels=require('../models/Tip')


router.post('/upDateHotTip',function (req,res,next) {
    let form=new multiparty.Form({uploadDir: './public/picture/'});
    form.parse(req,function (err,fileds,file) {
        console.log(file,fileds);
        let HotTip={
            name:fileds.name[0],
            action:fileds.action[0],
            details:fileds.details[0],
            saw:parseInt(fileds.saw[0]),
            time:fileds.time[0],
            img:file.img[0].path,
        }
        TipModels.createTip(HotTip).then(function () {
            res.end('success','成功上传')
        }).catch(function (e) {
            next(e)
        })
    })









})

module.exports = router