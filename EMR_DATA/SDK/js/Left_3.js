var GridString="";
var tree=null;
var temp;
var mygrid;
var scanChart='';
var x1='';

var BK_DOC_CATE = parent.parent.BK_DOC_CATE;
var BK_DOC_DATA = parent.parent.BK_DOC_DATA;
var pid=parent.parent.pid;
BK_SHOW_FRAME = parent.parent.BK_SHOW_FRAME;

var BK_HWAN_JA= parent.parent.BK_HWAN_JA;
var BK_HWAN_JA_NAME=parent.parent.BK_HWAN_JA_NAME;
var BK_USER=parent.parent.BK_USER;
var doctorId = parent.parent.parent.doctorId;
var uDeptCd = parent.parent.parent.uDeptCd;
var deptCd = parent.parent.parent.deptCd;
var BK_REC_DATA = new Array();									
var tempRecStr="";
function init()
{
	BK_REC_DATA = getOPRecdData();
	
	if(tree != null)
		GetObj('recList3').innerHTML = "";

	VSIJ_MakeXml('2',BK_DOC_CATE,BK_DOC_DATA,BK_REC_DATA);
	
	checkEvent=1;
	if(parent.useCheckBox==1)
		tree.enableCheckBoxes(true, true);
	var xmlArr = getOPRecdDataDept(pid,uDeptCd);
	thisTree = tree;
	thisRoot = uDeptCd;
	g3[thisRoot] = xmlArr;
	g1[thisRoot]=0;
	
	VSIJ_AddTimer(thisRoot);
	
	document.oncontextmenu=contextMenu;
}
function setColor()
{
	tree.setItemColor(tree.getSelectedItemId(),'#000000','#000000');
}

function LeftClick(id)
{
		var i=0;
		var j=0;
		var param = new Array();
		tree.openItem(id);
		for(j=0; j<BK_REC_DATA.length; j++)
		{
			var recParam = id.split('*$*');
			var Sid = id.split('_');//
			
			if(Sid[1]!=undefined && Sid[1] == BK_REC_DATA[j][2])
			{
				for(i=0; i<BK_DOC_DATA.length; i++)
				{
					if(BK_DOC_DATA[i][0] == BK_REC_DATA[j][5])//서식의코드 ==  기록의 서식코드
					{
						param = [BK_DOC_DATA[i][0],j,id,BK_REC_DATA[j][3],BK_REC_DATA[j][2]];
						parent.parent.temp = BK_DOC_DATA[i];//body의 temp url
						parent.parent.temp2 = BK_REC_DATA[j];//서식의 xml
						parent.parent.SelectTreeItem(1, param); //Main.js (i,j)=>기록 조회
																					//document Code, rocord Code, id, title
						return;
					}
				}
			}
			else if(recParam.length != 1)
			{
				recordCheck(id);
				break;
			}
			//else if(Sid[0] == BK_REC_DATA[j][0] && Sid[1]==undefined)
			else if(Sid[0] == BK_REC_DATA[j][0])
			{
				checkEvent=1;
				if(tree.getSubItems(Sid[0])=="")
				{
					var xmlArr = getOPRecdDataDept(pid,BK_REC_DATA[j][0]);
					thisTree = tree;
					thisRoot = Sid[0];
					g3[thisRoot] = xmlArr;
					g1[thisRoot]=0;
					//VSIJ_AddItemToTreeDate(tree,Sid[0],xmlArr);
					VSIJ_AddTimer(thisRoot);
				}
				else
				{
					if(Sid[1]!=undefined)
					{
						var subItem = tree.getSubItems(BK_REC_DATA[j][0]).split(",");
						var indate = Sid[1].split("-");
						var indate2 = indate[0]+indate[1]+indate[2];
						var k=0;
						if(subItem.length>0)
						{
							for(k=0;k<subItem.length;k++)
							{
								var subItemDate = subItem[k].split(" ");
								if(subItemDate[0]==indate2)	
									break;
							}
						}
						VSIJ_AddItemToTree(tree,subItem[k],getOPRecdDataDept2(BK_REC_DATA[j][0],indate2,Sid[1]));	
					}
				}
				break;
			}
			else if(Sid[0] == 'ADD')
			{
				checkEvent=1;
				VSIJ_AddTimer(Sid[1]);
				break;
			}
			else if(tree._selected[0]!=undefined && Sid[0] == tree._selected[0].id && tree._selected[0].parentObject.id  == BK_REC_DATA[j][0] && Sid[1]==undefined)
			{
				if(treeChcek==1)
				{
					treeChcek=0;
					//scrollChange();
					return;
				}
				 //tree._selected[0].parentObject.id
				//VSIJ_AddItemToTree2(tree, Sid[0], xmlArray,i,xmlArray[i][9]);
				var indate = tree._selected[0].id.split(" ");
				var indate1 = indate[0];
				var indate2 = Sid[0].split(" ")[0].substring(0,4)+"-"+Sid[0].split(" ")[0].substring(4,6)+"-"+Sid[0].split(" ")[0].substring(6,8);
				VSIJ_AddItemToTree(tree,tree._selected[0].id,getOPRecdDataDept2(BK_REC_DATA[j][0],indate1,indate2));	
				if(tree._selected[0].childNodes.length>0)
				{
					var tempRecData;
					var tempRecData2="";
					var tempRecData3="";
					for(var k=0;k<tree._selected[0].childNodes.length;k++)
					{
						var tempRecData = tree._selected[0].childNodes[k].id.split('*$*');
						if(tempRecData[6]==0)
							tempRecData2 = tempRecData[0];
						else
							tempRecData3 = 1;
					}
					if(tempRecData2)
					{
						if(!tempRecData3)
						{
							var tempRecParam = tempRecData2+"*$**$**$**$**$*"+tree._selected[0].id+"*$*0*$*";
							recordCheck(tempRecParam);
						}
					}
				}
				break;
			}
		}
		//scrollChange();
}

function scrollChange()
{
	var recList3Obj = GetObj('recList3');
	recList3Obj.childNodes[0].scrollLeft = recList3Obj.childNodes[0].scrollWidth-recList3Obj.scrollWidth;	
}

function onBtnRefresh()
{
	location.reload(true); 
}


function onBtnSearch()
{	
	var text1;
	var data_arr;
	var j=0;
	
	var recType=document.getElementById('searchType').value;
	if(recType=="default")
	{
		recType=0;
	}
	text1=document.getElementById('rec_input');
	VSIJ_SearchingDocument(tree,'rec_root_5', null, BK_REC_DATA, text1.value,recType);  //recType   0:이름 1:일자

}


function onBtnOpen()//다중기록보기
{
	var selectedId=tree.getAllChecked();
	var tempp=selectedId.split(',');
	var Sid2=new Array();	
			
	for(var i=0; i<tempp.length; i++)
	{
		var tempp2 = tempp[i].split('_');
		Sid2[i]=tempp2[1];
	}	
	
	for(var p=0; p<Sid2.length; p++)
	{
		for(var j=0; j<BK_REC_DATA.length; j++)
		{
			if(Sid2[p]==BK_REC_DATA[j][0])
			{
				//alert("if");
				for(var k=0; k<BK_DOC_DATA.length; k++)
				{					
					if(BK_DOC_DATA[k][0] == BK_REC_DATA[j][5])//서식의코드 ==  기록의 서식코드
					{
						parent.parent.arrTemp[p] = BK_DOC_DATA[k];//body의 temp url
						parent.parent.arrTemp2[p] = BK_REC_DATA[j];//서식의 xml
							//alert('open');					
					}
				}
		  }
	  }
	}	parent.parent.SelectTreeItem(3, [k,j,this.id]); //Main.js (k,j)=>기록 조회 (k:서식data, j:기록data)	
	return;
}

function YearDate()//일자별 
{
	for(var i=0; i<BK_REC_DATA.length; i++)
	{
		BK_REC_DATA[i][12];//create_time
		BK_REC_DATA[i][14];//modify_time
	}
}

