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
<title>왼쪽 검색</title>
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
		alert("선택된 부서가 존재하지 않습니다.");
		return;
	}
	
	var patid = document.getElementById('patid').value;
	
	if(!patid) {
		var msg = "병록번호가 입력되지 않았습니다.";
		alert(msg);
		return;
	} */
	
	// 그리드 뿌려주기
	var docGrid = new dhtmlXGridObject('doc_list');
	docGrid.setImagePath("/EMR_DATA/dhtmlx/"); 
	docGrid.setHeader("의사명,등록번호,환자명,서식명,작성일,SEQ",null,["text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center"]);
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
		var retDataArr = retData.split("◎");

		if(retDataArr.length != 2) {
			alert("ERROR :  정보 조회 실패");
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
		
		//EMR_DATA/right_content.jsp?viewType=1&recIdx=0&recIdno='$기록지코드'&docCode='$서식지코드'&recSeq='$기록SEQ_NO'&pid='$환자아이디'&doctorId='$의사아이디'&deptCd='$환자진료부서코드'
		
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
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR :  정보 조회 실패");
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
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : 부서 정보 조회 실패");
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
	var totDataArr = dataStr.split("◈");
	for(var i=0; i<totDataArr.length; i++) {
		if(i == 0) {
			colArr = totDataArr[i].split("◇").splice(0);
			continue;
		}
		dataArr[dataArr.length] = totDataArr[i].split("◇").splice(0);
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
    	<th>진료과</th>
        <td id="dept">
			<select name="dept_data" id="dept_data">
        	<option value="" >선택</option>
		</td>
        
    </tr>
    <tr>
    	<th>등록번호</th>
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
			
			<td style="text-align: center;"><div class="hdrcell">등록번호</div></td>
			<td style="text-align: center;"><div class="hdrcell">환자명</div></td>
			<td style="text-align: center;"><div class="hdrcell">서식명</div></td>
			<td style="text-align: center;"><div class="hdrcell">작성일</div></td>
			</tr>
		</tbody>
	</table>
	</div>
</div>




</body>
</html>