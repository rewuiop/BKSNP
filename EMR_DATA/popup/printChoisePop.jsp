<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<%
	System.out.println("[printChoisePop.jsp] 출력 선택 팝업 ");
%>

<HTML>
<HEAD>
<TITLE>출력 선택</TITLE>
   <meta http-equiv="content-type" content="text/xml; charset=EUC-KR">
<link rel="stylesheet" href="/EMR_DATA/common/style.css" type="text/css">
<SCRIPT src='/EMR_DATA/SDK/BK_SDK.js'></SCRIPT>
<style>
table {
	border-collapse: collapse;
	border: 0px solid #03476F;
	font: normal 11px verdana, arial, helvetica, sans-serif;
	color: #363636;
	}
</STYLE>
<script>
	document.onkeydown = function(event) {
		try{
			if(!event)
				event = window.event;
			
			if(event.keyCode==13) {
				event.returnValue = null;
				return false;
			}
		} catch(e) {
			return;
		}
	};

	function openPopup(objName){
		
		var radioObj = document.getElementsByName(objName);
		var checkVal="";
		for(var i=0; i<radioObj.length; i++)
		{
			if(radioObj[i].checked)
			{
				checkVal = radioObj[i].value;
			}
		}

		if(checkVal == ""){
			alert("사유를 한가지 이상 체크해 주십시오.");
			return;
		}
		
		window.returnValue="TRUE^"+checkVal;
		window.close();
	}

	function closePopup(){	

		window.returnValue="FALSE";
		window.close();

	}

</script>
</HEAD>
<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 WIDTH="300" HEIGHT="400" style="border:'solid #8CBDED 1px';overflow-y:hidden;">
<Form NAME="one">
   <table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="20"><table width="100%" border="0" align="center" valign=bottom cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" width=70% valign=bottom>
	           	인쇄 선택
             </td>
             <td width="30%">
               <table border="0" cellpadding="0" cellspacing="3" width=50 align=right>
                 <tr align=right>
                   <td><img src="/EMR_DATA/images/js_butt_24_close.gif" border="0" onclick="closePopup();" style="cursor:'hand';"/></td>
                 </tr>
               </table>
             </td>
           </tr>
         </table></td>
     </tr>
     <tr>
       <td background="/EMR_DATA/images/js_popup_bg.gif">
       <table width="98%" height="95%" border="0" align="center" cellpadding="0" cellspacing="5" bgcolor="#FFFFFF">
         <tr height=25 >
           <td align=right valign=middle>
           	<img src="/EMR_DATA/images/js_butt_24_ok.gif" border="0" onclick="openPopup('comment_cd');" style="cursor:'hand';"/>
           </td>
         </tr>
         <tr>
          <td style="font:10pt "굴림">
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="1"/> 바로 출력<br/></label>
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="2"/> 사본발급 신청<br/></label>
          </td>
         </tr>     
       </table>
       <br/>
       <br/>
       </td>
     </tr>
   </table>
</FORM>
</BODY>
</HTML>