
function InstSelectWindow()
{
	var win = window.open("../script/SelectInst.html", 'popup', 'toolbar=no, status = no,width=350,height=250,resizable=yes');
	win.document.close();
}

var problemData;
function showProblemList()
{
	var txt = '';
	var obj;
  if (window.getSelection)
  {
    txt = window.getSelection();
  }
  else if (document.getSelection)
  {
  	txt = document.getSelection();
  }
  else if (document.selection)
  {
    txt = document.selection.createRange().text;
  }
 
 	if(txt == '')
 	{
 		obj = document.elementFromPoint(event.clientX, event.clientY);
 		if(obj)
 			txt = obj.innerText;
  }

	if(txt == '')
		return;
	
	problemData = txt;
	var win= window.open("../script/ProblemListRegister.html", 'popup', 'toolbar=no, status = no,width=370,height=300');
	win.document.close();
	return false;
}


function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
  	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  	x=x.replace(/^\s+|\s+$/g,"");
  	if (x==c_name)
    {
    	return unescape(y);
    }
  }
  return "";
}


function GetDateString()
{
	var d = new Date();
	var dstr = d.getYear()+"-";
	var i = d.getMonth()+1;
	if(i >= 10)
		dstr += i+"-";
	else
		dstr += "0"+i+"-";
		
	i = d.getDate();
	if(i >= 10)
		dstr += i+" ";
	else
		dstr += "0"+i+" ";
		
	i = d.getHours();
	if(i >= 10)
		dstr += i+":";
	else
		dstr += "0"+i+":";
	
	i = d.getMinutes();
	if(i >= 10)
		dstr += i+":";
	else
		dstr += "0"+i+":";
	
	i = d.getSeconds();
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;

	return dstr; 		
}


function GetDateString1()
{
	var d = new Date();
	var dstr = d.getYear();
	var i = d.getMonth()+1;
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;
		
	i = d.getDate();
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;
		
	i = d.getHours();
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;
	
	i = d.getMinutes();
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;
	
	i = d.getSeconds();
	if(i >= 10)
		dstr += i;
	else
		dstr += "0"+i;

	return dstr; 		
}

/*
var NORMAL=0, HIGHLIGHT=1;
var curColor="#FF00FF";
var jobSelected=NORMAL;
var curDate=new Date();
var postItCount=curDate.getTime();
setTimeout("initBody()", 500);
function initBody(){
	var temp = document.body;
	if(temp == null)
		return;
	//document.body.onmouseup=doSelectedJob;
	//document.body.oncontextmenu=cancelSelect;
}

function addPostIt()
{
	var hObj;
	postItCount++;
	hObj = document.createElement('div'); 
	
	//<DIV align='right' onmousedown="initDrag('PostIt', 1);" onmouseup="endDrag();" style="cursor:hand;background-color:lightblue;padding:0px;width=100%;">
	hObj.setAttribute("id", "PostIt"+postItCount);
	hObj.setAttribute("onmouseup", "endDrag()");
	hObj.setAttribute("class", "postit");
	hObj.setAttribute("style", "left:500px;top:10px;width:300px;height:250px;");
	hObj.innerHTML =  "<DIV align='right' onmousedown=\"initDrag('PostIt"+postItCount+"', 1);\" onmouseup=\"endDrag();\""
										+ "style=\"cursor:hand;background-color:lightblue;padding:0px;width=100%;\">"
										+ "<input type=\"button\" onclick=\"javascript:removeObj('PostIt"+postItCount+"')\" value=\"X\" style=\"height:17px;\"></DIV>"
										+"<textarea style=\"border:0;background-color:lightyellow;color:#0000ff;overflow-x:hidden;overflow-y: hidden;width:100%;height:100%;\">"
										+"</textarea><DIV onmousedown=\"initDrag('PostIt"+postItCount+"', 2);\" onmouseup=\"endDrag();\" style=\"cursor:hand;background-color:lightblue;padding:0px;height:5px;\"></DIV></DIV>";
	hObj.style.top=50;
	hObj.style.left=300;
	hObj.style.width=300;
	hObj.style.height=250;
	hObj.style.zIndex =100;
	hObj.style.position="absolute";
	document.body.appendChild(hObj);
	showObj("postIt"+postItCount);
}

function initDrag(obj, mode){
	var hObj;
	
	hObj= document.getElementById(obj);
	hObj.style.visibility="visible";
	
	offsetx=event.clientX;
	offsety=event.clientY;

  if(mode==1)
  {		
		tempx=parseInt(hObj.style.left);
		tempy=parseInt(hObj.style.top);
	}
	else if(mode ==2)
	{
		tempx=parseInt(hObj.style.width);
		tempy=parseInt(hObj.style.height);
	}
	
	dragObj = obj;
	dragMode=mode;
	document.onmousemove=dragDrop;
	document.onmouseup=endDrag;
}
function dragDrop()
{
 var hObj;
 hObj= document.getElementById(dragObj);
 if (dragMode==1){
  maxX=parseInt(document.body.clientWidth);
  maxY=parseInt(document.body.clientHeight)-40;
  curX=event.clientX;
  curY=event.clientY;
  width=parseInt(hObj.style.width);
  height=parseInt(hObj.style.height);
  
  if(curX-(offsetx-tempx)+width>maxX)
   curX=maxX-width+(offsetx-tempx);
  else if(curX-(offsetx-tempx)<0)
   curX=0+(offsetx-tempx);
  if(curY-(offsety-tempy)+height>maxY)
   curY=maxY-height+(offsety-tempy);
  else if(curY-(offsety-tempy)<0)
   curY=0+(offsety-tempy);
   
  hObj.style.left = curX-offsetx+tempx;
  hObj.style.top = curY-offsety+tempy;
  return false;
 }
 else if(dragMode==2)
 {
  maxX=parseInt(document.body.clientWidth);
  maxY=parseInt(document.body.clientHeight)-40;
  curX=tempx+ event.clientX-offsetx;
  curY=tempy+ event.clientY-offsety;
  curL=parseInt(hObj.style.left);
  curT=parseInt(hObj.style.top);
  
  if(curX>maxX-curL)
   curX=maxX-curL;
  else if(curX<10)
   curX=10;
  if(curY>maxY-curT)
   curY=maxY-curT;
  else if(curY<10)
   curY=10;
   
  hObj.style.width = curX;
  hObj.style.height = curY;
  return false;
 }
}

function endDrag()
{
	if(dragObj)
	{
		dragObj = null;
		dragMode= null;
		document.onmousemove=null;
		document.onmousemove=null;
	}
}

function showObj(obj){
	var hObj;
	hObj= document.getElementById(obj);
	hObj.style.visibility="visible";
}

function removeObj(obj)
{
	var hObj = document.getElementById(obj);
	hObj.removeNode(true);
}

function doSelectedJob()
{
	if(jobSelected==HIGHLIGHT)
	{
		doHighlight();
	}
}

function cancelSelect(){
	jobSelected=NORMAL;
	document.body.style.cursor='auto';
}
function doUndo()
{
	document.execCommand("undo");
}
function doHighlight()
{
	document.execCommand("backcolor", 0, curColor);
	//document.execCommand("bold");
	document.execCommand("Unselect");
}

function GetValueFromHL7String(sHL7, sToken, nNum)
{
	var x1=sHL7.split(',');
	var x2=x1.length;
	var x3;
	var x5="["+sToken+"]";
	for(x3=0;x3<x2;x3++)
	{
		var x10=x1[x3].split('^');
		if(x10[0] == x5)
		{
			if(x10.length >= nNum+1)
				return x10[nNum+1];
			else
				return "";
		}
	}
	return "";
}


function GetPeriod(idStr, mode, retType)
{
	// mode 0 : Today - inputDay
	// mode 1 : inputDay - ToDay
	// retType 0 : Period Type : DD
	// retType 1 : Period Type : MM-DD
	// retType 2 : Period TYpe : YYYY-MM-DD
	var x1 = fn_fprbc(idStr);
	if(x1 < 0 || ParsingRule[x1][3] != 4)
		return "";
	
	if(mode > 1 || retType > 1)
		return "";
	var toDay = GetDate();	
	var opDay = GetStringValue(ParsingRule[x1][0], "");
	if(opDay == "" || opDay.length != 10)
		return "";
	
	var tArr = toDay.split('-');
	var oArr = opDay.split('-');
	if(tArr.length != 3 || oArr.length != 3)
		return "";
	
	var retArr = new Array(3);	
	for(i=0; i<3; i++)
		retArr[i] = 0;
	
	if(mode == 1)
	{
		var tempArr = tArr;
		tArr = oArr;
		oArr = tempArr;
	}
	
	for(i=2; i>=0; i--)
	{
		retArr[i] = tArr[i] - oArr[i];
		if(i != 0)
		{
			if(retArr[i] < 0)
				retArr[i-1]--;
		}
	}
	
	var retDay = "";
	if(retArr[0] < 0) 
		return "";
	else
	{
		if(retArr[2] < 0)
			if(retArr[1] <= 0) return "";
		if(retArr[1] < 0)
			if(retArr[0] <= 0) return "";
	}
	
	
	retDay = retArr[0] * 365 + retArr[1] * 31 + retArr[2];	
	if(retType == 0)
		return retDay;
	else
	{
		var month = parseInt(retDay/30);
		if(month < 10) month = "0" + month;
		var day = retDay%30;
		if(day < 10) day = "0" + day;
		
		return month + "-" + day;
	}
}

*/