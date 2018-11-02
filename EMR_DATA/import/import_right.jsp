<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
   <%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
 <%
	 
	request.setCharacterEncoding("euc-kr"); 
	
	String src = request.getParameter("src");
	String checktype = request.getParameter("checktype");
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>오른쪽 검색</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<script>
var src = "/EMR_DATA/"+'<%=src%>';
var checktype = '<%=checktype%>';

function onInit(){
	document.getElementById("imgs").src=src;

	/*if(checktype!="null"){
		content_print(document.getElementById('imgdiv').innerHTML);
	}*/
}

</script>
</head>
<body onload="onInit()">
<div id ="imgdiv">
<img id = "imgs" src="" width="622px" height="880px">
</div>
<!-- /EMR_DATA/TIF/data16/chartimg16/0081/99170521095420081.tif -->

</body>
</html>