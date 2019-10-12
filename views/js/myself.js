$(document).ready(function () {
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
})