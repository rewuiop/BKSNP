<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<%
	 
	request.setCharacterEncoding("euc-kr"); 
	
	String userid = request.getParameter("userid");
	String currdept = request.getParameter("currdept");
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="X-UA-Compatible" content="IE=9;" />
<title>���� �˻�</title>
<link href="/EMR_DATA/css/layout.css" rel="stylesheet" type="text/css">
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid.css">
<link rel="stylesheet" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid_dhx_skyblue.css">
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxcalendar.css">
<script  src="/EMR_DATA/dhtmlx/util.js"></script>
<script  src="/EMR_DATA/dhtmlx/dhtmlxcommon.js"></script>
<script  src="/EMR_DATA/dhtmlx/dhtmlxgrid.js"></script>        
<script  src="/EMR_DATA/dhtmlx/dhtmlxgridcell.js"></script>    
<script  src="/EMR_DATA/dhtmlx/dhtmlxcalendar.js"></script>    
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxgrid_dhx_black.css">
<script src="/EMR_DATA/script/util.js"></script>

<script type="text/javascript">
var imgList= "";
var retArr="";
var userid='<%=userid%>';
var currdept='<%=currdept%>';
var nurse ="";

function onInit(){
	deptselect();
	search_incom();
}
function search_incom() {		
	var selCate = false;
	IncomList();
	/* var colType = document.getElementById('dept_data');
	var colName = colType.options[colType.selectedIndex].value;
	
	if(colName == null || colName == 'null' ||colName == "") {
		alert("���õ� �μ��� �������� �ʽ��ϴ�.");
		return;
	}
	
	var patid = document.getElementById('patid').value;
	
	if(!patid) {
		var msg = "���Ϲ�ȣ�� �Էµ��� �ʾҽ��ϴ�.";
		alert(msg);
		return;
	} */
	
	// �׸��� �ѷ��ֱ�
	var docGrid = new dhtmlXGridObject('doc_list');
	docGrid.setImagePath("/EMR_DATA/dhtmlx/"); 
	docGrid.setHeader("�ǻ��,��Ϲ�ȣ,ȯ�ڸ�,���ĸ�,�ۼ���,SEQ",null,["text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center"]);
	docGrid.setInitWidths("60,75,80,120,110,0");
	docGrid.setColAlign("center,center,center,center,center,center");
	docGrid.setColTypes("ro,ro,ro,ro,ro,ed");
	docGrid.setColSorting("str,str,str,str,str,str");
	//docGrid.setColHidden("true","true","true","false");
	
	
	docGrid.setSkin("dhx_black");
	docGrid.init();
	if(imgList != null)
	{
		var xObj=getXmlObject(GetDocXml());
		docGrid.parse(xObj);
	}
	docGrid.attachEvent("onHeaderClick", function(ind,obj){});
	docGrid.attachEvent("onBeforeSelect", function(new_row,old_row,new_col_index){
		//alert(new_row+"  "+ old_row+"  "+ new_col_index);
		var id = new_row;
		var seq_no = document.getElementById('doc_list').getElementsByClassName('obj row20px')[0].rows[Number(id)+1].cells[5].innerText;
		var url = '/EMR_DATA/incomlist';
		var cmd = 'callUrl';
		var postData = "cmd="+cmd + "&seq_no="+seq_no;
		var retData = GetAjaxData(url, postData);
		var retDataArr = retData.split("��");

		if(retDataArr.length != 2) {
			alert("ERROR :  ���� ��ȸ ����");
		}
		if(retDataArr[0] == "ERROR") {
			alert("ERROR : " + retDataArr[1]);
			return;
		}
		if(retDataArr[0] == "SUCCESS") {
			retArr = MakeDataArray(retDataArr[1]);
			if(!retArr || retArr.length < 2)
				return;
			//var datasplit= retArr[1].split(",");	 
		}
		
		//EMR_DATA/right_content.jsp?viewType=1&recIdx=0&recIdno='$������ڵ�'&docCode='$�������ڵ�'&recSeq='$���SEQ_NO'&pid='$ȯ�ھ��̵�'&doctorId='$�ǻ���̵�'&deptCd='$ȯ������μ��ڵ�'
		
		//document.getElementById('doc_list').getElementsByClassName('obj row20px')[0].rows[Number(id)+1].bgColor="#A4A4A4";
		
		for(var z =0;z< document.getElementById('doc_list').getElementsByClassName('obj row20px')[0].rows.length-1;z++){
			//if(Number(id)!=z){
				//alert(z);
				document.getElementById('doc_list').getElementsByClassName('obj row20px')[0].rows[z+1].bgColor="#FFFFFF";
			//}
		}
		parent.changeSRC(retArr[1][0][0],retArr[1][0][1],retArr[1][0][2],retArr[1][0][3],retArr[1][0][4]);
		document.getElementById('doc_list').getElementsByClassName('obj row20px')[0].rows[Number(id)+1].bgColor="#A4A4A4";
		
		});
	
	
	var selType = '0'
	if(!selType && selType=="null")
		return;
	
}


function GetDocXml()
{
	var ret="<?xml version='1.0' encoding='EUC-KR'?>";
	if(retArr==null)
		return ret;
	var x1=retArr[1].length;
	var x2;
	ret += "<rows>";
	for(x2=0;x2<x1;x2++)
	{
		ret += "<row id='"+x2+"'>"
		+"<cell>"+fn_rpls4x(retArr[1][x2][0])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][1])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][5])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][2])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][3])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][4])+"</cell>"
			
			+ "</row>";
	}
	ret += "</rows>";
	return ret;
}


function IncomList() {
	var dept = document.getElementById("dept_data").value;
	var patid = document.getElementById("patid").value;
			
	var url = '/EMR_DATA/incomlist';
	var cmd = 'incom_list';
	var postData = "cmd="+cmd + "&dept="+dept + "&patid="+patid + "&userid="+userid + "&udept="+currdept + "&site=EMRDATA" + "&start="+ "&nurse="+nurse;
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("��");

	if(retDataArr.length != 2) {
		alert("ERROR :  ���� ��ȸ ����");
	}
	if(retDataArr[0] == "ERROR") {
		alert("ERROR : " + retDataArr[1]);
		return;
	}
	if(retDataArr[0] == "SUCCESS") {
		retArr = MakeDataArray(retDataArr[1]);
		if(!retArr || retArr.length < 2)
			return;
		//var datasplit= retArr[1].split(",");
		 
	}
}

function deptselect(){
	
	var url = '/EMR_DATA/incomlist';
	var cmd = 'DeptUser';
 	var postData = "cmd="+cmd + "&userid="+userid ;
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("��");

	if(retDataArr.length != 2) {
		alert("ERROR : �μ� ���� ��ȸ ����");
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
	var objSel = document.getElementById("dept_data");
	  for (i=0; i<retArr[1].length;i++){
	    var objOption = document.createElement("option");     
	    if(retArr[1][i][2]=='N'){
	    	nurse = 'N';
	    }
	  }
	
	  for (i=0; i<retArr[1].length;i++){
	    var objOption = document.createElement("option");     
	    	    	
	    	if(nurse =='N'){
	    		if(retArr[1][i][2]=='N'){
			    	objOption.text = retArr[1][i][1] ;
				    objOption.value = retArr[1][i][0].replace(/ /gi, ""); 
				    
				    objSel.options.add(objOption);
			    }
	    	}else{
	    		objOption.text = retArr[1][i][1] ;
			    objOption.value = retArr[1][i][0].replace(/ /gi, ""); 
			    
			    objSel.options.add(objOption);
	    	}
	    	
	    
	  }
	
	  for(var i=0;i<document.getElementById('dept_data').length;i++){
		  if(document.getElementById('dept_data')[i].value ==currdept){
			  document.getElementById('dept_data').value =currdept;
			  			  
			  break;
		  }else{
			  document.getElementById('dept_data').value ="";
		  }
	  }
	  
}

function MakeDataArray(dataStr) {
	if(!dataStr)
		return;
	
	var colArr = new Array();
	var dataArr = new Array();
	var totDataArr = dataStr.split("��");
	for(var i=0; i<totDataArr.length; i++) {
		if(i == 0) {
			colArr = totDataArr[i].split("��").splice(0);
			continue;
		}
		dataArr[dataArr.length] = totDataArr[i].split("��").splice(0);
	}
	return [colArr, dataArr];
}

</script>

</head>
<body onload="onInit()">

<table class="conTable01" style="width: 400px;" border="0" cellSpacing="0" cellPadding="0">
    <colgroup>
    <col width="40%">
    <col width="60%">
    
    </colgroup>
    <tbody><tr>
    	<th>�����</th>
        <td id="dept">
			<select name="dept_data" id="dept_data">
        	<option value="" >����</option>
		</td>
        
    </tr>
    <tr>
    	<th>��Ϲ�ȣ</th>
        <td><input id="patid" style="width: 60%;" type="text" maxLength="20" value="">
        <img src="/EMR_DATA/btn_search.gif" style="cursor:hand" onclick="search_incom()">
        </td>
    </tr>
    

</tbody></table>

<div id="doc_list" style="height: 670px; width: 400px; cursor: default; margin-top:40px;" class="gridbox gridbox_dhx_black">
	<div class="xhdr" style="width: 100%; height: 27px; overflow: hidden; position: relative;">
		<table cellpadding="0" cellspacing="0" class="hdr" style="width: 420px; table-layout: fixed; margin-right: 20px; padding-right: 20px;">
		<tbody>
			<tr>
			
			<td style="text-align: center;"><div class="hdrcell">��Ϲ�ȣ</div></td>
			<td style="text-align: center;"><div class="hdrcell">ȯ�ڸ�</div></td>
			<td style="text-align: center;"><div class="hdrcell">���ĸ�</div></td>
			<td style="text-align: center;"><div class="hdrcell">�ۼ���</div></td>
			</tr>
		</tbody>
	</table>
	</div>
</div>




</body>
</html>