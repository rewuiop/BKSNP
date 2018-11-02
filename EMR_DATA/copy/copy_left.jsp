<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%> 
<%@ page import="java.net.*" %> 
<%@ include file="../SDK/BK_SDK.jsp" %> 
<%
	 
	request.setCharacterEncoding("euc-kr"); 
	
	String userid = request.getParameter("userid");
	String udept = request.getParameter("udept");
	//String currdept = request.getParameter("currdept");
	
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
<script src="/EMR_DATA/script/calendar.js"></script>
<script src='/EMR_DATA/SDK/BK_SDK.js'></script>
<script type="text/javascript">
var retArr="";
var scanArr="";
var copyYN ="";
var dataArrays= new Array();
var curr_time = GetDateString();
var recordArray = new Array();
var after_cdate="";
var after_patid="";
var after_copy_reason="";
var after_pdept="";
var time =100;
var imgstatus = "item_chk0.gif"; 
var userid = '<%=userid%>';
var udept = '<%=udept%>';
var userNm2 = getUserName(userid,'');
var replaceStr = userNm2[0][0].substring(2,1);
userNm2[0][0] = userNm2[0][0].replace(replaceStr,"*");
var tempcolor = new Array();
var selecttab ="";
var tempArrays= new Array();
var tid;
//한글테스트
function onInit(){
	
	var d = new Date();
	
	var mm = (d.getMonth() + 1);
	var dd = d.getDate();
	
	if(dd<10) {
    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 
	var time = d.getFullYear() + "-" + mm + "-" + dd;
	document.getElementById("startdate").value = time ;
	document.getElementById("enddate").value = time ;
	
	//deptselect();
	search_incom();
	//getTime();
	//tid=setInterval('msg_time()',1000);
	
	if(udept=="HI"){
		document.getElementById('del_btn').style.display="block";
		document.getElementById('print_btn').style.display="block";
		document.getElementById('cd_btn').style.display="block";
	}else{
		document.getElementById('del_btn').style.display="block";
		document.getElementById('print_btn').style.display="none";
		document.getElementById('cd_btn').style.display="none";
	}
	 
	
}
function ref_time(){
	time=100;
	//clearInterval(tid);
	//tid=setInterval('msg_time()',1000);
}
function search_incom() {
	ref_time();

	search_incom1("0", "0", "0","0");
	copylist();
	
	// 그리드 뿌려주기
	var docGrid = new dhtmlXGridObject('doc_list1');
	docGrid.setImagePath("/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/");
	docGrid.setHeader("선택,신청일자,병록번호,이름,출력사유,신청부서,신청자명,총매수,''",null,["text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center","text-align:center"]);
	docGrid.setInitWidths("30,*,*,*,*,60,60,50,0");
	docGrid.setColAlign("center,center,center,center,center,center,center,center,center");
	docGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro");
	docGrid.setColSorting("str,str,str,str,str,str,str,str,str");
	//docGrid.setColHidden("true","true","true","false");
	
	
	docGrid.setSkin("dhx_black");
	docGrid.init();
	var xObj=getXmlObject(GetDocXml());
	docGrid.parse(xObj);
	docGrid.attachEvent("onHeaderClick", function(ind,obj){});

		docGrid.attachEvent("onBeforeSelect", function(new_row,old_row,new_col_index){
			 var a= Number(new_row)+1 ;
			 
		   var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
		   var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
		   var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
		   var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
		   
		   after_cdate = cdate;
		   after_patid = patid;
		   after_copy_reason = copy_reason;
		   after_pdept = pdept;
		   clickheader(document.getElementById("2"));
		   search_incom1(cdate, patid, copy_reason,pdept);
		   
		   //상세리스트 컬러 전역배열
		   for(var z =0;z< getElementsByClassNameCompatible2('obj row20px')[0].rows.length-1;z++){
				tempcolor[z] = getElementsByClassNameCompatible2('obj row20px')[0].rows[z+1].bgColor;
			}
			
				for(var z =0;z< getElementsByClassNameCompatible('obj row20px')[0].rows.length-1;z++){
					getElementsByClassNameCompatible('obj row20px')[0].rows[z+1].bgColor="#FFFFFF";
				}
				
				getElementsByClassNameCompatible('obj row20px')[0].rows[a].bgColor="#A4A4A4";
				ref_time();
		});
		
		
	clickheader(document.getElementById("1"));
	
}


function search_incom1(cdate, patid, copy_reason,pdept){
	detaillist(cdate, patid, copy_reason, pdept);
	
	// 그리드 뿌려주기
	var docGrid = new dhtmlXGridObject('doc_list2');
	docGrid.setImagePath("/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/");
	docGrid.setHeader("선택,신청일자,부서, 환자명,서식명, 서식구분,매수,,,,,부수,출력여부",null,["text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center;","text-align:center","text-align:center"]);
	docGrid.setInitWidths("30,70,40,50,160,60,50,0,0,0,0,50,70");
	docGrid.setColAlign("center,center,center,center,center,center,center,center,center,center,center,center,center");
	docGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	docGrid.setColSorting("str,str,str,str,str,str,str,str,str,str,str,str,str");
		
	docGrid.setSkin("dhx_black");
	docGrid.init();
	var xObj=getXmlObject(GetDocXml1());
	docGrid.parse(xObj);
	docGrid.attachEvent("onHeaderClick", function(ind,obj){
		if(ind==0){
			var rowlength = getElementsByClassNameCompatible2('obj row20px')[0].rows.length;
			for(var i=1;i<rowlength;i++){
				if(imgstatus=="item_chk0.gif"){
					getElementsByClassNameCompatible2('obj row20px')[0].rows[i].cells[0].getElementsByTagName('img')[0].src = "/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/item_chk1.gif";
				}else{
					getElementsByClassNameCompatible2('obj row20px')[0].rows[i].cells[0].getElementsByTagName('img')[0].src = "/EMR_DATA/dhtmlx/dhtmlxGrid/imgs/item_chk0.gif";
				}
			}

			if(imgstatus=="item_chk0.gif"){
				imgstatus="item_chk1.gif";
			}else{
				imgstatus="item_chk0.gif";
			}
		}
		
	});
			
		docGrid.attachEvent("onBeforeSelect", function(new_row,old_row,new_col_index){
			var a= Number(new_row)+1 ;
			var recIdno = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[7].innerText;
			var docCode = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[8].innerText;
			var type = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[5].innerText;
			
			if(type=="SDE서식"){
				type = "1";
			}else{
				type ="0";
			}
			
			for(var z =0;z< getElementsByClassNameCompatible2('obj row20px')[0].rows.length-1;z++){
				if(tempcolor[z]=="red"){
					getElementsByClassNameCompatible2('obj row20px')[0].rows[z+1].bgColor=tempcolor[z];
				}else{
					getElementsByClassNameCompatible2('obj row20px')[0].rows[z+1].bgColor="#FFFFFF";
				}	
			}
			getElementsByClassNameCompatible2('obj row20px')[0].rows[a].bgColor="#A4A4A4";
			
			
			
			changeSRC(recIdno,docCode,patid,type,new_row);
			ref_time();
		});
			var rowlength = getElementsByClassNameCompatible2('obj row20px')[0].rows.length;
			for(var i=1;i<rowlength;i++){
				if(getElementsByClassNameCompatible2('obj row20px')[0].rows[i].cells[12].innerText=="Y"){
					getElementsByClassNameCompatible2('obj row20px')[0].rows[i].bgColor ="red";
				}
			}
	
	
	
	
	clickheader(document.getElementById("2"));
	
}


function changeSRC(recIdno,docCode,pid,type,rows){
	var rightsrc = "";
	
	rightsrc += "viewType=4&recIdx=0";
	rightsrc += "&recIdno=" + recIdno;
	rightsrc += "&docCode=" + docCode;
	rightsrc += "&pid=" + pid;
	rightsrc += "&checkReason=0"; //0 = 사본발급 , 1= 미비관리
	
	if(type=="1"){
		rightsrc ="/EMR_DATA/right_content.jsp?";
		//var rightsrc ="http://192.168.2.43:8080/EMR_DATA/right_content.jsp?";
		rightsrc += "viewType=4&recIdx=0";
		rightsrc += "&recIdno=" + recIdno;
		rightsrc += "&docCode=" + docCode;
		rightsrc += "&pid=" + pid;
		rightsrc += "&checkReason=0"; //0 = 사본발급 , 1= 미비관리
		rightsrc += "&recSeq="+dataArrays[rows][14];
		
	}else{
		rightsrc ="/EMR_DATA/copy/copy_right.jsp?src="+recIdno;
		//rightsrc ="/EMR_DATA"+recIdno;
	}
	
	
	//alert(rightsrc);
	//EMR_DATA/right_content.jsp?viewType=1&recIdx=0&recIdno='$기록지코드'&docCode='$서식지코드'&recSeq='$기록SEQ_NO'&pid='$환자아이디'&doctorId='$의사아이디'&deptCd='$환자진료부서코드'
	//3으로 
	//EMR_DATA/right_content.jsp?viewType=3&recIdx=0&recIdno='$기록지코드'&docCode='$서식지코드'&pid='$환자아이디'
	parent.document.getElementById('conBody1').src=rightsrc;
}

function changeSRC1(type){
	rightsrc ="/EMR_DATA/copy/copy_right.jsp?src="+type+"&checktype=print";
	parent.document.getElementById('conBody1').src=rightsrc;
}


 
function detaillist(cdate, patid, copy_reason,pdept){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'detaillist';
 	var postData = "cmd="+cmd +"&cdate=" +cdate +"&patid="+patid +"&copy_reason=" + copy_reason +"&copyYN=" + copyYN +"&pdept=" + pdept+"&udept=" + udept+"&userid=" + userid;
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : 상세 리스트 조회 실패");
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


function copylist(){
	var start = document.getElementById("startdate").value;
	var end = document.getElementById("enddate").value;
	copyYN = document.getElementById("mycheck").checked ;
	var search_patid = document.getElementById("patid").value;
	var print_reason =  document.getElementById("print_reason").value;
	
	if(copyYN==true){
		copyYN="N";
	}else{
		copyYN="";
	}
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'copylist';
 	var postData = "cmd="+cmd +"&start=" +start +"&end=" +end +"&copyYN=" +copyYN +"&patid=" +search_patid +"&print_reason=" +print_reason +"&userid=" +userid + "&udept="+udept;
	//var retData = GetAjaxData(url, "params="+ToHex4Unicode(postData));
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : 신청 리스트 조회 실패");
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

function deptselect(){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'DeptUser';
 	var postData = "cmd="+cmd;
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
	    objOption.text = retArr[1][i][1] ;
	    objOption.value = retArr[1][i][0].replace(/ /gi, ""); 
	    
	    objSel.options.add(objOption);
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

function checkselect(){
	if(document.getElementById("1_2").className =="tabOff"){
		selecttab = "2";
	}else{
		selecttab = "1";
	}
}

function clickheader(a){
	//alert(a.id);
	var tdId = a.id;
	
	document.getElementById("1_1").className = "tabOffText";
	document.getElementById("1_2").className = "tabOff";
	document.getElementById("1_3").className = "tabOffLeft";
	document.getElementById("1_4").className = "tabOffTop";
	document.getElementById("1_5").className = "tabOffRight";
	document.getElementById("doc_list2").style.display = "none";
	
	document.getElementById("2_1").className = "tabOffText";
	document.getElementById("2_2").className = "tabOff";
	document.getElementById("2_3").className = "tabOffLeft";
	document.getElementById("2_4").className = "tabOffTop";
	document.getElementById("2_5").className = "tabOffRight";
	document.getElementById("doc_list1").style.display = "none";
	
	document.getElementById(tdId+"_1").className = "tabOnText";
	document.getElementById(tdId+"_2").className = "tabOn";
	document.getElementById(tdId+"_3").className = "tabOnLeft";
	document.getElementById(tdId+"_4").className = "tabOnTop";
	document.getElementById(tdId+"_5").className = "tabOnRight";
	document.getElementById("doc_list"+tdId).style.display = "block";
	
	//a2 신청리스트 , a1 상세리스트
	if(a.id=="a2"){
		
	}else{
		
	}
		
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
		+"<cell>"+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][0])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][1])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][2])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][3])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][4])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][8])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][7])+"장</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][5])+"</cell>"
			+ "</row>";
	}
	ret += "</rows>";
	return ret;
}
function GetDocXml1()
{
	var ret="<?xml version='1.0' encoding='EUC-KR'?>";
	if(retArr==null)
		return ret;
	var x1=retArr[1].length;
	var x2;
	ret += "<rows>";
	dataArrays= new Array();
	for(x2=0;x2<x1;x2++)
	{  
		
		dataArrays[x2] = new Array();
		for(var z=0; z<retArr[1][x2].length;z++){
			dataArrays[x2][z]= retArr[1][x2][z];
		}	
		ret += "<row id='"+x2+"'>"
			+"<cell>"+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][6])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][13])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][11])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][17])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][16])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][15])+"장</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][4])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][12])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][0])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][8])+"</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][8])+"장</cell>"
			+"<cell>"+fn_rpls4x(retArr[1][x2][7])+"</cell>"
			+ "</row>";
			
	}
	ret += "</rows>";
	return ret;
}

function recdArray(code,hrecd){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'recordArray';
 	var postData = "cmd="+cmd +"&code=" +code +"&hrecd="+hrecd ;
	
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : recordArray 조회 실패");
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
	
	recordArray= new Array();
	var x1=retArr[1].length;
	for(x2=0;x2<x1;x2++)
	{
		
		recordArray[x2] = new Array();
		for(var z=0; z<retArr[1][x2].length;z++){
			recordArray[x2][z]= retArr[1][x2][z];
		}
	}
}


function getElementsByClassNameCompatible(className) {

	if(document.getElementsByClassName) {
		return document.getElementById('doc_list1').getElementsByClassName(className);
	} 
    
    var regEx = new RegExp('(^| )'+className+'( |$)');
	var nodes = new Array();
    var elements = document.getElementById('doc_list1').document.body.getElementsByTagName("*");
	var len = elements.length;
    for(var i=0; i < len ; i++) {
        if(regEx.test(elements[i].className)) {
			nodes.push(elements[i]);
		}
	}
	elements = null;
    return nodes;
}

function getElementsByClassNameCompatible2(className) {

	if(document.getElementsByClassName) {
		return document.getElementById('doc_list2').getElementsByClassName(className);
	} 
    
    var regEx = new RegExp('(^| )'+className+'( |$)');
	var nodes = new Array();
    var elements = document.getElementById('doc_list2').document.body.getElementsByTagName("*");
	var len = elements.length;
    for(var i=0; i < len ; i++) {
        if(regEx.test(elements[i].className)) {
			nodes.push(elements[i]);
		}
	}
	elements = null;
    return nodes; 
}

function cd_cnt(){
	
	checkselect();
	
	if(selecttab =="1"){
		//신청리스트
		//alert("개발중..");
		var type ="";
		var checklength = getElementsByClassNameCompatible('obj row20px')[0].rows.length;
		var z ="";
		var count_row_cd = 0;
		
		
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
		    var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
		    var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
		    var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
				search_incom1(cdate, patid, copy_reason,pdept);
		    
		    
		    
		    for(var arrrow =0; arrrow < retArr[1].length; arrrow++){
					type = retArr[1][arrrow][16];
					cd_save(type,arrrow);
					detaillist(cdate, patid, copy_reason, pdept);
					count_row_cd++;
			  }
		    
		    
			}
		}
		
		if(count_row_cd==0){
			alert("선택된 행이 없습니다."); 
		}else{
			alert("저장되었습니다"); 
		}
		search_incom();
		
		
	}else{
		var type ="";
		var checklength = getElementsByClassNameCompatible2('obj row20px')[0].rows.length;
		var z ="";
		var count_row_cd = 0;
		
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				type = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[5].innerText;
				var total_cnt = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[10].innerText;
				cd_save(type,i);
				count_row_cd++;
			}
		}
		if(count_row_cd==0){
			alert("선택된 행이 없습니다."); 
		}else{
			alert("저장되었습니다"); 
		}
		search_incom();
		search_incom1(after_cdate, after_patid, after_copy_reason,after_pdept);  
		for(var z =0;z< getElementsByClassNameCompatible2('obj row20px')[0].rows.length-1;z++){
			tempcolor[z] = getElementsByClassNameCompatible2('obj row20px')[0].rows[z+1].bgColor;
		}
	}
	
	
	
}

function cd_save(type,rows){
	
	var printObj=GetObj('bkPrint');
	if(type=="SDE서식"){
		//SDE서식
		recdArray(dataArrays[rows][4],dataArrays[rows][14]);
		
		var url = SERVERADDR+"/EMR_DATA/html/"+recordArray[0][38];
		
		var printParam="1^0^"+recordArray[0][35]+"^"+"1"+"^"+dataArrays[rows][1]+"^"+SERVERADDR+"^"+"111"+"^"+"111"+"^"+"111"+"^"+curr_time;
	      printParam+= "^"+recordArray[0][12]+"^"+userNm2[0][0]+"^"+recordArray[0][37]+"^^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+recordArray[0][35]+"^"+recordArray[0][32]+"^0^";
				
		var param= window.location.host+ "/EMR_DATA"+recordArray[0][18] +"^"+ printParam;
		
		IOcheck(rows);//입원 외래 찾기
		
		if(retArr[1][0][0]=='1'){
			//외래
						
			printObj.PrintPDFPage(url, param ,"C:\\"+dataArrays[rows][1]+"\\외래\\"+recordArray[0][22]+"\\"+recordArray[0][10].split(" ")[0].replace(/-/gi,"")+"\\"+dataArrays[rows][17],dataArrays[rows][4], 1,760, 1100 );
			//alert("저장되었습니다");
		}else{
			//입원
			printObj.PrintPDFPage(url, param ,"C:\\"+dataArrays[rows][1]+"\\입원\\"+recordArray[0][22]+"\\"+recordArray[0][10].split(" ")[0].replace(/-/gi,"")+"\\"+dataArrays[rows][17],dataArrays[rows][4], 1,760, 1100 );
			//alert("저장되었습니다");
		}
	}else{
		//영상EMR
		IOcheck_tiff(rows);
		
		if(retArr[1][0][0]=='O'){
			//외래
			var filename ="";
			filename =dataArrays[rows][4].split("/");
			
			filename = filename[filename.length-1];
			
			printObj.ImageDownLoad(SERVERADDR+"/EMR_DATA"+dataArrays[rows][4] , "C:\\"+dataArrays[rows][1]+"\\외래\\"+retArr[1][0][1]+"\\"+retArr[1][0][2]+"\\"+dataArrays[rows][17], filename.split(".")[0]);
			//alert("저장되었습니다"); 
		}else{
			//입원
			var filename ="";
			filename =dataArrays[rows][4].split("/");
			
			filename = filename[filename.length-1];
			
			printObj.ImageDownLoad(SERVERADDR+"/EMR_DATA"+dataArrays[rows][4] , "C:\\"+dataArrays[rows][1]+"\\입원\\"+retArr[1][0][1]+"\\"+retArr[1][0][2]+"~"+retArr[1][0][3]+"\\"+dataArrays[rows][17], filename.split(".")[0]);
			//alert("저장되었습니다"); 
		}
	}
}

function IOcheck(rows){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'IOcheck';
 	var postData = "cmd="+cmd +"&code=" +dataArrays[rows][4];
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

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

function IOcheck_tiff(rows){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'IOcheck_tiff';
 	var postData = "cmd="+cmd +"&code=" +dataArrays[rows][5];
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

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

function scaner_select(four,five){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'scaner_select';
 	var postData = "cmd="+cmd +"&four=" +four +"&five=" +five;
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr[0] == "ERROR") {
		alert("ERROR : " + retDataArr[1]);
		return;
	}
	if(retDataArr[0] == "SUCCESS") {
		scanArr = MakeDataArray(retDataArr[1]);
		if(!scanArr || scanArr.length < 2)
			return;	 
	}
	
}


function print(type,rows,menutab){
	
	var printObj=GetObj('bkPrint');
	if(type=="1"){
		
		//SDE서식
		if(menutab ==1){
			recdArray(retArr[1][rows][4],retArr[1][rows][14]);
			
		}else{
			recdArray(dataArrays[rows][4],dataArrays[rows][14]);
		}
		
		var printParam ="";
		
		var url = SERVERADDR+"/EMR_DATA/html/"+recordArray[0][38];
		
		var printParam="1^0^"+recordArray[0][35]+"^"+"1"+"^"+recordArray[0][4]+"^"+SERVERADDR+"^"+"111"+"^"+"111"+"^"+"111"+"^"+curr_time;
	      printParam+= "^"+recordArray[0][12]+"^"+userNm2[0][0]+"^"+recordArray[0][37]+"^0^"+""+"^"+""+"^^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^"+""+"^^"+recordArray[0][35]+"^"+recordArray[0][32]+"^0^";
			
		var param= window.location.host+ "/EMR_DATA"+recordArray[0][18] +"^"+ printParam;
		printObj.NewPrintPage(url, param, '600', '800');
		
	}else{
		//영상EMR
			changeSRC1(type);
			var doc_name = "";
			if(menutab ==1){
				doc_name = retArr[1][rows][17];
			}else{
				doc_name = getElementsByClassNameCompatible2('obj row20px')[0].rows[rows+1].cells[4].innerText;
			}
			
			var PAGENO = retArr[1][rows][4].substr(0,retArr[1][rows][4].indexOf ('.'));
			PAGENO = PAGENO.substr(PAGENO.lastIndexOf('/')+1,PAGENO.length-PAGENO.lastIndexOf('/'));
			//[4] = 문자열자르기 [5]TREATNO
			scaner_select(PAGENO,retArr[1][rows][5]);
			var scanname = scanArr[1][0][0].substring(2,1);
			scanname = scanArr[1][0][0].replace(scanname,"*");
			
			printObj.ImagePrintPage(window.location.protocol + "//" + window.location.host+ "/EMR_DATA"+type,  doc_name,  '0',userNm2[0][0],curr_time,scanname);
			
			} 
}

function print_cnt(){
	
	checkselect();
	
	if(selecttab =="1"){
		//신청리스트
		//alert("개발중..");
		var type ="";
		var checklength = getElementsByClassNameCompatible('obj row20px')[0].rows.length;
		var z ="";
		var count_row = 0;
		var needcnt = "";
		tempArrays= new Array();
		
		//부수 체크
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				//여기 상세리스트 데이터배열 가져와놓기 tempArrays
			  var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
		    var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
		    var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
		    var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
		    detaillist(cdate, patid, copy_reason, pdept);
		    //retArr;
		    //retArr[1][x2][8];
		    
		    for(var arrrow = 0; arrrow < retArr[1].length; arrrow++){
		    	
		    	if(arrrow == 0){
						needcnt = retArr[1][arrrow][8];
					}else{
						if(needcnt != retArr[1][arrrow][8] ){
							alert("상세리스트 중 부수가 다른 행이 있어 출력이 불가능합니다.");
							return;
						}
						needcnt = retArr[1][arrrow][8]; 
					}
		    }
		    
		    
		    
			}
		}
		
		
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				//여기 상세리스트 데이터배열 가져와놓기 tempArrays
			  var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
		    var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
		    var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
		    var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
		    detaillist(cdate, patid, copy_reason, pdept);
		    
		    needcnt = retArr[1][0][8];
		    
		    for(var qqq =0; qqq < needcnt ; qqq++){
			    for(var arrrow = 0; arrrow < retArr[1].length; arrrow++){
				    	detaillist(cdate, patid, copy_reason, pdept);
							type = retArr[1][arrrow][16];
													
							//tempArrays.push(retArr[1][arrrow][0]);
							arraycheck(retArr[1][arrrow][0]);
							if(type=="SDE서식"){
								print(1,arrrow,1);
							}else{
								print(retArr[1][arrrow][4],arrrow,1);
							}	
							
							//update위치
							//updatecopy(retArr[1][arrrow][0]);
							
				    }
			    }
			}
		}
		for(var tempArrayscnt=0; tempArrayscnt < tempArrays.length; tempArrayscnt++){
			updatecopy(tempArrays[tempArrayscnt]);
		}
		
		
		/*
		//부수 체크 끝나면 출력 돌리기 
		for(var zj=0; zj< needcnt.split("장")[0];zj++){
			for(var i=0;i<checklength-1;i++){
				var a=i+1;
				var img= getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
				   
				var imgs= img.split("/");
				
				var tempurl =imgs[imgs.length-1];
				
				if(tempurl=="item_chk1.gif"){
				 z="1";  
				}else{
				 z="0";
				}
				
				if(z=="1"){
					//여기 상세리스트 데이터배열 가져와놓기 tempArrays
				  var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
			    var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
			    var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
			    var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
			    detaillist(cdate, patid, copy_reason, pdept);
			    			    
			    for(var arrrow = 0; arrrow < retArr[1].length; arrrow++){
			    	
						type = retArr[1][arrrow][16];
												
						if(type=="SDE서식"){
							print(1,arrrow,1);
						}else{
							print(retArr[1][arrrow][4],arrrow,1);
						}	
						
						//update위치
						//updatecopy(dataArrays[i][0]);
						
						
			    	
			    }
				}
			}
		}*/
		
		search_incom();
		
	}else{
		//상세리스트
		var type ="";
		var checklength = getElementsByClassNameCompatible2('obj row20px')[0].rows.length;
		var z ="";
		var count_row = 0;
		var needcnt = "";
		
		//부수 체크
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				if(needcnt==""||needcnt==null){
					needcnt = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[11].innerText ;
				}else{
					if(needcnt != getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[11].innerText ){
						alert("선택된 부수가 다릅니다");
						return;
					}
					needcnt = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[11].innerText ;
				}
			}
		}
		//출력
		for(var zj=0; zj< needcnt.split("장")[0];zj++){
			for(var i=0;i<checklength-1;i++){
				var a=i+1;
				var img= getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
				   
				var imgs= img.split("/");
				
				var tempurl =imgs[imgs.length-1];
				
				if(tempurl=="item_chk1.gif"){
				 z="1";  
				}else{
				 z="0";
				}
				
				if(z=="1"){
					type = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[5].innerText;
					var total_cnt = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[10].innerText;
					
					if(type=="SDE서식"){
						print(1,i,2);
						count_row++;
					}else{
						print(getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[7].innerText,i,2);
						count_row++;
					}	
					//update위치
					updatecopy(dataArrays[i][0]);
					
				}
			
			}
		}
		
		 
		
		if(count_row==0){
			alert("선택된 행이 없습니다.");
		}
		search_incom();
		search_incom1(after_cdate, after_patid, after_copy_reason,after_pdept);  
		for(var z =0;z< getElementsByClassNameCompatible2('obj row20px')[0].rows.length-1;z++){
			tempcolor[z] = getElementsByClassNameCompatible2('obj row20px')[0].rows[z+1].bgColor;
		}
	}
	
	
}

function arraycheck(tempdata){
	var checkdata = "Y";
	
	for(var ch = 0; ch < tempArrays.length; ch++){
		if(tempArrays[ch] == tempdata){
			checkdata = "N";
		}
	}
	
	if(checkdata=="Y"){
		tempArrays.push(tempdata);
	}
	
}


function del_cnt(){ 
	checkselect();
	
	if(selecttab =="1"){
		//신청리스트
		var type ="";
		var checklength = getElementsByClassNameCompatible('obj row20px')[0].rows.length;
		var z ="";
		var del_yn ="N";
		
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				//삭제쿼리
				
				var cdate = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[1].innerText;
		    var patid = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[2].innerText;
		    var copy_reason = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[8].innerText;
		    var pdept = getElementsByClassNameCompatible('obj row20px')[0].rows[a].cells[5].innerText;
		   
		    
				//신청일자,병록번호,출력사유,신청부서
				delprint_request(cdate, patid, copy_reason,pdept);
				del_yn ="Y";
			}
		}
		if(del_yn=="Y"){
			alert("수정되었습니다.");
		}else{
			alert("선택된 리스트가 없습니다");
		}
		search_incom1(after_cdate, after_patid, after_copy_reason,after_pdept);  
		search_incom();
		
	}else{
		//상세리스트
		var type ="";
		var checklength = getElementsByClassNameCompatible2('obj row20px')[0].rows.length;
		var z ="";
		var del_yn ="N";
		
		for(var i=0;i<checklength-1;i++){
			var a=i+1;
			var img= getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[0].getElementsByTagName('img')[0].src;
			   
			var imgs= img.split("/");
			
			var tempurl =imgs[imgs.length-1];
			
			if(tempurl=="item_chk1.gif"){
			 z="1";  
			}else{
			 z="0";
			}
			
			if(z=="1"){
				//삭제쿼리
				
				var seq_no = getElementsByClassNameCompatible2('obj row20px')[0].rows[a].cells[9].innerText;
				delprint(seq_no);
				del_yn ="Y";
			}
		}
		if(del_yn=="Y"){
			alert("수정되었습니다.");
		}else{
			alert("선택된 리스트가 없습니다");
		}
		
		search_incom();
		search_incom1(after_cdate, after_patid, after_copy_reason,after_pdept);  
	}
	
	
	
}

function delprint_request(cdate,patid, copy_reason,pdept){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'deleteprint_request';
 	var postData = "cmd="+cmd +"&cdate=" +cdate +"&patid=" +patid +"&copy_reason=" +copy_reason +"&pdept=" +pdept;
	
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : deleteprint 실패");
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

function delprint(SEQ){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'deleteprint';
 	var postData = "cmd="+cmd +"&SEQ=" +SEQ ;
	
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : deleteprint 실패");
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

function updatecopy(SEQ){
	
	var url = '/EMR_DATA/copylist';
	var cmd = 'updatecopystatus';
 	var postData = "cmd="+cmd +"&SEQ=" +SEQ ;
	
	var retData = GetAjaxData(url, postData);
	var retDataArr = retData.split("◎");

	if(retDataArr.length != 2) {
		alert("ERROR : updatecopy 실패");
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

function refresh_com(){
	document.getElementById("startdate").value = "";
	document.getElementById("enddate").value = "";
	document.getElementById("patid").value = "";
	document.getElementById("print_reason").value = "";
	document.getElementById("mycheck").checked = false;
}
function getTime() { 
	
	if(time <1){
		time =100;
	}
	time = time - 1;
	
	if(time ==0){
		search_incom();
	}
	
	newtime = window.setTimeout("getTime();", 1000); 
} 
	
function msg_time() {	
	document.getElementById("counter3").innerHTML = time; 
	time = time - 1;
	if (time == 0) {			
		search_incom();
		//clearInterval(tid);
		ref_time();
	}
}

	
</script>

</head>
<body onload="onInit()">
<object id='bkPrint' classid='clsid:FF992A61-0A51-4D39-BAFC-E154F5BA8945'   width="0" height="0" onloadstart="" style="position:absolute;left:15;border='solid 0px #000000;'"></object>
<!--codebase="/EMR_DATA/applet/BkSdePrintModule.ocx#version=1,0,0,3"-->

<table class="conTable01" style="width: 450px;margin-top:20px;margin-bottom:10px" border="0" cellSpacing="0" cellPadding="0">
    <colgroup>
    <col width="30%">
    <col width="70%">
    
    </colgroup> 
    <tbody>
    	<!--<tr>
    	<th>부서</th>
        <td id="dept">
			<select name="dept_data" id="dept_data">
        	<option value="" >선택</option>
		</td>
        
    </tr>
    <tr>
    	<th>신청자</th> 
        <td><input id="userid" style="width: 60%;" type="text" maxLength="20" value="">
        </td>
        
    </tr>-->
        <tr >
    	<th>신청일</th>
        <td ><input id="startdate" style="width: 30%;" type="text" maxLength="20" value="">
        <IMG onclick='show_calendar("startdate", "YYYY_MM_DD");' src="/EMR_DATA/img/calendar_icon.gif">
        ~
        <input id="enddate" style="width: 30%;" type="text" maxLength="20" value="">
        <IMG onclick='show_calendar("enddate", "YYYY_MM_DD");' src="/EMR_DATA/img/calendar_icon.gif">
        </td>
        
        </td>
    </tr>
    
     <tr>
     <th>병록번호</th>
        <td><input type='text' id = "patid" name='patid' value='' />
        </td>
	</tr>
	
	<tr>
     <th>출력사유</th>
        <td>
			<select name="print_reason" id="print_reason">
	        	<option value="" >전체</option>
	        	<option value="1" >타병원진료용</option>
	        	<option value="2" >병사용</option>
	        	<option value="3" >공공기관제출용</option>
	        	<option value="4" >개인용도용</option>
        </td>
	</tr>
	
    <tr>
     <th>출력서식 제외 </th>
        <td><input type='checkbox' id = "mycheck" name='mycheck' value='1' />
        <SPAN id=counter3 style ="padding-left:20px"></SPAN>초 후에 목록을 다시 가져옵니다
        <img src="/EMR_DATA/btn_search.gif" style="cursor:hand;" onclick="search_incom()">
        </td> 
        
	</tr>
	
</tbody></table>



<table id="Wrap" border="0" cellSpacing="0" cellPadding="0">
<tbody>
<tr>
<td align="" id="header" style="background:none">
<table class="tabWrap" border="0" cellSpacing="0" cellPadding="0">
<tbody><tr>
	<td >
		<table border="0" cellSpacing="0" cellPadding="0"><tbody>
		<tr>
		
		<td>
			<table class="tabOn" id = "1_2" border="0" cellSpacing="0" cellPadding="0">
				<tr>
					<td class="tabOnLeft" rowSpan="2" id="1_3"></td>
					<td class="tabOnTop" id="1_4"></td>
					<td class="tabOnRight" rowSpan="2" id="1_5"></td>
				</tr>
				<tr>
					<td class="tabOnText" id="1_1" ><a id= "1" onclick="clickheader(this)">신청리스트 </a></td>
				</tr>
				</tbody>
			</table>
			
			</td>
			
			
		<td>
			<table class="tabOff" id ="2_2" border="0" cellSpacing="0" cellPadding="0">
				<tbody>
					<tr>
						<td class="tabOffLeft" rowSpan="2" id ="2_3"></td>
						<td class="tabOffTop" id ="2_4"></td>
						<td class="tabOffRight" rowSpan="2" id ="2_5"></td>
					</tr>
					<tr><td class="tabOffText" id = "2_1"><a id= "2" onclick="clickheader(this)">상세리스트</a></td></tr>
				</tbody>
			</table>
		</td>
		<td>
		<input type="button" id = "del_btn" value ="삭제" style="margin-left:105px;float:left;" onclick="del_cnt()">
		<input type="button" id = "print_btn" value ="출력" style="margin-left:0px;float:left;" onclick="print_cnt()">
		<input type="button" id = "cd_btn" value ="파일저장" style="margin-left:0px" onclick="cd_cnt()">
		</td>
		</tr>
		</tbody>
		
		</table> 
		
    </td>
    
</tr>
</tbody></table>


</table>

<div id="doc_list1" style="height: 670px; width: 500px; cursor: default; margin-top:-10px;" class="gridbox gridbox_dhx_black">
	<div class="xhdr" style="width: 100%; height: 27px; overflow: hidden; position: relative;">
		<table cellpadding="0" cellspacing="0" class="hdr" style="width: 420px; table-layout: fixed; margin-right: 20px; padding-right: 20px;">
		<tbody>
			<tr>
			
			<td style="text-align: center;"><div class="hdrcell">신청일자</div></td>
			<td style="text-align: center;"><div class="hdrcell">병록번호</div></td>
			<td style="text-align: center;"><div class="hdrcell">환자명</div></td>
			<td style="text-align: center;"><div class="hdrcell">신청부서</div></td>
			<td style="text-align: center;"><div class="hdrcell">출력사유</div></td>
			</tr>
		</tbody>
	</table>
	</div>
</div>

<div id="doc_list2" style="height: 670px; width: 500px; cursor: default; margin-top:-10px; display:none" class="gridbox gridbox_dhx_black">
	<div class="xhdr" style="width: 100%; height: 27px; overflow: hidden; position: relative;">
		<table cellpadding="0" cellspacing="0" class="hdr" style="width: 420px; table-layout: fixed; margin-right: 20px; padding-right: 20px;">
		<tbody>
			<tr>
			
			<td style="text-align: center;"><div class="hdrcell">신청일자</div></td>
			<td style="text-align: center;"><div class="hdrcell">환자명</div></td>
			<td style="text-align: center;"><div class="hdrcell">서식구분</div></td>
			</tr>
		</tbody>
	</table>
	</div>
</div>

<div id ="imgdiv">
<img id = "imgs" src="" width="500" height="500">
</div>

</body>
</html>

<script>
	tid=setInterval('msg_time()',1000);
</script>