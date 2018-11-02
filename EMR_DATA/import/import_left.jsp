<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<%
	 
	request.setCharacterEncoding("euc-kr"); 
	
	String userid = request.getParameter("userid");
	String udept = request.getParameter("udept");
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>왼쪽 검색</title>
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>
<script src="/EMR_DATA/script/util.js"></script>

<script type="text/javascript">
var tree;
var BK_DOC_CATE;
var retArr="";
var arr = new Array();
var cnt=0;
var userid = '<%=userid%>';
var dept = '<%=udept%>';
var	myTree = "";
	
function Leftinit(radio)
{
	retArr="";
	if( tree != null)
	{
		GetObj('docList').innerHTML = "";
	}
	//BK_DOC_CATE = getCateData();
	getImport(radio); 			
	VSIJ_MakeXml(retArr);
	document.oncontextmenu=contextMenu;
}	

function getImport(radio){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'getImport';
	if(radio==0)
 		var postData = "cmd="+cmd +"&data=" + userid +"&radio=" + radio;
	else
		var postData = "cmd="+cmd +"&data=" + dept +"&radio=" + radio;
	
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : getImport 정보 조회 실패");
	}
	if(retDataArr[0] == "ERROR") {
		alert("ERROR : " + retDataArr[1]);
		return;
	}
	if(retDataArr[0] == "SUCCESS") {
		retArr = MakeDataArray(retDataArr[1]);
		if(!retArr || retArr.length < 2)
			return;	 
	}
	
	
	  
}

function MakeDataArray(dataStr) {
	if(!dataStr)
		return;
	
	var colArr = new Array();
	var dataArr = new Array();
	var totDataArr = dataStr.split("◈");
	for(var i=0; i<totDataArr.length; i++) {
		if(i == 0) {
			colArr = totDataArr[i].split("◇").slice(0);
			continue;
		}
		dataArr[dataArr.length] = totDataArr[i].split("◇").slice(0);
	}
	return [colArr, dataArr];
}


document.oncontextmenu=function(){return false;}
function contextMenu(){
	return false;
} 

function VSIJ_MakeXml(doc)
{
		
	var initXml = "";
	var patiInfo = "patiInfomation";
	var recdListName;
	

	for(var i=0;i<retArr[1].length;i++)
		{
			var temp=0;
			for(var z=0; z<arr.length;z++){
				if(retArr[1][i][0]==arr[z])
					temp=1;
			}
				if(temp==0){
					if(retArr[1][i][3]==1){
						initXml += "<item id='cate_"+retArr[1][i][0]+"' text='"+retArr[1][i][1]+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif'>";
						initXml +=CreateXml(retArr[1],retArr[1][i][0]);
						initXml += "</item>";
					}
					else{
						initXml += "<item id='doc_"+retArr[1][i][0]+"' text='"+retArr[1][i][1]+"' im0='book.gif' im1='book.gif' im2='book.gif'>";
						initXml += "</item>";
					}
				}
			
		}
	tree = MakeTreeToXml('docList', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 1, initXml, LeftClick, null);	
	
}

function GetObj(id)
{
	return document.getElementById(id);
}

function CreateXml(rec,code)
{
	var str="";
	
	for(var v=0; v<rec.length; v++)
	{
		if(rec[v][3]==0 && rec[v][2]==code){
			str += "<item id='doc_"+rec[v][0]+"' text='"+rec[v][1]+"' im0='book.gif' im1='book.gif' im2='book.gif' ></item>";
			arr.push(rec[v][0]);
		}if(rec[v][3]==1 && rec[v][2]==code){
			str += "<item id='cate_"+rec[v][0]+"' text='"+rec[v][1]+"' im0='folderClosed.gif' im1='folderOpen.gif' im2='folderClosed.gif' >";
			str +=CreateXml(rec,rec[v][0]);
			str += "</item>";
			arr.push(rec[v][0]);
		}
		
	}
	
	return str;
}


function MakeTreeToXml(id,  w, h, skin, imgPath, IsCheck, xmlString, func1, func2)
{
	var obj = GetObj(id);
	
	myTree = new dhtmlXTreeObject( id , w , h, 0);
	myTree.setSkin(skin);
	myTree.setImagePath(imgPath);
	myTree.enableCheckBoxes(IsCheck);
	myTree.enableDragAndDrop(0); //drag & drop
	myTree.closeAllItems(id);
	
	myTree.XMLLoader.loadXMLString("<?xml version='1.0'?><tree id='0'>"+xmlString+"</tree>");
	if(func1 != null)
		myTree.setOnClickHandler(func1);
	if(func2 != null)
		myTree.setOnDblClickHandler(func2);
	
	var cate_disible = myTree.getAllUnchecked().split(',');
	for(var z=0; z<cate_disible.length;z++){
		if( cate_disible[z].split('_')[0] == "cate"){
			myTree.disableCheckbox(cate_disible[z], true);
		}
	}
	
	//myTree.disableCheckbox('cate_100001', true);
	return myTree;
}



function del(){
	var del_check =  myTree.getAllChecked();
	
	del_check = del_check.split(',');
	
	for(var n=0; n<del_check.length; n++){
		delete_btn(del_check[n].split('_')[1]);
	}

	alert("삭제되었습니다");
	Leftinit(0);
}

function delete_btn(code){
	
	if(userid=="")
		return;
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'delete_doc';
	var postData = "cmd="+cmd + "&code="+code ;
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : 삭제 실패");
	}
	if(retDataArr[0] == "ERROR") {
		alert("ERROR : " + retDataArr[1]);
		return;
	}
	if(retDataArr[0] == "SUCCESS") {
		retArr = MakeDataArray(retDataArr[1]);
		if(!retArr || retArr.length < 2)
			return;
	}
	//alert("삭제되었습니다");
	//init();
}


function LeftClick(id)
{
	var i=0;
	var Sid = id.split('_');

	tree.openItem(id);
	
	if(Sid[0]=='cate')
	{
		
	}
	if(Sid[0]=='doc')
	{		
		for(var i=0;i<retArr[1].length;i++){
			if(Sid[1]==retArr[1][i][0]){
				parent.callurl(retArr[1][i][4]);
			}
			
		}

	}
}




function onInit(){
	// var status = RadioCheck();
	Leftinit(0);
	
}

function search(status){
	Leftinit(status.value);
}
/*
function RadioCheck(){

    size = document.formname.elements['dept'].length;
    for(var i = 0; i < size; i++) {
      if(document.formname.elements["dept"][i].checked) {
           break;
      }
   }
    return document.formname.elements['dept'][i].value; 
}*/

function Replace4xml(x1)
{
	if(x1!=0 && (x1 == null || x1 ==""))
		return "";
	
	if(x1.replace == null)
		return x1;
	x1 = x1.replace(/</g, "&lt;");
	x1 = x1.replace(/>/g, "&gt;");
	x1 = x1.replace(/'/g,"&apos;");
	x1 = x1.replace(/&/g,"&amp;");
	
	
	return x1;
}

</script>

</head>
<body onload="onInit()">

	<table class="" style="width: 450px; padding-top:20px " border="0" cellSpacing="0" cellPadding="0">
    <tr>
        <td id="dept" style="padding-right:100px" >
			<input type="radio" name ="dept" value ="0" checked="checked" onclick="search(this)">개인별
			<input type="radio" name ="dept" value ="1" onclick="search(this)">과별
			
		</td>
		
		<td>
			<input type= "button" onclick="del()" value = '페이지 삭제' >
		</td>
	</tr>
    </table>

<div id="docList" style="height: 500px; width: 450px; cursor: default; margin-top:20px;" class="gridbox gridbox_dhx_black">
	
</div>




</body>
</html>