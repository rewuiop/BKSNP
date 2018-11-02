<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	
	request.setCharacterEncoding("euc-kr"); 
	String userid = request.getParameter("userid");
	String udept = request.getParameter("udept");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>중요페이지</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<script src="/EMR_DATA/script/util.js"></script>
<script>
var userid = '<%=userid%>';
var udept = '<%=udept%>';

function onInit(){
	document.getElementById('conBody').src = "/EMR_DATA/import/import_body.jsp?userid="+userid +"&udept="+udept;
	
}

</script>

</head>
<body onload="onInit()">

<table id="Wrap" border="0" cellSpacing="0" cellPadding="0">
<tbody>
<tr>
<td align="center" id="">
<table class="tabWrap" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>
	<td align="left">
		<table border="0" cellSpacing="0" cellPadding="0"><tbody>
		<tr><td><table class="tabOn" border="0" cellSpacing="0" cellPadding="0"><tbody>
		<tr><td class="tabOnLeft" rowSpan="2"></td><td class="tabOnTop"></td><td class="tabOnRight" rowSpan="2"></td>
		</tr><tr><td class="tabOnText"><a href="">중요페이지 </a></td></tr></tbody></table>
		
		</td>
		
		</tr></tbody></table> 
		
		<table class="conWrap" border="0" cellSpacing="0" cellPadding="0">
		<tbody><tr><td>
			<iframe name="conBody" width="1220" height="850" id="conBody" src="" frameBorder="0" scrolling="no"></iframe>
						
		</td></tr>
		</tbody></table>
    </td>
    
</tr>
</tbody></table>


</table>
</td>
</tr>
</tbody>
</table>



</body>
</html>