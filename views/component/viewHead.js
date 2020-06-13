$(document).ready(function () {
    let viewhead={
        template:'<nav class="head navbar navbar-collapse navbar-inverse ">\n' +
            '    <div class="col-lg-offset-2 col-lg-2 logo">\n' +
            '        <img src="../img/logo.png">\n' +
            '        <span>Blog</span>\n' +
            '    </div>\n' +
            '\n' +
            '    <div class="col-lg-6 ">\n' +
            '        <div class="collapse navbar-collapse pull-right ">\n' +
            '            <ul class="nav navbar-nav ">\n' +
            '                <li><a href="./index.html">主页</a></li>\n' +
            '                <li><a  href="./detail.html">博文目录</a></li>\n' +
            '                <li><a href="./myself.html">个人中心</a></li>\n' +
            '                <li><a class="active" href="./writeBlog.html">写博客</a></li>\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</nav>'
    }
    new Vue({
        el:'#viewHead',
        components:{
            viewhead:viewhead
        },
    })
})