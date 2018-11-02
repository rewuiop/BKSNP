<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
	System.out.println("[limitModifyPop.jsp] 기록 수정 자동 승인 팝업 ");
	String type = request.getParameter("type");
	String pid = request.getParameter("pid");
	String doctorId = request.getParameter("doctorId");
	String uDeptCd = request.getParameter("uDeptCd");
	String docCode = request.getParameter("docCode");
	String recCode = request.getParameter("recCode");
%>

<HTML>
<HEAD>
<TITLE>기록 수정 자동 승인</TITLE>
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
var type = "<%=type%>";
var pid = "<%=pid%>";
var doctorId = "<%=doctorId%>";
var uDeptCd = "<%=uDeptCd%>";
var docCode = "<%=docCode%>";
var recCode = "<%=recCode%>";
var ipaddress='<%=request.getRemoteAddr()%>';

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
		//var radioObj = document.all(objName);
		var radioObj = document.getElementsByName(objName);
		var arr = new Array();

		for(var i=0; i<radioObj.length; i++)
		{
			if(radioObj[i].checked)
			{
				arr[0] = radioObj[i].value;
			}
		}

		switch(arr[0])
		{
			case '1':
				arr[1]="오기록 작성";
				break;
			case '2':
				arr[1]="기록 내용 미흡";
				break;
			case '3':
				arr[1]="환자 요청";
				break;
			case '4':
				arr[1]="기록 내용 추가";
				break;
			case '5':
				arr[1]="기타";
				break;
		}

		if(arr == ""){
			alert("사유를 한가지 이상 체크해 주십시오.");
			return;
		}
		var resonText = document.getElementById('resonText').value;
		if(arr[0]=="5" && resonText=="")
		{
			alert("상세 사유를 입력해 주십시오.");
			return;
		}
		if(arr[0]=="5")
			arr[1] = arr[1]+"*$*"+resonText;
		var returnVal = insertBeramlogu(type,doctorId,uDeptCd,docCode,pid,recCode,arr[0],arr[1],ipaddress);
		window.returnValue="TRUE";
		window.close();

	}

	function closePopup(){	

		if(confirm("사유를 선택하지 않으면 기록 수정이 불가능합니다. 기록 수정을 취소하시겠습니까?"))	
		{
			window.returnValue="FALSE";
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
	           	기록 수정 신청
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
       <td background="/EMR_DATA/images/js_popup_bg.gif">
       <table width="98%" height="95%" border="0" align="center" cellpadding="0" cellspacing="5" bgcolor="#FFFFFF">
         <tr height=25 >
           <td align=right valign=middle>
           	<img src="/EMR_DATA/images/js_butt_24_ok.gif" border="0" onclick="openPopup('comment_cd');" style="cursor:'hand';"/>
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
         <tr>
          <td style="font-size:13px;padding-left:50px;">
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="1"/> 오기록 작성</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="2"/> 기록 내용 미흡</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="4"/> 기록 내용 추가<br/></label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="3"/> 환자 요청</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="5"/> 기타<br/></label>
          </td>
         </tr>	
         <tr>
          <td style="padding-left:50px;">
          <span style='color:red'>※기타 선택 시 상세 사유를 반드시 입력하십시오.※</span></br>
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