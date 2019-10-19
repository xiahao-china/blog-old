
function deleteBlogKey(){
    console.log(event);
    $(event.path[2]).remove();
}
function choseImg(){
    $('#tipHeadImg').trigger('click');
}

$(document).ready(function () {
    let CreateTipFunction=function () {
        this.allowUpTip=[true,true,true,true,true];
    };
    CreateTipFunction.prototype.checkDetail=function (value) {
        if (!value){
            PromptBox.displayPromptBox("请输入需要反馈的详细信息");
            return false;
        }else {
            return true
        }
    }
    CreateTipFunction.prototype.checkImg=function (element) {
        if (!element.files){
            PromptBox.displayPromptBox("上传图片方便我们更好解决问题");
            return false;
        }else {
            return true
        }
    }
    CreateTipFunction.prototype.postTip=function(value,element) {
        let tip = new FormData();
        let keyWord=[];
        tip.append('name', $('[name="blogName"]').val())
        tip.append('details', $('#editor').html())
        for (let i=0;i<$('.addBlogKey').children('p').length;i++ ){
            keyWord.push($('.addBlogKey').children('p').eq(i).text());
        }
        tip.append('keyWord', keyWord);
        tip.append('briefIntroduction', $('[name="briefIntroduction"]').val());
        tip.append('img', $('#tipHeadImg')[0].files[0]);

        $.ajax({
            type: 'post',
            url: Path+'/writeBlog',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: tip,
            success: function (result) {
                if (result.status=='200'){
                    PromptBox.displayPromptBox('上传成功，将跳转至主页');
                    setTimeout(function () {
                        location.href='index.html'
                    },3000)

                }else {
                    PromptBox.displayPromptBox('上传失败');
                }
            },
            error: function () {
                alert('服务器连接失败啦');
            }
        })
    }
    CreateTipFunction.prototype.DetectionImg=function (value){
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(value)) {
            return false;
        }else {
            return true;
        }
    }
    CreateTipFunction.prototype.addImg=function(){
        $('.CoverImg')[0].innerHTML='';
        let img=document.createElement('img');
        let reader=new FileReader();
        reader.readAsDataURL($('#tipHeadImg')[0].files[0]);
        reader.onloadend=function(){
            $(img).attr('src',reader.result)
            $('.CoverImg')[0].append(img);
        }
        this.allowUpTip[4]=true;
    }
    let TipFunction=new CreateTipFunction();

    $('#tipHeadImg').change(function () {
        for (let i=0;i<$('#tipHeadImg')[0].files.length;i++){
            if (!TipFunction.DetectionImg($('#tipHeadImg')[0].files[i].name)){
                PromptBox.displayPromptBox('请选择图片上传');
                $('#tipHeadImg')[0].value = "";
                break;
            }

            if (i==$('#tipHeadImg')[0].files.length-1){
                TipFunction.addImg();
            }
        }

    })



    $(function(){
        //定义字体样式
        function initToolbarBootstrapBindings() {
            var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
                    'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
                    'Times New Roman', 'Verdana'],
                fontTarget = $('[title=Font]').siblings('.dropdown-menu');
            $.each(fonts, function (idx, fontName) {
                fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
            });
            $('a[title]').tooltip({container:'body'});
            $('.dropdown-menu input').click(function() {return false;})
                .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
                .keydown('esc', function () {this.value='';$(this).change();});

            $('[data-role=magic-overlay]').each(function () {
                var overlay = $(this), target = $(overlay.data('target'));
                overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
            });
            $('#voiceBtn').hide();
            // if ("onwebkitspeechchange"  in document.createElement("input")) {
            //   var editorOffset = $('#editor').offset();
            //   $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
            // } else {
            //   $('#voiceBtn').hide();
            // }
        };

        //菜单栏绑定调用
        initToolbarBootstrapBindings();

        //插件调用
        $('#editor').wysiwyg();

        window.prettyPrint && prettyPrint();
    });
    $('.addBlogKey button:last').click(function () {
        let inner=document.createElement('input');
        inner.type='text';
        inner.maxLength='8';
        inner.placeholder="关键词最多8字符";
        $('.addBlogKey button:last')[0].before(inner);
        $(inner)[0].focus();
        $(inner).blur(function () {
            let text=document.createElement('p');
            text.classList.add('btn');
            text.classList.add('text-muted');
            text.innerHTML=inner.value+'<button class="btn" onclick="deleteBlogKey()"><span class="glyphicon glyphicon-remove"></span></button>'
            $(inner)[0].remove();
            $('.addBlogKey button:last')[0].before(text);
        })
    })
    $('#putBlog').click(function () {
        TipFunction.allowUpTip[0]=TipFunction.allowUpTip[0]&& $("[name='blogName']").val();
        TipFunction.allowUpTip[1]=TipFunction.allowUpTip[1]&& $("[name='briefIntroduction']").val();
        TipFunction.allowUpTip[2]=TipFunction.allowUpTip[2]&& $("#editor").html();
        TipFunction.allowUpTip[3]=TipFunction.allowUpTip[3]&& $('.addBlogKey').children('p').length;
        let key=true;
        console.log(TipFunction.allowUpTip);
        for (let i of TipFunction.allowUpTip){
            key = key && i;
        }
        key? TipFunction.postTip():PromptBox.displayPromptBox('帖子未填写完成，请继续编辑');

    })

})