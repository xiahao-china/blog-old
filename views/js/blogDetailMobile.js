$(document).ready(function () {

    let body=new Vue({
        el:'#body',
        data: {
            pageName:'博文详情',
            fold:false,
            blogHeadFixed:false,
            sidebarDisplay:false,

            tool:new mainTool(),
            blog:{
                name:'生成器函数介绍',
                author:'Clut',
                time:'2019-10-11 20:41',
                saw:'3',
                collected:false,
                keyword:['前端','生成器函数'],
                content:'<span class="Apple-style-span" style="border-collapse: separate; color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-variant-numeric: normal; font-variant-east-asian: normal; line-height: normal; border-spacing: 0px; text-size-adjust: auto; font-size: medium;"><div style="margin: 0px auto; padding: 20px; border-width: 0px; border-style: initial; border-color: initial; font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 14px; line-height: 1.6; color: rgb(51, 51, 51); max-width: 960px;"><h1 style="margin-top: 0px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial; font-weight: bold; -webkit-font-smoothing: antialiased; font-size: 28px; color: rgb(0, 0, 0);">生成器函数介绍</h1><hr style="clear: both; margin: 15px 0px; border-style: none none solid; border-top-width: initial; border-right-width: initial; border-left-width: initial; border-top-color: initial; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; border-bottom-width: 4px; border-bottom-color: rgb(221, 221, 221); padding: 0px;"><p style="margin-top: 15px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">生成器函数即形如</strong></p><pre style="margin-top: 15px; margin-bottom: 15px; padding: 6px 10px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; background-color: rgb(248, 248, 248); line-height: 19px; border-radius: 3px;"><code style="margin: 0px; font-size: 12px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; white-space: pre; border-style: none; border-radius: 3px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-width: initial; border-color: initial;">function* 函数名(){}</code></pre><p style="margin-top: 15px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">的函数,他的功能也像他的名字一样，用于生成某些特定计划好的字符<br>如常用工具或者人名列表，或者如下图的ID</strong></p><pre style="margin-top: 15px; margin-bottom: 15px; padding: 6px 10px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; background-color: rgb(248, 248, 248); line-height: 19px; border-radius: 3px;"><code style="margin: 0px; font-size: 12px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; white-space: pre; border-style: none; border-radius: 3px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-width: initial; border-color: initial;">function* putout_id(){    let ID=1;    while(ID)    {        yield ID++;    }}const lie=putout_id();const next1={ID:lie.next().value};const next2={ID:lie.next().value};console.log(next1.ID);console.log(next2.ID);</code></pre><p style="margin-top: 15px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">乍一看上去好像是一个死循环，但由于生成器具有每执行一次便挂起(暂停)的特性<br>即lie.next().value执行后生成器函数会暂停，直到下一次lie.next().value<br><br>因此除非你不停的调用他，不然他会在执行后挂起,而后我们使用它自带的next()方法来对生成器进行迭代，并用value取出他的返回值。<br><br>结果如下：</strong><span class="Apple-converted-space">&nbsp;</span><img src="https://i.imgur.com/iJ6VNdl.png" style="margin: 0px; padding: 0px; max-width: 100%;"><span class="Apple-converted-space">&nbsp;</span><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">这样的好处就在于保证了生成的ID不会重复，且随要随取，就像叫号机一样。</strong></p><hr style="clear: both; margin: 15px 0px; border-style: none none solid; border-top-width: initial; border-right-width: initial; border-left-width: initial; border-top-color: initial; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: transparent; border-bottom-width: 4px; border-bottom-color: rgb(221, 221, 221); padding: 0px;"><h2 style="margin-right: 0px; margin-left: 0px; padding: 0px; border-width: 0px 0px 1px; border-top-style: initial; border-right-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-left-color: initial; font-weight: bold; -webkit-font-smoothing: antialiased; font-size: 24px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); color: rgb(0, 0, 0);">同时要注意yield</h2><p style="margin-top: 10px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">yield是属于生成器函数的一个关键词,yield关键字就像return一样但他实际返回一个IteratorResult对象<br>它有两个属性，value和done。value属性是对yield表达式求值的结果，而done是false，表示生成器函数尚未完全完成。</strong><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">当生成器函数遇到他时就会暂停，直到下一次next方法的调用</strong><br><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">举个如下的例子</strong></p><pre style="margin-top: 15px; margin-bottom: 15px; padding: 6px 10px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; background-color: rgb(248, 248, 248); line-height: 19px; border-radius: 3px;"><code style="margin: 0px; font-size: 12px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; white-space: pre; border-style: none; border-radius: 3px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-width: initial; border-color: initial;">function* putout_id(){    let ID=1;    ++ID;    ++ID;    while(ID)    {        yield ID++;    }}const lie=putout_id();const next1={ID:lie.next().value};const next2={ID:lie.next().value};console.log(next1.ID);console.log(next2.ID);</code></pre><p style="margin-top: 15px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">结果如下:</strong><br><img src="https://i.imgur.com/icIvI91.png" style="margin: 0px; padding: 0px; max-width: 100%;"><span class="Apple-converted-space">&nbsp;</span><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">这个例子中我们仅在let下加入了两次使ID进行自加的动作，<br>但是很显然第一次执行的时候是执行到了第二次yield关键词才停止的，<br>前面的let ID=1;++ID;++ID;yield ID++(由于是先出后加故显示为3);都被执行了.</strong></p><h2 style="margin-right: 0px; margin-left: 0px; padding: 0px; border-width: 0px 0px 1px; border-top-style: initial; border-right-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-left-color: initial; font-weight: bold; -webkit-font-smoothing: antialiased; font-size: 24px; border-bottom-style: solid; border-bottom-color: rgb(204, 204, 204); color: rgb(0, 0, 0);">除此之外还有yield*需要注意</h2><p style="margin-top: 10px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">乍一看上去好似只比yield多了个星号，但他的作用就在于可以在生成器函数中嵌套生成器函数,并使其自动迭代.</strong><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">具体函数如下</strong></p><pre style="margin-top: 15px; margin-bottom: 15px; padding: 6px 10px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; background-color: rgb(248, 248, 248); line-height: 19px; border-radius: 3px;"><code style="margin: 0px; font-size: 12px; font-family: Consolas, &quot;Liberation Mono&quot;, Courier, monospace; white-space: pre; border-style: none; border-radius: 3px; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-width: initial; border-color: initial;">function* putout_id(){let ID=1;yield other();while(ID){yield ID++;}}function* other() {yield "a";yield "b";}const lie=putout_id();const next1={ID:lie.next().value};const next2={ID:lie.next().value};console.log(next1.ID);console.log(next2.ID);</code></pre><p style="margin-top: 15px; margin-bottom: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial;"><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">此为未加星号版，结果如下:</strong><span class="Apple-converted-space">&nbsp;</span><img src="https://i.imgur.com/99DgbNF.png" style="margin: 0px; padding: 0px; max-width: 100%;"><span class="Apple-converted-space">&nbsp;</span><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">很显然，未加星号的无法自动迭代，输出为一个名为other生成器函数对象。</strong></p><p style="margin-top: 15px; padding: 0px; border-width: 0px; border-style: initial; border-color: initial; margin-bottom: 0px !important;"><br><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">我们再来看加入星号版的结果</strong><span class="Apple-converted-space">&nbsp;</span><img src="https://i.imgur.com/ChhvGTc.png" style="margin: 0px; padding: 0px; max-width: 100%;"><span class="Apple-converted-space">&nbsp;</span><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; ">输出结果为a和b如我们所想的迭代的结果</strong></p></div></span>            '
            }
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