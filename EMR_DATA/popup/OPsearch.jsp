
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<% String  patid = request.getParameter("patid"); %>   
<% String  dept = request.getParameter("dept"); %>   
<%@ page import="hyumc.oplistsearch" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML Transitional//EN">
<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=EUC-KR">
 <meta http-equiv="X-UA-Compatible" content="IE=9;" />
  <title>수술정보조회</title> 
  <link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
  <link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid.css">
  <link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid_dhx_black.css">
  <script  src="/EMR_DATA/dhtmlx/util.js"></script>
  <script  src="/EMR_DATA/dhtmlx/dhtmlxcommon.js"></script>
  <script  src="/EMR_DATA/dhtmlx/dhtmlxgrid.js"></script>        
  <script  src="/EMR_DATA/dhtmlx/dhtmlxgridcell.js"></script>    
  <script  src="/EMR_DATA/dhtmlx/dhtmlxcalendar.js"></script>    
  <script src="/EMR_DATA/script/util.js"></script>
  <script src='/EMR_DATA/SDK/BK_SDK.js'></script>
  <script type="text/javascript">
  
  var retData = "";
  var patid = '<%=patid%>';
  var dept='<%=dept%>';
  var retArr ="";
  function OnInit(){
	  Search_op();
  }
  function Search_op(){
	  
	  alert("Search_op");
	  
	  oplist();
	  
	  var docGrid = new dhtmlXGridObject('doc_list');
	  docGrid.setImagePath("/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/");
	  docGrid.setHeader("선택,수술일자,수술과,수술명,집도의,마취구분",null,["text-align:center;","text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center"]);
	  docGrid.setInitWidths("40,80,50,300,150,100");
	  docGrid.setColAlign("center,center,center,center,center,center");
	  docGrid.setColTypes("ch,ro,ro,ro,ro,ro");
	  docGrid.setColSorting("str,str,str,str,str,str");
	  
	  docGrid.setSkin("dhx_black");
	  docGrid.init();
	  var xObj=getXmlObject(GetDocXml());
	  docGrid.parse(xObj);
		docGrid.attachEvent("onHeaderClick", function(ind,obj){});

	  
  }
  
  function GetDocXml()
  {
  	var ret="<?xml version='1.0' encoding='EUC-KR'?>";
  	if(retArr==null)
  		return ret;
  	var x1=retArr[1].length;
  	var x2;
  	ret += "<rows>";
  	for(x2=0;x2<x1;x2++)
  	{
  		ret += "<row id='"+x2+"'>"
  		+"<cell></cell>"
  			+"<cell>"+fn_rpls4x(retArr[1][x2][0])+"</cell>"
  			+"<cell>"+fn_rpls4x(retArr[1][x2][1])+"</cell>"
  			+"<cell>"+fn_rpls4x(retArr[1][x2][2])+"</cell>"
  			+"<cell>"+fn_rpls4x(retArr[1][x2][3])+"</cell>"
  			+"<cell>"+fn_rpls4x(retArr[1][x2][4])+"</cell>"
  			
  			+ "</row>";
  	}
  	ret += "</rows>";
  	return ret;
  }  

  function oplist(){
/* 	  var url = '/hyumc/oplistsearch';
	  var cmd = 'oplist'; */
		var url = '/EMR_DATA/oplistsearch'; ///hyumc/oplistsearch    --/hyumc/oplisttest.jsp
		var cmd = 'oplistsearch';
	 /*  oplistsearch opsearch= new oplistsearch(); */
	 var postData =  "cmd="+cmd + "&patid="+patid + "&dept=" + dept
/*       var postData = "cmd="+cmd + "&patid="+splitdatas[0].split("=")[1] + "&dept="+splitdatas[1].split("=")[1]; */
      var retData = GetAjaxData(url, postData);
	  var retDataArr = retData.split("◎");
	  
 		if(retDataArr.length != 2) {
 			alert("ERROR : oplist 정보 조회 실패");
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
  }

  function return_value(){
	    alert("dsfsdfsdf");
	    var agent = navigator.userAgent.toLowerCase();
		var retVal = new Array();
		var idStr = 'null';
		var id = idStr.split('/');
		retData = "하승현/TEST/TEST/TESTTESTTEST"
		if(retData != "")
			retData += "\n";
	    
		data ="ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
		retData += data;
		retVal[0] = ["상용구", retData];
		if(agent.indexOf("chrome") != -1 || agent.indexOf("Firefox") != -1 || agent.indexOf("Safari") != -1 || agent.indexOf("Opera") != -1) {
			opener.CB_CallPopupWinFunc(retVal, id);
		}else {
			window.returnValue=retVal;
		}
		
		window.close();
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
<style>
.containerTableStyle
{
	top: 0px;
	overflow: auto;
	font-size: 12px;
	position: relative;
}
.standartTreeRow
{
	font-family: 맑은고딕;
	font-size: 12px;
}
.standartTreeImage
{
	width: 18px;
	height: 18px;
	overflow: hidden;
	padding-top: 0px;
	padding-right: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	font-size: 1px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	margin-left: 0px;
	border-top-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 0px;
	border-left-width: 0px;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
}
.hiddenRow
{
	width: 1px;
	overflow: hidden;
}
.dhxtree_dhx_skyblue
{
	color: black;
	background-image: none;
	background-attachment: scroll;
	background-repeat: repeat;
	background-position-x: 0%;
	background-position-y: 0%;
	background-color: white;
}
* HTML .dhxtree_dhx_skyblue .standartTreeRow
{
	border-right-color: red;
	border-left-color: red;
	border-right-width: 0px;
	border-left-width: 0px;
	border-right-style: solid;
	border-left-style: solid;
}
* HTML .dhxtree_dhx_skyblue SPAN.standartTreeRow
{
	margin-left: 1px;
}
BODY
{
	width: 100%;
	color: #181818;
	font-family: Verdana, dotum;
	font-size: 11px;
	margin-top: 0px;
	margin-right: auto;
	margin-bottom: 0px;
	margin-left: auto;
	background-image: none;
	background-attachment: scroll;
	background-repeat: repeat;
	background-position-x: 0%;
	background-position-y: 0%;
	background-origin: padding-box;
	background-clip: border-box;
	background-color: rgb(255, 255, 255);
}
IMG
{
	vertical-align: middle;
	border-top-width: medium;
	border-right-width: medium;
	border-bottom-width: medium;
	border-left-width: medium;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
}
INPUT
{
	color: #181818;
}
TEXTAREA
{
	color: #181818;
}
div.gridbox
{
	text-align: left;
	overflow: hidden;
}
div.gridbox .xhdr
{
	background-color: rgb(212, 208, 200);
}
div.gridbox table.hdr td
{
	text-align: center;
	line-height: normal;
	overflow: hidden;
	padding-top: 5px;
	padding-right: 0px;
	padding-bottom: 5px;
	padding-left: 0px;
	font-family: arial;
	font-size: 12px;
	font-weight: normal;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	margin-left: 0px;
	border-top-color: white;
	border-right-color: gray;
	border-bottom-color: gray;
	border-left-color: white;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	empty-cells: show;
	background-color: rgb(212, 208, 200);
}
div.gridbox table.hdr td div.hdrcell
{
	overflow: hidden;
}
div.gridbox table.obj th, div.gridbox table.hdr th
{
	padding-top: 0px;
	padding-right: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	margin-left: 0px;
}
div.gridbox_dhx_black
{
	color: black;
	border-top-color: #929aa0;
	border-right-color: #929aa0;
	border-bottom-color: #929aa0;
	border-left-color: #929aa0;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
}
div.gridbox_dhx_black .xhdr
{
	background-image: url("../imgs/dhxgrid_dhx_black/hdr.png");
}
div.gridbox_dhx_black table.hdr tr
{
	background-image: url("../imgs/dhxgrid_dhx_black/hdr.png");
}
div.gridbox_dhx_black table.hdr td
{
	text-align: left;
	color: black;
	font-family: Arial;
	font-size: 12px;
	vertical-align: top;
	border-top-color: currentColor;
	border-right-color: #545454;
	border-bottom-color: #545454;
	border-left-color: currentColor;
	border-top-width: 0px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 0px;
	border-top-style: none;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: none;
	background-color: transparent;
}
div.gridbox_dhx_black table.hdr td div.hdrcell
{
	padding-left: 4px;
}

 
</style>
</head>
<body onload="OnInit()">
 <table border="1" style="width: 720px; border-top-color: black; border-right-color: black; border-bottom-color: black; border-left-color: black; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid;">
  <tbody>
   <tr>
   <td align="center" id="title" style="height: 30px; font-size: 24px; font-weight: bold;">
          수술정보조회 
   </td> 
   </tr>
   <tr>
     <td align="right" style="height: 30px;" >
     <img onclick="Search_op()" src="/EMR_DATA/btn_search.gif"/>
     </td>
   </tr>
  </tbody> 
 </table>

<div style="width: 720px; height: 300px; display: block; cursor: default;" id="doc_list" class="gridbox gridbox_dhx_black">
 <div style="width: 720px; overflow: hidden; position: relative;" class="xhdr">
  <img style="display: none; position: absolute;" src="/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/sort_desc.gif">
  <table style="width: 720px;  padding-right: 0px; table-layout: fixed; multiselect: true;"  class="hdr" cellSpacing="0" cellPadding="0">
    <tbody>
       <tr style="height: auto; width: auto;">
           <th style="width: 0px; height: 0px;"></th>
          <th style="width: 0px; height: 0px;"></th>
          <th style="width: 0px; height: 0px;"></th>
          <th style="width: 0px; height: 0px;"></th>
          <th style="width: 0px; height: 0px;"></th>
          <th style="width: 0px; height: 0px;"></th>
       </tr>
       <tr>
          <td style="text-align: center;">
            <div class="hdrcell">선택</div>
          </td>
          <td style="text-align: center;">
            <div class="hdrcell">수술일자</div>
          </td>
          <td style="text-align: center;">
           <div class="hdrcell">수술과</div>
          </td>
          <td style="text-align: center;">
           <div class="hdrcell">수술명</div>
          </td>
          <td style="text-align: center;">
            <div class="hdrcell">집도의</div>
          </td>
          <td style="text-align: center;">
            <div class="hdrcell">마취구분</div>
          </td>
        </tr>
     </tbody>
   </table>
  </div>
 </div>
 <table border="0" style="width: 720px; border-top-color: black; border-right-color: black; border-bottom-color: black; border-left-color: black; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid;">
  <tbody>
   <tr>
     <td align="right" style="height: 30px;" >
     <input id="btnReturn" style="width: 100px;" type="button" value="삽입 후 닫기" onclick="return_value()" />
     </td>
   </tr>
  </tbody> 
 </table>
</body>
</html>