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
<title>������ �˻�</title>
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

function content_print(printArea)
{
		win = window.open(); 
		self.focus(); 
		win.document.open();
		 
		/*
			1. div ���� ��� �±׵��� innerHTML�� ����Ͽ� �Ű������� �޴´�.
			2. window.open() �� ����Ͽ� �� �˾�â�� ����.
			3. ���� �� �˾�â�� �⺻ <html><head><body>�� �߰��Ѵ�.
			4. <body> �ȿ� �Ű������� ���� printArea�� �߰��Ѵ�.
			5. window.print() �� �μ�
			6. �μ� Ȯ���� �Ǹ� �˾�â�� �ڵ����� window.close()�� ȣ���Ͽ� ����
		*/
		win.document.write('<html><head><title></title><style>');
		win.document.write('body, td {font-falmily: Verdana; font-size: 10pt;}');
		win.document.write('</style></haed><body>');
		win.document.write(printArea);
 		win.document.write('</body></html>');
		win.document.close();
		win.print();
		win.close();
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