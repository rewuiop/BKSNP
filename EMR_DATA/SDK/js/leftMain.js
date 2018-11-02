var GridString="";
var tree;
var mygrid;
var defaultId=0;
var useCheckBox=0;
var initCheck = 0;
BK_DOC_CATE = parent.BK_DOC_CATE;
BK_DOC_DATA = parent.BK_DOC_DATA;
BK_REC_DATA = parent.BK_REC_DATA;
BK_SHOW_FRAME = parent.BK_SHOW_FRAME;
S_CNT = parent.S_CNT;


function init()
{
	document.oncontextmenu=contextMenu;
}

var SubMenu = ["신규","입원","외래","서식"];
function SetSubMenu(idx)
{	
	var arrTypeVar = parent.arrTypeVar;
	var chosType = parent.arrTypeVarData('chosType');
	var hyubjin = parent.arrTypeVarData('hyubjin');
	if(parent.BK_USER[0][4]!='S' && parent.BK_USER[0][4]!='R' && parent.BK_USER[0][4]!='I' || (hyubjin!="" && hyubjin!="N"))
	{
		if(idx=="-1")
		{
			defaultId=1;
			if(chosType=="I" || chosType=="")
			{
				idx=1;	
			}
			else
			{
				idx=2;
			}
		}	
	}
	else
	{
		if(idx=="-1" && (chosType=="I" || chosType=="") && parent.openDeptCheck==false) //입원환자일 경우 신규 탭 보여지지 않도록 수정
		{
			defaultId=1;
			idx=1;
		}
		if(idx=="-1" && (chosType=="I" || chosType==""))
		{
			defaultId=1;
			idx=1;
		}
		else if(idx=="-1" && (chosType=="O" || chosType=="E" ) && parent.openDeptCheck==false) //입원환자일 경우 신규 탭 보여지지 않도록 수정
		{
			defaultId=1;
			idx=2;
		}
		else if(idx=="-1" && (chosType=="O" || chosType=="E"))
			idx=2;
		
	}
	treeSort = idx;
	var i;
	var color;
	var tdHtml="<TABLE cellpadding='0' cellspacing='0' border='0' id='subMenu'><tr>";
	for(i=defaultId; i<SubMenu.length; i++)
	{
		var onOff="off";
		if(i == idx)
		{
			onOff = "on";
		}
		if(i==0)
		{
				tdHtml += "<td padding='0px'>"
								+ "<table cellpadding='0' cellspacing='0' border='0'>"
	       			 	+ "<tr ><td  class='gap_l_"+onOff+"' onClick='SetSubMenu("+i+");' padding='0px'></td><td class='"+onOff+"' onClick='SetSubMenu("+i+")' padding='0px' valign='middle'><span class='green' valign='middle' style='cursor:pointer'>"+SubMenu[i]+"</span></td><td class='gap_r_"+onOff+"' onClick='SetSubMenu("+i+")'></td></tr></table></td>";
		}
		//else if(i==1)
		else
		{
				tdHtml += "<td padding='0px'>"
								+ "<table cellpadding='0' cellspacing='0' border='0'>"
	  		      	+ "<tr><td  class='gap_l_"+onOff+"' onClick='SetSubMenu("+i+");' padding='0px'></td><td class='"+onOff+"' onClick='SetSubMenu("+i+")' padding='0px' valign='middle'><span class='red' valign='middle' style='cursor:pointer'>"+SubMenu[i]+"</span></td><td class='gap_r_"+onOff+"' onClick='SetSubMenu("+i+")'></td></tr></table></td>";
		}
/*	else if(i==2)
		{
			color="yellow";
				tdHtml += "<td padding='0px'>"
							+ "<table cellpadding='0' cellspacing='0' border='0'>"
	      	  	+ "<tr><td  class='gap_l_"+onOff+"' onClick='SetSubMenu("+i+");' padding='0px'></td><td class='"+onOff+"' onClick='SetSubMenu("+i+")' padding='0px' valign='middle'><span class='yellow' valign='middle'>"+SubMenu[i]+"</span></td><td class='gap_r_"+onOff+"' onClick='SetSubMenu("+i+")'></td></tr></table></td>";
		}*/
	
	}
	tdHtml += "</tr></TABLE>";
	document.getElementById('subMenu').outerHTML=tdHtml;
	
	if(idx==0)
	{
		
		document.getElementById('doc').style.display='block';
		document.getElementById('record2').style.display='none';
		document.getElementById('record3').style.display='none';
		document.getElementById('record4').style.display='none';
		document.getElementById('i_doc').contentWindow.useCheckBox=useCheckBox;
		document.getElementById('i_doc').contentWindow.Leftinit();
	}
	else if(idx==1)
	{
		document.getElementById('doc').style.display='none';
		document.getElementById('record2').style.display='block';
		document.getElementById('record3').style.display='none';
		document.getElementById('record4').style.display='none';
		document.getElementById('i_rec2').contentWindow.useCheckBox=useCheckBox;
		document.getElementById('i_rec2').contentWindow.init();
		if(initCheck==0)
		{
			var rec2 = document.getElementById('i_rec2').contentWindow;
			if(rec2.tree.htmlNode.childNodes[0].childNodes.length>0)
			{
				rec2.VSIJ_AddItemToTree(rec2.tree,rec2.tree.htmlNode.childNodes[0].childNodes[0].id,rec2.getIDRecdDataDept(rec2.tree.htmlNode.childNodes[0].childNodes[0].id));
				if(rec2.tree.htmlNode.childNodes[0].childNodes[0].childNodes.length>0)
					rec2.recordCheck(rec2.tree.htmlNode.childNodes[0].childNodes[0].childNodes[0].id);
			}
			initCheck=1;
		}
	}
	else if(idx==2)
	{
		document.getElementById('doc').style.display='none';
		document.getElementById('record2').style.display='none';
		document.getElementById('record3').style.display='block';
		document.getElementById('record4').style.display='none';
		document.getElementById('i_rec3').contentWindow.useCheckBox=useCheckBox;
		document.getElementById('i_rec3').contentWindow.init();
		if(initCheck==0)
		{
			var rec3 = document.getElementById('i_rec3').contentWindow;
			var childNode = rec3.tree.htmlNode.childNodes[0].childNodes;
			if(childNode.length>0)
			{
				for(var k=0;k<childNode.length;k++)
				{
					if(childNode[k].id==parent.uDeptCd)
					{
						//rec3.VSIJ_AddItemToTreeDate(rec3.tree,childNode[k].id,rec3.getOPRecdDataDept(childNode[k].id));
						if(childNode[k].childNodes.length>0)
						{
							var indate = childNode[k].childNodes[0].id.split(" ");
							var indate1 = indate[0];
							var indate2 = indate[0].split(" ")[0].substring(0,4)+"-"+indate[0].split(" ")[0].substring(4,6)+"-"+indate[0].split(" ")[0].substring(6,8);
							rec3.VSIJ_AddItemToTree(rec3.tree,childNode[k].childNodes[0].id,rec3.getOPRecdDataDept2(parent.uDeptCd,indate1,indate2));	
							/*if(parent.uDeptCd!="CM" && parent.uDeptCd!="FM" && parent.uDeptCd!="GS" && parent.uDeptCd!="NE" && parent.uDeptCd!="NP" && parent.uDeptCd!="NS" && parent.uDeptCd!="SP")
								rec3.recordCheck(childNode[k].childNodes[0].childNodes[0].id);
								*/
							//document.getElementById('i_rec3').contentWindow.scrollChange();
						}
						break;
					}
				}	
			/*var indate = rec3.tree._selected[0].id.split(" ");
			var indate1 = indate[0];
			var indate2 = Sid[0].split(" ")[0].substring(0,4)+"-"+Sid[0].split(" ")[0].substring(4,6)+"-"+Sid[0].split(" ")[0].substring(6,8);
			rec3.VSIJ_AddItemToTree(rec3.tree,rec3.tree._selected[0].id,rec3.getOPRecdDataDept2(BK_REC_DATA[j][0],indate1,indate2));	
			*/
			}
			initCheck=1;
		}
	}
	else
	{
		document.getElementById('doc').style.display='none';
		document.getElementById('record2').style.display='none';
		document.getElementById('record3').style.display='none';
		document.getElementById('record4').style.display='block';
		document.getElementById('i_rec4').contentWindow.useCheckBox=useCheckBox;
		document.getElementById('i_rec4').contentWindow.init();
	}
}