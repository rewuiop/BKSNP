var G_SSOPT=0;
var G_SAVESCRIPT="";
var G_B_AutoSave=0;
var B_HYUPJIN_DOC = 0;
var G_XMLMAP_ID="";
var xGridIndex=0;
var M_G_E = new Array();
var G_GVS=0;
var ADVANCECOUNT=0;
var NEWLINE = "\n";
var loadingFlag = 0;
var CurGridRowCnt = 0;
var startFlag = 1;
var gridFlag = 0;
var accumuFlag = 0; 
var extraArr = new Array(); 
var EVENT_SCRIPT = new Array();
var DsMapInfo = new Array();
var CollapableItem = new Array();
var DYNAMIC_COM = new Array();
var GROUP_SAVE= new Array();
var HtmlCanObjCheck = document.createElement('canvas');
var HtmlCtxCheck = HtmlCanObjCheck.getContext;
var AppletTagCheck=0;
var RVInfo = new Array();
var modifyFlag = false;
var CHAR_NL = '\n';
/* 
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_basic.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_error.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_util.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_cert.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_sign.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_encrypt.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_pkcs7.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_hash.js'></script>");
document.write("<script language='javascript' src='/EMR_DATA/script/sg_scripts/sg_base64.js'></script>");
*/
 
//document.write("<script src='../script/MediosSign.js' type='text/javascript'></script>");
document.write("<script src='../script/BK_COMMON_FUNC.js' type='text/javascript'></script>");
document.write("<script src='../script/BK_EXTEND_FUNC.js' type='text/javascript'></script>");
document.write("<script src='../script/user_defined_func.js' type='text/javascript'></script>");
document.write("<script src='../script/calendar.js' type='text/javascript'></script>");
document.write("<script>document.oncontextmenu=function(){return false;}</script>");
/*document.write("<script>window.addEventListener('contextmenu', function (e) { e.preventDefault();}, false);</script>");*/
document.body.oncontextmenu=function(){return false;}
document.onkeydown = keyboardEvent;
document.onkeyup = keyboardEvent;
function keyboardEvent(){
		parent.modifyFlag = true;
		if(event.keyCode==116){
			return false;
		}
		else if(event.keyCode==8){
			//alert(event.srcElement.nodeName);
			if(event.srcElement.nodeName!="INPUT" && event.srcElement.nodeName!="TEXTAREA" || event.srcElement.nodeName=="INPUT" && event.srcElement.readOnly==true)
				return false;
		}
			
	}
document.onmousedown = function(e){
	//if(typeof event.srcElement.nodeName != "undefined" && event.srcElement.nodeName != undefined && event.srcElement.nodeName != "BODY")
	if(event.srcElement.nodeName == "INPUT" || event.srcElement.nodeName == "IMG" || event.srcElement.nodeName == "INPUT")
		parent.modifyFlag = true;
}

function testAlert(data) {
	alert(data);
}

var rnNum=0;
function fn_BinToHex(x1)
{
	return GetDateString()+rnNum++;
}

function fn_decD(x1)
{
	var ret=xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/decryptData.jsp","data="+x1);
	if(ret.substring(0, 3) == "OK^")
	{
		return ret.substring(3, ret.length);
	}
	return "";
}

function meld_i(bili, inr, cre,na){
	var rlt =0;
	if(bili<1){
		bili= Math.log(1);
	}else{
		bili = Math.log(bili).toFixed(2);
	}
	if(inr<1){
		inr= Math.log(1);
	}else{
		inr = Math.log(inr).toFixed(2);
	}
	if(cre<1){
		cre= Math.log(1);
	}else{
		cre = Math.log(cre).toFixed(2);
	}
	
	rlt = (0.378*bili)+(1.120*inr)+(0.957*cre)+0.643;
	rlt = Number(parseFloat(rlt).toFixed(10));   
	rlt = rlt * 10 ;
	
	if(rlt >11){
		rlt = meld_na(rlt,na);
	}
	
	return Number(parseFloat(rlt).toFixed(2));   ;
	
	/*
	rlt = (0.378*Math.log(q1))+(1.120*Math.log(q2))+(0.957*Math.log(q3))+0.643 ;
	rlt = Number(parseFloat(rlt*10).toFixed(1))   ;
	mld = 1.32*(137-q4);
	rlt = parseFloat(rlt) * parseFloat(mld) ;
	mld = (0.378*Math.log(q1))+(1.120*Math.log(q2))+(0.957*Math.log(q3))+0.643 ;
	mld2 = Number(parseFloat(mld*10).toFixed(1)) + 1.32  ;
	mld3 = 0.033 * parseFloat(mld2) ;
	mld4 = 137-q4;
	rlt = parseFloat(rlt) - (parseFloat(mld3) *  parseFloat(mld4));
	SET_VAL(1049271, rlt);
*/
	
	
}

function meld_na(meld_i, na){
	var i_rlt = 0;
	if(na>137){
		na = 137;
	}else if(na<125){
		na = 125;
	}
	
	i_rlt = meld_i + (1.32*(137-na)) - (0.033*meld_i*(137-na)) ;
	return i_rlt;
	
}


function gaewol(data1){
	
	var birth ;
	var result = 0;
	var year =0;
	var month =0;
	
	var jumin = data1;
	
	var jumin_bk = jumin.substring(7,8);
	var jumin_year ;
	
	if(jumin_bk==1 || jumin_bk==2 || jumin_bk==5 || jumin_bk==6 ){
		jumin_year = '19'+jumin.substring(0,2);
	}else if(jumin_bk==3 || jumin_bk==4 || jumin_bk==7 || jumin_bk==8){
		jumin_year = '20'+jumin.substring(0,2);
	}
	birth = String(jumin_year) + jumin.substring(2,4);
	
	var aaa= new Date();
	var today ;
	var to_year = aaa.getFullYear();
	var to_month =aaa.getMonth()+1;
	if(to_month < 10){
		to_month = '0'+to_month;
	}
	var today = String(to_year)+ to_month;

	
	
	year = today.substring(0,4) - birth.substring(0,4) ;
	
	if(today.substring(4,6)<birth.substring(4,6)){
		month = (Number(today.substring(4,6))+12) - birth.substring(4,6) ;
		year = Number(year) -1;
	}else{
		month= today.substring(4,6) - birth.substring(4,6);
	}	
	
	return year + "세 " + month+ "개월";
	
}
function fn_gxtd(x0)
{
	if(x0.firstChild)
	{
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('firefox') != -1)
			return x0.firstChild.wholeText;
		else
			return x0.firstChild.data;
	}
	return "";
}

function fn_gxtd2(x0)
{
	if(x0.firstChild) {
		var retVal = [x0.getAttribute("Name"), x0.firstChild.data];
		return retVal;
	}
	return "";
}

function fn_cvbax(pn, ax1, x10){
	var co1;
	var x11;
	var ch1 = ax1.getElementsByTagName("VALUE");
	if(ch1.length > 0)
		x11 =1;
	else
		x11 =0;
	switch(ParsingRule[pn][3])
	{
		case 14:
			{
				var ch2 = ax1.getElementsByTagName("HTML_VALUE");
				if(ch2.length > 0) {
					var idStr = 'FTE_'+ParsingRule[pn][0];
		  		var i = 0;
		  		if(!FTE_Array || FTE_Array.length<1)
		  			break;
		  		for(; i<FTE_Array.length; i++) {
		  			if(FTE_Array[i][0] == idStr) {
		  				break;
		  			}
		  		}
		  		if(i!=FTE_Array.length && FTE_Array[i][2]) {
		  			FTE_Array[i][2].setHtmlData(fn_gxtd(ch2[0]));
		  		}
				}
			}
			break;
		case 0:
		  if(ParsingRule[pn][2] == 9)
		  {
		  	 	if(ch1.length > 0)
			{
				var x12 =fn_gxtd(ch1[0]);
				var x13 =x12.split(":");
				var x15=x13[1].split("|@|");

				if(x13.length>=2)
				{
					for(var i=0; i < x15.length ; i++)
					{
						var x16 = x15[i].split("|!|");
						
						var x17 = document.getElementById("APP_"+ParsingRule[pn][0]);
						if(x17)
						{
						 x17.setValueById(x16[0],x16[1]);
						}
						
						
					}
				}
			}
		  }
		  else{
			co1 = document.getElementById("VAL_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					var x12,x13;
					x13="";
					for(x12=0; x12 <ch1.length; x12++)
					{
						if(x12>0)
							x13 += ", "+fn_gxtd(ch1[x12]);
						else
							{
								if(ParsingRule[pn][3] ==4)
									x13 = ParsingRule[pn][17]+fn_gxtd(ch1[x12]);
								else
									x13 = fn_gxtd(ch1[x12]);
							}
					}

					ch1 = ax1.getElementsByTagName("UNIT");
					if(ch1.length >0)
					{
						x13 += " "+fn_gxtd(ch1[0]);
					}
					x13 += ParsingRule[pn][18];
					co1.innerText = x13;
				}
				else
					co1.innerText = "";
			}
		}
			break;
		case 1:
		case 2:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
			if(ch1.length > 0)
			{
				//co1.setAttribute('value',fn_gxtd(ch1[0]));
				co1.value = fn_gxtd(ch1[0]);
			}
			else
				co1.setAttribute('value',"");//co1.value = "";
			}
			break;
		case 3:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
					co1.value = fn_gxtd(ch1[0]);
				else
					co1.value = "";
			}
			break;
		case 4:
		case 9:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					//co1.innerText =fn_gxtd(ch1[0]);
					//co1.setAttribute("value",fn_gxtd(ch1[0]));
					
					co1.value = fn_gxtd(ch1[0]) + "";
					
					/*
					var dateStr = new Date(ch1[0].text);
					if(dateStr != NaN)
						co1.innerText = dateStr;
					else
						co1.innerText = "";
					}
					else
						co1.innerText = "";*/
				}
			}
			break;
		case 5:
			for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.selected = "selected";
			}
			break;
		case 6:
		case 7:
			for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.checked = "checked";
			}
			break;
		case 8:
			co1 = document.getElementById("INPUTU1_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
					co1.innerText =fn_gxtd(ch1[0]);
				else
					co1.innerText = "";
			}
			ch1 = ax1.getElementsByTagName("UNIT");
			if(ch1.length <=0)
				break;
			var pn1 = fn_fprbc(ch1[0].getAttribute("controlId"));
			if(pn1 <0)
				break;
			co1 = document.getElementById(ParsingRule[pn1][0]+x10);
			if(co1 == null)
				break;
			co1.selected = "selected";
			break;
		case 10:
			co1 = document.getElementById("CHECK_"+ParsingRule[pn][0]+x10+"_0");
			if(co1 != null)
			{
			if(ch1.length > 0 && fn_gxtd(ch1[0]) != "")
				co1.checked = "checked";
			else
				co1.checked = "";
			}
			break;
		case 11:
			if(ch1.length > 0)
			{
				fn_shc(pn);
				fn_SetPaintValue(pn,fn_gxtd(ch1[0]));
			}
  			break;
		case 12:
				if(ch1.length > 0)
				{
					var x12;
					var x13;
					x12 = BIR_INFO.length;
					for(x13=0;x13<x12;x13++)
					{
						if(BIR_INFO[x13][0] == ParsingRule[pn][0])
							break;
					}
					if(x13 == x12)
						break;
					for(x12=0; x12 <ch1.length; x12++)
					{
						var x14 = fn_gxtd(ch1[x12]);
						var x15 = x14.split('*');
						if(x15.length >= 2)
							fn_addImg(x13, x15[1], x15[0]);
						else
							fn_addImg(x13, x14, 0);
					}
				}
			break;
		case 16:
			{
				var x13;
				var x14=ch1.length;
				for(x13=0; x13<x14; x13++)
				{
					var x12 = ch1[x13].getAttribute("controlId");
					var x18 = document.getElementById(ParsingRule[pn][0]+"_u_"+x12);
					if(x18 != null)
					{
						x18.checked='checked';
					}
				}
			}
  			break;
  		case 22:	//SignPad
  		case 17:
  		{
  			if(0 == ParsingRule[pn][20])		//Popup Type
  			{
  				//if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0)
  					//col = findSignPadObj("IMG_"+ParsingRule[pn][0]);
  				//else
	  				co1 = document.getElementById("IMG_"+ParsingRule[pn][0])
					if(co1 != null)
					{
						if(ch1.length > 0)
						{
							co1.src = '';
							var temp = fn_gxtd(ch1[0]);
							co1.src = temp.replace(/\s/gi, '');
						}
						else
							co1.src = "";
					}
				}
				/* embedded type일 경우 수정모드시 이미지 가져오지 않음
				else
				{*/
					/* ===
					co1 = document.getElementById("signpad_"+ParsingRule[pn][0]+"_Canvas");
					if(ch1.length > 0)
					{
						var bkimg = fn_gxtd(ch1[0]);
						this.imageObj = new Image();
						this.canvas = document.getElementById("signpad_"+ParsingRule[pn][0]+"_Canvas");
						this.context = this.canvas.getContext('2d');
						
						imageObj.src = bkimg;		
						//var that = this;
						//this.imageObj.onload = function()
						{
							this.context.drawImage(imageObj,0,0,this.canvas.width,this.canvas.height);
						}
						
						
					}
					else
						co1.src = "";
						===*/
						/*
					var x17 = document.getElementById("APP_"+ParsingRule[pn][0]+x10);
					if(navigator.userAgent.indexOf('11.0') == -1)// 버전이 11 아님
					{
					 var x12 =fn_gxtd(ch1[0]);
					 var x13 =x12.split(":");
					 //if(x17)
					 	//x17.setXmlData(x13[1]);
					}
					else
					{
						var bkimg = fn_gxtd(ch1[0]);
						this.imageObj = new Image();
						this.canvas = x17;
						this.context = this.canvas.getContext('2d');
						
						imageObj.src = bkimg;
						this.context.drawImage(imageObj,0,0,this.canvas.width,this.canvas.height);
					}
				}*/
  		}
  		break;
  		case 13:
	  		{
	  			var i=pn-1;
	  			while(i>=0)
	  			{
	  				if((ParsingRule[pn][4]-1) == ParsingRule[i][4])
  					break;
	  				i--;
  				}
  				var x18;
  				if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
						x18 = findImageInputObj("APP_"+ParsingRule[pn][0]);
	  			else
	  				x18 = document.getElementById("APP_"+ParsingRule[i][0]+x10);
		  		if(x18 == null)
		  		{
		  			return;
		  		}
		  		x18.setValueById(ParsingRule[i][0], fn_gxtd(ch1[0]));
	  		}
	  		break;
	  	case 18:
	  		if(ch1.length > 0)
				{
					var x12 =fn_gxtd(ch1[0]);
					var x13 =x12.split(":::?:::");
					if(x13.length>=2)
					{
						var x14;
						if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
							x14=findPedigreeObj("APP_"+ParsingRule[pn][0]+x10);
						else
							x14=document.getElementById("APP_"+ParsingRule[pn][0]+x10);
						if(x14)
						{
							x14.setXmlData(x13[1]);
						}
					}
				}
	  		break;
	  	case 20:
		  	{
		  		for(i=0; i < ch1.length; i++)
					{
						var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
						if(pn1 <0) continue;
						co1 = document.getElementById("INPUT_"+ParsingRule[pn1][0]+x10);
						if(co1) {
							var j=0;
							for(; j<co1.options.length; j++) {
								if(co1.options[j].value==fn_gxtd(ch1[0])) {
									co1.selectedIndex = j;
									break;
								}
							}
							if(j==co1.options.length){
								AddComponent(ParsingRule[pn1][9], x10, ch1[i].getAttribute("data"), fn_gxtd(ch1[0]),0,2);
								co1.selectedIndex = j;
							}
						}
					}
		  	}
		  	break;
		  	case 21: //우혜윤 (다이나믹 라디오)
	  		{
		  		if(ch1.length > 0)
				{
			  		for(i=0; i < ch1.length; i++)
						{
							var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
							var selChk = ch1[i].getAttribute("selectChecked");
							
							if(pn1 <0) continue;
							co1 = document.getElementById("INPUT_"+ParsingRule[pn1][0]+x10);
							if(co1) 						
								AddComponent(ParsingRule[pn1][9], '', fn_gxtd(ch1[i]),ch1[i].getAttribute("data"), selChk,2);					
						}
			  	}	
			  }	
				break;
				
		  		case 23: //우혜윤 (다이나믹 체크박스)
		  		{
			  		if(ch1.length > 0)
						{
				  		for(i=0; i < ch1.length; i++)
							{						
								var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
								var selChk = ch1[i].getAttribute("selectChecked");
								
								if(pn1 <0) continue;
								co1 = document.getElementById("INPUT_"+ParsingRule[pn1][0]+x10);
								if(co1) 						
									AddComponent(ParsingRule[pn1][9], '',  fn_gxtd(ch1[i]), ch1[i].getAttribute("data"),selChk,2);		
							}
				  	}
			  }
					break;
	  		}
		
	return x11;
}

function fn_svbxd(pn, ax1, x10){
	var co1;
	var x11;
	var ch1 = ax1.getElementsByTagName("VALUE");
	if(ch1.length > 0)
		x11 =1;
	else
		x11 =0;
	switch(ParsingRule[pn][3])
	{
		case 0:
		 if(ParsingRule[pn][2] == 9)
		  {

		  	if(ch1.length > 0)
			{
				var x12 =fn_gxtd(ch1[0]);
				var x13 =x12.split(":");
				var x15=x13[1].split("|@|");

				if(x13.length>=2)
				{
					for(var i=0; i < x15.length ; i++)
					{
						var x16 = x15[i].split("|!|");
						var x17 = document.getElementById("APP_"+ParsingRule[pn][0]);
					 if(x17)
					 	x17.setValueById(x16[0],x16[1]);
					}
				}
			}

		  }
		  else{
			co1 = document.getElementById("VAL_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.style.background='#eeeeee';
					var x12,x13;
					x13="";
					for(x12=0; x12 <ch1.length; x12++)
					{
						if(x12>0)
							x13 += ", "+fn_gxtd(ch1[x12]);
						else
							x13 = ParsingRule[pn][17]+fn_gxtd(ch1[x12]);
					}

					ch1 = ax1.getElementsByTagName("UNIT");
					if(ch1.length >0)
					{
						x13 += " "+fn_gxtd(ch1[0]);
					}
					x13 += ParsingRule[pn][18];
					co1.innerText = x13;
				}
				else
					co1.innerText = "";
			}
		}
			break;
		case 1:
		case 2:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.style.background='#eeeeee';
					co1.value = fn_gxtd(ch1[0]);
				}
			}
			else
				co1.value = "";
			break;
		case 3:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.style.background='#eeeeee';
					co1.innerText = fn_gxtd(ch1[0]);
				}
				else
					co1.innerText = "";
			}
			break;
		case 4:
		case 9:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.style.background='#eeeeee';
					co1.innerText =fn_gxtd(ch1[0]);
				}
			}
			break;
		case 5:
			for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.style.background='#eeeeee';
				co1.selected = "selected";
			}
			break;
		case 6:
		case 7:
			for(i=0; i < ch1.length; i++)
			{
				var pn1 = fn_fprbc(ch1[i].getAttribute("controlId"));
				if(pn1 <0) continue;
				co1 = document.getElementById(ParsingRule[pn1][0]+x10);
				if(co1 == null) continue;
				co1.style.background='#eeeeee';
				co1.checked = "checked";
			}
			break;
		case 8:
			co1 = document.getElementById("INPUTU1_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				if(ch1.length > 0)
				{
					co1.style.background='#eeeeee';
					co1.innerText =fn_gxtd(ch1[0]);
				}
				else
					co1.innerText = "";
			}
			ch1 = ax1.getElementsByTagName("UNIT");
			if(ch1.length <=0)
				break;
			var pn1 = fn_fprbc(ch1[0].getAttribute("controlId"));
			if(pn1 <0)
				break;
			co1 = document.getElementById(ParsingRule[pn1][0]+x10);
			if(co1 == null)
				break;
			co1.style.background='#eeeeee';
			co1.selected = "selected";
			break;
		case 10:
			co1 = document.getElementById("CHECK_"+ParsingRule[pn][0]+x10+"_0");
			if(co1 != null)
			{
			if(ch1.length > 0 && fn_gxtd(ch1[0]) != "")
			{
				co1.style.background='#eeeeee';
				co1.checked = "checked";
			}
			else
				co1.checked = "";
			}
			break;
		case 11:
			if(ch1.length > 0)
			{
				fn_shc(pn);
				fn_SetPaintValue(pn,fn_gxtd(ch1[0]));
			}
  			break;
		case 12:
				if(ch1.length > 0)
				{
					var x12;
					var x13;
					x12 = BIR_INFO.length;
					for(x13=0;x13<x12;x13++)
					{
						if(BIR_INFO[x13][0] == ParsingRule[pn][0])
							break;
					}
					if(x13 == x12)
						break;
					for(x12=0; x12 <ch1.length; x12++)
					{
						fn_addImg(x13, fn_gxtd(ch1[x12]), 0);
					}
				}
			break;
		case 16:
			{
				var x13;
				var x14=ch1.length;
				for(x13=0; x13<x14; x13++)
				{
					var x12 = ch1[x13].getAttribute("controlId");
					var x18 = document.getElementById(ParsingRule[pn][0]+"_U_"+x12);
					if(x18 != null)
					{
						x18.checked='checked';
					}
				}
			}
  			break;
  		case 13:
	  		{
	  			var i=pn-1;
	  			while(i>=0)
	  			{
	  				if((ParsingRule[pn][4]-1) == ParsingRule[i][4])
  			break;
	  				i--;
  		}
  				var x18;
  				if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
						x18 = findImageInputObj("APP_"+ParsingRule[pn][0]);
					else
		  			x18 = document.getElementById("APP_"+ParsingRule[i][0]+x10);
		  		if(x18 == null)
		  		{
		  			return;
		  		}
		  		x18.setValueById(ParsingRule[x2][0], val1);
	  		}
	  		break;
	  	case 18:
	  		if(ch1.length > 0)
			{
				var x12 =fn_gxtd(ch1[0]);
				var x13 =x12.split(":::?:::");
				if(x13.length>=2)
				{
					var x14;
					if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
						x14=findPedigreeObj("APP_"+ParsingRule[pn][0]+x10);
					else
						x14=document.getElementById("APP_"+ParsingRule[pn][0]+x10);
					if(x14)
					{
						x14.setXmlData(x13[1]);
					}
				}
			}
	  		break;
		}
	return x11;
}

function fn_svbdv(pn, ax1, x10){
	var co1;
	
	
	switch(ParsingRule[pn][3])
	{
		case 0:
			break;
		case 1:
		case 2:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.style.background='#eeeeee';
				co1.value = ax1;
			}
			break;
		case 3:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.value = ax1;
				if(ParsingRule[pn][2] == 5)
					setTimeout("document.getElementById('INPUT_'+"+ParsingRule[pn][0]+x10+").style.background='#eeeeee';", 1);
				else
					co1.style.background='#eeeeee';
			}
			break;
		case 4:
		case 9:
			co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
			if(co1 != null)
			{
				co1.innerText = ax1;
				co1.style.background='#eeeeee';
			}
			break;
		case 5:
		case 6:
		case 7:
		{
			var i=pn+1;
  			var x4 = -1;
  			var x5=ParsingRule.length;
  			var x6=0;
  			var x8;
  			while(i < x5)
  			{
  				if((ParsingRule[pn][4]+1) != ParsingRule[i][4])
  					break;
  				
  				x8 = document.getElementById(ParsingRule[i][0]+x10);
  				if(x8)
  				{
  					var ax1Arr = ax1.split(',');
  					if(ax1Arr.length>1)
  					{
  						for(var k=0;k<ax1Arr.length;k++)
  						{
	  						if((ParsingRule[i][13] != "") && (ax1Arr[k] == ParsingRule[i][13]))
		  					{
		  							x8.checked = "checked";
		  							break;
		  					}
		  					else if((ParsingRule[i][12] != "") && (ax1Arr[k] == ParsingRule[i][12]))
		  					{
		  							x8.checked = "checked";
		  							break;
		  					}
		  						else
		  						x8.checked = "";
		  				}
  					}
  					else
  					{
  						if((ParsingRule[i][13] != "") && (ax1 == ParsingRule[i][13]))
	  					{
	  							x8.checked = "checked";
	  						x6++;
	  					}
	  					else if((ParsingRule[i][12] != "") && (ax1 == ParsingRule[i][12]))
	  					{
	  							x8.checked = "checked";
	  						x6++;
	  					}
	  						else
	  						x8.checked = "";
	  				}
  				}
  				i++;
  			}
	  		
	  		//if(x6 == 0)
	  		if(ParsingRule[pn][2] == 5 && x6 == 0)
  			{
  				var x9 = x8.parentElement.parentElement;
  				var x10 = x9.getElementsByTagName("OPTION");
  				for(x11=0; x11<x10.length; x11++)
  				{
  					var x12 = x10[x11].getAttribute("VALUE");
  					if(x12 == "N/A" && val1 == "N/A")
  							x10[x11].selected = "selected";
  				}
  			}
		}
			break;
		case 8:
			break;
		case 10:
			break;
		case 11:
			break;
		case 12:
			{
				var x13=BIR_INFO.length;
				var x14;
				for(x14=0;x14<x13;x14++)
				{
					if(BIR_INFO[x14][0]== ParsingRule[pn][0])
					{
						fn_addImg(x14,ax1,1);
						return;
					}
				}
			}
			break;
		case 20:
			{
				/*
				co1 = document.getElementById("INPUT_"+ParsingRule[pn][0]+x10);
				if(!co1)	return;
				co1.style.display = 'block';
				var opt = document.createElement('OPTION');
				opt.id = 'OPTION_'+ParsingRule[pn][0];
				opt.value = ax1;
				opt.innerText = ax1;
				co1.appendChild(opt);
				*/
				AddComponent(ParsingRule[pn][9], x10, ax1, ax1,0,2);
			}
			break;
		case 21:
			{
				AddComponent(ParsingRule[pn][9], x10, ax1, ax1,0,2);
			}
			break;
		case 22:
			{
				
				AddComponent(ParsingRule[pn][9], x10, ax1, ax1,0,2);
			}
			break;
		case 23:
			{
				
				AddComponent(ParsingRule[pn][9], x10, ax1, ax1,0,2);
			}
			break;
		}
		
}

function AddComponent(conId, gridIndex, name, data, check, duplicate) {
	var i=0;
	var selChk = check;
	for(; i<ParsingRule.length; i++) {
		if(conId == ParsingRule[i][9])
			break;
	}
	if(i==ParsingRule.length)
		return;



	switch(ParsingRule[i][3]) {
		case 20: {
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			if(!ele)	return;
			var opt = document.createElement('OPTION');
			opt.id = 'OPTION_'+ParsingRule[i][0];
			opt.value = data;
			opt.innerText = name;
			ele.appendChild(opt);
		}
		break;
		case 21: {
			
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			//ele.innerText+=name;
			if(!ele) return;
			if(duplicate == 0)
			{
					var spOpt=document.createElement('SPAN');
					spOpt.style.width=ele.getAttribute("optWidth")+"px";
										
					ele.appendChild(spOpt);
			
					
					var ropt = document.createElement('INPUT');
					
					ropt.type='radio';
					ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
					ropt.value=data;
					ropt.value2=name;
					
							if(selChk == 1)
							{
								ropt.checked=1;
							}

					
					spOpt.appendChild(ropt);
					
					var spCap = document.createElement('SPAN');
					spCap.innerText = data;
					spOpt.appendChild(spCap);
			}
			else if(duplicate ==1)
			{	
				
				for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[K][0]==conId   && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)
					{	
						return;
					}
				}
							var spOpt=document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
														
							ele.appendChild(spOpt);
					
							
							var ropt = document.createElement('INPUT');
							
							ropt.type='radio';
							ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
							ropt.value=data;
							ropt.value2=name;
							
							if(selChk == 1)
							{
								ropt.checked=1;
							}

								
							spOpt.appendChild(ropt);
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);
						
			}
			else if( duplicate == 2  )
			{	
				 
				for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId   && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)
					{	
							ele.removeChild(ele.childNodes[1]);
//						ele.removeChild(ele.firstChild);
						
						if(DYNAMIC_COM[k][5]=="1")
							selChk=1;						
													
					}
				}
							var spOpt=document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							
							ele.appendChild(spOpt);
					
							
							var ropt = document.createElement('INPUT');
							
							ropt.type='radio';
							ropt.name="RADIO_"+ParsingRule[i][0];			//"INPUT_"+ParsingRule[i][0]+"_SUB";		
							ropt.value=data;
							ropt.value2=name;
							
							
							if(selChk == 1)
							{
								ropt.checked=1;
							}

								
							spOpt.appendChild(ropt);
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);
						
			}
					
		}
		break;
		case 22: {
			var ele = document.getElementById("IMG_"+ParsingRule[i][0]);
			if(!ele) return;
			
			ele.src="data:image/jpeg; base64,"+data;			
		}
		break;
		case 23: {
			var ele = document.getElementById("INPUT_"+ParsingRule[i][0]);
			if(!ele) return;
			
			if(duplicate == 0)
			{
				var spOpt = document.createElement('SPAN');
				spOpt.style.width=ele.getAttribute("optWidth")+"px";
				
				ele.appendChild(spOpt);
				
				var chpt = document.createElement('INPUT');
				
				chpt.type='checkbox';
				chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
				chpt.value=data;
				chpt.value2=name;
				
				if(selChk == 1)
							{
								chpt.checked=1;
							}

				spOpt.appendChild(chpt);
				
				
				var spCap = document.createElement('SPAN');
				spCap.innerText = data;
				spOpt.appendChild(spCap);
		   }
		   else if(duplicate == 1)
		   	{
		   		
		   		for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId  && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)					
					{
						return;					
					}
				}
				
							var spOpt = document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							
							ele.appendChild(spOpt);
							
							var chpt = document.createElement('INPUT');
							
							chpt.type='checkbox';
							chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
							chpt.value=data;
							chpt.value2=name;
							
							if(selChk == 1)
							{
								chpt.checked=1;
							}

							spOpt.appendChild(chpt);	
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);	
					  		  
		   	}
		   else if(duplicate ==2)
		   	{
		   		
		   		for(var k=0; k<DYNAMIC_COM.length; k++)
				{
					if(DYNAMIC_COM[k][0]==conId  && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data)					
					{
						ele.removeChild(ele.firstChild);					
						if(DYNAMIC_COM[k][5]=="1")
							selChk=1;
					}
				}				
							var spOpt = document.createElement('SPAN');
							spOpt.style.width=ele.getAttribute("optWidth")+"px";
							
							ele.appendChild(spOpt);
							
							var chpt = document.createElement('INPUT');
							
							chpt.type='checkbox';
							chpt.name="CHECKBOX_"+ParsingRule[i][0];   //"INPUT_"+ParsingRule[i][0]+"_SUB";
							chpt.value=data;
							chpt.value2=name;
	/*ny_0512주석			
							if(check==1)
							chpt.checked=1;
							*/
							if(selChk == 1)
							{
								chpt.checked=1;
							}

							spOpt.appendChild(chpt);		
							
							
							var spCap = document.createElement('SPAN');
							spCap.innerText = data;
							spOpt.appendChild(spCap);
					  		  
		   	}
	
		 
		
		}
		break;
	}
	if(DYNAMIC_COM.length>0)
	{
		var k=0
		for(; k<DYNAMIC_COM.length; k++)
		{
			//if(DYNAMIC_COM[k][0]==conId && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data && DYNAMIC_COM[k][5]==check)
			if(DYNAMIC_COM[k][0]==conId && DYNAMIC_COM[k][3] == name && DYNAMIC_COM[k][4]==data )
			 	break;			
		}
		if(k==DYNAMIC_COM.length)
			DYNAMIC_COM[DYNAMIC_COM.length]=[conId,ParsingRule[i][3],gridIndex,name,data,check,duplicate];		
	}
	else
		DYNAMIC_COM[DYNAMIC_COM.length]=[conId,ParsingRule[i][3],gridIndex,name,data,check,duplicate];
}

function fn_sgvbax(x1, x2, x201, flag)
{
	if( x1.getAttribute("controlId") == null)
		return;
	var x3=fn_fprbc(x1.getAttribute("controlId"));
	if(x3 <0)
		return;

	var x33=G_V_Info.length;
	var x34;
	for(x34=0;x34<x33;x34++)
	{
		if(ParsingRule[x3][0]==G_V_Info[x34][0])
			break;
	}
	if(x34==x33)
		return;
	var x35=x34;
	x33=GD_Info.length;
	for(x34=0;x34<x33;x34++)
	{
		if(GD_Info[x34][0]==G_V_Info[x35][1])
			break;
	}
	if(x34==x33)
		return;
	if(x2>=GD_Info[x34][1])
		AddLastRowInGrid(x34);

	if(flag == 0)
	{
		var x11= fn_cvbax(x3, x1, "_"+x2+"_"+x201);
		if(x11>0)
			fn_gshc("VAL_"+ParsingRule[x3][0]+"_"+x2+"_0");
	}
	else
		fn_svbxd(x3, x1, "_"+x2+"_"+x201);
}


function fn_sgvbgx(pn, x1)
{
	var x2 =  x1.getElementsByTagName("GRID_VALUESET");
	var x3;
	var x10 = x1.getAttribute("controlId");
	var x4 = GD_Info.length;
	var x13;
	var x14=fn_fprbc(x10);
	for(x13=0;x13<x4;x13++)
	{
		if(GD_Info[x13][0] == ParsingRule[x14][0])
			break;
	}
	if(x13 == x4)
		return;
	x4 = x2.length;
	for(x3=0;x3<x4;x3++)
	{
		var x6=x2[x3].getElementsByTagName("GRID_ATTRIBUTE");
		var x5;
		var x11 = fn_getGridRowIndexForOutput(x6, x13);
		var x12 = fn_getGridColumnIndexForOutput(x6, x13);

		if(x11 ==-1)
		 	x11 = parseInt(x3/GD_Info[x13][4]);
		if(x12 ==-1)
			x12 = parseInt(x3%GD_Info[x13][4]);
		for(x5=0;x5<x6.length;x5++)
			fn_sgvbax(x6[x5], x11, x12, 0);
	}

}


function fn_gsxtn(n)
{
	switch(n)
	{
		case 0:return "DOCUMENT";
		case 1:return "GROUP";
		case 2:return "ENTITY";
		case 3:return "GRID";
		case 4:return "GRID_ATTRIBUTE"
		case 5:return "ATTRIBUTE";
		case 6:return "VALUE";
		case 7:return "ENTITY";
		case 9:return "ATTRIBUTE";
		case 10:return "ATTRIBUTE";
	}
	return "";
}

function fn_gpedd(x1)
{
	 var x2,htmlCheck="0";
	 //구자경 수정
	 if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
	 {
	 	x2 = findPedigreeObj("APP_"+x1);
	 	htmlCheck="1";
	 }
	 else
	 {
	 	x2 = document.getElementById("APP_"+x1);
	 	htmlCheck="0";
	 }
	 
	 if(x2 == null)
	  return "";
	 
	if(x2.getImageData() == "NoChecked")
	  return "";
	    
	var x3 = x2.getImageData();
	 
	 var sFn;
	 //if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
	 	//sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_img_test", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&imgData="+x3, 3);
	 //else
	 	sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&imgData="+x3+"&htmlCheck="+htmlCheck, 3);

	 if(sFn =="")
	  return "";
	 return sFn + ":::?:::"+ x2.GetXmlStringData();
}

function fn_panel(flag,x1,pXml) //우혜윤
{
	var x2=document.getElementById("IFRAME_"+x1).contentWindow;
	if(flag==1)//저장할때 
	{		
		if(x2 == null)
			return "";
			
		var x3= x2.SaveValue();
		
		return x3;
	}
	else if(flag==2)//수정될때
	{
		if(x2==null)
			return "";
		
		var x3=x2.LoadValue(pXml);
	}
}

function fn_chart(x1)
{
 var x2,htmlCheck="0";
 if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
 {
 	x2 = findChartObj("a_"+x1);
 	htmlCheck="1";
	}
 else
 	{
 	x2 = document.getElementById("a_"+x1);
 	htmlCheck="0";
	}
 if(x2 == null)
  return "";

 var x3 = x2.getImageData();
 var sFn;
 //if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
 	//sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_img_test", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&imgData="+x3, 3);
 //else
 	sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&imgData="+x3+"&htmlCheck="+htmlCheck, 3);
 if(sFn =="")
  return "";
 return sFn;
}

function fn_slider(x1)
{
	var htmlCheck="0";
	if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
	{
		var x2 = findImageInputObj("APP_"+x1);
		var x3 = x2.getImageData();
		htmlCheck = "1";

		if(x2 == null)
  		return "";

  	var sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&htmlCheck="+htmlCheck+"&imgData="+x3, 3);
		if(sFn =="")
			return "";

  	var sFnlen = x2.idList.length;
  	var sFn2 = "";
  	var sFnID ="";
  	var sFnVal ="";

  	for(i=0; i<sFnlen; i++)
  	{
	 		sFnID = x2.idList[i];
	 		sFn2 = sFn2 + sFnID;
	 		sFnVal =x2.getValueById(sFnID);
	 		sFn2 = sFn2 + "|!|" + sFnVal ;
	 		if( i < sFnlen-1)
	 	 	{
	 			sFn2 = sFn2 +"|@|";
	 		}
		}

		return sFn + ":" + sFn2;
		
	}
	else
	{
		var x2 = document.getElementById("APP_"+x1);
		var x3 = x2.getImageData();
		htmlCheck = "0";
		
		if(x2 == null)
  		return "";
  	
		var sFn = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+x1+"&htmlCheck="+htmlCheck+"&imgData="+x3, 3);
		if(sFn =="")
			return "";

  	var sFnlen = x2.idList.size();
  	var sFn2 = "";
  	var sFnID ="";
  	var sFnVal ="";

  	for(i=0; i<sFnlen; i++)
  	{
	 		sFnID = x2.idList.get(i);
	 		sFn2 = sFn2 + sFnID;
	 		sFnVal =x2.getValueById(sFnID);
	 		sFn2 = sFn2 + "|!|" + sFnVal ;
	 		if( i < sFnlen-1)
	 	 	{
	 			sFn2 = sFn2 +"|@|";
	 		}
		}
		
		return sFn + ":" + sFn2;
	}  

}


function fn_gsx4a(x1, x2, x3)
{
	var x4;
	var x5 = ParsingRule.length;

	if(x1 >= x5)
		return "";

  var x7 = ParsingRule[x1][4]+1;

	x4 = "\r\n<"+fn_gsxtn( ParsingRule[x1][2]);
  x4 += " con_id='"+ParsingRule[x1][5]+"'";
  x4 += " con_term='"+fn_rpls4x(ParsingRule[x1][6])+"'";
  x4 += " path='"+fn_rpls4x(ParsingRule[x1][1])+"'";
  x4 += " controlId='"+ParsingRule[x1][9]+"'";
  x4 += " name='"+fn_rpls4x(ParsingRule[x1][19])+"'";
  if(ParsingRule[x1][22] != null)
  	x4 += " masterSet='"+fn_rpls4x(ParsingRule[x1][22])+"'>";
  else
  	x4 += ">";

  var x8;
  switch(ParsingRule[x1][3])
  {
  	case 0:
  	 if(ParsingRule[x1][2] == 9){
  	 	x8 = fn_slider(ParsingRule[x1][0]+x3);
  			if(x8 != "")
  			{
	  			x4 += "<VALUE con_id='' con_term='' controlId='"+ParsingRule[x1][9]+"'>";
	  			x4 += x8+"</VALUE>";
	  			G_GVS=1;
	  		}
  	}
  	 else{
  		x8 = document.getElementById("VAL_"+x2+x3);
  		if(x8 != null && x8.innerText != "")
  		{
  			x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(x8.innerText)+"</VALUE>";
  			G_GVS=1;
  		}
  	}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+x2+x3);
  		if(x8 != null && typeof x8.value != "undefined" && x8.value != "")
  		{
  			//if(x8.nodeName.toUpperCase()!="TEXTAREA")
  				x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(x8.value)+"</VALUE>";
  			/*else
  			{
  				var sHeight = parseInt(x8.scrollHeight)+parseInt(10);
  				x4 += "<VALUE con_id='' con_term='' height='"+sHeight+"px'>"+fn_rpls4x(x8.value)+"</VALUE>";
  			}*/
  			G_GVS=1;
  		}
  		else if(x8 != null && x8.tagName != "INPUT" && x8.innerText != "")
			{
				x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(x8.innerText)+"</VALUE>";
  			G_GVS=1;
			}
  		break;
  	case 14:
	  	{
	  		var idStr = 'FTE_'+x2;
	  		var i = 0;
	  		if(!FTE_Array || FTE_Array.length<1)
	  			break;
	  		for(; i<FTE_Array.length; i++) {
	  			if(FTE_Array[i][0] == idStr) {
	  				break;
	  			}
	  		}
	  		if(i!=FTE_Array.length && FTE_Array[i][2]) {
	  			var textData = FTE_Array[i][2].getTextData();
	  			var htmlData = FTE_Array[i][2].getHtmlData();
	  			
	  			if(textData != "") {
	  				x4 += "<VALUE con_id='' con_term=''>"+fn_rpls4x(textData)+"</VALUE>";
	  				x4 += "<HTML_VALUE con_id='' con_term=''>"+fn_rpls4x(htmlData)+"</HTML_VALUE>";
	  				G_GVS=1;
	  			}
	  		}
	  	}
	  	break;	
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x1+1;
  			while(i < x5)
  			{
  				if(x7 > ParsingRule[i][4])
  					break;
  				if( x7 != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}

  				x8 = document.getElementById(ParsingRule[i][0]+x3);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						x4 += "<VALUE con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"'"+" controlId='"+ParsingRule[i][9]+"'>";
  						x4 += fn_rpls4x(ParsingRule[i][12]) +"</VALUE>";
  						G_GVS=1;
  						//x4 += fn_rpls4x(x8.value) +"</VALUE>";
  					}
  				}
  				i++;
  			}
  		}
  		break;
  	case 8:
  		{
  			var i=x1+1;
  			var x111=0;
  			x8 = document.getElementById("INPUTU1_"+x2+x3);
  			if(x8 == null)
  				break;
	  	//	if(x8 == null || x8.value==null || x8.value=="")
	  		//	break;
	  		if( x8.value != null && typeof x8.value != "undefined" && x8.value != "" )
	  			x4 += "<VALUE con_id='' con_term=''>"+x8.value+"</VALUE>";
	  		else if(x8.tagName != "INPUT" && x8.innerText != "")
	  			x4 += "<VALUE con_id='' con_term=''>"+x8.innerText+"</VALUE>";
	  		else 
	  			break;
	  		G_GVS=1;
	  		while(i < x5)
  			{
  				if(x7 > ParsingRule[i][4])
  					break;
  				if( x7 != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				x8 = document.getElementById(ParsingRule[i][0]+x3);
	  			if(x8 != null)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 += "<UNIT con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"' controlId='"+ParsingRule[i][9]+"'>";
	  					x4 += x8.innerText +"</UNIT>";
	  					x111=1;
	  					break;
	  				}
	  			}
	  			i++;
  			}

  			if(x1 != ParsingRule.length - 1)
  			{
	  			if((x111==0) && (ParsingRule[x1][4]+1 ==ParsingRule[x1+1][4]))
	  			{
	  				i = x1+1;
	  				x4 += "<UNIT con_id='"+ParsingRule[i][5]+"' con_term='"+fn_rpls4x(ParsingRule[i][6])+"' controlId='"+ParsingRule[i][9]+"'>";
		  			x4 += ParsingRule[i][12] +"</UNIT>";

	  			}
  			}
  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+x2+x3+"_0");
  		if(x8 != null && x8.checked)
  		{
  			G_GVS=1;
  			x4 += "<VALUE con_id='' con_term=''>checked</VALUE>";/*(O)*/
  		}
  		break;
  	case 11:
  		if(ParsingRule[x1][13] != "")
			{
				G_GVS=1;
					x4 += "<VALUE con_id='' con_term='' controlId=''>";
  				x4 += ParsingRule[x1][13] +"</VALUE>";
			}
  		break;
  	case 12:
  		x4 += GetImageRegisterData(x1);
  		break;
  	case 13:
  		{
  			var i=x1-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x1][4]-1) == ParsingRule[i][4])
  					break;
  				i--;
  			}
  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+x3);
	  		if(x8 == null)
	  		{
	  			return "";
	  		}

			G_GVS=1;
	  		x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  		x4 += x8.getValueById(ParsingRule[x1][0])+"</VALUE>";
  		}
  		break;
  	case 16:
  		{
  			var i=0;
  			for(i=0; i<32; i++)
  			{
  				x8 = document.getElementById(ParsingRule[x1][0]+"_U_"+i);
  				//2015-07-27 치식 컴포넌트 저장안됨오류 스크립트 수정 (승원씨 요청 우혜윤 수정)
  				if(x8==null) 
  					x8 =  document.getElementById(ParsingRule[x1][0]+"_u_"+i);
  				//2015-07-27 끝
  				if(x8 != null)
	  			{
	  				if(x8.checked)
	  				{
	  					x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  					x4 += "TEETH_NO_"+i+"</VALUE>";
	  					G_GVS=1;
	  				}
	  			}
  			}
  		}
  		break;
  	case 22:	//SignPad
  		if(0 == ParsingRule[x1][20])		//Popup Type
	  	{
	  		x8 = document.getElementById("IMG_"+ParsingRule[x1][0]+x3);
	  		if(x8 !=null)
	  		{
	  			x4 += "<VALUE con_id='' con_term='' controlId=''>";
				try
				{
					//x4 +=  "<![CDATA["+x8.src+"]]></VALUE>";
					var x5 = convertToHex(x8.src.split(",")[1].replace(/(^\s*)|(\s*$)/gi, ""));
					x4 += xmlhttpPost_Sync(SERVERPRO+SERVERIP+":"+SERVERPORT+"/medios/EMR/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[x1][0]+"_"+x2+"&imgData="+x5+"&htmlCheck=1", 3);
					x4 +=  "</VALUE>";
				}
				catch (e)
				{
					x4 +=  fn_rpls4x(x8.href)+"</VALUE>";
				}
		  		G_GVS=1;
	  		}
	  	}
	  	else														//Embedded Type 151001 구자경수정
  		{
  			x8 = document.getElementById("APP_"+ParsingRule[x1][0]+x3);
	  		if(x8 !=null)
	  		{
	  			x4 += "<VALUE con_id='' con_term='' controlId=''>";
	  			var agent = navigator.userAgent.toLowerCase();
	  			//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
	  			if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
					{
						//alert('fn_gsx4a signpad 11 : '+getImageData(x8));
	  				//x4 += "data:image/jpeg;base64," +  getImageData(x8);
	  				var x5 = convertToHex(getImageData(x8));
	  				
	  				x4 += xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[x1][0]+"_"+x2+"&imgData="+x5+"&htmlCheck=1", 3);
	  			}
	  			else
  				{
  					//x4 += "data:image/jpeg;base64," + x8.getImageBase64Data();
  					var x5 = convertToHex(x8.getImageBase64Data());
	  				x4 += xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[x1][0]+"_"+x2+"&imgData="+x5+"&htmlCheck=1", 3);
  				}
		  		x4 +=  "</VALUE>";
		  		G_GVS=1;
	  		}
  		}
  		
  		break;
  	case 17:
  		x8 = document.getElementById("IMG_"+ParsingRule[x1][0]+x3);
  		if(x8 !=null)
  		{
  			x4 += "<VALUE con_id='' con_term='' controlId=''>";
	  		x4 +=  x8.src+"</VALUE>";
	  		G_GVS=1;
  		}
  		break;
  	case 18:
  		{
  			x8 = fn_gpedd(ParsingRule[x1][0]+x3);
  			if(x8 != "")
  			{
	  			x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  			x4 += x8+"</VALUE>";
	  			G_GVS=1;
	  		}
  		}
  		break;
  	case 19:
  		{
  			x8 = fn_chart(ParsingRule[x1][0]+x3);
  			if(x8 != "")
  			{
	  			x4 += "<VALUE con_id='' con_term='' controlId='"+i+"'>";
	  			x4 += x8+"</VALUE>";
	  			G_GVS=1;
	  		}
  		}
  		break;
  	case 20:
  		{
  			x8 = document.getElementById("INPUT_"+x2+x3);
	  		if(x8 != null && x8.options)
	  		{
	  			if(x8.selectedIndex<0)
	  				break;
	  			//alert(x8.options[x8.selectedIndex].value);
	  			var data = fn_rpls4x(x8.options[x8.selectedIndex].innerText);
	  			var value = fn_rpls4x(x8.options[x8.selectedIndex].value);
	  			x4 += "<VALUE con_id='' con_term='' controlId='"+x2+"' data='"+data+"'>"+value+"</VALUE>";
	  			G_GVS=1;
	  		}
  		}
  		break;
  	case 21: 
{
  			var i=x1+1;
  			var x111=0;
  			x8 = document.getElementById("INPUT_"+x2+x3);
  			var x8_sub=document.getElementsByName("RADIO_"+x2+x3);
	  		if(x8 == null )
	  			break;
	  		if(x8_sub == null)
	  			break;
	  			  		
	  		G_GVS=1;
	  		
	  		for(var k=0; k<x8_sub.length; k++)
	  		{
	  			if(x8_sub[k].value2==null)x8_sub[k].value2="N/A";
	  			
	  			if(x8_sub[k].checked == true)
	  				x4+="<VALUE con_id='' con_term='' selectChecked='1' controlId='"+x2+"' data='"+x8_sub[k].value+"'>"+x8_sub[k].value2+"</VALUE>";
	  			else
	  				x4+="<VALUE con_id='' con_term='' selectChecked='0' controlId='"+x2+"' data='"+x8_sub[k].value+"'>"+x8_sub[k].value2+"</VALUE>";
	  		} 		

  		}
  		break;
  	case 23:
  	  	{
  			var i=x1+1;
  			var x111=0;
  			x8 = document.getElementById("INPUT_"+x2+x3);
  			var x8_sub = document.getElementsByName("CHECKBOX_"+x2+x3);  			 			
	  		if(x8 == null )
	  			break;
	  		if(x8_sub == null)
	  			break;
	  		G_GVS=1;
	  		 
	  		for(var k=0; k<x8_sub.length; k++)
	  		{	
	  			if(x8_sub[k].checked == true)
	  				x4 += "<VALUE con_id='' con_term='' selectChecked='1' controlId='"+x2+"' data='"+x8_sub[k].value+"'>"+x8_sub[k].value2+"</VALUE>";
	  			else
	  				x4 += "<VALUE con_id='' con_term='' selectChecked='0' controlId='"+x2+"' data='"+x8_sub[k].value+"'>"+x8_sub[k].value2+"</VALUE>";
	  		}		
		
  		}
  	  
  		break;
  }
  x4 += "</"+fn_gsxtn( ParsingRule[x1][2])+">";
  return x4;
}

function fn_gx4g(x1)
{
	var x2;
	var x3 = ParsingRule.length;

	if(x1 >= x3)
		return "";

  var x4 = ParsingRule[x1][4]+1;

	x2 = "\r\n<GRID";
  x2 += " con_id='"+ParsingRule[x1][5]+"'";
  x2 += " con_term='"+ParsingRule[x1][6]+"'";
  x2 += " path='"+ParsingRule[x1][1]+"'";
  x2 += " controlId='"+ParsingRule[x1][9]+"'";
   if(ParsingRule[x1][22] != null)
  	x2 += " masterSet='"+ParsingRule[x1][22]+"'>";
  else
  	x2 += ">";

  var x5, x6;
  var i, j;
  var x7 = GD_Info.length;

  for(i=0; i<x7; i++)
  {
  	if(GD_Info[i][0] == ParsingRule[x1][0])
  		break;
  }

  if( i== x7)
  	return "";
  x5 = GD_Info[i][1];
  x6 = GD_Info[i][4];

  for( i=0; i<x5; i++)
  {
  	for(j=0; j<x6; j++)
  	{
	  	var k=x1+1;
	  	G_GVS=0;
	  	var x13="<GRID_VALUESET no='"+(i*x6+j) +"'>"
	  	while(k < x3)
	  	{
	  		if(x4 > ParsingRule[k][4])
	  				break;

	  		if(x4 <= ParsingRule[k][4] && ParsingRule[k][2]==4)
	  		{
	  			var innerXml = fn_gx4ga(k, i, j);
	  			if(innerXml)
	  			x13 += innerXml;
	  		}
	  		k++;
	  	}
	  	x13 += "</GRID_VALUESET>"
	  	if(G_GVS !=0)
	  		x2 += x13;
	  }
  }
  x2 += "</"+fn_gsxtn( ParsingRule[x1][2])+">";
  return x2;
}

function fn_gxel(x1)
{
	var x2;
	var x3=ParsingRule.length;

	if(x1 >= x3)
		return "";

	var x6 = "";
	var x4 = ParsingRule[x1][4]+1;

	if(3 == ParsingRule[x1][2])
		return fn_gx4g(x1);
	else if(5 == ParsingRule[x1][2] || 10 == ParsingRule[x1][2]  || 9 == ParsingRule[x1][2])
		return fn_gsx4a(x1, ParsingRule[x1][0], "");
	for(i=x1+1; i<x3; i++)
	{
		if(x4 > ParsingRule[i][4])
			break;

		if(x4 == ParsingRule[i][4])
		{
			x6 += fn_gxel(i);
		}
	}

	if(x6 == "")
		return "";

	x2 = "\r\n<"+fn_gsxtn( ParsingRule[x1][2]);
  x2 += " con_id='"+ParsingRule[x1][5]+"'";
  x2 += " con_term='"+ParsingRule[x1][6]+"'";
  x2 += " path='"+ParsingRule[x1][1]+"'";
 
  if(ParsingRule[x1][22] != null)
  	x2 += " masterSet='"+ParsingRule[x1][22]+"'";


  if( 7 == ParsingRule[x1][2]) /* Empty Tag Empty */
  {
  	var x5 = document.getElementById("EMTAGTERM_"+ParsingRule[x1][0]);
  	if(x5 != null)
  	{
  		x2 += " em_term='"+x5.value+"'";
  		x5 = document.getElementById("EMTAGID_"+ParsingRule[x1][0]);
  		if(x5 != null)
  			x2 += " em_id='"+x5.value+"'";
  	}
  }

  x2 += " controlId='"+ParsingRule[x1][0]+"'>";
  x2 += x6 +"</"+fn_gsxtn( ParsingRule[x1][2])+">";
  return x2;
}


function GetGridStaticValue(calcType, idStr, rowNum, colNum)
{
	var realIdStr;
	var result=0;
	var rowCount=-1;
	var colCount=-1;
	var valType=-1;
	var gridId=-1;
	var i, j;
	for(i=0; i<G_V_Info.length; i++)
	{
		if(G_V_Info[i][0] == idStr)
		{
			valType = G_V_Info[i][2];
			colCount = G_V_Info[i][3];
			gridId = G_V_Info[i][1];
			break;
		}
	}
	if(valType == -1)
		return result;
	for(i=0; i<GD_Info.length; i++)
	{
		if(GD_Info[i][0] == gridId)
		{
			rowCount = GD_Info[i][1];
			break;
		}
	}
	if(rowCount <= 0)
		return result;

	if(colCount ==0)
		colCount=1;

	if(valType == 2)
	{
		rowCount = colCount;
		colCount=1;
	}

	if(rowNum >= (rowCount-1))
	{
		bMapContinue=2;
	}
	if(bMapContinue!=2)
		bMapContinue=1;


	var x30,x31,x32,x33;
	if(rowNum ==-1 && colNum==-1 )
	{
		if(calcType ==4)
			return rowCount*colCount;
		x30=rowCount-1;
		x31=colCount-1;
		x32=0;
		x33=0;
	}
	else if(rowNum ==-1)
	{
		if(calcType ==4)
			return colCount;
		x30=x32=rowNum;
		x31=colCount-1;
		x33=0;
	}
	else if(colNum==-1)
	{
		if(calcType ==4)
			return rowCount;
		x30=rowCount-1;
		x32=0;
		x31=x33=colNum;
	}
	else
	{
		if(calcType ==4)
			return 1;
		x30=x32=rowNum;
		x31=x33=colNum;
	}

	result=0;
	var x40;
	for(i=x32; i<=x30; i++)
	{
		for(j=x33; j<=x31; j++)
		{
			switch(calcType)
			{
				case 0:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 > result)
						result = x40;
					break;
				case 1:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 < result)
						result = x40;
					break;
				case 2:
				case 3:
					result += GetValue(idStr, "_"+i+"_"+j);
					break;
				case 4:
					result++;
					break;
				case 5:
					result = GetValue(idStr, "_"+i+"_"+j);;
					break;
			}
		}
	}
	if(calcType==3)
		result /= (x32*x33);
	return result;
}


function GetGridSum(x1)
{
	x1=fn_fprbc(x1);
	if(x1 <0)
		return "";
	return GetGridStaticValue(2, ParsingRule[x1][0], -1, -1);

}
function GetGridAvg(x1)
{
	x1=fn_fprbc(x1);
	if(x1 <0)
		return "";
	return GetGridStaticValue(3, ParsingRule[x1][0], -1, -1);

}
function GetGridMax(x1, x2)
{
	x1=fn_fprbc(x1);
	if(x1 <0)
		return "";
	return GetGridStaticValue(0, ParsingRule[x1][0], -1, -1);

}
function GetGridMin(x1, x2)
{
	x1=fn_fprbc(x1);
	if(x1 <0)
		return "";
	return GetGridStaticValue(1, ParsingRule[x1][0], -1, -1);

}


function SetBlobImg(idStr, val1)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return;
	x1 = BIR_INFO.length;
	var x3=0;
	for(x3=0;x3<x1;x1++)
	{
		if(BIR_INFO[x3][0] == ParsingRule[x2][0])
		{
			fn_addImg(x3, val1,3);
			return;
		}
	}
}

function SetValue(idStr, val1, id2)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	if(ParsingRule[x2][2]==10)
	{
		x4 = x2-1;
		while(x4 >=0)
		{
			if( ParsingRule[x2][4] == (ParsingRule[x4][4]+1))
			{
				if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
					x8 = findImageInputObj("APP_"+ParsingRule[pn][0]);
				else
					x8 = document.getElementById("APP_"+ParsingRule[x4][0]+id2);
				if(x8 != null)
				{
					return x8.setValueById(ParsingRule[x2][0], val1);
				}
				break;
			}
		}
		return 0;
	}

	var x8;
	switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+id2);
  		if(x8 != null)
  		{
  			if(val1.replace != null)
  				val1 = val1.replace(/\n/g, "<br>");
  			x8.innerText = ParsingRule[x2][17]+val1+ParsingRule[x2][18];
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+id2);
  		if(x8 && x8.tagName == "INPUT" && x8.value != val1)
  		{
  			x8.value=val1;
  		}
  		else if(x8.tagName != "INPUT" && x8.innerHTML != val1)
  			x8.innerHTML = val1;
  		break;
  	case 5:
	  	{
	  		var i=x2+1;
  			var x4 = -1;
  			var x5=ParsingRule.length;
  			var x6=0;
  			var x8;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]+id2);
  				if(x8)
  				{
  					var ax1Arr = val1.split(',');
  					if(ax1Arr.length>1)
  					{
  						for(var k=0;k<ax1Arr.length;k++)
  						{
		  					if((ParsingRule[i][13] != "") && (ax1Arr[k] == ParsingRule[i][13]))
		  					{
		  						x8.checked = "checked";
		  						break;
		  					}
		  					else if((ParsingRule[i][12] != "") && (ax1Arr[k] == ParsingRule[i][12]))
		  					{
		  						x8.checked = "checked";
		  						break;
		  					}
		  					else
		  						x8.checked = "";
		  				}
		  			}
		  			else
		  			{
		  				if((ParsingRule[i][13] != "") && (val1 == ParsingRule[i][13]))
	  					{
	  						x8.checked = "checked";
	  						x6++;
	  					}
	  					else if((ParsingRule[i][12] != "") && (val1 == ParsingRule[i][12]))
	  					{
	  						x8.checked = "checked";
	  						x6++;
	  					}
	  					else
	  						x8.checked = "";	
		  			}
  				}
  				i++;
  			}

	  		//if(x6 == 0)
	  		if(ParsingRule[x2][2] == 5 && x6 == 0)
  			{
  				var x9 = x8.parentElement.parentElement;
  				var x10 = x9.getElementsByTagName("OPTION");
  				for(x11=0; x11<x10.length; x11++)
  				{
  					var x12 = x10[x11].getAttribute("VALUE");
  					if(x12 == "N/A" && val1 == "N/A")
  							x10[x11].selected = "selected";
  				}
  			}
	  	}
	  	return x4;
	  	break;

  	case 6:
  	case 7:
  		{
  			/*
  			var i=x2+1;
  			var x4 = -1;
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if(ParsingRule[x2][4]+1 != ParsingRule[i][4]) {
  					if(ParsingRule[x2][4]+1 < ParsingRule[i][4]) {
  						i++;
  						continue;
  					}
  					break;
  				}
  					
  				x8 = document.getElementById(ParsingRule[i][0]+id2);
  				if(x8)
  				{
  					if((ParsingRule[i][13] != "") && (val1 == ParsingRule[i][13]))
  						x8.checked = "checked";
  					else if((ParsingRule[i][12] != "") && (val1 == ParsingRule[i][12]))
  						x8.checked = "checked";
  					else
  						x8.checked = null;
  				}
  				i++;
  			}*/
  			var i=x2+1;
  			var x4 = -1;
  			var x5=ParsingRule.length;
  			var x6=0;
  			var x8;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]+id2);
  				if(x8)
  				{
  					var ax1Arr = val1.split(',');
  					if(ax1Arr.length>1)
  					{
  						for(var k=0;k<ax1Arr.length;k++)
  						{
		  					if((ParsingRule[i][13] != "") && (ax1Arr[k].replace(" ","") == ParsingRule[i][13]))
		  					{
		  						x8.checked = "checked";
		  						break;
		  					}
		  					else if((ParsingRule[i][12] != "") && (ax1Arr[k].replace(" ","") == ParsingRule[i][12]))
		  					{
		  						x8.checked = "checked";
		  						break;
		  					}
		  					else
		  						x8.checked = "";
		  				}
		  			}
		  			else
		  			{
		  				if((ParsingRule[i][13] != "") && (val1 == ParsingRule[i][13]))
	  					{
	  						x8.checked = "checked";
	  						x6++;
	  					}
	  					else if((ParsingRule[i][12] != "") && (val1 == ParsingRule[i][12]))
	  					{
	  						x8.checked = "checked";
	  						x6++;
	  					}
	  					else
	  						x8.checked = "";	
		  			}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  			var i=x2+1;
  			var x4 ="";
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+id2);
		  	if(x8 && x8.tagName == "INPUT" ) //형광펜
	  		{
	  			x8.value=val1;
	  		}
	  		else if(x8.tagName != "INPUT")
	  			x8.innerHTML = val1;
	  		x4 = parseFloat(x8.value);
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;
  				x8 = document.getElementById(ParsingRule[i][0]+id2);
	  			if(x8 != null)
	  			{
	  				x8.selected="selected";
	  				break;
	  			}
	  			i++;
	  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+id2+"_0");
  		if(x8 != null)
  		{
  			if(val1)
  				x8.checked = "checked";
  			else
  				x8.checked = "";
  		}
  		return 0;
  		break;
  	case 11:
  		fn_SetPaintValue(x2,val1);
  		break;
  	case 12:
  		x1 = BIR_INFO.length;
			var x23=0;
			for(x23=0;x23<x1;x23++)
			{
				if(BIR_INFO[x23][0] == ParsingRule[x2][0])
				{
					if(val1.substring(0,7)==SERVERPRO)
						fn_addImg(x23, val1,2);
					else
						fn_addImg(x23, val1,0);
					break;
				}
			}
  		break;
  	case 17:
  		x8 = document.getElementById("IMG_"+ParsingRule[x2][0]+id2);
  		if(x8 !=null)
  		{
  			x8.src=val1;
  			if(val1=='')
  				x8.style.display='none';
  			else
  				x8.style.display='';
  		}
  		break;
  	case 13:
  		{
  			var i=x2-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x2][4]-1) == ParsingRule[i][4])
  					break;
  				i--;
  			}
  			if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
					x8 = findImageInputObj("APP_"+ParsingRule[pn][0]);
				else
	  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+aStr);
				if(x8 == null)
	  		{
	  			return;
	  		}
	  		x8.setValueById(ParsingRule[x2][0], val1);		  	
  		}
  		break;
  	case 22:
  		x8 = document.getElementById("IMG_"+ParsingRule[x2][0]+id2);
  		if(x8 !=null)
  		{
  			x8.src="/medios/ui/share/getImageB.jsp?qno=3&keyVal="+val1;
  			
  		}
  		break;
  }
  
  if(G_VT01 < 1 && typeof loadEventFunc == 'function') {
  	loadEventFunc(ParsingRule[x2][9], 1);
	}
	return 0;
}


function SetAddValue(idStr, val1, id2, deli)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	var x8;
	if(!deli)
		deli = ",";
	switch(ParsingRule[x2][3])
  {
  	case 1:	//BI_NUMBER
  	case 2:	//BI_SL_TEXT
  	case 3:	//BI_ML_TEXT
  	case 4:	//BI_DATE
  	case 9:	//BI_DATETIME
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+id2);
  		if(x8 != null)
  		{
			if(x8.value)
				x8.value += deli;
  			x8.value += val1;
  		}
  	break;
  }
	return 0;
}


function SetAddValue2(idStr, val1, id2)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	var x8;
	switch(ParsingRule[x2][3])
  {
  	case 1:	//BI_NUMBER
  	case 2:	//BI_SL_TEXT
  	case 3:	//BI_ML_TEXT
  	case 4:	//BI_DATE
  	case 9:	//BI_DATETIME
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+id2);
  		if(x8 != null)
  		{
  			x8.value += val1;
  		}
  	break;
  }
	return 0;
}

function GetStringValue(idStr, aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
	{
		if(G_VT01<2)
			return 0;
		var y1=G_OutXml4Attr;
		if(y1==null)
			return 0;
		var y2=y1.length;
		var y3;
		for(y3=0;y3<y2;y3++)
		{
			if(idStr==y1[y3].getAttribute("controlId"))
			{
				break;
			}
		}
		if(y3>=y2)
			return 0;
		var y4=y1[y3].getElementsByTagName("VALUE");
		var y7=y3;
		var y2=y4.length;
		var y6="";
		for(y3=0;y3<y2;y3++)
		{
			if(y6 == "")
				y6 += fn_gxtd(y4[y3]);
			else
				y6 += ", "+fn_gxtd(y4[y3]);
		}

		y4=y1[y7].getElementsByTagName("UNIT");
		y2=y4.length;
		for(y3=0;y3<y2;y3++)
		{
			y6 += " "+fn_gxtd(y4[y3]);
		}
		return y6;
	}
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
  	if(x8 != null && (x8.selected  ||x8.checked))
  	{
  		return "true";
  	}
  	return "false";
	}


  switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.innerText != "")
  		{
  			return x8.innerText;
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.tagName == "INPUT" && x8.value != "")
  		{
  			return x8.value;
  		}
  		else if(x8 && typeof x8.innerText != "undefined")
  				return x8.innerText;
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4="";
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				else
  				{
  					var x10 = ParsingRule[i][0].split('_');
  					if(x10[1] != ParsingRule[x2][0])
  					{
  						i++;
  						continue;
  					}
  				}

  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						if(x4 =="")
  							x4 += ParsingRule[i][12];
  						else
  							x4 += ", " + ParsingRule[i][12];
  					}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  		{
  			var i=x2+1;
  			var x4 ="";
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+aStr);
	  		if(x8 == null)
	  		{
	  			return x4;
	  		}
	  		else
  			{
  				if( x8.tagName == "INPUT" && ( x8.value==null || x8.value==""))
  					return x4;
  				else if(x8.tagName != "INPUT" && (typeof x8.innerText =="undefined" || x8.innerText == ""))
  					return x4;
  			}
	  		
	  		if(x8 != null && x8.tagName == "INPUT" )
	  			x4 += x8.value;
	  		else
  				x4 += x8.innerText;
  				
	  	//	x4 += x8.value;
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				else
  				{
  					var x10 = ParsingRule[i][0].split('_');
  					if(x10[1] != ParsingRule[x2][0])
  					{
  						i++;
  						continue;
  					}
  				}
  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
	  			if(x8)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 += " "+ParsingRule[i][12];
	  					return x4;
	  				}
	  			}
	  			/*if(ParsingRule[x2][4]+1 ==ParsingRule[x2+1][4])
	  			{
	  				x4 += " "+ParsingRule[x2+1][12];
	  				return x4;
	  			}*/
	  			i++;
  			}
  			return x4;
  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+aStr+"_0");
  		if(x8 != null && x8.checked)
  		{
  			return "true";
  		}
  		return "false";
  		break;
  }
	return "";
}


function GetValue(idStr, aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
	{
		if(G_VT01<2)
			return 0;
		var y1=G_OutXml4Attr;
		if(y1==null)
			return 0;
		var y2=y1.length;
		var y3;
		for(y3=0;y3<y2;y3++)
		{
			if(idStr==y1[y3].getAttribute("controlId"))
			{
				break;
			}
		}
		if(y3>=y2)
			return 0;
		var y4=y1[y3].getElementsByTagName("VALUE");
		var y2=y4.length;
		var y6="";
		for(y3=0;y3<y2;y3++)
		{
			y6 += fn_gxtd(y4[y3]);
		}
		return y6;
	}
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
	  	if(x8 != null && (x8.selected  ||x8.checked))
	  	{
	  		return 1;
	  	}
	  	return 0;
	}
	else if(ParsingRule[x2][2]==10)
	{
		x4 = x2-1;
		while(x4 >=0)
		{
			if( ParsingRule[x2][4] == (ParsingRule[x4][4]+1))
			{
				if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
					x8 = findImageInputObj("APP_"+ParsingRule[x4][0]+aStr);
				else
					x8 = document.getElementById("APP_"+ParsingRule[x4][0]+aStr);
				if(x8 != null)
				{
					return x8.getValueById(ParsingRule[x2][0]);
				}
				
				break;
			}
		}
		return 0;
	}


  switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.innerText != "")
  		{
  			return parseFloat(x8.innerText);
  		}
  		break;
  	case 3:
  	case 4:
  	 x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 && x8.tagName == "INPUT" && x8.value != "")
  		{
  			return x8.value;
  		}
  		else if(x8 &&x8.tagName != "INPUT" && x8.innerText != "")
			{
				return x8.innerText;
			}
			else
				return '';
  		break;
  	case 1:
  	case 2:
  	case 9:
  		x8 = document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr);
  		if(x8 && x8.tagName == "INPUT" && x8.value != "")
  		{
  		  autoCalcuCheckFlag = true;	
  			return parseFloat(x8.value);
  		}
  		else if(x8 &&x8.tagName != "INPUT" && x8.innerText != "")
		{
			autoCalcuCheckFlag = true;	
			return parseFloat(x8.innerText);
		}
		else
			return '';
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4=0;
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if(ParsingRule[x2][4] >= ParsingRule[i][4])
  					break;
  					
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4]) {
  					i++;
  					continue;
  				}

  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						if(ParsingRule[i][13] != "") {
  							if(isNaN(ParsingRule[i][13]))
  								x4 += ParsingRule[i][13];
  							else
  								x4 += parseFloat(ParsingRule[i][13]);
  						}
  						else if(ParsingRule[i][12] != "") {
  							if(isNaN(ParsingRule[i][12]))
  								x4 += ParsingRule[i][12];
  							else
  								x4 += parseFloat(ParsingRule[i][12]);
  						}
  						else {
  							if(isNaN(ParsingRule[i][19]))
  								x4 += ParsingRule[i][19];
  							else
  								x4 += parseFloat(ParsingRule[i][19]);
  						}
  					}
  				}
  				i++;
  			}
  		}
  		if(x4 == "")
  			x4 = 0;
  		return x4;
  		break;
  	case 8:
  		{
  			var i=x2+1;
  			var x4 =0;
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][0]+aStr);
	  		if(x8 == null || x8.value==null || x8.value=="")
	  		{
	  			return x4;
	  		}
	  		var rVal = 0;
	  		if(x8.tagName == "INPUT")
	  			rVal = x8.value;
	  		else 
	  			rVal = x8.innerText;
	  		if(rVal == "")
	  			return x4;
	  		
	  		x4 = parseFloat(rVal);
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  					break;

  				x8 = document.getElementById(ParsingRule[i][0]);
	  			if(x8)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 *= parseFloat(ParsingRule[i][13]);
	  					return x4;
	  				}
	  			}
	  			i++;
  			}
  			if(ParsingRule[x2][4]+1 ==ParsingRule[x2+1][4])
  			{
	  				x4 *= parseFloat(ParsingRule[x2+1][13]);
	  				return x4;
  			}

  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][0]+aStr+"_0");
  		if(x8 != null && x8.checked)
  		{
  			return 1;
  		}
  		return 0;
  		break;
  	case 13:
  		{
  			var i=x2-1;
  			while(i>=0)
  			{
  				if((ParsingRule[x2][4]-1) == ParsingRule[i][4])
  					break;
  			}
  			x8 = document.getElementById("APP_"+ParsingRule[i][0]+aStr);
	  		if(x8 == null)
	  		{
	  			return "";
	  		}
	  		return x8.getValueById(ParsingRule[x2][0]);
  		}
  		break;
  }
	return 0;
}


function AutoCalculationAll()
{
	var i, j;
	if(G_VT01 >= 2)
		return;
	for(i=0; i<AUTOCALC_SCRIPT.length; i++)
	{
		if(AUTOCALC_SCRIPT[i][1]=="")
			continue;
			
			/*var temp_AUTOCALC =  AUTOCALC_SCRIPT[i][1].split('+');
			//AUTOCALC_SCRIPT[i][1] = "";
			
			for(var z=0; z<temp_AUTOCALC.length; z++){
				temp_AUTOCALC[z];
				var aaa= temp_AUTOCALC[z];
				    aaa = aaa.replace(/@U1@/g, "\"");
				    aaa = aaa.replace(/@U2@/g, "\'");
				    aaa = aaa.replace(/@U3@/g, "\n");
				
				if(eval(aaa) == "" ){
					//AUTOCALC_SCRIPT[i][1] +=  temp_AUTOCALC[z] + " + ";
					AUTOCALC_SCRIPT[i][1] = AUTOCALC_SCRIPT[i][1].replace(temp_AUTOCALC[z],"");
				}
				
				
				
				/*
					if(z==temp_AUTOCALC.length -1 ){
						
						AUTOCALC_SCRIPT[i][1] += "Number("+ temp_AUTOCALC[z] + ") ";
						AUTOCALC_SCRIPT[i][1] += "@U3@"
					}else{
						AUTOCALC_SCRIPT[i][1] += "Number("+ temp_AUTOCALC[z] + ") + ";
					}
			}
			*/
			
		fn_ejs("resultData="+AUTOCALC_SCRIPT[i][1]);

		//if(AUTOCALC_SCRIPT[i][2] ==0 || parseFloat(AUTOCALC_SCRIPT[i][3]) != parseFloat(resultData))
		if(AUTOCALC_SCRIPT[i][2] ==0 || AUTOCALC_SCRIPT[i][3] != resultData)
		{
				AUTOCALC_SCRIPT[i][3] = resultData;
				var xp=fn_fprbvi(AUTOCALC_SCRIPT[i][0]);

				if((ParsingRule[xp][3]==1 || ParsingRule[xp][3]==8) && isNaN(resultData))
					resultData="";

				var x1 = "" + resultData;
				x1 = x1.split(', ');
				if(x1.length > 1 && ParsingRule[xp][3] == 7)
					SetCheckValue(AUTOCALC_SCRIPT[i][0], resultData, "");
				else
				{
					var r1 = GetValue(AUTOCALC_SCRIPT[i][0], "");  //형광펜 유지를 위해 값비교
					if(r1 != resultData)
						SetValue(AUTOCALC_SCRIPT[i][0], resultData, "");
				}
		}
	}
	for(i=0; i<AUTOCALC_SCRIPT_GRID.length; i++)
	{
		var idStr = AUTOCALC_SCRIPT_GRID[i][0];
		var gridId=0;
		var rowCount=0;
		var columnCount=0;
		var valueType=0;

		for(n=0; n< G_V_Info.length; n++)
		{
			if(G_V_Info[n][0] == idStr)
			{
				gridId = G_V_Info[n][1];
				valueType = G_V_Info[n][2];
				columnCount = G_V_Info[n][3];
				break;
			}
		}
		for(n=0; n<	GD_Info.length; n++)
		{
			if(GD_Info[n][0] == gridId)
			{
					rowCount = GD_Info[n][1];
					break;
			}
		}

		grid_rowCount = rowCount;
		if(valueType == 2)	/* Static Rotate */
		{
			for(n=0; n< G_V_Info.length; n++)
			{
				if(G_V_Info[n][1] != gridId || G_V_Info[n][2] != 4)
					continue;
				grid_idStr = G_V_Info[n][0];
				for(grid_col_idx=0; grid_col_idx < columnCount; grid_col_idx++)
				{
					if(AUTOCALC_SCRIPT_GRID[i][1]=="")
						continue;
					fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);
					if(AUTOCALC_SCRIPT_GRID[i][2] ==0 || AUTOCALC_SCRIPT_GRID[i][3] != resultData)
					{
						AUTOCALC_SCRIPT_GRID[i][3] = resultData;
						var r1 = GetValue(idStr, "_"+grid_idStr+"_"+grid_col_idx); //형광펜 유지를 위해 값비교
						if(r1 != resultData)
							SetValue(idStr, resultData, "_"+grid_idStr+"_"+grid_col_idx);
					}
				}
			}
		}
		else
		{
			for(grid_idx=0; grid_idx < rowCount; grid_idx++)
			{
				grid_col_idx=0;
				if(AUTOCALC_SCRIPT_GRID[i][1]=="")
					continue;
				fn_ejs("resultData="+AUTOCALC_SCRIPT_GRID[i][1]);

				if(AUTOCALC_SCRIPT_GRID[i][2] ==0 || AUTOCALC_SCRIPT_GRID[i][3] != resultData)
				{
					AUTOCALC_SCRIPT_GRID[i][3] = resultData;
					var r1 = GetValue(idStr, "_"+grid_idx+"_0"); //형광펜 유지를 위해 값비교
					if(r1 != resultData)
						SetValue(idStr, resultData, "_"+grid_idx+"_0");
				}
			}
		}
	}
}


var periodCount = 0;
function ProcessThreshold()
{
	var i;
	for(i=0; i< THD_NUM.length; i++)
	{
		var el = document.getElementById(THD_NUM[i][0]);
		if(el == null) continue;

		var val;
		if( el.value.length > 0)
		{
			if(isNaN(parseFloat( el.value)))
		  	val =0;
		  else
		  	val = parseFloat( el.value);
		}
		else
		{
			val =0;
		}


		if(val < THD_NUM[i][1])
		{
			el.style.background = THD_NUM[i][4];
		}
		else if( val > THD_NUM[i][2])
		{
			el.style.background = THD_NUM[i][5];
		}
		else
		{
			el.style.background = THD_NUM[i][3];
		}
	}

	for(i=0; i< THD_TXT.length; i++)
	{
		var el = document.getElementById(THD_TXT[i][0]);
		if(el == null) continue;

		var val = el.value.length;
		if(val < THD_TXT[i][1])
		{
			el.style.background = THD_TXT[i][4];
		}
		else if( val > THD_TXT[i][2])
		{
			el.style.background = THD_TXT[i][5];
		}
		else
		{
			el.style.background = THD_TXT[i][3];
		}
	}

	if(periodCount++ < 5)
		return;
	periodCount = 0;
 	for(i=0; i<ParsingRule.length; i++)
	{
		if(ParsingRule[i][3] == 4)
			CheckDateFormat(i);
		if(ParsingRule[i][3] == 9)
			CheckTimeFormat(i);

		if(ParsingRule[i][5] == '62320')
		{
			var x1 = GetStringValue(ParsingRule[i][0], "");
			var x2 = parseInt(x1) / 100000;
			if(x1.length == 6 && x2 >= 1)
			{
				x1 = x1.substring(0, 3) + "-" + x1.substring(3,6);
				SetValue(ParsingRule[i][0], x1, "");
			}
		}
		if(ParsingRule[i][5] == '62381')
		{
			var x1 = GetStringValue(ParsingRule[i][0], "");
			var y = x1.substring(0, 2);
			var m = x1.substring(2, 4);
			var d = x1.substring(4, 6);
			if(parseInt(y) < 0)
				return;
			if(parseInt(m) < 1 || parseInt(m) > 12)
				return;
			if(parseInt(d) < 1 || parseInt(d) > 31)
				return;
			x1 = x1.replace(/-/, "");
			if(x1.length == 13)
			{
				x1 = x1.substring(0, 6) + "-" + x1.substring(6, 13);
				SetValue(ParsingRule[i][0], x1, "");
			}
		}
	}
}
/*
var can_controlId;
function check()
{
for(var k=0;k<ParsingRule.length;k++){
	if(ParsingRule[k][3]=='19'){
		can_controlId = ParsingRule[k][0];
	}
}
//alert(can_controlId);

}
*/
function timer_function()
{
	if(loadingFlag == 0)
	{
		SetDateEvent(ParsingRule);
		if(typeof(fn_SetCountLimit)=="function")
			fn_SetCountLimit();
		
		SetFoldingGroup();
	}
	
	if(loadingFlag == 0 && G_VT02!=0)
	{
		if(parent && parent.clb_sd_FD)
			parent.clb_sd_FD();
		
		loadingFlag = 1;
	}
	if(bLoadingMap==1 && parent.viewType!=6)
	{
		ProcAllMap(0);
		bLoadingMap=2;
	}
	if(G_VT01>=2)
		return;
	fn_ttbd();
	fn_ttbd_g();
	AutoCalculationAll();
	ShowData();
	ProcessThreshold();
	if(typeof(timer_function) == "function")
	{
		try
		{
			setTimeout("timer_function();", g_timeExpiration);
		}
		catch(e)
		{
		}
	}
//	BK_setBodyEvent();
}


function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : -1;
}
/*
function AddLastRowInGrid(x0)
{
	if(GD_Info[x0][3]=='')
		return;
	var tbObj=document.getElementById("GRIDTB_"+GD_Info[x0][0]);
	if(tbObj==null)
		return;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3 == "" || x3==null)
			break;
	}

	var newTr = tbObj.insertRow(GD_Info[x0][1]+x2);
	if(!newTr)
		return;
	
	GD_Info[x0][1]++;
	if(isIE()>0 && isIE() < 10) {
		newTr.id = 'newid';
		var divObj = tbObj.parentElement;
		var orgStr = divObj.innerHTML;
		var rpsStr = ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1);		
		orgStr =orgStr.replace("<TR id=newid></TR>",rpsStr);
		orgStr =orgStr.replace("<tr id=\"newid\"></tr>",rpsStr);
		/*
		var aa =document.getElementById('GRIDTB_'+GD_Info[x0][0]).getElementsByTagName("TR").length;
		AddRowInGrid(document.getElementById('GRIDTB_'+GD_Info[x0][0]).getElementsByTagName("TR")[aa-1].getElementsByTagName("img")[0], GD_Info[x0][0], 0);
		
		
		divObj.innerHTML = orgStr;
	}
	else {
		newTr.outerHTML = ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1);
	}
}*/

function AddLastRowInGrid(x0)
{
	if(GD_Info[x0][3]=='')
		return;
	var tbObj=document.getElementById("GRIDTB_"+GD_Info[x0][0]);
	if(tbObj==null)
		return;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3 == "" || x3==null)
			break;
	}
	
	AddRowInGrid(x1[GD_Info[x0][1]], GD_Info[x0][0], GD_Info[x0][1]+x2);

/*
	var newTr = tbObj.insertRow(GD_Info[x0][1]+x2);
	if(!newTr)
		return;
	
	GD_Info[x0][1]++;
	if(isIE()>0 && isIE() < 10) {
		newTr.id = 'newid';
		var divObj = tbObj.parentElement;
		var orgStr = divObj.innerHTML;
		var rpsStr = ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1);
		orgStr =orgStr.replace("<TR id=newid></TR>",rpsStr);
		orgStr =orgStr.replace("<tr id=\"newid\"></tr>",rpsStr);
		divObj.innerHTML = orgStr;
	}
	else {
		newTr.outerHTML = ReplaceInsStr(GD_Info[x0][3], GD_Info[x0][1]-1);
	}
*/
}


function AddRowInGrid(imgObj, idStr, rowNum)
{
	var i;
	for(i=0; i<GD_Info.length;i++)
	{
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;
	
	var trObj = null;

	if(imgObj.tagName!='IMG' && imgObj.tagName!='BUTTON')
		trObj = imgObj;
	else
		trObj = imgObj.parentElement.parentElement;
	
	var tbObj = trObj.parentElement.parentElement;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3==null || (x3 == "" && x1[x2].innerHTML != "") )
			break;
	}
	
	var newTr = tbObj.insertRow(GD_Info[i][1]+x2);
	if(!newTr)
		return;
	
	GD_Info[i][1]++;
//	if(isIE()>0 && isIE() < 10) {
	if(true) {
		newTr.id = 'newid';
		var divObj = tbObj.parentElement;
		var orgStr = divObj.innerHTML;
		
		var rpsStr = ReplaceInsStr(GD_Info[i][3], GD_Info[i][1]-1);
		//show_debug_msg(rpsStr);

		//ie 5
		orgStr =orgStr.replace("<TR id=newid></TR>",rpsStr);

		//ie 9 ~
		orgStr =orgStr.replace("<tr id=\"newid\"></tr>",rpsStr);
		
		var valDatas = null;
		if(tbObj.rows) {
			for(var z=0; z<tbObj.rows.length; z++) {
				var tds = tbObj.rows[z].cells;
				if(!tds) continue;
				for(var z1=0; z1<tds.length; z1++) {
					if(!tds[z1].childNodes || tds[z1].childNodes.length<1) continue;

					// inputbox
					if((tds[z1].childNodes[0].nodeName=="INPUT" ) && tds[z1].childNodes[0].value) {
						if(!valDatas)
							valDatas = new Array();
						
						if("CHECK" == tds[z1].childNodes[0].id.substring(0,5)){	//boolean 
							if(tds[z1].childNodes[0].checked){
								valDatas[valDatas.length] = [tds[z1].childNodes[0].id, tds[z1].childNodes[0].value];
							}
						}else{
							valDatas[valDatas.length] = [tds[z1].childNodes[0].id, tds[z1].childNodes[0].value];
						}

					}
					
					// dropDown
					if(tds[z1].childNodes[0].nodeName=="SELECT"  && tds[z1].childNodes[0].value) {
						if(!valDatas)
							valDatas = new Array();
						valDatas[valDatas.length] = [tds[z1].childNodes[0].id, tds[z1].childNodes[0].value];
					}

					// checkbox, radio
					if(tds[z1].childNodes[0].nodeName=="SPAN") {
						if(!valDatas)
							valDatas = new Array();

						if(!tds[z1].childNodes || tds[z1].childNodes.length<1) continue;
						for(var z3=0; z3<tds[z1].childNodes.length; z3++){
							if(tds[z1].childNodes[z3].childNodes[0].checked){
								valDatas[valDatas.length] = [tds[z1].childNodes[z3].childNodes[0].id, tds[z1].childNodes[z3].childNodes[0].value];
							}
						}
					}
				}
			}
		}

		divObj.innerHTML = orgStr;

		if(valDatas) {
			for(var x=0; x<valDatas.length; x++) {
				var obj = document.getElementById(valDatas[x][0]);
				if(!obj) continue;
				if(obj.type == "radio") {
					if(obj.value == valDatas[x][1])
						obj.checked = true;
				}
				
				if(obj.type == "checkbox") {
					if(obj.value == valDatas[x][1])
						obj.checked = true;
				}
				
				else
					obj.value = valDatas[x][1];

			}
		}

		MoveUpDownGridData(GD_Info[i][0], rowNum, 1);
		SetGridInitValue(GD_Info[i][0], rowNum+1);
	}
	else {
		var rpsStr = ReplaceInsStr(GD_Info[i][3], GD_Info[i][1]-1);
		newTr.outerHTML = rpsStr;
		
		MoveUpDownGridData(GD_Info[i][0], rowNum, 1);
		SetGridInitValue(GD_Info[i][0], rowNum+1);
	}
}

function DeleteRowInGrid(imgObj, idStr, rowNum)
{
	var i;
	for(i=0; i<GD_Info.length;i++)
	{
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;
	MoveUpDownGridData(GD_Info[i][0], rowNum, 0);
	var trObj = imgObj.parentElement.parentElement;
	var tbObj = trObj.parentElement.parentElement;
	if(1==GD_Info[i][1])
	{
		SetGridInitValue(idStr, 0);
		return;
	}

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		if(x3 == "" || x3 ==null)
			break;
	}
	tbObj.deleteRow(GD_Info[i][1]+x2-1);
	GD_Info[i][1]--;
}

function ClearGrid(idStr)
{
	var i;
	for(i=0; i<GD_Info.length;i++)
	{
		if(GD_Info[i][0] == idStr)
			break;
	}
	if(i==GD_Info.length)
		return;

	var tbObj=document.getElementById("GRIDTB_"+GD_Info[i][0]);
	if(tbObj == null)
		return;

	var x1 = tbObj.getElementsByTagName("TR");
	for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		//if(x3 == "")
		if(!x3)
			break;
	}

	while(GD_Info[i][1] > 1)
	{
		tbObj.deleteRow(GD_Info[i][1]+x2-1);
		GD_Info[i][1]--;
	}
	SetGridInitValue(idStr, 0);
	return;
}


function GetMapVal(idx, cnt)
{
	var len;
	var i;

	if(DsIfInfo[idx][5]!='0')
	{
		fn_ejs("MAP_SET_VAL="+DsIfInfo[idx][7]);
		return MAP_SET_VAL;
	}

	switch(DsIfInfo[idx][3])
	{
		case 0://Constant
			return DsIfInfo[idx][6];
		case 1://Attribute
			{
				var Pn = fn_fprbc(DsIfInfo[idx][6]);
				if(Pn < 0) break;
				if(ParsingRule[Pn][2]==5)
					return GetStringValue(ParsingRule[Pn][0],"");
				if(ParsingRule[Pn][2]==4)
				{
					return GetGridStaticValue(5, ParsingRule[Pn][0],cnt,0);
				}
			}
			break;
		case 2://Empty Tag
			break;
		case 3://Request Value
			var temp = GET_REQUEST_VAL(DsIfInfo[idx][6]);
			if(temp != null)
				return temp;
			else
				return "";
			break;
		case 4://Cookie
			var idx=parseInt(DsIfInfo[idx][6]);
			if(RVInfo.length > idx)
				return RVInfo[idx];
			else
				return "";
			break;
		case 5://Concept Term
			alert(DsIfInfo[idx][6]);
			break;
		case 6://Name
			break;
	}
	return "";
}


function GetMultiCookie(cookieNo, delimeter, index)
{
	var cookieStr = GET_COOKIE_VAL(cookieNo);
	var temp = cookieStr.split(delimeter);
	if(temp.length == 0 || temp.length-1 < index || index > 9)
		return "";
	return temp[index];
}



var valString = '41804|41802|49301|49302|49304';
function GetMultiCookie1(delimeter, index)
{
	//var cookieStr = GET_COOKIE_VAL(cookieNo);
	var temp = valString.split(delimeter);
	if(temp.length == 0 || temp.length-1 < index || index > 9)
		return "";
	return temp[index];
}


var dRowCnt = 0;
var dRowHtml = null;
var dRowData = null;
function fn_drawGridRowByMapper(x0, x1, x2){
	var x3=G_V_Info.length;
	var x4;
	for(x4=0;x4<x3;x4++){
		if(ParsingRule[x0][0]==G_V_Info[x4][0])
			break;
	}
	if(x4==x3)
		return;
	var x5=x4;
	x3=GD_Info.length;
	for(x4=0;x4<x3;x4++){
		if(GD_Info[x4][0]==G_V_Info[x5][1])
			break;
	}
	if(x4==x3)
		return;
	if(x2>=GD_Info[x4][1]+dRowCnt) {		
		//var trHtml = "<tr id='newid'></tr>";
		var newTrHtml = ReplaceInsStr(GD_Info[x4][3], GD_Info[x4][1]+dRowCnt-1);
		if(!dRowHtml)
			dRowHtml = [x4, newTrHtml];
		else
			dRowHtml[1] += newTrHtml;		
		dRowCnt++;
	}
	
	if(!dRowData) dRowData = new Array();
		dRowData[dRowData.length] = [x0, x1 ,"_"+x2+"_0"];
}

function fn_drawGridByMapperData() {
	if(!dRowHtml || !dRowData)
		return;
	
	var tbObj=document.getElementById("GRIDTB_"+GD_Info[dRowHtml[0]][0]);
	if(tbObj==null)
		return;
	try {
		var divObj = tbObj.parentElement;
		var orgHtml = divObj.innerHTML;
		
		orgHtml = orgHtml.replace("</tbody></table>", "");
		orgHtml = orgHtml.replace("</TBODY></TABLE>", "");
		
		var newHtml = orgHtml += dRowHtml[1];
		newHtml += "</tbody></table>";
		divObj.innerHTML = newHtml;
		
		GD_Info[dRowHtml[0]][1] += dRowCnt;
		
		for(var i=0; i<dRowData.length; i++)
			fn_svbdv(dRowData[i][0], dRowData[i][1], dRowData[i][2]);
		
		dRowCnt = 0;
		dRowHtml = null;
		dRowData = null;
	}
	catch(e) {
		//alert(e.message);
	}
}



function fn_svbmx(x1,x20,x21)
{
	var x2=0;
	var x3=x1.getAttribute("Name");
	
	if(DsIfInfo.length>0)
	{
			for(x2=0;x2<DsIfInfo.length;x2++)
			{
				if(DsIfInfo[x2][0]==x21&&DsIfInfo[x2][1]==x3)
				{
					if(DI_ID > 0 && DI_ID != DsIfInfo[x2][9])
						continue;
					
					if(DsIfInfo[x2][5]=='0')
					{
						var x5=fn_fprbc(DsIfInfo[x2][6]);
						if(x5>=0)
						{
							if(ParsingRule[x5][2] ==5)
							{
								fn_svbdv(x5,fn_gxtd(x1),"");
							}
							else if(ParsingRule[x5][2]==4)
							{
								//fn_sgvbdv(x5, fn_gxtd(x1), xGridIndex);
								fn_drawGridRowByMapper(x5, fn_gxtd(x1), xGridIndex);
							}
						}
					}
					else
					{
						MAP_RET_VAL=fn_gxtd(x1);
						fn_ejs(DsIfInfo[x2][7]);
					}
					return;
				}
		}
	}
	
	return;
	
	for(var i=0; i<GDsIfInfo.length; i++)
	{				
		var DSArr=GDsIfInfo[i];
	
				if(	DSArr[0][0]==x21)
				{
						for(x2=0;x2<DSArr.length;x2++)
						{
							if(DSArr[x2][0]==x21&&DSArr[x2][1]==x3)
							{
								if(DI_ID > 0 && DI_ID != DSArr[x2][9])
									continue;
								
								if(DSArr[x2][5]=='0')
								{
									var x5=fn_fprbc(DSArr[x2][6]);
									if(x5>=0)
									{
										if(ParsingRule[x5][2] ==5)
										{
											fn_svbdv(x5,fn_gxtd(x1),"");
										}
										else if(ParsingRule[x5][2]==4)
										{
											fn_sgvbdv(x5, fn_gxtd(x1), xGridIndex);
										}
									}
								}
								else
								{
									MAP_RET_VAL=fn_gxtd(x1);
									fn_ejs(DSArr[x2][7]);
								}
								return;
							}
					}
				}
	}
}

var XMLINFOARRAY_NAME = new Array();
var XMLINFOARRAY_DATA = new Array();
var XMLINFOARRAY_COUNT=0;
function MakeMapOutput(x0)
{
	//alert(x0);
	var x11=0;
	var xObj=null;

	if(window.ActiveXObject)
	{
		xObj=new ActiveXObject("Microsoft.XMLDOM");
		xObj.async="false";
		xObj.loadXML(x0);
	}
	else if(window.DOMParser)
	{
	 		var parser=new DOMParser();
	 		xObj = parser.parseFromString(x0, "text/xml");
	}
	else
	{
		xObj = document.implementation.createDocument("","",null);
		xObj.load(x0);
	}
	

	if(xObj==null)
		return;
	var xDs = xObj.getElementsByTagName("OUTPUTSET");
	if(xDs == null)
		return;
	var i;
	for (i=0;i<xDs.length;i++)
    {
	  	var x13 = xDs[i].getAttribute("ds_id");
	  	var xOs = xDs[i].getElementsByTagName("OUTPUT");
	  	var j;
	  	var xfn="";
	  	G_XMLMAP_ID=x13;
	  	XMLINFOARRAY_COUNT=0;
	    for( j=0; j<xOs.length; j++)
	    {
	    	fn_svbmx(xOs[j], x11, x13);
	    	if(xOs[j].getAttribute("Name")=="FILENAME")
	    	{
	    		xfn=fn_gxtd(xOs[j]);
	    	}
	    	XMLINFOARRAY_NAME[XMLINFOARRAY_COUNT]=xOs[j].getAttribute("Name");
	    	XMLINFOARRAY_DATA[XMLINFOARRAY_COUNT]=fn_gxtd(xOs[j]);
	    	XMLINFOARRAY_COUNT++;
	    }
	    xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA"+xfn, "", 5);
	    x11++;
   }
}

function GetRecordInfo(strName)
{
	var x1;
	for(x1=0;x1<XMLINFOARRAY_COUNT;x1++)
	{
		if(XMLINFOARRAY_NAME[x1]==strName)
		{
			return XMLINFOARRAY_DATA[x1];
		}
	}
	return "";
}

function DebugMsg(x0)
{
	/*
	if(console != null && console.log != null)
		console.log(x0);
		*/
}

function AjaxUpdate(x0)
{	
	var x11=0;
	show_debug_msg(x0);

	var xObj=new ActiveXObject("Microsoft.XMLDOM");
	xObj.async="false";
	xObj.loadXML(x0);
	if(xObj==null)
	{
		return;
	}
	xGridIndex=0;
	
	var ds = xObj.getElementsByTagName("DATASET");
	
	if(ds && ds.length<1)
		return;
	var dsId = ds[0].getAttribute('id');
	var dsSeq = ds[0].getAttribute('seq');
	//alert(dsId);
	
	var xDs = xObj.getElementsByTagName("OUTPUTSET");
	
	if(xDs == null || xDs.length<=0)
	{
		var errorMsg="Mapper Error : "+x0;
		//alert(errorMsg);		
		/*if(parent.parent.showNotiBox2)
			parent.parent.showNotiBox2(errorMsg);
			
		if(parent.parent.showNotiBox)
			parent.parent.showNotiBox(errorMsg);
		*/
		var endScript = MapEndScript(dsId);
		if(endScript) {
			MAP_RET_VAL = false;
			fn_ejs(endScript);
		}
		return;
	}

	
	var i;
	var rowScript = getMapRowScript(dsId, dsSeq);
	for (i=0;i<xDs.length;i++) {
		var x13 = xDs[i].getAttribute("ds_id");
		var xOs = xDs[i].getElementsByTagName("OUTPUT");
		var j;
		
		for( j=0; j<xOs.length; j++)
			fn_svbmx(xOs[j], x11, x13);		
		
		if(rowScript) {
			MAP_RET_VAL = new Array();
			for(var k=0; k<xOs.length; k++) {
				//MAP_RET_VAL[MAP_RET_VAL.length] = fn_gxtd(xOs[k]);
				MAP_RET_VAL[MAP_RET_VAL.length] = fn_gxtd2(xOs[k]);
			}
			fn_ejs(rowScript);
		}
		
		x11++;
		xGridIndex++;
	}
	
	fn_drawGridByMapperData();
	
	var successMsg="SUCCESS!!";
	/*if(parent.parent.showNotiBox)
		parent.parent.showNotiBox(successMsg);
	*/
	var endScript = MapEndScript(dsId);
	if(endScript) {
		MAP_RET_VAL = true;
		fn_ejs(endScript);
	}
	MAP_RET_VAL = null;
}

function getMapRowScript(dsId, dsSeq) {
	var x1 = 0;
	if(DI_ID!=-1)
	{
		for(x1=0; x1<DsIfInfo.length; x1++)
		{
			if(DsIfInfo[x1][9] == DI_ID && DsIfInfo[x1][2] == 3)
					break;
		}
	}
	else
	{
		for(x1=0; x1<DsIfInfo.length; x1++) {
			if(DsIfInfo[x1][0] == dsId && DsIfInfo[x1][2] == 3)
				break;
		}
	}
	if(x1 == DsIfInfo.length)
		return null;
	
	return DsIfInfo[x1][7];
}

function MapEndScript(dsId) {
	var x1 = 0;
	for(x1=0; x1<DsIfInfo.length; x1++) {
		if(DsIfInfo[x1][0] == dsId && DsIfInfo[x1][2] == 4)
			break;
	}
	if(x1 == DsIfInfo.length)
		return null;
		
	return DsIfInfo[x1][7];
}

function fn_irdtd(x1, x2, x3, x4)
{
	var postData;
	var i;
	var d = new Date();
	var dstr = GetDateString();
	postData = "clientType=APP&requestURL=/g/common/tx&requestIds=";
	postData += "INS_BERDMRECD*0";
	postData += "&paramValue=";


	postData += "INS_BERDMRECD*0^0※";
	postData += "INS_BERDMRECD*0^"+SeqNo+"※";
	postData += "INS_BERDMRECD*0^0※";
	postData += "INS_BERDMRECD*0^"+x1+"※";
	postData += "INS_BERDMRECD*0^"+x2+"※"; /*ptid*/

	postData += "INS_BERDMRECD*0^"+x2+"※";
	postData += "INS_BERDMRECD*0^"+Cate1+"※";
	postData += "INS_BERDMRECD*0^"+Cate2+"※";
	postData += "INS_BERDMRECD*0^"+Cate3+"※";
	postData += "INS_BERDMRECD*0^"+dstr+"※";

	postData += "INS_BERDMRECD*0^"+x3+"※";
	postData += "INS_BERDMRECD*0^"+dstr+"※";
	postData += "INS_BERDMRECD*0^"+x3+"※";
	postData += "INS_BERDMRECD*0^"+dstr+"※";
	postData += "INS_BERDMRECD*0^"+x3+"※";

	postData += "INS_BERDMRECD*0^"+dstr+"※";
	postData += "INS_BERDMRECD*0^0※";
	postData += "INS_BERDMRECD*0^"+x4+"※";
	postData += "INS_BERDMRECD*0^"+recordType+"※";
	postData += "INS_BERDMRECD*0^0※";

	postData += "INS_BERDMRECD*0^"+1+"※";
	postData += "INS_BERDMRECD*0^"+Department+"※";
	postData += "INS_BERDMRECD*0^"+chos_no+"※";
	postData += "INS_BERDMRECD*0^"+paramType+"";

	postData += "&paramType=";
	for(i=0; i<24; i++)
	{
		if(i==0)
			postData +="STRING"
		else
			postData +="※STRING"
	}


	var xmlHttpReq = false;
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
    self.xmlHttpReq.open('POST', SERVERPRO+SERVERIP+":"+SERVERPORT+"/gmain", false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send(postData);

}

var ptId, doctorId, docuId, recdFileName, extFileName;
var doc_version="";
var ext_connected_recd="";
function SaveProc(x1)
{
	if(x1 != null && x1.length >=3)
	{
		if(x1.substring(0, 3) == "OK^")
		{
			if(recordType=="99")
			{
				fn_irdtd(docuId,ptId,doctorId, x1);
			}
			else if(recordType == "7")
			{
				var x2 = x1.split("^");
				return x2[1];
			}
			else
			{
				SeqNo =x1.substring(3, x1.length);
				RVInfo[10]=SeqNo;
				ProcAllMap(1);
			}
			return 1;
		}
		else
		{
			var tempX1 = new Array();
			tempX1 = x1.split("OK^");
			SeqNo =tempX1[1];
			RVInfo[10]=SeqNo;
			ProcAllMap(1);
		}
	}
	return 0;
}

function fn_hsc(x0)
{
	var x1=document.getElementById(x0);
	if(x1 ==null)
		x1=document.getElementById("INPUT_"+x0);

	if(x1 ==null)
		x1=document.getElementById("VAL_"+x0);

	if(x1 ==null)
		x1=document.getElementById("CON_"+x0);
	
	if(x1 ==null)
		x1=document.getElementById("CHECK_"+x0+"_0");

	//while(x1 != null)
	{
		//if(x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR")
		//if(x1.tagName == "TABLE")
		//if(x1.tagName == "TABLE" || x1.tagName == "TR")
		{
			//x1.style.display='none';
		}
		//x1 = x1.childNodes;
	}
	
	var childLen = x1.childNodes.length;
 	for(var i=0;i<childLen;i++)
 	{
 		while(x1.childNodes[i]!=null)
		{
	 		if(x1.childNodes[i].tagName!=undefined && x1.childNodes[i].tagName.toUpperCase()=="APPLET")
	 		{
	 			x1.childNodes[i].style.display = 'none';
	 			break;
	 		}
	 		x1 = x1.childNodes[i];
	 	}
	 }
}

function fn_shc(x0)
{
	var x1=document.getElementById(ParsingRule[x0][0]);
	if(x1 ==null)
		x1=document.getElementById("INPUT_"+ParsingRule[x0][0]);

	if(x1 ==null)
		x1=document.getElementById("VAL_"+ParsingRule[x0][0]);

	if(x1 ==null)
		x1=document.getElementById("CON_"+ParsingRule[x0][0]);
	
	if(x1 ==null)
		x1=document.getElementById("CHECK_"+ParsingRule[x0][0]+"_0");

	while(x1 != null)
	{
		//if(x1.tagName == "TABLE" || x1.tagName == "SPAN" || x1.tagName == "TR")
		//if(x1.tagName == "TABLE")
		if(x1.tagName == "TABLE" || x1.tagName == "TR")
		{
			x1.style.display='inline-block';
		}
		x1 = x1.parentElement;
	}
}

function fn_sxmvblxf(x0)
{
	var x2=G_XMLMAP_ID;
	var x1= x0.getAttribute("controlId");
	var len = DsIfInfo.length;
	var x3;
	for(x3=0;x3<len;x3++)
	{
		if(DsIfInfo[x3][0]==x2 && DsIfInfo[x3][1]==x1)
		{
			if(DsIfInfo[x3][5]=='0')
			{
				var x5=fn_fprbc(DsIfInfo[x3][6]);
				if(x5>=0)
				{
					if(ParsingRule[x5][2] ==5)
					{
						fn_svbxd(x5, x0, "");
					}
					//else if(ParsingRule[x5][2]==4)
					//	fn_sgvbdv(x5, fn_gxtd(x0), xGridIndex);
					else if(ParsingRule[x5][2] == 3)
					{
						var pn = fn_fprbc(x1);
						if(pn<0)
							continue;
						var x10 = x0.getElementsByTagName("GRID_VALUESET");
						var x11 = x0.getAttribute("controlId");
						var x12 = fn_fprbc(x11);
						var x13;
						for(x13=0; x13<GD_Info.length; x13++)
						{
							if(GD_Info[x13][0] == ParsingRule[x12][0])
								break;
						}
						if(x13 == GD_Info.length)
							return;
						var x14 = x10.length;
						var x15;
						for(x15=0; x15<x14; x15++)
						{
							var x16=x10[x15].getElementsByTagName("GRID_ATTRIBUTE");
							var x17;
							var x18 = fn_getGridRowIndexForOutput(x16, x13);
							var x19 = fn_getGridColumnIndexForOutput(x16, x13);

							if(x18 ==-1)
							 	x18 = parseInt(x15/GD_Info[x13][4]);
							if(x19 ==-1)
								x19 = parseInt(x15%GD_Info[x13][4]);
							for(x17=0;x17<x16.length;x17++)
								fn_sgvbax(x16[x17], x18, x19, 1);
						}
					}
				}
			}
			else // use_script
			{
				MAP_RET_VAL2 = "";
				if(x0.firstChild)
				{
					for(i=0; i < x0.childNodes.length ; i++)
					{
						MAP_RET_VAL2 = MAP_RET_VAL2 + x0.childNodes[i].text;
					 	if(i < x0.childNodes.length-1)
					 	{
					 		MAP_RET_VAL2 = MAP_RET_VAL2  + ", ";
					 	}
					}
				}
				fn_ejs(DsIfInfo[x3][7]);
			}
			return;
		}
	}
}


function fn_LoadMapXmlFile(x0)
{
	//alert(x0);
	var x1 = null;
	if (window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		x1.loadXML(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"));
	}
	else if(window.DOMParser)
	{
	 		var parser=new DOMParser();
	 		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"), "text/xml");
	}
	else
	{
		x1 = document.implementation.createDocument("","",null);
		x1.load(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"));
	}
	//var x1=new ActiveXObject("Microsoft.XMLDOM");
	//x1.async="false";
	//x1.loadXML(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"));
	
	if(x1==null)
		return;
	var x2 = x1.getElementsByTagName("ATTRIBUTE");
	var x5 = x2.length;
	var i, j, k;
	var x4="";
	var x3;
	for(i =0; i<x5; i++)
	{
		fn_sxmvblxf(x2[i]);
	}
	G_OutXml4Attr=x2;
	x2 = x1.getElementsByTagName("GRID");
	x5 = x2.length;
	for(i=0; i<x5; i++)
	{
		fn_sxmvblxf(x2[i]);
		//xGridIndex++;
	}
	
	var x5 = x1.getElementsByTagName("BK_HILIGHT");
}

function fn_loadSavedXml(x0)
{
	var x1=null;
	if (window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		x1.loadXML(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"));
	}
	else if(window.DOMParser)
	{
 		var parser=new DOMParser();
 		x1 = parser.parseFromString(x0, "text/xml");
	}
	else
	{
		x1 = document.implementation.createDocument("","",null);
		x1.load(x0);
	}
	
	if(x1==null)
		return;
	
	var x2 = x1.getElementsByTagName("ATTRIBUTE");
	var x5 = x2.length;
	var i, j, k;
	var x4="";
	var x3;

	fn_cav();
	for(i =0; i<x5; i++)
	{
		x3 = x2[i];
		var pn = fn_fprbc(x3.getAttribute("controlId"));
		if(pn < 0 ) continue;
		var x11 = fn_cvbax(pn, x3, "");
		if(x11 > 0) fn_shc(pn);
	}
	G_OutXml4Attr=x2;
	x2 = x1.getElementsByTagName("GRID");
	x5 = x2.length;
	for(i=0; i<x5; i++)
	{
		x3 = x2[i];
		var pn = fn_fprbc(x3.getAttribute("controlId"));
		if(pn<0) continue;
		fn_sgvbgx(pn, x3);

	}
	G_OutXml4Attr_Grid=x2;
	if(G_VT01>=2)
	{
		AutoCalc4Out();
	}
	G_OutXml4Attr=null;
	G_OutXml4Attr_Grid=null;

		
	if(extFileName!="" && extFileName!= null)
		xmlhttpPost(SERVERPRO + SERVERIP + extFileName, "", 100);
	/*
	if(G_B_AutoSave==1)
	{
		post_to_url("");
	}
	else if(G_B_AutoSave==2)
	{
		post_to_temp("");
	}
	*/
}


function xmlhttpPost(strURL, postData, mode)
{
		var xmlHttpReq = false;
    var self = this;
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
        		if(mode==0)
        		{
        			AjaxUpdate(self.xmlHttpReq.responseText);
        		}
        		else if(mode ==1)
        		{
        			fn_loadSavedXml(self.xmlHttpReq.responseText);
        		}
        		else if(mode==2)
        		{
        			return SaveProc(self.xmlHttpReq.responseText);
        		}
        		else if(mode==3)
        		{
        		}
        		else if(mode==4)
        		{
        			//alert(strURL);
        			MakeMapOutput(self.xmlHttpReq.responseText);
        		}
        		else if(mode==5)
        		{
        			alert("mode==5 : "+self.xmlHttpReq.responseText);
        		}
        		else if(mode==100)
      			{
      				//BK_loadHXml(self.xmlHttpReq.responseText);
      				LoadHighlightXML(self.xmlHttpReq.responseText);
      			}
        		return 1;
        }
    }
    if(self.xmlHttpReq == null)
    {
    	alert("Can't get the XML HTTP");
    	return;
    }
    if(postData=="")
    	self.xmlHttpReq.open('GET', strURL, false);
    else
    	self.xmlHttpReq.open('POST', strURL, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send(postData);
}

function replaceAll(str, searchStr, replaceStr) {
 while (str.indexOf(searchStr) != -1) {
  str = str.replace(searchStr, replaceStr);
 }
 return str;
}

function fn_rplsAll4xbyK(str){
	if(str.length==null)
		return str;
	//str=str.replace('<', '&lt;');
	//str=str.replace('>', '&gt;');
	//str=str.replace('\"', '&quot;');
	//str=str.replace('\'', '&apos;');
	str=replaceAll(str, '<', '&lt;');
	str=replaceAll(str, '>', '&gt;');
	str=replaceAll(str, '\"', '&quot;');
	str=replaceAll(str, '\'', '&apos;');
	return str;
}

var temp_DsIfInfo = null;

var DI_ID = -1;
function ProcMap(idx)
{
	var strXml="";
	var len = DsIfInfo.length;
	var i;
	var x1=0;
	var idStr = DsMapInfo[idx][0];
	DI_ID = (DsMapInfo[0].length > 4 && DsIfInfo[0].length > 9) ?  DsMapInfo[idx][4] : -1;
	
	strXml = "xmlData=<?xml version='1.0' encoding='euc-kr'?>";
	//strXml = "<?xml version='1.0' encoding='euc-kr'?>";
	strXml += "<DATASET id='"+idStr+"' seq='"+DI_ID+"'>";
	strXml += "<NAME>"+DsMapInfo[idx][1]+"</NAME>";
	bMapContinue=1;
	while(bMapContinue != 0)
	{
		bMapContinue=0;
		strXml += "<INPUTSET id='1'>";
		for(i=0;i<len; i++)
		{
			if(DsIfInfo[i][0] != idStr)
				continue;
			
			if(DI_ID > 0 && DI_ID != DsIfInfo[i][9])
				continue;
		
			if(DsIfInfo[i][2] ==2)
			{
				if(GetMapVal(i, x1)==0)
					return;
			}
			if(DsIfInfo[i][2] != 0)
				continue;

			var inputData = fn_rplsAll4xbyK(GetMapVal(i,x1));
			strXml += "<INPUT Name='"+DsIfInfo[i][1]+"'>"+inputData+"</INPUT>";
		}
		strXml += "</INPUTSET>";
		if(bMapContinue==2)
			break;
		x1++;
	}
	
	for(i=0; i<len; i++)
	{
		if(DsIfInfo[i][0]!=idStr)
			continue;
		
		if(DI_ID > 0 && DI_ID != DsIfInfo[i][9])
				continue;
		
		if(DsIfInfo[i][2] != 1)
			continue;
		strXml += "<OUTPUT Name='"+DsIfInfo[i][1]+"'/>";
	}
	
	
	/*
	if(temp_DsIfInfo==null)
		temp_DsIfInfo = DsIfInfo.slice();
		
	for(i=0; i<temp_DsIfInfo.length; i++)
	{
		if(temp_DsIfInfo[i][0]!=idStr)
			continue;
		if(temp_DsIfInfo[i][2] != 1)
			continue;
		strXml += "<OUTPUT Name='"+temp_DsIfInfo[i][1]+"'/>";
		
		i = DeleteArray(temp_DsIfInfo, i);
	}
	*/
	
	strXml += "</DATASET>";
	show_debug_msg(strXml);
	//strXml = "xmlData="+ToHex4Unicode(strXml);
	//alert(strXml);
	
	var urlStr = SERVERPRO+SERVERIP+"/EMR_DATA/";

	if(DsMapInfo[idx][3] ==1)
	{
		urlStr += "MAPPER_TEST_ORCL_1";
	}
	else
	{
		urlStr += "MAPPER_TEST_ORCL";
	}

	strXml = strXml.replace(/%/gi, '%25');
	strXml = strXml.replace(/&amp;/gi, '%26');
	strXml = strXml.replace(/&/gi, '%26');
	//strXml = strXml.replace(/=/gi, '%3D');

	if(G_B_AutoSave==0 && DsMapInfo[idx][2]!=2)
	{
		if(DsMapInfo[idx][2] == 1)
		{
			if(DsMapInfo[idx][3] ==1)
				xmlhttpPost_Sync(urlStr, strXml, 4);
			else{
				xmlhttpPost_Sync(urlStr, strXml, 0);
			}
		}
		else
		{
			if(DsMapInfo[idx][3] ==1)
				xmlhttpPost(urlStr, strXml, 4);
			else{
				xmlhttpPost(urlStr, strXml, 0);
			}
		}
	}
	else
	{
		if(G_B_AutoSave == 0)
		{
			if(DsMapInfo[idx][3] ==1)
				xmlhttpPost_Sync(urlStr, strXml, 4);
			else
				xmlhttpPost_Sync(urlStr, strXml, 0);
		}
		else
		{
			if(DsMapInfo[idx][3] ==1)
				xmlhttpPost(urlStr, strXml, 4);
			else
				xmlhttpPost(urlStr, strXml, 0);
		}
	}
}



/****************************************/
function ProcMapGlobal(idx)
{	
	var GDsIftemp=new Array();
	GDsIftemp=GDsIfInfo[idx];
	var strXml="";
	var len = GDsIftemp.length;
	
	var i;
	var x1=0;
	var idStr = GDsMapInfo[idx][0];
	DI_ID = (GDsMapInfo[0].length > 4 && GDsIfInfo[idx][0].length > 9) ?  GDsMapInfo[idx][4] : -1;
	
	strXml = "xmlData=<?xml version='1.0' encoding='euc-kr'?>";
	//strXml = "<?xml version='1.0' encoding='euc-kr'?>";
	strXml += "<DATASET id='"+idStr+"'>";
	strXml += "<NAME>"+GDsMapInfo[idx][1]+"</NAME>";
	bMapContinue=1;
	while(bMapContinue != 0)
	{
		bMapContinue=0;
		strXml += "<INPUTSET id='1'>";
		for(i=0;i<len; i++)
		{
			if(GDsIftemp[i][0] != idStr)
				continue;
			
			if(DI_ID > 0 && DI_ID != GDsIftemp[i][9])
				continue;
		
			if(GDsIftemp[i][2] ==2)
			{
				if(GetMapValGlb(i, x1,idx)==0)
					return;
			}
			if(GDsIftemp[i][2] != 0)
				continue;

			var inputData = fn_rplsAll4xbyK(GetMapValGlb(i,x1,idx));
			strXml += "<INPUT Name='"+GDsIftemp[i][1]+"'>"+inputData+"</INPUT>";
		}
		strXml += "</INPUTSET>";
		if(bMapContinue==2)
			break;
		x1++;
	}
	
	for(i=0; i<len; i++)
	{
		if(GDsIftemp[i][0]!=idStr)
			continue;
		
		if(DI_ID > 0 && DI_ID != GDsIftemp[i][9])
				continue;
		
		if(GDsIftemp[i][2] != 1)
			continue;
		strXml += "<OUTPUT Name='"+GDsIftemp[i][1]+"'/>";
	}
	
	

	
	strXml += "</DATASET>";
	show_debug_msg(strXml);

	var urlStr = SERVERPRO+SERVERIP+"/EMR_DATA/";

	if(GDsMapInfo[idx][3] ==1)
	{
		urlStr += "MAPPER_TEST_ORCL_1";
	}
	else
	{
		urlStr += "MAPPER_TEST_ORCL";
	}

	strXml = strXml.replace(/%/gi, '%25');
	strXml = strXml.replace(/&amp;/gi, '%26');
	strXml = strXml.replace(/&/gi, '%26');
	//strXml = strXml.replace(/=/gi, '%3D');

	if(G_B_AutoSave==0 && GDsMapInfo[idx][2]!=2)
	{
		if(GDsMapInfo[idx][2] == 1)
		{
			if(GDsMapInfo[idx][3] ==1)
				xmlhttpPost_Sync(urlStr, strXml, 4);
			else{
				xmlhttpPost_Sync(urlStr, strXml, 0);
			}
		}
		else
		{
			if(GDsMapInfo[idx][3] ==1)
				xmlhttpPost(urlStr, strXml, 4);
			else{
				xmlhttpPost(urlStr, strXml, 0);
			}
		}
	}
	else
	{
		if(G_B_AutoSave == 0)
		{
			if(GDsMapInfo[idx][3] ==1)
				xmlhttpPost_Sync(urlStr, strXml, 4);
			else
				xmlhttpPost_Sync(urlStr, strXml, 0);
		}
		else
		{
			if(GDsMapInfo[idx][3] ==1)
				xmlhttpPost(urlStr, strXml, 4);
			else
				xmlhttpPost(urlStr, strXml, 0);
		}
	}
}

///2/
function GetMapValGlb(idx, cnt,gidx)
{
	var len;
	var i;

	var GDstempInfo = new Array();
	GDstempInfo=GDsIfInfo[gidx];
	if(GDstempInfo[idx][5]!='0')
	{
		fn_ejs("MAP_SET_VAL="+GDstempInfo[idx][7]);
		return MAP_SET_VAL;
	}

	switch(GDstempInfo[idx][3])
	{
		case 0://Constant
			return GDstempInfo[idx][6];
		case 1://Attribute
			{
				var Pn = fn_fprbc(GDstempInfo[idx][6]);
				if(Pn < 0) break;
				if(ParsingRule[Pn][2]==5)
					return GetStringValue(ParsingRule[Pn][0],"");
				if(ParsingRule[Pn][2]==4)
				{
					return GetGridStaticValue(5, ParsingRule[Pn][0],cnt,0);
				}
			}
			break;
		case 2://Empty Tag
			break;
		case 3://Request Value
			var temp = GET_REQUEST_VAL(GDstempInfo[idx][6]);
			if(temp != null)
				return temp;
			else
				return "";
			break;
		case 4://Cookie
			var idx=parseInt(GDstempInfo[idx][6]);
			if(RVInfo.length > idx)
				return RVInfo[idx];
			else
				return "";
			break;
		case 5://Concept Term
			alert(GDstempInfo[idx][6]);
			break;
		case 6://Name
			break;
	}
	return "";
}
/****************************************/

function DeleteArray(arr, idx)
{
	if(arr.length <= idx || idx < 0)
		return idx;
	
	for(i=idx; i<arr.length-1; i++)
		arr[i] = arr[i+1];
	arr.pop();
	return idx-1;
}

function ProcAllMap(eventTime)
{
//	document.oncontextmenu=function(){return false;}
	
	var len = DsMapInfo.length;
	var i;
	var strXml;

	for(i=0; i<len; i++)
	{
		if(DsMapInfo[i][2] == eventTime)
		{
			strXml = ProcMap(i);
		}
	}

	if(G_B_AutoSave==1 && eventTime==0)
	{
		post_to_url("");
	}
	else if(G_B_AutoSave==2 && eventTime==0)
	{
		post_to_temp("");
	}

}


function fn_bHideGrp(x1)
{
	var x2;
	for(x2=0; x2<InstItem.length; x2++)
		if(x1 == InstItem[x2][0])
			break;
	if(x2 == InstItem.length)
		return 0;

	var x3 = document.getElementById(InstItem[x2][0]);
	if(x3 == null)
	{
		alert("It's not exist Group!!");
		return 0;
	}
	if(x3.style.display == 'none')
		return 1;
	return 0;
}

function fn_setFocus(x1)
{
	var x3;
	var x4="";
	if(ParsingRule[x1][2] ==4)
	{
		x4 = "_0_0";
	}

	x3 = document.getElementById("INPUT_"+ParsingRule[x1][0]+x4);
	if(x3 != null)
	{
		x3.style.background='#ffff99';
		x3.focus();
	}
	else
	{
		x3 = document.getElementById("VAL_"+ParsingRule[x1][0]+x4);
		if(x3 != null)
		{
			x3.style.background='#ffff99';
			x3.focus();
		}
	}
	return 1;
}


function post_to_temp(path) {
	if(SeqNo=="0^\n" || SeqNo==undefined)
		SeqNo="0";
			GroupSave();
		B_SAVE_TEMP=1;
		var count = ParsingRule.length;
		var i;

		if(B_HYUPJIN_DOC == 1)
		{
			if(!CheckMan())
				return false;
			if(!CheckManGroup())
				return false;
		}

		for(i=0;i<count; i++)
		{
			//if(fn_bHide(i)) 접힌 그룹도 확인하도록 변경
	    	//continue;
			if(ParsingRule[i][3] == 11)
			{
				fn_GetPaintValue(i);
			}
		}

		var strXmlStr = "<?xml version='1.0' encoding='UTF-16'?>";
 		strXmlStr += "<DOCUMENT docid='"+docuId+"' version='1.0' name='' Date='"+GetDateString()+"' >";
    for(i=0; i<count; i++) {
    	//if(fn_bHide(i) && ParsingRule[i][3] != 19)
    	if(ParsingRule[i][3] == 19 || (fn_bHide(i) && ParsingRule[i][2] == 9)) //image input만 그룹 열려 있는지 확인하도록 수정
	    	continue;
    	 var strXml=0;
    	 if(ParsingRule[i][2] ==3 || ParsingRule[i][2] ==5 || ParsingRule[i][2] ==10 ||  ParsingRule[i][2] ==9)
    	 {
    	 	 if(GroupSaveFlag(i)==0)
    	 		strXmlStr += fn_gxel(i);
    	 }
    }
		recordType = "0";

		
		//strXmlStr += "<SIGN>"+signStr+"</SIGN>";
		strXmlStr += "</DOCUMENT>";
		var result;
		if(G_VT02==0)
		{
			fn_svf(path, strXmlStr);
		}
		else
		{
			var flag = GET_REQUEST_VAL('saveAsFlag');
			if(flag == 1)
				SeqNo = "0";

			var xr =xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_All",
			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^0^"+ext_connected_recd+"^"+RVInfo[15]+"^"+encodeURIComponent(RVInfo[16])+"^"+RVInfo[18]
			+"&xmlData="+ToHex4Unicode(strXmlStr), 2)
			+"&accumuFlag="+accumuFlag;
			
		/*	var hlStr = BK_GetHilightStr(); //hilight data xml 생성
			if(hlStr != "")
			{
			}*/
			
			if(xr==0)
				return false;
			else 
				result = RVInfo[10];


		}

		if(G_B_AutoSave==2)
		{
			G_B_AutoSave=0;
			parent.sendData('TEMPSAVE', RVInfo[10]);
		}


		return result;
}


function GroupSave()
{
	var instCnt=InstItem.length;
	var gs_cnt=0;
	if(instCnt>0) //2015-06-18
	{
		for(var k=0; k<instCnt; k++)
		{
			if(InstItem[k][4]=='False')
			{
				var Arr=InstItem[k][3].split('/');
				GROUP_SAVE[gs_cnt]=[InstItem[k][1],Arr];
				gs_cnt++;
			}
		}
	}
}
 
function GroupSaveFlag(i)
{
	var gs_cnt=GROUP_SAVE.length;	
	var returnFlag=0;
	/*for(var k=0; k<gs_cnt; k++)
	{
		if(ParsingRule[i][9]==GROUP_SAVE[
	}*/
	for(var k=0; k<gs_cnt; k++)
	{
		var TempArr=GROUP_SAVE[k][1];
		for(var j=0; j<TempArr.length; j++)
		{
			if(TempArr[j]==ParsingRule[i][9])
				returnFlag=1;
		}		
	}
	return returnFlag;
}

var userDn = '';

/*
 클라이언트에 있는 한양대병원 인증서 모두 삭제.(삭제로직이 제대로 안되었을시)
*/
function EMR_CertBatchDel(suffix) {
	//var KMClientAX = parent.parent.KMClientAX;
	var KMClientAX = parent.KMClientAX;
	
	if(suffix != null && typeof(suffix) != 'undefined' )
		return KMClientAX.CertBatchDel(suffix);
		
	return null;
		
	
}

/*
 KMI서버에서 사용자 인증서 다운로드
*/
var testKjk = false;
function EMR_DownloadCert()
{
	//var KMClientAX = parent.parent.KMClientAX;
	var KMClientAX = parent.KMClientAX;
  	var ret, ret_dn, ret1;
  	/* kmi 서버 접속 */
  	//ret = KMClientAX.kmsConnect(document.domain, '7001');
  	var changeIp = '192.168.2.43';
  	if(document.domain.indexOf("preemrdev")==-1)
  		changeIp = '192.168.1.40';
  	ret = KMClientAX.kmsConnect(changeIp, '7001'); //개발계 KMI서버
  	if( ret == false)
	{
		alert("KMI 서버 접속 실패-[" + KMClientAX.Error_MSG() + "]");
		KMClientAX.kmsDisconnect();
		return false;
	}

	/* kmi 클라이언트 초기화 */
	ret = KMClientAX.kmsInit();
	if(ret == "")
	{
		alert("KMI 클라이언트 초기화 실패-[" + KMClientAX.Error_MSG() + "]");
		KMClientAX.kmsDisconnect();
    return false;
	}

	/* 인증서 다운로드 */
	//ret_dn = KMClientAX.GetKeyAndCert("ttttttest");
	if(testKjk)
		ret_dn = KMClientAX.GetKeyAndCert('test5');
	else
		ret_dn = KMClientAX.GetKeyAndCert(doctorId); //kjk 테스트후 변경해야함
	if(ret_dn == "")
	{
		alert("인증서 등록되어 있지 않습니다.\n의무기록팀에 문의하시기 바랍니다.");
		KMClientAX.kmsDisconnect();
    return false;
	}
	
	 //인증서 갱신 로직.
	if(testKjk)
	{
		//alert("인증서 다운로드 완료-[" + ret_dn + "]");
		userDn = ret_dn;
		
		// 건양대병원 요청으로 패스워드 입력을 받도록 추가
		//ret1 = KMClientAX.IsCertNew2(doctorId, userDn, ''); //kjk 테스트후 변경해야함
		ret1 = KMClientAX.IsCertNew('test5', userDn);
		if(ret1 == 0)             // 유효한 인증서
		{
			//alert("인증서 갱신기간이 아닙니다.");
		}
		else if(ret1 == 1)        // 갱신 및 KMI 서버 등록 완료
		{
			alert("인증서 갱신 성공 및 KMI 서버 등록 성공");
		}
		else if(ret1 == 2)        // 갱신 실패
		{
			alert("인증서 갱신 실패-" + KMClientAX.Error_MSG());
		}
		else if(ret1 == 3)
		{
			alert("인증서 갱신 완료, KMI서버등록 실패, 인증서 로컬(c:\Cert_bakup)에 백업완료");
			// 인증서 재등록 시도
			//ret = KMClientAX.SetKeyAndCert(doctorId, "","","");//kjk 테스트후 변경해야함
			ret = KMClientAX.SetKeyAndCert('test5', "","","");
	 		if(ret== "")
	   	{
	 			alert("KMI 서버에 인증서 재등록 실패-" + KMClientAX.Error_MSG());
	 		}
		}
		else if(ret1 == 4)
		{
			alert("인증서 갱신 완료, KMI서버등록 실패, 인증서 로컬(c:\Cert_bakup)에 백업 실패-" + KMClientAX.Error_MSG());
			// 인증서 재등록 시도
			//ret = KMClientAX.SetKeyAndCert(doctorId, "","",""); //kjk 테스트후 변경해야함
			ret = KMClientAX.SetKeyAndCert('test5', "","","");
	 		if(ret== "")
	   	{
	 			alert("KMI 서버에 인증서 재등록 실패-" + KMClientAX.Error_MSG());
	 		}
		}
		else if(ret1 == 5)
		{
			alert("이미 만료된 인증서");
			return false;
		}
		else if(ret1 == 6)
		{
			alert("사용자 요청에 의해 인증서 갱신이 취소 되었습니다.");
		}
		else
		{
			alert("기타에러-" + KMClientAX.Error_MSG());
		}
	}
	

	/* 접속 종료 */
	KMClientAX.kmsDisconnect();
	return true;
}

/* 로컬 PC 인증서 삭제 */
function EMR_DeleteLocal()
{
	//	var KMClientAX = parent.parent.KMClientAX;
	var KMClientAX = parent.KMClientAX;
		
		returnMsg =KMClientAX.LocalDelKeyAndCert(userDn);
		if(returnMsg== "")
		{
			//alert("KMClientAX.Error_MSG() : "+KMClientAX.Error_MSG());
		}
		else
		{
			//alert("인증서 삭제 "+returnMsg);
		}
}
var bfSignUserId = "";
function makeSign(x1)
{
	try
	{
		//x1 = "전자서명용원문입니다.";
		
		var userid = GET_COOKIE_VAL(1);
		var serial = "";
		var userdn = "";
		var certdata = "";
		var signature = "";
		
		var CertManX = parent.CertManX;
	
		//인증서 선택정보 초기화
		//if(bfSignUserId != userid)
		//	CertManX.UnSetMatchedContext();
		
		//하드디스크 인증서만 검색 (KMI에서 내려준 인증서검색)
		CertManX.SetDeviceOrder("H");
		
		//인증서 만료안내창 skip (갱신은 KMI에서 진행)
		CertManX.SetExipreCheckSkip(1);
		
		//인증서 선택 함수
		if(testKjk)
			var dn = CertManX.SetMatchedContextExt("","ou=테스트지점,ou=테스트회사,ou=테스트업종,o=SignKorea,c=KR","", 256+0+1);
		else
			var dn = CertManX.SetMatchedContextExt("","ou=EMR,ou=한양대학교병원,ou=의료,o=SignKorea,c=KR","", 256+0+1);
		//var dn = CertManX.SetMatchedContextExt("","","", 256+0+1);
		if(dn == "")
		{
			//alert("SetMatchedContextExt 실패 : ["+CertManX.GetLastErrorCode() +"]"+CertManX.GetLastErrorMsg());
			alert("취소하였습니다.");
			return '';
		}

		//전자서명 함수
		var signdata = CertManX.SignDataB64("", x1, 0);
		if(signdata == "")
		{
			alert("SignDataB64 실패 : ["+CertManX.GetLastErrorCode() +"]"+CertManX.GetLastErrorMsg());
			return '';
		}

		//서명 데이터
		//form18.t_signdata.value = CertManX.RemoveLF(signdata);

		//축약 서명
		//var signdata = CertManX.SignData_ne_B64("", x1, 1);
		//if(signdata == "")
		//{	
		//	alert( "SignData_ne_B64 실패" + CertManX.GetLastErrorCode() + CertManX.GetLastErrorMsg() );
		//	return '';
		//}
		
		var signdataVal = CertManX.RemoveLF(signdata);
		var retArr;
		try {
			var flag = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/signkorea/demon53.jsp", "t_signdata="+encodeURIComponent(signdataVal), 7);
			
			if(flag != null) {
				retArr = flag.split("*$*");
				if(retArr[0] == "OK") {
				  //인증서 데이터 DB 저장 로직
				  serial = retArr[1];
					userdn = retArr[2];
					certdata = retArr[3];
					signature = retArr[4];
					var chk = parent.selectBeramlogc(userid, serial, userdn);
					var ret;
					if(chk == null || chk == "") {
						ret = parent.insertBeramlogc(userid, serial, userdn, certdata);
						//alert(retArr + " count = " + ret);
					}
					
					var attr = " UserId='"+userid+"' Serial='"+serial+"' SubjectDN='"+userdn+"'";
					var signStr = "<SIGN "+attr+">"+signature+"</SIGN>";
					
					return signStr;
					
				}
			  else {
			    //에러메시지
			  	alert(retArr[1]);
			  	return ''
			  }
			}
			
			
		} catch(e2) {
			alert("인증서를 검증 할 수 없습니다.");
			return '';
		}

	}
	catch(e)
	{
		alert("인증서를 호출할 수 없습니다.");
		return '';
	}
}

function post_to_url(path) {
	if(SeqNo=="0^\n" || SeqNo==undefined)
		SeqNo="0";
	GroupSave();
		B_SAVE_TEMP=0;

		if(G_SSOPT == 0 && G_SAVESCRIPT != "")
			fn_ejs(G_SAVESCRIPT);

		var count = ParsingRule.length;
		var i;
		if(G_B_AutoSave==0)
		{
			if(!CheckMan())
				return false;
			if(!CheckManGroup())
				return false;
		}
		else if(G_B_AutoSave==1) {
			user_name = GET_REQUEST_VAL('USERNAME');
			var checkMand = GET_REQUEST_VAL('CHECK_MANDATORY');
			if(checkMand == '1' || checkMand == '2') {
				if(!CheckMan() || !CheckManGroup()) {
					G_B_AutoSave=0;
					parent.sendData('SAVE_FAILED', RVInfo[10]);
					return;
				}
			}
		}
		for(i=0;i<count; i++)
		{
			//if(fn_bHide(i))
	    	//continue;
			if(ParsingRule[i][3] == 11)
			{
				fn_GetPaintValue(i);
			}
		}
		var strXmlStr;
		if(G_VT02==0)
			strXmlStr = "<?xml version='1.0' encoding='EUC-KR'?>";
		else
			strXmlStr = "<?xml version='1.0' encoding='UTF-16'?>";
 		strXmlStr += "<DOCUMENT docid='"+docuId+"' version='1.0' name='' Date='"+GetDateString()+"' >";

    for(i=0; i<count; i++){
    	//if(fn_bHide(i) && ParsingRule[i][3] != 19)
    	if(ParsingRule[i][3] == 19 || (fn_bHide(i) && ParsingRule[i][2] == 9))
    		continue;
  	 	var strXml=0;
  	 	if(ParsingRule[i][2] ==3 || ParsingRule[i][2] ==5 || ParsingRule[i][2] ==10 ||  ParsingRule[i][2] ==9)
  	 	{
  	 		if(GroupSaveFlag(i)==0)
  	 			strXmlStr += fn_gxel(i);
  	 	}
    }
		recordType = "0";
		//hilight data xml 생성
		var signStr = null;
		
		/*while(1)
		{
			if(signStr)
				break;
		}*/
		
		var allDeleteFlag = EMR_CertBatchDel('ou=EMR,ou=한양대학교병원,ou=의료,o=SignKorea,c=KR');
		var downFlag = EMR_DownloadCert();
		if(downFlag)
			signStr=makeSign(strXmlStr+"</DOCUMENT>");
		EMR_DeleteLocal();
		if(!downFlag)
			return false;
		if(signStr=="" || signStr=="null" || signStr==null)
			return false;
		strXmlStr += signStr;
		strXmlStr += "</DOCUMENT>";
		
		/*
		if(!LOAD_CERT_TOOLKIT) {
			alert("서명모듈이 설치되지 않았습니다.");
			return;
		}
		var signStr=signData(strXmlStr+"</DOCUMENT>");
		if(!signStr)
			return false;
		strXmlStr += ("\r\n"+signStr+"\r\n");
		strXmlStr += "</DOCUMENT>";
		*/
		var result;
		if(G_VT02==0)
		{
			fn_svf(path, strXmlStr);
		}
		else
		{
			var flag = GET_REQUEST_VAL('saveAsFlag');
			if(flag == 1)
			{
				SeqNo = "0";
			}
			var xm=1;
			if(RVInfo[14]==1)
				xm=2;
			else if(RVInfo[14]==2)
				xm=4;
			else if(RVInfo[14]==3)
				xm=5;
			var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_All",
			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^"+xm+"^"+ext_connected_recd+"^"+RVInfo[15]+"^"+encodeURIComponent(RVInfo[16])+"^"+RVInfo[18]
			+"&xmlData="+ToHex4Unicode(strXmlStr), 2)
			+"&accumuFlag="+accumuFlag;
			
		 // BK_SaveHilight();
			
			if(xr==0)
				return false;
			else 
				result = RVInfo[10];
			
		}
		if(G_B_AutoSave==1)
		{
			G_B_AutoSave=0;
			if(GET_REQUEST_VAL('RECURSIVE')=='0')
				parent.sendRecurData('SAVE', RVInfo[10]+'_'+GET_COOKIE_VAL(13));
			else
				parent.sendData('SAVE', RVInfo[10]);
		}
		return result;
}

// 2015-10-16 추가. 서식 기록 템플릿 관련 추가 (테스트)
function post_to_template(path) {

alert("post_to_template Start!!!");
	GroupSave();
		B_SAVE_TEMP=0;

		if(G_SSOPT == 0 && G_SAVESCRIPT != "")
			fn_ejs(G_SAVESCRIPT);

		var count = ParsingRule.length;
		var i;
		if(G_B_AutoSave==0)
		{
			if(!CheckMan())
				return false;
			if(!CheckManGroup())
				return false;
		}
		else if(G_B_AutoSave==1) {
			user_name = GET_REQUEST_VAL('USERNAME');
			var checkMand = GET_REQUEST_VAL('CHECK_MANDATORY');
			if(checkMand == '1' || checkMand == '2') {
				if(!CheckMan() || !CheckManGroup()) {
					G_B_AutoSave=0;
					parent.sendData('SAVE_FAILED', RVInfo[10]);
					return;
				}
			}
		}
		for(i=0;i<count; i++)
		{
			//if(fn_bHide(i))
	    	//continue;
			if(ParsingRule[i][3] == 11)
			{
				fn_GetPaintValue(i);
			}
		}
		var strXmlStr;
		if(G_VT02==0)
			strXmlStr = "<?xml version='1.0' encoding='EUC-KR'?>";
		else
			strXmlStr = "<?xml version='1.0' encoding='UTF-16'?>";
 		strXmlStr += "<DOCUMENT docid='"+docuId+"' version='' name='' Date='"+GetDateString()+"'>";

    for(i=0; i<count; i++){
    	//if(fn_bHide(i) && ParsingRule[i][3] != 19)
    	if(ParsingRule[i][3] == 19 || (fn_bHide(i) && ParsingRule[i][2] == 9))
    		continue;
  	 	var strXml=0;
  	 	if(ParsingRule[i][2] ==3 || ParsingRule[i][2] ==5 || ParsingRule[i][2] ==10 ||  ParsingRule[i][2] ==9)
  	 	{
  	 		if(GroupSaveFlag(i)==0)
  	 			strXmlStr += fn_gxel(i);
  	 	}
    }
		recordType = "0";
		
		var signStr=makeSign(strXmlStr+"</DOCUMENT>");
		//if(signStr=="")
		//	return false;
		strXmlStr += signStr;
		strXmlStr += "</DOCUMENT>";
		
		/*
		if(!LOAD_CERT_TOOLKIT) {
			alert("서명모듈이 설치되지 않았습니다.");
			return;
		}
		var signStr=signData(strXmlStr+"</DOCUMENT>");
		if(!signStr)
			return false;
		strXmlStr += ("\r\n"+signStr+"\r\n");
		strXmlStr += "</DOCUMENT>";
		*/
		var result;
		if(G_VT02==0)
		{
			fn_svf(path, strXmlStr);
		}
		else
		{
			var flag = GET_REQUEST_VAL('saveAsFlag');
			if(flag == 1)
			{
				SeqNo = "0";
			}
			var xm=1;
			if(RVInfo[14]==1)
				xm=2;
			else if(RVInfo[14]==2)
				xm=4;
			else if(RVInfo[14]==3)
				xm=5;
			var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_Template.jsp",
			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^"+xm+"^"+ext_connected_recd+"^"+RVInfo[15]+"^"+RVInfo[16]+"^"+RVInfo[18]
			+"&xmlData="+ToHex4Unicode(strXmlStr), 2)
			+"&accumuFlag="+accumuFlag;
			if(xr==0)
				return false;
			else 
				result = RVInfo[10];
			
		}
		if(G_B_AutoSave==1)
		{



			G_B_AutoSave=0;
			if(GET_REQUEST_VAL('RECURSIVE')=='0')
				parent.sendRecurData('SAVE', RVInfo[10]+'_'+GET_COOKIE_VAL(13));
			else
				parent.sendData('SAVE', RVInfo[10]);
		}
		return result;
}

function SaveHtml() {
	var strHtml = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=euc-kr'>";
		strHtml += "<link href='"+SERVERPRO+SERVERIP+"/css/test2.css' type='text/css' rel='stylesheet'/>";
		strHtml += "<script src='"+SERVERPRO+SERVERIP+"/script/BK_COMMON_SCRIPT_PRINT.js'><";
		strHtml += "/script></head><body>";
		strHtml += document.body.innerHTML;
		strHtml += "</body></html>";
		recordType = "99";
		xmlhttpPost(SERVERPRO+SERVERIP+"/SaveRecord", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&xmlData="+ToHex4Unicode(strHtml), 2);
}

function fn_gdifv2(x1)
{

	var x3=0;
	var aStr="";

	for(x3=0;x3<x1.length;x3++)
	{
		aStr += x3+":"+x1[x3]+";\n";
		RVInfo[14+x3]=x1[x3];
	}

	if(RVInfo[17]){
		ext_connected_recd="";
		RVInfo[17];
	}
}

function fn_gdifv(x1, x2)
{
	//alert("fn_gdifv");
	show_debug_msg("fn_gdifv");
	
	ptId = x1[0];
	doctorId = x1[1];
	docuId = x1[2];
	recdFileName = x1[3];
	Department = x1[4];
	Cate1 = x1[5];
	Cate2 = x1[6];
	Cate3 = x1[7];
	paramType = x1[8];
	chos_no=x1[9];
	SeqNo = x1[10];
	doc_version = x1[19];
	G_RVIFV = x2;
	//extFileName = x1[19];
	
	if(window.document.applets.length>0)
		AppletTagCheck = 1;

	if(SeqNo == null || SeqNo == "" || SeqNo == "0")
	{
		SeqNo = "0";
		B_SAVE_UPDATE=0;
	}
	else
	{
		B_SAVE_UPDATE=1;
	}

	if(GET_REQUEST_VAL('INTERFACE') == '0')
	{
		G_B_AutoSave=1;
	}
	else if(GET_REQUEST_VAL('INTERFACE') == '1')
	{
		G_B_AutoSave=2;
	}
	var x3=0;
	for(x3=0;x3<x1.length;x3++)
		RVInfo[x3]=x1[x3];

	BK_SetSpecId();
	if(recdFileName != null && recdFileName != "0" && recdFileName != "")
	{
		fn_svfxf(recdFileName);
	}
	if(bLoadingMap==0)
		bLoadingMap=1;
	if(G_VT01 == 0)
	{
		fn_common();
		LoadingScriptOpRecord();
	}
	fn_ejs(G_DOCSCRIPT);
	if(G_VT01 == 1)
		reUseDiagnosisRecord();
	//reUseDiagnosisRecord1();
	//ProcAllMap(0);
	
//	document.oncontextmenu=function(){return false;}
	if( parent != null && typeof(parent.onloadIframe) == 'function'){
		parent.onloadIframe();
	}
	
	
}

/*상용구*/
function fn_gpdfp(filename)
{
}


function fn_rfshImg(no)
{
	var strImgArr=BIR_INFO[no][2].split('?');
	var imgStr = "";
	for(i=0; i<strImgArr.length; i++)
	{
		var iif = strImgArr[i].split('*');
		if(iif[0] == '1')
		{
			var curUrl = "";
			curUrl = SERVERIP+"/EMR_DATA";
			var y1 = iif[1];
			var y2 = y1.split(':');
			if(y2.length >= 2)
			{
				y1 = curUrl + y2[1];
				y1 = y1.replace(/\\/g, "/");

				if(imgStr != "")
					imgStr += "?";
				imgStr += SERVERPRO + y1;
			}
		}
	}

	var htmlStr="";
	var i, j=0;
	if(strImgArr.length >0)
	{
		htmlStr += "<TABLE>";
	}
	for(i=0; i<strImgArr.length; i++)
	{
		if(strImgArr[i]=="")
			continue;
		if( j == 0)
			htmlStr += "<TR>";
		j++;
		htmlStr += "<TD valign=top ";
		if((i == (strImgArr.length-1)) && (j < BIR_INFO[no][1]))
		{
			htmlStr += " colspan='"+(BIR_INFO[no][1]-j)+"'>";
		}
		else
		{
			htmlStr += ">";
		}
		if(BIR_INFO[no][3]!="-1")
		{
			if(imgStr != "")
				htmlStr += "<IMG style='border:1px solid black;' onclick=\"ShowMultiImagePopup('"+imgStr+"');\" width='"+BIR_INFO[no][3]+"px'";
			else
				htmlStr += "<IMG style='border:1px solid black;' width='"+BIR_INFO[no][3]+"px'";
		}
		else
		{
			htmlStr += "<IMG style='border:1px solid black'";
		}
		{
			var iif = strImgArr[i].split('*');
			if(iif.length <= 1)
			{
				htmlStr +=  "SRC='"+strImgArr[i]+"' onclick='ShowImagePopup("+strImgArr[i]+");'>";
			}
			else if( iif[0] =='0')
			{
				htmlStr += "SRC='"+SERVERPRO+SERVERIP+iif[1]+"' onclick='ShowImagePopup(\""+SERVERPRO+SERVERIP+iif[1]+"\");'>";
			}
			else if( iif[0] =='2')
			{
				htmlStr += "SRC='"+iif[1]+"' onclick='ShowImagePopup(\""+iif[1]+"\");'>";
			}
		}
		if(G_VT01<2)
			htmlStr += "<br><SPAN align='center'><INPUT TYPE=BUTTON VALUE='DEL' onClick='fn_clrImg("+no+","+i+");'></span></TD>";
		else
			htmlStr += "</TD>";
		if(j >= BIR_INFO[no][1] || i == (strImgArr.length-1))
		{
			j =0;
			htmlStr += "</TR>";
		}
	}
	if(strImgArr.length >0)
	{
		htmlStr += "</TABLE>";
	}
	obj = document.getElementById("IMR_"+BIR_INFO[no][0]);
	if(obj)
	{
		obj.innerHTML = htmlStr;
	}
}

function fn_addImg(no, urlStr, urlType)
{
	if(BIR_INFO[no][2] != "")
	{
		BIR_INFO[no][2] += "?";
	}
	BIR_INFO[no][2] += urlType+'*'+urlStr;
	fn_rfshImg(no);
}

function fn_clrAllImg(idx)
{
	var x1;
	for(x1=0; x1<ParsingRule.length; x1++)
	{
		if(idx == ParsingRule[x1][9])
			break;
	}
	if(x1 == ParsingRule.length)
		return;
	var x2;
	for(x2=0; x2<BIR_INFO.length; x2++)
	{
		if(ParsingRule[x1][0] == BIR_INFO[x2][0])
			break;
	}
	if(x2 == BIR_INFO.length)
		return;
	BIR_INFO[x2][2] = '';
	fn_rfshImg(x2);
}


function GetImageRegisterData(pn)
{
	var x1 = BIR_INFO.length;
	var no;
	for(no=0;no<x1;no++)
	{
		if(ParsingRule[pn][0] == BIR_INFO[no][0])
		{
			break;
		}
	}
	if(no==x1)
		return "";

	var strImgArr=BIR_INFO[no][2].split('?');
	var xmlStr="";
	for(i=0; i<strImgArr.length; i++)
	{
		if(strImgArr[i] != "")
		{
			var iif=strImgArr[i].split('*');
			var strUrl;
			if(iif.length <= 1)
			{
				strUrl = strImgArr[i];
			}
			else if( iif[0] =='0')
			{
				strUrl = SERVERPRO+SERVERIP+iif[1];
			}
			else if( iif[0] =='1')
			{
				var curUrl = "";
				if(SERVERIP == "192.168.2.55")
					curUrl = "192.168.1.101/";
				else
					curUrl = SERVERIP+"/";
				var x12=iif[1];
				var x13 = x12.split(':');
				if(x13.length >= 2)
				{
					x12 = curUrl+x13[1];
					x12 = x12.replace(/\\/g, "/");
					strUrl = SERVERPRO+x12;
				}

			}
			else if( iif[0] =='2')
			{
				strUrl = iif[1];
			}

			strUrl = SERVERPRO+SERVERIP+"/img/Bk_Root1.jpg";
			var hashStr=xmlhttpPost_Sync(strUrl, "", 6);
			hashStr = getMessageDigest(hashStr);
			xmlStr += "<VALUE con_id='' con_term='' ";
			xmlStr += "ImgHash='Algo:"+strMsgDigestAlg+",Data="+hashStr+"'>"+fn_rpls4x(strImgArr[i])+"</VALUE>";/*(O)*/
		}
	}
	return xmlStr;
}


function SetPopupValue(idStr, ar1)
{
	var x1=ParsingRule.length;
	var flag = 0;
	if(idStr.substring(0, 1) == 'R')//replace 
	{
		flag = 1;
		idStr = idStr.replace(/R/, "");
	}
	if(idStr.substring(0, 1) == 'V')
	{
		flag = 2;
		idStr = idStr.replace(/V/, "");
	}
	if(idStr.substring(0, 1) == 'D')
	{
		flag = 3;
		idStr = idStr.replace(/D/, "");
	}
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	var x8;
	if(ParsingRule[x2][2]==4)
	{

		var x3=ar1.length;
		var x4 = new Array(x3-1);
		var x5;
		var x6=0;
		for(x5=0; x5<x3; x5++)
			if(x5 != 0)
				x4[x6++] = ar1[x5];
		
		SetAddGridArrayValue(idStr, x4, 1);
		gridFlag = 0;
	}
	else if(ParsingRule[x2][2]==5)
	{
		var x3=ar1.length;
		var i = 0;
		if(flag == 1)
		{
			if(x3>0)
				SetValue(idStr, ar1[1], '');
			else
				SetValue(idStr, '0', '');
		}
		else if(flag == 2)
		{
			if(x3>0)
			{
				var temp = "";
				for(i=1; i<x3; i++)
					temp += i + ". " + ar1[i] + "\r\n";
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
		else if(flag == 3)
		{
			if(x3>0)
			{
				var temp = ar1[1];
				for(i=2; i<x3; i++)
					temp += ar1[i];
				SetAddValue2(idStr, temp, '');
			}
			else
				SetAddValue2(idStr, '0', '');
		}
		else
		{
			if(x3>0)
			{
				var temp = ar1[1];
				for(i=2; i<x3; i++)
					temp += "," + ar1[i];
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
	}
	return "";
}


function SetPopupValue1(idStr, ar1)
{
	var x1=ParsingRule.length;
	var flag = 0;
	if(idStr.substring(0, 1) == 'R')
	{
		flag = 1;
		idStr = idStr.replace(/R/, "");
	}
	if(idStr.substring(0, 1) == 'V')
	{
		flag = 2;
		idStr = idStr.replace(/V/, "");
	}
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	var x8;
	if(ParsingRule[x2][2]==4)
	{
		var x3=ar1.length;
		var x4 = new Array(x3-1);
		var x5;
		var x6=0;
		for(x5=0; x5<x3; x5++)
			if(x5 != 0)
				x4[x6++] = ar1[x5];
		/*var x3=ar1.length;
		var x4;
		for(x4=1;x4<x3;x4++)
		{
			fn_sgvbdv(x2, ar1[x4], x4-1);
		}*/
		SetAddGridArrayValue(idStr, x4, 1);
		gridFlag = 0;
	}
	else if(ParsingRule[x2][2]==5)
	{
		var x3=ar1.length;
		if(flag == 1)
		{
			if(x3>0)
				SetValue(idStr, ar1[1], '');
			else
				SetValue(idStr, '0', '');
		}
		else if(flag == 2)
		{
			if(x3>0)
			{
				var temp = "";
				for(i=1; i<x3; i++)
					temp += i + ". " + ar1[i] + "\r\n";
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
		else
		{
			if(x3>0)
			{
				var temp = ar1[1];
				for(i=2; i<x3; i++)
					temp += "," + ar1[i];
				SetAddValue(idStr, temp, '');
			}
			else
				SetAddValue(idStr, '0', '');
		}
	}
	return "";
}



function xmlhttpPost_Sync(strURL, postData, mode)
{
	var xmlHttpReq = false;
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

    if(postData=="")
    	self.xmlHttpReq.open('GET', strURL, false);
    else
    	self.xmlHttpReq.open('POST', strURL, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.send(postData);

    if (self.xmlHttpReq.readyState == 4)
    {
         //alert(self.xmlHttpReq.responseText);
    	if(mode==0)
			{
				AjaxUpdate(self.xmlHttpReq.responseText);
			}
			else if(mode ==1)
			{
				fn_loadSavedXml(self.xmlHttpReq.responseText);
			}
			else if(mode==2)
			{
				return SaveProc(self.xmlHttpReq.responseText);
			}
			else if(mode==3)
			{
				return SaveProc_Img(self.xmlHttpReq.responseText);
			}else if(mode==4)
  		{
  			//alert(strURL);
  			MakeMapOutput(self.xmlHttpReq.responseText);
  		}
			else if(mode==5)
			{
				return fn_LoadMapXmlFile(self.xmlHttpReq.responseText);
			}
			else if(mode==6)
			{
				return fn_BinToHex(self.xmlHttpReq.responseBody);
			}
			return self.xmlHttpReq.responseText;

    }
	return "";
}

function fn_SetPaintValue(pn,val1)
{
	var agent = navigator.userAgent.toLowerCase();
	var x0=document.getElementById("APP_"+ParsingRule[pn][0]);
	if(x0 == null)
		return;
	var strImgArr=val1.split('?');
	if(strImgArr.length <= 0)
		return;
	//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
	if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
	{
		for(i=0; i<strImgArr.length; i++)
		{
			if(strImgArr[i].substring(0, 7) == SERVERPRO)
				childReturn("APP_"+ParsingRule[pn][0],strImgArr[i]);
			else
				childReturn("APP_"+ParsingRule[pn][0],SERVERPRO+SERVERIP+strImgArr[i]);
		}
		mainCanDraw("APP_"+ParsingRule[pn][0]);
	}
	else
	{
		for(i=0; i<strImgArr.length; i++)
		{
			if(strImgArr[i].substring(0, 7) == SERVERPRO)
				x0.fn_sidta(strImgArr[i]);
			else
				x0.fn_sidta(SERVERPRO+SERVERIP+strImgArr[i]);
		}
	}
	//if(strImgArr.length > 0)
		//x0.fn_sidta(SERVERPRO+SERVERIP+strImgArr[0]);
}

function fn_GetPaintValue(pn)
{
	var x0;
	var agent = navigator.userAgent.toLowerCase();
	//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
	if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
		x0=findPaintObj("APP_"+ParsingRule[pn][0]);
	else
		x0=document.getElementById("APP_"+ParsingRule[pn][0]);
		
	if(x0 == null)
		return;
	try{
		var x1;
		//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
		if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
			x1=thumIdx(x0);
		else
			x1=x0.fna_gcifa();
		//alert("fna_gcifa x1 : "+x1);
  }
  catch(e){
  	return;
  }
  
	var x2,htmlCheck="0";
	var x10="";
	//alert("ParsingRule[pn][0] : "+ParsingRule[pn][0]+" / x1 : "+x1);
	for(x2=0;x2<x1;x2++)
	{
		
		var x3;
		var sFileName="";
		//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
		if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
		{
			x3=getImgData(x0,x2);
			htmlCheck ="1";
		//	sFileName = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_img_test", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3, 3);
		}
		else
		{
			x3=x0.fna_siffa(x2);
			htmlCheck ="0";
		}	
		
		if(G_VT02==0)
		{
			sFileName = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3+"&htmlCheck="+htmlCheck, 3);
		}
		else
		{
			sFileName = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/save_image", "docuId="+docuId+"&docId="+doctorId+"&ptId="+ptId+"&appedStr="+ParsingRule[pn][0]+"_"+x2+"&imgData="+x3+"&htmlCheck="+htmlCheck, 3);
		}
		
		if(x2 >0)
			 	x10 += '?';
		x10 += sFileName;
	}
	ParsingRule[pn][13]=x10;
}




function CallPopupWinFunc(idStr, urlStr, width, height)
{
	var id = idStr.split('/');//control Id
	var temp = urlStr.split('^'); //url parameter
	if(temp == null)
		return;

	var folders = temp[1];
	var temp1 = temp[0].split('|');
	var url = temp1[0];
	var popType = temp1[1];
	var param = "";
	var divisionName = "";
	var uTypeName = "";
	var lFlag = "";
	if(temp.length > 1)
	{
			param = temp[1].split('|');
			divisionName = param[0];
			uTypeName = param[1];
			lFlag = param[2];
	}

	var pid = GET_COOKIE_VAL(0);
	var pName = GET_REQUEST_VAL('pName');
	var pSex = GET_REQUEST_VAL('pSex');
	var pAge = GET_REQUEST_VAL('pAge');
	var chosNo = GET_COOKIE_VAL(9);
	//var divisionId = GET_COOKIE_VAL(4);
	//var divisionId = GET_REQUEST_VAL('uDeptCd');
	var doctorId = GET_COOKIE_VAL(1);
	var docuId = GET_COOKIE_VAL(2);
	/*
	var url = "getPopupWnd.jsp";
  var ret_val1 = window.showModalDialog(SERVERPRO+SERVERIP+"/Viewer/"+url+"?"+urlStr,
	'popup','dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	*/
	//alert(parent.uDeptCd+" / "+doctorId);
	var phrasalGubun = height;
	if(urlStr=="phrasalPopupWnd.jsp")
		phrasalGubun = (parseInt(height)+200);
	urlStr +="?uDeptCd="+parent.uDeptCd+"&doctorId="+doctorId;
	var ret_val1 = window.showModalDialog(SERVERPRO+SERVERIP+"/EMR_DATA/popup/"+urlStr,
	'popup','dialogWidth='+width+'px; dialogHeight='+phrasalGubun+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	
	
	if(ret_val1 == null){
	//alert("Returned Value is NULL");
		return;
	}
	var len = ret_val1.length < id.length ? ret_val1.length : id.length;
	var i=0;
	for(i=0; i<len; i++)
	{
		if(id[i].substring(0, 1) == '#' || id[i].substring(1, 2) == '#')
			continue;

		if(ret_val1[i].length > 1){
		ret_val1[i][1] = 	ret_val1[i][1].replace(/&amp;/g, "&");
		ret_val1[i][1] = 	ret_val1[i][1].replace(/&lt;/g, "<");
		ret_val1[i][1] = 	ret_val1[i][1].replace(/&gt;/g, ">");
		
		}
		
		SetPopupValue(id[i], ret_val1[i]);
	}
	return "";
}


function CallPopupWinFunc1(idStr, urlStr, width, height)
{
	var id = idStr.split('/');
	var temp = urlStr.split('^');
	if(temp == null)
		return;

	var folders = temp[1];
	var temp1 = temp[0].split('|');
	var url = temp1[0];
	var popType = temp1[1];
	var param = "";
	var divisionName = "";
	var uTypeName = "";
	var lFlag = "";
	if(temp.length > 1)
	{
			param = temp[1].split('|');
			divisionName = param[0];
			uTypeName = param[1];
			lFlag = param[2];
	}

	var pid = GET_COOKIE_VAL(0);
	var pName = GET_REQUEST_VAL('pName');
	var pSex = GET_REQUEST_VAL('pSex');
	var pAge = GET_REQUEST_VAL('pAge');
	var chosNo = GET_COOKIE_VAL(9);
	var divisionId = GET_COOKIE_VAL(4);
	var doctorId = GET_COOKIE_VAL(1);

	var ret_val1 = new Array();
	ret_val1[0] = ["이름", "aaaaa", "ddddd", "xxxxx"];
	ret_val1[1] = ["직장", "BKSNP", "LGCNS", "ILSAN"];
	ret_val1[2] = ["직급", "연구원", "부장", "사장"];
	ret_val1[3] = ["나이", "28", "40", "50"];

	var len = ret_val1.length < id.length ? ret_val1.length : id.length;
	var i=0;
	for(i=0; i<len; i++)
	{
		if(id[i].substring(0, 1) == '#' || id[i].substring(1, 2) == '#')
			continue;
		SetPopupValue1(id[i], ret_val1[i]);
	}
	return "";
}

function gridcheck(idStr){
	var tbObj=document.getElementById("GRIDTB_"+idStr);
	if(tbObj == null)
		return;

	var temp=tbObj.getElementsByTagName("TR").length;
	var x1 = tbObj.getElementsByTagName("TR");
	
	for(var x2=0; x2<temp-1; x2++){
		DeleteRowInGrid(document.getElementById('GRIDTB_'+idStr).getElementsByTagName("TR")[1].getElementsByTagName("img")[1], idStr, 0);
	}
	/*
	for(var x2=0; x2<temp-2; x2++){
		AddRowInGrid(document.getElementById('GRIDTB_'+idStr).getElementsByTagName("TR")[1].getElementsByTagName("img")[0], idStr, 0);
	}*/
	//document.getElementById('GRIDTB_1392').getElementsByTagName("TR")[1].getElementsByTagName("img")[0]
	
	/*for(x2=0; x2<x1.length; x2++)
	{
		var x3 = x1[x2].getAttribute("ID");
		//if(x3 == "")
		if(!x3)
			break;
	}*/
}

function SetAddGridArrayValue(idStr, ar1, type)
{
	var x1;
	var x2;
	var x3;
	for(x1=0; x1<ParsingRule.length; x1++)
		if(idStr == ParsingRule[x1][0])
			break;
	if(x1 == ParsingRule.length)
		return "";
	for(x2=0; x2<G_V_Info.length; x2++)
		if(idStr == G_V_Info[x2][0])
			break;
	if(x2 == G_V_Info.length)
		return "";
	for(x3=0; x3<GD_Info.length; x3++)
		if(G_V_Info[x2][1] == GD_Info[x3][0])
			break;
	if(x3 == GD_Info.length)
		return "";

	var x4 ="";
	if(ar1 == "" || ar1 == null)
		return;
	if(type == 0){	//String
		x4 = ar1.split('$');
	}
	else if(type == 1) //Array
		x4 = ar1;
	else
		return;

	if(x4.length < 1)
		return "";

	if(gridFlag == 1)
	{
		var x8 = CheckCurGridValRowCnt(G_V_Info[x2][0]);
		if(x8 < 0)
			return "";
		var x9;
		for(x9=0; x9<x4.length; x9++)
		{
			var x10 = x8 + x9;
			if(x10 >= GD_Info[x3][1])
				AddLastRowInGrid(x3);
			fn_svbdv(x1, x4[x9], "_"+x10+"_0");
		}
		return;
	}
	if(startFlag == 1)
	{
		CurGridRowCnt = CheckCurGridRowCnt(GD_Info[x3][0]);
		if(CurGridRowCnt < 0)
			return "";
		startFlag = 0;
	}
	var x5;
	for(x5=0;x5<x4.length;x5++)
	{
		var x7 = CurGridRowCnt+x5;
		if(x7 >= GD_Info[x3][1])
			AddLastRowInGrid(x3);
		fn_svbdv(x1,x4[x5],"_"+x7+"_0");
	}
}

function CheckCurGridValRowCnt(gvId)
{
	var x1;
	var x2;
	for(x1=0; x1<G_V_Info.length; x1++)
		if(gvId == G_V_Info[x1][0])
			break;
	if(x1 == G_V_Info.length)
		return -1;

	for(x2=0; x2<GD_Info.length; x2++)
		if(G_V_Info[x1][1] == GD_Info[x2][0])
			break;
	if(x2 == GD_Info.length)
		return -1;

	var x3;
	var rowCnt = 0;
	for(x3=0; x3<GD_Info[x2][1]; x3++)
	{
		var temp = GetStringValue(G_V_Info[x1][0], "_"+x3+"_0");
		if(temp != "")
			rowCnt = x3 + 1;
	}
	return rowCnt;
}

function CheckCurGridRowCnt(gridId)
{
	var x1;
	for(x1=0; x1<GD_Info.length; x1++)
	{
		if(gridId == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return -1;

	var x2;
	var colStr = "";
	var colCnt = 0;
	for(x2=0; x2<G_V_Info.length; x2++)
	{
		if(GD_Info[x1][0] == G_V_Info[x2][1] && G_V_Info[x2][7] != 1)
		{
			if(colCnt != 0)
				colStr += "|";
			colStr += G_V_Info[x2][0];
			colCnt++;
		}
	}
	var colArr = colStr.split('|');
	var rowCnt = 0;
	var x3;
	var x4;
	for(x3=0; x3<GD_Info[x1][1]; x3++)
	{
		var temp = "";
		for(x4=0; x4<colCnt; x4++)
			temp += GetStringValue(colArr[x4], "_"+x3+"_0");
		if(temp != "")
			rowCnt = x3 + 1;
	}
	return rowCnt;
}

function SetGridArrayValue(idStr, ar1)
{
	var x1 = ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return "";

	var x3=ar1.length;
	if(x3 == 0)
		return "";
	var x4;
	for(x4=0;x4<x3;x4++)
	{
			fn_sgvbdv(x2, ar1[x4], x4);
	}
}



function SetValueByConceptId(conceptId, valStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][5] == conceptId)
			break;
	if(x2==x1)
		return 0;

	SetValue(ParsingRule[x2][0],valStr,"");
}

function GetDate()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month < 10){
		month = "0" + parseInt(month);
	}
	var day = date.getDate();
	if(day < 10) {
		day = "0" + parseInt(day);
	}

	return year + "-" + month + "-" + day;
}

function fn_common()
{
	SetValueByConceptId(61755, GetDate());
	SetValueByConceptId(61754, GET_REQUEST_VAL('DOCNM'));
	SetValueByConceptId(62331, SERVERPRO+SERVERIP+"/img/Sn_bmp/sn"+GET_COOKIE_VAL(1)+".bmp");
}

function Show_Table(conId, flag)
{
	var x1 = InstItem.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(InstItem[x2][1] == conId)
			break;
	if(x2==x1)
		return 0;
	var x3 = document.getElementById(InstItem[x2][0]);
	if(x3 == null)
		return;

	if(flag == 0)
		x3.style.display = "none";
	else
		x3.style.display = "block";
}

function ShowEmrPopupView(docuId, hideId)
{
	var pid = GET_COOKIE_VAL(0);
	var doctorId = GET_COOKIE_VAL(1);
	var arrayFormId = docuId;
	var divisionId = GET_REQUEST_VAL('divisionId1');
	var eMRType = "E";
	var chosType = GET_REQUEST_VAL('chosType');
	var chosNo = GET_COOKIE_VAL(9);
	var arrTypeVar = "^extRecdCode|"+GET_COOKIE_VAL(10);
	//var arrayRecordId = GET_REQUEST_VAL(docuId);
	var arrayRecordId = "";
	var temp = GetValue(hideId, "");
	if(temp == null || temp == "")
		arrayRecordId = GET_REQUEST_VAL(docuId);
	else
		arrayRecordId = temp;
	var prscSqno = GET_COOKIE_VAL(13);

	//var pid = "10355264";
	//var doctorId = "110078";
	//var divisionId = "";
	//var chosType = "E";
	//var chosNo = "20110609O00142";
	var dialogWidth = 800;
	var dialogHeight = 1000;

	var urlStr = SERVERPRO + SERVERIP + ":" + SERVERPORT + "/eView/document_eView.jsp";
	//window.showModalDialog("http://192.168.2.55:80/eView/document_eView.jsp?eMRType=E&pid=10355264&doctorId=110078&chosType=E&chosNo=20110609O00142&madcrDate=&arrayFormId=28262&arrayRecordId=&exmn_rcpn_no=0&exmn_rslt_sqno=0&left=0&top=0&width=692&height=747&deptCd=12000&cpMode=N&DataSet=null&prscSqno=0", "",'dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	var ret_val = window.showModalDialog(urlStr + "?eMRType="+eMRType+"&pid="+pid+"&doctorId="+doctorId+"&chosType="+chosType+"&chosNo="+chosNo+"&arrayFormId="+arrayFormId+"&divisionId="+divisionId+"&left=0&top=0&iWidth="+dialogWidth+"&iHeight="+dialogHeight+"&arrayRecordId="+arrayRecordId+"&arrTypeVar="+arrTypeVar+"&prscSqno="+prscSqno, "",'dialogWidth='+dialogWidth+'px; dialogHeight='+dialogHeight+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	if(ret_val != null)
		SetValue(hideId, ret_val, "");
	return;
}

function fn_query(docuId)
{
	var urlStr = SERVERPRO+SERVERIP+"/dbtest1_ORACLE_55.jsp";
	var query = "SELECT CODE FROM (SELECT * FROM BERDMRECD WHERE DOC_CODE='25712' AND PTID='10548942' AND TEMPSAVE = '0' AND RECORDTYPE='0' ORDER BY MODIFY_TIME DESC) WHERE  ROWNUM<2";
	//var query = "SELECT CODE FROM (SELECT * FROM BERDMRECD WHERE DOC_CODE='"+docuId+"' AND PTID='"+pid+"' AND TEMPSAVE = '0' AND RECORDTYPE='0' ORDER BY MODIFY_TIME DESC) WHERE  ROWNUM<2";

	var response = xmlhttpPost_Sync(urlStr, "result="+query, -1);
	if(response == null || response == "")
	{
		alert("NULL");
		return "";
	}
	alert(response);
}

function ShowHtmlPopup(id, fileName)
{
	var x1=ParsingRule.length;
	for(x2=0; x2<x1; x2++)
		if(id == ParsingRule[x2][0])
			break;
	if(x2 == x1)
		return;

	var urlStr = SERVERPRO + SERVERIP + ":" + SERVERPORT + "/img/popup/" + fileName;
	var optionStr = "dialogwidth:650px; dialogHeight:750px; status:no; help:no";
	//var retVal = window.showModalDialog(urlStr, window, optionStr);
	var retVal = window.showModalDialog('../img/popup/'+fileName, window, optionStr);
	SetValue(id, retVal, "");
}


function ShowPopup(filePath)
{
	var pID = "";
	if(filePath == ""){
		pID = GET_COOKIE_VAL(0);
		filePath = "http://192.168.102.75/musescripts/museweb.dll?RetrieveTestlist?PatientID="+pID+"&Site=1";
	}
	window.open(filePath, '_blank', 'width=1200, height=1000 status:no');
}

function ShowImagePopup(filePath)
{
	var optionStr = "dialogwidth:1200px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModelessDialog(filePath, window, optionStr);
	//window.showModalDialog(filePath, window, optionStr);
	//window.open(filePath, window, optionStr);
}

function ShowMultiImagePopup(imgStr)
{
	if(imgStr == "")
		return "";
	var x1 = imgStr.split('?');
	if(x1.length < 1)
		return "";
	var popHtml = "";
	popHtml += "<TABLE>\n";
	for(x2=0; x2<x1.length; x2++)
	{
		popHtml += "<TR><TD valign=top>\n";
		popHtml += "<IMG style='border:1px solid black;' width='1200px' SRC='"+x1[x2]+"'>\n";
		popHtml += "</TD></TR>";
	}
	popHtml += "\n</TABLE>";


	var args = new Array();
	args["SOURCE"] = popHtml;
	var optionStr = "dialogwidth:1250px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModelessDialog('../img/popup/MultiImage.html', args, optionStr);
	//window.showModalDialog('../img/popup/MultiImage.html', args, optionStr);
	return;
}

function ShowPdfPopup(pdfStr)
{
	if(pdfStr == "" || pdfStr == null)
		return;
	var curUrl = "";
	if(SERVERIP == "192.168.2.55")
		curUrl = "192.168.1.101/EMR_DATA";
	else
		curUrl = SERVERIP+"/EMR_DATA";

	var x1 = pdfStr;
	var x2 = x1.split(':');
	var x3 = "";
	if(x2.length >= 2)
	{
		x1 = curUrl+x2[1];
		x1 = x1.replace(/\\/g, "/");

		x3 += SERVERPRO+x1;
	}
	else
		return "";

	var args = new Array();
	args["SRC"] = x3;

	var optionStr = "dialogwidth:1250px; dialogHeight:1000px; status:no; help:no; resizable:yes;";
	window.showModalDialog('../img/popup/PdfPopup.html', args, optionStr);
	return;
}

function show_debug()
{
	var x1 = document.getElementById('bk_debug_area');
	if(x1)
	{
		x1.style.display='block';
	}
}

function show_debug_msg(x2)
{
	var x1 = document.getElementById('bk_debug_area');
	if(x1)
	{
		x1.innerText += "\r\n==================================================================================\r\n" + x2;
	}
}


function SetMultiLineTextTableByPopup(id, urlStr, width, height, numStr, gapStr, useLine, useName)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==id)
			break;
	if(x2==x1)
		return 0;
	if(ParsingRule[x2][3] != 3)
	{
		alert("It's not Multiline-TextBox!");
		return;
	}

	var temp = urlStr.split('^');
	if(temp == null)
		return;
	var folders = temp[1];
	var temp1 = temp[0].split('|');
	var url = temp1[0];
	var popType = temp1[1];
	var param = "";
	var divisionName = "";
	var uTypeName = "";
	var lFlag = "";
	if(temp.length > 1)
	{
			param = temp[1].split('|');
			divisionName = param[0];
			uTypeName = param[1];
			lFlag = param[2];
	}

	var pid = GET_COOKIE_VAL(0);
	var pName = GET_REQUEST_VAL('pName');
	var pSex = GET_REQUEST_VAL('pSex');
	var pAge = GET_REQUEST_VAL('pAge');
	var chosNo = GET_COOKIE_VAL(9);
	//var divisionId = GET_COOKIE_VAL(4);
	var divisionId = GET_REQUEST_VAL('uDeptCd');
	var doctorId = GET_COOKIE_VAL(1);
	var docuId = GET_COOKIE_VAL(2);
	/*
  url = "getPopupWnd.jsp";
	var ret_val1 = window.showModalDialog(SERVERPRO+SERVERIP+"/Viewer/"+url+"?"+urlStr,
	'popup','dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	*/
	var ret_val1 = window.showModalDialog(SERVERPRO+SERVERIP+"/EMR_DATA/popup/"+urlStr,
	'popup','dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	
	if(ret_val1 == null){
		//alert("Returned Value is NULL");
		return;
	}
	var len = ret_val1.length;
	var columnStr = numStr.split('_');
	var len2 = columnStr.length;
	var lenStr = gapStr.split('_');
	var len3 = lenStr.length;
	if(len2 <= 0)
		return;
	if(len2 != len3)
		return;

	var i=0;
	var j=0;
	//var starFlag = 0;
	var starFlag = useName?0:1;
	var starArr = new Array();
	for(i=0; i<len2; i++)
	{
		if(columnStr[i].substring(0, 1) == '*')
		{
			starFlag = 1;
			starArr[j++] = parseInt(columnStr[i].substring(1, columnStr[i].length)) - 1;
			columnStr[i] = columnStr[i].substring(1, columnStr[i].length);
		}
	}

	var ret_val2;
	var len1;
	var maxLen = 0;
	var totalLen = 0;
	var x4 = 0;
	var x5 = 0;
	var x6 = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		for(x4=0; x4<len2; x4++)
		{
			if(x3 == columnStr[x4]-1)
			{
				ret_val2[len1] = 1;
				ret_val2[len1+1] = parseInt(lenStr[x5++]);
				break;
			}
			ret_val2[len1] = 0;
			ret_val2[len1+1] = 0;
		}
		ret_val2[len1+2] = 0;
		for(x4=0; x4<starArr.length;x4++)
		{
			if(x3 == starArr[x4])
			{
				ret_val2[len1+2] = 1;
				break;
			}
		}
		if(ret_val2[len1+1]	< 0)
		{
			ret_val2[len1+3] = ret_val2[len1+1] * -1;
			if(ret_val2[len1+2] == 0)
				totalLen += ret_val2[len1+3];
			continue;
		}
		var x7 = GetStrLength(ret_val2[0]) > GetStrLength(ret_val2[1]) ? ret_val2[0] : ret_val2[1];
		ret_val2[len1+3] = GetStrLength(x7);

		for(x4=2; x4<len1; x4++)
		{
			if(GetStrLength(ret_val2[x4]) > GetStrLength(x7))
				x7 = ret_val2[x4];
			ret_val2[len1+3] = GetStrLength(x7);
		}
		ret_val2[len1+3] = GetStrLength(x7) > ret_val2[len1+1] ? GetStrLength(x7) : ret_val2[len1+1];
		if(ret_val2[len1] == 1 && ret_val2[len1+2] == 0)
			totalLen += ret_val2[len1+3];
	}
	var starLen = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-2] == 1)
		{
			if(x3 == 0)
				starLen = ret_val2[len1-1];
			else
				starLen = starLen > ret_val2[len1-1] ? starLen : ret_val2[len1-1];
		}
	}
	totalLen = totalLen > starLen ? totalLen : starLen;

	var outputArr = new Array();
	var maxLen = 0;
	for(x3=0, x4=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-4] == 1)
		{
			outputArr[x4] = ret_val2;
			if(x4 == 0)
				maxLen = outputArr[x4].length-4;
			else
			{
				if(outputArr[x4].length-4 > maxLen)
				maxLen = outputArr[x4].length-4;
			}
			x4++;
		}
	}

	useLine = useLine?1:0;
	if(url == "operationCodeSearching.jsp")
		useLine = 0;
	totalLen = totalLen + x4 - 1;
	var x9 = document.getElementById("INPUT_"+ParsingRule[x2][0]);
  if(x9 == null)
  {
  	alert("Not Exist!");
  	return;
  }
	for(x3=0; x3<maxLen; x3++)
	{
		if(x3 == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";
			x9.value += "\r\n";
		}
		if(x3 == 0 && starFlag == 1)
			continue;
		if(x3 == 1 && starFlag == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";
			x9.value += "\r\n";
		}

		var temp = outputArr[0];
		var a = GetStrLength(temp[x3]);
		var b = temp[temp.length-1];
		var subLen = a%b == 0 ? parseInt(a/b) : parseInt(a/b)+1;
		if(x3 >= temp.length-4)
			subLen = 0;
		for(x5=1; x5<x4; x5++)
		{
			var temp1 = outputArr[x5];
			if(temp1[temp1.length-2] == 1)
				continue;
			if(x3 >= temp1.length-4)
				continue;
			a = GetStrLength(temp1[x3]);
			b = temp1[temp1.length-1];
			var cmp1 = a%b == 0 ? parseInt(a/b) : parseInt(a/b) + 1;
			subLen = subLen > cmp1 ? subLen : cmp1;
		}

		for(x5=0; x5<subLen; x5++)
		{
			for(x6=0; x6<x4; x6++)
			{
				temp = outputArr[x6];
				if(temp[temp.length-2] == 0)
				{
					var gap = "";
					if(x3 < temp.length-4)
					{
						var data = temp[x3];
						a = temp[temp.length-1];
						x9.value += GetSubString(data, a*x5, a*x5+a);
					}
					else
					{
							for(x7=0; x7<temp[temp.length-1]; x7++)
								gap += " ";
							x9.value += gap;
					}
					x9.value += " ";
				}
			}
			x9.value += "\r\n";
		}
		for(x5=0; x5<x4; x5++)
		{
			temp = outputArr[x5];
			if(temp[temp.length-2] == 1 && x3 < temp.length-4)
			{
				var data = outputArr[x5][x3];
				if(totalLen > data.length)
					x9.value += data + "\r\n";
				else
				{
					var x10 = data.length/totalLen;
					for(x7=0; x7<x10; x7++)
						x9.value += GetSubString(data, totalLen*x7, totalLen*x7+totalLen) + "\r\n";
				}
			}
		}

		if(x3 == maxLen-1 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
//				x9.value += "-";
			x9.value += "\r\n";
		}
	}
	return "";
}


function SetMultiLineTextTableByPopup1(id, urlStr, width, height, numStr, gapStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==id)
			break;
	if(x2==x1)
		return 0;
	if(ParsingRule[x2][3] != 3)
	{
		alert("It's not Multiline-TextBox!");
		return;
	}

	var temp = urlStr.split('^');
	if(temp == null)
		return;
	var folders = temp[1];
	var temp1 = temp[0].split('|');
	var url = temp1[0];

	var ret_val1 = new Array();
	ret_val1[0] = ["이름", "Ko Jungmin", "Jang 부장님", "남규희", "Kim Jaesuk"];
	ret_val1[1] = ["직급", "Project Manager", "Proect Leader", "programmer1", "programmer2"];
	ret_val1[2] = ["전화"];
	ret_val1[3] = ["나이", "45", "40", "28", "28"];
	ret_val1[4] = ["병원", "일산병원", "상계백병원", "세브란스병원", "성모병원", "서울대병원", "동국대병원"];
	ret_val1[5] = ["결과", "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"];
	ret_val1[6] = ["소견", 	"abcdefghijklmnopqrstuvwxyz", "가나다라마바사아자차카타파하", "12345678910", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];
	/*
		검사명                             결과      단위    하한    상한
	====================================================================
	Na                                           mmol/L  135     145
	--------------------------------------------------------------------
	RDW                                          %       11.3    15.5
	--------------------------------------------------------------------
	Bilirubin                                    A407
	--------------------------------------------------------------------
	CK                                           IU/L    26      140
	--------------------------------------------------------------------
	Routine CBC with diff.
	--------------------------------------------------------------------

	ret_val1[0] = ["false", "true", "true"]
	ret_val1[1] = ["검사일", "2011-08-08", "2011-08-08"];
	ret_val1[2] = ["검사명", "Na", "RDW"];
	ret_val1[3] = ["결과", "", ""];
	ret_val1[4] = ["sign", "", ""];
	ret_val1[5] = ["단위", "nmol/L", "%"];
	ret_val1[6] = ["하한", "135", "11.3"];
	ret_val1[7] = ["상한", "145", "15.5"];
	ret_val1[8] = ["진료과", "FM", "FM"];
	*/
	if(ret_val1 == null){
		//alert("Returned Value is NULL");
		return;
	}
	var len = ret_val1.length;
	var columnStr = numStr.split('_');
	var len2 = columnStr.length;
	var lenStr = gapStr.split('_');
	var len3 = lenStr.length;
	if(len2 <= 0)
		return;
	if(len2 != len3)
		return;

	var i=0;
	var j=0;
	var starFlag = 0;
	var starArr = new Array();
	for(i=0; i<len2; i++)
	{
		if(columnStr[i].substring(0, 1) == '*')
		{
			starFlag = 1;
			starArr[j++] = parseInt(columnStr[i].substring(1, columnStr[i].length)) - 1;
			columnStr[i] = columnStr[i].substring(1, columnStr[i].length);
		}
	}

	var ret_val2;
	var len1;
	var maxLen = 0;
	var totalLen = 0;
	var x4 = 0;
	var x5 = 0;
	var x6 = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		//사용여부
		for(x4=0; x4<len2; x4++)
		{
			if(x3 == columnStr[x4]-1)
			{
				ret_val2[len1] = 1;
				ret_val2[len1+1] = parseInt(lenStr[x5++]);
				break;
			}
			ret_val2[len1] = 0;
			ret_val2[len1+1] = 0;
		}
		//'*' 유무
		ret_val2[len1+2] = 0;
		for(x4=0; x4<starArr.length;x4++)
		{
			if(x3 == starArr[x4])
			{
				ret_val2[len1+2] = 1;
				break;
			}
		}
		//column 당 넓이
		if(ret_val2[len1+1]	< 0)
		{
			ret_val2[len1+3] = ret_val2[len1+1] * -1;
			if(ret_val2[len1+2] == 0)
				totalLen += ret_val2[len1+3];
			continue;
		}
		var x7 = GetStrLength(ret_val2[0]) > GetStrLength(ret_val2[1]) ? ret_val2[0] : ret_val2[1];
		ret_val2[len1+3] = GetStrLength(x7);

		for(x4=2; x4<len1; x4++)
		{
			if(GetStrLength(ret_val2[x4]) > GetStrLength(x7))
				x7 = ret_val2[x4];
			ret_val2[len1+3] = GetStrLength(x7);
		}
		ret_val2[len1+3] = GetStrLength(x7) > ret_val2[len1+1] ? GetStrLength(x7) : ret_val2[len1+1];
		if(ret_val2[len1] == 1 && ret_val2[len1+2] == 0)
			totalLen += ret_val2[len1+3];
	}
	//totalLen
	var starLen = 0;
	for(x3=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-2] == 1)
		{
			if(x3 == 0)
				starLen = ret_val2[len1-1];
			else
				starLen = starLen > ret_val2[len1-1] ? starLen : ret_val2[len1-1];
		}
	}
	totalLen = totalLen > starLen ? totalLen : starLen;

	var outputArr = new Array();
	var maxLen = 0;
	for(x3=0, x4=0; x3<len; x3++)
	{
		ret_val2 = ret_val1[x3];
		len1 = ret_val2.length;
		if(ret_val2[len1-4] == 1)
		{
			outputArr[x4] = ret_val2;
			if(x4 == 0)
				maxLen = outputArr[x4].length-4;
			else
			{
				if(outputArr[x4].length-4 > maxLen)
				maxLen = outputArr[x4].length-4;
			}
			x4++;
		}
	}

	var useLine = 1;
	if(url == "operationCodeSearching.jsp")
		useLine = 0;

	totalLen = totalLen + x4 - 1;
	var x9 = document.getElementById("INPUT_"+ParsingRule[x2][0]);
  if(x9 == null)
  {
  	alert("Not Exist!");
  	return;
  }
	for(x3=0; x3<maxLen; x3++)
	{
		if(x3 == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";
			x9.value += "\r\n";
		}
		if(x3 == 0 && starFlag == 1)
			continue;
		if(x3 == 1 && starFlag == 0 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";
			x9.value += "\r\n";
		}

		var temp = outputArr[0];
		var a = GetStrLength(temp[x3]);
		var b = temp[temp.length-1];
		var subLen = a%b == 0 ? parseInt(a/b) : parseInt(a/b)+1;
		if(x3 >= temp.length-4)
			subLen = 0;
		for(x5=1; x5<x4; x5++)
		{
			var temp1 = outputArr[x5];
			if(temp1[temp1.length-2] == 1)
				continue;
			if(x3 >= temp1.length-4)
				continue;
			a = GetStrLength(temp1[x3]);
			b = temp1[temp1.length-1];
			var cmp1 = a%b == 0 ? parseInt(a/b) : parseInt(a/b) + 1;
			subLen = subLen > cmp1 ? subLen : cmp1;
		}

		for(x5=0; x5<subLen; x5++)
		{
			for(x6=0; x6<x4; x6++)
			{
				temp = outputArr[x6];
				if(temp[temp.length-2] == 0)
				{
					var gap = "";
					if(x3 < temp.length-4)
					{
						var data = temp[x3];
						a = temp[temp.length-1];
						x9.value += GetSubString(data, a*x5, a*x5+a);
					}
					else
					{
							for(x7=0; x7<temp[temp.length-1]; x7++)
								gap += " ";
							x9.value += gap;
					}
					x9.value += " ";
				}
			}
			x9.value += "\r\n";
		}
		for(x5=0; x5<x4; x5++)
		{
			temp = outputArr[x5];
			if(temp[temp.length-2] == 1 && x3 < temp.length-4)
			{
				//x9.value += "<" + outputArr[x5][0] + ">\r\n";//Title
				var data = outputArr[x5][x3];
				if(totalLen > data.length)
					x9.value += data + "\r\n";
				else
				{
					var x10 = data.length/totalLen;
					for(x7=0; x7<x10; x7++)
						x9.value += GetSubString(data, totalLen*x7, totalLen*x7+totalLen) + "\r\n";
				}
			}
		}

		if(x3 == maxLen-1 && useLine == 1)
		{
			for(i=0; i<totalLen; i++)
				x9.value += "-";
			x9.value += "\r\n";
		}
	}
	return "";
}

function GetStrLength(str)
{
	var temp =""+str;
  var len = 0;
  for (x1=0; x1<temp.length; x1++)
  	len += (temp.charCodeAt(x1) > 128) ? 2 : 1;
  return len;
}


function GetSubStr(str, len)
{
	var temp = 0;
	var x1 = 0;
	for(; x1<str.length; x1++)
	{
		temp += (str.charCodeAt(i) > 128) ? 2 : 1;
		if(temp > len)
			return str.substring(i, x1);
	}
	return str;
}


function GetSubString(str, start, end)
{
	if(str == null)
		return "";
	var temp = new Array();
	var data = "";
	var len = str.length;
	if(len < 0 || start < 0 || start > end)
		return "";
	var len1 = 0;
	for(x1=0; x1<len; x1++)
	{
		if(str.charCodeAt(x1) > 128)
		{
			temp[len1++] = str.substring(x1, x1+1);
			temp[len1++] = "";
		}
		else
			temp[len1++] = str.substring(x1, x1+1);
	}
	if(start >= len1)
	{
		for(x1=start; x1<end; x1++)
			data += " ";
		return data;
	}
	if(end > len1)
	{
		for(x1=start; x1<len1; x1++)
			data += temp[x1];
		for(x1=len1; x1<end; x1++)
			data += ' ';
		return data;
	}
	for(x1=start; x1<end; x1++)
		data += temp[x1];
	return data;
}


//var TEMP_RVIFV = "DY|20110701$20110702$20110703^NM|Kim$Nam$jang^HM|1000$1030$1100";
//var TEMP_RVIFV = "DY|20110627$20110627^NM|Hot Pack^HM|1030$1030^DEPTCD|72250^DOCNM|testmd";
//var TEMP_RVIFV = "abc|^sickBed|병상^treatmentDept|진료과^treatmentDiv|진료구분^opDay|수술일^opDept|수술과^opSurgeon|집도의^stepDoc1|제1보조의^stepDoc2|제2보조의^stepDoc3|제3보조의^nurse1|소득간호사^nurse2|순환간호사^anesthesiaDoc|마취의^anesthesiaMethod|마취방법^preOpName|수술전진단명^postOpName|수술후진단명^opName|수술명^useBiopsy|유^useDrain|무^spongeCnt|유^opFlag|0^abc";
//var TEMP_RVIFV = "DY|2011-10-14^NM|Complex OT(Pediatric)^USER_NM|김선미^HM|14:00^MM|30^dob|19441126^memo|";
var TEMP_RVIFV = "DY|2011-10-14^NM|Complex OT(Pediatric)^USER_NM|김선미^HM|14:00^MM|30^dob|19441126^memo|^prscSqno|41804$41802$49301$49302$49304^AUTHENTICATE|1";
function GET_REQUEST_VAL1(valueName)
{
	if(TEMP_RVIFV == null || TEMP_RVIFV == "")
		return "";
	var x1 = TEMP_RVIFV.split('^');
	if(x1.length < 1)
		return;
for(i=0; i<x1.length; i++)
	{
		var x2 = x1[i].split('|');
		if(x2.length != 2)
			continue;
		if(x2[0] == valueName)
		{
			if(x2[1] == "")
				return "";
			var x3 = x2[1].split('$');
			if(x3.length < 1)
				return "";
			return x2[1];
		}
	}
	return "";
}


function LoadingScriptOpRecord()
{
	var flag = GET_REQUEST_VAL('opFlag');
	if(flag == 0)
		return;

	SetValueByConceptId(62033, GET_REQUEST_VAL('sickBed'));
	SetValueByConceptId(62027, GET_REQUEST_VAL('treatmentDept'));
	SetValueByConceptId(161550, GET_REQUEST_VAL('treatmentDiv'));
	SetValueByConceptId(5206, GET_REQUEST_VAL('opDay'));
	SetValueByConceptId(62035, GET_REQUEST_VAL('opDept'));
	SetValueByConceptId(62031, GET_REQUEST_VAL('opSurgeon'));
	SetValueByConceptId(62028, GET_REQUEST_VAL('stepDoc1'));
	SetValueByConceptId(62029, GET_REQUEST_VAL('stepDoc2'));
	SetValueByConceptId(62030, GET_REQUEST_VAL('stepDoc3'));
	SetValueByConceptId(60781, GET_REQUEST_VAL('nurse1'));
	SetValueByConceptId(62032, GET_REQUEST_VAL('nurse2'));
	SetValueByConceptId(60779, GET_REQUEST_VAL('anesthesiaDoc'));
	SetValueByConceptId(4798, GET_REQUEST_VAL('anesthesiaMethod'));
	SetValueByConceptId(60783, GET_REQUEST_VAL('preOpName'));
	SetValueByConceptId(60785, GET_REQUEST_VAL('postOpName'));
	SetValueByConceptId(24, GET_REQUEST_VAL('opName'));
	SetValueByConceptId(60379, GET_REQUEST_VAL('useBiopsy'));
	SetValueByConceptId(60381, GET_REQUEST_VAL('useDrain'));
	SetValueByConceptId(5994, GET_REQUEST_VAL('spongeCnt'));
}


function reUseDiagnosisRecord()
{
	var flag = GET_REQUEST_VAL('saveAsFlag');
	if(flag != 1)
		return;

	SetValueByConceptId(62378, GET_REQUEST_VAL('ipDtOfPr')); // 발행일
	SetValueByConceptId(62329, GET_REQUEST_VAL('ipIntLic')); // 전문의 번호
	SetValueByConceptId(62327, GET_REQUEST_VAL('ipDocLic')); // 의사면허번호
	SetValueByConceptId(62325, GET_REQUEST_VAL('ipDocNm'));  // 의사명
	//SetValueByConceptId(62331, GET_REQUEST_VAL('ipDocSig')); // 의사서명
	SetValueByConceptId(62377, GET_REQUEST_VAL('ipDeptCd')); // 진료과, 전문과목

	var x1;
	for(x1=0; x1<ParsingRule.length; x1++)
	{
		if(62331 == ParsingRule[x1][5])
			break;
}
	if(x1 != ParsingRule.length)
	{
		var docId = GET_COOKIE_VAL(1);
		var val1 = SERVERPRO + SERVERIP + "/img/Sn_bmp/sn"+docId+".bmp";
		//var val1 = "http://192.168.2.55/img/Sn_bmp/sn"+docId+".bmp";

		var x2 = document.getElementById("IMG_"+ParsingRule[x1][0]);
		if(x2 != null)
{
			x2.src='';
			x2.src=val1;
			if(val1=='')
				x2.style.display='none';
			else
				x2.style.display='';
		}
	}

	var temp = "발행일 : " + GET_REQUEST_VAL('ipDtOfPr') + "\n전문의 번호 : " + GET_REQUEST_VAL('ipIntLic') +
							"\n의사면허번호 : " + GET_REQUEST_VAL('ipDocLic') + "\n의사명 : " + GET_REQUEST_VAL('ipDocNm') +
							"\n진료과, 전문과목 : " + GET_REQUEST_VAL('ipDeptCd');
	show_debug_msg(temp);
}


	var r_showDataCount=0;
function ShowData()
{
 var x1 = C_D_Info.length;
 if(x1 < 1) return;
 var x2 = C_V_Info.length;
 for(var x4=0; x4<x1; x4++)
 {
 	
   for(var x5=0; x5<x2; x5++)
   {
    if((C_D_Info[x4][0] != C_V_Info[x5][0]))
     continue;
    if(r_showDataCount==0)
    {
     var x3 = ParsingRule.length;
     var x101=0;
     var x102=C_V_Info[x5][5];
     var x103=C_V_Info[x5][6];
     var x104=C_V_Info[x5][7];
     C_V_Info[x5][5]=-1;
     C_V_Info[x5][6]=-1;
     C_V_Info[x5][7]=-1;
      for(var x6=0; x6<x3; x6++)
     {
      if(x102 == ParsingRule[x6][9]) //x_axis
       {
        C_V_Info[x5][5]=x6;
        x101++;
       }
       else if(x103 == ParsingRule[x6][9]) //y_axis
       {
        C_V_Info[x5][6]=x6;
        x101++;
       }
       else if(x104 == ParsingRule[x6][9]) //y_axis(min)
       {
        C_V_Info[x5][7]=x6;
        x101++;
       }
     if(x101>=3) break;       
      }
    }     
     var value_x=C_V_Info[x5][9][0];
     var value_y=C_V_Info[x5][9][1];
     var value_y2=C_V_Info[x5][9][2];
     if(value_x=='' || value_y=='' || value_y2=='')
     {
     for(var x6=5;x6<=7;x6++)
      {
       if(C_V_Info[x5][x6]<0) continue;
       var x101=ParsingRule[C_V_Info[x5][x6]];
       var value_xy='';
       if(x101[2] == 5) //Value
           value_xy = GetValue(x101[0], "");
       else if(x101[2] == 4) //Grid
       { 
          var x7 = GetGridStringValue(x101[0], ',');         
          var x8;
          for(x8=0; x8<x7.length; x8++)
          {
          	if(!x7[x8])
          	 continue;
            if(x8 != 0)
             value_xy += ',';
             var tempXY;
             if(x7[x8])
             	tempXY = parseFloat(x7[x8]);
             else
             	tempXY = x7[x8];
             value_xy += tempXY;
          }
          
          if(C_G_DATA && C_G_DATA.length > 0)
          {
          	var z1=0;
       			for(; z1<C_G_DATA.length; z1++) {
       				if(C_V_Info[x5][2] == C_G_DATA[z1][0] && x101[9] == C_G_DATA[z1][1])
       					break;
       			}
       			if(z1 < C_G_DATA.length) {
       				if(C_G_DATA[z1][3] == 'time') {
       					value_xy = '';
       					for(x8=0; x8<x7.length; x8++) {
       						if(x8 != 0)
       							value_xy += ',';
       						var z3 = x7[x8];
       						if(z3=='') {
       							value_xy += z3;
       							continue;
       						}
       						
       						var tArr = z3.split(':');
       						z3 = Number(tArr[0]);
       						if(tArr.length>1) {
       							var z4 = parseInt(tArr[1]/60*100);
       							z3 += z4/100;
       						}
       						var z2 = z3-Number(C_G_DATA[z1][2]);
       						if(z2<0)
       							z2 = 24+z2;
       						
       						value_xy += z2;
       					}
       				}
       			}
       		}
       }
       if(x6==5)
        value_x=value_xy;
       else if(x6==6)
        value_y=value_xy;
       else if(x6==7)
        value_y2=value_xy;
      }
     }
     var obj;
     if(HtmlCanObjCheck && HtmlCtxCheck && AppletTagCheck==0 && AppletInfo.length>0)
     	obj = findChartObj('a_'+C_D_Info[x4][0]);
     else
     	obj = document.getElementById('a_'+C_D_Info[x4][0]);
     if(obj==null) return;
      if(C_V_Info[x5][10] != value_x + "%" + value_y + "%" + value_y2)
      {
        obj.setFunctionGraph(value_x, value_y, value_y2, C_V_Info[x5][8]);
        C_V_Info[x5][10] = value_x + "%" + value_y + "%" + value_y2;
      }
    }
  }
  r_showDataCount=1;
}

function ShowImageData(id, imgName)
{
	var x1;
	var idStr = "";
	for(x1=0; x1<InstItem.length; x1++)
	{
		if(id == InstItem[x1][0])
			break;
	}
	if(x1 != InstItem.length)
		idStr = "CAP_" + id + "_1";
	else
		idStr = "VAL_" + id;

	var newObj = document.getElementById(idStr);
	if(newObj == null)
		return;

	var y_pos = document.body.clientTop + GetObjectTop(newObj) - document.body.scrollTop;
	var x_pos = document.body.clientLeft + GetObjectLeft(newObj) -  document.body.scrollLeft;
	if(imgName == '*')
		imgName = newObj.innerHTML + ".jpg";

	newObj.style.cursor="hand";
	newObj.attachEvent("onmouseover", function(){
		ShowImage(newObj, imgName, x_pos, y_pos);
	});
	newObj.attachEvent("onmouseout", function() {
		CloseImage('img_popup');
	});
}

function ShowImage(obj, imgName, x_pos, y_pos)
{
	var parentObj = obj;

	childObj = document.createElement('div');
	childObj.setAttribute('id', 'img_popup');
	childObj.innerHTML = "<IMG src='../img/img_popup/"+imgName+"'>";
	childObj.style.zIndex =100;
	childObj.style.border="1 solid black";
	childObj.style.top=y_pos+20;
	childObj.style.left=x_pos+20;
	childObj.style.position="absolute";
	parentObj.appendChild(childObj);
}

function CloseImage(obj)
{
	var delObj = document.getElementById(obj);
	if(delObj == null)
		return;
	delObj.removeNode(true);
}

function GetObjectTop(obj)
{
	if (obj.offsetParent == document.body)
		return obj.offsetTop;
	else
		return obj.offsetTop + GetObjectTop(obj.offsetParent);
}

function GetObjectLeft(obj)
{
	if (obj.offsetParent == document.body)
		return obj.offsetLeft;
	else
		return obj.offsetLeft + GetObjectLeft(obj.offsetParent);
}


function freeRadio(x1)
{
	if(x1.checked == true)
		x1.checked = false;
}

function AddGridArrayData(arr, addArr, rowNum) {
	//GetGridData 로 가져온 데이터에 배열 데이터를 원하는 Row에 추가해주는 함수
	//arr : 원본 데이터(Double Array)
	//addArr : 추가할 데이터(Double Array)
	//rowNum : Array의 추가하고픈 row number
	//return : Double Array
	if(!arr)
		return addArr;
	if(!addArr)
		return arr;
	
	if(arr.length != addArr.length)
		return arr;
	var retData = new Array();
	if(rowNum >= arr.length) {
		for(var i=0; i<arr.length; i++) {
			retData[i]  = arr[i].slice(0);
			for(var j=0; j<addArr[i].length; j++)
				retData[i][retData[i].length] = addArr[i][j];
		}
		return retData;
	}
	
	for(var i=0; i<arr.length; i++) {
		retData[i] = new Array();
		for(var j=0, k=0; k<arr[i].length; j++) {
			if(rowNum == j) {
				for(var z=0; z<addArr[i].length; z++)
					retData[i][retData[i].length] = addArr[i][z];
				continue;
			}
			retData[i][retData[i].length] = arr[i][k++];
		}
	}
	return retData;
}


function AddGridStringData(arr, addArr, rowNum) { //addArr <-10:30$10:30$10:30
	//GetGridData 로 가져온 데이터에 배열 데이터를 원하는 Row에 추가해주는 함수
	//arr : 원본 데이터(Double Array)
	//addArr : 추가할 데이터(Double Array)
	//rowNum : Array의 추가하고픈 row number
	//return : Double Array
	
	
/*	if(!arr)
		return addArr;*/
	if(!addArr)
		return arr;
	

	
	if(arr.length != addArr.length)
		return arr;
	var retData = new Array();
	if(rowNum >= arr.length) {
		for(var i=0; i<arr.length; i++) {
			retData[i]  = arr[i].slice(0);
			if(addArr[i].length<1)
				continue;
			for(var j=0; j<addArr[i].length; j++)
				retData[i][retData[i].length] = addArr[i][j];
		}
		return retData;
	}
	
	for(var i=0; i<arr.length; i++) {
		retData[i] = new Array();
		if(addArr[i].length<1)
			continue;
		for(var j=0, k=0; k<arr[i].length; j++) {
			if(rowNum == j) {
				for(var z=0; z<addArr[i].length; z++)
					retData[i][retData[i].length] = addArr[i][z];
				continue;
			}
			retData[i][retData[i].length] = arr[i][k++];
		}
	}
	return retData;
}


function SetGridArrayData(gridId, gridData, option) {
	//Array 데이터를 그리드에 Set 해주는 함수
	//gridId : 그리드 아이디
	//gridData : 추가할 데이터(Array)
	//option : 그리드 초기화 여부(0-데이터 추가, 1-초기화)
	if(!gridData)
		return;
	
	var x1 = 0;
	for(x1=0; x1<GD_Info.length; x1++) {
		if(gridId == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return;
	
	var gvIds;
	for(var x2=0; x2<G_V_Info.length; x2++) {
		if((GD_Info[x1][0] == G_V_Info[x2][1]) && (G_V_Info[x2][6] == 0)) {
			if(!gvIds)
				gvIds = new Array();
			gvIds[gvIds.length] = G_V_Info[x2][0];
		}
	}
	if(!gvIds)
		return;
	
	if(option == 1)
		ClearGrid(gridId);
	
	for(x1=0; x1<gvIds.length; x1++)
		SetGridArrayValue(gvIds[x1], gridData[x1]);
}

function GetGridData(gridId)
{
	var x1 = 0;
	for(x1=0; x1<GD_Info.length; x1++)
	{
		if(gridId == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return;

	var x2 = 0;
	var temp = "";
	for(x2=0; x2<G_V_Info.length; x2++)
	{
		if((GD_Info[x1][0] == G_V_Info[x2][1]) && (G_V_Info[x2][6] == 0))
		{
			if(temp.length != 0)
				temp += "/";
			temp += G_V_Info[x2][0];
		}
	}
	if(temp.length == 0)
		return;

	temp = temp.split('/');
	var gridData = new Array(temp.length);
	var flag = 0;
	var x3 = 0;
	for(x3=0; x3<temp.length; x3++)
	{
		gridData[x3] = GetGridStringValue(temp[x3], '|');
		if(gridData[x3] != "")
			flag = 1;
	}
	if(flag == 0)
		return "";

	return gridData;
}


function CheckDateFormat(x2)
{
	if(ParsingRule[x2][2] == 5)
	{
		var x3 = "";
		x3 = GetStringValue(ParsingRule[x2][0], "")
		var result = "";
		if(ParsingRule[x2][20] == 3 && x3 && x3.length == 8)
		{
			var year = x3.substring(0, 4);
			var month = x3.substring(4, 6);
			var day = x3.substring(6, 8);
			if(year < 1 || month < 1 || month > 12 || day < 1 || day > 31)
				return;
			result = year + "-" + month + "-" + day;
			SetValue(ParsingRule[x2][0], result, "");
		}
		else if(ParsingRule[x2][20] == 4 && x3 && x3.length == 6)
		{
			var year = x3.substring(0, 4);
			var month = x3.substring(4, 6);
			if(year < 1 || month < 1 || month > 12)
				return;
			result = year + "-" + month;
			SetValue(ParsingRule[x2][0], result, "");
		}
		else if(ParsingRule[x2][20] == 5 && x3 && x3.length == 4)
		{
			var month = x3.substring(0, 2);
			var day = x3.substring(2, 4);
			if(month < 1 || month > 12 || day < 1 || day > 31)
				return;
			result = month + "-" + day;
			SetValue(ParsingRule[x2][0], result, "");
		}
	}
	if(ParsingRule[x2][2] == 4)
	{
		if(ParsingRule[x2][20] != 3 && ParsingRule[x2][20] != 4 && ParsingRule[x2][20] != 5)
			return;

		var x3 = GetGridStringValue(ParsingRule[x2][0], '|');
		var x4 = 0;
		var result;
		for(x4=0; x4<x3.length; x4++)
		{
			var temp = x3[x4].split('|')
			var x5 = 0;
			for(x5=0; x5<temp.length; x5++)
			{
				result = "";
				if(ParsingRule[x2][20] == 3 && temp[x5].length == 8)
				{
					var year = temp[x5].substring(0, 4);
					var month = temp[x5].substring(4, 6);
					var day = temp[x5].substring(6, 8);
					if(year < 1 || month < 1 || month > 12 || day < 1 || day > 31)
						continue;
					result = year + "-" + month + "-" + day;
					SetValue(ParsingRule[x2][0], result, "_"+x4+"_"+x5);
				}
				else if(ParsingRule[x2][20] == 4 && temp[x5].length == 6)
				{
					var year = temp[x5].substring(0, 4);
					var month = temp[x5].substring(4, 6);
					if(year < 1 || month < 1 || month > 12)
						continue;
					result = year + "-" + month;
					SetValue(ParsingRule[x2][0], result, "_"+x4+"_"+x5);
				}
				else if(ParsingRule[x2][20] == 5 && temp[x5].length == 4)
				{
					var month = temp[x5].substring(0, 2);
					var day = temp[x5].substring(2, 4);
					if(month < 1  || month > 12 || day < 1 || day > 31)
						continue;
					result = month + "-" + day;
					SetValue(ParsingRule[x2][0], result, "_"+x4+"_"+x5);
				}
			}
		}
	}
}


function CheckTimeFormat(x2)
{
	if(ParsingRule[x2][2] == 5)
	{
		var x3 = GetStringValue(ParsingRule[x2][0], "");
		var cnt1 = 0;
		if(x3.length > 0)
		{
			for(i=1; i<x3.length; i++)
				if(x3.substring(i-1, i) == ':')
					cnt1++;
		}
		var result = "";
		if(ParsingRule[x2][20] == 6 && x3.length == 4 && cnt1 == 0)
		{
			var hour = x3.substring(0, 2);
			var min = x3.substring(2, 4);
			if(hour < 0 || hour > 23 || min < 0 || min > 59)
				return;
			result = hour + ":" + min;
			SetValue(ParsingRule[x2][0], result, "");
		}
		if(ParsingRule[x2][20] == 7 && x3.length == 6 && cnt1 == 0)
		{
			var hour = x3.substring(0, 2);
			var min = x3.substring(2, 4);
			var sec = x3.substring(4, 6);
			if(hour < 0 || hour > 23 || min < 0 || min > 59 || sec < 0 || sec > 59)
				return;
			result = hour + ":" + min + ":" + sec;
			SetValue(ParsingRule[x2][0], result, "");
		}
	}
	if(ParsingRule[x2][2] == 4)
	{
		if(ParsingRule[x2][20] != 6 && ParsingRule[x2][20] != 7)
			return;
		var x3 = GetGridStringValue(ParsingRule[x2][0], '|');
		var x4 = 0;
		var result;
		for(x4=0; x4<x3.length; x4++)
		{
			var temp = x3[x4].split('|')
			var x5 = 0;
			for(x5=0; x5<temp.length; x5++)
			{
				result = "";
				var cnt2 = 0;
				if(temp[x5].length > 0)
				{
					for(i=1; i<temp[x5].length; i++)
						if(temp[x5].substring(i-1, i) == ':')
							cnt2++;
				}
				if(ParsingRule[x2][20] == 6 && temp[x5].length == 4 && cnt2 == 0)
				{
					var hour = temp[x5].substring(0, 2);
					var min = temp[x5].substring(2, 4);
					if(hour < 0 || hour > 23 || min < 0 || min > 59)
						continue;
					result = hour + ":" + min;
					SetValue(ParsingRule[x2][0], result, "_"+x4+"_"+x5);
				}
				if(ParsingRule[x2][20] == 7 && temp[x5].length == 6 && cnt2 == 0)
				{
					var hour = temp[x5].substring(0, 2);
					var min = temp[x5].substring(2, 4);
					var sec = temp[x5].substring(4, 6);
					if(hour < 0 || hour > 23 || min < 0 || min > 59 || sec < 0 || sec > 59)
						continue;
					result = hour + ":" + min + ":" + sec;
					SetValue(ParsingRule[x2][0], result, "_"+x4+"_"+x5);
				}
			}
		}
	}
}


function GetTime(id, formT)
{
	var x1 = document.getElementById(id);
	if(x1 == null)
		return;
	var date = new Date();
	var hour = date.getHours();
	if(hour < 10)
		hour = "0" + hour;
	var minute = date.getMinutes();
	if(minute < 10)
		minute = "0" + minute;
	var second = date.getSeconds();
	if(second < 10)
		second = "0" + second;
	if(formT == "HH:MM")
		x1.value = hour + ":" + minute;
	else if(formT == "HH:MM:SS")
		x1.value = hour + ":" + minute + ":" + second;
	else
		return "";
	return "";
}


function CallPhraseSetPopup()
{
	var width = 1200;
	var height = 650;
	var pid = GET_COOKIE_VAL(0);
	var pName = GET_REQUEST_VAL('pName');
	var pSex = GET_REQUEST_VAL('pSex');
	var pAge = GET_REQUEST_VAL('pAge');
	var chosNo = GET_COOKIE_VAL(9);
	var divisionId = GET_REQUEST_VAL('opDept');
	var doctorId = GET_COOKIE_VAL(1);
	var docuId = GET_COOKIE_VAL(2);

	var ret_val1 = window.showModalDialog(SERVERPRO+SERVERIP+":"+SERVERPORT+"/eView/popup/nameList.jsp?pid="+pid+"&doctorId="+doctorId+"&docuId="+docuId+"&pName="+pName+"&chosNo="+chosNo+"&divisionId="+divisionId+"&pSex="+pSex+"&pAge="+pAge,
	'popup','dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	if(ret_val1 == null){
	//alert("Returned Value is NULL");
		return;
	}

	var len = ret_val1.length;
	if(len < 1 || len != 2)
		return;

	var len1 = ret_val1[0].length < ret_val1[1].length ? ret_val1[0].length : ret_val1[1].length;
	var x1, x2;
	var flag;

	for(x1=0; x1<len1; x1++)
	{
		flag = 0;
		for(x2=0; x2<ParsingRule.length; x2++)
		{
			if(ret_val1[0][x1] == ParsingRule[x2][9])
			{
				var temp = ret_val1[1][x1].replace(/♨/g, "\r\n");
				if(ParsingRule[x2][9] == 243)
					SetAddValue(ParsingRule[x2][0], temp, '');
				else
					SetValue(ParsingRule[x2][0], temp, '');
				flag = 1;
				break;
			}
		}
		if(flag == 0)
		{
			alert("Not Exist!");
			return "";
		}
	}
}



function CallPhraseSetPopup1()
{
	var ret_val1 = new Array();
	ret_val1[0] = ["243", "29", "31"];
	ret_val1[1] = ["abcdefg♨hijklmnop♨qrstu♨vwxyz", "가나다라마바사아자차카타파하", "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ♨abcdefghijklmnopqrstuvwxyz"];

	var len = ret_val1.length;
	if(len < 1 || len != 2)
		return;
	var len1 = ret_val1[0].length < ret_val1[1].length ? ret_val1[0].length : ret_val1[1].length;
	var x1, x2;
	var flag;

	for(x1=0; x1<len1; x1++)
	{
		flag = 0;
		for(x2=0; x2<ParsingRule.length; x2++)
		{
			if(ret_val1[0][x1] == ParsingRule[x2][9])
			{
				var temp = ret_val1[1][x1].replace(/♨/g, "\r\n");
				if(ParsingRule[x2][9] == 243)
					SetAddValue(ParsingRule[x2][0], temp, '');
				else
					SetValue(ParsingRule[x2][0], temp, '');
				flag = 1;

				break;
			}
		}
		if(flag == 0)
		{
			alert("Not Exist!");
			return "";
		}
	}
}

function TimeCalculation(strId, endId)
{
	var x1 = fn_fprbc(strId);
	var x2 = fn_fprbc(endId);
	if(x1 == -1 || x2 == -1)
		return "";
	if(ParsingRule[x1][2] != 5 || ParsingRule[x2][2] != 5)
		return "";

	var sTime = GetStringValue(ParsingRule[x1][0], "");
	var eTime = GetStringValue(ParsingRule[x2][0], "");
	//alert(sTime + ", " + eTime);
	if(sTime.length != 5 || eTime.length != 5)
		return "";
	if(sTime.substring(2,3) != ':' || eTime.substring(2,3) != ':')
		return "";

	var sArr = sTime.split(':');
	var eArr = eTime.split(':');
	if(sArr[0] < 0 || sArr[0] > 23 || sArr[1] < 0 || sArr[1] > 59)
		return "";
	if(eArr[0] < 0 || eArr[0] > 23 || eArr[1] < 0 || eArr[1] > 59)
		return "";

	var tFlag = 0;
	var rArr = new Array();
	rArr[0] = eArr[0]-sArr[0];
	rArr[1] = eArr[1]-sArr[1];

	if(rArr[1] < 0)
	{
		rArr[1] = 60 + rArr[1];
		rArr[0]--;
	}
	if(rArr[0] < 0)
		rArr[0] = 24 + rArr[0];

	rArr[0] += "";
	rArr[1] += "";

	if(rArr[0].length == 1)
		rArr[0] = "0"+rArr[0];
	if(rArr[1].length == 1)
		rArr[1] = "0"+rArr[1]
	return rArr[0]+ ":" + rArr[1];
}

function CheckMan()
{
	var count = ParsingRule.length;
	var i;
	for(i=0;i<count; i++)
	{
		if(ParsingRule[i][16] == 1)
  	{
  		//if(fn_bHide(i))
  			//continue;
  		if(ParsingRule[i][3]==0)
  	 		continue;
  	 	var x11;
  	 	if(ParsingRule[i][3]==1)
  	 	{
  	 		if(ParsingRule[i][2] ==5)
  	 		{
  	 			if("" == GetStringValue(ParsingRule[i][0], ""))
  	 				x11 = ParsingRule[i][14] - 1;
  	 			else
  	 				x11=GetValue(ParsingRule[i][0],"");
  	 		}
  	 		else if(ParsingRule[i][2] ==4)
  	 		{
  	 			if("" == GetStringValue(ParsingRule[i][0], ""))
  	 				x11 = ParsingRule[i][14] - 1;
  	 			else
  	 				x11=GetValue(ParsingRule[i][0],"_0_0");
  	 		}
  	 		else
  	 		{
  	 			continue;
  	 		}
  	 		
    	 	if(x11 < ParsingRule[i][14] || x11 > ParsingRule[i][15])
    	 	{
    	 		alert("입력값이 범위["+ParsingRule[i][14]+"~"+ParsingRule[i][15]+"]를 벗어났습니다. ("+ParsingRule[i][19]+")");
    	 		fn_setFocus(i);
    	 		return false;
    	 	}
    	}
    	else if(ParsingRule[i][3]==3)
    	{
    		if(ParsingRule[i][2] ==5)
  	 		{
  	 			x11=GetStringValue(ParsingRule[i][0],"");
  	 		}
  	 		else if(ParsingRule[i][2] ==4)
  	 		{
  	 			x11=GetStringValue(ParsingRule[i][0],"_0_0");
  	 		}
  	 		else
  	 		{
  	 			continue;
  	 		}
  	 		if(x11 =="")
  	 		{
  	 			alert("필수항목 입니다. ("+ParsingRule[i][19]+")");
    			fn_setFocus(i);
    	 		return false;
  	 		}

    		if( x11.length < ParsingRule[i][14] || x11.length > ParsingRule[i][15])
    		{
    			alert("입력값 길이가 범위["+ParsingRule[i][14]+"~"+ParsingRule[i][15]+"]를 벗어났습니다. ("+ParsingRule[i][19]+")");
    			fn_setFocus(i);
    	 		return false;
    		}
    	}
    	if(ParsingRule[i][3]==8)
  	 	{
  	 		try {
	  	 		if(ParsingRule[i][2] ==5)
	  	 		{
	  	 			x11=Number(document.getElementById("INPUTU1_"+ParsingRule[i][0]).value);
	  	 		}
	  	 		else if(ParsingRule[i][2] ==4)
	  	 		{
	  	 			var z11 = 0;
	  	 			for(; z11<G_V_Info.length; z11++) {
	  	 				if(ParsingRule[i][0] == G_V_Info[z11][0])
	  	 					break;
	  	 			}
	  	 			if(z11 == G_V_Info.lengt)
	  	 				continue;
	  	 			var z22 = 0;
	  	 			for(; z22<GD_Info.length; z22++) {
	  	 				if(G_V_Info[z11][1] == GD_Info[z22][0])
	  	 					break;
	  	 			}
	  	 			if(z22 == GD_Info.length)
	  	 				continue;
	  	 			
	  	 			for(z11=0; z11<GD_Info[z22][1]; z11++) {
	  	 				var idStr = "INPUTU1_"+ParsingRule[i][0]+"_"+z11+"_0";
	  	 				x11=Number(document.getElementById(idStr).value);
	  	 				if(x11 < ParsingRule[i][14] || x11 > ParsingRule[i][15])
			    	 	{
			    	 		alert("입력값이 범위["+ParsingRule[i][14]+"~"+ParsingRule[i][15]+"]를 벗어났습니다. ("+ParsingRule[i][19]+" "+(z11+1)+"번째 줄)");
			    	 		return false;
			    	 	}
	  	 			}
	  	 			continue;
	  	 		}
	  	 		else
	  	 		{
	  	 			continue;
	  	 		}
  	 		}
  	 		catch(e) {
  	 			//alert(e.message);
  	 			continue;
  	 		}
  	 		
    	 	if(x11 < ParsingRule[i][14] || x11 > ParsingRule[i][15])
    	 	{
    	 		alert("입력값이 범위["+ParsingRule[i][14]+"~"+ParsingRule[i][15]+"]를 벗어났습니다. ("+ParsingRule[i][19]+")");
    	 		fn_setFocus(i);
    	 		return false;
    	 	}
    	}
    	else if(ParsingRule[i][3] == 11)//Paint Box일때 추가 
    	{
    		var x2 = document.getElementById("APP_"+ParsingRule[i][0]);
    		if(x2 == null)
    			continue;
    		fn_GetPaintValue(i);
    		if(ParsingRule[i][13]=="") {
    			alert("필수항목 입니다. ("+ParsingRule[i][19]+")");
					return false;
    		}
    	}
    	else if(ParsingRule[i][3]==18) //Pedigree
    	{
    		var x2 = document.getElementById("APP_"+ParsingRule[i][0]);
    		if(x2 == null)
    			continue;
  			if(x2.getImageData() == "NoChecked") {
   				alert("필수항목 입니다. ("+ParsingRule[i][19]+")");
					return false;
   			}
   		}   
    	else if(ParsingRule[i][3]==16)//teethGroup
    	{
    		var isChecked = false;
    		for(var k=0; k<32; k++) {
  				x8 = document.getElementById(ParsingRule[i][0]+"_u_"+k);
  				if(x8 != null) {
	  				if(x8.checked) {
							isChecked = true;
							break;
						}
	  			}
  			}
  			if(!isChecked) {
	  			alert("필수항목 입니다. ("+ParsingRule[i][19]+")");
					return false;
				}
    	}
    	else
    	{
    		x11 = "";
    		if(ParsingRule[i][2] ==5)
  	 		{
  	 			if(ParsingRule[i][3] == 6 || ParsingRule[i][3] == 7)
  	 			{
  	 				var x12 = GET_CHECKCOUNT(ParsingRule[i][9]);
  	 				if(x12 > 0)
  	 					x11 = "Checked";
  	 			}
  	 			else
  	 				x11=GetStringValue(ParsingRule[i][0],"");
  	 		}
  	 		else if(ParsingRule[i][2] ==4)
  	 		{
  	 			x11=GetStringValue(ParsingRule[i][0],"_0_0");
  	 		}
  	 		else
  	 		{
  	 			continue;
  	 		}

    		if(x11 == "")
    		{
    			if(ParsingRule[i][2]==4){
    				var gridtitle ="";
    				for(var n =0;n<ParsingRule.length;n++){
    					if(ParsingRule[i-n][2]==3){
    						gridtitle = ParsingRule[i-n][12];
    						break;
    					}
    				}
    				if(gridtitle == "상병명"){
    					alert("상병이 없으므로 인증저장이 불가능 합니다.\nOCS 처방화면에서 상병을 입력하십시오.\n상병은 반드시 한 개이상 존재해야 합니다.");
    				}else{
    					alert("필수항목 입니다. ("+gridtitle+")");
    				}
    			}else{
    				alert("필수항목 입니다. ("+ParsingRule[i][19]+")");
    			}
    			fn_setFocus(i);
    	 		return false;
    		}
    	}
  	}
	}
	return true;
}

function CheckManGroup()
{
	var check = false;
	if(M_G_E != null)
  {
  	var MaxGrpNum = 0;
  	var i;
	 	for(i=0; i<M_G_E.length; i++)
	 	{
	 		if(M_G_E[i][0] > MaxGrpNum )
	 	  	MaxGrpNum = M_G_E[i][0];
	 	}
	 	var j;
	 	for(j=0; j<MaxGrpNum; j++)
	 	{
	 		var GrpCaseNull = true;
	 		var ManGrpName = "";
	 		var hide = false;
	 		var k;
	 		for(k=0; k<M_G_E.length; k++)
	 		{
	 			if(M_G_E[k][0] == j)
	 			{
	 				if(!check)
	 					check = true;
	 				var l;
	 				for(l=0; l<ParsingRule.length; l++)
	 				{
	 					if(M_G_E[k][1] == ParsingRule[l][0] )
	 					{
		 						if(fn_bHide(l))
	  						{
	  							hide = true;
	  							break;
	  						}
	 						var x11 = "";
	 					  if(ParsingRule[l][2] ==5)
	 					  {	 	
	 					  		if(ParsingRule[l][3] ==11 )//PaintBox
		    	 		  	{
		    	 		  		x11="paint";
		    	 		  		fn_GetPaintValue(l);
		    	 		  		if(ParsingRule[l][13]=="")
		    	 		  			x11 = "";								
										   	 		  		
			    	 		  }
			    	 		  else if(ParsingRule[l][3] ==16) //teeth group
			    	 		  {
			    	 		  	for(var g=0; g<32; g++) {
			    	 		  		x8 = document.getElementById(ParsingRule[l][0]+"_u_"+g);
			    	 		  		if(x8 != null) {
			    	 		  			if(x8.checked) {
			    	 		  				x11="teeth";
			    	 		  				break;
			    	 		  			}
			    	 		  		}
			    	 		  	}
			    	 		  	if(x11!="teeth")
			    	 		  	x11="";			    	 		  	
			    	 		  }
			    	 		  else if(ParsingRule[l][3] ==18) //pedigree
			    	 		  {
			    	 		  	x8 = document.getElementById("APP_"+ParsingRule[l][0]);
			    	 		  	if(x8 != null) {
			    	 		  		x11="pedigree";	
			    	 		  		if(x8.getImageData() == "NoChecked")
			    	 		  			x11="";
			    	 		  	}
			    	 		  }
			    	 		  else
			    	 		  {
			    	 		  	x11=GetStringValue(ParsingRule[l][0],"");
			    	 		  	if(ParsingRule[l][3] == 10 && x11 == "false")
			    	 		  		x11 = "";
	 					  		}
	 					  	}
		    	 		  else if(ParsingRule[l][2] ==4)
		    	 		  {
		    	 			  x11=GetStringValue(ParsingRule[l][0],"_0_0");
		    	 			  if(ParsingRule[l][3] == 10 && x11 == "false")
		 					  		x11 = "";
		    	 		  }
		    	 
	    	 		  ManGrpName = M_G_E[k][2];
	    	 		  if(x11 !="")
		    		  {
		    		   	GrpCaseNull = false;
		    		  }
		    		  break;
	 					}
	 				}
	 			}
	 			/*if(hide == true)
	 			{
	 				hide = false;
	 				continue;
	 			}*/
	 			if(GrpCaseNull == false)
	 				break;
	 				
	 			if(hide == false)
	 			{
		 			if (k == M_G_E.length-1 && GrpCaseNull == true)
		 			{	 				
			 			if(ManGrpName=="통증유무의 값이 있음 일 경우 통증평가도구중 한 개를 입력 하셔야합니다." || ManGrpName=="통증유무의 값이 있음 일 경우 통증중재유무를 선택하셔야합니다.")
			 			{
			 				alert(ManGrpName);
			 			}
			 			else{
		 					alert("필수 입력 그룹 항목 입니다. ("+ ManGrpName +")");
		 				}
		    	 	return false;
		 			}
		 		}
	 		}
	 	}
	 	/*if(check && GrpCaseNull) {
	 		alert("필수 입력 그룹 항목 입니다. ("+ ManGrpName +")");
	 		return false;
	 	}*/
	}
	return true;
}


function DateCalculation(strId, endId)
{
	var x1 = fn_fprbc(strId);
	var x2 = fn_fprbc(endId);
	if(x1 == -1 || x2 == -1)
		return "";

	if(ParsingRule[x1][3] != 4 || ParsingRule[x2][3] != 4)
		return "";

	if(ParsingRule[x1][2] != 5 || ParsingRule[x2][2] != 5)
		return "";

	var arrId = new Array(2);
	arrId[0] = strId;
	arrId[1] = endId;

	var arrForm = new Array(2);
	arrForm[0] = ParsingRule[x1][20];
	arrForm[1] = ParsingRule[x2][20];
	if(arrForm[0] < 1 || arrForm[0] > 5)
		return "";
	if(arrForm[1] < 1 || arrForm[1] > 5)
		return "";

	var arrDay = new Array(2);
	var rstDay = new Array(2);
	var x3;
	for(x3=0; x3<2; x3++)
	{
		var x4;
		x4 = GetStringValue(arrId[x3], "");
		var x5;
		switch(arrForm[x3])
		{
			case 1: // yyyy_mm_dd hh:mm
			case 2: // yyyy_mm_dd(w)
			case 3: // yyyy_mm_dd
			{
				if(arrForm == 1 && x4.length != 16)
					return "";
				else if(arrForm == 2 && x4.length != 13)
					return "";
				else if(arrForm == 3 && x4.length != 10)
					return "";
				x4 = x4.substring(0, 10);
				x5 = x4.split('-');
				if(x5.length != 3)
					return "";
				rstDay[x3] = x5[0]*365 + x5[1]*30 + x5[2]*1;
				break;
			}
			case 4: // yyyy_mm
			{
				if(x4.length != 7)
					return "";
				x5 = x4.split('-');
				if(x5.length != 2)
					return "";
				rstDay[x3] = x5[0]*365 + x5[1]*30;
				break;
			}
			case 5: // mm_dd
			{
				if(x4.length != 5)
					return "";
				x5 = x4.split('-');
				if(x5.length != 2)
					return "";
				rstDay[x3] = x5[0]*30 + x5[1]*1;
				break;
			}
		}
	}
	return rstDay[1]-rstDay[0];
}

function AgeCalculation(birthId)
{
	var x1 = fn_fprbc(birthId);
	if(x1 == -1)
		return "";
	if(ParsingRule[x1][3] != 4)
		return "";
	if(ParsingRule[x1][2] != 5)
		return "";
	if(ParsingRule[x1][20] < 1 || ParsingRule[x1][20] > 4)
		return "";

	var rstDay = new Array(2);
	var x2;
	x2 = GetStringValue(birthId, "");
	var x3;

	if(ParsingRule[x1][20] == 1 && x2.length != 16)
		return "";
	else if(ParsingRule[x1][20] == 2 && x2.length != 13)
		return "";
	else if(ParsingRule[x1][20] == 3 && x2.length != 10)
		return "";
	else if(ParsingRule[x1][20] == 4 && x2.length != 7)
		return "";
	x2 = x2.substring(0, 10);
	x3 = x2.split('-');
	if(x3.length != 3)
		return "";
	rstDay[0] = x3[0];
	var cDay = GetDate().split('-');
	rstDay[1] = cDay[0];
	return rstDay[1]-rstDay[0];
}

function GetNameByConId(idStr)
{
	var x1 = fn_fprbc(idStr);
	if(x1 == -1)
		return "";

	var x2 = GET_CHECKEDITEM(idStr);
	if(x2 == "")
		return "";
	var x3 = x2.split('/');
	var x4 = "";
	var x5 = 0;
	if(x3.length < 1)
		return "";
	for(x5=0; x5<x3.length; x5++)
	{
		var x6 = x3[x5];
		var x7 = fn_fprbc(x6);
		if(x4 != "")
			x4 += ", ";
		x4 += ParsingRule[x7][19];
	}
	return x4;
}


function GetGridString_Horizontal(idStr, rowNum, delimeter)
{
	var x1 = 0;
	for(x1=0; x1<GD_Info.length; x1++)
	{
		if(idStr == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return;
	if(rowNum >= GD_Info[x1][1])
	{
		alert("Grid Row Count Error!");
		return;
	}

	var x2 = 0;
	var temp = "";
	for(x2=0; x2<G_V_Info.length; x2++)
	{
		if((GD_Info[x1][0] == G_V_Info[x2][1]) && (G_V_Info[x2][6] == 0))
		{
			if(temp.length != 0)
				temp += "/";
			temp += G_V_Info[x2][0];
		}
	}
	if(temp.length == 0)
		return;

	temp = temp.split('/');
	var gridData = new Array(temp.length);
	var flag = 0;
	var x3 = 0;
	var x4;
	var x5 = new Array(temp.length);
	for(x3=0; x3<temp.length; x3++)
	{
		gridData[x3] = GetGridStringValue(temp[x3], delimeter);
		if(gridData[x3] != "")
			flag = 1;
		x5[x3] = gridData[x3][rowNum];
	}
	if(flag == 0)
		return "";

	return x5;
}

function GridCalculation_Horizontal(gridId, rstId, type)
{
	//type 0 : Number, 1 : string
	var x1 = 0;
	for(x1=0; x1<GD_Info.length; x1++)
	{
		if(gridId == GD_Info[x1][0])
			break;
	}
	if(x1 == GD_Info.length)
		return;

	var x2 = 0;
	var temp = "";
	for(x2=0; x2<G_V_Info.length; x2++)
	{
		if((GD_Info[x1][0] == G_V_Info[x2][1]) && (G_V_Info[x2][6] == 0))
		{
			if(G_V_Info[x2][0] != rstId)
			{
				if(temp.length != 0)
					temp += "/";
				temp += G_V_Info[x2][0];
			}
		}
	}
	if(temp.length == 0)
		return;
	temp = temp.split('/');
	var gridData = new Array(temp.length);
	var x3 = 0;
	var x4 = new Array(GD_Info[x1][1]);
	var flag = 0;
	for(x3=0; x3<temp.length; x3++)
	{
		gridData[x3] = GetGridStringValue(temp[x3], '|');
		if(gridData[x3] != "")
			flag = 1;
	}
	if(flag == 0)
		return "";

	var x5 = 0;
	var x6 = 0;
	for(x5=0; x5<gridData.length; x5++)
	{
		var x7 = gridData[x5];
		for(x6=0; x6<x7.length; x6++)
		{
			if(x5 == 0)
			{
				if(type == 0)
					x4[x6] = 0;
				else
					x4[x6] = "";
			}

			var x8;
			if(type == 0)
			{
				x8 = parseInt(x7[x6]);
				if(isNaN(x8))
					continue;
			}
			else
			{
				if(x5 != 0)
					x4[x6] += "|";
				x8 = x7[x6];
			}
			x4[x6] += x8;
		}
	}
	return x4;
}

function ClearCheckbox(id1, id2) {
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==id1)
			break;
	if(x2==x1)
		return 0;
	if(!id2)
		id2 = '';
	
	var i=x2+1;
	var x5=ParsingRule.length;
	while(i < x5)
	{
		if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
		{
			i++;
			continue;
		}
		else
		{
			var x10 = ParsingRule[i][0].split('_');
			if(x10[1] != ParsingRule[x2][0])
			{
				i++;
				continue;
			}
		}

		x8 = document.getElementById(ParsingRule[i][0]+id2);
		if(x8)
			x8.checked = "";
		i++;
	}
}

function SetMultiCheckbox(idStr, val1, id2)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return 0;

	if(ParsingRule[x2][3] != 7)
		return;
	val1 = val1.split('||');

	var i=x2+1;
	var x5=ParsingRule.length;
	while(i < x5)
	{
		if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
		{
			i++;
			continue;
		}
		else
		{
			var x10 = ParsingRule[i][0].split('_');
			if(x10[1] != ParsingRule[x2][0])
			{
				i++;
				continue;
			}
		}

		x8 = document.getElementById(ParsingRule[i][0]+id2);
		if(x8)
		{
			var x7;
			for(x7=0; x7<val1.length; x7++)
			{
				var val2 = val1[x7];
				if((ParsingRule[i][13] != "") && (val2 == ParsingRule[i][13]))
					x8.checked = "checked";
				else if((ParsingRule[i][12] != "") && (val2 == ParsingRule[i][12]))
					x8.checked = "checked";
			}
		}
		i++;
	}
}

function GetGroupValue(gId)
{
	var x1;
	for(x1=0; x1<InstItem.length; x1++)
	{
		if(gId == InstItem[x1][1])
			break;
	}
	if(x1 == InstItem.length)
		return "";

	var x2 = InstItem[x1][2];
	var x3, x4;
	var data = "";
	var c_idStr = InstItem[x1][3].split('/');
	for(x3=0; x3<c_idStr.length; x3++)
	{
		x4 = fn_fprbc(c_idStr[x3]);
		if(x4 < 0)
			continue;
		if(ParsingRule[x4][2] != 5)
			continue;

		var x5 = GetStringValue(ParsingRule[x4][0], "");
		if(x5 == "")
			continue;
		else
		{
			var x6 = ParsingRule[x4][21];
			if(x6 == ":")
				x5 = ParsingRule[x4][17] + x6 + " " + x5 + " " + ParsingRule[x4][18];
			else if(x6 == "()")
				x5 = ParsingRule[x4][17] + " "  + x6.substring(0, 1) + x5 + x6.substring(1, 2) + " " + ParsingRule[x4][18];
			else
				x5 = ParsingRule[x4][17] + " " + x5 + " " + ParsingRule[x4][18];
		}

		if(data != "")
			data += ", ";
		data += x5;
	}
	if(data == null || data == "")

		return;

	return data;
}


function SetCheckValue(idStr, val1, id2)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][0] ==idStr)
			break;
	if(x2==x1)
		return 0;

	if(ParsingRule[x2][3] != 7)
		return;
	val1 = val1.split(', ');

	var i=x2+1;
	var x5=ParsingRule.length;
	while(i < x5)
	{
		var flag = 0;
		if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
		{
			i++;
			continue;
		}
		else
		{
			var x10 = ParsingRule[i][0].split('_');
			if(x10[1] != ParsingRule[x2][0])
			{
				i++;
				continue;
			}
		}

		x8 = document.getElementById(ParsingRule[i][0]+id2);
		if(x8)
		{
			var x7;
			for(x7=0; x7<val1.length; x7++)
			{
				var val2 = val1[x7];
				if((ParsingRule[i][13] != "") && (val2 == ParsingRule[i][13]))
					flag = 1;
				else if((ParsingRule[i][12] != "") && (val2 == ParsingRule[i][12]))
					flag = 1;
			}
			if(flag == 1)
				x8.checked = "checked";
			else
				x8.checked = null;
		}
		i++;
	}
}

function SetMultiReadOnlyItem(idStr) {
	if(!idStr)
		return;
	var idArr = idStr.split('^');
	for(var i=0; i<idArr.length; i++) {
		if(!idArr[i])
			continue;
		var tempArr = idArr[i].split('|');
		var id1 = tempArr[0];
		var id2 = tempArr[1] ? tempArr[1] : "";
		
		SetReadOnlyItem(id1, id2);
	}
}

function SetReadOnlyItem(idStr, id2)
{
	var x1 = fn_fprbc(idStr);
	if(x1 < 0)
		return "";

	switch(ParsingRule[x1][3])
	{
		case 1:
		case 2:
		case 3:
		case 4:
		case 9:
		{
			var x2 = document.getElementById("INPUT_" + ParsingRule[x1][0] + id2)
			if(x2 == null)
				return;
			x2.readOnly = 'true';
		}
		break;
		case 5:
		{
			var x2 = document.getElementById("INPUT_" + ParsingRule[x1][0] + id2);
			if(x2 == null)
				return;
			x2.disabled = 'true';
		}
		break;
		case 6:
		case 7:
		{
			var i=x1+1;
			var x4 = -1;
			var x5=ParsingRule.length;
			while(i < x5)
			{
				if((ParsingRule[x1][4]+1) != ParsingRule[i][4])
					break;

				var x2 = document.getElementById(ParsingRule[i][0] + id2);
				if(x2 != null)
					x2.disabled = 'true';
				i++;
			}
		}
		break;
		case 8:
		{
			var i=x1+1;
			var x5=ParsingRule.length;
			var x2 = document.getElementById("INPUTU1_" + ParsingRule[x1][0] + id2)
			if(x2 == null)
				return;
			x2.readOnly = 'true';
			var x3 = document.getElementById("INPUTU2_" + ParsingRule[x1][0] + id2);
			if(x3 == null)
				return;
			x3.disabled = 'true';
		}
		break;
		case 10:
		{
			x2 = document.getElementById("CHECK_"+ParsingRule[x1][0]+id2+"_0");
			if(x2 == null)
				return;
			x2.disabled = 'true';
		}
		break;
	}
}

function SetReadOnlyGroup(idStr)
{
	var x1;
	for(x1=0; x1<InstItem.length; x1++)
		if(idStr == InstItem[x1][1])
			break;

	if(x1 == InstItem.length)
		return;

	var idArr = InstItem[x1][3].split('/');
	var x2;
	for(x2=0; x2<idArr.length; x2++)
	{
		var x3 = fn_fprbc(idArr[x2]);
		if(x3 < 0)
			continue;

		SetReadOnlyItem(ParsingRule[x3][9], "");
	}
}

    function fna_ocpfa(){
        //makeCapture("applet");
        try {
        	//document.getElementById('capture').execute();
        	parent.capture.execute();
        } catch(e) {
        	return 'false';
        }
	return 'true';
    }
    //서버 네비게이션 실행 -> 받아온 데이터 있을 시엔 받아온 데이터 열기
    function fna_osnfa(category){
    	category = parent.uDeptCd;
	var filename = window.showModalDialog('/EMR_DATA/ImgBrowsing.jsp?category='+category, 'popup','dialogWidth=695px; dialogHeight=495px; center:yse; scroll=no; resizable=no');
	if(filename != null && filename != '')
		return filename;//fna_sidta(doc, filename);
	else
		return 'null';
    }

    function makeCapture(type){
		if(document.getElementById('capture')!=null){
			return;
	}
/*
		var obj=document.createElement('object');
		obj.setAttribute("id","capture" );
		obj.setAttribute("classid","clsid:4CF61227-F8D9-4127-8230-CBD97A58AF69" );
		
		
		
		if(type == "applet")
			obj.setAttribute("codebase","/EMR_DATA/applet/bk_capture.cab#version=1,0,0,1" );
//			obj = document.createElement("<object id = 'capture' classid='clsid:4CF61227-F8D9-4127-8230-CBD97A58AF69' codebase='/EMR_DATA/applet/bk_capture.cab#version=1,0,0,1'>");
		else
			obj.setAttribute("codebase","/applet/bk_capture.cab#version=1,0,0,1" );
//			obj = document.createElement("<object id = 'capture' classid='clsid:4CF61227-F8D9-4127-8230-CBD97A58AF69' codebase='/applet/bk_capture.cab#version=1,0,0,1'>");
	
		obj.style.visibility='hidden';
		document.appendChild(obj);*/
		
		var obj=document.createElement('object');
		obj.setAttribute("id","capture" );
		obj.setAttribute("classid","clsid:4CF61227-F8D9-4127-8230-CBD97A58AF69" );
		obj.setAttribute("codebase","/EMR_DATA/applet/bk_capture.cab#version=1,0,0,1" );
		
		try
		{
			document.appendChild(obj);
		}
		catch(e)
		{
			document.innerHTML += obj.outerHTML;
		}
		obj = null;
		
	}


////////////////////////////////////////////////////////////////////////////////////////////
//**********************************************12/5 


function post_to_url2(xmlStr) {
		if(!xmlStr) 	return;
		alert(xmlStr);
		var strXmlStr = xmlStr;		
		var result;
			var flag = "";
			if(flag == 1)
			{
				SeqNo = "0";
			}
			var xm=1;
			if(RVInfo[14]==1)
				xm=2;
			else if(RVInfo[14]==2)
				xm=4;
			else if(RVInfo[14]==3)
				xm=5;
			/*
			var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_All",
			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^"+xm+"^"+ext_connected_recd+"^"+RVInfo[15]+"^"+RVInfo[16]+"^"+RVInfo[18]
			+"&xmlData="+ToHex4Unicode(strXmlStr), 2);
			*/
			var params = "doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"^"
			+Department+"^"+chos_no+"^"+paramType
			+"^"+xm+"^"+ext_connected_recd+"^"+RVInfo[15]+"^"+RVInfo[16]+"^"+RVInfo[18]
			+"&xmlData="+strXmlStr;
			/*
			var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/SaveRecord_All",params, 2);
			if(xr==0)
				return false;
			else 
				result = RVInfo[10];
			return result;
			*/
			
}

function showSignPad(obj) {
	if(!obj)
		return;
	
	var w = parseInt(obj.style.width.split('px')[0]);
	var h = parseInt(obj.style.height.split('px')[0]);
	
	var minW = 600;
	if(w<minW) {
		var rate = (minW/w).toFixed(2);
		w = parseInt(w*rate);
		h = parseInt(h*rate)
	}	
	
	var width = w+10;
	var height = h+65;
	var paramObj = [w+'px', h+'px'];

	var urlStr = "/EMR_DATA/script/signpad/signpad.html";
	var retVal = window.showModalDialog(SERVERPRO+SERVERIP+urlStr,
	paramObj,'dialogWidth='+width+'px; dialogHeight='+height+'px; center:yes; scroll=no; resizable=yes; status:no; help:no; dialogHide:yes;');
	

	if(!retVal)
		return;
	
	obj.setAttribute('src', retVal);
}

function clearSignPad(id) {
	var obj = document.getElementById('APP_'+id);
	if(!obj)
		return;
	
	try {
		obj.clearImage();
		return 1;
	} catch(e) {
		show_debug_msg(e.message);
		return 0;
	}
}

//////////////////////////////////////////////////////////onclick event form sde editor
/*
function SdeEventFunc()
{
	var eventLen=EVENT_SCRIPT.length;
	//alert(eventLen);
	
	for(var i=0; i<eventLen; i++)
	{
		var tempId='INPUT_'+EVENT_SCRIPT[i][0];
		var evtObj = document.getElementById(tempId);
		if(!evtObj)
			continue;
		
		if(EVENT_SCRIPT[i][3]==0)//onclick
			fn_ejs('document.getElementById("'+tempId+'").onclick=	function(){	fn_ejs(EVENT_SCRIPT['+i+'][1]);}');
		else if(EVENT_SCRIPT[i][3]==1)//onchage
			fn_ejs('document.getElementById("'+tempId+'").onchange=function(){fn_ejs(EVENT_SCRIPT['+i+'][1]);}');	
		else if(EVENT_SCRIPT[i][3]==2)//onmouseover
			fn_ejs('document.getElementById("'+tempId+'").onmouseover=function(){fn_ejs(EVENT_SCRIPT['+i+'][1]);}');
		else if(EVENT_SCRIPT[i][3]==3)//onmouseout
			fn_ejs('document.getElementById("'+tempId+'").onmouseout=function(){fn_ejs(EVENT_SCRIPT['+i+'][1]);}');	
		else if(EVENT_SCRIPT[i][3]==4)//onfocusin
			fn_ejs('document.getElementById("'+tempId+'").onfocusin=function(){fn_ejs(EVENT_SCRIPT['+i+'][1]);}');	
		else if(EVENT_SCRIPT[i][3]==5)//onfocusout
			fn_ejs('document.getElementById("'+tempId+'").onfocusout=function(){fn_ejs(EVENT_SCRIPT['+i+'][1]);}');	
		
	}
}
*/

function SetItemEvent(idStr, idx)
{
		var evtObj = document.getElementById(idStr);
		if(!evtObj)
			return;
		
		if(EVENT_SCRIPT[idx][3]==0)//onclick
			fn_ejs('document.getElementById("'+idStr+'").onclick=	function(){	fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');
		else if(EVENT_SCRIPT[idx][3]==1)//onchage
			fn_ejs('document.getElementById("'+idStr+'").onchange=function(){fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');	
		else if(EVENT_SCRIPT[idx][3]==2)//onmouseover
			fn_ejs('document.getElementById("'+idStr+'").onmouseover=function(){fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');
		else if(EVENT_SCRIPT[idx][3]==3)//onmouseout
			fn_ejs('document.getElementById("'+idStr+'").onmouseout=function(){fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');	
		else if(EVENT_SCRIPT[idx][3]==4)//onfocusin
			fn_ejs('document.getElementById("'+idStr+'").onfocusin=function(){fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');	
		else if(EVENT_SCRIPT[idx][3]==5)//onfocusout
			fn_ejs('document.getElementById("'+idStr+'").onfocusout=function(){fn_ejs(EVENT_SCRIPT['+idx+'][1]);}');	
}

function SdeEventFunc()
{
	var eventLen=EVENT_SCRIPT.length;
	//alert(eventLen);
	
	for(var i=0; i<eventLen; i++)
	{
		var idStr = EVENT_SCRIPT[i][0];
		//var tempId='INPUT_'+EVENT_SCRIPT[i][0];
		{
			var x1=ParsingRule.length;
			var x2;
			for(x2=0;x2<x1;x2++)
				if(ParsingRule[x2][0] ==idStr)
					break;
			if(x2==x1)
				continue;
		
			var x8;
			switch(ParsingRule[x2][3])
		  {
		  	case 1:
		  	case 2:
		  	case 3:
		  	case 4:
		  	case 5:
		  	case 9:
		  	  SetItemEvent("INPUT_"+ParsingRule[x2][0], i);
		  		break;
		  	case 6:
		  	case 7:
		  		{
		  			var x7=x2+1;
		  			var x4 = -1;
		  			var x5=ParsingRule.length;
		  			while(x7 < x5)
		  			{
		  				if(ParsingRule[x2][4] >= ParsingRule[x7][4])
		  					break;
		  					
		  				if((ParsingRule[x2][4]+1) != ParsingRule[x7][4]) {
		  					x7++;
		  					continue;
		  				}
							SetItemEvent(ParsingRule[x7][0], i);
		  				
		  				x7++;
		  			}
		  		}
		  		break;
		  		case 10:
  					SetItemEvent("CHECK_"+ParsingRule[x2][0]+"_0", i);
  					break;
		  }
		}
	}
}


function loadEventFunc(conId, evtType) {
	//evtType : 0-onclick, 1-onchange, 2-onmouseover, 3-onmouseout, 4-onfocusin, 5-onfocusout			
	var x1=fn_fprbc(conId);
  if(x1 <0) return;
  
	var idx=0;
	for(; idx<EVENT_SCRIPT.length; idx++) {
		if(ParsingRule[x1][0] == EVENT_SCRIPT[idx][0])
			break;
	}
	if(idx == EVENT_SCRIPT.length)
		return;
	
	if(evtType != EVENT_SCRIPT[idx][3])
		return;
	
	fn_ejs(EVENT_SCRIPT[idx][1]);
}




//---------------------------------------

function SetGridArrayValueByConId(idStr, ar1)
{
	var x1 = ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
		return "";

	var x3=ar1.length;
	if(x3 == 0)
		return "";
	var x4;
	for(x4=0;x4<x3;x4++)
	{
			fn_sgvbdv(x2, ar1[x4], x4);
	}
}



function SetAddGridArrayValueByConId(idStr, ar1, type)
{
	var x1;
	var x2;
	var x3;
	for(x1=0; x1<ParsingRule.length; x1++)
		if(idStr == ParsingRule[x1][9])
			break;
	if(x1 == ParsingRule.length)
		return "";
	for(x2=0; x2<G_V_Info.length; x2++)
		if(idStr == G_V_Info[x2][0])
			break;
	if(x2 == G_V_Info.length)
		return "";
	for(x3=0; x3<GD_Info.length; x3++)
		if(G_V_Info[x2][1] == GD_Info[x3][0])
			break;
	if(x3 == GD_Info.length)
		return "";

	var x4 ="";
	if(ar1 == "" || ar1 == null)
		return;
	if(type == 0){	//String
		x4 = ar1.split('$');
	}
	else if(type == 1) //Array
		x4 = ar1;
	else
		return;

	if(x4.length < 1)
		return "";

	if(gridFlag == 1)
	{
		var x8 = CheckCurGridValRowCnt(G_V_Info[x2][0]);
		if(x8 < 0)
			return "";
		var x9;
		for(x9=0; x9<x4.length; x9++)
		{
			var x10 = x8 + x9;
			if(x10 >= GD_Info[x3][1])
				AddLastRowInGrid(x3);
			fn_svbdv(x1, x4[x9], "_"+x10+"_0");
		}
		return;
	}
	if(startFlag == 1)
	{
		CurGridRowCnt = CheckCurGridRowCnt(GD_Info[x3][0]);
		if(CurGridRowCnt < 0)
			return "";
		startFlag = 0;
	}
	var x5;
	for(x5=0;x5<x4.length;x5++)
	{
		var x7 = CurGridRowCnt+x5;
		if(x7 >= GD_Info[x3][1])
			AddLastRowInGrid(x3);
		fn_svbdv(x1,x4[x5],"_"+x7+"_0");
	}
}


function GetGridStaticValue(calcType, idStr, rowNum, colNum)
{
	var realIdStr;
	var result=0;
	var rowCount=-1;
	var colCount=-1;
	var valType=-1;
	var gridId=-1;
	var i, j;
	for(i=0; i<G_V_Info.length; i++)
	{
		if(G_V_Info[i][0] == idStr)
		{
			valType = G_V_Info[i][2];
			colCount = G_V_Info[i][3];
			gridId = G_V_Info[i][1];
			break;
		}
	}
	if(valType == -1)
		return result;
	for(i=0; i<GD_Info.length; i++)
	{
		if(GD_Info[i][0] == gridId)
		{
			rowCount = GD_Info[i][1];
			break;
		}
	}
	if(rowCount <= 0)
		return result;

	if(colCount ==0)
		colCount=1;

	if(valType == 2)
	{
		rowCount = colCount;
		colCount=1;
	}

	if(rowNum >= (rowCount-1))
	{
		bMapContinue=2;
	}
	if(bMapContinue!=2)
		bMapContinue=1;


	var x30,x31,x32,x33;
	if(rowNum ==-1 && colNum==-1 )
	{
		if(calcType ==4)
			return rowCount*colCount;
		x30=rowCount-1;
		x31=colCount-1;
		x32=0;
		x33=0;
	}
	else if(rowNum ==-1)
	{
		if(calcType ==4)
			return colCount;
		x30=x32=rowNum;
		x31=colCount-1;
		x33=0;
	}
	else if(colNum==-1)
	{
		if(calcType ==4)
			return rowCount;
		x30=rowCount-1;
		x32=0;
		x31=x33=colNum;
	}
	else
	{
		if(calcType ==4)
			return 1;
		x30=x32=rowNum;
		x31=x33=colNum;
	}

	result=0;
	var x40;
	for(i=x32; i<=x30; i++)
	{
		for(j=x33; j<=x31; j++)
		{
			switch(calcType)
			{
				case 0:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 > result)
						result = x40;
					break;
				case 1:
					x40 = GetValue(idStr, "_"+i+"_"+j);
					if(x40 < result)
						result = x40;
					break;
				case 2:
				case 3:
					result += GetValue(idStr, "_"+i+"_"+j);
					break;
				case 4:
					result++;
					break;
				case 5:
					result = GetValue(idStr, "_"+i+"_"+j);;
					break;
			}
		}
	}
	if(calcType==3)
		result /= (x32*x33);
	return result;
}



function GETGRID_STR_VAL_BY_CONID(idStr , aStr)
{
	var x1=fn_fprbc(idStr);
  if(x1 <0) return "";
  if(aStr==null)
   	aStr="";
	return GetGridStringValueByCon(ParsingRule[x1][9], aStr);
}

function GetGridStringValueByCon(idStr, aStr)
{
	var x1=ParsingRule.length;
	var x2;
	for(x2=0;x2<x1;x2++)
		if(ParsingRule[x2][9] ==idStr)
			break;
	if(x2==x1)
	{
		if(G_VT01<2)
			return 0;
		var y1=G_OutXml4Attr;
		if(y1==null)
			return 0;
		var y2=y1.length;
		var y3;
		for(y3=0;y3<y2;y3++)
		{
			if(idStr==y1[y3].getAttribute("controlId"))
			{
				break;
			}
		}
		if(y3>=y2)
			return 0;
		var y4=y1[y3].getElementsByTagName("VALUE");
		var y7=y3;
		var y2=y4.length;
		var y6="";
		for(y3=0;y3<y2;y3++)
		{
			if(y6 == "")
				y6 += fn_gxtd(y4[y3]);
			else
				y6 += ", "+fn_gxtd(y4[y3]);
		}

		y4=y1[y7].getElementsByTagName("UNIT");
		y2=y4.length;
		for(y3=0;y3<y2;y3++)
		{
			y6 += " "+fn_gxtd(y4[y3]);
		}
		return y6;
	}
	var x8;
	var x4;

	if(ParsingRule[x2][2]==8)
	{
		x8 = document.getElementById(ParsingRule[x2][0]+aStr);
  	if(x8 != null && (x8.selected  ||x8.checked))
  	{
  		return "true";
  	}
  	return "false";
	}


  switch(ParsingRule[x2][3])
  {
  	case 0:
  		x8 = document.getElementById("VAL_"+ParsingRule[x2][0]+aStr);
  		if(x8 != null && x8.innerText != "")
  		{
  			return x8.innerText;
  		}
  		break;
  	case 1:
  	case 2:
  	case 3:
  	case 4:
  	case 9:
  	{
  		var gridCnt=0;
  		var x8_gridArrData=new Array();

  		
  		while(1)
  		{
  			x8=document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr+"_"+gridCnt+"_0");
  			if(x8 ==null)
  				break;
  				gridCnt++;
  		}
  		
  	
  		
  		for(var j=0; j<gridCnt; j++)
  		{
  			x8=document.getElementById("INPUT_"+ParsingRule[x2][0]+aStr+"_"+j+"_0");
  			if(x8 !=null && x8.value !="")
  				x8_gridArrData[j]=x8.value;
  		}
  		return x8_gridArrData;

  	}
  		break;
  	case 5:
  	case 6:
  	case 7:
  		{
  			var i=x2+1;
  			var x4="";
  			var x5=ParsingRule.length;
  			while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				else
  				{
  					var x10 = ParsingRule[i][0].split('_');
  					if(x10[1] != ParsingRule[x2][9])
  					{
  						i++;
  						continue;
  					}
  				}

  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
  				if(x8)
  				{
  					if(x8.selected || x8.checked)
  					{
  						if(x4 =="")
  							x4 += ParsingRule[i][12];
  						else
  							x4 += ", " + ParsingRule[i][12];
  					}
  				}
  				i++;
  			}
  		}
  		return x4;
  		break;
  	case 8:
  		{
  			var i=x2+1;
  			var x4 ="";
  			var x5=ParsingRule.length;
	  		x8 = document.getElementById("INPUTU1_"+ParsingRule[x2][9]+aStr);
	  		if(x8 == null || x8.value==null || x8.value=="")
	  		{
	  			return x4;
	  		}
	  		x4 += x8.value;
	  		while(i < x5)
  			{
  				if((ParsingRule[x2][4]+1) != ParsingRule[i][4])
  				{
  					i++;
  					continue;
  				}
  				else
  				{
  					var x10 = ParsingRule[i][0].split('_');
  					if(x10[1] != ParsingRule[x2][9])
  					{
  						i++;
  						continue;
  					}
  				}
  				x8 = document.getElementById(ParsingRule[i][0]+aStr);
	  			if(x8)
	  			{
	  				if(x8.selected || x8.checked)
	  				{
	  					x4 += " "+ParsingRule[i][12];
	  					return x4;
	  				}
	  			}
	  			/*if(ParsingRule[x2][4]+1 ==ParsingRule[x2+1][4])
	  			{
	  				x4 += " "+ParsingRule[x2+1][12];
	  				return x4;
	  			}*/
	  			i++;
  			}
  			return x4;
  		}
  		break;
  	case 10:
  		x8 = document.getElementById("CHECK_"+ParsingRule[x2][9]+aStr+"_0");
  		if(x8 != null && x8.checked)
  		{
  			return "true";
  		}
  		return "false";
  		break;
  }
	return "";
}



function GetGridStaticValue2(calcType, idStr, rowNum, colNum)
{
	var realIdStr;
	var result=0;
	var rowCount=-1;
	var colCount=-1;
	var valType=-1;
	var gridId=-1;
	var i, j;
	for(i=0; i<G_V_Info.length; i++)
	{
		if(G_V_Info[i][0] == idStr)
		{
			valType = G_V_Info[i][2];
			colCount = G_V_Info[i][3];
			gridId = G_V_Info[i][1];
			break;
		}
	}
	if(valType == -1)
		return result;
	for(i=0; i<GD_Info.length; i++)
	{
		if(GD_Info[i][0] == gridId)
		{
			rowCount = GD_Info[i][1];
			break;
		}
	}
	if(rowCount <= 0)
		return result;

	if(colCount ==0)
		colCount=1;

	if(valType == 2)
	{
		rowCount = colCount;
		colCount=1;
	}

	if(rowNum >= (rowCount-1))
	{
		bMapContinue=2;
	}
	if(bMapContinue!=2)
		bMapContinue=1;


	var x30,x31,x32,x33;
	if(rowNum ==-1 && colNum==-1 )
	{
		if(calcType ==4)
			return rowCount*colCount;
		x30=rowCount-1;
		x31=colCount-1;
		x32=0;
		x33=0;
	}
	else if(rowNum ==-1)
	{
		if(calcType ==4)
			return colCount;
		x30=x32=rowNum;
		x31=colCount-1;
		x33=0;
	}
	else if(colNum==-1)
	{
		if(calcType ==4)
			return rowCount;
		x30=rowCount-1;
		x32=0;
		x31=x33=colNum;
	}
	else
	{
		if(calcType ==4)
			return 1;
		x30=x32=rowNum;
		x31=x33=colNum;
	}

	result=0;
	var x40;
	for(i=x32; i<=x30; i++)
	{
		for(j=x33; j<=x31; j++)
		{
			switch(calcType)
			{
				case 0:
					result = GetStringValue(idStr, "_"+i+"_"+j,'');
					break;
				case 1:
					result = GetStringValue(idStr, "_"+i+"_"+j,'');
					break;
				case 2:
				case 3:
					result += GetStringValue(idStr, "_"+i+"_"+j,'');
					break;
				case 4:
					result++;
					break;
				case 5:
					result = GetStringValue(idStr, "_"+i+"_"+j,'');
					break;
			}
		}
	}
return result;
}





function processDB(query){
	var queryArr = new Array();
	var HexData = ToHex4Unicode(query).replace(/00/gi, "");
	var retData = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/dbAccess","result="+HexData.replace("FFFE", ""), null);
	if(!retData)
		return null;
	
	var temp = retData.split("◈");
	var aTemp = null;
	
	for(var i = 0; i < temp.length -1; i++){
		aTemp = temp[i].split("◎");
		queryArr[i] = new Array();
		
		for(var j = 0; j < aTemp.length; j++){	
			queryArr[i][j] = aTemp[j];
		}
	}
	
	return queryArr;
}

function changedivTextarea(){
	if(event.keyCode == 13){
		/*var nArr = this.childNodes;
		
		if(nArr.length >= 1){
			for(var i = 0; i < nArr.length; i++){
				nArr[i].style.margin = "0 0 0 0";
				nArr[i].style.padding = "0 0 0 0";
			}
		}
		
		this.blur();
		this.focus();*/
	}
}

//--------------------BKSNP HighLight--------------------------------//
/*
document.onmousedown = function(e){
	if(parent.parent){
		if(parent.parent.hlOpenFlag){
			parent.parent.dragPointer = "DOCUMENT_PAN";
			
			if(parent.parent.openFlag){
				parent.parent.document.getElementById(parent.parent.contextName).style.display = "none";
				
				parent.parent.openFlag = false;
				parent.parent.contextName = "";
			}
		}
	}
}

document.onmouseup = function(e){
	if(parent.parent){
		if(parent.parent.hlOpenFlag){
			if(document.selection.type == "None"){
				return false;
			}else{
				if(document.selection.createRange){
					var range = document.selection.createRange();
					var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
					var bBtnObj = parent.parent.document.getElementById("bFontBtn");
					var uBtnObj = parent.parent.document.getElementById("uFontBtn");
					var pNodeName	= node.parentNode.tagName;
					var nTagName	= node.tagName;
					
					if(pNodeName == "FONT"){
						pNodeName = node.parentNode.parentNode.tagName;
					}
					
					//UnderLine Checked
					if(nTagName.indexOf("U") != -1){
						parent.parent.downSelectButton(uBtnObj);
						
						if(pNodeName.indexOf("STRONG") != -1){
							parent.parent.downSelectButton(bBtnObj);
						}else if(pNodeName.indexOf("STRONG") == -1){
							parent.parent.unSelectButton(bBtnObj);
						}
					}else if(nTagName.indexOf("U") == -1){
						parent.parent.unSelectButton(uBtnObj);
					}
					
					if(nTagName.indexOf("STRONG") != -1){
						parent.parent.downSelectButton(bBtnObj);
					}else if(nTagName.indexOf("STRONG") == -1 && nTagName.indexOf("U") == -1){
						parent.parent.unSelectButton(bBtnObj);
					}
				}
			}
		}
	}
}

if(document.body){
	document.body.onkeyup = function(){
		var kCode = event.keyCode;
		
		if(kCode == 37 || kCode == 38 || kCode == 39 || kCode == 40){
			if(parent.parent){
				if(parent.parent.hlOpenFlag){
					if(document.selection.createRange){
						var range = document.selection.createRange();
						var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
						var bBtnObj = parent.parent.document.getElementById("bFontBtn");
						var uBtnObj = parent.parent.document.getElementById("uFontBtn");
						var pNodeName	= node.parentNode.tagName;
						var nTagName	= node.tagName;
						
						if(pNodeName == "FONT"){
							pNodeName = node.parentNode.parentNode.tagName;
						}
						
						//UnderLine Checked
						if(nTagName.indexOf("U") != -1){
							parent.parent.downSelectButton(uBtnObj);
							
							if(pNodeName.indexOf("STRONG") != -1){
								parent.parent.downSelectButton(bBtnObj);
							}else if(pNodeName.indexOf("STRONG") == -1){
								parent.parent.unSelectButton(bBtnObj);
							}
						}else if(nTagName.indexOf("U") == -1){
							parent.parent.unSelectButton(uBtnObj);
						}
						
						if(nTagName.indexOf("STRONG") != -1){
							parent.parent.downSelectButton(bBtnObj);
						}else if(nTagName.indexOf("STRONG") == -1 && nTagName.indexOf("U") == -1){
							parent.parent.unSelectButton(bBtnObj);
						}
					}
				}
			}
		}
	}
}

*/
function textAreaToDiv(){
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	
	if(document.selection.createRange){
		var range = document.selection.createRange();
		var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
		var nText = node.innerText;
		rText = range.text;
		
		sCnt = nText.indexOf(rText);
		eCnt = nText.length - (sCnt + rText.length);
		dvId = node.id;
		
		if(node.tagName == "TEXTAREA"){
			tagType = true;
		}
	}
	
	changeDivCase = new Array(); 
	var  TEXTAREA = document.getElementsByTagName('TEXTAREA');
	var TextArealength = TEXTAREA.length - 1;
	
	for(highlighti =TextArealength ; highlighti >= 0 ; highlighti--){
		TEXTAREA[highlighti].onkeyup = changedivTextarea;
		var DivStyle = TEXTAREA[highlighti].style;
		var newIt = document.createElement('div');
		newIt.id =TEXTAREA[highlighti].id;
		
		if(newIt.id != ""){
			newIt.className = "editable_div";
			newIt.style.cssText = DivStyle.cssText;
			newIt.style.borderStyle = 'solid';
			newIt.style.borderWidth = '1px';
			newIt.style.borderColor='#ababab';
			newIt.cssText = DivStyle.cssText;
			newIt.readOnly =TEXTAREA[highlighti].readOnly;
			if(TEXTAREA[highlighti].readOnly!=true)
				newIt.setAttribute("contentEditable", true);
				//newIt.contenteditable = true;
			
			newIt.innerText = TEXTAREA[highlighti].value;
			var pNode = TEXTAREA[highlighti].parentNode;
			pNode.replaceChild(newIt, TEXTAREA[highlighti]);
			
			try{
				//var GETid = document.getElementById(newIt.id);
				//GETid.outerHTML = GETid.outerHTML.replace(/contenteditable="true"/g, "contenteditable=true");
			}catch(e) {}
			
			changeDivCase.push(newIt.id);
		}
	}
  
	var pTag = null;

	for(i = 0; i < changeDivCase.length ; i++){
		document.getElementById(changeDivCase[i]).onkeyup = changedivTextarea;
	}
	
	if(tagType){
		var dDiv = document.getElementById(dvId);
		var pTag = document.createElement("P");
	  
		pTag.innerText = dDiv.innerText;
		pTag.style.margin = "0 0 0 0";
		pTag.style.padding = "0 0 0 0";
		dDiv.innerText = "";
		
		dDiv.appendChild(pTag);
	  
		pTag.focus();
		
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(pTag);
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		dRange.select();
	}
}

function inputToDiv(){
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	
	if(document.selection.createRange){
		var range = document.selection.createRange();
		var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
		var nText = node.value;
		rText = range.text;
		
		if(nText){
			sCnt = nText.indexOf(rText);
			
			eCnt = nText.length - (sCnt + rText.length);
			dvId = node.id;
			
			if(node.tagName == "INPUT"){
				tagType = true;
			}
		}
	}
	
	changeDivCase2 = new Array();
	var INPUTTEXT = document.getElementsByTagName('INPUT');
	var InputTextlnength = INPUTTEXT.length -1;
	
	for(highlighti =InputTextlnength ; highlighti >= 0 ; highlighti--){
		INPUTTEXT[highlighti].onkeyup = changedivTextarea;
		var DivStyle = INPUTTEXT[highlighti].style;
		var newIt = document.createElement('div');
		newIt.id =INPUTTEXT[highlighti].id;
		var textId = newIt.id.split('_')[0];
		
		if(newIt.id != ""&& textId =='INPUT' && INPUTTEXT[highlighti].type == 'text' ){
			//newIt.style.cssText = DivStyle.cssText;
			newIt.className = "editable_div";
			newIt.style.width = DivStyle.width;
			newIt.style.height='20px'; 	
			newIt.style.borderBottom='solid';
			newIt.style.borderColor='#ababab';
			newIt.style.borderWidth = '1px';
			newIt.style.borderTop='none'; 
			newIt.style.borderLeft='none';
			newIt.style.borderRight='none';
			newIt.style.overflow='hidden';

			if(INPUTTEXT[highlighti].parentNode.childNodes.length > 1){
				newIt.style.float = 'left';
			}

			newIt.cssText = DivStyle.cssText;
			newIt.readOnly = INPUTTEXT[highlighti].readOnly;
			if(INPUTTEXT[highlighti].readOnly!=true)
				newIt.setAttribute("contentEditable", true);
			//newIt.contenteditable = 'true';
			newIt.innerText = INPUTTEXT[highlighti].value;
			
			var pNode = INPUTTEXT[highlighti].parentNode;
			pNode.replaceChild(newIt, INPUTTEXT[highlighti]);
			
			try{
				//var GETid = document.getElementById(newIt.id);
				//GETid.outerHTML = GETid.outerHTML.replace(/contenteditable="true"/g, "contenteditable=true");
			}catch(e){}
			
			changeDivCase2.push(newIt.id);
		}
	}
	
	for(i = 0; i < changeDivCase2.length ; i++){
		document.getElementById(changeDivCase2[i]).onkeyup = changedivTextarea;
	}
	
	if(tagType){
		var dDiv = document.getElementById(dvId);
		dDiv.focus();
		
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(dDiv);
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		dRange.select();
	}
}



function trim(a){
 return a.replace(/^\s+|\s+$/g,"");
}



function transfer_datetype(x1,x2)
{
	
  if(x1.tagName == "INPUT" && x1.value.length == 0)
  {
    return;
  }
  else if(x1.tagName != "INPUT" && x1.innerText.length == 0)
  {
    return;
  }
  try{
  var savecusur = doGetCaretPosition(x1);
  var formArr = "YYYY_MM_DD HH:MM/YYYY_MM_DD(W)/YYYY_MM_DD/YYYY_MM/MM_DD/HH:MM/HH:MM:SS";
	formArr = formArr.split('/');
	var x4 = formArr.length;
	var x5 = 0;
	var fullday;
	var year;  
  var month;
  var day;
  var hour;
  var minute;
  var second;
  var date;
  var koreanday; 
  var dayStr;
	for(x5=0; x5<x4; x5++)
	{
		if(formArr[x5] == x2)
		{
			break;
		}
	}
	x5++;
	if(x5 == 1)
	{
		
		
		 try
     { 
     	
     	
          if(savecusur == 4)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 3;
         }
         else
         {
         	savecusur = 5;
         }
      }
      if(savecusur == 7)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 6;
         }
         else
         {
         	savecusur = 8;
         }
      }
      
       if(savecusur == 10)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 9;
         }
         else
         {
         	savecusur = 11;
         }
      }
      
    if(savecusur == 13)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur =12;
         }
         else
         {
         	savecusur = 14;
         }
      }
      
  		if(x1.tagName == "INPUT" )
         fullday = x1.value.replace(/-/g, "");
			else 
         fullday = x1.innerText.replace(/-/g, "");

       fullday= fullday.split(':');
       fullday =  fullday[0] +  fullday[1];
       fullday= fullday.split(' ');
       fullday =  fullday[0] +  fullday[1];
    


       year   = fullday.substring(0,4);
       month  = fullday.substring(4,6);
       day    = fullday.substring(6,8);
       hour   = fullday.substring(8,10);
       minute =   fullday.substring(10,12);
    

       year = transfer_year(year);
       month =  transfer_month(month);
       day = transfer_day(day,month);
       hour = transfer_hour(hour);
       minute = transfer_minute(minute);
       //마지막 마우스 커서 고정
       
       if(x1.tagName == "INPUT" )
       	x1.value = year + "-" +  month+ "-" + day + " " + hour + ":" + minute;
       else 
       	x1.innerText = year + "-" +  month+ "-" + day + " " + hour + ":" + minute;
       	
      
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	if(x1.tagName == "INPUT" )
      	x1.value = "0000-00-00 00:00";
      else 
      	x1.innerText = "0000-00-00 00:00";
      	
      setCaretPosition(x1 ,0 );
    }
	}

	if(x5 == 2)
	{
	  try
     {
        	
       if(savecusur == 4)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 3;
         }
         else
         {
         	savecusur = 5;
         }
      }
      if(savecusur == 7)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 6;
         }
         else
         {
         	savecusur = 8;
         }
      }
  
  		if(x1.tagName == "INPUT" )
       fullday = x1.value.replace(/-/g, "");
			else 
				fullday = x1.innerText.replace(/-/g, "");
				
       year   = fullday.substring(0,4);
       month  = fullday.substring(4,6);
       day    = fullday.substring(6,8);
    
     
       year = transfer_year(year);
       month =  transfer_month(month);
       day = transfer_day(day,month);
       if( month  == '08' ||  month  == '09'  )
       {
          parseInt(month)
       }
       
       date = new Date(parseInt(year), month-1, day);				
			 
			 koreanday = date.getDay();
			 dayStr = "";
			switch(koreanday)
			{
				case 0: dayStr = "일"; break;
				case 1: dayStr = "월"; break;
				case 2: dayStr = "화"; break;
				case 3: dayStr = "수"; break;
				case 4: dayStr = "목"; break;
				case 5: dayStr = "금"; break;
				case 6: dayStr = "토"; break;
			}
       
       //마지막 마우스 커서 고정
       if(x1.tagName == "INPUT" )
       x1.value = year + "-" +  month+ "-" + day + "(" + dayStr + ")";
       else 
       	x1.innerText = year + "-" +  month+ "-" + day + "(" + dayStr + ")";
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	setCaretPosition(x1 ,savecusur );
    	if(x1.tagName == "INPUT" )
      	x1.value = "0000-00-00(?)";
      else  
      	x1.innerText = "0000-00-00(?)";
    }
	}
	if(x5 == 3)
	{
	  try
     { 
     	
     	
       if(savecusur == 4)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 3;
         }
         else
         {
         	savecusur = 5;
         }
      }
      if(savecusur == 7)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 6;
         }
         else
         {
         	savecusur = 8;
         }
      }
  
  		if(x1.tagName == "INPUT" )
      	 fullday = x1.value.replace(/-/g, "");
			else 
				fullday = x1.innerText.replace(/-/g, "");
				
       year   = fullday.substring(0,4);
       month  = fullday.substring(4,6);
       day    = fullday.substring(6,8);
    

       year = transfer_year(year);
       month =  transfer_month(month);
       day = transfer_day(day,month);
       
       if(x1.tagName == "INPUT")
       	x1.value = year + "-" +  month+ "-" + day;
       else if(x1.tagName != "INPUT")
       	x1.innerText = year + "-" +  month+ "-" + day;
        
       if(checkdatedocArr.length > 0)
       {
         for(i = 0 ; i < checkdatedocArr.length ; i ++)
         {
             var chkdateid = x1.id.split('_')
             if(chkdateid.length > 1)
             {
                 if(checkdatedocArr[i] == chkdateid[1])
                 {
                   var chk_ret_val;//  = x1.value.split('-');
                   if(x1.tagName == "INPUT" )
                   	chk_ret_val = x1.value.split('-');
                   else 
                   	chk_ret_val = x1.innerText.split('-');
                   	
	                 var chkdate = new Date(chk_ret_val[0], chk_ret_val[1]-1, chk_ret_val[2]);
                   var chknowdate = new Date();
                   if(chkdate.getFullYear() < chknowdate.getFullYear())
                   {
                      var TempMonth = chknowdate.getMonth()+1 < 10 ? '0' + (chknowdate.getMonth()+1) : chknowdate.getMonth()+1;
                      var TempDate = chknowdate.getDate() < 10 ? '0' + chknowdate.getDate() : chknowdate.getDate();
                      alert('과거는 선택할 수 없습니다.');
                      if(x1.tagName == "INPUT" )
                      x1.value = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                      else
                      	x1.innerText = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                   
                   }
                   if(chkdate.getFullYear() == chknowdate.getFullYear() && (chkdate.getMonth()+1)< ( chknowdate.getMonth()+1))
                   {
                      var TempMonth = chknowdate.getMonth()+1 < 10 ? '0' + (chknowdate.getMonth()+1) : chknowdate.getMonth()+1;
                      var TempDate = chknowdate.getDate() < 10 ? '0' + chknowdate.getDate() : chknowdate.getDate();
                      alert('과거는 선택할 수 없습니다.');
                      if(x1.tagName == "INPUT" )
                       x1.value = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                      else
                      	x1.innerText = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                      
                   }
                   if(chkdate.getFullYear() == chknowdate.getFullYear() && (chkdate.getMonth()+1) == ( chknowdate.getMonth()+1) && chkdate.getDate() < chknowdate.getDate())
                   {
                      var TempMonth = chknowdate.getMonth()+1 < 10 ? '0' + (chknowdate.getMonth()+1) : chknowdate.getMonth()+1;
                      var TempDate = chknowdate.getDate() < 10 ? '0' + chknowdate.getDate() : chknowdate.getDate();
                      alert('과거는 선택할 수 없습니다.');
                      if(x1.tagName == "INPUT" )
                       x1.value = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                      else
                       	x1.innerText = chknowdate.getFullYear()+ "-" +  TempMonth + "-" + TempDate; 
                     
                   }  
                     break;    
                 }
             }
         }
       }
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	
    	if(x1.tagName == "INPUT" )
	      x1.value = "0000-00-00";
      else
      	x1.innerText = "0000-00-00";
      setCaretPosition(x1 ,0 );
    }
	}
	if(x5 == 4)  //YYYY_MM
	{
	   try
     { 
         if(savecusur == 4)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 3;
         }
         else
         {
         	savecusur = 5;
         }
      }
      
      if(x1.tagName == "INPUT" )
       fullday = x1.value.replace(/-/g, "");
      else
      	fullday = x1.innerText.replace(/-/g, "");
      	
       year   = fullday.substring(0,4);
       month  = fullday.substring(4,6);
       year = transfer_year(year);
       month =  transfer_month(month);
      
       if(x1.tagName == "INPUT")
       	x1.value = year + "-" +  month;
       else
       	x1.innerText = year + "-" +  month;
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	 if(x1.tagName == "INPUT")
       	x1.value = "0000-00";
       else
       	x1.innerText = "0000-00";
      
      setCaretPosition(x1 ,savecusur );
    }
	}
	if(x5 == 5) //MM_DD
	{
	   try
     { 
      
      if(savecusur == 2)
      {
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 1;
         }
         else
         {
         	savecusur = 3;
         }
      }
   
   		if(x1.tagName == "INPUT")
       fullday = x1.value.replace(/-/g, "");
      else
      	fullday = x1.innerText.replace(/-/g, "");
      	
       month   = fullday.substring(0,2);
       day  = fullday.substring(2,4);
       
    
       month = transfer_month(month);
       day =  transfer_day(day,month);
      
       if(x1.tagName == "INPUT")
       x1.value = month + "-" + day;
      	else 
      		x1.innerText = month + "-" + day;
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	if(x1.tagName == "INPUT")
       	x1.value = "00-00";
       else
       	x1.innerText = "00-00";
      
      setCaretPosition(x1 ,savecusur );
    }
	}
	if(x5 == 6) //HH:MM
	{
	   try
     { 
  

      if(savecusur == 2)
      {
      	
      	//백스페이스나 오른쪽키는 반대로
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 1;
         }
         else
         {
         	savecusur = 3;
         }
      }
  
  		 if(x1.tagName == "INPUT")
       	fulltime = x1.value.replace(/:/g, "");
       else
       	fulltime = x1.innerText.replace(/:/g, "");
       	
       hour   = fulltime.substring(0,2);
       minute  = fulltime.substring(2,4);
    
       hour = transfer_hour(hour);
       minute =  transfer_minute(minute);
      
       if(x1.tagName == "INPUT")
       	x1.value = hour + ":" + minute;
       else
      	x1.innerText = hour + ":" + minute;
      	
       setCaretPosition(x1 ,savecusur );
       
    }
    catch(e)
    {
    	
    	if(x1.tagName == "INPUT")
       	x1.value = "00:00";
       else
      	x1.innerText = "00:00";
      	      
      setCaretPosition(x1 ,0 );
    }
	}
	if(x5 == 7) //HH:MM:ss
	{
	   try
     { 
       
       
       
       if(savecusur == 2)
      {
      	
      	//백스페이스나 오른쪽키는 반대로
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 1;
         }
         else
         {
         	savecusur = 3;
         }
       }
       if(savecusur == 5)
      {
      	
      	//백스페이스나 오른쪽키는 반대로
      	if(event.keyCode == 37 || event.keyCode == 8)
      	{
      	 savecusur = 4;
         }
         else
         {
         	savecusur = 6;
         }
       }
       
       if(x1.tagName == "INPUT")
       	fulltime = x1.value.replace(/:/g, "");
       else
       	fulltime = x1.innerText.replace(/:/g, "");
       	
       hour   = fulltime.substring(0,2);
       minute  = fulltime.substring(2,4);
       second  = fulltime.substring(4,6);
      
    
       hour = transfer_hour(hour);
       minute =  transfer_minute(minute);
       second = transfer_second(second);
       
       if(x1.tagName == "INPUT")
       	x1.value = hour + ":" + minute + ":" + second;
       else
       	x1.innerText = hour + ":" + minute + ":" + second;
       setCaretPosition(x1 ,savecusur );
    }
    catch(e)
    {
    	if(x1.tagName == "INPUT")
      	x1.value = "00:00:00";
      else
      	x1.innerText = "00:00:00";
      	
      setCaretPosition(x1 ,savecusur );
    }
	}
	}
	finally
	{
	  savecusur = null;
    formArr = null;
    x4 = null;
    x5 = null;
    fullday = null;
    year  = null;
    month = null;
    day = null;
    hour = null;
    minute = null; 
    second = null;
    date = null;
    koreanday  = null;
    dayStr = null;
	}
 
}

//--------------------BKSNP HighLight--------------------------------//

function BK_FindParsingRule(id, no)
{
	var n = typeof no != "undefined"?no:0;
	var len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		if(id != ParsingRule[i][n])
			continue;
		return i;
	}
	return -1;
}

function BK_SetLabelHData(item)
{
	var len = item.length;
	for(var i=0; i<len; i++)
	{
		if(item[i].r_type != "label")
			continue;
		
		var obj = document.getElementById(item[i].r_id);
		if(obj==null || obj.style.display == "none")
			continue;
		
		var cLen = item[i].r_child?item[i].r_child.length:0;
		var chList = item[i].r_child;
		var nArr = new Array();
		if(cLen == 0 && G_VT01 >= 2)
		{
			chList = BK_GetSubElement(null, obj);
			cLen = chList.length;
		}
		
		for(var j=0; j<cLen; j++)
		{
			var tObj = document.getElementById(chList[j]);
			if(tObj==null)
					tObj = document.getElementById("VAL_"+chList[j].split("_")[1]);
			if(item[i].r_mode == '2')
			{
				var plen = ParsingRule.length;
				var cId = chList[j].split("_")[1];
				var tIdx = BK_FindParsingRule(cId);
				if(tIdx == -1)
					continue;
				if(ParsingRule[tIdx][3] == '7')
					tObj = document.getElementById(ParsingRule[tIdx+1][0]);
				else 
					tObj = document.getElementById("INPUT_"+ParsingRule[tIdx][0]);
			}
			
			if(tObj)
				nArr[j] =  [tObj.id, tObj.outerHTML];
			else
				nArr[j] = [chList[j], ""];
		}
		
		obj.innerHTML = item[i].r_value;
		
		if(!chList || chList.length==0)
			continue
		
		for(var j=0; j<cLen; j++)
		{
			var tObj = document.getElementById(chList[j]);
			if(tObj)
				tObj.outerHTML = nArr[j][1];
		}
	
	}
	
}

function BK_GetComObj(id, type, mode, value, org)
{
	var obj = null;
	switch(type)
	{
		case "grid_caption":
		case "caption":
		obj = document.getElementById(id);
		if(obj == null)
		{
			var subid = id.split("_");
			var tIdx = BK_FindParsingRule(subid[1], 9);
			if(tIdx != -1)
				obj = document.getElementById(id.replace("CAP", "VAL"));
			else
			{
				tIdx = BK_FindParsingRule(subid[1]);
				if(tIdx == -1)
					obj = document.getElementById(id.replace("CAP", "VAL"));
			}
		}
		else
		{
			if(type != "grid_caption")
			{
			//	obj = document.getElementById(id.replace("CAP_", ""));
				if(obj && obj.childNodes)
				{
					var ch = obj.childNodes;
					var len = ch.length;
					for(var i=0; i<len; i++)
					{
						if(ch[i].nodeName == "#text" || ch[i].nodeName.toUpperCase() == "BR")
							continue;
						if(ch[i].id != "")
							continue;
						if(ch[i].childNodes && ch[i].childNodes.length && ch[i].childNodes[0].tagName == "B" && ch[i].childNodes[0].id != "")
							obj = ch[i].childNodes[0];
						else 
							obj = ch[i];
						
						value = (value +(value.indexOf("&nbsp;")==-1?"&nbsp;":""));
						obj.innerHTML = value;//value +"&nbsp;";//obj.innerHTML.replace(org, value);
						obj = null;
						break;
					}
				}
			}
		}
		break;
		case "next":
			obj = document.getElementById(id);
			if(!obj)
				obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(obj)
			{
				var tIdx = BK_FindParsingRule(id.split("_")[1]);
				if(tIdx != -1 && ParsingRule[tIdx][3] == 8)
					obj = document.getElementById("INPUTU1_"+ParsingRule[tIdx][0]);
				else
				{
					var tobj = document.getElementById(id.replace("VAL", "INPUT"));
					if(tobj)
						obj = tobj;
				}
			}
			/*
			var ch = obj;
			if(obj && mode == 2)
				ch = obj.firstChild;
			
			var tIdx = BK_FindParsingRule(id.split("_")[1]);
			//if(tIdx!= -1 && ParsingRule[tIdx][3] == 8 && obj && obj.tagName == "INPUT")
			//	return obj.nextSibling;
			if(obj && tIdx != -1 && ParsingRule[tIdx][18] != "")
			{
				while(ch)
				{
					var org_data = "";
					if(ch.nodeName == "#text")
						org_data = ch.data;
					else 
						org_data = ch.innerText;
					
					val = org_data.substring(0,1);
					if(val == " ")
						val = org_data.substring(1, org_data.length);
					if(val== ParsingRule[tIdx][18])
						break;
					ch = ch.nextSibling;
				}
				obj = ch;
			}
			else */
			if(obj)
				obj = obj.nextSibling;
		break;
		case "prevois":
			obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(obj)
				obj = obj.previousSibling;
		break;
		case "1": case "2": case "3": case "4": case "8":
		case 1:case 2: case 3: case 4: case 8:
			obj = document.getElementById(id);
			if(obj == null)
				obj = document.getElementById(id.replace("INPUT", "VAL"));
			if(obj == null)
				obj = document.getElementById(id.replace("INPUTU1", "VAL"));
			if(obj && typeof obj.tagName != "undefined")
			{
				if(obj.tagName == "INPUT" )
					obj = BK_ChangeInput(obj);
				else if(obj.tagName == "TEXTAREA")
					obj = BK_ChangeTextarea(obj);
			}
		break;
		case "checkbox":
		case 7:
			obj = document.getElementById(id);
			
			if(obj == null)
			{
				obj = document.getElementById("VAL_"+id.split("_")[1]);
				if(obj)
				{
					obj.innerHTML = obj.innerHTML.replace(org, value);
					return null;
				}
			}
		break;
		case "radio":
		case 6:
			obj = document.getElementById(id);
			if(obj == null)
				obj = document.getElementById("VAL_"+id.split("_")[1]);
			if(obj && obj.tagName != "INPUT" && obj.innerText != org)
				obj = null;
		break;
		case 5:
		break;
		default:
		{
			obj = document.getElementById(id);
			if(obj == null || mode == '2')
			{
				var cId = id.split("_")[1];
				var tIdx = BK_FindParsingRule(cId);
				if(tIdx==-1)
					break;
				if(ParsingRule[tIdx][3] == 6 )
				{
					var pId = tIdx;
					org = trim(org);
					if(ParsingRule[pId][21]!= "")
					{
						var vlen = ParsingRule[pId][21].length;
						for(var j=0; j<vlen; j++)
						{
							org = org.replace(ParsingRule[pId][21].substring(j,j+1), "");
						}

					}
					
					tIdx++;
					var len = ParsingRule.length;
					for(; tIdx<len; tIdx++)
					{
						if(ParsingRule[tIdx][2] != 8 && ParsingRule[tIdx][3] != 6)
							break;
						var tObj = document.getElementById(ParsingRule[tIdx][0]);
						
						if(tObj && ParsingRule[tIdx][12] == org)
							obj = tObj.nextSibling?tObj.nextSibling:tObj.previousSibling;
					}
					if(obj)
						return obj;
				}
				else if(ParsingRule[tIdx][3] == 7 )
				{
					tIdx++;
					var vals = value.split(", ");
					var orgs = org.split(", ");
					var cId = id.split("_")[1];
					
					var vLen = vals.length;
					var len = ParsingRule.length;
					for(var i=0; i<vLen; i++)
					{
						for(; tIdx<len; tIdx++)
						{
							if(ParsingRule[tIdx][2] != 8 && ParsingRule[tIdx][3] != 7)
								break;
							var tObj = document.getElementById(ParsingRule[tIdx][0]);
							if(tObj && ParsingRule[tIdx][12]== orgs[i])
							{
								obj = tObj.nextSibling?tObj.nextSibling:tObj.previousSibling;
								obj.innerHTML = vals[i];
								break;
							}
						}	
					}
					return null;
				}
				else if(ParsingRule[tIdx][3] == 5 )
					return;
				
				if(ParsingRule[tIdx][2] == 4)
				{
					if(ParsingRule[tIdx][3] == 8)
						obj = BK_GetComObj(id.replace("VAL","INPUTU1"), ParsingRule[tIdx][3], mode, value, org);
					else
						obj = BK_GetComObj(id.replace("VAL","INPUT"), ParsingRule[tIdx][3], mode, value, org);
				}
				else if( ParsingRule[tIdx][3] == 8)
					obj = BK_GetComObj("INPUTU1_"+cId, ParsingRule[tIdx][3], mode, value, org);
				else if(obj == null || ParsingRule[tIdx][3] != 0)
					obj = BK_GetComObj("INPUT_"+cId, ParsingRule[tIdx][3], mode, value, org);
			}
		}
		break;
	}
	return obj;
}

function BK_SetHData(item)
{
	checkhighlight = true;
	checkmode = true;
	BK_SetLabelHData(item);
	var len = item.length;
	var newIt = null;
	var ex = 0;
	for(var i=0; i<len; i++)
	{
		if(item[i].r_type == "label" )
			continue;
		
		item[i].r_value = item[i].r_value.replace(/ style=''/gi, "");
		item[i].r_value = item[i].r_value.replace(/ style=\"\"/gi, "");
		item[i].r_value = item[i].r_value.replace(/ style='0'/gi, "");
		item[i].r_value = item[i].r_value.replace(/ size=+0/gi, "");
		var obj = BK_GetComObj(item[i].r_id, item[i].r_type, item[i].r_mode, item[i].r_value, item[i].r_org);
		
		if(obj == null)
			continue;
			
		if(newIt == null)
			newIt = obj;

		if(item[i].r_id.indexOf("RADIO")!=-1 && newIt.type == "radio")
			newIt = newIt.nextSibling!=null?newIt.nextSibling:newIt.previousSibling;
		else if(item[i].r_id.indexOf("CHECK")!=-1 && newIt.type == "checkbox")
			newIt = newIt.nextSibling!=null?newIt.nextSibling:newIt.previousSibling;
			
		if(newIt == null)
			continue;
			
		var chList = new Array();
		if(item[i].r_type == "grid_caption")
		{
			var chList = item[i].r_value.split("※☆※");
			var ch = newIt.childNodes;
			var cLen = ch.length;
			for(var j=0; j<cLen; j++)
				ch[j].innerHTML = chList[j];
		}
		else if(newIt.nodeName != "#text")
		{
			var tId = newIt.id.split("_");
			if(tId.length >= 2)
			{
				//tId = BK_FindParsingRule(tId[1]);
				//if(tId !=-1 && ParsingRule[tId][3] == 8)
					//item[i].r_value = item[i].r_value.replace(ParsingRule[tId+1][13], "");
			}
			if(newIt.id == "")
			{
				tId = item[i].r_id.split("_");
				if(tId.length >= 2)
				{
					tId = BK_FindParsingRule(tId[1]);
					if(tId!=-1 && ParsingRule[tId][21]!= "")
					{
						var vlen = ParsingRule[tId][21].length;
						for(var j=0; j<vlen; j++)
						{
							item[i].r_value = item[i].r_value.replace(ParsingRule[tId][21].substring(j,j+1), "");
						}
					}
				}
			}
			
			if(newIt.id.split("_").length>2)
				item[i].r_value = item[i].r_value.replace("&nbsp;", " ");
			if(newIt.nodeName != "SELECT")
				newIt.innerHTML = item[i].r_value;
				
		  var tempStr = newIt.innerHTML;
			tempStr = tempStr.replace(/ size=\+0/gi, "");
		//	tempStr = tempStr.replace(/ /gi, "&nbsp;");
			if(tempStr != item[i].r_value)
			{
				
				if(newIt.tagName == "TD")
					newIt.innerText = item[i].r_value;
				else
				{
					newIt.innerText = "※★☆※";
					newIt.outerHTML = newIt.outerHTML.replace("※★☆※", item[i].r_value);
				}
				
			}
		}
		else
		{
			var org = newIt.data;
			if(trim(org) != trim(item[i].r_org))
				newIt.nodeValue = org.replace(item[i].r_org, "※★☆※");
			else
				newIt.nodeValue = "※★☆※";
			
			var pNode = newIt.parentNode;
			
			if(pNode)
				pNode.innerHTML= pNode.innerHTML.replace("※★☆※", item[i].r_value);
		}
	
		newIt = null;
	}
}

function BK_Hilight()
{
	this.r_id;
	this.r_type;
	this.r_value;
	this.r_child;
	this.r_mode;
	this.r_org;
}

function BK_GetHData(x1, item)
{
	var id = x1.getAttribute("id");
	var idx = item.length;
	item[idx] = new BK_Hilight();
	item[idx].r_id = x1.getAttribute("id");
	item[idx].r_type = x1.getAttribute("type");
	item[idx].r_mode = x1.getAttribute("mode");
	item[idx].r_value = "";
	var r_data = x1.getElementsByTagName("H_DATA");
	if(typeof r_data[0].text != "undefined")
		item[idx].r_value = r_data[0].text;
	else if(typeof r_data[0].textContent != "undefined")
		item[idx].r_value = r_data[0].textContent;
		
	item[idx].r_child = null;
	
	var ch = x1.getElementsByTagName("IN_ITEM");
	if(ch.length)
	{
		var temp = ch[0].text?ch[0].text:ch[0].textContent?ch[0].textContent:"";
		if(temp!= "")
			item[idx].r_child = temp.split("※");
	}
	var r_org = x1.getElementsByTagName("H_ORG_DATA");
	if(r_org.length)
		item[idx].r_org = r_org[0].text?r_org[0].text:r_org[0].textContent;
}

function BK_loadHXml(x0)
{
	
	
	var x1;
	if(window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		G_ORGXML=x0.replace("encoding='UTF-16'", "encoding='euc-kr'");
		
		x1.loadXML(G_ORGXML);
	}
	else if(window.DOMParser)
	{
		var parser = new DOMParser();
		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"),"text/xml");
	}
	if(x1==null)
		return;
		
	var BL_ITEM = new Array();
	var hlList = x1.getElementsByTagName("H_ATTR");
	var hLen = hlList.length;
	for(var j=0; j<hLen; j++)
		BK_GetHData(hlList[j], BL_ITEM);
	
	BK_SetHData(BL_ITEM);
}

var r_ElId = new Array();
var g_enEl = null;
var g_stEl = null;
function BK_setBodyEvent()
{
	if(!document.body)
		return;
	
	if(document.body.onmouseup==null || document.body.onmouseup=="")
		document.body.onmouseup = BK_onMouseUp;
	if(document.body.onmousedown==null|| document.body.onmousedown == "")
		document.body.onmousedown =BK_onMouseDown;
	if(document.body.onkeydown == null || document.body.onkeydown == "")
		document.body.onkeydown = BK_onKeyDown;
}

function BK_onMouseUp()
{
	g_enEl = window.event.srcElement;
	if(g_stEl == null || g_enEl == null)
		return;
	var obj = parent.document.getElementById('hlFontSize');
	if(obj == null)
		return;
	if(g_stEl.currentStyle.fontSize == g_enEl.currentStyle.fontSize)
	{
		
		switch(g_stEl.currentStyle.fontSize)
		{
			case "2":
				obj.value = "2";
			break;
			case "3":
				obj.value = "3";
			break;
			case "4":
				obj.value = "4";
			break;
			default:
				obj.value = "0";
			break;
		}
		
	}
	else
	{
		obj.value = "0";
	}
}
function BK_onMouseDown()
{
	g_stEl = window.event.srcElement;
	if(parent.parent &&parent.parent.hlOpenFlag )
			parent.parent.dragPointer = "DOCUMENT_PAN";
}

function BK_onKeyDown()
{
	var el = event.srcElement;
	var kCode = event.keyCode;
	if(kCode != "13")
		return true;
	while(el)
	{
 		var cId = el.id?el.id:"";
 		var tm = cId.split("_");
 		if(cId == "" || tm.length<2)
 			el = el.parentElement;
 		else
 		{
 			var tIdx = BK_FindParsingRule(tm[1]);
 			if(tIdx == -1)
 				return true;
 			if(ParsingRule[tIdx][3] != 3)
 				return false;
 			return true;
 		}
	}
	
	return true;
}


function BK_DoHilight(mode, value)
{
	return BK_ExecuteHilight(mode, value);
	
	
	if(g_stEl == null)
		return;
	/*if(g_stEl.tagName.toUpperCase() == "TR" || g_stEl.tagName.toUpperCase() == "TD")
		return;*/
	checkmode = true;
	checkhighlight = true;
	var newIt = g_stEl;
	if(g_stEl.tagName == "input" || g_stEl.tagName == "INPUT")
		newIt = BK_ChangeInput(g_stEl);
	else if(g_stEl.tagName == "textarea" || g_stEl.tagName == "TEXTAREA")
		newIt = BK_ChangeTextarea(g_stEl);

		
	g_stEl = newIt;
	
	if(mode == 1)
	{
		/*if(value == "#FFFFFF" || value == "#ffffff")
			document.execCommand("removeFormat", true, "");
		else*/
			document.execCommand("backcolor", false, value);
		
		var range = null;
		if(document.selection)
		{
			try
			{
				range = document.selection.createRange();
				range.collapse(false);
				range.select();
			}
			catch(e)
			{
			}
		}
		else
		{
			range = window.getSelection();
			range.collapseToEnd();
		}
	}
	else if(mode == 2)
		document.execCommand("FontSize", false, value);
	else if(mode == 3)
		document.execCommand("bold");
	else if(mode == 4)
		document.execCommand("underline");
	else if(mode == 5)
		document.execCommand("ForeColor", false, value);
}

function BK_ChangeInput(tItem)
{
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	
	var pos = -1;
	if(document.selection && document.selection.type != "None" && document.selection.createRange)
	{
		var range = null;
		var node = null;
		var nText = null;
		try
		{
			range = document.selection.createRange();
			node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
			nText = node.value;
			if(typeof nText != "undefined")
				rText = range.text;
			
			pos = BK_FindPos4Single(range, node, nText);
			dvId = node.id;
		}
		catch(e)
		{
			nText = "";
			if(g_stEl)
				dvId = g_stEl.id;
			pos = 0;
		}
		tagType = true;
	}
	else if(window.getSelection)
	{
		var range = window.getSelection();
		var node = range.anchorNode;
		if(node != null && node.nodeName != "#text")
		{
			sCnt = node.innerText.indexOf(range.Text);
			eCnt = range.focusOffset;
		}
		dvId = tItem.id;
	}
	
	
	var newIt = document.createElement('SPAN');
	newIt.id = tItem.id;
	var textId = newIt.id.split('_')[0];
 
	if(newIt.id != ""&&  tItem.type == 'text' )
	{
		newIt.className = "editable_div";
		newIt.style.width = tItem.style.width;
		//newIt.style.height=tItem.currentStyle.height;//'20px'; 	
		//newIt.style.borderStyle = 'solid'; 
		//newIt.style.borderWidth = '1px';
    //newIt.style.borderColor='#ababab';

		newIt.style.cssText = tItem.style.cssText;
		//newIt.style.borderTop='none'; 
		//newIt.style.borderLeft='none';
		//newIt.style.borderRight='none';
		//newIt.style.overflow='hidden';
		
		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
		//newIt.style.overflow=tItem.style.overflow;
		//newIt.currentStyle = tItem.currentStyle;
		
		if(tItem.onclick)
			newIt.onclick = tItem.onclick;
		if(tItem.ondblclick)
			newIt.ondblclick = tItem.ondblclick;
		if(tItem.onkeyup)
			newIt.onkeyup = tItem.onkeyup;

		newIt.readOnly = tItem.readOnly;
		
		if(tItem.readOnly!=true)
			newIt.setAttribute("contentEditable", true);
		
		newIt.innerText = tItem.value;
		var pNode = tItem.parentNode;
		pNode.replaceChild(newIt, tItem);
	}
	
	newIt.focus();
	if(tagType)
	{
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(newIt);
		
		rText = rText.replace(/\r\n/g, "\n");
		rText = rText.replace(/\t/g, " ");
		var inText = newIt.innerText.replace(/\r\n/g,"\n");
		
		if(pos != -1)
			sCnt = pos;
			
		eCnt = inText.length - (sCnt + rText.length);
		
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		dRange.select();
	}
	
	return newIt;
}



function BK_ChangeTextarea(tItem)
{
	var sCnt = 0;
	var eCnt = 0;
	var dvId = "";
	var rText = "";
	var tagType = false;
	var pos = -1;
	if(document.selection && document.selection.type != "None" && document.selection.createRange)
	{
		var range = document.selection.createRange();
		var node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
		var nText = node.innerText;
		if(typeof nText != "undefined")
			rText = range.text;
		pos = BK_FindPos(range, node, nText);
		
		dvId = node.id;
		tagType = true;
	}
	else if(window.getSelection)
	{
		var range = window.getSelection();
		var node = range.anchorNode;
		if(node != null && node.nodeName != "#text")
		{
			sCnt = node.innerText.indexOf(range.Text);
			eCnt = range.focusOffset;
		}
		dvId = tItem.id;
	}
	
	var newIt = document.createElement('div');
	newIt.id = tItem.id;
  
	if(newIt.id != "")
	{
	  newIt.className = "editable_div";
		newIt.style.cssText = tItem.style.cssText;
		/*newIt.style.borderStyle = 'solid'; 
		newIt.style.borderWidth = '1px';
    newIt.style.borderColor='#ababab';*/
    
		newIt.cssText = tItem.style.cssText;
		newIt.readOnly =tItem.readOnly;
		
		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
		if(tItem.readOnly!=true)
			newIt.setAttribute("contentEditable", true);
		newIt.innerText = tItem.innerText;	
		var pNode = tItem.parentNode;
  
		pNode.replaceChild(newIt, tItem);
		//newIt.innerText = nText;
	}
	
	newIt.focus();
	if(tagType)
	{
		var dRange = document.body.createTextRange();
		dRange.collapse(true);
		dRange.moveToElementText(newIt);
		
		rText = rText.replace(/\r\n/g, "\n");
		rText = rText.replace(/\t/g, " ");
		var inText = newIt.innerText.replace(/\r\n/g,"\n");
		for(var i=0; i<=pos; i++)
		{
			sCnt = inText.indexOf(rText, sCnt);
			if(sCnt>=0)
				sCnt++;
		}
		if(sCnt != -1)
			sCnt--;
			
		eCnt = inText.length - (sCnt + rText.length);
		
		dRange.moveStart("character", sCnt);
		dRange.moveEnd("character", -eCnt);
		
	
		dRange.select();
	}
	
	return newIt;
}

function BK_FindPos(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = document.body.createTextRange();
	
	s1 = s1.replace(/\r\n/g, "\n");
	s.moveToElementText(node);
	s.moveEnd("character", (s1.length-x.text.length+1)*-1);
	
	var fT = x.text.replace(/\r\n/g, "\n");
	var len = s1.length;
	var pos = 0;
	var pos1 = 0;
	var out = "";
	var cnt = 0;
	while(pos <len)
	{
		pos = s1.indexOf(fT, pos);
		if(pos<0) break;
		
		s.moveEnd("character", pos-pos1);
		s.moveStart("character", pos-pos1);
		pos1 = pos;
		
		if(x.boundingTop == s.boundingTop && x.boundingLeft == s.boundingLeft)
			break;
		
		pos++;
		cnt++;
	}
	return cnt;
}


function BK_FindPos4Single(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = node.createTextRange();
	
	s1 = s1.replace(/\r\n/g, "\n");
	//s.moveToElementText(node);
	s.moveEnd("character", (s1.length-x.text.length+1)*-1);
	
	var fT = x.text.replace(/\r\n/g, "\n");
	var len = s1.length;
	var pos = 0;
	var pos1 = 0;
	var out = "";
	var cnt = 0;
	var idx = 0;
	while(pos <len)
	{
		pos = s1.indexOf(fT, idx++);
		if(pos<0) break;
		
		s.moveEnd("character", pos-pos1);
		s.moveStart("character", pos-pos1);
		pos1 = pos;
		
		if(x.boundingLeft == s.boundingLeft || x.boundingLeft < s.boundingLeft) 
			break;
		
	//	pos++;
	}
	
	return pos;
}


function BK_Replace(org, t1, t2)
{
	var temp = org;
	while(temp.indexOf("\t") != -1)
	{
		temp = temp.replace("\t", t2);
	}
	return temp;
}

function BK_CheckSubEle(id, isIdx)
{
	var len = r_ElId.length;
	var i = 0;
	for(; i<len; i++)
	{
		var eId = r_ElId[i][0];
		if(isIdx)
			eId = eId.split("_");
		if(eId[1]==id && eId[0]!="CAP")
				return true;
	}
	
	if(len != 0 && i >= len)
		return false;
}

function BK_MakeStr(id, type, value, org)
{
	if(value == org)
		return"";
		
	return "<H_ATTR id='"+id+"' type='"+type+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+value+"]]></H_DATA><H_ORG_DATA><![CDATA["+org+"]]></H_ORG_DATA></H_ATTR>";
}

function BK_GetHilightStr()
{
	var xmlStr = "<BK_HILIGHT>";
	
	xmlStr += BK_GetGroupStr();
	
	len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		switch(ParsingRule[i][2])
		{
			case 5:
				xmlStr += BK_GetAttrStr(i, '');
			break;
			case 8:
				xmlStr += BK_GetOptionStr(i,  '');
			break;	
			case 3:
				xmlStr += BK_GetGridHeadStr(i);
			break;
			case 4:
				xmlStr += BK_GetGridValueStr(i);
			break;
		}
	}
	
	return xmlStr +"</BK_HILIGHT>";
}

function BK_GetGroupStr()
{
	var xmlStr = "";
	var len = InstItem.length;
	for(var i=0; i<len; i++)
	{
		if(InstItem[i][3] != "")
			continue;
		var obj = document.getElementById('DIV_'+InstItem[i][0]);
		if(obj==null)
			continue;
		var gLen = GD_Info.length;
		var isGrid = false;
		for(var j=0; j<gLen; j++)
		{
			if(GD_Info[j][0] != InstItem[i][0])
				continue;
			isGrid = true;
		}
		if(isGrid)
			continue;
		
		var bObj = obj.getElementsByTagName("B");
		if(bObj)
		{
			var bLen = bObj.length;
			for(var j=0; j<bLen; j++)
				bObj[j].setAttribute("id", "");
		}
		
		var ch = BK_GetSubElement(null, obj);
		xmlStr += ("<H_ATTR id='"+obj.id+"' type='label' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA>");
		xmlStr += "<IN_ITEM><![CDATA[";
		var chLen = ch?ch.length:0;
		for(var j=0; j<chLen; j++)
			xmlStr += (ch[j]+"※");
		xmlStr += ("]]></IN_ITEM></H_ATTR>");
	}
	
	for(var i=0; i<len; i++)
	{
		if(InstItem[i][3] != "")
			continue;
		var gLen = GD_Info.length;
		var isGrid = false;
		for(var j=0; j<gLen; j++)
		{
			if(GD_Info[j][0] != InstItem[i][0])
				continue;
			isGrid = true;
		}
		if(isGrid)
			continue;
			
		var obj = document.getElementById("DIV_"+InstItem[i][0]);
		if(obj)
			continue;
		obj = document.getElementById("CON_"+InstItem[i][0]);
		if(obj)
			continue;
		obj = document.getElementById(InstItem[i][0]);
		if(obj==null)
			continue;
		var ch = BK_GetSubElement(null, obj);
		var clen = ch.length;
		for(var j=0; j<clen; j++)
		{
			var cid = ch[j].split("_");
			if(cid.length<2)
				continue;
			var tIdx = BK_FindParsingRule(cid[1]);
			if(tIdx != -1 )
				continue;
			obj = document.getElementById(ch[j]);
			var comtype = ch[j].indexOf("CAP")!=-1?"caption":"0";
			var inHtml = obj.innerHTML;
			var inText = obj.innerText;
			inHtml = inHtml.replace(/&nbsp;/g, " ");
			inText = inText.replace(/\r\n/g, "<BR>");
			if(obj && typeof obj.innerHTML != "undefined" && inHtml != inText)
				xmlStr += BK_MakeStr(obj.id, comtype, obj.innerHTML, obj.innerText);//("<H_ATTR id='"+obj.id+"' type='"+comtype+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
		}
	}
	
	return xmlStr;
}

function BK_GetGridHeadStr(idx)
{
	var str = "";
	var obj = document.getElementById(ParsingRule[idx][0]+"_H_1");
	if(obj == null)
		return str;
	var ch = obj.childNodes;
	var len = ch.length;
	if(len)
	{
		//str += ("<H_ATTR id='"+ParsingRule[idx][0]+"_H_1' type='grid_caption' mode='"+G_VT01+"'><H_DATA><![CDATA[");
		
		for(var i=0; i<len; i++)
			str += (ch[i].innerHTML+"※☆※");
		//str += "]]></H_DATA></H_ATTR>";
		str = BK_MakeStr(ParsingRule[idx][0]+'_H_1', 'grid_caption', str, '');
	}
	return str;
}

function BK_GetGridValueStr(idx)
{
	var gridId = "";
	var str = "";
	var len = G_V_Info.length;
	for(var i=0; i<len; i++)
	{
		if(G_V_Info[i][0] != ParsingRule[idx][0])
			continue;
		gridId = G_V_Info[i][1];
	}
	if(gridId == "")
		return str;
	var cnt = CheckCurGridValRowCnt(ParsingRule[idx][0]);
	for(var i=0; i<cnt; i++)
		str += BK_GetAttrStr(idx, "_"+i+"_0");
	return str;
}

function BK_GetAttrStr(idx, subStr)
{
	var str = "";
	if(ParsingRule[idx][3] == 12)
		return str;
	var obj = document.getElementById('CAP_'+ParsingRule[idx][0]+subStr);
	if(obj && ParsingRule[idx][12] != "" && typeof obj.innerHTML != "undefined" && obj.innerHTML != "")// && obj.innerHTML != obj.innerText)
	{
		var inHtml = obj.innerHTML.replace(/&nbsp;/gi, " ");
		var inText = obj.innerText;
		if(inHtml != inText)
		{
			if(obj.parentElement.tagName.toUpperCase() == "FONT" || obj.parentElement.tagName.toUpperCase() == "B" ||obj.parentElement.tagName.toUpperCase() == "U")
			{
				var fontTag = ch[i].outerHTML.replace(ch[i].innerHTML, "☆★○●");
				if(obj.innerText != "")
					str += BK_MakeStr(obj.id, 'caption', fontTag.replace("☆★○●", obj.innerText), obj.innerText );//("<H_ATTR id='"+obj.id+"' type='caption' mode='"+G_VT01+"'><H_DATA><![CDATA["+fontTag.replace("☆★○●", obj.innerText)+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
			}
			else if(inText != "")
				str += BK_MakeStr(obj.id, 'caption', obj.innerHTML,obj.innerText);//("<H_ATTR id='"+obj.id+"' type='caption' conType='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
		}
	}
	
	switch(ParsingRule[idx][3])
	{
		case 0:
			obj = document.getElementById('VAL_'+ParsingRule[idx][0]+subStr);
			if(obj)
			{
				var inStr = typeof obj.innerHTML != "undefined"?obj.innerHTML:"";
				if(inStr =="")
					break;
						
				var ch = obj.childNodes;
				var chLen = ch.length;
				inStr = "";
				for(var i=0; i<chLen; i++)
				{
					if(ch[i].nodeName == "FONT")
					{
						if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
							inStr += ch[i].innerHTML;
						else
							inStr += ch[i].outerHTML;
					}
					else if(ch[i].nodeName == "#text")
						inStr += ch[i].data;
					else
						inStr += ch[i].outerHTML;
				}
				
				str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, ParsingRule[idx][3], inStr, obj.innerText);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+inStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
				
				if(ParsingRule[idx][18] == "")
					break;
				
				while(obj.nextSibling)
				{
					obj = obj.nextSibling;
					if(obj.nodeName != "#text" && typeof obj.outerHTML != "undefined" && obj.outerHTML != ParsingRule[idx][18])
						str += BK_MakeStr('VAL_'+ParsingRule[idx][0]+subStr, 'next', obj.outerHTML, ParsingRule[idx][18]);//("<H_ATTR id='VAL_"+ParsingRule[idx][0]+subStr+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+obj.outerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][18]+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
		break;
		case 1:
		case 2:
		case 3:
		case 4:
		case 8:
			if(ParsingRule[idx][3] != 8)
				obj = document.getElementById('INPUT_'+ParsingRule[idx][0]+subStr);
			else
			{
				obj = document.getElementById('INPUT1_'+ParsingRule[idx][0]+subStr);
				if(obj == null)
					obj = document.getElementById('INPUTU1_'+ParsingRule[idx][0]+subStr);
			}
			if(obj==null)
				break;
			
			if(obj.tagName != "INPUT" && typeof obj.innerText != "undefined" && obj.innerText != "")
			{
				var inStr = obj.innerHTML;
				if(inStr == obj.innerText)
					break;
					
				//if(subStr != "")
				//	inStr = "&nbsp;"+inStr;
					
				var ch = obj.childNodes;
				var chLen = ch.length;
				inStr = "&nbsp;";
				for(var i=0; i<chLen; i++)
				{
					if(ch[i].nodeName == "FONT")
					{
						if(ch[i].style.getAttribute("backgroundColor") == "" && ch[i].style.getAttribute("fontSize") == "")
							inStr += ch[i].innerHTML;
						else
							inStr += ch[i].outerHTML;
					}
					else if(ch[i].nodeName == "#text")
						inStr += ch[i].data;
					else
						inStr += ch[i].outerHTML;
				}
				str += BK_MakeStr(obj.id, ParsingRule[idx][3], inStr, obj.innerText);//("<H_ATTR id='"+obj.id+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+inStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+obj.innerText+"]]></H_ORG_DATA></H_ATTR>");
			}
				
			if(ParsingRule[idx][18] != "" || ParsingRule[idx][3] == 8)
			{
				var nObj = obj;
				var inhtml = "";
				var opCnt = new Array();
				if(ParsingRule[idx][3] == 8)
				{
					var plen = ParsingRule.length;
					for(var j=idx+1; j<plen; j++)
					{
						if(ParsingRule[j][2] != 8)
							break;
						if(ParsingRule[j][3] != 8)
							break;
						var sid = ParsingRule[j][0].split("_");
						if(sid.length<2 || sid[1] != ParsingRule[idx][0])
							break;
						opCnt[opCnt.length] = [j, ParsingRule[j][12]];
					}
				}
				
				var inStr = " ";
				while(nObj.nextSibling)
				{
					nObj = nObj.nextSibling;
					if(nObj.nodeName == "#text")
					{
						inhtml += nObj.data;
						inStr += nObj.data;
					}
					else
					{ 
						if(opCnt.length>1 && nObj.nodeName == "SELECT")
						{
							inhtml += (" "+nObj.value);
							inStr += nObj.value;
						}
						else
						{
							inhtml += nObj.outerHTML;		
							inStr += nObj.innerText;
						}
					}
				}
							
				if(inhtml != inStr)
					str += BK_MakeStr(obj.id, 'next', inhtml, inStr);//("<H_ATTR id='"+obj.id+"' type='next' mode='"+G_VT01+"'><H_DATA><![CDATA["+instr+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][18]+"]]></H_ORG_DATA></H_ATTR>");
			}
			
			if(ParsingRule[idx][2] == 4 && ParsingRule[idx][17] != "")
			{
				var pObj = obj;
				while(pObj.previousSibling)
				{
					pObj = pObj.previousSibling;
					if(pObj.nodeName == "#text")
						continue;
					if(ParsingRule[idx][17] != pObj.outerText)
						continue;
					if(pObj.innerHTML != pObj.innerText)
						str += BK_MakeStr(obj.id, 'previos', pObj.innerHTML, pObj.innerText);//("<H_ATTR id='"+obj.id+"' type='previos' mode='"+G_VT01+"'><H_DATA><![CDATA["+pObj.innerHTML+"]]></H_DATA><H_ORG_DATA><![CDATA["+pObj.innerText+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
		break;
	}	
	return str;
}

function BK_GetOptionStr(idx, subStr)
{
	var str = "";
	switch(ParsingRule[idx][3])
	{
		case 6:
			var obj = document.getElementById(ParsingRule[idx][0]+subStr);
			if(obj)
			{
				var fontTag = "";
				if(obj.parentElement && (obj.parentElement.tagName.toUpperCase() == "FONT" ||obj.parentElement.tagName.toUpperCase() == "U" || obj.parentElement.tagName.toUpperCase() == "B"))
				{
					fontTag = obj.parentElement.outerHTML.replace(obj.parentElement.innerHTML, "☆★○●");
				}
				
				var cObj = null;
				if(obj.tagName == "INPUT")
					cObj = obj.nextSibling?obj.nextSibling:obj.previousSibling?obj.previousSibling:null;
				if(cObj && cObj.nodeName != "#text")
				{
					var sStr = cObj.tagName=="SPAN"?cObj.innerHTML:cObj.outerHTML;
					var tStr = cObj.tagName=="SPAN"?cObj.innerText:cObj.outerText;
					sStr = fontTag!=""?fontTag.replace("☆★○●", sStr):sStr;
					if( subStr != tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'radio', sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='radio' mode='"+G_VT01+"'><H_DATA><![CDATA["+sStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+tStr+"]]></H_ORG_DATA></H_ATTR>");
				}
				else if(cObj && fontTag != "" && cObj.nodeName == "#text")
				{
					var sStr = fontTag.replace("☆★○●", ParsingRule[idx][12]);
					var tStr = ParsingRule[idx][12];
					if(sStr != tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'radio', sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='radio' mode='"+G_VT01+"'><H_DATA><![CDATA["+sStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+tStr+"]]></H_ORG_DATA></H_ATTR>");
				}
			}
		break;
		case 7:
			var obj = document.getElementById(ParsingRule[idx][0]+subStr);
			if(obj)
			{
				var fontTag = "";
				if(obj.parentElement && (obj.parentElement.tagName.toUpperCase() == "FONT" ||obj.parentElement.tagName.toUpperCase() == "U" || obj.parentElement.tagName.toUpperCase() == "B"))
				{
					fontTag = obj.parentElement.outerHTML.replace(obj.parentElement.innerHTML, "☆★○●");
				}
				if(obj.tagName == "INPUT")
					obj = obj.nextSibling?obj.nextSibling:obj.previousSibling?obj.previousSibling:null;
				if(obj && obj.nodeName != "#text")
				{
					var sStr = obj.tagName=="SPAN"?obj.innerHTML:obj.outerHTML;
					var tStr = obj.tagName=="SPAN"?obj.innerText:obj.outerText;
					sStr = fontTag!=""?fontTag.replace("☆★○●", sStr):sStr;
					if(subStr!= tStr)
						str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'checkbox', sStr, tStr);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='checkbox' mode='"+G_VT01+"'><H_DATA><![CDATA["+sStr+"]]></H_DATA><H_ORG_DATA><![CDATA["+tStr+"]]></H_ORG_DATA></H_ATTR>");
				}
				else if(fontTag != "")
					str += BK_MakeStr(ParsingRule[idx][0]+subStr, 'checkbox', fontTag.replace("☆★○●", obj.data), ParsingRule[idx][12]);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='radio' mode='"+G_VT01+"'><H_DATA><![CDATA["+(fontTag.replace("☆★○●", obj.data))+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][12]+"]]></H_ORG_DATA></H_ATTR>");
			}
		break;
		/*case 8:
			var cId = ParsingRule[idx][0].split("_")[1];
			var obj = document.getElementById("INPUTU1_"+cId);
			if(obj == null)
				obj = document.getElementById("VAL_"+cId);
			if(obj==null)
				break;
			
			if(ParsingRule[idx][12] != "" && obj.nextSibling)
			{
				var nobj = obj.nextSibling;
				var instr = "";
				while(nobj)
				{
					if(nobj.nodeName != "#text")
						instr += nobj.outerHTML;
					else
						instr += nobj.data;
					nobj = nobj.nextSibling;
				}
				str += BK_MakeStr(ParsingRule[idx][0]+subStr, ParsingRule[idx][3], instr, ParsingRule[idx][12]);//("<H_ATTR id='"+ParsingRule[idx][0]+subStr+"' type='"+ParsingRule[idx][3]+"' mode='"+G_VT01+"'><H_DATA><![CDATA["+instr+"]]></H_DATA><H_ORG_DATA><![CDATA["+ParsingRule[idx][18]+"]]></H_ORG_DATA></H_ATTR>");
			}
		break;*/
	}	
	return str;
}


function BK_FindComponent(id, value)
{	
	var eId = id.split("_");
	var len = ParsingRule.length;
	var fArr = new Array();
	for(var i=0; i<len; i++)
	{
		var temp = ParsingRule[i][0].split("_");
		var tId = temp.length>1?temp[1]:temp[0];
		if(tId != eId[1])
			continue;
		fArr[fArr.length] = i;
	}
	
	len = fArr.length;
	if(len > 1)
	{
		for(var i=0; i<len; i++)
		{
			if(ParsingRule[fArr[i]][12] == value)
				return ParsingRule[fArr[i]];
		}
	}
	return id;
}


function BK_GetSubElement(eArr, pNode)
{
	var nextTime = false;
	if(eArr == null)
		eArr = new Array();
	else
		nextTime = true;
		
	var ch = pNode.childNodes;
	var len = ch.length;
	for(var i=0; i<len; i++)
	{
		var item = ch[i];
		if(item.id && item.id != "")
		{
			var len2 = eArr.length;
			var j = 0;
			for(; j<len2; j++)
			{
				if(eArr[j] == item.id)
					break;
			}
			if(j >= len2 && item.id!="")
				eArr[eArr.length] = item.id;
		}
		
		BK_GetSubElement(eArr, item);
	}
		
	return eArr;
}


function BK_SetSpecId()
{
	var bObj = document.getElementsByTagName("B");
	var len = bObj.length;
	for(var i=0; i<len; i++)
	{
		bObj[i].setAttribute("id", "BK_B_"+i);
	}
}

function BK_SaveHilight()
{
	//var hlStr = BK_GetHilightStr(); 
	var hlStr = MakeHighlightXML();
	if(!hlStr)
		return;	
	
	SeqNo = SeqNo.split("^")[0];
	
	hlStr = "<?xml version='1.0' encoding='UTF-16'?>"+hlStr;
	hlStr = hlStr.replace(/ style=\"\"/gi, "");
	hlStr = hlStr.replace(/ style=''/gi, "");
	
	var xr = xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/Save_File.jsp",
	"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version
	+"&xmlData="+ToHex4Unicode(hlStr), 100);
	xmlhttpPost_Sync(SERVERPRO+SERVERIP+"/EMR_DATA/UpdateSql.jsp","param="+xr+"^"+SeqNo+"&SqlDec=UPDATE BERDMRECD SET MEMOFILENAME=? WHERE CODE=?",100);
}

//--------------------BKSNP HighLight--------------------------------/



function convertToHex(str) {
  var hex = '';
  for(var i=0;i<str.length;i++) {
      hex +=str.charCodeAt(i).toString(16);
  }
  return hex;
};


















/**************** NEW HIGHLIGHT ****************/

/** format.js **/
function BK_H_SUB(start, end, mode, value )
{
	this.r_start = start;
	this.r_end = end;
	this.r_type = mode;
	this.r_value = value;
}

function BK_H_DATA()
{
	this.r_text = "";
	this.r_arr = new Array();
	
	this.r_addFormat = function(start, end,  mode, value)
	{
		var len = this.r_arr.length;
		this.r_arr[len] = new BK_H_SUB(start, end, mode, value);
		
		for(var i=0; i<len; i++) ///Process..
		{
			var x1 = this.r_arr[i];
			//if(x1.r_type != mode || x1.r_start >end || end <x1.r_start)
			if(x1.r_type != mode || x1.r_start >end || start > x1.r_end)
				continue;
			
			if(start <= x1.r_start)
			{
				if(end < x1.r_end)
				{
					x1.r_start = end+1;
				}
				else
				{
					this.r_arr[i]=null;
				}
			}
			else
			{
				if(end < x1.r_end)
				{
					this.r_arr[this.r_arr.length]=new BK_H_SUB(end+1, x1.r_end,  x1.r_type, x1.r_value);
					x1.r_end=start-1;
				}
				else
				{
					x1.r_end = start-1;
				}
			}
		}
		
		// 연속데이터 합하기
		len = this.r_arr.length;
		for(var i=0;i<len;i++)
		{
			if(this.r_arr[i]==null) continue;
			for(var j=0;j<len;j++)
			{
				if(i==j || this.r_arr[j]==null || this.r_arr[j].r_type != this.r_arr[i].r_type || this.r_arr[j].r_value != this.r_arr[i].r_value)
					continue;
				if(this.r_arr[i].r_end+1==this.r_arr[j].r_start)
				{
					this.r_arr[i].r_end = this.r_arr[j].r_end;
					this.r_arr[j]=null;
				}
				else if(this.r_arr[i].r_start==this.r_arr[j].r_end+1)
				{
					this.r_arr[i].r_start = this.r_arr[j].r_start;
					this.r_arr[j]=null;
				}
			}
		}
		
		// Delete empty Array
		for(var i=0;i<len;i++)
		{
			if(this.r_arr[i] !=null) continue;
			len--;
			for(var n=i;n<len;n++)
			{
				this.r_arr[n]=this.r_arr[n+1];
			}
			this.r_arr.length=len;
			i--;
		}
	};
	
	this.r_getFormat=function(tStr)
	{
			if(this.r_arr.length==0)
				return tStr;
			var fA=new Array();
			var len=this.r_arr.length;
			
			for(var i=0;i<len;i++)
			{
				fA[i*2]=[this.r_arr[i].r_start/1000, 0, i];
				fA[i*2+1]=[this.r_arr[i].r_end/1000, 1, i];
			}
			fA = fA.sort();
			
			var aMode=new Array();
			var r_FM=new BK_H_FMAN();
			var ret='';
			var prePos=0;
			var spanStart=0;
			len = fA.length;
			var rF='';
			for(var i=0; i<len;i++)
			{
				var pos=0;
				if(fA[i][1]==0)
				{
					pos=fA[i][0]*1000;
					for(var n=i;n<len;n++)
					{
						if(fA[n][0]*1000 !=pos || fA[n][1] != 0)
						{
							i=n-1;
						 	break;
						 }
						r_FM.r_setFormat(this.r_arr[fA[n][2]].r_type, this.r_arr[fA[n][2]].r_value);
						
					}
				}
				else if(fA[i][1]==1)
				{
					pos=fA[i][0]*1000;
					for(var n=i;n<len;n++)
					{
						if(fA[n][0]*1000 !=pos)
						{
							i=n-1;
							break;
						}
						r_FM.r_removeFormat(this.r_arr[fA[n][2]].r_type, this.r_arr[fA[n][2]].r_value);
					}
					pos ++;
				}
				
				if(pos-prePos >0)
				{
					for(var x=prePos; x<pos; x++) {
						if(tStr.charAt(x)=='\r' && tStr.charAt(x+1)=='\n') {
							if(spanStart==1)
								ret += '</SPAN>';
							ret += '<BR>';
							if(spanStart==1)
								ret += rF;
							x++;
						}
						else
							ret += tStr.charAt(x);
					}
					//ret += tStr.substring(prePos,pos);
					prePos=pos;
				}
				if(spanStart==1)
					ret += "</SPAN>";
				rF=r_FM.r_getStyle();
				if(rF=='')
					spanStart=0;
				else
				{
					spanStart=1;
					ret += rF;
				}
			}
			if(tStr.length-prePos >0)
			{
				if(spanStart==1)
					ret += "</SPAN>";
				for(var x=prePos; x<tStr.length; x++) {
					if(tStr.charAt(x)=='\r' && tStr.charAt(x+1)=='\n') {
						ret += '<BR>';
						x++;
					}
					else
						ret += tStr.charAt(x);
				}
				//ret += tStr.substring(prePos);
				prePos=pos;
			}
			return ret;
		
	};
	
	this.r_compare=function(ndata, odata, fname, pos)
	{
		if(ndata==null || ndata=='')
		{
			if(odata != null)
			{
				this.r_addFormat(odata[1], pos-1, fname, odata[0]);
			}
			return null;
		}
		else
		{
			switch(fname)
			{
			case "SIZE":
				ndata = parseInt(ndata);
				break;
			}
			if(odata != null)
			{
				if(odata[0] != ndata)
				{
					this.r_addFormat(odata[1], pos-1, fname, odata[0]);
					return [ndata, pos];
				}
				else
				{
					return odata;
				}
			}
			else
			{
				return [ndata, pos];
			}
		}
	};

	this.r_setHtml=function(x)
		{
		this.r_arr=new Array();
		var pos=0;
		var ch=x.firstChild;
		var r_fontSize=null;
		var r_bold=null;
		var r_color=null;
		var r_back=null;
		
		while(ch)
		{
			if(ch.nodeName=='#text')
			{
				r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
				r_bold=this.r_compare(null, r_bold, "BOLD", pos);
				r_color=this.r_compare(null, r_color, "COLOR", pos);
				r_back=this.r_compare(null, r_back, "BACK", pos);
				pos += ch.nodeValue.length;
			}
			else if(ch.nodeName=="P")
			{
				ch=ch.firstChild;
				continue;
			}
			else if(ch.nodeName=="BR")
			{
				pos += 2;
			}
			else  if(ch.innerText != "")
			{
				if(ch.style !=null)
				{
					r_fontSize=this.r_compare(ch.style.fontSize, r_fontSize, "SIZE", pos);
					r_bold=this.r_compare(ch.style.fontWeight, r_bold, "BOLD", pos);
					r_color=this.r_compare(ch.style.color, r_color, "COLOR", pos);
					r_back=this.r_compare(ch.style.backgroundColor, r_back, "BACK", pos);
				}
				else
				{
					r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
					r_bold=this.r_compare(null, r_bold, "BOLD", pos);
					r_color=this.r_compare(null, r_color, "COLOR", pos);
					r_back=this.r_compare(null, r_back, "BACK", pos);
				}
				pos += ch.innerText.length;
				
			}
			
			if(ch.nextSibling ==null)
			{
				if(ch.parentNode == x)
					break;
				ch=ch.parentNode.nextSibling;
				pos += 4;
			}
			else
			{
				ch=ch.nextSibling;
			}
		}
		r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
		r_bold=this.r_compare(null, r_bold, "BOLD", pos);
		r_color=this.r_compare(null, r_color, "COLOR", pos);
		r_back=this.r_compare(null, r_back, "BACK", pos);
		return pos;
	};
}

function BK_H_FMAN()
{
	this.r_mode=new Array();
	this.r_setFormat=function(mode, value)
	{
			this.r_mode[this.r_mode.length]=[mode,value];
	};
	
	this.r_removeFormat=function(mode, value)
	{
			var len=this.r_mode.length;
			for(var i=0;i<len;i++)
			{
				if(this.r_mode[i][0] != mode) continue;
				len--;
				for(;i<len;i++)
				{
					this.r_mode[i]=this.r_mode[i+1];
				}
				this.r_mode.length=len;
				return;
			}
	};
	
	this.r_getStyle=function()
	{
			var ret="<SPAN style='";
			var len=this.r_mode.length;
			if(len<=0) return "";
			for(var i=0;i<len;i++)
			{
				switch(this.r_mode[i][0])
				{
				case "SIZE":
					ret += "font-size:"+this.r_mode[i][1]+"px;";
					break;
				case "COLOR":
					ret += "color:"+this.r_mode[i][1]+";";
					break;
				case "BACK":
					ret += "background-color:"+this.r_mode[i][1]+";";
					break;
				case "BOLD":
					ret += "font-weight:bold;";
					break;
				case "UNDERLINE":
					ret += "text-decoration: underline;";
					break;
				}
			}
			ret += "'>";
			return ret;
	};
}

function BK_HILIGHT(id)
{
	this.r_id = id;
	this.r_caption = new BK_H_DATA();
	this.r_prefix = new BK_H_DATA();
	//this.r_desin = new BK_H_DATA();
	this.r_unit = new BK_H_DATA();
	this.r_value = new BK_H_DATA();
	this.r_appendix = new BK_H_DATA();
	this.r_na = new BK_H_DATA();
	this.r_type = 0;
	
	this.r_addFormat=function(type, mode, value, start, end)
	{
		switch(type)
		{
		case "CAP":
			this.r_caption.r_addFormat(start, end, mode, value);
			break;
		case "PRE":
			this.r_prefix.r_addFormat(start, end, mode, value);
			break;
		case "UNIT":
			this.r_unit.r_addFormat(start, end, mode, value);
			break;
		case "VALUE":
			this.r_value.r_addFormat(start, end, mode, value);
			break;
		case "APPEND":
			this.r_appendix.r_addFormat(start, end, mode, value);
			break;
		case "NA":
			this.r_na.r_addFormat(start, end, mode, value);
			break;
		}
	};
	
	this.r_getFormat=function(type, tStr)
	{
		switch(type)
		{
		case "CAP":
			return this.r_caption.r_getFormat(tStr);
			break;
		case "PRE":
			return this.r_prefix.r_getFormat(tStr);
			break;
		case "UNIT":
			return this.r_unit.r_getFormat(tStr);
			break;
		case "VALUE":
			return this.r_value.r_getFormat(tStr);
			break;
		case "APPEND":
			return this.r_appendix.r_getFormat(tStr);
			break;
		case "NA":
			return this.r_na.r_getFormat(tStr);
			break;
		}
		return "";
	};
}

function test()
{
	var x=new BK_HILIGHT();
	x.r_addFormat("CAP", "SIZE", 35, 3, 15);
	x.r_addFormat("CAP", "COLOR", "#ff0000", 4, 10);
	x.r_addFormat("CAP", "SIZE", 25, 5, 8);
	
	var ret=x.r_getFormat("CAP","1234567890ABCDEFGHIJK");
	alert(ret);
	document.getElementById('output').innerHTML=ret;
}

/** test.js **/
var g_hSelId=null;
var g_hSelRange=null;


function BK_FindValueIdFromId(id)
{
	var ids=id.split('_');
	if(ids.length>=2) {
		if(ids[0]=='VAL' || ids[0]=='CAP' || ids[0]=='INPUT' || ids[0]=='INPUTU1')
		return id;
	}
	
	return null;
}



function BK_AddSelectionArray(id, appId, mode, obj, start, end)
{
	/*var len = g_hSelId.length;
	for(var i=0; i<len; i++)
	{
		if(g_hSelId[i][0] != id)
			continue;
		if(g_hSelId[i][2] == obj.nodeName && g_hSelId[i][3]==g_hSelId[i][4] && start == end)
		{
			if(g_hSelId[i][3] > start)
				g_hSelId[i][3] = start;
			if(g_hSelId[i][4] < end)
				g_hSelId[i][4] = end;
			return;
		}
	}*/
	g_hSelId[g_hSelId.length]=[id, appId, mode, obj.nodeName, start, end];
}

function BK_AddSelectionValue(id, obj, mode, start, end)
{

	var ids=id.split('_');
	var appId="";
	for(var i=2; i<ids.length; i++) {
		//if(appId!="")
			//appId+="_";
		appId += "_"+ids[i];
	}
	if(ids[0]=='CAP')
	{
		BK_AddSelectionArray(ids[1], appId, "CAP", obj, start, end);
		return;
	}
	
	if(ids[0]=="VAL")
	{
		BK_AddSelectionArray(ids[1], appId, "VAL", obj, start, end);
	}
	else if(ids[0]=='INPUT' || ids[0]=='INPUTU1')
	{
		BK_AddSelectionArray(ids[1], appId, "INPUT", obj, start, end);
	}
	else if(ids[0]=='CHECK')
	{
		BK_AddSelectionArray(ids[1], appId, "CHECK", obj, start, end);
	}
	else if(ids[0]=='RADIO')
	{
		BK_AddSelectionArray(ids[1], appId, "RADIO", obj, start, end);
	}

}


function BK_GetElementPos(ele)
{
	var c=ele.parentNode.firstChild;
	var len=0;
	while(c)
	{
		if(c==ele)
			return len;
		var iStr=c.innerText;
		if(iStr==null)
			iStr =c.nodeValue;
		len += iStr.length;
		c=c.nextSibling;
	}
	return len;
}

function BK_FindValueOuter(ele, s, e)
{
	var obj=ele;
	while(1)
	{
		if(ele==null) break;
		if(ele.tagName=='BODY') break;
		if(ele.id != null)
		{
			var id=BK_FindValueIdFromId(ele.id);
			if(id !=null)
			{
				BK_AddSelectionValue(id, obj, 'i', s, e);
				return id;
			}
		}
		var len=BK_GetElementPos(ele);
		s += len;
		e += len;
		ele = ele.parentNode;
	}
	return null;
}

function BK_FindValueInner(obj)
{
	if(obj.children==null)
		return;
	
	var ch=obj.children;
	var len =ch.length;
	for(var i=0;i< len;i++)
	{
		if(ch[i].id !=null)
		{
			var id=BK_FindValueIdFromId(ch[i].id);
			if(id == null)
				BK_FindValueInner(ch[i]);
			else
				BK_AddSelectionValue(id, ch[i], 'a', -1, -1);
		}
	}
}

function BK_FindValueId(obj, mode, start, end)
{
	if(mode=='a')
	{
		start = 0;
		if(obj.nodeName=="#text")
			end=obj.nodeValue.length;
		else if(obj.value)
			end=obj.value.length;
		else
			end=obj.innerText.length;
		BK_FindValueInner(obj);
	}
	BK_FindValueOuter(obj, start, end);
}



function BK_GetElementTop(obj)
{
	var ret=0;
	while(1)
	{
		if(obj==null || obj.tagName=='BODY') return ret;
		if(obj.tagName!='TR' && obj.tagName !='TBODY')
			ret += obj.offsetTop;
		obj = obj.parentElement;
	}
	return ret;
}


function BK_GetStartPoint(x, s)
{
	var i=0;
	while(s.inRange(x))
	{
		x.moveStart("character", -1);
		i++;
	}
	return i;
}



function BK_GetStartPoint2(x, s)
{
	var i=0;
	var len=x.text.length;
	x.moveEnd("character", (len-s.text.length)*-1);
	
	for(i=0;i<len;i++)
	{
		if(s.inRange(x)) break;
		x.moveEnd("character", 1);
		x.moveStart("character", 1);
	}
	return i-1;
}

function BK_CreateTRange(obj)
{
	var x=null;
	if(obj.tagName !='INPUT' || obj.type !='text')
	{
		x=document.selection.createRange();
		x.moveToElementText(obj);
	}
	else
	{
		x= obj.createTextRange();
	}
	return x;
}

var g_hStart=0;
var g_hFirstText;
var g_hFirstId;
var g_hTextStr;
var g_hCurText;
var g_hCurTextPos;
var preTextNode=null;

function BK_ProcessItem(obj, mode, sPoint)
{
	if(sPoint !=null)
		g_hCurText='';
	else if(g_hCurTextPos==0)
	{
		g_hCurText='';
		if(g_hFirstText)
		{
				g_hCurText=g_hFirstText;
				g_hCurTextPos=g_hFirstText.length;
				if(preTextNode)
					BK_FindValueId(preTextNode, 't', preTextNode.nodeValue.length-g_hFirstText.length, preTextNode.nodeValue.length);
		}
	}
	
	var iStr=obj.innerText;
	if(iStr==null)
		iStr =obj.nodeValue;
	
	if(sPoint)
		iStr = iStr.substring(sPoint);
	else
		sPoint=0;
		
	var pos=g_hTextStr.indexOf(iStr.substring(0,1), g_hCurTextPos);
	if(pos >0)
	{
		g_hCurTextPos = pos;
	}
	
	var len=iStr.length;
	if(g_hCurTextPos+len < g_hTextStr.length)
	{
		g_hCurText += iStr;
		BK_FindValueId(obj, mode, sPoint, sPoint+iStr.length);
	}
	else
	{
		g_hCurText += iStr.substring(0, g_hTextStr.length-g_hCurTextPos);
		BK_FindValueId(obj, mode, sPoint, sPoint+g_hTextStr.length-g_hCurTextPos);
		g_hStart='E';
	}
	g_hCurTextPos += len;
}


function BK_GetSelection(obj)
{
	if(g_hStart=='E')
	{
		if(g_lastInput==1)
		{
		 	if(obj.nodeName=='INPUT') 
			{
				BK_ProcessItem(obj, 'a');
				g_lastInput=0;
				return;
			}
			var ch = obj.firstChild;
			if(ch !=null && (ch.nodeName != '#text' || ch.nextSibling !=null))
			{
				while(ch && g_lastInput==1 )
				{
					BK_GetSelection(ch);
					ch = ch.nextSibling;
				}
		 	}
		 }
	 	 return;
	}
	
	var x;
	if(g_hStart==0)
	{
		
		if(obj.nodeName =='#text')
		{
				preTextNode=obj;
				return;
		}
		if(g_hFirstId != null)
		{
			if(obj.id!=null && obj.id == g_hFirstId)
			{
				g_hStart='I';
				
				BK_ProcessItem(obj);
				return;
			}
		}
		else
		{
				x=BK_CreateTRange(obj);
			if(g_hSelRange.inRange(x))
			{
				if(x.inRange(g_hSelRange))
				{
					g_hStart='E';
				}
				else
				{
					g_hStart='I';
				}
				BK_ProcessItem(obj, 'a');
				
				return;
			}
			
			var top=BK_GetElementTop(obj)-document.body.scrollTop;
			if(top >= (g_hSelRange.offsetTop+g_hSelRange.boundingHeight) || (top+obj.offsetHeight) <= g_hSelRange.offsetTop)
			{
				return;
			}
		}
	
	}

	
	var ch = obj.firstChild;
	if(ch !=null && (ch.nodeName != '#text' || ch.nextSibling !=null))
	{
		while(ch)
		{
			BK_GetSelection(ch);
			ch = ch.nextSibling;
		}
		return;
	}
	
	
	
	
	
	if(g_hStart == 0)
	{
		if(g_hFirstId != null)
			return;
		if(x.inRange(g_hSelRange))
		{
			var sp=BK_GetStartPoint2(x, g_hSelRange);
		 	g_hStart='E';
			BK_ProcessItem(obj, 'i', sp);
			return;
		}
		var len=x.text.length;
		x.moveStart("character", (len-1));
		if(g_hSelRange.inRange(x))
		{
				var sp=len-BK_GetStartPoint(x, g_hSelRange);
				g_hStart='I';
				BK_ProcessItem(obj,'h', sp);
				return;
		}
	}
	else if(g_hCurTextPos < g_hTextStr.length)
	{
		BK_ProcessItem(obj, 'a');
		
	}
}


var g_hSelObj=null;

var g_lastInput=null;
function BK_FindLastInput(hStr)
{
	g_lastInput=0;
	var len=hStr.length;
	var ins=0;
	for(var i=len-1; i>=0; i--)
	{
		var c=hStr.charAt(i);
		if(c=='<')
		{
			if(hStr.charAt(i+1) != '/')
			{
				if(hStr.substring(i+1, i+7) == 'INPUT ')
				{
					g_lastInput=1;
					return;
				}
			}
			ins=0;
		}
		else if(c=='>')
		{
			ins=1;
		}
		else if(ins==0 && c != ' ' && c != '\t' && c != '\r' && c != '\n')
		{
			return;
		}
	}
}

function BK_ProcessHtmlString(hStr)
{
	var len=hStr.length;
	var ins=0;
	
	
	var prePos=0;
	for(var i=0;i<len;i++)
	{
		var c=hStr.charAt(i);
		if(c=='<')
		{
			ins=1;
			if(hStr.charAt(i+1)=='/')
				return;
			if((i-prePos)>0)
			{
				g_hFirstText=hStr.substring(prePos, i);
				if(g_hFirstText=='\r\n')
					g_hFirstText=null;
			}
			if(hStr.substring(i+1, i+7) == 'INPUT '  || hStr.substring(i+1, i+8) == 'SELECT ')
			{
				ins=2;
			}
			else if(g_hFirstText !=null)
			{
				return;
			}
			
		}
		else if(c=='>')
		{
			ins=0;
			prePos=i+1;
		}
		else if(ins==2)
		{
			if(c=='i' || c=='I')
			{
				var subS=hStr.substring(i, i+3);
				if(subS=='id=')
				{
					subS=hStr.substring(i+3,i+30);
					g_hFirstId=subS.split(' ')[0];
					return;
				}
			}
		}
		
	}
}


function BK_GetSelectionAll(obj)
{
//	FindValueInn(obj);
//	FindValueOut(obj);
}
/*
function BK_FindSelectionPos(obj)
{
	var x=BK_CreateTRange(obj);
	var len=x.text.length-g_hSelRange.text.length;
	var pos=x.htmlText.length;
	
//	x.moveEnd("character", len*-1);
	while(x.text.length != g_hSelRange.text.length && pos)
	{
		x.moveEnd("character", -1);
		pos--;
	}
	
	for(var i=0;i<=len;i++)
	{
		if(g_hSelRange.isEqual(x)) return i;
		x.moveStart("character",1); 
		x.moveEnd("character",1);
	}
	return -1;
}
*/

function BK_FindSelectionPos(obj)
{
	var x=BK_CreateTRange(obj);
	var len=x.text.length-g_hSelRange.text.length;
	var pos=x.htmlText.length;
	
//	x.moveEnd("character", len*-1);
	//while(x.text.length != g_hSelRange.text.length && pos)
	while(x.text.length > g_hSelRange.text.length && pos)
	{
		x.moveEnd("character", -1);
		pos--;
	}
	
	for(var i=0;i<=len;i++)
	{
		if(g_hSelRange.isEqual(x)) return i;
		x.moveStart("character",1); 
		x.moveEnd("character",1);
		while(1)
		{
			if(x.text.length==g_hSelRange.text.length)
				break;
			if(x.text.length<g_hSelRange.text.length)
			{
				x.moveEnd("character",1);
			}
			else if(x.text.length>g_hSelRange.text.length)
			{
				x.moveStart("character",1); 
			}
		}
	}
	return -1;
}

function BK_ExecuteHilight(mode, value)
{
	if(mode < 1 || mode >= MODE_ARR.length)
		return;
	
	g_hSelId=new Array();
	if(!document.selection)
		return;
	
	g_hFirstText=null;
	g_hFirstId=null;
	g_hStart=0;
	g_hSelRange = document.selection.createRange();
	if(g_hSelRange==null)
		return;
	g_hTextStr = g_hSelRange.text;
	g_hCurTextPos=0;
	preTextNode=null;
	var pNode =g_hSelRange.parentElement();

	if((g_hSelRange.text == pNode.innerText) || (pNode.value== g_hSelRange.text))
	{
		BK_ProcessItem(pNode, 'a');
	}
	else if(g_hSelRange.text == g_hSelRange.htmlText)
	{
		var sP=BK_FindSelectionPos(pNode);
		BK_FindValueOuter(pNode, sP, sP+g_hSelRange.text.length);
	}
	else
	{
		BK_ProcessHtmlString(g_hSelRange.htmlText);
		/*while(pNode.innerText.length < g_hSelRange.text.length)
		{
				pNode = pNode.parentElement;
		}*/
		BK_FindLastInput(g_hSelRange.htmlText);
		BK_GetSelection(pNode);
	}
	
	if(!g_hSelId || g_hSelId.length < 1)
		return;
	
	//alert(g_hTextStr+"::::::::::::"+g_hCurText);
	
	var out='';
	for(var i=0;i<g_hSelId.length;i++)
		out += g_hSelId[i]+"\r\n";
	
	alert(out);
	
	MakeHLStructure(mode, value);
	DrawHighlight();
}

var MODE_ARR = ["", "BACK", "SIZE", "BOLD", "UNDERLINE", "COLOR"];
function MakeHLStructure(mode, value) {
	if(!g_hSelObj)
		g_hSelObj = new Array();
	
	for(var i=0; i<g_hSelId.length; i++) {
		var idx = 0;
		var x;
		for(; idx<g_hSelObj.length; idx++) {
			if(g_hSelObj[idx].r_id==g_hSelId[i][0]) {
				x = g_hSelObj[idx];
				break;
			}
		}
		if(idx == g_hSelObj.length)
			x = new BK_HILIGHT(g_hSelId[i][0]);
		 
		var comId = g_hSelId[i][0];
		var pn = fn_fprbvi(comId);
		if(pn < 0)
			continue;
		var comAppId = g_hSelId[i][1];
		var comType = g_hSelId[i][2];
		var comNodeName = g_hSelId[i][3];
		var start = g_hSelId[i][4];
		var end = g_hSelId[i][5];
		var allFlag = (start<0&&end<0) ? true : false;
		
		switch(comType) { 
			case 'CAP':
				var comInfo = GetComInfo(comId, comAppId, comType, comNodeName, start, end);
				if(!comInfo)
					continue;
				for(var k=0; k<comInfo.length; k++) {
					if(comInfo[k][3]==comInfo[k][4])
						continue;
					x.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
				}
				break;
			case 'INPUT':
			case 'VAL':
			case 'CHECK':
			case 'RADIO':
				var comInfo = GetComInfo(comId, comAppId, comType, comNodeName, start, end);
				if(!comInfo)
					continue;
				
				//Dynamic Grid Value
				if(ParsingRule[pn][2] == 4) {
					switch(ParsingRule[pn][3]) {
						case 6:
						case 7:
							for(var x=0; x<comInfo.length; x++) {
								var idStr = "";
								var k, z;
								for(k=pn+1; k<ParsingRule.length; k++) {
									if(ParsingRule[k][2] != 8)
										break;
									if(ParsingRule[k][3] != ParsingRule[pn][3])
										break;
										
									if(comInfo[x][1] == ParsingRule[k][12]) {
										idStr = ParsingRule[k][0]+comAppId;
										break;
									}
								}
								if(!idStr)
									idStr = comId+comAppId;
								
								var hlObj;
								for(z=0; z<g_hSelObj.length; z++) {
									if(idStr == g_hSelObj[z].r_id) {
										if(comInfo[x][3]==comInfo[x][4])
											continue;
										hlObj = g_hSelObj[z];
										hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
										break;
									}
								}
								if(z != g_hSelObj.length) 
									continue;
								
								if(comInfo[x][3]==comInfo[x][4])
									continue;
								
								hlObj = new BK_HILIGHT(idStr);
								hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
								g_hSelObj[g_hSelObj.length] = hlObj;
							}
							break;
						default:
							for(var x=0; x<comInfo.length; x++) {
								if(comInfo[x][3]==comInfo[x][4])
									continue;
											
								var idStr = comId+comAppId;
								var hlObj;
								for(z=0; z<g_hSelObj.length; z++) {
									if(idStr == g_hSelObj[z].r_id) {
										hlObj = g_hSelObj[z];
										hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
										break;
									}
								}
								if(z != g_hSelObj.length) 
									continue;
								
								hlObj = new BK_HILIGHT(idStr);
								hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
								g_hSelObj[g_hSelObj.length] = hlObj;
							}
							break;
					}
					continue;
				}
				
				//Gemeral Value
				var pn = fn_fprbvi(comId);
				if(pn < 0)
					break;
				switch(ParsingRule[pn][3]) {
					case 6:
					case 7:
						for(var x=0; x<comInfo.length; x++) {
							var idStr = "";
							var k, z;
							for(k=pn+1; k<ParsingRule.length; k++) {
								if(ParsingRule[k][2] != 8)
									break;
								if(ParsingRule[k][3] != ParsingRule[pn][3])
									break;
									
								if(comInfo[x][1] == ParsingRule[k][12]) {
									idStr = ParsingRule[k][0];
									break;
								}
							}
							if(!idStr)
								idStr = comId;
							
							var hlObj;
							for(z=0; z<g_hSelObj.length; z++) {
								if(idStr == g_hSelObj[z].r_id) {
									if(comInfo[x][3]==comInfo[x][4])
										continue;
									hlObj = g_hSelObj[z];
									hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
									break;
								}
							}
							if(z != g_hSelObj.length) 
								continue;
							
							if(comInfo[x][3]==comInfo[x][4])
								continue;
							
							hlObj = new BK_HILIGHT(idStr);
							hlObj.r_addFormat(comInfo[x][0], MODE_ARR[mode], value, comInfo[x][3], comInfo[x][4]);
							g_hSelObj[g_hSelObj.length] = hlObj;
						}
						continue;
					default:
						for(var k=0; k<comInfo.length; k++) {
							if(comInfo[k][3]==comInfo[k][4])
								continue;
							x.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
						}
						break;
				}
				break;
			default:
				break;
		}
		
		if(idx == g_hSelObj.length)
			g_hSelObj[g_hSelObj.length] = x;
	}
}

function IsStaticGrid(pn) {
	if(pn<0 || pn>=ParsingRule.length)
		return false;
	
	if(ParsingRule[pn][2]!=5)
		return false;
	
	var isSG = false;
	switch(ParsingRule[pn][3]) {
		case 6:
		case 7:
			if(ParsingRule[pn+1][2]!="8" || ParsingRule[pn+1][3]!=ParsingRule[pn][3])
				break;
			
			var tempNode = document.getElementById(ParsingRule[pn+1][0]);
			tempNode = tempNode.parentNode;
			while(tempNode) {
				if(tempNode.nodeName=="TD") {
					if(tempNode.id=="VAL_"+ParsingRule[pn][0])
						break;
					else if(tempNode.id=="CAP_"+ParsingRule[pn][0]) {
						isSG = true;
						break;
					}
				}
				tempNode = tempNode.parentNode; 
			}			
			break;
		
		default:
			var pNode = document.getElementById("VAL_"+ParsingRule[pn][0]);
			if(!pNode || !pNode.childNodes)
				break;
			for(var i=0; i<pNode.childNodes.length; i++) {
				var chNode = pNode.childNodes[i];
				if(chNode.nodeName == "#text") {
					isSG = true;
					break;
				}
				else if(chNode.nodeName == "SPAN" && chNode.id == "pre") {
					isSG = true;
					break;
				}
				else if(chNode.nodeName == "INPUT")
					break;
			}
			break;
		
	}
	return isSG;
}

function GetComInfo(comId, comAppId, comType, nodeType, s, e) {
	var pn = fn_fprbvi(comId);
	if(pn < 0)
		return null;
	
	if(e==0)
		return null;
	var allFlag = (s<0&&e<0) ? true : false;
	
	switch(comType) {
		case 'CAP':
			if(!ParsingRule[pn][12])
				return null;
			
			var retVal = new Array();
			if(allFlag)
				retVal[0] = ['CAP', ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
			else {
				if(e>ParsingRule[pn][12].length)
					e = ParsingRule[pn][12].length;
				retVal[0] = ['CAP', ParsingRule[pn][12], ParsingRule[pn][12].length, s, e];
			}
			return retVal;
			
		case 'INPUT':
			switch(nodeType) {
				case 'INPUT':
				case 'TEXTAREA':
				case 'SPAN':
				case 'P':
						var valStr = GetStringValue(comId, comAppId);
						if(!valStr || valStr.length<=0)
							return null;
						
						var retVal = new Array();
						if(allFlag)
							retVal[0] = ['VALUE', valStr, valStr.length, 0, valStr.length];
						else
							retVal[0] = ['VALUE', valStr, valStr.length, s, e];
						return retVal;
				case 'OPTION':
					break;
				default:
					break;
			}
			return null;
		
		case 'VAL':
			switch(nodeType) {
				case 'INPUT':
				case 'TEXTAREA':
					if(ParsingRule[pn][3]==6 || ParsingRule[pn][3]==7)
						break;
					
					var valStr = GetStringValue(comId, comAppId);
					if(!valStr || valStr.length<=0)
						return null;
					
					var retVal = new Array();
					if(allFlag)
						retVal[0] = ['VALUE', valStr, valStr.length, 0, valStr.length];
					else
						retVal[0] = ['VALUE', valStr, valStr.length, s, e];
					return retVal;
				case 'OPTION':
					break;
				
				case 'TD':
				case 'SPAN':
				case '#text':
					//if(ParsingRule[pn][2] == 5) 
					{
						var pNode = document.getElementById("VAL_"+comId+comAppId);
						if(!pNode || !pNode.childNodes)
							return;
						
						switch(ParsingRule[pn][3]) {
							case 6:
							case 7:
								var dataStr = "";
								var dataArr = new Array();
								for(var i=0; i<pNode.childNodes.length; i++) {
									var node = pNode.childNodes[i];
									if(node.nodeName=="SPAN") {
										if(node.id=="append") {
											dataArr[dataArr.length] = ["APPEND", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
											dataStr += node.innerText;
											continue;
										}
										if(!node.childNodes || node.childNodes.length!=2)
											continue;
										if(node.childNodes[0].nodeName!="INPUT")
											continue;
										if(node.childNodes[1].nodeName!="SPAN" && node.childNodes[1].nodeName!="#text")
											continue;
										
										//N/A 여부 판단
										var isNA = false;
										for(var k=pn+1; k<ParsingRule.length; k++) {
											if(ParsingRule[k][2]!=8 || ParsingRule[k][3]!=ParsingRule[pn][3]) {
												isNA = true;
												break;
											}
											if(node.innerText == ParsingRule[k][12])
												break;
										}
										if(isNA)
											dataArr[dataArr.length] = ["NA", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
										else
											dataArr[dataArr.length] = ["VALUE", node.innerText, dataStr.length, dataStr.length+node.innerText.length];
										dataStr += node.innerText;
									}
									else if(node.nodeName=="#text") {
										dataArr[dataArr.length] = ["APPEND", node.data, dataStr.length, dataStr.length+node.data.length];
										dataStr += node.data;
									}
								}
								if(!dataStr || dataArr.length<1)
									return null;
								if(allFlag) {
									s = 0;
									e = dataStr.length;
								}
								
								var retVal = new Array();
								for(var i=0; i<dataArr.length; i++) {
									if(s>dataArr[i][2] || e<dataArr[i][3])
										continue;
									retVal[retVal.length] = [dataArr[i][0], dataArr[i][1], dataArr[i][1].length, 0, dataArr[i][1].length];
								}
								return retVal;
							
							case 8:
								var isSG = IsStaticGrid(pn);
								var retVal = new Array();
								if(allFlag) {
									if(ParsingRule[pn][2]==5) {
										if(isSG && ParsingRule[pn][12]) {
											if(pNode.childNodes[0].nodeName == "#text")
												retVal[0] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
											else if(pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id=="pre")
												retVal[0] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, 0, ParsingRule[pn][12].length];
										}
									}
									else if(ParsingRule[pn][2]==4) {
										if(ParsingRule[pn][17])
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
									}
									var data = GetStringValue(comId, comAppId);
									if(data && data.length>0)
										retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
								}
								else {
									if(ParsingRule[pn][12]) {
										if(s < ParsingRule[pn][12].length) {
											if(e < ParsingRule[pn][12].length) {
												retVal[retVal.length] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, s, e];
												return retVal;
											}
											else {
												retVal[retVal.length] = ['PRE', ParsingRule[pn][12], ParsingRule[pn][12].length, s, ParsingRule[pn][12].length];
											}
											s = 0;
										}
										else
											s -= ParsingRule[pn][12].length;
										e -= ParsingRule[pn][12].length;
									}
								}
								
								//UNIT, APPEND
								if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8) {
									if(!ParsingRule[pn+1][12])
										return retVal;
									if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8)) {
										if(allFlag) {
											s=0;
											e = ParsingRule[pn+1][12].length+ParsingRule[pn][18].length;
										}
										else {
											if(!isSG) {
												if(s!=0)
													s--;
												e--;
											}
										}
										if(e <= ParsingRule[pn+1][12].length)
											retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, e];
										else {
											if(s <= ParsingRule[pn+1][12].length)
												retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, ParsingRule[pn+1][12].length];
											
											e = e-(ParsingRule[pn+1][12].length);
											if(!isSG)
												e -= 1;	//appendix 공백
											retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, e];
										}
										return retVal;
									}
								}
								break;
								
							default:
								var isSG = IsStaticGrid(pn);
								var retVal = null;
								if(allFlag) {
									retVal = new Array();
									if(ParsingRule[pn][2]==5) {
										if(isSG && ParsingRule[pn][17]) {
											if(pNode.childNodes[0].nodeName == "#text")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
											else if(pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id == "pre")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
										}
									}
									else {
										if(ParsingRule[pn][17])
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
									}
									
									if(ParsingRule[pn][3] != 5) {
										var data = GetStringValue(comId, comAppId);
										if(data && data.length>0)
											retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
									}
									
									if(!ParsingRule[pn][18])
										return retVal;
									retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, ParsingRule[pn][18].length];
									return retVal;
								}
								
								if(ParsingRule[pn][2]==4 || isSG) {
									if(ParsingRule[pn][17]) {
										if(s < ParsingRule[pn][17].length) {
											retVal = new Array();
											if(s<0)
												s = 0;
											if(e <= ParsingRule[pn][17].length) {
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, e];
												return retVal;
											}
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
										}
										//else 
										{
											s = 0;
											e -= ParsingRule[pn][12].length;
										}
									}
								}
								
								if(!ParsingRule[pn][18])
									return retVal;
								
								if(!retVal)
									retVal = new Array();
								
								if(!isSG) {
									if(s!=0)
										s--;
									e--;
								}
								retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, s, e];
								return retVal;
						}
					}
					/*else if(ParsingRule[pn][2] == 4) {
							return null;
					}*/
					return null;
			}
			return null;
		
		case 'RADIO':
			switch(nodeType) {
				case 'INPUT':
					break;
			}
			return null;
		
		case 'CHECK':
			return null;
		
		default:
			break;
	}
	return null;
}

function GetComData(idStr, type) {
	var idArr = idStr.split("_");
	var comId = "";
	var comAppId = "";
	if(idArr[0]=='RADIO' || idArr[0]=='CHECK') {
		if(idArr.length>3) {
			comId = idArr[0]+"_"+idArr[1]+"_"+idArr[2];
			for(var x=3; x<idArr.length; x++)
				comAppId += "_"+idArr[x];
		}
		else
			comId = idStr;
	}
	else {
		comId = idArr[0];
		for(var x=1; x<idArr.length; x++)
			comAppId += "_"+idArr[x];
	}
			
	var pn = fn_fprbvi(comId);
	if(pn < 0)
		return '';
	
	var dataStr = '';
	switch(type) {
		case 'CAP':
			dataStr = ParsingRule[pn][12];
			break;
		case 'PRE':
			dataStr = ParsingRule[pn][17];
			break;
		case 'VALUE':
			switch(ParsingRule[pn][3]) {
				case 6:
				case 7:
					dataStr = ParsingRule[pn][12];
					break;
				default:
					dataStr = GetStringValue(comId, comAppId);
					break;
			}
			break;
		case 'UNIT':
			switch(ParsingRule[pn][3]) {
				case 8:
					if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8) {
						if(!ParsingRule[pn+1][12])
							break;
						if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8))
							dataStr = ParsingRule[pn+1][12];
					}
					break;
				default:
					break;
			}
			break;
		case 'APPEND':
			dataStr = ParsingRule[pn][18];
			break;
		case 'NA':
			dataStr = "N/A";
			break;
		default:
			break;
	}
	return dataStr;
}

function DrawHighlight() {
	if(!g_hSelObj || g_hSelObj.length<1)
		return;
	
	for(var i=0; i<g_hSelObj.length; i++) {
		var BK_H_OBJ = g_hSelObj[i];
		if(!BK_H_OBJ || !BK_H_OBJ.r_id)
			continue;
		
		var idArr = BK_H_OBJ.r_id.split("_");
		var comId = "";
		var comAppId = "";
		if(idArr[0]=='RADIO' || idArr[0]=='CHECK') {
			if(idArr.length>3) {
				comId = idArr[0]+"_"+idArr[1]+"_"+idArr[2];
				for(var x=3; x<idArr.length; x++)
					comAppId += "_"+idArr[x];
			}
			else
				comId = BK_H_OBJ.r_id;
		}
		else
			comId = idArr[0];
		
		var pn = fn_fprbvi(comId);
		if(pn < 0)
			continue;
		
		try {
			var typeArr = ['CAP', 'PRE', 'VALUE', 'UNIT', 'APPEND', 'NA'];
			for(var j=0; j<typeArr.length; j++) {
				var tempArr = null;
				if(typeArr[j]=='CAP')					tempArr = BK_H_OBJ.r_caption.r_arr;
				else if(typeArr[j]=='PRE')		tempArr = BK_H_OBJ.r_prefix.r_arr;
				else if(typeArr[j]=='VALUE')	tempArr = BK_H_OBJ.r_value.r_arr;
				else if(typeArr[j]=='UNIT')		tempArr = BK_H_OBJ.r_unit.r_arr;
				else if(typeArr[j]=='APPEND')	tempArr = BK_H_OBJ.r_appendix.r_arr;
				else if(typeArr[j]=='NA')			tempArr = BK_H_OBJ.r_na.r_arr;
				
				if(!tempArr)
					continue;
				for(k=0; k<tempArr.length; k++) {
					//var htmlStr = GetComData(BK_H_OBJ.r_id, typeArr[j]);
					var htmlStr = GetComData(BK_H_OBJ.r_id, typeArr[j]);
					if(!htmlStr)
						continue;
					
					var ret = BK_H_OBJ.r_getFormat(typeArr[j], htmlStr);
					if(!ret)
						continue;
					//alert(htmlStr+"::::::::::::::"+ret);
					
					switch(typeArr[j]) {
						case 'CAP':
							var node = document.getElementById("CAP_"+BK_H_OBJ.r_id);
							if(!node)
								break;
							node.innerHTML = ret;
							break;
						case 'PRE':
							switch(ParsingRule[pn][3]) {
								case 6:
								case 7:
									break;
								default:
									var pNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!pNode || !pNode.childNodes)
										break;
									var chNode = pNode.childNodes[0];
									if(chNode.nodeName=="#text") {
										pNode.removeChild(chNode);
										pNode.innerHTML = "<span id='pre'>"+ret+"</span>" + pNode.innerHTML;
									}
									else if(chNode.nodeName=="SPAN" && chNode.id=="pre")
										chNode.innerHTML = ret;
									break;
							}
							break;
						case 'VALUE':
							switch(ParsingRule[pn][3]) {
								case 1:
								case 2:
								case 4:
								case 8:									
								case 9:
									var obj;
									if(ParsingRule[pn][3] == 8)
										obj = document.getElementById("INPUTU1_"+BK_H_OBJ.r_id);
									else
										obj = document.getElementById("INPUT_"+BK_H_OBJ.r_id);
									if(!obj)
										break;
									if(obj.nodeName == 'INPUT') {
										var newObj = BK_ChangeInput(obj);
										if(newObj) {
											try {
												newObj.parentNode.onkeyup = function(e) {
													var idStr = this.id.split("_")[1];
													var hlObj = FindHilightObjById(idStr);
													if(!hlObj)
														return;
														
													var j=0;
													for(; this.childNodes.length; i++) {
														var chNode = this.childNodes[j];
														if(chNode.nodeName=="SPAN" && (chNode.id=="INPUT_"+idStr || chNode.id=="INPUTU1_"+idStr))
															break;
													}
													if(j==this.childNodes.length)
														return;
													hlObj.r_value.r_setHtml(this.childNodes[j]);
												};
											}
											catch(e){}
											newObj.innerHTML = ret;
										}
										break;
									}
									obj.innerHTML = ret;
									break;
								case 3:
									var obj = document.getElementById("INPUT_"+BK_H_OBJ.r_id);
									if(!obj)
										break;
									if(obj.nodeName == 'TEXTAREA') {
										var newObj = BK_ChangeTextarea(obj);
										if(newObj) {
											newObj.innerHTML = ret;
											try {
												newObj.onkeyup = function() {
													if(this.parentElement==null)
														return;
													
													var idStr = this.id.split("_")[1];
													var hlObj = FindHilightObjById(idStr);
													if(!hlObj)
														return;
													hlObj.r_value.r_setHtml(this);
												};
											}
											catch(e){}
										}
										break;
									}
									obj.innerHTML = ret;
									break;
								case 6:
								case 7:
									if(ParsingRule[pn][2]!=8)
										break;
									var pId = BK_H_OBJ.r_id.split("_")[1];
									var pNode = document.getElementById("VAL_"+pId+comAppId);
									if(!pNode || !pNode.childNodes)
										break;
									
									for(var z=0; z<pNode.childNodes.length; z++) {
										var chNode = pNode.childNodes[z];
										if(!chNode || chNode.childNodes.length!=2)
											continue;
										if(chNode.childNodes[0].nodeName != "INPUT")
											continue;
										
										if(BK_H_OBJ.r_id == chNode.childNodes[0].getAttribute("id")) {
											if(chNode.childNodes[1].nodeName=="SPAN") {
												chNode.childNodes[1].innerText = "";
												chNode.childNodes[1].innerHTML = ret;
											}
											else if(chNode.childNodes[1].nodeName=="#text") {
												chNode.removeChild(chNode.childNodes[1]);
												chNode.innerHTML += ret;
											}
											break;
										}
									}
									break;
							}
							break;
						case 'UNIT':
							switch(ParsingRule[pn][3]) {
								case 8:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode || !valNode.childNodes)
										break;
									for(var z=valNode.childNodes.length-1; z>=0; z--) {
										var chNode = valNode.childNodes[z];
										if(chNode.nodeName == "INPUT")
											continue;
										else if(chNode.nodeName == "#text") {	
											var z1 = 0;
											for(; z1<valNode.childNodes.length; z1++) {
												if(valNode.childNodes[z1].nodeName=="SPAN" && valNode.childNodes[z1].id=="unit")
													break;
											}
											if(z1 == valNode.childNodes.length) {
												var newTextNode = chNode.cloneNode(true);
												valNode.removeChild(chNode);
												if(IsStaticGrid(pn))
													valNode.innerHTML += "<span id='unit'>"+ret+"</span>";
												else
													valNode.innerHTML += "<span id='unit'>&nbsp;"+ret+"</span>";
												if(ParsingRule[pn][18]) {
													newTextNode.data = " "+ParsingRule[pn][18];
													valNode.appendChild(newTextNode);
												}
												break;
											}
											chNode.innerHTML = ret;
											break;
										}
										else if(chNode.nodeName == "SPAN") {
											if(chNode.id=="unit") {
												if(IsStaticGrid(pn))
													chNode.innerHTML = ret;
												else
													chNode.innerHTML = "&nbsp;"+ret;
												break;
											}
										}
									}
									break;
								default:
									break;
							}
							break;
						case 'APPEND':
							switch(ParsingRule[pn][3]) {
								case 8:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode || !valNode.childNodes)
										break;
									for(var z=valNode.childNodes.length-1; z>=0; z--) {
										var chNode = valNode.childNodes[z];
										if(chNode.nodeName == "INPUT")
											continue;
										else if(chNode.nodeName == "#text") {
											var z1 = 0;
											for(; z1<valNode.childNodes.length; z1++) {
												if(valNode.childNodes[z1].nodeName=="SPAN" && valNode.childNodes[z1].id=="unit")
													break;
											}
											if(z1 == valNode.childNodes.length) {
												if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8 && ParsingRule[pn+1][12]) {
													if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8))
														chNode.data = ParsingRule[pn+1][12];
												}
											}
											else
												valNode.removeChild(chNode);
											if(IsStaticGrid(pn))
												valNode.innerHTML += "<span id='append'>"+ret+"</span>";
											else
												valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
											break;											
										}
										else if(chNode.nodeName == "SPAN") {
											if(chNode.id=="append") {
												if(IsStaticGrid(pn))
													chNode.innerHTML = ret;
												else
													chNode.innerHTML = "&nbsp;"+ret;
												break;
											}
										}
									}
									break;
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 5:									
								case 9:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode)
										break;
									
									var isSG = true;
									for(var z=0; z<valNode.childNodes.length; z++) {
										var chNode = valNode.childNodes[z];
										if(chNode.nodeName == "#text")
											break;
										else if(chNode.nodeName == "INPUT") {
											isSG = false;
											break;
										}
										else if(chNode.nodeName == "SPAN" && chNode.id == "pre")
											break;
									}
								
									var chNode = valNode.childNodes;
									for(var z=chNode.length-1; z>=0; z--) {
										if(chNode[z].nodeName == "#text" || chNode[z].nodeName == "SPAN") {
											if(!chNode[z].id || chNode[z].id=='append') {
												valNode.removeChild(chNode[z]);
												break;
											}
										}
									}
									if(isSG)
										valNode.innerHTML += "<span id='append'>"+ret+"</span>";
									else
										valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
									break;
								case 6:
								case 7:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode)
										break;
									
									for(var z=valNode.childNodes.length-1; z>=0; z--) {
										var chNode = valNode.childNodes[z];
										if(chNode.nodeName == "#text") {
											var newTextNode = chNode.cloneNode(true);
											valNode.removeChild(chNode);
											valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
										}
										else if(chNode.nodeName=="SPAN" && chNode.id=="append") {
											chNode.innerHTML = "&nbsp;"+ret;
										}
									}
									break;
								default:
									break;
							}
							break;
						case 'NA':
							switch(ParsingRule[pn][3]) {
								case 6:
								case 7:
									var valNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
									if(!valNode)
										break;
									
									for(var z=0; z<valNode.childNodes.length; z++) {
										var chNode = valNode.childNodes[z];
										if(!chNode || chNode.childNodes.length!=2)
											continue;
										if(chNode.childNodes[0].nodeName != "INPUT")
											continue;
																				
										if(chNode.childNodes[1].nodeName=="SPAN") {
											chNode.childNodes[1].innerText = "";
											chNode.childNodes[1].innerHTML = ret;
										}
									}
									break;
							}
							break;
						default:
							break;
					}
				}
			}
		}
		catch(e) {}
	}
}

function MakeHighlightXML() {
	if(!g_hSelObj || g_hSelObj.length<1)
		return;
	
	var hlXml = "<BK_HL_COLLECTION>";
	for(var i=0; i<g_hSelObj.length; i++) {
		var hlObj = g_hSelObj[i];
		hlXml += "<BK_HL_ITEM id='"+hlObj.r_id+"'>";
		
		var typeArr = ['CAP', 'PRE', 'VALUE', 'UNIT', 'APPEND'];
		for(k=0; k<typeArr.length; k++) {
			var tempArr = null;
			if(typeArr[k]=='CAP')					tempArr = hlObj.r_caption.r_arr;
			else if(typeArr[k]=='PRE')		tempArr = hlObj.r_prefix.r_arr;
			else if(typeArr[k]=='VALUE')	tempArr = hlObj.r_value.r_arr;
			else if(typeArr[k]=='UNIT')		tempArr = hlObj.r_unit.r_arr;
			else if(typeArr[k]=='APPEND')	tempArr = hlObj.r_appendix.r_arr;
			else if(typeArr[k]=='NA')			tempArr = hlObj.r_na.r_arr;
				
			for(var j=0; j<tempArr.length; j++) {
				var tempObj = tempArr[j];
				hlXml += "<HL_DATA type='"+typeArr[k]+"'";
				hlXml += " mode='"+tempObj.r_type+"' value='"+tempObj.r_value+"' start='"+tempObj.r_start+"' end='"+tempObj.r_end+"'>";
				hlXml += "</HL_DATA>";
			}
		}
		
		hlXml += "</BK_HL_ITEM>";
	}
	hlXml += "</BK_HL_COLLECTION>";
	return hlXml;
}

function LoadHighlightXML(x0) {
	var x1;
	if(window.ActiveXObject)
	{
		x1=new ActiveXObject("Microsoft.XMLDOM");
		x1.async="false";
		G_ORGXML=x0.replace("encoding='UTF-16'", "encoding='euc-kr'");
		
		x1.loadXML(G_ORGXML);
	}
	else if(window.DOMParser)
	{
		var parser = new DOMParser();
		x1 = parser.parseFromString(x0.replace("encoding='UTF-16'", "encoding='euc-kr'"),"text/xml");
	}
	if(x1==null)
		return;
	
	g_hSelObj = null;
	var hlList = x1.getElementsByTagName("BK_HL_ITEM");
	if(!hlList || hlList.length<1)
		return;
	
	g_hSelObj = new Array();
	for(var i=0; i<hlList.length; i++) {
		var hlItem = hlList[i];
		var hlItemId = hlItem.getAttribute("id");
		if(!hlItemId)
			continue;
		var BK_H_OBJ = new BK_HILIGHT(hlItemId);
		var hlDataList = hlItem.getElementsByTagName("HL_DATA");
		for(var j=0; j<hlDataList.length; j++) {
			var type = hlDataList[j].getAttribute("type");
			var mode = hlDataList[j].getAttribute("mode");
			var val = hlDataList[j].getAttribute("value");
			var start = hlDataList[j].getAttribute("start");
			var end = hlDataList[j].getAttribute("end");
			
			BK_H_OBJ.r_addFormat(type, mode, val, start, end);
		}
		g_hSelObj[g_hSelObj.length] = BK_H_OBJ;
	}
	
	DrawHighlight();
}

function FindHilightObjById(id) {
	if(!g_hSelObj)
		return null;
	
	for(var i=0; i<g_hSelObj.length; i++) {
		if(g_hSelObj[i].r_id == id)
			return g_hSelObj[i];
	}
	return null;
}

/***********************한일병원 필수 그룹 접기 금지 기능**********************************/
var g_GroupEvent = new Array();



function SetFoldingGroup()
{
//	return;
	var len = CollapableItem.length;
	for(var i=0; i<len; i++)
	{
		var subStr = GetInstItem(CollapableItem[i], 0);
		if(subStr == null)
			continue;
		var subArr = subStr.split("/");
		var sLen = subArr.length;
		for(var j=0; j<sLen; j++)
		{
			var flag = isManGroup(subArr[j]);
			if(flag==false)
				continue;
			
			AddManGroup(CollapableItem[i]);
			break;
		}
	}
	
	len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		if(ParsingRule[i][16]==0)
			continue;
		var controlId = ParsingRule[i][9];
		if(ParsingRule[i][2] == 4)
		{
			var len2 = G_V_Info.length;
			for(var j=0; j<len2; j++)
			{
				if(ParsingRule[i][0] != G_V_Info[j][0])
					continue;
				for(var k=0; k<len; k++)
				{
					if(ParsingRule[k][0] != G_V_Info[j][1])
						continue;
					controlId = ParsingRule[k][9];
				}
			}
		}
		
		var len2 = InstItem.length;
		var flag = 0;
		for(var j=0; j<len2; j++)
		{
			var tArr = InstItem[j][3].split("/");
			var tlen = tArr.length;
			for(var k=0; k<tlen; k++)
			{
				if(tArr[k] != controlId)
					continue;
				flag = 1;
				AddManGroup(InstItem[j][0]);
				break;
			}
			if(flag)
				break;
		}
	}
}

function AddManGroup(id)
{
	var len = g_pGroup.length;
	for(var i=0; i<len; i++)
	{
		if(g_pGroup[i] == id)
			return;
	}
	g_pGroup[len] = id;
}

function GetInstItem(id, idx)
{
	var len = InstItem.length;
	var retStr = "";
	for(var i=0; i<len; i++)
	{
		if(InstItem[i][idx] != id)
			continue;
		if(retStr != "")
			retStr += "/";
			
		retStr += InstItem[i][3];
		var xArr = InstItem[i][3].split("/");
		var xLen = xArr.length;
		
		for(var j=0; j<xLen; j++)
		{
			var xStr = GetInstItem(xArr[j], 1);
			if(xStr != null)
				retStr += ("/"+xStr);
		}
		return retStr;
	}
	return null;
}

function isManGroup(id)
{
	var len = ParsingRule.length;
	for(var i=0; i<len; i++)
	{
		if(ParsingRule[i][9] != id)
			continue;
		var mLen = M_G_E.length;
		for(var j=0; j<mLen; j++)
		{
			if(M_G_E[j][1] == ParsingRule[i][0])
				return true;
		}
	}
	return false;
}

function ClearGridData(id) {
	var data = GetGridData(id);
	var arr;
	if(data != null && data != "")
	{
		arr = data.split(",");
	}
	
}
