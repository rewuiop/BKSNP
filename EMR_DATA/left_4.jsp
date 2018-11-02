<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html; charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script> 
<!--script src="/EMR_DATA/SDK/js/util.js"></script-->
<script src='/EMR_DATA/SDK/js/Left_4.js?v=1.0.1'></script>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>EMR Viewer Main</title>
<link href="css/new_style.css?v=1.0.1" rel="stylesheet" type="text/css" />
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>
</head>

<body onload=''>
<object id='bkPrint' classid='clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945'  width="0" height="0" onloadstart="" style="position:absolute;left:15;border='solid 0px #000000;'"></object>
<table width='100%' height='90%' style='padding:0px'>
<tr><td id='patiInfomation4' class='l_search' style='padding:0px;'></td></tr>
<tr><td class='l_content'>
<div style='width:390px;height:830px' id='recList4'></div>
</td></tr>
</table>
</body>
</html>