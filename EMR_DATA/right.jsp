<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page import="java.sql.*" %>
<%@ page language="java" contentType="text/html;charset=EUC-KR" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/js/rightMain.js?v=1.0.6'></script>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>EMR Viewer Main</title>

<link href='css/new_style.css?v=1.0.1' type='text/css' rel='stylesheet'/>
</head>


<body onload="rightMainInit()" scroll='no' >

<table  height='35px'cellpading=0 cellspacing=0 class='right_area' style='padding:0px; border:0px' scroll='no'>
<tr height="35px" width="800px" style="padding:0px" class='r_tab'><td style='padding:0px'><div id='tabMenu' cellspacing=0 style='padding:0px' class='m_box'></div></td></tr>
<tr valign="top" style='width:800px;height:915px;' padding='0px'><td class='r_content' style='padding:0px' ><div id='showFrame'  style='width:770px;' ></div><div id='showFrame2'  style='width:770px;position:absolute'><img src='images/closeIcon.png' onclick='showFrame2Close()' id='btn_close2' style='display:none;position:absolute;top:-20px;right:-20px' alt='닫기' title='닫기'><IFRAME id='show_iFrame'  style='display:none;width:770px;border:3px solid red;' ></IFRAME></div></td></tr>
<tr><td><!--textarea id='notiBox' value='>>'  col="5" style='position:absolute;top:757px;width:890px;height:35px'></textarea--></td></tr>

</table>
</body>
</html>

