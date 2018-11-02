var browserVer = window.navigator.appVersion.toLowerCase();
var browserVerCheck=0;
if(browserVer.indexOf('11.0')!=-1) // || browserVer.indexOf('10.0')!=-1)
	browserVerCheck=1;
var PAINT_LIST;
var paintIdx = 0;
var active_img = null;
var text,tObj,tObj2,txtIdx;
var r_lastTX=-1;
var r_lastTY=-1;
var cap;
var whiteBGImg = new Image();
whiteBGImg.src = "/EMR_DATA/img/paintbox/white.jpg";
var addH = 1;
var menuInfo = [ 	//		0				1			2			3				4					5					6						7				8				9						10					11					12		   13
		 						 //[tab type, 	id, 	x, 		y, 		width, 		height, 	canX(32), 	canY, 	menuX,	 menuY, 	menuwidth,		menuHeight,  	name, canType ]
											[0, 		 101, 	0, 		0, 		 16, 			16, 			6, 					10, 			6, 			5, 			  30, 					30, 				"undo" ,	 1],
		 									[0, 		 102, 	16, 	0, 		 16, 			16, 			38, 				10, 			38, 		5, 				30, 					30, 				"redo" , 	1],
							 				[0, 		 103, 	32, 	0, 		 16, 			16, 			70, 				10, 			70, 		5, 				28, 					30, 			"clear"  	, 	-1],
							 				[0, 		 104, 	48, 	0, 		 16, 			16, 			100, 				10, 			100, 		5, 				30, 					30, 			"openfile" , 1],
							 				[0, 		 105, 	64, 	0, 		 16, 			16, 			132, 				10, 			132, 		5, 				30, 					30, 			"angle" , 		2],
							 				[0, 		 106, 	80, 	0, 		 16, 			16, 			164, 				10, 			164, 		5, 				30, 					30, 			"measure" , 	2],
							 				[0, 		 107, 	96, 	0, 		 16, 			16, 			196, 				10, 			196, 		5, 				28, 					30, 			"arrow" , 		2],
							 				[0, 		 108, 	112, 	0, 		 16, 			16, 			226, 				10, 			226, 		5, 				28, 					30, 			"magnify" , 	2],
							 				[0, 		 109, 	128, 	0, 		 16, 			16, 			256, 				10, 			256, 		5, 				30, 					30, 			"save" , 			-1],
							 				[0, 		 110, 	144, 	0, 		 16, 			16, 			288, 				10, 			288, 		5, 				30, 					30, 			"server" , 		-1],
							 				[0, 		 111, 	160, 	0, 		 16, 			16, 			320, 				10, 			320, 		5, 				28, 					30, 			"camera" , 		-1],
							 				

											[1, 		 201, 	176, 	0, 		 16, 			16, 			6, 					10, 			6, 			5, 				32, 					32, 				"pen" , 		0],
		 									[1, 		 202, 	192, 	0, 		 16, 			16, 			38, 				10, 			38, 		5, 				32, 					32, 				"rect" , 		0],
							 				[1, 		 203, 	208, 	0, 		 16, 			16, 			70, 				10, 			70, 		5, 				32, 					32, 			"oval"  , 		0],
							 				[1, 		 204, 	224, 	0, 		 16, 			16, 			100,				10, 			100,		5, 				32, 					32, 			"conectedline" , 		0],
							 				[1, 		 205, 	240, 	0, 		 16, 			16, 			132,				10, 			132, 		5, 				32, 					32, 			"spray" , 		0],
							 				
							 				[1, 		 206, 	256, 	0, 		 16, 			16, 			132,				10, 			132,		5, 			32, 					32, 			"line" , 		0],
							 				[1, 		 207, 	272, 	0, 		 16, 			16, 			164,				10, 			164,		5, 			32, 					32, 			"fillrect" , 		0],
							 				[1, 		 208, 	288, 	0, 		 16, 			16, 			196,				10, 			196,		5, 			32, 					32, 			"filloval" , 		0],
							 				[1, 		 209, 	304, 	0, 		 16, 			16, 			226,				10, 			226,		5, 			32, 					32, 			"eraser" , 		0],
							 				[1, 		 210, 	320, 	0, 		 16, 			16, 			256, 				10, 			256, 		5, 			32, 					32, 			"hightlighter" , 		0],
							 				
							 				[1, 		 211, 	608, 	0, 		 16, 			8,  			155+187, 		6, 				155+185, 		6, 			 	49, 					12, 			"lineshape_0" , 		0],
							 				[1, 		 212, 	607, 	6, 		 16, 			8,  			155+185, 		20, 			155+185, 		20, 			49, 					12, 			"lineshape_1" , 		0],
							 				[1, 		 213, 	627, 	0, 		 16, 			8,  			155+185, 		32, 			155+185, 		30, 			49, 					12, 			"lineshape_2" , 		0],
							 				[1, 		 214, 	627, 	6, 		 16, 			8,  			155+185, 		44, 			155+185, 		42, 			49, 					12, 			"lineshape_3" , 		0],
							 				[1, 		 215, 	646, 	0, 		 16, 			8,  			155+237, 		6, 				155+237, 		6, 				49, 					12, 			"linethick_0" , 		0],
							 				[1, 		 216, 	646, 	6, 		 16, 			8,  			155+237, 		20, 			155+237, 		20, 			49, 					12, 			"linethick_1" , 		0],
							 				[1, 		 217, 	668, 	0, 		 16, 			8,  			155+237, 		32, 			155+237, 		30, 			49, 					12, 			"linethick_2" , 		0],
							 				[1, 		 218, 	668, 	6, 		 16, 			8,  			155+237, 		44, 			155+237, 		42, 			49, 					12, 			"linethick_3" , 		0],
		
							 				[2, 		 401, 	512, 	0, 		 16, 			16, 			6, 					10, 			6, 			5, 			  30, 					30, 				"S_STAMP_01" , 		2],
		 									[2, 		 402, 	528, 	0, 		 16, 			16, 			38, 				10, 			38, 		5, 				30, 					30, 				"S_STAMP_02" , 		2],
							 				[2, 		 403, 	544, 	0, 		 16, 			16, 			70, 				10, 			70, 		5, 				28, 					30, 			  "S_STAMP_03" , 		2],
							 				
							 				[3, 		 301, 	336, 	0, 		 16, 			16, 			10, 				10, 			6, 			5, 				100, 					50, 				"text" , 		5],
		 									[3, 		 302, 	0,  	0, 		 16, 			16, 			110, 				10, 			106, 		5, 				120, 					25, 				"font_size" , 		5],
							 				[3, 		 303, 	352, 	0, 		 16, 			16, 			230, 				10, 			226,		5, 				120, 					25, 				"font_bold" , 		5],
							 				
							 				[3, 		 304, 	0,  	0, 		 16, 			16, 			110, 				35, 			106, 		30, 				120, 					25, 			  "font" , 		5],
		 									[3, 		 305, 	368, 	0, 		 16, 			16, 			230, 				35, 			226, 		30, 				120, 					25, 				"font_italic" , 		5],
							 				
							 				[3, 		 306, 	0,  	0, 		 16, 			16, 			350, 				10, 			346, 		5, 				45, 					50, 		  	"font_color" , 		5],
							 				
							 	];
							 	
	var m_undo = 101;
	var m_redo = 102;
	var m_clear = 103;
	var m_openfile = 104;
	var m_angle = 105;
	var m_measure = 106;
	var m_arrow=107;
	var m_magnify = 108;
	var m_save = 109;
	var m_server = 110;
	var m_camera = 111;
	
	var m_pen = 201;
	var m_rect = 202;
	var m_oval = 203;
	var m_conectedline = 204;
	var m_spray = 205;
	var m_line = 206;
	var m_fillrect = 207;
	var m_filloval = 208;
	var m_eraser = 209;
	var m_hightlighter = 210; 
	var m_lineshape0 = 211; 
	var m_lineshape1 = 212; 
	var m_lineshape2 = 213; 
	var m_lineshape3 = 214; 
	var m_linethick0 = 215;
	var m_linethick1 = 216;
	var m_linethick2 = 217;
	var m_linethick3 = 218;
 	
	var m_stamp1 = 401;
	var m_stamp2 = 402;
	var m_stamp3 = 403;	
	
	var m_text = 301;
	var m_fontsize = 302;	
	var m_fontbold = 303;
	var m_font = 304;
	var m_fontitalic = 305;
	var m_fontcolor = 306;
	var tabSettingArr = ['fontcolor','drawcolor','fontsize','fontname','lineShape','lineThick'];
							 	
/*function CreatePaintBox(id, attr)
{
	paintObj[paintObj.length] = new BK_PAINTBOX(id, attr);	
}*/

function CreatePaintBox() 
{
	PAINT_LIST = new Array();
	//var agent = navigator.userAgent.toLowerCase();
	//alert(agent);
	//if(agent.indexOf('9.0') != -1 || agent.indexOf('10.0') != -1 || agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
	if(HtmlCanObjCheck && HtmlCtxCheck)
	{
		for(var i=0;i<AppletInfo.length;i++)
		{
			if(AppletInfo[i][1]==11 || AppletInfo[i][1]==12)
			{
				var attr = AppletInfo[i][4].split("$");
				PAINT_LIST[PAINT_LIST.length] = new BK_PAINTBOX("APP_"+AppletInfo[i][0],attr[1]);
			}
		}
	}
	else
	{
		for(var i=0;i<AppletInfo.length;i++)
		{
			if(AppletInfo[i][1]==11 || AppletInfo[i][1]==12)
			{
				var attr = AppletInfo[i][4].split("$");
				PAINT_LIST[PAINT_LIST.length] = new BK_PAINTBOX_APPLET("APP_"+AppletInfo[i][0],attr[1]);
			}
		}
	}
};

function imgCheck(objId)
{
	//alert(objId);
	var obj = findPaintObj(objId);
	obj.drawMenu();
	obj.drawThumb();
}

function childReturn(paintId,imgSrc)
{
	var obj = findPaintObj(paintId);
		
	var tempDSLen = obj.defaultSelectArr.length;
	obj.defaultSelectArr[tempDSLen] = new Array();
	obj.defaultSelectArr[tempDSLen][0] = "True";
	var tempImgLen = obj.tempImg.length;
	obj.tempImg[tempImgLen] = new Image();
	obj.tempImg[tempImgLen].src = imgSrc;
	obj.doIdx = 0;
	obj.imgObj[0] = new BK_PAINT_IMG(obj,obj.imgObj[0].objInfo2.length,obj.imgObj[0].objInfo2);
	
	obj.drawThumb();
	//obj.refreshImage(obj.tempImg[tempImgLen])
	mainCanDraw(paintId);
}

function mainCanDraw(paintId)
{
	var obj = findPaintObj(paintId);
	/*
	for(var j=0;j<4;j++)
	{
		if(j==1)
			continue;
		obj.imgObj[0].ctx[j].clearRect(0, 0,this.imgObj[0].width,this.imgObj[0].height);	
	}
	*/
	obj.clickIdx=obj.tempImg.length-1;
	obj.imgObj[0].imgCan[1].src = obj.tempImg[obj.clickIdx].src;
	obj.imgObj[0].drawAllImage();
	
	obj.menuClickCheck = 1;
	obj.clickMenu=m_pen;
	
}

function P_Touch (event) 
{
	event.preventDefault();
	
	var obj = document.getElementById(event.target.id);
	var position = GetObjectRect(obj);
	var canObj = findPaintObj(event.target.id);
	var eX,eY;
	
	if(event.touches.length==2)
	{
		var r_x=event.touches[0].pageX-event.touches[1].pageX; r_x *= r_x;
		var r_y=event.touches[0].pageY-event.touches[1].pageY; r_y *= r_y;		
		event.preventDefault();		
	}
	else
	{
		if(event.type != 'touchend')
		{
			eX = event.touches[0].pageX;
			eY = event.touches[0].pageY;
			
			if(event.type == 'touchmove')
			{
				r_lastTX = eX;
				r_lastTY = eY;
			}
		}
		else
		{
			eX = r_lastTX;
			eY = r_lastTY;
			r_lastTX = -1;
			r_lastTY = -1;
		}
		//alert(eX-position[0]);
		canObj.mainMouseEvent(event, (eX-position[0]), (eY-position[1]),this);
		
	}
		
};

function P_Mouse (event) 
{
	var canObj = findPaintObj(event.target.id);
	/*if(canObj.defaultSelectArr.length=="1")
		this.pObj.clickIdx = 0;*/
	canObj.mainMouseEvent(event, event.offsetX, event.offsetY,this);
};

function selectData(div,item)
{
	var info = div.id.split('_');
	var id = info[0]+"_"+info[1];
	
	for(var i=0;i<PAINT_LIST.length;i++)
	{
		if(PAINT_LIST[i].id == id)
		{
			var tempPObj = PAINT_LIST[i].imgObj[0];
			var tempObjInfo = tempPObj.objInfo2[PAINT_LIST[i].clickIdx][txtIdx];
			if(info[2]=='fontcolor' || info[2]=='drawcolor')
			{
				if(tempObjInfo)
				{
					tempObjInfo.strokeStyle = item.id;
					tempObjInfo.fillStyle = item.id;
					tempPObj.reDraw(1); //text다시 그려줘야함
				}
				else
				{
					tempPObj.pObj.strokeStyle=item.id;
					tempPObj.pObj.fillStyle=item.id;
				}
				break;
			}
			else if(info[2]=='fontsize')
			{
				if(tempObjInfo)
				{
					tempObjInfo.font_size = item.id;
					tempPObj.reDraw(1);
				}
				else
					tempPObj.pObj.font_size=item.id;
				
				break;
			}
			else if(info[2]=='fontname')
			{
				if(tempObjInfo)
				{
					tempObjInfo.fontname = item.id;
					tempPObj.reDraw(1);
				}
				else
					PAINT_LIST[i].imgObj[0].pObj.fontname=item.id;
				
				break;
			}
			else if(info[2]=='lineShape')
			{/*
				if(tempObjInfo)
				{
					tempObjInfo.lineShape = item.id;
					tempPObj.reDraw(1);
				}
				else*/
					tempPObj.pObj.lineShape=item.id;
				
				break;
			}
			else if(info[2]=='lineThick')
			{
				tempPObj.pObj.lineWidth=item.id;
				break;
			}
		}
	}
}

function BK_PAINTBOX_APPLET(id, attr)
{
	this.id = id;
	this.attr = attr;
	this.idNum = id.split('_');
	this.invalid;
	this.sWidth;
	this.sHeight;
	this.codebase;
	this.sOpenFileName;
	this.mOpenFileName;
	this.defaultCategory;
	this.defaultSelect;
	
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
				break;
			case "width" : 
				this.sWidth=parseInt(atr[i][1]);
				break;
			case "height" : 
				this.sHeight=parseInt(atr[i][1]);
				break;
			case "codebase" : 
				this.codebase=atr[i][1];
				break;
			case "openfilename" : 
				this.sOpenFileName=atr[i][1];
				break;
			case "defaultcategory" : 
				this.defaultCategory=atr[i][1];
				break;
			case "defaultselect" : 
				this.defaultSelect = atr[i][1];	
				break;
		}
	}
	
	var appletStr = "";	
	appletStr = "<APPLET id='"+this.id+"' name='a_"+this.idNum[1]+"' CODE='Main/Paint_Helper.class'  ARCHIVE='signedpainter.jar' style='width:"+this.sWidth+"px;height:"+this.sHeight+"px;'>";
	appletStr += "\r\n<PARAM NAME='CODEBASE' VALUE='"+this.codebase+"' />";
	appletStr += "\r\n<PARAM NAME='INVALID' VALUE='true' />";
	appletStr += "\r\n<PARAM NAME='WIDTH' VALUE='"+this.sWidth+"' />";
	appletStr += "\r\n<PARAM NAME='HEIGHT' VALUE='"+this.sHeight+"' />";
	appletStr += "\r\n<PARAM NAME='OPENFILENAME' VALUE='"+this.sOpenFileName+"' />";
	appletStr += "\r\n<PARAM NAME='DEFAULTCATEGORY' VALUE='"+this.defaultCategory+"' />";
	appletStr += "\r\n<PARAM NAME='DEFAULTSELECT' VALUE='"+this.defaultSelect+"' />";
	appletStr += "\r\n</APPLET>";

	document.getElementById("PB_"+this.idNum[1]).innerHTML = appletStr;
	
}

function BK_PAINTBOX(id, attr)
{
	this.id = id;
	this.attr = attr;
	this.idNum = id.split('_');
	this.obj=document.getElementById("PB_"+this.idNum[1]);
	this.cId = null;
	this.cObj=null;
	this.cCopyObj=null;
	this.ctx=null;
	this.ctxCopy=null;
	//var tempImgLen = tempImg.length;
	//tempImg[tempImgLen] = tempImgLen;
	//tempImg[tempImgLen] = new Array();
	
	this.imgDiv=null;
	this.mode=null;
	//this.idx=0;
	this.mDownCheck=0; // mousedown check
	this.mergeImg = new Image();
	//this.whiteBGImg = new Image();
	this.mergeImg.src = "/EMR_DATA/img/paintbox/mergeImg.jpg";
	//this.whiteBGImg.src = "http://121.141.176.66/EMR_DATA/img/paintbox/white.jpg";
	
	this.thumbY=40;
	this.menuY=null;
	this.thumbHeight=40;
	this.menuHeight=80;
	this.tabType=0;   // default 0 
	this.mainInfo=new Array();
	this.drawInfo=new Array();
	this.textInfo=new Array();
	this.figureInfo=new Array();
	this.canType=0;
	this.clickMenu=201;
	this.dashStyle = "";
	this.imgObj = new Array();
	this.imgIdx = 0;
	this.tempImg = new Array();
	
	
	this.newCheck=1;
	this.menuClickCheck=1;
//	this.objInfo2=new Array();
//	this.objIdx2=0;
	this.doIdx=0;
	this.clickIdx=0;
	this.initFlag=1;
	
	this.fillStyle="blue";
	this.strokeStyle="blue";
	this.lineWidth =null;
	this.lineShape =null;
	this.globalAlpha=1;
	
	
	
	
	this.modifytype = false;
	this.sWidth = "";
	this.sHeight = "";
	this.sOpenFileName = "";
	this.mOpenFileName = "";    
	this.hasDefaultImage=false;
	this.sSaveFileName = "";
	this.openedFileNames = null;
	this.defaultCategory = "";
	this.startFlag = true;
	this.keyPressed = false;
	this.stampImage = null;  
	this.defaultSelect = "";
	this.defaultSelectArr = new Array();
	var eX,eY;
	this.defFontSizeIdx = 4;
	this.defFontNameIdx = 0;
	this.fontSize = ["8", "10", "12", "14", "16",	"18", "20"];
	this.fontName = ["Sans Serif", "Monospaced", "Serif", "새굴림", "맑은 고딕", "HY강M", "HY궁서"];
	this.dColor = new Array();
	this.dColor[0] = ['#FF0000', '#FF7413', '#FFEA00', '#FADEDA'];
	this.dColor[1] = ['#00FF00', '#4CB0A8', '#61BE78', '#00B0A8'];
	this.dColor[2] = ['#0000FF', '#106DD7', '#3834BC', '#4186A7'];
	this.dColor[3] = ['#FFFFFF', '#FFDDFF', '#FFDDDD', '#000000'];
	
	
	
	

	this.init = function()
	{
		this.initFlag=2;
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
						this.sWidth=parseInt(atr[i][1]);
						break;
					case "height" : 
						this.sHeight=parseInt(atr[i][1]);
						break;
					case "openfilename" : 
						this.sOpenFileName=atr[i][1];
						break;
					case "savefilename" : 
						this.mOpenFileName=atr[i][1];
						break;
					case "defaultcategory" : 
						this.defaultCategory=atr[i][1];
						break;
					case "defaultselect" : 
					if(attr[i][0] !=null)
						this.defaultSelect = atr[i][1];	
					else 
						this.defaultSelect = "False";			
						break;
				}
			}
		}
		else
		{
			this.sWidth = 400;
			this.sHeight = 400;
		}		
		this.openFileNames = this.sOpenFileName.split("?");
		var fileLen = this.openFileNames.length;
		//if(!(fileLen=="1" && this.openFileNames[0]==""))
		{
			for(var i=0;i<fileLen;i++)
			{
				this.tempImg[i] = new Image();
				if(this.openFileNames[i])
					this.tempImg[i].src = this.openFileNames[i];
				this.defaultSelectArr[i] = new Array();
				this.defaultSelectArr[i][0] = this.defaultSelect;
			}
		}
		//alert(this.openFileNames[0]+" / "+this.openFileNames[1]);
		this.menuY = this.sHeight-this.menuHeight;
		this.obj.style.width = this.sWidth + "px";
		this.obj.style.height = this.sHeight + "px"; 
		//this.obj.style.backgroundColor = "#000000"; 
		
		this.obj.innerHTML="<CANVAS id='"+this.id+"' width="+this.sWidth+"px' height='"+this.sHeight+"px' style='border: 1px solid black;background:white;' ></CANVAS><CANVAS id='copy_"+this.idNum[1]+"'  width="+this.sWidth+"px' height='"+(this.sHeight-122)+"px' style='display:none;background:white;'></CANVAS><div id='img_can_"+this.idNum[1]+"' ></div>";
		debug = document.getElementById('debug');
		this.cObj = document.getElementById(this.id);
		this.cCopyObj = document.getElementById("copy_"+this.idNum[1]);
		this.imgDiv = document.getElementById("img_can_"+this.idNum[1]);
		//this.imgDiv.style.display="inline-block";
		this.imgDiv.style.display="none";
		
		this.device = navigator.userAgent;
		//alert(this.device);
		//if(this.device.indexOf("Android") != -1 || this.device.indexOf('iPhone') != -1 || this.device.indexOf('iPad') != -1 || this.device.indexOf('Tablet') != -1)
		if(this.device.indexOf("Android") != -1 || this.device.indexOf('iPhone') != -1 || this.device.indexOf('iPad') != -1 || this.device.indexOf('Touch') != -1)
		{
			this.cObj.addEventListener('touchstart', P_Touch, false);
			this.cObj.addEventListener('touchmove',  P_Touch, false);
			this.cObj.addEventListener('touchend',   P_Touch, false);

			if( this.device.indexOf('Tablet') != -1){
				this.cObj.addEventListener('mousedown', P_Mouse, false);
				this.cObj.addEventListener('mousemove', P_Mouse, false);
		 		this.cObj.addEventListener('mouseup',   P_Mouse, false);
			}
			
		}
		else
		{	 
		  this.cObj.addEventListener('mousedown', P_Mouse, false);
		  this.cObj.addEventListener('mousemove', P_Mouse, false);
		 	this.cObj.addEventListener('mouseup',   P_Mouse, false);
		}
		
		this.ctx = this.cObj.getContext("2d");
		this.ctxCopy = this.cCopyObj.getContext("2d");
		
		for(var i=0; i<menuInfo.length; i++)
		{
			switch(menuInfo[i][0])
			{
				case 0 : this.mainInfo[this.mainInfo.length] = [menuInfo[i][1], menuInfo[i][8], this.menuY + menuInfo[i][9]+5, menuInfo[i][10], menuInfo[i][11], menuInfo[i][13]];  //id,x,y,w,h,canType
					break;
				case 1 : this.drawInfo[this.drawInfo.length] = [menuInfo[i][1], menuInfo[i][8], this.menuY + menuInfo[i][9]+5, menuInfo[i][10], menuInfo[i][11], menuInfo[i][13]];  //id,x,y,w,h,canType
					break;
				case 2: this.figureInfo[this.figureInfo.length] = [menuInfo[i][1], menuInfo[i][8], this.menuY + menuInfo[i][9]+5, menuInfo[i][10], menuInfo[i][11], menuInfo[i][13]];  //id,x,y,w,h,canType		
					break;
				case 3: this.textInfo[this.textInfo.length] = [menuInfo[i][1], menuInfo[i][8], this.menuY + menuInfo[i][9]+5, menuInfo[i][10], menuInfo[i][11], menuInfo[i][13]];  //id,x,y,w,h,canType		
					break;
			}	
		}
		this.drawView();
		
		this.imgObj[0] = new BK_PAINT_IMG(this,fileLen);
		
	};	
	
	this.drawView =  function() // paintBox img버튼 및 THUMB 부분 그리기
	{
		// 메뉴 배경색 및 선그리기//
		this.ctx.beginPath();
		
		this.ctx.fillStyle="#ccd9e4";
		this.ctx.fillRect(0,this.menuY,this.sWidth,this.menuHeight-20);
		this.ctx.fillStyle="#ffffff";
		this.ctx.fillRect(5,this.menuY+5,this.sWidth-10,this.menuHeight-10-20);
		//== 투명도 확인 임시 작업==
		//this.ctx.fillStyle="#FFBB00";
		//this.ctx.fillRect(0,this.thumbY,this.sWidth,this.sHeight-this.thumbHeight-this.menuHeight);
		
		//===========================
		this.ctx.moveTo(0, this.thumbY+0.5);
		this.ctx.lineTo(this.sWidth, this.thumbY+0.5);
		this.ctx.moveTo(0, this.menuY+0.5);
		this.ctx.lineTo(this.sWidth, this.menuY+0.5);
		this.ctx.stroke();
		
		this.mergeImg.onload = function()
		{
			imgCheck(id);
		}
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#BDBDBD";
		this.ctx.fillStyle="#000000";
		this.ctx.textBaseline = "Bottom";
		this.ctx.font ="11px 돋움";
		this.ctx.fillText("Main",5,this.menuY+this.menuHeight-7);
		this.ctx.fillText("그림",40,this.menuY+this.menuHeight-7);
		this.ctx.fillText("Text",73,this.menuY+this.menuHeight-7);
		this.ctx.fillText("도형",109,this.menuY+this.menuHeight-7);
		
		//this.ctx.strokeStyle = "#00006D";
		var tempx=0;
		
		
		for(var i=0; i<5; i++)
		{
			this.ctx.moveTo(tempx,this.menuY+this.menuHeight-20);
			this.ctx.lineTo(tempx,this.menuY+this.menuHeight);	
			tempx+=34;
		}
		
		this.ctx.stroke();
		this.ctx.strokeStyle = "#000000";
		
		if(this.initFlag==1)
		{
			this.initFlag=2;
			this.init();
		}
	};
	
	this.textMenu = function(idx,ctx)
	{
		//alert(idx+" / "+menuInfo[idx][12]);
		if(menuInfo[idx][12]=='text' || menuInfo[idx][12]=='font_bold' || menuInfo[idx][12]=='font_italic')
			ctx.drawImage(this.mergeImg, menuInfo[idx][2], menuInfo[idx][3], menuInfo[idx][4],menuInfo[idx][5],menuInfo[idx][6],this.menuY+menuInfo[idx][7],menuInfo[idx][4],menuInfo[idx][5]); 
		//else if(menuInfo[idx][12]=='font_size')
		
		//else if(menuInfo[idx][12]=='font')
		
		//else if(menuInfo[idx][12]=='font_color')
	}
	
	this.drawMenu = function()
	{
		this.ctx.beginPath();
		this.ctx.clearRect(5,this.menuY+5,this.sWidth-10,this.menuHeight-10-20);
		
		this.ctx.strokeStyle = "#BDBDBD";
		for(var i=0; i<menuInfo.length; i++)
		{
			if(menuInfo[i][0]!=this.tabType) 
				continue;
			
/*
			if(menuInfo[i][6]==10) 
			{
				this.ctx.moveTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+0.5);//left
				this.ctx.lineTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+menuInfo[i][10]+0.5);
			}*/
			
			if(this.tabType==3)
				this.textMenu(i,this.ctx);
			else
			{
				if(this.tabType != 1)
				//this.ctx.drawImage(this.mergeImg, menuInfo[i][2], menuInfo[i][3], menuInfo[i][4],menuInfo[i][5],menuInfo[i][6],this.menuY+menuInfo[i][7],menuInfo[i][4],menuInfo[i][5]); 
				this.ctx.drawImage(this.mergeImg, menuInfo[i][2], menuInfo[i][3], menuInfo[i][4],menuInfo[i][5],menuInfo[i][6],this.menuY+menuInfo[i][9],menuInfo[i][10],menuInfo[i][11]); 

				if(this.tabType==1){
					if(menuInfo[i][12]=='lineshape_0' || menuInfo[i][12]=='lineshape_1' || menuInfo[i][12]=='lineshape_2' || menuInfo[i][12]=='lineshape_3' || menuInfo[i][12]=='linethick_0' || menuInfo[i][12]=='linethick_1' || menuInfo[i][12]=='linethick_2' || menuInfo[i][12]=='linethick_3'){
						this.ctx.moveTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+0.5);//left
						this.ctx.lineTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+11.5);
						this.ctx.drawImage(this.mergeImg, menuInfo[i][2], menuInfo[i][3], menuInfo[i][4],menuInfo[i][5],menuInfo[i][6],this.menuY+menuInfo[i][7],menuInfo[i][4]+25,menuInfo[i][5]); 
					}
					else
						this.ctx.drawImage(this.mergeImg, menuInfo[i][2], menuInfo[i][3], menuInfo[i][4],menuInfo[i][5],menuInfo[i][6],this.menuY+menuInfo[i][9],menuInfo[i][10],menuInfo[i][11]); 
				}
			}
				
		
			this.ctx.moveTo(menuInfo[i][8] + menuInfo[i][10], this.menuY+menuInfo[i][9]+0.5);
			this.ctx.lineTo(menuInfo[i][8] + menuInfo[i][10], this.menuY+menuInfo[i][9]+menuInfo[i][11]+0.5); // right
			
			this.ctx.moveTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+0.5); //top
			this.ctx.lineTo(menuInfo[i][8] + menuInfo[i][10], this.menuY+menuInfo[i][9]+0.5);
			
			this.ctx.moveTo(menuInfo[i][8], this.menuY+menuInfo[i][9]+menuInfo[i][11]+0.5); //bottom
			this.ctx.lineTo(menuInfo[i][8] + menuInfo[i][10], this.menuY+menuInfo[i][9]+menuInfo[i][11]+0.5);			
			
		}
		this.ctx.stroke();
	};
	
	this.drawThumb = function()
	{ 
		var n = 0;
		for(var j=0;j<PAINT_LIST.length;j++)
		{
			if(PAINT_LIST[j].id == this.id)
			{
				n=j;
				break;
			}
		}
		
		//for(var i=0; i<this.openFileNames.length;i++)
		for(var i=0; i<this.defaultSelectArr.length;i++)
		{
			this.ctx.beginPath();
			if(i==0)
				this.ctx.clearRect(0,0,this.sWidth,this.thumbY);
			
			
			//if(this.tempImg[i].src)
			if(this.tempImg[i].src.indexOf(".jpg") != -1 || this.tempImg[i].src.indexOf(".png") != -1)
			{
				this.ctx.drawImage(this.tempImg[i], 2+40*i, 2, 35 ,35);
				//this.ctx.drawImage(this.tempImg[i], 0,0,this.tempImg[i].width, this.tempImg[i].height,2+40*i, 2, 35 ,35);
			}
			var tempDS = this.defaultSelectArr[i][0];
			if(tempDS=="True")
			{
				this.ctx.drawImage(this.mergeImg, 416, 0, 16, 16, 2+40*i, 2, 16 ,16);
				//this.defaultSelectArr[i][0] = tempDS;
			}
			else // if(tempDS=="False")
			{
				this.ctx.drawImage(this.mergeImg, 400, 0, 16, 16, 2+40*i, 2, 16 ,16);
				//this.defaultSelectArr[i][0] = tempDS;
			}
			//else
				//continue;
			this.ctx.drawImage(this.mergeImg, 432, 0, 16, 16, 22+40*i, 2, 16 ,16);
			
			if(i!=this.clickIdx)
				this.ctx.strokeStyle = "#BDBDBD";
			else
				this.ctx.strokeStyle = "#000000";
			
			this.ctx.strokeRect(2+40*i,2,35,35);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		
	};
	
	
	this.refreshImage = function(img) // canvas에 현재 img를 그려줌
	{
		var h = this.sHeight-this.thumbHeight-this.menuHeight;
		
		//this.ctx.drawImage(img, 0, 0, this.sWidth-2 , h-2, 1 , this.thumbY+1, this.sWidth-2 ,h-2);
		//this.ctx.drawImage(img, 0, 0, img.width , img.height, 1 , this.thumbY+1, this.sWidth-2 ,h-2);
		//this.ctx.drawImage(img,  1 , this.thumbY+1, this.sWidth-2 ,h-2);
		this.ctx.drawImage(img, 1 , this.thumbY+1, this.sWidth-2 ,h-2);
	};
	
	
	this.clearCanvas = function()
	{
		this.ctx.clearRect(0,this.thumbY+1,this.sWidth,this.sHeight-this.menuHeight-this.thumbHeight);
	};
	
	this.mainMouseEvent = function(e, x, y,obj)
	{
		var eType = e.type;
		eX = x;
		eY = y;
		
		
		if(eY<this.thumbY && (eType=='touchstart' || eType=='mousedown')) //THUMB
		{
			var nowObj = this.imgObj[0].objInfo2[this.clickIdx];
			nowObj.splice(this.doIdx,nowObj.length);
			
			var len = this.tempImg.length;
			for(var i=0; i<len;i++)
			{
				if(i*40<eX && eX<40*(i+1))
				{
					//alert("i : "+i+" / e.offsetX : "+eX+" / e.offsetY : "+eY+" / tempImg[i].src : "+this.tempImg[i].src+" / this.id : "+this.id+" / default : "+this.defaultSelectArr[i]);
					this.clickIdx = i;
					if(i*40<eX && eX<40*i+16 && eY<=16)
					{
						//alert("check : "+this.defaultSelectArr[i][0].toLowerCase());
						if(this.defaultSelectArr[i][0]=='False')
							this.defaultSelectArr[i][0]='True';
						else
							this.defaultSelectArr[i][0]='False';
					}
					else if(i*40+24<eX && eX<40*(i+1) && eY<=16)
					{
						//alert(this.defaultSelectArr.length);
						if(this.defaultSelectArr.length>1)
						{
							this.defaultSelectArr.splice(i,1);
							this.tempImg.splice(i,1);
							this.imgObj[0].objInfo2.splice(i,1);
								//alert(this.imgObj[0].objInfo2);
							if(i!=0)
							{
								this.clickIdx=i-1;
							}
							else
								this.clickIdx = 0;
						}
						else
							alert("마지막 항목은 삭제 할 수 없습니다.");
					}
					this.drawThumb();
					//this.imgObj[this.imgIdx].ctx[1].drawImage(this.tempImg[this.imgIdx],0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
					
					this.doIdx=this.imgObj[0].objInfo2[this.clickIdx].length;
					//if(this.doIdx==-1)
						//this.doIdx=0;
					//alert("thumb nail click : "+this.doIdx);
					
					for(var j=0;j<4;j++)
					{
						if(j==1)
							continue;
						this.imgObj[0].ctx[j].clearRect(0, 0,this.imgObj[0].width,this.imgObj[0].height);	
					}
					
					this.imgObj[0].imgCan[1].src = this.tempImg[this.clickIdx].src;
					this.imgObj[0].drawAllImage();
					
					this.menuClickCheck = 1;
					this.clickMenu=m_pen;
					this.canType=0;
					this.fillStyle="blue";
					this.strokeStyle="blue";

				}
			}
			this.imgObj[0].reDraw(1);
		}
		else if(eY>this.thumbY && eY<this.menuY) //CANVAS
		{
			if(this.clickMenu == m_undo ||	this.clickMenu == m_redo ||	this.clickMenu == m_clear ||	this.clickMenu == m_openfile ||	this.clickMenu == m_save ||	this.clickMenu == m_server ||	this.clickMenu == m_camera)
				return;
			this.imgObj[this.imgIdx].mouseEvent(this.clickMenu, this.canType, eType, e, this.menuClickCheck,this.tabType ,eX,eY-40,obj,this.lineWidth);
			/*
			if(this.menuClickCheck==1)
			{
				this.menuClickCheck=0;
			}
			*/
		}
		else if(eY>this.menuY+60 &&  (eType=='touchstart' || eType=='mousedown')) //TAB
		{
			if(eX<34)
			{
				for(var i=0;i<tabSettingArr.length;i++)
				{
					var removeObj = document.getElementById(this.id+"_"+tabSettingArr[i]);
					if(removeObj)
						document.body.removeChild(removeObj);
				}
				this.tabType=0;
				this.imgObj[this.imgIdx].outTextAttr(this.id);
			}
			else if(eX>34 && eX<68)
			{
				this.tabType=1;
				this.imgObj[this.imgIdx].outTextAttr(this.id);
				this.imgObj[this.imgIdx].inFontColor(this.id,this.tabType);
				this.imgObj[this.imgIdx].inLineShape(this.id,this.tabType);
				this.imgObj[this.imgIdx].inLineThick(this.id,this.tabType);
			}
			else if(eX>68 && eX<102)
			{
				this.tabType=3;
				this.clickMenu=m_text;
				this.canType = '4';
				this.imgObj[this.imgIdx].outTextAttr(this.id);
				this.imgObj[this.imgIdx].inFontSize(this.id);
				this.imgObj[this.imgIdx].inFontName(this.id);
				this.imgObj[this.imgIdx].inFontColor(this.id,this.tabType);
			}
			else if(eX>102 && eX<136)
			{
				this.tabType=2;
				this.imgObj[this.imgIdx].outTextAttr(this.id);
			}
			
			this.drawMenu();
		}
		
		if(eY>this.menuY && eY<this.menuY+60 && ( eType=="touchstart" || eType=="mousedown" )) //MENU
		{
			this.menuClickCheck=1;
			this.menuClick(e,this.doIdx, eType,x,y);
			
			if(this.clickMenu != m_text)
				txtIdx = '';
			if(this.clickMenu == m_angle || this.clickMenu == m_conectedline || this.clickMenu == m_text)
			{
				var tempNum = this.imgObj[this.imgIdx].objInfo2[this.clickIdx];
				this.doIdx++;
				if(tempNum)
				{
					//alert(tempNum.length+" / "+this.doIdx);
					if(tempNum.length>this.doIdx)
						tempNum.splice(this.doIdx-1,tempNum.length);
				}
				
				this.imgObj[this.imgIdx].createObj(this.clickMenu, this.canType, e);
				this.newCheck=1;
			}
			else if(this.clickMenu == m_server)
			{
				var ip = document.domain;
				var port = window.location.port;
				var ipStr = ip+(port==""?"":":"+port);
				window.open("http://"+ipStr+"/medios/ui/eView/imageBrowsing.jsp?category=____&id="+this.id,"popup","width=620px,height=460px,center=yes,scrollbars=yes");
			}
			else if(this.clickMenu == m_save)
			{
				this.ctxCopy.beginPath();
				this.ctxCopy.fillStyle='#ffffff';
				this.ctxCopy.fillRect(0,this.thumbHeight+1,this.sWidth,this.sHeight-this.thumbHeight-this.menuHeight);
				this.ctxCopy.fill();
				this.ctxCopy.closePath();
				
				this.ctxCopy.drawImage(this.cObj, 0, this.thumbHeight+1, this.sWidth ,this.sHeight-this.thumbHeight-this.menuHeight,0, 0,this.sWidth,this.sHeight-this.thumbHeight-this.menuHeight);
				
				var totalCan = this.cCopyObj; //this.imgObj[this.imgIdx].imgCan[0];
				
				if(browserVer.indexOf('10.0')!=-1 || browserVer.indexOf('11.0')!=-1)
				{
					window.navigator.msSaveBlob(totalCan.msToBlob(),"image.jpg");
					
			    /*var xmlHttpReq = false;
			    var self = this;
			    if (window.XMLHttpRequest) {
			        self.xmlHttpReq = new XMLHttpRequest();
			    }
			    else if (window.ActiveXObject) {
			        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			    }
			    if(self.xmlHttpReq == null)
			    {
			    	alert("Can't get the XML HTTP");
			    	return;
			    }
			    self.xmlHttpReq.open('POST', "http://"+SERVERIP+"/EMR_DATA/save_image_local", false);
			    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			    self.xmlHttpReq.send("imgData="+canvasData);*/
				}
				else
				{
					
					/*
					var frame = document.createElement('iframe');
			    document.body.appendChild(frame);
			
			    frame.contentWindow.document.open();
			    frame.contentWindow.document.write("<img src='"+totalCan.toDataURL()+"'/>");
			    frame.contentWindow.document.close();
			    frame.contentWindow.focus();
			    frame.contentWindow.document.execCommand('SaveAs', true, 'test');
			
			    document.body.removeChild(frame);*/
			    
			    /*var win = window.open();
			    win.document.write("<img src='"+totalCan.toDataURL()+"'/>");
			    win.document.close();
			    win.document.execCommand('SaveAs',true,'test');*/
			    
				
				var dataUrl = totalCan.toDataURL("image/jpeg");
				
				//var imgData = ToHex4Unicode(dataUrl);
				var tForm = document.createElement("form");
				var inData = document.createElement("input");
				
				inData.setAttribute("type", "hidden");
				inData.setAttribute("name", "imgData");
				inData.setAttribute("id", "imgData");
				inData.setAttribute("value", dataUrl);
				
				tForm.appendChild(inData);
				tForm.method = "post";
				document.body.appendChild(tForm);
				tForm.action = "/EMR_DATA/script/save_image_local.jsp";
				
				tForm.submit();
				
				
				
			    //var win = window.open("/EMR_DATA/save_image_local.jsp?imgData=" + imgData);
			    //win.location.href = "http://121.141.176.66/EMR_DATA/save_image_local.jsp?imgData="+totalCan.toDataURL("image/jpeg");
				//win.location.href = "http://121.141.176.66/EMR_DATA/save_image_local.jsp?imgData=";
			    
			    
			    //var downloadLnk = document.getElementById("downloadLnk_"+idNum[1]);
			    //downloadLnk.addEventListener('click',downloadImg(totalCan),false);
			    
			    /*
			    var imageDataURL = totalCan.toDataURL('image/jpeg');
			    var ret = imageDataURL.split(",");
			    var hexData = convertToHex(ret[1]);
			    var ajax = new XMLHttpRequest();
			    ajax.open("POST","http://"+SERVERIP+"/EMR_DATA/save_image_local",false);
			    ajax.setRequestHeader("Content-Type", "image/jpeg");
			    ajax.send("imgData="+hexData);
			    */
			    
			    
			    //ajax.open("POST",'save_image_local.jsp',false);
			    //ajax.send("imgData="+canvasData);
			    //var canvasData = totalCan.toDataURL("image/jpeg");
			    /*var somehtml1= document.createElement("img");
          somehtml1.id="imgid";
          somehtml1.name="imgname";
          somehtml1.src=totalCan.toDataURL("image/jpeg");
          document.body.appendChild(somehtml1);

          window.win = open (somehtml1.src);
          setTimeout('win.document.execCommand("SaveAs")', 500);
          somehtml1.href = totalCan.toDataURL("image/jpeg");
 					somehtml1.download = "test.jpeg"; */
 					
 					//var strURL = "http://121.141.176.66/EMR_DATA/save_image_local.jsp";
 					//var postData = "imgData="+totalCan.toDataURL("image/jpeg");
 				 					
 					
				}
			}
			else if(this.clickMenu == m_openfile)
			{
				//alert("로컬 이미지 불러오기");
				var idNum = this.id.split('_');
				document.getElementById("file_"+idNum[1]).click();
				
			}
			
		}
		
	};
	
	this.menuClick = function(e, idx, eType,x,y)
	{
		var t = eType.substring(0,5);
		eX = x;
		eY = y;
		
		this.doIdx = idx;
		// 메뉴 클릭 시 현재 상태 설정 메뉴 간격 설정도 필요 
		switch(this.tabType)
		{
			case 0: 
			{
				for(var i=0; i<this.mainInfo.length; i++)
				{
					if(this.mainInfo[i][1]<eX && eX<this.mainInfo[i][1]+this.mainInfo[i][3] && this.mainInfo[i][2]<eY && eY<this.mainInfo[i][2]+this.mainInfo[i][4])
					{	
						this.clickMenu=this.mainInfo[i][0];
						this.canType=this.mainInfo[i][5];
						//alert("main : "+this.mainInfo[i][0]); 	
						
						this.mainMenuClick();
					}
				}
				this.dashStyle = "";
				break;
			}
			case 1: 
			{
				for(var i=0; i<this.drawInfo.length; i++)
				{
					if(this.drawInfo[i][1]<eX && eX<this.drawInfo[i][1]+this.drawInfo[i][3] && this.drawInfo[i][2]<eY && eY<this.drawInfo[i][2]+this.drawInfo[i][4])
					{
						if(this.drawInfo[i][0]!=211 && this.drawInfo[i][0]!=212 && this.drawInfo[i][0]!=213 && this.drawInfo[i][0]!=214 && this.drawInfo[i][0]!=215 && this.drawInfo[i][0]!=216 && this.drawInfo[i][0]!=217 && this.drawInfo[i][0]!=218)
						{
							this.clickMenu=this.drawInfo[i][0];
							this.canType=this.drawInfo[i][5];
							this.dashStyle = "";
						}     
						else
							this.dashStyle = this.drawInfo[i][0];
					}
				}
				break;
			}
			case 2: 
			{
				for(var i=0; i<this.figureInfo.length; i++)
				{
					if(this.figureInfo[i][1]<eX && eX<this.figureInfo[i][1]+this.figureInfo[i][3] && this.figureInfo[i][2]<eY && eY<this.figureInfo[i][2]+this.figureInfo[i][4] )
					{
						//this.canType=this.tabType;
						this.clickMenu=this.figureInfo[i][0];
						this.canType=this.figureInfo[i][5];
						//alert("figuer : "+this.figureInfo[i][0]);
					}
				}
				this.dashStyle = "";
				break;
			}
			case 3: 
			{
				for(var i=0; i<this.textInfo.length; i++)
				{
					if(this.textInfo[i][1]<eX && eX<this.textInfo[i][1]+this.textInfo[i][3] && this.textInfo[i][2]<eY && eY<this.textInfo[i][2]+this.textInfo[i][4] )
					{
						//this.canType=this.tabType;
						//alert(this.textInfo[i][0]);
						if(this.textInfo[i][0]==m_text)
						{
							this.clickMenu=this.textInfo[i][0];
							this.canType=this.textInfo[i][5];
							this.imgObj[this.imgIdx].inText(this.id,null);
						}
						else if(this.textInfo[i][0] == m_fontbold)
						{
							this.clickMenu=this.textInfo[i][0];
							this.imgObj[this.imgIdx].objInfo2[this.clickIdx][txtIdx].fontbold = "bold ";
							this.imgObj[this.imgIdx].reDraw(1);
						}
						else if(this.textInfo[i][0] == m_fontitalic)
						{
							this.clickMenu=this.textInfo[i][0];
							this.imgObj[this.imgIdx].objInfo2[this.clickIdx][txtIdx].fontitalic = " italic ";
							this.imgObj[this.imgIdx].reDraw(1);
						}
					}
				}
				this.dashStyle = "";
				break;
			}
		}
	};
	
	this.mainMenuClick = function()
	{
		switch(this.clickMenu)
		{
			case m_clear :
			{
				for(var i=0;i<6;i++)
				{
					if(i==1)
						continue;
					this.imgObj[this.imgIdx].ctx[i].clearRect(0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
				}
				
				this.imgObj[this.imgIdx].objInfo2[this.clickIdx] = new Array();
				this.imgObj[this.imgIdx].drawAllImage();
				this.doIdx=0;
				this.clickMenu=m_pen;
				this.canType=0;
				break;
			}
			case m_undo : 
			{
				this.imgObj[this.imgIdx].ctx[0].clearRect(0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
				this.imgObj[this.imgIdx].ctx[2].clearRect(0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
				this.doIdx-=1;
				this.imgObj[this.imgIdx].undo(this.doIdx);
				this.clickMenu=m_pen;
				this.canType=0;
				break;
			}
			case m_redo : 
			{
				this.imgObj[this.imgIdx].ctx[0].clearRect(0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
				this.imgObj[this.imgIdx].ctx[2].clearRect(0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
				this.doIdx+=1;
				this.imgObj[this.imgIdx].redo(this.doIdx);
				this.clickMenu=m_pen;
				this.canType=0;
				break;
			}
		}
	};
	

	this.init();
	
	//this.imgObj[this.imgIdx].ctx[1].drawImage(this.tempImg[1],0, 0, this.imgObj[this.imgIdx].width, this.imgObj[this.imgIdx].height);
	//this.imgObj[this.imgIdx].drawAllImage();
	
}


function BK_PAINT_IMG(pObj, tL,c) // 각각의 Back CANVAS 정보
{
	if(!c)
	{
		this.pObj = pObj;
		this.tL = tL;
		this.type = null;
		this.imgCan = new Array(); // imgCanvas array
		this.ctx = new Array(); // canvas Context
		this.objInfo1 = new Array(); // 
		this.objInfo2 = new Array();
		this.width=pObj.sWidth;
		this.height=pObj.sHeight-pObj.menuHeight-pObj.thumbHeight;
		this.objIdx1 = 0;
		this.objIdx2 = 0;
		this.drawCan = null;
		this.backCan = null;
		this.figureCan = null;
		//this.drawCtx=null;
		//this.backCtx=null;
		//this.figureCtx=null;
		this.drawImg = new Image();
		this.clickMenu = null;
		this.mDownCheck;
		this.mMoveCheck;
		this.mUpCheck;
		this.newCheck;
		this.canType = null;
		this.lineStyle = null;
		this.lineWidth = null;
		this.lineShape = null;
		this.undoObj = null;
		this.doIdx;
		this.tabType;
	
	
		for(var i=0;i<this.tL;i++)
		{
			this.objInfo2[i] = new Array();
		}
	}
	
	else
	{
		this.pObj = pObj;
		this.tL = tL;
		this.type = null;
		this.imgCan = new Array(); // imgCanvas array
		this.ctx = new Array(); // canvas Context
		this.objInfo1 = new Array(); // 
		this.objInfo2 = new Array();
		this.width=pObj.sWidth;
		this.height=pObj.sHeight-pObj.menuHeight-pObj.thumbHeight;
		this.objIdx1 = 0;
		this.objIdx2 = 0;
		this.drawCan = null;
		this.backCan = null;
		this.figureCan = null;
		//this.drawCtx=null;
		//this.backCtx=null;
		//this.figureCtx=null;
		this.drawImg = new Image();
		this.clickMenu = null;
		this.mDownCheck;
		this.mMoveCheck;
		this.mUpCheck;
		this.newCheck;
		this.canType = null;
		this.lineStyle = null;
		this.lineWidth = null;
		this.lineShape = null;
		this.undoObj = null;
		this.doIdx;
		this.tabType;
		
		for(var i=0;i<c.length;i++)
		{
			this.objInfo2[i] = c[i];
		}
		
		this.objInfo2[this.tL] = new Array();
		this.pObj.clickIdx = c.length;
	}
	
	this.stampImg = new Array();
	this.stampImg[0] = new Image();
	this.stampImg[0].src = "/EMR_DATA/img/paintbox/stamp1.gif";//document.getElementById("stamp1");
	this.stampImg[1] = new Image();
	this.stampImg[1].src = "/EMR_DATA/img/paintbox/stamp2.gif";//document.getElementById("stamp2");
	this.stampImg[2] = new Image();
	this.stampImg[2].src = "/EMR_DATA/img/paintbox/stamp3.gif";//document.getElementById("stamp3"); 
	
	this.pObj.imgDiv.innerHTML +="<CANVAS id='paint_pen_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"' ></CANVAS>" +
														 "<IMG id='paint_backImg_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"' ></IMG>" +
														 "<CANVAS id='paint_figure_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"'></CANVAS>" +
														 "<CANVAS id='paint_temp_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"' style='background:pink;' ></CANVAS>"+
														 "<CANVAS id='paint_figure_copy_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"' ></CANVAS>"+
														 "<CANVAS id='paint_text_"+pObj.idNum[1]+"' width="+this.width+"px' height='"+this.height+"' ></CANVAS>"+
														 "<input id='file_"+pObj.idNum[1]+"'  type='file' accept='image/*' onchange='getFile("+pObj.idNum[1]+",this)' ><img  id='img_"+pObj.idNum[1]+"' >";
		
	this.imgCan[0] = document.getElementById("paint_pen_"+pObj.idNum[1]); 
	//this.imgCan[1] = document.getElementById("paint_backImg_"+pObj.idNum[1]);
	if(document.getElementById("paint_backImg_"+pObj.idNum[1]).src.indexOf(".jpg") != -1 || document.getElementById("paint_backImg_"+pObj.idNum[1]).src.indexOf(".png") != -1)
		this.imgCan[1] = document.getElementById("paint_backImg_"+pObj.idNum[1]);
	else{
		this.imgCan[1] = new Image();
		this.imgCan[1].id = "paint_backImg_"+pObj.idNum[1];
		this.imgCan[1].width = this.width;
		this.imgCan[1].height = this.height;
		this.imgCan[1].src="";
	}
	
	this.imgCan[2] = document.getElementById("paint_figure_"+pObj.idNum[1]);
	this.imgCan[3] = document.getElementById("paint_temp_"+pObj.idNum[1]);
	this.imgCan[4] = document.getElementById("paint_figure_copy_"+pObj.idNum[1]);
	this.imgCan[5] = document.getElementById("paint_text_"+pObj.idNum[1]);
	
	for(var i=0; i<6; i++)
	{
		if(i==1)
			continue;
		this.ctx[i] = this.imgCan[i].getContext("2d");		
	}
	
	this.drawAllImage = function()
	{
		this.pObj.clearCanvas();
		
		var bgImgSrc = this.imgCan[1].src.toLowerCase();
		if(bgImgSrc.indexOf(".jpg") != -1 || bgImgSrc.indexOf(".png") != -1 || bgImgSrc.indexOf("data:image") != -1)
		{
			//this.drawImg.src = this.imgCan[1].src;
			this.pObj.refreshImage(this.imgCan[1]);
		}
		else
		{
			this.pObj.refreshImage(whiteBGImg);
		}
		/*
		if(this.objInfo2[this.pObj.clickIdx].length>0)
		{
			if(m!=1)
				this.doIdx = this.objInfo2[this.pObj.clickIdx].length-1;
			else
				this.doIdx = this.objInfo2[this.pObj.clickIdx].length;
			this.reDraw();
		}*/

		for(var i=0; i<6; i++)
		{
			if(i==1 || i==3) // || this.canType==i)
				continue;
			
			//this.drawImg.src = this.imgCan[i].toDataURL();
			this.pObj.refreshImage(this.imgCan[i]);
		}
	};
	
	this.dashedLine = function(x1, y1, x2, y2, dashLen, ctx) 
	{
    if (dashLen == 0 || dashLen == null)
    {
    	ctx.moveTo(x1,y1);
    	ctx.lineTo(x2,y2);
    }
    else
    {
    	dashLen = dashLen*2;
	    var dX = x2 - x1;
	    var dY = y2 - y1;
	    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	    var dashX = dX / dashes;
	    var dashY = dY / dashes;
	
	    var q = 0;
	    var t;
	    ctx.moveTo(x1,y1);
	    while (q++ < dashes) {
	        x1 += dashX;
	        y1 += dashY;
	        t = q % 2 == 0 ? 'moveTo' : 'lineTo';
	        if(t=="moveTo")
	        	ctx.moveTo(x1, y1);
	        else
	        	ctx.lineTo(x1, y1);
	    }
	    t = q % 2 == 0 ? 'moveTo' : 'lineTo';
	    if(t=="moveTo")
	    	ctx.moveTo(x2, y2);
	    else
	    	ctx.lineTo(x2, y2);
  
    }
	};
	
	this.dottedCircle = function(cx, cy, radius, dashLen, ctx)
		{	
			var dot;
			if(dashLen==1)
				dot = 40;
			else if(dashLen==2)
				dot = 30;
			else if(dashLen==3)
				dot = 20;
	    var PI=Math.PI;
	    var PI2=PI*2;
	    var arcRadians=PI2/dot;
	    var spacingRadians=PI2/70;
	    var arcCount=dot;
	    var currentAngle=PI;
	   
	   if(dashLen==null || dashLen=="null" || dashLen==0)
	   {
	   		ctx.beginPath();
	      ctx.arc(cx,cy,radius,0,Math.PI*2);
	      ctx.stroke();
	  	}
	  	else
	  	{
		   for(var i=0;i<=arcCount;i++)
		   {
	        var startingAngle=currentAngle;
	        var endingAngle=startingAngle+arcRadians-spacingRadians;
	
	        ctx.beginPath();
	        ctx.arc(cx,cy,radius,startingAngle,endingAngle);
	        ctx.stroke();
	
	        currentAngle+=arcRadians;
		
		    }
		  }
		};
	
	this.imgCan[1].src = this.pObj.tempImg[this.pObj.clickIdx].src;
	
	//alert("this.imgCan[1]1111: "+this.imgCan[1].src);
	this.imgCan[1].onload = function()
	{
		//alert("this.imgCan[1]2222222: "+this.imgCan[1]);
		//if(this.imgCan[1].src.indexOf(".jpg") != -1 || this.imgCan[1].src.indexOf(".png") != -1)
		{
		if(this.imgCan[1])
		{
			this.drawAllImage();
		}
		}
	}
	
	this.mouseEvent = function (clickMenu, canType, eType, e, menuClickCheck, tabType, eX, eY,obj,lineWidth)
	{
		this.clickMenu = clickMenu;
		this.canType = canType;
		this.tabType =  tabType;
		this.lineWidth =  lineWidth;
		//if(menuClickCheck==1)
			//this.newCheck=1;
			
		var eventObj = findPaintObj(obj.id);
		
		if(eType=='touchstart' || eType=='mousedown')
		{
			this.mDownCheck=1;
			this.mUpCheck=0;
			this.mMoveCheck=0;
			
			if(clickMenu == m_pen || clickMenu == m_magnify|| clickMenu == m_rect || clickMenu== m_oval  ||  clickMenu== m_fillrect || clickMenu== m_filloval || clickMenu == m_line || clickMenu == m_spray || clickMenu == m_eraser || clickMenu == m_measure || clickMenu == m_arrow || clickMenu == m_hightlighter || clickMenu == m_stamp1 || clickMenu == m_stamp2 || clickMenu == m_stamp3)
			{
				eventObj.doIdx++;
				var tempNum = eventObj.imgObj[eventObj.imgIdx].objInfo2[eventObj.clickIdx];
				if(tempNum)
				{
					if(tempNum.length>=eventObj.doIdx)
						tempNum.splice(eventObj.doIdx-1,tempNum.length);
				}
				this.newCheck=1;
				eventObj.imgObj[eventObj.imgIdx].createObj(clickMenu, canType, e);
				
			}
			if(menuClickCheck==1 && (clickMenu != m_fontbold && clickMenu != m_fontitalic))
				this.newCheck=1;
			this.mouseDown(e,eX,eY);
		}

		if(eType=='touchend' || eType=='mouseup')
		{
			this.mUpCheck=1;
			this.mDownCheck=0;
			this.mMoveCheck=0;
			this.mouseUp(e,eX,eY);
			eventObj.menuClickCheck=0;
		}
		
		if(eType=='touchmove' || eType=='mousemove')
		{
			this.mMoveCheck=1;
			if(this.newCheck!=1)
				this.mouseMove(e,eX,eY);

		}
	};
	
	this.mouseDown = function (e,eX,eY)
	{
		//alert("down");
		e.preventDefault();
		if(this.newCheck==1 && (this.clickMenu == m_undo || this.clickMenu == m_redo || this.clickMenu== m_clear || this.clickMenu== m_openfile || this.clickMenu== m_save || this.clickMenu== m_server || this.clickMenu== m_camera))
			return; 
		var point = {x:eX, y:eY};
		
		if(this.pObj.defaultSelectArr[this.pObj.clickIdx][0]=='False')
		{
			this.pObj.defaultSelectArr[this.pObj.clickIdx][0]='True';
			this.pObj.drawThumb();
		}
		
		var getText = document.getElementById('text');
		if(getText && this.newCheck!=1)
		{
			var index = getText.name;
			this.objInfo2[this.pObj.clickIdx][index].textVal = getText.value;
			getText.parentNode.removeChild(getText);
			this.reDraw(1);
			return;
		}
		
		for(var i=0;i<this.objInfo2[this.pObj.clickIdx].length;i++)
		{
			tObj = this.objInfo2[this.pObj.clickIdx][i];
			if(tObj.type=="301" && tObj.point.length>0) // && this.newCheck!=1)
			{
				if(tObj.point[0].x < point.x && point.x  < tObj.point[0].x+60 && tObj.point[0].y-10 <  point.y && point.y  < tObj.point[0].y + 15 )
				{
					//alert(tObj.textVal);
					//alert(pObj);
					text = tObj.textVal;
					txtIdx = i
					this.inText(pObj.id,i,point,text);
					
				}
			}
		}
		
		this.draw(this.clickMenu, point);
	};
	
	this.mouseMove = function (e,eX,eY) 
	{
		e.preventDefault();
		if(this.newCheck==1 && (this.clickMenu == m_undo || this.clickMenu == m_redo || this.clickMenu== m_clear || this.clickMenu== m_openfile || this.clickMenu== m_save || this.clickMenu== m_server || this.clickMenu== m_camera))
			return; 
		var point = {x:eX, y:eY};
		/*
		for(var i=0;i<this.objInfo2[this.pObj.clickIdx].length;i++)
		{
			tObj = this.objInfo2[this.pObj.clickIdx][i];
			if(tObj.type=="301" && tObj.point.length>0) // && this.newCheck!=1)
			{
				var muntiLine = tObj.textVal.split("\n");
				if(tObj.point[0].x < point.x && point.x  < tObj.point[0].x+60 && tObj.point[0].y-10 <  point.y && point.y  < tObj.point[0].y + 15 )
				{
					text = tObj.textVal;
					txtIdx = i
					tObj.moveColor = "red";
					break;
				}
				else
					tObj.moveColor = null;
					
				
				//this.drawText(null,i);
					
				/*
				else
				{
					this.ctx[3].beginPath();
					for(var i = 0;i<muntiLine.length;i++)
						this.ctx[3].fillText(muntiLine[i],tObj.point[0].x, tObj.point[0].y+(20*i));
					this.ctx[3].strokeStyle=tObj.strokeStyle;
					this.ctx[3].stroke();
					this.ctx[3].closePath();
					//this.drawAllImage();
					this.drawImg.src = this.imgCan[3].toDataURL();
					this.pObj.refreshImage(this.drawImg);
					this.ctx[3].clearRect(0,0,tObj.sWidth,tObj.sHeight);
				}*/
				
		//	}
		//}*/
		
		this.draw(this.clickMenu, point);
	};
	
	this.mouseUp = function (e,eX,eY) 
	{
		e.preventDefault();
		var point = {x:eX, y:eY};
		
		this.draw(this.clickMenu, point);
	};
	
	this.reDraw = function(c,s)
	{
		if(!c && !s)
		{
			if(this.doIdx<-1)
			{
				alert("더이상 뒤로 갈 수 없습니다.");
				this.doIdx=0;
			}
			if(this.doIdx > this.objInfo2[this.pObj.clickIdx].length)
			{	
				alert("더이상 앞으로 갈 수 없습니다.");
				this.doIdx=this.objInfo2[this.pObj.clickIdx].length;
			}
		}
		
		if(c)
			this.doIdx = this.objInfo2[this.pObj.clickIdx].length;
			
		//alert("redraw this.doIdx : "+this.doIdx);
		
		for(var i=0;i<6;i++)
		{
			if(i==1)
				continue;
				
			this.ctx[i].clearRect(0, 0, this.width, this.height);
		}
		
		var getText = document.getElementById('text');	
		if(getText)
			getText.parentNode.removeChild(getText);
		
		for(var i = 0;i<this.doIdx; i++)
		{
			var obj = this.objInfo2[this.pObj.clickIdx][i];
			var clickMenu = obj.type;
			if(clickMenu != m_hightlighter)
			{
				this.ctx[obj.canType].globalAlpha = 1;
			}
			else
			{
				this.ctx[obj.canType].globalAlpha = 0.2;
			}
			
			if(clickMenu==m_angle || clickMenu==m_measure || clickMenu==m_arrow)
			{
				this.ctx[obj.canType].lineWidth = 1;
				this.ctx[obj.canType].lineShape = 0;
			}
			
			switch(clickMenu)
			{
				case m_pen :
				{
					this.drawPen(null,i,clickMenu);
					break;	
				}	
				case m_hightlighter :
				{
					this.drawPen(null,i,clickMenu);
					break;	
				}
				
				case m_eraser :
				{
					this.eraser(null,i);
					break;
				}
				case m_conectedline :
				{
					this.drawConLine(null,i);
					break;
				}
				case m_rect :
				case m_fillrect :
				case m_oval :
				case m_filloval :
				{
					this.drawRect(null,i);
					break;	
				}
				case m_arrow :
				{
					this.drawArrow(null,i);
					break;	
				}
				case m_spray :
				{
					this.drawSpray(null,i);
					break;	
				}
				case m_line :
				{
					this.drawLine(null,i);
					break;	
				}
				case m_angle :
				{
					this.drawAngle(null,i);
					break;	
				}
				case m_measure :
				{
					this.drawMeasure(null,i);
					break;	
				}
				case m_magnify :
				{
					this.drawZoom(null,i);
					break;	
				}
				case m_text:
				{
					this.drawText(null,i);
					break;	
				}
				case  m_stamp1:
				case  m_stamp2:
				case  m_stamp3:
				{
					this.drawStamp(null,i);
					break;	
				}
			}
		}
		this.drawAllImage();
	}
	
	this.inText = function(id,nIdx,point,text)
	{
		var tempPaintObj = document.getElementById(id);
		
		var t = document.createElement('textarea');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		if(nIdx==null)
		{
			t.id='text'; //+(this.objIdx2+1);
			t.style.left=nowPosition[0]+5+"px";
			t.style.top=nowPosition[1]+45+"px";
		}
		else
		{
			t.id='text'; //+nIdx;
			t.name=nIdx;
			t.value=text;
			t.style.left=nowPosition[0]+point.x+5+"px";
			t.style.top=nowPosition[1]+point.y+45+"px";
		}
		
		
		
		t.style.position='absolute';
		t.style.width='200px';
		t.style.height='100px';
		t.style.display='block';
		document.body.appendChild(t);
		
	}
	
	this.inFontSize = function(id)
	{
		var tempPaintObj = document.getElementById(id);
		
		var tempSel = document.createElement('select');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		tempSel.id=id+"_fontsize";
		tempSel.style.left=nowPosition[0]+106+"px";
		var h = this.height+this.pObj.thumbHeight+7;
		tempSel.style.top=nowPosition[1]+h+"px";
		tempSel.style.cursor="hand";
		
		
		//Font Size
		var tempOption;
		for(var i=0; i<this.pObj.fontSize.length; i++) {
			tempOption = document.createElement('option');
			tempOption.id=this.pObj.fontSize[i];
			tempOption.text=this.pObj.fontSize[i];
			tempOption.onclick=function(){selectData(tempSel,this);};
			if(i == this.pObj.defFontSizeIdx)
				tempOption.selected=true;
			else
				tempOption.selected=false;
			tempSel.appendChild(tempOption);
		}
				
		tempSel.style.position='absolute';
		tempSel.style.width='120px';
		tempSel.style.height='25px';
		tempSel.style.display='block';
		document.body.appendChild(tempSel);
		
	}
	
	this.inFontName = function(id)
	{
		var tempPaintObj = document.getElementById(id);
		
		var tempSel = document.createElement('select');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		tempSel.id=id+"_fontname";
		tempSel.style.left=nowPosition[0]+106+"px";
		var h = this.height+this.pObj.thumbHeight+33;
		tempSel.style.top=nowPosition[1]+h+"px";
		tempSel.style.cursor="hand";
		
		
		//Font Name
		var tempOption;
		for(var i=0; i<this.pObj.fontName.length; i++) {
			tempOption = document.createElement('option');
			tempOption.id=this.pObj.fontName[i];
			tempOption.text=this.pObj.fontName[i];
			tempOption.onclick=function(){selectData(tempSel,this);};
			if(i == this.pObj.defFontNameIdx)
				tempOption.selected=true;
			else
				tempOption.selected=false;
			tempSel.appendChild(tempOption);
		}
		
		
		tempSel.style.position='absolute';
		tempSel.style.width='120px';
		tempSel.style.height='25px';
		tempSel.style.display='block';
		document.body.appendChild(tempSel);
		
	}
	
	this.inFontColor = function(id,type)
	{
		var tempPaintObj = document.getElementById(id);
		if(tempPaintObj.width<400 && type!=1)
			return;
		
		var tempDiv = document.createElement('table');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		if(type==1)
		{
			tempDiv.id=id+"_drawcolor";
			tempDiv.style.left=nowPosition[0]+135+157+"px";
		}
		else
		{
			tempDiv.id=id+"_fontcolor";
			tempDiv.style.left=nowPosition[0]+350+"px";
		}
		var h = this.height+this.pObj.thumbHeight+7;
		tempDiv.style.top=nowPosition[1]+h+"px";
		tempDiv.style.align="left";
		
		
		//Font Color
		var tempTr;
		var tempTd;
		for(var i=0; i<this.pObj.dColor.length; i++) {
			tempTr = document.createElement('tr');
			for(var j=0; j<this.pObj.dColor[i].length; j++) {
				tempTd = document.createElement('td');
				tempTd.style.padding='0';
				tempTd.style.border='0';
				tempTd.style.margin='0';
				tempTd.innerHTML ="<span style='width:10px; height:10x;cursor:hand;font-size:10px; background-color:"+this.pObj.dColor[i][j]+"' id='"+this.pObj.dColor[i][j]+"' onclick='selectData("+tempDiv.id+",this)' >&nbsp;&nbsp;</span>";
				tempTr.appendChild(tempTd);
			}
			tempDiv.appendChild(tempTr);
		}
		
		tempDiv.style.position='absolute';
		tempDiv.style.width='45px';
		tempDiv.style.height='25px';
		tempDiv.style.display='block';
		document.body.appendChild(tempDiv);
		
	}
	
	this.inLineShape = function(id,type)
	{
		var tempPaintObj = document.getElementById(id);
		
		var tempDiv = document.createElement('table');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		tempDiv.id=id+"_lineShape";
		tempDiv.style.left=nowPosition[0]+185+155+"px";
		
		var h = this.height+this.pObj.thumbHeight+5;
		tempDiv.style.top=nowPosition[1]+h+"px";
		tempDiv.style.align="left";
		
		
		//LineShape
		var tempTr;
		var tempTd;
		for(var i=0; i<4; i++) {
			tempTr = document.createElement('tr');
			tempTd = document.createElement('td');
			tempTd.style.padding='0';
			tempTd.style.border='0';
			tempTd.style.margin='0';
			tempTd.innerHTML="<span style='width:48px; height:10px;cursor:hand;' id='"+i+"' onclick='selectData("+tempDiv.id+",this)' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
			tempTr.appendChild(tempTd);
			tempDiv.appendChild(tempTr);
		}
		
		tempDiv.style.position='absolute';
		tempDiv.style.width='45px';
		tempDiv.style.height='55px';
		tempDiv.style.display='block';
		document.body.appendChild(tempDiv);
	}
		
	this.inLineThick = function(id,type)
	{
		var tempPaintObj = document.getElementById(id);
		
		var tempDiv = document.createElement('table');
		var nowPosition = GetObjectRect(tempPaintObj);
		
		tempDiv.id=id+"_lineThick";
		tempDiv.style.left=nowPosition[0]+240+155+"px";
		
		var h = this.height+this.pObj.thumbHeight+5;
		tempDiv.style.top=nowPosition[1]+h+"px";
		tempDiv.style.align="left";
		
		//LineThick
		var tempTr;
		var tempTd;
		for(var i=1; i<8; i+=2) {
			tempTr = document.createElement('tr');
			tempTd = document.createElement('td');
			tempTd.style.padding='0';
			tempTd.style.border='0';
			tempTd.style.margin='0';	
			tempTd.innerHTML="<span style='width:48px; height:10.5px;cursor:hand;' id='"+i+"' onclick='selectData("+tempDiv.id+",this)' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
			tempTr.appendChild(tempTd);
			tempDiv.appendChild(tempTr);
		}
		
		tempDiv.style.position='absolute';
		tempDiv.style.width='45px';
		tempDiv.style.height='55px';
		tempDiv.style.display='block';
		document.body.appendChild(tempDiv);
	}
	
	this.outTextAttr = function(id)
	{
		var getText = document.getElementById(id+'_fontsize');	
		if(getText)
			getText.parentNode.removeChild(getText);
			
		getText = document.getElementById(id+'_fontname');	
		if(getText)
			getText.parentNode.removeChild(getText);
			
		getText = document.getElementById(id+'_fontcolor');	
		if(getText)
			getText.parentNode.removeChild(getText);
			
		getText = document.getElementById(id+'_drawcolor');	
		if(getText)
			getText.parentNode.removeChild(getText);
	}
	
	this.draw = function(clickMenu, point)
	{
		//alert("draw : "+point.x);
		if(this.canType == -1)
			return;
			
		if(clickMenu==m_angle || clickMenu==m_measure || clickMenu==m_arrow)
		{
			this.ctx[this.canType].lineWidth = 1;
			this.ctx[this.canType].lineShape = 0;
		}	
		
		this.ctx[this.canType].strokeStyle=this.pObj.strokeStyle;
		this.ctx[this.canType].fillStyle=this.pObj.fillStyle;
		
		this.ctx[this.canType].lineWidth = this.pObj.lineWidth;
		this.ctx[this.canType].lineShape = this.pObj.lineShape;
		
		if(clickMenu != m_hightlighter)
		{
			//this.ctx[this.canType].lineWidth = 1;
			this.ctx[this.canType].globalAlpha = 1;
		}
		else
		{
			//this.ctx[this.canType].lineWidth = 10;
			this.ctx[this.canType].globalAlpha = 0.2;
		}
		
		for(var i=3;i<6;i++)
		{
			this.ctx[i].strokeStyle=this.pObj.strokeStyle;
			this.ctx[i].fillStyle=this.pObj.fillStyle;
			this.ctx[i].lineWidth=this.pObj.lineWidth;
			this.ctx[i].lineShape=this.pObj.lineShape;
		}
		

		switch(clickMenu)
		{
			case m_pen :
			{
				this.drawPen(point,null,clickMenu);
				break;	
			}	
			case m_hightlighter :
			{
//				this.ctx[this.canType].globalAlpha=0.2;
//				this.ctx[this.canType].opacity=0.2; //#################투명도 수정해야됨
				this.drawPen(point,null,clickMenu);
				//this.ctx[this.canType].lineWidth = this.pObj.lineWidth;
				break;	
			}
			
			case m_eraser :
			{
				this.eraser(point);
				break;
			}
			case m_conectedline :
			{
				this.drawConLine(point);
				break;
			}
			case m_rect :
			case m_fillrect :
			case m_oval :
			case m_filloval :
			{
				this.drawRect(point);
				break;	
			}
			case m_arrow :
			{
				this.drawArrow(point);
				break;	
			}
			case m_spray :
			{
				this.drawSpray(point);
				break;	
			}
			case m_line :
			{
				this.drawLine(point);
				break;	
			}
			case m_angle :
			{
				this.drawAngle(point);
				break;	
			}
			case m_measure :
			{
				this.drawMeasure(point);
				break;	
			}
			case m_magnify :
			{
				this.drawZoom(point);
				break;	
			}
			case m_text:
			case m_fontitalic:
			case m_fontbold:
			{
				this.drawText(point);
				break;	
			}
			case  m_stamp1:
			case  m_stamp2:
			case  m_stamp3:
			{
				this.drawStamp(point);
				break;	
			}
		}
	}
	
	this.drawStamp = function(point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			var stampIdx = this.objInfo2[this.pObj.clickIdx][idx].type-401;
			this.ctx[this.canType].drawImage(this.stampImg[stampIdx], point[0].x-20, point[0].y-20, 40, 40); //통합 이미지 사용 X (붙여야함)
		}
		else
		{
				if(this.mDownCheck==1 && this.newCheck==1)
				{
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					var stampIdx = this.clickMenu-401;
					this.ctx[this.canType].drawImage(this.stampImg[stampIdx], point.x-20, point.y-20, 40, 40); //통합 이미지 사용 X (붙여야함)
					this.newCheck=3;
				}
				if(this.mUpCheck==1 && this.newCheck==3)
					this.drawAllImage();
			}
	};
	
	this.drawPen = function(point, idx, clickMenu)
	{
		if(idx!=null)
		{
			/*
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			this.pObj.ctx.beginPath();
			
			this.pObj.ctx.strokeStyle=objInfo.strokeStyle;
			var thick;
			if(clickMenu == m_pen)
			{
				thick = 1;
				this.pObj.ctx.globalAlpha=1;
			}
			else
			{
				thick = 10;
				this.pObj.ctx.globalAlpha=0.2;
			}
			//alert("drawpen : "+objInfo.lineWidth);
			this.pObj.ctx.lineWidth=objInfo.lineWidth;
			//==========this.ctx[objInfo.canType].lineWidth=thick;
			this.pObj.ctx.lineJoin='round';
			this.pObj.ctx.lineCap='round';
			for(var i=1; i<pointLen; i++)
			{
				this.pObj.ctx.moveTo(point[i-1].x+1, point[i-1].y+41);
				this.pObj.ctx.lineTo(point[i].x+1, point[i].y+41);
			}
			this.pObj.ctx.stroke();
			this.pObj.ctx.closePath();
			*/
			
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			this.ctx[objInfo.canType].beginPath();
			
			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
			
			if(clickMenu == m_pen)
			{
				this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
				this.ctx[objInfo.canType].globalAlpha=1;
			}
			else
			{
				this.ctx[objInfo.canType].lineWidth=7+parseInt(objInfo.lineWidth);
				this.ctx[objInfo.canType].globalAlpha=0.2;
			}
			//alert("drawpen : "+objInfo.lineWidth);
			
			//this.ctx[objInfo.canType].lineWidth=thick;
			//==========this.ctx[objInfo.canType].lineWidth=thick;
			this.ctx[objInfo.canType].lineJoin='round';
			this.ctx[objInfo.canType].lineCap='round';
			if(browserVerCheck==0)
			{
				for(var i=1; i<pointLen; i++)
					this.dashedLine(point[i-1].x, point[i-1].y,point[i].x, point[i].y, objInfo.lineShape,this.ctx[objInfo.canType]);
			}
			else
			{
				this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
				for(var i=1; i<pointLen; i++)
				{
					this.ctx[objInfo.canType].moveTo(point[i-1].x, point[i-1].y);
					this.ctx[objInfo.canType].lineTo(point[i].x, point[i].y);
				}
			}
			this.ctx[objInfo.canType].stroke();
			this.ctx[objInfo.canType].closePath();
			
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineShape=this.pObj.lineShape;
				this.ctx[this.canType].beginPath();
				/*var thick;
				if(clickMenu == m_pen)
				{
					//thick = 1;
					//this.ctx[this.canType].lineWidth = this.pObj.lineWidth;
					//this.ctx[this.canType].globalAlpha=1;
					//this.objInfo2[this.pObj.clickIdx][this.objIdx2].globalAlpha=1;
					//this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineWidth=thick;
					
				}
				else{
					//thick = 10;
					//this.ctx[this.canType].lineWidth = 3+this.pObj.lineWidth;
					//this.ctx[this.canType].globalAlpha=0.2;
					//this.ctx[this.canType].opacity=0.2;
					//this.objInfo2[this.pObj.clickIdx][this.objIdx2].globalAlpha=0.2;
					//this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineWidth=thick;
					
				}*/
				
				//				this.ctx[this.canType].opacity=0.2; //#################투명도 수정해야됨
				//this.ctx[this.canType].strokeStyle="rgba(255,0,0,0.3)";
				
				
				//this.ctx[this.canType].moveTo(point.x, point.y);
				this.newCheck=6;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==6)
			{
				//alert("down & move ");
				var objInfo = this.objInfo2[this.pObj.clickIdx][this.objIdx2];
				var len = objInfo.point.length;
				objInfo.point[len]=point;
				var tempPoint = objInfo.point[len-1];
				if(clickMenu == m_pen)
				{
					if(this.pObj.dashStyle == "" || this.pObj.dashStyle == 215)
						this.ctx[this.canType].lineWidth = this.pObj.lineWidth;
					else
					{
						switch(this.pObj.dashStyle)
						{
							case 216:
								this.ctx[this.canType].lineWidth = 2;
							break;
							case 217:
								this.ctx[this.canType].lineWidth = 3;
							break;
							case 218:
								this.ctx[this.canType].lineWidth = 4;
							break;
						}
					}
					this.ctx[this.canType].globalAlpha=1;
				}
				else{
					this.ctx[this.canType].lineWidth = 7+parseInt(this.pObj.lineWidth);
					this.ctx[this.canType].globalAlpha=0.2;
				}
				//this.ctx[this.canType].strokeStyle="rgba(255,0,0,0.3)";
				this.ctx[this.canType].lineJoin='round';
				this.ctx[this.canType].lineCap='round';
				
				if(browserVerCheck==0)
				{
					switch(this.pObj.dashStyle)
					{
						case 212:
							this.pObj.lineShape = 2;
						break; 
						case 213:
							this.pObj.lineShape = 3;
						break;
						case 214:
							this.pObj.lineShape = 4;
						break;
					}
					this.dashedLine(tempPoint.x, tempPoint.y,point.x, point.y, this.pObj.lineShape,this.ctx[this.canType]);	
				}
				else
				{
					
					if(this.pObj.lineShape==1)
						this.ctx[this.canType].setLineDash([5, 10]);
					else if(this.pObj.lineShape==2)
						this.ctx[this.canType].setLineDash([5, 15]);
					else if(this.pObj.lineShape==3)
						this.ctx[this.canType].setLineDash([5, 20]);
					else
					this.ctx[this.canType].setLineDash([this.pObj.lineShape*2]);
					this.ctx[this.canType].moveTo(tempPoint.x, tempPoint.y);
					this.ctx[this.canType].lineTo( point.x, point.y );
					this.ctx[this.canType].bezierCurveTo(point.x,point.y,point.x,point.y,point.x,point.y);
				}
				this.ctx[this.canType].stroke();
				//alert("alldraw 전 ");
				//this.drawAllImage();
				if(clickMenu == m_pen)
				{
					this.drawAllImage();
					//this.drawImg.src = this.imgCan[this.canType].toDataURL();
					//this.pObj.refreshImage(this.imgCan[this.canType]);
				}
				else
				{
				this.pObj.ctx.beginPath();
				this.pObj.ctx.lineWidth = 7+parseInt(this.pObj.lineWidth);
				this.pObj.ctx.globalAlpha = 0.2;

				this.pObj.ctx.strokeStyle=this.ctx[this.canType].strokeStyle;
				this.pObj.ctx.moveTo(tempPoint.x+1, tempPoint.y+41);
				this.pObj.ctx.lineTo( point.x+1, point.y+41 );
				this.pObj.ctx.stroke();
				}
			}
			if(this.mUpCheck==1 && this.newCheck==6)
			{
				//alert("up");
				if(clickMenu != m_pen)
				{
				this.ctx[this.canType].closePath();
				this.pObj.ctx.closePath();
				this.pObj.ctx.lineWidth = 1; 
				this.pObj.ctx.lineShape = 0;
				this.pObj.ctx.globalAlpha = 1;
				this.pObj.ctx.strokeStyle="black";
				this.reDraw(1);
				}
				this.newCheck=7;
				//this.drawAllImage();
			}
			
		}
	};
	
	this.drawRect = function(point, idx)
	{
		if(idx!=null)
		{/*
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			var px0 = point[0].x+1;
			var px1 = point[1].x+1;
			var py0 = point[0].y+41;
			var py1 = point[1].y+41;
			
			this.pObj.ctx.beginPath();
			this.pObj.ctx.lineWidth=objInfo.lineWidth;
			
			if(objInfo.type==m_rect)
			{
				this.pObj.ctx.strokeStyle=objInfo.strokeStyle;
				this.pObj.ctx.strokeRect(px0, py0, px1-px0, py1-py0);
			}
			else if(objInfo.type==m_fillrect)
			{
				this.pObj.ctx.fillStyle=objInfo.fillStyle;
				this.pObj.ctx.fillRect(px0, py0, px1-px0, py1-py0);
			}
			else if(objInfo.type==m_oval || objInfo.type==m_filloval)
			{
				var centerX = (px1+px0)/2;
				var centerY = (py1+py0)/2;
				
				var w = px1-centerX;
				var h = py1-centerY;
				
				this.pObj.ctx.moveTo(centerX, centerY-h);
				this.pObj.ctx.bezierCurveTo(centerX+w, centerY-h, centerX+w, centerY+h, centerX, centerY+h);	
				this.pObj.ctx.bezierCurveTo(centerX-w, centerY+h, centerX-w, centerY-h, centerX, centerY-h);	
			}
			
			if(objInfo.type==m_filloval || objInfo.type==m_fillrect)
			{
				this.pObj.ctx.fillStyle=objInfo.fillStyle;
				this.pObj.ctx.fill();
			}
			else
			{
				this.pObj.ctx.strokeStyle=objInfo.strokeStyle;
				this.pObj.ctx.stroke();
			}*/
			
			
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			this.ctx[objInfo.canType].beginPath();
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			
			if(objInfo.type==m_rect)
			{
				if(browserVerCheck==0)
				{
					this.dashedLine(point[0].x, point[0].y, point[1].x, point[0].y, objInfo.lineShape,this.ctx[objInfo.canType]);
					this.dashedLine(point[1].x, point[0].y, point[1].x, point[1].y, objInfo.lineShape,this.ctx[objInfo.canType]);
					this.dashedLine(point[1].x, point[1].y, point[0].x, point[1].y, objInfo.lineShape,this.ctx[objInfo.canType]);
					this.dashedLine(point[0].x, point[1].y, point[0].x, point[0].y, objInfo.lineShape,this.ctx[objInfo.canType]);
				}
				else
				{
					this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
					this.ctx[objInfo.canType].strokeRect(point[0].x, point[0].y, point[1].x-point[0].x, point[1].y-point[0].y);
				}
			}
			else if(objInfo.type==m_fillrect)
			{
				//this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
				this.ctx[objInfo.canType].fillRect(point[0].x, point[0].y, point[1].x-point[0].x, point[1].y-point[0].y);
			}
			else if(objInfo.type==m_oval || objInfo.type==m_filloval)
			{
				/*var centerX = (point[1].x+point[0].x)/2;
				var centerY = (point[1].y+point[0].y)/2;
				
				var w = point[1].x-centerX;
				var h = point[1].y-centerY;
				if(browserVerCheck!=1)
					this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
				//this.ctx[objInfo.canType].moveTo(centerX, centerY-h);
				//this.ctx[objInfo.canType].bezierCurveTo(centerX+w, centerY-h, centerX+w, centerY+h, centerX, centerY+h);	
				//this.ctx[objInfo.canType].bezierCurveTo(centerX-w, centerY+h, centerX-w, centerY-h, centerX, centerY-h);
							
				this.ctx[objInfo.canType].translate(this.width,this.height);
				this.ctx[objInfo.canType].scale(2,1);
				this.ctx[objInfo.canType].arc(point[0].x, point[0].y,10,0,Math.PI*2);*/
				
				var centerX = (point[1].x+point[0].x)/2;
				var centerY = (point[1].y+point[0].y)/2;
				var w;
				if(point[1].x>point[0].x)
					w = point[1].x-point[0].x;
				else
					w = point[0].x-point[1].x;
					
				var h;
				if(point[1].y>point[0].y)
					h = point[1].y-point[0].y;
				else
					h = point[0].y-point[1].y;

				var r;
				var scaleX,scaleY;
				if(w>h)
				{
					r = w/2;
					scaleX = w/w;
					scaleY = h/w;
				}
				else
				{
					r = h/2;
					scaleX = w/h;
					scaleY = h/h;
				}
				scaleX = scaleX.toFixed(1);
				scaleY = scaleY.toFixed(1);
				
				if(scaleX>0)
				{
					scaleX = scaleX;
				}
				else
				{
					scaleX=0.1;
				}
				
				if(scaleY>0)
				{
					scaleY = scaleY;
				}
				else
				{
					scaleY=0.1;
				}
				this.ctx[objInfo.canType].save();
				
				if(w>=h)
					this.ctx[objInfo.canType].scale(scaleX,scaleY);
				else
					this.ctx[objInfo.canType].scale(scaleX,scaleY);
				
				this.dottedCircle(centerX/scaleX, centerY/scaleY,r,objInfo.lineShape,this.ctx[objInfo.canType]);
				this.ctx[objInfo.canType].restore();
				
			}
			
			
			if(objInfo.type==m_filloval || objInfo.type==m_fillrect)
			{
				this.ctx[objInfo.canType].fillStyle=objInfo.fillStyle;
				this.ctx[objInfo.canType].fill();
			}
			else
			{
				this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
				this.ctx[objInfo.canType].stroke();
			}
			this.ctx[objInfo.canType].closePath();
		
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				this.newCheck=2;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1  && this.newCheck==2)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				
				if(this.clickMenu==m_rect)
				{
					if(browserVerCheck==0)
					{
						this.dashedLine(sPoint.x, sPoint.y, point.x, sPoint.y, this.pObj.lineShape,this.ctx[3]);
						this.dashedLine(point.x, sPoint.y, point.x, point.y, this.pObj.lineShape,this.ctx[3]);
						this.dashedLine(point.x, point.y, sPoint.x, point.y, this.pObj.lineShape,this.ctx[3]);
						this.dashedLine(sPoint.x, point.y, sPoint.x, sPoint.y, this.pObj.lineShape,this.ctx[3]);
					}
					else
					{
						this.ctx[3].setLineDash([this.pObj.lineShape*2]);
						this.ctx[3].strokeRect(sPoint.x, sPoint.y, point.x-sPoint.x, point.y-sPoint.y);
					}
				}
				else if(this.clickMenu==m_fillrect)
				{
					//this.ctx[3].setLineDash([this.pObj.lineShape*2]);
					this.ctx[3].fillRect(sPoint.x, sPoint.y, point.x-sPoint.x, point.y-sPoint.y);
				}
				else if(this.clickMenu==m_oval || this.clickMenu==m_filloval)
				{
					var centerX = (point.x+sPoint.x)/2;
					var centerY = (point.y+sPoint.y)/2;
					var w;
					if(point.x>sPoint.x)
						w = point.x-sPoint.x;
					else
						w = sPoint.x-point.x;
						
					var h;
					if(point.y>sPoint.y)
						h = point.y-sPoint.y;
					else
						h = sPoint.y-point.y;

					var r;
					var scaleX,scaleY;
					if(w>h)
					{
						r = w/2;
						scaleX = w/w;
						scaleY = h/w;
					}
					else
					{
						r = h/2;
						scaleX = w/h;
						scaleY = h/h;
					}
					scaleX = scaleX.toFixed(1);
					scaleY = scaleY.toFixed(1);
					
					if(scaleX>0)
					{
						scaleX = scaleX;
					}
					else
					{
						scaleX=0.1;
					}
					
					if(scaleY>0)
					{
						scaleY = scaleY;
					}
					else
					{
						scaleY=0.1;
					}
					this.ctx[3].save();
					
					if(w>=h)
						this.ctx[3].scale(scaleX,scaleY);
					else
						this.ctx[3].scale(scaleX,scaleY);
					//if(browserVerCheck==1)
					{
						this.dottedCircle(centerX/scaleX, centerY/scaleY,r,this.pObj.lineShape,this.ctx[3]);
					}
					/*else
					{
						this.ctx[3].setLineDash([this.pObj.lineShape*2]);
						this.ctx[3].arc(centerX/scaleX, centerY/scaleY,r,0,Math.PI*2);
					}*/
					
					this.ctx[3].restore();
				}
				
				
				if(this.clickMenu==m_fillrect || this.clickMenu==m_filloval)
				{
					this.ctx[3].fillStyle=this.objInfo2[this.pObj.clickIdx][this.objIdx2].fillStyle;
					this.ctx[3].fill();
				}
				else
				{
					this.ctx[3].strokeStyle=this.objInfo2[this.pObj.clickIdx][this.objIdx2].strokeStyle;
					this.ctx[3].stroke();
				}
				this.ctx[3].closePath();
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
				/*this.pObj.ctx.beginPath();
				this.pObj.ctx.strokeRect(sPoint.x+1, sPoint.y+41, (point.x-sPoint.x), (point.y-sPoint.y));
				this.pObj.ctx.strokeStyle=this.ctx[this.canType].strokeStyle;
				this.pObj.ctx.stroke();*/
			}
			if(this.mUpCheck==1 && this.newCheck==2)
			{
				if(this.newCheck==2)
				{
					this.newCheck=3;
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1]=point;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
				}
				/*this.ctx[this.canType].beginPath();
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				this.ctx[this.canType].strokeRect(sPoint.x, sPoint.y, point.x-sPoint.x, point.y-sPoint.y);
				this.ctx[this.canType].strokeStyle=this.ctx[this.canType].strokeStyle;
				this.ctx[this.canType].stroke();*/
				//this.drawAllImage();
			}
		}
	};

	
	this.drawConLine = function(point,idx) 
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			this.ctx[objInfo.canType].beginPath();
			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			if(browserVerCheck==0)
			{
				for(var i=1; i<pointLen; i++)
					this.dashedLine(point[i-1].x, point[i-1].y,point[i].x, point[i].y, objInfo.lineShape,this.ctx[objInfo.canType]);
			}
			else
			{
				this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
				for(var i=1; i<pointLen; i++)
				{
					this.ctx[objInfo.canType].moveTo(point[i-1].x, point[i-1].y);
					this.ctx[objInfo.canType].lineTo(point[i].x, point[i].y);
				}
			}
			this.ctx[objInfo.canType].stroke();
			this.ctx[objInfo.canType].closePath();
		}
		else
		{
			if(this.mDownCheck==1 && this.mMoveCheck==0)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				if(this.newCheck==1)
				{
					this.newCheck=3;
					len = 0;
				}
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].strokeStyle=this.pObj.strokeStyle;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].fillStyle=this.  pObj.fillStyle;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineShape=this.pObj.lineShape;
				
				if(this.newCheck==1)
					this.newCheck=3;
				else if(this.newCheck==0)
				{
					var sX = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len-1].x;
					var sY = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len-1].y;
					this.ctx[this.canType].beginPath()
					if(browserVerCheck==0)
						this.dashedLine(sX, sY,point.x, point.y, this.pObj.lineShape,this.ctx[this.canType]);
					else
					{
						this.ctx[this.canType].setLineDash([this.pObj.lineShape*2]);
						this.ctx[this.canType].moveTo(this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len-1].x, this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len-1].y);
						this.ctx[this.canType].lineTo(point.x, point.y);
					}
					this.ctx[this.canType].stroke();
					this.ctx[this.canType].closePath();
					this.drawAllImage();
					//this.ctx[this.canType].drawImage(this.drawImg, 0, 0);
				}
			}
	
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==3)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				if(browserVerCheck==0)
					this.dashedLine(sPoint.x, sPoint.y,point.x, point.y, this.pObj.lineShape,this.ctx[3]);
				else
				{
					this.ctx[3].setLineDash([this.pObj.lineShape*2]);
					this.ctx[3].moveTo(sPoint.x, sPoint.y);
					this.ctx[3].lineTo(point.x, point.y);
				}
				this.ctx[3].stroke();
				this.ctx[3].closePath();
		
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
				
			}
			
			if(this.mUpCheck==1)
			{
				if(this.newCheck==3)
				{
					this.newCheck=0;
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
				}
			}
		}
	};
	
	this.drawArrow = function (point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			
			this.ctx[objInfo.canType].beginPath();
			this.ctx[objInfo.canType].moveTo(point[0].x, point[0].y);
			this.ctx[objInfo.canType].lineTo(point[1].x, point[1].y);
			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			this.ctx[objInfo.canType].stroke();
			
			var radians=Math.atan((point[1].y-point[0].y)/(point[1].x-point[0].x));
      radians+=((point[1].x>point[0].x)?-90:90)*Math.PI/180;
			this.ctx[objInfo.canType].save();
			this.ctx[objInfo.canType].beginPath();
      this.ctx[objInfo.canType].translate(point[0].x,point[0].y);
      this.ctx[objInfo.canType].rotate(radians);
    	this.ctx[objInfo.canType].moveTo(0,0);
    	this.ctx[objInfo.canType].lineTo(5,20);
      this.ctx[objInfo.canType].lineTo(-5,20);
      this.ctx[objInfo.canType].closePath();
      this.ctx[objInfo.canType].restore();
      this.ctx[objInfo.canType].fillStyle=objInfo.fillStyle;
      this.ctx[objInfo.canType].fill();
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				if(this.newCheck==1)
					this.newCheck=3;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==3)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				this.ctx[3].moveTo(sPoint.x, sPoint.y);
				this.ctx[3].lineTo(point.x, point.y);
				this.ctx[3].stroke();
				
				var radians=Math.atan((point.y-sPoint.y)/(point.x-sPoint.x));
	      radians+=((point.x>sPoint.x)?-90:90)*Math.PI/180;
				this.ctx[3].save();
				this.ctx[3].beginPath();
	      this.ctx[3].translate(sPoint.x,sPoint.y);
	      this.ctx[3].rotate(radians);
	    	this.ctx[3].moveTo(0,0);
	    	this.ctx[3].lineTo(5,20);
	      this.ctx[3].lineTo(-5,20);
	      this.ctx[3].closePath();
	      this.ctx[3].restore();
	      this.ctx[3].fill();
				
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
			}
			if(this.mUpCheck==1)
			{
				if(this.newCheck==3)
				{
				
					this.newCheck=0;
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
				}
			}
		}
	};
	
	this.eraser = function(point,idx)
	{
		if(idx!=null)
		{
			/*
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			
			for(var i=0; i<pointLen; i++)
			{
				//this.ctx[objInfo.canType].setTransform(1,0,0,1,0,0);
				//this.ctx[objInfo.canType].clearRect(point[i].x-9, point[i].y+31, 25, 25);
				//this.pObj.ctx.setTransform(1,0,0,1,0,0);
				this.pObj.ctx.clearRect(point[i].x-9, point[i].y+31, 25, 25);
			}*/
			
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			
			for(var i=0; i<pointLen; i++)
			{
				this.ctx[objInfo.canType].clearRect(point[i].x-10, point[i].y-10, 25, 25);
			}
		}
		else
		{
			if(this.mDownCheck==1)
			{
				if(this.newCheck==1)
					this.newCheck=2;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==2)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				this.ctx[0].setTransform(1,0,0,1,0,0);
				this.ctx[0].clearRect(point.x-10, point.y-10, 25, 25);
				/*this.ctx[0].beginPath();
				this.ctx[0].fillStyle='white';
				this.ctx[0].fill();
				this.ctx[0].fillRect(point.x-9, point.y+31, 25, 25);
				this.ctx[0].closePath();*/
				this.drawAllImage();
			}
			
			if(this.mUpCheck==1)
			{
					if(this.newCheck==2)
						this.newCheck=3;
			}
			//this.drawAllImage();
		}
	}
	
	this.getMainPoint = function(e)
	{
		var x = e.offsetX;
		var y = e.offsetY;	
		return {x:x, y:y};
	};
	
	this.createObj = function (clickMenu, canType, e)
	{
		//if(clickMenu== m_stamp1  || clickMenu== m_stamp2  || clickMenu== m_stamp3  || clickMenu == m_text  || clickMenu== m_magnify  || clickMenu== m_line || clickMenu== m_spray || clickMenu== m_eraser || clickMenu== m_rect || clickMenu== m_oval  ||  clickMenu== m_fillrect || clickMenu== m_filloval || clickMenu== m_pen || clickMenu == m_angle || clickMenu == m_conectedline || clickMenu == m_measure || clickMenu == m_arrow || clickMenu == m_hightlighter)
		{
			this.objIdx2=this.objInfo2[this.pObj.clickIdx].length;
			//alert("this.objIdx2 : "+this.objIdx2);
			this.objInfo2[this.pObj.clickIdx][this.objIdx2] = new BK_PAINT_OBJECT(this, pObj, e);
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].type=clickMenu;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].clickMenu=clickMenu;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].canType=canType;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].strokeStyle = pObj.strokeStyle;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineStyle = pObj.lineStyle;
			if(!pObj.lineWidth)
				pObj.lineWidth = 1;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineWidth = pObj.lineWidth;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].lineShape = pObj.lineShape;
			this.objInfo2[this.pObj.clickIdx][this.objIdx2].fillStyle=pObj.fillStyle;
			//alert("요기 lineWidth : "+pObj.lineWidth);
		}
	};
	
	this.drawSpray = function (point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var pointLen = objInfo.point.length;
			var point = objInfo.point;
			
			for(var j=0;j<(pointLen-1);j++)
			{
				this.ctx[objInfo.canType].beginPath();
				for(var i=0;i<objInfo.sprayArr[j].length;i++)
				{
					var ranNum1 = objInfo.sprayArr[j][i][0];
					var ranNum2 = objInfo.sprayArr[j][i][1];
					
					this.ctx[objInfo.canType].arc(point[j].x+ranNum1, point[j].y+ranNum2, 1, 0, 2*Math.PI, true);
					this.ctx[objInfo.canType].closePath();
					this.ctx[objInfo.canType].fillStyle=objInfo.fillStyle;
					this.ctx[objInfo.canType].fill();
				}
			}
			
		}
		else
		{
			if(this.mDownCheck==1)
			{
				if(this.newCheck==1)
					this.newCheck=2;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==2)
			{
				var objInfo = this.objInfo2[this.pObj.clickIdx][this.objIdx2];
				var len = objInfo.point.length;
				objInfo.point[len]=point;
				
				objInfo.sprayArr[len] = new Array();
				
				this.ctx[this.canType].beginPath();
				for(var i=0;i<10;i++)
				{
					objInfo.sprayArr[len][i] = new Array();
					var ranNum1 = Math.floor((Math.random() * 8) + 1);
					ranNum1 *= (ranNum1%2==0)? (-1):1;
					var ranNum2 = Math.floor((Math.random() * 8) + 1);
					ranNum2 *= (ranNum2%2==0)? (-1):1;
					objInfo.sprayArr[len][i][0] = ranNum1;
					objInfo.sprayArr[len][i][1] = ranNum2;
					this.ctx[this.canType].arc(point.x+ranNum1, point.y+ranNum2, 1, 0, 2*Math.PI, true);
					this.ctx[this.canType].closePath();
					
				}
				this.ctx[this.canType].fill();
			}
			if(this.mUpCheck==1)
			{
				if(this.newCheck==2)
					this.newCheck=3;
				this.ctx[this.canType].drawImage(this.drawImg, 0, 0);
			}
			this.drawAllImage();
		}
	};
	
	this.drawLine = function (point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			
			this.ctx[objInfo.canType].beginPath();
			if(browserVerCheck==0)
				this.dashedLine(point[0].x, point[0].y,point[1].x, point[1].y, objInfo.lineShape,this.ctx[objInfo.canType]);
			else
			{
				this.ctx[objInfo.canType].setLineDash([objInfo.lineShape*2]);
				this.ctx[objInfo.canType].moveTo(point[0].x, point[0].y);
				this.ctx[objInfo.canType].lineTo(point[1].x, point[1].y);
			}
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
			this.ctx[objInfo.canType].stroke();
			this.ctx[objInfo.canType].closePath();
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				//var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0]=point;
				if(this.newCheck==1)
					this.newCheck=2;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==2)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				if(browserVerCheck==0)
					this.dashedLine(sPoint.x, sPoint.y, point.x, point.y, this.pObj.lineShape,this.ctx[3]);
				else
				{
					this.ctx[3].setLineDash([this.pObj.lineShape*2]);
					this.ctx[3].moveTo(sPoint.x, sPoint.y);
					this.ctx[3].lineTo(point.x, point.y);
				}
				this.ctx[3].stroke();
				this.ctx[3].closePath();
				
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
				
			}
			if(this.mUpCheck==1)
			{
				if(this.newCheck==2)
				{
					//this.ctx[3].closePath();
					this.newCheck=3;
					//var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1]=point;
				}
				this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
			}
		}		
	};
	
	this.drawAngle = function (point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var sPoint = objInfo.point[0];
			var cPoint = objInfo.point[1];
			var ePoint = objInfo.point[2];
			
			var x1 = sPoint.x;
			var y1 = sPoint.y;
			var x2 = cPoint.x;
			var y2 = cPoint.y;
			var x3 = ePoint.x;
			var y3 = ePoint.y;
			
			this.ctx[objInfo.canType].beginPath();
			this.ctx[objInfo.canType].moveTo(x1, y1);
			this.ctx[objInfo.canType].lineTo(x2, y2);
			this.ctx[objInfo.canType].moveTo(x2, y2);
			this.ctx[objInfo.canType].lineTo(x3, y3);
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
			this.ctx[objInfo.canType].stroke();
			
			var fx = x1 - x2;
    	var fy = y1 - y2;
    	var fx2 = x2 - x1;
    	var fy2 = y2 - y1;
    	
    	var rad = Math.atan2(fx, fy);
    	var degree1 = ((rad*180)/Math.PI);
    	var degree11 = ((rad*180)/Math.PI) - 90;
    	if(degree11 < 0)
    		degree11 += 360;
    	
    	if(rad < 0){
    		
    		rad = Math.atan2(fx2, fy2);
    		degree11 = ((rad*180)/Math.PI) + 90;
    	}
    	var lx = x3 - x2;
    	var ly = y3 - y2;
    	var lx2 = x2 - x3;
    	var ly2 = y2 - y3;
    	
    	var rad2 = Math.atan2(lx, ly);
    	var degree2 = ((rad2*180)/Math.PI);
    	var degree22 = ((rad2*180)/Math.PI) - 90;
    	
    	var lastDegree = Math.abs(degree1 - degree2);
    	if(lastDegree > 180){
    		lastDegree = Math.abs(360 - lastDegree);
    	}
    	
    	var temp1 = 0, temp2 = 0;
    	if(degree1 < 0)
    		temp1 = parseInt(degree1) + 180;
    	else if(degree1 >= 0){
    		temp1 = parseInt(degree1) - 180;
    		temp2 = -1;
    	}
    	var angleFlag = true;
    	if(temp2 == -1){
    		if((temp1 > degree2)||(degree2 > degree1))
        		angleFlag = true;
    		else
    			angleFlag = false;
    	}
    	else if((temp1 < degree2)||(degree2 < degree1))
    		angleFlag = false;
    		
    		
  		var angle2 = parseInt(lastDegree);
     	var angle1 = parseInt(degree11);
			var sAngle = 2*Math.PI - degree11*Math.PI/180;
			var eAngle = 2*Math.PI - degree22*Math.PI/180;
			
			this.ctx[objInfo.canType].beginPath();
			if(angleFlag=="true")
				this.ctx[objInfo.canType].arc(x2, y2, 15, sAngle, eAngle, angleFlag);
			else
				this.ctx[objInfo.canType].arc(x2, y2, 15, sAngle, eAngle, angleFlag);
			
			this.ctx[objInfo.canType].stroke();
			this.ctx[objInfo.canType].fillText(angle2,x2+10,y2+20);
			this.ctx[objInfo.canType].closePath();
		}
		else
		{
			if(this.mDownCheck==1  && this.mMoveCheck==0)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				if(this.newCheck==1)
					len = 0;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].strokeStyle=this.pObj.strokeStyle;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].fillStyle=this.pObj.fillStyle;
				if(this.newCheck==1)
					this.newCheck=8;
				else if(this.newCheck==9)
				{
					this.newCheck=0;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
				}
			}
	
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==8)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				this.ctx[3].moveTo(sPoint.x, sPoint.y);
				this.ctx[3].lineTo(point.x, point.y);
				this.ctx[3].stroke();
				this.ctx[3].closePath();
		
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
				
			}
			
			if(this.mDownCheck==0 && this.mMoveCheck==1 && this.newCheck==9)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				var ePoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1];
				
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				this.ctx[3].moveTo(ePoint.x, ePoint.y);
				this.ctx[3].lineTo(point.x, point.y);
				this.ctx[3].stroke();
				this.ctx[3].closePath();
				
				var fx = sPoint.x - ePoint.x;
	    	var fy = sPoint.y - ePoint.y;
	    	var fx2 = ePoint.x - sPoint.x;
	    	var fy2 = ePoint.y - sPoint.y;
	    	
	    	var rad = Math.atan2(fx, fy);
	    	var degree1 = ((rad*180)/Math.PI);
	    	var degree11 = ((rad*180)/Math.PI) - 90;
	    	if(degree11 < 0)
	    		degree11 += 360;
	    	
	    	if(rad < 0){
	    		
	    		rad = Math.atan2(fx2, fy2);
	    		degree11 = ((rad*180)/Math.PI) + 90;
	    	}
	    	var lx = point.x - ePoint.x;
	    	var ly = point.y - ePoint.y;
	    	var lx2 = ePoint.x - point.x;
	    	var ly2 = ePoint.y - point.y;
	    	
	    	var rad2 = Math.atan2(lx, ly);
	    	var degree2 = ((rad2*180)/Math.PI);
	    	var degree22 = ((rad2*180)/Math.PI) - 90;
	    	
	    	var lastDegree = Math.abs(degree1 - degree2);
	    	if(lastDegree > 180){
	    		lastDegree = Math.abs(360 - lastDegree);
	    	}
	    	
	    	var temp1 = 0, temp2 = 0;
	    	if(degree1 < 0)
	    		temp1 = parseInt(degree1) + 180;
	    	else if(degree1 >= 0){
	    		temp1 = parseInt(degree1) - 180;
	    		temp2 = -1;
	    	}
	    	var angleFlag = true;
	    	if(temp2 == -1){
	    		if((temp1 > degree2)||(degree2 > degree1))
	        		angleFlag = true;
	    		else
	    			angleFlag = false;
	    	}
	    	else if((temp1 < degree2)||(degree2 < degree1))
	    		angleFlag = false;
	    		
	    		
	  		var angle2 = parseInt(lastDegree);
	     	var angle1 = parseInt(degree11);
				var sAngle = 2*Math.PI - degree11*Math.PI/180;
				var eAngle = 2*Math.PI - degree22*Math.PI/180;
				
				this.ctx[3].beginPath();
				if(angleFlag=="true")
					this.ctx[3].arc(ePoint.x, ePoint.y, 15, sAngle, eAngle, angleFlag);
				else
					this.ctx[3].arc(ePoint.x, ePoint.y, 15, sAngle, eAngle, angleFlag);
				
				this.ctx[3].stroke();
				this.ctx[3].fillText(angle2,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].x+10,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].y+20);
				//this.ctx[3].fillText("rad : "+rad,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].x,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].y+50);
				//this.ctx[3].fillText("rad2 : "+rad2,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].x,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].y+70);
				//this.ctx[3].fillText("sAngle : "+sAngle+" / eAngle : "+eAngle,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].x,this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1].y+50);
				this.ctx[3].closePath();
				
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
			}
			
			if(this.mUpCheck==1)
			{
				if(this.newCheck==8)
				{
					this.newCheck=9;
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
				}
			}
		}		
	};
	
	this.drawMeasure = function(point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var sPoint = objInfo.point[0];
			var ePoint = objInfo.point[1];
			
				var x1 = sPoint.x;
				var y1 = sPoint.y;
				var x2 = ePoint.x;
				var y2 = ePoint.y;
				
				var w = Math.abs(x2 - x1);						//x축의 거리를 구함
	    	var term = 5;									//term : 5px마다 거리를 둘 것이므로
	    	var smallTerm = 5;  
	    	if(x2>this.width){
	    		
	    		x2 = this.width - 20;
	    	}
	    	if(y2>this.height){
	    		y2 = this.height - 20;
	    	}
	    	
	      if(x2<0){
	    		
	    		x2 = 20;
	    	}
	    	if(y2<0){
	    		y2 = 20;
	    	}
	    	var dist = this.getDistance(x1, x2, y1, y2);
	    	var totald = dist / term;					//거리상에 점이 찍힐 총 거리
	    	if(totald == 0) totald = 1;
	    	var xterm = w / totald;							//실제로 x축이 늘어날 거리
	    	var countTerm = term;
	    	var j = x1;										//늘어날 변수
	    	
	    	rad = Math.atan2(-(y2-y1), x2-x1);
	    	degree1 = ((rad*180)/Math.PI);// - 90;
	    	if(degree1 < 0)
	    		degree1 += 360;
	    	
	    	this.ctx[objInfo.canType].beginPath();
				this.ctx[objInfo.canType].moveTo(x1, y1);
				this.ctx[objInfo.canType].lineTo(x2, y2);
	       
	  		xx = this.getXfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), 10);
	  		yy = this.getYfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), 10);
	  		
	  		if(degree1 <= 0){
	      		xx = this.getXfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), -10);
	      		yy = this.getYfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), -10);
	      		
	      		if(degree1 >= -90 && y1 < yy){
	      			yy -= 20;
	      		}
	  		}
				
	  		this.ctx[objInfo.canType].moveTo(x1,y1);
	  		this.ctx[objInfo.canType].lineTo(xx,yy);   //가장자리
	  		this.ctx[objInfo.canType].lineWidth=1.5;
				this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
				this.ctx[objInfo.canType].stroke();
				
	    	for(var i=1; i<totald-1; i++){
	    		xxx = this.getXfromDist(x1, y1, x2, y2, countTerm);
	    		yyy = this.getYfromDist(x1, y1, x2, y2, countTerm);
	    		
	    		countTerm += term;
	    		if(i % 5 == 0)
	    			smallTerm = 10;
	    		else
	    			smallTerm = 5;
	
	    		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		
	    		if(degree1 <= 0.0){
	      		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), -smallTerm);
	      		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), -smallTerm);
	      		
	      		if(degree1 >= -90 && yyy < yy){
	      			if(i % 5 == 0)
	      				yy -= 20;
	          		else
	      			    yy -= 15;
	      		}
	    		}
	    	
	    		this.ctx[objInfo.canType].moveTo(xxx,yyy);   //눈금들
	  			this.ctx[objInfo.canType].lineTo(xx,yy);
	  			this.ctx[objInfo.canType].fillText(objInfo.text, ePoint.x+20, ePoint.y);
	  			this.ctx[objInfo.canType].lineWidth=1;
	  			this.ctx[objInfo.canType].strokeStyle=objInfo.strokeStyle;
	  			this.ctx[objInfo.canType].stroke();
	  			this.ctx[objInfo.canType].closePath();
	  			
	  			smallTerm = 10;
		    	
		    	xxx = this.getXfromDist(x1, y1, x2, y2, dist);
	    		yyy = this.getYfromDist(x1, y1, x2, y2, dist);
	
	    		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		
					this.ctx[objInfo.canType].beginPath();
	    		this.ctx[objInfo.canType].moveTo(xxx,yyy);   //눈금들
	  			this.ctx[objInfo.canType].lineTo(xx,yy);
	  			this.ctx[objInfo.canType].lineWidth=1.5;
	  			this.ctx[objInfo.canType].stroke();
	  			this.ctx[objInfo.canType].closePath();
	  			
	    	}
		}
		else
		{
			var sPoint;
			var x1, y1, x2, y2;
			var xx, yy, xxx, yyy;
			var degree1;
			var rad;
			
			if(this.mDownCheck==1  && this.mMoveCheck==0 && this.newCheck==1)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				
				if(this.newCheck==1)
					this.newCheck=3;
			}
	
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==3)
			{
				sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				x1 = sPoint.x;
				y1 = sPoint.y;
				x2 = point.x;
				y2 = point.y;
				
				var w = Math.abs(x2 - x1);						//x축의 거리를 구함
	    	var term = 5;									//term : 5px마다 거리를 둘 것이므로
	    	var smallTerm = 5;  
	    	if(x2>this.width){
	    		
	    		x2 = this.width - 20;
	    	}
	    	if(y2>this.height){
	    		y2 = this.height - 20;
	    	}
	    	
	      if(x2<0){
	    		
	    		x2 = 20;
	    	}
	    	if(y2<0){
	    		y2 = 20;
	    	}
	    	var dist = this.getDistance(x1, x2, y1, y2);
	    	var totald = dist / term;					//거리상에 점이 찍힐 총 거리
	    	if(totald == 0) totald = 1;
	    	var xterm = w / totald;							//실제로 x축이 늘어날 거리
	    	var countTerm = term;
	    	var j = x1;										//늘어날 변수
	    	
	    	rad = Math.atan2(-(y2-y1), x2-x1);
	    	degree1 = ((rad*180)/Math.PI);// - 90;
	    	if(degree1 < 0)
	    		degree1 += 360;
	    	
	    	this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				this.ctx[3].moveTo(x1, y1);
				this.ctx[3].lineTo(x2, y2);
	       
	  		xx = this.getXfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), 10);
	  		yy = this.getYfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), 10);
	  		
	  		if(degree1 <= 0){
	      		xx = this.getXfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), -10);
	      		yy = this.getYfromDist(x1, y1, 0, this.getLineY(x1, y1, x2, y2, 0), -10);
	      		
	      		if(degree1 >= -90 && y1 < yy){
	      			yy -= 20;
	      		}
	  		}
				
	  		this.ctx[3].moveTo(x1,y1);
	  		this.ctx[3].lineTo(xx,yy);   //가장자리
	  		//this.ctx[3].lineWidth=1.5;
				this.ctx[3].stroke();
				
	    	for(var i=1; i<totald; i++){
	    		xxx = this.getXfromDist(x1, y1, x2, y2, countTerm);
	    		yyy = this.getYfromDist(x1, y1, x2, y2, countTerm);
	    		
	    		countTerm += term;
	    		if(i % 5 == 0)
	    			smallTerm = 10;
	    		else
	    			smallTerm = 5;
	
	    		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		
	    		if(degree1 <= 0.0){
	      		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), -smallTerm);
	      		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), -smallTerm);
	      		
	      		if(degree1 >= -90 && yyy < yy){
	      			if(i % 5 == 0)
	      				yy -= 20;
	          		else
	      			    yy -= 15;
	      		}
	    		}
	    	
	    		this.ctx[3].moveTo(xxx,yyy);   //눈금들
	  			this.ctx[3].lineTo(xx,yy);
	  			this.ctx[3].lineWidth=1;
	  			this.ctx[3].stroke();
	  			this.ctx[3].closePath();
	    	}
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
			}
			
			if(this.mUpCheck==1)
			{
				if(this.newCheck==3)
				{
					sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
					
					x1 = sPoint.x;
					y1 = sPoint.y;
					x2 = point.x;
					y2 = point.y;
					
		    	var smallTerm = 10;
		    	var dist = this.getDistance(x1, x2, y1, y2);
		    	
	    		xxx = this.getXfromDist(x1, y1, x2, y2, dist);
	    		yyy = this.getYfromDist(x1, y1, x2, y2, dist);
	
	    		xx = this.getXfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		yy = this.getYfromDist(xxx, yyy, 0, this.getLineY(xxx, yyy, x1, y1, 0), smallTerm);
	    		
					this.ctx[3].beginPath();
	    		this.ctx[3].moveTo(xxx,yyy);
	  			this.ctx[3].lineTo(xx,yy);
	  			//this.ctx[3].lineWidth=1.5;
	  			this.ctx[3].stroke();
	  			this.ctx[3].closePath();
					
					this.drawAllImage();
					//this.drawImg.src = this.imgCan[3].toDataURL();
					this.pObj.refreshImage(this.imgCan[3]);
					
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
					
					this.lengthValue();
					this.ctx[3].clearRect(0, 0, this.width, this.height);
					this.newCheck=2;
				}	
			}
		}
		
	};
	
	this.drawZoom = function(point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			
			var w1 = point[1].x-point[0].x;
			var h1 = point[1].y-point[0].y
			
			this.ctx[objInfo.canType].beginPath();
			var capImage = new Image();
			//capImage.src = objInfo.capImg;
			this.ctx[objInfo.canType].lineWidth=objInfo.lineWidth;
			this.ctx[objInfo.canType].strokeStyle="black";
			this.ctx[objInfo.canType].strokeRect(point[0].x, point[0].y, w1, h1);
			this.ctx[objInfo.canType].fillStyle='white';
			this.ctx[objInfo.canType].fillRect(point[0].x, point[0].y, w1, h1);
			this.ctx[objInfo.canType].drawImage(objInfo.capImg, point[0].x, point[0].y+40, w1, h1, point[0].x, point[0].y, w1, h1);
			
			this.ctx[objInfo.canType].stroke();
			this.ctx[objInfo.canType].fill();
			this.ctx[objInfo.canType].closePath();
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
				this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
				cap = this.pObj.cObj;
				//cap = this.pObj.cObj.toDataURL();
				this.newCheck=3;
			}
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==3)
			{
				var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0, 0, this.width, this.height);
				this.ctx[3].strokeStyle="#000000";
				this.ctx[3].strokeRect(sPoint.x, sPoint.y, point.x-sPoint.x, point.y-sPoint.y);
				this.ctx[3].stroke();
				this.ctx[3].closePath();
				
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.pObj.refreshImage(this.imgCan[3]);
			}
			if(this.mUpCheck==1)
			{
				if(this.newCheck==3)
				{
					this.newCheck=2;
					var len = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point.length;
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[len]=point;
					var point = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point;
					
					var w1 = point[1].x-point[0].x;
					var h1 = point[1].y-point[0].y;
					var bgImg = new Image();
					
					//this.pObj.cCopyObj.src = this.pObj.cObj.toDataURL();
					//alert(this.pObj);
					//bgImg.src = cap; //this.pObj.cCopyObj.toDataURL();
					
					//bgImg.src = this.imgCan[0].toDataURL();
					
					this.ctx[3].beginPath();
					this.ctx[3].clearRect(0, 0, this.width, this.height);
					this.ctx[3].drawImage(cap, point[0].x, point[0].y+40, w1, h1, point[0].x, point[0].y+40, w1*1.3, h1*1.3);
					this.ctx[3].closePath();
					var capImage = new Image();
					capImage.src = this.imgCan[3].toDataURL();
					
					//this.ctx[this.canType].clearRect(0, 0, this.width, this.height);
					this.ctx[this.canType].beginPath();
					this.ctx[this.canType].strokeRect(point[0].x, point[0].y, w1, h1);
					this.ctx[this.canType].fillStyle='white';
					this.ctx[this.canType].fillRect(point[0].x, point[0].y, w1, h1);
					this.ctx[this.canType].drawImage(this.imgCan[3], point[0].x, point[0].y+40, w1, h1, point[0].x, point[0].y, w1, h1);
					this.ctx[this.canType].stroke();
					this.ctx[this.canType].fill();
					this.ctx[this.canType].closePath();
					
					this.objInfo2[this.pObj.clickIdx][this.objIdx2].capImg = capImage;
					
					this.drawAllImage();
				}
			}
		}
	};
	/* 진행중욥 */
	this.drawText = function(point,idx)
	{
		if(idx!=null)
		{
			var objInfo = this.objInfo2[this.pObj.clickIdx][idx];
			var point = objInfo.point;
			var muntiLine = objInfo.textVal.split("\n");;
			this.ctx[objInfo.canType].beginPath();
			var font = "";
			if(objInfo.fontbold)
				font=objInfo.fontbold;
			if(objInfo.fontitalic)
				font+=objInfo.fontitalic;
			if(objInfo.font_size)
				font+=objInfo.font_size;
			else
				font+=" 16px ";
			if(objInfo.fontname)
				font+=objInfo.fontname;
			else
				font+=" Serif";
			this.ctx[objInfo.canType].font=font;
			if(tObj.moveColor)
				this.ctx[objInfo.canType].fillStyle=objInfo.moveColor;
			else
				this.ctx[objInfo.canType].fillStyle=objInfo.fillStyle;
			//this.ctx[objInfo.canType].fillStyle=objInfo.fillStyle;
			for(var i = 0;i<muntiLine.length;i++)
					this.ctx[objInfo.canType].fillText(muntiLine[i],objInfo.point[0].x, objInfo.point[0].y+(20*i));
			//this.ctx[objInfo.canType].fillText(objInfo.textVal,objInfo.point[0].x, objInfo.point[0].y);
			this.ctx[objInfo.canType].closePath();
		}
		else
		{
			if(this.mDownCheck==1 && this.newCheck==1)
			{
				var objInfo = this.objInfo2[this.pObj.clickIdx][this.objIdx2];
				objInfo.point[0]=point;
				//alert(this.objIdx2+" / "+len+" / "+point);
				
				var getText = document.getElementById('text');
				objInfo.textVal = getText.value;
				var muntiLine = getText.value.split("\n");
				getText.parentNode.removeChild(getText);
				
				this.ctx[3].beginPath();
				this.ctx[3].clearRect(0,0,this.width,this.height);
				
				var font = "";
				if(objInfo.fontbold)
					font=objInfo.fontbold;
				if(objInfo.fontitalic)
					font+=objInfo.fontitalic;
				if(objInfo.font_size)
					font+=objInfo.font_size;
				else
				{
					font+=" 16px ";
					objInfo.font_size = " 16px ";
				}
				if(objInfo.fontname)
					font+=objInfo.fontname;
				else
				{
					font+=" Serif";
					objInfo.fontname = " Serif";
				}
				this.ctx[3].font=font;
				this.ctx[3].fillStyle=objInfo.fillStyle;
				for(var i = 0;i<muntiLine.length;i++)
					this.ctx[3].fillText(muntiLine[i],point.x, point.y+(20*i));
				this.ctx[3].closePath();
				
				//this.drawImg.src = this.imgCan[3].toDataURL();
				this.newCheck=3;
			}
			
			if(this.mDownCheck==1 && this.mMoveCheck==1 && this.newCheck==2)
			{
				tObj = this.objInfo2[this.pObj.clickIdx][txtIdx];
				this.ctx[this.canType].beginPath();
				this.ctx[this.canType].clearRect(0, 0, this.width, this.height);
				this.ctx[this.canType].closePath();
				
				var muntiLine = text.split("\n");
				
				this.ctx[5].beginPath();
				this.ctx[5].clearRect(0, 0, this.width, this.height);
				var font = "";
				if(tObj.fontbold)
					font=tObj.fontbold;
				if(tObj.fontitalic)
					font+=tObj.fontitalic;
				if(tObj.font_size)
					font+=tObj.font_size;
				else
					font+=" 16px ";
				if(tObj.fontname)
					font+=tObj.fontname;
				else
					font+=" Serif";
				this.ctx[5].font=font;
				if(tObj.moveColor)
					this.ctx[5].fillStyle=tObj.moveColor;
				else
					this.ctx[5].fillStyle=tObj.fillStyle;
					
				for(var i = 0;i<muntiLine.length;i++)
						this.ctx[5].fillText(muntiLine[i],point.x, point.y+(20*i));
				//this.ctx[5].fillText(text,point.x, point.y);
				this.ctx[5].closePath();
				
				tObj.point[0] = point;
				
				var getText = document.getElementById('text');
				if(getText)
				{
					getText.style.display="none";
					getText.parentNode.removeChild(getText);
				}
						
				this.ctx[4].beginPath();
				this.ctx[4].clearRect(0, 0, this.width, this.height);
				
				//alert("drawtext in :"+text);
				for(var i=0;i<this.objInfo2[this.pObj.clickIdx].length;i++)
				{
					tObj2 = this.objInfo2[this.pObj.clickIdx][i];
					if(tObj2.type=="301" && tObj2.textVal != text)
					{
						muntiLine = tObj2.textVal.split("\n");
						font = "";
						if(tObj2.fontbold)
							font=tObj2.fontbold;
						if(tObj2.fontitalic)
							font+=tObj2.fontitalic;
						if(tObj2.font_size)
							font+=tObj2.font_size;
						else
							font+=" 16px ";
						if(tObj2.fontname)
							font+=tObj2.fontname;
						else
							font+=" Serif";
						this.ctx[4].font=font;
						this.ctx[4].fillStyle=tObj2.fillStyle;
						for(var i = 0;i<muntiLine.length;i++)
							this.ctx[4].fillText(muntiLine[i],tObj2.point[0].x, tObj2.point[0].y+(20*i));
						//this.ctx[4].fillText(tObj2.textVal,tObj2.point[0].x, tObj2.point[0].y);
					}
				}
				this.ctx[4].closePath();
				//this.drawImg.src = this.imgCan[4].toDataURL();
				this.drawAllImage();
				//this.drawImg.src = this.imgCan[5].toDataURL();
				
				this.pObj.refreshImage(this.imgCan[5]);
				
			}
			
			if(this.mUpCheck==1)
			{
				/*
				if(this.newCheck==2)
				{
					tObj = this.objInfo2[this.pObj.clickIdx][txtIdx];
					if(text && tObj)
					{
						var muntiLine = text.split("\n");
						
						this.ctx[4].beginPath();
						//this.ctx[4].clearRect(0, 0, this.width, this.height);
						var font = "";
						if(tObj.fontbold)
							font=tObj.fontbold;
						if(tObj.fontitalic)
							font+=tObj.fontitalic;
						if(tObj.font_size)
							font+=tObj.font_size;
						else
							font+=" 16px ";
						if(tObj.fontname)
							font+=tObj.fontname;
						else
							font+=" Serif";
						this.ctx[4].font=font;
						if(tObj.moveColor)
						{
							this.ctx[4].fillStyle=tObj.moveColor;
							tObj.moveColor = null;
						}
						else
							this.ctx[4].fillStyle=tObj.fillStyle;
						
							
						for(var i = 0;i<muntiLine.length;i++)
								this.ctx[4].fillText(muntiLine[i],tObj.point[0].x, tObj.point[0].y+(20*i));
						
						this.ctx[4].closePath();
						
						//this.drawImg.src = this.imgCan[4].toDataURL();
					}
					this.ctx[this.canType].drawImage(this.imgCan[4], 0, 0);
					this.drawAllImage();
				}		*/
				if(this.newCheck==3)
				{
					this.newCheck=2;
					this.ctx[this.canType].drawImage(this.imgCan[3], 0, 0);
					this.drawAllImage();
				}
				
			}
		}
	};

	this.lengthValue = function(){
		var sPoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[0];
		var ePoint = this.objInfo2[this.pObj.clickIdx][this.objIdx2].point[1];
		
		var d = Math.sqrt((ePoint.x-sPoint.x)*(ePoint.x-sPoint.x)+(ePoint.y-sPoint.y)*(ePoint.y-sPoint.y));
		d = Math.ceil(d);
		this.objInfo2[this.pObj.clickIdx][this.objIdx2].text = d;
		this.ctx[this.canType].fillText(d, ePoint.x+5, ePoint.y);
		this.drawAllImage();
		//this.drawImg.src = this.imgCan[this.canType].toDataURL();
		this.pObj.refreshImage(this.imgCan[this.canType]);
		this.ctx[this.canType].drawImage(this.imgCan[this.canType], 0, 0);
  };
	
	this.getDistance = function(x1, x2, y1, y2){
		var x1 = parseFloat(x1);
		var x2 = parseFloat(x2);
		var y1 = parseFloat(y1);
		var y2 = parseFloat(y2);
		
  	var dist = parseFloat(Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)));
  	return dist;
  };
	
	this.getXfromDist = function(cx, cy, mx, my, r){
  	var dx = 0;
  	var cx = parseFloat(cx);
		var cy = parseFloat(cy);
		var mx = parseFloat(mx);
		var my = parseFloat(my);
		var r = parseFloat(r);
		
  	var L = parseFloat(Math.sqrt( (mx-cx)*(mx-cx) + (my-cy)*(my-cy) ));
  	dx = cx + (mx-cx) * r / L;
  	return dx;
  };
  
  this.getYfromDist = function(cx, cy, mx, my, r){
  	var dy = 0;
  	var cx = parseFloat(cx);
		var cy = parseFloat(cy);
		var mx = parseFloat(mx);
		var my = parseFloat(my);
		var r = parseFloat(r);
		
  	var L = parseFloat(Math.sqrt( (mx-cx)*(mx-cx) + (my-cy)*(my-cy) ));
  	dy = cy + (my-cy) * r /L ;
  	return dy;
  };
  
  this.getLineY = function(m, n, a, b, x){
  	var y = 0;
  	y = (((m-a)*(m-x))/(n-b))+n;
  	
  	return y;
  };
	
	this.calcu_offsetY = function(h)
	{
		return h-this.pObj.thumbHeight;
	};
	
	this.getMousePoint = function(e)
	{
		var x = e.offsetX;
		var y = this.calcu_offsetY(e.offsetY);	
		return {x:x, y:y};
	};
	
	this.getTouchPoint = function(e)
	{
		var x = e.touches[0].pageX;
		var y = this.calcu_offsetY(e.touches[0].pageY);
		return {x:x, y:y};
	};
	
	this.undo = function(idx)
	{
		this.doIdx = idx;
		this.reDraw();
	};
	
	this.redo = function()
	{
		this.doIdx++;
		this.reDraw();
	};
	
	this.init = function() // BK_PAINT_IMG init
	{		
		//alert("this.imgCan[1] mainimgcheck  : "+this.imgCan[1].src);
		this.imgCan[1].onload = function()
		//if(this.imgCan[1].src.indexOf(".jpg") != -1 || this.imgCan[1].src.indexOf(".png") != -1)
		{
			try
			{
			mainImgCheck(pObj.id);
		}catch(e)
		{
		}
		}
		
		if(c)
		{
			this.pObj.menuClickCheck = 1;
			this.pObj.clickMenu=m_pen;
			this.pObj.canType=0;
		}
		
	};
	
	this.init();	
}

function mainImgCheck(id)
{
	var obj = findPaintObj(id);
	obj.drawThumb();
	obj.imgObj[0].drawAllImage();
}

function BK_PAINT_OBJECT(pObj, paintObj, e)
{
	this.pObj=pObj;
	this.paintObj=paintObj;
	this.canType;
	this.clickMenu;
	this.sPoint=e;
	this.ePoint=null;
	this.point=new Array();
	this.sprayArr = new Array();
	this.type=null;  //펜, 각도기 등등등 
	this.color=null;
	this.width=null;
	this.fillStyle = null; 
	this.strokeStyle=null;
	this.lineStyle =null;
	this.lineWidth =null;
	this.lineShape =null;
	this.globalAlpha=null;
	this.textVal;
	this.capImg = new Image();
	this.fontbold=null;
	this.font_size=null;
	this.fontitalic=null;
	this.fontname=null;
	this.moveColor=null;
/*	
	this.init = function ()
	{
		this.fillStyle = this.paintObj.fillStyle;
		this.strokeStyle=this.paintObj.strokeStyle;
		this.lineWidth =this.paintObj.lineWidth;
		alert("object linewidth : "+this.paintObj.lineWidth);
		this.globalAlpha=this.paintObj.globalAlpha;
	};

	this.init();
	*/
}

function GetObjectRect(obj)
{
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
	 return [left,top,width,height];
};

function findPaintObj(id)
{
	var canObj;
	for(var i=0;i<PAINT_LIST.length;i++)
	{
		if(PAINT_LIST[i].id == id)
		{
			canObj = PAINT_LIST[i];
				break;
		}
	}
	return canObj;
};

function thumIdx(obj)
{
	var idx=0;
	for(var i=0; i<obj.defaultSelectArr.length;i++)
	{
		if(obj.defaultSelectArr[i]=="True")
			idx++;
	}
	return idx;
};

function getImgData(obj,idx)
{
	var imgData='';
	var cInx=0;
	var cIndex=0;
	var ret='';
	var tImgSrc;
	tImgSrc = new Image();
	for(var i=0; i<obj.defaultSelectArr.length;i++)
	{
		if(obj.defaultSelectArr[i]=="True")
		{
			if(cInx==idx)
			{
				obj.clickIdx = i;
				obj.ctx.clearRect(0,0,obj.sWidth,obj.sHeight-122);
				obj.imgObj[0].imgCan[1].src = obj.tempImg[obj.clickIdx].src;
				obj.imgObj[0].reDraw(1,2);
				cIndex = i;
				break;
			}
			cInx++;
		}
	}
	
	//tImgSrc.src = obj.cObj.toDataURL();
	obj.ctxCopy.clearRect(0,0,obj.sWidth,obj.sHeight-122);
	//obj.ctxCopy.drawImage(tImgSrc,0,42,tImgSrc.width,tImgSrc.height-122,0,0,tImgSrc.width,tImgSrc.height-122);
	obj.ctxCopy.drawImage(obj.cObj,0,42,obj.cObj.width,obj.cObj.height-122,0,0,obj.cObj.width,obj.cObj.height-122);
	//obj.ctxCopy.drawImage(obj.cObj,0,0,tImgSrc.width,tImgSrc.height-122);
	imgData = obj.cCopyObj.toDataURL();
	ret = imgData.split(",");

	return convertToHex(ret[1]);
};

function convertToHex(str) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
      hex +=str.charCodeAt(i).toString(16);
  }
  return hex;
};

function getFile(paintId,fileObj)
{
	
	 if (fileObj.files && fileObj.files[0]) { 
      var reader = new FileReader();
      reader.onload = function (e) {
          document.getElementById("img_"+paintId).src = e.target.result;
					var tempRP = document.getElementById("img_"+paintId).src
					childReturn('APP_'+paintId,tempRP);
      }                    
      reader.readAsDataURL(fileObj.files[0]); 
  } 
};
