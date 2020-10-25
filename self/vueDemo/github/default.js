//Functional API
var forIe={
	"ds_tg":function(tg,dn,s){if(!tg)return;dn="data-"+dn;tg.getAttribute(dn)?tg.setAttribute(dn,""):tg.setAttribute(dn,s)}
};
var fyIe={
	"ds_tg":function(tg,dn,s){if(!tg)return;tg.dataset[dn]?tg.dataset[dn]="":tg.dataset[dn]=s;}
}
var fnAPI={
	cs:function(){ var arr=Array.prototype.slice.apply(arguments), n=arr.shift(); wobj.cBoo?forIe[n].apply(null,arr):fyIe[n].apply(null,arr) },
	gb:function(n){ return n.getBoundingClientRect() },
	gVisibleElem:function(fn){
		var tmp=null; 
		for(;;){
			tmp=this.gb(fn); 
			if(tmp.top<0){ 
				if(tmp.height/2+tmp.top<=0){ tmp=fn.nextElementSibling; if(tmp){fn=tmp;continue} }
			}
			break;
		}
		fn.classList.add("temp");
		return fn
	},
	setClass:function(c,n,b){
		if(b)n.classList.toggle(c);
		else{b=document.getElementsByClassName(c)[0]; b?b.classList.remove(c):""; n.classList.add(c)}
	}
}

//Global API
function getScrollingElem(){
	if(document.body.scrollTop>document.documentElement.scrollTop)return wobj.scrollingElem=document.body;
	else if(document.body.scrollTop<document.documentElement.scrollTop)return wobj.scrollingElem=document.documentElement;
}


function gn(s,boo){return boo?document.querySelectorAll(s):document.querySelector(s)}
function gs(n,s){return window.getComputedStyle(n,null).getPropertyValue(s)}