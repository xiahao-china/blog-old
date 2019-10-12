const fs=require('fs')
const express=require('express')
const router=express.Router();
const sha1 = require('sha1');
const multiparty=require('multiparty');
const UserModels=require('../models/User')

router.post('/',function (req,res,next) {
    let form=new multiparty.Form();
    form.parse(req,function (err,fields,file) {
        try {
            if (!(fields.name[0].length >= 1 && fields.name[0].length <= 10)) {
                throw new Error('名字请限制在 1-10 个字符')
            }
            if (['male', 'female', 'none'].indexOf(gender) === -1) {
                throw new Error('性别只能是 male、female 或者为默认none')
            }
            if (!file.headImg[0].name) {
                throw new Error('缺少头像')
            }
            if (fields.password[0].length < 6) {
                throw new Error('密码至少 6 个字符')
            }
            if (!UserModels.checkMail(fields.mail[0])) {
                throw new Error('缺少邮箱，或邮箱不正确')
            }
        } catch (e) {
            // 注册失败，异步删除上传的头像
            fs.unlink(file.headImg[0].path,function () {
                res.json({"status":'100',
                    "msg":e});
                return res.end();
            });

        }

        let user={
            name:fields.name[0],
            sex:fields.sex[0],
            mail:fields.mail[0],
            password:sha1(fields.password[0]),
            headImg:file.headImg[0].path,
            phone:fields.phone[0],
            introduce:fields.introduce[0],
        }
        UserModels.creatUser(user).then(function () {
            delete user.password;
            res.json({
                "status":"200",
                "msg":"注册成功",
            })
            res.end();
        }).catch(function (e) {
            fs.unlink(file.headImg[0].path);
            if (e.message.match('duplicate key')) {
                res.json({
                    "status":"100",
                    "msg":"注册失败，用户名已被占用",
                })
                res.end();
            }else {
                res.json({
                    "status":"200",
                    "msg":"注册成功",
                })
                res.end();
            }

            next(e);
        });

    })
})
module.exports = router