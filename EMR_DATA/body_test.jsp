<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@page contentType="text/html;charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.0'></script>
<%
 
	String pid=request.getParameter("pid");                          // 환자아이디
	String doctorId = request.getParameter("doctorId");          // 의사아이디
	String deptCd = request.getParameter("deptCd");             // 환자 진료 부서
	String uDeptCd = request.getParameter("uDeptCd");         // 의사 부서
	String arrTypeVar = request.getParameter("arrTypeVar");  //추가 파라미터
	//arrTypeVar=medDate@20140101$
	
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<meta http-equiv="X-UA-Compatible" content="IE=9;" />
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>EMR Viewer Main</title>
<link href="css/layout.css" rel="stylesheet" type="text/css" />
</head>
<script src='/EMR_DATA/SDK/js/Main.js?v=1.0.2'></script>
<script>
	
	var ipaddress;
	var blockDiv;
	var m_port;
	var bstep=0;
	
	var BK_REC_DATA="";
	var BK_HWAN_JA_NAME;
	var BK_HWAN_JA;
	var BK_USER;
	var OPENDEPT = ["CM" ,"FM" ,"GS" ,"NE" ,"NP" ,"NS" ,"SP" ,"HO" ,"GE" ,"EM" ,"RT" ,"ID" ,"UR" ,"TS" ,"PD" ,"MC" ,"CV" ,"OC" ,"NN" ,"RI" ,"OL","NR","DM","OS","PS","OG","OT","RE","DS","RM","RR","PC","EO","RD","OM"];
	var openDeptCheck = true;
	
	function oninit()
	{
		if(SERVERADDR.indexOf('preemrdev')!=-1 && window.navigator.appName == "Microsoft Internet Explorer" && window.navigator.appVersion.substring(window.navigator.appVersion.indexOf("MSIE") + 5, window.navigator.appVersion.indexOf("MSIE") + 7) <= 8)
			alert("낮은 버전의 Internet explorer를 사용하고 있습니다. \nPre-EMR 내 일부 기능이 동작하지 않을 수 있습니다.\n의료정보팀으로 연락바랍니다.");
		doctorId = "<%=doctorId%>";
		pid="<%=pid%>";
		deptCd="<%=deptCd%>";
		uDeptCd="<%=uDeptCd%>";
		arrTypeVar = "<%=arrTypeVar%>";
		ipaddress='<%=request.getRemoteAddr()%>';
		
		if(pid=="" || pid=="null" || pid==null)
		{
			/*if(SERVERADDR.indexOf('preemrdev')==-1)
			{
				alert("환자를 확인 할 수 없습니다.");
				return;
			}
			else*/
			{
				//pid="00056589"; //CM
				pid="01107803";//"00596722"; //02697327 테스트환자 02697336  확인 환자 :02685322 / 02543980
				//pid="01294839";
				//pid="01245809";
				deptCd="NS";
				uDeptCd="NS"; //"HI"; //"GS"; // NR 전공의 2130709 전문의 1862552, 1400004 / NS 1921684 / FM 1952898 / NP 2160002 / GS 1882447
				doctorId = "1921684";//"1505041";//"2131758";//"2170287";//"2011296";//"1991723";//"1505041"; //"1840479";
				//doctorId = "1006111";
				arrTypeVar="chosType@O$medDate@20170922$gubun@2$hyubjin@$groupDept@CV#RM#NE";
			}
		}
				
		BK_HWAN_JA_NAME = getHwanjaInfo3(pid);
		if(BK_HWAN_JA_NAME.length==0)
			BK_HWAN_JA_NAME = [['02697327','홍길동','123456-*****']];
		BK_HWAN_JA = getHwanjaInfo2(pid,arrTypeVarData('medDate'),deptCd);
		if(BK_HWAN_JA.length==0)
			BK_HWAN_JA = [[BK_HWAN_JA_NAME[0][0],BK_HWAN_JA_NAME[0][1],BK_HWAN_JA_NAME[0][2],'22','M','010-1234-5678','1840479',arrTypeVarData('medDate'),deptCd,'20170101']];
		BK_USER = getUserName(doctorId,uDeptCd);
		
		//if(ipaddress=="192.168.6.145")
		if(SERVERADDR.indexOf('preemrdev')==-1)
			openDeptCheck = fn_openDeptCheck(uDeptCd);
		//if(ipaddress=="192.168.6.145")
			//alert(navigator.appVersion);
		
		ActiveXCheck();
		var mainBody = document.getElementById('mainBody');
		var addTag = "";
		addTag = "<table><tr><td><iframe id='leftbody' src='left.jsp' name='left' marginheight='0' frameborder='no' style='border:none; padding:0px; margin-right:0px; height:940px; width:400px'></iframe></td>";
		addTag+="<td><iframe id='rightbody' src='right.jsp' name='right' marginheight='0' frameborder='no' style='bordercolor:#194f9d; padding:0px; height:940px; width:820px; margin-top:0px'></iframe></td></tr></table>";
		mainBody.innerHTML+=addTag;
		//style='width:1230px;height:940px;position:absolute;left:50%;margin-left:-615px'
		/*mainBody.style.width="1230px";
		mainBody.style.height="940px";
		
		var marginLeft;
		if(window.outerWidth/2>=1230)
		{
			mainBody.style.position="absolute";
			mainBody.style.left="50%";
			var marginLeft = (window.outerWidth-1230)/2;
			mainBody.style.margin="0 0 0 -"+marginLeft+"px";
		}
		*/
		blockDiv = document.getElementById('blockDiv');
		blockDiv.style.display="none";
	}
	
	function GetParamData(data, name)
	{
		var p=data.split('^');
		for(var i=0;i<p.length;i++)
		{
			var p1=p[i].split('|');
			if(p1[0]==name)
				return p1[1];
		}
		return "";
	}
	
	function fn_Trace(data)
	{
		//console.log(data);
	}
	
	
	function sendData()
	{
		var msg;
		//var comm = document.getElementById("command").value;
		var param = document.getElementById('param').value;
		msg = " param : "+ param;//msg = "command : "+ comm +"\r\n parma : "+ param;

		agentObj.SendToMsg('127.0.0.1',m_port, msg);
	}
	
	
	function refreshRecData(newRecData)//서식,기록이 저장되었을 때 데이터 Refresh (right_content.jsp에서 호출)
	{
		/*var len = BK_REC_DATA.length;
		BK_REC_DATA[len] = newRecData;		
		var left=document.getElementById('leftbody').contentWindow;*/
		//left.document.getElementById('i_rec').contentWindow.init();		 kjk
		left.SetSubMenu(2);
		left.frames[2].LeftClick(newRecData);
	}
	function refreshOldData(newRecData,idx)
	{
		/*BK_REC_DATA[idx]=newRecData;
		var left=document.getElementById('leftbody').contentWindow;*/
		//left.document.getElementById('i_rec3').contentWindow.init();		kjk
		left.SetSubMenu(2);
		left.frames[2].LeftClick(newRecData);
	}
	
	var CallHistory=new Array();
	var CallId=0;
	
	function getExtInfo(obj,path, arguement, setvalue_option, Type)
	{
		CallId++;
		CallHistory[CallHistory.length++]=[CallId,obj,path,arguement,setvalue_option];
		agentObj.CallOcsExe(path,CallId,arguement);
	}
	
	function ActiveXCheck(){    /// EMR_DATA/applet/BK_Solution.XML을 통해 프로그램을 다운 받고 설치하는 것
		
		//alert(SERVERADDR);
	   var url = SERVERADDR+"/EMR_DATA/applet/BK_Solution.XML";
	   var axObj = null;
      try{
	      while(!axObj) {
	        axObj = new ActiveXObject("BKACTIVEXMANAGER.BKActiveXManagerCtrl.1");
	        if(axObj){
	          Installed = true;  
	          break;
	        }else{
	          Installed = false;
	        }
	        
	        sleep(500);
	      }
      }catch(e){
        Installed = false;
      }
      finally
      {
       axObj = null;
      }
      if(Installed == true){
        	ActiveX.ExecuteBK(url,SERVERADDR);
      }else{
         alert("BKActiveXManager Controller가 정상적으로 설치되지 않았습니다.\n\n\n"+
               "-------------- [설치 안 될 경우 체크사항] --------------\n\n"+
               "\"인터넷옵션 - 보안 - 사용자 지정수준 - 서명 안 된 ActiveX 컨트롤 다운로드 - 확인\" 체크 후\n\n"+
               "다시 실행하시기 바랍니다.");
      }
    	
	}
	
	function UnSetMatchedContext()
	{
		if(CertManX == null) {
			alert("CertManX is null");
			return;
		}
		var tempCertManX = CertManX;
		
		tempCertManX.UnSetMatchedContext();
	}
	function alertUrl()
	{
		if(ipaddress=="192.168.6.144" || ipaddress=="192.168.6.145" || ipaddress=="192.168.6.146" || ipaddress=="192.168.6.147" || ipaddress=="192.168.6.249")
			alert(SERVERADDR+"/EMR_DATA/body.jsp?pid="+pid+"&doctorId="+doctorId+"&deptCd="+deptCd+"&uDeptCd="+uDeptCd+"&arrTypeVar="+arrTypeVar);
	}
	
</script>

<body id='mainBody' onload='oninit()' style='width:1230px;height:940px;'> <!-- style='width:1230px;height:940px;position:absolute;left:50%;margin-left:-615px'-->
<object id = "ActiveX" classid="clsid:444BF9CD-6AB4-4B77-86BC-18F7C8BC7B53" codebase="/EMR_DATA/applet/BKActiveXManager.cab#version=1,2,0,20" style="display:none"></object>
<OBJECT id='CertManX' classid='CLSID:EC5D5118-9FDE-4A3E-84F3-C2B711740E70' codebase='/EMR_DATA/applet/SKCommAX.cab#version=9,9,7,3' style='display:none;'></OBJECT>
<OBJECT id = 'KMClientAX' classid = 'CLSID:D3C608B5-B664-4962-91B7-289DA892953A' codebase='/EMR_DATA/applet/(3.3.1.0)_KMClientAX.cab#version=3,3,1,0'  style='display:none;'></OBJECT>
<!--table> 
<tr>
<td><iframe id="leftbody" src="left.jsp" name="left" marginheight="0" frameborder="no" style="border:none; padding:0px; margin-right:0px; height:940px; width:400px"></iframe></td>
<td><iframe id="rightbody" src="right.jsp" name="right" marginheight="0" frameborder="no" style="bordercolor:#194f9d; padding:0px; height:940px; width:820px; margin-top:0px"></iframe></td>
</tr> 
</table-->
<span id='urlBox' style='width:20px;height:20px;position:absolute;top:0px;left:35%;display:inline-block;background:#ffffff;opacity:0; filter:alpha(opacity=0);z-index:10' onclick='alertUrl()'></span>
<div id='blockDiv' style='width:400px;height:840px;position:absolute;top:90px;display:inline-block;background:#ffffff;opacity:0; filter:alpha(opacity=0);z-index:10' ></div>
</body>
</html> 