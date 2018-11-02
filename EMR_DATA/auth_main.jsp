<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	
	request.setCharacterEncoding("euc-kr");
	
	String menuId = request.getParameter("menuId");
	String worker = request.getParameter("worker");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="X-UA-Compatible" content="IE=9;" />
<title>권한 관리화면</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<script src="/EMR_DATA/script/util.js"></script>
<script>
var menuId = <%=menuId%>;
var worker = '<%=worker%>';
function onInit(){
	var tdId = menuId;
	
	// 다끄고 키기 
	document.getElementById("1_1").className = "tabOffText";
	document.getElementById("1_2").className = "tabOff";
	document.getElementById("1_3").className = "tabOffLeft";
	document.getElementById("1_4").className = "tabOffTop";
	document.getElementById("1_5").className = "tabOffRight";
	document.getElementById("1").style.display = "none";
	
	document.getElementById("2_1").className = "tabOffText";
	document.getElementById("2_2").className = "tabOff";
	document.getElementById("2_3").className = "tabOffLeft";
	document.getElementById("2_4").className = "tabOffTop";
	document.getElementById("2_5").className = "tabOffRight";
	document.getElementById("2").style.display = "none";
	
	document.getElementById("3_1").className = "tabOffText";
	document.getElementById("3_2").className = "tabOff";
	document.getElementById("3_3").className = "tabOffLeft";
	document.getElementById("3_4").className = "tabOffTop";
	document.getElementById("3_5").className = "tabOffRight";
	document.getElementById("3").style.display = "none";
	
	document.getElementById(tdId+"_1").className = "tabOnText";
	document.getElementById(tdId+"_2").className = "tabOn";
	document.getElementById(tdId+"_3").className = "tabOnLeft";
	document.getElementById(tdId+"_4").className = "tabOnTop";
	document.getElementById(tdId+"_5").className = "tabOnRight";
	document.getElementById(tdId).style.display = "block";
	
	
	document.getElementById('a2').href = "/EMR_DATA/auth_main.jsp?menuId=2&worker="+worker ;
	document.getElementById('a1').href = "/EMR_DATA/auth_main.jsp?menuId=1&worker="+worker ;
	document.getElementById('a3').href = "/EMR_DATA/auth_main.jsp?menuId=3&worker="+worker ;
}


</script>

</head>
<body onload="onInit()">

<table id="Wrap" border="0" cellSpacing="0" cellPadding="0">
<tbody>
<tr>
<td align="center" id="header">
<table class="tabWrap" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>
	<td align="left">
		<table border="0" cellSpacing="0" cellPadding="0"><tbody>
		<tr>
			
			
		<td>
			<table class="tabOff" id ="2_2" border="0" cellSpacing="0" cellPadding="0">
				<tbody>
					<tr>
						<td class="tabOffLeft" rowSpan="2" id ="2_3"></td>
						<td class="tabOffTop" id ="2_4"></td>
						<td class="tabOffRight" rowSpan="2" id ="2_5"></td>
					</tr>
					<tr><td class="tabOffText" id = "2_1"><a id= "a2" href="">접근제한자관리</a></td></tr>
				</tbody>
			</table>
		</td>
		<td>
			<table class="tabOn" id = "1_2" border="0" cellSpacing="0" cellPadding="0"><tbody>
				<tr>
					<td class="tabOnLeft" rowSpan="2" id="1_3"></td>
					<td class="tabOnTop" id="1_4"></td>
					<td class="tabOnRight" rowSpan="2" id="1_5"></td>
				</tr>
				<tr>
					<td class="tabOnText" id="1_1" ><a id= "a1" href="">정신과 열람권한 </a></td>
				</tr>
				</tbody>
			</table>
			
			</td>
		<td>
			<table class="tabOff" id ="3_2" border="0" cellSpacing="0" cellPadding="0">
				<tbody>
					<tr>
						<td class="tabOffLeft" rowSpan="2" id ="3_3"></td>
						<td class="tabOffTop" id ="3_4"></td>
						<td class="tabOffRight" rowSpan="2" id ="3_5"></td>
					</tr>
					<tr><td class="tabOffText" id = "3_1"><a id= "a3" href="">기록 출력 권한</a></td></tr>
				</tbody>
			</table>
		</td>
		</tr>
		</tbody>
		
		</table> 
		
		<table class="conWrap" border="0" cellSpacing="0" cellPadding="0" id ="1">
		<tbody>
			<tr>
				<td>
					<iframe name="conBody" width="990" height="700" id="conBody1" src="/EMR_DATA/auth/md_open.jsp" frameBorder="0" scrolling="no"></iframe>	
				</td>
			</tr>
		</tbody>
		</table>
		
		<table class="conWrap" border="0" cellSpacing="0" cellPadding="0" id ="2" style="display:none;height: 100%;">
		<tbody>
			<tr>
				<td>
					<iframe name="conBody" width="990" height="900" id="conBody2" src="/EMR_DATA/auth/limit_user.jsp" frameBorder="0" scrolling="no"></iframe>	
				</td>
			</tr>
		</tbody>
		</table>
		
		<table class="conWrap" border="0" cellSpacing="0" cellPadding="0" id ="3" style="display:none;height: 100%;">
		<tbody>
			<tr>
				<td>
					<iframe name="conBody" width="990" height="700" id="conBody3" src="/EMR_DATA/auth/pr_recd.jsp" frameBorder="0" scrolling="no"></iframe>	
				</td>
			</tr>
		</tbody>
		</table>
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