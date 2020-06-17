module.exports = {
    port:5542,
    session:{
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    pageSize:5,
    completePath:'http://localhost:5542/',
    // completePath:'http://139.196.220.58',
    mongodb: 'mongodb://localhost:27017/TheBlog'
    // mongodb: 'mongodb://127.0.0.1:31212/TheBlog'
}