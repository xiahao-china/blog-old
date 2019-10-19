
let CreatPromptBox =function(){
    let newNode=document.createElement('div');
    newNode.classList.add('PromptBox');
    newNode.style.display='none';
    document.body.appendChild(newNode);
    this.newNode=newNode;
}
CreatPromptBox.prototype.displayPromptBox=function(text){
    let element=this.newNode;
    $(element).addClass('animated');
    $(element).addClass('bounceInDown');
    element.innerText=text;
    $(element).fadeIn(300);
    let OutiId=setTimeout(function (){
        $(element).fadeOut(300);
        console.log('a');
    },1500)

}

let PromptBox=new CreatPromptBox();


// ________________________________________________________________________________________________________________________________________________________
let listBlog=function (result,el) {
    if(result.code=='200'){
        console.log('开始例举')
        let Tip=result.Tip;
        let imgURL=function(img){
            let URL=Path+'/'+img;
            console.log(URL);
            URL=URL.replace(/ \ /g,"/");
            return URL;
        }
        for (let i=0;i<result.Tip.length;i++){
            Tip[i].img=imgURL(Tip[i].img);
        }
        new Vue({
            el:el,
            data:{
                tipList:Tip
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
                    $.cookie('id','');
                    $.cookie('id',id);
                    location.href='./blogDetail.html'
                },
            }
        })
    }
    else PromptBox.displayPromptBox(result.msg);
}
