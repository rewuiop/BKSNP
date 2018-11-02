<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="X-UA-Compatible" content="IE=9;" />
<title></title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid_dhx_skyblue.css">
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxcalendar.css">
<script  src="/EMR_DATA/dhtmlx/util.js"></script>
<script  src="/EMR_DATA/dhtmlx/dhtmlxcommon.js"></script>
<script  src="/EMR_DATA/dhtmlx/dhtmlxgrid.js"></script>        
<script  src="/EMR_DATA/dhtmlx/dhtmlxgridcell.js"></script>    
<script  src="/EMR_DATA/dhtmlx/dhtmlxcalendar.js"></script>    
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid_dhx_black.css">
<script src="/EMR_DATA/script/util.js"></script>

<script type="text/javascript">
var url =parent.document.location.href;
url= url.split("?");

var splitdatas = url[1].split("&");

function changeSRC(recIdno,docCode,recSeq,pid,deptCd){
	var rightsrc ="/EMR_DATA/right_content.jsp?";
	rightsrc += "viewType=1&recIdx=0";
	rightsrc += "&recIdno=" + recIdno;
	rightsrc += "&docCode=" + docCode;
	rightsrc += "&recSeq=" + recSeq;
	rightsrc += "&pid=" + pid;
	rightsrc += "&doctorId=" + splitdatas[0].split("=")[1];
	rightsrc += "&deptCd=" + deptCd;
	rightsrc += "&checkReason=1"; //0 = 사본발급 , 1= 미비관리
	//EMR_DATA/right_content.jsp?viewType=1&recIdx=0&recIdno='$기록지코드'&docCode='$서식지코드'&recSeq='$기록SEQ_NO'&pid='$환자아이디'&doctorId='$의사아이디'&deptCd='$환자진료부서코드'
	
	document.getElementById('conBody1').src=rightsrc;
}

function onInit(){
	
	var leftsrc = "/EMR_DATA/incom/incom_left.jsp?userid="+splitdatas[0].split("=")[1]+"&currdept="+splitdatas[1].split("=")[1];
	
	document.getElementById('prof_no').innerText = splitdatas[0].split("=")[1];
	document.getElementById('conBody').src = leftsrc;
	IncomList();
}


function IncomList() {

	var url = '/EMR_DATA/incomlist';
	var cmd = 'initleft';
	var postData = "cmd="+cmd + "&userid="+splitdatas[0].split("=")[1] + "&currdept="+splitdatas[1].split("=")[1];
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : initleft 정보 조회 실패");
	}
	if(retDataArr[0] == "ERROR") {
		alert("ERROR : " + retDataArr[1]);
		return;
	}
	if(retDataArr[0] == "SUCCESS") {
		retArr = MakeDataArray(retDataArr[1]);
		if(!retArr || retArr.length < 2)
			return;
		
	}
	document.getElementById('doctor_name').innerText = retArr[1][0][0];
	document.getElementById('dept_name').innerText = retArr[1][0][1];
		
}

function MakeDataArray(dataStr) {
	if(!dataStr)
		return;
	
	var colArr = new Array();
	var dataArr = new Array();
	var totDataArr = dataStr.split("◈");
	for(var i=0; i<totDataArr.length; i++) {
		if(i == 0) {
			colArr = totDataArr[i].split("◇").splice(0);
			continue;
		}
		dataArr[dataArr.length] = totDataArr[i].split("◇").splice(0);
	}
	return [colArr, dataArr];
}

</script>


</head>
<body onload="onInit()">

<table width="800" class="searchWrap" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>
<td>
	<table border="0" cellSpacing="0" cellPadding="0">
	<tbody><tr>
	<td width="5"></td>
	<td>&nbsp;사번 : &nbsp;</td>
	<td id ='prof_no'></td>
	<td>&nbsp;&nbsp;&nbsp;이름 : </td>
	<td id ='doctor_name'> &nbsp; </td>
	<td>&nbsp;&nbsp;&nbsp; 소속부서 : </td>
	<td id ='dept_name'> &nbsp; </td>
	
	</tr>
    </tbody></table>
    </td></tr> 
    
    
    
    <table border="0" cellSpacing="0" cellPadding="0" width="1300px">
    <tr>
    <td width="35%">
    	<iframe name="conBody" width="100%" height="800" id="conBody" src="" frameBorder="0" scrolling="no"></iframe>
    </td>
    <td  width="100%">
    	<iframe name="conBody1" width="100%" height="800" id="conBody1" src="" frameBorder="0" scrolling="yes"></iframe>
    </td>
    </tr>
    </table>
    
    <!-- 
    <frameset cols="210,*">
		<frame name="left" id="t1" src="/incom_left.jsp" frameBorder="no" marginHeight="0" style="background: rgb(68, 68, 68); padding: 5px; border: currentColor; height: 100%; margin-right: 5px;">
		</frame>
		<frame name="right" id="t2" src="/incom_docu.jsp" frameBorder="no" marginHeight="0" style="background: rgb(68, 68, 68); padding: 5px; border: currentColor; height: 100%;">
		</frame>
    </frameset> -->
    
</tbody></table>







</body>
</html>