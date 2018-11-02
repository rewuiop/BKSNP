<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
	System.out.println("[printLimitModifyPop.jsp] 사본발급된 기록 수정 신청 팝업 ");
%>

<HTML>
<HEAD>
<TITLE>사본발급된 기록 수정 신청</TITLE>
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

	function openPopup(){
		
		var resonText = document.getElementById('resonText').value;
		if(resonText=="")
		{
			alert("기록 수정 신청 사유를 입력해 주십시오.");
			return;
		}
		
		window.returnValue="TRUE^"+resonText;
		window.close();

	}

	function closePopup(){	

		if(confirm("사유를 입력하지 않으면 기록 수정 신청이 불가능합니다. 기록 수정 신청을 취소하시겠습니까?"))	
		{
			window.returnValue="FALSE^";
			window.close();	
		}
		
	}

</script>
</HEAD>
<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 WIDTH="100%" HEIGHT="100%" style="border:solid #8CBDED 1px;overflow-y:hidden;">
<Form NAME="one">
   <table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="20"><table width="100%" border="0" align="center" valign=bottom cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" style="width:70%;valign:bottom;color:white">
	           	사본발급된 기록 수정 신청
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
           	<img src="/EMR_DATA/images/js_butt_24_ok.gif" border="0" onclick="openPopup();" style="cursor:'hand';"/>
           </td>
         </tr>
         <tr>
          <td>
          	<ul style="font-size:13px">
          		<li>
	              	의무기록의 내용을 정정/추가/삭제하여도 원본은 삭제되지 않고, <br/>
	              	정정/추가/삭제의 로그를 남기고 있으며 기록의 수정 책임은 <br/>
	              	주치의 본인에게 있으므로 이점 유념하시기 바랍니다.
		      </li>
           </ul>
          </td>
         </tr>
         <tr>
          <td style="padding-left:50px;">
          <span style='color:red'>※상세 사유를 반드시 입력하십시오.※</span></br>
          	<input type="text" id="resonText" style="width:350px;border:'1px solid #ffffff';"/> 
          </td>
         </tr>
         <tr>
          <td>
          	<ul style="font-size:13px">
	              <li> [관련근거] </li>
		      <li> 의료법 제22조(진료기록부등) 3항:  의료인은 진료기록부등을 거짓으로 <br/>
		      	작성하거나 고의로 사실과 다르게 추가기재·수정하여서는 아니 된다.</li>
           	</ul>
          </td>
         </tr>
       </table>
       <br/></td>
     </tr>
   </table>
</FORM>
</BODY>
</HTML>