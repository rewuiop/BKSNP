//======================================================돋보기 추가
function makeZoom(){
	if(document.getElementById('zoomObj')!=null){
		return;
	}
	var obj=document.createElement('object');
	
	obj.setAttribute("id","zoomObj");
	obj.setAttribute("classid","clsid:E265D402-C31F-4D2D-A976-5454EE31E229");
	obj.setAttribute("codebase","/EMR_DATA/applet/MagnifyGlass.cab#version=1,1,0,0" );
	
	obj.style.visibility='hidden';
	try
	{
		document.body.children.contentArea.appendChild(obj);
	}
	catch(e)
	{
		document.body.children.contentArea.innerHTML += obj.outerHTML;
	}		
	obj = null;
}
function activeZoom(){
	var obj=document.getElementById('zoomObj');
	obj.execute();
}

//======================================================
function showMessage(desc){
	var nDiv=document.getElementById('msgDialog');
	if(nDiv==null)
		nDiv=document.createElement('div');
	nDiv.setAttribute('id', 'msgDialog');
	nDiv.style.border='0px #000000 solid';
	nDiv.style.background='#00D7FF';
	nDiv.style.width='200px';
	//nDiv.style.height='50px';
	nDiv.style.zIndex='2';
	nDiv.style.top='0';
	nDiv.style.left='1100';
	nDiv.style.position='absolute';
	nDiv.style.opacity=1.0;
	nDiv.style.filter='alpha(opacity=100)';
	nDiv.innerHTML=desc;
	msgOpacity=100;
	setTimeout("hideMessage()", 1000);
	document.one.appendChild(nDiv);
}
var msgOpacity=100;
function hideMessage(){
	var nDiv=document.getElementById('msgDialog');
	if(nDiv==null)
		return;
	if(nDiv.style.opacity<=0){
	}
	else{
		nDiv.style.opacity-=0.1;
		msgOpacity-=10;
		nDiv.style.filter='alpha(opacity='+msgOpacity+')';
		setTimeout("hideMessage()", 100);
	}
}

//======================================================형광펜, 메모

/*


메모기능
SaveRecord_All.jsp->서블릿
	PostitFilename 추가 
/EMR_DATA/script/BK_COMMON_SCRIPT.js
    function post_to_temp()
    	- postitFilePath 변수 사용
    function fn_gdifv()
    	- postitFilePath 변수 사용
    	- 메모 가져오기 함수 호출
/EMR_DATA/script/BK_COMMON_SCRIPT_PRINT.js
	function fn_gdifv()
    	- 메모 가져오기 함수 호출
/EMR_DATA/SDK/js/RightContent.js

*/
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
//형광펜,메모 기록에서 저장 시
var dragObj=null;
function SaveHtml2() 
{
  try
	{
    var tempscriptTag = document.getElementsByTagName('script');
    
    for(i=0; i < tempscriptTag.length; i++)
    {
      if(tempscriptTag[i].src.split('BK_COMMON_SCRIPT_PRINT.js').length == 2)
      {
        tempscriptTag[i].charset='euc-kr';
        break;
      } 
    }

    var memocontent = document.getElementById("GrpPostit");
    var PostitFilename = "";
 	  var HighlightFilename = "";
  
    if(memocontent != null)
    {     
   	  if(memocontent.children.length > 0)
  	  {
   		var htmlStr;
   		for(var i=0;i<memocontent.children.length;i++)
   		{
   			htmlStr = "";
   			for(var j=0;j<memocontent.children[i].children[0].children.length;j++)
   				htmlStr += memocontent.children[i].children[0].children[j].outerHTML;
   			memocontent.children[i].children[0].innerHTML=htmlStr;
   		}
        PostitFilename = xmlhttpPost_Sync(SERVERADDR+"/EMR_DATA/Save_File.jsp", 
  			"doc_info="+SeqNo+"^"+docuId+"^"+ptId+"^"+doctorId+"^"+doc_version+"&xmlData="+ToHex4Unicode(memocontent.innerHTML), 5);
  		  removeObj('GrpPostit');
  		PostitFilename = trim(PostitFilename);
		  }		
	  } 
	
	//BK_SaveHilight();
	/*var params =  PostitFilename + "^" + SeqNo;
	var ret = xmlhttpPost_Sync(SERVERADDR+"/EMR_DATA/UpdateSql.jsp","SqlDec=UPDATE_BERDMRECD3&param=" + params);	
    */
    updateBerdmrecd('1','2','3','4');
     addpostit(PostitFilename);

	}finally
	{ 
	  checkmode = false;
	  strHtml = null;
	}
	

}

function saveDocuAsHtml(){

	//recordTime=getCalendar();
	//var updateArray2 = new Array(needCosigner, cosignerCode, insfDocCode, extRecdCode, recordTime, signer2, cosigner2);

	if(document.getElementById('RECORD_PAN').contentWindow.document.getElementById('ifrm_0')==null)
		return;
	//document.getElementById('RECORD_PAN').contentWindow.frames('ifrm_0').fn_gdifv2(updateArray2);
	
	document.getElementById('RECORD_PAN').contentWindow.frames('ifrm_0').SaveHtml2();
	
	showMessage('형광펜 / 메모 저장되었습니다.');
}



/**************** MEMO ****************/
var curDate=new Date();
var postItCount=0; //curDate.getTime();
//신규 및 수정 후 저장 시 메모 저장하는 함수
var PostitFilename;
function checkpostit()
{
  PostitFilename = "";    //leeck 초기화
	var memocontent =  document.getElementById("GrpPostit");
 
  if(memocontent != null  )
  {     
  	if(memocontent.children.length > 0)
 	  {
 	  	var htmlStr;
 	  	for(var i=0;i<memocontent.children.length;i++)
 	  	{
 	  		htmlStr = "";
 	  		if(memocontent.children[i].children.length<1)
 	  			return;
 	  		for(var j=0;j<memocontent.children[i].children[0].children.length;j++)
 	  			htmlStr += memocontent.children[i].children[0].children[j].outerHTML;
 	  		memocontent.children[i].children[0].innerHTML=htmlStr;
 	  	}
 	  	
      PostitFilename =  xmlhttpPost_Sync(SERVERADDR+"/EMR_DATA/Save_File.jsp", 	"doc_info=0^"+docCode+"^"+pid+"^"+doctorId+"^"+x1.doc[18]+"&xmlData="+ToHex4Unicode(memocontent.innerHTML), 7);
      PostitFilename = PostitFilename.trim();
    }
  }  
}


function addPostIt()
{
   var GrpPostit = document.getElementById("GrpPostit");
	if(GrpPostit == null){
		var hObj;
		hObj = document.createElement('div'); 
		hObj.setAttribute("id", "GrpPostit");
		document.body.children.contentArea.appendChild(hObj);
	}
    addPostItContent();
}
var postItstartpostop = 50;
var postItstartposleft = 300;
function addPostItContent(){
   //var GrpPostit = document.getElementById("GrpPostit");
	//var hObj;
	//postItCount++;
	//postItstartpostop = postItstartpostop + 20;
	//postItstartposleft= postItstartposleft - 20;

	//hObj = document.createElement('div'); 
	//var postitCol = "lightyellow";
	/*if(postItCount%4 == 1)
	{
		postitCol = "lightyellow";
	}
	if(postItCount%4 == 2)
	{
		postitCol = "#FFB6C1";
	}
	if(postItCount%4 == 3)
	{
		postitCol = "lightgreen";
	}
	if(postItCount%4 == 0)
	{
		postitCol = "yellow";
	}
	*/
	/*<DIV align='right' onmousedown="initDrag('PostIt', 1);" onmouseup="endDrag();" style="cursor:hand;background-color:lightblue;padding:0px;width=100%;">*/
	if(postItCount==0)
	{
		var GrpPostit = document.getElementById("GrpPostit");
		var hObj;
		postItCount++;
		postItstartpostop = postItstartpostop + 20;
		postItstartposleft= postItstartposleft - 20;
		
		hObj = document.createElement('div'); 
		var postitCol = "lightyellow";
		
		hObj.setAttribute("id", "PostIt"+postItCount);
		hObj.setAttribute("onmouseup", "endDrag()");
		hObj.setAttribute("name", "PostIt");
		hObj.setAttribute("class", "postit");
		hObj.setAttribute("style", "left:500px;top:10px;width:200px;height:150px;");
		hObj.innerHTML =  "<DIV align='right' onmousedown=\"initDrag('PostIt"+postItCount+"', 1);\" onmouseup=\"endDrag();\""
											+ "style=\"cursor:move;background-color:lightblue;padding:0px;width=100%;\">"
											+ "<input type=\"button\" onclick=\"javascript:MinSize('PostIt"+postItCount+"')\" value=\"-\" style=\"height:25px;\"><input type=\"button\" onclick=\"javascript:NomalSize('PostIt"+postItCount+"')\" value=\"+\" style=\"height:25px;\"><input type=\"button\" onclick=\"javascript:removeObj('PostIt"+postItCount+"')\" value=\"X\" style=\"height:25px;\"></DIV>"
											+"<textarea style=\"border:0;background-color:"+postitCol+";color:#0000ff;overflow-x:hidden;overflow-y: hidden;width:100%;height:100%;\">"
											+"</textarea><DIV onmousedown=\"initDrag('PostIt"+postItCount+"', 2);\" onmouseup=\"endDrag();\" style=\"cursor:crosshair;background-color:lightblue;padding:0px;height:5px;\"></DIV>";
		
		hObj.style.top=postItstartpostop;
		hObj.style.left=postItstartposleft;
		hObj.style.width=200;
		hObj.style.height=150;
		hObj.style.zIndex =100;
		hObj.style.position="absolute";
		GrpPostit.appendChild(hObj);
		showObj("PostIt"+postItCount);
	}
	else
		alert("메모는 하나의 기록에 하나만 작성 가능합니다.");
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
  maxX=parseInt(document.body.children.contentArea.clientWidth);
  maxY=parseInt(document.body.children.contentArea.clientHeight)-40;
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
   
  hObj.style.left = curX-offsetx+tempx+"px";
  hObj.style.top = curY-offsety+tempy+"px";
  return false;
 }
 else if(dragMode==2)
 {
  maxX=parseInt(document.body.children.contentArea.clientWidth);
  maxY=parseInt(document.body.children.contentArea.clientHeight)-40;
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
   
  hObj.style.width = curX+"px";
  hObj.style.height = curY+"px";
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
	postItCount--;
}
function MinSize(obj)
{
	var hObj = document.getElementById(obj);
	
  hObj.childNodes[0].childNodes[2].style.display = "none";//-
  hObj.childNodes[0].childNodes[3].style.display = "inline-block";//+
  hObj.childNodes[0].childNodes[4].style.display = "none";//x
  hObj.childNodes[1].style.display = "none";//textarea
  hObj.childNodes[2].style.display = "none";//foot
  
  hObj.style.posLeft = parseInt(hObj.style.posLeft)+parseInt(hObj.style.width)-200; // +  
  
  hObj.style.width = 55;
  hObj.style.height = 20;
}

function MinSizeCnt(obj, cnt)
{
	if(obj == null)
		return;
	
	var hObj = document.getElementById(obj);
	
  hObj.childNodes[0].childNodes[0].style.display = "none";//-
  hObj.childNodes[0].childNodes[1].style.display = "inline-block";//+
  hObj.childNodes[0].childNodes[2].style.display = "none";//x
  hObj.childNodes[1].style.display = "none";//textarea
  hObj.childNodes[2].style.display = "none";//foot
  
  var num = parseInt(cnt)+1;
  
  hObj.style.posTop = 20;
  hObj.style.posLeft = 570-(58*num); // +  
  
  hObj.childNodes[0].style.fontSize="12px";
  hObj.childNodes[0].innerHTML="메모"+num+" "+hObj.childNodes[0].innerHTML;
  hObj.style.width = 55;
}
var checkZindex="";
function NomalSize(obj)
{
	var hObj = document.getElementById(obj);
	
	hObj.childNodes[0].childNodes[2].style.display = "inline-block";//-
  hObj.childNodes[0].childNodes[3].style.display = "none";//+
  hObj.childNodes[0].childNodes[4].style.display = "inline-block";//x
  hObj.childNodes[1].style.display = "block";//textarea
  hObj.childNodes[2].style.display = "block";//foot
	
	hObj.style.width = 200;
  hObj.style.height = 150;
  
  hObj.style.posLeft = parseInt(hObj.style.posLeft); // -  
  if(checkZindex=="")
  	checkZindex = hObj.style.zIndex;
  else
  {
  	checkZindex = checkZindex+10;
  	hObj.style.zIndex = checkZindex;
  }
}

function addpostit(postitfile)
{
	if(postitfile==undefined) // 추가
		return;
	if(postitfile.length != 0)
	{
  	var postcontent = xmlhttpPost_Sync1("http://"+SERVERIP+postitfile,"",5);
  	LoadPostItContent(postcontent);
  }
}

function LoadPostItContent(content){

try
{
	var hObj;
		hObj = document.createElement('div'); 
		hObj.setAttribute("id", "GrpPostit");
		hObj.innerHTML = content;
		document.body.children.contentArea.appendChild(hObj);
		
		for(var i=0;i<hObj.childNodes.length;i++)
			MinSizeCnt(hObj.childNodes[i].id,i);
}
finally
{
  hObj = null;
}
}

/**************** END MEMO ****************/

/**************** HIGHLIGHT ****************/

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
						else if(tStr.charAt(x)==' ') {
							ret += "&nbsp;";
						}
						else
							ret += tStr.charAt(x);
					}
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
					else if(tStr.charAt(x)==' ') {
						ret += "&nbsp;";
					}
					else
						ret += tStr.charAt(x);
				}
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
		var r_under=null;
		
		while(ch)
		{
			if(ch.nodeName=='#text')
			{
				r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
				r_bold=this.r_compare(null, r_bold, "BOLD", pos);
				r_color=this.r_compare(null, r_color, "COLOR", pos);
				r_back=this.r_compare(null, r_back, "BACK", pos);
				r_under=this.r_compare(null, r_under, "UNDERLINE", pos);
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
					r_under=this.r_compare(ch.style.textDecoration, r_under, "UNDERLINE", pos);
				}
				else
				{
					r_fontSize=this.r_compare(null, r_fontSize, "SIZE", pos);
					r_bold=this.r_compare(null, r_bold, "BOLD", pos);
					r_color=this.r_compare(null, r_color, "COLOR", pos);
					r_back=this.r_compare(null, r_back, "BACK", pos);
					r_under=this.r_compare(null, r_under, "UNDERLINE", pos);
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
		r_under=this.r_compare(null, r_under, "UNDERLINE", pos);
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
			var ret="<SPAN class='bk_hl_style' style='";
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
					ret += "font-weight:"+this.r_mode[i][1]+";";
					break;
				case "UNDERLINE":
					ret += "text-decoration:"+this.r_mode[i][1]+";";
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
	g_hSelId[g_hSelId.length]=[id, appId, mode, obj, start, end];
}

function BK_AddSelectionValue(id, obj, mode, start, end)
{

	var ids=id.split('_');
	var appId="";
	for(var i=2; i<ids.length; i++) {
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
	if(!ele || !ele.parentNode)
		return 0;
	
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
		if(c.tagName=='P' || c.tagName=='BR')
			len+=2;
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
		else if(obj.value!=undefined)
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
		if(s.text==x.text) {
			if(s.offsetLeft==x.offsetLeft && s.offsetTop==x.offsetTop && s.boundingLeft==x.boundingLeft && s.boundingHeight==x.boundingHeight)
				break;
		}
		
		x.moveEnd("character", 1);
		x.moveStart("character", 1);
	}
	return i;
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
		//BK_FindValueId(obj, mode, sPoint, sPoint+g_hTextStr.length-g_hCurTextPos);
		if(g_hCurTextPos+len == g_hTextStr.length)
			BK_FindValueId(obj, mode, sPoint, sPoint+g_hTextStr.length-g_hCurTextPos);
		else
			BK_FindValueId(obj, "e", sPoint, sPoint+g_hTextStr.length-g_hCurTextPos);
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
			
			var top=BK_GetElementTop(obj)-document.body.children.contentArea.scrollTop;
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

function BK_ReplaceHtmlString(str)
{
	if(!str)
		return;
	
	var rStr="";
	var len=str.length;
	var bOut = 1;
	for(var i=0;i<len;i++)
	{
		var c=str.charAt(i);
		if(c=='&')
		{
			rStr += "_";
			bOut=0;
		}
		else if(c==';')
		{
			bOut=1;
		}
		else if(bOut)
		{
			rStr +=c; 
		}
	}
	return rStr;
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
				g_hFirstText = BK_ReplaceHtmlString(g_hFirstText);
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

function BK_ReplaceSpecialSpace(str) {
	var len = str.length;
	var retStr = "";
	for(var i=0; i<len; i++) {
		if(str.charCodeAt(i)==160) {
			retStr += " ";
		}
		else
			retStr += str.charAt(i);
	}
	return retStr;
}

function BK_FindSelectionText(obj,txt, no)
{
	if(!obj)
		return -1;
		
	var pos = 0;
	var nStr = "";
	if(obj.nodeName == "INPUT") {
		nStr = obj.value;
	}
	else {
		var ch=obj.firstChild;
		while(ch) {
			if(ch.nodeName=='#text') {
				var str=BK_ReplaceSpecialSpace(ch.nodeValue);
				str =str.replace(/\r/g, '\r\n');
				str =str.replace(/\r\n\n/g, '\r\n');
				nStr += str;
			}
			else if(ch.nodeName=='BR') {
				nStr += "\r\n";
			}
			else if(ch.innerText==txt) {
				nStr += txt;
			}
			else {
				for(var i=0;i<ch.innerText.length;i++)
					nStr += String.fromCharCode(8);
			}
			ch=ch.nextSibling;
		}
	}
	
	while(1) {
		pos = nStr.indexOf(txt, pos);
		if(pos<0) break;
		if(no==0)
			return pos;
		pos++; 
		no--;
	}
	return -1;
}

function BK_IsHtmlText(hTxt, txt) {
	var hTxt = hTxt.replace(/<BR>/gi, "\r\n");
	hTxt = hTxt.replace(/&nbsp;/gi, " ");
	
	var inner = 0;
	for(var i=0; i<hTxt.length; i++) {
		var ch = hTxt.charAt(i);
		switch(ch) {
			case '<':
				inner = 1; break;
			case '>':
				inner = 0; break;
			default : 
				if(inner!=0) break;
				if(txt == hTxt.substring(i, i+txt.length))
					return true;
				break;
		}
	}
	return false;
}

function BK_FindSelectionPos(obj)
{
	if(BK_FindSelectionText(obj, g_hSelRange.text, 1) <0)
		return BK_FindSelectionText(obj, g_hSelRange.text, 0);
	
	var x=BK_CreateTRange(obj);
	var count=0;
	var pos=x.htmlText.length;
	var len=pos*2;
	while(x.text.length > g_hSelRange.text.length && pos)
	{
		x.moveEnd("character", -1);
		pos--;
	}
	
	for(var i=0;i<len;i++)
	{
		if(g_hSelRange.text == x.text && BK_IsHtmlText(x.htmlText, x.text) && x.parentElement()==obj)
		{
			if(g_hSelRange.inRange(x) || x.inRange(g_hSelRange)) 
				return BK_FindSelectionText(obj, g_hSelRange.text, count);
			count++;
		}
		x.moveStart("character",1); 
		x.moveEnd("character",1);
		for(var z=0; z<100; z++)
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

function CreateTRange(obj) {
	var x=null;
	if(obj.tagName !='INPUT' || obj.type !='text') {
		x=document.selection.createRange();
		x.moveToElementText(obj);
 	}
 	else {
 		x=obj.createTextRange();
 	}
 	return x;
}

function FindStartRange(rg, len) {
	var checkCnt = 0;
	while(rg.text.length != len) {
		if(rg.text.length-len < 0)
			checkCnt++;
			
		rg.moveStart("character", rg.text.length-len);
		
		if(checkCnt>10)
			return false;
	}
	return true;
}

function FindEndRange(rg, len)
{
  var checkCnt = 0;
  
  var nlCnt = rg.text.split('\n').length;
  
  while(rg.text.length != len)
  {
    //if(rg.text.length-len < 0)
    checkCnt++;
    
    //rg.moveEnd("character", len-rg.text.length+10);
    if(rg.text.length-len>nlCnt)
      rg.moveEnd("character", len-rg.text.length+nlCnt);
    else
      rg.moveEnd("character", -1);
     
    if(checkCnt>30)
      return false;
  }
  return true;
}

function RangeSelect(obj, s, e) {
	var r=CreateTRange(obj);
	if(r==null)
		return;
	var len=0;
	if(obj.value)
		len = obj.value.length;
	else
		len = obj.innerText.length;
	if(!FindStartRange(r, len-s))
		return;
	if(!FindEndRange(r, e-s))
		return;
	r.select();
}

var isCheckResultDoc = false;
var MODE_ARR = ["", "BACK", "SIZE", "BOLD", "UNDERLINE", "COLOR"];
function BK_ExecuteHilight(mode, value)
{
	if(mode < 1 || mode >= MODE_ARR.length)
		return;
	
	if(isCheckResultDoc) {
		if(MODE_ARR[mode]!="BACK" && MODE_ARR[mode]!="COLOR")
			return;
	}
	
	checkmode = true;
	checkhighlight = true;
	
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
	else if(0>g_hSelRange.htmlText.replace(/<BR>/gi, "\r\n").indexOf("<"))
	{
		var sP=BK_FindSelectionPos(pNode);
		BK_FindValueOuter(pNode, sP, sP+g_hSelRange.text.length);
	}
	else
	{
		BK_ProcessHtmlString(g_hSelRange.htmlText);
		while(pNode.innerText.length < g_hSelRange.text.length)
		{
			pNode = pNode.parentElement;
		}
		BK_FindLastInput(g_hSelRange.htmlText);
		BK_GetSelection(pNode);
	}
	
	if(!g_hSelId || g_hSelId.length < 1)
		return;
	
	var out='';
	for(var i=0;i<g_hSelId.length;i++)
		out += g_hSelId[i]+"\r\n";
	
	var multiSel = false;
	for(var i=0; i<g_hSelId.length-1; i++) {
		if(g_hSelId[i][0]!=g_hSelId[i+1][0] || g_hSelId[i][2]!=g_hSelId[i+1][2]) {
			multiSel = true;
			break;
		}
	}
	var lastComInfo = null;
	if(!multiSel) {
		for(var i=0; i<g_hSelId.length; i++) {
			if(!lastComInfo)
				lastComInfo = g_hSelId[i].slice(0);
			
			if(lastComInfo[2]=="CAP")
				break;
			if(lastComInfo[4]<0 && lastComInfo[5]<0)
				break;
			if(i==0)
				continue;
			
			if(g_hSelId[i][4]<lastComInfo[4])
				lastComInfo[4] = g_hSelId[i][4];
			if(g_hSelId[i][5]>lastComInfo[5])
				lastComInfo[5] = g_hSelId[i][5];
		}
	}
	
	MakeHLStructure(mode, value);
	DrawHighlight();
	
	try {
		if(!lastComInfo)
			return;
		
		var pEle;
		if(lastComInfo[2]=="CAP")
			pEle = document.getElementById("CAP_"+lastComInfo[0]+lastComInfo[1]);
		else
			pEle = document.getElementById("VAL_"+lastComInfo[0]+lastComInfo[1]);
		if(!pEle)
			return;
		
		if(lastComInfo[4]<0)
			lastComInfo[4] = 0;
		if(lastComInfo[5]<0)
			lastComInfo[5] = pEle.innerText.length;
		
		if(lastComInfo[4]>=lastComInfo[5])
			return;
		
		RangeSelect(pEle, lastComInfo[4], lastComInfo[5]);
	}
	catch(e){}
}

function MakeHLStructure(mode, value) {
	if(!g_hSelObj)
		g_hSelObj = new Array();
	
	if(MODE_ARR[mode]=="BOLD" || MODE_ARR[mode]=="UNDERLINE")
		value = GetHLStyle(MODE_ARR[mode]);
	
	for(var i=0; i<g_hSelId.length; i++) {
		var idx = 0;
		var HL_OBJ;
		for(; idx<g_hSelObj.length; idx++) {
			if(g_hSelObj[idx].r_id==g_hSelId[i][0]) {
				HL_OBJ = g_hSelObj[idx];
				break;
			}
		}
		if(idx == g_hSelObj.length)
			HL_OBJ = new BK_HILIGHT(g_hSelId[i][0]);
		 
		var comId = g_hSelId[i][0];
		var comAppId = g_hSelId[i][1];
		var comType = g_hSelId[i][2];
		var obj = g_hSelId[i][3];
		var comNodeName = obj.nodeName;
		var start = g_hSelId[i][4];
		var end = g_hSelId[i][5];
		var allFlag = (start<0&&end<0) ? true : false;
		
		var pn = fn_fprbvi(comId);
		if(pn < 0) {
			var valNode = document.getElementById("VAL_"+comId+comAppId);
			if(!valNode)
				continue;
		}
		
		switch(comType) { 
			case 'CAP':
				var comInfo = GetComInfo(comId, comAppId, comType, obj, start, end);
				if(!comInfo)
					continue;
				for(var k=0; k<comInfo.length; k++) {
					if(comInfo[k][3]!=0 && comInfo[k][4]==0)
						continue;
					comInfo[k][4]--;
					if(comInfo[k][4]<0)
						continue;
					
					HL_OBJ.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
				}
				break;
			case 'INPUT':
			case 'VAL':
			case 'CHECK':
			case 'RADIO':
				var comInfo = GetComInfo(comId, comAppId, comType, obj, start, end);
				if(!comInfo)
					continue;
				
				if(pn<0) {
					for(var k=0; k<comInfo.length; k++) {
						if(comInfo[k][3]!=0 && comInfo[k][4]==0)
							continue;
						comInfo[k][4]--;
						if(comInfo[k][4]<0)
							continue;
						
						HL_OBJ.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
					}
					break;
				}
				
				//Dynamic Grid Value
				if(ParsingRule[pn][2] == 4) {
					switch(ParsingRule[pn][3]) {
						case 6:
						case 7:
							for(var x=0; x<comInfo.length; x++) {
								if(comInfo[x][3]!=0 && comInfo[x][4]==0)
									continue;
								comInfo[x][4]--;
								if(comInfo[x][4]<0)
									continue;
								
								var idStr = "";
								var k, z;
								for(k=pn+1; k<ParsingRule.length; k++) {
									if(ParsingRule[k][3] != ParsingRule[pn][3])
										continue;
										
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
						default:
							for(var x=0; x<comInfo.length; x++) {
								if(comInfo[x][3]!=0 && comInfo[x][4]==0)
									continue;
								comInfo[x][4]--;
								if(comInfo[x][4]<0)
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
				switch(ParsingRule[pn][3]) {
					case 6:
					case 7:
						for(var x=0; x<comInfo.length; x++) {
							if(comInfo[x][3]!=0 && comInfo[x][4]==0)
								continue;
							comInfo[x][4]--;
							if(comInfo[x][4]<0)
								continue;
							
							var idStr = "";
							var k, z;
							for(k=pn+1; k<ParsingRule.length; k++) { 
								if(ParsingRule[k][3] != ParsingRule[pn][3])
									continue;
								
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
						continue;
					default:
						for(var k=0; k<comInfo.length; k++) {
							if(comInfo[k][3]!=0 && comInfo[k][4]==0)
								continue;
							comInfo[k][4]--;
							if(comInfo[k][4]<0)
								continue;
							
							HL_OBJ.r_addFormat(comInfo[k][0], MODE_ARR[mode], value, comInfo[k][3], comInfo[k][4]);
						}
						break;
				}
				break;
			default:
				break;
		}
		
		if(idx == g_hSelObj.length)
			g_hSelObj[g_hSelObj.length] = HL_OBJ;
	}
}

function GetHLStyle(mode) {
	if(!g_hSelId || g_hSelId.length < 1)
		return "";
	
	var styleStr = "";
	
	var firstType = g_hSelId[0][2]
	var firstNode = g_hSelId[0][3];
	var s = g_hSelId[0][4];
	var e = g_hSelId[0][4];
	
	switch(mode) {
		case "BOLD":
			if(firstNode.nodeName=="INPUT" || firstNode.nodeName=="TEXTAREA") {
				styleStr = "BOLD";
				break
			}
			if(firstNode.nodeName!="SPAN") {
				styleStr = "BOLD";
				break
			}
			if(firstNode.style.fontWeight.toUpperCase()!="BOLD")
				styleStr = "BOLD";
			break;
		case "UNDERLINE":
			if(firstNode.nodeName=="INPUT" || firstNode.nodeName=="TEXTAREA") {
				styleStr = "UNDERLINE";
				break
			}
			if(firstNode.nodeName!="SPAN") {
				styleStr = "UNDERLINE";
				break
			}
			if(firstNode.style.textDecoration.toUpperCase()!="UNDERLINE")
				styleStr = "UNDERLINE";
			break;
		default:
			break;
	}
	return styleStr;
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

function GetComInfo(comId, comAppId, comType, obj, s, e) {
	var pn = fn_fprbvi(comId);
	
	if(e==0)
		return null;
	var allFlag = (s<0&&e<0) ? true : false;
	
	if(pn >= 0) {
		if(comType != "CAP") {
			if(ParsingRule[pn][3]==6 || ParsingRule[pn][3]==7)
				return null;
		}
	}
	
	var nodeType = obj.nodeName;
	switch(comType) {
		case 'CAP':
			var capStr = GetComData(comId+comAppId, comType);
			if(!capStr)
				return null;
			var retVal = new Array();
			if(allFlag)
				retVal[0] = ['CAP', capStr, capStr.length, 0, capStr.length];
			else {
				if(s<0)
					s = 0;
				if(e>capStr.length)
					e = capStr.length;
				retVal[0] = ['CAP', capStr, capStr.length, s, e];
			}
			return retVal;	
		case 'INPUT':
			switch(nodeType) {
				case 'INPUT':
				case 'TEXTAREA':
				case 'SPAN':
				case 'P':
				case 'DIV':
				case '#text':
					var valStr = GetComData(comId+comAppId, "VALUE");
					if(!valStr)
						return null;
					var retVal = new Array();
					if(allFlag)
						retVal[0] = ["VALUE", valStr, valStr.length, 0, valStr.length];
					else {
						if(s<0)
							s = 0;
						if(e>valStr.length)
							e = valStr.length;
						retVal[0] = ["VALUE", valStr, valStr.length, s, e];
					}
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
					
					var valStr = GetComData(comId+comAppId, "VALUE");
					if(!valStr)
						return null;
					
					var retVal = new Array();
					if(allFlag)
						retVal[0] = ["VALUE", valStr, valStr.length, 0, valStr.length];
					else {
						if(s<0)
							s = 0;
						if(e>valStr.length)
							e = valStr.length;
						retVal[0] = ["VALUE", valStr, valStr.length, s, e];
					}
					return retVal;
				case 'OPTION':
					break;
				
				case 'TABLE':
				case 'TR':
				case 'TD':
				case 'SPAN':
				case '#text':
					{
						var pNode = document.getElementById("VAL_"+comId+comAppId);
						if(!pNode || !pNode.childNodes)
							return;
						
						if(pn<0) {
							var dataStr = "";
							if(allFlag)
								dataStr = pNode.innerText;
							else {
								if(pNode.childNodes[0].nodeName=="#text")
									dataStr = pNode.childNodes[0].data;
								else
									dataStr = pNode.childNodes[0].innerText;
							}
							if(!dataStr)
								return;
							var retVal = new Array();
							if(allFlag)
								retVal[0] = ["CAP", dataStr, dataStr.length, 0, dataStr.length];
							else {
								if(s<0)
									s = 0;
								retVal[0] = ["CAP", dataStr, dataStr.length, s, e];
							}
							return retVal;
						}
						
						var totStr = pNode.innerText;
						totStr = replaceAll(totStr, "\r\n", "");
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
										
										if(!node.childNodes)
											continue;
										
										var findItem = false;
										while(node.childNodes) {
											if(node.childNodes[0].nodeName=="INPUT" && (node.childNodes[0].type=="checkbox" || node.childNodes[0].type=="radio")) {
												findItem = true;
												break;
											}
											node = node.childNodes[0];
										}
										if(!findItem)
											continue;
										
										if(node.innerText=="N/A")
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
								
								var retVal = new Array();
								if(allFlag) {
									s = 0;
									e = totStr.length;
								}
								else {
									if(totStr != dataStr) {
										for(var i=j=0; i<totStr.length; i++) {
											if(totStr.charAt(i) != dataStr.charAt(j)) {
												if(s>0 && s>j)
													s--;
												if(e>j)
													e--;
												continue;
											}
											j++;
										}
									}
								}
								
								for(var i=0; i<dataArr.length; i++) {
									if(s>dataArr[i][3])
										continue;
									
									var sPos = 0;
									if(s>dataArr[i][2])
										sPos = s - dataArr[i][2];
									
									if(e<dataArr[i][3]) {
										retVal[retVal.length] = [dataArr[i][0], dataArr[i][1], dataArr[i][1].length, sPos, e-dataArr[i][2]-sPos];
										break;
									}
									else
										retVal[retVal.length] = [dataArr[i][0], dataArr[i][1], dataArr[i][1].length, sPos, dataArr[i][1].length];
								}
								return retVal;
						
							default:
								var isSG = IsStaticGrid(pn);
								var retVal = new Array();
								if(allFlag) {
									//Prefix
									if(ParsingRule[pn][17]) {
										if(ParsingRule[pn][2]==4)
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
										else {
											if(pNode.childNodes[0].nodeName == "#text")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
											else if(pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id == "pre")
												retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, 0, ParsingRule[pn][17].length];
										}
									}
									//Value
									if(ParsingRule[pn][3] != 5) {
											var data = GetComData(comId+comAppId, "VALUE");
											if(data)
												retVal[retVal.length] = ['VALUE', data, data.length, 0, data.length];
									}
									//Unit
									if(ParsingRule[pn][3]==8 && ParsingRule[pn+1] && ParsingRule[pn+1][3]==8) {
										if(!ParsingRule[pn+2] || ParsingRule[pn+2][3]!=8) {
											retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, 0, ParsingRule[pn+1][12].length];
										}
									}
									//Appendix
									if(!ParsingRule[pn][18])
										return retVal;
									retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, 0, ParsingRule[pn][18].length];
									return retVal;
								}
								
								//Prefix
								if(s<0) s=0;
								var usePrefix = false;
								if((pNode.childNodes[0].nodeName == "#text") || (pNode.childNodes[0].nodeName == "SPAN" && pNode.childNodes[0].id == "pre"))
									usePrefix = true;
								if(usePrefix && ParsingRule[pn][17]) {
									if(s < ParsingRule[pn][17].length) {
										if(e <= ParsingRule[pn][17].length) {
											retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, s, e];
											return retVal;
										}
										retVal[0] = ['PRE', ParsingRule[pn][17], ParsingRule[pn][17].length, s, ParsingRule[pn][17].length];
										s = 0;
									}
									else
										s -= ParsingRule[pn][17].length;
									e -= ParsingRule[pn][17].length;
								}
								
								//Value
								var valueFlag = true;
								
								for(var k=0; k<pNode.childNodes.length; k++) {
									var chNode = pNode.childNodes[k];
									if(chNode.nodeName=="INPUT" || chNode.nodeName=="TEXTAREA") {
										valueFlag = false;
										break;
									}
								}
								
								if(valueFlag) {
									var data = GetComData(comId+comAppId, "VALUE");
									if(data) {
										if(s < data.length) {
											if(e <= data.length) {
												retVal[retVal.length] = ['VALUE', data, data.length, s, e];
												return retVal;
											}
											retVal[retVal.length] = ['VALUE', data, data.length, s, data.length];
											s = 0;
										}
										else
											s -= data.length;
										e -= data.length;
									}
								}
								
								//Unit
								if(ParsingRule[pn][3]==8 && ParsingRule[pn+1] && ParsingRule[pn+1][3]==8 && ParsingRule[pn+1][12]) {
									if(!ParsingRule[pn+2] || ParsingRule[pn+2][3]!=8) {										
										if(s>0)
											s--;
										e--;
										
										if(s < ParsingRule[pn+1][12].length) {
											if(e <= ParsingRule[pn+1][12].length) {
												retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, e];
												return retVal;
											}
											retVal[retVal.length] = ['UNIT', ParsingRule[pn+1][12], ParsingRule[pn+1][12].length, s, ParsingRule[pn+1][12].length];
											s = 0;
										}
										else
											s -= ParsingRule[pn+1][12].length;
										e -= ParsingRule[pn+1][12].length;
									}
								}
								
								//Appendix
								if(!ParsingRule[pn][18])
									return retVal;
								
								if(!isSG) {
									if(s>0)
										s--;
									e--;
								}
								
								retVal[retVal.length] = ['APPEND', ParsingRule[pn][18], ParsingRule[pn][18].length, s, e];
								return retVal;
						}
					}
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
	if(pn < 0 && type != 'CAP')
		return '';
	
	var dataStr = '';
	switch(type) {
		case 'CAP':
			if(pn<0) {
				var valNode = document.getElementById('VAL_'+comId+comAppId);
				if(!valNode)
					break;
				if(valNode.nodeName=="#text")
					dataStr = valNode.data;
				else
					dataStr = valNode.innerText;
				break;
			}
			
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
				case 8:
					var node = document.getElementById("INPUTU1_"+comId+comAppId);
					if(!node)
						break;
					if(node.nodeName=="INPUT")
						dataStr = node.value;
					else
						dataStr = node.innerText;
					break;
				default:
					var node = document.getElementById("INPUT_"+comId+comAppId);
					if(!node)
						break;
					if(node.nodeName=="INPUT")
						dataStr = node.value;
					else
						dataStr = node.innerText;
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
		if(pn < 0) {
			var valNode = document.getElementById("VAL_"+comId+comAppId);
			if(!valNode)
				continue;
		}
		
		var isSG = IsStaticGrid(pn);
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
				try {
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
							if(pn<0) {
								var pNode = document.getElementById("VAL_"+BK_H_OBJ.r_id);
								if(!pNode || !pNode.childNodes)
									break;
								var chNode = pNode.childNodes[0];
								if(chNode.nodeName=="#text" || chNode.nodeName=="SPAN") {
									if(chNode.id=='value') {
										chNode.innerHTML = ret;
										break;
									}
									var newHTML = "<span id='value'>"+ret;
									var lastNode = pNode.childNodes[pNode.childNodes.length-1];
									if(lastNode.nodeName=="SPAN")
										newHTML += lastNode.outerHTML;
									newHTML += "</span>";
									pNode.innerHTML = newHTML;
								}
								break;
							}
							
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
										var findItem = false;
										var chNode = pNode.childNodes[z];
										while(chNode.childNodes) {
											if(chNode.childNodes[0].nodeName=="INPUT") {
												if(BK_H_OBJ.r_id == chNode.childNodes[0].id) {
													findItem = true;
													if(chNode.childNodes[1].nodeName=="SPAN") {
														chNode.childNodes[1].innerText = "";
														chNode.childNodes[1].innerHTML = ret;
													}
													else if(chNode.childNodes[1].nodeName=="#text") {
														chNode.removeChild(chNode.childNodes[1]);
														chNode.innerHTML += ret;
													}
												}
												break;
											}
											chNode = chNode.childNodes[0];
										}
										if(findItem)
											break;
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
											break;
										else if(chNode.nodeName == "#text") {	
											var z1 = z-1;
											for(; z1>=0; z1--) {
												var tempNode = valNode.childNodes[z1];
												if(tempNode.nodeName=="SPAN") {
													if(tempNode.id=="unit") {
														tempNode.innerHTML = "&nbsp;"+ret;
														break;
													}
												}
											}
											if(z1 < 0) {
												var newTextNode = chNode.cloneNode(true);
												//valNode.removeChild(chNode);
												for(z1=valNode.childNodes.length-1; z1>=z; z1--)
													valNode.removeChild(valNode.childNodes[z1]);
												if(isSG)
													valNode.innerHTML += "<span id='unit'>&nbsp;"+ret+"</span>";
												else
													valNode.innerHTML += "<span id='unit'>&nbsp;"+ret+"</span>";
												if(ParsingRule[pn][18]) {
													if(isSG)
														newTextNode.data = ParsingRule[pn][18];
													else
														newTextNode.data = " "+ParsingRule[pn][18];
													valNode.appendChild(newTextNode);
												}
												break;
											}
											break;
										}
										else if(chNode.nodeName == "SPAN") {
											if(chNode.id && chNode.id.indexOf("INPUT")>0)
												break;
											if(chNode.id=="unit") {
												if(isSG)
													chNode.innerHTML = "&nbsp;"+ret;
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
											break;
										else if(chNode.nodeName == "#text") {
											var z1 = 0;
											for(; z1<valNode.childNodes.length; z1++) {
												if(valNode.childNodes[z1].nodeName=="SPAN" && valNode.childNodes[z1].id=="unit")
													break;
											}
											if(z1 == valNode.childNodes.length) {
												if(ParsingRule[pn+1] && ParsingRule[pn+1][2]==8 && ParsingRule[pn+1][12]) {
													if(!ParsingRule[pn+2] || (ParsingRule[pn+2] && ParsingRule[pn+2][2]!=8))
														chNode.data = " "+ParsingRule[pn+1][12];
												}
												else
													valNode.removeChild(chNode);
											}
											else
												valNode.removeChild(chNode);
											if(isSG)
												valNode.innerHTML += "<span id='append'>"+ret+"</span>";
											else
												valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
											break;											
										}
										else if(chNode.nodeName == "SPAN") {
											if(chNode.id=="append") {
												if(isSG)
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
									if(!valNode || !valNode.childNodes)
										break;
									
									var lastNode = valNode.childNodes[valNode.childNodes.length-1];
									if(lastNode.nodeName=="#text") {
										valNode.removeChild(lastNode);
										if(isSG)
											valNode.innerHTML += "<span id='append'>"+ret+"</span>";
										else
											valNode.innerHTML += "<span id='append'>&nbsp;"+ret+"</span>";
									}
									else {
										if(lastNode.nodeName=="SPAN" && lastNode.id=="append") {
											if(isSG)
												lastNode.innerHTML = ret;
											else
												lastNode.innerHTML = "&nbsp;"+ret;
										}
									}
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
				catch(e){}
			}
		}
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
		//G_ORGXML=x0.xml.replace("encoding='UTF-16'", "encoding='euc-kr'");
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
	
	checkmode = true;
	checkhighlight = true;
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

function BK_FindPos4Single(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = node.createTextRange();
	
	s1 = s1.replace(/\r\n/g, "\n");
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
	}
	
	return pos;
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
			if(tItem)
				dvId = tItem.id;
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
		newIt.style.cssText = tItem.style.cssText;
		try {
			var newWidth = tItem.style.width.split("px")[0]-2;
			newIt.style.width = newWidth+"px";
		}
		catch(e) {
			newIt.style.width = tItem.style.width;
		}

		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
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
		var dRange = document.body.children.contentArea.createTextRange();
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



function BK_FindPos(range, node, nText)
{
	var x = range;
	var s1 = nText;
	var s = document.body.children.contentArea.createTextRange();
	
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
		newIt.cssText = tItem.style.cssText;
		newIt.readOnly =tItem.readOnly;
		
		newIt.style.borderBottom = tItem.currentStyle.borderBottomStyle;;
		newIt.style.borderLeft = tItem.currentStyle.borderLeftStyle;;
		newIt.style.borderRight = tItem.currentStyle.borderRightStyle;;
		newIt.style.borderTop = tItem.currentStyle.borderTopStyle;;
		newIt.style.borderColor = tItem.currentStyle.borderColor;
		newIt.style.borderWidth = tItem.currentStyle.borderWidth;
		
		newIt.style.fontSize = tItem.currentStyle.fontSize;
		newIt.style.fontFamily = tItem.currentStyle.fontFamily;
		
		if(tItem.readOnly!=true)
			newIt.setAttribute("contentEditable", true);
		newIt.innerText = tItem.innerText;	
		var pNode = tItem.parentNode;
  	if(pNode.nodeName=="FONT")
  		return null;
		pNode.replaceChild(newIt, tItem);
	}
	
	newIt.focus();
	if(tagType)
	{
		var dRange = document.body.children.contentArea.createTextRange();
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
//신규 및 수정 후 저장 시 형광펜 저장하는 함수
function BK_SaveHilight()
{
	var hlStr = MakeHighlightXML();
	if(!hlStr)
		return;	
	
	SeqNo = SeqNo.split("^")[0];
	
	hlStr = "<?xml version='1.0' encoding='UTF-16'?>"+hlStr;
	hlStr = hlStr.replace(/ style=\"\"/gi, "");
	hlStr = hlStr.replace(/ style=''/gi, "");

	if(hlStr!="")
	{
		
		var highmodyURL =  xmlhttpPost_Sync("http://"+SERVERIP+"/EMR_DATA/Save_XML_File.jsp", 	"doc_info=high"+SeqNo+"^"+parent.parent.docuId+"^"+parent.parent.pid+"^"+parent.parent.doctorId+"^"+parent.parent.docVersion+"&xmlData="+ToHex4Unicode(hlStr));
    
    var params = highmodyURL + "^95^" +  SeqNo;
    var ret=xmlhttpPost_Sync("http://"+SERVERIP+"/EMR_DATA/UpdateSql.jsp",	"SqlDec=UPDATE_BERDMRECD4&param=" + params);				
	}
}

function BK_setBodyEvent()
{
	if(!document.body.children.contentArea)
		return;
	
	if(document.body.children.contentArea.onmouseup==null || document.body.children.contentArea.onmouseup=="")
		document.body.children.contentArea.onmouseup = BK_onMouseUp;
	/*if(document.body.children.contentArea.onmousedown==null|| document.body.children.contentArea.onmousedown == "")
		document.body.children.contentArea.onmousedown =BK_onMouseDown;
	if(document.body.children.contentArea.onkeydown == null || document.body.children.contentArea.onkeydown == "")
		document.body.children.contentArea.onkeydown = BK_onKeyDown;*/
}

function BK_onMouseUp()
{
	if(parent.parent &&parent.parent.hlOpenFlag )
			parent.parent.dragPointer = "DOCUMENT_PAN";
}

//-------------------- END HighLight--------------------------------//
