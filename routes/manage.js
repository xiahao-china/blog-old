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

router.post('/deleteTip',function (req,res,next) {
    let form=new multiparty.Form({uploadDir: './public/picture/'});
    form.parse(req,function (err,fileds,file) {
      try {
          if (!req.session.user) {
              throw '异常：您未登录';
          }
          if (!fileds.tipId){
              throw '请输入您要删除的帖子id';
          } 
      }  catch (e) {
          res.json({"status":'100',
              "msg":e});
          return res.send();
      }
      
      let promise=new Promise(function (resolve, reject) {
          TipModels
              .findTip(fileds.tipId)
              .then(function (tip) {
                  tip.action==req.session.user?resolve():reject();
              })
      }).then(function () {
          TipModels
              .deleteOneTip(fileds.tipId)
              .then(function (end) {
                  res.json({"status":'200',
                      "msg":end});
                  return res.send();
              })
      }).catch(function () {
          res.json({"status":'403',
              "msg":end});
          return res.send();
      })
    })
})

module.exports = router