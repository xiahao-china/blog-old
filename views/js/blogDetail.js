$(document).ready(function () {
    let id=new FormData();
    id.append('id',$.cookie('id'));

    $.ajax({
        type: 'post',
        url: Path + '/tipDetail/findOneTip',
        contentType: false,
        dataType: 'json',
        processData:false,
        async: true,
        data: id,
        success: function (result) {
            if(result.status=='200'){
                let newTip=result.Tip[0];
                let imgURL=function(img){
                    let URL=Path+'/'+img;
                    URL=URL.replace(/ \ /g,"/");

                    return URL;
                }
                for (let i=0;i<newTip.length;i++){
                    newTip[i].img=imgURL(newTip[i].img);
                }

                new Vue({
                    el:"#blogDetail",
                    data:{
                        newTip:newTip,
                        keyword:newTip.keyWord.split(',')
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
        type: 'post',
        url: Path + '/tipDetail/incSaw',
        contentType: false,
        dataType: 'json',
        processData:false,
        async: true,
        data: id,
        success: function (result) {
            if(result.status=='200'){
                let newTip=result.Tip[0];
                let imgURL=function(img){
                    let URL=Path+'/'+img;
                    URL=URL.replace(/ \ /g,"/");

                    return URL;
                }
                for (let i=0;i<newTip.length;i++){
                    newTip[i].img=imgURL(newTip[i].img);
                }

                new Vue({
                    el:"#blogDetail",
                    data:{
                        newTip:newTip,
                        keyword:newTip.keyWord.split(',')
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