
function deleteBlogKey(){
    console.log(event);
    $(event.path[2]).remove();
}

$(document).ready(function () {
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
        let tip = new FormData();
        let keyWord=[];
        tip.append('name', $('[name="blogName"]').val())
        tip.append('details', $('#editor').html())
        for (let i=0;i<$('.addBlogKey').children('p').length;i++ ){
            keyWord.push($('.addBlogKey').children('p').eq(i).text());
        }
        tip.append('keyWord', keyWord);
        tip.append('briefIntroduction', $('[name="briefIntroduction"]').val());

        $.ajax({
            type: 'post',
            url: Path+'/writeBlog',
            contentType:false,
            dataType: 'json',
            processData:false,
            async: true,
            data: tip,
            success: function (result) {
                PromptBox.displayPromptBox('登陆成功');
            },
            error: function () {
                alert('操作失败');
            }
        })
    })
})