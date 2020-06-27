const express=require('express');
const path=require('path')
const multiparty=require('multiparty');
const router=express.Router();
const fs=require('fs');
const config=require('../config/default');
var sd = require('silly-datetime');


const TipModels=require('../models/Tip')


router.post('/',function (req,res,next) {
    let form=new multiparty.Form();
    // form.uploadDir='../public/picture/'
    form.parse(req,function (err,fields,file) {
        console.log(fields,file);
        let tip={};
        let imgPath=''
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
                imgPath='public/picture/'+/\w*(.gif|.jpg|.jpeg|.png|.GIF|.JPG|.PNG)$/g.exec(file.img[0].path)[0];
                tip.keyWord=fields.keyWord[0];
                // tip.keyWord=fields.keyWord[0];
                // for (let i=1;i<fields.keyWord.length;i++){
                //     tip.keyWord+=','+fields.keyWord[i];
                // }
            }
            if (!file.img[0]) {
                throw new Error('请上传帖子展示图')
            }else {
                tip.img=imgPath;
                for (let i=1;i<file.img.length;i++){
                    tip.img+=','+file.img[i].path;
                }
            }
        } catch (e) {
            // 注册失败，异步删除上传的头像
            if (file.img){
                fs.unlink(file.img[0].path,function () {});
            }
            console.log(Error);
            res.json({"status":'100',
                "msg":e});
            console.log(e);
            return res.send();

        }

        fs.readFile(file.img[0].path,function (err,data) {
            if(err){
                return console.log(err);
            }else{
                fs.writeFile('../TheBlog/'+imgPath,data,function (err) {
                    if(err){
                        return console.log(err);
                    }else {
                        console.log("复制欧克");
                    }
                })
            }
        })
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

router.post('/upLoadBlogImg',function (req,res,next) {
    let form=new multiparty.Form();
    // form.uploadDir='../public/picture/'
    form.parse(req,function (err,fields,file) {
        console.log(fields,file.img);
        let tip={};
        let imgPath='/public/picture/'+/\w*(.gif|.jpg|.jpeg|.png|.GIF|.JPG|.PNG)$/g.exec(file.img[0].path)[0];
        console.log(file.img[0].path);
        try {

            if (!req.session.user) {
                throw new Error('异常：您未登录')
            }
            if (!file.img[0]) {
                throw new Error('请上传博客图片')
            }else {
                tip.img=imgPath;
                for (let i=1;i<file.img.length;i++){
                    tip.img+=','+file.img[i].path;
                }
            }
        } catch (e) {
            // 注册失败，异步删除上传的头像
            if (file.img){
                fs.unlink(file.img[0].path,function () {});
            }
            console.log(Error);
            res.json({"status":'100',
                "msg":e});
            return res.send();

        }

        fs.readFile(file.img[0].path,function (err,data) {
            if(err){
                return console.log(err);
            }else{
                fs.writeFile('../TheBlog/'+imgPath,data,function (err) {
                    if(err){
                        return console.log(err);
                    }else {
                        console.log("复制欧克");
                        res.json({"status":'200',
                            "msg":'上传成功',
                        'path':config.completePath+imgPath});
                        res.send();
                        fs.unlink(file.img[0].path,function (err) {
                            if(err){
                                return console.log(err);
                            }
                        });
                    }
                })
            }
        })


    })
})
module.exports=router;