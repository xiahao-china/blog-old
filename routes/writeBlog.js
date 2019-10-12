const express=require('express');
const path=require('path')
const multiparty=require('multiparty');
const router=express.Router();
var sd = require('silly-datetime');


const TipModels=require('../models/Tip')



router.post('/',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fields,file) {
        let tip={};
        try {
            if (!(fields.name[0].length >= 1 && fields.name[0].length <= 25)) {
                throw new Error('名字请限制在 1-25 个字符')
            }else {
                tip.name=fields.name[0];
            }
            if (!req.session.user) {
                throw new Error('异常：您未登录')
            }else {
                tip.action=req.session.user.name;
            }
            if (!fields.details[0].length > 10) {
                throw new Error('请包含文章的具体内容')
            }else{
                tip.details=fields.details[0];
            }
            if (!fields.briefIntroduction[0].length > 10) {
                throw new Error('请包含文章的简介')
            }else{
                tip.briefIntroduction=fields.briefIntroduction[0];
            }
            if (!fields.keyWord.length >= 1) {
                throw new Error('请填写与文章有关的关键词');
            }else{
                tip.keyWord=fields.keyWord[0];
                // tip.keyWord=fields.keyWord[0];
                // for (let i=1;i<fields.keyWord.length;i++){
                //     tip.keyWord+=','+fields.keyWord[i];
                // }
            }
            if (file.img) {
                tip.img=file.img[0].path;
                for (let i=1;i<file.img.length;i++){
                    tip.img+=','+file.img[i].path;
                }
            }
        } catch (e) {
            // 注册失败，异步删除上传的头像
            if (file.img){
                fs.unlink(file.img[0].path,function () {});
            }
            res.json({"status":'100',
                "msg":e});
            console.log(e);
            return res.end();

        }

        tip.time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
        tip.saw=0;
        TipModels.createTip(tip)
            .then(function () {
                res.json({"status":'200',
                    "msg":'上传成功'});
                res.send();
            })
            .catch(function (err) {
                res.json({"status":'201',
                    "msg":err});
                res.send();
            })

    })
})

module.exports=router;