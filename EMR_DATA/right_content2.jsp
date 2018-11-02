<!DOCTYPE html>
<%@ page import="java.sql.*" %>
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script>

<%
	String viewType = request.getParameter("viewType"); //서식,기록,기타
	String docCode=request.getParameter("docCode");
	String doctorId=request.getParameter("doctorId");
	String deptCd=request.getParameter("deptCd");
	String pid=request.getParameter("pid");
	String uDeptCd=request.getParameter("uDeptCd");
	String recIdno=request.getParameter("recIdno");
	
	
	String icons="";
	


	if(0==viewType.compareTo("0"))//서식
	{
		icons +="<img src='/EMR_DATA/images/js_butt_24_save.png' id='btn_doc_temp_save'  alt='임시저장' title='임시저장' onclick='onDocTempSave()'>";
		
	}
	else if(0==viewType.compareTo("2"))//수정
	{
		icons +="<img src='images/js_butt_24_save.png' id='btn_rec_temp_save' alt='임시저장' title='임시저장' onclick='onRecTempSave()'>";
	}
	icons +="   <img style='vertical-align:top;padding-top:1px;' src='images/btn_past.gif' id='btn_past' onmouseover=this.src='images/btn_past.gif' onmouseout=this.src='images/btn_past.gif' alt='과거이력' title='과거이력'>";
%>

<html>
	<head><title>실제 CONTENT 영역</title>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<meta http-equiv="X-UA-Compatible" content="IE=9;" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link href='css/new_style.css' type='text/css' rel='stylesheet'/></head>		
<script>
	var ptName = "테스트";
	var sinerCheck = "";
	var doctorId='<%=doctorId%>';
	
	var BK_USER = getUserName(doctorId,'');
	
 	var viewType='<%=viewType%>';
	var recIdno ='<%=recIdno%>';
	var recInfo;
	var x1;
	var xx1;
	var tabData;
	var ipaddress='<%=request.getRemoteAddr()%>';
	var modifyFlag = false;
	var no = 0;
	
	function timeFunction()
	{
		tabData=x1.GetTabInfo();			
			
		if(tabData==null)
			return;
		
		var strHtml = "<table><tr>";
		for(var i=0; i<tabData.length; i++)
		{
			strHtml += "<td><input id='btTab"+i+"' type='button' value='"+tabData[i][1]+"' onclick='x1.ExcuteMenu(tabData["+i+"][0],tabData["+i+"][5])'></td>";
		}
		strHtml +="</tr></table>";		
			
		GetObj('tabArea').innerHTML=strHtml;
	}
	
	function second()
	{
		if(viewType == 0) //기록작성
		{
			SetEventFunc('btn_doc_temp_save','onclick',onDocTempSave);//임시저장
		}
		else if(viewType == 2) //기록수정
		{
			SetEventFunc('btn_rec_temp_save', 'onclick',onRecTempSave);  //기록임시저장 		
		}
		SetEventFunc('btn_past', 'onclick',onRecPastHistory);  //기록과거이력조회
		//setTimeout(timeFunction, 1000);		
	}
	  
	var today = GetDate();
	var todayNum = GetDateNum();
	var modiMode=0;
	
	var userIdno;
	var deptCd='<%=deptCd%>';
	var pid='<%=pid%>';
	var uDeptCd = '<%=uDeptCd%>';
	var docCode='<%=docCode%>';
	var ONE_DOC_DATA="";
	var ONE_REC_DATA="";
	var rec;
	var doc;
	var showScanView = null;
	arrTypeVar = parent.parent.arrTypeVar;
	var chosType = "";
	var returnData = "";
	
function callLimitRecd(type,checkDoc,checkRec)
{
	var strUrl = "";
	var popHeight = "";
	var popWidth = "800";
	if(type==0)
	{
		
		strUrl = "/EMR_DATA/popup/limitReadPop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='395';
		//popHeight = (window.screen.height-280)/2;
		//popWidth='540';
	}
	else if(type==1)
	{
		strUrl = "/EMR_DATA/popup/limitModifyPop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='350';
		//popHeight = (window.screen.height-440)/2;
		//popWidth='540';
	}
	else if(type==2)
	{
		strUrl = "/EMR_DATA/popup/limitDeletePop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='305';
		//popHeight = (window.screen.height-445)/2;
		//popWidth='540';
	}
	else if(type==3)
	{
		strUrl = "/EMR_DATA/popup/printLimitModifyPop.jsp";
		popHeight='250';
		//popHeight = (window.screen.height-560)/2;
		//popWidth='250';
	}
	var returnVal=window.showModalDialog(strUrl, '', 'dialogWidth:600px;dialogHeight:'+popHeight+'px;resizable:no;status:0;menubar:0;scroll:0');
	//var returnVal=window.showModalDialog(strUrl, '', 'dialogWidth:100%;dialogHeight:100%;resizable:no;status:0;menubar:0;scroll:0');
	//var returnVal=window.showModalDialog(strUrl, '', 'resizable:no;status:0;menubar:0;scroll:0');
	
	if(type==0)
	{
		//insertBeramlogu(type,doctorId,uDeptCd,checkDoc,pid,checkRec,arr[0],arr[1],ipaddress);
		return returnVal;
	}
	/*
	else if(type==1 || type==2)
	{
		if(returnVal!="TRUE")
		{
			return 'false';
		}
	}*/
	else
	{
		return returnVal;
	}
}


function init()
{
	ONE_DOC_DATA = getClickedDocList(docCode);
	
	var obj = GetObj('contentArea');
	x1 = new DocumentObj();
	
		x1.doc =ONE_DOC_DATA[0];// parent.getDocData();
		doc = ONE_DOC_DATA[0];//parent.getDocData();
	
		x1.obj = obj;
		x1.iframe = 'contentframe'+no;
	
		if(viewType == 0 )//작성
		{
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>신규작성</b>";
			x1.param = [pid,doctorId,x1.doc[0],'',deptCd,x1.doc[10],x1.doc[11],x1.doc[12],chosType,pid+deptCd,'0','','','',sinerCheck,'',ptName,'',,x1.doc[18]]; //서식 최초 조회시 recCode:0
			
			x1.OpenDocument(0);			
		}
		/*
		else if(viewType == 1 || viewType == 3 || viewType == 4)//조회
		{
			document.getElementById('documentInfo').innerHTML="최종작성일시 "+x1.rec[6];
			document.getElementById('documentInfo2').innerHTML="최초작성일시 "+x1.rec[1];
				
			x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+x1.rec[5],x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[13],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[7],x1.doc[18]];
			x1.OpenDocument(2);
			
		}*/
		else if(viewType == 2)//수정 
		{
			ONE_REC_DATA = getRightRecd("getRightRecd",recIdno,docCode);
			x1.rec =ONE_REC_DATA[0];// parent.getRecData();
			rec = ONE_REC_DATA[0];
			if(x1.rec!=undefined && x1.rec[15])
			{
				ONE_DOC_DATA = getClickedDocVer(docCode,x1.rec[15]);
				x1.doc =ONE_DOC_DATA[0];
				doc = ONE_DOC_DATA[0];
			}
			
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>기록 수정<b>";
			
			x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+x1.rec[5],x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[13],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',,x1.doc[18]];
			x1.OpenDocument(1);
			
			modiMode=1;
		}
		
			second();
}



//********************************************서식 임시/인증 저장 ***************************************************** */



function onDocTempSave() //서식임시저장
{
	var recCode=x1.SaveDocTemp(); //기록코드 받아서
	recCode=recCode.split('^');
	
	if(recCode[0] != "" && recCode[0] != null && recCode[0] != '0')
	{
		modifyFlag = false;
		var a = SendServerCall('getRecentRec', ['recCode'], [[recCode[0]]], "/EMR_DATA/updateData.jsp", null); //ajax로 새로 저장된 최근기록 가져오기
	
		var newRec=new Array();
		 newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"),
		  a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		  a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		  a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		  a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		  a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		  a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 
		 
	 	x1.rec=newRec;
	 	//새 기록 배열 데이터
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var title=a.getKeyValue(0,0,"NAME");		
		
		x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.doc[18]];
		
	var onOff='';	
		
	if(no==0)
	{
			onOff='r_first';
	}
	 else if(no!=0)
	{
			onOff='r';
	}
	
		document.getElementById('documentInfo').innerHTML="최종작성일시 "+a.getKeyValue(0,0,"MODIFY_TIME");
		document.getElementById('documentInfo2').innerHTML="최초작성일시 "+a.getKeyValue(0,0,"CREATE_TIME");
		document.getElementById('docuIcon').innerHTML=	"<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='기록수정' title='기록수정' >";
																						
		x1.OpenDocument(2);	
		
		alert("임시저장이 완료되었습니다.");
	}
}


//********************************************기록 임시/인증 저장 ***************************************************** */



function onRecTempSave() //기록임시저장 -화면에반영//트리에 반영
{
	if(modiMode==1)
	{
		insertBeramlogu('1',doctorId,uDeptCd,docCode,pid,x1.rec[0],'6','임시저장된 기록 다시 임시저장',ipaddress);
		var recCode=x1.SaveDocTemp();	
		recCode=recCode.split('^');
		
		modifyFlag = false;
		
		var a=SendServerCall('getRecentRec', ['recCode'],[[recCode[0]]],"/EMR_DATA/updateData.jsp",null);
		
		var newRec=new Array();
		newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"NAME"), a.getKeyValue(0,0,"COMMON_CODE"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"), 
		a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		x1.rec=newRec;
		
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var moditime=a.getKeyValue(0,0,"MODIFY_TIME"); 
		var title=a.getKeyValue(0,0,"NAME");		
		
		x1.param=[pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.rec[28]];
		
		document.getElementById('contentArea').innerHTML="";
		document.getElementById('documentInfo').innerHTML="최종작성일시 "+moditime;
		document.getElementById('documentInfo2').innerHTML="최초작성일시 "+a.getKeyValue(0,0,"CREATE_TIME");
		document.getElementById('docuIcon').innerHTML="";
		document.getElementById('docuIcon').innerHTML= "<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='기록수정' title='기록수정' >"
																					 +"<img style='vertical-align:top;padding-top:1px;' src='images/btn_past.gif' id='btn_past' onmouseover=this.src='images/btn_past.gif' onmouseout=this.src='images/btn_past.gif' alt='과거이력' title='과거이력'>";
	
		x1.OpenDocument(2);				
		modiMode=0;
		alert("임시저장이 완료되었습니다.");
		SetEventFunc('btn_past', 'onclick',onRecPastHistory);  //기록과거이력조회
		
	}
}

function onRecPastHistory()
{
	window.showModalDialog(SERVERADDR+"/EMR_DATA/popup/modifyHistory.jsp?pid="+pid+"&docCode="+x1.param[2]+"&recCode="+x1.param[10],
	'popup','dialogWidth=520px; dialogHeight=550px; center:yes; scroll=yes; resizable=no; status:no; help:no; dialogHide:yes;');
}

var nowTitle = "";
function ModifyRecord(pastData)
{
		var a = SendServerCall('getRecentRec', ['recCode'], [[x1.rec[0]]], "/EMR_DATA/updateData.jsp", null); //ajax로 새로 저장된 최근기록 가져오기
	
		var newRec=new Array();
		 newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"),
		  a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		  a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		  a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		  a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		  a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		  a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 
		 
	 	x1.rec=newRec;
	 	//새 기록 배열 데이터
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var title=a.getKeyValue(0,0,"NAME");		
		
		x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.doc[18]];
		
			document.getElementById('contentArea').innerHTML="";
			document.getElementById('documentInfo').innerHTML="";
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>기록 수정<b>";
			document.getElementById('documentInfo2').innerHTML="";
			document.getElementById('docuIcon').innerHTML=" ";
			document.getElementById('docuIcon').innerHTML="<img src='images/js_butt_24_save.png' id='btn_rec_temp_save'  alt='임시저장' title='임시저장' onclick='onRecTempSave()'>";
															
			x1.OpenDocument(1);
			viewType=5;	
		
			
			modiMode=1;
}

function unSavedDoc()
{
	if(modifyFlag) {
		url = "/EMR_DATA/popup/unSavedDoc.jsp?status=1";
		var returnVal = window.showModalDialog(url, '', 'dialogWidth:290px;dialogHeight:150px;resizable:no;status:0;menubar:0;scroll:0');

		if(returnVal == 0) {
			if(viewType == 0)
				onDocTempSave();
			else
				onRecTempSave();		
		}
		else {
			alert("취소되었습니다.");
		}
		modifyFlag = false;
	}

}
</script>

	<body onload="init();" onunload="unSavedDoc();" >
	<object id='bkPrint' classid='clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945'  width="0" height="0" onloadstart="" style="position:absolute;left:15;border='solid 0px #000000;'"></object>
		<table width='100%' height='100%'>
			<table width='100%'>                                                                                         
				<tr style='padding:0px; ' bgcolor='#ffffff' id='btnArea'><td  height='40px' class='r_info' ><table width='100%' ><tr><td align='left' id='docuIcon'><%=icons%></td><td id='blankTd'  float='left' width='100px'><td id='documentInfo'  float='left' style='font-size:12px;'></td></td><td id='documentInfo2'  float='right' style='font-size:12px;'></td></tr></table></td></tr></table>
				<table width='99%'  bgcolor='#ffffff'  id='btnArea2'><tr><td><div id='tabArea' style='display:none'></div></td></tr></table>
				<tr height="100%"><td bgcolor='#ffffff'>
					<div id='contentArea' style='background-color:white;position:fixed;width:99%;height:100%'>
					</div></td></tr>
				
		</table>
	</body>
</html>

