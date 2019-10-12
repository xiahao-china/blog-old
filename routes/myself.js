const express=require('express')
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const multiparty=require('multiparty');

const router=express.Router()

const UserModels=require('../models/User')

router.post('/getMyselfInformation',function (req,res,next) {
    if (req.session.user) {

        let data={
            status:'200',
            msg:"查询成功",
            name:req.session.user.name,
            sex:req.session.user.sex,
            mail:req.session.user.mail,
            phone:req.session.user.phone,
            introduce:req.session.user.introduce,
            created_at:req.session.user.created_at
        }
        res.json(data);
        res.send();
    }else {
        res.json({"status":'201',
            "msg":"您还未登录"})
        res.send();
    }

})

router.put('/upMyselfInformation',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {

        try {
            if (!req.session.user.name) {
                throw new Error('您的登陆状态可能已经过期')
            }
            if (['male', 'female', 'none'].indexOf(fileds.sex[0]) === -1) {
                throw new Error('性别只能是 male、female 或者为默认none')
            }
        }catch (e) {

            if (e){
                res.json({"status":'100',
                    "msg":e})
                return res.send();
            }
        }

        let changed=new Object();
        let name=fileds;
        let keys=Object.keys(name);
        console.log(keys);
        for (let i=0,l=keys.length;i<l;i++){
            console.log(name[keys[i]]);
            switch (keys[i]) {
                case 'sex':if(name[keys[i]]){
                    changed.sex=fileds.sex[0];
                };break;
                case 'mail':if(name[keys[i]]){
                    changed.mail=fileds.mail[0];
                };break;
                case 'phone':if(name[keys[i]]){
                    changed.phone=fileds.phone[0];
                };break;
                case 'introduce':if(name[keys[i]]){
                    changed.introduce=fileds.introduce[0];
                };break;
            }
        }
        UserModels.changeUserInformation(req.session.user.name,changed)
            .then(function () {
                res.json({
                    "status":'200',
                    "msg":"更新成功"
                })
                res.end();
            }).catch(function (e) {
            res.json({
                "status":'201',
                "msg":e
            })
            res.send();
        })
    })
})

router.put('/upHeadImg',function (req,res,next) {
    let form=new multiparty.Form({maxFieldsSize:614400});
    form.on('error',function () {
        res.json({"status":'100',
            "msg":'更换的头像不能大于600Kb'})
        return res.send();
    })
    form.parse(req,function (err,fileds,file) {
        console.log(file)
        try {
            if (!req.session.user.name) {
                throw new Error('您的登陆状态可能已经过期')
            }
            if (!file.headImg[0].fieldName){
                throw new Error('更换的头像不能为空');
            }
            if (!file.headImg[0].size>614400){
                throw new Error('更换的头像不能大于600Kb');
            }
        }catch (e) {
            if (file.headImg[0].path) {
                fs.unlink(file.headImg[0].path)
            }
                res.json({"status":'100',
                    "msg":e})
                return res.send();
        }

        UserModels.upHeadImg(req.session.user.name,file.headImg[0].path)
            .then(function () {
                res.json({
                    "status":'200',
                    "msg":"更新成功"
                })
                res.send();
            })
            .catch(function (e) {
            res.json({
                "status":'201',
                "msg":e
            })
            res.send();
        })

    })
})

module.exports = router