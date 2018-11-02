<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
	System.out.println("[limitModifyPop.jsp] ��� ���� �ڵ� ���� �˾� ");
	String type = request.getParameter("type");
	String pid = request.getParameter("pid");
	String doctorId = request.getParameter("doctorId");
	String uDeptCd = request.getParameter("uDeptCd");
	String docCode = request.getParameter("docCode");
	String recCode = request.getParameter("recCode");
%>

<HTML>
<HEAD>
<TITLE>��� ���� �ڵ� ����</TITLE>
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
				arr[1]="����� �ۼ�";
				break;
			case '2':
				arr[1]="��� ���� ����";
				break;
			case '3':
				arr[1]="ȯ�� ��û";
				break;
			case '4':
				arr[1]="��� ���� �߰�";
				break;
			case '5':
				arr[1]="��Ÿ";
				break;
		}

		if(arr == ""){
			alert("������ �Ѱ��� �̻� üũ�� �ֽʽÿ�.");
			return;
		}
		var resonText = document.getElementById('resonText').value;
		if(arr[0]=="5" && resonText=="")
		{
			alert("�� ������ �Է��� �ֽʽÿ�.");
			return;
		}
		if(arr[0]=="5")
			arr[1] = arr[1]+"*$*"+resonText;
		var returnVal = insertBeramlogu(type,doctorId,uDeptCd,docCode,pid,recCode,arr[0],arr[1],ipaddress);
		window.returnValue="TRUE";
		window.close();

	}

	function closePopup(){	

		if(confirm("������ �������� ������ ��� ������ �Ұ����մϴ�. ��� ������ ����Ͻðڽ��ϱ�?"))	
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
	           	��� ���� ��û
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
	              	�ǹ������ ������ ����/�߰�/�����Ͽ��� ������ �������� �ʰ�, <br/>
	              	����/�߰�/������ �α׸� ����� ������ ����� ���� å���� <br/>
	              	��ġ�� ���ο��� �����Ƿ� ���� �����Ͻñ� �ٶ��ϴ�.
		      </li>
           </ul>
          </td>
         </tr>
     <tr>
         <tr>
          <td style="font-size:13px;padding-left:50px;">
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="1"/> ����� �ۼ�</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="2"/> ��� ���� ����</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="4"/> ��� ���� �߰�<br/></label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="3"/> ȯ�� ��û</label>
          	<label style="width:130px;display:block;" ><input type="radio" background='#ffffff' name="comment_cd" value="5"/> ��Ÿ<br/></label>
          </td>
         </tr>	
         <tr>
          <td style="padding-left:50px;">
          <span style='color:red'>�ر�Ÿ ���� �� �� ������ �ݵ�� �Է��Ͻʽÿ�.��</span></br>
          	<input type="text" id="resonText" style="width:350px;border:'1px solid #ffffff';"/> 
          </td>
         </tr>
         <tr>
          <td>
          	<ul style="font-size:13px">
	              <li> [���ñٰ�] </li>
		      <li> �Ƿ�� ��22��(�����Ϻε�) 3��:  �Ƿ����� �����Ϻε��� �������� <br/>
		      	�ۼ��ϰų� ���Ƿ� ��ǰ� �ٸ��� �߰����硤�����Ͽ����� �ƴ� �ȴ�.</li>
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