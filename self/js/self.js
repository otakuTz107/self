/*lunbo*/
var lunboto={ 
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
	//先绑定 transitionend ,然后在firstNode 添加.lunboDMoving 和 设置marginLeft:-x% (.lunboD预先设了margin:0); transitionend的callback里 解绑transitionend, 把 移动的标签 放到最后位置, 然后 移除.lunboDMoving 和 marginLeft:0 
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
		setTimeout((function(){this.n.style.marginLeft=0}).bind(this),16);
	},
	//先把最后节点移到开始位置, 添加 marginLeft:-100% 和 .lunboDMoving, 绑定transitionend, 最后在setTimeout设置marginLeft:0; transitionend的callback 移除.lunboDMoving 和 解绑transitionend
	skipMove:function(num){
		var boo=""; num>0?boo=true:boo=false;
		num=Math.abs(num); if(num==0)return;
		var narr=gn(".lunboD",true),arr=[]; if(narr.length-1<num)num=narr.length-1;
		if(boo){ for(var i=0;i<num;i++)arr.push(narr[i]); this.leftMove(num,arr) }
		else{ for(var i=num;i>0;i--)arr.push(narr[narr.length-i]); this.rightMove(num,arr) }
	}
};
function lunboFn(e){
	if(e.target.hasAttribute("data-left")){ lunboto.leftMove(1) }
	else if(e.target.hasAttribute("data-right")){ lunboto.rightMove(1) }
}
//Test Fn
function lunboTestFn(){lunboto.skipMove(gn(".lunboTest input[type=number]").value,true) }

/*manualTrans*/
var manualTrans={
	reGlobalRGBA:/rgba?\( *(?:[12][0-5][0-5]|[0]?[0-9]?[0-9]) *, *(?:[12][0-5][0-5]|[0]?[0-9]?[0-9]) *, *(?:[12][0-5][0-5]|[0]?[0-9]?[0-9]) *(?:, *[0]?\.\d+)? *\)/,
	reGlobal16:/#(?:[0-9a-f]{6}|[0-9a-f]{3})/,
	checkBoo:true,
	//先用以上属性进行判定再调用 changeStat 
	reRGBA:/\d*\.?\d+(?=[,) ])/g,
	re16:/[\da-fA-f]{2}/g,
	re16short:/[\da-fA-f]/g,
	changeStat:function(la,fa){
		var intervalId,self=this, ts,sn=gn(".manualCTransTest span"),sn2=gn(".manualCTransTarget");
		if(la.indexOf("#")<0){ //result RGBA
			la=this.getColorArr(la); fa.indexOf("#")<0?fa=this.getColorArr(fa):fa=this.convertedArr(fa);
			fa.length==4?fa[3]=parseFloat(fa[3]):fa.push(1); la.length==4?la[3]=parseFloat(la[3]):la.push(1);
			for(var i=0;i<3;i++){ fa[i]=parseInt(fa[i]); la[i]=parseInt(la[i]); }
			intervalId=setInterval(function(){ 
				for(i=0;i<3;i++){ if(fa[i]!=la[i]){fa[i]<la[i]?fa[i]++:fa[i]--} }
				if(fa[3]!=la[3]){
					if(fa[3]<la[3]){ fa[3]=SelfMath.f(fa[3],0.01,"+"); }
					else{ fa[3]=SelfMath.f(fa[3],0.01,"-"); }
					}
				ts="rgba("+fa[0]+","+fa[1]+","+fa[2]+","+fa[3]+")"; 
				sn2.style.backgroundColor=ts; sn.textContent=ts;
				if(fa[0]==la[0]&&fa[1]==la[1]&&fa[2]==la[2]&&fa[3]==la[3]){clearInterval(intervalId);self.checkBoo=true;}
			},10);
		}else{ //result 16, 没有透明度
			var elemArr16=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"], i,j,checkArr;
			la=this.getColorArr(la); fa.indexOf("#")<0?fa=this.convertedArr(fa):fa=this.getColorArr(fa);
			for(i=0;i<3;i++){fa[i]=fa[i].split("");la[i]=la[i].split("");}
			for(i=0;i<3;i++){
				for(j=0;j<2;j++){
					fa[i][j]=elemArr16.indexOf(fa[i][j]);la[i][j]=elemArr16.indexOf(la[i][j]);
				}
			}
			intervalId=setInterval(function(){
				ts="#",checkArr=[];
				for(i=0;i<3;i++){
					if(fa[i][0]!=la[i][0]){
						if(fa[i][0]>la[i][0]){ fa[i][1]-=1; if(fa[i][1]<0){ fa[i][0]-=1; fa[i][1]=15} }
						else{ fa[i][1]+=1;if(fa[i][1]>15){fa[i][0]+=1;fa[i][1]=0} }
					}else{
						fa[i][1]==la[i][1]?checkArr.push(1):(fa[i][1]>la[i][1]?fa[i][1]-=1:fa[i][1]+=1)
					}
					ts+=elemArr16[fa[i][0]]+elemArr16[fa[i][1]];
				}
				if(checkArr.length==3){clearInterval(intervalId);self.checkBoo=true;}
				sn2.style.backgroundColor=ts; sn.textContent=ts;
			},20)
		}
	},
	getColorArr:function(s){
		if(s.indexOf("#")<0){
			return s.match(this.reRGBA);
		}else{
			if(s.length>7)return; 
			if(s.length>4){ return s.match(this.re16); } 
			else{ var arr16;arr16=s.match(this.re16short);for(var i=0;i<3;i++){arr16[i]=arr16[i]+arr16[i]}return arr16; }
		}
	},
	convertedArr:function(s,boo){
		var arr=this.getColorArr(s); 
		if(s.indexOf("#")<0){//rgba to 16
			for(var i=0;i<3;i++){ arr[i]=parseInt(arr[i]).toString(16); } 
		}else{//16 to rgb
			for(var i=0;i<3;i++){ arr[i]=parseInt(arr[i],16).toString() } 
		}
		if(boo){
			if(arr.length==4){return {alpha:arr.pop(),color:arr} }
			else{return {alpha:"1",color:arr} }
		}else{return arr;}
	}
};
//Test Fn
function manualCTransTestFn(){
	var s=gn(".manualCTransTest input[type=text]").value;
	if(s.toString().indexOf("#")<0){ s=s.match(manualTrans.reGlobalRGBA); }else{ s=s.match(manualTrans.reGlobal16); }
	if(!s||!manualTrans.checkBoo)return; manualTrans.checkBoo=false;
	manualTrans.changeStat(s[0],gs(gn(".manualCTransTarget"),"background-color"));
}
function manualCTransTestInputFn(el){
	gn(".manualCTransTest input[type=text]").value=el.value;
}