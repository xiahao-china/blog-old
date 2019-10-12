$(document).ready(function () {

    $.ajax({
        type: 'get',
        url: Path + '/index/getHotTip',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            if(result.code=='200'){
                let hotTip=result.Tip;
                let imgURL=function(img){
                    let URL=Path+'/'+img;
                    URL=URL.replace(/ \ /g,"/");
                    return URL;
                }
                for (let i=0;i<4;i++){
                    hotTip[i].img=imgURL(hotTip[i].img);
                }
                new Vue({
                    el:"#tip",
                    data:{
                        hotTip:hotTip
                    },
                    methods:{
                        toBlogDetail:function () {
                            let id='';
                            for (let i=0;i<5;i++){
                                if ($(event.path[i]).attr('class')=='Tip'){
                                    id=$(event.path[i]).attr('id');
                                    break;
                                }
                            }
                            $.cookie('id',id);
                            location.href='./blogDetail.html'
                        }
                    }
                })

            }
            else PromptBox.displayPromptBox(result.msg);
        },
        error: function () {
            PromptBox.displayPromptBox('服务器开小差啦');
        }
    })
    $.ajax({
        type: 'get',
        url: Path + '/detail/getNewTip',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data: {
        },
        success: function (result) {
            if(result.status=='200'){
                let newTip=result.Tip;
                let imgURL=function(img){
                    let URL=Path+'/'+img;
                    URL=URL.replace(/ \ /g,"/");

                    return URL;
                }
                for (let i=0;i<newTip.length;i++){
                    newTip[i].img=imgURL(newTip[i].img);
                }

                new Vue({
                    el:"#newBlog",
                    data:{
                        newTip:newTip
                    },
                    methods:{
                        toBlogDetail:function () {
                            let id='';
                            for (let i=0;i<5;i++){
                                if ($(event.path[i]).attr('class')=='Tip'){
                                    id=$(event.path[i]).attr('id');
                                    break;
                                }
                            }
                            $.cookie('id',id);
                            location.href='./blogDetail.html'
                        }
                    }
                })
            }
            else PromptBox.displayPromptBox(result.msg);
        },
        error: function () {
            PromptBox.displayPromptBox('服务器开小差啦');
        }
    })

})