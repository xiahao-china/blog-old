$(document).ready(function () {

    new Vue({
        el:'#TopAnimation',
        data: {
            topAnimationList:['#a3cf62','#90d7ec','#999d9c','#faa755'],
            showFirst:true,
            showNext:false,
            showMangerLogin:false,
            loginJello:false,
            loginData:{
                userName:'',
                keyword:''
            },
            promptBoxShow:false,
            tool:new mainTool(),
        },
        methods:{
            toShowNext:function (el) {
                let that=this;
                setTimeout(function () {
                    that.showFirst=false;
                    that.showNext=true;
                },700)
            },
            login:function () {
                let that=this;
                if (!this.loginData.userName || !this.tool.DetectionSymbol(this.loginData.userName)  ){
                    return false;
                }
                if (this.loginData.password<6 || this.loginData.password>10){
                    return false;
                }
                this.loginJello=true;
                this.promptBoxShow=true;
                let data=new FormData();
                data.append('name',this.loginData.userName);
                data.append('password',this.loginData.keyword);
                new Interactive({
                    childPath:'/signIn/',
                    method:'POST',
                    detail:data,
                    isFile:true,
                    successCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox('登陆成功，进入书房~');
                            location.href='browseBlog.html'
                        },500)

                    },
                    errorCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox(result.msg);
                        },500)

                    },
                }).init();
            },
            jumpPage:new mainTool().jumpPage,
        },

    })



})