$(document).ready(function () {

    let body=new Vue({
        el:'#body',
        data: {
            pageName:'博文详情',
            fold:false,
            blogHeadFixed:false,
            sidebarDisplay:false,
            loginURL:window.URL+'/myself/getMyselfInformation',

            tool:new mainTool(),
            blog:{},
        },
        methods:{
            // jumpPage:this.tool.jumpPage,
            toFold:function (data) {
                this.fold=data;
            },
            openSidebar:function(){         //展开侧面栏
                this.sidebarDisplay=true;
            },
            getStart:function(e){
                this.tool.recordTouchStart(e);
            },
            changePosition:function (e) {
                let dir=this.tool.touchDirection(e);
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop || 0;
                switch (dir) {
                    case 'top':this.blogHeadFixed=true;break;
                    case 'bottom':scrollTop<50?this.blogHeadFixed=false:void (0);break;
                }

            },
            incSaw:function(id){
                let that=this;
                let data=new FormData();
                data.append('id',$.cookie('blogId'))
                new Interactive({
                    childPath:'/tipDetail/incSaw',
                    method:'post',
                    detail:data,
                    isFile:false,
                    successCallback:function (result) {

                    },
                    errorCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox(result.msg);
                        },500)

                    },
                }).init();
            },
            findOneTip:function () {
                let that=this;
                let data=new FormData();
                data.append('id',$.cookie('blogId'))
                that.promptBoxShow=true;
                new Interactive({
                    childPath:'/tipDetail/findOneTip',
                    method:'post',
                    detail:data,
                    isFile:false,
                    successCallback:function (result) {
                        let tip=result.Tip[0];
                        tip.keyWord= result.Tip[0].keyWord.split(',');
                        console.log(tip);
                        that.blog=tip;
                        that.incSaw($.cookie('blogId'));
                    },
                    errorCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox(result.msg);
                        },500)

                    },
                }).init();
            },
        },
        mounted(){
            $.cookie('blogId')?this.findOneTip():window.history.go(-1);

        }
    })





})