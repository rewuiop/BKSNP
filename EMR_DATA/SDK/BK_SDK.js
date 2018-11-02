var HTML_INIT_DATA=new Array(); 
var V_HID=0;
var HTML_EVENT_DATA=new Array(); 
var V_HED=0;
var ajaxParam="";
var ajaxParamNo=0;
var A_RCT1=new Array();
var SERVERADDR =document.location.protocol+"//"+document.location.host;//document.URL.split('/EMR_DATA/')[0];//"http://192.168.2.43:8080";//"http://127.0.0.1:1521";//"http://192.168.0.45:1521";
var ipPortAddr = SERVERADDR.split('//')[1];
var BK_DOC = ["SEQ_NO","CODE","NAME","VERSION","FOLDER","PID","DOCTYPE","STARTTIME","ENDTIME","DEPARTMENT1","USE","DEPARTMENT2","DEPARTMENT3","DEPARTMENT4","DEPARTMENT5","CATEGORY1","CATEGORY2","CATEGORY3","CREATOR","MODIFIER","CREATETIME","MODIFYTIME","RECORDTYPE","RECORDEVENT","RECORDAREA","RECORDLEVEL","MANDATORY","DEPSHARE","EN_INPUT","SIGN","TEMPSAVEVIEW","COSIGN","COSIGNLEVEL","COSIGNPRINT","PRIVATEDOC","WRITELEVEL","VIEWLEVEL","FILE_INPUT","FILE_VIEW","FILE_PRINT","FILE_MODIFY","DEV_DESIGN","DEV_MODEL","DEV_MAPPING","DEV_TEST","DEV_PROGRESS","DESCRIPTION","COMMON_CODE","CONNECTED_DOC_CODE","FILE_DOCU","TITLE","POS","REQ_DEPARTMENT","INSF_DOC_CODE", "SINGLE_PRINT_YN","DOC_SEARCH_YN","REC_SEARCH_YN","PRINT_STORAGE","AMEND_LEVEL","OCTY_CD","MODIFYLEVEL","CONNECTED_DOC_CODE2"];
var BK_REC = ["SEQ_NO","CODE","COMMON_CODE","NAME","STATUS","DOC_CODE","PTID","RPTID","CATEGORY1","CATEGORY2","CATEGORY3","CREATOR_CODE","CREATE_TIME","MODIFIER_CODE","MODIFY_TIME","SIGNER_CODE","SIGN_TIME","COSIGNER_CODE","COSIGN_TIME","PRINTED","FILENAME","RECORDTYPE","INCOMPLETE","TEMPSAVE","DEPARTMENT","CHOS_NO","SIGNLEVEL","EXT_RECD_CODE","DOC_VER","INSF_DOC_CODE","SIGNER_CODE2","SIGN_TIME2","COSIGNER_CODE2","RECORD_TIME","COSIGN_CANDIDATE_CD"];


var BK_PAT_DATA = new Array();

var BK_USER_INFO = new Array();
var BK_PAT_INFO = new Array();
var BK_DOC_CATE = new Array();
var BK_DOC_DATA = new Array(); 
var BK_REC_DATA = new Array();
var BK_MAIN_PATH = "/EMR_DATA/";
var BK_DOC_PATH = "EMR_DATA";
var recordPopFlag = true;
var CertManX = null;
var KMClientAX = null;
var capture = null;
var checkChosData = new Array();
var dataYn = '';

A_RCT1[0]=['<', "&lt;"];
A_RCT1[1]=['>', "&gt;"];
A_RCT1[2]=['\"', "&quot;"];
A_RCT1[3]=['\'', "&apos;"];
A_RCT1[4]=['&', "&amp;"];


function SetVal(name, value)
{
	var obj=GetObj(name);
	if(obj==null)
		return;
	if(obj.value !=null)
		obj.value=value;
	else if(obj.checked !=null)
		obj.checked=value;
	else if(obj.selected !=null)
		obj.selected=value;
	else if(obj.innerHTML !=null)
		obj.innerHTML=value;
}


function GetValue(name)
{
	var obj=GetObj(name);
	if(obj==null)
		return "";
	if(obj.value !=null)
		return obj.value;
	else if(obj.checked !=null)
	{
		return obj.checked;
	}
	else if(obj.selected !=null)
	{
		return obj.selected;
	}
	else if(obj.innerText !=null)
		return obj.innerText;
	return "";
}

function GetObj(id)
{
	return document.getElementById(id);
}

function SetEventFunc(id, eventTag, func)
{
	var str = "document.getElementById('"+id+"')."+eventTag+" = "+func+";";
	
	if(window.execScript)
	{
		window.execScript(str);
	}
	else
	{
		window.eval(str);
	}
}

function Replace4xml(x1)
{
	if(x1!=0 && (x1 == null || x1 ==""))
		return "";
	
	if(x1.replace == null)
		return x1;
	x1 = x1.replace(/</g, "&lt;");
	x1 = x1.replace(/>/g, "&gt;");
	x1 = x1.replace(/'/g,"&apos;");
	x1 = x1.replace(/&/g,"&amp;");
	
	
	return x1;
}
function MakeTreeToXml(id,  w, h, skin, imgPath, IsCheck, xmlString, func1, func2)
{
	var obj = GetObj(id);
	
	var	myTree = new dhtmlXTreeObject( id , w , h, 0);
	myTree.setSkin(skin);
	myTree.setImagePath(imgPath);
	myTree.enableCheckBoxes(IsCheck);
	myTree.enableDragAndDrop(0); //drag & drop
	myTree.closeAllItems(id);
	//myTree.enableSamrtXMLParsing(1);
	//myTree.enableSmartRendering(true);
	myTree.XMLLoader.loadXMLString("<?xml version='1.0'?><tree id='0'>"+xmlString+"</tree>");
	if(func1 != null)
		myTree.setOnClickHandler(func1);
	if(func2 != null)
		myTree.setOnDblClickHandler(func2);
	
	return myTree;
}

///////////////////////////



function CallAjaxFunc(path, funcName, params)
{
    var len=params.length;
    var i;
    var param="";
    for(i=0; i<len; i++)
    {
    	param += ToHex4Unicode(params[i])+"^";
    }
    
    var ret=GetAjaxData(SERVERADDR+BK_MAIN_PATH+path, "funtion="+funcName+"&param="+param);
    var result=ret.split("#RESULT#");
		if(result.length<2)
			return "";
    return result[1];
}




function GetAjaxData(url,postData)
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
    	return "Can't get the XML HTTP";
    }
    self.xmlHttpReq.open('POST', url, false);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.setRequestHeader('CharSet', 'UTF-8');
    self.xmlHttpReq.send(postData);
    
    return self.xmlHttpReq.responseText;
}



function ShowHide(disArr)//
{
	for(var i=0; i<disArr[0].length; i++) //감추기
	{
		var str = disArr[0][i];
		document.getElementById(str).style.display = "";
		
	}
	
	for(var j=0; j<disArr[1].length; j++) //보여주기
	{
		var str = disArr[1][j];
		document.getElementById(str).style.display = "none";
	}
	
}

function Enable_YN(idArr)
{
	for(var i=0; i<idArr[0].length; i++)
	{
		var obj1=document.getElementById(idArr[0][i]);
		if(obj1 == null)
			return;
			
		obj1.style.cursor="hand";
		obj1.disabled=null;
	}
	
	for(var j=0; i<idArr[1].length; j++)
	{
		var obj2=document.getElementById(idArr[0][j]);
		if(obj2 == null)
			return;
			
		obj2.style.cursor="";
		obj2.disabled='disable';
	}
}

/***********************************content 객체 start***************************************/
function WindowObj()
{
	this.url;	//로딩할 서식 url
	this.id;	//content id
	this.style=''; //content 스타일
	this.func='';	//로딩시 호출할 함수
	this.CreateWindow = function()
	{
		var di = document.createElement('div');
		di.id = this.id;
		if(this.style=="" || this.style == null)
		{
			this.style = "position:absolute;top:35px;width:100%;height:100%;";
		}
		di.innerHTML = "<IFRAME id='"+this.id+"_frame' src='"+this.url+"' onload='"+this.func+"' style='"+this.style+"' frameborder='0' ></IFRAME>";
		return di;
	}
}

function TabObj()
{
	this.idx; //탭의 index
	this.id;	//탭생성에 사용될 아이디
	this.pDiv;	//탭영역의 객체
	this.pFrame; //content 영역객체
	this.title; //탭의 제목
	this.type; //생성된 탭의 타입(서식,기록, 기타...)
	this.TabFunc='';	//탭을 클릭시 수행할 함수
	this.docData=null;	//탭에 속한 content의 서식정보
	this.recData=null;	//탭에 속한 content의 기록정보
	this.open; //탭의 활성화여부(show, hide)
	this.clickOn;	
	this.clickOff;
	this.window = new WindowObj();	//탭에 속한 content 객체
	this.winId;
	this.winStyle='';	//content 스타일
	this.winSrc;	//content객체에 로딩할 서식 경로
	this.winfunc='';	//content가 로딩될때 수행할 함수
	this.state;
	
	this.CreateTab = function(no)
	{
		var val = this.title;
		if(val==undefined)
			return;
		if(val.length > 10)
			val = val.substring(0,10)+"…";

		//this.winId = this.id; //+"_"+this.idx;
		this.winId = this.id+"_"+this.idx;
		this.window.url = this.winSrc;
		this.window.style = this.winStyle;
		this.window.id = this.winId;
		this.window.func = this.winFurnc;
		var di = this.window.CreateWindow();
		//this.pFrame.appendChild(di);
		this.pFrame.appendChild(di);
		//this.pFrame.innerHTML = di.innerHTML;
		this.open=1;
		this.clickOn = this.clickOn.replace("##", val);
		this.clickOff = this.clickOff.replace("##", val);
		
	}
	this.ShowTab = function()
	{
		//GetObj(this.winId).style.display = 'inline-block';//'block';
		if(GetObj(this.winId)!=null)
			GetObj(this.winId).style.display = 'block';
		this.open=1;
	}
	this.HideTab = function()
	{
		//GetObj(this.winId).style.display = 'inline-block';//'none';
		if(GetObj(this.winId)!=null)
			GetObj(this.winId).style.display = 'none'
		this.open=0;
	}
	this.DeleteTab = function()
	{
		if(GetObj(this.winId) == null)
			return 1;
		if(GetObj(this.id) == null)
			return 2;
		GetObj(this.winId).style.display = 'none';
		GetObj(this.id).style.display = 'none';
		var fObj = GetObj('showFrame');
		var i;
		for(i=0;i<4;i++)
		{
				if(this.winId==fObj.childNodes[i].id)
					break;
		}
		this.state = 1;
		fObj.removeChild(fObj.childNodes[i]);
		return 0;
	}
}
var WINTAB;
function WindowTabObj()
{
	this.cnt=0;
	this.id;
	this.tab = new Array(); //생성될 탭객체들의 정보를 가짐
	this.tabId; 			//TAB영역 객체
	this.contentId; 	//CONTENT 영역 객체
	this.tab[this.cnt]=new TabObj();
	this.obj;
	this.maxTab = 4;
	this.s_idx=0;
	this.e_idx=0;
	
	this.AddTab = function(no, obj)
	{
		/*
		this.tab[this.cnt].pDiv = this.tabId;
		this.tab[this.cnt].pFrame = this.contentId;
		this.tab[this.cnt].CreateTab();

		var temp="<table cellpadding='0' cellspacing='0'><tr id='"+this.id+"'><td id="+this.tab[0].id+" width='180px' height='28px' style='border:0;cursor:hand;padding:0;vertical-align:top;display:inline-block;'>"+this.tab[0].clickOff+"</td>";
	    var condition;
    	var conStr = "";
		
		this.tabId.innerHTML = temp+conStr+"</tr></table>";
		
		for(var i=0; i<=this.cnt; i++)
		{
			GetObj(this.tab[i].id).className = this.clickOff;
		}
		
		this.ShowHideWindow(this.tab[this.cnt].idx);
		this.e_idx = this.cnt;
		*/
		this.tab[this.cnt].pDiv = this.tabId;
		this.tab[this.cnt].pFrame = this.contentId;
		this.tab[this.cnt].CreateTab();

		var temp="<table cellpadding='0' cellspacing='0'><tr id='"+this.id+"'>";
    	var condition;
    	var conStr = "";
		for(var i=0; i <= this.cnt; i++)
		{
			if(this.cnt <=this.maxTab)
			{
				condition = "inline-block";
			}
			else
			{
				var len = this.cnt-this.maxTab;
				
				if(i<len)
				{
					this.s_idx = len;
					condition = "none";
				}
				else
					condition = "inline-block";
					
				this.e_idx = this.cnt;
				//conStr = "<td id='tab_left' width='10px' onclick=\"tabMove('l','"+len+"');\"><img src='images/btn_tab_left.png' id='btn_close' ></td> <td id='tab_right' width=\"10px\" onclick=\"tabMove('r','"+len+"');\" ><img src='images/btn_tab_right.png' id='btn_close' ></td>";
			}
				
			temp += "<td id="+this.tab[i].id+" width='180px' height='28px' style='border:0;cursor:hand;padding:0;vertical-align:top;display:"+condition+";'>"+this.tab[i].clickOff+"</td>";
			
		}
		this.tabId.innerHTML = temp+conStr+"</tr></table>";
		
		for(var i=0; i<=this.cnt; i++)
		{
			GetObj(this.tab[i].id).className = this.clickOff;
		}
		
		this.ShowHideWindow(this.tab[this.cnt].idx);
		this.e_idx = this.cnt;
		this.cnt++;
		this.tab[this.cnt] = new TabObj();
	};
	this.CloseTab = function(idx)
	{
		/*
		this.tab[idx].DeleteTab();
		GetObj(this.tab[idx].id).style.display = "none";
		this.tabId.innerHTML = "";
		this.contentId.innerHTML = "";
		this.ShowHideWindow(this.tab[idx].idx);
		*/
		for(var i=0; i<this.cnt; i++)
		{
			if(this.tab[i].idx != idx)
				continue;
	
			 if(this.e_idx == this.cnt-1)
		   {
		    this.s_idx--;
		    this.e_idx--;
		   }
						
			var no = i;	
			this.tab[i].DeleteTab();
			
			while(i<this.cnt)
			{
				this.tab[i] = this.tab[i+1];
				i++;
			}
			this.cnt--;
			
			if(GetObj('tab_left') != null && this.cnt <= this.maxTab+1)			
			{
				GetObj('tab_left').style.display = "none";
				GetObj('tab_right').style.display = "none";
			 	this.s_idx = 0;
			 	this.e_idx = this.cnt-1;
			 	for(var j=0; j<this.cnt; j++)
			 	{
			 		GetObj(this.tab[j].id).style.display = "inline-block";
			 	}
			 	
			}
		
			if(this.cnt-1 > this.maxTab)
			{	
				for(var j=0; j<this.cnt; j++)
				{
					if(j>=this.s_idx && j<=this.e_idx)
						GetObj(this.tab[j].id).style.display = "inline-block";
					else
						GetObj(this.tab[j].id).style.display = "none";
				}
			}
			else
			{
				this.e_idx = this.cnt-1;
			}
			
			if(this.cnt == 0)
			{
				this.tabId.innerHTML = "";
				this.contentId.innerHTML = "";
			}
			else if(this.cnt == no)
			{
				this.ShowHideWindow(this.tab[no-1].idx);
			}
			else
				this.ShowHideWindow(this.tab[no].idx);
			break;
		}
		return 1;
	};

	this.CloseAll = function()
	{
		for(var i=0; i<=this.cnt; i++)
		{
			this.tab[i].DeleteTab();
			this.tab[i] = null;
		}
		this.cnt = 0;
		this.tab[this.cnt] = new TabObj();
		this.tabId.innerHTML = "";
		this.contentId.innerHTML = "";
	};
	this.ShowHideWindow = function(idx)
	{
		for(var i=0; i<this.cnt; i++)
		{
			if(this.tab[i] == null)
				continue;
				
			if(this.tab[i].idx == idx)
			{
				this.tab[i].ShowTab();
				if(GetObj(this.tab[i].id)!=null)
					GetObj(this.tab[i].id).innerHTML = this.tab[i].clickOn;
			}
			else
			{
				this.tab[i].HideTab();
				if(GetObj(this.tab[i].id)!=null)
					GetObj(this.tab[i].id).innerHTML = this.tab[i].clickOff;
			}
		}
	};

	return this;
}

function DocumentObj()
{
	this.doc = new Array();
	this.rec = new Array();
	this.obj;
	this.iframe;
	this.param;
	this.param2=parent.parent.arrTypeVar;
	this.iStyle="width:100%;height:90%;";
	//this.iStyle="width:100%;height:820px;";
	this.PrintDocumnet = function()
  {
  	GetObj(this.iframe).contentWindow.print();
  } 
	this.OpenDocument = function(type) //서식오픈
	{
		var idx;
		switch(type)
		{
			case 0://작성
				idx = 4;//37;
				break;
			case 1://수정
				idx = 7;//40;
				break;
			case 2://조회
				idx = 5;//38;
				break;
			case 3://출력
				idx = 6;//39;
				break;
		}//SEQ_NO,CODE,NAME,FOLDER,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,DESCRIPTION,COMMON_CODE,FILE_DOCU
		DocumentParam(0, 0, this.param, this.param2);
		
		var str = "<IFRAME id='"+this.iframe+"' src='/"+BK_DOC_PATH+"/html/"+this.doc[idx]+"' style='"+this.iStyle+"' frameborder='0' marginwidth='0' onload='callFn_gdifv(this.id, 0);' ></IFRAME>";
		
		this.obj.innerHTML = str;
		
	}
	this.SaveDocument = function() //기록저장
	{
		return GetObj(this.iframe).contentWindow.post_to_url('');		
		
	}
	this.SaveDocTemp = function()
	{
	 	return	GetObj(this.iframe).contentWindow.post_to_temp('');
	}
	this.GetTabInfo = function()
	{
		if(GetObj(this.iframe)!=null && GetObj(this.iframe).contentWindow.GetMenuInfo)
			return  GetObj(this.iframe).contentWindow.GetMenuInfo();
		else
			return null;
	}
	this.ExcuteMenu = function(id, state)
	{
		var data = GetObj(this.iframe).contentWindow.ExecMenu(id, state);
		return data;
	}
	this.PrintDocumnet = function(obj, width, height, printParam, type)
  	{																					//파라미터 type 1
	   var url;
	   var param;
	   if(type == 0)
	   {
		    //url = "http://"+document.domain+"/"+BK_DOC_PATH+"/html/"+this.doc[6];//this.doc[37];
		    url = SERVERADDR+"/"+BK_DOC_PATH+"/html/"+this.doc[6];
		    param = "^"+printParam;
	   }
	   else
	   {
		    //url = "http://"+document.domain+"/"+BK_DOC_PATH+"/html/"+this.doc[6];//this.doc[39]; 간략하게 데이터 가져오도록 수정
		    //param=document.domain+"/EMR_DATA"+this.rec[5]+"^"+printParam; //param = document.domain+":8123"+this.param[3]+"^"+printParam;
		    url = SERVERADDR+"/"+BK_DOC_PATH+"/html/"+this.doc[6];
		    var notHttp = SERVERADDR.split('//');
		    param=notHttp[1]+"/EMR_DATA"+this.rec[5]+"^"+printParam; //param = document.domain+":8123"+this.param[3]+"^"+printParam;
		    
	   }	 

	   //obj.PrintPage(url, param, width, height);
	   obj.NewPrintPage(url, param, width, height);
  	}
  	this.xmlhttpPost_Sync = function(strUrl, dataParam, mode)
	{
		var data = GetObj(this.iframe).contentWindow.xmlhttpPost_Sync(strUrl, dataParam, mode);
		return data;
	}
	this.post_to_url = function(xmlData,saveParam)
	{
		var data = GetObj(this.iframe).contentWindow.post_to_url(xmlData,saveParam);
		return data;
	}
	
}

//<================================다중기록보기 테스트 11.8===========================================>
	
function DocumentArrObj()
{
	this.doc = new Array();
	this.rec = new Array();
	this.obj = new Array();
	this.iframe = new Array();
	this.param = new Array();
	this.param2= new Array();
	this.PrintDocumnet = function()
  {
  	GetObj(this.iframe).contentWindow.print();
  } 
	this.OpenDocument = function(type) //서식오픈
	{
		var idx;
		switch(type)
		{
			case 0://작성
				idx = 4;//37;
				break;
			case 1://수정
				idx = 7;//40;
				break;
			case 2://조회
				idx = 5;// 38;
				break;
			case 3://출력
				idx = 6;//39;
				break;
		}
		var len = this.doc.length;
		var str="";
		for(var i=0; i<len; i++)
		{
			DocumentParam(0, i, this.param[i], this.param2[i]);
			str = "<IFRAME id='"+this.iframe[i]+"_"+i+"' src='/"+BK_DOC_PATH+"/html/"+this.doc[i][idx]+"' style='width:100%;height:890px;' frameborder='0' marginwidth='0' onload='callFn_gdifv(this.id, "+i+");' ></IFRAME></br>";
		   
		this.obj[i].innerHTML = str;
		
		}
	}
	
}

//<===============================================================================>

function MultiDocObj()
{
	this.doc;
	this.rec;
	this.obj;
	this.iframe;
	this.param = new Array;
	this.param2 = new Array;
	
	this.OpenDocument = function(type) //서식오픈
	{
		var idx;
		switch(type)
		{
			case 0://작성
				idx = 37;
				break;
			case 1://수정
				idx = 40;
				break;
			case 2://조회
				idx = 38;
				break;
			case 3://출력
				idx = 39;
				break;
		}
		var len = this.doc.length;
		var str="";
		for(var i=0; i<len; i++)
		{
			DocumentParam(0, i, this.param[i], this.param2[i]);
			str += "<IFRAME id='"+this.iframe+"_"+i+"' src='/"+BK_DOC_PATH+"/html/"+this.doc[i][idx]+"' style='width:100%;height:890px;' frameborder='0' marginwidth='0' onload='callFn_gdifv(this.id, "+i+");' ></IFRAME></br>";
		}
		this.obj.innerHTML = str;
	}
	this.GetTabInfo = function()
	{
		var dataArr =  GetObj(this.iframe).contentWindow.GetMenuInfo();
		return dataArr;
	}
	this.ExcuteMenu = function(id, state)
	{
		var data = GetObj(this.iframe).contentWindow.ExecMenu(id, state);
		return data;
	}
}

function patientObj()
{
  this.INFO;// = new Array();
	this.name;
	this.rrns;
	this.juno;
	this.idno;
	this.blood;
	this.addt;
	this.jaew;
	this.chdt;
	this.chus;
	this.chtm;
	this.adrt;
	this.ward;
	this.room;
	this.dept;
	this.dpds;
	this.doct;
	this.donm;
	this.sexx;
	this.addr;
	this.hpno;
	this.teln;
	this.kind;
	this.bscd;
}

/***********************************content 객체 end***************************************/

function patientInfo(dataArr)
{

	var pat = new patientObj();
	pat.name=dataArr[0][0];
	pat.rrns=dataArr[0][1];
	pat.juno=dataArr[0][2];
	pat.idno=dataArr[0][3];
	pat.blood=dataArr[0][4];
	pat.addt=dataArr[0][5];
	pat.jaew=dataArr[0][6]
	pat.chdt=dataArr[0][7];
	pat.chus=dataArr[0][8];
	pat.chtm=dataArr[0][9];
	pat.adrt=dataArr[0][10];
	pat.ward=dataArr[0][11];
	pat.room=dataArr[0][12];
	pat.dept=dataArr[0][13];
	pat.dpds=dataArr[0][14];
	pat.doct=dataArr[0][15];
	pat.donm=dataArr[0][16];
	pat.sexx=dataArr[0][17];
	pat.age=dataArr[0][18];
	pat.addr=dataArr[0][19];
	pat.hpno=dataArr[0][20];
	pat.teln=dataArr[0][21];
	pat.kind=dataArr[0][22];
	pat.bscd=dataArr[0][23];
	return pat;
}

function SetDocument(docArr, recArr)
{
	if(docArr == null)
		return;
	
	var x1 = new DocumentObj();
	x1.doc = docArr;
	x1.rec = recArr;
	
	return x1;
}

var BK_DOC_PARAM = new Array();
var arrTypeVar="";
BK_DOC_PARAM[0] = new Array();
BK_DOC_PARAM[1] = new Array();
function DocumentParam(type, no, param, param2)
{
	if(type == 0)
	{
		BK_DOC_PARAM[0][no] = param;
		BK_DOC_PARAM[1][no] = param2;
		return 0;
	}
}

function callFn_gdifv(frame, no)
{
	GetObj(frame).contentWindow.fn_gdifv(BK_DOC_PARAM[0][no], BK_DOC_PARAM[1][no]);
}
function VSIJ_SearchingDocument(tree, root, doc, rec, data, type)
{
	 if(tree.hasChildren(root) > 0)
	 {
		  tree.deleteChildItems(root);
		  tree.closeItem(root);
	 }
 
 if(data =='' || data == null)
  return;
  
 var xmlString="";
 var dataArr = new Array();;
 var idx=0;
 var str;
 var len;
 var cnt=0;
 str = data.split(' ');
 len = str.length;
 if(rec == null)
 {
  for(var i=0; i<doc.length; i++)
  {
   for(var j=0; j<len; j++)
   {
    var comp1 = doc[i][1].toLowerCase();
    var comp2 = str[j].toLowerCase();
    if(comp1.indexOf(comp2) != -1)
    {
     cnt++;
    }
   }
   
   if(cnt == len)
   {
    tree.insertNewItem(root, 'sch_'+doc[i][0], doc[i][1],0,'book.gif', 'book.gif', 'book.gif','');
   }
   cnt=0;
  }
 }
 else 
 {
  for(var i=0; i<rec.length; i++)
  {
   if(type == 0)
   {
    for(var j=0; j<len; j++)
    {
     var comp1 = rec[i][3].toLowerCase();
     var comp2 = str[j].toLowerCase();
     if(comp1.indexOf(comp2) != -1)
     {
      cnt++;
     }
    }
    if(cnt == len)
    {
     tree.insertNewItem(root, 'sch_'+rec[i][0],  rec[i][3]+'('+rec[i][14]+')',0,'book.gif', 'book.gif', 'book.gif','');
     if(rec[i][23]=='1')
      tree.setItemColor('sch_'+rec[i][0], '#FF0000', '#FF0000');
    }
    
    cnt=0;
   }
   else
   {
    var x1 = "";
    var x2 = "";
    for(var j=0; j<data.length; j++)
    {
     if(data.substring(j, j+1) != "-" && data.substring(j, j+1) != "." && data.substring(j, j+1) != "/")
      x1 += str.substring(j, j+1);
    }
    for(var j=0; j<rec[i][14].length; j++)
    {
     if(rec[i][14].substring(j, j+1) != "-" && rec[i][14].substring(j, j+1) != "." && rec[i][14].substring(j, j+1) != "/")
      x2 += rec[i][14].substring(j, j+1);
    }
    
    
    if(x1 == x2.substring(0,8))
    {
     tree.insertNewItem(root, 'sch_'+rec[i][0],  rec[i][3]+'('+rec[i][14]+')', 0, 'book.gif', 'book.gif', 'book.gif','');
     if(rec[i][23]=='1')
       tree.setItemColor('sch_'+rec[i][0], '#FF0000', '#FF0000');
    }
   }
  }
 }
 
}
    
    
function CreateDocXml(id, cate, doc, cond)
{
	
	var str="";
	
	for(var i=0; i<cate.length; i++)
	{
		if(cate[i][5] == id)
		{
			str += "<item id='cate_"+cate[i][0]+"' text='"+Replace4xml(cate[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' >";
			str += CreateDocXml(cate[i][1], cate, doc, cond);
			if(cond[0] == 0)
			{
				for(var l=0; l<doc.length; l++)
				{
					if(doc[l][5] == cate[i][1])
					{
						if(cond[1] == null)
						{
							if(cond[4] == null)
								str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
							else if( doc[l][9] != cond[4] && doc[l][11] != cond[4] && doc[l][12] != cond[4] && doc[l][13] != cond[4] && doc[l][14] != cond[4] )
								str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
						}
						else if( doc[l][9] == cond[1] || doc[l][11] == cond[1] || doc[l][12] == cond[1] || doc[l][13] == cond[1] ||doc[l][14] == cond[1] )
							str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
					}
				}
			}
			str += "</item> ";
			
		}
	}

	return str;
}
//--------------------------------

function CreateDocXml2(id, cate, doc, cond)
{	
	var str="";
	for(var i=0; i<cate.length; i++)
	{
		if(cate[i][2] == id)
		{			
			str += "<item id='cate_"+cate[i][0]+"' text='"+Replace4xml(cate[i][1])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif'  >";
			
			var tStr= CreateDocXml2(cate[i][0], cate, doc, cond); // 재귀 호출
			str += tStr;
			
			if(cond[0] == 0)
			{
					for(var l=0; l<doc.length; l++)
					{
						if(doc[l][2] == cate[i][0])
						{
							if(cond[1] == null)
							{
								if(cond[4] == null)
									str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][1])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
								else if( doc[l][9] != cond[4] && doc[l][11] != cond[4] && doc[l][12] != cond[4] && doc[l][13] != cond[4] && doc[l][14] != cond[4] )
									str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
								
							}
							else if( doc[l][9] == cond[1] || doc[l][11] == cond[1] || doc[l][12] == cond[1] || doc[l][13] == cond[1] ||doc[l][14] == cond[1] )
								str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][1])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
						  //break; //한개만 넣음.
						}
					}
				
			}
			str += "</item> ";			
		}
	}	
	return str;
}





//--------------------------------

function FindIdxByIndex(id, arr, no)
{
	var i;
	for(i=0;i<arr.length;i++)
	{
		if(arr[i][no]==id)
			return i;
	}
	return -1;
}

function CreateRecordXml(id, cate, doc, rec, cond)
{
var str = "";
	var bValid=0;
	
	if(id!='0')
	{
		var idx = FindIdxByIndex(id, cate, 1);
		if(idx <0)
			return "";
		str += "<item id='doc"+cate[idx][0]+"' text='"+Replace4xml(cate[idx][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' >";
	}
	
	for(var i=0; i<cate.length; i++)
	{
		if(cate[i][5] != id)
			continue;
		var retStr=CreateRecordXml(cate[i][1], cate, doc, rec, cond);
		if(retStr != "")
		{
			str += retStr;
				bValid=1;
		}
	}
	
	if(cond[0] == 0) //카테고리와 데이터
	{
			for(var l=0; l<doc.length; l++)
			{
				if(doc[l][5] != id)
					continue;
				for(var m=0; m<rec.length; m++)
				{
					if(doc[l][1] != rec[m][5])
								continue;
					if(cond[1] == null) //자기과만
					{
							if(cond[4]) //타과만
								continue;
					}
					else if( doc[l][16] != cond[4] && doc[l][17] != cond[4] && doc[l][18] != cond[4] && doc[l][19] != cond[4] && doc[l][20] != cond[4] )
					{
						if(doc[l][1] != rec[m][5])
								continue;
					}
					else if( doc[l][16] == cond[1] || doc[l][17] == cond[1] || doc[l][18] == cond[1] || doc[l][19] == cond[1] ||doc[l][20] == cond[1] )
					{
						if(doc[l][1] != rec[m][5])
								continue;
					}
					str += "<item id='rec_"+rec[m][0]+"' text='"+Replace4xml(rec[m][3])+"("+Replace4xml(rec[m][14])+")' im0='book.gif' im1='book.gif' im2='book.gif' /> ";

					if(rec[m][23] == 1)
					{
						if(tempRecStr != "")
						 	tempRecStr +=",";
						tempRecStr += 'rec_'+rec[m][0];
					}
					bValid=1;
				}
			}
		}
		
		if(id!='0')
		{
			str += "</item>";
		}
		
	if(bValid==0)
	{
		str ="";
	}
	return str;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////


//BK_DOC_CATE=> 0:CODE, 1:NAME, 2:PID
//BK_DOC_DATA=> 0:CODE, 1:NAME, 2:PID

function CreateRecordXml2(id, cate, doc, rec, cond)
{	
	var str = "";
	var bValid=0;
	
	if(id!='0')
	{
		var idx = FindIdxByIndex(id, cate, 0);
		if(idx <0)
			return "";
		str += "<item id='doc"+cate[idx][0]+"' text='"+Replace4xml(cate[idx][1])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' >";
	}
	
	for(var i=0; i<cate.length; i++)
	{
		if(cate[i][2] != id)
			continue;
		var retStr=CreateRecordXml2(cate[i][0], cate, doc, rec, cond);
		if(retStr != "")
		{
			str += retStr;
				bValid=1;
		}
	}
	

	if(cond[0] == 0) //카테고리와 데이터
	{
			for(var l=0; l<doc.length; l++)
			{
				if(doc[l][2] != id)
					continue;
				for(var m=0; m<rec.length; m++)
				{
					if(doc[l][0] != rec[m][5])
								continue;
					if(cond[1] == null) //자기과만
					{
							if(cond[4]) //타과만
								continue;
					}			
					else if( doc[l][0] != cond[4] && doc[l][0] != cond[4] && doc[l][0] != cond[4] && doc[l][0] != cond[4] && doc[l][0] != cond[4] )
					{
						if(doc[l][1] != rec[m][5])
								continue;
					}
					else if( doc[l][0] == cond[1] || doc[l][0] == cond[1] || doc[l][0] == cond[1] || doc[l][0] == cond[1] ||doc[l][0] == cond[1] )
					{
						if(doc[l][1] != rec[m][5])
								continue;
					}
				
					str += "<item id='rec_"+rec[m][2]+"' text='"+Replace4xml(rec[m][1])+"("+Replace4xml(rec[m][14])+")' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
					if(rec[m][23] == 1)
					{
						if(tempRecStr != "")
						 	tempRecStr +=",";
						tempRecStr += 'rec_'+rec[m][0];
					}
					bValid=1;
				}
			}
		}
	
		
		if(id!='0')
		{
			str += "</item>";
		}
		
	if(bValid==0)
	{
		str ="";
	}
	return str;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
var treeSort=0;  // 0: 신규 1: 입원 2: 외래 3:서식

function CreateXml(id, cate, doc, rec, treeSort)
{
	var str="";
	if(treeSort==0 || treeSort==5)
	{
		for(var l=0; l<doc.length; l++)
		{
			if(rec[0]=='')
			{
				if(rec[0]==doc[l][4])
					str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][1])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
			}
			else
			{
				if(rec[0]==doc[l][4] || rec[0]==doc[l][5] || rec[0]==doc[l][6] || rec[0]==doc[l][7])
				{
					str += " <item id='doc_"+doc[l][0]+"' text='"+Replace4xml(doc[l][1])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
				}
			}
		}
	}
	else
	{
		if(treeSort=='1' || treeSort=='2')
		{
			for(var i=0; i<rec.length; i++)
			{
				str += "<item id='"+rec[i][0]+"' text='"+Replace4xml(rec[i][1])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' ></item>";
			}
		}
		else
		{
			for(var i=0; i<rec.length; i++)
			{
				if(treeSort=='3' && rec[i][0]=="I")
					str += "<item id='"+rec[i][1]+"' text='"+Replace4xml(rec[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' ></item>";	
				else if(treeSort=='4' && rec[i][0]=="O")
					str += "<item id='"+rec[i][1]+"' text='"+Replace4xml(rec[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' ></item>";	
			}
		}
	}
	return str;
}

function openPopupUrl(no)
{
	if(BK_USER.length==0)
	{
		alert("의사정보가 정확하지 않습니다. 해당 화면을 열 수 없습니다. ");
		return;
	}
	var urlStr="";
	var dWidth="";
	var dHeight="";
	if(no=='1')
	{
		urlStr = "/EMR_DATA/copy_main.jsp?userid="+doctorId+"&udept="+uDeptCd;
		dWidth="1240";
		dHeight="945";
	}
	else if(no=='2')
	{
		urlStr = "/EMR_DATA/service_main.jsp?userid="+doctorId+"&currdept="+uDeptCd;
      //dWidth="1310";
      //dHeight="945";
      dWidth= window.screen.width-10;
      dHeight=window.screen.height-10;
      if(dWidth>1310)
         dWidth="1310";
      if(dHeight>945)
         dHeight="945";
	}
	else if(no=='3') //가계도 
	{
		var viewType = "0";
		var recIdno = "";
		var doc = "8373";
		var pedigreeData = getPedigreeRecd(pid,doc);
		if(pedigreeData!=undefined)
		{
			viewType = "2";
			recIdno = pedigreeData[0];
		}
		urlStr = "/EMR_DATA/right_content2.jsp?viewType="+viewType+"&docCode="+doc+"&doctorId="+doctorId+"&deptCd="+deptCd+"&pid="+pid+"&uDeptCd="+uDeptCd+"&recIdno="+recIdno;
		dWidth="650";
		dHeight="790";
	}
	else if(no=='4')
	{
		urlStr = "/EMR_DATA/popup/configureSetting.jsp?doctorId="+doctorId+"&uDeptCd="+uDeptCd;
		dWidth="1000";
		dHeight="290";
	}
	if(urlStr!="")
	{
		if(no!='4')
		{
			window.showModelessDialog(SERVERADDR+urlStr,'','dialogWidth:'+dWidth+'px;dialogHeight:'+dHeight+'px; center:yes; scroll=yes; resizable=no; status:no; help:no; dialogHide:yes;');
			//window.showModelessDialog(SERVERADDR+urlStr,'','dialogWidth:100%;dialogHeight:'+dHeight+'px; center:yes; scroll=yes; resizable=no; status:no; help:no; dialogHide:yes;');
		}
		else
			window.showModelessDialog(SERVERADDR+urlStr,'','dialogWidth:'+dWidth+'px;dialogHeight:'+dHeight+'px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
			
			//var rrrrrr=window.showModalDialog(urlStr, '', 'dialogWidth:'+dWidth+'px;dialogHeight:'+dHeight+'px;resizable:no;status:0;menubar:0;scroll:0');
	}
}

function onCheckClick(id)
{
	checkEvent=1;
	
	if(id=="rec_root_1" || id=="rec_root_2" )
	{
		var subData = tree.getSubItems(id).split(',');
		for(var k=0;k<subData.length;k++)
		{
			if(treeSort==1)
				VSIJ_AddItemToTree(tree,subData[k],getIDRecdDataDept(subData[k]));
			else if(treeSort==2)
				VSIJ_AddItemToTree(tree,subData[k],getOPRecdDataDept(pid,subData[k]));
			else if(treeSort==3)
			{
				for(var j=0;j<BK_REC_DATA.length;j++)
				{
					if(subData[k] == BK_REC_DATA[j][1])
					{
						VSIJ_AddItemToTree(tree,BK_REC_DATA[j][1],getChosRecdData(BK_REC_DATA[j][0],BK_REC_DATA[j][1],BK_REC_DATA[j][4]));
						break;
					}
				}
			}
		}	
	}
	
	if(tree.getSubItems(id)=="" && id.split("_")[0]!="ADD")
	{
		if(treeSort==1)
			VSIJ_AddItemToTree(tree,id,getIDRecdDataDept(id));
		else if(treeSort==2)
		{
			//VSIJ_AddItemToTree(tree,id,getOPRecdDataDept(id));
			var indate = id.split(" ");
			var indate1 = indate[0];
			var indate2 = id.split(" ")[0].substring(0,4)+"-"+id.split(" ")[0].substring(4,6)+"-"+id.split(" ")[0].substring(6,8);
			VSIJ_AddItemToTree(tree,id,getOPRecdDataDept2(tree.getParentId(id),indate1,indate2));	
		}
		else if(treeSort==3)
		{
			for(var j=0;j<BK_REC_DATA.length;j++)
			{
				if(id == BK_REC_DATA[j][1])
				{
					VSIJ_AddItemToTree(tree,BK_REC_DATA[j][1],getChosRecdData(BK_REC_DATA[j][0],BK_REC_DATA[j][1],BK_REC_DATA[j][4]));
					break;
				}
			}
		}
	}
	
	if(id.split("_")[0]!="ADD")
	{
		var checkState = tree.isItemChecked(id);
		if(checkState)
			tree.setSubChecked(id, 1);
		else
			tree.setSubChecked(id, 0);
	}
	else
		tree.setCheck(id,false);
	
}

var prtToday = GetDate();
prtToday = prtToday.split('-');
	
function insertPrintData(strRec)
{
	var recData = strRec.split('*$*');	
	if(recData[6]=="1")
	{
		//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_207_4.html","192.168.2.43:8080/EMR_DATA/xml/2017/11_27/207_1840479_01245809_1511763066092.XML^1^9^^gubun^pid^^^^^^doctorId^recCode^chosNo^createDate^prtYn^prtNum^commentCode^commentValue^pName^docCode^dep^hSeq^^^^^0^",600,800);
		//HRECD SEQ_NO 가져오기
		var hSeqNo = getHistorySeq(pid,recData[3],recData[0]);
		//var docData = getClickedDocList(recData[0]);
		var recData2 = getRightRecd('getRightRecd',recData[3],recData[0]);
		var docData = getClickedDocVer(recData[0],recData2[0][15]);
		var printObj=GetObj('bkPrint');
		if(recData2[0][8]=="0")
			printObj.NewPrintPage(SERVERADDR+"/EMR_DATA/html/"+docData[0][6],ipPortAddr+"/EMR_DATA"+recData2[0][5]+"^1^9^^"+recData2[0][13]+"^"+pid+"^^^^^^"+doctorId+"^"+recData[3]+"^"+recData2[0][11]+"^"+prtToday[0]+prtToday[1]+prtToday[2]+"^N^"+prtReturnVal[3]+"^"+prtReturnVal[1]+"^"+prtReturnVal[2]+"^"+BK_HWAN_JA_NAME[0][1]+"^"+recData[0]+"^"+recData2[0][10]+"^"+hSeqNo[0]+"^^^^^0^",600,800);
	}
	else
	{
		//PATID,INDATE,CLINCODE,CLASS,Image_Path,Image_Name,DOCNAME,TREATNO
		var scanImageData = getScanImagePath("getScanImagePath",recData[1],recData[0]);
		for(var i=0;i<scanImageData.length;i++)
		{
			var printDataCheck = selectPrintCheck(pid,prtToday[0]+prtToday[1]+prtToday[2],doctorId,prtReturnVal[1],'/TIF'+scanImageData[i][4]+'/'+scanImageData[i][5]);
			
			if(printDataCheck=="0")
				insertBermprint(pid,'0',doctorId,'/TIF'+scanImageData[i][4]+'/'+scanImageData[i][5],scanImageData[i][7],prtToday[0]+prtToday[1]+prtToday[2],'N',prtReturnVal[3],prtReturnVal[1],prtReturnVal[2],BK_HWAN_JA_NAME[0][1],recData[1],scanImageData[i][2],parseInt(i)+1,'1');
			else
				updateBermprint(pid,prtToday[0]+prtToday[1]+prtToday[2],doctorId,prtReturnVal[3],prtReturnVal[1],prtReturnVal[2],'/TIF'+scanImageData[i][4]+'/'+scanImageData[i][5],scanImageData[i][7],'1');
				//pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt)
		}
	}
}

function printNow(strRec)
{
	var recData = strRec.split('*$*');	
	var printObj=GetObj('bkPrint');
	
	var userNm2 = getUserName(doctorId,uDeptCd);
	var replaceStr = userNm2[0][0].substring(2,1);
	userNm2[0][0] = userNm2[0][0].replace(replaceStr,"*");
	var curr_time = GetDateString();
	
	if(recData[6]=="1")
	{
		//HRECD SEQ_NO 가져오기
		var hSeqNo = getHistorySeq(pid,recData[3],recData[0]);
		//var docData = getClickedDocList(recData[0]);
		var recData2 = getRightRecd('getRightRecd',recData[3],recData[0]);
		var docData = getClickedDocVer(recData[0],recData2[0][15]);
		var userNm1 = getUserName(recData2[0][12],'');
		var deptNm = getDeptData(recData2[0][10]);
		
		//if(recData2[0][8]=="1")
			printObj.NewPrintPage(SERVERADDR+"/EMR_DATA/html/"+docData[0][6],ipPortAddr+"/EMR_DATA"+recData2[0][5]+"^1^0^"+docData[0][1]+"^"+recData2[0][13]+"^"+recData2[0][9]+"^"+SERVERADDR+"^^^^"+curr_time+"^"+recData2[0][1]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+recData2[0][8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+recData2[0][7]+"^0^",600,800);
		//else
			//printObj.NewPrintPage(SERVERADDR+"/EMR_DATA/html/"+docData[0][6],ipPortAddr+"/EMR_DATA"+recData2[0][5]+"^1^0^"+docData[0][1]+"^"+recData2[0][13]+"^"+recData2[0][9]+"^"+SERVERADDR+"^^^^"+curr_time+"^"+recData2[0][1]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+recData2[0][8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+recData2[0][7]+"^0^",600,800);
			//바로출력 시 하단 문구 삭제
		//printObj.NewPrintPage(SERVERADDR+"/EMR_DATA/html/"+docData[0][6],ipPortAddr+"/EMR_DATA"+recData2[0][5]+"^1^8^"+docData[0][1]+"^"+recData2[0][13]+"^"+recData2[0][9]+"^"+SERVERADDR+"^^^^"+curr_time+"^"+recData2[0][1]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+recData2[0][8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+recData2[0][7]+"^0^",600,800);
		
	}
	else
	{
		var scanImageData = getScanImagePath("getScanImagePath",recData[1],recData[0]);
		for(var i=0;i<scanImageData.length;i++)
		{
			//printObj.ImagePrintPage(SERVERADDR+'/EMR_DATA/TIF'+scanImageData[i][4]+'/'+scanImageData[i][5],scanImageData[i][6],"0",userNm2[0][0],curr_time);
			printObj.ImagePrintPage(SERVERADDR+'/EMR_DATA/TIF'+scanImageData[i][4]+'/'+scanImageData[i][5],scanImageData[i][6],"","",""); //바로출력 시 하단 문구 삭제
		}
	}
}

function realPrint(treeChildObj)
{
	var treeChildObj2 = treeChildObj.childNodes;
	if(!treeChildObj2)
		return;
	if(treeChildObj2.length != 0)
	{
		for(var i=0;i<treeChildObj2.length;i++)	
			realPrint(treeChildObj2[i]);
	}
	else
	{
		if(tree.isItemChecked(treeChildObj.id))
			printNow(treeChildObj.id);
	}
}

function requestPrint(treeChildObj)
{
	var treeChildObj2 = treeChildObj.childNodes;
	if(!treeChildObj2)
		return;
	if(treeChildObj2.length != 0)
	{
		for(var i=0;i<treeChildObj2.length;i++)	
			requestPrint(treeChildObj2[i]);
	}
	else
	{
		if(tree.isItemChecked(treeChildObj.id))
			insertPrintData(treeChildObj.id);
	}
		
}

function checkedObj(treeChildObj)
{
	var treeChildObj2 = treeChildObj.childNodes;
	var cRetVal;
	if(treeChildObj2)
	{
		if(treeChildObj2.length != 0)
		{
			for(var i=0;i<treeChildObj2.length;i++)	
			{
				cRetVal = checkedObj(treeChildObj2[i]);
				if(cRetVal==1)
					break;
			}
		}
		else
		{
			if(tree.isItemChecked(treeChildObj.id))
				cRetVal = 1;
		}
		return cRetVal;
	}
}

var prtReturnVal;
var useCheckBox=0;
function onMultiCheck(chObj)
{
	if(useCheckBox==0)
	{
		var confirmStr = "다중선택을 하시겠습니까?";
		if(confirm(confirmStr))
		{
			useCheckBox = 1;
			parent.parent.left.useCheckBox = 1;
			parent.parent.left.SetSubMenu(treeSort); //checkbox 추가
		}
		else
			chObj.checked = false;
	}
	else
	{
		useCheckBox = 0;
		parent.parent.left.useCheckBox = 0;
		parent.parent.left.SetSubMenu(treeSort);
	}
}

function onPrintAllRecord()
{
	if(useCheckBox==0)
	{
		alert("다중선택을 체크 하십시오");	
		return;
	}
	
	//체크 확인
	var treeChildNode = tree._idpull.rec_root_1.childNodes;
	var cRetVal;
	for(i=0;i<treeChildNode.length;i++)
	{
		cRetVal = checkedObj(treeChildNode[i]);
		if(cRetVal==1)
			break;
	}
	
	if(treeSort==3&&cRetVal!=1)
	{
		treeChildNode = tree._idpull.rec_root_2.childNodes;
		for(i=0;i<treeChildNode.length;i++)
		{
			cRetVal = checkedObj(treeChildNode[i]);
			if(cRetVal==1)
				break;
		}
	}
	
	if(cRetVal!=1)
	{
		alert("아무것도 선택이 되지 않았습니다.");	
		return;
	}
	
	var prtRetData = checkNpPrt(doctorId,'1');
	if(prtRetData==undefined)
	{
		var url = "/EMR_DATA/popup/printRecdPop.jsp";
		returnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:200px;resizable:no;status:0;menubar:0;scroll:0');
		if(returnVal!=undefined)
		{
			prtReturnVal = returnVal.split('^');
			if(prtReturnVal[0]=="FALSE" || prtReturnVal[0]==undefined)
				alert("사본발급 신청을 취소하였습니다.");
			else
			{
				var treeChildNode = tree._idpull.rec_root_1.childNodes;
				for(i=0;i<treeChildNode.length;i++)
					requestPrint(treeChildNode[i]);
				
				if(treeSort==3)
				{
					treeChildNode = tree._idpull.rec_root_2.childNodes;
					for(i=0;i<treeChildNode.length;i++)
						requestPrint(treeChildNode[i]);
				}
				alert("인증저장된 기록에 대해 사본발급 신청이 완료되었습니다.");
			}
		}
		else
			alert("사본발급 신청을 취소하였습니다.");
	}
	else
	{
		//출력	or 사본발급신청
		var url = "/EMR_DATA/popup/printChoisePop.jsp";
		returnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:120px;resizable:no;status:0;menubar:0;scroll:0');
		if(returnVal!=undefined)
		{
			prtReturnVal = returnVal.split('^');
			if(prtReturnVal[0]=="FALSE" || prtReturnVal[0]==undefined)
				alert("취소하였습니다.");
			else
			{
				if(prtReturnVal[0]=="TRUE")
				{
					if(prtReturnVal[1]=="1")
					{
						var treeChildNode = tree._idpull.rec_root_1.childNodes;
						for(i=0;i<treeChildNode.length;i++)
							realPrint(treeChildNode[i]);
						
						if(treeSort==3)
						{
							treeChildNode = tree._idpull.rec_root_2.childNodes;
							for(i=0;i<treeChildNode.length;i++)
								realPrint(treeChildNode[i]);
						}
						alert("출력이 완료되었습니다.");
					}
					else
					{
						var url = "/EMR_DATA/popup/printRecdPop.jsp";
						returnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:200px;resizable:no;status:0;menubar:0;scroll:0');
						if(returnVal!=undefined)
						{
							prtReturnVal = returnVal.split('^');
							if(prtReturnVal[0]=="FALSE" || prtReturnVal[0]==undefined)
								alert("사본발급 신청을 취소하였습니다.");
							else
							{
								var treeChildNode = tree._idpull.rec_root_1.childNodes;
								for(i=0;i<treeChildNode.length;i++)
									requestPrint(treeChildNode[i]);
								
								if(treeSort==3)
								{
									treeChildNode = tree._idpull.rec_root_2.childNodes;
									for(i=0;i<treeChildNode.length;i++)
										requestPrint(treeChildNode[i]);
								}
								alert("인증저장된 기록에 대해 사본발급 신청이 완료되었습니다.");
							}
						}
						else
							alert("사본발급 신청을 취소하였습니다.");
					}
				}
				else
						alert("취소하였습니다.");
			}
		}
		else
			alert("취소하였습니다.");
	}
}

function VSIJ_MakeXml(page,cate, doc, rec)
{
	treeSort = page;
	if(cate == null)
		return;
	
	var initXml = "";
	var patiInfo = "patiInfomation";
	var recdListName;
	/*if(treeSort==0)
		initXml += "서식전체";
	else */
	if(treeSort==1)
	{
		initXml = "<item id='rec_root_1' text='회차'>";
		recdListName = "recList2";
		patiInfo = "patiInfomation2";
	}
	else if(treeSort==2)
	{
		initXml = "<item id='rec_root_1' text='외래'>";
		recdListName = "recList3";
		patiInfo = "patiInfomation3";
	}
	else if(treeSort==3)
	{
		initXml = "<item id='rec_root_1' text='입원서식'>";
		recdListName = "recList4";
		patiInfo = "patiInfomation4";
	}
		
	if(treeSort==0 || treeSort==5)
	{
		var tempXml = '';
		for(var i=0;i<rec.length;i++)
		{
			if(i==0)	
			{
				initXml += "<item id='dept_root_0' text='"+Replace4xml(rec[i][1])+"'>";
				initXml +=CreateXml(0, cate, doc, rec[i],treeSort);
				initXml += "</item>";
				if(ipaddress=="192.168.6.144" || ipaddress=="192.168.6.145" || ipaddress=="192.168.6.146" || ipaddress=="192.168.6.147" || ipaddress=="192.168.6.249" || ipaddress=="192.168.6.76" || SERVERADDR.indexOf('preemrdev')!=-1)
					initXml += "<item id='dept_root_1' text='타과'>";
			}
			else
			{
				tempXml = CreateXml(0, cate, doc, rec[i],treeSort);
				if(tempXml!='')
				{
					initXml += "<item id='rec_root_"+i+"' text='"+Replace4xml(rec[i][1])+"'>";
					initXml += tempXml;
					initXml += "</item>";
				}
			}
		}
		tempXml = CreateXml(0, cate, doc, ['0','공통','1',],treeSort);
		if(tempXml!='')
		{
			if(ipaddress=="192.168.6.144" || ipaddress=="192.168.6.145" || ipaddress=="192.168.6.146" || ipaddress=="192.168.6.147" || ipaddress=="192.168.6.249" || ipaddress=="192.168.6.76" || SERVERADDR.indexOf('preemrdev')!=-1)
				initXml += "</item><item id='dept_root_2' text='공통'>";
			else
				initXml += "<item id='dept_root_2' text='공통'>";
			initXml += tempXml;
			initXml += "</item>";
		}
		tempXml = CreateXml(0, cate, doc, ['','미분류서식','1',],treeSort);
		if(tempXml!='')
		{
			initXml += "<item id='dept_root_3' text='미분류서식'>";
			initXml += tempXml;
			initXml += "</item>";
		}
	}
	else
	{
		initXml +=CreateXml(0, cate, doc, rec,treeSort);
		initXml += "</item>";
	}
	
	if(treeSort==3)
		initXml +="<item id='rec_root_2' text='외래서식'>"+CreateXml(0, cate, doc, rec,'4')+"</item>";
	if(treeSort==0)
	{
		tree = MakeTreeToXml('docList', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, initXml, LeftClick, null);	
		//tree.attachEvent("onOpenEnd",function(id,state){LeftClick(id); return true;});
		tree.attachEvent("onDblClick",function(id, state){LeftClick(id);});
	}
	else if(treeSort==5)
	{
		tree = MakeTreeToXml('docList', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', useCheckBox, initXml, SetClick, null);	
	}
	else
	{
		if(treeSort==2)
			tree = MakeTreeToXml(recdListName, '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_yellowbooks/', 0, initXml, LeftClick, null);	
		else
			tree = MakeTreeToXml(recdListName, '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_yellowbooks/', useCheckBox, initXml, LeftClick, null);	
		if(useCheckBox==1)
			tree.attachEvent("onCheck",function(id,state){onCheckClick(id); return true;});
		
		var x1 = tempRecStr.split(",");
		
		for(var i=0; i<x1.length; i++)
			tree.setItemColor(x1[i], '#FF0000','#FF0000');	
		tree.openItem('rec_root_1');
		if(treeSort==3)
			tree.openItem('rec_root_2');
	}		

	if(treeSort!=5)
	{
		if(BK_HWAN_JA_NAME!=null)
		{
			var htmlStr = "<span style='width:90%;display:inline-block;background:#ededed;font-size:13px;margin-top:10px;margin-bottom:10px'><b>&nbsp;&nbsp; 등록번호:"+BK_HWAN_JA_NAME[0][0]+"&nbsp;이름:"+BK_HWAN_JA_NAME[0][1]+"</b></span><span style='width:10%;display:inline-block;background:#ededed;font-size:13px;margin-top:10px;margin-bottom:10px'></span>";
			//htmlStr += "<span style='width:90%;display:inline-block;background:#ededed;font-size:12px;'><b>&nbsp;&nbsp; 주민번호:"+BK_HWAN_JA_NAME[0][2]+"</b></span><span style='width:10%;display:inline-block;background:#ededed;font-size:13px;'> ";
			if(treeSort!=0)
			{
				//htmlStr += "<span style='width:90%;height:19px;display:inline-block;background:#ededed;font-size:13px;'><b>&nbsp;&nbsp; 주민번호:"+BK_HWAN_JA_NAME[0][2]+"</b></span><span style='width:10%;height:19px;display:inline-block;background:#ededed;font-size:13px;'> ";
				htmlStr += "<span style='width:60%;height:19px;display:inline-block;background:#ededed;font-size:13px;'><b>&nbsp;&nbsp; 주민번호:"+BK_HWAN_JA_NAME[0][2]+"</b></span><span style='width:40%;height:19px;display:inline-block;background:#ededed;font-size:13px;color:blue;'><b>&nbsp;&nbsp; (사용자:"+BK_USER[0][0]+")</b>";
				htmlStr+="<input type='checkbox' style='float:right;margin-right:20px'  onclick='onMultiCheck(this);'";
				if(useCheckBox==1)
					htmlStr+=" checked ";
				htmlStr+="/></span>";
			}
			else
				htmlStr += "<span style='width:60%;height:19px;display:inline-block;background:#ededed;font-size:13px;'><b>&nbsp;&nbsp; 주민번호:"+BK_HWAN_JA_NAME[0][2]+"</b></span><span style='width:40%;height:19px;display:inline-block;background:#ededed;font-size:13px;color:blue;'><b>&nbsp;&nbsp; (사용자:"+BK_USER[0][0]+")</b></span>";
			htmlStr+="<span style='width:100%;display:inline-block;background:#ededed;'>";
			htmlStr+=" <img style='float:left;vertical-align:middle;' src='images/js_butt_24_tempSaveList.jpg' id='btn_save' onmouseover=this.src='images/js_butt_24_tempSaveList.jpg' onmouseout=this.src='images/js_butt_24_tempSaveList.jpg' alt='임시저장리스트' title='임시저장리스트' onclick='openPopupUrl(2)'>";
			htmlStr+=" <img style='float:left;vertical-align:middle;' src='images/js_butt_24_pedigree.jpg' id='btn_save' onmouseover=this.src='images/js_butt_24_pedigree.jpg' onmouseout=this.src='images/js_butt_24_pedigree.jpg' alt='중요페이지' title='가계도' onclick='openPopupUrl(3)'>";
			htmlStr+=" <img style='float:left;vertical-align:middle;' src='images/js_butt_24_printList.jpg' id='btn_save' onmouseover=this.src='images/js_butt_24_printList.jpg' onmouseout=this.src='images/js_butt_24_printList.jpg' alt='사본발급신청리스트' title='사본발급신청리스트' onclick='openPopupUrl(1)'>";
			if(treeSort!=0)
				htmlStr +="<img style='width:20px;height:21px;float:left;vertical-align:middle;' src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='사본발급신청' title='사본발급신청' onclick='onPrintAllRecord()'>";
			if(parent.parent.arrTypeVarData('chosType')=="O" && (BK_USER[0][4]=='S' || BK_USER[0][4]=='R' || BK_USER[0][4]=='I'))
				htmlStr+="<img style='width:20px;height:21px;float:right;vertical-align:middle;' src='images/pop01_2.gif' id='btn_save' onmouseover=this.src='images/pop01_3.gif' onmouseout=this.src='images/pop01_2.gif' alt='환경설정' title='환경설정' onclick='openPopupUrl(4)'></span>";
			document.getElementById(patiInfo).innerHTML=htmlStr;
		}
		else
			document.getElementById(patiInfo).innerHTML="<b>&nbsp;&nbsp; 등록번호:1234567&nbsp;&nbsp;&nbsp;이름:홍길동&nbsp;&nbsp;&nbsp;주민번호:123456-1******";
	}
}

function VSIJ_MakeDocumentXml(cate, doc, cond)
{
	if(cate == null)
		return;
	
	if(cond[3] == null)
	{
		return CreateDocXml2(0, cate, doc, cond); //루트
	
	}
	else
	{	
		return CreateDocXml2(cond[3], cate, doc, cond); //pid
	
	}

}
var r_idx =0;
function VSIJ_MakeRecordXml(cate, doc, rec, cond)
{
	if(cate == null)
		return;
	if(cond[3] == null)
	{
		return CreateRecordXml2(0, cate, doc, rec, cond);
	}
	else
	{
		return CreateRecordXml2(cond[3], cate, doc, rec, cond);
	}
}

function VSIJ_MakeImageXml(cate, img, cond)
{
		return ImgXmlString(0, cate, img, cond);
}

function ImgXmlString(id, cate, img, cond)
{
	var xmlString="";
	
	for(var i=0; i<cate.length; i++)
	{
		if(cate[i][3] == id)
		{
			xmlString += "<item id='imgcate_"+Replace4xml(cate[i][2])+"' text='"+Replace4xml(cate[i][2])+"' ";
			if(cate[i][1] == cond[0])
				xmlString += "open='1' select='1' >\n";
			else
				xmlString += ">\n";
				
			xmlString += ImgXmlString(cate[i][1], cate, img, cond);
			if(cond[0] != -1)
			{
				for(var j=0; j<img.length; j++)
				{
					if(cate[i][1] == img[j][3])
					{
						xmlString += "<item id='img_"+img[j][0]+"' text='"+Replace4xml(img[j][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' />\n";
					}
				}
			}
			xmlString += "</item>";
		}
	}
	return xmlString;
}

function rtnArrVal_FS()
{
}
	
function clb_sd_FD()
{
}

function tabMove(type, len)
{
 if(type == "l")
 {
  var x = WINTAB;
  if(x.s_idx == 0)
   return;
  x.s_idx--;
  GetObj(x.tab[x.s_idx].id).style.display = "inline-block";
  GetObj(x.tab[x.e_idx].id).style.display = "none";
  x.e_idx--;

 }
 else if(type == "r")
 {
  var x = WINTAB;
  if(x.e_idx == x.cnt-1)
   return;
  x.e_idx++;
  GetObj(x.tab[x.e_idx].id).style.display = "inline-block";
  GetObj(x.tab[x.s_idx].id).style.display = "none";
  x.s_idx++;
 }
}
var recdChcek=0;
function onlyRecd(nodeid,viewData)
{
	recdChcek=1;
	if(BK_USER.length==0)
	{
		alert("의사정보가 정확하지 않습니다. 기록을 열람 할 수 없습니다. ");
		return;
	}
	var tPrentId = tree.getParentId(nodeid);
	dataYn = '';
	for(var i=0;i<checkChosData.length;i++)
	{
		if(checkChosData[i][0]==tPrentId)
		{
			dataYn=checkChosData[i][0];
			break;
		}
	}
	if(dataYn=='')
	{
		checkChosData[checkChosData.length] = new Array();
		checkChosData[checkChosData.length-1][0] = tPrentId;
	}
	
	parent.parent.SelectTreeItem(1,viewData,1);
	parent.parent.checkChosData = checkChosData;
	parent.parent.dataYn = dataYn;
}

function recordCheck(nodeid)
{
	
	if(recdChcek==1)
	{
		recdChcek=0;
		return;
	}
	
	if(BK_USER.length==0)
	{
		alert("의사정보가 정확하지 않습니다. 기록을 열람 할 수 없습니다. ");
		recdChcek=0;
		return;
	}
	var dataArray = new Array(); 
	dataArray = nodeid.split('*$*'); 
	var tPrentId;
	if(dataArray[6]=="1")
		tPrentId = tree.getParentId(tree.getParentId(nodeid));
	else
	{
		tPrentId = tree.getParentId(nodeid);
		if(!tPrentId)
			tPrentId = dataArray[5];//부모 자신아이디 
	}
	
	dataYn = '';
	for(var i=0;i<checkChosData.length;i++)
	{
		if(checkChosData[i][0]==tPrentId)
		{
			dataYn=checkChosData[i][0];
			break;
		}
	}
	if(dataYn=='')
	{
		checkChosData[checkChosData.length] = new Array();
		checkChosData[checkChosData.length-1][0] = tPrentId;
	}
	
	parent.parent.SelectTreeItem(1,[dataArray[0],dataArray[1],dataArray[2],dataArray[3],dataArray[4],dataArray[5],dataArray[6],dataArray[7]])	;
	parent.parent.checkChosData = checkChosData;
	parent.parent.dataYn = dataYn; 
	
}
var treeChcek=0;
function onlyTree(nodeid)
{
	treeChcek=1;
	if(BK_USER.length==0)
	{
		alert("의사정보가 정확하지 않습니다. 기록을 열람 할 수 없습니다. ");
		return;
	}
	var tPrentId = tree.getParentId(nodeid);
	/*dataYn = '';
	for(var i=0;i<checkChosData.length;i++)
	{
		if(checkChosData[i][0]==tPrentId)
		{
			dataYn=checkChosData[i][0];
			break;
		}
	}
	
	if(dataYn=='')
	{
		checkChosData[checkChosData.length] = new Array();
		checkChosData[checkChosData.length-1][0] = tPrentId;
	}
	
	parent.parent.SelectTreeItem(1,viewData,1);
	parent.parent.checkChosData = checkChosData;
	parent.parent.dataYn = dataYn;
	*/
	var indate = nodeid.split(" ");
	var indate1 = indate[0];
	var indate2 = indate[0].substring(0,4)+"-"+indate[0].substring(4,6)+"-"+indate[0].substring(6,8);
	VSIJ_AddItemToTree(tree,nodeid,getOPRecdDataDept2(tPrentId,indate1,indate2));	
}

function VSIJ_AddItemToTree2(tree, root, xmlArray,cnt,sdeCheck)
{
	if(xmlArray == null) 
		return;
	
	if(sdeCheck=="1")
	{
		
		//for(var i=0;i<xmlArray.length;i++)
		for(var i=cnt;i<xmlArray.length;i++)
		{
			if(xmlArray[i][9]==1)
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
			else
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
			
			if(i==xmlArray.length)
			{
				if(root==xmlArray[i][1] && xmlArray[i][9]==1 && (i==0 || (xmlArray[i-1][1]!=xmlArray[i][1] || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1])))
				{
					tree.insertNewItem(root,xmlArray[i][1]+"*$*"+xmlArray[i][3],xmlArray[i][8]);
					tree.deleteChildItems(xmlArray[i][8]);
				}
				if(root==xmlArray[i][1] && xmlArray[i][9]==1 && (i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
					VSIJ_AddItemToTree2(tree, xmlArray[i][1]+"*$*"+xmlArray[i][3], xmlArray,i,'2');
				break;
			}
			
			if(root==xmlArray[i][1] && xmlArray[i][9]==1 && (i==0 || (xmlArray[i-1][1]!=xmlArray[i][1] || xmlArray[i-1][3]!=xmlArray[i][3])))
			{
				tree.insertNewItem(root,xmlArray[i][1]+"*$*"+xmlArray[i][3],xmlArray[i][8]);
				tree.deleteChildItems(xmlArray[i][8]);
			}
			if(root==xmlArray[i][1] && xmlArray[i][9]==1 && (i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][10]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][10]+'_'+xmlArray[i][1]))
				VSIJ_AddItemToTree2(tree, xmlArray[i][1]+"*$*"+xmlArray[i][3], xmlArray,i,'2');
				
		}
		
	}
	else if(sdeCheck=="2")
	{
		//for(var i=0;i<xmlArray.length;i++)
		{
			//if(root==xmlArray[i][1]+"*$*"+xmlArray[i][3])
			{
				//if(xmlArray[i][9]==1)
				if(xmlArray[cnt][9]==1)
					tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				else
					tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				
				//var xmlContent = tree.insertNewItem(root,xmlArray[i][5]+"*$*"+i+"*$*rec_"+xmlArray[i][7]+"*$*"+xmlArray[i][6]+"*$*"+xmlArray[i][7]+"*$*"+xmlArray[i][8]+"*$*"+xmlArray[cnt][9],xmlArray[i][8]+" "+xmlArray[i][10]+"      <img style='width:20px;height:13px' src='/EMR_DATA/SDK/images/page.gif' onclick=\"onlyRecd('"+root+"','"+xmlArray[i][5]+"*$*"+i+"*$*rec_"+xmlArray[i][7]+"*$*"+xmlArray[i][6]+"*$*"+xmlArray[i][7]+"*$*"+xmlArray[i][8]+"')\"/>");
				var xmlContent = tree.insertNewItem(root,xmlArray[cnt][5]+"*$*"+cnt+"*$*rec_"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][6]+"*$*"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][8]+"*$*"+xmlArray[cnt][9],xmlArray[cnt][8]+" "+xmlArray[cnt][10]+"      <img style='width:20px;height:13px' src='/EMR_DATA/SDK/images/page.gif' onclick=\"onlyRecd('"+root+"','"+xmlArray[cnt][5]+"*$*"+cnt+"*$*rec_"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][6]+"*$*"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][8]+"*$*"+xmlArray[cnt][9]+"')\"/>");
				
				//if(xmlArray[i][11]==1)
				if(xmlArray[cnt][11]==1)
					tree.setItemColor(xmlContent, '#db7093','#db7093');
				else
					tree.setItemColor(xmlContent, '#000000','#000000');
			}
		}
	}
	else
	{
		if(xmlArray[cnt][9]==1)
			tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
		else
			tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
		
		tree.insertNewItem(root,xmlArray[cnt][12]+"*$*"+xmlArray[cnt][5]+"*$*rec_"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][6]+"*$*"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][8]+"*$*"+xmlArray[cnt][9],xmlArray[cnt][3]+"      <img style='width:20px;height:13px' src='/EMR_DATA/SDK/images/page.gif' onclick=\"onlyRecd('"+root+"','"+xmlArray[cnt][12]+"*$*"+xmlArray[cnt][5]+"*$*rec_"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][6]+"*$*"+xmlArray[cnt][7]+"*$*"+xmlArray[cnt][8]+"*$*"+xmlArray[cnt][9]+"')\"/>");
	}
}
var checkEvent = 1;
function VSIJ_AddItemToTree(tree, root, xmlArray)
{
	if(xmlArray == null)
		return;
	tree.deleteChildItems(root);
	if(treeSort=='1')
	{
		for(var i=0;i<xmlArray.length;i++)
		{
			tree.insertNewItem(root,xmlArray[i][0]+'*$*'+xmlArray[i][3]+'*$**$**$**$*'+xmlArray[i][1]+'*$*'+xmlArray[i][4],xmlArray[i][1]);
		}
	}
	else if(treeSort=='2')
	{
		
		for(var i=0;i<xmlArray.length;i++)
		{
			if(xmlArray[i][9]==1)
			{
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				
				if(i==xmlArray.length)
				{
					//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						//tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || (xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
					//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					if(root==xmlArray[i][1] && (i==0 || xmlArray[i-1][1]!=xmlArray[i][1]))
						VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					//break;
				}
				//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					//tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || (xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
				//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
				if(root==xmlArray[i][1] && (i==0 || xmlArray[i-1][1]!=xmlArray[i][1]))
				{
					VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					//break;
				}
				
			}
			else
			{
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				if(i==xmlArray.length)
				{
					//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						//tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
					if(root==xmlArray[i][1] && (i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2]))
						VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					//break;
				}
				//if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					//tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
				if(root==xmlArray[i][1] && (i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2]))
				{
					VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					//break;
				}
			}
		}
		/*
		for(var i=0;i<xmlArray.length;i++)
		{
			if(xmlArray[i][9]==1)
			{
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				
				if(i==xmlArray.length)
				{
					if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || (xmlArray[i-1][1]!=xmlArray[i][1] && xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
						//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					break;
				}
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || ( xmlArray[i-1][1]!=xmlArray[i][1] && xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
					//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
			}
			else
			{
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				if(i==xmlArray.length)
				{
					if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
						//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					break;
				}
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
					//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
			}
		}*/
	}
	else if(treeSort=='3')
	{
		for(var i=0;i<xmlArray.length;i++)
		{
			var xmlContent="";
			if(xmlArray[i][7]==1)
			{
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				xmlContent = tree.insertNewItem(root,xmlArray[i][1]+"*$*"+i+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+xmlArray[i][6]+"*$*"+xmlArray[i][7],xmlArray[i][2]);
			}
			else
			{
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				if(tree._selected[0]!=undefined)
				{
					var tempTitle = tree._selected[0].label.split(' [');
					xmlContent = tree.insertNewItem(root,xmlArray[i][0]+"*$*"+xmlArray[i][1]+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+tempTitle[0]+"*$*"+xmlArray[i][7],xmlArray[i][2]);
					//xmlContent = tree.insertNewItem(root,xmlArray[i][0]+"*$*"+xmlArray[i][1]+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+root+"*$*"+xmlArray[i][7],xmlArray[i][2]);
				}
			}

			if(xmlArray[i][8]==1)
				tree.setItemColor(xmlContent, '#db7093','#db7093');
			else
				tree.setItemColor(xmlContent, '#000000','#000000');
		}
	}
	if(checkEvent)
	{
		//tree.attachEvent("onclick",function(nodeid, event){alert("checkEvent : "+recdChcek);if(recdChcek==1){recdChcek=0;return;}var dataArray = new Array(); dataArray = nodeid.split('*$*'); parent.parent.SelectTreeItem(1,[dataArray[0],dataArray[1],dataArray[2],dataArray[3],dataArray[4],dataArray[5],dataArray[6]])});
		//tree.attachEvent("onclick",function(nodeid, event){setTimeout(recordCheck(nodeid),1000);});
		//if(root.split('*$*').length>1)
			//tree.attachEvent("onclick",function(root, event){setTimeout(function(){recordCheck(root)},1000);});
			//tree.attachEvent("onclick",function(root, event){if(typeof(event)=="string")recordCheck(root);});
		
		checkEvent=0;
	}
}
var g1=new Array();
var g2=50;
var g3 = new Array();
var thisXmlArr;
var thisTree;
var thisRoot;
function VSIJ_AddTimer(gnum)
{
	
	tXml=g3[gnum];
	num=g1[gnum];
	if(num==0)
		thisTree.deleteChildItems(gnum);
	else
		thisTree.deleteItem('ADD_'+gnum);
		
	if(tXml==null) return;
	if(tXml.length>num)
	{
		var cnt = num+50;
		var checkNum = 0;
		var i;
		for(i=num;checkNum<50 && i<tXml.length;i++)
		{
			
			if(tXml[i][9]==1)
				thisTree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
			else
				thisTree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
			if(i==0 || tXml[i-1][1]!=tXml[i][1])
			{
				thisTree.insertNewItem(gnum,tXml[i][1],tXml[i][1]+"      <img style='width:40px;height:13px' src='/EMR_DATA/SDK/images/js_butt_r24_view.jpg' onclick=\"onlyTree('"+tXml[i][1]+"')\"/>");
				
				checkNum++;
			}
		}
		
		if(tXml.length<=i)	
		{
			/*g3[gnum] = null;
			g1[gnum]=0;
			return;*/
		}
		else
			thisTree.insertNewItem(gnum,'ADD_'+gnum,'기록 더보기');
		
		g1[gnum]=i;
		//setTimeout("VSIJ_AddTimer('"+gnum+"')",500);
	}
}

function VSIJ_AddItemToTreeDate(tree, root, xmlArray)
{
	if(xmlArray == null)
		return;
	tree.deleteChildItems(root);
	if(treeSort=='1')
	{
		for(var i=0;i<xmlArray.length;i++)
		{
			tree.insertNewItem(root,xmlArray[i][0]+'*$*'+xmlArray[i][3]+'*$**$**$**$*'+xmlArray[i][1]+'*$*'+xmlArray[i][4],xmlArray[i][1]);
		}
	}
	else if(treeSort=='2')
	{
		/*startKey = (xmlArrLen +1)*50;
		if(startKey>xmlArray.length)
			startKey = xmlArray.length;
			*/
		for(var i=0;i<xmlArray.length;i++)
		{
			if(xmlArray[i][9]==1)
			{
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				
				if(i==xmlArray.length)
				{
					if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || (xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
						//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					break;
				}
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || (xmlArray[i-1][3]+'_'+xmlArray[i-1][2]+'_'+xmlArray[i-1][1]!=xmlArray[i][3]+'_'+xmlArray[i][2]+'_'+xmlArray[i][1]))
					//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
			}
			else
			{
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				if(i==xmlArray.length)
				{
					if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					break;
				}
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					
				/*if(i==xmlArray.length)
				{
					if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
						tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
					//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
						//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
					break;
				}
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					tree.insertNewItem(root,xmlArray[i][1],xmlArray[i][1]);
				//if(i==0 || xmlArray[i-1][3]+'_'+xmlArray[i-1][2]!=xmlArray[i][3]+'_'+xmlArray[i][2])
					//VSIJ_AddItemToTree2(tree, xmlArray[i][1], xmlArray,i,xmlArray[i][9]);
				*/
			}
		}
	}
	else if(treeSort=='3')
	{
		for(var i=0;i<xmlArray.length;i++)
		{
			var xmlContent="";
			if(xmlArray[i][7]==1)
			{
				tree.setStdImages('leaf_2.gif','leaf_2.gif','leaf_2.gif');
				xmlContent = tree.insertNewItem(root,xmlArray[i][1]+"*$*"+i+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+xmlArray[i][6]+"*$*"+xmlArray[i][7],xmlArray[i][2]);
			}
			else
			{
				tree.setStdImages('leaf.gif','leaf.gif','leaf.gif');
				if(tree._selected[0]!=undefined)
				{
					var tempTitle = tree._selected[0].label.split(' [');
					xmlContent = tree.insertNewItem(root,xmlArray[i][0]+"*$*"+xmlArray[i][1]+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+tempTitle[0]+"*$*"+xmlArray[i][7],xmlArray[i][2]);
					//xmlContent = tree.insertNewItem(root,xmlArray[i][0]+"*$*"+xmlArray[i][1]+"*$*rec_"+xmlArray[i][5]+"*$*"+xmlArray[i][4]+"*$*"+xmlArray[i][5]+"*$*"+root+"*$*"+xmlArray[i][7],xmlArray[i][2]);
				}
			}

			if(xmlArray[i][8]==1)
				tree.setItemColor(xmlContent, '#db7093','#db7093');
			else
				tree.setItemColor(xmlContent, '#000000','#000000');
		}
	}
	if(checkEvent)
	{
		checkEvent=0;
	}
}


//----------------------------------------------------TOHEXA


function ToHex4Unicode(x)
{
	var hex="0123456789ABCDEF";
	var r="FFFE";
	var i, j;
	var let;
	var tempStr;
	for(i=0;i<x.length;i++)
	{
		tempStr = "";
		let= x.charCodeAt(i);
		tempStr += hex.charAt((let >> 4) & 0xF);
		tempStr += hex.charAt((let) & 0xF);
		tempStr += hex.charAt((let >> 12) & 0xF);
		tempStr += hex.charAt((let >> 8) & 0xF);
		r += tempStr;
	}
	return r;
}



////////////////////////////////////////////

/**************Ajax 호출 test************/

function GetXmlText(x)
{
	if(x.text !=null)
		return x.text;
	return x.textContent;
}


function ajaxRes(obj)
{
 this.resCount;
 this.name=new Array();
 this.msg=new Array();
 this.result=new Array();
 this.itemCount=new Array();
 this.data=new Array();
 this.key=new Array();
 this.getColCount=function(res,row){
  if(this.itemCount <= row)
   return 0;
  return this.data[res][row].length;
 }
 this.getItemCount=function(res){
  return this.itemCount[res];
 }
 this.getKey=function (res,row,col){
  return this.key[res][row][col];
 }
 this.getValue=function (res,row,col){
  return this.data[res][row][col];
 }
 this.getKeyValue=function (res, row, key1){
  var i;
  for(i=0;i<this.key[res][row].length; i++)
  {
   if(this.key[res][row][i]==key1)
     return this.data[res][row][i];
  }
  return "";
 }
 this.setXml=function(xmlStr){
  this.resCount=0;
  //var xObj=new ActiveXObject("Microsoft.XMLDOM");
  var xObj=getXmlObject(xmlStr);
  

  
  
  var xRes = xObj.getElementsByTagName("RESPONSE");
  if(xRes == null)
   return;
  var i;
  for (i=0;i<xRes.length;i++)
  {
     this.name[i] = xRes[i].getAttribute("name");
     this.result[i] = xRes[i].getAttribute("result");
     this.msg[i] = xRes[i].getAttribute("msg");
     var xValSet = xRes[i].getElementsByTagName("VALUESET");
     var j;
     this.data[i]=new Array();
     this.key[i]=new Array();
      for( j=0; j<xValSet.length; j++)
      {
       var xVal=xValSet[j].getElementsByTagName("VALUE");
       var k;
       this.data[i][j]=new Array();
       this.key[i][j]=new Array();
       for(k=0;k<xVal.length;k++)
       {
        this.key[i][j][k]=xVal[k].getAttribute("name");
        this.data[i][j][k]=GetXmlText(xVal[k]);
       }
      }
      this.itemCount[i]=j;
      this.resCount++;
  }
 }
}



function getXmlObject(xmlString)
{
	var xObj=null;
	if (window.ActiveXObject)
	{
		xObj=new ActiveXObject("Microsoft.XMLDOM");
		xObj.async="false";
		xObj.loadXML(xmlString);
	}
	else if(window.DOMParser)
	{
	 		var parser=new DOMParser();
	 		xObj = parser.parseFromString(xmlString, "text/xml");
	}
	else
	{
		xObj = document.implementation.createDocument("","",null);
		xObj.load(xmlString);
	}
	return xObj;
}



function SendServerCall(fname, param, data, url, callBackFunc)
{
	
  var xmlHttpReq = false;
    if (window.XMLHttpRequest) 
    {
       xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
       xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlHttpReq == null)
    {
     alert("Can't get the XML HTTP");
     return;
    }
    if(callBackFunc!=null)
    {
     xmlHttpReq.onreadystatechange=function (){
      if(xmlHttpReq.readyState==4)
      {
       var res=new ajaxRes();
       res.setXml(xmlHttpReq.responseText);
       callBackFunc(res);
      }
     };
     xmlHttpReq.open('POST', url, true); 
    }
    else
      xmlHttpReq.open('POST', url, false);
    var ajaxParam = GetAjaxRequestData(fname, param, data);
    
    ajaxParam = ToHex4Unicode("<?xml version='1.0' encoding='euc-kr'?><REQUESTLIST>"+ajaxParam+"</REQUESTLIST>");
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.send('reqData='+ajaxParam);
    if(callBackFunc==null)
    {
     var res=new ajaxRes();
     res.setXml(xmlHttpReq.responseText);
     return res;
    }
}
/////////////////////////////////////////////////////////////////

function SendServerCall2(fname, param, data, url, callBackFunc)
{
  var xmlHttpReq = false;
    if (window.XMLHttpRequest) 
    {
       xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
       xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlHttpReq == null)
    {
     alert("Can't get the XML HTTP");
     return;
    }
    if(callBackFunc!=null)
    {
     xmlHttpReq.onreadystatechange=function (){
      if(xmlHttpReq.readyState==4)
      {
       callBackFunc(xmlHttpReq.responseText);
      }
     };
     xmlHttpReq.open('POST', url, true); 
    }
    else
      xmlHttpReq.open('POST', url, false);
    var ajaxParam = GetAjaxRequestData(fname, param, data);
    
    ajaxParam = ToHex4Unicode("<?xml version='1.0' encoding='euc-kr'?><REQUESTLIST>"+ajaxParam+"</REQUESTLIST>");
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.send('reqData='+ajaxParam);
    if(callBackFunc==null)
    {
     return xmlHttpReq.responseText;
    }
}

function SendServerCall3(fname, param, data, url, callBackFunc)
{
	
  var xmlHttpReq = false;
    if (window.XMLHttpRequest) 
    {
       xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
       xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlHttpReq == null)
    {
     alert("Can't get the XML HTTP");
     return;
    }
    if(callBackFunc!=null)
    {
     xmlHttpReq.onreadystatechange=function (){
      if(xmlHttpReq.readyState==4)
      {
       var res=new ajaxRes();
       res.setXml(xmlHttpReq.responseText);
       callBackFunc(res);
      }
     };
     xmlHttpReq.open('POST', url, true); 
    }
    else
      xmlHttpReq.open('POST', url, false);
    var ajaxParam = GetAjaxRequestData(fname, param, data);
    
    ajaxParam = ToHex4Unicode("<?xml version='1.0' encoding='euc-kr'?><REQUESTLIST>"+ajaxParam+"</REQUESTLIST>");
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.send('reqData='+ajaxParam);
    if(callBackFunc==null)
    {
     var res=new ajaxRes();
     //res.setXml(xmlHttpReq.responseText);
     //return res.data[0];
     return xmlHttpReq.responseText;
    }
}

function SetXmlToArray(r1,cateCol)
{
	cateCol = cateCol.split(',');
	var idx=new Array();
   var xObj=new ActiveXObject("Microsoft.XMLDOM");
  	xObj.async="false";
  	xObj.loadXML(r1);
  	if(xObj==null)
	   return null;
  	var xRes = xObj.getElementsByTagName("RESPONSE");
  	if(xRes == null)
  	 return null;
  	var i;
  	var res=new Array();
	for (i=0;i<xRes.length;i++)
	{
	     var xValSet = xRes[i].getElementsByTagName("VALUESET");
	     var j;
	     var len=xValSet.length;
	     for( j=0; j<len; j++)
	     {
	     	 res[j]=new Array();
		    var xVal=xValSet[j].getElementsByTagName("VALUE");
	       var k;
	       var vLen=xVal.length;
	       for(k=0;k<vLen;k++)
	       {
	       	if(j==0)
	       	{
	       		var name=xVal[k].getAttribute("name");
	       		for(var n=0;n<cateCol.length;n++)
	       		{
	       			if(cateCol[n]==name)
	       			{
	       				idx[k]=n; break;
	       			}
	       		}
	       	}
	       	if(idx[k] != null)
	       		res[j][idx[k]]=xVal[k].text;
	       }
	     }
	}
	return res;
}


//////////////////////////////////////////////////////////////
function GetAjaxRequestData(fname, name, data)
{
 var ret ="<REQUEST id='"+fname+"' >";
 var i;
 
 for(i=0;i<data.length;i++)
 {
  ret += "<PS>";
  for(var j=0; j<data[i].length; j++)
  {
   ret += "<D name='"+name[j]+"'>"+Replace4xml(data[i][j])+"</D>";  
  }
  ret += "</PS>";
 }
 ret +="</REQUEST>"
    
 return ret;
}



/*================================================11.6 테스트 ====================================*/

function PatientsObject()
{
	this.id;
	this.name;
	this.front_jumin;
	this.behind_jumin;
	this.jumin;
	this.sex;
	this.age;
	this.homenum;
	this.front_post;
	this.behind_post;
	this.address;
	this.bloodtype;
	this.telnum;
	this.email;
	
}

function PatientsInfo(dataArr)
{
	var patient = new PatientObject();
	patient.id = dataArr[0][0];
	patient.name = dataArr[0][1];
	patient.front_jumin = dataArr[0][2];
	patient.behind_jumin = dataArr[0][3];
	patient.jumin = dataArr[0][4];
	patient.sex = dataArr[0][5];
	patient.age = dataArr[0][6];
	patient.homenum = dataArr[0][7];
	patient.front_post = dataArr[0][8];
	patient.behind_post = dataArr[0][9];
	patient.address = dataArr[0][10];
	patient.bloodtype = dataArr[0][11];
	patient.telnum = dataArr[0][12];
	patient.email = dataArr[0][13];
	
	return patient;
}

/*================================================11.6 테스트 ======================================*/


/* ----------------------------- */
/*********2012.11.15************/
/********날짜 받는 함수*********/
/******리턴 : 날짜 문자열*******/

function GetDateNum()
{
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	if(m<10)
	 m = "0"+m;
	var d = date.getDate();
	if(d<10)
	 d = "0"+d;
	
	var recDate = y+m+d;
	
	return recDate;
}

function GetDate()
{
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	if(m<10)
	 m = "0"+m;
	var d = date.getDate();
	if(d<10)
	 d = "0"+d;
	
	var recDate = y +"-"+m+"-"+d;
	
	return recDate;
}

function GetDateString()
{
	var d = new Date();
	var dstr = d.getFullYear()+"-";
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


//**************************************************************************************** */

function patientInformation()
{
	this.rrns;
	this.name;
	this.h_jumin;
	this.f_jumin;
	this.jumin;
	this.sex;
	this
}
//--------------------------------------------12/13----------------------------------------------------------------//

function SendServerMultiCall(param, url, callBackFunc)
{
	var xmlHttpReq = false;
    
    if (window.XMLHttpRequest) {
        xmlHttpReq = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlHttpReq == null)
    {
     alert("Can't get the XML HTTP");
     return;
    }
    if(callBackFunc!=null)
    {
     xmlHttpReq.onreadystatechange=function (){
      if(xmlHttpReq.readyState==4)
      {
       var res=new ajaxRes();
       res.setXml(xmlHttpReq.responseText);
       callBackFunc(res);
      }
     };
     xmlHttpReq.open('POST', url, true);
    }
    else
    {
    	xmlHttpReq.open('POST', url, false);
    }
    
    ajaxParam = ToHex4Unicode("<?xml version='1.0' encoding='euc-kr'?><REQUESTLIST>"+param+"</REQUESTLIST>");
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.send('reqData='+ajaxParam);
    if(callBackFunc==null)
    {
	     var res=new ajaxRes();
	     res.setXml("<?xml version='1.0' encoding='euc-kr'?><RESPONSELIST>"+xmlHttpReq.responseText+"</RESPONSELIST>");
	     return res;
    }
}



function DataValueObj()
{
	this.itemCount = 0;
	this.key = new Array();
	this.data = new Array();
	this.value = new Array();
	this.setData = function(x1)
	{
		if(x1 == null)
			return;
		
		var len = x1.resCount;
		for(var i=0; i<len; i++)
		{
			var count = this.itemCount;
			if(x1.data[i].length <1)
				continue;
			var dlen = x1.data[i][0].length;
			var d=0;
			for(var j=count; j<(count + dlen); j++)
			{
				this.key[j] = x1.key[i][0][d];
				this.data[j] = x1.data[i][0][d++];
				this.itemCount++;
			}
		}
		
	}
	this.getKey = function(name)
	{
		var len = this.itemCount;
		for(var i=0; i<len; i++)
		{
			if(this.key[i] == name)
				return i;
		}
		return -1;
	}
	this.getKeyVal = function(idx)
	{
		return this.key[idx];
	}
	this.getVal = function(name)
	{
		var len = this.itemCount;
		for(var i=0; i<len; i++)
		{
			if(this.key[i] == name)
				return this.data[i];
		}
		return "";
	}
	this.setXmlData = function(x1, colStr)
	{
		if(x1 == null)
			return 0;
				
		var x2 = colStr.split(",");
		for(var i=0; i<x1.resCount; i++)
		{
			for(var j=0; j<x1.itemCount[i]; j++)
			{
				if(this.value[j] == null)
					this.value[j] = new Array();
				
				for(var k=0; k<x2.length; k++)
				{
					for(var l=0; l<x1.key[i][j].length; l++)
					{
						if(x2[k] == x1.key[i][j][l])
						{
							this.value[j][k] = x1.data[i][j][l];
							break;
						}
					}
				}
				for(var k=0; k<x2.length; k++)
				{
					if(this.value[j][k] == null)
						this.value[j][k] = "";
				}
			}
		}
	}
}

//PTBSIDNO,PTBSNAME,PTBSRRNF,PTBSRRNS,PTBSRRNF||'-'||PTBSRRNS AS JUNUM,SEX_FND(PTBSRRNS),to_char(  to_number(substr(to_char(SYSDATE, 'YYYY/MM/DD'),1,4)) - to_number(decode(substr(ptbsrrns,1,1),'3','20','4','20','0','18','9','18','19')||substr(ptbsrrnf,1,2)) - to_number((decode( substr( to_char( to_number(substr(to_char(SYSDATE, 'YYYYMMDD'),5,4)) - to_number(substr(ptbsrrnf,3,4))), 1,1 ), '-', '1', '0') ))) as AGE, PTBSTELN,PTBSZIPF,PTBSZIPS,PTBS_ADDR(PTBSIDNO),BLOOD_DESC(PTBSIDNO),PTBSHPNO,PTBSEMAL FROM PMCPTBSM

/* BK_DOC_DATA
[0:seqNo ,1:code ,2:name ,3:version ,4:folder ,5:pid ,6:doctype ,7:startTime ,8:endTime ,9:department1 ,
10:use ,11:department2 ,12:department3 ,13:department4 ,14:department5 ,15:category1 ,16:category2 ,17:category3 ,18:creator ,19:modifier ,
20:createTime ,21:modifyTime ,22:recordType ,23:recordEvent ,24:recordArea ,25:recordLevel ,26:mandatory ,27:depshare ,28:en_input ,29:sign ,
30:tempsaveview ,31:cosign ,32:cosignlevel ,33:cosignprint ,34:privatedoc ,35:writelevel ,36:vielevel ,37:file_input ,38:file_view ,39:file_print ,
40:file_modify ,41:dev_design ,42:dev_model ,43:dev_mapping ,44:dev_test ,45:dev_progress ,46:description ,47:common_code ,48:connected_doc_code ,49:file_docu,
50:title ,51:pos ,52:req_department ,53:insf_doc_code ,54:single_print_yn ,55:doc_search_yn ,56:rec_search_yn, 57:print_storage ,58:amend_level ,59:octy_cd ,
60:modifylevel ,61:connected_doc_code2]
*/

/* BK_REC_DATA
[0:SEQ_NO, 1:CODE, 2:COMMON_CODE, 3:NAME, 4:STATUS, 5:DOC_CODE, 6:PTID, 7:RPTID, 8:CATEGORY1, 9:CATEGORY2, 
10:CATEGORY3, 11:CREATOR_CODE, 12:CREATE_TIME, 13:MODIFIER_CODE, 14:MODIFY_TIME, 15:SIGNER_CODE, 16:SIGN_TIME, 17:COSIGNER_CODE, 18:COSIGN_TIME, 19:PRINTED,
20:FILENAME, 21:RECORDTYPE, 22:INCOMPLETE, 23:TEMPSAVE, 24:DEPARTMENT, 25:CHOS_NO, 26:SIGNLEVEL, 27:EXT_RECD_CODE, 28:DOC_VER, 29:INSF_DOC_CODE, 
30:SIGNER_CODE2, 31:SIGN_TIME2, 32:COSIGNER_CODE2, 33:RECORD_TIME, 34:COSIGN_CANDIDATE_CD]
*/
document.oncontextmenu=function(){return false;}
document.onkeydown = keyboardEvent;
document.onkeyup = keyboardEvent;
function keyboardEvent(){
		if(event.keyCode==116 || event.keyCode==8){//F5 : 116 , Backspace : 8
			if(event.srcElement.nodeName!="INPUT" && event.srcElement.nodeName!="TEXTAREA")
				return false;
		}
	}
function contextMenu(){
	return false;
} 

function getAjaxDbData(str){
	if(str==null) return new Array();
	var te1 = str.split("*$*");
	if(te1==null)return;
	
	var array=new Array();
	for(var i=0; i<te1.length-1; i++){
		var te2 = te1[i].split(";@;");
		var arr=new Array();
		for(var j=0; j<te2.length-1; j++){
			arr[j]=te2[j];
		} 
		array=addArray(array,arr);
	}
	return array; 
}

function moveLeft(objId){
		var pop = document.getElementById(objId);
		
		if(pop.style.pixelLeft>=120){
			pop.style.paddingLeft="15px";
			pop.style.display="";
		}
		else{
			return;
		}
	}
	function moveRight(objId){
		var pop = document.getElementById(objId);
		
		if(pop.style.pixelLeft<=170){
			pop.style.display = 'none';
		}
		else{
			return;
		}
	}

function createListXml(tabNum,xmlArray)
{
	var makeListXml = "<div>";
	if(tabNum=='1')	
	{
		for(var i=0;i<xmlArray.length;i++)
			makeListXml +="<span style='display:block;cursor:pointer' >"+xmlArray[i][1]+"</span>";
	}
	else if(tabNum=='2')	
	{
		for(var i=0;i<xmlArray.length;i++)
		{
			if(i==xmlArray.length-1)
			{
				if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
					makeListXml +="<span style='display:block'><B>"+xmlArray[i][1]+"</B></span>";
				makeListXml +="<span style='display:block;cursor:pointer' onclick=\"parent.parent.SelectTreeItem(1,["+xmlArray[i][5]+","+i+",'rec_"+xmlArray[i][7]+"',"+xmlArray[i][6]+","+xmlArray[i][7]+",'"+xmlArray[i][8]+"']);\">&nbsp;&nbsp;"+xmlArray[i][3]+"</span>";
				break;
			}
			if(i==0 || xmlArray[i-1][1]!=xmlArray[i][1])
				makeListXml +="<span style='display:block'><B>"+xmlArray[i][1]+"</B></span>";
			makeListXml +="<span style='display:block;cursor:pointer' onclick=\"parent.parent.SelectTreeItem(1,["+xmlArray[i][5]+","+i+",'rec_"+xmlArray[i][7]+"',"+xmlArray[i][6]+","+xmlArray[i][7]+",'"+xmlArray[i][8]+"']);\" >&nbsp;&nbsp;"+xmlArray[i][3]+"</span>";
			
		}
	}
	else
	{
		for(var i=0;i<xmlArray.length;i++)
			makeListXml +="<span style='display:block;cursor:pointer'  onclick=\"parent.parent.SelectTreeItem(1,["+xmlArray[i][1]+","+i+",'rec_"+xmlArray[i][5]+"',"+xmlArray[i][4]+","+xmlArray[i][5]+",'"+xmlArray[i][6]+"']);\">"+xmlArray[i][2]+"</span>";
	}
	makeListXml += "</div>";
	return makeListXml;
}

function fn_loadDataXml(x0,colstr)
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
	
	var x2 = x1.getElementsByTagName("VALUESET");
	var i,j,k;
	var colStrArr = colstr.split(',');
	var makeArray = Array();
	for(i =0; i<x2.length; i++)
	{
		var valueObj = x2[i].getElementsByTagName("VALUE");
		var valueArray = Array();
		for(k=0;k<colStrArr.length;k++)
		{
			for(j=0;j<valueObj.length;j++)
			{
				if(colStrArr[k]	== valueObj[j].getAttribute("name"))
				{
					if(valueObj[j].text==undefined)
						valueArray[k] = valueObj[j].textContent;
					else
						valueArray[k] = valueObj[j].text;
					break;
				}
			}
		}
		makeArray[i] = valueArray;
	}
	return makeArray;
}

function fn_responseData(x0)
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
	
	var x2 = x1.getElementsByTagName("RESPONSE");
	var result = x2[0].getAttribute("result");
	return result;
}

function arrTypeVarData(valueName)
	{
		//age#22$sex#M$medDate#20140101$
		if(arrTypeVar == null || arrTypeVar == "")
			return "";
		var x1 = arrTypeVar.split('$');
		if(x1.length < 1)
			return "";
		for(i=0; i<x1.length; i++)
		{
			var x2 = x1[i].split('@');
			if(x2.length != 2)
				continue;
			if(x2[0] == valueName)
			{
				if(x2[1] == "")
					return "";
				return x2[1];
			}
		}
		return "";
	}

function fn_makeArr(arrStr)
{
	var arrData = new Array();
	var arrStr1 = arrStr.split('^');
	for(var k=0;k<arrStr1.length-1;k++)
	{
		arrData[arrData.length] = new Array();
		var arrStr2 = arrStr1[k].split('$');
		for(var j=0;j<arrStr2.length;j++)
			arrData[k][j] = arrStr2[j];
	}
	return arrData;
}

function fn_openDeptCheck(thisDept)
{
	var retVal = false;
	var OPENDEPT = parent.OPENDEPT;
	for(var k=0;k<OPENDEPT.length;k++)
	{
		if(thisDept==OPENDEPT[k])	
		{
				retVal = true;
				break;
		}
	}
	return retVal;
}

var recdData = '';
var tempXml = '';
function getRecdData()
{
	tempXml=SendServerCall2('getRecdData',['pid'],[[pid]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CREATOR_CODE,CATEGORY1,COSIGN_TIME2,PTID,COSIGN_TIME,CATEGORY3,MODIFY_TIME,CREATE_TIME,CATEGORY2,COSIGNER_CODE2,EXT_RECD_CODE,COSIGN_CANDIDATECD,STATUS,SEQ_NO,COSIGNER_CODE,SIGNER_CODE2,RPTID,INCOMPLETE,WORK_IP,INSF_DOC_CODE,SIGN_TIME2,SIGNER_CODE,COMMON_CODE,DEPARTMENT,DOC_CODE,CODE,RECORD_TIME,NAME,RECORDTYPE,CHOS_NO,FILENAME,TEMPSAVE,DOC_VER,MODIFIER_CODE,PRINTED,SIGNLEVEL,SIGN_TIME';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getBitRecdData()
{
	tempXml=SendServerCall2('getBitRecdData',['pid'],[[pid]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='TREATNO,INFO,INDATE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getOPRecdData()
{
	tempXml=SendServerCall3('getOPRecdData',['pid'],[[pid]],'/EMR_DATA/CommonAjax.jsp',null);
	var rrtempXml = fn_makeArr(tempXml);
	return rrtempXml;
	/*tempXml=SendServerCall2('getOPRecdData',['pid'],[[pid]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CLINCODE,INFO,ORDERBY';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
	*/
}
function getDocRecdData(gubun,gubun2)
{
	tempXml=SendServerCall2('getDocRecdData',['pid','gubun','gubun2'],[[pid,gubun,gubun2]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='GUBUN,FORMCODE,DOCINFO,ORDERBY,SDECHECK';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getOPRecdDataDept(pid,dept,top)
{
	//if(parent.parent.ipaddress=="192.168.6.145")
	{
		tempXml=SendServerCall3('getOPRecdDataDept',['pid','dept','top'],[[pid,dept,top]],'/EMR_DATA/CommonAjax.jsp',null);
		var rrtempXml = fn_makeArr(tempXml);
		return rrtempXml;
	}
	/*else
	{
		tempXml=SendServerCall2('getOPRecdDataDept',['pid','dept'],[[pid,dept]],'/EMR_DATA/CommonAjax.jsp',null);
		var recdColList='CLINCODE,LEVEL2,INDATE,LEVEL3,ORDERBY,DOC_CODE,CODE,SEQ_NO,NAME,SDECHECK,MODIFY_TIME,TEMPSAVE,CHOS_NO';
		var xmlArray = fn_loadDataXml(tempXml,recdColList);
		return xmlArray;
	}
	*/
}
function getOPRecdDataDept2(dept,indate1,indate2)
{
	tempXml=SendServerCall3('getOPRecdDataDept2',['pid','dept','indate1','indate2'],[[pid,dept,indate1,indate2]],'/EMR_DATA/CommonAjax.jsp',null);
	var rrtempXml = fn_makeArr(tempXml);
	return rrtempXml;
	/*
	tempXml=SendServerCall2('getOPRecdDataDept2',['pid','dept','indate1','indate2'],[[pid,dept,indate1,indate2]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CLINCODE,LEVEL2,INDATE,LEVEL3,ORDERBY,DOC_CODE,CODE,SEQ_NO,NAME,SDECHECK,MODIFY_TIME,TEMPSAVE,CHOS_NO';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;*/
}
function getIDRecdDataDept(treatno)
{
	tempXml=SendServerCall2('getIDRecdDataDept',['pid','treatno'],[[pid,treatno]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='TREATNO,LEVEL2,ORDERBY,FORMCODE,SDECHECK';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getChosRecdData(gubun,doccode,sdeCheck)
{
	if(sdeCheck==1 || sdeCheck=='1')
		tempXml=SendServerCall2('getChosRecdSdeData',['pid','gubun','doccode'],[[pid,sdeCheck,doccode]],'/EMR_DATA/CommonAjax.jsp',null);
	else
		tempXml=SendServerCall2('getChosRecdData',['pid','gubun','doccode'],[[pid,gubun,doccode]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='TREATNO,FORMCODE,INFO,INDATE,CODE,SEQ_NO,NAME,SDECHECK,TEMPSAVE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getRecdDataDept(dept)
{
	tempXml=SendServerCall2('getRecdDataDept',['pid','dept'],[[pid,dept]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CREATOR_CODE,CATEGORY1,COSIGN_TIME2,PTID,COSIGN_TIME,CATEGORY3,MODIFY_TIME,CREATE_TIME,CATEGORY2,COSIGNER_CODE2,EXT_RECD_CODE,COSIGN_CANDIDATECD,STATUS,SEQ_NO,COSIGNER_CODE,SIGNER_CODE2,RPTID,INCOMPLETE,WORK_IP,INSF_DOC_CODE,SIGN_TIME2,SIGNER_CODE,COMMON_CODE,DEPARTMENT,DOC_CODE,CODE,RECORD_TIME,NAME,RECORDTYPE,CHOS_NO,FILENAME,TEMPSAVE,DOC_VER,MODIFIER_CODE,PRINTED,SIGNLEVEL,SIGN_TIME';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getDeptData(uDeptCd)
{
	tempXml=SendServerCall2('getDeptData',['dept'],[[uDeptCd]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='DEPTCODE,DEPTDPDS,POS';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getInDeptData(uDeptCd1,uDeptCd2,uDeptCd3)
{
	tempXml=SendServerCall2('getInDeptData',['dept1','dept2','dept3'],[[uDeptCd1,uDeptCd2,uDeptCd3]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='DEPTCODE,DEPTDPDS,POS';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getDeptDataSpecial(uDeptCd)
{
	tempXml=SendServerCall2('getDeptDataSpecial',['dept'],[[uDeptCd]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='DEPTCODE,DEPTDPDS,POS';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getCateData()
{
	tempXml=SendServerCall2('getCateData',['folder'],[['1']],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CODE,NAME,PID,POS';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getDocData(fsGubun)
{
	tempXml=SendServerCall2('getDocData',['folder','fsGubun'],[['0',fsGubun]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='CODE,NAME,PID,DOCTYPE,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5';
	//var recdColList='NAME,COMMON_CODE,PID,FOLDER,FILE_INPUT,DEPT_M,CATE1,CATE2,CATE3,DEPT_SORT,SEQ_NO,POS,POS,POS,POS,COSIGNLEVEL,CATEGORY1,,CATEGORY2,,CATEGORY3';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getBKUser()
{
	tempXml=SendServerCall2('getBKUser',['doctorId'],[[doctorId]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='등록번호,이름,담당과코드,연락처,구분';
	var c= new DataValueObj(); c.setXmlData(tempXml,recdColList); 
	var dataArr = c.value;
	return dataArr;
}
function getPatiInfo()
{
	tempXml=SendServerCall2('getPatiInfo',['pid'],[[pid]],'/EMR_DATA/CommonAjax.jsp',null);
	var recdColList='등록번호,이름,생년월일,성별,혈액형,키,몸무게,주민뒷자리,나이';
	var c= new DataValueObj(); c.setXmlData(tempXml,recdColList); 
	var dataArr = c.value;
	return dataArr;
}
function getRightRecd(queryName,recSeq,docCode)
{
	tempXml=SendServerCall2(queryName,['recSeq','docCode'],[[recSeq,docCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,CREATE_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME,MODIFY_TIME,RECORD_TIME,TEMPSAVE,PTID,DEPARTMENT,CHOS_NO,MODIFIER_CODE,SIGNLEVEL,PTNM,DOC_VER';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getScanImagePath(queryName,docCode,recSeq)
{
	if(docCode)
		tempXml=SendServerCall2(queryName,['pid','docCode','recSeq'],[[pid,docCode,recSeq]], '/EMR_DATA/CommonAjax.jsp', null);	
	else
		tempXml=SendServerCall2('getScanAllImagePath',['pid','recSeq'],[[pid,recSeq]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='PATID,INDATE,CLINCODE,CLASS,Image_Path,Image_Name,DOCNAME,TREATNO,OUTDATE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getClickedDocList(docCd)
{
	tempXml=SendServerCall2('getClickedDocList',['docCd'],[[docCd]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,NAME,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,COMMON_CODE,FILE_DOCU,CATEGORY1,CATEGORY2,CATEGORY3,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,VERSION';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function getClickedDocVer(docCd,version)
{
	tempXml=SendServerCall2('getClickedDocVer',['docCd','version'],[[docCd,version]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,NAME,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,COMMON_CODE,FILE_DOCU,CATEGORY1,CATEGORY2,CATEGORY3,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5,VERSION';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function getHwanjaInfo2(pid,medDate,deptCd)
{
	tempXml=SendServerCall2('getHwanjaInfo2',['pid','medDate','dept'],[[pid,medDate,deptCd]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='otptidno,ptbsname,jumin,age,sex,ptbshpno,userpidn,otptdate,otptdept,birthdate';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function getPastRecd(docCode)
{
	tempXml=SendServerCall2('getPastRecd',['pid','docCode'],[[pid,docCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='FILENAME';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function getModifyList(docCode,recCode)
{
	tempXml=SendServerCall2('getModifyList',['pid','docCode','recCode'],[[pid,docCode,recCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='NAME,MODIFY_TIME,USERNAME,TEMPSAVE,SEQ_NO';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function getUserName(usrId,usrDept)
{
	tempXml=SendServerCall2('getUserName',['usrId','usrDept'],[[usrId,usrDept]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='USERNAME,USERFRDT,USERTODT,USERDEPT,USERCSKW';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function updateBerdmprvt(doctorId,uDeptCd,fstDocuId,sndDocuId,gubun,chartCheck)
{
	tempXml=SendServerCall2('updateBerdmprvt',['doctorId','uDeptCd','fstDocuId','sndDocuId','gubun','chartCheck'],[[doctorId,uDeptCd,fstDocuId,sndDocuId,gubun,chartCheck]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;	
}
function insertBerdmprvt(doctorId,uDeptCd,fstDocuId,sndDocuId,gubun)
{
	tempXml=SendServerCall2('insertBerdmprvt',['doctorId','uDeptCd','fstDocuId','sndDocuId','gubun'],[[doctorId,uDeptCd,fstDocuId,sndDocuId,gubun]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;	
}
function selectBerdmprvtAll(doctorId,uDeptCd,doctorId2)
{
	tempXml=SendServerCall2('selectBerdmprvtAll',['uDeptCd','doctorId','doctorId2'],[[uDeptCd,doctorId,doctorId2]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='DOCTOR_ID,DIVISION_ID,FST_DOC_ID,FST_NM,SND_DOC_ID,SND_NM,GUBUN,MONITOR';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;	
}
function insertBeramlogu(type,doctorId,uDeptCd,docCode,pid,recCode,commentCd,comment,ipaddress)
{
	var getToday = GetDateString();
	tempXml=SendServerCall2('insertBeramlogu',['type','doctorId','uDeptCd','docCode','pid','recCode','getToday','commentCd','comment','ipaddress'],[[type,doctorId,uDeptCd,docCode,pid,recCode,getToday,commentCd,comment,ipaddress]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;	
}
function selectBeramlogc(userPid, serialNo, userDn)
{
	tempXml=SendServerCall2('selectBeramlogc',['userPid','serialNo','userDn'],[[userPid,serialNo,userDn]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function insertBeramlogc(userPid, serialNo, userDn, certData)
{
	tempXml=SendServerCall2('insertBeramlogc',['userPid','serialNo','userDn','certData'],[[userPid,serialNo,userDn,certData]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function checkLimitPid(medDate)
{
	tempXml=SendServerCall2('checkLimitPid',['pid','medDate'],[[pid,medDate]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='SEQ_NO,DEPTCODE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function checkLimitUser(mSeqNo,doctorId)
{
	tempXml=SendServerCall2('checkLimitUser',['mSeqNo','doctorId'],[[mSeqNo,doctorId]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='USERID';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function deleteRecd(recCode)
{
	tempXml=SendServerCall2('deleteRecd',['recCode','pid'],[[recCode,pid]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function checkNpPrt(doctorId,type)
{
	tempXml=SendServerCall2('checkNpPrt',['doctorId','type'],[[doctorId,type]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='USERID,startdate,enddate';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function checkPrint(recCode)
{
	tempXml=SendServerCall2('checkPrint',['recCode'],[[recCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='PRINTED,CDATE,USE_DATA';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function insertBermprint(pid,gubun,doctorId,recCode,chosNo,cDate,prtYn,prtNum,commentCode,commentValue,pName,docCode,dept,hSeq,pageCnt)
{
	tempXml=SendServerCall2('insertBermprint',['pid','gubun','doctorId','recCode','chosNo','cDate','prtYn','prtNum','commentCode','commentValue','pName','docCode','dept','hSeq','pageCnt'],[[pid,gubun,doctorId,recCode,chosNo,cDate,prtYn,prtNum,commentCode,commentValue,pName,docCode,dept,hSeq,pageCnt]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;	
}
function staffCheck(dept)
{
	tempXml=SendServerCall2('staffCheck',['dept'],[[dept]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='USERPIDN';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
}
function getHistorySeq(pid,recCode,docCode)
{
	tempXml=SendServerCall2('getHistorySeq',['pid','recCode','docCode'],[[pid,recCode,docCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='SEQ_NO';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function getOcsPtNm(pid)
{
	tempXml=SendServerCall2('getOcsPtNm',['pid'],[[pid]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='ptbsname';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function getDeptInfo(dept)
{
	tempXml=SendServerCall2('getDeptInfo',['dept'],[[dept]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='DEPTPAFG,DEPTDPDS';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function firstRecCheck(pid,docCode,chosNo)
{
	tempXml=SendServerCall2('firstRecCheck',['pid','docCode','chosNo'],[[pid,docCode,chosNo]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,TEMPSAVE,MODIFIER_CODE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function RecDataCheck(pid,chosNo)
{
	tempXml=SendServerCall2('RecDataCheck',['pid','chosNo'],[[pid,chosNo]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,TEMPSAVE,MODIFIER_CODE,DOC_CODE,DOCNM';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function getHwanjaInfo3(pid)
{
	
	tempXml=SendServerCall3('getHwanjaInfo3',['pid'],[[pid]], '/EMR_DATA/CommonAjax.jsp', null);	
	var rrtempXml = fn_makeArr(tempXml);
	return rrtempXml;
	/*
	tempXml=SendServerCall2('getHwanjaInfo3',['pid'],[[pid]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='ptbsidno,ptbsname,jumin';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray;
	*/
}
function selectPrintCheck(pid,createDate,doctorId,useCd,recCode)
{
	tempXml=SendServerCall2('selectPrintCheck',['pid','createDate','doctorId','useCd','recCode'],[[pid,createDate,doctorId,useCd,recCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CNT';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function updateBermprint(pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt)
{
	tempXml=SendServerCall2('updateBermprint',['pid','createDate','doctorId','prtNum','commentCode','commentValue','recCode','recSeq','pageCnt'],[[pid,createDate,doctorId,prtNum,commentCode,commentValue,recCode,recSeq,pageCnt]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function updateConfirmSaveMrecd(recdCode,sinerCheck,doctorId,ipaddress)
{
	tempXml=SendServerCall2('updateConfirmSaveMrecd',['recdCode','sinerCheck','doctorId','ipaddress'],[[recdCode,sinerCheck,doctorId,ipaddress]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function insertConfirmSaveHrecd(recdCode)
{
	tempXml=SendServerCall2('insertConfirmSaveHrecd',['recdCode'],[[recdCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function updateConfirmSaveHrecd(recdCode,sinerCheck,doctorId,ipaddress)
{
	tempXml=SendServerCall2('updateConfirmSaveHrecd',['recdCode','sinerCheck','doctorId','ipaddress'],[[recdCode,sinerCheck,doctorId,ipaddress]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function checkBeramrecd(recCode)
{
	tempXml=SendServerCall2('checkBeramrecd',['recCode'],[[recCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='PTID,CHOS_NO,CODE,DEPARTMENT,RECORD_TIME,STATUS,MODIFIER_CODE,MODIFY_TIME,CAUSE,REGISTRANT,REGISTRATION_DATE';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}
function insertBeramrecd(ptid,chosNo,recCode,department,recTime,status,doctorId,cause)
{
	tempXml=SendServerCall2('insertBeramrecd',['ptid','chosNo','recCode','department','recTime','status','doctorId','cause'],[[ptid,chosNo,recCode,department,recTime,status,doctorId,cause]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function updateBeramrecd(ptid,chosNo,recCode,department,recTime,status,doctorId)
{
	tempXml=SendServerCall2('updateBeramrecd',['ptid','chosNo','recCode','department','recTime','status','doctorId'],[[ptid,chosNo,recCode,department,recTime,status,doctorId]], '/EMR_DATA/CommonAjax.jsp', null);	
	return tempXml;
}
function getPedigreeRecd(ptid,docCode)
{
	tempXml=SendServerCall2('getPedigreeRecd',['ptid','docCode'],[[ptid,docCode]], '/EMR_DATA/CommonAjax.jsp', null);	
	var recdColList='CODE,CREATE_TIME,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME,MODIFY_TIME,RECORD_TIME,TEMPSAVE,PTID,DEPARTMENT,CHOS_NO,MODIFIER_CODE,SIGNLEVEL,PTNM,DOC_VER';
	var xmlArray = fn_loadDataXml(tempXml,recdColList);
	return xmlArray[0];
}