const config = require('config-lite')(__dirname)
const linkMongo=require('../config/production')
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

mongolass.connect(config.mongodb)

mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
        return results
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})

exports.Tip = mongolass.model('Tip', {
    name: { type: 'string', required: true },
    action: { type: 'string', required: true },
    details: { type: 'string', required: true },
    saw: { type: 'number', required: true },
    time: { type: 'string', required: true },
    img: { type: 'string' },
    keyWord:{type: 'string', required: true},
    briefIntroduction:{type:'string',required:true},
})
exports.Tip.index({ _id: 1 }).exec()

exports.User = mongolass.model('User',{
    name:{type:'string',required:true},
    sex:{type:'string',enum:["male","female","none"],default:"none"},
    password:{type:'string',required:true},
    mail:{type:'string',required:true},
    headImg:{type:'string',required:true},
    phone:{type:'string',required:false},
    introduce:{type:'string',required:false},

})
exports.User.index({ name: 1 }, { unique: true }).exec()