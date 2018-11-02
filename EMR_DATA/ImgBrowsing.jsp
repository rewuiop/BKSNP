
<%@page contentType="text/html; charset=EUC-KR"%>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ include file="/SDK/BK_SDK.jsp" %>
<!DOCTYPE html>
<head>
<script src='/EMR_DATA/SDK/BK_SDK.js?v=1.0.4'></script>

<%
	out.println("<script>");
	out.println("var BK_IMG_CATE; var BK_IMG_DATA; var BK_TEMP;");
	List ImgList = VSI_GetImageCategory(request.getParameter("category"));
	VSI_SetDataArr(ImgList, "BK_IMG_CATE", BK_IMG, out);
	
	ImgList = VSI_GetImageList(null);
	VSI_SetDataArr(ImgList, "BK_IMG_DATA", BK_IMG, out);
	out.println("var cateid='"+request.getParameter("category")+"';");
	out.println("var paintId='"+request.getParameter("id")+"';");
	out.println("</script>");
	
%>


<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>Image List</title>
<link href="css/layout.css" rel="stylesheet" type="text/css" />
<link rel="STYLESHEET" type="text/css" href="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.css"/>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxcommon.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/dhtmlxtree.js"></script>
<script type="text/javascript" src="/EMR_DATA/dhtmlx/dhtmlxTree/ext/dhtmlxtree_start.js"></script>


</head>




<script>

	var GridString="";
	var tree;
	var mygrid;
	var imgSrc;
  
	function init()
	{
		if(!BK_IMG_CATE) {
			alert("Category 정보가 존재하지 않습니다");
			//window.close();
			return;
		}
		
		for(var i=0;i<BK_IMG_CATE.length; i++)
		{
			if(BK_IMG_CATE[i][1] == cateid)
			{
				cateid = BK_IMG_CATE[i][0];
				break;
				}
		}

		var temp = [0,null];
		var imgXml = VSIJ_MakeImageXml(BK_IMG_CATE, BK_IMG_DATA, temp);//BK_SDK.js의 VSIJ_MakeDocumentXml
		tree = MakeTreeToXml('imgList', '100%','100%', 'dhx_skyblue', '/EMR_DATA/dhtmlx/dhtmlxTree/imgs/csh_bluebooks/', 0, imgXml, LeftClick, null);
		
		tree.selectItem("imgcate_"+cateid);
		tree.openItem("imgcate_"+cateid);
		
		
	}
	
	function LeftClick(id)
	{
		var str = id.split('_');
		if(str[0] != 'img')
			return;
			
		for(var i=0; i<BK_IMG_DATA.length; i++)
		{
			if(str[1] == BK_IMG_DATA[i][0])
			{
				var obj=document.getElementById('imgPan');
				if(obj)
				{
					obj.src="/EMR_DATA/img/"+BK_IMG_DATA[i][5];
					obj.style.display='block';
				}
			}		
		}
	}

	function selectImg()
	{
		var obj=document.getElementById('imgPan');
		if(obj)
		{
			window.returnValue=obj.src;
			imgSrc=obj.src;
			
			window.close();
		}
	}
	/*
	window.onunload = function()
	{
		webCheck();
	}
	
	function webCheck()
	{
		//var HtmlCanObjCheck = window.opener.document.createElement('canvas');
		//var HtmlCtxCheck = HtmlCanObjCheck.getContext;
		//var agent = navigator.userAgent.toLowerCase();
		
		//if(agent.indexOf('11.0') != -1 || agent.indexOf('chrome') != -1 || agent.indexOf('safari') != -1 || agent.indexOf('firefox') != -1 || agent.indexOf('android') != -1 || agent.indexOf('iphone') != -1)// 버전이 11
		if(typeof HtmlCtxCheck != "undefined")
		{
			window.opener.childReturn(paintId,imgSrc);
		}
	}*/
	
</script>
<body onload='init()' >
<TABLE style='border:1px solid #C8D0CF; width:600px;' align='center' bgcolor='#ffffff'>
	<tr>
		<td align='center' id='title' style='height:30px; font-size:25px; font-weight:bold;'>이 미 지</td>
	</tr>
	<tr>
	<td>
<table width='600px' style='border:1px solid #C8D0CF;' bgcolor='#FFFFFF'>
<tr><td valign='top'  width='250px'  height='400px'>
	<table width='100%' height='400px'>
	<tr><td></td></tr>
	<tr><td>
	<div style='width:100%;height:400px; border:1px solid #C8D0CF;' id='imgList'></div>
	</td></tr>
</table>
</td><td valign='top' height='400px' align='right'>
	<input type=button onclick='selectImg();' value='선택' style='width:60px; height:25px;'><br>
	<img id='imgPan' width="350px" style='display:none' />
</td></tr>
</table>
</td>
</tr>
</table>
</body>
</html>	