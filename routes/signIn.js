const express=require('express')
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const multiparty=require('multiparty');

const router=express.Router()

const UserModels=require('../models/User')

router.post('/',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fileds,file) {
        console.log(fileds)
        try {
            if (!fileds.name[0]) {
                throw new Error('请输入用户名')
            }
            if (!fileds.password[0]) {
                throw new Error('请输入密码')
            }
        } catch (e) {
            console.log(e);
            if (e){
                res.json({"status":'100',
                    "msg":e});
                return res.send();
            }
        }
        
        UserModels.getUserByName(fileds.name[0])
            .then(function (result) {
                try {
                    if (!result) {
                        throw new Error('用户不存在')
                    }
                    if (sha1(fileds.password[0])!=result.password) {
                        throw new Error('用户名或密码错误')
                    }
                } catch (e) {
                    res.json({"status":'101',
                        "msg":e});
                    return res.end();
                }
                req.session.user=result;


                res.json({"status":'200',
                    "msg":"登陆成功"});
                res.send();
            })
    })
})



module.exports = router