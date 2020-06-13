Vue.component('prompt-box',{
    props:['customize','show','statusIndex'],
    data: function () {
        return {
            LoadAnimationList:['#a3cf62','#90d7ec','#999d9c','#faa755'],
            status:{
                list:['PB-loading','PB-error','PB-success','PB-text'],
                index:0
            },
            text: ['加载中...','出现了一些错误，请重试','操作成功'],

        }
    },
    template:
        '<div class="promptBox" v-bind:class="statusIndex!=0?status[statusIndex]:\'\'" v-show="show">\n' +
        '<transition name="promptBox" tag="div" appear>'+
        '    <div class="col-sm-6 col-md-6 col-xs-6 noPad" v-show="show">\n' +
        '        <transition-group name="load" tag="div" >\n' +
        '            <div class=""\n' +
        '                 v-for="(item,index) in LoadAnimationList"\n' +
        '                 v-bind:style="{height:(6-index/2) + \'rem\', width:(6-index/2) + \'rem\',borderColor:item}"\n' +
        '                 v-bind:class="index%2===0?(index%4===0?\'leftBorder\':\'rightBorder\'):(index%3===0?\'bottomBorder\':\'topBorder\')"\n' +
        '                 v-bind:key="\'pload\'+ index"\n' +
        '            ></div>\n' +
        '        </transition-group>\n' +
        '\n' +
        '        <div class="col-md-12 col-sm-12 col-xs-12 noPad">{{customize?customize:text[status.index]}}</div>\n' +
        '    </div>\n' +
        '</transition >'+
        '</div>',

    
})
Vue.component('blog-head',{
    props: {
        'page-name':{
            type:String,
            default:'未知页面',
        },  //页面名称
        'fold':{
            type:Boolean,
            default:false,
        },      //顶部是否折叠
        'fixed':{
            type:Boolean,
            default:false,
        },      //顶部是否固定 （防遮挡）
        'open-sidebar':{                    //按钮展开侧面栏
            type:Function,
            default:function () {
                console.log('您还未设置侧面栏')
            }
        }
    },
    data:{
        browseMode:{
            displayMore:false,
        }
    },
    methods:{
        toFold:function () {
            this.$emit('to-fold',false);
        },
        backPage:function () {
            window.history.go(-1);
        }

    },
    computed: {
        CHeadFold:function () {
            if (this.fold) {
                return {

                    margin:'0.2rem 0',

                }
            }
            return ''
        }
    },
    watch:{
        fold:function () {
            console.log(this.fold);
        }
    },
    template: '<nav class="navbar navbar-default nav-fill CHead" v-bind:style="{\'position\':(fixed?\'fixed\':\'relative\')}"  @click="toFold" role="navigation" >\n' +
        '        <div class="container-fluid">\n' +
        '            <div class="navbar-header" >\n' +
        '                <button v-show="!fold" type="button" class="navbar-toggle" data-toggle="collapse"\n' +
        '                        data-target="#example-navbar-collapse" >\n' +
        '                    <div v-on:click="openSidebar">\n' +
        '                        <span class="sr-only">切换导航</span>\n' +
        '                        <span class="icon-bar"></span>\n' +
        '                        <span class="icon-bar"></span>\n' +
        '                        <span class="icon-bar"></span>\n' +
        '                    </div>\n' +
        '                </button>\n' +
        '                <a class="navbar-brand" v-show="!fold" href="#" @click="backPage"><span class="glyphicon glyphicon-chevron-left"></span></a>\n' +
        '                <p class="navbar-text text-center" v-bind:style="CHeadFold" href="#">{{pageName}}</p>\n' +
        '            </div>\n' +
        '            \n' +
        '        </div>\n' +
        '    </nav>'
})
Vue.component('load-bottom',{
    props:{
        'get-more-data':{
            type:Function
        }
    },
    data:function(){
        return {
            startLoading:false
        }
    },
    methods:{
        checkLie:function (getMoreDataFunction) {
            let that=this;
            $("body").on("touchend", function(e) {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                if(scrollHeight > clientHeight && Math.abs(scrollTop + clientHeight - scrollHeight)<30) {
                    try {

                        if(that.getMoreData){
                            let promise=new Promise(function (resolve, reject) {
                                that.startLoading=true;
                                that.getMoreData(resolve, reject);
                            }).then(function (data) {
                                that.endLoad();
                            })

                        }else{
                            throw new Error('您未填写下拉后的加载函数')
                        }
                    }catch (e) {
                        console.log(e);
                    }

                }
            });
        },
        endLoad:function () {
            this.startLoading=false;
        },

    },
    template:'<div  class="pagerScroll"  v-on:endLoading="endLoad" >\n' +
        '            <img v-show="startLoading" v-on:load="checkLie" key="\'loadingBottom\'" src="../img/loading.png">\n' +
        '        </div>'
})
Vue.component('sidebar',{
    props:{
        display:{
            default:false,
            type:Boolean,
        }
    },
    data:function(){
        return {
            list:[{
                name:'个人空间',
                link:'./myself.html',
                img:'../img/Personal.png',
            },{
                name:'收藏博客',
                link:'#',
                img:'../img/collection.png',
            },{
                name:'管理博客',
                link:'#',
                img:'../img/manage.png',
            },{
                name:'本站导航',
                link:'#',
                img:'../img/message.png',
            },]
        }
    },
    methods:{
        closeSidebar:function () {
            this.$emit("update:display",false);
        },

        enterBefore:function (el,done) {
            $(el).css({
                'opacity':0,
                'transform':'translateY(30px)',
            })
            done();
        },
        enter:function (el,done) {
            setTimeout(function () {
                $(el).css({
                    'opacity':1,
                    'transform':'translateY(0)',
                })
                done();
            },100*el.dataset.index)
        }

    },
    template:'<transition tag="div" name="sidebar-shell" appear>\n' +
        '    <div class="sidebar container" key="sidebarShell" v-if="display" v-on:sidebar-change="console.log(\'a\')">\n' +
        '        <transition-group\n' +
        '                tag="ul"\n' +
        '                name="sidebar"\n' +
        '                appear\n' +
        '                v-on:before-enter="enterBefore"\n' +
        '                v-on:enter="enter"\n' +
        '        >\n' +
        '            <li key="sidebarClose" key="sidebar0" v-bind:data-index="0"  @click="closeSidebar"><span class="glyphicon glyphicon-remove font-lger"></span></li>\n' +
        '            <li key="sidebarHeadImg" key="sidebar1" v-bind:data-index="1"><img class="img-circle" src="../img/head_test.jpg"></li>\n' +
        '            <li key="sidebarUserName" key="sidebar2" v-bind:data-index="2" class="font-lger blod">Clut</li>\n' +
        '            <li v-for="(item,index) in list" v-bind:key="\'sidebarList\'+(index+3)" v-bind:data-index="index+3" class="sidebarList">\n' +
        '                <img :src="item.img" class="img-md">\n' +
        '                <a :href="item.link" class="">{{item.name}}</a>\n' +
        '            </li>\n' +
        '        </transition-group>\n' +
        '    </div>\n' +
        '</transition>'
})
// ————————————————————————————————交互用便捷模块————————————————————————————————
// 使用模板如下：
// let img=new FormData();
// img.append('detail',value);
// img.append('file',element.files[0]);
// new Interactive({
//     childPath:'/oss/uploadFile',
//     method:'PUT',
//     detail:img,
//     isFile:true,
//     successCallback:function (result) {
//          doSomething();
//     },
//     errorCallback:function () {
//          doSomething();
//     },
// }).init();


let Interactive=function (inf) {
    this.Path=inf.childPath;
    this.Method=inf.method||'POST';
    this.detail=inf.detail;
    this.successCallback=inf.successCallback;
    this.errorCallback=inf.errorCallback;
    this.isFile=inf.isFile||false;
    return this;
}
Interactive.prototype={
    init:function () {
        let that=this;
        that.isFile?that.Path=fileURL+that.Path:that.Path=URL+that.Path;
        console.log(that.detail);
        switch (that.Method.toLowerCase()) {
            case 'get':(function myGet(){
                let formdataEntrise=that.detail.entries();
                let form={};
                for (let i of formdataEntrise){
                    form[i[0]]=i[1];
                }

                $.ajax({
                    type: that.Method,
                    url: that.Path,
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: 'json',
                    async: true,
                    data: form,
                    success: function (result) {
                        console.log(result);
                        that.copeResult(result);
                    },
                    error: function () {
                        PromptBox.displayPromptBox('联系不上服务器啦 - 3 - ');
                    }
                })
            })();break;
            default:$.ajax({
                type: that.Method,
                url: that.Path,
                contentType:false,
                dataType: 'json',
                processData:false,
                async: true,
                data: that.detail,
                success: function (result) {
                    console.log(result);
                    that.copeResult(result);
                },
                error: function () {
                    PromptBox.displayPromptBox('联系不上服务器啦 - 3 - ');
                }
            });break;
        }

        return this;
    },

    copeResult:function (result) {
        switch (result.status) {
            case '200':this.successCallback(result);break;
            case undefined:this.successCallback(result);break;
            default:this.errorCallback(result);break;
        }
    },

    detectionSymbol:function (value) {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if(regEn.test(value) || regCn.test(value)) {
        PromptBox.displayPromptBox("不能包含特殊字符");
        return false;
    }else {
        return true;
    }
},
    detectionNum:function(value){
    if (value.length>=6&&value.length<=18) {
        return true;
    }else {
        if (value.length>18) {
            PromptBox.displayPromptBox('输入超过18个字符，请重新输入');
            return false;
        }else {
            PromptBox.displayPromptBox('账号密码小于6个字符，请重新输入');
            return false;
        }

    }
},
    detectionEmail:function (str){
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(str);
},
}

// ————————————————————————————————提示框————————————————————————————————
let CreatPromptBox =function(){
    let newNode=document.createElement('div');
    newNode.classList.add('PromptBox');
    newNode.style.display='none';
    document.body.appendChild(newNode);
    this.newNode=newNode;
}
CreatPromptBox.prototype.displayPromptBox=function(text){
    let element=this.newNode;
    $(element).addClass('animated');
    $(element).addClass('bounceInDown');
    $(element).addClass('fast');
    element.innerText=text;
    $(element).fadeIn(300);
    let OutiId=setTimeout(function (){
        $(element).fadeOut(300);
        console.log('a');
    },1500)

}

let PromptBox=new CreatPromptBox();
// ————————————————————————————————其他全局函数————————————————————————————————
let mainTool=function () {
    this.jumpAim='';
    this.touchStart=[0,0];
    this.TOUCHJUDGE=80;
}
mainTool.prototype={

    jumpPage:function () {
        let e=event;
        window.document.location.href= $(e.target).attr('aim')+'.html'
    },
    recordTouchStart:function(e){
        this.touchStart=[e.touches[0].clientX,e.touches[0].clientY];
    },
    touchDirection:function (e) {
        let endy=e.changedTouches[0].clientY;
        let endx=e.changedTouches[0].clientX;
        if(endy-this.touchStart[1]<0 && Math.abs(endx-this.touchStart[0])<this.TOUCHJUDGE){
            return 'top';
        }
        if(endx-this.touchStart[0]>0 && Math.abs(endy-this.touchStart[1])<this.TOUCHJUDGE){
            return 'right';
        }
        if(endy-this.touchStart[1]>0 && Math.abs(endx-this.touchStart[0])<this.TOUCHJUDGE){
            return 'bottom';
        }
        if(endx-this.touchStart[0]<0 && Math.abs(endy-this.touchStart[1])<this.TOUCHJUDGE){
            return 'left';
        }
        return 'none';
    },
    DetectionSymbol:function (value) {
    let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if(regEn.test(value) || regCn.test(value)) {
        PromptBox.displayPromptBox("不能包含特殊字符");
        return false;
    }else {
        return true;
    }
},
    DetectionNum:function(value){
    if (value.length>=6&&value.length<=18) {
        return true;
    }else {
        if (value.length>18) {
            PromptBox.displayPromptBox('输入超过18个字符，请重新输入');
            return false;
        }else {
            PromptBox.displayPromptBox('账号密码小于6个字符，请重新输入');
            return false;
        }

    }
},
    DetectionEmail:function (str){
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return reg.test(str);
},
}