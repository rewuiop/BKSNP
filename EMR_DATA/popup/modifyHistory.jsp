<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
System.out.println("[modifyHistory.jsp] 수정이력화면");
String pid = request.getParameter("pid");
String docCode = request.getParameter("docCode");
String recCode = request.getParameter("recCode");

System.out.println("pid : " + pid);
System.out.println("docCode : " + docCode);
System.out.println("recCode : " + recCode);
%>
<HTML>
<HEAD>
	<TITLE>수정이력화면</TITLE>
	<meta http-equiv="X-UA-Compatible" content="IE=9" />	
</HEAD>
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
<SCRIPT src='/EMR_DATA/SDK/BK_SDK.js'></SCRIPT>
<SCRIPT>
	var pid = "<%=pid%>";
	var docCode = "<%=docCode%>";
	var recCode = "<%=recCode%>";
	var recListArr;
	var imgList= "";
	var retArr="";

	function showRecView(no)
	{
		window.showModelessDialog(SERVERADDR+"/EMR_DATA/right_content.jsp?viewType=4&recIdx=0&recIdno="+recCode+"&docCode="+docCode+"&recSeq="+recListArr[no][4]+"&pid="+pid,
	'popup','dialogWidth=820px; dialogHeight=1000px; center:yes; scroll=no; resizable=no; status:no; help:no; dialogHide:yes;');
	}
	
	function init()
	{
			recListArr = getModifyList(docCode,recCode);
			var recXml = "<TABLE class='searchWrap' style='width:500px;'><TBODY><TR style='background:darkgray'><TH>순서</TH><TH>서식명</TH><TH>기록수정시간</TH><TH>수정자</TH><TH>인증저장여부</TH></TR>";
			for(var i=0;i<recListArr.length;i++)
				recXml +="<TR style='text-align:center' onclick='showRecView("+i+");'><TD>"+(i+1)+"</TD><TD>"+recListArr[i][0]+"</TD><TD>"+recListArr[i][1]+"</TD><TD>"+recListArr[i][2]+"</TD><TD>"+recListArr[i][3]+"</TD></TR>";
			
			GetObj('recList').innerHTML=recXml+"</TBODY></TABLE>";
			
			/*
			var listTable = GetObj('recList');
			listTable.style.textAlign='center';
			var rows = listTable.getElementsByTagName("tr").length;
			var newRow="";
			var newCell="";
			var newText="";
			
			for(var i=0;i<recListArr.length;i++)
			{
				newRow = document.createElement("tr"); 
				newRow.id=i;
				//newRow.style.height="20px";
				for(var j =0;j<recListArr[i].length-1;j++)
				{
					newCell = document.createElement("td");
					if(j==0)
					{
						newCell = document.createElement("td");
						newCell.innerHTML = i+1;
						newRow.appendChild(newCell);
					}
					newCell = document.createElement("td");
					newCell.innerHTML = recListArr[i][j];
					newRow.appendChild(newCell);
				}
				listTable.appendChild(newRow);
				newRow.onclick = function(i)
				{
					showRecView(this.id);
				};
				//SetEventFunc(i,'onclick',showRecView(i));
				//newRow.addEventListener("click",showRecView(newRow.id),false);
			}*/
	}


</SCRIPT>
<BODY onload='init()'>
	<DIV id='recList'></DIV>
	<!--TABLE id='recList' class='searchWrap' style='width:500px;'-->
		<!--TR style='background:darkgray'><TH>순서</TH><TH>서식명</TH><TH>기록수정시간</TH><TH>수정자</TH><TH>인증저장여부</TH></TR-->
	<!--/TABLE-->
</BODY>
</HTML>