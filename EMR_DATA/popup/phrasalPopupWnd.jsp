<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<link href="/EMR_DATA/layout.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>
<%@page contentType="text/html;charset=EUC-KR"%>
<%@ include file="../SDK/BK_SDK.jsp" %> 

<%
System.out.println("[phrasalPopupWnd.jsp] 상용구 화면");
String dept = request.getParameter("uDeptCd");
String userId = request.getParameter("doctorId");
if(dept == null || dept.equals("undefined"))
	dept = "";
if(userId == null || userId.equals("undefined"))
	userId = "";
	
System.out.println("부서아이디 : " + dept);
System.out.println("개인아이디 : " + userId);
%>
<html>
<head>
<script src='/EMR_DATA/SDK/BK_SDK.js'></script>
<script>
var dept='<%=dept%>';
var userId='<%=userId%>';	
/*
var x1=SendServerCall('getPhra',[],[[]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
var g_dbColName = "SEQ_NO,DEPARTMENT,NAME,FOLDER,PID,POSITION,DESCRIPTION,KEYWORD,MODIFY_TIME,MODIFIER,CATEGORY,TYPE";
var a= new DataValueObj(); 
a.setXmlData(x1,g_dbColName); 
var phData = a.value;
*/	
var cTree;
var dTree;
var pTree; 

var tabMode=0; //0:common, 1: deparetment, 2:personal
var mode=0; //0: 상용구 처리, 1: 폴더 수정, 2: 폴더추가, 3:상용구 수정, 4: 사용구 추가
var parentId=0;
var symbol="＃＠§☆★○●◎◇◆□■△▲▽▼◁◀▷▶◈☎【】（）《》〈〉";
var textPos=0;

var SubMenu = ["공통", "부서","개인"];
var phData;

var selectItemId = "";
var okBtnObj = "";
var clearBtnObj = "";
var addBtnObj = "";

var retData = "";
function getPhrsalXmlData(tab)
{
	var x1;
	var searchName = "";
	var searchParam = "";
	var searchDate = "";
	if(tab==0)
	{
		/*
		searchName="getPhra";
		searchParam="'TYPE'";
		searchDate=tab;*/
		x1=SendServerCall2('getPhra',['TYPE'],[[tab]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
	}
	else if(tab==1)
	{
		/*searchName="getPhraD";
		searchParam="'TYPE','DEPT'";
		searchDate=tab+","+dept;*/
		x1=SendServerCall2('getPhraD',['TYPE','DEPT'],[[tab,dept]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
	}
	else if(tab==2)	
	{
		/*
		searchName="getPhraP";
		searchParam="'TYPE','USER'";
		searchDate=tab+","+userId;*/
		x1=SendServerCall2('getPhraP',['TYPE','USER'],[[tab,userId]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
	}
	//x1=SendServerCall2(searchName,[searchParam],[[searchDate]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
	//x1=SendServerCall2('getPhra',['TYPE'],[[tab]],'/EMR_DATA/popup/updatePhrasal.jsp',null);
	var g_dbColName = "SEQ_NO,DEPARTMENT,NAME,FOLDER,PID,POSITION,DESCRIPTION,KEYWORD,MODIFY_TIME,MODIFIER,CATEGORY,TYPE";
	/*var a= new DataValueObj(); 
	a.setXmlData(x1,g_dbColName); 
	return a.value;*/
	var xmlArray = fn_loadDataXml(x1,g_dbColName);
	return xmlArray;
}

function getCreateXml(tab)
{
	phData = getPhrsalXmlData(tab);
	if(tab==0)
	{
		var strXml="<item id='root1' text='공통-상용구' open='true'>";
		strXml += CreateC_PhrasaleXml(0,phData);
		strXml +="</item>";
		/*if(cTree)
			cTree.deleteChildItems('root1');*/
		if(cTree)
		{
			cTree.deleteItem('root1');
			cTree.XMLLoader.loadXMLString("<?xml version='1.0'?><tree id='0'>"+strXml+"</tree>");
		}
		else
			cTree = MakeTreeToXml('common', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml, OnTreeClicked, OnTreeDBClicked);	
	}
	else if(tab==1)
	{
		var strXml1="<item id='root1' text='부서-상용구' open='true'>";
		strXml1 += CreateD_PhrasaleXml(0,phData);
		strXml1 +="</item>";
		/*if(dTree)
			dTree.deleteChildItems('root1');*/
		if(dTree)
		{
			dTree.deleteItem('root1');
			dTree.XMLLoader.loadXMLString("<?xml version='1.0'?><tree id='0'>"+strXml1+"</tree>");
		}
		else
			dTree = MakeTreeToXml('department', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml1, OnTreeClicked, OnTreeDBClicked);	
	}
	else if(tab==2)
	{
		var strXml2="<item id='root1' text='개인-상용구'  open='true'>";
		strXml2 += CreateP_PhrasaleXml(0,phData);
		strXml2 +="</item>";
		/*if(pTree)
			pTree.deleteChildItems('root1');*/
		if(pTree)
		{
			pTree.deleteItem('root1');
			pTree.XMLLoader.loadXMLString("<?xml version='1.0'?><tree id='0'>"+strXml2+"</tree>");
		}
		else
			pTree = MakeTreeToXml('personal', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml2, OnTreeClicked, OnTreeDBClicked);	
	}
}

function Init()
{
	getCreateXml(0);
	/*
	var strXml="<item id='root1' text='공통-상용구' open='true'>";
	strXml += CreateC_PhrasaleXml(0,phData);
	strXml +="</item>";
	cTree = MakeTreeToXml('common', '100%','100%', 'dhx_skyblue', '../dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml, OnTreeClicked, null);	
	
	var strXml1="<item id='root1' text='부서-상용구' open='true'>";
	strXml1 += CreateD_PhrasaleXml(0,phData);
	strXml1 +="</item>";
	dTree = MakeTreeToXml('department', '100%','100%', 'dhx_skyblue', '../dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml1, OnTreeClicked, null);	

	var strXml2="<item id='root1' text='개인-상용구'  open='true'>";;
	strXml2 += CreateP_PhrasaleXml(0,phData);
	strXml2 +="</item>";
	pTree = MakeTreeToXml('personal', '100%','100%', 'dhx_skyblue', '../dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, strXml2, OnTreeClicked, null);	
	*/
	
	SetSubMenu(2);
	SetVal('moonja',setSymbol());
	
	ShowHide([[],['btnDelete','btnNewFolder','btnNewPhrase','btnModify','btnAdd']]);
	
	SetEventFunc('btnNewPhrase', 'onclick', 'OnNewPhrase');
	SetEventFunc('btnNewFolder', 'onclick', 'OnNewFolder');
	SetEventFunc('btnDelete', 'onclick', 'OnDelete');
	SetEventFunc('btnModify', 'onclick', 'OnModify');
	SetEventFunc('btnClear', 'onclick', 'OnClear');
	SetEventFunc('btnOk', 'onclick', 'OnOk');
	SetEventFunc('btnAdd', 'onclick', 'OnAdd');
	
	//SetEventFunc('textbox', 'onclick', 'chkPos');
	
	okBtnObj = document.getElementById('btnOk');
	clearBtnObj = document.getElementById('btnClear');
	addBtnObj = document.getElementById('btnAdd');
	outputObj = document.getElementById('output');
}

function SetSubMenu(idx)
{
	SetVal('title', '상용구');
	initData();
	ShowHide([['btnOk'],['btnNewPhrase','btnNewFolder','btnModify','btnDelete','btnClear','btnAdd']]);
	
	if(idx>0) {
		if(idx==1 && !dept) {
			alert("부서 아이디가 존재하지 않습니다.");
			return;
		}
		if(idx==2 && !userId) {
			alert("개인 아이디가 존재하지 않습니다.");
			return;
		}
	}
	
	var i;
	var tdHtml="<TABLE cellpadding='0' cellspacing='0' border='0' id='tabMenu'><tr>";
	for(i=SubMenu.length-1; i>=0; i--)
	{
		var onOff="Off";
		if(i == idx)
		{
			onOff = "On";
		}
		
		tdHtml += "<td>"
				+ "<table cellpadding='0' cellspacing='0' border='0' class='tab"+onOff+"'>"
	        	+ "<tr><td class='tab"+onOff+"Left' rowspan='2'></td>"
	        	+ "<td class='tab"+onOff+"Top'></td>"
	            + "<td class='tab"+onOff+"Right' rowspan='2'></td>"
	            + "</tr><tr><td class='tab"+onOff+"Text' onClick='SetSubMenu("+i+")'>"+SubMenu[i]+"</td></tr></table></td>";
	}
	tdHtml += "</tr></TABLE>";
	document.getElementById('setMenu').innerHTML=tdHtml;

	tabMode=idx;
	getCreateXml(idx);
	if(idx==0) 			// 공통
	{
		document.getElementById('common').style.display='block';
		document.getElementById('department').style.display='none';
		document.getElementById('personal').style.display='none';
	}
	else if(idx==1)	// 부서별
	{
		document.getElementById('common').style.display='none';
		document.getElementById('department').style.display='block';
		document.getElementById('personal').style.display='none';
	}
	else if(idx==2) // 개인별
	{
		document.getElementById('common').style.display='none';
		document.getElementById('department').style.display='none';
		document.getElementById('personal').style.display='block';
	}
}
function chkPos()
{
  textPos=document.getElementById('textbox');
  textPos=window.event.srcElement.createTextRange(); 
  textPos.moveToPoint(window.event.x, window.event.y);
}

function initData(name, data) {
	try {
		if(!name)
			name = "";	
		if(!data)
			data = "";
		
		SetVal('name', name);
		SetVal('textbox', data);	
	} catch(e) {
		alert(e.message);
	}
}

function insertSymbol(val)
{
	document.getElementById('textbox').value += val;
}

function setSymbol()
{
	var len = symbol.length;
	var str="<table>";
	for (var i=0; i<len; i++)
	{
		if(i%20==0)
				str += "<tr>"
		str += "<td width='10px' id='symbol"+i+"' onclick='insertSymbol(\""+symbol.substring(i,i+1)+"\")' value='"+symbol.substring(i,i+1)+"'><font face='굴림'>"+symbol.substring(i,i+1)+"</font></td>"; 
		if(i%20==19)
				str += "</tr>"
	}
	str +="</table>"
	return str;
}

function CreateC_PhrasaleXml(id, phData)
{	
	var str="";
	
	for(var i=0; i<phData.length; i++)
	{

		//if(phData[i][11]=='0')//type 0:공통 1:부서별 2:개인별
		{
			if(phData[i][4] == id)//pid가 0인경우
			{
				if(phData[i][3] == '1')//폴더일때
				{
						str += "<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif'>";
						str += CreateC_PhrasaleXml(phData[i][0], phData);
						str += "</item> ";
				}
				else if(phData[i][3] == '0')//폴더가 아닐때
				{
						str +="<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' />";
				}
			}
		}
	}
	return str;
}

function CreateD_PhrasaleXml(id, phData)
{	
	var str="";
	
	for(var i=0; i<phData.length; i++)
	{

		//if(phData[i][11]=='0' || phData[i][11]=='1')//type 0:공통 1:부서별
		{
			if(phData[i][4] == id)//pid가 0인경우
			{
				if(phData[i][3] == '1')//폴더일때
				{
						str += "<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif'>";
						str += CreateD_PhrasaleXml(phData[i][0], phData);
						str += "</item> ";
				}
				else if(phData[i][3] == '0' && phData[i][1]==dept)//상용구 - 부서별
				{
						str +="<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' />";
				}
			}
		}	
	}
	return str;
}

function CreateP_PhrasaleXml(id, phData)
{	
	var str="";
	
	for(var i=0; i<phData.length; i++)
	{
		//if(phData[i][11]=='0' || phData[i][11]=='2')
		{
			if(phData[i][4] == id)
			{
				if(phData[i][3] == '1')
				{					
						str += "<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif'>";
						str += CreateP_PhrasaleXml(phData[i][0], phData);
						str += "</item> ";
				}
				else if(phData[i][3] == '0' && phData[i][9]==userId)//상용구 - 개인별
				{
						str +="<item id='"+phData[i][0]+"' text='"+Replace4xml(phData[i][2])+"' im0='book.gif' im1='book.gif' im2='book.gif' /> ";
				}
			}
		}
  }	
	return str;
}

function GetSangData(Sid)
{
	for(var i=0; i<phData.length; i++)
		if(phData[i][0]==Sid)
			return i;
	return -1;
}
function OnClear(){
	//SetVal('textbox', '');
	initData();
}
function OnNewPhrase()
{
	/*if(mode !=0)
		return;*/
	mode='상용구추가';
	SetVal('name', '');
	SetVal('textbox','');
	SetVal('title', '상용구 추가');
	ShowHide([['btnClear','btnOk'],['btnNewPhrase','btnNewFolder','btnModify','btnDelete','btnAdd']]);
	document.getElementById('name').focus();
	
	okBtnObj.style.width="130px";
	okBtnObj.value=mode+" 완료";
	okBtnObj.style.display="";
	clearBtnObj.style.display="";
}
function OnNewFolder()
{
	/*if(mode !=0)
		return;*/
	mode='폴더추가';
	SetVal('name', '');
	SetVal('textbox', '');
	SetVal('title', '폴더 추가');
	ShowHide([['btnOk'],['btnNewPhrase','btnNewFolder','btnModify','btnDelete','btnClear','btnAdd']]);
	document.getElementById('name').focus();
	
	okBtnObj.style.width="130px";
	okBtnObj.value=mode+" 완료";
	okBtnObj.style.display="";
	clearBtnObj.style.display="";
}
function OnDelete()
{
	/*if(mode !=0)
		return;*/
	var id=selectItemId;
	/*if(tabMode==0)
		id=cTree.getSelectedItemId();
	else if(tabMode==1)
		id=dTree.getSelectedItemId();
	else if(tabMode==2)
		id=pTree.getSelectedItemId();
	else
		return;
	*/
	var i=GetSangData(id);
	if(i<0)
		return;
	
	if(phData[i][3]=='0')//상용구
	{
		if(!confirm("정말 삭제하시겠습니까?"))
		{
			return;
		}
		
		var ret = DoAjax(2,[phData[i][0], dept, name, '1', parentId, '0', '', '', userId, '', '0']);
		if(ret == -1)
		{
			alert("상용구 삭제에 실패하였습니다.");
			return;
		}
		if(tabMode ==0)
			cTree.deleteItem(id);
		if(tabMode ==1)
			dTree.deleteItem(id);
		if(tabMode ==2)
			pTree.deleteItem(id);
	}
	else if(phData[i][3]=='1')//폴더이면
	{
		if(confirm("폴더에 포함된 상용구도 함께 삭제됩니다.\r\n 정말 삭제하시겠습니까?"))
		{
			var ret = DoAjax(2.1,[phData[i][0], dept, name, '1', parentId, '0', '', '', userId, '', '0'], 1);
			if(ret == -1)
			{
				alert("폴더 & 상용구 삭제에 실패하였습니다.");
				return;
			}
			if(tabMode ==0)
				cTree.deleteItem(id);
			if(tabMode ==1)
				dTree.deleteItem(id);
			if(tabMode ==2)
				pTree.deleteItem(id);
		}
		else
			return;
	}
	
	//Delete From sangData
	ShowHide([[],['btnDelete','btnNewFolder','btnNewPhrase','btnModify','btnAdd']]);
	SetVal('name','');
	SetVal('textbox','');
	//mode=0;
	parentId = -1;
	//Init();
	getCreateXml(tabMode);
}

function OnModify()
{
	/*if(mode !=0)
		return;*/
	var id=selectItemId;
	/*if(tabMode==0)
		id=cTree.getSelectedItemId();
	else if(tabMode==1)
		id=dTree.getSelectedItemId();
	else if(tabMode==2)
		id=pTree.getSelectedItemId();
	else
		return;*/
	
	var i=GetSangData(id);
	if(i<0)
		return;
	parentId=id;
	if(phData[i][3]=='0')//상용구
	{
		mode='상용구수정';
		SetVal('title', '상용구 정보 수정');
		SetVal('name',phData[i][2]);
		SetVal('textbox',phData[i][6]);
		ShowHide([['btnClear','btnOk','btnAdd'],['btnNewPhrase','btnNewFolder','btnModify','btnDelete']]);
	}
	else if(phData[i][3]=='1')//폴더이면
	{
		mode='폴더수정';
		SetVal('title', '폴더 정보 수정');
		SetVal('name',phData[i][2]);
		ShowHide([['btnClear','btnOk'],['btnNewPhrase','btnNewFolder','btnModify','btnDelete','btnAdd']]);
	}
	
	okBtnObj.style.width="130px";
	okBtnObj.value=mode+" 완료";
	okBtnObj.style.display="";
	clearBtnObj.style.display="";
}

function DoAjax(mode, dArr, type)
{
	if(type)
	{
		var s = DoAjax(2, dArr);
		if(s == -1)
			return;
	}
	var func = "";
	switch(mode)
	{
		case 0:
			func = "insertPhra";
			break;
		case 1:
			func = "updatePhra";
			break;
		case 2:
			func = "deletePhra";
			break;
		case 2.1:
			func = "deletePhrafolder";
			break;
		/*case 3:
			func = "getPhra";
			break;*/
	}

	var x1 = SendServerCall2(func, ['SEQ_NO','DEPARTMENT','NAME','FOLDER','PID','POSITION','DESCRIPTION','KEYWORD','USERID','CATEGORY','TYPE'], [dArr] ,"/EMR_DATA/popup/updatePhrasal.jsp",null);
	var msg = fn_loadDataXml(x1,'SEQ_NO');
	if(mode == 0)
		return msg[0][0];
	/*var msg = fn_responseData(x1);
	if(msg == "error")
		return -1;
		
	if(mode == 0)
	{
		return '0';
	}*/
	/*
	if(x1.msg[0] == "error")
		return -1;
		
	if(mode == 3)
	{
		var a= new DataValueObj(); 
		a.setXmlData(x1,g_dbColName); 
		phData = a.value;
		Init();
	}
	else if(mode == 0)
	{
		var a = new DataValueObj(); 
		a.setXmlData(x1,"SEQ_NO"); 
		
		if(!a.value || !a.value[0] || !a.value[0][0])
			return;
			
		var x2 = a.value[0][0];
		if(x2 == null)
			return -1;
		return x2;
	}*/
}

function addPhraData(dArr)
{
	phData[phData.length] = dArr;
}

function OnOk()
{
	var name=GetValue('name');
	if(!name) {
		alert("이름을 입력해주세요");
		document.getElementById('name').focus();
		return;
	}
		
	var data=GetValue('textbox');
	if(parentId == 'root1') {
		parentId = '0';
	} else {
		var idx=GetSangData(parentId);
		if(idx <0)
			return;
	}
	
	switch(mode)
	{
		case "폴더추가":
			//var seqNo = DoAjax(0,[-1, dept, name, '1', parentId, '0', data, '', userId, '', tabMode+1]);
			var seqNo = DoAjax(0,[-1, dept, name, '1', parentId, '0', data, '', userId, '', tabMode]);
			if(seqNo == -1)
			{
				alert("폴더 추가에 실패하였습니다.");
				return;
			}
			if(parentId == '0')
				parentId = 'root1';
			/*
			cTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
			dTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
			pTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
			*/
			if(tabMode==0)
			{
				cTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
				cTree.selectItem(seqNo);
			}
			else if(tabMode==1)
			{
				dTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
				dTree.selectItem(seqNo);
			}
			else
			{
				pTree.insertNewItem(parentId, seqNo, name, 0, 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif','');
				pTree.selectItem(seqNo);
			}
				
			addPhraData([seqNo, dept, name, '1', parentId, '0',data, '', userId, '', '0']);
			ShowHide([['btnNewPhrase','btnNewFolder','btnDelete','btnModify'],['btnAdd']])
			parentId=seqNo;
			selectItemId=seqNo;
			break;
		case "폴더수정":
			
			var ret = DoAjax(1,[phData[idx][0], dept, name, '1', parentId, '0', data, '', userId, '', tabMode]);
			if(ret == -1)
			{
				alert("폴더 수정에 실패하였습니다.");
				return;
			}
			if(tabMode==0)
				cTree.setItemText(parentId, name, '');
			else if(tabMode==1)
				dTree.setItemText(parentId, name, '');
			else if(tabMode==2)
				pTree.setItemText(parentId, name, '');
			ShowHide([['btnNewPhrase','btnNewFolder','btnDelete','btnModify'],['btnAdd']])
			
			phData[idx][2]=name;
			phData[idx][6]=data;
			break;
		case "상용구추가":
			//var seqNo = DoAjax(0,[-1, dept, name, '0', parentId, '0', data, '', userId, '', tabMode+1]);
			var seqNo = DoAjax(0,[-1, dept, name, '0', parentId, '0', data, '', userId, '', tabMode]);
			if(seqNo == -1)
			{
				alert("상용구 추가에 실패하였습니다.");
				return;
			}
			if(parentId == '0')
				parentId = 'root1';
			/*
			cTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
			dTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
			pTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
			*/
			if(tabMode==0) {
				cTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
				cTree.selectItem(seqNo);
			}
			else if(tabMode==1) {
				dTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
				dTree.selectItem(seqNo);
			}
			else {
				pTree.insertNewItem(parentId, seqNo, name, 0, 'book.gif', 'book.gif', 'book.gif','');
				pTree.selectItem(seqNo);
			}
			
			addPhraData([seqNo, dept, name, '0', parentId, '0', data, '', userId, '', tabMode]);
			ShowHide([['btnDelete','btnModify','btnAdd'],['btnNewPhrase','btnNewFolder']]);
			parentId=seqNo;
			selectItemId=seqNo;
			break;
		case "상용구수정":
			var ret = DoAjax(1,[phData[idx][0], dept, name, '0', parentId, '0', data, '', userId, '', phData[idx][11]]);
			if(ret == -1)
			{
				alert("상용구 수정에 실패하였습니다.");
				return;
			}
			if(tabMode==0)
				cTree.setItemText(parentId, name, '');
			else if(tabMode==1)
				dTree.setItemText(parentId, name, '');
			else
				pTree.setItemText(parentId, name, '');
			//ShowHide([['btnNewPhrase','btnNewFolder','btnDelete','btnModify','btnAdd'],[]])
			phData[idx][2]=name;
			phData[idx][6]=data;
			ShowHide([['btnDelete','btnModify','btnAdd'],['btnNewPhrase','btnNewFolder']]);
			break;
		case 0:
			var agent = navigator.userAgent.toLowerCase();
			var retVal = new Array();
			var idStr = '<%=request.getParameter("conid")%>';
			var id = idStr.split('/');
			if(retData != "")
				retData += "\n";
			retData += data;
			retVal[0] = ["상용구", retData];
			if(agent.indexOf("chrome") != -1 || agent.indexOf("Firefox") != -1 || agent.indexOf("Safari") != -1 || agent.indexOf("Opera") != -1) {
				opener.CB_CallPopupWinFunc(retVal, id);
			}else {
				window.returnValue=retVal;
			}
			
			window.close();
			break;
	}
	//mode=0;
	SetVal('title', '상용구');
	if(mode!="폴더추가" && mode!="폴더수정")
	{
		okBtnObj.style.width="100px";
		okBtnObj.value="삽입 후 닫기";
		okBtnObj.style.display="";
		clearBtnObj.style.display="none";
		mode=0;
	}
	else
	{
		okBtnObj.style.display="none";
		clearBtnObj.style.display="none";
	}
		
	//Init();
}

function OnAdd()
{
		var name=GetValue('name');
		if(!name) {
			alert("이름을 입력해주세요");
			document.getElementById('name').focus();
			return;
		}
			
		var data=GetValue('textbox');
		if(parentId == 'root1') {
			parentId = '0';
		} else {
			var idx=GetSangData(parentId);
			if(idx <0)
				return;
		}
	
		var agent = navigator.userAgent.toLowerCase();
		var retVal = new Array();
		var idStr = '<%=request.getParameter("conid")%>';
		var id = idStr.split('/');
		if(retData != "")
			retData += "\n";
		retData += data;
		retVal[0] = ["상용구", retData];
		if(agent.indexOf("chrome") != -1 || agent.indexOf("Firefox") != -1 || agent.indexOf("Safari") != -1 || agent.indexOf("Opera") != -1) {
			opener.CB_CallPopupWinFunc(retVal, id);
		}else {
			window.returnValue=retVal;
			outputObj.value=retData;
		}
}

function OnTreeClicked(id)
{
	selectItemId = id;
	if(id == 'root1') {
		parentId = id;
		ShowHide([['btnNewPhrase','btnNewFolder'],['btnDelete','btnModify','btnAdd']]);
		SetVal('title', '상용구');
		initData();
		mode=0;
		return;
	}
	
	var i=GetSangData(id);
	if(i<0)
		return;
	mode=0;
	SetVal('name', '');
	if(phData[i][3]=='0')//파일이면
	{
		parentId=id;
		//insertSymbol(phData[i][6]);
		initData(phData[i][2], phData[i][6]);
		ShowHide([['btnDelete','btnModify','btnAdd'],['btnNewPhrase','btnNewFolder']]);
		
		okBtnObj.style.width="100px";
		okBtnObj.value="삽입 후 닫기";
		okBtnObj.style.display="";
	}
	else if(phData[i][3]=='1')//폴더이면
	{
		parentId=id;
		initData(phData[i][2], phData[i][6]);
		ShowHide([['btnNewPhrase','btnNewFolder','btnDelete','btnModify'],['btnAdd']]);
		
		okBtnObj.style.display="none";
	}
	SetVal('title', '상용구');
}

function OnTreeDBClicked(id)
{
	selectItemId = id;
	if(id == 'root1') {
		return;
	}
	
	var i=GetSangData(id);
	if(i<0)
		return;
	
	if(phData[i][3]=='0')//파일이면
	{
		parentId=id;
		//insertSymbol(phData[i][6]);
		initData(phData[i][2], phData[i][6]);
		ShowHide([['btnDelete','btnModify','btnAdd'],['btnNewPhrase','btnNewFolder']]);
		
		okBtnObj.style.width="100px";
		okBtnObj.value="삽입 후 닫기";
		okBtnObj.style.display="";
		
		OnOk();
	}
	else if(phData[i][3]=='1')//폴더이면
	{
		if(tabMode==0) {
			cTree.openItem(selectItemId);
		}
		else if(tabMode==1) {
			dTree.openItem(selectItemId);
		}
		else {
			pTree.openItem(selectItemId);
		}
	}
	
}
</script>

<!--BORDER-TOP: black 1px solid; BORDER-RIGHT: black 1px solid; BORDER-BOTTOM: black 1px solid; BORDER-LEFT: black 1px solid -->
</head>
<body onload='Init()'>
<TABLE style='border:0 solid black; width:720px;'>
	<tr>
		<td colspan=2 align='center' id='title' style='height:30px; font-size:20px; font: bold 굴림체;'>상용구<td>
	</tr>
	<!--bold; 24px; 굴림체-->
	<tr>
		<td style='padding:0;border:0 none black;'>
			<div id='setMenu'></div>
		</td>
		<td align='right'>
			<input type='button' id='btnNewFolder' value='폴더추가' style='width:80px'>
			<input type='button' id='btnNewPhrase' value='상용구추가' style='width:90px'>
			<input type='button' id='btnModify' value='수정모드' style='width:80px'>
			<input type='button' id='btnDelete' value='삭제' style='width:70px'>
		</td>
	</tr>
</TABLE>
<table style ="BORDER-TOP: #1279b7 3px solid; BORDER-RIGHT: #1279b7 3px solid; BORDER-BOTTOM: #1279b7 3px solid; BORDER-LEFT: #1279b7 3px solid; width:720px;">

	<tr>
		<td style='padding:0;border:1 solid #eee;  BORDER-RIGHT: #1279b7 3px solid;'>
			<table>
				<tr>
					<td style='width:200px; height:580px;'>
						<div id='common' style='display:none;width:200px;height:570px;overflow:scroll-y'></div>
						<div id='department' style='display:none;width:200px;height:570px'></div>
						<div id='personal' style='display:none;width:200px;height:570px'></div>
					</td>
				</tr>
			</table>
		</td>
		<td valign='top'  >
			<table style='width:490px; height:100%; font-size:12px; border:0px solid #ff0000;'>
				<tr>
					<td style='width:50px;'>이름</td>
					<td style='width:350px;'>
						<input type='text' style='width:100%' id='name'>
					</td>
				</tr>
				<tr>
					<td colspan=2 style='width:100%; height:450px;'>
						<textarea id='textbox' style='width:100%;height:50%' ></textarea>
						<textarea id='output' style='width:100%;height:50%;background:#D5D5D5' readonly></textarea>
					</td>
				</tr>
				<tr>
					<td colspan=2 style='width:100%; height:60px;'>
						<div id='moonja' style='width:100%;height:100%'></div>
					</td>
				</tr>
				<tr>
					<td style='' align='right' colspan=2 style='height:30px;'>
						<input type='button' id='btnClear' value='초기화'>
						<input type='button' id='btnAdd' value='삽입 후 계속'>
						<input type='button' id='btnOk' value='삽입 후 닫기' style='width:100px'>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</TABLE>
</body>