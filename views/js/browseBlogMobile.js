$(document).ready(function () {

    let body=new Vue({
        el:'#body',
        data: {
            pageName:'浏览博文',
            fold:false,
            blogHeadFixed:false,
            sidebarDisplay:false,
            loginURL:window.URL+'/myself/getMyselfInformation',

            tool:new mainTool(),
            blogList:[],
            startLoading:true,
            page:0,
            maxPage:1,
        },
        methods:{
            // jumpPage:this.tool.jumpPage,
            toFold:function (data) {        //折叠顶部导航
                this.fold=data;
            },
            getStart:function(e){
                this.tool.recordTouchStart(e);
            },
            openSidebar:function(){         //展开侧面栏
              this.sidebarDisplay=true;
            },
            changePosition:function (e) {
                let dir=this.tool.touchDirection(e);
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop || 0;
                switch (dir) {
                    case 'top':this.blogHeadFixed=true;break;
                    case 'bottom':scrollTop<50?this.blogHeadFixed=false:void (0);break;
                }

            },
            beforeEnter:function(el){

                el.style.transform='translateX(-100%)';
                el.style.opacity = 0;
            },
            blogListAnimated:function (el,done) {
                let that=this;

                setTimeout(function () {
                    el.style.transform='translateX(0)';
                    el.style.opacity = 1;
                    done();

                },el.dataset.index * 150)
            },
            getNewTip:function (resolve, reject) {
                if (this.maxPage<=this.page){
                    console.log(this.maxPage,this.page)
                    PromptBox.displayPromptBox('已经没有更多了');
                    resolve();
                    return false;
                }
                let that=this;
                let data=new FormData();
                this.page++;
                data.append('page',that.page);
                that.promptBoxShow=true;
                new Interactive({
                    childPath:'/detail/getNewTip',
                    method:'post',
                    detail:data,
                    isFile:false,
                    successCallback:function (result) {
                        result.Tip[result.Tip.length-1].nowPage=result.pageInf.nowPage;
                        let tip=[];
                        that.blogList[0]?tip=JSON.parse(JSON.stringify(that.blogList)):void(0);
                        for (let i of result.Tip){
                            i.time=i.time.split(' ')[0];
                            i.img=URL+'/'+i.img;
                            tip.push(i);
                        }
                        that.blogList=tip;
                        console.log(that.blogList);
                        that.maxPage=result.pageInf.maxPage;
                        resolve?resolve():void (0);
                    },
                    errorCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox(result.msg);
                        },500)

                    },
                }).init();
            },
            getHotTip:function () {
                let that=this;
                let data=new FormData();
                that.promptBoxShow=true;
                new Interactive({
                    childPath:'/index/getHotTip',
                    method:'get',
                    detail:data,
                    isFile:false,
                    successCallback:function (result) {
                        console.log(result);

                    },
                    errorCallback:function (result) {
                        setTimeout(function () {
                            that.promptBoxShow=false;
                            PromptBox.displayPromptBox(result.msg);
                        },500)

                    },
                }).init();
            },
            toGetBlogDetail:function (id) {
                $.cookie('blogId',id);
                location.href='blogDetail.html';
            }
        },
        mounted(){
            // this.getHotTip();
            this.getNewTip();
        }

    })





})