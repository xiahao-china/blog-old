$(document).ready(function () {
    Vue.component('blog-head',{
        props: {
            'page-name':{
                type:String,
                default:'未知页面',
            },
            'fold':{
                type:Boolean,
                default:false,
            },
            'fixed':{
                type:Boolean,
                default:false,
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
            '                    <div>\n' +
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
    let changeInformation = function(){
        let inner=[];
        for (let i=0,l=$('.canChange').length;i<l;i++ ){
            inner.push($('.canChange').eq(i).text());
            if (!/About me:/i.test($('.canChange').eq(i).parent().text())){
                $('.canChange').eq(i).parent().append('<input class="changing" type="text" value="'+ inner[i]+'">')
            } else {
                let ele='<textarea class="changing"></textarea>'

                $('.canChange').eq(i).parent().append(ele);
                $('textarea').val(inner[i])
            }

        }
        $('.canChange').remove();

    }
    let getMyslefInformation=function(){
            $.ajax({
                type: 'post',
                url: Path+'/myself/getMyselfInformation',
                contentType:false,
                dataType: 'json',
                processData:false,
                async: true,
                data: {},
                success: function (result) {
                    if(result.status=='201'){
                        alert('您还未登录');
                        window.location.href='index.html'
                    }else if (result.status=='200'){
                    PromptBox.displayPromptBox(result.name)
                    $('#myInformation>p>span').eq(0).html(result.created_at);
                    $('#myInformation>p>span').eq(1).html(result.phone);
                    $('#myInformation>p>span').eq(2).html(result.mail);
                    $('#myInformation>p>span').eq(3).html(result.sex);
                    $('#myInformation p:last-child').eq(0).html(result.introduce );
                    }
                },
                error: function (result) {

                    if(result.status=='201'){
                        alert('您还未登录');
                        window.location.href='index.html'
                    }
                    PromptBox.displayPromptBox('操作失败');
                }
            })
    }
    let saveChange=function(){
        let user = new FormData();

        user.append('phone', $('.changing').eq(0).val())
        user.append('mail',$('.changing').eq(1).val())
        user.append('sex',$('.changing').eq(2).val())
        user.append('introduce',$('.changing').eq(3).val())

        $.ajax({
            type: 'put',
            url: Path+'/myself/upMyselfInformation',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: user,
            success: function (result) {
                if (result.status=='200'){
                    $('.changeInformation').html('修改资料');
                    PromptBox.displayPromptBox('修改成功')
                    location.href='myself.html';
                    console.log('a');
                    return;
                }
                return PromptBox.displayPromptBox('修改出现错误');
            },
            error: function () {
                alert('操作失败');
            }
        })
    }


    $('.surround').click(function () {
        $(event.target).addClass('jello');
        if (event.target.innerText=='修改资料'){
            changeInformation();
            event.target.innerText='保存资料'
            $('.changeInformation').click(function () {
                if (event.target.innerText='保存资料'){
                    saveChange();
                }
            })
        }
    })
    $('.surround').on('animationend',function () {
        $(event.target).removeClass('jello')
    })

    getMyslefInformation();


    new Vue({
        el:'#HeadBlog',
        data:{
            pageName:'博文详情',
            isMobile:false,
            fold:false,
            blogHeadFixed:false,
        },
        methods:{
            toFold:function (data) {
                this.fold=data;
            },
        },
        mounted(){
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                this.isMobile=true;
            }
        }

        
    })
})