var to={ 
	n:"", cb:function(){}, 
	c:function(s){this.n.classList.toggle(s);}, 
	rma:function(){ var arr=document.querySelectorAll(".lunboD.active");for(var i=0;i<arr.length;i++){arr[i].classList.remove("active");} },
	e:function(cb){this.cb=cb;this.n.addEventListener("transitionend",this.cb)},
	leftMove:function(num,narr){
		this.n=gn(".lunboD:first-child"); 
		if(this.n.classList.contains("lunboDMoving"))return; 
		this.e((function(e){
			this.n.removeEventListener("transitionend",this.cb); this.c("lunboDMoving"); this.n.style.marginLeft=0;
			if(narr){var df=document.createDocumentFragment(); for(var i=0;i<narr.length;i++){df.appendChild(narr[i])}gn(".lunboD:last-child").parentNode.appendChild(df);  } else{ this.n.parentNode.appendChild(this.n) }
			this.rma();
		}).bind(this));
		this.c("lunboDMoving");this.n.style.marginLeft=-(100*num)+"%";
	},
	rightMove:function(num,narr){
		var fn=gn(".lunboD:first-child");
		if(fn.classList.contains("lunboDMoving"))return;
		 this.n=gn(".lunboD:last-child");
		if(narr&&narr.length>0){
			var df=document.createDocumentFragment(); for(var i=0;i<narr.length;i++){df.appendChild(narr[i]);}
			fn.parentNode.insertBefore(df,fn);this.n=gn(".lunboD:first-child")
			}
		else{fn.parentNode.insertBefore(this.n,fn);} this.c("lunboDMoving"); this.n.style.marginLeft=-(100*num)+"%";
		this.e((function(e){this.c("lunboDMoving");this.n.removeEventListener("transitionend",this.cb)}).bind(this));
		setTimeout((function(){this.n.style.marginLeft=0}).bind(this),14);
	},
	skipMove:function(num){
		var boo=""; num>0?boo=true:boo=false;
		num=Math.abs(num); if(num==0)return;
		var narr=gn(".lunboD",true),arr=[]; if(narr.length-1<num)num=narr.length-1;
		if(boo){ for(var i=0;i<num;i++)arr.push(narr[i]); to.leftMove(num,arr) }
		else{ for(var i=num;i>0;i--)arr.push(narr[narr.length-i]); to.rightMove(num,arr) }
	}
};