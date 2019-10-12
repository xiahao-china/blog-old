const Tip=require('../lib/mongo').Tip
module.exports={
    createTip:function (tip){
        return Tip
            .insert(tip)
            .exec()
    },
    getHotTip:function () {
        return Tip
            .find()
            .sort({saw:-1})
            .limit(4)
            .exec();

    },
    incSaw:function (id) {
        return Tip
            .update({_id:id},{$inc:{saw:1}})
            .exec()
    },
    findTip:function (key) {
        return Tip
            .find({$or:[{name:new RegExp(key,'i')},{details:new RegExp(key,'i')}]},{_id:1})
            .sort({saw:-1})
            .exec();
    },
    findOneTip:function (id) {
        return Tip
            .find({_id:id},{})
            .limit(1)
            .exec();
    },
    getNewTip:function (nowday) {
        return Tip
            .find({time:new RegExp(nowday,'i')},{})
            .sort({_id:-1})
            .limit(10)
            .exec()

    }

}