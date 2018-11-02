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
<meta http-equiv="X-UA-Compatible" content="IE=9;" />
<title>미비관리화면</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<script src="/EMR_DATA/script/util.js"></script>
<script>
var userid = '<%=userid%>';
var udept = '<%=udept%>';

function onInit(){
	
	//var leftsrc = "/EMR_DATA/copy/copy_left.jsp?userid="+splitdatas[0].split("=")[1]+"&currdept="+splitdatas[1].split("=")[1];
	var leftsrc = "/EMR_DATA/copy/copy_left.jsp?userid="+userid+"&udept="+udept;
	document.getElementById('conBody').src = leftsrc;
	//document.getElementById('conBody1').src ="/EMR_DATA/copy/copy_right.jsp?";
	
}



</script>


</head>
<body onload="onInit()">

<table width="700" class="" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>

    
    
    
    <table border="0" cellSpacing="0" cellPadding="0" width="1220px">
    <tr>
    <td width="45%"> 
    	<iframe name="conBody" width="100%" height="885" id="conBody" src="" frameBorder="0" scrolling="no"></iframe>
    </td>
    <td  width="100%">
    	<iframe name="conBody1" width="100%" height="885" id="conBody1" src="" frameBorder="0" scrolling="yes"></iframe>
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