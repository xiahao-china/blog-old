
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
