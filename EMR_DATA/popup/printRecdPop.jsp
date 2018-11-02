<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<%
	System.out.println("[printRecdPop.jsp] 사본발급 신청 팝업 ");
%>

<HTML>
<HEAD>
<TITLE>사본발급 신청</TITLE>
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
var pName="";

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
				arr[1]="타병원진료용";
				break;
			case '2':
				arr[1]="병사용";
				break;
			case '3':
			  arr[1]="공공기관제출용";
			  break;
			case '4':
			  arr[1]="개인용도용";
			  break;
		}

		if(arr == ""){
			alert("사유를 한가지 이상 체크해 주십시오.");
			return;
		}
		/*
		//환자 이름 가져오는 함수 추가 kjk
		//HRECD SEQ_NO 가져오기
		var ocsPtNm = getOcsPtNm(pid);
		if(ocsPtNm==undefined)
			pName = '홍길동';
		else
			pName = ocsPtNm[0];
		var hSeqNo = getHistorySeq(pid,recCode,docCode,dept);
		var prtNum = document.getElementById('printNum').value;
		var today = GetDate();
		today = today.split('-');
		var printDataCheck = selectPrintCheck(pid,today[0]+today[1]+today[2],dept,doctorId,arr[0],recCode);
		if(printDataCheck=="0")
			insertBermprint(pid,'1',doctorId,recCode,chosNo,today[0]+today[1]+today[2],'N',prtNum,arr[0],arr[1],pName,docCode,dept,hSeqNo[0]);
		else
			updateBermprint(pid,today[0]+today[1]+today[2],dept,doctorId,arr[0],recCode,hSeqNo[0]);
			*/
		arr[2] = document.getElementById('printNum').value;
		window.returnValue="TRUE^"+arr[0]+"^"+arr[1]+"^"+arr[2];
		window.close();
	}

	function closePopup(){	

		window.returnValue="FALSE";
		window.close();

	}

</script>
</HEAD>
<BODY LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 WIDTH="300" HEIGHT="400" style="border:'solid #8CBDED 1px';overflow-y:hidden;" >
<Form NAME="one">
   <table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="20"><table width="100%" border="0" align="center" valign=bottom cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" width=70% valign=bottom>
	           	사본발급 신청
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
           	<img src="/EMR_DATA/images/js_butt_24_copy2.jpg" border="0" onclick="openPopup('comment_cd');" style="cursor:'hand';"/>
           </td>
         </tr>
         <tr>
          <td style="font:10pt "굴림">
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="1"/> 타병원진료용<br/></label>
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="2"/> 병사용<br/></label>
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="3"/> 공공기관제출용<br/></label>
          	<label><input type="radio" background='#ffffff' name="comment_cd" value="4"/> 개인용도용</label>
          </td>
         </tr>	
         <tr>
          <td style="font:10pt "굴림">
          		<br/>
        		<span style='padding-left:10px;'>인쇄 부수 </span><input type="text" id="printNum" style="width:25px;height:15px;border:'1px solid #ffffff';" value='1'/>
        		<br/>
        		<br/>
          </td>
         </tr>        
       </table>
       <br/></td>
     </tr>
   </table>
</FORM>
</BODY>
</HTML>