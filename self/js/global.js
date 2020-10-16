//Global
var SelfMath={
	f:function(f1,f2,s){
		f1=f1.toString();f2=f2.toString(); var f1Len,f2Len,len; f1.indexOf(".")<0?f1Len=0:f1Len=f1.length-f1.indexOf(".")-1; f2.indexOf(".")<0?f2Len=0:f2Len=f2.length-f2.indexOf(".")-1;
		f1Len>f2Len?len=f1Len:len=f2Len; f1=parseFloat(f1);f2=parseFloat(f2);
		if(s=="+"){if(f1Len<f2Len){f1Len=f2Len-f1Len;f2Len=0;}else{f2Len=f1Len-f2Len;f1Len=0;} return this.gf(this.gi(f1,f1Len)+this.gi(f2,f2Len),len) }
		else if(s=="-"){if(f1Len<f2Len){f1Len=f2Len-f1Len;f2Len=0;}else{f2Len=f1Len-f2Len;f1Len=0;} return this.gf(this.gi(f1,f1Len)-this.gi(f2,f2Len),len) }
		else if(s=="*"){ return this.gf(this.gi(f1)*this.gi(f2),f1Len+f2Len) }
		else if(s=="/"){ if(f1Len>f2Len){len=f1Len-f2Len;f1Len=0;}else{f1Len=Math.abs(f1Len-f2Len);len=0;} return this.gf(this.gi(f1,f1Len)/this.gi(f2),len) }
	},
	gf:function(num,len){
		num=num.toString();var boo; if(num.indexOf("-")<0){boo=false}else{boo=true;num=num.substring(1);} var numLen=num.length;
		if(numLen==len){ num="0."+num; }
		else if(numLen<len){
			var ts="0.",r=len-numLen;for(var i=0;i<r;i++)ts+="0"; num=ts+num;
		}
		else{ num=num.substring(0,numLen-len)+"."+num.substring(numLen-len); }
		if(boo)num="-"+num; return parseFloat(num);
	},
	gi:function(f,n){
		if(f.toString().indexOf(".")<0){ if(n)for(var i=0;i<n;i++)f+="0";return parseInt(f); }
		else{ var arr=f.toString().split("."); if(n)for(var i=0;i<n;i++)arr[1]+="0"; return parseInt(arr[0]+arr[1]); }

	}
}
function gn(s,boo){return boo?document.querySelectorAll(s):document.querySelector(s)}
function gs(n,s){return window.getComputedStyle(n,null).getPropertyValue(s)}