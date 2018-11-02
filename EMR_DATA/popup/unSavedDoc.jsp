<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.net.*" %>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
System.out.println("[unSavedImage.jsp] onunload 저장 함수");
	// request.setCharacterEncoding("UTF-8");
	String status = request.getParameter("status");
	
	%>
<HTML>
<HEAD><TITLE>작성중인서식</TITLE></HEAD>
<SCRIPT src='/EMR_DATA/SDK/BK_SDK.js'></SCRIPT>
<SCRIPT>

var status = <%=status%>;
//alert(status);

function btnClick(val) {
	
	window.returnValue=val;
	window.close();
	
}
	
</SCRIPT>
<BODY>
	<table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="25"><table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" style="color:#ffffff" width="70%" valign=bottom>
             	 알림
             </td>
           </tr>
         </table></td>
     </tr>
     <tr>
       <td background="/EMR_DATA/images/js_popup_bg.gif">
       <table width="98%" height="98%" text-align="center" cellpadding="10" cellspacing="5" bgcolor="#FFFFFF" border=0>
	     <tr>
	     	<td height=30>
		     	<table width="250px" cellspacing="3">
		     		<tr style="font:10pt 굴림;">
		     		        <img src="/EMR_DATA/images/header.jpg" valign=bottom/>작성중인 서식이 존재합니다. 저장하시려면 해당 버튼을 선택해주세요.
		     		</tr>
		     		<tr align="right" id="checkDept">
	         			<td>
	         				<% if(!status.equals("0")) {%>
	         					<img src="/EMR_DATA/images/js_butt_r24_savetemp.gif" onclick="btnClick(0)"/>
	         				<% } else {%>
  	         				<img src="/EMR_DATA/images/js_butt_r24_confirmsave.gif" onclick="btnClick(1)"/>
  	         			<% } %>
  	         			<img src="/EMR_DATA/images/js_butt_24_cancel.gif" onclick="btnClick(2)"/>
  	         		</td>
 				</tr>		
		     	</table>
		   </td>
	     </tr>
	     </table>
       <br/></td>
     </tr>
     
   </table>
</BODY>
</HTML>