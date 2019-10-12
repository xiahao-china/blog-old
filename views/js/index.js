function todetail() {
    location.href='detail.html';
}

$(document).ready(function () {

    let CreateRegistFunction=function () {
        this.AllowRegistration=[false,false];

    };
    CreateRegistFunction.prototype.time=0;
    CreateRegistFunction.prototype.regist=function() {
        $.ajax({
            type: 'post',
            url: URL + '/regist',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                userName:document.getElementById('Name').value,
                userSex:document.getElementById('Sex').value,
                userPassword:document.getElementById('Password').value,
                userEmail:document.getElementById('Email').value,
                emailKey:document.getElementById('EmailKey').value,
            },
            success: function (result) {
                if(result.code=='200'){
                    PromptBox.displayPromptBox('注册成功');
                    window.location='index.html'
                }
                else PromptBox.displayPromptBox(result.msg);
            },
            error: function () {
                PromptBox.displayPromptBox('服务器开小差啦');
            }
        })
    }
    CreateRegistFunction.prototype.singIn=function(){
        let user = new FormData();

        user.append('name', $('[name="name"]').val())
        user.append('password', $('[name="password"]').val())

        $.ajax({
            type: 'post',
            url: Path+'/signIn',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: user,
            success: function (result) {
                PromptBox.displayPromptBox('登陆成功');
            },
            error: function () {
                PromptBox.displayPromptBox('操作失败');
            }
        })
    }
    CreateRegistFunction.prototype.DetectionSymbol=function (value) {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if(regEn.test(value) || regCn.test(value)) {
            PromptBox.displayPromptBox("不能包含特殊字符");
            return false;
        }else {
            return true;
        }
    }
    CreateRegistFunction.prototype.DetectionNum=function(value){
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
    }
    CreateRegistFunction.prototype.DetectionEmail=function (str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }
    CreateRegistFunction.prototype.getEmailKey=function(){
        console.log()
        if (RegistFunction.DetectionEmail(document.getElementById('EmailKey').value) && CreateRegistFunction.prototype.time==0){
            $('#GetEmailKey').removeClass('btn-success');
            $('#GetEmailKey').addClass('disabled');

            (function () {
                CreateRegistFunction.prototype.time=30;
                let IntvId=setInterval(function () {
                    if (CreateRegistFunction.prototype.time>0){
                        CreateRegistFunction.prototype.time--;
                        document.getElementById('GetEmailKey').value=CreateRegistFunction.prototype.time;
                    }else {
                        $('#GetEmailKey').removeClass('disabled');
                        $('#GetEmailKey').addClass('btn-success');
                        document.getElementById('GetEmailKey').value='获取验证码';
                        window.clearInterval(IntvId);
                    }
                },1000)
            })()
            $.ajax({
                type: 'post',
                url: URL + '/regist',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data: {
                    userEmail:document.getElementById('Email').value,
                },
                success: function (result) {
                    if(result.code=='200'){
                        PromptBox.displayPromptBox('验证码已发送，请前往登陆邮箱查收');

                    }
                    else PromptBox.displayPromptBox(result.msg);
                },
                error: function () {
                    PromptBox.displayPromptBox('服务器开小差啦');
                }
            })
        }else {
            if (!RegistFunction.DetectionEmail(document.getElementById('EmailKey').value)){
                PromptBox.displayPromptBox('请填写邮箱');
            }else {
                PromptBox.displayPromptBox('获取验证码过于频繁');
            }
        }
    }
    let RegistFunction=new CreateRegistFunction();

    (function main() {

        $('.signInput').blur(function () {
            let innervalue=event.path[0].value;
            switch (event.path[0].name) {
                case 'name':(function () {
                    if (innervalue.length>0 && innervalue.length<20 && RegistFunction.DetectionSymbol(innervalue)){
                        RegistFunction.AllowRegistration[0]=true;
                    } else {
                        RegistFunction.AllowRegistration[0]=false;
                        PromptBox.displayPromptBox('请输入正确的账号名');
                    }
                })();break;

                case 'password':(function () {
                    if (RegistFunction.DetectionSymbol(innervalue)&&RegistFunction.DetectionNum(innervalue)){
                        RegistFunction.AllowRegistration[1]=true;
                    } else {
                        RegistFunction.AllowRegistration[1]=false;
                        PromptBox.displayPromptBox('请输入正确的密码');
                    }
                })();break;

            }
        })
        $('#toSignIn').click(function () {
            let Status=true;
            for(let i=0,l=RegistFunction.AllowRegistration.length;i<l;i++){
                Status =Status&RegistFunction.AllowRegistration[i];
            }

            $('#ToRegist').addClass('rubberBand');
            if (Status){
                RegistFunction.singIn();
                $('#ToRegist').on('animationend',function () {
                    $('#ToRegist').removeClass('rubberBand')
                })
                $('#signIn').modal('hide')
            } else {
                PromptBox.displayPromptBox('您有信息未填写或者填写有误');
                $('#ToRegist').on('animationend',function () {
                    $('#ToRegist').removeClass('rubberBand')
                })
            }
        })
        $('.logIn>div>input').on('keypress',function () {
            if (event.keyCode==13){
                $('#toSignIn').click();
            }
        })
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
                    let hotTip='';
                    let imgURL=function(img){
                        let URL=Path+'/'+img;
                        URL=URL.replace(/\\/g,"/");
                        return URL;
                    }


                    for (let i=0;i<4;i++){
                        let img=result.Tip[i];
                        hotTip +='<div >\n' +
                            '            <img src="'+ imgURL(img.img) +'">\n' +
                            '            <div class="row">\n' +
                            '                <div></div>\n' +
                            '                <div></div>\n' +
                            '                <div>\n' +
                            '                    <p>'+result.Tip[i].name+'<span class="text-muted"><embed class="HotTipSvg" src="../svg/write.svg">'+result.Tip[i].action+'</span></p>\n' +
                            '                    <p>'+result.Tip[i].briefIntroduction+'</p>\n' +
                            '                    <p class="text-muted pull-right"><span><embed class="HotTipSvg" src="../svg/eye.svg">'+result.Tip[i].saw+'</span>\n' +
                            '                        <span><embed class="HotTipSvg" src="../svg/time.svg">'+result.Tip[i].time+'</span></p>\n' +
                            '                </div>\n' +
                            '            </div>'+
                            '</div>'

                    }
                    $('.HotTip').html(hotTip);
                }
                else PromptBox.displayPromptBox(result.msg);
            },
            error: function () {
                PromptBox.displayPromptBox('服务器开小差啦');
            }
        })
    })()




})