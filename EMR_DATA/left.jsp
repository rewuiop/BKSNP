<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html" pageEncoding="EUC-KR" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script>
<script src='/EMR_DATA/SDK/js/leftMain.js?v=1.0.3'></script>	


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>EMR Viewer Main</title>
<link href='css/new_style.css?v=1.0.1' type='text/css' rel='stylesheet'/>

<link rel="STYLESHEET" type="text/css" href="dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<script type="text/javascript" src="dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>
<!--script type="text/javascript" src="js/util.js"></script-->
</head>


<body scroll='no' onload='SetSubMenu(-1)'>

<table width='100%' height='100%' cellpading=0 cellspacing=0 class="left_area">
<tr><td style='padding:0px' ><table id='subMenu' ><tr><td  padding='0px'></td></tr></table></td></tr>

<tr><td padding='0px'  height='795px'  >

<div id='doc' scroll='no' style='display:none;zIndex:100;position:absolute;left:0px;top:22Px;width:100%;height:945px;padding:0px'><IFRAME id='i_doc' src='left_1.jsp' width='400px' height='945px' frameborder='0'></IFRAME></div>
<div id='record2' style='display:none;zIndex:100;position:absolute;left:0px;top:22px;width:100%;height:945px;padding:0px'><IFRAME id='i_rec2' src='left_2.jsp' width='400px' height='945px' frameborder='0'></IFRAME></div>
<div id='record3' style='display:none;zIndex:100;position:absolute;left:0px;top:22px;width:100%;height:945px;padding:0px'><IFRAME id='i_rec3' src='left_3.jsp' width='400px' height='945px' frameborder='0'></IFRAME></div>
<div id='record4' style='display:none;zIndex:100;position:absolute;left:0px;top:22px;width:100%;height:945px;padding:0px'><IFRAME id='i_rec4' src='left_4.jsp' width='400px' height='945px' frameborder='0'></IFRAME></div>
</td></tr>
</table>

</body>
</html>
</html>