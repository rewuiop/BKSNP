<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.net.*" %>
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
System.out.println("[configureSetting.jsp] ȯ�漳��ȭ��");
	// request.setCharacterEncoding("UTF-8");
String doctorId = request.getParameter("doctorId");
String uDeptCd = request.getParameter("uDeptCd");

	%>
<HTML>
<HEAD><TITLE>ȯ�漳��ȭ��</TITLE></HEAD>
<SCRIPT src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></SCRIPT>
<SCRIPT>
	var doctorId = "<%=doctorId%>";
	var uDeptCd = "<%=uDeptCd%>";
	var pagenum = "";
	
   function visibleSearching(type){
   		var fsGubun = "";
   		if(type == 1 || type == 3)
   			fsGubun="1961";
   		else if(type == 2 || type == 4)
   			fsGubun="1962";
	   	var url='/EMR_DATA/popup/documentSearching.jsp?uDeptCd='+uDeptCd+"&fsGubun="+fsGubun;
	   	var rrrrrr=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:530px;resizable:no;status:0;menubar:0;scroll:0');
	   	if(rrrrrr==null)return;
	   	var rValue=rrrrrr.split('*$*');
	   	
	   	if(type==1){
   			document.getElementById('fst_docu_id').keyValue=rValue[0];
  			document.getElementById('fst_docu_id').value=rValue[1];
  		}
  		else if(type==2){
   		document.getElementById('snd_docu_id').keyValue=rValue[0];
  			document.getElementById('snd_docu_id').value=rValue[1];
  		}
  		else if(type==3){
   		document.getElementById('fst_dept_docu_id').keyValue=rValue[0];
  			document.getElementById('fst_dept_docu_id').value=rValue[1];
  		}
  		else if(type==4){
   		document.getElementById('snd_dept_docu_id').keyValue=rValue[0];
  			document.getElementById('snd_dept_docu_id').value=rValue[1];
  		}
	}
	
	function deleteSearching(type){
		if(type==1){
   			document.getElementById('fst_docu_id').keyValue="";
  			document.getElementById('fst_docu_id').value="";
  		}
  		else if(type==2){
   			document.getElementById('snd_docu_id').keyValue="";
  			document.getElementById('snd_docu_id').value="";
  		}
  		else if(type==3){
   			document.getElementById('fst_dept_docu_id').keyValue="";
  			document.getElementById('fst_dept_docu_id').value="";
  		}
  		else if(type==4){
   			document.getElementById('snd_dept_docu_id').keyValue="";
  			document.getElementById('snd_dept_docu_id').value="";
  		}
	}
	   
	function selectItem()
	{
		var fstDocuId=document.getElementById('fst_docu_id').keyValue;
	  	var sndDocuId=document.getElementById('snd_docu_id').keyValue;
	  	var fstDeptDocuId=document.getElementById('fst_dept_docu_id').keyValue;
	  	var sndDeptDocuId=document.getElementById('snd_dept_docu_id').keyValue;
	  	
	  	var defaultChart = document.getElementsByName('defaultChart');
	  	var checkVal;
	  	for(var i=0; i<defaultChart.length; i++)
		{
			if(defaultChart[i].checked)
			{
				checkVal = defaultChart[i].value;
			}
		}
	  	
  		var updateRow = updateBerdmprvt(doctorId,uDeptCd,fstDocuId,sndDocuId,1,checkVal);
  		if(updateRow==0)
  			insertBerdmprvt(doctorId,uDeptCd,fstDocuId,sndDocuId,1,checkVal);
  		updateRow = updateBerdmprvt('0',uDeptCd,fstDeptDocuId,sndDeptDocuId,2,checkVal);
  		if(updateRow==0)
				insertBerdmprvt('0',uDeptCd,fstDeptDocuId,sndDeptDocuId,2,checkVal);
		
		window.close();
 	}
 	
	function init()
	{
		var DocName = selectBerdmprvtAll(doctorId,uDeptCd,doctorId);
		for(var i=0;i<DocName.length;i++)
		{
			if(DocName[i][6]=="1")
			{
				document.getElementById('fst_docu_id').keyValue=DocName[i][2];
				document.getElementById('fst_docu_id').value=DocName[i][3];
				document.getElementById('snd_docu_id').keyValue=DocName[i][4];
		  	document.getElementById('snd_docu_id').value=DocName[i][5];
		  	
		  	//���� üũ 
           var defaultChart = document.getElementsByName('defaultChart');
           for(var i=0; i<defaultChart.length; i++)
			{
				if(defaultChart[i].value==DocName[i][7])
				{
					defaultChart[i].checked = "checked";
					break;
				}
			}
           
		  	}
		  	else if(DocName[i][6]=="2")
		  	{
		  		document.getElementById('fst_dept_docu_id').keyValue=DocName[i][2];
		  		document.getElementById('fst_dept_docu_id').value=DocName[i][3];
		  		document.getElementById('snd_dept_docu_id').keyValue=DocName[i][4];
		  		document.getElementById('snd_dept_docu_id').value=DocName[i][5];
		  	}
		}
	}
	function showTitle(obj)
	{
		obj.title = obj.value;
	}
	
	function changePassword()
	{
		var CertManX = document.getElementById('CertManX');
		var KMClientAX = document.getElementById('KMClientAX');
		
		var ret_dn="";
		var changeIp = '192.168.2.43';
	  	if(document.domain.indexOf("preemrdev")==-1)
	  		changeIp = '192.168.1.40';
		ret = KMClientAX.kmsConnect(changeIp,"7001");
		if( ret == false)
		{
			alert("KMI ���� ���� ����-[" + KMClientAX.Error_MSG() + "]");
			KMClientAX.kmsDisconnect();
			return;
		}
		
		ret = KMClientAX.kmsInit();
		if(ret == "")
		{
			alert("KMI Ŭ���̾�Ʈ �ʱ�ȭ ����-[" + KMClientAX.Error_MSG() + "]");
			KMClientAX.kmsDisconnect();
			return;
		}
		/* ������ �ٿ�ε� */
		
		ret_dn = KMClientAX.GetKeyAndCert(doctorId);
		if(ret_dn == "")
		{
			alert("������ ��ϵǾ� ���� �ʽ��ϴ�.\n�ǹ�������� �����Ͻñ� �ٶ��ϴ�.");
			KMClientAX.kmsDisconnect();
	    	return false;
		}
		
		ret_dn = KMClientAX.ChangePasswordAndSetKeyAndCert(doctorId);
		if(ret_dn== "")
		{
			alert("������ ��й�ȣ ���� ����-[" + KMClientAX.Error_MSG() + "]");
			KMClientAX.kmsDisconnect();
			return;
		}
		else
		{
		alert("������ - [" + ret_dn + "] ��  ��й�ȣ ���� �Ϸ�");
		}
		
		/* ���� ���� */
		KMClientAX.kmsDisconnect();
	}
	
</SCRIPT>
<BODY onload='init()'>
	<!--form name="form_page" method="post" action="configureSetting.jsp" onsubmit=""-->
	<table width="100%" height="100%" border="0" cellpadding="3" cellspacing="0">
     <tr>
       <td background="/EMR_DATA/images/js_popup_top_bg.gif" height="25"><table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">
         <tr>
             <td class="js_popup_title" width="70%" valign=bottom>
             	 ����ȯ�漳��
             </td>
             <td width=10%>
               <table border="0" cellpadding="0" cellspacing="3" width=50% align=right>
                 <tr>
                   <td>
                   	<img src="/EMR_DATA/images/js_butt_24_ok.gif" border="0" onclick="selectItem();" style="cursor:'hand';" />
                   	<!--<input  TYPE="IMAGE" src="/EMR_DATA/images/js_butt_24_ok.gif" name="Submit" value="Submit" onclick="selectItem();" align="absmiddle">-->
                   	</td>
                 </tr>
               </table>
             </td>
           </tr>
         </table></td>
     </tr>
     <tr>
       <td background="/EMR_DATA/images/js_popup_bg.gif">
       <table width="98%" height="98%" align="center" cellpadding="10" cellspacing="5" bgcolor="#FFFFFF" border=0>
	     <tr>
	     	<td height=70>
		     	<table height=70 border=0 width=100% cellspacing="3">
		     		<tr width=45% style="font:10pt '����';">
		     			  <td>
		     		        <img src="/EMR_DATA/images/header.jpg" valign=bottom/> �ʱ�ȭ�� ���ļ���	
		     		    </td>
		     		</tr>
		     		<tr id="checkDept">
	         			<td width=50%>	
	         				<table width=100% height=100% style="border:solid #82B3ED 1px;">
	         					<tr style="font:10pt '����';">
	         						<td width=10%  align=center>
	         						 ����
	         						</td>
	         						<td style="border:solid #82B3ED 1px;">
	         							<table width=100% height=100%>
	         							    	<tr style="border:solid #82B3ED 1px;">
	         								<td width=15% align=center> ���� : </td>
	         								<td width=71%> <input id="fst_docu_id" type="text" keyValue="" style="top:66px;width:95%" onmouseover="showTitle(this)" readonly=true/></td>
	         								<td><img src="/EMR_DATA/images/icon_14.jpg" align=right alt="����" title="����" onclick="deleteSearching(1);" style="cursor:'hand';"/></td>
	         								<td><img src="/EMR_DATA/images/icon_06.jpg" align=right alt="�˻�" title="�˻�" onclick="visibleSearching(1);" style="cursor:'hand';"/></td>
	         								</tr>
	         								
	         								<tr>
	         								<td width=15% align=center> ���� : </td>
	         								<td width=71%><input id="snd_docu_id" type="text" keyValue="" style="top:94px;width:95%;" onmouseover="showTitle(this)" readonly=true/></td>
	         								<td><img src="/EMR_DATA/images/icon_14.jpg" align=right alt="����" title="����" onclick="deleteSearching(2);" style="cursor:'hand';"/></td>
	         								<td><img src="/EMR_DATA/images/icon_06.jpg" align=right alt="�˻�" title="�˻�" onclick="visibleSearching(2);" style="cursor:'hand';"/></td>
	         								</tr>
	         							</table>
	         						</td>
	         					</tr>
	         				</table>
  	         			</td>
  	         			<td width=50%>
  	         				<table width=100% height=100% style="border:solid #82B3ED 1px;">
	         					<tr style="font:10pt '����';">
	         						<td width=10%  align=center>
	         						 ����
	         						</td>
	         						<td style="border:solid #82B3ED 1px;">
	         							<table width=100% height=100%>
	         							    	<tr style="border:solid #82B3ED 1px;">
	         								<td width=15% align=center> ���� : </td>
	         								<td width=71%> <input id="fst_dept_docu_id" type="text" keyValue="" style="top:66px;width:95%" onmouseover="showTitle(this)" readonly=true/></td>
	         								<td><img src="/EMR_DATA/images/icon_14.jpg" align=right alt="����" title="����" onclick="deleteSearching(3);" style="cursor:'hand';"/></td>
	         								<td><img src="/EMR_DATA/images/icon_06.jpg" align=right alt="�˻�" title="�˻�" onclick="visibleSearching(3);" style="cursor:'hand';"/></td>
	         								</tr>
	         								
	         								<tr>
	         								<td width=15% align=center> ���� : </td>
	         								<td width=71%><input id="snd_dept_docu_id" type="text" keyValue="" style="top:94px;width:95%;" onmouseover="showTitle(this)" readonly=true/></td>
	         								<td><img src="/EMR_DATA/images/icon_14.jpg" align=right alt="����" title="����" onclick="deleteSearching(4);" style="cursor:'hand';"/></td>
	         								<td><img src="/EMR_DATA/images/icon_06.jpg" align=right alt="�˻�" title="�˻�" onclick="visibleSearching(4);" style="cursor:'hand';"/></td>
	         								</tr>
	         							</table>
	         						</td>
	         					</tr>
	         				</table>
  	         			</td>
 				</tr>		

	     		<tr width=45% style="font:10pt '����';">
	     				<td>
	     		        <img src="/EMR_DATA/images/header.jpg" valign=bottom/> ������� ����Ʈ ���� 
	     		    </td>
	     		</tr>
	   			<tr id="checkDept">
	         			<td width=50%>	
	         				<table width=100% height=100% style="border:solid #82B3ED 1px;">
	         					<tr style="font:10pt '����';">
	         						<td width=20%  align=left>
	         						 ��Ϻ��� 
	         						</td>
	         						<td>
	         							<label><input type="radio" name="defaultChart" value="1" /> True   </label>
	         							<label><input type="radio" name="defaultChart" value="0" /> False   </label>
	         						</td>
	         			  	</tr>
	         			  </table>
	         			</td>
	    		</tr>
	    		<tr width=45% style="font:10pt '����';">
	     				<td>
	     		        <img src="/EMR_DATA/images/header.jpg" valign=bottom/> ������ ����
	     		    </td>
	     		</tr>
	   			<tr>
	         			<td width=50%>	
	         				<button onclick='changePassword()'> ���� ������ ��й�ȣ ���� </button>
	         			</td>
	    		</tr>
		     	</table>
		   </td>
	     </tr>
	     </table>
       <br/></td>
     </tr>
     
   </table>
   	<!--/form-->
   	<OBJECT id='CertManX' classid='CLSID:EC5D5118-9FDE-4A3E-84F3-C2B711740E70' codebase='/EMR_DATA/applet/SKCommAX.cab#version=9,9,7,3' style='display:none;'></OBJECT>
	<OBJECT id = 'KMClientAX' classid = 'CLSID:D3C608B5-B664-4962-91B7-289DA892953A' codebase='/EMR_DATA/applet/(3.3.1.0)_KMClientAX.cab#version=3,3,1,0'  style='display:none;'></OBJECT>
</BODY>
</HTML>