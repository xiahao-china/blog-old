const path=require('path')
const ejs=require('ejs')
const config=require('config-lite')(__dirname)
const express=require('express')
const session=require('express-session')
const MongoStore=require('connect-mongo')
const flash=require('connect-flash')

const app=express()
app.use(session(config.session));
app.use('/public', express.static('public'));


const routes=require('./routes')
const pkg=require('./package')



app.engine('html',ejs.__express)
app.set('view engine', 'html');
app.set('views',__dirname + '/views/html');



app.use(express.static(path.join(__dirname,'views')))
app.use('/index',require('./routes/index'))
app.use('/manage',require('./routes/manage'))
app.use('/signIn',require('./routes/signIn'))
app.use('/signUp',require('./routes/signUp'))
app.use('/writeBlog',require('./routes/writeBlog'))
app.use('/detail',require('./routes/detail'))
app.use('/myself',require('./routes/myself'))
app.use('/tipDetail',require('./routes/tipDetail'))

app.use(flash());


app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
})