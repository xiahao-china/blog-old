var MongoClient = require('mongodb').MongoClient

var uri = 'mongodb://xh471087639:2238896932@cluster0-shard-00-00-lp7ok.mongodb.net:27017,cluster0-shard-00-01-lp7ok.mongodb.net:27017,cluster0-shard-00-02-lp7ok.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
MongoClient.connect(uri, function (err, client) {
    const collection = client.db('test').collection('devices')
    // perform actions on the collection object
    client.close()
})

module.exports = {
    mongodb: 'mongodb://xh471087639:2238896932@cluster0-shard-00-00-lp7ok.mongodb.net:27017,cluster0-shard-00-01-lp7ok.mongodb.net:27017,cluster0-shard-00-02-lp7ok.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
}
