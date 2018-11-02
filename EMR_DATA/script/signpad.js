
var SIGNPAD_LIST;
var POINTER_MODE = 1; //0: 터치 , 1 : 마우스
var popCan, popCtx, popCheck = 0;

function CreateSignPad() 
{
	var bodyDom=document.getElementsByTagName('body');
	if(bodyDom)
		bodyDom[0].style.touchAction='none';
	
	
	SIGNPAD_LIST = new Array();
	//var canvas = document.createElement('canvas');
	//var ctx = canvas.getContext;
	//if(canvas && ctx)
	if(HtmlCanObjCheck && HtmlCtxCheck)
	{
		for(var i=0;i<AppletInfo.length;i++)
		{
			if(AppletInfo[i][1]==22)
			{
				var attr = AppletInfo[i][4].split("$");
					attrArr = attr[1].split("^");
				defImg = attrArr[10].split("|");
				SIGNPAD_LIST[SIGNPAD_LIST.length] = new BK_SIGNPAD("APP_"+AppletInfo[i][0],attr[1]);
				
			}
		}
	}
	else
	{
		for(var i=0;i<AppletInfo.length;i++)
		{
			if(AppletInfo[i][1]==22)
			{
				var attr = AppletInfo[i][4].split("$");
				SIGNPAD_LIST[SIGNPAD_LIST.length] = new BK_SIGNPAD_APPLET("APP_"+AppletInfo[i][0],attr[1]);
				
			}
		}
	}
	
	/*
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
	{
		for(var i=0;i<AppletInfo.length;i++)
		{
			if(AppletInfo[i][1]==22 && AppletInfo[i][3]==1)
			{
				var SP_Obj = document.getElementById("SP_"+AppletInfo[i][0]);
				var SP_Obj_Width = SP_Obj.clientWidth - 50;
				var SP_Obj_Height = SP_Obj.clientHeight;
				SP_Obj.innerHTML = "";
				SignPadObj[SignPadObj.length] = new NEW_SignPad("APP_"+AppletInfo[i][0], SP_Obj_Width, SP_Obj_Height,1);
			}
			if(AppletInfo[i][1]==22 && AppletInfo[i][3]==0)
			{
				var SP_Obj = document.getElementById("IMG_"+AppletInfo[i][0]);
				var SP_Obj_Width = SP_Obj.clientWidth;
				var SP_Obj_Height = SP_Obj.clientHeight;
				SP_Obj.innerHTML = "";
				SignPadObj[SignPadObj.length] = new NEW_SignPad("IMG_"+AppletInfo[i][0], SP_Obj_Width, SP_Obj_Height,0);
			}
		}
	}*/
};

function separatData(data)
{

	//return 
}

function BK_SIGNPAD_APPLET(id, attr)
{
	this.id = id;
	this.idNum = id.split('_');
	this.invalid;
	this.width;
	this.height;
	this.codebase;
	this.lineweight;
	this.SERVER_ROOT_PATH;
	this.type;
	this.default_value;
	this.attr = attr;
	
	var atr=this.attr.split("^");
	
	for(var i=0; i<atr.length; i++)
	{
		atr[i]= atr[i].split("|");
	}	
	
	for(var i=0; i<atr.length; i++)
	{
		switch(atr[i][0].toLowerCase())
		{
			case "invalid" : 
				this.invalid=atr[i][1];
				break;case "width" : 
				this.width=parseInt(atr[i][1]);
				break;
			case "height" : 
				this.height=parseInt(atr[i][1]);
				break;
			case "codebase" : 
				this.codebase=atr[i][1];
				break;
			case "lineweight" : 
				this.lineweight=atr[i][1];
				break;
			case "server_root_path" : 
				this.SERVER_ROOT_PATH=atr[i][1];
				break;
			case "type" : 
				this.type = atr[i][1];	
				break;
			case "default_value" : 
				this.default_value = atr[i][1];	
				break;
		}
	}
	
	var appletStr = "";
	if(this.type=="embedded")
	{
		appletStr = "<APPLET id='"+this.id+"' name='"+this.id+"' CODE='SignPad.class'  ARCHIVE='SignPad.jar' style='width:"+this.width+"px;height:"+this.height+"px;'>";
		appletStr += "\r\n<PARAM NAME='CODEBASE' VALUE='"+this.codebase+"' />";
		appletStr += "\r\n<PARAM NAME='INVALID' VALUE='true' />";
		appletStr += "\r\n<PARAM NAME='LINEWEIGHT' VALUE='3' />";
		appletStr += "\r\n</APPLET>";
		appletStr += "\r\n<IMG src='"+this.SERVER_ROOT_PATH+"/medios/EMR/EMR_DATA/script/signpad/images/clear_sign.png' style='width:30px; height:30px;' onclick='clearSignPad(\'"+this.idNum[1]+"\');'>";
	}
	else
	{
		appletStr = "<IMG id='IMG_"+this.idNum[1]+"' src='"+this.default_value+"' style='width:"+this.width+"px;height:"+this.height+"px;' onclick='showSignPad(this);'>";
			
	}
		document.getElementById("SP_"+this.idNum[1]).innerHTML = appletStr;
}

function BK_SIGNPAD(id, attr)
{
	this.id = id;
	this.width;
	this.height;
	this.codebase;
	this.lineweight;
	this.SERVER_ROOT_PATH;
	this.type;
	this.default_value;
	this.attr = attr;
	
	var atr=this.attr.split("^");
	var invalid=null;
	for(var i=0; i<atr.length; i++)
	{
		atr[i]= atr[i].split("|");
		if(atr[i][0]=="invalid")
		{	
			invalid = atr[i][1];
		}
	}	
	
	if(invalid != null)
	{
		for(var i=0; i<atr.length; i++)
		{
			switch(atr[i][0].toLowerCase())
			{
				case "width" : 
					this.width=parseInt(atr[i][1]);
					break;
				case "height" : 
					this.height=parseInt(atr[i][1]);
					break;
				case "codebase" : 
					this.codebase=atr[i][1];
					break;
				case "lineweight" : 
					this.lineweight=atr[i][1];
					break;
				case "server_root_path" : 
					this.SERVER_ROOT_PATH=atr[i][1];
					break;
				case "type" : 
					this.type = atr[i][1];	
					break;
				case "default_value" : 
					this.default_value = atr[i][1];	
					break;
			}
		}
	}
	
	var spDiv = id.split('_');
	var htmlStr; 
	if(this.type=="embedded")
	{
		htmlStr = "<canvas  id='"+this.id+"' width="+this.width+" height="+this.height+" ></canvas>";
		htmlStr += "<img id='"+spDiv[1]+"_eraser'  src='/medios/EMR/EMR_DATA/script/signpad/images/clear_sign.png' />";
		
		document.getElementById("SP_"+spDiv[1]).innerHTML = htmlStr;
	
		this.canvas = document.getElementById(this.id);
		this.eraser = document.getElementById(spDiv[1]+"_eraser");
		//alert(this.eraser.id);
		this.ctx = this.canvas.getContext('2d');
		//this.Browser = navigator.appVersion; 
		this.device = navigator.userAgent;
		this.downCheck = 0;
		if(!this.canvas) 
		{
			alert("캔버스 객체를 찾을 수 없음");
			return;
		}
		if(!this.canvas.getContext)
		{
			alert("Drawing Contextf를 찾을 수 없음");
			return;
		}  
		
		if(!this.ctx)
		{
			alert("getContext() 함수를 호출 할 수 없음");
			return;
		}
	  if(this.device.indexOf("Android") != -1 || this.device.indexOf('iPhone') != -1 || this.device.indexOf('iPad') != -1)
		{
			this.canvas.addEventListener('touchstart', S_TouchStart, false);
			this.canvas.addEventListener('touchmove',  S_TouchMove, false);
			this.canvas.addEventListener('touchend',   S_TouchEnd, false);
		}
		else
		{	
		  this.canvas.addEventListener('mousedown', S_MouseDown, false);
		  this.canvas.addEventListener('mousemove', S_MouseMove, false);
		 	this.canvas.addEventListener('mouseup',   S_MouseUp, false);
		}
	  
	  this.eraser.addEventListener('click', S_Eraser, false);
		
	  
	  this.mouseDown = function(eX,eY,touch)
	  {
	  	this.downCheck = 1;
	  	this.ctx.beginPath();
	  	this.ctx.moveTo(eX,eY);
	  }
	  
	  this.mouseMove = function(eX,eY,touch)
	  {
	  	if(this.downCheck==1) 
	  	{
			  this.ctx.lineTo(eX,eY);
			  this.ctx.stroke();  
			}
	  }
	  
	  this.mouseUp = function(eX,eY,touch)
	  { 
	  	this.downCheck=0;
	  	this.ctx.closePath();
	  }
	  
	  this.eraser = function()
	  {
	  	this.ctx.clearRect(0,0,this.width,this.height)
	  }
	}
	else
	{

		//영월에만 적용되어있는소스 주석부분
		//IE 10 이상 캔버스 태블릿에서 서명잘안되는 현상 수정 전까지 임시조치 
		//showsignpad 함수 호출
		//htmlStr = "<IMG id='IMG_"+spDiv[1]+"' src='/medios/EMR/EMR_DATA/script/signpad/images/no_sign.png' style='border:1px solid #ffffff;width:"+this.width+"px;height:"+this.height+"px;' onclick='showSignPad(this);' >";
		//document.getElementById("SP_"+spDiv[1]).innerHTML = htmlStr;
	    

		
		//htmlStr = "<IMG id='IMG_"+spDiv[1]+"' src='/medios/EMR/EMR_DATA/script/signpad/images/no_sign.png' style='border:1px solid #ffffff;width:"+this.width+"px;height:"+this.height+"px;' onclick='createPopup("+spDiv[1]+");' >";
		htmlStr = "<IMG id='IMG_"+spDiv[1]+"' src='" + defImg[1] +"' style='border:1px solid #ffffff;width:"+this.width+"px;height:"+this.height+"px;' onclick='createPopup("+spDiv[1]+");' >";
		
		htmlStr += "<div id='backgroundDiv_"+spDiv[1]+"' style='display:none;position:absolute;' onclick='popClose("+spDiv[1]+");'></div>";
		htmlStr += "<div id='IMGDIV_"+spDiv[1]+"' style='display:none;background:#808080;position:absolute;width:500;height:250;'><CANVAS id='drawCanvas_"+spDiv[1]+"' width='490px' height='190px' style='background:#ffffff;margin-left:5px;margin-top:5px;' ></CANVAS><div id='canvas_menu'>";
		htmlStr += "<table align='right'><tr><td><img class='test' id='eraser_"+spDiv[1]+"' onclick='popEraser("+spDiv[1]+");' src='/medios/EMR/EMR_DATA/script/signpad/images/agg_active_09.png' style='cursor:hand' /></td><td><img id='save_"+spDiv[1]+"' onclick='popSave("+spDiv[1]+");'  src='/medios/EMR/EMR_DATA/script/signpad/images/agg_active_08.png' style='cursor:hand' /></td>";
		htmlStr += "<td><img id='close_"+spDiv[1]+"' onclick='popClose("+spDiv[1]+");'  src='/medios/EMR/EMR_DATA/script/signpad/images/agg_active_15.png' style='cursor:hand' /></td></table></div></div>";
		document.getElementById("SP_"+spDiv[1]).innerHTML = htmlStr;

		
	}
};

function popClose(id)
{
	document.getElementById("IMGDIV_"+this.id).style.display="none";
	var bgDiv = document.getElementById("backgroundDiv_"+id);
	bgDiv.style.display="none";
	bgDiv.style.width=0;
	bgDiv.style.height=0;
};

function popSave(id)
{
	popCan = document.getElementById("drawCanvas_"+id);
	popCtx = popCan.getContext('2d');
	var imageData = popCan.toDataURL("image/jpg").replace("image/jpg", "image/jpeg; base64");
	imageData = imageData.split(",");
	document.getElementById("IMG_"+id).src = "data:image/jpeg;base64,"+imageData[1];
	document.getElementById("IMGDIV_"+id).style.display="none";
	var bgDiv = document.getElementById("backgroundDiv_"+id);
	bgDiv.style.display="none";
	bgDiv.style.width=0;
	bgDiv.style.height=0;
};

function popEraser(id)
{
	popCan = document.getElementById("drawCanvas_"+this.id);
	popCtx = popCan.getContext('2d');
	popCtx.clearRect(0,0,490,190);
};
var isChrome = false ;

function createPopup(id)
{
	//2018-01-15 윤현우 수정 ///////////////////////
	/*
		수정내용: 크롬, ie 버전체크 후 9버전인 경우를 분기시켜 로직 추기

	*/

	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) isChrome= true; 

	if( get_version_of_IE()!= 9 && isChrome ==false){
		
		this.id = id;
	var pop = document.getElementById('IMGDIV_'+this.id);
	popCan = document.getElementById("drawCanvas_"+this.id);
	//alert(document.body.clientWidth);
	
	
	var tempSignObj = GetObjectRect(pop);
	
	//alert(tempSignObj[1]);
	
	
	pop.style.left=document.body.clientWidth/8; //tempSignObj[0]+60; 
	popCan.style.left=document.body.clientWidth/8;
	var tempSignHeight;
	if(tempSignObj[1]<300)
		tempSignHeight = tempSignObj[1];
	else
		tempSignHeight = tempSignObj[1]-200;
	pop.style.top=tempSignHeight;  //document.body.clientHeight/4;
	popCan.style.top=tempSignHeight;
	pop.style.display="block";
	var bgDiv = document.getElementById("backgroundDiv_"+this.id);
	bgDiv.style.left=0;
	bgDiv.style.top=0;
	bgDiv.style.width=document.body.clientWidth;
	//bgDiv.style.height=document.body.clientHeight;
	bgDiv.style.height=document.body.scrollHeight;
	bgDiv.style.display="block";

	}else{

	this.id = id;
	var pop = document.getElementById('IMGDIV_'+this.id);
	popCan = document.getElementById("drawCanvas_"+this.id);
	//alert(document.body.clientWidth);
	
	
	var tempSignObj = GetObjectRect(pop);
	
	//alert(tempSignObj[1]);
	pop.style.width="500px";
	pop.style.height="250px";
	pop.zIndex=2;
	
	pop.style.left=(document.body.clientWidth/8)+"px"; //tempSignObj[0]+60; 
	popCan.style.left=(document.body.clientWidth/8)+"px";
	var tempSignHeight;
	if(tempSignObj[1]<300)
		tempSignHeight = tempSignObj[1];
	else
		tempSignHeight = tempSignObj[1]-200;
	pop.style.top=tempSignHeight+"px";  //document.body.clientHeight/4;
	popCan.style.top=tempSignHeight+"px";
	pop.style.display="block";
	var bgDiv = document.getElementById("backgroundDiv_"+this.id);
	bgDiv.zIndex=1;
	bgDiv.style.backgroundColor="#ffffff";
	bgDiv.style.opacity=0;
	bgDiv.style.left=0;
	bgDiv.style.top=0;
	bgDiv.style.width=document.body.clientWidth+"px";
	bgDiv.style.height=document.body.scrollHeight+"px";
	bgDiv.style.display="block";
	}
	
	
	popCtx = popCan.getContext('2d');
	popCtx.clearRect(0,0,490,190);
	var device = navigator.userAgent;
	//alert(device.indexOf('Touch'));
/*	if(device.indexOf("Android") != -1 || device.indexOf('iPhone') != -1 || device.indexOf('iPad') != -1 || device.indexOf('Touch') != -1)
		{
			popCan.addEventListener('touchstart', Popup_Event, false);
			popCan.addEventListener('touchmove',  Popup_Event, false);
			popCan.addEventListener('touchend',   Popup_Event, false);
		}
		else
		{																				
		  popCan.addEventListener('mousedown', Popup_Event, false);
		  popCan.addEventListener('mousemove', Popup_Event, false);
		 	popCan.addEventListener('mouseup',   Popup_Event, false);
		}*/
	popCan.addEventListener('touchstart', Popup_Event, false);
			popCan.addEventListener('touchmove',  Popup_Event, false);
			popCan.addEventListener('touchend',   Popup_Event, false);
			popCan.addEventListener('mousedown', Popup_Event, false);
		  popCan.addEventListener('mousemove', Popup_Event, false);
		 	popCan.addEventListener('mouseup',   Popup_Event, false);
			

};

function Popup_Event (event) 
{
	var eType = event.type;
	//alert("this.id : "+this.id);
	
	var positionX = parseInt(this.style.left);
	var positionY = parseInt(this.style.top);
	//var positionX = document.body.clientWidth/8;
	//var positionY = (document.body.clientHeight/2)/2;
	
	var eX;
	var eY;
	
	
	
	
	if(eType=='touchstart' || eType=='touchmove')
	{
		eX = parseInt(event.touches[0].pageX);
		eY = parseInt(event.touches[0].pageY);
	}
	
	if(eType=='touchstart')
	{
		popCheck = 1;
		popCtx.beginPath();
		popCtx.moveTo((eX-positionX), (eY-positionY));
	}
	else if(eType=='touchmove')
	{
		if(popCheck==1)
		{
			event.preventDefault();	
			popCtx.lineTo((eX-positionX), (eY-positionY));
			popCtx.stroke();
		}
	}
	else if(eType=='touchend')
	{
		popCheck = 0;
		popCtx.closePath();
	}
	else if(eType=='mousedown')
	{
		popCheck = 1;
		popCtx.beginPath();
		popCtx.moveTo(event.offsetX,event.offsetY);
	}
	else if(eType=='mousemove')
	{
		if(popCheck==1)
		{
			popCtx.lineTo(event.offsetX,event.offsetY);
			popCtx.stroke();
		}
	}
	else if(eType=='mouseup')
	{
		popCheck = 0;
		popCtx.closePath();
	}
};

function S_Eraser(event)
{
	//alert(" event.target.id : "+event);
	var id = event.target.id.split('_');
	var canObj;
	for(var i=0;i<SIGNPAD_LIST.length;i++)
	{
		var signpadId = SIGNPAD_LIST[i].id.split('_');
		if(signpadId[1] == id[0])
		{
			canObj = SIGNPAD_LIST[i];
				break;
		}
	}
	canObj.eraser();
};

function S_TouchStart (event) 
{
	var obj = document.getElementById(event.target.id);
	var position = GetObjectRect(obj);
	var canObj = findSignPadObj(event.target.id);
	
	if(event.touches.length==2)
	{
		var r_x=event.touches[0].pageX-event.touches[1].pageX; r_x *= r_x;
		var r_y=event.touches[0].pageY-event.touches[1].pageY; r_y *= r_y;		
		event.preventDefault();		
	}
	else
	{
		canObj.mouseDown(event.touches[0].pageX-position[0], event.touches[0].pageY-position[1],1);			
	}
		
};

function S_TouchMove (event) 
{	
	event.preventDefault();

	var obj = document.getElementById(event.target.id);
	var position = GetObjectRect(obj);
	var canObj = findSignPadObj(event.target.id);
	
	if(event.touches.length==2)
	{		
		var r_x=event.touches[0].pageX-event.touches[1].pageX; r_x *= r_x;
		var r_y=event.touches[0].pageY-event.touches[1].pageY; r_y *= r_y;		
		event.preventDefault();		
	}
	else
	{
		canObj.mouseMove(event.touches[0].pageX-position[0],event.touches[0].pageY-position[1],1);
	}
};

function S_TouchEnd (event) 
{
	var obj = document.getElementById(event.target.id);
	var position = GetObjectRect(obj);
	var canObj = findSignPadObj(event.target.id);
	
	if(event.touches.length==2)
	{
		var r_x=event.touches[0].pageX-event.touches[1].pageX; r_x *= r_x;
		var r_y=event.touches[0].pageY-event.touches[1].pageY; r_y *= r_y;		
		event.preventDefault();		
	}
	else
	{
		canObj.mouseUp(event.touches[0].pageX-position[0],event.touches[0].pageY-position[1],1);
	}
};


// Canvas요소 내의 좌표를 결정 한다.
function S_MouseDown (event) 
{
	var canObj = findSignPadObj(event.target.id);
	
	canObj.mouseDown(event.offsetX, event.offsetY);
};

function S_MouseMove (event) 
{
	canObj = findSignPadObj(event.target.id);
	
	canObj.mouseMove(event.offsetX, event.offsetY);
};

function S_MouseUp (event) 
{
	var canObj = findSignPadObj(event.target.id);
	
	canObj.mouseUp(event.offsetX,event.offsetY);  
	
};

function GetObjectRect(obj)
{
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) isChrome= true; 


	var left=obj.offsetLeft;
	var top=obj.offsetTop;
	var width=obj.offsetWidth;
	var height=obj.offsetHeight;
	while(1)
	{
		obj = obj.parentElement;
		var tagName=obj.tagName;
		if(tagName=="TR" || tagName=="TBODY") continue;
		if(obj==null || obj.tagName=='BODY') break; 
		top -=obj.scrollTop;
		left -= obj.scrollLeft;
		
		if( tagName != "DIV" )
		{
		  left += obj.offsetLeft;
		  top += obj.offsetTop;
		}
	}

	//2018-01-15 윤현우 수정///////////////////////////////////

	if( get_version_of_IE()!= 9 && isChrome ==false){
		top = event.clientY+document.body.scrollTop;
	}else{
		top = event.clientY+document.documentElement.scrollTop;
	}
	///////////////////////////////////////////////////////////
	 return [left,top,width,height];
};

function findSignPadObj(id)
{
	var canObj;
	for(var i=0;i<SIGNPAD_LIST.length;i++)
	{
		if(SIGNPAD_LIST[i].id == id)
		{
			canObj = SIGNPAD_LIST[i];
				break;
		}
	}
	return canObj;
};

function GetObjOffset(obj, dir)
{
	if(!obj)
		return 0;
		
		if(dir == 'left') 
		{
			if(obj.offsetParent == document.body)
			return obj.offsetLeft;
	  else
	   	return obj.offsetLeft + GetObjOffset(obj.offsetParent, dir);
	  }
	  else if(dir == 'top')
	  {
	  	if (obj.offsetParent == document.body)
	  		return obj.offsetTop;
	  	else
	  		return obj.offsetTop + GetObjOffset(obj.offsetParent, dir);
	  } 
	  else
	  	return 0;
};

function getImageData(x2)
{
	var image = x2.toDataURL("image/jpg").replace("image/jpg", "image/jpeg; base64");
	image = image.split(",");

	return image[1];
};
//2018-01-15 윤현우 추가
function get_version_of_IE () { 

	 var word; 

	 var agent = navigator.userAgent.toLowerCase(); 

	 // IE old version ( IE 10 or Lower ) 
	 if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 

	 // IE 11 
	 else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 

	 // Microsoft Edge  
	 else if ( agent.search( "edge/" ) > -1 ) word = "edge/"; 

	 // 그외, IE가 아니라면 ( If it's not IE or Edge )  
	 else return -1; 

	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	 if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 

	 return -1; 
} 