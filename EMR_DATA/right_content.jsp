<!DOCTYPE html>
<%@ page import="java.sql.*" %>
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.5'></script>
<!--script src='/EMR_DATA/Ajax/Ajax.js'></script-->
<!--script src='/EMR_DATA/SDK/js/RightContent.js?v=1.0.1'></script-->
<!--script src='/EMR_DATA/checkAuthorization.js'></script-->

<%
	String viewType = request.getParameter("viewType"); //����,���,��Ÿ
	String idx = request.getParameter("idx"); //tab�� index
	String recIdno =request.getParameter("recIdno");//����ڵ�
	String recIdx=request.getParameter("recIdx");
	String Index=request.getParameter("Index");
	String docCode=request.getParameter("docCode");
	String recSeq=request.getParameter("recSeq");
	String pid=request.getParameter("pid");
	String doctorId=request.getParameter("doctorId");
	String deptCd=request.getParameter("deptCd");
	String sdeCheck=request.getParameter("sdeCheck");
	String checkReason=request.getParameter("checkReason");
	
	String docInfo="";
	String icons="";
	String palette="";
	String memo="";
	


	if(0==viewType.compareTo("0"))//����
	{
		docInfo="<font size=2 style='float:left'>�ű� �ۼ�</font>";	
		icons +="<img src='/EMR_DATA/images/js_butt_r24_savetemp.gif' id='btn_doc_temp_save'  alt='�ӽ�����' title='�ӽ�����' onclick='onDocTempSave()'>";
		icons +="<img src='/EMR_DATA/images/js_butt_r24_confirmsave.gif' id='btn_save'  alt='��������' title='��������' onclick='onDocConfirmSave()'>";//��������
		//icons +="<img src='/EMR_DATA/images/js_butt_past.jpg' id='btn_doc_temp_save'  alt='�ֱٱ�ϰ�������' title='�ֱٱ�ϰ�������' onclick='ModifyRecord(1)'>";
		//icons +="<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�'>";
		if(request.getServerName().equals("preemrdev.hyumc.com"))
			icons +=" <button style='vertical-align:top;' id='btn_doc_print' alt='�������' title='�������'>�������</button>";

		palette="";
	}
	else if(0==viewType.compareTo("1"))//���
	{	
		icons +="<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >";
		icons +="<img src='images/js_butt_24_copy3.jpg' id='btn_print'  alt='�纻�߱޽�û'  title='�纻�߱޽�û' onclick='onPrintRecord()'>";
		icons +="<img src='images/js_butt_24_del.gif' id='btn_delete' alt='����' title='����' onclick='onDeleteRecord()'>";
		//icons +="<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�'>";
		icons +="   <img style='vertical-align:top;padding-top:1px;' src='images/btn_past.gif' id='btn_past' onmouseover=this.src='images/btn_past.gif' onmouseout=this.src='images/btn_past.gif' alt='�����̷�' title='�����̷�'>";
		
		palette="<div id='btn_palette' style='position:absolute;left:477px;top:35px;display:none;'><table border='1' style='border-color:gray'><tr><td id='td_red' style='background-color:red;width:20px;height:20px;display:none;' onclick='onSelectPen(this.id)'></td><td id='td_yellow' style='background-color:yellow;width:20px;height:20px;display:none;' onclick='onSelectPen(this.id)'></td><td id='td_green' style='background-color:green;width:20px;height:20px;display:none;' onclick='onSelectPen(this.id)'></td><td><img src='images/btn_X.gif' id='close_color' onclick='onSelectPen(this.id)'  style='width:20px;height:20px;display:none;'></td></tr></table></div>";
		memo="";	
	}
	else if(0==viewType.compareTo("2"))//����
	{
		icons +="<img src='images/js_butt_r24_savetemp.gif' id='btn_rec_temp_save' alt='�ӽ�����' title='�ӽ�����' onclick='onRecTempSave()'>";
		icons +="<img src='images/js_butt_r24_confirmsave.gif' id='btn_rec_save' alt='��������' title='��������' onclick='onConfirmRecSave()'>";//��������											
		icons +="<img src='images/js_butt_24_del.gif' id='btn_delete' alt='����' title='����' onclick='onDeleteRecord()'>";
		//icons +="<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�'>";
	}
	else if(0==viewType.compareTo("3"))//�ϴ�  ��� ��ȸ
	{	
		icons +="<img src='images/js_butt_24_close2.jpg' id='btn_close2'  alt='�ݱ�' title='�ݱ�'>";
	}
%>

<html>
	<head><title>���� CONTENT ����</title>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<meta http-equiv="X-UA-Compatible" content="IE=9;" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	<link href='css/new_style.css?v=1.0.1' type='text/css' rel='stylesheet'/></head>		
<script>	
	var BK_HWAN_JA_NAME=parent.parent.BK_HWAN_JA_NAME;
	var dataYn = parent.parent.dataYn;
	var checkChosData = parent.parent.checkChosData;
	var ptName = "";
	if(BK_HWAN_JA_NAME==undefined)
		ptName="";
	else
		ptName=BK_HWAN_JA_NAME[0][1];
	var BK_USER=parent.parent.BK_USER;
	var sinerCheck = "";
	var doctorId=parent.parent.doctorId;
	if(doctorId==undefined)
		doctorId='<%=doctorId%>';
	if(BK_USER==undefined && doctorId!='null')
		BK_USER = getUserName(doctorId,parent.parent.uDeptCd);
	
	if(BK_USER!=undefined && BK_USER[0][4]!="S")
		sinerCheck="2";
	
	var winTab = parent.winTab;	
 	var viewType='<%=viewType%>';
	var recIdx='<%=recIdx%>';//recIndex
	var recIdno ='<%=recIdno%>';//recId
	var recSeq='<%=recSeq%>';
	var docInfo;
	var recInfo;
	var x1;
	var xx1;
	var tabData;
	var idx = '<%=Index%>';
	var ipaddress='<%=request.getRemoteAddr()%>';
	var sdeCheck = '<%=sdeCheck%>';
	var checkReason = '<%=checkReason%>';
	var modifyFlag = false;
	
	var CertManX;
	var KMClientAX;
	var capture;
	
	function timeFunction()
	{
		tabData=x1.GetTabInfo();			
			
		if(tabData==null)
			return;
		
		var strHtml = "<table><tr>";
		for(var i=0; i<tabData.length; i++)
		{
			strHtml += "<td><input id='btTab"+i+"' type='button' value='"+tabData[i][1]+"' onclick='x1.ExcuteMenu(tabData["+i+"][0],tabData["+i+"][5])'></td>";
		}
		strHtml +="</tr></table>";		
			
		GetObj('tabArea').innerHTML=strHtml;
	}

	function onBtnClose()
	{
		if(checkReason!=1)
		{
			var showFrame = parent.GetObj('showFrame');
			var show_iFrame = parent.GetObj('show_iFrame');
			if(showFrame==null || show_iFrame==null)
				return;
			if(show_iFrame.style.src!="")
				showFrame.style.height = "500px";
			else
				showFrame.style.height = "100%";
			var tabObj = parent.winTab;
			tabObj.CloseTab(idx);
		}
		else
			parent.conBody1.frameElement.src="";
	}
	
	function onBtnClose2()
	{
		var showFrame2 = parent.GetObj('showFrame2');
		if(showFrame2==null)
			return;
		showFrame2.style.display="none";
		var showFrame = parent.GetObj('showFrame');
		var show_iFrame = parent.GetObj('show_iFrame');		
		if(showFrame==null || show_iFrame==null)
			return;		
		showFrame.style.height="930px";
		for(var j=0;j<showFrame.childNodes.length;j++)
		{
			if(showFrame.childNodes[j]!=undefined)
				showFrame.childNodes[j].childNodes[0].style.height = "930px";
		}
		show_iFrame.src="";
	}
	
	function onDeleteRecord()
	{
		var cPrintRec = checkPrint(x1.rec[0]);
		if(cPrintRec!=undefined)
		{
			alert("�纻�߱� �� ����Դϴ�. ������ �� �����ϴ�.");
			return;
		}
		
		if(doctorId==x1.rec[12])
		{
			if(x1.rec[8]!="0")
			{
				//kjk �����̷� �ֱ�
				returnData = callLimitRecd('2',docCode,x1.rec[0]);
				if(returnData==undefined || returnData=='FALSE')
				{
					alert("��ϻ����� ��ҵǾ����ϴ�.");	
					return;
				}
				deleteRecd(x1.rec[0]);
				if(checkReason!=1)
				{
					parent.parent.refreshRecData(x1.rec[10]+"_"+x1.rec[33]);
					onBtnClose();
				}
				else
				{
					parent.conBody.search_incom();
					parent.conBody1.frameElement.src="";
				}
				alert("��ϻ����� �Ϸ�Ǿ����ϴ�.");
			}
			else
			{
				alert("��������� ����� ������ �Ұ����մϴ�.");	
				return;
			}
		}
		else
			alert("�ش� ��� �ۼ��ڸ� ������ �����մϴ�.");
	}
	
	function onBtnDocPrint()
	{
		GetObj('contentframe'+no).contentWindow.focus();
		GetObj('contentframe'+no).contentWindow.print();
	}
	
	function second()
	{
		if(viewType == 0) //����ۼ�
		{
			if(SERVERADDR.indexOf('preemrdev')!=-1)
				SetEventFunc('btn_doc_print', 'onclick', onBtnDocPrint);
			//SetEventFunc('btn_close', 'onclick', onBtnClose);
			SetEventFunc('btn_save', 'onclick', onDocConfirmSave);//��������
			SetEventFunc('btn_doc_temp_save','onclick',onDocTempSave);//�ӽ�����
		}
		else if(viewType == 1) //�����ȸ
		{
				SetEventFunc('btn_past', 'onclick',onRecPastHistory);  //��ϰ����̷���ȸ
		}
		else if(viewType == 2) //��ϼ���
		{
			//SetEventFunc('btn_close', 'onclick', onBtnClose);
			SetEventFunc('btn_rec_save', 'onclick', onConfirmRecSave);	//�����������
			SetEventFunc('btn_rec_temp_save', 'onclick',onRecTempSave);  //����ӽ����� 		
		}
		else if(viewType == 3) //�����ȸ
		{
				SetEventFunc('btn_close2', 'onclick', onBtnClose2);
		}
		
		setTimeout(timeFunction, 1000);		
	}
	
 function DocPrint()
 {  	
  	document.getElementById(x1.iframe).contentWindow.focus();
  	document.getElementById(x1.iframe).contentWindow.print();
 }
  
	var today = GetDate();
	var todayNum = GetDateNum();
	var modiMode=0;
	
	var usrType=parent.parent.usrType;
	var userIdno;
	var deptCd=parent.parent.deptCd;
	if(deptCd==undefined)
		deptCd='<%=deptCd%>';
	var pid=parent.parent.pid;	
	if(pid==undefined)
		pid='<%=pid%>';
	var uDeptCd = parent.parent.uDeptCd;
	var no = '<%=idx%>';	
	var Index='<%=Index%>';
	var docCode='<%=docCode%>';
	var ONE_DOC_DATA="";
	var ONE_REC_DATA="";
	var rec;
	var doc;
	var showScanView = null;
	arrTypeVar = parent.parent.arrTypeVar;
	var medDate = arrTypeVarData('medDate');
	var hyubjin = arrTypeVarData('hyubjin');
	var chosType = arrTypeVarData('chosType');
	if(chosType=="O" || chosType=="E")
		chosType="1";
	else if(chosType=="I")
		chosType="0";
	var groupDept = arrTypeVarData('groupDept');
	groupDept = groupDept.split("#");
	var returnData = "";
	var npRetData = "";
	var ogRetData = "";
	
function callLimitRecd(type,checkDoc,checkRec)
{
	var strUrl = "";
	var popHeight = "";
	var popWidth = "800";
	if(type==0)
	{
		
		strUrl = "/EMR_DATA/popup/limitReadPop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='395';
		//popHeight = (window.screen.height-280)/2;
		//popWidth='540';
	}
	else if(type==1)
	{
		strUrl = "/EMR_DATA/popup/limitModifyPop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='350';
		//popHeight = (window.screen.height-440)/2;
		//popWidth='540';
	}
	else if(type==2)
	{
		strUrl = "/EMR_DATA/popup/limitDeletePop.jsp?type="+type+"&pid="+pid+"&doctorId="+doctorId+"&uDeptCd="+uDeptCd+"&docCode="+checkDoc+"&recCode="+checkRec;
		popHeight='305';
		//popHeight = (window.screen.height-445)/2;
		//popWidth='540';
	}
	else if(type==3)
	{
		strUrl = "/EMR_DATA/popup/printLimitModifyPop.jsp";
		popHeight='250';
		//popHeight = (window.screen.height-560)/2;
		//popWidth='250';
	}
	var returnVal=window.showModalDialog(strUrl, '', 'dialogWidth:600px;dialogHeight:'+popHeight+'px;resizable:no;status:0;menubar:0;scroll:0');
	//var returnVal=window.showModalDialog(strUrl, '', 'dialogWidth:100%;dialogHeight:100%;resizable:no;status:0;menubar:0;scroll:0');
	//var returnVal=window.showModalDialog(strUrl, '', 'resizable:no;status:0;menubar:0;scroll:0');
	
	if(type==0)
	{
		//insertBeramlogu(type,doctorId,uDeptCd,checkDoc,pid,checkRec,arr[0],arr[1],ipaddress);
		return returnVal;
	}
	/*
	else if(type==1 || type==2)
	{
		if(returnVal!="TRUE")
		{
			return 'false';
		}
	}*/
	else
	{
		return returnVal;
	}
}

function userAllDeptCheck(recDept)
{
	var retVal = "false";
	if(BK_USER==undefined)
		return retVal;
	for(var i=0;i<BK_USER.length;i++)
	{
		if(todayNum>=BK_USER[i][1] && todayNum<=BK_USER[i][2])
		{
			if(BK_USER[i][3]==recDept)
			{
				retVal = "true";
				break;	
			}
		}
	}
	if(groupDept==undefined)
		return retVal;
	for(var i=0;i<groupDept.length;i++)
	{
		if(groupDept[i]==recDept)
		{
			retVal = "true";
			break;	
		}
	}
	return retVal;
}

function npCheckFn(npRecCd,outDate) //���Ű� ���� üũ 
{
	var retCheckVal = "true";
	var toDayStr = GetDateNum();
	var npRead = arrTypeVarData('npRead');
	npRetData = checkNpPrt(doctorId,'0');
	if(npRetData==undefined)
	{
		if(npRead.toUpperCase()=="Y" || (outDate=="" && npRead.toUpperCase()=="P"))
			insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,npRecCd,'13','����� ����',ipaddress);	
		else
		{
			alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
			retCheckVal = "false";
		}
	}
	else if(npRetData[1]>toDayStr || toDayStr>npRetData[2])
	{
		if(npRead.toUpperCase()=="Y" || (outDate=="" && npRead.toUpperCase()=="P"))
			insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,npRecCd,'13','����� ����',ipaddress);	
		else
		{
			alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
			retCheckVal = "false";
		}
	}
	else
		insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,npRecCd,'13','����� ����',ipaddress);	
	
	return retCheckVal;
}

function ogCheckFn(ogRecCd,outDate) //����ΰ� ���� üũ 
{
	var retCheckVal = "true";
	var toDayStr = GetDateNum();
	var ogRead = arrTypeVarData('ogRead');
	ogRetData = checkNpPrt(doctorId,'2');
	if(ogRetData==undefined)
	{
		if(ogRead.toUpperCase()=="Y" || (outDate=="" && ogRead.toUpperCase()=="P"))
			insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,ogRecCd,'13','����� ����',ipaddress);	
		else
		{
			alert("����ΰ� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
			retCheckVal = "false";
		}
	}
	else if(ogRetData[1]>toDayStr || toDayStr>ogRetData[2])
	{
		if(ogRead.toUpperCase()=="Y" || (outDate=="" && ogRead.toUpperCase()=="P"))
			insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,ogRecCd,'13','����� ����',ipaddress);	
		else
		{
			alert("����ΰ� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
			retCheckVal = "false";
		}
	}
	else
		insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,ogRecCd,'13','����� ����',ipaddress);	
	
	return retCheckVal;
}

function init()
{
	//alert(9);
	CertManX = document.getElementById('CertManX');
	parent.CertManX = CertManX;
	parent.parent.CertManX = CertManX;
	KMClientAX = document.getElementById('KMClientAX');
	parent.KMClientAX = KMClientAX;
	ONE_DOC_DATA = getClickedDocList(docCode);
	capture = document.getElementById('capture');
	parent.capture = capture;
	
	var obj = GetObj('contentArea');
	x1 = new DocumentObj(); //tDocument(docInfo, recInfo);
	if(sdeCheck!=0)
	{
		x1.doc =ONE_DOC_DATA[0];// parent.getDocData();
		doc = ONE_DOC_DATA[0];//parent.getDocData();
	
		var queryName = "";
		var changeData = recIdno;
		//if(viewType!=4)
		//if(viewType!=3 && viewType!=4)
		if(viewType!=4)
			queryName = "getRightRecd";
		else
		{
			queryName = "getHistoryRecd";
			changeData = recSeq;
		}
		ONE_REC_DATA = getRightRecd(queryName,changeData,docCode);
		x1.rec =ONE_REC_DATA[0];// parent.getRecData();
		rec = ONE_REC_DATA[0];
		if(x1.rec!=undefined && x1.rec[15])
		{
			ONE_DOC_DATA = getClickedDocVer(docCode,x1.rec[15]);
			x1.doc =ONE_DOC_DATA[0];
			doc = ONE_DOC_DATA[0];
		}
	}
	else
	{
		ONE_REC_DATA = getScanImagePath("getScanImagePath",docCode,recSeq);
		x1.rec =ONE_REC_DATA;// parent.getRecData();
		rec = ONE_REC_DATA;
	}
	x1.obj = obj;
	x1.iframe = 'contentframe'+no;
	
/* BK_DOC_DATA
[0:seqNo ,1:code ,2:name ,3:version ,4:folder ,5:pid ,6:doctype ,7:startTime ,8:endTime ,9:department1 ,
10:use ,11:department2 ,12:department3 ,13:department4 ,14:department5 ,15:category1 ,16:category2 ,17:category3 ,18:creator ,19:modifier ,
20:createTime ,21:modifyTime ,22:recordType ,23:recordEvent ,24:recordArea ,25:recordLevel ,26:mandatory ,27:depshare ,28:en_input ,29:sign ,
30:tempsaveview ,31:cosign ,32:cosignlevel ,33:cosignprint ,34:privatedoc ,35:writelevel ,36:vielevel ,37:file_input ,38:file_view ,39:file_print ,
40:file_modify ,41:dev_design ,42:dev_model ,43:dev_mapping ,44:dev_test ,45:dev_progress ,46:description ,47:common_code ,48:connected_doc_code ,49:file_docu,
50:title ,51:pos ,52:req_department ,53:insf_doc_code ,54:single_print_yn ,55:doc_search_yn ,56:rec_search_yn, 57:print_storage ,58:amend_level ,59:octy_cd ,
60:modifylevel ,61:connected_doc_code2]
*/

//CODE,NAME,PID,DOCTYPE,FILE_INPUT,FILE_VIEW,FILE_PRINT,FILE_MODIFY,COMMON_CODE,FILE_DOCU,CATEGORY1,CATEGORY2,CATEGORY3,DEPARTMENT1,DEPARTMENT2,DEPARTMENT3,DEPARTMENT4,DEPARTMENT5
//if(IOE=="I"){IOE='0'; } else if(IOE=="E" || IOE=="O"){IOE='1';} else{IOE='';}
		if(viewType!=0 && viewType!=2 && viewType!=4 && checkReason!=0 && checkReason!=1)
		{
			if(uDeptCd=="ZZ")
			{
				insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'18','���� ���� ����',ipaddress);
			}
			else
			{
				//����ȯ�� üũ
				//alert(x1.rec);
				/*
				sde
					2017-12-21,=============7
					01245809,===============9
					ER,====================10
					---------------------------
				���� EMR
					01245809,===============0
					20170519,===============1
					ER,====================2
				*/
				
				var medInfo1 = new Array();
				var medInfo2 = "";
				if(sdeCheck==0)
				{
					medInfo1[0]=x1.rec[0][1]; // medDate 19900101
					medInfo1[1]=x1.rec[0][1].substring(0,4)+'-'+x1.rec[0][1].substring(4,6)+'-'+x1.rec[0][1].substring(6,8); // medDate 1990-01-01
					medInfo1[2]=x1.rec[0][2]; // medDept
					if(hyubjin!=x1.rec[0][2])
						hyubjin="N";
					else
						hyubjin="Y";
				}
				else
				{
					var tempDate = x1.rec[7].split('-');
					medInfo1[0] = tempDate[0]+tempDate[1]+tempDate[2]; // medDate 19900101
					medInfo1[1] = x1.rec[7]; // medDate 1990-01-01
					medInfo1[2] = x1.rec[10]; // medDept
					if(hyubjin!=x1.rec[10])
						hyubjin="N";
					else
						hyubjin="Y";
				}
				/* ����������ȣ ��û ȯ�� OCS���� �����ϴ°����� ����
				var checkLimit = checkLimitPid(medInfo1[1]);
				//medInfo2 = getHwanjaInfo2(pid,medInfo1[0],medInfo1[2]);//�ش��������� ��ġ�� Ȯ��
				medInfo2 = getHwanjaInfo2(pid,medDate.substring(0,4)+'-'+medDate.substring(4,6)+'-'+medDate.substring(6,8),uDeptCd); //���� ������ ��ġ�� Ȯ��
				var medDoctor = "N";
				if(medInfo2.length>0 && medInfo2[0][6]==doctorId)
					medDoctor="Y";
					
				if(checkLimit!=undefined && checkLimit.length>0 && hyubjin.toUpperCase()!='Y' && medDoctor!="Y" && uDeptCd!="HI") //�ǹ������ ����ó��
				{
					if(checkLimit[1]!="" && checkLimit[1]!=medInfo1[2]) //����������ȣ ���� �μ� �߰�
					{
					}
					else
					{
						var checkLimit = checkLimitUser(checkLimit[0],doctorId);	
						if(checkLimit==undefined)
						{
							alert("����������ȣ ��û ȯ�� �Դϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");	
							if(viewType==3)
								onBtnClose2();
							else
								onBtnClose();
							return;
						}
					}
				}
				*/
				/*����ڰ� �����ִ� ��� �μ� �� �μ��׷� Ȯ��*/
				var user_adc = "false";
				var deptCheck = getDeptInfo(uDeptCd); // ����� ���� �Ǵ�
				if(sdeCheck==0) // scan image
				{
					//x1.rec[0][3] �Կ��ܷ� I / O
					if(x1.rec[0][3]=="I" && deptCheck!=undefined && (deptCheck[0]=="D" || deptCheck[0]=="W")) // �Կ��� ��� D : ����� W : ��ȣ��(����)
					{
						//var npRead = arrTypeVarData('npRead');
						if(medDate==medInfo1[0]) //�Ķ���ͷ� ���� �Կ��ϰ� �ش� ����� �Կ����� �������
						{
							//npRetData = checkNpPrt(doctorId,'0');
							if(x1.rec[0][2]=='NP')
							{
								/*
								var toDayStr = GetDateNum();
								if(npRetData==undefined && npRead.toUpperCase()!="Y")
								{
									alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								else if((npRetData[1]>toDayStr || toDayStr>npRetData[2]) && npRead.toUpperCase()!="Y")
								{
									alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								else
									insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'13','����� ����',ipaddress);	
								*/
								returnData = npCheckFn(x1.rec[0][5],x1.rec[0][8]);
							}
							else if(x1.rec[0][2]=='OG')
							{
								returnData = ogCheckFn(x1.rec[0][5],x1.rec[0][8]);
							}
							else
								insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'13','����� ����',ipaddress);
							
						}
						else if(hyubjin.toUpperCase()=='Y')
							insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'16','�������� �ڵ� ����',ipaddress);
						else
						{
							user_adc = userAllDeptCheck(x1.rec[0][2]);	
							if(uDeptCd==x1.rec[0][2] && user_adc!="false") 
								insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'13','����� ����',ipaddress);
							else
							{
								//npRetData = checkNpPrt(doctorId,'0');
								/*if(x1.rec[0][2]=='NP' && npRetData==undefined && npRead.toUpperCase()!="Y")
								{
									alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}*/
								if(x1.rec[0][2]=='NP')
								{
									returnData = npCheckFn(x1.rec[0][5],x1.rec[0][8]);
								}
								else if(x1.rec[0][2]=='OG')
								{
									returnData = ogCheckFn(x1.rec[0][5],x1.rec[0][8]);
								}
								else
								{
								
									var i;
									for(i=0;i<checkChosData.length;i++)
									{
										if(checkChosData[i][0]==dataYn)
											break;
									}
									if(dataYn=='' || checkChosData[i].length == 1 || checkChosData[i][1]=='') //ȸ��, ������ �� �ѹ��� �˾� â ��쵵�� 
									{
										returnData = callLimitRecd('0',docCode,x1.rec[0][5]);
										if(returnData!=undefined)
										{
											var checkRetData = returnData.split("^");
											if(checkRetData[0]=="TRUE")
											{
												//insertBeramlogu(type,doctorId,uDeptCd,checkDoc,pid,checkRec,arr[0],arr[1],ipaddress);
												checkChosData[checkChosData.length-1][1] = checkRetData[1];
												checkChosData[checkChosData.length-1][2] = checkRetData[2];
												insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],checkRetData[1],checkRetData[2],ipaddress);
											}
											else
											{
												checkChosData.splice(checkChosData.length-1,1);
												parent.parent.checkChosData = checkChosData;
												returnData="false";
											}
										}
										else
										{
											checkChosData.splice(checkChosData.length-1,1);
											parent.parent.checkChosData = checkChosData;
											returnData="false";
										}
									}
									else
									{
										insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],checkChosData[i][1],checkChosData[i][2],ipaddress);
									}
								}
							}
						}
						
					}
					else //�ܷ��̰ų� �����ǰ� �ƴ� ��� 
					{
						user_adc = userAllDeptCheck(x1.rec[0][2]);	
						if(uDeptCd!=x1.rec[0][2] && user_adc=="false" && uDeptCd!=deptCd)
						{
							//�ǹ������ ����ó��
							if(uDeptCd=="HI")//�ǹ������ ���� 
								insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'17','����� íƮ ����',ipaddress);
							else
							{
								npRetData = checkNpPrt(doctorId,'0');
								ogRetData = checkNpPrt(doctorId,'2');
								if(x1.rec[0][2]=='NP' && npRetData==undefined && hyubjin.toUpperCase()!='Y')
								{
									alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								else if(x1.rec[0][2]=='OG' && ogRetData==undefined && hyubjin.toUpperCase()!='Y')
								{
									alert("����ΰ� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								/*
								if(x1.rec[0][2]=='NP')
								{
									returnData = npCheckFn(x1.rec[0][5]);
								}
								else if(x1.rec[0][2]=='OG')
								{
									returnData = ogCheckFn(x1.rec[0][5]);
								}*/
								else
								{
									if(hyubjin.toUpperCase()=='Y')
										insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'16','�������� �ڵ� ����',ipaddress);
									else
									{
										var i;
										for(i=0;i<checkChosData.length;i++)
										{
											if(checkChosData[i][0]==dataYn)
												break;
										}
										if(dataYn=='' || checkChosData[i].length == 1 || checkChosData[i][1]=='') //ȸ��, ������ �� �ѹ��� �˾� â ��쵵�� 
										{
											returnData = callLimitRecd('0',docCode,x1.rec[0][5]);
											if(returnData!=undefined)
											{
												var checkRetData = returnData.split("^");
												if(checkRetData[0]=="TRUE")
												{
													//insertBeramlogu(type,doctorId,uDeptCd,checkDoc,pid,checkRec,arr[0],arr[1],ipaddress);
													checkChosData[checkChosData.length-1][1] = checkRetData[1];
													checkChosData[checkChosData.length-1][2] = checkRetData[2];
													insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],checkRetData[1],checkRetData[2],ipaddress);
												}
												else
												{
													checkChosData.splice(checkChosData.length-1,1);
													parent.parent.checkChosData = checkChosData;
													returnData="false";
												}
											}
											else
											{
												checkChosData.splice(checkChosData.length-1,1);
												parent.parent.checkChosData = checkChosData;
												returnData="false";
											}
										}
										else
										{
											insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],checkChosData[i][1],checkChosData[i][2],ipaddress);
										}
											
									}
								}
							}
						}
						else
							insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'13','����� ����',ipaddress);
					}
				}
				else // sde record
				{
					//x1.rec[13] �Կ�/�ܷ� 0 / 1
					/*
					if(x1.rec[13]=="0" && deptCheck!=undefined && (deptCheck[0]=="D" || deptCheck[0]=="W")) // �Կ��� ��� D : ����� W : ��ȣ��(����)
					{
						//var npRead = arrTypeVarData('npRead');
						if(medDate==medInfo1[0]) //�Ķ���ͷ� ���� �Կ��ϰ� �ش� ����� �Կ����� �������
						{
							//npRetData = checkNpPrt(doctorId,'0');
							//if(x1.rec[10]=='NP' && npRetData==undefined && npRead.toUpperCase()!="Y")
							//{
								//alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
								//returnData = "false";
							//}
							if(x1.rec[10]=='NP')
							{
								returnData = npCheckFn(x1.rec[0]);
							}
							else if(x1.rec[10]=='OG')
							{
								returnData = ogCheckFn(x1.rec[0]);
							}
							else
								insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],'13','����� ����',ipaddress);
						}
						else if(hyubjin.toUpperCase()=='Y')
							insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],'16','�������� �ڵ� ����',ipaddress);
						else
						{
							user_adc = userAllDeptCheck(x1.rec[10]);	
							if(uDeptCd==x1.rec[10] && user_adc!="false")
								insertBeramlogu('0',doctorId,uDeptCd,x1.doc[0],pid,x1.rec[0],'13','����� ����',ipaddress);
							else
							{	
								//npRetData = checkNpPrt(doctorId,'0');
								//if(x1.rec[10]=='NP' && npRetData==undefined && npRead.toUpperCase()!="Y")
								//{
									//alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									//returnData = "false";
								//}
								if(x1.rec[10]=='NP')
								{
									returnData = npCheckFn(x1.rec[0]);
								}
								else if(x1.rec[10]=='OG')
								{
									returnData = ogCheckFn(x1.rec[0]);
								}
								else
								{
									if(dataYn=='')//ȸ��, ������ �� �ѹ��� �˾� â ��쵵�� 
									{
										returnData = callLimitRecd('0',x1.doc[0],x1.rec[0]);
										if(returnData!=undefined)
										{
											var checkRetData = returnData.split("^");
											if(checkRetData[0]=="TRUE")
											{
												checkChosData[checkChosData.length-1][1] = checkRetData[1];
												checkChosData[checkChosData.length-1][2] = checkRetData[2];
												insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],checkRetData[1],checkRetData[2],ipaddress);
											}
											else
											{
												checkChosData.splice(checkChosData.length-1,1);
												parent.parent.checkChosData = checkChosData;
												returnData="false";
											}
										}
										else
										{
											checkChosData.splice(checkChosData.length-1,1);
											parent.parent.checkChosData = checkChosData;
											returnData="false";
										}
									}
									else
									{
										var i;
										for(i=0;i<checkChosData.length;i++)
										{
											if(checkChosData[i][0]==dataYn)
												break;
										}
										
										insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],checkChosData[i][1],checkChosData[i][2],ipaddress);
									}
								}
							}
						}
					}
					else //�ܷ��̰ų� �����ǰ� �ƴ� ��� 
					*/
					{
						user_adc = userAllDeptCheck(x1.rec[10]);	
						if(uDeptCd!=x1.rec[10] && user_adc=="false" && uDeptCd!=deptCd)
						{
							//�ǹ������ ����ó��
							if(uDeptCd=="HI")//�ǹ������ ���� 
								insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0][5],'17','����� íƮ ����',ipaddress);
							else
							{
								npRetData = checkNpPrt(doctorId,'0');
								ogRetData = checkNpPrt(doctorId,'2');
								if(x1.rec[10]=='NP' && npRetData==undefined && hyubjin.toUpperCase()!='Y')
								{
									alert("���Ű� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								else if(x1.rec[10]=='OG' && ogRetData==undefined && hyubjin.toUpperCase()!='Y')
								{
									alert("����ΰ� ����� ���� �� �� �����ϴ�.\r\n������ ���Ͻø� �ǹ���ϽǷ� �����ּ���.");
									returnData = "false";
								}
								/*if(x1.rec[10]=='NP')
								{
									returnData = npCheckFn(x1.rec[0]);
								}
								else if(x1.rec[10]=='OG')
								{
									returnData = ogCheckFn(x1.rec[0]);
								}*/
								else
								{
									if(hyubjin.toUpperCase()=='Y')
										insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],'16','�������� �ڵ� ����',ipaddress);
									else
									{
										if(dataYn=='')//ȸ��, ������ �� �ѹ��� �˾� â ��쵵�� 
										{
											returnData = callLimitRecd('0',x1.doc[0],x1.rec[0]);
											if(returnData!=undefined)
											{
												var checkRetData = returnData.split("^");
												if(checkRetData[0]=="TRUE")
												{
													checkChosData[checkChosData.length-1][1] = checkRetData[1];
													checkChosData[checkChosData.length-1][2] = checkRetData[2];
													insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],checkRetData[1],checkRetData[2],ipaddress);
												}
												else
												{
													checkChosData.splice(checkChosData.length-1,1);
													parent.parent.checkChosData = checkChosData;
													returnData="false";
												}
											}
											else
											{
												checkChosData.splice(checkChosData.length-1,1);
												parent.parent.checkChosData = checkChosData;
												returnData="false";
											}
										}
										else
										{
											var i;
											for(i=0;i<checkChosData.length;i++)
											{
												if(checkChosData[i][0]==dataYn)
													break;
											}
											
											insertBeramlogu('0',doctorId,uDeptCd,docCode,pid,x1.rec[0],checkChosData[i][1],checkChosData[i][2],ipaddress);
										}
									}
								}
							}
						}
						else
							insertBeramlogu('0',doctorId,uDeptCd,x1.doc[0],pid,x1.rec[0],'13','����� ����',ipaddress);
					}
				}
				
				if(returnData=="false")
				{
					if(viewType==3)
						onBtnClose2();
					else
						onBtnClose();
					return;
				}
			}
		}
		else if(checkReason==0)
		{
			var fRecCode = x1.rec[0];
			if(sdeCheck==0)
				fRecCode = x1.rec[5];
			insertBeramlogu('0',doctorId,uDeptCd,x1.doc[0],pid,fRecCode,'14','�ǹ���� �纻�߱� ����',ipaddress);
		}
		else if(checkReason==1)
		{
			var fRecCode = x1.rec[0];
			if(sdeCheck==0)
				fRecCode = x1.rec[5];
			insertBeramlogu('0',doctorId,uDeptCd,x1.doc[0],pid,x1.rec[0],'15','�̺��� ����',ipaddress);	
		}
		
		if(viewType == 0 )//�ۼ�
		{
			
			/*kjk ��� �ּ�*/
			if(deptCd!=uDeptCd)
			{
				if(hyubjin!="" && hyubjin!="N" && hyubjin!="Y")
				{
					alert("���� �� ��� �ۼ��� �Ұ����մϴ�.");	
					onBtnClose();
				}
				else
				{
					alert("ȯ���� ���� �μ��� �ƴ� �μ��� ��� �ۼ��� �Ұ����մϴ�.");	
					onBtnClose();
				}
				return;
			}
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>�ű��ۼ�</b>";
			//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],'',pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",'0','','','','','','','',today]; //���� ���� ��ȸ�� recCode:0
			x1.param = [pid,doctorId,x1.doc[0],'',deptCd,x1.doc[10],x1.doc[11],x1.doc[12],chosType,pid+deptCd+medDate,'0','','','',sinerCheck,'',ptName,'',medDate.substring(0,4)+'-'+medDate.substring(4,6)+'-'+medDate.substring(6,8),x1.doc[18]]; //���� ���� ��ȸ�� recCode:0
			//alert(x1.param);
			x1.OpenDocument(0);			
		}
		else if(viewType == 1 || viewType == 3 || viewType == 4)//��ȸ
		{
			if(sdeCheck==0)
			{
				//GetObj('btn_close');
				//SetEventFunc('btn_close', 'onclick', onBtnClose);
				/*
				GetObj('btn_close').style.display="none";
				GetObj('btn_past').style.display="none";
				GetObj('btn_modi').style.display="none";
				GetObj('btn_print').style.display="none";
				GetObj('btn_delete').style.display="none";
				GetObj('docuIcon').style.display="none";
				*/
				showScanView = document.getElementById('showScanView');
				
				var defaultSize=0;
				if(viewType==3 || parent.GetObj('show_iFrame').src.indexOf("right_content")!=-1)
				{
					if(viewType==3)
					{
						defaultSize=1;
						showScanView.style.height='400px'
					}
					else
						showScanView.style.height='500px'
				}
				GetObj('btnArea').style.display="none";
				GetObj('btnArea2').style.display="none";
				
				var imgPathStr = "";
				//00596722��ȫ*����32161121111305070��1505041��NS��Y��192.168.0.100��8080����������1��http://127.0.0.1:8080/TEST/01.tif��20171217��NR�ݼ�������2��http://127.0.0.1:8080/TEST/02.tif��20171217��NR�ݼ�������3��http://127.0.0.1:8080/TEST/03.tif��20171217��NR�ݼ�������4��http://127.0.0.1:8080/TEST/04.tif��20171217��NR�ݼ�������5��http://127.0.0.1:8080/TEST/05.tif��20171217��NR�ݼ�������6��http://127.0.0.1:8080/TEST/06.tif��20171217��ENT��");
				//�Ķ���� �����ؾ��� 
				var prtRetData = checkNpPrt(doctorId,'1');
				var printAuth = "N";
				if(prtRetData!=undefined)
					printAuth = "Y";
				var userNm2 = getUserName(doctorId,'');
				var replaceStr = userNm2[0][0].substring(2,1);
			 	userNm2[0][0] = userNm2[0][0].replace(replaceStr,"*");
			 	var addrArr = ipPortAddr.split(':');
				imgPathStr+=pid+"��"+ptName+"��"+x1.rec[0][7]+"��"+doctorId+"��"+userNm2[0][0]+"��"+x1.rec[0][2]+"��"+printAuth+"��"+addrArr[0]+"��"+addrArr[1]+"��"+defaultSize+"��";
				//imgPathStr+=pid+"��"+encodeURI(encodeURIComponent(ptName))+"��"+x1.rec[0][7]+"��"+doctorId+"��"+encodeURI(encodeURIComponent(userNm2[0][0]))+"��"+x1.rec[0][2]+"��"+printAuth+"��"+addrArr[0]+"��"+addrArr[1]+"��";
				for(var k=0;k<x1.rec.length;k++)
				{
					imgPathStr+=x1.rec[k][6]+"��"+SERVERADDR+"/EMR_DATA/TIF"+x1.rec[k][4]+"/"+x1.rec[k][5]+"��"+x1.rec[k][1]+"��"+x1.rec[k][2]+"��"+docCode+"��";
				}
				
				showScanView.style.display="block";
				setTimeout(function(){
					//alert("imgPathStr : "+imgPathStr);
					if(showScanView!=undefined)
					{
						showScanView.SetImage(imgPathStr);	
					}
					else
						alert("���� EMR Viewer�� ��ġ ���� �ʾҽ��ϴ�.");
					//showScanView.SetImage("��������1��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������2��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������3��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������4��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif");	
				},100);
				//showScanView.SetImage("��������1��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������2��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������3��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif�ݼ�������4��http://192.168.2.43:8080/EMR_DATA/14120711100220000.tif");
				
			}
			else
			{
				//alert(x1.rec[13]);
				if(rec[8]=='1')		
					document.getElementById('documentInfo').innerHTML="�ӽ����� "+x1.rec[6];
				else
					document.getElementById('documentInfo').innerHTML="�������� "+x1.rec[6];
				document.getElementById('documentInfo2').innerHTML="�����ۼ��Ͻ� "+x1.rec[1];
					//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+x1.rec[5],pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",x1.rec[0],'','','','','','','',today];
					x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+x1.rec[5],x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[13],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[7],x1.doc[18]];
					x1.OpenDocument(2);
				}
		}
		else if(viewType == 2)//���� 
		{
			//alert(x1.rec[13]);
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>��� ����<b>";
			
			//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+x1.rec[5],pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",x1.rec[0],'','','','','','','',today];
			x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+x1.rec[5],x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[13],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[7],x1.doc[18]];
			//x1.OpenDocument(2);
			x1.OpenDocument(1);
			//viewType=5;	
			modiMode=1;
		}
		//CODE,SIGNER_CODE,SIGN_TIME,COSIGNER_CODE,FILENAME
		//if(sdeCheck!=0)
			second();		
	//GetObj('contentframe0').contentWindow.addEventListener('contextmenu', function (e) { e.preventDefault();}, false);//.oncontextmenu=function(){return false;}
	//alert(window.navigator.appVersion);

/* ������ �߰�
		makeZoom();
		obj.innerHTML+="<input type='button' style='width:100px;height:20px;position:absolute;' onClick='activeZoom()' title='������' value='������'/ >";
*/
//�޸� �߰�
/*if(ipaddress=="192.168.6.145")
{
	obj.innerHTML+="<input type='button' style='width:100px;height:20px;position:absolute;' onClick='addPostIt()' title='����Ʈ��' value='����Ʈ��'/ >";
}*/
}



//********************************************���� �ӽ�/���� ���� ***************************************************** */



function onDocTempSave() //�����ӽ�����
{
	var recCode=x1.SaveDocTemp(); //����ڵ� �޾Ƽ�
	recCode=recCode.split('^');
	
	if(recCode[0] != "" && recCode[0] != null && recCode[0] != '0')
	{
		modifyFlag = false;
		var a = SendServerCall('getRecentRec', ['recCode'], [[recCode[0]]], "/EMR_DATA/updateData.jsp", null); //ajax�� ���� ����� �ֱٱ�� ��������
	
		var newRec=new Array();
		 newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"),
		  a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		  a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		  a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		  a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		  a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		  a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 
		 
	 	x1.rec=newRec;
	 	//�� ��� �迭 ������
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var title=a.getKeyValue(0,0,"NAME");		
		
		
		//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+newFname,pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",recCode[0],'','','','','','','',today];
		x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.doc[18]];
		
	/*
	no = parent.GetTabIdx(idx);
	if(no == -1)
		return;*/
	var onOff='';	
		
	if(no==0)
	{
			onOff='r_first';
	}
	 else if(no!=0)
	{
			onOff='r';
	}
	
	if(title.length > 10)
	{
		nowTitle=title.substring(0,10)+"��";
	}
 			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+"<tr padding='0'><td  class='gap_l_on' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on' onClick='Set("+idx+")' align='center'><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' onClick='Set("+idx+")' ></td></td></tr></table>";

		   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td class='gap_l_off' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off' onClick='Set("+idx+")'  align='center' ><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ><td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";
	
	 		winTab.ShowHideWindow(idx);
	 		/*winTab.tab[no].id=winTab.tab[no].id.replace("document","record");
	 		winTab.tab[no].winId=winTab.tab[no].winId.replace("document","record");
	 		winTab.tab[no].window.id=winTab.tab[no].window.id.replace("document","record");*/
	 		winTab.tab[no].state = 1;
		document.getElementById('documentInfo').innerHTML="�ӽ����� "+a.getKeyValue(0,0,"MODIFY_TIME"); //+" "+a.getKeyValue(0,0,"SIGNER_CODE2");
		document.getElementById('documentInfo2').innerHTML="�����ۼ��Ͻ� "+a.getKeyValue(0,0,"CREATE_TIME");
		document.getElementById('docuIcon').innerHTML=	"<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >"
																						//"<img src='images/icon_11_l_out.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' onmouseover=this.src='images/icon_11_l_over.gif' onmouseout=this.src='images/icon_11_l_out.gif'>"
																						/*+"<img src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='�μ�' title='�μ�' onclick='onPrintRecord()'>"*/
																						//+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='updateConfirmSave()'>"//��������
																						//+"<img src='images/icon_02_c_out.gif' id='btn_delete' onmouseover=this.src='images/icon_02_c_over.gif' onmouseout=this.src='images/icon_02_c_out.gif' alt='����' title='����' onclick='onDeleteRecord()'>"
																						//+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�'>";
																						+"<img src='images/js_butt_24_del.gif' id='btn_delete' alt='����' title='����' onclick='onDeleteRecord()'>";
																						//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�'>";
		x1.OpenDocument(2);	
		
		//alert("�ӽ������� �Ϸ�Ǿ����ϴ�.");
		parent.parent.refreshRecData(newRec[10]+"_"+newRec[33]);
		//recIdx = parent.parent.BK_REC_DATA.length -1;
		//SetEventFunc('btn_close', 'onclick', onBtnClose);
		alert("�ӽ������� �Ϸ�Ǿ����ϴ�.");
	}
}





function onDocConfirmSave()//���� ��������-����� ���ο� ���������� left2�� refresh
{		
	var recCode=x1.SaveDocument(); //����ڵ� �޾Ƽ�
		
	if(recCode != false)
	{
		
		recCode=recCode.split('^');
	
		if(recCode[0] != "" || recCode[0] != null)
		{
			
			modifyFlag = false;
			var a = SendServerCall('getRecentRec', ['recCode'], [[recCode[0]]], "/EMR_DATA/updateData.jsp", null); //ajax�� ���� ����� �ֱٱ�� ��������
		
			var newRec=new Array();
			 newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS")
			 , a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT")
			 ,a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE")
			 ,a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME")
			 ,a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE")
			 ,a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2")
			 ,a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 	//�� ��� �迭 ������
		 	x1.rec=newRec;
			var newFname=a.getKeyValue(0,0,"FILENAME");
			var title=a.getKeyValue(0,0,"NAME");
	
			
			//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+newFname,deptCd,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",recCode[0],'','','','','','','',today];
			x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.doc[18]];
			
			var onOff='';	
			if(no==0)
			{
				onOff='r_first';
			}
		  	else if(no!=0)
			{
				onOff='r';
			}
	  		
	  		if(title.length > 10)
			{
				nowTitle=title.substring(0,10)+"��";
			}
			
 			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+"<tr padding='0'><td  class='gap_l_on' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on' onClick='Set("+idx+")' align='center'><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' onClick='Set("+idx+")' ></td></td></tr></table>";

		   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td class='gap_l_off' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off' onClick='Set("+idx+")'  align='center' ><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ><td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";
	
		 
			winTab.ShowHideWindow(idx);
/*			winTab.tab[no].id=winTab.tab[no].id.replace("document","record");
			winTab.tab[no].winId=winTab.tab[no].winId.replace("document","record");
			winTab.tab[no].window.id=winTab.tab[no].window.id.replace("document","record");*/
			winTab.tab[no].state = 1;
			document.getElementById('documentInfo').innerHTML="�������� "+a.getKeyValue(0,0,"MODIFY_TIME")+" "+a.getKeyValue(0,0,"SIGNER_CODE2");

	
			document.getElementById('docuIcon').innerHTML=	"<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >";
																							//"<img src='images/icon_11_l_out.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' onmouseover=this.src='images/icon_11_l_over.gif' onmouseout=this.src='images/icon_11_l_out.gif'>"																					
																							/*+"<img src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='�μ�' title='�μ�' onclick='onPrintRecord()'>"*/
																							//+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='updateConfirmSave()'>"//��������
																							//+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�'>";
																							//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
			x1.OpenDocument(2);	
			//alert("���������� �Ϸ�Ǿ����ϴ�.");
		
			parent.parent.refreshRecData(newRec[10]+"_"+newRec[33]);	
			//recIdx = parent.parent.BK_REC_DATA.length -1;
			//SetEventFunc('btn_close', 'onclick', onBtnClose);
			alert("���������� �Ϸ�Ǿ����ϴ�.");
		}
	}
}




//********************************************��� �ӽ�/���� ���� ***************************************************** */



function onRecTempSave() //����ӽ����� -ȭ�鿡�ݿ�//Ʈ���� �ݿ�
{
	if(x1.rec[8] == 0 || x1.rec[8] == '0')
	{
		alert("��������� ����� �ӽ����� �� �� �����ϴ�");
		return 0;
	}
	
	if(modiMode==1)
	{
		//kjk ���� �̷� �ֱ�
		/*returnData = callLimitRecd('1',docCode,x1.rec[0][5]);
		if(returnData=='false')
		{
			alert("��� ���� ������ ��ҵǾ����ϴ�.");	
			return;
		}*/
		insertBeramlogu('1',doctorId,uDeptCd,docCode,pid,x1.rec[0],'6','�ӽ������ ��� �ٽ� �ӽ�����',ipaddress);
		var recCode=x1.SaveDocTemp();	
		recCode=recCode.split('^');
		
		modifyFlag = false;
		
		var a=SendServerCall('getRecentRec', ['recCode'],[[recCode[0]]],"/EMR_DATA/updateData.jsp",null);
		
		var newRec=new Array();
		newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"NAME"), a.getKeyValue(0,0,"COMMON_CODE"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"), 
		a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		x1.rec=newRec;
		
		//alert(newRec);

		if(recIdx !=null && recIdx!="null")
		{
	 		//parent.parent.BK_REC_DATA[recIdx]=newRec;//�����ȵ����ͷ� ����
	 	}
		else
		{				
			//parent.parent.BK_REC_DATA[parent.parent.BK_REC_DATA.length++]=newRec;
			//recIdx=parent.parent.BK_REC_DATA.length;			
		}		
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var moditime=a.getKeyValue(0,0,"MODIFY_TIME"); 
		var title=a.getKeyValue(0,0,"NAME");		
		
		//x1.param=[BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+newFname,pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",recCode[0],'','','','','','','',today]; 
		x1.param=[pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.rec[28]];
		
		if(title.length > 10)
		{
			nowTitle=title.substring(0,10)+"��";
		}
		winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
	  		      							+"<tr padding='0'><td  class='gap_l_on' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on' onClick='Set("+idx+")' align='center'><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' onClick='Set("+idx+")' ></td></td></tr></table>";

	   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
	  		      							+ "<tr padding='0'><td class='gap_l_off' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off' onClick='Set("+idx+")'  align='center' ><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ><td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";
		
		winTab.ShowHideWindow(idx);
		/*winTab.tab[no].id=winTab.tab[no].id.replace("document","record");
		winTab.tab[no].winId=winTab.tab[no].winId.replace("document","record");
		winTab.tab[no].window.id=winTab.tab[no].window.id.replace("document","record");*/
		winTab.tab[no].state = 1;
		document.getElementById('contentArea').innerHTML="";
		document.getElementById('documentInfo').innerHTML="�ӽ����� "+moditime;
		document.getElementById('documentInfo2').innerHTML="�����ۼ��Ͻ� "+a.getKeyValue(0,0,"CREATE_TIME");
		document.getElementById('docuIcon').innerHTML= "<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >"
																							//"<img src='images/icon_11_l_out.gif'  onmouseover=this.src='images/icon_11_l_over.gif' onmouseout=this.src='images/icon_11_l_out.gif'   id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���'>" 
																							/*+"<img src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='�μ�' title='�μ�' onclick='onPrintRecord()'>"*/
																							//+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='updateConfirmSave()'>"//��������
																							//+"<img src='images/icon_02_c_out.gif' id='btn_delete' onmouseover=this.src='images/icon_02_c_over.gif' onmouseout=this.src='images/icon_02_c_out.gif' alt='����' title='����' onclick='onDeleteRecord()'>"
																							//+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
																							+"<img src='images/js_butt_24_del.gif' id='btn_delete' alt='����' title='����' onclick='onDeleteRecord()'>";
																							//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
	
		x1.OpenDocument(2);				
		//alert("�ӽ������� �Ϸ�Ǿ����ϴ�.");
		if(checkReason!=1)
		{
			if(parent.parent.refreshOldData)
				parent.parent.refreshOldData(newRec[10]+"_"+newRec[33],recIdx);
		}
		else
			parent.conBody.search_incom();
		modiMode=0;
		alert("�ӽ������� �Ϸ�Ǿ����ϴ�.");
		
	}
		//else
		//alert("��ϼ��� �� �����ư�� �����ּ���");
}

function onRecPastHistory()
{
	window.showModalDialog(SERVERADDR+"/EMR_DATA/popup/modifyHistory.jsp?pid="+pid+"&docCode="+x1.param[2]+"&recCode="+x1.param[10],
	'popup','dialogWidth=520px; dialogHeight=550px; center:yes; scroll=yes; resizable=no; status:no; help:no; dialogHide:yes;');
}
var regData;
function fn_printRec()
{
	var cPrintRec = checkPrint(x1.param[10]) //x1.rec[11] ������ȣ 
	if(cPrintRec!=undefined)
	{
		regData = checkBeramrecd(x1.param[10]);
		if(regData==undefined)
		{
			var printDate = cPrintRec[1].substring(0,4)+'-'+cPrintRec[1].substring(4,6)+'-'+cPrintRec[1].substring(6,8);
			var confirmStr = printDate+"' �� '"+cPrintRec[2]+"' �뵵�� �纻�߱� �� ����Դϴ�. \r\n�ǹ���ϽǷ� �纻�߱޵� ��Ͽ� ���� ���� ��û �Ͻðڽ��ϱ�?";
			if(confirm(confirmStr))
			{
				var returnReason = callLimitRecd('3','0','0');
				if(returnReason!=undefined)
				{
					returnReason = returnReason.split('^');
					if(returnReason[0]=="TRUE")
					{
						//PTID,CHOS_NO,CODE,DEPARTMENT,RECORD_TIME,STATUS,MODIFIER_CODE,CAUSE,REGISTRANT
						insertBeramrecd(x1.param[0],x1.param[9],x1.param[10],x1.param[4],x1.param[18],'0',doctorId,returnReason[1]);
						alert("�ش� ��Ͽ� ���� ���� ��û�� �Ϸ�Ǿ����ϴ�. �ǹ���ϽǷ� �������ּ���.");
						return 0;
					}
					else
					{
						alert("�ش� ��Ͽ� ���� ���� ��û�� ����Ͽ����ϴ�.");	
						return 0;
					}
				}
				else
				{
					alert("�ش� ��Ͽ� ���� ���� ��û�� ����Ͽ����ϴ�.");	
					return 0;
				}
			}
			else
			{
				alert("����Ͽ����ϴ�.");	
				return 0;
			}
		}
		else if(regData[5]=="0")
		{
			alert("��� ���� ��û�� �����Դϴ�. ����/�ݷ� �� �������ּ���.");	
			return 0;
		}
		else if(regData[5]=="1")
		{
			return 1;
		}
		else if(regData[5]=="2")
		{
			alert("��� ���� ��û�� �ݷ��� �����Դϴ�. ����� ������ �� �����ϴ�. �ǹ���ϽǷ� ���� �ٶ��ϴ�.");	
			return 0;
		}
		else if(regData[5]=="3")
		{
			var confirmStr = "��� ������ �Ϸ�� ���� �Դϴ�. �ٽ� ��û�ϰڽ��ϱ�?";
			if(confirm(confirmStr))
			{
				var returnReason = callLimitRecd('3','0','0');
				if(returnReason!=undefined)
				{
					returnReason = returnReason.split('^');
					if(returnReason[0]=="TRUE")
					{
						insertBeramrecd(x1.param[0],x1.param[9],x1.param[10],x1.param[4],x1.param[18],'0',doctorId,returnReason[1]);
						alert("�ش� ��Ͽ� ���� ���� ��û�� �Ϸ�Ǿ����ϴ�. �ǹ���ϽǷ� �������ּ���.");
						return 0;
					}
				}
				else
				{
					alert("����Ͽ����ϴ�.");
					return 0;
				}
			}
			else
			{
				alert("����Ͽ����ϴ�.");	
				return 0;
			}
		}
	}
	else
		return 2;
	/*else
	{
		var returnReason = callLimitRecd('1',docCode,x1.param[10]);
		if(returnReason!=undefined)
		{
			//returnReason = returnReason.split('^');
			if(returnReason=="TRUE")
			{
				//PTID,CHOS_NO,CODE,DEPARTMENT,RECORD_TIME,STATUS,MODIFIER_CODE,CAUSE,REGISTRANT
				//insertBeramrecd(x1.param[0],x1.param[9],x1.param[10],x1.param[4],x1.param[18],'0',doctorId,returnReason[1]);
				return 1;
			}
			else
			{
				alert("���� ���� �Է��� ����Ͽ����ϴ�.");	
				return 0;
			}
		}
		else
		{
			alert("���� ���� �Է��� ����Ͽ����ϴ�.");	
			return 0;
		}
	}*/
	
	//return 1;
}

function updateConfirmSave()
{
	//kjk ���� �̷� �ֱ�
	if(x1.param[8]==1 || x1.param[8]=="1")
		insertBeramlogu('1',doctorId,uDeptCd,docCode,pid,x1.param[10],'1','�ӽ������ ��� ��������',ipaddress);
	else
	{
		/* �纻�߱�Ȯ�� */
		var retCheckPrint = fn_printRec();
		if(!retCheckPrint)
			return;
		returnData = callLimitRecd('1',docCode,x1.param[10]);
		if(returnData==undefined || returnData=='FALSE')
		{
			alert("���� ������ ��ҵǾ����ϴ�.");	
			return;
		}
	}
	
	
	var saveParam = [x1.param[10],x1.param[2],x1.param[0],doctorId,'0',x1.param[4],x1.param[9],x1.param[8],sinerCheck,'','',x1.param[16],x1.param[18]];
	var returnXml = x1.xmlhttpPost_Sync(SERVERADDR+x1.param[3], "", 4);
	returnXml = returnXml.split('</DOCUMENT>');
	var recXml = returnXml[0].split('<SIGN');
	var retResult = x1.post_to_url(recXml[0],saveParam);
	if(retResult!=false)
	{
		var a=SendServerCall('getRecentRec', ['recCode'], [[x1.param[10]]],"/EMR_DATA/updateData.jsp",null);
		 	 	
		var recAddress=a.getKeyValue(0,0,"FILENAME");
		var moditime=a.getKeyValue(0,0,"MODIFY_TIME");

		var newRec=new Array();
		newRec=[ a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"),  a.getKeyValue(0,0,"STATUS"),
		 a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		 a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		 a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		 a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		 a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		 a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 	//�� ��� �迭 ������
		x1.rec=newRec;
		//parent.parent.BK_REC_DATA[recIdx]=newRec;//�����ȵ����ͷ� ����
		
		//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+recAddress,deptCd,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",x1.rec[1],'','','','','','','',today];
		x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+recAddress,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.rec[28]];
		document.getElementById('contentArea').innerHTML="";
		document.getElementById('documentInfo').innerHTML="�������� "+moditime;
		document.getElementById('documentInfo2').innerHTML="�����ۼ��Ͻ� "+a.getKeyValue(0,0,"CREATE_TIME");
		document.getElementById('docuIcon').innerHTML="<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >";
																					//"<img src='images/icon_11_l_out.gif'  onmouseover=this.src='images/icon_11_l_over.gif' onmouseout=this.src='images/icon_11_l_out.gif'   id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���'>"
																					/*+"<img src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='�μ�' title='�μ�' onclick='onPrintRecord()'>"*/
																					//+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='updateConfirmSave()'>"//��������
																					//+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
																					//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";

		//alert("���������� �Ϸ�Ǿ����ϴ�.");
		x1.OpenDocument(2);
		if(checkReason!=1)
				parent.parent.refreshOldData(newRec[10]+"_"+newRec[33],recIdx);
			else
				parent.conBody.search_incom();	
		alert("���������� �Ϸ�Ǿ����ϴ�.");
	}
	else
		alert("�������忡 �����Ͽ����ϴ�.");
	
	//sinerCheck 2 ������ �̿�
	/*var returnVal = updateConfirmSaveMrecd(x1.rec[0],sinerCheck,doctorId,ipaddress);
	if(returnVal=="1")
	{
		returnVal = insertConfirmSaveHrecd(x1.rec[0]);
		if(returnVal=="1")
		{
			updateConfirmSaveHrecd(x1.rec[0],sinerCheck,doctorId,ipaddress);
			alert("���������� �Ϸ�Ǿ����ϴ�.");
			if(checkReason!=1)
				parent.parent.refreshOldData(x1.rec[10],recIdx);
			else
				parent.conBody.search_incom();	
		}
		else
			alert("�������忡 �����ϼ̽��ϴ�.");
	}*/
}

function onConfirmRecSave()//�����������
{
	if(modiMode==1)	
	{
		//kjk ���� �̷� �ֱ�
		if(x1.rec[8]==1 || x1.rec[8]=="1")
			insertBeramlogu('1',doctorId,uDeptCd,docCode,pid,x1.rec[0],'4','�ӽ������ ��� ��������',ipaddress);
		else
		{
			if(x1.rec[7]==GetDate())
				insertBeramlogu('1',doctorId,uDeptCd,docCode,pid,x1.rec[0],'5','���� �� ���� ��������',ipaddress);
			else
			{
				returnData = callLimitRecd('1',docCode,x1.rec[0]);
				if(returnData==undefined || returnData=='FALSE')
				{
					alert("��� ���� ������ ��ҵǾ����ϴ�.");	
					return;
				}
			}
		}
		//�纻�߱޵� ����ϰ�� update
		var retCheckPrint = fn_printRec();
		if(retCheckPrint==1)
			updateBeramrecd(x1.param[0],x1.param[9],x1.param[10],x1.param[4],x1.param[18],'3',doctorId);
		
		var recCode=x1.SaveDocument();
		if(recCode !=false)
		{
			
			recCode=recCode.split('^');
			if(recCode[0] != "" || recCode[0] !=null)
			{
				modifyFlag = false;
		 	 	var a=SendServerCall('getRecentRec', ['recCode'], [[recCode[0]]],"/EMR_DATA/updateData.jsp",null);
		 	 	
				var recAddress=a.getKeyValue(0,0,"FILENAME");
				var moditime=a.getKeyValue(0,0,"MODIFY_TIME");
				var title=a.getKeyValue(0,0,"NAME");		
		
				var newRec=new Array();
				newRec=[ a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"),  a.getKeyValue(0,0,"STATUS"),
				 a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
				 a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
				 a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
				 a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
				 a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
				 a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
				 	//�� ��� �迭 ������
				x1.rec=newRec;
				//parent.parent.BK_REC_DATA[recIdx]=newRec;//�����ȵ����ͷ� ����
				
				//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+recAddress,deptCd,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",x1.rec[1],'','','','','','','',today];
				x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+recAddress,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.rec[28]];

				if(title.length > 10)
				{
					nowTitle=title.substring(0,10)+"��";
				}
				winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
			  		      							+"<tr padding='0'><td  class='gap_l_on' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on' onClick='Set("+idx+")' align='center'><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on' onClick='Set("+idx+")' ></td></td></tr></table>";
		
			   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
			  		      							+ "<tr padding='0'><td class='gap_l_off' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off' onClick='Set("+idx+")'  align='center' ><span class='red'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ><td><td class='gap_r_off' onClick='Set("+idx+")'></td></td></tr></table>";
				
				winTab.ShowHideWindow(idx);
				/*winTab.tab[no].id=winTab.tab[no].id.replace("document","record");
				winTab.tab[no].winId=winTab.tab[no].winId.replace("document","record");
				winTab.tab[no].window.id=winTab.tab[no].window.id.replace("document","record");*/
				winTab.tab[no].state = 1;
				document.getElementById('contentArea').innerHTML="";
				document.getElementById('documentInfo').innerHTML="�������� "+moditime;
				document.getElementById('documentInfo2').innerHTML="�����ۼ��Ͻ� "+a.getKeyValue(0,0,"CREATE_TIME");
				document.getElementById('docuIcon').innerHTML="<img src='images/js_butt_r24_modify.gif' id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���' >";
																							//"<img src='images/icon_11_l_out.gif'  onmouseover=this.src='images/icon_11_l_over.gif' onmouseout=this.src='images/icon_11_l_out.gif'   id='btn_modi' onclick='ModifyRecord()' alt='��ϼ���' title='��ϼ���'>"
																							/*+"<img src='images/btn_print_out.jpg' id='btn_print' onmouseover=this.src='images/btn_print_over.gif' onmouseout=this.src='images/btn_print_out.jpg' alt='�μ�' title='�μ�' onclick='onPrintRecord()'>"*/
																							//+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='updateConfirmSave()'>"//��������
																							//+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
																							//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
	
				//alert("���������� �Ϸ�Ǿ����ϴ�.");
				x1.OpenDocument(2);		
				if(checkReason!=1)
				{
					if(parent.parent.refreshOldData)
						parent.parent.refreshOldData(newRec[10]+"_"+newRec[33],recIdx);
				}
				else
					parent.conBody.search_incom();
				modiMode=0;	
				alert("���������� �Ϸ�Ǿ����ϴ�.");
			}
		}
	}
	//else
		//alert("��ϼ��� �� �����ư�� �����ּ���");
}		


var nowTitle = "";
function ModifyRecord(pastData)
{
	if(pastData!=1)
	{
		var documentCheck = 0;
		for(var j=0;j<winTab.tab.length;j++)
		{
			//if(winTab.tab[j].id!=undefined && winTab.tab[j].id.indexOf('document')!=-1)
			if(winTab.tab[j].id!=undefined && (winTab.tab[j].state==0 || winTab.tab[j].state=="0"))
				documentCheck = 1;
		}
		if(documentCheck)
		{
			alert("���� �ٸ� �ǿ� �ۼ��ϰ��ִ� ����� �ֽ��ϴ�. �Ϸ� �� �����Ͻñ�ٶ��ϴ�.");
			return;
		}
		/*create table BERAMRECD
			(
			SEQ_NO numeric(20,0) identity not null,  -- sequence
			PTID varchar(50) null,								-- ȯ�ڹ���
			CHOS_NO varchar(50) null,                  -- ������ȣ
			CODE varchar(11) null, 							-- ����ڵ�
			DEPARTMENT varchar(11) null,				-- �μ�
			RECORD_TIME	 varchar(21) null,			-- ������
			STATUS varchar(2) null,							-- ����(0:��ϼ�����û 1:���� 2:�ݷ� 3:��ϼ����Ϸ�)
			MODIFIER_CODE varchar(11) null,			-- ����/�ݷ� �۾��ھ��̵�
			MODIFY_TIME	varchar(21) null,				-- ����/�ݷ� �۾��ð�(����Ͻú���)
			CAUSE varchar(256) null	,						-- ���� ���� 
			REGISTRANT varchar(11) null,				-- ��û/�Ϸ� ��ϼ����ھ��̵�
			REGISTRATION_DATE varchar(21) null	-- ��û/�Ϸ� ��ϼ����ð�(����Ͻú���)
			)*/
		
		
		var a = SendServerCall('getRecentRec', ['recCode'], [[x1.rec[0]]], "/EMR_DATA/updateData.jsp", null); //ajax�� ���� ����� �ֱٱ�� ��������
	
		var newRec=new Array();
		 newRec=[a.getKeyValue(0,0,"CODE"), a.getKeyValue(0,0,"COMMON_CODE"), a.getKeyValue(0,0,"NAME"),a.getKeyValue(0,0,"SEQ_NO"), a.getKeyValue(0,0,"STATUS"),
		  a.getKeyValue(0,0,"DOC_CODE"), a.getKeyValue(0,0,"PTID"), a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"TEMPSAVE"),a.getKeyValue(0,0,"CATEGORY2"),a.getKeyValue(0,0,"DEPARTMENT"),
		  a.getKeyValue(0,0,"CHOS_NO"),a.getKeyValue(0,0,"MODIFIER_CODE"),a.getKeyValue(0,0,"CREATE_TIME"),a.getKeyValue(0,0,"MODIFY_TIME"),a.getKeyValue(0,0,"SIGNER_CODE"),
		  a.getKeyValue(0,0,"SIGN_TIME"),a.getKeyValue(0,0,"COSIGNER_CODE"),a.getKeyValue(0,0,"COSIGN_TIME"),a.getKeyValue(0,0,"PRINTED"),a.getKeyValue(0,0,"FILENAME"),
		  a.getKeyValue(0,0,"RECORDTYPE"),a.getKeyValue(0,0,"INCOMPLETE"),a.getKeyValue(0,0,"CATEGORY1"),a.getKeyValue(0,0,"CATEGORY3"),a.getKeyValue(0,0,"CREATOR_CODE"),
		  a.getKeyValue(0,0,"SIGNLEVEL"),a.getKeyValue(0,0,"EXT_RECD_CODE"),a.getKeyValue(0,0,"DOC_VER"),a.getKeyValue(0,0,"INSF_DOC_CODE"),a.getKeyValue(0,0,"SIGNER_CODE2"),
		  a.getKeyValue(0,0,"SIGN_TIME2"),a.getKeyValue(0,0,"COSIGNER_CODE2"),a.getKeyValue(0,0,"RECORD_TIME"),a.getKeyValue(0,0,"COSIGN_CANDIDATE_CD")];
		 
		 
	 	x1.rec=newRec;
	 	//�� ��� �迭 ������
		var newFname=a.getKeyValue(0,0,"FILENAME");
		var title=a.getKeyValue(0,0,"NAME");		
		
		
		//x1.param = [BK_HWAN_JA[0],BK_USER[0],x1.doc[0],"/"+BK_DOC_PATH+"/"+newFname,pat_Dept,x1.doc[10],x1.doc[11],x1.doc[12],"1","1",recCode[0],'','','','','','','',today];
		x1.param = [pid,doctorId,x1.doc[0],"/"+BK_DOC_PATH+newFname,x1.rec[10],x1.doc[10],x1.doc[11],x1.doc[12],x1.rec[26],x1.rec[11],x1.rec[0],'','','',sinerCheck,'',ptName,'',x1.rec[33],x1.doc[18]];
		
		
		
		//�ۼ����� �μ� ������
		var staffArr = staffCheck(x1.rec[10]);
		var staffYn = "N";
		if(staffArr.length!=0 && sinerCheck!="2") // ������ ����� ���� �μ� �����ǳ��� ���� ���� ���ϵ��� �߰�
		{
			for(var i=0;i<staffArr.length;i++)
			{
				if(doctorId==staffArr[i][0])
				{
					staffYn="Y";
					break;
				}
			}
		}
		
		var recdUser = getUserName(x1.rec[12],parent.parent.uDeptCd);
		if(recdUser!=undefined && recdUser[0][4]=="S")
		{
			if(doctorId!=x1.rec[12])
			{
				alert("�ۼ��ڸ� ��� ������ �����մϴ�.");
				return;
			}
		}
		else
		{
			if(doctorId!=x1.rec[12] && staffYn!='Y')
			{
				alert("�ۼ��ڸ� ��� ������ �����մϴ�.");
				return;
			}
		}
		
		//if(doctorId==x1.rec[12] && staffYn=='Y')
		{
			//�������� ��� Ȯ�� 
			if(x1.rec[8]!=1 && x1.rec[8]!="1")
			{
				/* �纻�߱޵� ��� Ȯ�� */
				var retCheckPrint = fn_printRec();
				if(retCheckPrint==0)
					return;
			}	
			
			if(title.length > 10)
			{
				nowTitle=title.substring(0,10)+"��";
			}
 			winTab.tab[no].clickOn = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+"<tr padding='0'><td  class='gap_l_on_blue' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='on_blue' onClick='Set("+idx+")' align='center'><span class='green'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ></td><td class='gap_r_on_blue' onClick='Set("+idx+")' ></td></td></tr></table>";

		   winTab.tab[no].clickOff = "<table cellpadding='0' cellspacing='0' border='0'  padding='0'>"
		  		      							+ "<tr padding='0'><td class='gap_l_off_blue' onClick='Set("+idx+")' padding='0'></td><td width='150px' class='off_blue' onClick='Set("+idx+")'  align='center' ><span class='green'>"+nowTitle+"</span><img style='vertical-align:middle;float:right;cursor:pointer' src='images/closeIcon.png' id='btn_close'  alt='�ݱ�' title='�ݱ�' onClick='CloseSet("+idx+")' ><td><td class='gap_r_off_blue' onClick='Set("+idx+")'></td></td></tr></table>";
	
	 		winTab.ShowHideWindow(idx);
	 		/*winTab.tab[no].id=winTab.tab[no].id.replace("record","document");
	 		winTab.tab[no].winId=winTab.tab[no].winId.replace("record","document");
			winTab.tab[no].window.id=winTab.tab[no].window.id.replace("record","document");*/
			winTab.tab[no].state = 0;
			document.getElementById('contentArea').innerHTML="";
			document.getElementById('documentInfo').innerHTML="";
			document.getElementById('documentInfo').innerHTML="<b style='font-size:15px'>��� ����<b>";
			document.getElementById('documentInfo2').innerHTML="";
			document.getElementById('docuIcon').innerHTML=" ";
			/*document.getElementById('docuIcon').innerHTML="<img src='images/icon_04_l_out.gif' id='btn_rec_temp_save' onmouseover=this.src='images/icon_04_l_over.gif' onmouseout=this.src='images/icon_04_l_out.gif' alt='�ӽ�����' title='�ӽ�����' onclick='onRecTempSave()'>"
															+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='onConfirmRecSave()'>"//��������
															+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
					*/
			document.getElementById('docuIcon').innerHTML="<img src='images/js_butt_r24_savetemp.gif' id='btn_rec_temp_save'  alt='�ӽ�����' title='�ӽ�����' onclick='onRecTempSave()'>"
															+"<img src='images/js_butt_r24_confirmsave.gif' id='btn_rec_save'  alt='��������' title='��������' onclick='onConfirmRecSave()'>";  //��������
															//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
			x1.OpenDocument(1);
			viewType=5;	
		
			
			modiMode=1;
		}
		//else
			//alert("�ۼ��ڸ� ��� ������ �����մϴ�.");
	}
	else
	{
		var recdFileName = getPastRecd(x1.param[2]);
		if(recdFileName.length==0)
		{
			alert("�ش� �������� �ֱ� �ۼ��� ����� �����ϴ�.");
			return;
		}
		document.getElementById('contentArea').innerHTML="";
		document.getElementById('documentInfo').innerHTML="";
		document.getElementById('documentInfo').innerHTML="�ű��ۼ�";
		document.getElementById('documentInfo2').innerHTML="";
		document.getElementById('docuIcon').innerHTML=" ";
		/*document.getElementById('docuIcon').innerHTML="<img src='images/icon_04_l_out.gif' id='btn_rec_temp_save' onmouseover=this.src='images/icon_04_l_over.gif' onmouseout=this.src='images/icon_04_l_out.gif' alt='�ӽ�����' title='�ӽ�����' onclick='onDocTempSave()'>"
														+"<img src='images/btn_confirm_save_out.gif' id='btn_rec_save' onmouseover=this.src='images/btn_confirm_save_over.gif' onmouseout=this.src='images/btn_confirm_save_out.gif' alt='��������' title='��������' onclick='onDocConfirmSave()'>"//��������											
														+"<img src='images/btn_close_out.gif' id='btn_close' onmouseover=this.src='images/btn_close_over.gif' onmouseout=this.src='images/btn_close_out.gif' alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
		*/
		document.getElementById('docuIcon').innerHTML="<img src='images/js_butt_r24_savetemp.gif' id='btn_rec_temp_save'  alt='�ӽ�����' title='�ӽ�����' onclick='onDocTempSave()'>"
														+"<img src='images/js_butt_r24_confirmsave.gif' id='btn_rec_save'  alt='��������' title='��������' onclick='onDocConfirmSave()'>";//��������											
														//+"<img src='images/js_butt_24_close2.jpg' id='btn_close'  alt='�ݱ�' title='�ݱ�' onclick='onBtnClose()'>";
		x1.param[3] = "/EMR_DATA"+recdFileName[0][0];
		x1.OpenDocument(1);
		viewType=6;	
		modiMode=2;
	}
}

function insertPrintData(chosNo,pDoc,pRec,dept,arr)
{
	//obj.NewPrintPage("http://192.168.2.43:8080/EMR_DATA/html/pr_207_4.html","192.168.2.43:8080/EMR_DATA/xml/2017/11_27/207_1840479_01245809_1511763066092.XML^1^9^^gubun^pid^^^^^^doctorId^recCode^chosNo^createDate^prtYn^prtNum^commentCode^commentValue^pName^docCode^dep^hSeq^^^^^0^",600,800);
	//HRECD SEQ_NO ��������
	var hSeqNo = getHistorySeq(pid,pRec,pDoc);
	
	var today = GetDate();
	today = today.split('-');
	var printObj=GetObj('bkPrint');
	printObj.NewPrintPage(SERVERADDR+"/EMR_DATA/html/"+x1.doc[6],ipPortAddr+"/EMR_DATA"+x1.rec[5]+"^1^9^^"+x1.rec[13]+"^"+pid+"^"+SERVERADDR+"^^^^^"+doctorId+"^"+pRec+"^"+chosNo+"^"+today[0]+today[1]+today[2]+"^N^"+arr[3]+"^"+arr[1]+"^"+arr[2]+"^"+ptName+"^"+pDoc+"^"+dept+"^"+hSeqNo[0]+"^^^^^0^",600,800);
	
	//alert("�纻�߱� ��û�� �Ϸ�Ǿ����ϴ�.");
	/*
	//HRECD SEQ_NO ��������
	var hSeqNo = getHistorySeq(pid,pRec,pDoc,dept);
	//�������� �� ��������
	
	var today = GetDate();
	today = today.split('-');
	var printDataCheck = selectPrintCheck(pid,today[0]+today[1]+today[2],dept,doctorId,arr[0],pRec);
	if(printDataCheck=="0")
		insertBermprint(pid,'1',doctorId,pRec,chosNo,today[0]+today[1]+today[2],'N',arr[2],arr[0],arr[1],ptName,pDoc,dept,hSeqNo[0]);
	else
		updateBermprint(pid,today[0]+today[1]+today[2],dept,doctorId,arr[0],pRec,hSeqNo[0]);
			
	alert("�纻�߱� ��û�� �Ϸ�Ǿ����ϴ�.");
	*/
}

function onPrintRecord()
{
	/* ����׽�Ʈ�� �ּ�*/
	var prtRetData = checkNpPrt(doctorId,'1');
	//var patInfo = getHwanjaInfo2(pid,x1.rec[7].replace("-","").replace("-",""),x1.rec[10]);
	if(prtRetData==undefined)
	{
		/*var deptCheck = getDeptInfo(uDeptCd); //��� �������θ� ���
		if(deptCheck[0]!="D")
		{
			alert("������� �纻�߱� ��û�� �����մϴ�.");	
			return;
		}*/
		
		if(x1.rec[8]!="0")
		{
			alert("�ӽ������ ����� �纻�߱� ��û�� �Ұ����մϴ�.");
			return;
		}
		
		var pName="";
		var chosNo="";
		var pDoc="";
		var pRec="";
	
		if(sdeCheck==0)
		{
			chosNo=x1.rec[7];
			pDoc=docCode;
			pRec=x1.rec[5];
		}
		else
		{
			chosNo=x1.rec[11];
			pDoc=x1.doc[0];
			pRec=x1.rec[0];
		}
		//��� ������ ������ �纻�߱� ��û ȭ�� ����
		//var url = "/EMR_DATA/popup/printRecdPop.jsp?type=0&pid="+pid+"&doctorId="+doctorId+"&chosNo="+chosNo+"&docCode="+pDoc+"&recCode="+pRec+"&dept="+x1.rec[10];
		var url = "/EMR_DATA/popup/printRecdPop.jsp";
		var returnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:200px;resizable:no;status:0;menubar:0;scroll:0');
		if(returnVal!=undefined)
		{
			returnVal = returnVal.split('^');
			if(returnVal[0]=="FALSE" || returnVal[0]==undefined)
				alert("�纻�߱� ��û�� ����Ͽ����ϴ�.");
			else
			{
				insertPrintData(chosNo,pDoc,pRec,x1.rec[10],returnVal);
				alert("�纻�߱� ��û�� �Ϸ�Ǿ����ϴ�.");
			}
		}
		else
			alert("�纻�߱� ��û�� ����Ͽ����ϴ�.");
	}
	else
	{
		var url = "/EMR_DATA/popup/printChoisePop.jsp";
		prtReturnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:120px;resizable:no;status:0;menubar:0;scroll:0');
		if(prtReturnVal==undefined || prtReturnVal=="FALSE")
			alert("����Ͽ����ϴ�.");
		else
		{
			var checkVal = prtReturnVal.split('^');
			if(checkVal[0]=="TRUE")
			{
				if(checkVal[1]=="1")
				{
					xx1=new DocumentObj(); 
					xx1.rec=x1.rec;
					xx1.doc=x1.doc;
					
					var curr_time = GetDateString();  //year+"-"+month+"-"+day+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
					
				 	var printObj=GetObj('bkPrint');
				 	
					var modifierCode1=xx1.rec[12];
					var cosignCode1=xx1.rec[4];
					var signCode2="";//xx1.rec[30];
					var cosignCode2="";//xx1.rec[32];
					
			 		var userNm1 = getUserName(modifierCode1,'');
			 		var userNm2 = getUserName(doctorId,'');
			 		var replaceStr = userNm2[0][0].substring(2,1);
			 		userNm2[0][0] = userNm2[0][0].replace(replaceStr,"*");
			 		var deptNm = getDeptData(xx1.rec[10]);
			 		var patInfo = getHwanjaInfo2(pid,xx1.rec[7].replace("-","").replace("-",""),xx1.rec[10]);
			 		if(patInfo.length==0)
			 		{
			 			var printParam="1^0^"+xx1.doc[1]+"^"+chosType+"^"+pid+"^123456^789456^456123^987654^"+curr_time;
						printParam+="^"+xx1.rec[6]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+xx1.rec[8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+xx1.rec[7]+"^0^";
					}
					else
					{
						var printParam="1^0^"+xx1.doc[1]+"^"+chosType+"^"+pid+"^"+SERVERADDR+"^"+patInfo[0][9]+"^"+patInfo[0][4]+"^"+patInfo[0][3]+"^"+curr_time;
						printParam+="^"+xx1.rec[6]+"^"+userNm2[0][0]+"^"+userNm1[0][0]+"^"+xx1.rec[8]+"^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+deptNm[0][1]+"^"+xx1.rec[7]+"^0^";
					}
					//alert(printParam);
					xx1.PrintDocumnet(printObj, '600', '800', printParam, 1);
				}
				else
				{
					if(x1.rec[8]!="0")
					{
						alert("�ӽ������ ����� �纻�߱� ��û�� �Ұ����մϴ�.");
						return;
					}
					
					var pName="";
					var chosNo="";
					var pDoc="";
					var pRec="";
				
					if(sdeCheck==0)
					{
						chosNo=x1.rec[7];
						pDoc=docCode;
						pRec=x1.rec[5];
					}
					else
					{
						chosNo=x1.rec[11];
						pDoc=x1.doc[0];
						pRec=x1.rec[0];
					}
					//��� ������ ������ �纻�߱� ��û ȭ�� ����
					var url = "/EMR_DATA/popup/printRecdPop.jsp?type=0&pid="+pid+"&doctorId="+doctorId+"&chosNo="+chosNo+"&docCode="+pDoc+"&recCode="+pRec+"&dept="+x1.rec[10];
					var returnVal=window.showModalDialog(url, '', 'dialogWidth:300px;dialogHeight:200px;resizable:no;status:0;menubar:0;scroll:0');
					if(returnVal!=undefined)
					{
						returnVal = returnVal.split('^');
						if(returnVal[0]=="FALSE" || returnVal[0]==undefined)
							alert("�纻�߱� ��û�� ����Ͽ����ϴ�.");
						else
						{
							insertPrintData(chosNo,pDoc,pRec,x1.rec[10],returnVal);
							alert("�纻�߱� ��û�� �Ϸ�Ǿ����ϴ�.");
						}
					}
					else
						alert("�纻�߱� ��û�� ����Ͽ����ϴ�.");
				}
			}
			else
					alert("����Ͽ����ϴ�.");
		}
	}
}



function onCosign()
{
	
}

function unSavedDoc()
{
	if(modifyFlag) {
		if(viewType == 0 || viewType == 2 || viewType == 5) {
			var param;
			if(viewType == 0)
				param = 1;
			else
				param = x1.rec[8];
			url = "/EMR_DATA/popup/unSavedDoc.jsp?status=" + param;
			var returnVal = window.showModalDialog(url, '', 'dialogWidth:290px;dialogHeight:150px;resizable:no;status:0;menubar:0;scroll:0');

			if(returnVal == 0) {
				if(viewType == 0)
					onDocTempSave();
				else
					onRecTempSave();
					
			} else if(returnVal == 1) {
				if(viewType == 0)
					onDocConfirmSave();
				else
					onConfirmRecSave();
			} else {
				alert("��ҵǾ����ϴ�.");
			}
			modifyFlag = false;
		}
			//alert("�ۼ����� ����� �ֽ��ϴ�."); 
	}
/*
if(ipaddress=="192.168.6.144" || ipaddress=="192.168.6.145" || ipaddress=="192.168.6.146")	
{
	if(showScanView!=null)
		showScanView.CloseFn();
}*/
}
</script>



	<!--body onload="init();" onload='SetSubMenu(0)' -->
	<body onload="init();" onunload="unSavedDoc();" >
	<object id='bkPrint' classid='clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945'  width="0" height="0" onloadstart="" style="position:absolute;left:15;border='solid 0px #000000;'"></object>
		<table width='100%' height='100%'>
			<table width='100%'>                                                                                         
				<tr style='padding:0px; ' bgcolor='#ffffff' id='btnArea'><td  height='40px' class='r_info' ><table width='100%' ><tr><td align='left' id='docuIcon'><%=icons%></td><td id='blankTd'  float='left' width='100px'><td id='documentInfo'  float='left' style='font-size:12px;'><%=docInfo%></td></td><td id='documentInfo2'  float='right' style='font-size:12px;'></td></tr></table></td></tr></table>
				<table width='99%'  bgcolor='#ffffff'  id='btnArea2'><tr><td><div id='tabArea' style='display:none'></div></td></tr></table>
				<tr><td><%=memo%></td></tr>
				<tr height="100%"><td bgcolor='#ffffff'>
					<div id='contentArea' style='background-color:white;position:fixed;width:99%;height:100%'>
						<OBJECT id='CertManX' classid='CLSID:EC5D5118-9FDE-4A3E-84F3-C2B711740E70' codebase='/EMR_DATA/applet/SKCommAX.cab#version=9,9,7,3' style='display:none;'></OBJECT>
						<OBJECT id = 'KMClientAX' classid = 'CLSID:D3C608B5-B664-4962-91B7-289DA892953A' codebase='/EMR_DATA/applet/(3.3.1.0)_KMClientAX.cab#version=3,3,1,0'  style='display:none;'></OBJECT>
						<OBJECT id='showScanView' classid='CLSID:F58631E2-B329-4341-90DD-D9B5C02046D9' style='display:none;width:820px;height:920px;' ></OBJECT>
						<object id = 'capture' classid='clsid:4CF61227-F8D9-4127-8230-CBD97A58AF69' style='display:none;'></object>
					</div></td></tr>
				
		</table>
	</body>
</html>

