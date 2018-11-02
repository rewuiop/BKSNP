<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
	System.out.println("[limitReadPop.jsp] 타과환자기록 열람 자동승인 신청 팝업 ");
	String type = request.getParameter("type");
	String pid = request.getParameter("pid");
	String doctorId = request.getParameter("doctorId");
	String uDeptCd = request.getParameter("uDeptCd");
	String docCode = request.getParameter("docCode");
	String recCode = request.getParameter("recCode");
%>

<HTML>
<HEAD>
<TITLE>타과환자기록 열람 자동승인 신청</TITLE>
   <meta http-equiv="content-type" content="text/xml; charset=EUC-KR">
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
				//arr[1] = radioObj[i].parentElement.innerText.trim();
			}
		}
		/*
			외래진료용
			재입원용
			의학연구용
			이의신청보험
			법원소송용
			전화예약
			열람용
			챠트기타
			미정리챠트
			외래회신서
			외래예약누락
			기타사유
		*/
		switch(arr[0])
		{
			case '1':
				arr[1]="외래진료용";
				break;
			case '2':
				arr[1]="재입원용";
				break;
			case '3':
			  arr[1]="의학연구용";
			  break;
			case '4':
			  arr[1]="이의신청보험";
			  break;
			case '5':
			  arr[1]="법원소송용";
			  break;
			case '6':
			  arr[1]="전화예약";
			  break;
			case '7':
			  arr[1]="열람용";
			  break;
			case '8':
			  arr[1]="챠트기타";
			  break;
			case '9':
			  arr[1]="미정리챠트";
			  break;
			case '10':
			  arr[1]="외래회신서";
			  break;
			case '11':
			  arr[1]="외래예약누락";
			  break;
			case '12':
			  arr[1]=document.getElementById('searchText').value;
			  break;
		}

		if(arr == ""){
			alert("사유를 한가지 이상 체크해 주십시오.");
			return;
		}
		if(arr[0]=='12')
		{
			if(arr[1]=="")
			{
				alert("기타 사유를 입력해 주십시오.");
				return;
			}
		}
		//var returnVal = insertBeramlogu(type,doctorId,uDeptCd,docCode,pid,recCode,arr[0],arr[1],ipaddress);
		window.returnValue="TRUE^"+arr[0]+"^"+arr[1];
		window.close();

	}

	function closePopup(){	

		window.returnValue="FALSE";
		window.close();

	}

</script>
</HEAD>
<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 WIDTH="100%" HEIGHT="100%" style="border:solid #8CBDED 1px;overflow:hidden;">
<Form NAME="one">
   <table width="100%"  border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="20"><table width="100%" border="0" align="center" valign=bottom cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" style="width:70%;valign:bottom;color:white">
	           	타과환자기록 열람 자동승인 신청
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
       <table width="98%"  border="0" align="center" cellpadding="0" cellspacing="5" bgcolor="#FFFFFF">
         <tr height=25 >
           <td align=right valign=middle>
           	<img src="/EMR_DATA/images/js_butt_24_autoapprove.jpg" border="0" onclick="openPopup('comment_cd');" style="cursor:'hand';"/>
           </td>
         </tr>
         <tr>
          <td>
          	<ul style="font-size:13px">
          		<li>
	              	타과 환자의 EMR기록을 열람하려면 사유를 입력하시고 열람 자동승인신청 <br/>
	              	버튼을 누르시기 바랍니다.
		      </li>
		      <li> ※의사직은 타과환자의 의무기록을 자동승인으로 조회 할 수 있으나, <br/>
		      		열람 기록이 남게 되므로 진료 및 업무상 필요한 환자만 열람하시기 바랍니다. </li>
           </ul>
          </td>
         </tr>	
         <tr>
          <td style="font-size:13px;padding-left:50px;">
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="1"/> 외래진료용 </label>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="2"/> 재입원용 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="3"/> 의학연구용 </label>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="4"/> 이의신청보험 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="5"/> 법원소송용 </label>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="6"/> 전화예약 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="7"/> 열람용 </label>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="8"/> 챠트기타 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="9"/> 미정리챠트 </label>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="10"/> 외래회신서 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="11"/> 외래예약누락 </label><br/>
          	<label style="width:110px;display:inline-block;" ><input type="radio" background='#ffffff' name="comment_cd" value="12"/> 기타사유</label><br/>
          	<input type="text" id="searchText" style="width:350px;border:'1px solid #ffffff';"/> 
          </td>
         </tr>	
         <tr>
          <td>
          	<ul style="font-size:13px">
	              <li> [관련근거] </li>
		      <li> 의료법 제23조(전자의무기록) 3항:  누구든지 정당한 사유 없이 전자의무기록에 <br/>
		      	저장된 개인정보를 탐지 하거나 누출,변조 또는 훼손하여서는  아니 된다.</li>
           	</ul>
          </td>
         </tr>        
       </table>
       <br/>
       </td>
     </tr>
   </table>
</FORM>
</BODY>
</HTML>