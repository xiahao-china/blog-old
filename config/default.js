module.exports = {
    port:5542,
    session:{
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    pageSize:5,
    completePath:'http://localhost:5542/',
    // completePath:'http://114.115.156.4:5542',
    mongodb: 'mongodb://localhost:27017/TheBlog'
    // mongodb: 'mongodb://114.115.156.4:27017/TheBlog'
}