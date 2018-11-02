<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%

request.setCharacterEncoding("euc-kr"); 
String userid = request.getParameter("userid");
String udept = request.getParameter("udept");
	 
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>미비관리화면</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<script src="/EMR_DATA/script/util.js"></script>
<script>
var userid = '<%=userid%>';
var udept = '<%=udept%>';

function callurl(url){
	document.getElementById('conBody1').src = "/EMR_DATA/import/import_right.jsp?src="+url;
}

function onInit(){
	document.getElementById('conBody').src = "/EMR_DATA/import/import_left.jsp?userid="+userid+"&udept="+udept;
	
}

</script>


</head>
<body onload="onInit()">


<table width="1200" class="" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>

    <table border="0" cellSpacing="0" cellPadding="0" width="1220px">
    <tr>
    	
    <td width="37%"> 
    	<div style ="border-right:3px solid #1279b7">
    	<iframe name="conBody" width="100%" height="850" id="conBody" src="" frameBorder="0" scrolling="no"></iframe>
    </td>
    </div>
    <td  width="100%">
    	<iframe name="conBody1" width="100%" height="850" id="conBody1" src="" frameBorder="0" scrolling="yes"></iframe>
    </td>
    </tr>
    </table>

    
</tbody></table>







</body>
</html>