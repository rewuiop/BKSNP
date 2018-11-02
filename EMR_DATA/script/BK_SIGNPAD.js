var btnDown = 0;  // 1 : down    0 : up
var mLclk   = 1;
var mRclk   = 2;
var tempXY  = '';
var TIMER   = null;
var signPad = null;
var iframeCanvas = null;
var r_canvas = null;
var prefix = ["CAP_","VAL_","INPUT_",""];

var WhiteCanColor = "rgba(255,255, 255, 0.1 )";  // White

var RedPenColor   = "rgba(255, 128, 128, 0.5)";	// Red
var GreenPenColor = "rgba(60 , 240, 180, 0.5)";	// Green
var BluePenColor  = "rgba(160, 200, 255, 0.5)";	// Blue

var PenBold  = {"Thin":5,"Normal":10,"Thick":15};

var tempPointer = null;
var curMode = 0;  // 0 : 입력모드  1 : 설명모드 
 
/*Window10 Touch Event*/
var myGesture = null;
var DOWN_FLAG = null;
var r_canvasTop = 0;

function getSignPad()
{
	return signPad;
}

function getIframeCanvas()
{
	return iframeCanvas;
}

function initCanvas(c_id,c_width,c_height)
{ 
	var ifrm = document.getElementById('contentframe');
	
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
	if(ifrm.document.getElementById(c_id) == null){
		iframeCanvas = ifrm.document.createElement('canvas');

	/*	if(typeof(iframeCanvas.style.cssText) != 'undefined'){
			iframeCanvas.setAttribute("id", c_id);
			iframeCanvas.setAttribute("width",c_width);
			iframeCanvas.setAttribute("height",c_height);
			iframeCanvas.setAttribute("fillStyle",'WhiteCanColor');		
			iframeCanvas.setAttribute("style",' border:0px solid black; -ms-touch-action:none; z-index:1; position:absolute; top:0px; left:0px;');
		}else{*/ 
			iframeCanvas.id =  c_id;
			iframeCanvas.width = c_width;
			iframeCanvas.height = c_height;
			iframeCanvas.setAttribute("style", "-ms-touch-action: none;");
			iframeCanvas.fillStyle = "WhiteCanColor";		
			iframeCanvas.style.border = "0px solid black";
			iframeCanvas.style.zIndex   = 1;
			iframeCanvas.style.position = "absolute"; 
			iframeCanvas.style.top = "0"; 
			iframeCanvas.style.left = "0";
			//iframeCanvas.setAttribute("id", c_id);
			//iframeCanvas.setAttribute("width",c_width);
			//iframeCanvas.setAttribute("height",c_height);
			//iframeCanvas.setAttribute("fillStyle",'WhiteCanColor');		
			//iframeCanvas.setAttribute("style",' border:0px solid black; -ms-touch-action:none; z-index:1; position:absolute; top:0px; left:0px;');
			
		//}

		ifrm.document.body.appendChild(iframeCanvas);
		
		if(typeof G_vmlCanvasManager != 'undefined'){
			iframeCanvas= G_vmlCanvasManager.initElement(iframeCanvas);
		}		

		signPad = new BK_SIGNPAD(c_id,c_width,c_height);	
	}
}

function BK_SIGNPAD(c_id,c_width,c_height)
{		
	var ifrm = document.getElementById('contentframe');
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;

//	this.r_canvas = document.getElementById(c_id);
	r_canvas = ifrm.document.getElementById(c_id);

	this.r_width  = c_width;
	this.r_height = c_height;
	r_canvas.width  = c_width;
	r_canvas.height = c_height;
	r_canvas.fillStyle = WhiteCanColor;
	
	this.r_ctx = r_canvas.getContext("2d");		
	this.r_ctx.fillStyle    = WhiteCanColor; 
	r_canvas.r_signObj=this;
	this.r_Pointer = new Array();	
	
	this.r_ctx.strokeStyle = GreenPenColor;
	this.r_ctx.lineWidth   = PenBold.Normal;
	
	this.r_penColor = this.r_ctx.strokeStyle;
	this.r_penBold  = this.r_ctx.lineWidth;
	
	
	var msPointerEnabled =window.navigator.msPointerEnabled;
	this.Browser = navigator.appVersion.indexOf("Android"); 
	
	DOWN_FLAG = true;
	
	
	
	if(msPointerEnabled == true){
		r_canvas.addEventListener("MSPointerMove", R_SignPad_doMsPointerMove, false);
		r_canvas.addEventListener("MSPointerDown", R_SignPad_doMsPointerDown, false);
		r_canvas.addEventListener("MSPointerUp", 	R_SignPad_doMsPointerUp, false);
	}else{
		if(this.Browser != -1){
			r_canvas.addEventListener("touchmove", R_SignPad_doTouchMove, false);
			r_canvas.addEventListener("touchstart",R_SignPad_doTouchStart, false);
			r_canvas.addEventListener("touchend", 	R_SignPad_doTouchEnd, false);
		}else{
			if(r_canvas.addEventListener){
				r_canvas.addEventListener("mousemove", R_SignPad_doMouseMove, false);
				r_canvas.addEventListener("mousedown", R_SignPad_doMouseDown, false);
				r_canvas.addEventListener("mouseup", 	R_SignPad_doMouseUp, false);
			}else{
				r_canvas.attachEvent("onmousemove", R_SignPad_doMouseMove);
				r_canvas.attachEvent("onmousedown", R_SignPad_doMouseDown);
				r_canvas.attachEvent("onmouseup",   R_SignPad_doMouseUp);
			}
		}		
	}
	this.r_onMouseDown = function(r_x,r_y)
	{					
		var d = new Date();
		var returnVal = false;
		var OBJ_ARR = GetAllComInfo();
		
		var CAL_ARR = GetAllCalInfo();
		OBJ_ARR.push.apply(OBJ_ARR, CAL_ARR);


		var o_X = o_Y = o_W = o_H = 0;		
		for(var i=0; i<OBJ_ARR.length; i++)
		{
				if(OBJ_ARR[i].x == null || OBJ_ARR[i].y == null)
				{
					alert(OBJ_ARR[i].id+" 컴포넌트의 좌표가 설정 되지 않았습니다.");
					return;
				}
				
				o_X = OBJ_ARR[i].x;
				o_Y = OBJ_ARR[i].y;
				o_W = OBJ_ARR[i].w + o_X;
				o_H = OBJ_ARR[i].h + o_Y;
				
				if(curMode == 0 ){ /** 원석 추가 설명모드시 입력불가 */
					if( (OBJ_ARR[i].nodeName == "INPUT" || OBJ_ARR[i].nodeName =="TEXTAREA" || OBJ_ARR[i].nodeName =="IMG" || OBJ_ARR[i].nodeName =="TD"  )  && ( (o_X + ifrm.document.body.scrollLeft)<= r_x && r_x <= (o_W + ifrm.document.body.scrollLeft) && (o_Y + ifrm.document.body.scrollTop) <= r_y  &&  r_y <= (o_H + ifrm.document.body.scrollTop) ) )
					{					
						if(OBJ_ARR[i].type == "radio" )
							OBJ_ARR[i].checked = true;		  		
						else if(OBJ_ARR[i].type == "checkbox" )
							OBJ_ARR[i].checked = true;		
						else if(OBJ_ARR[i].type == "text") 
							OBJ_ARR[i].focus();		
						else if(OBJ_ARR[i].type == "textarea"){					
								OBJ_ARR[i].focus();			  						  			 			
						}else{			  		
							OBJ_ARR[i].click();		
						}	
						returnVal = true;		  		
					}
			  }		
		}
		
		return returnVal;			
	}
	this.r_onMouseDraw=function(r_x,r_y)
	{
		 if(this.r_onMouseDown(r_x,r_y))
		 	return;
		 
		 btnDown = 1;		 
		 		 
		 this.r_ctx.beginPath();		
		 this.r_ctx.moveTo(r_x,r_y);		
	}			
	
	this.r_onMouseMove=function(r_x,r_y){
		if( btnDown == 1){
				this.r_gatherXY(r_x,r_y);
				this.r_ctx.lineTo(r_x,r_y);
		 		this.r_ctx.stroke();		 		
		}		
	} 
	
	this.r_onMouseUp=function(r_x,r_y)
	{
		btnDown = 0;
		
		this.r_ctx.closePath();		
		this.r_gatherXY(r_x,r_y);
		this.r_reDraw();		
	}		
	
	this.r_gatherXY = function(r_x,r_y)
	{
		if(r_x*r_y < 0)	return;
		
		var len = 0;
		
		if(btnDown == 1)
		{
				if(tempXY == '')
					tempXY =  this.r_ctx.strokeStyle+"@"+this.r_ctx.lineWidth+"|"+r_x+"^"+r_y;
				else
					tempXY += "|"+r_x+"^"+r_y;
		}
		else			
		{
			  if(tempXY == "") 	
			  	return;
			  else
			  	len = tempXY.split("^").length;
			  	
			  if(len < 3) // 짧은 한번 클릭은 그리지 않기 위해.
			  	return;	
			  	
				this.r_Pointer[this.r_Pointer.length] = tempXY;
				tempXY = '';
				tempPointer = this.r_Pointer.slice(0,this.r_Pointer.length);				
		}		
	}
	
	this.r_drawLine = function()
	{
		var temp,pt;
		var PtLen = this.r_Pointer.length;
		for(var i=0; i<PtLen; i++)
		{
				temp = this.r_Pointer[i].split("|");				
				this.r_ctx.beginPath();	
				for(var j=0; j<temp.length; j++)
				{										
					pt = temp[j].split("^");
					if(j==0)
					{
						var st = temp[j].split("@");
						this.r_ctx.strokeStyle = st[0];
						this.r_ctx.lineWidth   = st[1];
					}
					else if(j==1)
						this.r_ctx.moveTo(pt[0],pt[1]);
					else
						this.r_ctx.lineTo(pt[0],pt[1]);
			}			
			this.r_ctx.stroke();
			this.r_ctx.closePath();
		}
	}
	
	this.r_SetDrawMode = function(mode)
	{
		curMode = mode;
	
		if(curMode == 1) // 설명모드 
		{		
				//alert("설명모드");
		}
		else  // 입력모드
		{	
				//alert("입력모드");
		}		
	}
	
	this.r_FrontNBack = function(mode)
	{			
		if(mode == 0) // Undo
		{
			if(this.r_Pointer.length <= 0) 
				return;			
			this.r_Pointer[this.r_Pointer.length-1] = null;
			this.r_Pointer.length--;
		}
		else if(mode == 1) // Redo
		{
			this.r_Pointer = tempPointer; 				
		}
		this.r_reDraw();
	}
	
	this.r_clearLine = function()
	{
			this.r_Pointer = null;
			this.r_Pointer = new Array();			
			this.r_reDraw();
	}
	
	this.r_SetBold  = function(val)
	{		
		if(val=='Thin')
			this.r_penBold = PenBold.Thin;
		else if(val=='Normal')
			this.r_penBold = PenBold.Normal;
		else if(val=='Thick')
			this.r_penBold = PenBold.Thick;
			
		this.r_ctx.lineWidth =	this.r_penBold;			
	}
	
	this.r_SetPencil = function(val)
	{		
		if(val=='R')		
			this.r_penColor = RedPenColor;
		else if(val=='G')		
			this.r_penColor = GreenPenColor;
		else if(val=='B')		
			this.r_penColor = BluePenColor;				
			
		this.r_ctx.strokeStyle =	this.r_penColor;		
	}
 
	this.r_reDraw = function()
	{
		r_canvas.width  = r_canvas.width; 
		r_canvas.height = r_canvas.height; 		
		this.r_ctx.fillStyle = WhiteCanColor;
		this.r_ctx.fillRect(0,0, r_canvas.width, r_canvas.height);
		this.r_ctx.strokeStyle = this.r_penColor;
		this.r_ctx.lineWidth   = this.r_penBold;
		this.r_drawLine();
	}
	
	this.zoomIn=function(){
		//if(this.r_curMode != 4)
		//	return;
		if(this.r_zoom<=2.9)
		{
			this.r_zoom += 0.1;
			this.zoom(this.r_zoom);
		}
		
	};
	this.zoomOut=function(){
		//if(this.r_curMode != 4)
		//	return;
		if(this.r_zoom>=1.1)
		{
			this.r_zoom -= 0.1;
			this.zoom(this.r_zoom);
		}
	};
	this.zoom=function(r_z){
		//if(this.r_curMode != 4)
		//	return;
		this.r_zoom=r_z;
		
		var r_r=this.r_moveAdjust(this.r_scr_x,this.r_scr_y);
		
		this.r_scr_x=r_r[0]; this.r_scr_y=r_r[1];
		
		this.r_redraw(1);
		
	};
	
	this.r_zoomStart=1;
	this.r_zoomStart_z=1;
	this.r_zoomTarget=1;
	this.r_touchZoom = function(r_mode, r_r){
		if(this.r_curMode != 4)
			return;
		
		alert("r_touchZoom377");
		if(r_mode==0) //zoom start
		{
			this.r_zoomStart_z = this.r_zoom;
			this.r_zoomStart=r_r;
		}
		else if(r_mode==1) //zoom end
		{
			var r_x=this.r_zoomStart_z * (r_r/this.r_zoomStart);
			r_x = Math.sqrt(r_x);
			if(r_x <0.5 || r_x >2.0) return;
			this.r_zoomTarget=r_x;
			if(this.r_zoomCBStart==0)			
			{
				this.r_zoomCBStart=1;
				setTimeout("CB_GetCallBackParam("+this.r_callId+").r_zoomCallBack()",100);
			}
		}
	};
	
	this.r_zoomCBStart=0;
	this.r_zoomCallBack=function (){
		this.zoom(this.r_zoomTarget);
		this.r_zoomCBStart=0;
	};
	
	this.r_moveAdjust=function(r_x,r_y){
		var r_temp=this.r_cWidth*this.r_zoom;
		if(r_x<=0) r_x=0;
		else if(r_temp <= this.r_width)
			r_x=0;
		else if(r_x > r_temp-this.r_width)
			r_x=r_temp-this.r_width;
			
		r_temp=this.r_cHeight*this.r_zoom;
		if(r_y<=0) r_y=0;
		else if(r_temp <= this.r_height)
			r_y=0;
		else if(r_y > r_temp-this.r_height)
			r_y=r_temp-this.r_height;
		return [r_x,r_y];
	};
	
	this.move=function(r_x, r_y){
	
		var r_r=this.r_moveAdjust(r_x,r_y);
		r_x=r_r[0]; r_y=r_r[1];
		this.r_scr_x=r_x;
		this.r_scr_y=r_y;
	
		this.r_redraw(1);
	};
	
	this.setSignMode=function (r_mode){
		this.r_signMode=r_mode;
	};
	
	this.r_openDoc4ODS = function(xObj, xObj2, imgArr, type)
	{
		var obj = document.getElementById('r_extText');
		if(obj)
			obj.value = "";
		if(this.r_inputDiv)
				this.r_inputDiv.style.display = "none";
		if(this.r_tempDiv)
				this.r_tempDiv.style.display = "none";
		this.r_zoom=1.0;
		this.r_totalPage=0; // PAGE 수
		this.r_curPageNo=0;
		this.r_curPage=null;
		this.r_page=null;
		this.r_field=null;
		this.r_dpi=0;
		this.r_bDown=0;
		this.r_curSelField=-1;
		this.r_curSubField=-1;
		this.r_signPadLoc=null;
		this.r_signData=null;
		this.r_script=null;
		this.r_scr_x = 0;
		this.r_scr_y = 0;
		
		//KEB ODS 추가 작업 강은미
		this.r_docXmlStr="";
		this.r_recXmlStr="";		
		DOWN_FLAG = true;
		
			
		var docXml=xObj.getElementsByTagName('BK_DOC_INFO');
		var len=0;
		if(docXml.length>=1)
			this.r_totalPage=docXml[0].getAttribute('page');
		
		docXml=null;
		this.r_page = new Array();
	
		var flag = 0;
		for(var i=0; i<this.r_totalPage; i++)
		{
			if(i == this.r_curPageNo)
				this.r_page[i]=new BK_DOCPAGE(imgArr);
			else
				this.r_page[i]=new BK_DOCPAGE("", 1);
			this.r_page[i].r_pad=this;
		}
		
		var resultStr;
		var formXml=xObj.getElementsByTagName('BK_FORM_DATA');
		if(formXml.length >=1)
		{
			if(formXml[0].getAttribute("lang")=="utf-16")
				var formText=decode64(GetXmlText(formXml[0]));
			else
				var formText=decode64_not_Attr(GetXmlText(formXml[0]));	
			resultStr = formText;
			
			if(formXml[0].getAttribute("version") == null)	
				formText =formText.split('~');
			else
				formText =formText.split('◎');
			
			this.r_field=new Array();
			len =formText.length;
			var r_count1=0;
			for(var i=0;i<len;i++)
			{
				if(formText[i].length<10)
					continue;
					
				if(formXml[0].getAttribute("version") == null)	
					var r_temp=new BK_DOC_FIELD(formText[i]);
				else
					var r_temp=new BK_DOC_FIELD(formText[i],1);
					
				r_temp.r_ctx=this.r_fieldC;
				r_temp.r_pad=this;
				if(r_temp.r_type=='27') // page
				{
					this.r_page[r_temp.r_pageNo].r_id = r_temp.r_id;
					this.r_page[r_temp.r_pageNo].r_width=r_temp.r_loc[2];
					this.r_page[r_temp.r_pageNo].r_height=r_temp.r_loc[3];
					continue;
				}
				for(var n=0;n<r_count1;n++)
				{
					if(this.r_field[n].r_type != '5' && this.r_field[n].r_type != '6') continue;
					if(r_temp.r_parent != this.r_field[n].r_conId) continue;
					this.r_field[n].r_setOption(r_temp);
					r_temp.r_mandatory=this.r_field[n].r_mandatory;
					r_temp=null;
					break;
				}
				
				if(r_temp !=null )
				{
					this.r_field[r_count1]=r_temp;
					r_count1++;
				}
			}
		
		}
		formXml=null;
		
		var scriptXml = xObj.getElementsByTagName('BK_SCRIPT_DATA');
		if(scriptXml.length>=1)
			this.r_setScript(scriptXml);
		
		var autocalXml = xObj.getElementsByTagName('BK_AUTO_CALCU');
		if(autocalXml.length>=1)
			this.r_setAutoCalcu(autocalXml);
		
		this.r_curPage=this.r_page[0];

		if(xObj2 != null)
		{
			xObj2 = r_getXmlObject(xObj2);
			this.r_openRecord(xObj2);
		}

		if(type)
		{		
	    if(this.r_script && this.r_script[5] != "") 
	    	fn_ejs(this.r_script[5]);
	    
	    if(this.r_curPage.r_script && this.r_curPage.r_script[0] != "")
	    	fn_ejs(this.r_curPage.r_script[0]);
	    	
	    this.r_execAutoCalcu();
	  }
	  this.showPage();
	  return resultStr;
	};
	this.r_setItemproperty = function(conId, type, param)
	{
		var r_len=this.r_field.length;
		var r_tmStr = "";
		for(var i=0;i<r_len;i++)
		{
			if(conId != this.r_field[i].r_conId)
			continue;
			switch(type)
			{
				case "주민":
					this.r_field[i].r_charset = "주민";
					this.r_field[i].r_maxLen = 14;
				break;
				case "한글":
					this.r_field[i].r_charset = "한글";
					if(param!= "")
						this.r_field[i].r_maxLen = parseInt(param);
				break;
				case "영문":
					this.r_field[i].r_charset = "영문";
					if(param!= "")
						this.r_field[i].r_maxLen = parseInt(param);
				break;
				case "숫자":
					this.r_field[i].r_charset = "숫자";
					if(param!= "")
						this.r_field[i].r_maxLen = parseInt(param);
				break;
				case "전화번호":
						this.r_field[i].r_charset = "전화번호";
						this.r_field[i].r_maxLen = 13;
				break;
				case "문자길이":
						this.r_field[i].r_charset = "문자길이";
						if(param!= "")
							this.r_field[i].r_maxLen = parseInt(param);
				break;
				case "금액":
					  this.r_field[i].r_charset = "금액";
					  if(param!= "")
							this.r_field[i].r_maxLen = parseInt(param);
						this.r_field[i].r_align = "right";
				break;
			}
		}
	};
	//copygroup (추가 강은미)
	this.r_setCGData = function(sObj)
	{
		for(var i=0; i<this.r_field.length; i++)
		{
			if(i == this.r_curSelField)
				continue;
			if(this.r_field[this.r_curSelField].r_copyGrp == "" 
			    || this.r_field[this.r_curSelField].r_copyGrp != this.r_field[i].r_copyGrp)
				continue;
			if(this.r_field[this.r_curSelField].r_type != this.r_field[i].r_type)
				continue;
			this.r_field[i].r_signVal = sObj;
		}
	};
	
	this.r_getDocData = function()
	{
		var r_Str = "";
		
		var r_len=this.r_page.length;
		for(var i=0;i<r_len;i++)
		{				
			if(r_Str!="")
				r_Str +="@$@";
				
			r_Str +="TYPE|PAGE$$PAGE|"+(i+1)+"$$";
			
			if(this.r_page[i].r_line == null)
				continue;
			r_Str += this.r_page[i].r_line.r_GetSaveData(1);//페이지
		}
		
		r_Str +="@$@";
		r_len=this.r_field.length;
		var r_tmStr = "";
		for(var i=0;i<r_len;i++)
		{
			var r_field=this.r_field[i];
			if(r_field.r_type == '100')
				continue;
			if(r_field.r_type == '11' && r_field.r_signVal == null)
				continue;
			if(r_field.r_type != '11' && (r_field.r_value == null || r_field.r_value == "" || r_field.r_value == " "))
				continue;
				
			if(r_tmStr != "")
				r_tmStr += "@$@";
			
			if('11'== r_field.r_type)
		  {
		  	r_tmStr += "TYPE|SIGN_PEN$$PAGE|"+(r_field.r_pageNo+1)+"$$CON_ID|"+r_field.r_conId+"$$DATA|"+r_field.r_signVal.r_GetSaveData(0)+""; // 필드
		  }
		  else if('18'== r_field.r_type)
		  {
		    r_tmStr += "TYPE|SRC_PATH$$PAGE|"+(r_field.r_pageNo+1)+"$$CON_ID|"+r_field.r_conId+"$$DATA|"+r_field.r_value+""; // 필드
		  }
		  else if('23' == r_field.r_type)
		  {
		    r_tmStr += "TYPE|SRC_PATH$$PAGE|"+(r_field.r_pageNo+1)+"$$CON_ID|"+r_field.r_conId+"$$DATA|"+r_field.r_value+""; // 필드
		  }
		  else if('100' != r_field.r_type)
		  {
		    if(r_field.r_valType==1)
		     r_tmStr += "TYPE|IMG_PATH$$PAGE|"+(r_field.r_pageNo+1)+"$$CON_ID|"+r_field.r_conId+"$$DATA|"+r_field.r_value; // 필드
		    else
		     r_tmStr += "TYPE|TEXT$$PAGE|"+(r_field.r_pageNo+1)+"$$CON_ID|"+r_field.r_conId+"$$DATA|"+r_field.r_value;
		  }  
		}
		r_Str += r_tmStr;
		return r_Str;
	};
	
	this.r_setEnable = function(conId, val)
	{
		var r_len=this.r_field.length;
		for(var i=0;i<r_len;i++)
		{
			if(conId != this.r_field[i].r_conId)
				continue;
			this.r_field[i].r_enable = val;
			break;
		}
	};
	
	this.getSignImage = function(conId)
	{
		var r_len=this.r_field.length;
		for(var i=0;i<r_len;i++)
		{
			if(conId != this.r_field[i].r_conId)
				continue;
			var tmField = this.r_field[i];
			if(tmField.r_type != "11" || tmField.r_signVal == null)
				return "";
			var rate = 300 / tmField.r_dpi;
			var r_ctx = r_createCanvas(tmField.r_pixLoc[2]*rate,tmField.r_pixLoc[3]*rate);
			r_ctx.fillStyle="rgba(255,255,255,1)";
			r_ctx.fillRect(0,0,tmField.r_pixLoc[2]*rate,tmField.r_pixLoc[3]*rate);	
			r_ctx.strokeStyle ="rgba(0,0,0,1)";		
			
			var dpi = tmField.r_dpi;
			tmField.r_dpi = 300;
			tmField.r_signVal.r_calcScale(tmField.r_pixLoc[2]*rate,tmField.r_pixLoc[3]*rate,0,0,tmField.r_dpi);
			tmField.r_signVal.r_draw(r_ctx, tmField.r_dpi, tmField.r_pad.r_zoom);
			tmField.r_dpi = dpi;
			//document.appendChild(r_ctx.canva);
			return r_ctx.canvas.toDataURL("image/jpeg");
		}
	};
	
	this.setMandatory= function(conId, val)
	{
		var r_len=this.r_field.length;
		for(var i=0;i<r_len;i++)
		{
			if(conId != this.r_field[i].r_conId)
				continue;
			
			this.r_field[i].r_mandatory = val;
			break;
		}
	};
	
	this.zoomIn=function(){
		//if(this.r_curMode != 4)
		//	return;
		if(this.r_zoom<=2.9)
		{
			this.r_zoom += 0.1;
			this.zoom(this.r_zoom);
		}
		
	};
	this.zoomOut=function(){
		//if(this.r_curMode != 4)
		//	return;
		if(this.r_zoom>=1.1)
		{
			this.r_zoom -= 0.1;
			this.zoom(this.r_zoom);
		}
	};
	this.zoom=function(r_z){
		//if(this.r_curMode != 4)
		//	return;
		this.r_zoom=r_z;
		
		var r_r=this.r_moveAdjust(this.r_scr_x,this.r_scr_y);
		
		this.r_scr_x=r_r[0]; this.r_scr_y=r_r[1];
		
		this.r_redraw(1);
		
	};
	
	this.r_zoomStart=1;
	this.r_zoomStart_z=1;
	this.r_zoomTarget=1;
	this.r_touchZoom=function(r_mode, r_r){
		if(this.r_curMode != 4)
			return;
		if(r_mode==0) //zoom start
		{
			this.r_zoomStart_z=this.r_zoom;
			this.r_zoomStart=r_r;
		}
		else if(r_mode==1) //zoom end
		{
			var r_x=this.r_zoomStart_z * (r_r/this.r_zoomStart);
			r_x = Math.sqrt(r_x);
			if(r_x <0.5 || r_x >2.0) return;
			this.r_zoomTarget=r_x;
			if(this.r_zoomCBStart==0)			
			{
				this.r_zoomCBStart=1;
				setTimeout("CB_GetCallBackParam("+this.r_callId+").r_zoomCallBack()",100);
			}
		}
	};
	
	this.r_zoomCBStart=0;
	this.r_zoomCallBack=function (){
		this.zoom(this.r_zoomTarget);
		this.r_zoomCBStart=0;
	};
}

function R_SignPad_doMouseUp(event)
{
	if(event.buttons == mRclk) return;
	
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
	
	if(curMode == 1){ // 설명모드
		r_canvas.r_signObj.r_onMouseUp(event.offsetX,event.offsetY);
	}else{

	}

}
function R_SignPad_doMouseDown(event)	
{ 
	if(event.buttons == mRclk) return;	
	
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}

	if(curMode == 1){ // 설명모드		
		r_canvas.r_signObj.r_onMouseDraw(event.offsetX,event.offsetY); //그리기
	}else{
		r_canvas.r_signObj.r_onMouseDown(event.offsetX,event.offsetY); //입력하기
	}
}
function R_SignPad_doMouseMove(event)
{	 
	if(event.buttons == mRclk) return;
	
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}

	if(curMode == 1){ // 설명모드
		
		r_canvas.r_signObj.r_onMouseMove(event.offsetX,event.offsetY);	
	}
}

function GetAllComInfo()
{	
	var ifrm = document.getElementById('contentframe');
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
	
	
	var xy = null;
	var arr     = new Array();
	var CompObj = [ifrm.document.getElementsByTagName("IMG"),ifrm.document.getElementsByTagName("INPUT"),ifrm.document.getElementsByTagName("TEXTAREA")];	

	for(var i=0; i<CompObj.length; i++ )
	{
		for(var j=0; j<CompObj[i].length; j++)
		{
				xy  = findPos(CompObj[i][j]);
				CompObj[i][j].x = xy[0];
				CompObj[i][j].y = xy[1];
				CompObj[i][j].w = CompObj[i][j].clientWidth;
				CompObj[i][j].h = CompObj[i][j].clientHeight;
				
				arr[arr.length] = CompObj[i][j]	;	
		}		
	}	
	return arr;
}

function GetAllCalInfo(){
	var arr = new Array();	

	var ifrm = document.getElementById('contentframe');
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;

	var ifrm_cal = null;
	
	if(ifrm.document.getElementsByTagName('iframe')[0]){
		ifrm_cal = ifrm.document.getElementsByTagName('iframe')[0];
	}else{
//	if(ifrm.document.getElementsByTagName('iframe')){
//		 ifrm_cal = ifrm.document.getElementsByTagName('iframe')[0];
//	}else{
		ifrm_cal = parent.document.getElementsByTagName('iframe');
		ifrm_cal = ifrm_cal[0];
	}
	
	if(ifrm_cal.style.display == "block"){
		var tr_len = ifrm.document.getElementsByTagName('iframe')[0].document.getElementById('Cal_Table').getElementsByTagName("tr").length;

		var ifrm_xy = null;
		var xy = null;
		var CompObj;	

		for(var i=0; i<ifrm_cal.document.getElementById('Cal_Table').getElementsByTagName("tr").length; i++ )
		{
			for(var j=0; j<ifrm_cal.document.getElementById('Cal_Table').getElementsByTagName("tr")[i].getElementsByTagName("td").length; j++)
			{
					ifrm_xy  = findPos(ifrm_cal);
					CompObj = ifrm_cal.document.getElementById('Cal_Table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
					xy  = findPos(CompObj);
					CompObj.x = parseInt(xy[0]) + parseInt(ifrm_xy[0]);
					CompObj.y = parseInt(xy[1]) + parseInt(ifrm_xy[1]);
					CompObj.w = CompObj.clientWidth;
					CompObj.h = CompObj.clientHeight;
					arr[arr.length] = CompObj;
			}		
		}
	}

	return arr;
}

function findPos(obj) 
{
	var curleft = 0;
	var curtop  = 0;	
	if(obj.offsetParent) 
	{	
	 do
	 {	
	  curleft += obj.offsetLeft;	
	  curtop += obj.offsetTop - (obj.scrollTop !== 0 ? obj.scrollTop : 0);
	
	 } 
	 while(obj = obj.offsetParent);	
	}
	
	return [curleft,curtop];
}

function IS_SIGNPAD_JS()
{
	return true;	
}

function sleep(n)
{
	var Rlt = 0;
	var tgt = null;	
	var now = new Date().getSeconds();	
	
	while(true)
	{
		 tgt = new Date().getSeconds();
		 
		 Rlt = (now < tgt)?tgt-now:now-tgt;
		 
		 if(n <= Rlt)
		 	break;		 
	}
}

/*Window10 Touch Event Function start*/
function manipulateElement(event){
	if(DOWN_FLAG){
	 	return;
	
	}
	var m = new MSCSSMatrix(event.target.style.transform);
	
	event.target.style.transform = m.translate(event.offsetX, event.offsetY)
									.scale(event.scale)
									.translate(event.translationX, event.translationY)
									.translate(-event.offsetX, -event.offsetY); 
}

function R_SignPad_doMsPointerDown(event){
	if(this.r_curMode != 4){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}

	if(curMode == 1){
		btnDown = 1;
		
		this.r_signObj.r_onMouseDraw(event.offsetX, event.offsetY);
	}else{
		this.r_signObj.r_onMouseDown(event.offsetX, event.offsetY);
	}
}

function R_SignPad_doMsPointerMove(event){
	if(this.r_curMode != 4){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}

	this.r_signObj.r_onMouseMove(event.offsetX, event.offsetY);
}

function R_SignPad_doMsPointerUp(event){
	if(this.r_curMode != 4){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}

	this.r_signObj.r_onMouseUp(event.offsetX, event.offsetY);
}
/*Window10 Touch Event Function end*/

/*Android Touch Event Function start*/
var r_touchEndX, r_touchEndY;

function R_SignPad_doTouchStart(event){
	if(event.buttons == mRclk)
		return;
	
	if(DOWN_FLAG){
		btnDown = 1;
		
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	
	if(curMode == 1){
		if(event.touches.length == 2){
			var r_x = event.targetTouches[0].pageX-event.targetTouches[1].pageX;
			var r_y = event.targetTouches[0].pageY-event.targetTouches[1].pageY;
			
			r_x *= r_x;
			r_y *= r_y;
			this.r_signObj.r_touchZoom(0, (r_x + r_y));
			
		}else{
			this.r_signObj.r_onMouseDraw(event.touches[0].pageX, event.touches[0].pageY);
			//this.r_signObj.r_onMouseDown(event.touches[0].pageX, event.touches[0].pageY, 1);
			r_touchEndX = event.touches[0].pageX;
			r_touchEndY = event.touches[0].pageY;
		}
	}
	
}

function R_SignPad_doTouchMove(event){
	if(DOWN_FLAG){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	
	if(event.touches.length == 2){
		var r_x = event.touches[0].pageX-event.touches[1].pageX;
		var r_y = event.touches[0].pageY-event.touches[1].pageY;
		
		r_x *= r_x;
		r_y *= r_y;
		
		this.r_signObj.r_touchZoom(1, (r_x + r_y));
		
		var r_dist = (r_x + r_y) / r_zoomStart;
		event.preventDefault();
		
	}else if(event.touches.length == 1){
		this.r_signObj.r_onMouseMove(event.touches[0].pageX,event.touches[0].pageY,1);
	}
}

function R_SignPad_doTouchEnd(event){
	if(DOWN_FLAG){
		btnDown = 0;
		
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	
	this.r_signObj.r_onMouseUp(r_touchEndX, r_touchEndY, 1);
}

/*Android Touch Event Function end*/
