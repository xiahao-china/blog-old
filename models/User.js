const User=require('../lib/mongo').User
module.exports={
    creatUser:function (user) {
        return User
            .create(user)
            .exec();
    },
    getUserByName: function (name) {
        return User
            .findOne({ name: name })
            .addCreatedAt()
            .exec()
    },

    checkMail:function (mail) {
        let re=/^\w[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})$/i;
        if (re.test(mail)){
            return true;
        } else{
            return false;
        }
    },
    changeUserInformation:function (name,changed) {
        return User
            .update({'name':name},{$set:changed})
            .exec()
    },
    upHeadImg:function (name,Img) {
        return User
            .update({'name':name},{$set:{'headImg':Img}})
            .exec()
    }
}