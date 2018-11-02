<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html; charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<%
System.out.println("[documentSearching.jsp] 서식설정화면");
String uDeptCd = request.getParameter("uDeptCd");
String fsGubun = request.getParameter("fsGubun");
%>
<script src='/EMR_DATA/SDK/BK_SDK.js'></script>
<script src="/EMR_DATA/SDK/js/util.js"></script>
<script src='/EMR_DATA/SDK/js/Left_1.js'></script>
<script>
	uDeptCd = "<%=uDeptCd%>";
	fsGubun = "<%=fsGubun%>";
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>서식리스트</title>
<link href="css/new_style.css" rel="stylesheet" type="text/css" />
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>
</head>

<body onload='Leftinit(4)' >
<table width='100%' height='100%' style='padding:0px'>
<tr><td class='l_content'>
<div style='width:100%;height:730px' id='docList' enableCheckBoxes=1></div>
</td></tr>
</table>
</body>
</html>